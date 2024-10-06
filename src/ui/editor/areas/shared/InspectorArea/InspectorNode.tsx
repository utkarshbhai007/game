import * as React from 'react';
import * as THREE from 'three';
import {map, filter, concat, isFunction, isEmpty, times} from 'lodash';
import DebugData from '../../../DebugData';
import {CustomValue, Value} from './Value';
import {RootSym, applyFunction, isPureFunc} from './utils';
import {getParamNames} from '../../../../../utils';

const getObj = (data, root) => {
    if (root)
        return root();
    return data;
};

const filterKeys = keys => filter(keys, k => typeof(k) === 'number'
                                        || (k.substr(0, 2) !== '__'
                                            && k !== 'constructor'));

const getKeys = (obj): (string | number)[] => {
    if (obj === null
        || obj === undefined
        || obj === {}
        || obj instanceof Function
        || typeof(obj) === 'number'
        || typeof(obj) === 'string'
        || typeof(obj) === 'boolean'
    ) {
        return [];
    }
    if (Array.isArray(obj)) {
        return times(obj.length);
    }
    if (Object.getPrototypeOf(obj)) {
        return concat(
            filterKeys(Object.getOwnPropertyNames(obj)),
            getKeys(Object.getPrototypeOf(obj))
        );
    }
    return filterKeys(Object.keys(obj));
};

const countKeys = (obj): number => {
    if (obj === null
        || obj === undefined
        || obj === {}
        || obj instanceof Function
        || typeof(obj) === 'number'
        || typeof(obj) === 'string'
        || typeof(obj) === 'boolean'
    ) {
        return 0;
    }
    if (Array.isArray(obj)) {
        return obj.length;
    }
    if (Object.getPrototypeOf(obj)) {
        return filterKeys(Object.getOwnPropertyNames(obj)).length
            + countKeys(Object.getPrototypeOf(obj));
    }
    return filterKeys(Object.keys(obj)).length;
};

const hash = (data, root) => {
    const obj = getObj(data, root);
    const keys = getKeys(obj);
    const value = keys.join(',');
    const id = Math.round(new Date().getTime() * 0.01);
    return `${value};${id}`;
};

const isThree = obj =>
    obj instanceof THREE.Matrix3
    || obj instanceof THREE.Matrix4
    || obj instanceof THREE.Vector2
    || obj instanceof THREE.Vector3
    || obj instanceof THREE.Vector4
    || obj instanceof THREE.Quaternion
    || obj instanceof THREE.Euler;

const isSimpleValue = obj =>
    obj === null
    || isEmpty(obj)
    || typeof (obj) === 'string'
    || typeof (obj) === 'number'
    || typeof (obj) === 'boolean';

const getRoot = () => DebugData.scope;

function applyFctFromComponent(obj, parent, component) {
    const path = (component.props.path || []).join('.');
    const userData = component.props.userData;
    return applyFunction(obj, parent, path, userData && userData.bindings);
}

const prefixByKind = {
    g: `${RootSym}.`
};

export const InspectorNode = (
    name,
    addWatch,
    editBindings,
    root = getRoot,
    parent = null,
    path = [],
    prettyPath = []
) => ({
    dynamic: true,
    icon: () => 'none',
    name: () => name,
    key: (_obj, idx) => idx,
    numChildren: (data, _ignored, component) => {
        let obj = getObj(data, root);
        if (isPureFunc(obj, name, parent)) {
            obj = applyFctFromComponent(obj, parent, component);
        }
        if (typeof (obj) === 'string' || obj instanceof CustomValue)
            return 0;
        return countKeys(obj);
    },
    child: (data, idx, component) => {
        let obj = getObj(data, root);
        if (isPureFunc(obj, name, parent)) {
            obj = applyFctFromComponent(obj, parent, component);
        }
        return InspectorNode(
            getKeys(obj)[idx],
            addWatch,
            editBindings,
            null,
            obj,
            concat(path, name),
            concat(prettyPath, name)
        );
    },
    childData: (data, idx, component) => {
        let obj = getObj(data, root);
        if (obj === undefined || obj === null) {
            return obj;
        }
        if (isPureFunc(obj, name, parent)) {
            obj = applyFctFromComponent(obj, parent, component);
        }
        const k = getKeys(obj)[idx];
        return obj && obj[k];
    },
    color: (data) => {
        const obj = getObj(data, root);
        if (isFunction(obj)) {
            if (isPureFunc(obj, name, parent)) {
                return '#5cffa9';
            }
            return '#3d955d';
        }
        return '#49d2ff';
    },
    hasChanged: () => true,
    props: (data, collapsed) => [{
        id: 'params',
        style: {paddingLeft: 0},
        value: hash(data, root),
        render: (_value, component) => {
            const obj = getObj(data, root);
            if (isFunction(obj)) {
                const isPure = isPureFunc(obj, name, parent);
                let paramNames: any[] = getParamNames(obj);
                if (isPure) {
                    const userData = component.props.userData;
                    const bPath = (component.props.path || []).join('.');
                    if (userData && userData.bindings && bPath in userData.bindings) {
                        const bindings = userData.bindings[bPath];
                        paramNames = map(bindings, (p, idx) =>
                            <span key={idx} style={{color: 'white'}}>
                                {prefixByKind[p.kind]}{p.value}
                            </span>
                        );
                    }
                }
                const editStyle = {
                    padding: '0 6px',
                    margin: '0 3px',
                    color: isPure ? 'white' : 'grey',
                    fontSize: 11,
                    fontWeight: 'bold' as const,
                    border: isPure ? '1px inset #5cffa9' : '1px inset #3d955d',
                    borderRadius: 4,
                    background: 'rgba(0, 0, 0, 0.5)',
                    cursor: 'pointer' as const
                };
                const paramStyle = {
                    color: isPure ? '#BBBBBB' : '#666666'
                };
                const onClick = () =>
                    editBindings(
                        concat(path, name).slice(1),
                        concat(prettyPath, name).slice(1),
                        parent,
                        component.props.userData
                    );
                const style = {
                    color: isPure ? '#5cffa9' : '#3d955d',
                    wordBreak: 'break-word' as const
                };
                return <span style={style}>
                    (
                    {map(paramNames, (param, idx) =>
                        <React.Fragment key={idx}>
                            {idx > 0 ? ', ' : null}
                            <span style={paramStyle}>{param}</span>
                        </React.Fragment>)}
                    )
                    {!(isPure && paramNames.length === 0) &&
                        <span style={editStyle} onClick={onClick}>EDIT</span>}
                </span>;
            }
            return null;
        }
    }, {
        id: 'value',
        value: hash(data, root),
        render: (_value, component) => {
            let obj = getObj(data, root);
            if (isFunction(obj)) {
                if (isPureFunc(obj, name, parent)) {
                    const nObj = applyFctFromComponent(obj, parent, component);
                    if (obj === nObj) {
                        return null;
                    }
                    obj = nObj;
                } else {
                    return null;
                }
            }
            if (collapsed || isSimpleValue(obj) || isThree(obj) || obj instanceof CustomValue) {
                return <Value value={obj}/>;
            }
            return null;
        }
    }],
    ctxMenu: !root && addWatch && [
        {
            name: 'Watch',
            onClick: (component) => {
                addWatch(component.props.path, component.props.prettyPath);
            }
        },
    ],
});

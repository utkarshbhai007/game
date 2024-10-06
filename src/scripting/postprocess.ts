import { each } from 'lodash';
import Scene from '../game/Scene';
import Actor from '../game/Actor';

export function postProcessScripts(scene: Scene, actor: Actor) {
    postProcessScript('life', scene, actor);
    postProcessScript('move', scene, actor);
}

export function cleanUpScripts(actor: Actor) {
    delete actor.scripts.life.opMap;
    delete actor.scripts.move.opMap;
}

function postProcessScript(type: 'life' | 'move', scene: Scene, actor: Actor) {
    const script = actor.scripts[type];
    each(
        script.commands,
        (cmd, idx) => postProcessCmd(script, cmd, idx + 1, scene, actor)
    );
}

function postProcessCmd(script, cmd, cmdOffset, scene: Scene, actor: Actor) {
    const args = cmd.args || [];
    let opMap;
    for (let i = 0; i < args.length; i += 1) {
        if (args[i].type === 'offset') {
            if (script.opMap[args[i].value] === undefined) {
                // tslint:disable-next-line:no-console max-line-length
                console.warn(`Failed to parse offset: ${scene.index}:${actor.index}:${script.type}:${cmdOffset} offset=${args[i].value}`);
            }
            args[i].value = script.opMap[args[i].value];
        }
    }
    switch (cmd.op.command) {
        case 'SET_TRACK':
            opMap = actor.scripts.move.opMap;
            if (opMap[args[0].value] === undefined) {
                // tslint:disable-next-line:no-console max-line-length
                console.warn(`Failed to parse SET_TRACK offset: ${scene.index}:${actor.index}:${script.type}:${cmdOffset} offset=${args[0].value}`);
            }
            args[0].value = opMap[args[0].value];
            break;
        case 'SET_TRACK_OBJ':
            opMap = scene.actors[args[0].value].scripts.move.opMap;
            if (opMap[args[1].value] === undefined) {
                // tslint:disable-next-line:no-console max-line-length
                console.warn(`Failed to parse SET_TRACK_OBJ offset: ${scene.index}:${actor.index}:${script.type}:${cmdOffset} offset=${args[1].value}`);
            }
            args[1].value = opMap[args[1].value];
            break;
        case 'SET_BEHAVIOUR_OBJ':
            opMap = scene.actors[args[0].value].scripts.life.opMap;
            if (opMap[args[1].value] === undefined) {
                // tslint:disable-next-line:no-console max-line-length
                console.warn(`Failed to parse SET_BEHAVIOUR_OBJ offset: ${scene.index}:${actor.index}:${script.type}:${cmdOffset} offset=${args[1].value}`);
            }
            args[1].value = opMap[args[1].value];
            break;
    }
}

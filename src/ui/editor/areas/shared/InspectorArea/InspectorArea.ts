import {findIndex, find} from 'lodash';
import {InspectorAreaContent} from './InspectorAreaContent';

const InspectorArea = {
    id: 'inspector',
    replaces: 'dbg_hud',
    name: 'Inspector',
    icon: 'terminal.png',
    content: InspectorAreaContent,
    getInitialState: () => ({
        path: [],
        prettyPath: [],
        watches: [],
        tab: 'explore'
    }),
    stateHandler: {
        setTab(tab) {
            this.setState({tab});
        },
        setPath(path, prettyPath) {
            this.setState({path, prettyPath});
        },
        addWatch(path, prettyPath, bindings, editId, rootName) {
            const watches = this.state.watches || [];
            if (editId) {
                const watch = find(watches, w => w.id === editId);
                if (watch) {
                    watch.path = path;
                    watch.prettyPath = prettyPath;
                    Object.assign(watch.bindings || {}, bindings);
                }
            } else {
                const id = new Date().getTime();
                watches.push({
                    id,
                    path,
                    prettyPath,
                    bindings,
                    rootName
                });
            }
            this.setState({watches});
        },
        removeWatch(id) {
            const watches = this.state.watches || [];
            const idx = findIndex(watches, (w: any) => w.id === id);
            if (idx !== -1) {
                watches.splice(idx, 1);
            }
            this.setState({watches});
        }
    }
};

export default InspectorArea;

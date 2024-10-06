import * as React from 'react';

const bg_style = {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.75)'
};

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

interface PopupState {
    content: React.ElementType;
}

export default class Popup extends React.Component<{}, PopupState> {
    static instance = null;

    static display(component) {
        if (Popup.instance) {
            Popup.instance.setState({ content: component });
        }
    }

    constructor(props) {
        super(props);
        this.state = { content: null };
        Popup.instance = this;
    }

    close() {
        this.setState({ content: null });
    }

    render() {
        if (this.state.content) {
            return <div style={bg_style}>
                <div style={style}>
                    {React.createElement(this.state.content, {
                        close: this.close.bind(this)
                    })}
                </div>
            </div>;
        }
        return null;
    }
}

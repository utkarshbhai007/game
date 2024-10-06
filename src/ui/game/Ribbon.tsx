import * as React from 'react';
import {version} from '../../../package.json';

const overlay = {
    position: 'absolute' as const,
    right: 5,
    top: 5,
    textAlign: 'right' as const,
    fontFamily: 'LBA',
};

const versionText = (color, opacity = 0.5) => ({
    color,
    display: 'inline-block' as const,
    userSelect: 'none' as const,
    cursor: 'pointer' as const,
    fontSize: 14,
    background: `rgba(0, 0, 0, ${opacity})`,
    border: `1px outset ${color}`,
    borderRadius: 3,
    padding: '1px 3px',
    textAlign: 'center' as const
});

const editorVersionText = versionText('white');
delete editorVersionText.border;
delete editorVersionText.borderRadius;

function changelog() {
    document.dispatchEvent(new Event('displaychangelog'));
}

declare global {
    interface Window {
        buildNumber: string;
    }
}

export default function Ribbon({mode}) {
    let color;
    let opacity = 0.5;
    switch (mode) {
        case 'loader': color = 'rgba(49, 89, 255, 1)'; break;
        case 'menu': color = '#ffffff'; break;
        case 'game':
            color = 'rgba(255, 255, 255, 0.2)';
            opacity = 0.1;
            break;
        default: break;
    }
    const build = window.buildNumber;
    return <div style={overlay}>
        <span
            style={versionText(color, opacity)}
            onClick={changelog}
        >
            LBA2 Remake<br/>
            <i style={{fontSize: 12}}>v{version}</i>
            {build && <React.Fragment>-{build}</React.Fragment>}
        </span>
    </div>;
}

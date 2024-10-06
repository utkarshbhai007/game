// tslint:disable:max-line-length
import * as React from 'react';

const animStyle = `
svg#settings-group {
    transform-origin: 50% 50%;
    transition: transform 0.5s ease;
    transform: rotate(0deg);
}
svg#settings-group:hover {
    transition: transform 4s linear;
    transform: rotate(360deg);
}
`;

export default function SettingsIcon(props) {
    return <React.Fragment>
        <style>{animStyle}</style>
        <svg id="settings-group" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style={props.style} onClick={props.onClick}>
            <path d="M43.7 31.4l4.2-1.5c.3-1.6.5-3.2.5-4.9 0-1.5-.2-3-.4-4.5L43.7 19c-1-.4-1.5-1.5-1-2.5l2-4.2c-1.7-2.6-3.9-4.9-6.5-6.6l-4.3 2c-1 .5-2.1 0-2.5-1l-1.6-4.5c-1.5-.3-3.1-.5-4.8-.5-1.5 0-3 .1-4.4.4L19 6.7c-.4 1-1.5 1.5-2.5 1l-4.4-2.1C9.6 7.3 7.4 9.5 5.7 12l2.1 4.4c.5 1 0 2.1-1 2.5l-4.6 1.6c-.2 1.5-.3 3-.3 4.5 0 1.6.2 3.2.5 4.7l4.5 1.6c1 .4 1.5 1.5 1 2.5l-2 4.3c1.7 2.6 4 4.8 6.6 6.5l4.2-2c1-.5 2.1 0 2.5 1l1.5 4.3c1.5.3 3 .4 4.5.4 1.7 0 3.3-.2 4.8-.5l1.5-4.2c.4-1 1.5-1.5 2.5-1l4 1.9c2.7-1.7 4.9-4 6.7-6.7l-1.9-4c-.6-.9-.1-2.1.9-2.4zm-18.5 1c-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5 7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5z" fill="#595959"/>
            <path d="M25.1 49.8c-1.6 0-3.2-.2-4.8-.5l-.8-.2-1.8-5.1c0-.1-.1-.2-.2-.2h-.2l-4.9 2.3-.7-.5c-2.8-1.8-5.2-4.1-7-6.9l-.5-.7 2.4-5v-.2l-.2-.2L1 30.8.9 30c-.3-1.6-.5-3.3-.5-5 0-1.6.2-3.1.5-4.7l.1-.8 5.4-1.9c.1 0 .2-.1.2-.2v-.2L4.1 12l.5-.7c1.8-2.7 4.1-5 6.8-6.8l.7-.5 5.2 2.5h.2c.1 0 .1-.1.2-.2L19.6.9l.8-.2c3.3-.7 6.6-.6 9.8 0l.8.2 1.9 5.3c0 .1.1.2.2.2h.2l5-2.4.7.5c2.8 1.9 5.1 4.2 6.9 7l.5.7-2.3 4.9v.2c0 .1.1.1.2.2l5.1 1.8.2.8c.3 1.6.5 3.2.5 4.8 0 1.7-.2 3.5-.5 5.2l-.4.9-5 1.8c-.1 0-.2.1-.2.2v.2l2.3 4.7-.5.7c-1.9 2.8-4.3 5.2-7.1 7.1l-.7.5-4.7-2.3h-.2c-.1 0-.1.1-.2.2l-1.8 5-.8.2c-1.7.3-3.4.5-5.2.5zm-3.4-3.3c2.4.4 4.8.4 7.1 0l1.2-3.4c.3-.9 1-1.6 1.8-1.9.9-.4 1.8-.3 2.7.1l3.2 1.5c2-1.4 3.7-3.1 5.1-5.1l-1.5-3.2c-.4-.8-.4-1.8-.1-2.7.4-.9 1.1-1.5 1.9-1.8l3.4-1.2c.2-1.2.3-2.5.3-3.7 0-1.1-.1-2.3-.3-3.4l-3.4-1.2c-.9-.3-1.6-1-1.9-1.8s-.3-1.8.1-2.7l1.6-3.4c-1.4-1.9-3-3.6-4.9-5l-3.5 1.6c-.8.4-1.8.4-2.7.1-.9-.4-1.5-1.1-1.8-1.9l-1.3-3.7c-2.3-.4-4.6-.4-6.9-.1l-1.3 3.8c-.3.9-1 1.6-1.8 1.9-.9.4-1.8.3-2.7-.1l-3.6-1.7c-1.9 1.4-3.5 3-4.8 4.8L9.3 16c.4.8.4 1.8.1 2.7-.4.9-1.1 1.5-1.9 1.8l-3.8 1.3c-.2 1.1-.3 2.2-.3 3.3 0 1.2.1 2.4.3 3.6L7.4 30c.9.3 1.6 1 1.9 1.8s.3 1.8-.1 2.7L7.6 38c1.4 1.9 3.1 3.5 5 4.9l3.4-1.6c.8-.4 1.8-.4 2.7-.1.9.4 1.5 1.1 1.8 1.9l1.2 3.4zm3.5-12.6c-5 0-9-4-9-9s4-9 9-9 9 4 9 9c0 4.9-4.1 9-9 9zm0-15c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" fill="#fff"/>
        </svg>
    </React.Fragment>;
}

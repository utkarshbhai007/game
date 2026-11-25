'use strict';

const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) {
        return;
    }
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const entries = fs.readdirSync(src);
        for (const entry of entries) {
            copyRecursiveSync(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        const parentDir = path.dirname(dest);
        if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
    }
}

const target = process.argv[2];

if (target === 'bundle') {
    const src = path.resolve(__dirname, '../dist/bundle.js');
    const dest = path.resolve(__dirname, '../www/bundle.js');
    if (fs.existsSync(src)) {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
        console.log('Successfully copied bundle.js to www/bundle.js');
    } else {
        console.warn('Warning: dist/bundle.js not found to copy.');
    }
} else if (target === 'webxr') {
    const src = path.resolve(__dirname, '../node_modules/@webxr-input-profiles/assets/dist/profiles');
    const dest = path.resolve(__dirname, '../www/webxr-assets');
    if (fs.existsSync(dest)) {
        if (fs.rmSync) {
            fs.rmSync(dest, { recursive: true, force: true });
        } else {
            fs.rmdirSync(dest, { recursive: true });
        }
    }
    if (fs.existsSync(src)) {
        copyRecursiveSync(src, dest);
        console.log('Successfully copied WebXR assets to www/webxr-assets');
    } else {
        console.warn('Warning: WebXR profile assets not found in node_modules.');
    }
} else {
    console.error('Unknown asset copy target:', target);
    process.exit(1);
}

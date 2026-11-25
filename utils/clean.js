'use strict';

const fs = require('fs');
const path = require('path');

const targets = [
    './dist',
    './www/webxr-assets',
    './www/bundle.js',
    './www/index.html'
];

targets.forEach((target) => {
    const resolvedPath = path.resolve(__dirname, '..', target);
    try {
        if (fs.existsSync(resolvedPath)) {
            if (fs.rmSync) {
                fs.rmSync(resolvedPath, { recursive: true, force: true });
            } else {
                // Fallback for older Node.js
                const stat = fs.statSync(resolvedPath);
                if (stat.isDirectory()) {
                    fs.rmdirSync(resolvedPath, { recursive: true });
                } else {
                    fs.unlinkSync(resolvedPath);
                }
            }
            console.log(`Cleaned: ${target}`);
        }
    } catch (err) {
        console.warn(`Warning cleaning ${target}:`, err.message);
    }
});

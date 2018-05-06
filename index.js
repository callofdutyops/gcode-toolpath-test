const Toolpath = require('gcode-toolpath');
const fs = require('fs');

const file = fs.createWriteStream('toolpath.txt');
file.on('error', function(err) { /* error handling */ });
const fileName = 'example.gcode';

const toolpaths = [];
const toolpath = new Toolpath({
    // @param {object} modal The modal object.
    // @param {object} v1 A 3D vector of the start point.
    // @param {object} v2 A 3D vector of the end point.
    addLine: (modal, v1, v2) => {
        const motion = modal.motion;
        const tool = modal.tool;
        file.write(JSON.stringify({ motion: motion, tool: tool, v1: v1, v2: v2 }) + '\n');
        toolpaths.push({ motion: motion, tool: tool, v1: v1, v2: v2 });
    },
    // @param {object} modal The modal object.
    // @param {object} v1 A 3D vector of the start point.
    // @param {object} v2 A 3D vector of the end point.
    // @param {object} v0 A 3D vector of the fixed point.
    addArcCurve: (modal, v1, v2, v0) => {
        const motion = modal.motion;
        const tool = modal.tool;
        file.write(JSON.stringify({ motion: motion, tool: tool, v1: v1, v2: v2, v0: v0 }) + '\n');
        toolpaths.push({ motion: motion, tool: tool, v1: v1, v2: v2, v0: v0 });
    }
});

toolpath
    .loadFromFile(fileName, (err, results) => {
        file.end();
        console.log(toolpaths);
    })
    .on('data', (data) => {
        // 'data' event listener
    })
    .on('end', (results) => {
        // 'end' event listener
    });

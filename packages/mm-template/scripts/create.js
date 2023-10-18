const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const templateJSON = require('../template.json');
const packageJSON = require('../package.json');
const {
    distPath,
    templateDir
} = require('./config');

const createPackageJson = () => {
    templateJSON.name = packageJSON.name;
    templateJSON.version = packageJSON.version;

    return templateJSON;
};

const createTemplate = () => {
    const json = createPackageJson();
    fs.ensureDirSync(distPath);
    fs.writeFileSync(
        path.join(distPath, 'package.json'),
        JSON.stringify(json, null, 2) + os.EOL
    );
    fs.copySync(templateDir, distPath);
};

const moveDist = (dist, templateName = 'mm-template') => {
    const distDir = dist.endsWith(path.sep) ? dist.slice(0, -1) : dist;
    const execDistPath = `${distDir}${path.sep}${templateName}`;

    fs.copySync(distPath, execDistPath);
    fs.emptyDirSync(distPath);
    return execDistPath;
};

module.exports = {
    createTemplate,
    moveDist
};

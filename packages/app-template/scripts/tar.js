const path = require('path');
const { createWriteStream, createReadStream } = require('fs');
const { pack, unpack } = require('tar-pack');
const fs = require('fs');

const buildTemplate = path.resolve(__dirname, '../dist');
const tarTemplatePath = path.resolve(__dirname, '../template.tar.gz');

const packTemplate = () => {
    return new Promise((resolve, reject) => {
        console.log('packTemplate');
        if (fs.existsSync(tarTemplatePath)) {
            console.log('packTemplate resolve');
            resolve(tarTemplatePath);
            return;
        }

        pack(buildTemplate)
            .pipe(createWriteStream(tarTemplatePath))
            .on('error', function (err) {
                reject(err);
            })
            .on('close', function () {
                console.log('packTemplate close');
                resolve(tarTemplatePath);
            });
    });
};

// packTemplate();

const unpackToDist = (dist, templateName = 'mm-template') => {
    return new Promise((resolve, reject) => {
        console.log('unpackToDist');
        const distDir = dist.endsWith(path.sep) ? dist.slice(0, -1) : dist;
        const distPath = `${distDir}${path.sep}${templateName}`;

        if (fs.existsSync(distPath)) {
            console.log('unpackToDist 已存在');
            reject(new Error(`${distPath}已存在`));
            return;
        }

        createReadStream(tarTemplatePath)
            .pipe(unpack(distPath))
            .on('error', function (err) {
                reject(err);
            })
            .on('close', function () {
                console.log('unpackToDist close');
                resolve(distPath);
            });
    });
};

module.exports = {
    packTemplate,
    unpackToDist
};

// 删除生成dist
const fs = require('fs-extra');
const {
    distPath
} = require('./config');

// assume this directory has a lot of files and folders
fs.emptyDirSync(distPath);
console.log('清空dist目录');

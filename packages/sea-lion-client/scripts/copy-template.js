const fs = require('fs-extra');
const path = require('path');

// 确保目标目录存在
fs.ensureDirSync(path.resolve(__dirname, '../lib/template'));

// 复制文件
fs.copySync(
  path.resolve(__dirname, '../src/template'),
  path.resolve(__dirname, '../lib/template')
);

console.log('Template files copied successfully!'); 
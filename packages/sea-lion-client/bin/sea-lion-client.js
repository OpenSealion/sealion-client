#!/usr/bin/env node

// 将构建目录(lib)下的 index.js 作为脚手架的入口
process.on('unhandledRejection', err => {
    throw err;
});
require('../lib/index');

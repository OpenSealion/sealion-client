const { createTemplate, moveDist } = require('./scripts/create');

const getTemplate = (dir, appName) => {
    createTemplate();
    return moveDist(dir, appName);
};

const fetchTemplate = async (dir, appName) => {
    return new Promise((resolve, reject) => {
        try {
            createTemplate();
            const execDistPath = moveDist(dir, appName);
            resolve(execDistPath);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getTemplate,
    fetchTemplate
};

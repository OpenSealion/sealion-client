const path = require('path');

const resolvePath = p => path.resolve(__dirname, '../', p);

module.exports = {
    distPath: resolvePath('dist'),
    templateDir: resolvePath('template')
};

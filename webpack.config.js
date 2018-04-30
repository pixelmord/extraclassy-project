const path = require('path')


// pick up config from sub-projects:
const themeConfig = require('./web/themes/custom/extraclassy/webpack.config');
//const appConfig = require('./web/modules/custom/adminx_app/webpack.config');


module.exports = [themeConfig];

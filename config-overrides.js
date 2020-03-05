/*
 * @Author: your name
 * @Date: 2019-12-10 17:22:53
 * @LastEditTime : 2020-01-08 16:02:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/config-overrides.js
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //实现按需打包  根据import
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    //修改源码中的less 文件
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#3c8dbc' },
        }),
    );
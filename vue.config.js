const electron_builder = require("./builds_resources/build_config/electron_builder.js")

module.exports = {
    configureWebpack: {
        devtool: 'source-map', // 启用源地图
    },
    pluginOptions: {
        electronBuilder: electron_builder,
    }
}
// vue.config.js

module.exports = {
    pluginOptions: {
        electronBuilder: {
            // 如果您不希望将文件输出到dist_electron中，则可以在VCPEB的插件选项中选择一个自定义文件夹。您也可以使用--dest参数来更改输出目录
            // 注意：建议将新目录添加到您的.gitignore文件中。
            outputDir: 'build',
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                // https://www.electron.build/configuration/configuration
                appId: "com.gameguo.cuteunitylauncher", // 包名
                productName: "cute_unity_launcher", // 项目名 exe名 其中包含名称属性中不允许的空格和其他特殊字符
                copyright: "Copyright © 2020 gameguo", // 版权
                compression: "maximum", // store normal maximum  store相对较快
                asar: false,
                directories: {
                    // 请注意-构建资源未打包到应用程序中。如果您需要使用某些文件（例如，作为任务栏图标），请明确包含所需文件："files": ["**/*", "build/icon.*"]
                    // buildResources: "", //构建资源的路径。
                    output: "build", // 输出目录。支持文件宏。 https://www.electron.build/file-patterns#file-macros
                    // app: "app" //应用程序目录（包含应用程序的package.json），默认为app，www或工作目录
                },
                win: { // https://www.electron.build/configuration/win
                    "icon": "buildResources/icons/icon.ico", // 应用程序图标的路径。
                    target: [
                        {
                            // 目标封装类型
                            // 列表nsis, nsis-web Web安装程序, portable 便携式应用而无需安装appx, msi, squirrel, 7z, zip, tar.xz, tar.lz, tar.gz, tar.bz2, dir
                            // AppX软件包只能在Windows 10上构建
                            target: "nsis",
                            // icon: "", // 应用程序图标的路径。
                            //  “x64” | “ia32” | “armv7l” | “arm64”> | “x64” | “ia32” | “armv7l” | “arm64” - The arch or list of archs.
                            arch: ["x64"]
                        }
                    ]
                },
                mac: { // https://www.electron.build/configuration/mac
                    icon: "buildResources/icons/icon.icns",
                    // string | TargetConfiguration
                    // 目标封装类型：列表default，dmg，mas，mas-dev，pkg，7z，zip，tar.xz，tar.lz，tar.gz，tar.bz2，dir。
                    // 默认为default（对于Squirrel.Mac，为dmg和zip）
                    target: "dmg"
                },
                linux: { // https://www.electron.build/configuration/linux
                    "icon": "buildResources/icons",
                    // 目标封装类型 列表AppImage, snap, deb, rpm, freebsd, pacman, p5p, apk, 7z, zip, tar.xz, tar.lz, tar.gz, tar.bz2, dir
                    target: "AppImage"
                },
                dmg: { // macOS DMG选项 https://www.electron.build/configuration/dmg
                    // background: "",//背景图片的路径
                    title: "${productName} ${version}", // 生成的DMG的标题，将在安装时显示
                    contents: [ // Array <DmgContent> 自定义图标位置。x和y坐标指的是图标中心的位置（以1x比例），并且不考虑标签
                        {
                            x: 410, // 从窗口左侧到图标中心的与设备无关的像素偏移。
                            y: 150, // 从窗口顶部到图标中心的与设备无关的像素偏移量。
                            type: "link", // link | file | dir
                            //name: "", // DMG中文件的名称。默认为的基本名称path
                            path: "/Applications" // DMG中文件的路径
                        },
                        {
                            x: 130,
                            y: 150,
                            type: "file"
                        }
                    ],
                    window: { // DMG窗口的位置和大小
                        x: 400, // 相对于屏幕左侧的X位置
                        y: 100, // 相对于屏幕顶部的Y位置
                        width: 540, // 宽度。默认为背景图像宽度或540
                        height: 380, // 高度。默认为背景图像高度或380
                    }
                },
                nsis: {
                    oneClick: false, // 一键安装
                    allowElevation: true,// 允许请求权限提升。如果为false，则用户必须使用提升的权限重新启动安装程序
                    allowToChangeInstallationDirectory: true, // 允许修改安装路径
                    perMachine: true, // 是否开启安装时权限限制(此电脑或当前用户)
                    createDesktopShortcut: true, //创建桌面图标
                    createStartMenuShortcut: true, // 创建开始菜单图标
                    shortcutName: "Cute Launcher", // 图标名称
                    //guid:"", // 注册表名 不推荐修改
                    // installerIcon: "./build/icons/aaa.ico", // 安装图标
                    // uninstallerIcon: "./build/icons/bbb.ico", // 卸载图标
                    // installerHeaderIcon: "./build/icons/aaa.ico", // 安装时头部图标
                },
                // removePackageScripts: true, // 是否从package.json文件中删除scripts字段
                // electronVersion: "", // 您要包装的版本 默认为版本electron，electron-prebuilt或electron-prebuilt-compile依赖
                //files: [],
                // extraResources: { // 拷贝dll等静态文件到指定位置
                //     from: "./app-update.yml",
                //     to: "./b.txt"
                // },
            }
        }
    }
}
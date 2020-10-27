'use strict'

import { app, protocol, BrowserWindow, Tray, Menu, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const path = require("path")
const { default: main } = require("./main")

const isDevelopment = process.env.NODE_ENV !== 'production'

const applicationName = "Cute Launcher"

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, tray

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    backgroundColor: "#ffffff",
    width: 940,
    height: 630,
    "center": true,
    "minWidth": 650,//窗口的最小宽度，单位: 像素值,
    "minHeight": 400,//窗口的最小高度，单位: 像素值,
    "title": applicationName,
    // titleBarStyle: 'hidden',
    // frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL).then(function () {
      if (!process.env.IS_TEST) win.webContents.openDevTools()
      main(win)
    })
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
  win.on('close', (e) => {
    e.preventDefault()
    win.hide();
    // win.setSkipTaskbar(true);
  })

  initTrayIcon()
}

function initTrayIcon() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: function () {
        win.show();
      } //打开相应页面
    },
    {
      label: '关于',
      click: function () {
        dialog.showMessageBox({
          title: "关于",
          message: applicationName + " - " + process.env.npm_package_version + " - gameguo\nhttps://github.com/gameguo",
          buttons: ["确定"],
          noLink: true,
          type: "info",
          cancelId: 0,
        })
      }
    },
    {
      label: '退出',
      click: function () {
        win.destroy();
        win = null;
        app.quit();
      }
    }
  ])
  tray = new Tray(path.join(__static, 'icon.ico'))
  //设置此托盘图标的悬停提示内容
  tray.setToolTip('Cute Launcher')
  //设置此图标的上下文菜单
  tray.setContextMenu(contextMenu)
  //单击右下角小图标显示应用
  tray.on('click', function () {
    win.show();
  })

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

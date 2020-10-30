const platform = {}

window.ipcRenderer.on('console.log', (event, arg) => {
    console.log(arg)
})

window.ipcRenderer.on('platform', (event, arg) => {
    let platformStr = arg;
    if (platformStr == "darwin") {
        console.log("这是mac系统");
    }
    if (platformStr == "win32") {
        console.log("这是windows系统");
    }
    if (platformStr == "linux") {
        console.log("这是linux系统");
    }
})

export default platform;

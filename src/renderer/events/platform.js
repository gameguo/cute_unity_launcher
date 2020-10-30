const platform = {}

window.ipcRenderer.on('console.log', (event, arg) => {
    console.log(arg)
})

window.ipcRenderer.on('platform', (event, arg) => {
    let platformStr = arg;
    if (platformStr == "darwin") {
        window.platform = "mac";
        console.log("这是mac系统");
    }
    if (platformStr == "win32") {
        window.platform = "win";
        console.log("这是windows系统");
    }
    if (platformStr == "linux") {
        window.platform = "linux";
        console.log("这是linux系统");
    }
})

export default platform;

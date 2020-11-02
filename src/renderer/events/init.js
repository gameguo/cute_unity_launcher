const init = {}

window.ipcRenderer.on('console.log', (event, arg) => {
    console.log(arg)
})

window.ipcRenderer.on('init-message', (event, arg) => {
    window.documentsPath = arg.documentsPath;
    let platform = arg.platform;
    if (platform == "darwin") {
        window.platform = "mac";
        console.log("这是mac系统");
    }
    if (platform == "win32") {
        window.platform = "win";
        console.log("这是windows系统");
    }
    if (platform == "linux") {
        window.platform = "linux";
        console.log("这是linux系统");
    }
})

export default init;

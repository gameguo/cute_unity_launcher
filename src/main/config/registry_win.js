const registryKeys = {
    hkcu: 'HKEY_CURRENT_USER',  // 当前用户所用信息储存地
    hklm: 'HKEY_LOCAL_MACHINE', // 机器软硬件信息的集散地
    root: 'Software\\Unity Technologies',
    prefs5x: 'Software\\Unity Technologies\\Unity Editor 5.x',
    install: 'Software\\Unity Technologies\\Installer',
    uninstall: 'Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall',
    envar: 'Environment',
    sysEnVar: 'SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment',
    projectKey: "RecentlyUsedProjectPaths-",
    projectKeyType_BINARY: "REG_BINARY",
};
module.exports = {
    keys: registryKeys
};
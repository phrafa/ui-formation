const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  closeApp: () => ipcRenderer.send('close-app'),
  minimizeApp: () => ipcRenderer.send('minimize-app'),
  maximizeRestoreApp: () => ipcRenderer.send('maximize-restore-app'),
});

console.log('preload.js loaded');
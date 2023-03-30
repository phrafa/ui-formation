'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import * as controllers from "./backend/controllers";


const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, '..', 'src', 'preload.js'),
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true
    }
  })

  

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  initializeIpcHandlers(win);

  ipcMain.on("close-app", (event) => {
    win.close();
    app.quit();
  });

  ipcMain.on("minimize-app", (event) => {
    win.minimize();
  });

  ipcMain.on("maximize-restore-app", (event) => {
    const isFullScreen = win.isFullScreen();
    win.setMenuBarVisibility(isFullScreen);
    win.setAutoHideMenuBar(isFullScreen)
    win.setFullScreen(!isFullScreen);

  });

}

const initializeIpcHandlers = (win) => {
  const c = Object.keys(controllers)
  for (let i in c) {
    console.log(c[i])
    if (c[i].slice(-4) === 'Once') {
      console.log('once', c[i])
      ipcMain.once(c[i], (event, args) => {
        controllers[c[i]].execute(event, args)
      });
      continue;
    } 
    ipcMain.on(c[i], (event, args) => {
        controllers[c[i]].execute(event, args)
    });
  }
};


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})


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

const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const notifier = require('node-notifier');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    minWidth: 1000,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  win.setIcon(path.join(__dirname, 'screenshx.ico'));
  win.loadFile('index.html');

  ipcMain.on('window-controls', (event, action) => {
    switch (action) {
      case 'minimize':
        win.minimize();
        break;
      case 'maximize':
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
        break;
      case 'close':
        win.close();
        break;
    }
  });

  ipcMain.on('notify', (event, noteTitle, message) => {
    notifier.notify({
      appName: "ScreenSHX",
      title: noteTitle,
      message: message,
      wait: true,
      icon: path.join(__dirname, 'screenshx.ico')
    });
  });
};

app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+W", () => {
    return 0; /* Returns 0 */
});
globalShortcut.register("F11", () => {
  return 0; /* Returns 0 */
});
  createWindow();
  app.setAppUserModelId("com.screenshx");
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

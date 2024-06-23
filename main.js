const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const nativeImage = require('electron').nativeImage;
const path = require('path');
const notifier = require('node-notifier');

const image = nativeImage.createFromPath('icon.png');
let mainWindow;
const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';

if (isWin) {
  app.setUserTasks([{
    program: process.execPath,
    arguments: '--new-window',
    iconPath: path.join(__dirname, "..", "..", "screenshx.png"),
    iconIndex: 0,
    title: 'ScreenSHX',
    description: 'Screensharing software.'
  }]);
}

function createWindow(platformRuntime) {
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 1000,
    height: 650,
    minHeight: 550,
    frame: platformRuntime,
    titleBarStyle: platformRuntime ? 'hiddenInset' : 'default',
    trafficLightPosition: { x: 8, y: 8 },
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
    icon: path.join(__dirname, isMac ? 'screenshx.icns' : 'screenshx.png')
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('platform-info', process.platform);
    mainWindow.webContents.send('fullscreen-status', mainWindow.isFullScreen());
  });

  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('fullscreen-status', true);
  });

  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('fullscreen-status', false);
  });

  ipcMain.on('window-controls', (event, action) => {
    switch (action) {
      case 'minimize':
        mainWindow.minimize();
        break;
      case 'maximize':
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      case 'close':
        mainWindow.close();
        break;
    }
  });

  ipcMain.on('notify', (event, noteTitle, message) => {
    notifier.notify({
      appName: 'ScreenSHX',
      title: noteTitle,
      message: message,
      wait: true,
      icon: path.join(__dirname, 'screenshx.png')
    });
  });

  globalShortcut.register('F11', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  if (!isMac || !isLinux) {
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.setIgnoreMouseEvents(false);
    });
  }
}

app.whenReady().then(() => {
  if (isMac) {
    createWindow(isMac);
    app.setAppUserModelId('com.screenshx');
    app.dock.setIcon(image);
  } else if (isWin) {
    createWindow(isLinux);
    app.setAppUserModelId('com.screenshx');
  } else if (isLinux) {
    createWindow(isLinux);
    app.setAppUserModelId('com.screenshx');
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});
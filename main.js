const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer } = require('electron');
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
    description: 'Screensharing software for all.'
  }]);
}

function createWindow(platformRuntime) {
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 1000,
    height: 650,
    minHeight: 550,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 16, y: 12 },
    titleBarOverlay: {
      color: '#1f1f1f',
      symbolColor: 'white',
      height: 30,
    },
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

  ipcMain.handle('get-sources', async (event) => {
    const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
    sources.map(source => ({
      id: source.id,
      name: source.name,
      thumbnail: source.thumbnail.toDataURL()
    }));
    return sources
  });

  ipcMain.on('start-capture', (event, sourceId) => {
    mainWindow.webContents.send('start-webrtc', sourceId);
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

  app.on('start-screen-feed', () => {

  });

  app.on('stop-screenrecording', () => {

  });

  if (!isMac || !isLinux) {
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.setIgnoreMouseEvents(false);
    });
  }
}

app.whenReady().then(async () => {
  const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
  sources.map(source => ({
    id: source.id,
    name: source.name,
    thumbnail: source.thumbnail.toDataURL()
  }));
  console.log(sources)

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
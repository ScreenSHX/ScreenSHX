const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer } = require('electron');
const nativeImage = require('electron').nativeImage;
const path = require('path');
const dgram = require('dgram');
const notifier = require('node-notifier');

const image = nativeImage.createFromPath('icon.png');
let mainWindow;
let mediaStream;
let macPermissions;
let requestScreenRecordingPermission;
let requestFullDiskAccessPermission;
const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';
let PORT = 12345
let BROADCAST_ADDR = "255.255.255.255"



if (isMac) {
  macPermissions = require('node-mac-permissions');
  requestScreenRecordingPermission = macPermissions.requestScreenRecordingPermission;
  requestFullDiskAccessPermission = macPermissions.requestFullDiskAccessPermission;
} else {
  requestScreenRecordingPermission = async () => true;
  requestFullDiskAccessPermission = async () => true;
}

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
    transparent: true,
    trafficLightPosition: { x: 16, y: 12 },
    titleBarOverlay: {
      color: '#272727',
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
  startDeviceDiscoveryServer();

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
    return sources
  });

  ipcMain.on('start-capture', async (event, sourceId) => {
    try {
      const screenRecordingGranted = await requestScreenRecordingPermission();
      const fullDiskAccessGranted = await requestFullDiskAccessPermission();

      if (!screenRecordingGranted) {
        console.error('Screen recording permission was not granted');
        return;
      }
      if (!fullDiskAccessGranted) {
        console.error('Full Disk Access permission was not granted');
        return;
      }

      const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
      const source = sources.find(src => src.id === sourceId);
      const constraints = {
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
          }
        }
      };
      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      mainWindow.webContents.send('start-webrtc', mediaStream);
    } catch (error) {
      console.error('Error starting capture:', error);
    }
  });

  ipcMain.on('destroy-screenshare-session', () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
      console.log('Screenshare session has been destroyed');
    } else {
      console.log('No active screenshare session to destroy');
    }
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


function startDeviceDiscoveryServer() {
  const server = dgram.createSocket('udp4');
  
  server.on('message', (msg, rinfo) => {
    try {
      const devices = JSON.parse(msg.toString());
      console.log(`Received message from ${rinfo.address}:${rinfo.port}`);
      console.log('Devices discovered:', devices);

      // Send the discovered devices back to the main window (assuming Electron)
      if (mainWindow) {
        mainWindow.webContents.send('devices-discovered', devices);
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
  });

  server.bind(PORT, () => {
    server.setBroadcast(true);
    console.log('Device discovery server started.');
  });
}

app.whenReady().then(() => {
  createWindow();
  app.setAppUserModelId('com.screenshx');
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});
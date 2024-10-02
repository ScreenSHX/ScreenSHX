const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  notify: (noteTitle, message) => {
    ipcRenderer.send('notify', noteTitle, message);
  },
  windowControls: (action) => {
    ipcRenderer.send('window-controls', action);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  getSources: () => ipcRenderer.invoke('get-sources'),
  startCapture: (sourceId) => {
    ipcRenderer.send('start-capture', sourceId);
  },
  onFullscreenStatusChange: (callback) => {
    ipcRenderer.on('fullscreen-status', (event, isFullscreen) => {
      callback(isFullscreen);
    });
  },
  onPlatformInfo: (callback) => {
    ipcRenderer.on('platform-info', (event, platform) => {
      callback(platform);
    });
  },
  startFeed: (sourceId) => ipcRenderer.send('start-screen-feed', sourceId)
});
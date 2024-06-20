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
  }
});

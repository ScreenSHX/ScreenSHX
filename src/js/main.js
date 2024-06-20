document.getElementById('minimize-btn').addEventListener('click', () => {
    window.electron.send('window-controls', 'minimize');
  });
  
  document.getElementById('maximize-btn').addEventListener('click', () => {
    window.electron.send('window-controls', 'maximize');
  });
  
  document.getElementById('close-btn').addEventListener('click', () => {
    window.electron.send('window-controls', 'close');
  });
  
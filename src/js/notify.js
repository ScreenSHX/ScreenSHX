document.getElementById('notifytest').addEventListener('click', () => {
    window.electron.notify('Notification Title', 'Hello world!');
  });
  
document.addEventListener('DOMContentLoaded', () => {
    let offsetX = 0;
    let offsetY = 0;
  
    const handleDrag = (event) => {
      const newX = event.screenX - offsetX;
      const newY = event.screenY - offsetY;
      window.electron.send('drag-window', newX, newY);
    };
 
    document.getElementById('header').addEventListener('mousedown', (event) => {
      offsetX = event.screenX;
      offsetY = event.screenY;
  
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleDrag);
      });
    });
  });
  
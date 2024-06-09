fetch('http://localhost/update-config/bomb', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: `
    {
      "test": "admin"
    }`,
  }),
})
.then(response => {
  if (response.ok) {
    console.log('File updated successfully');
  } else {
    console.error('Error updating file');
  }
})
.catch(error => {
  console.error('Error:', error);
});


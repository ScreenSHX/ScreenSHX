const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'www')));

app.post('/update-config/:name', (req, res) => {
    const { name } = req.params;
    const filePath = path.join(__dirname, '..', 'config', `${name}.json`);

    // Ensure the directory exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        // Convert the incoming JSON data to a string
        const fileData = JSON.stringify(req.body, null, 2);

        // Write the stringified data to the file
        fs.writeFile(filePath, fileData, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Error writing to file');
            }
            console.log('File updated successfully');
            res.send('File updated successfully');
        });
    });
});

app.get('/config/:name', (req, res) => {
    const { name } = req.params;
    const filePath = path.join(__dirname, '..', 'config', `${name}.json`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Error reading file');
            }
            res.json(JSON.parse(data));
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is binded to 0.0.0.0:${PORT}`);
});


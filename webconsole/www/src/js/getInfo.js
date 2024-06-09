document.addEventListener('DOMContentLoaded', (event) => {
    let fileData;

    function fetchFiles() {
        return fetch('http://127.0.0.1/config/roomConfig')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                fileData = data;
                displayDevices(fileData.devices);
            })
            .catch(error => {
                console.error('Error fetching configuration:', error);
            });
    }

    function displayDevices(devices) {
        const fileContainer = document.getElementById('file-container');
        fileContainer.innerHTML = '';
        const deviceList = document.createElement('div');
        
        devices.forEach(device => {
            const deviceElem = document.createElement('div');
            deviceElem.classList.add('cursor-pointer', 'include-block', 'bg-gray-800', 'rounded-lg', 'p-4', 'shadow-lg', 'mb-3', 'hover:text-underline');
            deviceElem.addEventListener("click", function() {
                openEditModal(device);
            });
            deviceElem.innerHTML = `
                <div class="group">
                    <div class="flex justify-between items-center">
                        <p id="name" class="text-gray-100 font-semibold text-lg text-primary-500">${device.name}</p>
                        <span class="text-gray-500">${device.assgnedRoom}</span>
                    </div>
                    <div class="text-gray-400">
                        <p>IP Address: ${device.networking.ipAddress}</p>
                        <p>MAC Address: ${device.networking.macAddress}</p>
                        <p>Bus Name: ${device.networking.busName}</p>
                        <p>Proxy: ${device.networking.proxy}</p>
                        <p>Preferred DNS: ${device.networking.prefDns}</p>
                    </div>
                </div>
            `;
            deviceList.appendChild(deviceElem);
        });
        
        fileContainer.appendChild(deviceList);
    }

    function openEditModal(device) {
        const modal = document.getElementById('edit-modal');
        modal.style.display = "block";
        document.getElementById('deviceName').value = device.name;
        document.getElementById('assignedRoom').value = device.assgnedRoom;
        document.getElementById('ipAddress').value = device.networking.ipAddress;
        document.getElementById('macAddress').value = device.networking.macAddress;
        document.getElementById('busName').value = device.networking.busName;
        document.getElementById('proxy').checked = device.networking.proxy;
        document.getElementById('prefDns').value = device.networking.prefDns;
        modal.currentDevice = device;
    }
    document.querySelector('.close-button').addEventListener('click', function() {
        document.getElementById('edit-modal').style.display = "none";
    });
    
    document.querySelector('.cancel-button').addEventListener('click', function() {
        document.getElementById('edit-modal').style.display = "none";
    });
    
    document.getElementById('edit-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const modal = document.getElementById('edit-modal');
        const device = modal.currentDevice;
        if (!device) {
            console.error('Device is undefined');
            return;
        }
        device.name = document.getElementById('deviceName').value;
        device.assgnedRoom = document.getElementById('assignedRoom').value;
        device.networking.ipAddress = document.getElementById('ipAddress').value;
        device.networking.macAddress = document.getElementById('macAddress').value;
        device.networking.busName = document.getElementById('busName').value;
        device.networking.proxy = document.getElementById('proxy').checked;
        device.networking.prefDns = document.getElementById('prefDns').value;
        fetch(`http://127.0.0.1/update-config/roomConfig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
            document.getElementById('edit-modal').style.display = "none";
            fetchFiles();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    fetchFiles();
});

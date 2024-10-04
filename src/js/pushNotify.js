function notify(titleName, notificationBody) {
    console.log(`Sending notification of head ${titleName} with body name ${notificationBody}.`)
    window.electron.notify(titleName, notificationBody)
}
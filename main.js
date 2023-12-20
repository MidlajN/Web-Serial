import './style.css'
import { requestSerialPort, closeSerialPort, writeSerial, gcodeToText } from './serial.js'

// getSerial(document.getElementById('serial'))

document.getElementById('serial').addEventListener('click', () => {
    requestSerialPort().then(() => {
        document.getElementById('serial').style.display = 'none';
        document.getElementById('disconnect').style.display = 'block';
    }).catch((e) => {
        console.log(e)
    })
})

document.getElementById('disconnect').addEventListener('click', () => {
    closeSerialPort().then(() => {
        document.getElementById('serial').style.display = 'block';
        document.getElementById('disconnect').style.display = 'none';
    })
})


document.getElementById('upload-gcode').addEventListener('click', () => {
    gcodeToText(document.getElementById('gcode-input'))
})
document.getElementById('toggle').addEventListener('click', writeSerial)
import './style.css'
import { requestSerialPort, closeSerialPort, writeSerial } from './serial.js'

// getSerial(document.getElementById('serial'))

document.getElementById('serial').addEventListener('click', () => {
    requestSerialPort().then(() => {
        setTimeout(() => {
            document.getElementById('serial').style.display = 'none';
          }, 100);
    }).catch((e) => {
        console.log(e)
    })
})
document.getElementById('disconnect').addEventListener('click', closeSerialPort)
document.getElementById('toggle').addEventListener('click', writeSerial)
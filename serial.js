/**
 * Retrieves the serial port for the given element and listens for data from the serial device.
 *
 * @param {Element} element - The element to attach the click event listener to.
 * @return {void}
 */

let port;
let reader;

export const requestSerialPort = async () => {
  port = await navigator.serial.requestPort();
  const { usbProductId, usbVendorId } = port.getInfo();
  console.log(usbProductId, usbVendorId)
  await port.open({ baudRate: 9600 })
  console.log('Port opened successfully >>>>', port);


  while (port.readable) {
    reader = port.readable.getReader();
    
    let receivedText = ''
    // Listen to data coming from the serial device.
    while (true) {
      const { value, done } = await reader.read();
      if (done) {

        // Allow the serial port to be closed later.
        reader.releaseLock();
        break;
      }
      // value is a Uint8Array.
      const decoder = new TextDecoder();
      const text = decoder.decode(value);

      // Append the received text to the accumulated text.
      receivedText += text;

      const newlineIndex = receivedText.indexOf('\n');
      if (newlineIndex !== -1) {
        // Extract the complete message.
        const completeMessage = receivedText.substring(0, newlineIndex + 1);
    
        // Process the complete message as needed (e.g., print, handle, etc.).
        console.log(completeMessage);
    
        // Remove the processed message from the accumulated text.
        receivedText = receivedText.substring(newlineIndex + 1);
      }
      
    } 
  }
};

export const closeSerialPort = async() => {
  if (port) {
    await reader.releaseLock();
    await port.close();
    console.log('Port closed successfully >>>>', port);
  }
};

let isToggled = true;

export async function writeSerial() {
  const encoder = new TextEncoder();
  const writer = port.writable.getWriter();

  // Toggle between '1' and '0'
  const dataToSend = isToggled ? '1' : '0';
  isToggled = !isToggled;

  await writer.write(encoder.encode(dataToSend));
  writer.releaseLock();
}

async function connectDevice() {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "FitnessBand" }],
      optionalServices: [
        '00001234-0000-1000-8000-00805F9B34FB', // Fitness
        '0000180F-0000-1000-8000-00805F9B34FB',  // Battery
        '00001800-0000-1000-8000-00805F9B34FB'   // Generic Access
      ]
    });

    const server = await device.gatt.connect();
    
    // Get all services
    const fitnessService = await server.getPrimaryService('00001234-0000-1000-8000-00805F9B34FB');
    const batteryService = await server.getPrimaryService('0000180F-0000-1000-8000-00805F9B34FB');

    // Get characteristics
    const stepsChar = await fitnessService.getCharacteristic('0000ABCD-0000-1000-8000-00805F9B34FB');
    const bikeChar = await fitnessService.getCharacteristic('0000WXYZ-0000-1000-8000-00805F9B34FB');
    const batteryChar = await batteryService.getCharacteristic('00002A19-0000-1000-8000-00805F9B34FB');
    const powerChar = await fitnessService.getCharacteristic('0000FFF1-0000-1000-8000-00805F9B34FB');
  }
  // ... rest of the code ...
}
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
// Register service worker at the end of <script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker registered'));
}

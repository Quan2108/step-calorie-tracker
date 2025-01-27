// Constants for BLE UUIDs
const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const STEPS_CHAR_UUID = "87654321-4321-4321-4321-0987654321ab";
const CONTROL_CHAR_UUID = "11223344-5566-7788-99aa-bbccddeeff00";
const BATTERY_CHAR_UUID = "22334455-6677-8899-aabb-ccddeeff1122";

// DOM Elements
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const ageInput = document.getElementById("age");
const stepsDisplay = document.getElementById("steps");
const cyclingDisplay = document.getElementById("cycling");
const caloriesDisplay = document.getElementById("calories");
const batteryDisplay = document.getElementById("battery");
const historyDisplay = document.getElementById("history");

let device, server, stepsChar, controlChar, batteryChar;

// Connect to Wristband
document.getElementById("connect").addEventListener("click", async () => {
  try {
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [SERVICE_UUID],
    });
    server = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    stepsChar = await service.getCharacteristic(STEPS_CHAR_UUID);
    controlChar = await service.getCharacteristic(CONTROL_CHAR_UUID);
    batteryChar = await service.getCharacteristic(BATTERY_CHAR_UUID);

    // Start Notifications
    stepsChar.startNotifications();
    stepsChar.addEventListener("characteristicvaluechanged", handleData);

    alert("Connected to Wristband!");
  } catch (error) {
    console.error("Error connecting to wristband:", error);
  }
});

// Handle Data Updates
function handleData(event) {
  const data = new TextDecoder().decode(event.target.value);
  const [steps, cycling, battery] = data.split(",");
  stepsDisplay.textContent = steps;
  cyclingDisplay.textContent = cycling;
  batteryDisplay.textContent = battery;

  // Calculate Calories
  const weight = parseFloat(weightInput.value) || 0;
  const calories = (parseInt(steps) * 0.04 + parseFloat(cycling) * 30) * weight / 70;
  caloriesDisplay.textContent = calories.toFixed(2);

  // Save History
  const date = new Date().toLocaleDateString();
  localStorage.setItem(date, JSON.stringify({ steps, cycling, calories }));
  updateHistory();
}

// Update History
function updateHistory() {
  historyDisplay.innerHTML = "";
  for (const [date, data] of Object.entries(localStorage)) {
    const { steps, cycling, calories } = JSON.parse(data);
    historyDisplay.innerHTML += `<p>${date}: Steps: ${steps}, Cycling: ${cycling}, Calories: ${calories}</p>`;
  }
}

// Toggle Device
document.getElementById("toggleDevice").addEventListener("click", async () => {
  try {
    const command = new TextEncoder().encode("TOGGLE");
    await controlChar.writeValue(command);
    alert("Device Toggled!");
  } catch (error) {
    console.error("Error toggling device:", error);
  }
});

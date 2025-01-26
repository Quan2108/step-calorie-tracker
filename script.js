let height = 170; // Default value
let weight = 70;  // Default value
let age = 25;     // Default value

document.getElementById("connectButton").addEventListener("click", async () => {
  const heightInput = document.getElementById("height").value;
  const weightInput = document.getElementById("weight").value;
  const ageInput = document.getElementById("age").value;

  if (heightInput) height = parseFloat(heightInput);
  if (weightInput) weight = parseFloat(weightInput);
  if (ageInput) age = parseFloat(ageInput);

  alert(`Connecting... Height: ${height} cm, Weight: ${weight} kg, Age: ${age} years`);
  // Connect logic here
});

// Update the UI
function updateUI(steps, cyclingMinutes) {
  const caloriesBurned = calculateCalories(steps, cyclingMinutes);
  document.getElementById("steps").textContent = steps;
  document.getElementById("calories").textContent = caloriesBurned.toFixed(2);
}

// Calculate calories based on activity
function calculateCalories(steps, cyclingMinutes) {
  const stepCalories = steps * 0.04 * weight / 70; // Walking: MET = 3.5
  const cyclingCalories = cyclingMinutes * (8 * 3.5 * weight / 200); // Cycling MET = 8
  return stepCalories + cyclingCalories;
}

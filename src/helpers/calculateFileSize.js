export default function calculateFileSize(speedStr) {
    // Check if the input string can be treated as a number
    var speed = parseFloat(speedStr);
    if (isNaN(speed)) {
      return "Invalid input. Please provide a valid number.";
    }
  
    // Determine the appropriate unit based on the magnitude of the number
    let unit;
    if (speed > 1000) {
      speed /= 1000; // Convert to KB/s
      unit = "Megabit";
    } else {
      unit = "Kilobit";
    }
  
    // Format the result with 2 decimal places
    return `${speed.toFixed(2)} ${unit}`;
  }
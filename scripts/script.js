// Initialize counters
let favoritesCount = 0;
let coinsCount = 100;
let copyCount = 0;
let callHistory = [];

// Update display counters
function updateCounters() {
  document.querySelector(".bg-green-50 .font-bold").textContent =
    favoritesCount;
  document.querySelector(".bg-yellow-50 .font-bold").textContent = coinsCount;
  document.querySelector(
    ".bg-green-600 .text-sm"
  ).textContent = `${copyCount} Copy`;
}

// Update call history display
function updateCallHistory() {
  const historyContainer = document.querySelector(".space-y-4.overflow-y-auto");

  if (callHistory.length === 0) {
    historyContainer.innerHTML =
      '<div class="text-center text-gray-500 inter-font text-sm py-8">No call history yet</div>';
    return;
  }

  historyContainer.innerHTML = callHistory
    .map(
      (call) => `
          <div class="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div class="flex-1">
              <h4 class="inter-font text-sm font-medium text-gray-900">${call.serviceName}</h4>
              <p class="inter-font text-sm text-gray-500">${call.phoneNumber}</p>
            </div>
            <span class="inter-font text-xs text-gray-400">${call.time}</span>
          </div>
        `
    )
    .join("");
}

// Get current time formatted
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

// Heart button functionality
document.querySelectorAll(".heart-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    if (this.classList.contains("favorited")) {
      this.classList.remove("favorited");
      favoritesCount--;
    } else {
      this.classList.add("favorited");
      favoritesCount++;
    }

    updateCounters();
  });
});

// Copy button functionality
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const card = this.closest(".bg-white");
    const phoneNumber = card.querySelector(".text-3xl").innerText;
    const serviceName = card.querySelector(".text-lg").innerText;

    // Copy to clipboard
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        // Show alert
        alert(`📋 ${serviceName} number (${phoneNumber}) copied to clipboard!`);

        // Increase copy count
        copyCount++;
        updateCounters();

        // Visual feedback
        const originalText = this.querySelector("span").textContent;
        this.querySelector("span").textContent = "Copied!";
        setTimeout(() => {
          this.querySelector("span").textContent = originalText;
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy number to clipboard");
      });
  });
});

// Call button functionality
document.querySelectorAll(".call-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Check if user has enough coins
    if (coinsCount < 20) {
      alert("❌ Insufficient coins! You need at least 20 coins to make a call.");
      return;
    }

    const card = this.closest(".bg-white");
    const phoneNumber = card.querySelector(".text-3xl").innerText;
    const serviceName = card.querySelector(".text-lg").innerText;

    // Show alert with service info
    console.log('Service:', `"${serviceName}"`, 'Phone:', `"${phoneNumber}"`);
    alert(`📞 Calling ${serviceName}: ${phoneNumber}`);

    // Deduct coins
    coinsCount -= 20;
    updateCounters();

    // Add to call history
    const callEntry = {
      serviceName: serviceName,
      phoneNumber: phoneNumber,
      time: getCurrentTime(),
    };

    callHistory.unshift(callEntry); // Add to beginning of array
    updateCallHistory();
  });
});

// Clear history button functionality - Fixed selector
document.addEventListener("DOMContentLoaded", function() {
  // More specific selector for the Clear button in the Call History section
  const clearButton = document.querySelector('.flex.items-center.justify-between button');
  
  if (clearButton && clearButton.textContent.trim() === 'Clear') {
    clearButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Clear call history without any popups
      callHistory = [];
      updateCallHistory();
    });
  }
});

// Initialize the display
updateCounters();
updateCallHistory();
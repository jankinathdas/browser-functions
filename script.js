// Helper Functions
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Detect System Details
function detectSystemDetails() {
  const userAgent = navigator.userAgent;
  let os = "Unknown OS";

  if (userAgent.indexOf("Win") !== -1) os = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (userAgent.indexOf("Android") !== -1) os = "Android";
  else if (userAgent.indexOf("iPhone") !== -1) os = "iOS";

  const browser = (() => {
    if (userAgent.indexOf("Firefox") > -1) return "Mozilla Firefox";
    if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Internet";
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1)
      return "Opera";
    if (userAgent.indexOf("Edg") > -1) return "Microsoft Edge";
    if (userAgent.indexOf("Chrome") > -1) return "Google Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Apple Safari";
    return "Unknown Browser";
  })();

  document.getElementById("os").textContent = os;
  document.getElementById("browser").textContent = browser;

  document.getElementById("max-touch-points").textContent =
  navigator?.maxTouchPoints;
}

// Detect Battery Details
async function getBatteryDetails() {
  try {
    if ("getBattery" in navigator) {
      const battery = await navigator.getBattery();
      document.getElementById("battery-level").textContent = `${(
        battery.level * 100
      ).toFixed(0)}%`;
      document.getElementById("charging-status").textContent = battery.charging
        ? "Yes"
        : "No";

      battery.addEventListener("levelchange", () => {
        document.getElementById("battery-level").textContent = `${(
          battery.level * 100
        ).toFixed(0)}%`;
      });

      battery.addEventListener("chargingchange", () => {
        document.getElementById("charging-status").textContent =
          battery.charging ? "Yes" : "No";
      });
    } else {
      document.getElementById("battery-level").textContent = "Not Supported";
      document.getElementById("charging-status").textContent = "N/A";
    }
  } catch (error) {
    document.getElementById("battery-level").textContent = "Not Supported";
    document.getElementById("charging-status").textContent = "N/A";
  }
}

// Detect Browser Details
function detectBrowserDetails() {
  document.getElementById("platform").textContent = navigator.platform;
  document.getElementById("language").textContent = navigator.language;
  document.getElementById("online-status").textContent = navigator.onLine
    ? "Online"
    : "Offline";
  document.getElementById("cookies-enabled").textContent =
    navigator.cookieEnabled ? "Yes" : "No";

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function detectDeviceMotion() {
    
    const updateMotion = debounce((event) => {

            document.getElementById("xlr8-x").textContent =  event?.acceleration?.x ? `${event?.acceleration?.x?.toFixed(2)} m/s2`: "0";
            document.getElementById("xlr8-y").textContent =  event?.acceleration?.y ? `${event?.acceleration?.y?.toFixed(2)} m/s2`: "0";
        
    }, 5);

    window.addEventListener("devicemotion", updateMotion);
}


// Run all functions on load
window.onload = () => {
  detectSystemDetails();
  getBatteryDetails();
  detectBrowserDetails();
  detectDeviceMotion()

 
    
};

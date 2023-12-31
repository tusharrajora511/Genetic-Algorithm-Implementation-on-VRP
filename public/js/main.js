// Graph Variables
const myCanvas = document.getElementById("my-canvas");
const ctx = myCanvas.getContext("2d");
const height = myCanvas.height;
const width = myCanvas.width;
const grid = document.querySelector(".grid");

// Creating grid lines on the canvas
const createGridLines = function () {
  for (let i = 0; i <= 800; i = i + 15) {
    // Verical lines
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 800);

    // Horizontal line
    ctx.moveTo(0, i);
    ctx.lineTo(800, i);

    ctx.strokeStyle = "#BDBDBD";
    ctx.stroke();
  }
};
createGridLines();

// ====================== Reset ================================
const reset = () => {
  ctx.clearRect(0, 0, width, height);

  locationElements.replaceChildren("");
  locations.forEach((location) => {
    // Set another depot instead of the removed one
    if (init) {
      location.depot = true;
      init = false;
    }
    locationElements.prepend(location.createLocation());
  });
};

// DOM Variables
const form = document.querySelector(".container section form");
const x = document.getElementById("x-coordinate");
const y = document.getElementById("y-coordinate");
const locationElements = document.querySelector(
  ".container section .locations"
);
const vehicles = document.getElementById("vehicles");
const solve = document.querySelector(".solutions button");
const vehicleErrorMesg = document.querySelector(".vehicle-error");

let locations = [];

// Set the depot
const setDepot = (e) => {
  if (e.target.classList.contains("location")) {
    locations.forEach((location) => (location.depot = false));

    locations.find((location) => location.id === e.target.id).depot = true;
    reset();
  }
};

// Add Location
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (x.value === "" || y.value === "") return;

  for (let i = 0; i < locations.length; i++)
    if (locations[i].x === x.value && locations[i].y === y.value) return;

  const location = new Location(x.value, y.value);
  locationElements.prepend(location.createLocation());
  locations.push(location);

  x.value = y.value = "";
  x.focus();
});

// Remove Location
const removeLocation = (e) => {
  if (e.target.tagName === "BUTTON") {
    locations = locations.filter((location) => {
      if (location.id !== e.target.parentElement.id) {
        return true;
      }
      if (location.depot) init = true;
      return false;
    });
    reset();
  }
};

// Generate Locations
let init = true;
for (let i = 0; i < 20; i++) {
  const location = new Location(
    Math.floor(Math.random() * 40),
    Math.floor(Math.random() * 20),
    init
  );
  init = false;
  const existing = locations.find(
    (eLocation) => eLocation.x === location.x && eLocation.y === location.y
  );

  // Remove unnecessary duplicates
  if (existing) {
    i--;
    continue;
  }
  locationElements.prepend(location.createLocation());
  locations.push(location);
}
// Draw routes
const drawPath = (from, to, color) => {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo(from.x * 20, from.y * 20);
  ctx.lineTo(to.x * 20, to.y * 20);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
};
// Some colors for multiple vehicles
const colors = [
  "#FF5733",
  "#F8C471",
  "#1ABC9C",
  "#1E8449",
  "#85C1E9",
  "#3498DB",
  "#E74C3C",
  "#8E44AD",
  "#34495E",
  "#EC7063",
  "#A569BD",
  "#16A085",
  "#F39C12",
  "#2C3E50",
  "#D7BDE2",
  "#FF00FF",
  "#800080",
  "#FFFF00",
  "#00FFFF",
  "#008080",
];
// Solve VRP using Genetic Algorithm
solve.addEventListener("click", () => {
  let solutions = [];
  let depot;
  if (vehicles.value == 0) {
    vehicleErrorMesg.classList.remove("hidden");
  } else {
    vehicleErrorMesg.classList.add("hidden");
    const locationsNoDepot = locations.filter((location) => {
      if (location.depot) depot = location;
      return !location.depot;
    });
    // Divide locations for the given vehicles
    for (let i = 0; i < vehicles.value; i++) {
      const range = Math.floor(locationsNoDepot.length / vehicles.value);
      let = pool = locationsNoDepot.slice(range * i, (i + 1) * range);
      if (i + 1 == vehicles.value) {
        pool = locationsNoDepot.slice(range * i);
      }
      ga = new GA(pool, depot, 1, 1, 1000, 100);
      solutions.push(ga.go().pop());
    }
    // Draw routes
    reset();
    createGridLines();
    for (let i = 0; i < solutions.length; i++) {
      const solution = solutions[i].genes;
      for (let j = 1; j < solutions[i].genes.length; j++) {
        if (j === 1) solution[j - 1].createLocation(colors[i % colors.length]);
        solution[j].createLocation(colors[i % colors.length]);
        drawPath(solution[j - 1], solution[j], colors[i % colors.length]);
      }
    }
  }
});

// Enabling nav bar
const solveSection = document.querySelector(".solve-section");
const canvasSection = document.querySelector(".canvas-section");
const locationInputSection = document.querySelector(".location-input-section");
const headerSectionBreak = document.querySelector(".header-section-break");
const locationFiels = document.querySelector(".location-fiels");
const sectionCanvasBreak = document.querySelector(".section-canvas-break");
const amImgBtn = document.querySelector(".am-img");
const graphImg = document.querySelector(".graph-img");

amImgBtn.addEventListener("click", function () {
  solveSection.classList.add("hidden");
  canvasSection.classList.add("hidden");
  sectionCanvasBreak.classList.add("hidden");
  locationInputSection.classList.remove("hidden");
  headerSectionBreak.classList.remove("hidden");
  locationFiels.classList.remove("hidden");
});

graphImg.addEventListener("click", function () {
  solveSection.classList.remove("hidden");
  canvasSection.classList.remove("hidden");
  sectionCanvasBreak.classList.remove("hidden");
  locationInputSection.classList.add("hidden");
  headerSectionBreak.classList.add("hidden");
  locationFiels.classList.add("hidden");
});

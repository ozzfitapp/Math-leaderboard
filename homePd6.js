// homePd6.js

function showLeaderboard(type) {
  document.getElementById("dailyLeaderboard").style.display = "none";
  document.getElementById("weeklyLeaderboard").style.display = "none";
  document.getElementById("overallLeaderboard").style.display = "none";
  document.getElementById("weeklyEntriesContainer").style.display = "none";

  if (type === "daily") {
    document.getElementById("dailyLeaderboard").style.display = "block";
  } else if (type === "weekly") {
    document.getElementById("weeklyLeaderboard").style.display = "block";
  } else if (type === "overall") {
    document.getElementById("overallLeaderboard").style.display = "block";
  }
}

function toggleWeeklyEntries() {
  const container = document.getElementById("weeklyEntriesContainer");
  if (container.style.display === "none" || container.style.display === "") {
    container.style.display = "block";
    populateWeeklyEntries();
  } else {
    container.style.display = "none";
  }
}

function updateDisplay() {
  const students = JSON.parse(localStorage.getItem("studentsPd6")) || {};
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd6")) || {};

  // Convert the object to an array of [name, points] pairs
  const studentArray = Object.entries(students);

  // Sort the array by points in descending order for overall leaderboard
  studentArray.sort((a, b) => b[1] - a[1]);

  // Clear existing display
  document.getElementById("overallStudents").innerHTML = "";
  document.getElementById("dailyStudents").innerHTML = "";
  document.getElementById("weeklyStudents").innerHTML = "";

  // Populate overall leaderboard
  studentArray.forEach(([name, points], index) => {
    document.getElementById("overallStudents").innerHTML += `<p>${
      index + 1
    }. ${name}: ${points} points</p>`;
  });

  // Populate daily and weekly leaderboards
  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  const startOfWeek = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
  )
    .toISOString()
    .split("T")[0]; // Monday of the current week

  const dailyPoints = {};
  const weeklyPoints = {};

  for (const date in weeklyEntries) {
    for (const student in weeklyEntries[date]) {
      if (!weeklyPoints[student]) weeklyPoints[student] = 0;
      if (!dailyPoints[student]) dailyPoints[student] = 0;
      weeklyPoints[student] += weeklyEntries[date][student];
      if (date === today) {
        dailyPoints[student] += weeklyEntries[date][student];
      }
    }
  }

  const dailyArray = Object.entries(dailyPoints).sort((a, b) => b[1] - a[1]);
  const weeklyArray = Object.entries(weeklyPoints).sort((a, b) => b[1] - a[1]);

  // Populate daily leaderboard
  dailyArray.forEach(([name, points], index) => {
    document.getElementById("dailyStudents").innerHTML += `<p>${
      index + 1
    }. ${name}: ${points} points</p>`;
  });

  // Populate weekly leaderboard
  weeklyArray.forEach(([name, points], index) => {
    document.getElementById("weeklyStudents").innerHTML += `<p>${
      index + 1
    }. ${name}: ${points} points</p>`;
  });
}

function populateWeeklyEntries() {
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd6")) || {};
  const weeklyEntriesContainer = document.getElementById(
    "weeklyEntriesDisplay"
  );
  const today = new Date();
  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1)
  )
    .toISOString()
    .split("T")[0]; // Monday of the current week

  weeklyEntriesContainer.innerHTML = "";

  // Sort the dates in descending order
  const sortedDates = Object.keys(weeklyEntries).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  sortedDates.forEach((date) => {
    if (date >= startOfWeek) {
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const entryDate = document.createElement("div");
      entryDate.innerHTML = `<h3>Entries for ${formattedDate}</h3>`;
      for (const student in weeklyEntries[date]) {
        const entry = document.createElement("p");
        entry.textContent = `${student}: ${weeklyEntries[date][student]} points`;
        entryDate.appendChild(entry);
      }
      weeklyEntriesContainer.appendChild(entryDate);
    }
  });
}

// Initialize page
updateDisplay();

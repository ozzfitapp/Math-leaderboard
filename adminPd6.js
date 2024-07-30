// adminPd6.js

const studentsPd6 = JSON.parse(localStorage.getItem("studentsPd6")) || {};
const weeklyEntriesPd6 =
  JSON.parse(localStorage.getItem("weeklyEntriesPd6")) || {};

function populateStudentListPd6() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = ""; // Clear existing options

  for (const student in studentsPd6) {
    const option = document.createElement("option");
    option.value = student;
    option.textContent = student;
    studentList.appendChild(option);
  }
}

function updateLocalStoragePd6() {
  localStorage.setItem("studentsPd6", JSON.stringify(studentsPd6));
  localStorage.setItem("weeklyEntriesPd6", JSON.stringify(weeklyEntriesPd6));
}

function awardPointsPd6() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;
  const points = parseInt(document.getElementById("pointsAmount").value, 10);

  if (isNaN(points) || points <= 0) {
    alert("Please enter a valid number of points.");
    return;
  }

  const date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    if (!studentsPd6[name]) studentsPd6[name] = 0;
    studentsPd6[name] += points;

    // Log the entry
    if (!weeklyEntriesPd6[date]) weeklyEntriesPd6[date] = {};
    if (!weeklyEntriesPd6[date][name]) weeklyEntriesPd6[date][name] = 0;
    weeklyEntriesPd6[date][name] += points;
  });

  updateLocalStoragePd6();
  populateStudentListPd6(); // Update list to reflect changes
  populateWeeklyEntriesPd6(); // Update weekly entries display
}

function deductPointsPd6() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;
  const points = parseInt(document.getElementById("pointsAmount").value, 10);

  if (isNaN(points) || points <= 0) {
    alert("Please enter a valid number of points.");
    return;
  }

  const date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    if (!studentsPd6[name]) studentsPd6[name] = 0;
    studentsPd6[name] -= points;

    // Log the entry
    if (!weeklyEntriesPd6[date]) weeklyEntriesPd6[date] = {};
    if (!weeklyEntriesPd6[date][name]) weeklyEntriesPd6[date][name] = 0;
    weeklyEntriesPd6[date][name] -= points;
  });

  updateLocalStoragePd6();
  populateStudentListPd6(); // Update list to reflect changes
  populateWeeklyEntriesPd6(); // Update weekly entries display
}

function addStudentPd6() {
  const newName = document.getElementById("newStudentName").value.trim();

  if (newName && !studentsPd6[newName]) {
    studentsPd6[newName] = 0;
    updateLocalStoragePd6();
    populateStudentListPd6(); // Update list to include the new student
    clearAddStudentInputPd6();
  } else if (studentsPd6[newName]) {
    alert("Student already exists.");
  } else {
    alert("Please enter a valid name.");
  }
}

function removeSelectedStudentsPd6() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    delete studentsPd6[name];
    // Also remove from weeklyEntries
    for (const date in weeklyEntriesPd6) {
      delete weeklyEntriesPd6[date][name];
    }
  });

  updateLocalStoragePd6();
  populateStudentListPd6(); // Update list to remove the deleted students
  populateWeeklyEntriesPd6(); // Update weekly entries display
}

function clearAddStudentInputPd6() {
  document.getElementById("newStudentName").value = "";
}

function populateWeeklyEntriesPd6() {
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd6")) || {};
  const weeklyEntriesContainer = document.getElementById(
    "weeklyEntriesDisplayPd6"
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
      const entryDate = document.createElement("div");
      entryDate.innerHTML = `<h3>Entries for ${date}</h3>`;
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
populateStudentListPd6();
populateWeeklyEntriesPd6();

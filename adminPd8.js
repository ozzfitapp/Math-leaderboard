// adminPd8.js

const studentsPd8 = JSON.parse(localStorage.getItem("studentsPd8")) || {};
const weeklyEntriesPd8 =
  JSON.parse(localStorage.getItem("weeklyEntriesPd8")) || {};

function populateStudentListPd8() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = ""; // Clear existing options

  for (const student in studentsPd8) {
    const option = document.createElement("option");
    option.value = student;
    option.textContent = student;
    studentList.appendChild(option);
  }
}

function updateLocalStoragePd8() {
  localStorage.setItem("studentsPd8", JSON.stringify(studentsPd8));
  localStorage.setItem("weeklyEntriesPd8", JSON.stringify(weeklyEntriesPd8));
}

function awardPointsPd8() {
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
    if (!studentsPd8[name]) studentsPd8[name] = 0;
    studentsPd8[name] += points;

    // Log the entry
    if (!weeklyEntriesPd8[date]) weeklyEntriesPd8[date] = {};
    if (!weeklyEntriesPd8[date][name]) weeklyEntriesPd8[date][name] = 0;
    weeklyEntriesPd8[date][name] += points;
  });

  updateLocalStoragePd8();
  populateStudentListPd8(); // Update list to reflect changes
  populateWeeklyEntriesPd8(); // Update weekly entries display
}

function deductPointsPd8() {
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
    if (!studentsPd8[name]) studentsPd8[name] = 0;
    studentsPd8[name] -= points;

    // Log the entry
    if (!weeklyEntriesPd8[date]) weeklyEntriesPd8[date] = {};
    if (!weeklyEntriesPd8[date][name]) weeklyEntriesPd8[date][name] = 0;
    weeklyEntriesPd8[date][name] -= points;
  });

  updateLocalStoragePd8();
  populateStudentListPd8(); // Update list to reflect changes
  populateWeeklyEntriesPd8(); // Update weekly entries display
}

function addStudentPd8() {
  const newName = document.getElementById("newStudentName").value.trim();

  if (newName && !studentsPd8[newName]) {
    studentsPd8[newName] = 0;
    updateLocalStoragePd8();
    populateStudentListPd8(); // Update list to include the new student
    clearAddStudentInputPd8();
  } else if (studentsPd8[newName]) {
    alert("Student already exists.");
  } else {
    alert("Please enter a valid name.");
  }
}

function removeSelectedStudentsPd8() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    delete studentsPd8[name];
    // Also remove from weeklyEntries
    for (const date in weeklyEntriesPd8) {
      delete weeklyEntriesPd8[date][name];
    }
  });

  updateLocalStoragePd8();
  populateStudentListPd8(); // Update list to remove the deleted students
  populateWeeklyEntriesPd8(); // Update weekly entries display
}

function clearAddStudentInputPd8() {
  document.getElementById("newStudentName").value = "";
}

function populateWeeklyEntriesPd8() {
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd8")) || {};
  const weeklyEntriesContainer = document.getElementById(
    "weeklyEntriesDisplayPd8"
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
populateStudentListPd8();
populateWeeklyEntriesPd8();

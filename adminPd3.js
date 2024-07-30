// adminPd3.js

const studentsPd3 = JSON.parse(localStorage.getItem("studentsPd3")) || {};
const weeklyEntriesPd3 =
  JSON.parse(localStorage.getItem("weeklyEntriesPd3")) || {};

function populateStudentListPd3() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = ""; // Clear existing options

  for (const student in studentsPd3) {
    const option = document.createElement("option");
    option.value = student;
    option.textContent = student;
    studentList.appendChild(option);
  }
}

function updateLocalStoragePd3() {
  localStorage.setItem("studentsPd3", JSON.stringify(studentsPd3));
  localStorage.setItem("weeklyEntriesPd3", JSON.stringify(weeklyEntriesPd3));
}

function awardPointsPd3() {
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
    if (!studentsPd3[name]) studentsPd3[name] = 0;
    studentsPd3[name] += points;

    // Log the entry
    if (!weeklyEntriesPd3[date]) weeklyEntriesPd3[date] = {};
    if (!weeklyEntriesPd3[date][name]) weeklyEntriesPd3[date][name] = 0;
    weeklyEntriesPd3[date][name] += points;
  });

  updateLocalStoragePd3();
  populateStudentListPd3(); // Update list to reflect changes
  populateWeeklyEntriesPd3(); // Update weekly entries display
}

function deductPointsPd3() {
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
    if (!studentsPd3[name]) studentsPd3[name] = 0;
    studentsPd3[name] -= points;

    // Log the entry
    if (!weeklyEntriesPd3[date]) weeklyEntriesPd3[date] = {};
    if (!weeklyEntriesPd3[date][name]) weeklyEntriesPd3[date][name] = 0;
    weeklyEntriesPd3[date][name] -= points;
  });

  updateLocalStoragePd3();
  populateStudentListPd3(); // Update list to reflect changes
  populateWeeklyEntriesPd3(); // Update weekly entries display
}

function addStudentPd3() {
  const newName = document.getElementById("newStudentName").value.trim();

  if (newName && !studentsPd3[newName]) {
    studentsPd3[newName] = 0;
    updateLocalStoragePd3();
    populateStudentListPd3(); // Update list to include the new student
    clearAddStudentInputPd3();
  } else if (studentsPd3[newName]) {
    alert("Student already exists.");
  } else {
    alert("Please enter a valid name.");
  }
}

function removeSelectedStudentsPd3() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    delete studentsPd3[name];
    // Also remove from weeklyEntries
    for (const date in weeklyEntriesPd3) {
      delete weeklyEntriesPd3[date][name];
    }
  });

  updateLocalStoragePd3();
  populateStudentListPd3(); // Update list to remove the deleted students
  populateWeeklyEntriesPd3(); // Update weekly entries display
}

function clearAddStudentInputPd3() {
  document.getElementById("newStudentName").value = "";
}

function populateWeeklyEntriesPd3() {
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd3")) || {};
  const weeklyEntriesContainer = document.getElementById(
    "weeklyEntriesDisplayPd3"
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
populateStudentListPd3();
populateWeeklyEntriesPd3();

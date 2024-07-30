// adminPd4.js

const studentsPd4 = JSON.parse(localStorage.getItem("studentsPd4")) || {};
const weeklyEntriesPd4 =
  JSON.parse(localStorage.getItem("weeklyEntriesPd4")) || {};

function populateStudentListPd4() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = ""; // Clear existing options

  for (const student in studentsPd4) {
    const option = document.createElement("option");
    option.value = student;
    option.textContent = student;
    studentList.appendChild(option);
  }
}

function updateLocalStoragePd4() {
  localStorage.setItem("studentsPd4", JSON.stringify(studentsPd4));
  localStorage.setItem("weeklyEntriesPd4", JSON.stringify(weeklyEntriesPd4));
}

function awardPointsPd4() {
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
    if (!studentsPd4[name]) studentsPd4[name] = 0;
    studentsPd4[name] += points;

    // Log the entry
    if (!weeklyEntriesPd4[date]) weeklyEntriesPd4[date] = {};
    if (!weeklyEntriesPd4[date][name]) weeklyEntriesPd4[date][name] = 0;
    weeklyEntriesPd4[date][name] += points;
  });

  updateLocalStoragePd4();
  populateStudentListPd4(); // Update list to reflect changes
  populateWeeklyEntriesPd4(); // Update weekly entries display
}

function deductPointsPd4() {
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
    if (!studentsPd4[name]) studentsPd4[name] = 0;
    studentsPd4[name] -= points;

    // Log the entry
    if (!weeklyEntriesPd4[date]) weeklyEntriesPd4[date] = {};
    if (!weeklyEntriesPd4[date][name]) weeklyEntriesPd4[date][name] = 0;
    weeklyEntriesPd4[date][name] -= points;
  });

  updateLocalStoragePd4();
  populateStudentListPd4(); // Update list to reflect changes
  populateWeeklyEntriesPd4(); // Update weekly entries display
}

function addStudentPd4() {
  const newName = document.getElementById("newStudentName").value.trim();

  if (newName && !studentsPd4[newName]) {
    studentsPd4[newName] = 0;
    updateLocalStoragePd4();
    populateStudentListPd4(); // Update list to include the new student
    clearAddStudentInputPd4();
  } else if (studentsPd4[newName]) {
    alert("Student already exists.");
  } else {
    alert("Please enter a valid name.");
  }
}

function removeSelectedStudentsPd4() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    delete studentsPd4[name];
    // Also remove from weeklyEntries
    for (const date in weeklyEntriesPd4) {
      delete weeklyEntriesPd4[date][name];
    }
  });

  updateLocalStoragePd4();
  populateStudentListPd4(); // Update list to remove the deleted students
  populateWeeklyEntriesPd4(); // Update weekly entries display
}

function clearAddStudentInputPd4() {
  document.getElementById("newStudentName").value = "";
}

function populateWeeklyEntriesPd4() {
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd4")) || {};
  const weeklyEntriesContainer = document.getElementById(
    "weeklyEntriesDisplayPd4"
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
populateStudentListPd4();
populateWeeklyEntriesPd4();

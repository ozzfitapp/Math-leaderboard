// adminPd2.js

const studentsPd2 = JSON.parse(localStorage.getItem("studentsPd2")) || {};
const weeklyEntriesPd2 =
  JSON.parse(localStorage.getItem("weeklyEntriesPd2")) || {};

function populateStudentListPd2() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = ""; // Clear existing options

  for (const student in studentsPd2) {
    const option = document.createElement("option");
    option.value = student;
    option.textContent = student;
    studentList.appendChild(option);
  }
}

function updateLocalStoragePd2() {
  localStorage.setItem("studentsPd2", JSON.stringify(studentsPd2));
  localStorage.setItem("weeklyEntriesPd2", JSON.stringify(weeklyEntriesPd2));
}

function awardPointsPd2() {
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
    if (!studentsPd2[name]) studentsPd2[name] = 0;
    studentsPd2[name] += points;

    // Log the entry
    if (!weeklyEntriesPd2[date]) weeklyEntriesPd2[date] = {};
    if (!weeklyEntriesPd2[date][name]) weeklyEntriesPd2[date][name] = 0;
    weeklyEntriesPd2[date][name] += points;
  });

  updateLocalStoragePd2();
  populateStudentListPd2(); // Update list to reflect changes
  populateWeeklyEntriesPd2(); // Update weekly entries display
}

function deductPointsPd2() {
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
    if (!studentsPd2[name]) studentsPd2[name] = 0;
    studentsPd2[name] -= points;

    // Log the entry
    if (!weeklyEntriesPd2[date]) weeklyEntriesPd2[date] = {};
    if (!weeklyEntriesPd2[date][name]) weeklyEntriesPd2[date][name] = 0;
    weeklyEntriesPd2[date][name] -= points;
  });

  updateLocalStoragePd2();
  populateStudentListPd2(); // Update list to reflect changes
  populateWeeklyEntriesPd2(); // Update weekly entries display
}

function addStudentPd2() {
  const newName = document.getElementById("newStudentName").value.trim();

  if (newName && !studentsPd2[newName]) {
    studentsPd2[newName] = 0;
    updateLocalStoragePd2();
    populateStudentListPd2(); // Update list to include the new student
    clearAddStudentInputPd2();
  } else if (studentsPd2[newName]) {
    alert("Student already exists.");
  } else {
    alert("Please enter a valid name.");
  }
}

function removeSelectedStudentsPd2() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    delete studentsPd2[name];
    // Also remove from weeklyEntries
    for (const date in weeklyEntriesPd2) {
      delete weeklyEntriesPd2[date][name];
    }
  });

  updateLocalStoragePd2();
  populateStudentListPd2(); // Update list to remove the deleted students
  populateWeeklyEntriesPd2(); // Update weekly entries display
}

function clearAddStudentInputPd2() {
  document.getElementById("newStudentName").value = "";
}

function populateWeeklyEntriesPd2() {
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd2")) || {};
  const weeklyEntriesContainer = document.getElementById(
    "weeklyEntriesDisplayPd2"
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
populateStudentListPd2();
populateWeeklyEntriesPd2();

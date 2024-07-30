const studentsPd1 = JSON.parse(localStorage.getItem("studentsPd1")) || {};
const weeklyEntriesPd1 =
  JSON.parse(localStorage.getItem("weeklyEntriesPd1")) || {};

// Populate the student list dropdown
function populateStudentListPd1() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = ""; // Clear existing options

  for (const student in studentsPd1) {
    const option = document.createElement("option");
    option.value = student;
    option.textContent = student;
    studentList.appendChild(option);
  }
}

// Update local storage with current data
function updateLocalStoragePd1() {
  localStorage.setItem("studentsPd1", JSON.stringify(studentsPd1));
  localStorage.setItem("weeklyEntriesPd1", JSON.stringify(weeklyEntriesPd1));
}

// Award points to selected students
function awardPointsPd1() {
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
    if (!studentsPd1[name]) studentsPd1[name] = 0;
    studentsPd1[name] += points;

    // Log the entry
    if (!weeklyEntriesPd1[date]) weeklyEntriesPd1[date] = {};
    if (!weeklyEntriesPd1[date][name]) weeklyEntriesPd1[date][name] = 0;
    weeklyEntriesPd1[date][name] += points;
  });

  updateLocalStoragePd1();
  populateStudentListPd1(); // Update list to reflect changes
  populateWeeklyEntriesPd1(); // Update weekly entries display
}

// Deduct points from selected students
function deductPointsPd1() {
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
    if (!studentsPd1[name]) studentsPd1[name] = 0;
    studentsPd1[name] -= points;

    // Log the entry
    if (!weeklyEntriesPd1[date]) weeklyEntriesPd1[date] = {};
    if (!weeklyEntriesPd1[date][name]) weeklyEntriesPd1[date][name] = 0;
    weeklyEntriesPd1[date][name] -= points;
  });

  updateLocalStoragePd1();
  populateStudentListPd1(); // Update list to reflect changes
  populateWeeklyEntriesPd1(); // Update weekly entries display
}

// Add a new student
function addStudentPd1() {
  const newName = document.getElementById("newStudentName").value.trim();

  if (newName && !studentsPd1[newName]) {
    studentsPd1[newName] = 0;
    updateLocalStoragePd1();
    populateStudentListPd1(); // Update list to include the new student
    clearAddStudentInputPd1();
  } else if (studentsPd1[newName]) {
    alert("Student already exists.");
  } else {
    alert("Please enter a valid name.");
  }
}

// Remove selected students
function removeSelectedStudentsPd1() {
  const selectedOptions =
    document.getElementById("studentList").selectedOptions;

  Array.from(selectedOptions).forEach((option) => {
    const name = option.value;
    delete studentsPd1[name];
    // Also remove from weeklyEntries
    for (const date in weeklyEntriesPd1) {
      delete weeklyEntriesPd1[date][name];
    }
  });

  updateLocalStoragePd1();
  populateStudentListPd1(); // Update list to remove the deleted students
  populateWeeklyEntriesPd1(); // Update weekly entries display
}

// Clear the input field for adding a new student
function clearAddStudentInputPd1() {
  document.getElementById("newStudentName").value = "";
}

// Populate the weekly entries display
function populateWeeklyEntriesPd1() {
  const weeklyEntries =
    JSON.parse(localStorage.getItem("weeklyEntriesPd1")) || {};
  const weeklyEntriesContainer = document.getElementById(
    "weeklyEntriesDisplayPd1"
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
populateStudentListPd1();
populateWeeklyEntriesPd1();
console.log(JSON.parse(localStorage.getItem("weeklyEntriesPd1")));

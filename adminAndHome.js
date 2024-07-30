document.addEventListener("DOMContentLoaded", () => {
  const studentList = document.getElementById("studentList");
  const newStudentName = document.getElementById("newStudentName");
  const pointsAmount = document.getElementById("pointsAmount");
  const weeklyEntriesContainer = document.getElementById("weeklyEntries");

  // Load existing students for the current period
  loadStudents();

  // Event listeners for buttons
  document
    .querySelector("#studentSelector button")
    .addEventListener("click", removeSelectedStudents);
  document
    .querySelector("#controls button:nth-child(1)")
    .addEventListener("click", awardPoints);
  document
    .querySelector("#controls button:nth-child(2)")
    .addEventListener("click", deductPoints);
  document
    .querySelector("#addStudent button")
    .addEventListener("click", addStudent);

  function loadStudents() {
    // Placeholder function to load students from a data source
    // Replace this with actual data loading logic
    const students = getStudentsFromDatabase(); // Replace with your data retrieval function

    studentList.innerHTML = ""; // Clear the current list
    students.forEach((student) => {
      const option = document.createElement("option");
      option.value = student.id;
      option.textContent = student.name;
      studentList.appendChild(option);
    });
  }

  function getStudentsFromDatabase() {
    // Replace this with actual data retrieval logic
    return [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
    ];
  }

  function addStudent() {
    const name = newStudentName.value.trim();
    if (name) {
      // Add the new student to the database
      // Example function call: addStudentToDatabase(name)
      addStudentToDatabase(name);

      // Refresh the student list
      loadStudents();

      // Clear the input field
      newStudentName.value = "";
    }
  }

  function removeSelectedStudents() {
    const selectedOptions = [...studentList.selectedOptions];
    selectedOptions.forEach((option) => {
      // Remove the student from the database
      // Example function call: removeStudentFromDatabase(option.value)
      removeStudentFromDatabase(option.value);
    });

    // Refresh the student list
    loadStudents();
  }

  function awardPoints() {
    const points = parseInt(pointsAmount.value, 10);
    if (isNaN(points) || points <= 0) {
      alert("Please enter a valid number of points.");
      return;
    }

    // Award points to selected students
    const selectedOptions = [...studentList.selectedOptions];
    selectedOptions.forEach((option) => {
      // Example function call: awardPointsToStudent(option.value, points)
      awardPointsToStudent(option.value, points);
    });

    // Clear the input field
    pointsAmount.value = "";
  }

  function deductPoints() {
    const points = parseInt(pointsAmount.value, 10);
    if (isNaN(points) || points <= 0) {
      alert("Please enter a valid number of points.");
      return;
    }

    // Deduct points from selected students
    const selectedOptions = [...studentList.selectedOptions];
    selectedOptions.forEach((option) => {
      // Example function call: deductPointsFromStudent(option.value, points)
      deductPointsFromStudent(option.value, points);
    });

    // Clear the input field
    pointsAmount.value = "";
  }

  function addStudentToDatabase(name) {
    // Implement the logic to add a student to the database
    console.log(`Adding student: ${name}`);
  }

  function removeStudentFromDatabase(id) {
    // Implement the logic to remove a student from the database
    console.log(`Removing student with ID: ${id}`);
  }

  function awardPointsToStudent(id, points) {
    // Implement the logic to award points to a student
    console.log(`Awarding ${points} points to student with ID: ${id}`);
  }

  function deductPointsFromStudent(id, points) {
    // Implement the logic to deduct points from a student
    console.log(`Deducting ${points} points from student with ID: ${id}`);
  }
});

// List of activities
const activities = [
  "Brush your teeth",
  "Smile",
  "Dance",
  "Clean the house",
  "Read a book",
  "Exercise",
  "Meditate",
  "Cook a meal",
  "Take a walk",
  "Call a friend",
  "Organize your room",
  "Write in a journal",
  "Listen to music",
  "Learn a new skill",
  "Do a puzzle",
  "Play a game",
  "Watch a movie",
  "Do some gardening",
  "Try a new recipe",
  "Paint or draw",
  "Do some stretching",
  "Take deep breaths",
  "Plan your day",
  "Clean your workspace",
  "Drink water",
  "Write a letter",
  "Take a nap",
  "Practice gratitude",
  "Do a random act of kindness",
  "Plan a trip",
  "Declutter a space",
  "Research a topic of interest",
  "Watch a documentary",
  "Do a workout",
  "Try a craft",
  "Take a photo",
  "Read a poem",
  "Do some volunteer work",
  "Create a playlist",
  "Practice mindfulness",
  "Take a bath",
  "Write a story",
  "Play a musical instrument",
  "Watch the sunset",
  "Learn a new language",
  "Do some sewing",
  "Write a to-do list",
  "Take a scenic drive",
  "Reflect on your goals",
];

// Function to shuffle and generate events
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let shuffledActivities = shuffle([...activities]);
let currentIndex = 0;

// Function to display the next event
function displayNextEvent() {
  if (currentIndex >= shuffledActivities.length) {
    shuffledActivities = shuffle([...activities]);
    currentIndex = 0;
  }

  const eventDisplay = document.getElementById("eventDisplay");
  eventDisplay.textContent = shuffledActivities[currentIndex];
  currentIndex++;
}

// Add event listener to the generate button
document
  .getElementById("generateBtn")
  .addEventListener("click", displayNextEvent);

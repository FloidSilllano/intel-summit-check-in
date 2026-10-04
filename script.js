
// Select DOM elements
const form = document.getElementById('checkin-form');
const nameInput = document.getElementById('name-input');
const teamSelect = document.getElementById('team-select');
const greetingDiv = document.getElementById('greeting-message');
const totalCountDisplay = document.getElementById('total-count');
const progressBar = document.getElementById('progress-bar');
const celebrationDiv = document.getElementById('celebration-message');
const attendeeListUl = document.getElementById('attendee-list');

// Team counters display elements
const waterWiseCountDisplay = document.getElementById('water-wise-count');
const netZeroCountDisplay = document.getElementById('net-zero-count');
const renewablesCountDisplay = document.getElementById('renewables-count');

// Goal for the progress bar & celebration
const ATTENDEE_GOAL = 50;

// Load saved data from localStorage (or initialize defaults)
let totalAttendees = parseInt(localStorage.getItem('totalAttendees')) || 0;
let teamCounts = {
    "Water Wise": parseInt(localStorage.getItem('waterWiseCount')) || 0,
    "Net Zero": parseInt(localStorage.getItem('netZeroCount')) || 0,
    "Renewables": parseInt(localStorage.getItem('renewablesCount')) || 0
};
let attendeesArray = JSON.parse(localStorage.getItem('attendeesArray')) || [];

// Initial render on page load
updateUI();

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const team = teamSelect.value;

    if (!name || !team) return;

    // 1. Greet Attendee
    greetingDiv.textContent = `Welcome to the Summit, ${name}! Thanks for supporting Team ${team}.`;

    // 2. Update Counts
    totalAttendees++;
    teamCounts[team]++;

    // Add to attendee list array
    attendeesArray.push({ name, team });

    // Save to localStorage (LevelUp)
    saveData();

    // Update UI elements
    updateUI();

    // Reset form inputs
    nameInput.value = '';
    teamSelect.value = '';
});

function updateUI() {
    // Update Total Attendance
    totalCountDisplay.textContent = totalAttendees;

    // Update Team Counters
    waterWiseCountDisplay.textContent = teamCounts["Water Wise"];
    netZeroCountDisplay.textContent = teamCounts["Net Zero"];
    renewablesCountDisplay.textContent = teamCounts["Renewables"];

    // Update Progress Bar
    const progressPercent = Math.min((totalAttendees / ATTENDEE_GOAL) * 100, 100);
    progressBar.style.width = `${progressPercent}%`;

    // Render Attendee List (LevelUp)
    attendeeListUl.innerHTML = '';
    attendeesArray.forEach(attendee => {
        const li = document.createElement('li');
        li.textContent = `${attendee.name} — Team ${attendee.team}`;
        attendeeListUl.appendChild(li);
    });

    // Check for Goal / Celebration (LevelUp)
    if (totalAttendees >= ATTENDEE_GOAL) {
        let winningTeam = "Water Wise";
        let maxCount = teamCounts["Water Wise"];

        if (teamCounts["Net Zero"] > maxCount) {
            maxCount = teamCounts["Net Zero"];
            winningTeam = "Net Zero";
        }
        if (teamCounts["Renewables"] > maxCount) {
            maxCount = teamCounts["Renewables"];
            winningTeam = "Renewables";
        }

        celebrationDiv.textContent = `🎉 Goal Reached! Congratulations to the winning team: Team ${winningTeam} with ${maxCount} attendees!`;
    } else {
        celebrationDiv.textContent = '';
    }
}

function saveData() {
    localStorage.setItem('totalAttendees', totalAttendees);
    localStorage.setItem('waterWiseCount', teamCounts["Water Wise"]);
    localStorage.setItem('netZeroCount', teamCounts["Net Zero"]);
    localStorage.setItem('renewablesCount', teamCounts["Renewables"]);
    localStorage.setItem('attendeesArray', JSON.stringify(attendeesArray));
}

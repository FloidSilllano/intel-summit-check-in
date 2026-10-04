// Select DOM elements
const form = document.getElementById('check-in-form');
const nameInput = document.getElementById('attendee-name');
const teamSelect = document.getElementById('team-select');
const greetingDiv = document.getElementById('greeting');
const totalCountSpan = document.getElementById('total-count');
const progressBar = document.getElementById('progress-bar');

// Team count elements
const waterWiseCountSpan = document.getElementById('water-wise-count');
const netZeroCountSpan = document.getElementById('net-zero-count');
const renewablesCountSpan = document.getElementById('renewables-count');

// State variables
let totalAttendance = 0;
const goal = 50; // Total goal for the progress bar
let teamCounts = {
    "Team Water Wise": 0,
    "Team Net Zero": 0,
    "Team Renewables": 0
};

// Listen for form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const attendeeName = nameInput.value.trim();
    const selectedTeam = teamSelect.value;

    if (!attendeeName || !selectedTeam) {
        alert('Please enter your name and select a team!');
        return;
    }

    // 1. Update Total Attendance
    totalAttendance++;
    totalCountSpan.textContent = totalAttendance;

    // 2. Update Progress Bar width (%)
    let progressPercentage = (totalAttendance / goal) * 100;
    if (progressPercentage > 100) progressPercentage = 100;
    progressBar.style.width = progressPercentage + '%';

    // 3. Display Personalized Greeting
    greetingDiv.textContent = `Welcome, ${attendeeName} from ${selectedTeam}!`;

    // 4. Update Specific Team Count
    teamCounts[selectedTeam]++;
    if (selectedTeam === "Team Water Wise") {
        waterWiseCountSpan.textContent = teamCounts[selectedTeam];
    } else if (selectedTeam === "Team Net Zero") {
        netZeroCountSpan.textContent = teamCounts[selectedTeam];
    } else if (selectedTeam === "Team Renewables") {
        renewablesCountSpan.textContent = teamCounts[selectedTeam];
    }

    // Clear form inputs
    form.reset();
});

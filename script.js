// Select elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to handle text-to-speech
function speak(text) {
    if (!text) return; // Skip if no text is provided
    console.log("Speaking:", text);
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

// Function to determine the correct greeting based on time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let greeting;
    if (hours >= 0 && hours < 12) {
        greeting = "Good Morning, Sir";
    } else if (hours >= 12 && hours < 16) {
        greeting = "Good Afternoon, Sir";
    } else {
        greeting = "Good Evening, Sir";
    }
    setTimeout(() => speak(greeting), 500); // Delay to ensure speech synthesis is ready
}

// Call wishMe on page load
window.addEventListener('load', () => {
    console.log("Page loaded. Initiating wishMe function...");
    wishMe();
});

// Initialize speech recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.continuous = false;

// Handle recognition result
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    console.log("Heard:", transcript); // Debug log
    takeCommand(transcript);
};

// Start recognition on button click
btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
    console.log("Speech recognition started"); // Debug log
});

// Function to process the recognized command
function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Omkar Sir");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak("The time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString([], { day: 'numeric', month: 'long' });
        speak("Today's date is " + date);
    } else {
        let queryText = message.replace(/chittii/i, ""); // Remove assistant name from search query
        let finalText = "This is what I found on the internet regarding " + queryText;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(queryText)}`, "_blank");
    }
}

// Debug: Check if SpeechSynthesis API is available
if ('speechSynthesis' in window) {
    console.log("Speech Synthesis API is supported.");
} else {
    console.log("Speech Synthesis API is not supported in this browser.");
}

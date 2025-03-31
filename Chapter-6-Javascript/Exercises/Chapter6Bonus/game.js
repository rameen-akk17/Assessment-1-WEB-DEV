// Game variables to keep track of state
let correctColor; // Stores the correct RGB color to guess
let lives; // Number of lives the player has
let score; // Players score
let gameOver = false; // Flag to prevent interactions after game over
let difficulty = 'medium'; // Default difficulty level

// function to generate a random RGB color
function getRandomRGB() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// function to start the game with the selected difficulty
function startGame(selectedDifficulty = 'medium') {
    difficulty = selectedDifficulty;
    
    // Sets lives based on the chosen difficulty level
    if (difficulty === 'easy') {
        lives = 5; // More lives for easier gameplay
    } else if (difficulty === 'medium') {
        lives = 3; // Standard difficulty
    } else {
        lives = 2; // Fewer lives for a harder challenge
    }

    score = 0; // Reset score
    gameOver = false; // Allow interactions again
    
    // Update the UI with the current lives and score
    document.getElementById("result").innerText = `Lives: ${lives} | Score: ${score}`;
    
    generateQuestion(); // Generate the first color question
}

// Function to generate a new color guessing question
function generateQuestion() {
    if (gameOver) return; // Prevent generating new questions if the game is over

    correctColor = getRandomRGB(); // Set the correct color to guess
    document.getElementById("rgbValue").innerText = `Guess: ${correctColor}`;
    
    let optionsContainer = document.getElementById("colorOptions");
    optionsContainer.innerHTML = ""; // Clear previous options
    
    // Determine the number of options based on difficulty
    let optionCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
    let options = [correctColor]; // Include the correct answer
    
    // Generate random incorrect color choices
    for (let i = 1; i < optionCount; i++) {
        options.push(getRandomRGB());
    }
    
    // Shuffle the color options so the correct answer isn't always first
    options = options.sort(() => Math.random() - 0.5);

    // Create color option buttons dynamically
    options.forEach(color => {
        let btn = document.createElement("div");
        btn.classList.add("color-option"); // Assign class for styling
        btn.style.backgroundColor = color; // Set background color to the option
        btn.onclick = () => checkAnswer(color); // Assign click event to check the answer
        optionsContainer.appendChild(btn); // Add button to the container
    });
}

// Function to check if the player's selected color is correct
function checkAnswer(selectedColor) {
    if (gameOver) return; // Stop checking if the game is already over

    if (selectedColor === correctColor) {
        score += 1; // Increase score if the answer is correct
        document.getElementById("result").innerText = `Correct! Score: ${score}`;
        generateQuestion(); // Generate a new question
    } else {
        lives -= 1; // Decrease lives if the answer is wrong
        document.getElementById("result").innerText = `Wrong! Lives left: ${lives}`;
        
        // Check if the player has lost all lives
        if (lives === 0) {
            document.getElementById("result").innerText = `Game Over! Final Score: ${score}`;
            gameOver = true; // Set game over flag
            
            // Disable further interactions by removing click events
            document.querySelectorAll(".color-option").forEach(btn => btn.onclick = null);
        }
    }
}

// Start the game with the default difficulty when the page loads
startGame();
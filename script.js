
const terminal = document.getElementById("terminal");
const robot = document.getElementById("robot");
terminal.innerHTML = '';
terminal.innerHTML += "<br><br><span><b>Welcome:</b> </span>";

const text = " I'm happy you're here! Feel free to check out my robotics projects, and contact me if you'd like to know more.";
let index = 0;

function typeText() {
    if (index < text.length) {
        terminal.innerHTML += text[index];
        index++;
        setTimeout(typeText, 30);
    } else {
        robot.classList.add('move-to-terminal');
        setTimeout(restartText, 2000);  // Delay before restarting the text animation
    }
}

function restartText() {
    terminal.innerHTML = '';
    terminal.innerHTML += "<br><br><span><b>Welcome:</b> </span>";
    index = 0;
    robot.classList.remove('move-to-terminal');
    robot.classList.add('move-back');
    setTimeout(() => {
        robot.classList.remove('move-back');
        typeText();  // Restart the typing animation after robot movement
    }, 1000); // Wait for robot to return before starting the text animation again
}

typeText();


// ***************************************************************
const cards = document.querySelectorAll('.project-card');
let offset = cards[0].offsetWidth;
let cardWidth = cards[0].offsetWidth + 30;
const dotsContainer = document.getElementById('dots');
let maxIndex;
let dotsNum;
if (window.innerWidth <= 768) {
    maxIndex = 1;
    dotsNum = 6;
} else {
    maxIndex = 3;
    dotsNum = 3;
}

const dots = [];

for (let i = 0; i < dotsNum; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
    dots.push(dot);
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dotsNum == 6) {
        dots[currentIndex].classList.add('active');
    }
    else {
        let width = cards[0].offsetWidth + 20;
        dots[Math.floor(Math.abs(offset) / width)].classList.add('active');
    }
}


let currentIndex = 0;
const totalCards = document.querySelectorAll('.project-card').length;

// Function to move project cards left or right
function moveCards(direction) {
    const projectList = document.querySelector('.project-list');


    // Move the list by changing the translateX value based on currentIndex
    if (direction === 'left' && currentIndex > 0) {
        currentIndex--;
        offset += cardWidth;

    } else if (direction === 'right' && currentIndex < totalCards - maxIndex) {
        currentIndex++;
        offset -= cardWidth;
    }
    let moveBy;

    if (window.innerWidth <= 768) {
        moveBy = -currentIndex * (cards[0].offsetWidth) - 20 * currentIndex; // Calculate how much to move

        if (direction === 'left') {
            moveBy = -currentIndex * (cards[0].offsetWidth) - 30 * currentIndex; // Calculate how much to move
        }
        // else {
        //     moveBy = -currentIndex * (cards[0].offsetWidth) + 25; // Calculate how much to move

        // }
    }
    else {
        if (direction === 'right') {
            moveBy = -currentIndex * (cards[0].offsetWidth) - 20;
        } else {
            moveBy = -currentIndex * (cards[0].offsetWidth) + 20;

        }
    }
    projectList.style.transform = `translateX(${moveBy}px)`;
    updateDots()
}

// Function to handle scroll event to move cards left or right
document.querySelector('.project-container').addEventListener('wheel', function (e) {
    const delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta > 0) {
        moveCards('right');
        updateDots();
    } else {
        moveCards('left');
        updateDots();

    }
    e.preventDefault();
});
updateDots();


function flipCard(button) {
    const allCards = document.querySelectorAll('.project-card');
    allCards.forEach(card => {
        card.classList.remove('flipped');
    });

    const card = button.closest('.project-card');
    card.classList.add('flipped');
}

function unflipCard(button) {
    const card = button.closest('.project-card');
    card.classList.remove('flipped');
}


function toggleDetails(button) {
    const details = button.previousElementSibling;
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "inline";
        button.textContent = "less";
    } else {
        details.style.display = "none";
        button.textContent = "more";
    }
}



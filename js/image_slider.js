const carousel = document.getElementById('carousel');
let containers = Array.from(carousel.getElementsByClassName('carousel-image-container'));
let startX;
let endX;
let isDragging = false;
let slideShow;
let isInteracting = false; // Flag to indicate whether the user is interacting with the carousel

// Function to start the slide show
function startSlideShow() {
    slideShow = setInterval(() => {
        if (!isInteracting) { // Only cycle images if the user is not interacting with the carousel
            cycleImages();
        }
    }, 1000); // Change image every 3 seconds
}

// Function to stop the slide show
function stopSlideShow() {
    clearInterval(slideShow);
}

// Start the slide show when the page loads
startSlideShow();

// Function to cycle images
function cycleImages() {
    // Move first image to the end
    carousel.appendChild(containers[0]);
    containers.push(containers.shift());

    // Reset active class
    for (let container of containers) {
        container.classList.remove('active');
    }
    // Set active class on center image
    containers[Math.floor(containers.length / 2)].classList.add('active');

    // Scroll to the active container
    carousel.scrollLeft = containers[Math.floor(containers.length / 2)].offsetLeft - carousel.offsetWidth / 2 + containers[Math.floor(containers.length / 2)].offsetWidth / 2;
}

// Call cycleImages immediately to set the active container on page load
cycleImages();

function cycleImagesForward() {
    isInteracting = true; // Set the flag to true when the user clicks the arrow
    // Move first image to the end
    carousel.appendChild(containers[0]);
    containers.push(containers.shift());

    // Reset active class
    for (let container of containers) {
        container.classList.remove('active');
    }
    // Set active class on center image
    containers[Math.floor(containers.length / 2)].classList.add('active');

    // Scroll to the active container
    carousel.scrollLeft = containers[Math.floor(containers.length / 2)].offsetLeft - carousel.offsetWidth / 2 + containers[Math.floor(containers.length / 2)].offsetWidth / 2;
}

function cycleImagesBackward() {
    isInteracting = true; // Set the flag to true when the user clicks the arrow
    // Move last image to the start
    carousel.insertBefore(containers[containers.length - 1], containers[0]);
    containers.unshift(containers.pop());

    // Reset active class
    for (let container of containers) {
        container.classList.remove('active');
    }
    // Set active class on center image
    containers[Math.floor(containers.length / 2)].classList.add('active');

    // Scroll to the active container
    carousel.scrollLeft = containers[Math.floor(containers.length / 2)].offsetLeft - carousel.offsetWidth / 2 + containers[Math.floor(containers.length / 2)].offsetWidth / 2;
}

// Function to handle the start of a touch or mouse drag
function dragStart(evt) {
    startX = evt.clientX || evt.touches[0].clientX;
    isDragging = true;
}

// Function to handle the end of a touch or mouse drag
function dragEnd(evt) {
    if (!isDragging) {
        return;
    }
    isDragging = false;
    endX = evt.clientX || evt.changedTouches[0].clientX;

    // Compare the start and end positions
    if (startX > endX + 50) {
        cycleImagesForward(); // Swipe left
    } else if (startX + 50 < endX) {
        cycleImagesBackward(); // Swipe right
    }
}

// Stop the slide show when the mouse is over the carousel
carousel.addEventListener('mouseover', () => {
    isInteracting = true; // Set the flag to true when the mouse is over the carousel
    stopSlideShow();
});

// Start the slide show when the mouse leaves the carousel
carousel.addEventListener('mouseout', () => {
    isInteracting = false; // Set the flag to false when the mouse leaves the carousel
    startSlideShow();
});

// Add the event listeners
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('touchend', dragEnd);
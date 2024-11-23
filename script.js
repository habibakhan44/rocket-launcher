const rocket = document.getElementById('rocket');
const progress = document.getElementById('progress');
const instructions = document.getElementById('instructions');
const resetButton = document.getElementById('reset-button');
const destinationText = document.getElementById('destination');

const images = {
    "city-1": './resources/city-1.jpg',
    "forest-1": './resources/forest-1.webp',
    "forest-2": './resources/forest-2.webp',
    "mars": './resources/mars.jpg'
};

const fuelRequirements = {
    "city-1": 20,
    "forest-1": 40,
    "forest-2": 60,
    "mars": 100
};

let progressValue = 0;
let currentDestination = "city-1";
let unlockedDestinations = ["city-1"];


rocket.addEventListener('click', () => {
    const fuelAdded = Math.floor(Math.random() * 10) + 10;
    progressValue = Math.min(progressValue + fuelAdded, 100);
    progress.style.width = `${progressValue}%`;
    instructions.textContent = `Fuel: ${progressValue}%`;

    if (progressValue >= fuelRequirements[currentDestination]) {
        instructions.textContent = `Ready to launch to ${currentDestination}! Click destination.`;
    }
});


function launchRocket() {
    rocket.style.animation = 'launch 2s forwards';
    setTimeout(() => {
        rocket.style.animation = ''; 
    }, 2000);
}


document.querySelectorAll('.btn.btn-primary').forEach((thumb) => {
    thumb.addEventListener('click', () => {
        const destination = thumb.dataset.destination;

        if (!unlockedDestinations.includes(destination)) {
            alert(`You must unlock ${destination} by visiting previous locations!`);
            return;
        }

        if (progressValue < fuelRequirements[destination]) {
            alert(`Insufficient fuel for ${destination}. Fuel required: ${fuelRequirements[destination]}%`);
            return;
        }

        currentDestination = destination;
        progressValue = 0; 
                progress.style.width = '0';
        instructions.textContent = `Welcome to ${destination}! Click the rocket to refuel.`;
        document.body.style.backgroundImage = `url(${images[destination]})`;
        destinationText.textContent = destination.replace('-', ' ').toUpperCase();
        launchRocket();

        
        const destinations = Object.keys(fuelRequirements);
        const nextIndex = destinations.indexOf(destination) + 1;
        if (nextIndex < destinations.length) {
            unlockedDestinations.push(destinations[nextIndex]);
        }
    });
});

resetButton.addEventListener('click', () => {
    progressValue = 0;
    progress.style.width = '0';
    instructions.textContent = 'Click the rocket to fuel up!';
    document.body.style.backgroundImage = `url(${images["city-1"]})`;
    currentDestination = "city-1";
    unlockedDestinations = ["city-1"];
});

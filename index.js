/*** Dark Mode Toggle ***/
let themeButton = document.getElementById('theme-button');

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener('click', toggleDarkMode);


/*** RSVP Form & Modal Handling ***/

// Form Elements
const form = document.getElementById('rsvp-form');
const rsvpButton = document.getElementById('rsvp-button');
const nameInput = document.getElementById('name');
const rinkInput = document.getElementById('rink');
const emailInput = document.getElementById('email');
const participantList = document.querySelector('.rsvp-participants');

// Modal Elements
const modalOverlay = document.getElementById('success-modal-overlay');
const modalMessage = document.getElementById('modal-message');


const addParticipant = (event) => {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // --- Form Validation ---
    let isValid = true;

    // Clear previous errors
    nameInput.classList.remove('error');
    rinkInput.classList.remove('error');
    emailInput.classList.remove('error');

    // Check if name is empty
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        isValid = false;
    }

    // Check if rink is empty
    if (rinkInput.value.trim() === '') {
        rinkInput.classList.add('error');
        isValid = false;
    }

    // Check if email is valid
    if (emailInput.value.trim() === '' || !emailInput.checkValidity()) {
        emailInput.classList.add('error');
        isValid = false;
    }

    // If the form is invalid, stop here
    if (!isValid) {
        return;
    }

    // --- If form IS valid, continue ---

    // 1. Add the participant to the list
    const name = nameInput.value;
    const rink = rinkInput.value;
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `🎟️ ${name} from ${rink} has RSVP'd.`;
    participantList.appendChild(newParticipant);

    // 2. Show the success modal
    showModal(name);

    // 3. Clear the form fields
    form.reset();
}

const showModal = (name) => {
    // Set the personalized message
    modalMessage.textContent = `Thank you, ${name}! Your spot is saved. Get ready to level up!`;

    // Make the modal visible
    modalOverlay.classList.add('active');

    // Hide the modal after 5 seconds
    setTimeout(() => {
        modalOverlay.classList.remove('active');
    }, 5000);
}

// Add the click event listener to the submit RSVP button
rsvpButton.addEventListener('click', addParticipant);
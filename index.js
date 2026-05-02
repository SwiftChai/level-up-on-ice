/*** Dark Mode Toggle ***/
const themeButton = document.getElementById('theme-button');

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


/*** Scroll Animations ***/
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

animatedEls.forEach(el => observer.observe(el));


/*** RSVP Form & Modal Handling ***/

const form = document.getElementById('rsvp-form');
const rsvpButton = document.getElementById('rsvp-button');
const nameInput = document.getElementById('name');
const rinkInput = document.getElementById('rink');
const emailInput = document.getElementById('email');
const participantList = document.querySelector('.rsvp-participants');

const modalOverlay = document.getElementById('success-modal-overlay');
const modalMessage = document.getElementById('modal-message');


const addParticipant = (event) => {
    event.preventDefault();

    let isValid = true;

    nameInput.classList.remove('error');
    rinkInput.classList.remove('error');
    emailInput.classList.remove('error');

    if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        isValid = false;
    }

    if (rinkInput.value.trim() === '') {
        rinkInput.classList.add('error');
        isValid = false;
    }

    if (emailInput.value.trim() === '' || !emailInput.checkValidity()) {
        emailInput.classList.add('error');
        isValid = false;
    }

    if (!isValid) return;

    const name = nameInput.value;
    const rink = rinkInput.value;
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `🎟️ ${name} from ${rink} has RSVP'd.`;
    participantList.appendChild(newParticipant);

    showModal(name);
    form.reset();
};

const showModal = (name) => {
    modalMessage.textContent = `Thank you, ${name}! Your spot is saved. Get ready to level up!`;
    modalOverlay.classList.add('active');
    setTimeout(() => {
        modalOverlay.classList.remove('active');
    }, 3000);
};

rsvpButton.addEventListener('click', addParticipant);

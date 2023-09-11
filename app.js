// This function creates a particle element inside a card element.
function createParticle(card, x, y) {
    // Generate a random size for the particle between 10 and 25.
    const size = Math.random() * 15 + 10;
    const halfSize = size / 2;

    // Adjust the particle's position to the center of the mouse click or touch point.
    x -= halfSize;
    y -= halfSize;

    // Create a new HTML <div> element to represent the particle.
    const particle = document.createElement('div');
    // Add the 'mouseMove' class to the particle for styling purposes.
    particle.classList.add('mouseMove');
    // Append the particle to the card element.
    card.appendChild(particle);

    // Generate a random hue value for the particle's background color.
    const randomHue = Math.random() * 260 + 250;

    // Set initial properties of the particle using GSAP (GreenSock Animation Platform).
    gsap.set(particle, {
        x,
        y,
        width: size,
        height: size,
        // Set the background color using an HSL color format with a random hue.
        backgroundColor: `hsl(${randomHue}, 50%, 50%)`,
    });

    // Animate the particle's movement and fading out.
    gsap.to(particle, {
        x: x + (Math.random() - 0.5) * 300, // Random horizontal movement within the card.
        y: y + (Math.random() - 0.5) * 300, // Random vertical movement within the card.
        opacity: 0, // Fade out the particle.
        scale: 0, // Shrink the particle.
        duration: 2.5, // Animation duration in seconds.
        ease: "power3.out", // Animation easing function.
        onComplete: () => {
            // When the animation is complete, remove the particle from the card.
            card.removeChild(particle);
        },
    });

    // Disable mouse events on the particle so that it doesn't interfere with interactions.
    particle.style.pointerEvents = 'none';
}

// Select all elements with the class 'card' and iterate through them.
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    // Get the bounding rectangle of the card for relative mouse/touch position.
    const cardRect = card.getBoundingClientRect();

    // Add a mousemove event listener to each card element.
    card.addEventListener('mousemove', (e) => {
        // Calculate the relative mouse position within the card.
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        // Create a particle at the calculated position.
        createParticle(card, x, y);
    });

    // Add a touchmove event listener to each card element.
    card.addEventListener('touchmove', (e) => {
        // Get the touch position relative to the card.
        const x = e.touches[0].clientX - cardRect.left;
        const y = e.touches[0].clientY - cardRect.top;
        // Prevent the default touch behavior (e.g., scrolling).
        e.preventDefault();
        // Create a particle at the calculated touch position.
        createParticle(card, x, y);
    });
});
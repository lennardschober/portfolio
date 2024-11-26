console.clear();

const glowEffect = document.getElementById('glowEffect');
glowEffect.style.left = `-100px`;
glowEffect.style.top = `-100px`;
glowEffect.classList.add('hidden');

let overFeature = false;
let mouseX = -100;
let mouseY = -100;
let clientScrollX = -100;
let clientScrollY = -100;

// Update the position of the glowing effect based on the cursor's position
document.addEventListener('mousemove', (ev) => {
    ev.target.style.cursor = "none";
    clientScrollX = ev.clientX;
    clientScrollY = ev.clientY;
    mouseX = ev.pageX;
    mouseY = ev.pageY;

    // features glowing
    const featureEls = document.querySelectorAll(".feature");
    featureEls.forEach((featureEl) => {
        const rect = featureEl.getBoundingClientRect();

        featureEl.style.setProperty("--x", ev.clientX - rect.left);
        featureEl.style.setProperty("--y", ev.clientY - rect.top);
    });

    updateMousePos();
});
document.addEventListener('scroll', (ev) => {
    mouseX = window.scrollX + clientScrollX;
    mouseY = window.scrollY + clientScrollY;
    updateMousePos();
});

function updateMousePos() {
    glowEffect.style.display = "block";
    if (!overFeature) glowEffect.classList.remove('hidden');
    else glowEffect.classList.add('hidden');
    // Check if the cursor is within the viewport
    glowEffect.style.left = `${mouseX}px`;
    glowEffect.style.top = `${mouseY}px`;
};

document.addEventListener('mouseout', function () {
    glowEffect.classList.add('hidden');
});

document.querySelectorAll('.feature').forEach((featureEl) => {
    featureEl.addEventListener('mouseenter', () => {
        overFeature = true;
    });
    featureEl.addEventListener('mouseleave', () => {
        overFeature = false;
    });
});

// stop intro video from looping
const videoEl = document.getElementById("intro-video");
const imageEl = document.getElementById("intro-image");
videoEl.addEventListener("timeupdate", function () {
    if (videoEl.currentTime > videoEl.duration - 0.1) {
        videoEl.style.display = "none";
        imageEl.style.display = "block"
    }
});

// When the user scrolls the page, execute my function 
/*window.onscroll = function () { progressBar() };
function progressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}*/

// reveal features on scroll
document.addEventListener("DOMContentLoaded", async function () {
    // feature fade-in
    const features = document.querySelectorAll('.feature.hidden');
    const delayIncrement = 0.1; // Delay increment in seconds for each element
    const revealFeature = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        features.forEach((feature, index) => {
            if (feature.getBoundingClientRect().top + window.scrollY + window.scrollY / 2 < scrollPosition) {
                feature.style.transitionDelay = `${index * delayIncrement}s`;
                feature.classList.remove('hidden');
            }
            else {
                feature.style.transitionDelay = `${(4 - index) * delayIncrement}s`;
                feature.classList.add('hidden');
            }
        });
    };

    // socials fade-in
    setTimeout(function () {
        document.querySelectorAll('.social-icon').forEach((social, index) => {
            social.style.transitionDelay = `${(index) * delayIncrement}s`;
            social.classList.add('visible');
        });
    }, 4000);

    function revealQuote() {
        const section = document.querySelector(".about-me");
        const quoteElement = document.querySelector(".quote");

        // Get the top position of the section relative to the document
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        // Calculate the current scroll position (bottom of the viewport)
        const scrollPosition = window.scrollY + window.innerHeight;

        // Check if the scroll position has reached the section top + 50vh
        if (scrollPosition >= sectionTop + 0.85 * window.innerHeight) {
            quoteElement.classList.remove('hidden');
        } else {
            quoteElement.classList.add('hidden');
        }
    }


    // Function to check when to reveal the elements
    function revealAboutMe() {
        const section = document.querySelector(".about-me");
        const charElement = document.querySelector(".characteristics");

        // Get the top position of the section relative to the document
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        // Calculate the current scroll position (bottom of the viewport)
        const scrollPosition = window.scrollY + window.innerHeight;

        // Check if the scroll position has reached the section top + 50vh
        if (scrollPosition >= sectionTop + 0.9 * window.innerHeight) {
            charElement.classList.remove('hidden');
        } else {
            charElement.classList.add('hidden');
        }
    }

    // dynamic font size for quote
    function update() {
        /*
        *   HIDE CURSOR
        */
        glowEffect.classList.add("hidden");

        revealFeature();
        revealQuote();
        revealAboutMe();
    }

    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);
});

// encrypt mail stuff
var enc1 = "U2FsdGVkX1/lRLhikxglE3k3j2u3YbX/tHZSEvBWvw"
var enc2 = "zvxA7rmoBq7oNEMyltBDIIqYFUEVUKU1p2QIve0ng==";
var decrypted = CryptoJS.AES.decrypt(enc1 + "oBV" + enc2, "sfbJWu2(92SH0!Jr=)!Hsf2SFF2");
document.getElementById("mailto").setAttribute('href', decrypted.toString(CryptoJS.enc.Utf8));

// smooth href scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// CAROUSEL
gsap.registerPlugin(Draggable);

var cards = gsap.utils.toArray(".creative-pro"),
    dragDistancePerRotation = 4000,
    radius = 520,
    proxy = document.createElement("div"),
    progressWrap = gsap.utils.wrap(0, 1),
    spin = gsap.fromTo(cards, {
        rotationY: i => i * 360 / cards.length
    }, {
        rotationY: "-=360",
        duration: 15,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50% " + -radius + "px"
    }),
    startProgress,
    velocity = 0,      // Track velocity
    lastX = 0,         // Last X position
    lastTime = 0,      // Time for velocity calculation
    deceleration = 0.975, // Deceleration factor
    isDragging = false;

const carouselFooter = document.querySelector(".carousel-footer");

Draggable.create(proxy, {
    trigger: ".demoWrapper",
    type: "x",
    allowNativeTouchScrolling: true,
    onPress() {
        gsap.killTweensOf(spin);
        spin.timeScale(0);
        startProgress = spin.progress();
        isDragging = true;
        lastX = this.x;
        lastTime = Date.now(); // Record the starting time
        
        carouselFooter.classList.add('hidden');
    },
    onDrag() {
        let now = Date.now();
        let deltaX = this.x - lastX;  // Change in X position
        let deltaTime = now - lastTime; // Time difference since last drag event

        // Calculate velocity (distance over time)
        velocity = deltaX / deltaTime;

        lastX = this.x;
        lastTime = now;

        updateRotation.call(this);
    },
    onRelease() {
        isDragging = false;
        // Update startProgress to the current spin progress
        startProgress = spin.progress();
        simulateInertia();
    }
});

function updateRotation() {
    let p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
    spin.progress(progressWrap(p));
}

function simulateInertia() {
    if (isDragging) {
        carouselFooter.classList.remove('hidden');
        return;
    }

    if (Math.abs(velocity) > 0.01) {  // Small threshold to stop the animation when it's slow enough
        // Move based on velocity
        startProgress -= velocity * 0.01;  // Adjust progress based on velocity
        spin.progress(progressWrap(startProgress));

        // Decrease velocity over time (simulate friction/inertia)
        velocity *= deceleration;

        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(simulateInertia);
        
    } else {
        // Once inertia ends, return to normal spin
        gsap.to(spin, { timeScale: 1, duration: 1 });
        carouselFooter.classList.remove('hidden');
    }
}

// Function to check if mouse is inside a bounding box
function isMouseInside(boundingBox, mousePosition) {
    return (
        mousePosition.x >= boundingBox.left &&
        mousePosition.x <= boundingBox.right &&
        mousePosition.y >= boundingBox.top &&
        mousePosition.y <= boundingBox.bottom
    );
}

// Function to get the current mouse position
function getMousePosition() {
    return {
        x: mouseX2,
        y: mouseY2
    };
}

// Track mouse position
let mouseX2 = 0;
let mouseY2 = 0;

document.addEventListener('mousemove', (event) => {
    mouseX2 = event.clientX; // Update mouseX with current mouse position
    mouseY2 = event.clientY; // Update mouseY with current mouse position
});

function updateCardInteraction() {
    const mousePosition = getMousePosition(); // Get current mouse position
    const boxes = document.querySelectorAll(".card"); // Select the cards (update class if necessary)

    let hoveredCard = null; // Variable to store the card with the largest bounding box

    boxes.forEach(card => {
        const boundingBox = card.getBoundingClientRect(); // Get the bounding box for each card

        // Check if the mouse is inside the bounding box
        if (isMouseInside(boundingBox, mousePosition)) {
            // If the mouse is inside, check for the largest card
            if (!hoveredCard) {
                hoveredCard = card; // First card hovered
            } else {
                // Compare areas: width * height
                const currentArea = boundingBox.width * boundingBox.height;
                const hoveredArea = hoveredCard.getBoundingClientRect().width * hoveredCard.getBoundingClientRect().height;

                // Update hoveredCard if the current card has a larger area
                if (currentArea > hoveredArea) {
                    hoveredCard = card;
                }
            }
        }
    });

    // Remove the 'hovered' class from all cards
    boxes.forEach(card => {
        card.classList.remove("hovered");
    });

    // If we found a hovered card, add the 'hovered' class to it
    if (hoveredCard) {
        hoveredCard.classList.add("hovered");
        return hoveredCard;
    }

    return null;
}

// Variable to control the animation loop
let animationId;

// Start the animation loop
function startAnimationLoop() {
    animationId = requestAnimationFrame(update); // Call the update function on every frame
}

// Function that gets called every frame
function update() {
    updateCardInteraction(); // Call your card interaction function
    animationId = requestAnimationFrame(update); // Request the next frame
}

// Function to stop the animation loop (if needed)
function stopAnimationLoop() {
    cancelAnimationFrame(animationId);
}

// Start the animation loop when needed
startAnimationLoop();

document.addEventListener("click", (event) => {
    const mousePosition = getMousePosition(event);
    const boxes = document.querySelectorAll(".card"); // Select the cards

    boxes.forEach(card => {
        const boundingBox = card.getBoundingClientRect(); // Get the bounding box for each card
        // Check if the mouse is inside the bounding box
        let myCard = updateCardInteraction();
        if (myCard) {
            const link = myCard.getAttribute("data-link"); // Get the link from the data attribute
            if (link) {
                window.open(link, "_blank"); // Open the link in a new tab
            }
        }
    });
});



// CURSOR INVERT
document.onmousemove = function (e) {
    document.body.style.setProperty('--x', (e.clientX) + 'px');
    document.body.style.setProperty('--y', (e.clientY) + 'px');

}
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

// When the user scrolls the page, execute myFunction 
window.onscroll = function () { progressBar() };
function progressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

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


    // quote move-over
    let changed = false;
    const bridge = document.getElementById("bridge");
    const revealBridge = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const scrollDiff = scrollPosition - 1.5 * window.scrollY;
        const distToTop = - document.getElementById("about-me").getBoundingClientRect().top;
        if (-250 < scrollDiff && scrollDiff < 0) {
            bridge.style.position = "fixed";
            bridge.style.transform = `translateX(${0.1 * scrollDiff}vw)`;
            changed = false;
        }
        else if (-250 >= scrollDiff) {
            if (!changed) {
                console.log(distToTop);
                bridge.style.position = "relative";
                bridge.style.transform = `translate(-25vw, 500px)`;
                changed = true;
            }
        }
        else {
            bridge.style.transform = `translate(0, 0)`;
            bridge.style.position = "relative";
            changed = false;
        }
    };

    // about me fade-in
    const characteristics = document.querySelectorAll('.characteristics.hidden');
    const revealAboutMe = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        characteristics.forEach(element => {
            if (element.getBoundingClientRect().top + window.scrollY + 0.31 * window.scrollY < scrollPosition) {
                element.classList.remove('hidden');
            }
            else {
                element.classList.add('hidden');
            }
        });
    };

    // dynamic font size for quote
    function update() {

        revealFeature();
        revealBridge();
        revealAboutMe();

        /*
        *   RESIZE QUOTE FONT
        */
        // quote
        const quotecontainer = document.getElementById('blockquote');
        const quoteText = document.getElementById('blockquote');
        const quotecontainerWidth = quotecontainer.offsetWidth;
        const quotecontainerHeight = quotecontainer.offsetHeight;
        let fontSize = 16; // Start with a base font size in em units

        quoteText.style.fontSize = fontSize + 'px';
        while (quoteText.scrollWidth <= quotecontainerWidth && quoteText.scrollHeight <= quotecontainerHeight) {
            fontSize += 0.5;
            quoteText.style.fontSize = fontSize + 'px';
        }

        // Once it exceeds the container size, reduce the font size slightly
        quoteText.style.fontSize = (fontSize - 0.5) + 'px';

        // author
        const authorText = document.getElementById('cite');
        // Once it exceeds the container size, reduce the font size slightly
        authorText.style.fontSize = 2 * (fontSize - 0.5) / 3 + 'px';
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
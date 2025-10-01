/* Codice js dell'intera pagina */

/* CREATING CARDS FOR SKILLS' SECTION */
const $skillsContainer = document.querySelector("div.skills-cards-container");

/* Array with skills cards data (name and icon) */
let skillsCards = [
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "JS", icon: "js" },
  { name: "TS", icon: "ts" },
  { name: "React", icon: "react" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
  { name: "AGILE", icon: "agile" },
];

/* Creating skills cards */
skillsCards.forEach((skill) => {
  let newCard = document.createElement("div");
  newCard.innerHTML = `<img src='../assets/img/skills-icon/${skill.icon}-icon.svg' alt='icon ${skill.name}' title='icon ${skill.name}' /><h3>${skill.name}</h3>`;

  newCard.classList.add("skill-card");

  $skillsContainer.appendChild(newCard);
});

/* CREATING CARDS FOR PROGETTI'S SECTION */
const $progettiCardsContainer = document.querySelector(
  "div.progetti-cards-container"
);

/* Array with progettis cards data (title, preview, repo, description and tags) */
let progettiCards = [
  {
    title: "Coolors Clone",
    preview: "coolors",
    repoLink: "Coolors-We1",
    description:
      "Coolors Clone è una web app che permette di generare palette di colori armoniose in modo rapido e intuitivo. È possibile bloccare i colori preferiti, rigenerare quelli restanti e copiare facilmente i codici HEX da usare nei progetti.",
    tags: ["HTML", "CSS", "JS"],
  },
];

/* Generating cards tags */
function getTags(tags) {
  return tags.map((tag) => `<div>${tag}</div>`).join("");
}

/* Generating progettis cards */
progettiCards.forEach((progetto) => {
  let newProgetto = document.createElement("div");
  newProgetto.innerHTML =
    `<h3>${progetto.title}</h3><a href='https://github.com/MoonyBerry/${progetto.repoLink}' target='_blank'><img src='../assets/img/progetti-img/${progetto.preview}-preview.png' alt='preview of ${progetto.title}' title='preview of ${progetto.title}'/></a><p>${progetto.description}</p><div class='tags-container'>` +
    getTags(progetto.tags) +
    `</div>`;
  newProgetto.classList.add("progetto-card");

  $progettiCardsContainer.appendChild(newProgetto);
});

/* DRAG PROGETTI LIST WITH MOUSE */
let mouseDown = false;
let startX, scrollLeft;
const slider = document.querySelector(".progetti-cards-container");

const startDragging = (e) => {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

const stopDragging = (e) => {
  mouseDown = false;
};

const move = (e) => {
  e.preventDefault();
  if (!mouseDown) {
    return;
  }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
};

slider.addEventListener("mousemove", move, false);
slider.addEventListener("mousedown", startDragging, false);
slider.addEventListener("mouseup", stopDragging, false);
slider.addEventListener("mouseleave", stopDragging, false);

/* VALIDATING FORMS FIELDS */
/* Validating name input */
const $nameInput = document.getElementById("name");
const nameExample = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

$nameInput.addEventListener("input", () => {
  if (!$nameInput.value.trim() || !nameExample.test($nameInput.value)) {
    $nameInput.setCustomValidity("Inserisci un nome ed un cognome validi!");
  } else {
    $nameInput.setCustomValidity("");
  }
});

/* Validating email input */
const $emailInput = document.getElementById("email");
const emailExample = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

$emailInput.addEventListener("input", () => {
  if (
    $emailInput.validity.typeMismatch ||
    !$emailInput.value.trim() ||
    !emailExample.test($emailInput.value)
  ) {
    $emailInput.setCustomValidity("Questa non è una email!");
  } else {
    $emailInput.setCustomValidity("");
  }
});

/* Validating textarea */
const $textarea = document.getElementById("message");

$textarea.addEventListener("input", () => {
  if (!$textarea.value.trim()) {
    $textarea.setCustomValidity("Inserisci un messaggio valido!");
  } else {
    $textarea.setCustomValidity("");
  }
});

/* MANAGE EMAILS */
const $formContatti = document.querySelector(".contatti-form");

$formContatti.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!$formContatti.checkValidity()) {
    $formContatti.reportValidity();
    return;
  }

  /* Preventing spams */
  const minInterval = 24 * 60 * 60 * 1000; // 24 ore
  const lastSubmit = localStorage.getItem("lastSubmit") || 0;
  const now = Date.now();

  if (now - lastSubmit < minInterval) {
    alert("Puoi inviare il form solo una volta al giorno.");
  } else {
    localStorage.setItem("lastSubmit", now);

    /* Send email with emailjs */
    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
    const serviceID = "service_2i9ddfe";
    const templateID = "template_lkjfd0h";

    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        console.log(res);

        /* Succes message */
        const $successMessage = document.querySelector("div.message-sent");
        $successMessage.classList.add("showMessage");
        setTimeout(() => {
          $successMessage.classList.remove("showMessage");
        }, 3000);

        $formContatti.reset();
      })
      .catch((err) => console.log(err));
  }
});

/* MAKING NAVBAR DISAPPEAR AND APPEAR ON SCROLL */
const $mainNavbar = document.querySelector("nav.portfolio-navbar");

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    $mainNavbar.classList.add("hide");
  } else {
    $mainNavbar.classList.remove("hide");
  }

  lastScrollTop = scrollTop;
});

/* OPEN AND CLOSING MOBILE NAVBAR */
const $mobileNav = document.querySelector("nav.mobile-navbar");
const $openMobileNavBtn = document.querySelector(
  "nav.portfolio-navbar i.fa-bars"
);
const $closeMobileNavBtn = document.querySelector(
  "nav.mobile-navbar i.fa-arrow-left"
);
const $mobileOverlay = document.querySelector("div.nav-mobile-overlay");
const $navbarLinks = document.querySelectorAll(
  "a.navbar-portfolio-link-mobile"
);

function openMobileNav() {
  $mobileNav.classList.add("show");
  $mobileOverlay.classList.add("show");
  $mainNavbar.classList.add("hidden");
}

function closeMobileNav() {
  $mobileNav.style.transform = "translateX(100%)";
  $mobileOverlay.style.opacity = "0";

  setTimeout(() => {
    $mobileNav.classList.remove("show");
    $mobileNav.style.transform = "";
    $mobileOverlay.classList.remove("show");
    $mobileOverlay.style.opacity = "";
    $mainNavbar.classList.remove("hidden");
  }, 200);
}

$openMobileNavBtn.addEventListener("click", openMobileNav);
$closeMobileNavBtn.addEventListener("click", closeMobileNav);
$mobileOverlay.addEventListener("click", closeMobileNav);
$navbarLinks.forEach((navLink) => {
  navLink.addEventListener("click", closeMobileNav);
});

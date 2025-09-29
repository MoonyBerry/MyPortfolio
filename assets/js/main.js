/* Codice js dell'intera pagina */

/* CREATING CARDS FOR SKILLS' SECTION */
const $skillsContainer = document.querySelector("div.skills-cards-container");

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

function getTags(tags) {
  return tags.map((tag) => `<div>${tag}</div>`).join("");
}

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

/* SENDING EMAIL */
function sendMail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_2i9ddfe";
  const templateID = "template_lkjfd0h";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("your message sent successfully");
    })
    .catch((err) => console.log(err));
}

const $contattiForm = document.querySelector("form.contatti-form");

$contattiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMail();
});

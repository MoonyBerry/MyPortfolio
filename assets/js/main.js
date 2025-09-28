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
  newCard.innerHTML = `<img src='../assets/img/skills-icon/${skill.icon}-icon.svg' alt='iconsa ${skill.name}' title='iconsa ${skill.name}' /><h3>${skill.name}</h3>`;

  newCard.classList.add("skill-card");

  $skillsContainer.appendChild(newCard);
});

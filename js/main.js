"use strict";

function setAppVersion() {
  const APP_VERSION = "0.1.0";
  const label_version = document.querySelector("#versionApp");

  label_version.textContent = APP_VERSION;
}

function addElementToCard(title, picture) {
  const cardContainer = document.querySelector("#cardContainer");
  const card = document.createElement("div");
  const titleCard = document.createElement("h3");
  const pictureBox = document.createElement("div");
  const pictureCard = document.createElement("img")

  titleCard.textContent = title;
  titleCard.setAttribute("class", "card__title");

  pictureCard.setAttribute("src", picture);
  pictureCard.setAttribute("class", "card__picture");

  pictureBox.appendChild(pictureCard);
  pictureBox.setAttribute("class", "card__box");

  card.appendChild(titleCard);
  card.appendChild(pictureBox);
  card.setAttribute("class", "card");

  cardContainer.appendChild(card);

}

function initPokeInfo() {
  const card = document.querySelector("#pokeCard");

  const randomNumber = parseInt(Math.random() * 102);

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)
  .then(res => res.json())
  .then(pokedata => {
    addElementToCard(pokedata.name, pokedata.sprites.other["official-artwork"].front_default);
    console.log(pokedata.sprites.other["official-artwork"].front_default);
  });
}

setAppVersion();

initPokeInfo();
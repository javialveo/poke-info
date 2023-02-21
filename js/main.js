"use strict";

function getRandomNumber(min, max) {
  const randomNumber = Math.random() * (max - min) + min;

  const number = parseInt(randomNumber);
  return number;
}

function setAppVersion() {
  const APP_VERSION = "2.0.0";
  const label_version = document.querySelector("#versionApp");

  label_version.textContent = APP_VERSION;
}

function setContent(dataArray) {
  const cardContainer = document.getElementById("cardContainer");
  const template = document.querySelector("#cardTemplate").content;
  const clone = template.cloneNode(true);
  const card = document.querySelector("#cards");

  const cardAbility = clone.getElementById("cardAbility");
  const cardAbilityHidden = clone.getElementById("cardHiddenAbility");
  const cardHeight = clone.getElementById("cardHeight");
  const cardID = clone.getElementById("cardID");
  const cardPicture = clone.getElementById("cardPicture");
  const cardTitle = clone.getElementById("cardTitle");
  const cardType = clone.getElementById("cardType");
  const cardWeight = clone.getElementById("cardWeight");

  cardAbility.textContent = dataArray[0];
  cardAbilityHidden.textContent = dataArray[1];
  cardHeight.textContent = dataArray[2];
  cardID.textContent = dataArray[3];
  cardPicture.setAttribute("src", dataArray[4]);
  cardTitle.textContent = dataArray[5];
  cardType.textContent = dataArray[6];
  cardWeight.textContent = dataArray[7];

  if(cardContainer.hasChildNodes() == true){
    cardContainer.removeChild(card);
  }
  cardContainer.appendChild(clone);
}

function getPokeData(idPokemon){
  const api = "https://pokeapi.co/api/v2/pokemon";
  const apiURL = `${api}/${idPokemon}/`;

  fetch(apiURL)
  .then(response => response.json())
  .then(data =>{
    let pokeID = 0;
    let pokeType = "";
    let pokeAbility = "";
    let pokeHiddenAbility = "";

    if(data.id > 999)
      pokeID = data.id;
    else if(data.id > 99)
      pokeID = `0${data.id}`;
    else if(data.id > 9)
      pokeID = `00${data.id}`;
    else
      pokeID = `000${data.id}`;

    if(data.types.length > 1){
      for(let i = 0; i < data.types.length; i++){
        if(pokeType.length == 0)
          pokeType = data.types[i].type.name;
        else
          pokeType += `, ${data.types[i].type.name}`;
      }
    }else
      pokeType = data.types[0].type.name;
    
    if(data.abilities.length > 1){
      for(let i = 0; i < data.abilities.length; i++){
        if(data.abilities[i].is_hidden === false){
          if(pokeAbility.length === 0){
            pokeAbility = data.abilities[i].ability.name
          }else{
            pokeAbility += `, ${data.abilities[i].ability.name}`;
          }
        }
      }
    }else{
      pokeAbility = data.abilities[0].ability.name;
    }

    for(let i = 0; i < data.abilities.length; i++){
      if(data.abilities[i].is_hidden === true){
        if(pokeHiddenAbility === "None"){
          pokeHiddenAbility = "";
        }
        
        if(pokeHiddenAbility.length === 0){
          pokeHiddenAbility = data.abilities[i].ability.name
        }else{
          pokeHiddenAbility = `, ${data.abilities[i].ability.name}`;
        }
      }else{
        pokeHiddenAbility = "None";
      }
    }
    
    const pokeData = [
      pokeAbility,
      pokeHiddenAbility,
      (parseInt(data.height)/10) + "m",
      pokeID,
      data.sprites.other["official-artwork"].front_default,
      data.name,
      pokeType,
      (parseInt(data.weight) / 10) + "kg"
    ];
    setContent(pokeData);
  });
}


function searchPokemon(){
  const searchInput = document.querySelector("#searchInput");

  getPokeData(searchInput.value);
}

function changePokemon(){
  getPokeData(getRandomNumber(1, 1008));
}

function setButtonEvents(){
  const eventContainer = document.addEventListener("click", e =>{
    const targetEvent = e.target;

    if(targetEvent.matches("#buttonSearch")){
      searchPokemon();
    }
    if(targetEvent.matches("#changeButton")){
      changePokemon();
    }
  });
}

getPokeData(getRandomNumber(1, 1008));

setAppVersion();
//setContent(["nadasuperfantástico", "mucho", "2m", "001", "img/11.png", "PokePrueba", "Normal", "120kg"]);
setButtonEvents();

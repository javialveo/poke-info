"use strict";

function getRandomNumber(min, max) {
  const randomNumber = Math.random() * (max - min) + min;

  const number = parseInt(randomNumber);
  return number;
}

function setAppVersion() {
  const APP_VERSION = "1.0.0";
  const label_version = document.querySelector("#versionApp");

  label_version.textContent = APP_VERSION;
}

function setContent(dataArray) {
  const cardContainer = document.getElementById("cardContainer");
  const template = document.getElementById("cardTemplate");
  const clone = template.content.cloneNode(true);

  const cardAbility = clone.getElementById("card_ability");
  const cardAbilityHidden = clone.getElementById("card_abilityHidden");
  const cardHeight = clone.getElementById("card_height");
  const cardID = clone.getElementById("card_id");
  const cardPicture = clone.getElementById("card_picture");
  const cardTitle = clone.getElementById("card_title");
  const cardType = clone.getElementById("card_type");
  const cardWeight = clone.getElementById("card_weight");

  cardAbility.textContent = dataArray[0];
  cardAbilityHidden.textContent = dataArray[1];
  cardHeight.textContent = dataArray[2];
  cardID.textContent = dataArray[3];
  cardPicture.setAttribute("src", dataArray[4]);
  cardTitle.textContent = dataArray[5];
  cardType.textContent = dataArray[6];
  cardWeight.textContent = dataArray[7];

  cardContainer.appendChild(clone);
}

function getPokeData(){
  const api = "https://pokeapi.co/api/v2/pokemon";
  const randomPokemonID = getRandomNumber(1, 101);
  const apiURL = `${api}/${randomPokemonID}/`;

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

setAppVersion();
getPokeData();
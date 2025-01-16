document.addEventListener("DOMContentLoaded", () => {
  const pairs = [
    { word: "Sodium oxide", match: "<p>Na<sub>2</sub>O</p>" },
    { word: "Carbon dioxide", match: "<p>CO<sub>2</sub></p>" },
    { word: "Calcium oxide", match: "<p>CaO</p>" },
    { word: "Manganese (IV) bromide", match: "<p>MnBr<sub>4</sub></p>" },
    { word: "Carbon monoxide", match: "<p>CO</p>" },
    { word: "Sodium chloride", match: "<p>NaCl</p>" },
    { word: "Diphosphorus monoxide", match: "<p>P<sub>2</sub>O</p>" },
    { word: "Copper (II) fluoride", match: "<p>CuF<sub>2</sub></p>" },
    { word: "Boron trichloride", match: "<p>BCl<sub>3</sub></p>" },
    { word: "Carbon tetrachloride", match: "<p>CCl<sub>4</sub></p>" },
    { word: "Dinitrogen tetroxide", match: "<p>N<sub>2</sub>O<sub>4</sub></p>" },
    { word: "Phosphorus pentafluoride", match: "<p>PF<sub>5</sub></p>" },
    { word: "Dichlorine heptoxide", match: "<p>Cl<sub>2</sub>O<sub>7</sub></p>" },
    { word: "Phosphorus tribromide", match: "<p>PBr<sub>3</sub></p>" },
    { word: "Silicon tetrafluoride", match: "<p>SiF<sub>4</sub></p>" },
    { word: "Disulfur dichloride", match: "<p>S<sub>2</sub>Cl<sub>2</sub></p>" }
  ];

  let cards = document.getElementsByClassName("blink");
  let canClick = true;  // Prevent further clicks until after reset
  let tally = 0;
  // Fisher-Yates (or Knuth) Shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffleAssign() {
    let shuffledPairs = shuffleArray(pairs);
    let cardPairs = [];

    for (let i = 0; i < cards.length / 2; i++) {
      cardPairs.push(shuffledPairs[i].word);
      cardPairs.push(shuffledPairs[i].match);
    }

    cardPairs = shuffleArray(cardPairs);
    for (let i = 0; i < cardPairs.length; i++) {
      cards[i].innerHTML = cardPairs[i];
      cards[i].onclick = isClicked;
      cards[i].style.display = "block"; 
    }
  }

  function isClicked(e) {
    if (!canClick) return;  

    let cardClicked = e.srcElement;
    cardClicked.classList.add("clicked");

    let clicked = document.getElementsByClassName("clicked");
    if (clicked.length === 2) {
      canClick = false; 

      if (isMatch(clicked[0].innerHTML, clicked[1].innerHTML)) {
        tally++;
       
        clicked[0].style.backgroundColor = "#4CAF50";
        clicked[1].style.backgroundColor = "#4CAF50";

        
        setTimeout(() => {
          clicked[0].style.display = "none"; 
          clicked[1].style.display = "none"; 
          resetSelection(clicked[0], clicked[1]); 
        }, 500); 
        
        if (tally == 16) {
        setTimeout ( () =>{
          window.location.href="glitch.html";
        }, 1000);
      }

      } else {
        
        clicked[0].style.backgroundColor = "#F44336";
        clicked[1].style.backgroundColor = "#F44336";

        setTimeout(() => {
          
          clicked[0].style.backgroundColor = "";
          clicked[1].style.backgroundColor = "";
          resetSelection(clicked[0], clicked[1]); 
        }, 1000); 
      }
    }
  }
   
  function resetSelection(card1, card2) {
    card1.classList.remove("clicked");
    card2.classList.remove("clicked");
    canClick = true;  
  }

  function isMatch(item1, item2) {
    for (let i = 0; i < pairs.length; i++) {
      if (item1 === pairs[i].word && item2 === pairs[i].match) {
        return true;
      }
      if (item2 === pairs[i].word && item1 === pairs[i].match) {
        return true;
      }
    }
    return false;
  }

  shuffleAssign();
});




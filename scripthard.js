document.addEventListener("DOMContentLoaded", () => {
  const pairs = [
    { word: "Magnesium nitrate", match: "<p>Mg(NO<sub>3</sub>)<sub>2</sub></p>" },
    { word: "Zinc hydroxide", match: "<p>Zn(OH)<sub>2</sub></p>" },
    { word: "Strontium phosphate", match: "<p>Sr<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub></p>" },
    { word: "Iron (III) sulfate", match: "<p>Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub></p>" },
    { word: "Silver chlorite", match: "<p>AgClO<sub>2</sub></p>" },
    { word: "Ammonium sulfide", match: "<p>(NH<sub>4</sub>)<sub>2</sub>S</p>" },
    { word: "Potassium iodate", match: "<p>KIO<sub>3</sub></p>" },
    { word: "Barium oxalate", match: "<p>BaC<sub>2</sub>O<sub>4</sub></p>" },
    { word: "Lithium acetate", match: "<p>LiC<sub>2</sub>H<sub>3</sub>O<sub>2</sub></p>" },
    { word: "Lead (II) carbonate", match: "<p>PbCO<sub>3</sub></p>" },
    { word: "Tin (IV) nitride", match: "<p>Sn<sub>3</sub>N<sub>4</sub></p>" },
    { word: "Sodium bicarbonate", match: "<p>NaHCO<sub>3</sub></p>" },
    { word: "Pentacarbon decahydride", match: "<p>C<sub>5</sub>H<sub>10</sub></p>" },
    { word: "Sulfur hexafluoride", match: "<p>SF<sub>6</sub></p>" },
    { word: "Xenon octachloride", match: "<p>XeCl<sub>8</sub></p>" },
    { word: "Octacarbon hexahydride", match: "<p>C<sub>8</sub>H<sub>6</sub></p>" }
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
          window.location.href="final.html";
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

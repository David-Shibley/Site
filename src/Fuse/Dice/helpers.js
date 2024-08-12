import { COLORS_ENUM } from "../constants";
export const updateDiceOwner = ({ die, dice, setDice, currentPlayer }) => {
    const dieIndex = dice.reduce((acc, curr, index) => {
      if (curr.hash === die.hash) {
        return index;
      }
      return acc;
    }, -1);
    if (dieIndex === -1) {
      return;
    }
    const newDiceArray = new Array(...dice);
  
    newDiceArray[dieIndex].owner = die.owner;
    setDice(newDiceArray);
  };
  
  export const getDieColor = (color) => {
    return Object.keys(COLORS_ENUM).map((key) => {
      if (COLORS_ENUM[key] === color) {
        return key;
      } else {
        return ''
      }
    }
    ).find((key) => key !== '');
  }
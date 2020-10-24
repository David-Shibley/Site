import React, { useState } from 'react';
import Die from './Die';
// Green, blue, yellow, orange, red
const colorsArray = ['#214E34', '#3b8ea5', '#f5ee9e', '#f49e4c', '#ab3428']
const playersArray = [{ name: 'bob', color: 'red' }, { name: 'billy', color: 'green'}];

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const generateDice = () => {
    const randomDieNumber = getRandomNumber(1, 7);
    const randomColorIndex = getRandomNumber(0, 4);

    const chosenColor = colorsArray[randomColorIndex];

    return { chosenColor, randomDieNumber }
}

const Dice = () => {
    let incrementer = 0;
    // TODO: make this dynamically based on number of socket connections and/or AI players
    const [players, setPlayers] = useState(playersArray);
    const [dice, setDice] = useState([]);
    const numberOfPlayers = players.length;

    for (let i = dice.length; i < numberOfPlayers; i++) {
        const diceCopy = dice;
        const newDice = generateDice()
        diceCopy.push(newDice)
        setDice(diceCopy)
    }
    
    return dice.map(die => {
        incrementer++
        const dieProps = {
            players,
            setPlayers,
            dice,
            die,
            setDice,
        }
        return <Die key={incrementer} {...dieProps}/>
    })
}

export default Dice
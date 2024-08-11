import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../GameContext';
import Die from './Die';
import { Container, Button } from '@material-ui/core';
import { colorOptions, makeDiceBoardStyles } from '../styles'

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const emitSetDice = (diceCopy, room, socket, setDice) => {
    socket.emit('setDice', room, diceCopy)
    setDice(diceCopy)
}

const generateRandomDiceNum = (colorsArray) => {
    const randomDieNumber = getRandomNumber(1, 7);
    const randomColorIndex = getRandomNumber(0, 5);

    const color = colorsArray[randomColorIndex];

    return { color, value: randomDieNumber, hash: Math.random() }
}

export const getDice = (dice, setDice, players, socket, colorsArray, room) => {
    while (dice.length < players.length) {
        const diceCopy = dice;
        const newDice = generateRandomDiceNum(colorsArray)
        diceCopy.push(newDice)
        emitSetDice(diceCopy, room, socket, setDice)
    }

    while (dice.length > players.length) {
        const diceCopy = dice;
        diceCopy.pop()
        emitSetDice(diceCopy, room, socket, setDice)
    }
    
    return dice
}

const Dice = () => {
    let incrementer = 0;
    const { socket, players, setDice, room, colorOptionIndex } = useContext(GameContext);
    let { dice } = useContext(GameContext);
    const [localDice, setLocalDice] = useState(dice);
    const diceBoardStyles = makeDiceBoardStyles();
    const colorsArray = colorOptions[colorOptionIndex];

    useEffect(() => {
        if (socket && players.length > 0) {
            dice = getDice(dice, setDice, players, socket, colorsArray, room)
        }
    }
    , [players, socket, room, dice])

    if (dice && dice.length === 0) {
        dice = getDice(dice, setDice, players, socket, colorsArray, room)
    }

    const onRemove = (die) => {
        const diceCopy = dice.filter(d => d.hash !== die.hash)
        emitSetDice(diceCopy, room, socket, setDice)
        return diceCopy
    }

    const rerollDice = () => {
        const newDice = localDice.map(() => generateRandomDiceNum(colorsArray));
        emitSetDice(newDice, room, socket, setLocalDice);
    }

    const generateDice = () => {
        return dice.map(die => {
            incrementer++;

            return <Die key={incrementer} {...{ die, onRemove }} />
        })
    }
    
    return (
        <React.Fragment>
            <Container className={diceBoardStyles.board}>
                {generateDice()}
            </Container>
            <Button variant="contained" color="primary" onClick={rerollDice}>
                Reroll Dice
            </Button>
        </React.Fragment>
    )
}

export default Dice
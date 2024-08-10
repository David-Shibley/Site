import React, { useContext, useEffect } from 'react';
import GameContext from '../GameContext';
import Die from './Die';
import { Container } from '@material-ui/core';
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

    const chosenColor = colorsArray[randomColorIndex];

    return { chosenColor, value: randomDieNumber, hash: Math.random() }
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
    const diceBoardStyles = makeDiceBoardStyles();
    const colorsArray = colorOptions[colorOptionIndex];

    useEffect(() => {
        socket.on('setDice', (dice) => {
            setDice(dice)
        }
        )
        return () => {
            socket.off('setDice')
        }
    }, [])

    if (dice && dice.length === 0) {
        dice = getDice(dice, setDice, players, socket, colorsArray, room)
    }

    const generateDice = () => {
        return dice.map(die => {
            incrementer++;
            const dieProps = {
                die,
                setDice,
                colorsArray,
            }

            return <Die key={incrementer} {...dieProps} />
        })
    }
    
    return (
        <React.Fragment>
            <Container className={diceBoardStyles.board}>
                {generateDice()}
            </Container>
        </React.Fragment>
    )
}

export default Dice
import React, { useState } from 'react';
import Die from './Die';
import { Container, Button, Tab, Tabs } from '@material-ui/core';
import { colorOptions, makeDiceBoardStyles } from './styles'

const playersArray = [{ name: 'bob', color: 'red' }, { name: 'billy', color: 'green'}];

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const Dice = props => {
    let incrementer = 0;
    const diceBoardStyles = makeDiceBoardStyles();
    // TODO: make this dynamically based on number of socket connections and/or AI players
    const [players, setPlayers] = useState(playersArray);
    const { numberOfPlayers } = props;
    const [dice, setDice] = useState([]);
    const [colorOptionIndex, setColorOptionIndex] = useState(0);
    const colorsArray = colorOptions[colorOptionIndex];

    const generateRandomDiceNum = () => {
        const randomDieNumber = getRandomNumber(1, 7);
        const randomColorIndex = getRandomNumber(0, 5);

        const chosenColor = colorsArray[randomColorIndex];

        return { chosenColor, randomDieNumber }
    }

    for (let i = dice.length; i < numberOfPlayers; i++) {
        const diceCopy = dice;
        const newDice = generateRandomDiceNum()
        diceCopy.push(newDice)
        setDice(diceCopy)
    }
    
    const generateDice = () => {
        return dice.map(die => {
            incrementer++;
            const dieProps = {
                players,
                dice,
                die,
                setDice,
                colorsArray,
            }

            return <Die key={incrementer} {...dieProps} />
        })
    }
    
    const onReroll = () => setDice([]);

    const onChangeColorOptionClick = (event, selection) => {
        setColorOptionIndex(selection)
    }

    return (
        <React.Fragment>
            <Tabs value={colorOptionIndex} onChange={onChangeColorOptionClick}>
                <Tab label="bold"></Tab>
                <Tab label="bright"></Tab>
                <Tab label="pastel"></Tab>
            </Tabs>
            <Button onClick={onReroll}>Reroll Dice</Button>
            <Container className={diceBoardStyles.board}>
                {generateDice()}
            </Container>
        </React.Fragment>
    )
}

export default Dice
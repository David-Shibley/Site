import React, { useRef, useState } from 'react';
import { Card, CardContent, makeStyles, Avatar } from '@material-ui/core';

// Green, blue, yellow, orange, red
const colorsArray = ['#214E34', '#3b8ea5', '#f5ee9e', '#f49e4c', '#ab3428']
const playersArray = [{ name: 'bob', color: 'red' }, { name: 'billy', color: 'green'}];
const user = playersArray[1]

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const generateDice = () => {
    const randomDieNumber = getRandomNumber(1, 6);
    const randomColorIndex = getRandomNumber(0, 4);

    const chosenColor = colorsArray[randomColorIndex];

    return { chosenColor, randomDieNumber }
}

const Die = props => {
    const { dice, die, players, setDice } = props;

    const styles = makeStyles((theme) => ({
        dice: {
            backgroundColor: die.chosenColor,
            height: '12rem',
            widows: '12rem'
        },
        avatar: {
            backgroundColor: user.color,
            height: '12rem',
            widows: '12rem'
        }
    }))

    const dieRef = useRef();

    const classes = styles()

    const onDiceClick = props => {
        const dieIndex = dice.indexOf(die);
        const newDiceArray = new Array(...dice);
        // TODO: make this dynamic
        newDiceArray[dieIndex].owner = players[0].name
        setDice(newDiceArray);
    }

    const UserAvatar = (() => {
        return (
            <Avatar alt={user.name} src="">{players[0].name}</Avatar>
        )
    })()

    return (
        <Card className={classes.dice} onClick={onDiceClick}>
            <CardContent ref={dieRef}>
                {die.randomDieNumber}
                {die.owner ? UserAvatar : null}
            </CardContent>
        </Card>
    )
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
import React, { useContext, useRef, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import GameContext from '../GameContext.js';
import { isCardComplete, markCardComplete, getRandomCards } from '../Card/helpers.js';
import makeDieStyle, { makeFadeOutStyles } from '../styles.js';
import { COMPARATORS_ENUM, COLORS_ENUM } from '../constants.js';
import { getDieColor } from './helpers.js';

const Die = ({ die, onRemove }) => {
    const { completedCards, currentPlayer, socket, room, dice, boardCards, players, playerCard, setBoardCards, setCompletedCards, setPlayerCard, setPlayerDie } = useContext(GameContext);
    const [isExiting, setIsExiting] = useState(false);
    const dieRef = useRef();
    const classes = makeDieStyle(die);
    const fadeOutClasses = makeFadeOutStyles();

    const onDiceClick = () => {
        const dieCopy = { ...die };
    
        // Check if die is owned by another player
        if (dieCopy && dieCopy.owner && dieCopy.owner.id !== currentPlayer.id) return;
    
        // If die is not owned, assign it to the current player
        if (!dieCopy.owner) {
            setIsExiting(true);
            setTimeout(() => {
                onRemove(die);
                setIsExiting(false);
            }, 500);
    
            if (playerCard && playerCard.owner && playerCard.owner.id === currentPlayer.id) {
                const updatedPlayedDice = [...(playerCard.playedDice || []), dieCopy];
                const updatedPlayerCard = { ...playerCard, playedDice: updatedPlayedDice };
    
                // Handle the case where a specific order is required
                if (playerCard.requiredOrder) {
                    const isOrderCorrect = updatedPlayedDice.every((playedDie, index) => {
                        const expectedColor = playerCard.requiredOrder[index];
                        if (expectedColor ? playedDie.color === expectedColor || playedDie.value === expectedColor : true) {
                            if (index === playerCard.dice.length - 1) {
                                updatedPlayerCard.completed = true;
                                return true;
                            }
                            return true;
                        }
                    });
    
                    if (!isOrderCorrect) {
                        alert(`You must play the dice in the correct order: ${playerCard.requiredOrder.map((colorOrNumber) => isNaN(Number(colorOrNumber)) ? getDieColor(colorOrNumber) : colorOrNumber).join(', ')}`);
                        return;
                    }
                }
    
                // Handle the case where no specific order is required
                if (playerCard.comparator === COMPARATORS_ENUM.NONE) {
                    const isMatch = playerCard.dice.some((playedDie) =>
                            (playedDie.color === dieCopy.color || playedDie.color === '*') &&
                            (playedDie.value === dieCopy.value || playedDie.value === '*')
                        );

                    if (!isMatch) {
                        alert(`You must play the correct dice ${playerCard.dice.map((die) => `${getDieColor(die.color)} ${die.value}`).join(', ')}`);
                        return;
                    }
    
                    if (isMatch && updatedPlayedDice.length === playerCard.dice.length) {
                        updatedPlayerCard.completed = true;
                    }
                }
    
                if (isCardComplete(updatedPlayerCard)) {
                    markCardComplete(updatedPlayerCard, completedCards, boardCards, players, setPlayerCard, setCompletedCards, setBoardCards);
                    setPlayerCard({});
                    const newCards = [...boardCards.filter((card) => card.hash !== playerCard.hash)];
                    if (newCards.length > 1) {
                        setBoardCards(newCards);
                    } else {
                        setBoardCards(getRandomCards(players.length));
                    }
                } else {
                    setPlayerCard(updatedPlayerCard);
                }
            }
    
            dieCopy.owner = currentPlayer;
            setPlayerDie(dieCopy);
        } else {
            // If die is owned by the current player, unassign it
            dieCopy.owner = null;
            setPlayerDie({});
        }
    
        // Emit the socket event with the updated state
        socket.emit('updateDiceOwner', room, { die: dieCopy, dice, currentPlayer });
    };
    

    return (
        <Card 
            className={`${classes[`face-${die.value}`]} ${isExiting ? fadeOutClasses.exit : ''}`} 
            onClick={onDiceClick}
        >
            <CardContent ref={dieRef}>
                {generateDieContent({ die, classes })}
            </CardContent>
        </Card>
    );
}

const generateDieContent = ({ die, classes }) => {
    switch (die.value) {
        case 1:
            return <span className={classes.dot}></span>;            
        case 2:
            return (
                <div>
                    <span className={classes.dot}></span>
                    <span className={classes.dot}></span>
                </div>
            );
        case 3:
            return (
                <div>
                    <span className={classes.dot}></span>
                    <span className={classes.dot}></span>
                    <span className={classes.dot}></span>
                </div>
            );
        case 4:
            return (
                <div>
                    <div className="column">
                        <span className={classes.dot}></span> 
                        <span className={classes.dot}></span>
                    </div>
                    <div className="column">
                        <span className={classes.dot}></span> 
                        <span className={classes.dot}></span>
                    </div>
                </div>
            );
        case 5:
            return (
                <div>
                    <div className="column">
                        <span className={classes.dot}></span>
                        <span className={classes.dot}></span>
                    </div>
                    <div className="column">
                        <span className={classes.dot}></span>
                    </div>
                    <div className="column">
                        <span className={classes.dot}></span>
                        <span className={classes.dot}></span>
                    </div>
                </div>
            );
        case 6:
            return (
                <div>
                    <div className="column">
                        <span className={classes.dot}></span> 
                        <span className={classes.dot}></span>  
                        <span className={classes.dot}></span>
                    </div>
                    <div className="column">
                        <span className={classes.dot}></span> 
                        <span className={classes.dot}></span>  
                        <span className={classes.dot}></span>
                    </div>
                </div>
            );
        default:
            return <div className='column'>{die.value}</div>;
    }
}

export default Die;

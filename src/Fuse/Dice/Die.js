import React, { useContext, useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import GameContext from '../GameContext.js';
import { isCardComplete, markCardComplete } from '../Card/helpers.js';
import makeDieStyle, { makeFadeOutStyles } from '../styles.js';
import { CardsList } from '../Card/cards.js';

const Die = ({ die, onRemove }) => {
    const { completedCards, currentPlayer, socket, room, dice, playerCard, setBoardCards, setCompletedCards, setPlayerCard, setPlayerDie } = useContext(GameContext);
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
            if (playerCard && playerCard.owner && playerCard.owner.id === currentPlayer.id) {
                const updatedPlayedDice = [...(playerCard.playedDice || []), dieCopy];
    
                if (playerCard.requiredOrder) {
                    // Check if the played dice follow the correct color order
                    const isOrderCorrect = updatedPlayedDice.every((playedDie, index) => {
                        const expectedColor = playerCard.requiredOrder[index];
                        if (expectedColor ? playedDie.color === expectedColor : true) {
                            if (index === updatedPlayedDice.length - 1) {
                                markCardComplete(playerCard, completedCards, setCompletedCards);
                            }
                            return true;
                        }
                    });
        
                    // If the order is incorrect, prevent adding the die and show an error or return
                    if (!isOrderCorrect) {
                        alert("You must play the dice in the correct order: Blue, Yellow, Black.");
                        return;
                    }
                }    
    
                const updatedPlayerCard = { ...playerCard, playedDice: updatedPlayedDice };
    
                // Trigger fade out and removal of the die
                setIsExiting(true);
                setTimeout(() => onRemove(die), 500);
    
                if (isCardComplete(updatedPlayerCard)) {
                    markCardComplete(updatedPlayerCard, completedCards, setCompletedCards);
                    setPlayerCard({});
                    setBoardCards([CardsList.pop()]);
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
    

    useEffect(() => {
        // This function runs when the component is about to unmount
        return () => {
            setIsExiting(true);
        };
    }, []);

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

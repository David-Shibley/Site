import React, { useContext, useRef } from 'react';
import { Card, CardContent } from '@material-ui/core';
import GameContext from '../GameContext.js';
import makeDieStyle from '../styles.js'

const Die = ({ die }) => {
    const { currentPlayer, socket, room, dice, playerDie, setPlayerDie } = useContext(GameContext);

    const dieRef = useRef();

    const classes = makeDieStyle(die);

    const onDiceClick = () => {
        const dieCopy = die;
        if (dieCopy && dieCopy.owner && dieCopy.owner.id !== currentPlayer.id) return
        if (die.owner === undefined || die.owner === null) {
            dieCopy.owner = currentPlayer
            setPlayerDie(dieCopy)   
        } else if (die.owner.id !== currentPlayer.id) {
            dieCopy.owner = currentPlayer
            setPlayerDie(dieCopy)
        } else {
            dieCopy.owner = null
            setPlayerDie({})
        }

        socket.emit('updateDiceOwner', room, { die: dieCopy, dice, currentPlayer })
    }

    const generateDieConent = die => {
        switch (die.value) {
            case 1:
                return <span className={classes.dot}></span>            

            case 2:
                return <React.Fragment><span className={classes.dot}></span><span className={classes.dot}></span></React.Fragment>

            case 3:
                return <React.Fragment><span className={classes.dot}></span><span className={classes.dot}></span><span className={classes.dot}></span></React.Fragment>

            case 4:
                return <React.Fragment>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span></div>
                </React.Fragment>

            case 5:
                return <React.Fragment>
                    <div className="column"><span className={classes.dot}></span><span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span><span className={classes.dot}></span></div>
                </React.Fragment>

            case 6:
                return <React.Fragment>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span>  <span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span>  <span className={classes.dot}></span></div>
                </React.Fragment>
        
            default:
                return <React.Fragment>
                    <div className='column'>{die.value}</div>
                </React.Fragment>
        }
    }
 

    return (
        <Card className={classes[`face-${die.value}`]} onClick={onDiceClick}>
            <CardContent ref={dieRef}>
                {generateDieConent(die)}
            </CardContent>
        </Card>
    )
}

export default Die
import React, { useRef } from 'react';
import { Card, CardContent } from '@material-ui/core';
import makeDieStyle from './styles'

const Die = props => {
    const { dice, die, players, setDice } = props;

    const dieRef = useRef();

    const classes = makeDieStyle(die);

    const onDiceClick = () => {
        const dieIndex = dice.indexOf(die);
        const newDiceArray = new Array(...dice);
        
        if (die.owner) {
            newDiceArray[dieIndex].owner = null;
            setDice(newDiceArray);
        } else {
            newDiceArray[dieIndex].owner = players[0]
            setDice(newDiceArray);
        }
    }

    const generateDieConent = die => {
        switch (die.randomDieNumber) {
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
                break;
        }
    }
 

    return (
        <Card className={classes[`face-${die.randomDieNumber}`]} onClick={onDiceClick}>
            <CardContent ref={dieRef}>
                {generateDieConent(die)}
            </CardContent>
        </Card>
    )
}

export default Die
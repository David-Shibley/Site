import React, { useRef } from 'react';
import { Card, CardContent, makeStyles, Avatar } from '@material-ui/core';

const playersArray = [{ name: 'bob', color: 'red' }, { name: 'billy', color: 'green'}];
const user = playersArray[1]

const Die = props => {
    const { dice, die, players, setDice } = props;

    const diceStyle = {
        backgroundColor: die.chosenColor,  
        width: '104px',  
        height: '104px',  
        borderRadius: '10%',
    }

    const dotContainerStyle = {
        height: '100%',
        width: '100%',
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
    }
    
    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }

    const styles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: user.color,
            height: '12rem',
            widows: '12rem'
        },
        dot: {
            display: 'block',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'white',
        },
        'face-1': {
            ...diceStyle,
            '& div': {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0
            },
        },
        'face-2': {
            ...diceStyle,
            '& div': {
                ...dotContainerStyle,
                '& span:nth-of-type(2)': {
                    alignSelf: 'flex-end',
                },
            },
        },
        'face-3': {
            ...diceStyle,
            '& div': {
                ...dotContainerStyle,
                '& span:nth-of-type(2)': {
                    alignSelf: 'center',
                },
                '& span:nth-of-type(3)': {
                    alignSelf: 'flex-end',
                },
            },
        },
        'face-4': {
            ...diceStyle,
            '& div': {
                ...dotContainerStyle,
                '& .column': {
                    ...columnStyle,
                },
                '& .column:nth-of-type(2)': {
                    alignItems: 'flex-end',
                }
            }
        },
        'face-5': {
            ...diceStyle,
            '& div': {
                ...dotContainerStyle,
                '& .column': {
                    ...columnStyle,
                },
                '& .column:nth-of-type(2)': {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '& .column:nth-of-type(3)': {
                    alignItems: 'flex-end',
                }
            }
        },
        'face-6': {
            ...diceStyle,
            '& div': {
                ...dotContainerStyle,
                '& .column': {
                    ...columnStyle,
                },
                '& .column:nth-of-type(2)': {
                    alignItems: 'flex-end',
                }
            }
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

    const generateDieConent = die => {
        switch (die.randomDieNumber) {
            case 1:
                return <span className={classes.dot}></span>            
                break;

            case 2:
                return <React.Fragment><span className={classes.dot}></span><span className={classes.dot}></span></React.Fragment>
                break;

            case 3:
                return <React.Fragment><span className={classes.dot}></span><span className={classes.dot}></span><span className={classes.dot}></span></React.Fragment>
                break;

            case 4:
                return <React.Fragment>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span></div>
                </React.Fragment>
                break;

            case 5:
                return <React.Fragment>
                    <div className="column"><span className={classes.dot}></span><span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span><span className={classes.dot}></span></div>
                </React.Fragment>
                break;

            case 6:
                return <React.Fragment>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span>  <span className={classes.dot}></span></div>
                    <div className="column"><span className={classes.dot}></span> <span className={classes.dot}></span>  <span className={classes.dot}></span></div>
                </React.Fragment>
        
            default:
                break;
        }
    }


    const UserAvatar = (() => {
        return (
            <Avatar alt={user.name} src="">{players[0].name}</Avatar>
        )
    })()

    return (
        <Card className={classes[`face-${die.randomDieNumber}`]} onClick={onDiceClick}>
            <CardContent ref={dieRef}>
                {generateDieConent(die)}
            </CardContent>
        </Card>
    )
}

export default Die
import { makeStyles } from '@material-ui/core';

export const colorOptions = [
    [
        '#d81159ff', // blue
        '#6320eeff', // green
        '#218380ff', // red
        '#fbb13cff',
        '#1a090dff',
    ],
]


export const makeDiceBoardStyles = () => {
    return (makeStyles(() => ({
        board: {
            height: '30vh',
            display: 'flex',
            alignItems: 'flex-end'
        }
    })))()
}

export const makeFadeOutStyles = () => {
    return (makeStyles(() => ({
        exit: {
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }
    })))()
}

const makeDieStyles = ({ color, owner }) => {
    const ownerColor = owner && owner.color
    const boxShadowColor = ownerColor ? ownerColor : color;
    const diceStyle = {
        backgroundColor: color, 
        border: ownerColor ? `2px solid ${ownerColor}` : 'none',
        boxShadow: `8px 8px 16px ${boxShadowColor}`,
        width: '104px',  
        height: '104px',  
        borderRadius: '10%',
        marginLeft: '12px',
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

    return (makeStyles(() => ({
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
    })))()
}

export default makeDieStyles
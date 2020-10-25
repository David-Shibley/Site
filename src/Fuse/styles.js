import { makeStyles } from '@material-ui/core';

export const colorOptions = [
    [
        '#d81159ff',
        '#6320eeff',
        '#218380ff',
        '#fbb13cff',
        '#1a090dff',
    ],
    [
        '#f7f052ff',
        '#e71d36ff',
        '#25171aff',
        '#279af1ff',
        '#31cb00ff',
    ],
    [
        '#ef6461ff',
        '#ffffb3ff',
        '#80ced7ff',
        '#353238ff',
        '#395b50ff',
    ],
]

export const makeDiceBoardStyles = () => {
    return (makeStyles(() => ({
        board: {
            height: '40vh',
            display: 'flex',
        }
    })))()
}

const makeDieStyles = props => {
    const ownerColor = props.owner && props.owner.color
    const boxShadowColor = ownerColor ? ownerColor : props.chosenColor;
    const diceStyle = {
        backgroundColor: props.chosenColor, 
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
import React, { useState, useEffect } from 'react'
import { Container, Slider } from '@material-ui/core';

import Dice from './Dice';

const startCountdownTimer = () => {
    // Set the date we're counting down to
    const timeNow = new Date().getTime()
    const countDownDate = new Date(timeNow + 600000).getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    const demoTag = document.getElementById("demo")
    demoTag ? demoTag.innerHTML = minutes + "m " + seconds + "s " : null;
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        // TODO: add win engine here
        demoTag.innerHTML = "EXPIRED";
    }
    }, 1000);
}

const Fuse = () => {
    // useEffect(startCountdownTimer)
    const [numberOfPlayers, setNumberOfPlayers] = useState(3)

    const valuetext = value => {
        return `${value} Players`
    }

    const onPlayerQuantityChange = (event, value) => {
        setNumberOfPlayers(value)
    }

    return (
        <Container>
            <div id="demo"></div>
            <Slider
                defaultValue={3}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={onPlayerQuantityChange}
                step={1}
                marks
                min={2}
                max={6}
                style={
                    {width: '10vw'}
                }
            />
            <Dice {...{numberOfPlayers}}/>        
        </Container>
    );
}

export default Fuse;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Avatar, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';

import DoWorkLogo from './getting.work.done.gif';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '25vh',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    alignSelf: 'center',
    animation: 'App-logo-spin infinite 20s linear',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    flexFlow: 'column',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
  }
}));

const Portfolio = () => {
  const classes = useStyles();

  const openGithub = () => {
    return window.open('https://github.com/David-Shibley?tab=repositories')
  }

  return (
    <Container className={classes.root}>
      <Card className="flip-container">
        <div className="flipper"  onTouchStart={() => {this.classList.toggle('hover')}}>
          <div className="front">
            <CardContent className={classes.cardContent}>
              <Typography>Page is currently being worked on</Typography>
              <Avatar src={DoWorkLogo} className={classes.avatar} alt="logo" tooltip="working" />
              <CardActions className={classes.cardActions}>
                <Button>Hover here to learn more</Button>
              </CardActions>
            </CardContent>
          </div>
          <div className="back">
            <CardContent className={classes.cardContent}>
              <CardActions className={classes.cardActions}>              
                <Avatar src={DoWorkLogo} className={classes.avatar} alt="logo" tooltip="working" />
                <Button onClick={openGithub}>See the code on github</Button>
              </CardActions>
            </CardContent>
          </div>          
        </div>
      </Card>
    </Container>
  )
}

export default Portfolio;
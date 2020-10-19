import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Avatar, Card, CardHeader, CardContent, CardActions, Button, Typography, Link } from '@material-ui/core';

import DoWorkLogo from './getting.work.done.gif';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '320px',
    height: '480px',
    '&:hover .flipper, .flip-container.hover .flipper': {
        transform: 'rotateY(180deg)',
      }
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    animation: 'App-logo-spin infinite 20s linear',
  },
}));

const Portfolio = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Card class="flipper" ontouchstart="this.classList.toggle('hover');">
        <CardHeader>Working</CardHeader>
        <CardContent class="front">
          <Avatar src={DoWorkLogo} className={classes.avatar} alt="logo" tooltip="working" />
          <Typography>Page is currently being worked on</Typography>
          <CardActions>
            <Button>Hover here to learn more</Button>
          </CardActions>
        </CardContent>
        <CardContent class="back">
          <Avatar src={DoWorkLogo} className={classes.avatar} alt="logo" tooltip="working" />
          <Typography>See the code on github</Typography>
          <CardActions>
            <Link src="https://github.com/David-Shibley?tab=repositories">Hover here to learn more</Link>
          </CardActions>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Portfolio;
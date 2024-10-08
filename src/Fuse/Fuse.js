import React, { useContext } from "react";
import { Button, Container, Drawer } from "@material-ui/core";
import GameContext from "./GameContext";
import Dice from "./Dice/Dice";
import LoginForm from "./LoginForm";
import { TableCards } from "./Card/TableCards";
import { PlayerCard } from "./Card/PlayerCard";
import { DrawerList } from "./Drawer/DrawerList";

const Fuse = () => {
  const {
    loggedIn,
    boardCards,
    playerCard,
    gameStarted,
    open,
    toggleDrawer,
    startGame,
    loginPlayer,
    completedCards,
    gameComplete,
  } = useContext(GameContext);

  if (gameComplete) {
    return <h1>Game Over! You completed {completedCards.length}</h1>;
  }

  if (loggedIn) {
    return (
      <Container>
        <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
          <DrawerList />
        </Drawer>
        <Button onClick={() => toggleDrawer(true)}>Room details</Button>
        <Button onClick={startGame}>Start Game</Button>
        <div id="demo"></div>
        <div style={{ display: "flex" }}>
          {boardCards && <TableCards />}
        </div>
        <div>
          {playerCard && playerCard.dice && <PlayerCard />}
        </div>
        {gameStarted && <Dice />}
      </Container>
    );
  } else {
    return <LoginForm loginPlayer={loginPlayer} />;
  }
};

export default Fuse;

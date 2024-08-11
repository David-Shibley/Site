import React, { useContext } from "react";
import { Tabs, Tab } from "@material-ui/core";
import GameContext from "../GameContext";
import { PlayerCard } from "../Card/PlayerCard";
import { CompletedCard } from "../Card/CompletedCard";

export const DrawerList = () => {
   const { room, players, completedCards, colorOptionIndex, onChangeColorOptionClick, playerCard } = useContext(GameContext);
    return (
      <div>
        <h1>Room: {room}</h1>
        <h2>Players:</h2>
        <ul>
          {players.map((player, index) => {
            return (
              <li style={{ padding: "20px" }} key={index}>
                <p style={{ color: player.color }}>{player.name}</p>
              </li>
            );
          })}
        </ul>
        <h2>Dice color options:</h2>
        <Tabs value={colorOptionIndex} onChange={onChangeColorOptionClick}>
          <Tab label="bold"></Tab>
          <Tab label="bright"></Tab>
          <Tab label="pastel"></Tab>
        </Tabs>

        <div>
          {playerCard && playerCard.dice && (
            <div>
              <h2>Current card</h2>
              <div><PlayerCard></PlayerCard></div>
            </div>
          )}
          {completedCards && completedCards.length > 0 && (
            <div>
              <h2>Completed cards</h2>
                {completedCards.map((card, index) => {
                  return (
                    <div key={index}>
                      <CompletedCard {...{ card }}></CompletedCard>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    );
  };
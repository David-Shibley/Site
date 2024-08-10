import React, { useContext } from "react";
import { Card, Button } from "@material-ui/core";
import GameContext from "../GameContext";
import { updateCardOwner } from "./helpers";

export const PlayerCard = () => {
  const { playerCard, socket, room, currentPlayer } = useContext(GameContext);
  return (
    <Card
      style={{
        height: "300px",
        width: "300px",
        margin: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: currentPlayer.color,
      }}
    >
      <Button
        onClick={() => updateCardOwner(playerCard, room, socket, currentPlayer)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {playerCard.dice.map((die, index) => {
            return (
              <div key={index}>
                <p>{die.value}</p>
                <p>{die.color}</p>
              </div>
            );
          })}
          {playerCard.owner && <p>{playerCard.owner.name}</p>}
        </div>
      </Button>
    </Card>
  );
};

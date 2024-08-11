import React, { useContext } from "react";
import { Card } from "@material-ui/core";
import GameContext from "../GameContext";

export const CompletedCard = ({ card }) => {
  const { currentPlayer } = useContext(GameContext);
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {card.dice.map((die, index) => {
            return (
              <div key={index}>
                <p>{die.value}</p>
                <p>{die.color}</p>
              </div>
            );
          })}
        </div>
    </Card>
  );
};

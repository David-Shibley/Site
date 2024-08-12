import React, { useContext } from "react";
import { Card } from "@material-ui/core";
import GameContext from "../GameContext";
import { COLOR_MAP, VALUE_MAP } from "../constants";

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
                <p>Value: {VALUE_MAP[die.value]}</p>
                <p>Color: {COLOR_MAP[die.color]}</p>
              </div>
            );
          })}
        </div>
    </Card>
  );
};

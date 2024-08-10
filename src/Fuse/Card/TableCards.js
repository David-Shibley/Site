import React, { useContext } from "react";
import { Card, Button } from "@material-ui/core";
import GameContext from "../GameContext";
import { updateCardOwner } from "./helpers";

export const TableCards = () => {
    const { currentPlayer, socket, room, boardCards } = useContext(GameContext);
    return boardCards.map((card, index) => {
      return (
        <Card
          key={index}
          style={{
            height: "300px",
            width: "300px",
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => updateCardOwner(card, room, socket, currentPlayer)}
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
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
              {card.owner && <p>{card.owner.name}</p>}
            </div>
          </Button>
        </Card>
      );
    });
  };
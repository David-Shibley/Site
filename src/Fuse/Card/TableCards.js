import React, { useContext } from "react";
import BasicCard from "./BasicCard";
import GameContext from "../GameContext";
import { updateCardOwner } from "./helpers";
import { VALUE_MAP, COLOR_MAP } from "../constants";

export const TableCards = () => {
  const { currentPlayer, socket, room, boardCards } = useContext(GameContext);
  
  return boardCards.map((card, index) => (
    <BasicCard
      key={index}
      onClick={() => updateCardOwner(card, room, socket, currentPlayer)}
      fade={!card.owner || card.owner.id !== currentPlayer.id}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {card.dice.map((die, index) => (
          <div key={index}>
            <p>Value: {VALUE_MAP[die.value]}</p>
            <p>Color: {COLOR_MAP[die.color]}</p>
          </div>
        ))}
        {card.owner && <p>{card.owner.name}</p>}
      </div>
    </BasicCard>
  ));
};

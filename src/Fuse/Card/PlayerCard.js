import React, { useContext } from "react";
import BasicCard from "./BasicCard";
import GameContext from "../GameContext";
import { updateCardOwner } from "./helpers";
import { getComplementaryColor } from "../helpers";
import { COLOR_MAP, VALUE_MAP } from "../constants";

export const PlayerCard = () => {
  const { playerCard, socket, room, currentPlayer } = useContext(GameContext);

  return (
    <BasicCard
      onClick={() => updateCardOwner(playerCard, room, socket, currentPlayer)}
      backgroundColor={currentPlayer.color}
      owner={playerCard.owner}
      fade={!playerCard.owner || playerCard.owner.id !== currentPlayer.id}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {playerCard.dice.map((die, index) => (
          <div key={index}>
            <p>Value: {VALUE_MAP[die.value]}</p>
            <p>Color: {COLOR_MAP[die.color]}</p>
          </div>
        ))}
        {playerCard.playedDice && playerCard.playedDice.map((die, index) => (
          <div key={index}>
            <p style={{ backgroundColor: die.color, color: getComplementaryColor(die.color) }}>{die.value}</p>
          </div>
        ))}
        {playerCard.owner && <p>{playerCard.owner.name}</p>}
      </div>
    </BasicCard>
  );
};
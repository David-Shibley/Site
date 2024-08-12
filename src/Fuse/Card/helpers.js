import { CardsList } from "./cards";

export const onUpdateCardOwner = ({
  card,
  player,
  players,
  currentPlayer,
  playerCard,
  boardCards,
  setBoardCards,
  setPlayerCard,
}) => {
  if (playerCard && playerCard.hash === card.hash) {
    if (currentPlayer && player.id === currentPlayer.id) {
      // if the player clicks on the card they have selected, it will be removed from their hand and added to the board
      const newCards = boardCards.concat(playerCard);
      if (newCards.length > 1) {
        setBoardCards(newCards);
      } else {
        setBoardCards(getRandomCards(players.length));
      }

      setPlayerCard({});
    }
  } else {
    if (playerCard && playerCard.hash) {
      if (currentPlayer && player.id === currentPlayer.id) {
        const newCards = boardCards.concat(playerCard).filter((c) => {
          return c.hash !== card.hash || c.hash === playerCard.hash;
        });
        if (newCards.length > 1) {
          setBoardCards(newCards);
        } else {
          setBoardCards(getRandomCards(players.length));
        }
        setPlayerCard({ ...card, owner: player });
      }
    } else {
      if (boardCards.length > 0) {
        const newCards = boardCards.filter((c) => {
          return c.hash !== card.hash || c.hash === playerCard.hash;
        });
        if (currentPlayer && player.id === currentPlayer.id) {
          setPlayerCard({ ...card, owner: player });
        }
        if (newCards.length > 1) {
          setBoardCards(newCards);
        } else {
          setBoardCards(getRandomCards(players.length));
        }
      }
    }
  }
};

export const updateCardOwner = (value, room, socket, currentPlayer) => {
  if (socket) {
    socket.emit("updateCardOwner", room, value, currentPlayer);
  }
};

export const isCardComplete = (card) => {
  const { playedDice, dice } = card;
  switch (card.comparator) {
    case "equal":
      if (playedDice && playedDice.length === dice.length) {
        if (dice.every((d) => d.value === "*")) {
          if (dice.every((d) => d.color === "*")) {
            return true;
          } else {
            return playedDice.every(
              (d) =>
                d.color ===
                (
                  dice.find(
                    (die) => die.color === d.color || die.color === "*"
                  ) || {}
                ).color
            );
          }
        } else {
          if (dice.every((d) => d.color === "*")) {
            return playedDice.every(
              (d) =>
                d.value ===
                (
                  dice.find(
                    (die) => die.value === d.value || die.value === "*"
                  ) || {}
                ).value
            );
          }
        }
      }
      return false;
    case "stack":
      return Boolean(card.completed);
    case "none":
      return Boolean(card.completed);
    default:
      return false;
  }
};

export const removedCardFromBoard = (
  card,
  players,
  boardCards,
  setBoardCards
) => {
  const newCards = boardCards.filter((c) => c.hash !== card.hash);
  if (newCards.length > 1) {
    setBoardCards(newCards);
  } else {
    setBoardCards(getRandomCards(players.length));
  }
};

export const markCardComplete = (
  card,
  completedCards,
  boardCards,
  players,
  setPlayerCard,
  setCompletedCards,
  setBoardCards
) => {
  card.completed = true;
  removedCardFromBoard(
    card,
    players,
    boardCards,
    setBoardCards
  );
  setPlayerCard({});
  setCompletedCards([...completedCards, card]);
};

export const getRandomCards = (numberOfPlayers) => {
  return CardsList.sort(() => Math.random() - 0.5).slice(0, numberOfPlayers);
};

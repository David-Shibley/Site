import { CardsList } from "./cards";

export const onUpdateCardOwner = ({
  card,
  player,
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
      setBoardCards(newCards);
      setPlayerCard({});
    }
  } else {
    if (playerCard && playerCard.hash) {
      if (currentPlayer && player.id === currentPlayer.id) {
        const newCards = boardCards.concat(playerCard).filter((c) => {
          return c.hash !== card.hash || c.hash === playerCard.hash;
        });
        setBoardCards(newCards);
        setPlayerCard(card);
      }
    } else {
      if (boardCards.length > 0) {
        const newCards = boardCards.filter((c) => {
          return c.hash !== card.hash || c.hash === playerCard.hash;
        });
        if (currentPlayer && player.id === currentPlayer.id) {
          setPlayerCard(card);
        }
        setBoardCards(newCards);
      }
    }
  }
};

export const updateCardOwner = (value, room, socket, currentPlayer) => {
  if (socket) {
    socket.emit("updateCardOwner", room, value, currentPlayer);
  }
};

export const getRandomCards = (numberOfPlayers) => {
    return CardsList.slice(0, numberOfPlayers);
  };
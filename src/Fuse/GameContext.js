import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { colorOptions } from "./styles";
import { getDice } from "./Dice/Dice";
import { updateDiceOwner } from "./Dice/helpers";
import {
  getRandomCards,
  onUpdateCardOwner,
  updateCardOwner,
} from "./Card/helpers";
import { startCountdownTimer, stopCountdownTimer } from "./helpers";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [boardCards, setBoardCards] = useState([]);
  const [playerCard, setPlayerCard] = useState({});
  const [playerDie, setPlayerDie] = useState({});
  const [dice, setDice] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [colorOptionIndex, setColorOptionIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [completedCards, setCompletedCards] = useState([]);
  const colorsArray = colorOptions[colorOptionIndex];

  useEffect(() => {
    const newSocket = io("site-server-production.up.railway.app");
    // const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("updatePlayers", (players) => {
      setPlayers(players);
    });

    socket.on("updateDiceOwner", (props) => {
      updateDiceOwner({ ...props, setDice });
    });

    socket.on("updateCardOwner", (card, player) => {
      onUpdateCardOwner({
        card,
        player,
        players,
        currentPlayer,
        playerCard,
        boardCards,
        setBoardCards,
        setPlayerCard,
      });
    });

    socket.on("startGame", (newDice) => {
      setDice(newDice);
      setGameStarted(true);
      const id = startCountdownTimer(setGameComplete);
      setIntervalId(id);
      setBoardCards(getRandomCards(players.length));
    });

    socket.on("setDice", (dice) => {
      setDice(dice);
    });

    return () => {
      socket.off("updateDiceOwner");
      socket.off("updatePlayers");
      socket.off("updateCardOwner");
      socket.off("setDice");
      socket.off("startGame");
    };
  }, [socket, currentPlayer, boardCards, playerCard, dice, gameStarted]);

  const loginPlayer = (room, player) => {
    setLoggedIn(true);
    setRoom(room);
    if (socket) {
      socket.emit("joinRoom", room, { ...player, id: socket.id });
    }
    setCurrentPlayer({ ...player, id: socket.id });
    setPlayers(players.concat(player));
  };

  const startGame = () => {
    getDice(dice, setDice, players, socket, colorsArray, room);
    if (socket) {
      socket.emit("startGame", room, dice);
    }
  };

  const onChangeColorOptionClick = (event, selection) => {
    setColorOptionIndex(selection);
  };

  return (
    <GameContext.Provider
      value={{
        loggedIn,
        room,
        players,
        currentPlayer,
        boardCards,
        completedCards,
        playerCard,
        playerDie,
        dice,
        gameStarted,
        colorOptionIndex,
        open,
        socket,
        gameComplete,
        loginPlayer,
        startGame,
        setDice,
        setBoardCards,
        setCompletedCards,
        setGameComplete,
        setPlayerCard,
        setPlayerDie,
        setOpen,
        toggleDrawer: setOpen,
        onChangeColorOptionClick,
        updateCardOwner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;

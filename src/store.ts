import { Store, useStore } from "@tanstack/react-store";
import type { PlayerInfo } from "./gen/file_pb";

// Define the initial state type
type State = {
  player: PlayerInfo | null;
};

// Initialize the store with a default state
export const store = new Store<State>({ player: null });

const setPlayer = (player: PlayerInfo) => {
  store.setState((s) => ({
    ...s,
    player,
  }));
};

const savePlayerStore = () => {
  const player = store.state.player;
  if (player) {
    localStorage.setItem("player", JSON.stringify(player));
  }
};

const loadPlayerStore = () => {
  const playerData = localStorage.getItem("player");
  if (playerData) {
    const player: PlayerInfo = JSON.parse(playerData);
    setPlayer(player);
  }
};

export const usePlayerStore = () => {
  const player = useStore(store, (s) => s.player);
  return { player, setPlayer, savePlayerStore, loadPlayerStore };
};

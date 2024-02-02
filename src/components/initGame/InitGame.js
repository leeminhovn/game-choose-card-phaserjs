import { useEffect, useRef, useState } from "react";
import { Game as PhaserGame } from "phaser";
import initalGameConfig from "./config_init_game";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import InitGameStyle from "./InitGameStyle.module.scss";
import { getLessons } from "@/service/api/lessons";
import PlayGameScreen from "../screens/playGameScreen/PlayGameScreen";


export default function GameMain() {
  const parentElGame = useRef(null);
  const [game, setGame] = useState(null);
  const [dataLessons, setDataLessons] = useState([]);

  useEffect(() => {
    getLessons().then((listLessons) => {
      setDataLessons(listLessons);
    });
  }, []);

  useEffect(() => {
    if (!parentElGame.current || dataLessons.length === 0) return;

    const width = parentElGame.current.offsetWidth;
    const height = parentElGame.current.offsetHeight;
    const newGame = new PhaserGame({
      ...initalGameConfig({
        width: width,
        height,
        listSence: [
          WelcomeScreen({ dataLessons: dataLessons }),
          PlayGameScreen(),
        ],
      }),
      parent: parentElGame.current,
      width: width,
      height: height,
    });

    setGame(newGame);
    return () => {
      newGame?.destroy(true, true);
      console.log("🐲 DESTROY 🐲");
    };
  }, [dataLessons]);
  return <div className={InitGameStyle.wrap} ref={parentElGame}></div>;
}

import PlayGameScreenHeader from "@/components/games/playGameScreen/header/PlayGameScreenHeader";
import TitleWord from "@/components/games/playGameScreen/titleWord/TitleWord";
import { getQuestionInLesson } from "@/service/api/lessons";
import { AudioName, GameScreenId, ImageName } from "@/untils/constant/games";
import {
  handleAddUrlPathImageAndAudio,
  shuffleArray,
} from "@/untils/helpers/fileHelper";
import {
  handleEndGame,
  handleNextGame,
  handleReturnCountItemByIdx,
} from "./playGameScreenFunc";
import ListAnswerItem from "@/components/games/playGameScreen/listAnswerItem/ListAnswerItem";

export default function PlayGameScreen(props) {
  class PlayGameScreenController extends Phaser.Scene {
    constructor() {
      super(GameScreenId.PLAY_GAME_SCREEN);
    }

    init(propsKeyPassData) {
      this.propsKeyPassData = propsKeyPassData;
      this.isPlaying = true;

      this.countLife = 3;
    }

    preload() {
      this.load.scenePlugin({
        key: "rexuiplugin",
        url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
        sceneKey: "rexUI",
      });

      this.load.image(
        ImageName.HEADER_GAME_PLAY_GAME,
        "assets/header_game_play_game.png"
      );
      this.load.image(ImageName.PAUSE_BTN, "assets/pause.png");
      this.load.image(ImageName.HOME_BTN, "assets/home_btn.png");
      this.load.image(ImageName.REPLAY_BTN, "assets/replay.png");
      this.load.image(ImageName.PLAY_BTN, "assets/play_button.png");
      this.load.image(ImageName.DEAD_ICON, "assets/dead_icon.png");
      this.load.image(ImageName.BACK_HARDCORE_2, "assets/back_hard_core_2.jpg");
      this.load.image(ImageName.BACK_HARDCORE_3, "assets/back_hard_core_3.jpg");
      this.load.image(ImageName.START_0_3, "assets/stars_0_3.png");
      this.load.image(ImageName.START_1_3, "assets/stars_1_3.png");
      this.load.image(ImageName.START_2_3, "assets/stars_2_3.png");
      this.load.image(ImageName.START_3_3, "assets/stars_3_3.png");

      this.load.audio(AudioName.CORRECT_AUDIO, "audios/correct_answer.mp3");
      this.load.audio(AudioName.INCORRECT_AUDIO, "audios/incorrect_answer.mp3");
      this.wordsLearn = handleAddUrlPathImageAndAudio(
        this.propsKeyPassData.data
      );
      this.wordsLearning = shuffleArray(this.wordsLearn).map((word, idx) => {
        return { ...word, countItem: handleReturnCountItemByIdx(idx) };
      });

      this.wordsLearn.forEach((word) => {
        word.picture && this.load.image(word.picture, word.picture);
        // audio
      });

      return true;
    }
    create() {
      // this.add.image(0, 0, ).setOrigin(0, 0);
      this.myBackgroundGame = this.add
        .sprite(0, 0, ImageName.BACKGROUND)
        .setOrigin(0, 0);
      PlayGameScreenHeader(this);
      TitleWord(this);
      this.handleNextGame = handleNextGame;
      const sence = this;
      this.events.on("change_game", (stauts) => {
        if (sence.wordsLearning.length === 0) {
          return;
        }
        const currentWord = sence.wordsLearning[0];

        const el_au = document.getElementById("audio-element");
        el_au.setAttribute("src", currentWord.audio);
        sence.events.emit("change_title_word", currentWord.content);
        ListAnswerItem(sence);
      });
      this.events.emit("change_game");
      this.events.on("end_game", () => {
        handleEndGame(sence);
      });
    }
    update() {}
  }
  return new PlayGameScreenController(props);
}

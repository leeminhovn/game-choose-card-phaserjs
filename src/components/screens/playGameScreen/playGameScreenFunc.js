import { PopupModal } from "@/commons/PopupModal";
import { AudioName, GameScreenId, ImageName } from "@/untils/constant/games";

export const handleCheckGame = (sence, status) => {
  sence.sound
    .add(status ? AudioName.CORRECT_AUDIO : AudioName.INCORRECT_AUDIO)
    .play();

  if (status === false) {
    sence.countLife--;
    sence.events.emit("decrease_life");

    switch (sence.countLife) {
      case 1: {
        sence.myBackgroundGame.setTexture(ImageName.BACK_HARDCORE_3);
        break;
      }
      case 2: {
        sence.myBackgroundGame.setTexture(ImageName.BACK_HARDCORE_2);

        break;
      }
      case 0: {
        sence.events.emit("end_game");
        break;
      }
    }
  } else {
    sence.wordsLearning.shift();
    const wordTotalLength = sence.wordsLearn.length;
    sence.progressPercent =
      ((wordTotalLength - sence.wordsLearning.length) / wordTotalLength) * 100;

    if (sence.wordsLearning.length === 0) {
      sence.events.emit("end_game");
    } else {
      sence.events.emit("change_game");
    }
  }
};
export const handleReturnCountItemByIdx = (idx) => {
  if (idx <= 1) {
    return 2;
  } else if (idx <= 3) {
    return 4;
  } else if (idx <= 5) {
    return 6;
  } else {
    return 9;
  }
};
export const handleEndGame = (scene) => {
  scene.isPlaying = false;
  popupEndGame(scene);
};
function popupEndGame(scene) {
  const popupController = PopupModal(scene, () => {}, false);
  scene.isPlaying = false;

  function closePopup() {
    scene.isPlaying = true;
    popupController.destroy();
  }
  const homeBtn = scene.add
    .image(-90, 90, ImageName.HOME_BTN)
    .setScale(0.22)
    .setInteractive()
    .on("pointerdown", () => {
      scene.scene.stop(GameScreenId.PLAY_GAME_SCREEN);
      scene.scene.start(GameScreenId.WELCOME_SCREEN);
      closePopup();
    });

  const replayBtn = scene.add
    .image(90, 90, ImageName.REPLAY_BTN)
    .setScale(0.22)
    .setInteractive()
    .on("pointerdown", () => {
      scene.scene.stop(GameScreenId.PLAY_GAME_SCREEN);
      scene.scene.start(GameScreenId.PLAY_GAME_SCREEN);
      closePopup();
    });
  const startsImage = scene.add.image(0, 0, RenderStartsByProgress(scene));
  // .setOrigin(0.5, 0.5);

  popupController.add(startsImage);
  popupController.add(homeBtn);
  popupController.add(replayBtn);
  return popupController;
}
const RenderStartsByProgress = (scene) => {
  const { START_0_3, START_1_3, START_2_3, START_3_3 } = ImageName;
  const listNameImage = [START_0_3, START_1_3, START_2_3, START_3_3];
  let indexImage;
  if (scene.progressPercent <= 20) {
    indexImage = 0;
  } else if (scene.progressPercent <= 40) {
    indexImage = 1;
  } else if (scene.progressPercent <= 90) {
    indexImage = 2;
  } else {
    indexImage = 3;
  }
  return listNameImage[indexImage];
};

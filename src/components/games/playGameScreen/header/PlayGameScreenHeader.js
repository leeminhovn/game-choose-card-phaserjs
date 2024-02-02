import { ImageName } from "@/untils/constant/games";
import {
  countDownTime,
  lifeDead,
  popupExitGame,
  progressBar,
} from "./playGameScreenHeaderFunc";

export default function PlayGameScreenHeader(sence) {
  class Header {
    constructor() {
      const widthCanvas = sence.game.config.width;
      const heightCanvas = sence.game.config.height;

      let containerWrap = sence.add.container(0, 5);

      let background_header = sence.add
        .image(0, 0, ImageName.HEADER_GAME_PLAY_GAME)
        .setOrigin(0, 0);
      background_header.displayWidth = widthCanvas; // Đặt chiều rộng mong muốn
      background_header.displayHeight = 60; // Đặt chiều cao mong muốn

      const wrap_rightSideContainer = sence.add.container(widthCanvas, 35);
      const wrap_leftSideContainer = sence.add.container(0, 35);
      const wrap_middleSideContainer = sence.add.container(widthCanvas / 2, 35);

      const iconBack = sence.add
        .image(30, -2, ImageName.PAUSE_BTN)
        .setScale(0.16)
        .setInteractive()
        .on("pointerdown", () => {
          popupExitGame(sence);
        });
      const countDownTimeController = countDownTime(sence, () => {
        sence.events.emit("end_game");
      }).setOrigin(0, 0);
      wrap_leftSideContainer.add(countDownTimeController);
      wrap_leftSideContainer.add(iconBack);

      wrap_middleSideContainer.add(progressBar(sence));
      wrap_rightSideContainer.add(lifeDead(sence, 3));
      containerWrap.add(background_header);
      containerWrap.add(wrap_rightSideContainer);
      containerWrap.add(wrap_leftSideContainer);

      // const
      containerWrap.add(wrap_middleSideContainer);
      containerWrap.setPosition(0, 0);
    }
  }

  // Thêm popup và các nút vào container (nếu cần)
  return new Header();
}

import { PopupModal } from "@/commons/PopupModal";
import { GameScreenId, ImageName } from "@/untils/constant/games";

export function popupExitGame(scene) {
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
      scene.scene.restart();
      closePopup();
    });
  const textExit = scene.add
    .text(
      0,
      0,
      `Bạn đang hoàn thành ${scene.progressPercent}%, bạn có chắc chắn muốn thoát???`,
      {
        fontSize: "20px",
        fill: "#fff",
        wordWrap: { width: 310 },
      }
    )
    .setOrigin(0.5, 0.5);

  const playBtn = scene.add
    .image(0, 90, ImageName.PLAY_BTN)
    .setScale(0.22)
    .setInteractive()
    .on("pointerdown", () => {
      closePopup();
    });

  popupController.add(playBtn);
  popupController.add(textExit);
  popupController.add(homeBtn);
  popupController.add(replayBtn);
  return popupController;
}

export const countDownTime = (scene, handleDoneTimeCount = () => {}) => {
  // Tạo biến để theo dõi thời gian
  scene.countTime = 60;

  // Tạo một text để hiển thị thời gian
  const timeController = (scene.timerText = scene.add.text(70, -15, "01:00", {
    fontSize: "24px",
    fontWeight: "bold",
    fill: "#fff",
  }));
  function formatTime(seconds) {
    // Tính phút và giây
    const minutes = Math.floor(seconds / 60);
    const partInSeconds = seconds % 60;

    // Thêm số 0 nếu cần
    const padZero = (num) => String(num).padStart(2, "0");

    // Trả về chuỗi định dạng
    return `${padZero(minutes)}:${padZero(partInSeconds)}`;
  }
  scene.updateTimer = () => {
    // Tăng thời gian đã trôi qua
    if (scene.isPlaying === false) {
      return;
    }
    scene.countTime--;

    // Cập nhật văn bản hiển thị
    scene.timerText.setText(formatTime(scene.countTime));
  };

  // Tạo một bộ đếm thời gian
  scene.time.addEvent({
    delay: 1000, // 1000 ms = 1 giây
    callback: scene.updateTimer,
    callbackScope: scene,
    loop: true,
  });
  return timeController;
};
export const progressBar = (scene) => {
  scene.progressBarContainer = scene.add.container(-90, -10);
  createProgressBar(scene);
  scene.progressPercent = 0;

  // Cập nhật progressBar mỗi giây
  let incr = 0.1;
  let currentValue = 6;
  scene.time.addEvent({
    delay: 10,
    callback: () => {
      if (currentValue < Math.min(scene.progressPercent, 100)) {
        currentValue += incr;
      }

      updateProgressBar(scene, currentValue);
    },
    loop: true,
  });
  const updateProgressBar = (scene, percent) => {
    // Cập nhật chiều rộng của phần hiển thị tiến trình
    let width = (scene.game.config.width / 500) * 200 * (percent / 100);
    let height = 15;

    scene.progressBarFill.clear();
    scene.progressBarFill.fillStyle(0xffc01740, 1);
    // scene.progressBarFill.fillRect(0, 0, width, 20);
    scene.progressPercent > 6 &&
      scene.progressBarFill.fillRoundedRect(0, 0, width, height, 8);
  };
  return scene.progressBarContainer;
};
const createProgressBar = (scene) => {
  // Kích thước của progressBar
  let width = (scene.game.config.width / 500) * 200;
  let height = 15;
  // Tạo phần nền của progressBar
  scene.progressBarBg = scene.add.graphics();
  scene.progressBarBg.fillStyle(0x666666, 1);
  // scene.progressBarBg.fillRect(0, 0, width, height);
  scene.progressBarBg.fillRoundedRect(0, 0, width, height, 8);

  scene.progressBarContainer.add(scene.progressBarBg);
  // Tạo phần hiển thị tiến trình
  scene.progressBarFill = scene.add.graphics();
  scene.progressBarFill.fillStyle(0xffc01740, 1);

  scene.progressBarContainer.add(scene.progressBarFill);
};

export const lifeDead = (scene, count) => {
  const containerLife = scene.add.container(-110, 0);
  const listImages = [];
  for (let i = 0; i < count; i++) {
    listImages.push(
      scene.add.image(i * 40, -5, ImageName.DEAD_ICON).setScale(0.1)
    );
  }
  containerLife.add(listImages);

  scene.events.on("decrease_life", () => {
    removeLastItem(containerLife);
  });
  return containerLife;
};
export const removeLastItem = (container) => {
  if (container.list.length > 0) {
    let lastImage = container.list[container.list.length - 1];
    container.remove(lastImage, true); // Xóa bức ảnh cuối cùng
  }
};

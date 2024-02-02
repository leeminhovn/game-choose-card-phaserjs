import { ImageName } from "@/untils/constant/games";

export const PopupModal = function (
  sence,
  closeIconClick = () => {},
  isShowCloseIcon = true
) {
  // const overlay = sence.add.graphics();
  // overlay.fillStyle(0x666666, 1); // Màu xanh

  // overlay.fillRoundedRect(
  //   0,
  //   0,
  //   sence.game.config.width,
  //   sence.game.config.height
  // ); // x, y, width, height, radius

  let popupContainer = sence.add.container(
    sence.game.config.width / 2,
    sence.game.config.height / 2
  );

  // Tạo background cho popup
  let popup_wrap = sence.add.image(0, 0, ImageName.PANEL_WINDOW_POPUP);
  // Điều chỉnh kích thước của background
  popup_wrap.displayWidth = 360; // Đặt chiều rộng mong muốn
  popup_wrap.displayHeight = 260; // Đặt chiều cao mong muốn
  popupContainer.add(popup_wrap);

  if (isShowCloseIcon) {
    // Tạo nút đóng
    let closeButton = sence.add
      .image(-150, -105, ImageName.ARROW_LEFT_BTN)
      .setScale(0.15)
      .setInteractive()
      .on("pointerdown", () => {
        closeIconClick();

        popupContainer.destroy();
      });

    popupContainer.add(closeButton);
  }

  // Thêm popup và các nút vào container (nếu cần)
  return popupContainer;
};

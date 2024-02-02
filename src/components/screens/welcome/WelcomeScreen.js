import { GameScreenId, ImageName } from "@/untils/constant/games";
import { CreateItems, createCellContainerCallback } from "./welComeScreenFunc";
import { PopupModal } from "@/commons/PopupModal";
import { getQuestionInLesson } from "@/service/api/lessons";

export default function WelcomeScreen(props) {
  class WelcomeScreenController extends Phaser.Scene {
    constructor() {
      super(GameScreenId.WELCOME_SCREEN);
      this.dataLessons = props.dataLessons || [];
    }
    init() {
      //If you want change the default configuration before start the plugin
      this.widthCavnas = this.game.config.width;
      this.heightCavnas = this.game.config.height;
    }
    preload() {
      this.load.image(ImageName.BACKGROUND, "assets/back_1.jpg");
      this.load.image(ImageName.PLAY_BTN, "assets/play_button.png");
      this.load.image(ImageName.ARROW_LEFT_BTN, "assets/arrow_left_btn.png");
      this.load.image(ImageName.BORDER_CARD, "assets/border_card.png");
      this.load.image(
        ImageName.PANEL_WINDOW_POPUP,
        "assets/panel_window_popup.png"
      );
      this.load.scenePlugin({
        key: "rexuiplugin",
        url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
        sceneKey: "rexUI",
      });
      this.dataLessons.forEach((lesson) => {
        this.load.image(lesson.image, lesson.image);
      });
    }

    create() {
      this.add.image(0, 0, ImageName.BACKGROUND).setOrigin(0, 0);
      let items = CreateItems(this.dataLessons);

      let scrollablePanel = this.rexUI.add
        .scrollablePanel({
          x: this.widthCavnas / 2,
          y: this.heightCavnas / 2,
          width: this.widthCavnas,
          height: this.heightCavnas,

          scrollMode: 0,

          background: this.add.image(0, 0, ImageName.BACKGROUND),
          panel: {
            child: CreateGrid(this, items, 3),
            mask: {
              padding: 2,
            },
          },
          mouseWheelScroller: true,
          mouseWheelScroller: {
            // focus: true,
            speed: 1,
          },

          space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            panel: 10,
          },
        })
        .layout();

      scrollablePanel
        .setChildrenInteractive({
          targets: [scrollablePanel.getByName("table", true)],
        })

        .on(
          "child.click",
          async function (child) {
            let item = child.getData("item");

            if (!item || !item.titleLesson) {
              return;
            }
            let icon = child.getElement("icon");
            if (this.rexUI.isInTouching(icon)) {
              if (localStorage.getItem("token")) {
                const data = await getQuestionInLesson(item.lessonInfoData.id);
                this.scene.stop(GameScreenId.WELCOME_SCREEN);
                this.scene.start(GameScreenId.PLAY_GAME_SCREEN, {
                  data,
                });
                return;
              }
              const popupContainer = PopupModal(this);
              let loginButton = this.add
                .text(-50, 80, "Đăng nhập", {
                  fontSize: "20px",
                  fill: "#fff",
                })
                .setInteractive()
                .on("pointerdown", () => {
                  window.location.href = `${process.env.NEXT_PUBLIC_ACCOUNT}?url-callback=${process.env.NEXT_PUBLIC_WEB_URL}`;
                });
              let textLogin = this.add
                .text(0, 0, "Vui lòng đăng nhập trước khi bắt đầu vào học", {
                  fontSize: "20px",
                  fill: "#fff",
                  wordWrap: { width: 310 },
                })
                .setOrigin(0.5, 0.5);
              popupContainer.add(textLogin);
              popupContainer.add(loginButton);
            }
          },
          this
        );
    }

    update() {}
  }
  return new WelcomeScreenController(props);
}

let CreateGrid = function (scene, items, col) {
  if (col === undefined) {
    col = 1;
  }

  return scene.rexUI.add.gridSizer({
    column: col,
    row: Math.ceil(items.length / col),

    columnProportions: 1,

    createCellContainerCallback: (...props) =>
      createCellContainerCallback(
        props[0],
        props[1],
        props[2],
        props[3],
        items,
        col
      ),

    name: "table",
  });
};

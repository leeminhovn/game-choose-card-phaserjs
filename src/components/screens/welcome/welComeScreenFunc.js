import { ImageName } from "@/untils/constant/games";

const Random = Phaser.Math.Between;

export function createCellContainerCallback(scene, x, y, config, items, col) {
  config.expand = true;
  let item = items[y * col + x];
  if (item === undefined) {
    return;
  }
  let cellContainer = CreateCellContainer(scene, item).setData("item", item);
  if (item) {
    cellContainer
      .getElement("icon")
      .setTexture(item.background_lesson)
      .setScale(
        (scene.game.config.width / 500) * 0.5,
        (scene.game.config.width / 500) * 0.5
      );

    cellContainer.getElement("titleLesson_key").setText(item.titleLesson);
    cellContainer
      .getElement("border_image_item_key")
      .setTexture(ImageName.BORDER_CARD)
      .setTint(item.color)
      .setScale(
        (scene.game.config.width / 500) * 0.85,
        (scene.game.config.width / 500) * 0.85
      );
  }
  return cellContainer;
}

let CreateCellContainer = function (scene, item) {
  return (
    scene.rexUI.add
      .overlapSizer({
        // height: 50,
        space: {
          left: 5, // Padding/margin from the left
          right: 5, // Padding/margin from the right
          top: 10, // Padding/margin from the top
          bottom: 10, // Padding/margin from the bottom
        },
      })

      // .addBackground(
      //   scene.rexUI.add
      //     .roundRectangle(0, 0, 20, 20, 0)
      //     .setStrokeStyle(2, COLOR_DARK)
      // )
      .add(scene.add.image(0, 0, ""), {
        key: "background_lesson_key",
        align: "center",
        expand: false,
      })
      .add(scene.add.image(0, 0, ""), {
        key: "border_image_item_key",
        align: "center",
        expand: false,
      })
      .add(scene.add.image(0, 0, ""), {
        key: "icon",
        align: "center",
        expand: false,
      })

      .add(
        scene.add.text(0, 0, "", {
          fontSize: "16px", // Kích thước font ban đầu
          wordWrap: { width: 100 },
        }),
        {
          key: "titleLesson_key",
          align: "center",
          expand: false,
        }
      )
      .add(scene.add.text(0, 0, ""), {
        key: "id",
        align: "center",
        expand: false,
      })
  );
};
export const CreateItems = function (dataLessons) {
  let data = [];
  for (let i = 0; i < dataLessons.length; i++) {
    data.push({
      id: i,
      border_image_item: ImageName.BORDER_CARD,
      color: Random(0, 0xffffff),
      titleLesson: dataLessons[i].description,
      background_lesson: dataLessons[i].image,
      lessonInfoData: dataLessons[i],
    });
  }
  return data;
};


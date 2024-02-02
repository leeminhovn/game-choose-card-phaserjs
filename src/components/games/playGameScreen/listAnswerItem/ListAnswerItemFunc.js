import { handleCheckGame } from "@/components/screens/playGameScreen/playGameScreenFunc";
import { ImageName } from "@/untils/constant/games";
import { shuffleArray } from "@/untils/helpers/fileHelper";

const Random = Phaser.Math.Between;

export function createCellContainerAnswerCallback(
  scene,
  x,
  y,
  config,
  items,
  col
) {
  config.expand = true;
  let item = items[y * col + x];
  if (item === undefined) {
    return;
  }
  let cellContainer = CreateCellContainer(scene, item).setData("item", item);

  scene.tweens.add({
    targets: cellContainer,
    scaleX: { from: 0.5, to: 1 },
    scaleY: { from: 0.5, to: 1 },
    ease: "Power1",
    duration: Math.max(y, 1) * Math.max(x, 1) * 120,
  });
  const sizeItem = setSizeOfITem(items.length);
  if (item) {
    cellContainer
      .getElement("border_image_item_key")
      .setTexture(ImageName.BORDER_CARD)
      .setTint(item.color)
      .setScale(
        (scene.game.config.width / sizeItem) * 0.85,
        (scene.game.config.width / sizeItem) * 0.85
      )
      .setInteractive()
      .on("pointerdown", () => {
        if (scene.wordsLearning.length === 0) {
          return;
        }
        const currentWord = scene.wordsLearning[0];
        const isCorrect = item.id === currentWord.id;
        handleCheckGame(scene, isCorrect);
        if (isCorrect === false) {
          const elImageWord = cellContainer.getElement("image_word_key");
          const elImageBorder = cellContainer.getElement(
            "border_image_item_key"
          );
          elImageWord.destroy();
          elImageBorder.destroy();
        }
      });
    cellContainer
      .getElement("image_word_key")
      .setTexture(item.image_word_key)
      .setScale(
        (scene.game.config.width / sizeItem) * 0.5,
        (scene.game.config.width / sizeItem) * 0.5
      );
  }
  return cellContainer;
}

let CreateCellContainer = function (scene, item) {
  return scene.rexUI.add
    .overlapSizer({
      space: {
        left: 5, //
        right: 5, // P
        top: 10, //
        bottom: 10, // Pa
      },
    })

    .add(scene.add.image(0, 0, ""), {
      key: "border_image_item_key",
      align: "center",
      expand: false,
    })
    .add(scene.add.image(0, 0, ""), {
      key: "image_word_key",
      align: "center",
      expand: false,
    })
    .add(scene.add.text(0, 0, ""), {
      key: "id",
      align: "center",
      expand: false,
    });
};
export const CreateItems = function (sence, limitItem) {
  const correctWord = sence.wordsLearning[0];
  let data = [];
  let otherAnswer = shuffleArray(sence.wordsLearn).filter(
    (word) => word.id !== correctWord.id
  );
  data = shuffleArray([correctWord, ...otherAnswer.splice(0, limitItem - 1)]);
  data = data.map((word, idx) => {
    return {
      id: word.id,
      border_image_item: ImageName.BORDER_CARD,
      color: Random(0, 0xffffff),
      image_word_key: word.picture,
    };
  });
  // for (let i = 0; i < limitItem; i++) {
  //   data.push({
  //     id: i,
  //     border_image_item: ImageName.BORDER_CARD,
  //     color: Random(0, 0xffffff),
  //     background_lesson: dataWords[i].image,
  //     wordInfoData: dataWords[i],
  //   });
  // }
  return data;
};
export const renderColByItemCount = (count) => {
  if (count === 2) {
    return 1;
  } else if (count <= 6) {
    return 2;
  } else {
    return 3;
  }
};
const setSizeOfITem = (countItem) => {
  if (countItem <= 2) {
    return 280;
  } else if (countItem <= 4) {
    return 300;
  } else if (countItem <= 6) {
    return 400;
  } else {
    return 450;
  }
};
// if (idx <= 1) {
//   return 2;
// } else if (idx <= 3) {
//   return 4;
// } else if (idx <= 5) {
//   return 6;
// } else {
//   return 9;
// }

import {
  CreateItems,
  createCellContainerAnswerCallback,
  renderColByItemCount,
} from "./ListAnswerItemFunc";

export default function ListAnswerItem(sence) {
  const containerListAnswerItem = sence.add.container(
    sence.game.config.width / 2,
    140
  );
  sence.oldListAnswerItem && sence.oldListAnswerItem.removeAll(true);
  const limitItem = sence.wordsLearning[0].countItem;
  let items = CreateItems(sence, limitItem);
  sence.oldListAnswerItem = CreateGrid(
    sence,
    items,
    renderColByItemCount(limitItem)
  );
  containerListAnswerItem.add(sence.oldListAnswerItem.layout());
  return containerListAnswerItem;
}

let CreateGrid = function (scene, items, col) {
  if (col === undefined) {
    col = 1;
  }
  return scene.rexUI.add.gridSizer({
    y: (scene.game.config.width / 450) * 250,
    column: col,
    row: Math.ceil(items.length / col),

    columnProportions: 1,

    createCellContainerCallback: (...props) =>
      createCellContainerAnswerCallback(
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

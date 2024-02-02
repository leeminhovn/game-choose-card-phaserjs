import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
function initalGameConfig({
  preload = () => {},
  create = () => {},
  update = () => {},
  width,
  height,
  listSence = [],
}) {
  const gameConfig = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: [...listSence],
  };
  return gameConfig;
}
export default initalGameConfig;

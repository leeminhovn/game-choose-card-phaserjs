export default function TitleWord(scene) {
  const controllerTitleWord = scene.add.container(0, 80);
  let graphics = scene.add.graphics();
  const widthTitle = 300;
  const borderRadius = 20;

  graphics.fillStyle(0x666666, 1);
  graphics.fillRoundedRect(0, 0, widthTitle, 40, borderRadius);

  scene.myText = scene.add.text(
    scene.game.config.width / 2,
    // - widthTitle / 2,
    10,
    "Hello Phaser!",
    {
      fontSize: "24px",
      fill: "#FFFFFF",
    }
  );
  scene.myText.setOrigin(0.5, 0);
  scene.myText.setAlpha(0);

  const changeTextWithFadeEffect = (newText) => {
    scene.myText.setText(newText);
    applyTextFadeIn(newText);
  };
  // Lắng nghe sự kiện 'changeText'
  scene.events.on("change_title_word", changeTextWithFadeEffect, scene);

  const applyTextFadeIn = (text) => {
    scene.myText.setAlpha(0);
    scene.myText.setText(text);
    scene.tweens.add({
      targets: scene.myText,
      alpha: 1,
      ease: "Linear",
      duration: 1000,
    });
  };

  graphics.lineStyle(2, 0xffc01740, 1);
  graphics.strokeRoundedRect(0, 0, widthTitle, 40, borderRadius);
  graphics.setPosition(scene.game.config.width / 2 - widthTitle / 2, 0);

  controllerTitleWord.add(graphics);
  controllerTitleWord.add(scene.myText);

  return controllerTitleWord;
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {
    for (const key in _CONFIG.imageLoader) {
      this.load.image(key, _CONFIG.imageLoader[key]);
    }
    for (const key in _CONFIG.soundsLoader) {
      this.load.audio(key, _CONFIG.soundsLoader[key]);
    }
    for (const key in _CONFIG.libLoader) {
      this.load.image(key, _CONFIG.libLoader[key]);
    }
    displayProgressLoader.call(this);
  }

  create() {
    // --- Basic Scene Setup ---
    this.zones = [];
    this.width = this.game.config.width;
    this.height = this.game.config.height;
    this.cameras.main.setBackgroundColor("#000000");
    this.input.keyboard.on("keydown-ESC", () => this.pauseGame());

    // --- Timer Setup ---
    this.initialTime = 600000; // 10 minutes (was 1200000 for 20 minutes). Lower is faster.
    this.registry.set("timer", this.initialTime);
    this.registry.set("lateForSchool", false);
    this.startTimer();
    this.createTimerClock();

    this.updateTimerClock(this.initialTime);

    // --- World and Character Setup ---
this.add.tileSprite(0, 0, this.width, this.height, 'grass')
    .setOrigin(0, 0)
    .setDepth(0);
        const graphics = this.add.graphics();
    const points = [
      { x: this.width / 3.5, y: -50 },
      { x: this.width / 3.5 + 100, y: 150 },
      { x: this.width / 3.5 - 100, y: 350 },
      { x: this.width / 3.5 + 100, y: 550 },
      { x: this.width / 3.5, y: this.height + 50 },
    ];
    const roadPath = new Phaser.Curves.Spline(points);
    graphics.lineStyle(80, 0x333333, 1);
    roadPath.draw(graphics);
    const yellowLineGraphics = this.add.graphics();
    yellowLineGraphics.lineStyle(4, 0xffeb3b, 1);
    const linePoints = roadPath.getPoints(100);
    for (let i = 0; i < linePoints.length - 1; i++) {
      if (i % 4 < 2) {
        const startPoint = linePoints[i];
        const endPoint = linePoints[i + 1];
        yellowLineGraphics.lineBetween(
          startPoint.x,
          startPoint.y,
          endPoint.x,
          endPoint.y
        );
      }
    }
const horizontalOffset = 150; // Adjust this value to move things more or less

    this.add.rectangle(0, 0, this.width, this.height, 0x000000, 0.4)
        .setOrigin(0,0)
        .setDepth(1); // Ensure it's above the grass but below everything else

const vignetteTexture = this.make.graphics({x: 0, y: 0, add: false});
const w = this.width;
const h = this.height;
const radius = h * 0.8; // Make the lit area larger
vignetteTexture.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 1, 1, 0, 1);
vignetteTexture.fillCircle(w / 2, h / 2, radius);
vignetteTexture.generateTexture('vignette', w, h);
this.add.image(0, 0, 'vignette').setOrigin(0,0).setDepth(90).setAlpha(0.6);


const playground = this.add
    .image(this.width * 0.17, this.height * 0.72, "playground") // Bottom-left
    .setDepth(3)
    .clearTint()
    .setInteractive({ useHandCursor: true });

const shop = this.add
    .image(this.width * 0.38, this.height * 0.48, "shop") // Center-right
    .setDepth(3)
    .clearTint()
    .setInteractive({ useHandCursor: true });

const school = this.add
    .image(this.width * 0.22, this.height * 0.15, "school") // Top-left
    .setDepth(3)
    .clearTint()
    .setInteractive({ useHandCursor: true });

this.man = this.add
    .image(this.width * 0.30, this.height * 0.87, "man") // Bottom-center
    .setDisplaySize(150, 165) // Slightly smaller to fit the scene better
    .setDepth(4)
    .clearTint() // Make player brighter
    .setInteractive();
      
    const title = this.add
      .text(this.man.x + 25, this.man.y - 50, `${playerName}`, {
        fontSize: "32px",
        color: "#ffffffff",
        fontFamily: "Comic Sans MS",
      })
      .setDepth(5)
      .setVisible(false);
    this.man.on("pointerover", () => {
      title.setVisible(true);
    });
    this.man.on("pointerout", () => {
      title.setVisible(false);
    });
    this.zones.push(playground, shop, school);
    lockedZones.forEach((zoneName) => {
      const zone = this.zones.find((zone) => zone.texture.key === zoneName);
      if (zone) {
        zone.setDisplaySize(zone.displayWidth * 0.8, zone.displayHeight * 0.8);
        zone.setTint(0x4a4a4a);
        zone.disableInteractive();
      }
    });
this.zones.forEach((zone) => {
      // Set the initial scale to 1 after setting the display size
      zone.setScale(1); 

      const zoneText = this.add
        .text(
          zone.x, // Centered horizontally with the zone
          zone.y + zone.displayHeight / 2 + 20, // Positioned below the zone
          zone.texture.key.charAt(0).toUpperCase() + zone.texture.key.slice(1),
          { 
            fontSize: "48px", 
            color: "#b91c1c", // A blood-red color
            fontFamily: "'Courier New', monospace", // Horror font
            align: 'center'
          }
        )
        .setDepth(5)
        .setOrigin(0.5) // Center the text's origin
        .setShadow(2, 2, '#000000', 2, true, true) // Add a drop shadow
        .setVisible(false);

// Inside the zones.forEach loop...
      zone.on("pointerover", () => {
        // A "twitch" effect instead of a smooth scale
        this.tweens.add({
          targets: zone,
          scale: 1.05,
          angle: Phaser.Math.Between(-2, 2), // Add a slight, random rotation
          duration: 100,
          yoyo: true, // Quickly snap back
          ease: "Power1",
        });
        zoneText.setVisible(true);
      });

      zone.on("pointerout", () => {
        this.tweens.add({
          targets: zone,
          scale: 1, // Return to original scale
          duration: 200,
          ease: "Power1",
        });
        zoneText.setVisible(false);
      });
      
      zone.on("pointerdown", () => {
        this.tweens.add({
          targets: zone,
          scale: 0.95,
          duration: 100,
          ease: "Power1",
          yoyo: true, 
          onComplete: () => {
            zone.setScale(1); // Reset scale before transitioning
            this.playZoneTransition(zone);
          }
        });
      });
    });

    // --- OBJECTIVE SYSTEM INITIALIZATION ---
    this.currentTaskIndex = 0;
    this.isCompletingObjective = false;
    this.createObjectivePanel();

    // TEMPORARY: Press 'C' to complete the current objective for testing
    this.input.keyboard.on("keydown-C", () => this.completeObjective());
  }

  update() {

}

  // --- NEW: OBJECTIVE UI FUNCTIONS ---
// In MenuScene.js, replace your createObjectivePanel function with this one

createObjectivePanel() {
    // --- Define layout variables ---
    const panelWidth = 450; // Keeping the large paper size
    const leftPadding = 40; // Increased padding to position text inside the paper's margin line

    const currentObjective = playerTasks[this.currentTaskIndex];
    if (!currentObjective) return;

    // Adjust height calculation for new font sizes
    const panelHeight = 150 + (currentObjective.tasks.length * 60);

    // Position container
    const panelX = this.width - panelWidth - 30;
    const panelY = this.height - panelHeight - 30;
    this.objectivePanel = this.add.container(panelX, panelY).setDepth(100);

    // --- Create the paper background ---
    const panelBG = this.add.image(0, 0, 'paper sheet')
        .setOrigin(0, 0)
        .setDisplaySize(panelWidth, panelHeight);
        
    // --- Create Text Elements with simple, plain white, and larger fonts ---
    const titleText = this.add
        .text(panelWidth / 2, 40, "OBJECTIVE", {
            font: "bold 40px Creepster", // Simple, bigger font
            fill: "#6a3210",         // Plain white text
        })
        .setOrigin(0.5, 0.5);

    this.objectiveZoneText = this.add
        .text(leftPadding, 100, `Go to the ${currentObjective.zone}`, {
            font: "32px Special Elite", // Simple, bigger font
            fill: "#6a3210",      // Plain white text
        })
       .setOrigin(-0.2, 0.5);

    this.objectiveTaskTexts = [];
    let currentTaskY = 160; // Adjusted starting Y for tasks
    currentObjective.tasks.forEach((task) => {
        const taskText = this.add
            .text(leftPadding + 20, currentTaskY, `- ${task}`, { // Indented slightly
                font: "28px Special Elite", // Simple, bigger font
                fill: "#6a3210",      // Plain white text
            })
            .setOrigin(-0.4, 0.5);
        this.objectiveTaskTexts.push(taskText);
        currentTaskY += 60; // Spacing between tasks
    });

    // Add elements to the container
    this.objectivePanel.add([panelBG, titleText, this.objectiveZoneText, ...this.objectiveTaskTexts]);
}

  completeObjective() {
    if (
      this.isCompletingObjective ||
      this.currentTaskIndex >= playerTasks.length
    )
      return;
    this.isCompletingObjective = true;

    // 1. Strike out completed tasks
    this.objectiveTaskTexts.forEach((taskText) => {
      const strike = this.add.graphics().lineStyle(2, 0xff0000);
      taskText.add(strike); // Add strike directly to the text object

      this.tweens.add({
        targets: { width: 0 },
        width: taskText.width,
        duration: 400,
        ease: "Power2",
        onUpdate: (tween) => {
          strike
            .clear()
            .lineStyle(2, 0xff0000)
            .lineBetween(
              0,
              taskText.height / 2,
              tween.targets.width,
              taskText.height / 2
            );
        },
      });
    });

    // 2. Move the player image
    const completedZoneKey = playerTasks[this.currentTaskIndex].zone;
    const targetZone = this.zones.find(
      (z) => z.texture.key === completedZoneKey
    );

    if (targetZone) {
      this.time.delayedCall(500, () => {
        this.tweens.add({
          targets: this.man,
          x: targetZone.x,
          y: targetZone.y + targetZone.displayHeight / 2 - 50, // Position near the bottom of the zone
          duration: 1500,
          ease: "Sine.easeInOut",
          onComplete: () => {
            // 3. Update the objective panel to the next one
            this.currentTaskIndex++;
            this.updateObjectivePanel();
            this.isCompletingObjective = false;
          },
        });
      });
    } else {
      // If no zone, just update panel
      this.time.delayedCall(500, () => {
        this.currentTaskIndex++;
        this.updateObjectivePanel();
        this.isCompletingObjective = false;
      });
    }
  }

  updateObjectivePanel() {
    // Fade out the old panel
    this.tweens.add({
      targets: this.objectivePanel,
      alpha: 0,
      duration: 300,
      onComplete: () => {
        // Clear old content and rebuild with new
        this.objectivePanel.destroy();
        if (this.currentTaskIndex < playerTasks.length) {
          this.createObjectivePanel();
          this.objectivePanel.setAlpha(0);
          // Fade in the new panel
          this.tweens.add({
            targets: this.objectivePanel,
            alpha: 1,
            duration: 300,
          });
        } else {
          // All tasks are complete
          console.log("All objectives finished!");
        }
      },
    });
  }

  // --- Other Scene Functions (Unchanged) ---

  startTimer() {
    const timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        let currentTime = this.registry.get("timer");
        currentTime -= 1000;
        this.registry.set("timer", currentTime);
        this.updateTimerClock(currentTime);
        if (currentTime <= 0) {
          this.registry.set("lateForSchool", true);
          timerEvent.remove();
        }
      },
      loop: true,
    });
    this.registry.set("gameTimerEvent", timerEvent);
  }

// In MenuScene.js, inside the createTimerClock function

createTimerClock() {
    // --- Clock Position and Size ---
    const clockX = this.width - 110;
    const clockY = 110;
    const radius = 95;

    // --- Glow Settings ---
    const glowLayers = 20;
    const maxGlowSize = 18;
    const startGlowAlpha = 0.08;

    // Create the layered glow effect (Depth: 200)
    for (let i = 0; i < glowLayers; i++) {
        const t = i / (glowLayers - 1);
        const alpha = startGlowAlpha * (1 - t);
        const size = radius + (t * maxGlowSize);
        this.add.graphics().fillStyle(0xffffff, alpha).fillCircle(clockX, clockY, size).setDepth(200);
    }

    // 1. Add the clock face IMAGE (Depth: 201)
    this.add.image(clockX, clockY, 'clock_face')
        .setDisplaySize(radius * 2, radius * 2)
        .setDepth(201);

    // 2. Add the short hour hand IMAGE (Depth: 202)
    this.hourHand = this.add.image(clockX, clockY, 'short_hand')
        .setOrigin(0.5, 1)
        .setDisplaySize(12, radius * 0.45)
        .setDepth(202);

    // Set the hour hand to 3 o'clock
    // 3 o'clock is 90 degrees clockwise from 12 o'clock (which is -PI/2 in radians)
    // So, -PI/2 + PI/2 = 0 radians, which is pointing right.
    this.hourHand.setRotation(Math.PI / 2); // 3 o'clock is 90 degrees clockwise = PI/2 radians

    // 3. Add the long timer hand IMAGE (Depth: 203)
    this.timerHand = this.add.image(clockX, clockY, 'long_hand')
        .setOrigin(0.5, 1)
        .setDisplaySize(10, radius * 0.60)
        .setDepth(203);

    this.timerHand.setRotation(Math.PI / 2);

    // The timerHand's initial rotation will be handled by the updateTimerClock(this.initialTime)
}

// In MenuScene.js, replace your existing updateTimerClock function

updateTimerClock(currentTime) {
    // Calculate the progress of the timer (from 0 to 1)
    const progress = 1 - (currentTime / this.initialTime);

    // Convert progress to an angle in radians
    const angle = (progress * 2 * Math.PI) - (Math.PI / 2);

    // Set the rotation of the timer hand image
    this.timerHand.setRotation(angle);
}

  playZoneTransition(zone) {
    this.zones.forEach((z) => z.disableInteractive());
    const maskGraphics = this.make.graphics();
    this.cameras.main.setMask(maskGraphics.createGeometryMask());
    const maxRadius =
      (Math.max(zone.displayWidth, zone.displayHeight) / 2) * 1.05;
    const startRadius = Math.max(
      Phaser.Math.Distance.Between(zone.x, zone.y, 0, 0),
      Phaser.Math.Distance.Between(zone.x, zone.y, this.width, 0),
      Phaser.Math.Distance.Between(zone.x, zone.y, 0, this.height),
      Phaser.Math.Distance.Between(zone.x, zone.y, this.width, this.height)
    );
    const tweenHelper = { radius: startRadius };
    const updateMask = () => {
      maskGraphics.clear();
      maskGraphics.fillStyle(0xffffff);
      maskGraphics.fillCircle(zone.x, zone.y, tweenHelper.radius);
    };
    updateMask();
    this.tweens.chain({
      tweens: [
        {
          targets: tweenHelper,
          radius: maxRadius,
          duration: 800,
          ease: "Sine.Out",
          onUpdate: updateMask,
        },
        {
          targets: tweenHelper,
          radius: 0,
          duration: 500,
          ease: "Sine.In",
          delay: 2000,
          onUpdate: updateMask,
        },
      ],
      onComplete: () => {
        this.cameras.main.clearMask();
        const sceneKey =
          zone.texture.key.charAt(0).toUpperCase() + zone.texture.key.slice(1);
        this.scene.start(sceneKey);
      },
    });
  }
}
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [MenuScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  dataObject: {
    name: (typeof _CONFIG !== 'undefined' && _CONFIG.title) || "School Monday",
    description: (typeof _CONFIG !== 'undefined' && _CONFIG.description) || "Point and click story adventure",
    instructions: (typeof _CONFIG !== 'undefined' && _CONFIG.instructions) || "Explore locations and interact with items.",
  },
  deviceOrientation: "landscape"
};
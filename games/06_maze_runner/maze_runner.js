// Touch Screen Controls
var joystickEnabled = true
const buttonEnabled = true
var kill = 0

const rexJoystickUrl =
  "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js"
const rexButtonUrl = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js"

/*
------------------- GLOBAL CODE STARTS HERE -------------------
*/

// Fix undeclared variables
var addEventListenersPhaser = () => {}
var initiateGameOver = () => {}
var handlePauseGame = () => {}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" })

this.cameraTarget = new Phaser.Math.Vector2();
    this.isMobile = false
    this.currentLevel = 1
    this.maxLevels = 2
    this.levelTransitioning = false
    this.mazeRows = 25
    this.mazeCols = 35
    this.doubleDamage = false
this.playerAcceleration = 4000; // Much faster acceleration
this.playerMaxSpeed = 400;      // Higher top speed
this.playerDrag = 2200;         // Higher drag to stop quickly from the new top speed
    this.player = null
    this.obstacles = null
    this.enemies = null
    this.playerBullets = null
    this.enemyBullets = null
    this.lastTextureIndex = -1
    this.bulletHitCounter = 0
    this.playerFireRate = 250
    this.enemiesKilled = 0
    this.diamondsCollected = 0
    this.diamondAttractionRange = 200
    this.diamondAttractionForce = 250
    this.mazeEndpoint = null
    this.endpointReached = false
    this.endpointSprite = null
    this.endpointText = null
    this.startPoint = null
    this.gameUI = null
    this.directionArrows = [] // Array to store direction arrows

    this.enemyTypes = [
      { type: "chaser", spriteKey: "enemy", health: 2, speed: 700 },
      { type: "avenger", spriteKey: "enemy_1", health: 4, speed: 1500 },
      { type: "sniper", spriteKey: "enemy_2", health: 1, speed: 300 },
    ]

    this.occupiedTiles = new Set()
    this.weaponTypes = {
      basic_gun: {
        key: "basic_gun",
        scale: 0.18,
        offsetX: 25,
        offsetY: 0,
      },
      shotgun: {
        key: "shotgun",
        scale: 0.2,
        offsetX: 28,
        offsetY: 2,
      },
      laser: {
        key: "laser",
        scale: 0.2,
        offsetX: 23,
        offsetY: -2,
      },
    }
// In constructor()
this.powerupTypes = [
  { type: "speedBoost", displayName: "Speed Boost", spriteKey: "power_speed", duration: 7000, color: 0x00BFFF },
  { type: "doubleDamage", displayName: "Double Damage", spriteKey: "power_damage", duration: 5000, color: 0xFF4500 },
  { type: "areaDamage", displayName: "Area Damage", spriteKey: "power_area", duration: 0, color: 0xFFFF00 },
  { type: "freezeEnemies", displayName: "Freeze", spriteKey: "power_freeze", duration: 10000, color: 0xADD8E6 },
];
    this.playerPowerups = {}
    this.powerupButtons = {}
    this.powerupUIContainer = null

this.switchWeapon = (weaponName) => {
      const data = this.weaponTypes[weaponName]
      if (!data) return

      this.player.weapon.setTexture(data.key)
      this.player.weapon.setDisplaySize(20,20)
      this.player.weapon.setOrigin(0.2, 0.5)
      this.player.currentWeapon = weaponName

      // Set weapon position based on current player flip state
      const newOffsetX = this.player.sprite.flipX ? -data.offsetX : data.offsetX;
      this.player.weapon.setPosition(newOffsetX, data.offsetY)
    }

this.setupCamera = () => {
  this.cameras.main.setZoom(3.0)
const worldWidth = this.cols * this.tileSize
  const worldHeight = this.rows * this.tileSize
  this.cameras.main.setBounds(this.mazeOffsetX, this.mazeOffsetY, worldWidth, worldHeight)
  
  // Add this line to set the physics world bounds to match the maze
  this.physics.world.setBounds(this.mazeOffsetX, this.mazeOffsetY, worldWidth, worldHeight)

  // We will now control the camera manually in update(), so we just set the bounds
this.cameras.main.startFollow(this.player, true, 1, 1); // Set lerp to 1 for instant follow
this.cameras.main.stopFollow(); // Then immediately stop it so we can control it
console.log(`Camera setup complete - Manual follow enabled.`);
  console.log(`Camera setup complete - Zoom: 2.2x, Bounds: ${worldWidth}x${worldHeight}`)
}
    //this.setupUI();
  }

  preload() {
    addEventListenersPhaser.bind(this)()

    for (const key in _CONFIG.imageLoader) {
      this.load.image(key, _CONFIG.imageLoader[key])
    }
    for (const key in _CONFIG.soundsLoader) {
      this.load.audio(key, [_CONFIG.soundsLoader[key]])
    }
    for (const key in _CONFIG.libLoader) {
      this.load.image(key, [_CONFIG.libLoader[key]])
    }

    const fontName = "pix"
    const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/"
    this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml")

    if (joystickEnabled) this.load.plugin("rexvirtualjoystickplugin", rexJoystickUrl, true)
    if (buttonEnabled) this.load.plugin("rexbuttonplugin", rexButtonUrl, true)

    displayProgressLoader.call(this)
  }

  create() {
    this.isMobile = this.sys.game.device.os.mobile
    const isPortrait = this.game.config.height > this.game.config.width

    this.scaleFactor = isPortrait ? this.game.config.width / 800 : this.game.config.width / 1200

    this.width = this.game.config.width
    this.height = this.game.config.height
    this.vfx = new VFXLibrary(this)

    const safeAddAudio = (key) => {
      try {
        if (this.cache && this.cache.audio && this.cache.audio.has(key)) {
          return this.sound.add(key);
        }
      } catch (e) {}
      return { play: () => {}, stop: () => {}, setVolume: () => ({ setLoop: () => ({ play: () => {} }) }) };
    };

    this.sfx = {
      shootBasic: safeAddAudio("sfx_shoot_basic"),
      shootShotgun: safeAddAudio("sfx_shoot_shotgun"),
      shootLaser: safeAddAudio("sfx_shoot_laser"),
      enemyHit: safeAddAudio("sfx_enemy_hit"),
      enemyKill: safeAddAudio("sfx_enemy_die"),
      playerHit: safeAddAudio("sfx_player_hit"),
      powerup: safeAddAudio("sfx_powerup"),
      click: safeAddAudio("sfx_click"),
    }

    this.sounds = {}
    for (const key in _CONFIG.soundsLoader) {
      if (this.cache && this.cache.audio && this.cache.audio.has(key)) {
        this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.6 })
      }
    }


    if (this.sounds.background) {
      this.sounds.background.setVolume(1).setLoop(true).play()
    }

    if (this.isMobile) {
      this.createWeaponSwapButton()
    } else {
      this.input.keyboard.on("keydown-E", () => {
        this.swapWeaponAction()
      })
    }

    this.backgroundTextures = ["background_cave", "background_volcano", "background"]
    this.wallTextures = ["wall_bush", "wall_lava", "wall_cave"]

    // Procedural wall textures fallback
    const createWallTex = (key, baseColor, borderCol, accentCol) => {
      if (!this.textures.exists(key)) {
        const cvs = this.textures.createCanvas(key, 64, 64);
        const ctx = cvs.context;
        ctx.fillStyle = baseColor;
        ctx.fillRect(0, 0, 64, 64);
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, 62, 62);
        ctx.fillStyle = accentCol;
        ctx.fillRect(4, 4, 26, 12);
        ctx.fillRect(34, 4, 26, 12);
        ctx.fillRect(4, 20, 56, 12);
        ctx.fillRect(4, 36, 26, 12);
        ctx.fillRect(34, 36, 26, 12);
        ctx.fillRect(4, 52, 56, 8);
        cvs.refresh();
      }
    };
    createWallTex("wall_bush", "#1b3320", "#0e1c12", "#2e5236");
    createWallTex("wall_cave", "#282c37", "#171a21", "#3d4251");
    createWallTex("wall_lava", "#3a1e1e", "#220e0e", "#5c2424");

    this.input.keyboard.on("keydown-ESC", this.pauseGame, this)

    this.diamonds = this.physics.add.group({
      defaultKey: "collectible",
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
    })

    this.playerMaxLives = 40
    this.playerLives = this.playerMaxLives
    this.activePowerups = {}
    this.activePowerupsUI = {}

    // Setup graphics and UI
    this.setupGraphics()
    this.setupMainUI()
    // Add the main UI container to the scene
    this.add.existing(this.gameUI)

    // Initialize first level
    this.initializeLevel()
  }

setupMainUI() {
    // Create main UI container that stays fixed on screen
this.gameUI = this.add.container(0, 0).setDepth(1000)

    // Setup different UI panels
    this.setupHealthUI()
    this.setupStatsUI()
    this.setupLevelUI()
    this.setupObjectiveUI()
  }

  createUIBackground() {
    // Top UI panel background
    const topPanel = this.add.graphics()
    topPanel.fillStyle(0x000000, 0.7)
    topPanel.fillRoundedRect(0, 0, this.width, 80 * this.scaleFactor, 8)
    topPanel.lineStyle(2, 0x444444)
    topPanel.strokeRoundedRect(0, 0, this.width, 80 * this.scaleFactor, 8)
    this.gameUI.add(topPanel)

    // Bottom UI panel background
    const bottomHeight = 120 * this.scaleFactor
    const bottomPanel = this.add.graphics()
    bottomPanel.fillStyle(0x000000, 0.7)
    bottomPanel.fillRoundedRect(0, this.height - bottomHeight, this.width, bottomHeight, 8)
    bottomPanel.lineStyle(2, 0x444444)
    bottomPanel.strokeRoundedRect(0, this.height - bottomHeight, this.width, bottomHeight, 8)
    this.gameUI.add(bottomPanel)

    // Side panels for mobile
    if (this.isMobile) {
      const sidePanel = this.add.graphics()
      sidePanel.fillStyle(0x000000, 0.5)
      sidePanel.fillRoundedRect(
        this.width - 120 * this.scaleFactor,
        100 * this.scaleFactor,
        120 * this.scaleFactor,
        300 * this.scaleFactor,
        8,
      )
      sidePanel.lineStyle(1, 0x444444)
      sidePanel.strokeRoundedRect(
        this.width - 120 * this.scaleFactor,
        100 * this.scaleFactor,
        120 * this.scaleFactor,
        300 * this.scaleFactor,
        8,
      )
      this.gameUI.add(sidePanel)
    }
  }

  setupHealthUI() {
    this.healthIcons = this.add.group();
    const startX = 30 * this.scaleFactor;
    const startY = 30 * this.scaleFactor;
    const iconSize = 28 * this.scaleFactor;
    const hearts = this.playerMaxLives / 10; // Assuming 1 heart = 10 health

    for (let i = 0; i < hearts; i++) {
        const heart = this.add.text(startX + i * (iconSize + 8), startY, "HP", {
            fontSize: `${iconSize * 0.65}px`,
            fontFamily: 'monospace',
            fontStyle: 'bold',
            color: '#ef4444'
        })
        .setOrigin(0, 0.5)
        .setScrollFactor(0); // <-- This line pins the heart icon to the screen

        this.healthIcons.add(heart);
        this.gameUI.add(heart);
    }
}

setupStatsUI() {
    const startX = 30 * this.scaleFactor;
    const startY = this.height - 80 * this.scaleFactor;
    const fontSize = 24 * this.scaleFactor;
    const iconSize = 22 * this.scaleFactor;

    // Kills stat
    const killsIcon = this.add.text(startX, startY, "KILLS:", { fontSize: `${iconSize * 0.7}px`, fontStyle: 'bold', color: '#ef4444' })
        .setOrigin(0, 0.5)
        .setScrollFactor(0);

    this.killsText = this.add.bitmapText(startX + 65 * this.scaleFactor, startY, 'pixelfont', '0', fontSize)
        .setOrigin(0, 0.5)
        .setScrollFactor(0);

    // Diamonds stat
    const diamondsIcon = this.add.text(startX, startY + 35 * this.scaleFactor, "GEMS:", { fontSize: `${iconSize * 0.7}px`, fontStyle: 'bold', color: '#38bdf8' })
        .setOrigin(0, 0.5)
        .setScrollFactor(0);
        
    this.diamondsText = this.add.bitmapText(startX + 65 * this.scaleFactor, startY + 35 * this.scaleFactor, 'pixelfont', '0', fontSize)
        .setOrigin(0, 0.5)
        .setScrollFactor(0);

    this.gameUI.add([killsIcon, this.killsText, diamondsIcon, this.diamondsText]);
}

setupLevelUI() {
    const levelX = this.width / 2;
    const levelY = 30 * this.scaleFactor;
    const fontSize = 28 * this.scaleFactor;

    this.levelText = this.add.bitmapText(levelX, levelY, 'pixelfont', `LEVEL ${this.currentLevel}`, fontSize)
        .setOrigin(0.5)
        .setScrollFactor(0); // <-- This line pins the text to the screen

    this.gameUI.add(this.levelText);
}
setupObjectiveUI() {
    const objectiveX = this.width / 2;
    const objectiveY = 60 * this.scaleFactor;
    const fontSize = 20 * this.scaleFactor;

    this.objectiveText = this.add.bitmapText(objectiveX, objectiveY, 'pixelfont', "Eliminate all enemies", fontSize)
        .setOrigin(0.5)
        .setScrollFactor(0); // <-- This line pins the text to the screen

    this.gameUI.add(this.objectiveText);

    // Clean up old UI elements if they exist
    if (this.objectiveContainer) this.objectiveContainer.destroy();
    if (this.objectiveTitle) this.objectiveTitle.destroy();
}
  setupGraphics() {
    const addCircle = (key, color, alpha = 1, radius = 10) => {
      if (this.textures.exists(key)) return;
      if (this.vfx && typeof this.vfx.addCircleTexture === 'function') {
        this.vfx.addCircleTexture(key, color, alpha, radius);
      } else {
        const g = this.add.graphics();
        g.fillStyle(color, alpha);
        g.fillCircle(radius, radius, radius);
        g.generateTexture(key, radius * 2, radius * 2);
        g.destroy();
      }
    };
    addCircle("iceBlue", 0x99ccff, 1, 10);
    addCircle("whiteSoft", 0xffffff, 0.8, 8);
    addCircle("red", 0xff0000, 1, 10);
    addCircle("orange", 0xffa500, 1, 10);
    addCircle("yellow", 0xffff00, 1, 10);
    addCircle("white", 0xffffff, 1, 10);
    addCircle("blue", 0x0000ff, 1, 10);
    addCircle("cyan", 0x00ffff, 1, 10);
  }


  initializeLevel() {
    console.log(`🎮 Initializing Level ${this.currentLevel}`)

    // Clean up previous level
    this.cleanupLevel()

    // Generate maze for current level
    this.generateMaze()
    this.buildMazeAndPlaceEntities()

    // Setup input controls
    this.setupControls()

    // Create powerup UI
    this.createPowerupUI()

    // Update level text
    this.levelText.setText(`LEVEL ${this.currentLevel}`)

    // Update objective
    this.updateObjective()

    console.log(`✅ Level ${this.currentLevel} initialized`)
  }

  updateObjective() {
    const enemiesRemaining = this.enemies ? this.enemies.countActive(true) : 0
    if (enemiesRemaining > 0) {
      this.objectiveText.setText(`Enemies left: ${enemiesRemaining}`)
    } else {
      this.objectiveText.setText("Find the exit!")
    }
  }

  cleanupLevel() {
    // Clean up endpoint and text
    if (this.endpointSprite) {
      this.endpointSprite.destroy()
      this.endpointSprite = null
    }
    if (this.endpointText) {
      this.endpointText.destroy()
      this.endpointText = null
    }

    // Clean up direction arrows
    this.cleanupDirectionArrows()

    // Clean up enemies and their vision cones
    if (this.enemies) {
      this.enemies.children.entries.forEach((enemy) => {
        if (enemy.visionCone) {
          enemy.visionCone.destroy()
        }
      })
      this.enemies.clear(true, true)
    }

    // Clear bullets, diamonds, powerups
    if (this.playerBullets) this.playerBullets.clear(true, true)
    if (this.enemyBullets) this.enemyBullets.clear(true, true)
    if (this.diamonds) this.diamonds.clear(true, true)
    if (this.powerups) this.powerups.clear(true, true)
    if (this.obstacles) this.obstacles.clear(true, true)

    // Reset flags
    this.mazeEndpoint = null
    this.endpointReached = false
    this.enemiesKilled = 0

    if (this.killsText) {
      this.killsText.setText("0")
    }
  }

  cleanupDirectionArrows() {
    this.directionArrows.forEach((arrow) => {
      if (arrow && arrow.destroy) {
        arrow.destroy()
      }
    })
    this.directionArrows = []
    if (this.arrowUpdateTimer) {
      this.arrowUpdateTimer.remove()
      this.arrowUpdateTimer = null
    }
  }

  generateMaze() {
    // Generate larger, more complex mazes
    const level1Maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    const level2Maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

const originalMaze = this.currentLevel === 1 ? level1Maze : level2Maze;
const scaleFactor = 2;
const wallProbability = 80; // 80% chance for a wall block to appear
 let upscaledMaze = this.upscaleMaze(originalMaze, scaleFactor, wallProbability);
 this.maze = this.addThickBorder(upscaledMaze);
this.rows = this.maze.length
this.cols = this.maze[0].length
    // Calculate tile size based on screen and maze dimensions
    const maxTileSize = Math.min(this.width / this.cols, this.height / this.rows)
    this.tileSize = Math.max(maxTileSize, 32 * this.scaleFactor)

    this.mazeOffsetX = (this.width - this.cols * this.tileSize) / 2
    this.mazeOffsetY = (this.height - this.rows * this.tileSize) / 2
  }

addThickBorder(maze) {
    const rows = maze.length;
    if (rows === 0) return maze;
    const cols = maze[0].length;

    if (rows < 4 || cols < 4) return maze; // Ensure maze is large enough for a 2-block border

    // Make the top and bottom borders 2 blocks thick
    for (let c = 0; c < cols; c++) {
        maze[0][c] = 1;          // Top row
        maze[1][c] = 1;          // Second row from top
        maze[rows - 1][c] = 1;   // Bottom row
        maze[rows - 2][c] = 1;   // Second row from bottom
    }

    // Make the left and right borders 2 blocks thick
    for (let r = 0; r < rows; r++) {
        maze[r][0] = 1;          // Left column
        maze[r][1] = 1;          // Second column from left
        maze[r][cols - 1] = 1;   // Right column
        maze[r][cols - 2] = 1;   // Second column from right
    }

    return maze;
  }
  buildMazeAndPlaceEntities() {
    // Set background
    if (this.bg) {
      this.bg.destroy()
    }

    const bgKey = this.currentLevel === 1 ? "background" : "background_cave"
    this.bg = this.add.tileSprite(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.sys.game.config.width * 2,
      this.sys.game.config.height * 2,
      bgKey,
    )
    this.bg.setOrigin(0.5)
    this.bg.setScrollFactor(0)
    this.bg.setDepth(-1)

    // Initialize physics groups
    this.obstacles = this.physics.add.staticGroup()
    this.enemies = this.physics.add.group()
    this.playerBullets = this.physics.add.group({
      defaultKey: "projectile",
      classType: Phaser.Physics.Arcade.Image,
      runChildUpdate: true,
    })
    this.enemyBullets = this.physics.add.group({
      defaultKey: "enemyBullet",
      classType: Phaser.Physics.Arcade.Image,
      runChildUpdate: true,
    })
    this.powerups = this.physics.add.group()

    // Build maze walls and collect empty cells
    const emptyCells = []
    const wallKey = this.currentLevel === 1 ? "wall_bush" : "wall_cave"

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = c * this.tileSize + this.tileSize / 2 + this.mazeOffsetX
        const y = r * this.tileSize + this.tileSize / 2 + this.mazeOffsetY

        if (this.maze[r][c] === 1) {
          const wall = this.obstacles.create(x, y, wallKey)
          wall.setDisplaySize(this.tileSize * 1.1, this.tileSize * 1.1)
          wall.refreshBody()
        } else {
          emptyCells.push({ x: x, y: y, col: c, row: r })
        }
      }
    }

    // Place player at start point
    this.placePlayer(emptyCells)

    // Place enemies with better distribution
    this.placeEnemies(emptyCells)

    // Set up physics collisions
    this.setupPhysics()

    // Setup camera
    this.setupCamera()
  }
upscaleMaze(maze, scaleFactor, wallProbability) {
    const originalRows = maze.length;
    const originalCols = maze[0].length;
    const newRows = originalRows * scaleFactor;
    const newCols = originalCols * scaleFactor;
    const newMaze = Array.from({ length: newRows }, () => Array(newCols).fill(0));

    for (let r = 0; r < originalRows; r++) {
        for (let c = 0; c < originalCols; c++) {
            const value = maze[r][c];
            if (value === 1) { // Check if it's a wall area
                for (let i = 0; i < scaleFactor; i++) {
                    for (let j = 0; j < scaleFactor; j++) {
                        // Add a random chance to place a wall
                        if (Phaser.Math.Between(1, 100) < wallProbability) {
                            newMaze[r * scaleFactor + i][c * scaleFactor + j] = 1;
                        }
                    }
                }
            }
        }
    }
    return newMaze;
}
placePlayer(emptyCells) {
    // Find the first available empty cell starting from the top-left corner
    let startCell = null;
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
            if (this.maze[r][c] === 0) { // Found an empty cell
                const x = c * this.tileSize + this.tileSize / 2 + this.mazeOffsetX;
                const y = r * this.tileSize + this.tileSize / 2 + this.mazeOffsetY;
                startCell = { x: x, y: y, col: c, row: r };
                break; // Exit inner loop
            }
        }
        if (startCell) {
            break; // Exit outer loop
        }
    }

    // Fallback if no empty cell is found
    if (!startCell && emptyCells.length > 0) {
        startCell = emptyCells[0];
    }

    this.startPoint = { x: startCell.col, y: startCell.row }

    if (this.player) {
      // Move existing player
      this.player.setPosition(startCell.x, startCell.y)
      this.player.body.setVelocity(0, 0)
    } else {
      // Create new player with better scaling
      const playerSprite = this.add.sprite(0, 0, "player")
      .setDisplaySize(60,60)
      const weaponData = this.weaponTypes.basic_gun
      const weapon = this.add
        .sprite(weaponData.offsetX, weaponData.offsetY, weaponData.key)
        .setDisplaySize(20,20)
        .setOrigin(0.2, 0.5)

      this.player = this.add.container(startCell.x, startCell.y, [playerSprite, weapon])
      this.physics.add.existing(this.player)
      this.player.body.setCollideWorldBounds(true)
      this.player.body.setDrag(this.playerDrag, this.playerDrag);
this.player.body.setMaxVelocity(this.playerMaxSpeed, this.playerMaxSpeed);
      this.player.body.setSize(20, 30)
      this.player.body.setOffset(20, 15)

      this.player.sprite = playerSprite
      this.player.weapon = weapon
      this.player.currentWeapon = "basic_gun"
    }

    this.player.currentTile = { x: startCell.col, y: startCell.row }
    this.playerFireCooldown = 0

    // Remove start cell from available cells
    const startIndex = emptyCells.findIndex((cell) => cell.x === startCell.x && cell.y === startCell.y)
    if (startIndex !== -1) {
      emptyCells.splice(startIndex, 1)
    }
  }
setupUI() {
    const style = {
        fontSize: '18px',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2
    };

    // Create health text
    this.healthText = this.add.text(20, 20, `Health: ${this.player?.health || 100}`, style)
        .setScrollFactor(0)
        .setDepth(1000);

    // Create kills text
    this.killsText = this.add.text(20, 50, `Kills: ${this.kills || 0}`, style)
        .setScrollFactor(0)
        .setDepth(1000);

    // Create diamonds text
    this.diamondText = this.add.text(20, 80, `Diamonds: ${this.diamondCount || 0}`, style)
        .setScrollFactor(0)
        .setDepth(1000);

    // Optional: powerup buttons, only if powerups are available
    if (this.playerPowerups) {
        this.powerupButtons = this.add.group();
        let xOffset = 20;

        Object.keys(this.playerPowerups).forEach(key => {
            const p = this.playerPowerups[key];
            const btn = this.add.image(xOffset, 120, p.key)
                .setScrollFactor(0)
                .setInteractive()
                .setDisplaySize(10,10)
                .setDepth(1000);

            btn.on('pointerdown', () => this.activatePowerup(key));
            this.powerupButtons.add(btn);
            xOffset += 48;
        });
    }
}



  placeEnemies(emptyCells) {
    // More enemies for larger maze
    const enemyCount = this.currentLevel === 1 ? 4 : 6

    for (let i = 0; i < Math.min(enemyCount, emptyCells.length); i++) {
      // Pick random empty cell for enemy, but prefer cells further from player
      const playerCell = this.startPoint
      const farCells = emptyCells.filter((cell) => {
        const dist = Math.abs(cell.col - playerCell.x) + Math.abs(cell.row - playerCell.y)
        return dist > 5
      })

      const availableCells = farCells.length > 0 ? farCells : emptyCells
      const enemyIndex = Phaser.Math.Between(0, availableCells.length - 1)
      const enemyCell = availableCells.splice(enemyIndex, 1)[0]

      // Remove from main emptyCells array too
      const mainIndex = emptyCells.findIndex((cell) => cell.x === enemyCell.x && cell.y === enemyCell.y)
      if (mainIndex !== -1) {
        emptyCells.splice(mainIndex, 1)
      }

      // Choose enemy type based on level
      let enemyType
      if (this.currentLevel === 1) {
        enemyType = i < 2 ? this.enemyTypes[0] : this.enemyTypes[1]
      } else {
        enemyType = this.enemyTypes[i % this.enemyTypes.length]
      }

      const enemy = this.enemies.create(enemyCell.x, enemyCell.y, enemyType.spriteKey).setDisplaySize(60,60)

      enemy.type = enemyType.type
      enemy.maxHealth = enemyType.health
      enemy.health = enemyType.health
      enemy.speed = enemyType.speed
      enemy.state = "idle"
      enemy.targetTile = null
      enemy.clearTint()
      enemy.setDepth(1)
      enemy.setOrigin(0.5, 0.5)
      enemy.body.setSize(enemy.width * 0.6, enemy.height * 0.8)
      enemy.body.setOffset(enemy.width * 0.2, enemy.height * 0.1)
      enemy.dir = ["left", "right", "up", "down"][i % 4]
      enemy.isMoving = false
      enemy.visionCone = this.add.graphics({ fillStyle: { color: 0xffffaa, alpha: 0.2 } })
      enemy.path = []
      enemy.visitedTiles = new Set()
      enemy.currentTile = { x: enemyCell.col, y: enemyCell.row }
      enemy.fireCooldown = 0
      enemy.nextFireTime = 0
      enemy.isVisible = false
    }

    // Update objective with initial enemy count
    this.updateObjective()
  }

  setupPhysics() {
    this.physics.add.collider(this.player, this.obstacles)
    this.physics.add.collider(this.enemies, this.obstacles)
    this.physics.add.overlap(this.player, this.enemies, this.onEnemyCollision, null, this)
    this.physics.add.overlap(this.player, this.diamonds, this.collectDiamond, null, this)
    this.physics.add.collider(this.enemies, this.enemies)
    this.physics.add.overlap(this.player, this.powerups, this.handlePowerupCollect, null, this)
    this.physics.add.overlap(this.playerBullets, this.enemies, this.hitEnemy, null, this)
    this.physics.add.overlap(this.enemyBullets, this.player, this.hitPlayer, null, this)
    this.physics.add.collider(this.playerBullets, this.obstacles, this.bulletHitWall, null, this)
    this.physics.add.collider(this.enemyBullets, this.obstacles, this.bulletHitWall, null, this)

    // Handle endpoint collision
    if (this.endpointSprite) {
      this.physics.add.overlap(this.player, this.endpointSprite, this.reachEndpoint, null, this)
    }
  }

setupControls() {
    // Enable joystick only if on a mobile device
    joystickEnabled = this.isMobile;

    if (joystickEnabled) {
      // Create joystick for mobile
      const joyPlugin = this.plugins.get("rexvirtualjoystickplugin")
      if (joyPlugin) {
        const R = 60 * this.scaleFactor
        this.joystick = joyPlugin.add(this, {
          x: R * 2,
          y: this.scale.height - R * 2,
          radius: R,
          base: this.add.circle(0, 0, R * 1.6, 0x888888, 0.6),
          thumb: this.add.circle(0, 0, R * 0.8, 0xcccccc, 0.8),
        })
        this.joystick.setScrollFactor(0)
        this.joystick.setDepth(2000)
      }

      // Setup tap-to-shoot for mobile
      this.lastTapTime = 0
      this.mobileTapTarget = null
      this.input.on("pointerdown", (pointer) => {
        // Ignore taps on the joystick itself
        if (this.joystick && this.joystick.base.getBounds().contains(pointer.x, pointer.y)) {
            return;
        }
        this.mobileTapTarget = { x: pointer.worldX, y: pointer.worldY };
      });

    } else {
      // Set up WASD keys for desktop movement
      this.keys = this.input.keyboard.addKeys({
        up: 'W',
        down: 'S',
        left: 'A',
        right: 'D'
      });
    }

    // Prevent default browser actions for keyboard keys
    this.input.keyboard.disableGlobalCapture()
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }
  createDirectionArrows() {
    if (!this.mazeEndpoint) return

    // Clean up existing arrows
    this.cleanupDirectionArrows()

    const arrowX = this.player.x
    const arrowY = this.player.y

    // Calculate direction from player to endpoint
    const directionAngle = Phaser.Math.Angle.Between(arrowX, arrowY, this.mazeEndpoint.x, this.mazeEndpoint.y)

    // Create single arrow graphics
    const arrow = this.add.graphics()
    arrow.fillStyle(0x00ff00, 0.8)
    arrow.lineStyle(3, 0xffffff, 1)

    // Draw arrow shape
    const arrowSize = 20 * this.scaleFactor
    arrow.beginPath()
    arrow.moveTo(0, -arrowSize / 2)
    arrow.lineTo(arrowSize, 0)
    arrow.lineTo(0, arrowSize / 2)
    arrow.lineTo(-arrowSize / 3, 0)
    arrow.closePath()
    arrow.fillPath()
    arrow.strokePath()

    // Position and rotate arrow
    arrow.x = arrowX
    arrow.y = arrowY
    arrow.rotation = directionAngle
    arrow.setDepth(100) // Ensure it's visible above maze

    // Add pulsing animation
    this.tweens.add({
      targets: arrow,
      alpha: { from: 0.8, to: 0.3 },
      scale: { from: 1, to: 1.3 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    this.directionArrows.push(arrow) // Store the single arrow

    // Update arrows periodically to follow player
    this.arrowUpdateTimer = this.time.addEvent({
      delay: 50, // Update more frequently for smoother movement
      callback: this.updateDirectionArrows,
      callbackScope: this,
      loop: true,
    })
  }

  updateDirectionArrows() {
    if (!this.mazeEndpoint || this.directionArrows.length === 0) return

    const arrow = this.directionArrows[0]
    if (!arrow) return

    // Position the arrow at a fixed distance from the player
    const distance = 100 * this.scaleFactor // Distance from player
    const angleToEndpoint = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.mazeEndpoint.x,
      this.mazeEndpoint.y,
    )

    arrow.x = this.player.x + Math.cos(angleToEndpoint) * distance
    arrow.y = this.player.y + Math.sin(angleToEndpoint) * distance

    // Update rotation to point toward endpoint
    arrow.rotation = angleToEndpoint
  }

  spawnEndpoint() {
    console.log("🎯 Spawning maze endpoint")

    // Find a good location for endpoint (prefer bottom-right area)
    let endpointX, endpointY, endpointCol, endpointRow

    // Try to find bottom-right empty space
    for (let r = this.rows - 2; r > 0; r--) {
      for (let c = this.cols - 2; c > 0; c--) {
        if (this.maze[r][c] === 0) {
          endpointCol = c
          endpointRow = r
          endpointX = c * this.tileSize + this.tileSize / 2 + this.mazeOffsetX
          endpointY = r * this.tileSize + this.tileSize / 2 + this.mazeOffsetY
          break
        }
      }
      if (endpointX) break
    }

    // Create endpoint sprite with better scaling
    this.endpointSprite = this.add
      .sprite(endpointX, endpointY, "collectible")
      .setDisplaySize(20,20)
      .setTint(0x00ff00)
      .setDepth(15)

    // Add "END POINT" text above the endpoint
    this.endpointText = this.add
      .text(endpointX, endpointY - 60 * this.scaleFactor, "END POINT", {
        fontSize: `${16 * this.scaleFactor}px`,
        fill: "#00ff00",
        fontStyle: "bold",
        backgroundColor: "#000000",
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5)
      .setDepth(16)

    // Add physics
    this.physics.add.existing(this.endpointSprite)
    this.endpointSprite.body.setSize(this.tileSize * 1.2, this.tileSize * 1.2)

    // Add enhanced glow effect
    this.tweens.add({
      targets: this.endpointSprite,
      alpha: { from: 1, to: 0.3 },
      scale: { from: 1.2 * this.scaleFactor, to: 1.4 * this.scaleFactor },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    // Animate text
    this.tweens.add({
      targets: this.endpointText,
      alpha: { from: 1, to: 0.7 },
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    // Store endpoint data
    this.mazeEndpoint = {
      x: endpointX,
      y: endpointY,
      col: endpointCol,
      row: endpointRow,
    }

    // Set up collision
    this.physics.add.overlap(this.player, this.endpointSprite, this.reachEndpoint, null, this)

    // Create direction arrows pointing to the endpoint
    this.createDirectionArrows()

    // Update objective
    this.updateObjective()

    console.log(`✅ Endpoint created at (${endpointCol}, ${endpointRow})`)
  }

  reachEndpoint(player, endpoint) {
    if (this.endpointReached || this.levelTransitioning) {
      return
    }

    console.log("🚪 Player reached endpoint!")
    this.endpointReached = true

    // Clean up direction arrows
    this.cleanupDirectionArrows()

    // Disable endpoint
    if (this.endpointSprite && this.endpointSprite.body) {
      this.endpointSprite.body.enable = false
    }

    // Enhanced visual feedback
    this.vfx.createEmitter("white", endpoint.x, endpoint.y, 1.5, 0, 1000).explode(40)
    this.vfx.createEmitter("yellow", endpoint.x, endpoint.y, 1.2, 0, 800).explode(30)
    this.vfx.createEmitter("orange", endpoint.x, endpoint.y, 1, 0, 600).explode(20)

    // Screen shake
    this.cameras.main.shake(300, 0.02)

    // Check if we can advance to next level
    if (this.currentLevel < this.maxLevels) {
      this.advanceToNextLevel()
    } else {
      // Game completed!
      this.gameCompleted()
    }
  }

  advanceToNextLevel() {
    console.log(`🎉 Advancing from Level ${this.currentLevel} to ${this.currentLevel + 1}`)

    this.levelTransitioning = true
    this.physics.pause()

    // Create transition overlay
    const overlay = this.add.graphics()
    overlay.fillStyle(0x000000, 0.8)
    overlay.fillRect(0, 0, this.width, this.height)
    overlay.setScrollFactor(0)
    overlay.setDepth(1500)

    // Show level transition message with better styling
    const transitionContainer = this.add.container(this.width / 2, this.height / 2)
    transitionContainer.setScrollFactor(0)
    transitionContainer.setDepth(1600)

    const titleText = this.add
      .text(0, -50 * this.scaleFactor, `LEVEL ${this.currentLevel} COMPLETE!`, {
        fontSize: `${36 * this.scaleFactor}px`,
        fill: "#00ff00",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    const subtitleText = this.add
      .text(0, 20 * this.scaleFactor, `Advancing to Level ${this.currentLevel + 1}...`, {
        fontSize: `${24 * this.scaleFactor}px`,
        fill: "#ffffff",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0.5)

    transitionContainer.add([titleText, subtitleText])

    // Animate transition
    this.tweens.add({
      targets: transitionContainer,
      scale: { from: 0.5, to: 1 },
      alpha: { from: 0, to: 1 },
      duration: 500,
      ease: "Back.easeOut",
    })

    // Advance level after delay
    this.time.delayedCall(2500, () => {
      overlay.destroy()
      transitionContainer.destroy()
      this.currentLevel++
      this.levelTransitioning = false
      this.physics.resume()
      this.initializeLevel()
    })
  }

  gameCompleted() {
    console.log("🏆 Game Completed!")

    // Create completion overlay
    const overlay = this.add.graphics()
    overlay.fillStyle(0x000000, 0.9)
    overlay.fillRect(0, 0, this.width, this.height)
    overlay.setScrollFactor(0)
    overlay.setDepth(1500)

    const completionContainer = this.add.container(this.width / 2, this.height / 2)
    completionContainer.setScrollFactor(0)
    completionContainer.setDepth(1600)

    const titleText = this.add
      .text(0, -80 * this.scaleFactor, "CONGRATULATIONS!", {
        fontSize: `${48 * this.scaleFactor}px`,
        fill: "#ffd700",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5)

    const subtitleText = this.add
      .text(0, -20 * this.scaleFactor, "You completed all levels!", {
        fontSize: `${28 * this.scaleFactor}px`,
        fill: "#ffffff",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5)

    const statsText = this.add
      .text(
        0,
        40 * this.scaleFactor,
        `Enemies Defeated: ${this.enemiesKilled}\nDiamonds Collected: ${this.diamondsCollected}`,
        {
          fontSize: `${20 * this.scaleFactor}px`,
          fill: "#cccccc",
          fontStyle: "bold",
          align: "center",
        },
      )
      .setOrigin(0.5)

    completionContainer.add([titleText, subtitleText, statsText])

    // Animate completion screen
    this.tweens.add({
      targets: completionContainer,
      scale: { from: 0.3, to: 1 },
      alpha: { from: 0, to: 1 },
      duration: 1000,
      ease: "Bounce.easeOut",
    })

    // End game after showing completion message
    this.time.delayedCall(4000, () => {
      this.gameOver()
    })
  }

  // Check if enemy is visible on screen
  isEnemyVisible(enemy) {
    const cam = this.cameras.main
    const worldView = cam.worldView

    // Add some padding to the visible area
    const padding = 100
    return (
      enemy.x >= worldView.x - padding &&
      enemy.x <= worldView.x + worldView.width + padding &&
      enemy.y >= worldView.y - padding &&
      enemy.y <= worldView.y + worldView.height + padding
    )
  }

  killEnemy(enemy) {
    console.log("💀 Enemy killed")

    const enemyX = enemy.x
    const enemyY = enemy.y
    this.sfx.enemyKill.play()

    // Spawn powerup chance
    if (Phaser.Math.Between(0, 100) < 45) {
      this.spawnRandomPowerup(enemyX, enemyY)
    }

    this.cameras.main.shake(200, 0.015)

    this.enemiesKilled++
    this.killsText.setText(this.enemiesKilled.toString())

    // Create diamond with better scaling
    const diamond = this.diamonds.create(enemy.x, enemy.y, "collectible")
    diamond.setDepth(2)
    diamond.setDisplaySize(30,30)
    diamond.setBounce(0.5)
    diamond.setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(-50, 50))
    diamond.setDrag(0.95)
    diamond.setCollideWorldBounds(true)

    // Clean up enemy
    if (enemy.visionCone) {
      enemy.visionCone.destroy()
    }

    this.enemies.remove(enemy, true, true)

    // Update objective
    this.updateObjective()

    console.log(`Enemies remaining: ${this.enemies.countActive(true)}`)

    // Check if all enemies are defeated
    if (this.enemies.countActive(true) === 0) {
      console.log("🎯 All enemies defeated - spawning endpoint")
      if (!this.levelTransitioning && !this.mazeEndpoint) {
        this.spawnEndpoint()
      }
    }
  }

  updateHealthUI() {
    const healthPerHeart = 10;
    const heartsToShow = Math.ceil(this.playerLives / healthPerHeart);
    
    this.healthIcons.children.each((heart, index) => {
        heart.setVisible(index < heartsToShow);
    });
  }

  spawnRandomPowerup(x, y) {
    const powerupData = Phaser.Utils.Array.GetRandom(this.powerupTypes)
    const baseScale = 0.5 * this.scaleFactor
    const adjustedScale = powerupData.spriteKey === "power_area" ? baseScale * 0.4 : baseScale

    const powerup = this.physics.add.sprite(0, 0, powerupData.spriteKey).setDisplaySize(30,30)

    powerup.setData("type", powerupData.type)
    powerup.setData("duration", powerupData.duration)

    const glow = this.add.graphics()
    glow.fillStyle(0xffd700, 0.6)
    glow.fillCircle(0, 0, powerup.displayWidth * 0.8)
    const powerupContainer = this.add.container(x, y, [glow, powerup])
    powerupContainer.setDepth(2)

    this.physics.world.enable(powerupContainer)
    powerupContainer.body.setCircle(powerup.displayWidth / 2)
    powerupContainer.body.setOffset(-powerup.displayWidth / 2, -powerup.displayHeight / 2)

    powerupContainer.setData("type", powerupData.type)
    powerupContainer.setData("duration", powerupData.duration)
    this.powerups.add(powerupContainer)

    this.tweens.add({
      targets: glow,
      alpha: { from: 0.6, to: 0.1 },
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })
  }

  handlePowerupCollect(player, powerupContainer) {
    const type = powerupContainer.getData("type")
    this.sfx.powerup.play()
    powerupContainer.destroy()

    if (this.playerPowerups[type]) {
      this.playerPowerups[type]++
    } else {
      this.playerPowerups[type] = 1
    }


    this.updatePowerupCountUI(type)

        // In handlePowerupCollect(), after getting the 'type'
const powerupData = this.powerupTypes.find(p => p.type === type);
if (powerupData) {
    this.showCollectionNotification(powerupData);
}
  }

  // Add this new function to your GameScene class
showCollectionNotification(powerupData) {
    const textStyle = {
        fontSize: `${24 * this.scaleFactor}px`,
        fill: '#ffffff',
        fontStyle: 'bold',
        backgroundColor: '#00000099',
        padding: { x: 15, y: 10 },
        align: 'center'
    };

    const notificationText = this.add.text(
        this.width / 2, 
        80 * this.scaleFactor, 
        `Collected: ${powerupData.displayName}!`, 
        textStyle
    ).setOrigin(0.5).setDepth(2000);

    this.gameUI.add(notificationText); // Add to the main UI container

    // Animate it
    this.tweens.add({
        targets: notificationText,
        alpha: { from: 0, to: 1 },
        y: `+=${20 * this.scaleFactor}`,
        duration: 300,
        ease: 'Power2',
        yoyo: true,
        hold: 1500, // How long the text stays visible
        onComplete: () => {
            notificationText.destroy();
        }
    });
}

createPowerupUI() {
    // --- FIX: Declare screenWidth and screenHeight at the top ---
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;
    // --- END OF FIX ---

    const containerY = screenHeight - 90 * this.scaleFactor;
    this.powerupUIContainer = this.add.container(screenWidth / 2, containerY).setScrollFactor(0);
    this.powerupUIContainer.setDepth(1100);

    let xOffset = 0;
    const buttonSpacing = 100 * this.scaleFactor;
    const initialX = (-(this.powerupTypes.length - 1) * buttonSpacing) / 2;

    this.powerupTypes.forEach((powerupData, index) => {
      const bgSize = 72 * this.scaleFactor;
      const iconScale = 0.5 * this.scaleFactor;
      const countFontSize = 20 * this.scaleFactor;

      const glow = this.add.graphics().fillStyle(powerupData.color, 0.4);
      glow.fillRoundedRect(initialX + xOffset - bgSize / 2, -bgSize / 2, bgSize, bgSize, 12);
      glow.setVisible(false);

      const bg = this.add.graphics();
      bg.fillStyle(0x000000, 0.7);
      bg.fillRoundedRect(initialX + xOffset - bgSize / 2, -bgSize / 2, bgSize, bgSize, 12);
      bg.lineStyle(2, powerupData.color, 0.9);
      bg.strokeRoundedRect(initialX + xOffset - bgSize / 2, -bgSize / 2, bgSize, bgSize, 12);
      bg.setInteractive(
          new Phaser.Geom.Rectangle(initialX + xOffset - bgSize / 2, -bgSize / 2, bgSize, bgSize),
          Phaser.Geom.Rectangle.Contains
      );

      const icon = this.add
        .image(initialX + xOffset, 0, powerupData.spriteKey)
        .setDisplaySize(30,30)
        .setOrigin(0.5);

      const countText = this.add
        .text(initialX + xOffset + 25 * this.scaleFactor, 25 * this.scaleFactor, "0", {
          fontSize: `${countFontSize}px`,
          fontStyle: "bold",
          fill: "#ffffff",
          backgroundColor: "#000000",
          padding: {
            x: 8 * this.scaleFactor,
            y: 4 * this.scaleFactor,
          },
          align: "center",
        })
        .setOrigin(0.5)
        .setDepth(1101);

      bg.on("pointerover", () => {
        glow.setVisible(true);
      });

      bg.on("pointerout", () => {
        glow.setVisible(false);
      });

      bg.on("pointerdown", (pointer) => {
        this.pointerOnUI = true;
        this.sfx.click.play();
        this.usePowerup(powerupData.type);
      });

      bg.on("pointerup", () => {
        this.time.delayedCall(100, () => {
          this.pointerOnUI = false;
        });
      });

      this.powerupUIContainer.add([glow, bg, icon, countText]);

      this.powerupButtons[powerupData.type] = {
        background: bg,
        icon: icon,
        countText: countText,
        glow: glow,
      };

      this.updatePowerupCountUI(powerupData.type);

      xOffset += buttonSpacing;
    });
    this.gameUI.add(this.powerupUIContainer);
}

  usePowerup(type) {
    if (this.playerPowerups[type] > 0) {
      const powerupData = this.powerupTypes.find((p) => p.type === type)
      if (!powerupData) {
        console.warn(`Attempted to use unknown powerup type: ${type}`)
        return
      }

      this.playerPowerups[type]--
      this.updatePowerupCountUI(type)

      switch (type) {
        case "speedBoost":
          this.applySpeedBoost(powerupData.duration)
          break
        case "doubleDamage":
          this.applyDoubleDamage(powerupData.duration)
          break
        case "areaDamage":
          this.applyAreaDamage()
          break
        case "freezeEnemies":
          this.applyFreezeEnemies(powerupData.duration)
          break
      }
    }
  }

  updatePowerupCountUI(type) {
    const button = this.powerupButtons[type]
    if (button) {
      const count = this.playerPowerups[type] || 0
      button.countText.setText(count.toString())

      if (count > 0) {
        button.background.setAlpha(1)
        button.icon.setAlpha(1)
        button.countText.setVisible(true)
      } else {
        button.background.setAlpha(0.5)
        button.icon.setAlpha(0.5)
        button.countText.setVisible(false)
      }
    }
  }

  applySpeedBoost(duration) {
    if (this.speedBoostTimer) {
      this.speedBoostTimer.remove(false)
    }

    this.playerSpeed = this.originalPlayerSpeed * 1.5
    this.showActivePowerupTimer("speed", duration)

    this.speedBoostTimer = this.time.delayedCall(duration, () => {
      this.playerSpeed = this.originalPlayerSpeed
    })
  }

  applyDoubleDamage(duration) {
    if (this.doubleDamageTimer) {
      this.doubleDamageTimer.remove(false)
    }

    this.doubleDamage = true
    this.showActivePowerupTimer("damage", duration)

    this.doubleDamageTimer = this.time.delayedCall(duration, () => {
      this.doubleDamage = false
    })

    this.vfx.createEmitter("explosion", this.player.x, this.player.y, 1, 0, 300).explode(30)
  }

  applyFreezeEnemies(duration) {
    if (this.freezeEnemiesTimer) {
      this.freezeEnemiesTimer.remove(false)
    }

    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy.active) return

      enemy.body.moves = false
      enemy.isFrozen = true
      enemy.setTint(0x99ccff)
      this.showActivePowerupTimer("freeze", duration)

      this.vfx.createEmitter("iceBlue", enemy.x, enemy.y, 0.5, 0, 800).explode(15)
      this.vfx.createEmitter("whiteSoft", enemy.x, enemy.y, 0.4, 0, 800).explode(10)
    })

    this.vfx.createEmitter("iceBlue", this.player.x, this.player.y, 0.8, 0, 500).explode(12)
    this.vfx.createEmitter("whiteSoft", this.player.x, this.player.y, 0.6, 0, 500).explode(8)
    this.cameras.main.shake(150, 0.004)

    this.freezeEnemiesTimer = this.time.delayedCall(duration, () => {
      this.enemies.getChildren().forEach((enemy) => {
        if (!enemy.active) return
        enemy.body.moves = true
        enemy.isFrozen = false
        enemy.clearTint()
      })
    })
  }

  applyAreaDamage() {
    const radius = 500
    const damage = 4

    this.vfx.createEmitter("white", this.player.x, this.player.y, 0.5, 0, 600).explode(30)
    this.vfx.createEmitter("orange", this.player.x, this.player.y, 0.4, 0, 600).explode(25)
    this.vfx.createEmitter("yellow", this.player.x, this.player.y, 0.3, 0, 600).explode(20)

    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy.active || enemy.health <= 0) return

      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y)
      if (dist <= radius) {
        enemy.health -= damage

        if (enemy.health <= 0) {
          this.killEnemy(enemy)
        } else {
          enemy.setTint(0xff8800)
          this.time.delayedCall(100, () => enemy.clearTint())
        }
      }
    })

    this.showActivePowerupTimer("aoe", 1000)
  }

showActivePowerupTimer(type, duration) {
    const powerupData = this.powerupTypes.find(p => p.type === type);
    if (!powerupData) {
        console.warn(`Powerup data not found for type: ${type}`);
        return;
    }

    const scale = this.scaleFactor || 1;
    const width = 220 * scale;
    const height = 60 * scale;
    const barWidth = 150 * scale;
    const barHeight = 12 * scale;
    const marginTop = 160 * scale;
    const verticalSpacing = 70 * scale;
    const fontSizeLabel = 20 * scale;

    // If a timer for this powerup is already active, just reset its duration
    if (this.activePowerupsUI[type]) {
        const { bar, tween } = this.activePowerupsUI[type];
        if (tween) tween.stop(); // Stop the old tween

        bar.scaleX = 1; // Reset the bar to full

        // Create a new tween for the new duration
        const newTween = this.tweens.add({
            targets: bar,
            scaleX: 0,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                if (this.activePowerupsUI[type]) {
                    this.activePowerupsUI[type].container.destroy();
                    delete this.activePowerupsUI[type];
                }
            }
        });

        this.activePowerupsUI[type].tween = newTween;
        return;
    }

    // Calculate position for the new timer UI
    const offsetY = marginTop + Object.keys(this.activePowerupsUI).length * verticalSpacing;
    const container = this.add.container(25 * scale, offsetY).setScrollFactor(0).setDepth(1200);

    // --- Create Visual Elements ---

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.8);
    bg.fillRoundedRect(0, 0, width, height, 10);
    bg.lineStyle(2, powerupData.color, 1);
    bg.strokeRoundedRect(0, 0, width, height, 10);

    // Icon
    const icon = this.add.image(35 * scale, height / 2, powerupData.spriteKey)
        .setDisplaySize(40 * scale, 40 * scale)
        .setOrigin(0.5);

    // Display Name Text
    const label = this.add.text(70 * scale, 12 * scale, powerupData.displayName, {
        fontSize: `${fontSizeLabel}px`,
        fill: '#ffffff',
        fontStyle: 'bold'
    });

    // Timer Bar Background
    const barBg = this.add.graphics();
    barBg.fillStyle(0x555555, 1);
    barBg.fillRoundedRect(70 * scale, 38 * scale, barWidth, barHeight, 5);

    // The actual depleting Timer Bar
    const bar = this.add.graphics();
    bar.fillStyle(powerupData.color, 1);
    bar.fillRoundedRect(70 * scale, 38 * scale, barWidth, barHeight, 5);

    // --- Assemble and Animate ---

    container.add([bg, icon, label, barBg, bar]);
    this.gameUI.add(container); // Add to the main UI container to handle scaling

    const tween = this.tweens.add({
        targets: bar,
        scaleX: 0,
        duration: duration,
        ease: 'Linear',
        onComplete: () => {
            container.destroy();
            delete this.activePowerupsUI[type];
        }
    });

    // Store the UI elements to manage them
    this.activePowerupsUI[type] = { container, bar, tween };
}

  fireBullet(shooter, targetX, targetY, bulletGroup, bulletSpeed = 500) {
    const spawnOffset = 35 * this.scaleFactor
    const angle = Phaser.Math.Angle.Between(shooter.x, shooter.y, targetX, targetY)

    if (shooter === this.player) {
      switch (this.player.currentWeapon) {
        case "basic_gun":
          this.sfx.shootBasic.play()
          break
        case "shotgun":
          this.sfx.shootShotgun.play()
          break
        case "laser":
          this.sfx.shootLaser.play()
          break
        default:
          this.sfx.shootBasic.play()
      }
    }

    if (shooter !== this.player) {
      shooter.rotation = angle
      shooter.flipX = false
    }

    const spawnX = shooter.x + Math.cos(angle) * spawnOffset
    const spawnY = shooter.y + Math.sin(angle) * spawnOffset

    let bulletTextureKey = "enemyBullet"

    let bulletConfig = {
      texture: "projectile",
      scale: 0.1 * this.scaleFactor,
      damage: 1,
      spread: 0,
      pellets: 1,
      piercing: false,
      tint: 0xffffff,
    }

    if (shooter === this.player) {
      const weapon = this.player.currentWeapon
      if (weapon === "shotgun") {
        bulletConfig = {
          texture: "projectile",
          scale: 0.1 * this.scaleFactor,
          damage: 1,
          spread: 15,
          pellets: 5,
          piercing: false,
          tint: 0xffaa00,
        }
      } else if (weapon === "laser") {
        bulletConfig = {
          texture: "projectile",
          scale: 0.08 * this.scaleFactor,
          damage: 2,
          spread: 0,
          pellets: 1,
          piercing: true,
          tint: 0x00ffff,
        }
      }

      bulletTextureKey = bulletConfig.texture
    }

    const fireSingleBullet = (angleOffset = 0) => {
      const finalAngle = angle + Phaser.Math.DegToRad(angleOffset)
      const bullet = bulletGroup.create(
        shooter.x + Math.cos(finalAngle) * spawnOffset,
        shooter.y + Math.sin(finalAngle) * spawnOffset,
        bulletTextureKey,
      )

      if (!bullet) {
        console.warn("Could not create bullet – bullet group full?")
        return
      }

      bullet.setDepth(2)
      bullet.setActive(true)
      bullet.setVisible(true)
      bullet.setOrigin(0.5)
      bullet.setDisplaySize(10,10)
      bullet.setRotation(finalAngle)
      bullet.setTint(bulletConfig.tint)

      this.physics.velocityFromRotation(finalAngle, bulletSpeed, bullet.body.velocity)
      bullet.body.setCollideWorldBounds(true)
      bullet.body.onWorldBounds = true

      bullet.damage = bulletConfig.damage
      bullet.piercing = bulletConfig.piercing

      this.time.delayedCall(2000, () => {
        if (bullet.active) bullet.destroy()
      })
    }

    for (let i = 0; i < bulletConfig.pellets; i++) {
      const spreadAngle = Phaser.Math.Between(-bulletConfig.spread, bulletConfig.spread)
      fireSingleBullet(spreadAngle)
    }
  }

  hitEnemy(bullet, enemy) {
    this.hitStop(30);
    const damage = this.doubleDamage ? 5 : 1
    enemy.health -= damage
    this.sfx.enemyHit.play()

    const weapon = this.player.currentWeapon

    if (weapon === "basic_gun") {
      this.vfx.createEmitter("orange", enemy.x, enemy.y, 1, 0, 500).explode(15)
      this.vfx.createEmitter("yellow", bullet.x, bullet.y, 0.5, 0, 300).explode(8)
    } else if (weapon === "shotgun") {
      this.vfx.createEmitter("red", enemy.x, enemy.y, 1, 0, 500).explode(25)
      this.vfx.createEmitter("orange", bullet.x, bullet.y, 0.6, 0, 300).explode(10)
      this.vfx.createEmitter("yellow", bullet.x, bullet.y, 0.5, 0, 200).explode(8)
    } else if (weapon === "laser") {
      this.vfx.createEmitter("white", enemy.x, enemy.y, 1, 0, 500).explode(20)
      this.vfx.createEmitter("cyan", bullet.x, bullet.y, 0.4, 0, 100).explode(10)
      this.vfx.createEmitter("blue", bullet.x, bullet.y, 0.2, 0, 100).explode(5)
    }

    if (enemy.health <= 0) {
      this.killEnemy(enemy)
    } else {
      enemy.setTint(0xff0000)
      this.time.delayedCall(100, () => enemy.clearTint())
    }

    if (weapon !== "laser") {
      bullet.disableBody(true, true)
    } else {
      bullet.hitCooldown = this.time.now + 200
    }
  }

  hitPlayer(player, bullet) {
    bullet.disableBody(true, true)

    this.sfx.playerHit.play()

    this.bulletHitCounter++

    if (this.bulletHitCounter >= 2) {
      this.playerLives--
      this.bulletHitCounter = 0
      this.updateHealthUI()
    }

    player.sprite.setTint(0xff0000)
    this.time.delayedCall(
      200,
      () => {
        player.sprite.setTint(0xffffff)
      },
      [],
      this,
    )

    if (this.playerLives <= 0) {
      this.gameOver()
    }
  }

  onEnemyCollision(playerObj, enemy) {
    if (enemy.isDying) return
    enemy.isDying = true

    enemy.body.enable = false
    enemy.health = 0
    this.killEnemy(enemy)

    const enemyX = enemy.x
    const enemyY = enemy.y

    this.vfx.createEmitter("red", enemyX, enemyY, 1, 0, 500).explode(20)
    this.vfx.createEmitter("yellow", enemyX, enemyY, 1, 0, 500).explode(20)
    this.vfx.createEmitter("orange", enemyX, enemyY, 1, 0, 500).explode(20)

    this.cameras.main.shake(200, 0.01)
    this.killsText.setText(this.enemiesKilled.toString())
    this.tweens.add({
      targets: this.killsText,
      scale: 1.3,
      duration: 100,
      yoyo: true,
      ease: "Power1",
    })

    this.time.delayedCall(
      100,
      () => {
        if (enemy.visionCone) {
          enemy.visionCone.destroy()
        }

        this.enemies.remove(enemy, true, true)
        this.spawnDiamondAt(enemyX, enemyY)

        if (this.enemies.countActive(true) === 0 && !this.levelTransitioning && !this.mazeEndpoint) {
          console.log("All enemies defeated! Spawning exit portal...")
          this.spawnEndpoint()
        }
      },
      [],
      this,
    )
  }

  bulletHitWall(bullet, wall) {
    if (bullet.active) {
      bullet.destroy()
    }
  }

  spawnDiamondAt(x, y) {
    const diamond = this.diamonds.create(x, y, "collectible").setDisplaySize(20,20)
  }

  collectDiamond(player, diamond) {
    diamond.disableBody(true, true)
    this.diamondsCollected++
    this.diamondsText.setText(this.diamondsCollected.toString())
  }

  createWeaponSwapButton() {
    const buttonSize = 100 * this.scaleFactor
    const buttonPadding = 40 * this.scaleFactor

    const buttonX = this.sys.game.config.width - buttonPadding - buttonSize / 2
    const buttonY = this.sys.game.config.height - buttonPadding - buttonSize / 2

    const swapButton = this.add.graphics()
    swapButton.fillStyle(0x444444, 0.8)
    swapButton.fillRoundedRect(-buttonSize / 2, -buttonSize / 2, buttonSize, buttonSize, 12)
    swapButton.lineStyle(3, 0xffffff)
    swapButton.strokeRoundedRect(-buttonSize / 2, -buttonSize / 2, buttonSize, buttonSize, 12)
    swapButton.x = buttonX
    swapButton.y = buttonY
    swapButton.setScrollFactor(0)
    swapButton.setDepth(1100)

    const buttonIcon = this.add
      .text(buttonX, buttonY, "R", {
        fontSize: `${buttonSize * 0.45}px`,
        fill: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1101)

    swapButton.setInteractive(
      new Phaser.Geom.Rectangle(-buttonSize / 2, -buttonSize / 2, buttonSize, buttonSize, 12),
      Phaser.Geom.Rectangle.Contains,
    )

    swapButton.on("pointerdown", (pointer) => {
      this.swapWeaponAction()
      pointer.stopPropagation()
    })

    swapButton.on("pointerover", () => swapButton.setAlpha(0.9))
    swapButton.on("pointerout", () => swapButton.setAlpha(0.8))
    swapButton.on("pointerup", () => swapButton.setAlpha(0.8))
    this.gameUI.add(swapButton) // Add weapon swap button to main UI container
    this.gameUI.add(buttonIcon) // Add weapon swap icon to main UI container
  }

  swapWeaponAction() {
    this.currentWeaponIndex = (this.currentWeaponIndex + 1) % this.weaponKeys.length
    const nextWeapon = this.weaponKeys[this.currentWeaponIndex]
    this.switchWeapon(nextWeapon)
    console.log(`Switched to weapon: ${nextWeapon}`)
  }

  smartEnemyMovement(enemy) {
    const tileSize = this.tileSize
    const speed = enemy.speed
    if (enemy.isMoving) {
      return
    }

    const enemyTile = {
      x: Math.floor((enemy.x - this.mazeOffsetX) / tileSize),
      y: Math.floor((enemy.y - this.mazeOffsetY) / tileSize),
    }

    const maze = this.maze
    if (!maze) {
      console.error("Maze not defined on the scene (this.maze). Please set it in create().")
      return
    }

    if (!enemy.path || enemy.path.length === 0) {
      const emptyTiles = []
      for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[0].length; c++) {
          if (maze[r][c] === 0) {
            emptyTiles.push({ x: c, y: r })
          }
        }
      }

      if (!enemy.visitedTiles) {
        enemy.visitedTiles = new Set()
      }

      const availableTargets = emptyTiles.filter((tile) => tile.x !== enemyTile.x || tile.y !== enemyTile.y)

      let targetTile = null

      const unvisitedTargets = availableTargets.filter((tile) => !enemy.visitedTiles.has(`${tile.x},${tile.y}`))

      if (unvisitedTargets.length > 0) {
        targetTile = Phaser.Utils.Array.GetRandom(unvisitedTargets)
      } else if (availableTargets.length > 0) {
        enemy.visitedTiles.clear()
        targetTile = Phaser.Utils.Array.GetRandom(availableTargets)
      } else {
        console.warn("Enemy at", enemyTile, ": No available empty tiles to pathfind to.")
        return
      }

      const newPath = this.findPath(enemyTile, targetTile, maze)

      if (newPath.length > 0) {
        enemy.path = newPath
        enemy.visitedTiles.add(`${targetTile.x},${targetTile.y}`)
      } else {
        console.warn(
          `Enemy at (${enemyTile.x},${enemyTile.y}): No path found to target (${targetTile.x},${targetTile.y}).`,
        )
        enemy.path = []
        return
      }
    }

    if (enemy.path && enemy.path.length > 0) {
      const nextTile = enemy.path.shift()

      const dx = nextTile.x - enemyTile.x
      const dy = nextTile.y - enemyTile.y

      let dir = ""
      if (dx === 1) dir = "right"
      else if (dx === -1) dir = "left"
      else if (dy === 1) dir = "down"
      else if (dy === -1) dir = "up"

      if (dir) {
        this.moveEnemyToTile(enemy, nextTile.x, nextTile.y, speed, dir)
      } else {
        console.warn("Invalid direction calculated for next path step. Re-evaluating path.", enemyTile, nextTile)
        enemy.path = []
      }
    }
  }

  hasLineOfSight(startX, startY, endX, endY) {
    const MAX_LOS_RANGE = 400
    const startTile = this.getTileCoordsFromPixels(startX, startY)
    const endTile = this.getTileCoordsFromPixels(endX, endY)

    const dist = Phaser.Math.Distance.Between(startX, startY, endX, endY)
    if (dist > MAX_LOS_RANGE) {
      return false
    }

    const maze = this.maze

    let x0 = startTile.col
    let y0 = startTile.row
    const x1 = endTile.col
    const y1 = endTile.row

    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1
    const sy = y0 < y1 ? 1 : -1
    let err = dx - dy

    while (true) {
      if (y0 < 0 || y0 >= maze.length || x0 < 0 || x0 >= maze[0].length) {
        return false
      }
      if (maze[y0][x0] === 1) {
        if (x0 !== endTile.col || y0 !== endTile.row) {
          return false
        }
      }

      if (x0 === x1 && y0 === y1) break

      const e2 = 2 * err
      if (e2 > -dy) {
        err -= dy
        x0 += sx
      }
      if (e2 < dx) {
        err += dx
        y0 += sy
      }
    }

    return true
  }

  getTileCoordsFromPixels(x, y) {
    const col = Math.floor((x - this.mazeOffsetX) / this.tileSize)
    const row = Math.floor((y - this.mazeOffsetY) / this.tileSize)
    return { col, row }
  }

  moveEnemyToTile(enemy, tileX, tileY, speed, dir) {
    const tileSize = this.tileSize
    const targetX = tileX * tileSize + tileSize / 2 + this.mazeOffsetX
    const targetY = tileY * tileSize + tileSize / 2 + this.mazeOffsetY

    const oldTileX = Math.floor((enemy.x - this.mazeOffsetX) / tileSize)
    const oldTileY = Math.floor((enemy.y - this.mazeOffsetY) / tileSize)

    this.occupiedTiles.delete(`${oldTileX},${oldTileY}`)

    if (this.occupiedTiles.has(`${tileX},${tileY}`)) {
      console.warn(`Tile ${tileX},${tileY} is already occupied, cannot move enemy.`)
      enemy.isMoving = false
      return
    }

    this.occupiedTiles.add(`${tileX},${tileY}`)

    enemy.isMoving = true
    enemy.dir = dir
    switch (dir) {
      case "left":
        enemy.angle = 0
        enemy.flipX = true
        break
      case "right":
        enemy.angle = 0
        enemy.flipX = false
        break
      case "up":
        enemy.angle = -90
        enemy.flipX = false
        break
      case "down":
        enemy.angle = 90
        enemy.flipX = false
        break
      default:
        enemy.angle = 0
        enemy.flipX = false
        break
    }

    this.tweens.add({
      targets: enemy,
      x: targetX,
      y: targetY,
      duration: speed,
      ease: "Linear",
      onComplete: () => {
        enemy.isMoving = false
        enemy.x = targetX
        enemy.y = targetY
      },
    })
  }

  findPath(start, end, maze) {
    const rows = maze.length
    const cols = maze[0].length

    function inBounds(x, y) {
      return x >= 0 && y >= 0 && x < cols && y < rows
    }

    function heuristic(a, b) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }

    const open = [{ x: start.x, y: start.y, f: 0, g: 0, parent: null }]
    const closed = new Set()

    while (open.length > 0) {
      open.sort((a, b) => a.f - b.f)
      const current = open.shift()
      const key = `${current.x},${current.y}`

      if (closed.has(key)) continue
      closed.add(key)

      if (current.x === end.x && current.y === end.y) {
        const path = []
        let node = current
        while (node.parent) {
          path.push({ x: node.x, y: node.y })
          node = node.parent
        }
        path.reverse()
        return path
      }

      const neighbors = [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 },
      ]

      for (const n of neighbors) {
        if (inBounds(n.x, n.y) && maze[n.y][n.x] === 0 && !closed.has(`${n.x},${n.y}`)) {
          const g = current.g + 1
          const h = heuristic(n, end)
          const f = g + h

          const existingOpenNode = open.find((node) => node.x === n.x && node.y === n.y)

          if (!existingOpenNode || g < existingOpenNode.g) {
            if (existingOpenNode) {
              existingOpenNode.g = g
              existingOpenNode.f = f
              existingOpenNode.parent = current
            } else {
              open.push({ ...n, g, f, parent: current })
            }
          }
        }
      }
    }

    return []
  }

  gameOver() {
    if (this.sounds && this.sounds.background) {
      this.sounds.background.stop()
    }
    initiateGameOver.bind(this)({
      EnemiesKilled: kill,
    })
  }

  pauseGame() {
    handlePauseGame.bind(this)()
  }
update(time, delta) {
    // --- START OF NEW CAMERA LOGIC ---
if (this.player && this.player.active) {
    const pointer = this.input.activePointer;
    const playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);
    const pointerPos = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);

    // Calculate the midpoint, but weighted more towards the player
    // A weight of 0.3 means the target is 30% of the way towards the cursor
    const weight = 0.3;
    this.cameraTarget.x = Phaser.Math.Interpolation.Linear([playerPos.x, pointerPos.x], weight);
    this.cameraTarget.y = Phaser.Math.Interpolation.Linear([playerPos.y, pointerPos.y], weight);

    // Smoothly move the camera's scroll position towards the target
    const cameraLerp = 0.08; // How fast the camera follows. Lower is smoother.
    this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, this.cameraTarget.x - this.cameras.main.width / 2, cameraLerp);
    this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, this.cameraTarget.y - this.cameras.main.height / 2, cameraLerp);
}
// --- END OF NEW CAMERA LOGIC ---
    // Manually scroll the background tileSprite for a more pronounced effect
if (this.bg) {
    this.bg.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.bg.tilePositionY = this.cameras.main.scrollY * 0.3;
}


    if (this.levelTransitioning || !this.player || !this.player.active) return

    // --- Start of New Flipping/Aiming Control Logic ---
    const pointer = this.input.activePointer;
    const weaponData = this.weaponTypes[this.player.currentWeapon];
    
    // Reset player velocity and STOP the container from rotating
    this.player.body.setVelocity(0);
    this.player.setRotation(0);

    if (this.isMobile) {
      // --- MOBILE CONTROLS ---
      // Movement & Aiming with Joystick
      if (this.joystick && this.joystick.force > 0.1) {
        const moveVector = new Phaser.Math.Vector2(this.joystick.forceX, this.joystick.forceY).normalize();
        // If no keys are pressed, stop accelerating
if (moveVector.length() === 0) {
    this.player.body.setAcceleration(0, 0);
}
this.player.body.setAcceleration(moveVector.x * this.playerAcceleration, moveVector.y * this.playerAcceleration);
        
        // Weapon aims with joystick
        this.player.weapon.rotation = this.joystick.angle();

        // Player sprite flips based on joystick direction
        if (this.joystick.forceX < -0.1) {
            this.player.sprite.setFlipX(true);
            this.player.weapon.x = -weaponData.offsetX;
        } else if (this.joystick.forceX > 0.1) {
            this.player.sprite.setFlipX(false);
            this.player.weapon.x = weaponData.offsetX;
        }
      }

      // Shooting with Tap
      if (this.mobileTapTarget && this.playerFireCooldown <= 0) {
        const aimAngle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.mobileTapTarget.x, this.mobileTapTarget.y);
        this.player.weapon.rotation = aimAngle;
        
        // Flip player sprite based on shot direction
        if (this.mobileTapTarget.x < this.player.x) {
            this.player.sprite.setFlipX(true);
            this.player.weapon.x = -weaponData.offsetX;
        } else {
            this.player.sprite.setFlipX(false);
            this.player.weapon.x = weaponData.offsetX;
        }

        this.fireBullet(this.player, this.mobileTapTarget.x, this.mobileTapTarget.y, this.playerBullets);
        this.playerFireCooldown = this.playerFireRate;
        this.mobileTapTarget = null;
      }

    } else {
      // --- DESKTOP CONTROLS ---
      // Aiming with Mouse
      const aimAngle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
      this.player.weapon.rotation = aimAngle;

      // Player sprite flips based on mouse position relative to player
    //   if (pointer.worldX < this.player.x) {
    //     this.player.sprite.setFlipX(true);
    //     this.player.weapon.x = -weaponData.offsetX;
    //   } else {
    //     this.player.sprite.setFlipX(false);
    //     this.player.weapon.x = weaponData.offsetX;
    //   }

    // Player sprite flips based on horizontal movement direction
// if (moveX < 0) { // Moving left
//   this.player.sprite.setFlipX(true);
//   this.player.weapon.x = -weaponData.offsetX;
// } else if (moveX > 0) { // Moving right
//   this.player.sprite.setFlipX(false);
//   this.player.weapon.x = weaponData.offsetX;
// }

      // Movement with WASD
      let moveX = 0; let moveY = 0;
      if (this.keys.left.isDown) { moveX = -1; }
      else if (this.keys.right.isDown) { moveX = 1; }
      if (this.keys.up.isDown) { moveY = -1; }
      else if (this.keys.down.isDown) { moveY = 1; }

           if (moveX < 0) { // Moving left
        this.player.sprite.setFlipX(true);
        this.player.weapon.x = -weaponData.offsetX;
      } else if (moveX > 0) { // Moving right
        this.player.sprite.setFlipX(false);
        this.player.weapon.x = weaponData.offsetX;
      }

      const moveVector = new Phaser.Math.Vector2(moveX, moveY).normalize();
      // If no keys are pressed, stop accelerating
if (moveVector.length() === 0) {
    this.player.body.setAcceleration(0, 0);
}
this.player.body.setAcceleration(moveVector.x * this.playerAcceleration, moveVector.y * this.playerAcceleration);

      // Shooting with Mouse Click or Spacebar
      const canShoot = !this.pointerOnUI && (this.spacebar.isDown || pointer.isDown);
      if (canShoot && this.playerFireCooldown <= 0) {
        this.fireBullet(this.player, pointer.worldX, pointer.worldY, this.playerBullets);
        this.playerFireCooldown = this.playerFireRate;
      }
    }

    // --- End of New Control Logic ---

    if (this.playerFireCooldown > 0) {
      this.playerFireCooldown -= delta
    }

    // Diamond attraction
    if (this.diamonds && this.player && this.player.active) {
      this.diamonds.children.each((diamond) => {
        if (diamond.active && diamond.body) {
          const angle = Phaser.Math.Angle.Between(diamond.x, diamond.y, this.player.x, this.player.y)
          this.physics.velocityFromRotation(angle, this.diamondAttractionForce, diamond.body.velocity)
        }
      })
    }

    // Enemy behavior
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active || enemy.isFrozen || !enemy.visionCone) return
      enemy.isVisible = this.isEnemyVisible(enemy)
      const distToPlayer = Phaser.Math.Distance.Between(enemy.x, enemy.y, this.player.x, this.player.y)
      const hasLOS = this.hasLineOfSight(enemy.x, enemy.y, this.player.x, this.player.y)

      if (enemy.isVisible && distToPlayer < (this.tileSize * 6) && hasLOS) {
        enemy.body.setVelocity(0)
        const angleToPlayer = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)
        enemy.setRotation(angleToPlayer)

if (time > enemy.nextFireTime) {
  this.fireBullet(enemy, this.player.x, this.player.y, this.enemyBullets);
  enemy.nextFireTime = time + 600;
}
      } else {
        if (!enemy.isMoving && enemy.body.moves) {
          this.smartEnemyMovement(enemy)
        }
      }
    })

    // Update direction arrow if endpoint is spawned
    if (this.mazeEndpoint && this.directionArrows.length > 0) {
      this.updateDirectionArrows()
    }
  }

  hitStop(duration) {
    this.physics.pause();
    this.time.delayedCall(duration, () => {
        this.physics.resume();
    });
}
}


function displayProgressLoader() {
  const width = 320
  const height = 50
  const x = this.game.config.width / 2 - 160
  const y = this.game.config.height / 2 - 50

  const progressBox = this.add.graphics()
  progressBox.fillStyle(0x222222, 0.8)
  progressBox.fillRect(x, y, width, height)

  const loadingText = this.make
    .text({
      x: this.game.config.width / 2,
      y: this.game.config.height / 2 + 20,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    })
    .setOrigin(0.5, 0.5)

  const progressBar = this.add.graphics()
  this.load.on("progress", (value) => {
    progressBar.clear()
    progressBar.fillStyle(0x00ff00, 1)
    progressBar.fillRect(x, y, width * value, height)
  })
  this.load.on("complete", () => {
    progressBar.destroy()
    progressBox.destroy()
    loadingText.destroy()
  })
}

/*
------------------- GLOBAL CODE ENDS HERE -------------------
*/

const config = {
  type: Phaser.AUTO,
  width: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].width,
  height: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].height,
  scene: [GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    orientation: Phaser.Scale.Orientation.LANDSCAPE,
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  dataObject: {
    name: _CONFIG.title,
    description: _CONFIG.description,
    instructions: _CONFIG.instructions,
  },
  deviceOrientation: _CONFIG.deviceOrientation === "landscape",
}

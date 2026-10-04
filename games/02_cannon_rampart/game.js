// Touch Screen Controls
const joystickEnabled = true
const buttonEnabled = true

// JOYSTICK DOCUMENTATION: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/virtualjoystick/
const rexJoystickUrl =
  "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js"

// BUTTON DOCMENTATION: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/button/
const rexButtonUrl = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js"

/*
------------------- GLOBAL CODE STARTS HERE -------------------
*/

// Enhanced Menu Scene with better animations and UI
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" })
    this.particles = []
    this.stars = []
    this.menuAnimations = []
  }

  preload() {
    // Load all the same assets as other scenes
    for (const key in _CONFIG.imageLoader) {
      this.load.image(key, _CONFIG.imageLoader[key])
    }

    for (const key in _CONFIG.libLoader) {
      this.load.image(key, _CONFIG.libLoader[key])
    }

    if (_CONFIG.soundsLoader) {
      for (const key in _CONFIG.soundsLoader) {
        this.load.audio(key, [_CONFIG.soundsLoader[key]])
      }
    }

    // Load pixel font
    const fontName = "pix"
    const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/"
    this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml")
  }

  create() {
    this.width = this.game.config.width
    this.height = this.game.config.height
    this.scaleFactor = this.calculateScaleFactor()

    // Create layered background effects
    this.createDynamicBackground()

    // Create animated particles system
    this.createAdvancedParticles()

    // Create title with epic effects
    this.createGameTitle()

    // Create menu buttons with animations
    this.createMenuButtons()

    // Create side assets showcase
    this.createSideAssets()

    // Setup input handling
    this.setupInputHandling()

    // Entrance animation sequence
    this.playEntranceAnimation()
  }

  calculateScaleFactor() {
    const baseWidth = 720
    const baseHeight = 1280
    const widthFactor = this.width / baseWidth
    const heightFactor = this.height / baseHeight
    return Math.min(widthFactor, heightFactor)
  }

  createDynamicBackground() {
    // Main background with parallax effect
    this.bg = this.add.image(this.width / 2, this.height / 2, "background").setOrigin(0.5)
    const bgScale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight) * 1.1
    this.bg.setScale(bgScale)

    // Slow parallax movement
    this.tweens.add({
      targets: this.bg,
      x: this.width / 2 + 20,
      y: this.height / 2 + 10,
      duration: 8000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    // Animated gradient overlay
    this.gradientOverlay = this.add
      .rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000033, 0.6)
      .setDepth(1)

    // Pulsing effect on overlay
    this.tweens.add({
      targets: this.gradientOverlay,
      alpha: { from: 0.4, to: 0.7 },
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    // Create animated energy rings
    this.createEnergyRings()
  }

  createEnergyRings() {
    this.energyRings = []
    for (let i = 0; i < 3; i++) {
      const ring = this.add
        .circle(this.width / 2, this.height / 2, 50 + i * 100, 0x00ffff, 0)
        .setStrokeStyle(2, 0x00ffff, 0.3 - i * 0.1)
        .setDepth(2)

      // Rotating animation
      this.tweens.add({
        targets: ring,
        rotation: Math.PI * 2,
        duration: 10000 + i * 2000,
        repeat: -1,
        ease: "Linear",
      })

      // Pulsing scale effect
      this.tweens.add({
        targets: ring,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 4000 + i * 1000,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      this.energyRings.push(ring)
    }
  }

  createAdvancedParticles() {
    // Floating orbs with trails
    this.createFloatingOrbs()

    // Shooting stars
    this.createShootingStars()

    // Ambient sparkles
    this.createSparkles()
  }

  createFloatingOrbs() {
    this.orbs = []
    for (let i = 0; i < 8; i++) {
      const orb = this.add
        .circle(
          Phaser.Math.Between(50, this.width - 50),
          Phaser.Math.Between(100, this.height - 100),
          Phaser.Math.Between(8, 15),
          Phaser.Math.RND.pick([0x00ffff, 0xff0080, 0x00ff00, 0xffff00]),
          0.7,
        )
        .setDepth(3)

      // Add glow effect
      const glow = this.add.circle(orb.x, orb.y, orb.radius * 2, orb.fillColor, 0.2).setDepth(2)

      // Floating movement
      this.tweens.add({
        targets: [orb, glow],
        x: orb.x + Phaser.Math.Between(-150, 150),
        y: orb.y + Phaser.Math.Between(-100, 100),
        duration: Phaser.Math.Between(4000, 8000),
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay: i * 500,
      })

      // Pulsing effect
      this.tweens.add({
        targets: orb,
        alpha: { from: 0.4, to: 0.9 },
        scaleX: { from: 0.8, to: 1.2 },
        scaleY: { from: 0.8, to: 1.2 },
        duration: 2000,
        yoyo: true,
        repeat: -1,
        delay: i * 300,
      })

      this.orbs.push({ orb, glow })
    }
  }

  createShootingStars() {
    // Create shooting stars that periodically streak across screen
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        const star = this.add.circle(-20, Phaser.Math.Between(50, this.height / 2), 3, 0xffffff, 0.9).setDepth(4)

        // Trail effect
        const trail = this.add.rectangle(star.x - 30, star.y, 60, 2, 0xffffff, 0.5).setDepth(3)

        this.tweens.add({
          targets: [star, trail],
          x: this.width + 50,
          duration: 1500,
          ease: "Power2.easeOut",
          onComplete: () => {
            star.destroy()
            trail.destroy()
          },
        })

        this.tweens.add({
          targets: [star, trail],
          alpha: 0,
          duration: 1500,
          delay: 200,
        })
      },
      loop: true,
    })
  }

  createSparkles() {
    this.sparkles = []
    for (let i = 0; i < 20; i++) {
      const sparkle = this.add
        .circle(
          Phaser.Math.Between(0, this.width),
          Phaser.Math.Between(0, this.height),
          Phaser.Math.Between(1, 3),
          0xffffff,
          Phaser.Math.FloatBetween(0.3, 0.8),
        )
        .setDepth(5)

      // Twinkling animation
      this.tweens.add({
        targets: sparkle,
        alpha: { from: 0.1, to: 1 },
        scaleX: { from: 0.5, to: 1.5 },
        scaleY: { from: 0.5, to: 1.5 },
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      })

      this.sparkles.push(sparkle)
    }
  }

  createGameTitle() {
    // Main title with dramatic entrance
    this.titleText = this.add
      .bitmapText(this.width / 2, this.height * 0.25, "pixelfont", "CANNON SHOOTER", 80 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0x00ffff)
      .setDepth(15)
      .setAlpha(0)
      .setScale(0)

    // Title glow effect
    this.titleGlow = this.add
      .bitmapText(this.width / 2, this.height * 0.25, "pixelfont", "CANNON SHOOTER", 82 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0x0080ff)
      .setDepth(14)
      .setAlpha(0)
      .setScale(0)

    // Subtitle
    this.subtitleText = this.add
      .bitmapText(this.width / 2, this.height * 0.32, "pixelfont", "EPIC ARCADE ACTION", 28 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0xff6600)
      .setDepth(15)
      .setAlpha(0)

    // Title background effect
    this.titleBg = this.add
      .rectangle(this.width / 2, this.height * 0.25, this.width * 0.9, 120 * this.scaleFactor, 0x000000, 0.7)
      .setDepth(13)
      .setAlpha(0)

    // Title border
    this.titleBorder = this.add
      .rectangle(this.width / 2, this.height * 0.25, this.width * 0.9, 120 * this.scaleFactor, 0x00ffff, 0)
      .setStrokeStyle(4, 0x00ffff, 0.8)
      .setDepth(13)
      .setAlpha(0)
  }

  createMenuButtons() {
    const buttonY = this.height * 0.6
    const buttonSpacing = 100 * this.scaleFactor

    // Play Button
    this.playButton = this.createAnimatedButton(this.width / 2, buttonY, "PLAY GAME", 0x00ff00, () => this.startGame())

    // Instructions Button
    this.instructionsButton = this.createAnimatedButton(
      this.width / 2,
      buttonY + buttonSpacing,
      "INSTRUCTIONS",
      0x00aaff,
      () => this.showInstructions(),
    )

    // Button entrance animation
    this.playButton.container.setAlpha(0).setY(buttonY + 50)
    this.instructionsButton.container.setAlpha(0).setY(buttonY + buttonSpacing + 50)
  }

  createAnimatedButton(x, y, text, color, callback) {
    const buttonWidth = 400 * this.scaleFactor
    const buttonHeight = 70 * this.scaleFactor

    // Create container for button elements
    const container = this.add.container(x, y).setDepth(20)

    // Button background with gradient effect
    const buttonBg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, color, 0.8)

    // Button glow
    const buttonGlow = this.add.rectangle(0, 0, buttonWidth + 10, buttonHeight + 10, color, 0.3)

    // Button border
    const buttonBorder = this.add.rectangle(0, 0, buttonWidth, buttonHeight, color, 0).setStrokeStyle(4, color, 1)

    // Button text
    const buttonText = this.add
      .bitmapText(0, 0, "pixelfont", text, 36 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0xffffff)

    // Add elements to container
    container.add([buttonGlow, buttonBg, buttonBorder, buttonText])

    // Hover effects
    container.setInteractive(
      new Phaser.Geom.Rectangle(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight),
      Phaser.Geom.Rectangle.Contains,
    )

    container.on("pointerover", () => {
      this.tweens.add({
        targets: container,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 200,
        ease: "Back.easeOut",
      })

      this.tweens.add({
        targets: buttonGlow,
        alpha: 0.6,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 200,
      })
    })

    container.on("pointerout", () => {
      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: "Back.easeOut",
      })

      this.tweens.add({
        targets: buttonGlow,
        alpha: 0.3,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
      })
    })

    container.on("pointerdown", () => {
      this.tweens.add({
        targets: container,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 100,
        yoyo: true,
        onComplete: callback,
      })

      // Click effect
      const clickEffect = this.add.circle(x, y, 5, 0xffffff, 0.8).setDepth(25)
      this.tweens.add({
        targets: clickEffect,
        radius: 50,
        alpha: 0,
        duration: 300,
        onComplete: () => clickEffect.destroy(),
      })
    })

    // Idle pulsing animation
    this.tweens.add({
      targets: buttonGlow,
      alpha: { from: 0.2, to: 0.5 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    return {
      container,
      bg: buttonBg,
      glow: buttonGlow,
      border: buttonBorder,
      text: buttonText,
    }
  }

  createSideAssets() {
    // LEFT SIDE ASSETS
    const leftAssets = [
      { key: "enemy", tint: 0xff6600, name: "ENEMY" },
      { key: "enemy_1", tint: 0xff0066, name: "ELITE" },
      { key: "projectile", tint: 0x00ff66, name: "SPEED" },
    ]

    // RIGHT SIDE ASSETS
    const rightAssets = [
      { key: "player", tint: 0x00ffff, name: "CANNON" },
      { key: "boss", tint: 0xff0000, name: "BOSS" },
      { key: "firebullet", tint: 0xffaa00, name: "FIREBALL" },
    ]

    this.leftSideAssets = []
    this.rightSideAssets = []

    // Create left side assets
    leftAssets.forEach((asset, index) => {
      const yPos = this.height * 0.45 + index * 120 * this.scaleFactor
      const xPos = this.width * 0.12

      const container = this.add.container(xPos, yPos).setDepth(12).setAlpha(0)

      const bgCircle = this.add.circle(0, 0, 45 * this.scaleFactor, 0x000000, 0.7)
      const glowBorder = this.add.circle(0, 0, 45 * this.scaleFactor, asset.tint, 0).setStrokeStyle(3, asset.tint, 0.8)

      const assetImage = this.add
        .image(0, -5, asset.key)
        .setScale(0.5 * this.scaleFactor)
        .setTint(asset.tint)

      const assetLabel = this.add
        .bitmapText(0, 25, "pixelfont", asset.name, 16 * this.scaleFactor)
        .setOrigin(0.5)
        .setTint(0xffffff)

      container.add([bgCircle, glowBorder, assetImage, assetLabel])

      // Floating animation
      this.tweens.add({
        targets: container,
        y: yPos - 15,
        duration: 3000 + index * 500,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      // Pulsing glow effect
      this.tweens.add({
        targets: glowBorder,
        alpha: { from: 0.4, to: 1 },
        scaleX: { from: 1, to: 1.1 },
        scaleY: { from: 1, to: 1.1 },
        duration: 2000 + index * 300,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      if (asset.key === "projectile") {
        this.tweens.add({
          targets: assetImage,
          rotation: Math.PI * 2,
          duration: 4000,
          repeat: -1,
          ease: "Linear",
        })
      }

      this.leftSideAssets.push(container)
    })

    // Create right side assets
    rightAssets.forEach((asset, index) => {
      const yPos = this.height * 0.45 + index * 120 * this.scaleFactor
      const xPos = this.width * 0.88

      const container = this.add.container(xPos, yPos).setDepth(12).setAlpha(0)

      const bgCircle = this.add.circle(0, 0, 45 * this.scaleFactor, 0x000000, 0.7)
      const glowBorder = this.add.circle(0, 0, 45 * this.scaleFactor, asset.tint, 0).setStrokeStyle(3, asset.tint, 0.8)

      const assetImage = this.add
        .image(0, -5, asset.key)
        .setScale(0.5 * this.scaleFactor)
        .setTint(asset.tint)

      const assetLabel = this.add
        .bitmapText(0, 25, "pixelfont", asset.name, 16 * this.scaleFactor)
        .setOrigin(0.5)
        .setTint(0xffffff)

      container.add([bgCircle, glowBorder, assetImage, assetLabel])

      // Floating animation
      this.tweens.add({
        targets: container,
        y: yPos - 10,
        duration: 2500 + index * 400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      // Pulsing glow effect
      this.tweens.add({
        targets: glowBorder,
        alpha: { from: 0.3, to: 0.9 },
        scaleX: { from: 1, to: 1.15 },
        scaleY: { from: 1, to: 1.15 },
        duration: 2200 + index * 400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      if (asset.key === "firebullet") {
        this.tweens.add({
          targets: assetImage,
          scaleX: { from: 0.5, to: 0.6 },
          scaleY: { from: 0.5, to: 0.6 },
          duration: 1500,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        })
      }

      if (asset.key === "boss") {
        this.tweens.add({
          targets: assetImage,
          rotation: { from: -0.1, to: 0.1 },
          duration: 2000,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        })
      }

      this.rightSideAssets.push(container)
    })
  }

  setupInputHandling() {
    // Keyboard shortcuts
    this.input.keyboard.on("keydown-SPACE", () => this.startGame())
    this.input.keyboard.on("keydown-ENTER", () => this.startGame())
    this.input.keyboard.on("keydown-I", () => this.showInstructions())
  }

  playEntranceAnimation() {
    // Title entrance sequence
    this.tweens.add({
      targets: [this.titleBg, this.titleBorder],
      alpha: 1,
      duration: 500,
      delay: 200,
    })

    this.tweens.add({
      targets: [this.titleGlow, this.titleText],
      alpha: 1,
      scale: 1,
      duration: 800,
      delay: 400,
      ease: "Back.easeOut",
    })

    this.tweens.add({
      targets: this.subtitleText,
      alpha: 1,
      y: this.subtitleText.y - 10,
      duration: 600,
      delay: 800,
      ease: "Back.easeOut",
    })

    // Button entrance sequence
    this.tweens.add({
      targets: this.playButton.container,
      alpha: 1,
      y: this.height * 0.6,
      duration: 600,
      delay: 1000,
      ease: "Back.easeOut",
    })

    this.tweens.add({
      targets: this.instructionsButton.container,
      alpha: 1,
      y: this.height * 0.6 + 100 * this.scaleFactor,
      duration: 600,
      delay: 1200,
      ease: "Back.easeOut",
    })

    // Side assets entrance animation
    this.leftSideAssets.forEach((asset, index) => {
      this.tweens.add({
        targets: asset,
        alpha: 1,
        x: asset.x + 20,
        duration: 600,
        delay: 1400 + index * 200,
        ease: "Back.easeOut",
      })
    })

    this.rightSideAssets.forEach((asset, index) => {
      this.tweens.add({
        targets: asset,
        alpha: 1,
        x: asset.x - 20,
        duration: 600,
        delay: 1600 + index * 200,
        ease: "Back.easeOut",
      })
    })

    // Title continuous effects
    this.time.delayedCall(1500, () => {
      // Glowing pulse effect
      this.tweens.add({
        targets: this.titleGlow,
        alpha: { from: 0.3, to: 0.8 },
        scaleX: { from: 1, to: 1.02 },
        scaleY: { from: 1, to: 1.02 },
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      // Color shifting effect
      this.tweens.add({
        targets: this.titleText,
        duration: 4000,
        repeat: -1,
        onUpdate: (tween) => {
          const progress = tween.progress
          const hue = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5
          const color = Phaser.Display.Color.HSVToRGB(hue * 0.3, 1, 1)
          this.titleText.setTint(color.color)
        },
      })
    })
  }

  startGame() {
    // Epic exit animation
    this.cameras.main.flash(200, 255, 255, 255, false)

    // Zoom out effect
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 0.8,
      duration: 800,
      ease: "Power2.easeIn",
    })

    // Fade to black
    this.cameras.main.fadeOut(800, 0, 0, 0)

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("GameScene")
    })
  }

  showInstructions() {
    // Smooth transition to instructions
    this.cameras.main.fadeOut(500, 0, 0, 50)

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("InstructionsScene")
    })
  }
}

// Enhanced Instructions Scene with better navigation
class InstructionsScene extends Phaser.Scene {
  constructor() {
    super({ key: "InstructionsScene" })
    this.currentPage = 1
    this.totalPages = 2
    this.animationSpeed = 300
    this.navigationElements = []
  }

  preload() {
    // Load all the same assets as GameScene
    for (const key in _CONFIG.imageLoader) {
      this.load.image(key, _CONFIG.imageLoader[key])
    }

    for (const key in _CONFIG.libLoader) {
      this.load.image(key, _CONFIG.libLoader[key])
    }

    // Load pixel font
    const fontName = "pix"
    const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/"
    this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml")
  }

  create() {
    this.width = this.game.config.width
    this.height = this.game.config.height
    this.scaleFactor = this.calculateScaleFactor()

    // Create animated background
    this.createAnimatedBackground()

    // Create page content
    this.createPageContent()

    // Create navigation elements
    this.createNavigation()

    // Input handling
    this.setupInputHandling()
  }

  calculateScaleFactor() {
    const baseWidth = 720
    const baseHeight = 1280
    const widthFactor = this.width / baseWidth
    const heightFactor = this.height / baseHeight
    return Math.min(widthFactor, heightFactor)
  }

  createAnimatedBackground() {
    // Main background
    this.bg = this.add.image(this.width / 2, this.height / 2, "background").setOrigin(0.5)
    const bgScale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight)
    this.bg.setScale(bgScale)

    // Dark overlay for better text readability
    this.overlay = this.add
      .rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.8)
      .setDepth(1)

    // Animated particles/stars
    this.createFloatingParticles()
  }

  createFloatingParticles() {
    this.particles = []
    for (let i = 0; i < 15; i++) {
      const particle = this.add
        .circle(
          Phaser.Math.Between(0, this.width),
          Phaser.Math.Between(0, this.height),
          Phaser.Math.Between(2, 6),
          0xffffff,
          0.3,
        )
        .setDepth(2)

      // Random floating animation
      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-100, 100),
        y: particle.y + Phaser.Math.Between(-100, 100),
        alpha: { from: 0.1, to: 0.6 },
        duration: Phaser.Math.Between(3000, 6000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      })

      this.particles.push(particle)
    }
  }

  createPageContent() {
    // Create container for page content
    this.pageContainer = this.add.container(0, 0).setDepth(10)

    // Page 1: Levels & Enemies
    this.page1 = this.add.container(0, 0)
    this.page1Elements = []
    this.createPage1Content()

    // Page 2: Powerups & Controls
    this.page2 = this.add.container(0, 0)
    this.page2Elements = []
    this.createPage2Content()

    // Add pages to main container
    this.pageContainer.add([this.page1, this.page2])

    // Initially show only page 1
    this.page2.setVisible(false)
    this.page2.setActive(false)
  }

  createPage1Content() {
    const title = this.add
      .bitmapText(this.width / 2, 70 * this.scaleFactor, "pixelfont", "LEVELS & ENEMIES", 64 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0x00ffff)
      .setDepth(15)

    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    this.page1.add(title)
    this.page1Elements.push(title)

    let currentY = 140 * this.scaleFactor
    const sectionSpacing = 80 * this.scaleFactor

    // Game Progression Section
    const progressionElements = this.createCleanSection(
      "GAME PROGRESSION",
      [
        "• 6 Epic Levels to Conquer",
        "• Score 50+ points to advance",
        "• Each level gets harder",
        "• Level 6: Ultimate Boss Battle!",
      ],
      0x00ff00,
      currentY,
      1,
    )
    currentY = progressionElements.bottomY + sectionSpacing

    // Enemy Types Section
    const enemyElements = this.createCleanSection(
      "ENEMY TYPES",
      [
        "• Basic Enemy: 1 hit to destroy",
        "• Armored Enemy: 5 hits (Level 3+)",
        "• Splitting Enemy: Breaks into 2 (Level 3+)",
        "• Boss Enemy: 20 hits, shoots back!",
      ],
      0xff6600,
      currentY,
      1,
    )

    // Enemy Visual Examples
    this.createEnemyShowcase(enemyElements.bottomY + sectionSpacing * 0.7)
  }

  createPage2Content() {
    const title = this.add
      .bitmapText(this.width / 2, 70 * this.scaleFactor, "pixelfont", "POWERUPS & CONTROLS", 48 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0xff00ff)
      .setDepth(15)

    this.tweens.add({
      targets: title,
      alpha: { from: 0.8, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    })

    this.page2.add(title)
    this.page2Elements.push(title)

    let currentY = 140 * this.scaleFactor
    const sectionSpacing = 70 * this.scaleFactor

    // Powerups Section
    const powerupElements = this.createCleanSection(
      "POWERUPS",
      [
        "• Speed Boost: Faster movement",
        "• Ammo Refill: Restore 15 bullets",
        "• Fire Bullets: 7 powerful shots",
        "• Time Slow: SHIFT slows enemies",
      ],
      0x00ff00,
      currentY,
      2,
    )
    currentY = powerupElements.bottomY + sectionSpacing

    // Controls Section
    const controlElements = this.createCleanSection(
      "CONTROLS",
      ["• Arrow Keys: Move cannon", "• Mouse Click: Shoot", "• SHIFT: Time slowdown", "• ESC: Pause game"],
      0x00aaff,
      currentY,
      2,
    )
    currentY = controlElements.bottomY + sectionSpacing

    // Survival Tips Section
    this.createCleanSection(
      "SURVIVAL TIPS",
      [
        "• Health regenerates over time",
        "• Manage ammo carefully",
        "• Collect powerups to survive",
        "• Use time slow strategically!",
      ],
      0xffff00,
      currentY,
      2,
    )

    this.createPlayButton()
  }

  createCleanSection(title, items, color, startY, pageNumber = 1) {
    const margin = 25 * this.scaleFactor
    const itemHeight = 35 * this.scaleFactor
    const titleHeight = 50 * this.scaleFactor

    // Section title
    const sectionTitle = this.add
      .bitmapText(this.width / 2, startY + 20 * this.scaleFactor, "pixelfont", title, 42 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(color)
      .setDepth(15)

    // Calculate section dimensions
    const sectionHeight = titleHeight + items.length * itemHeight + margin * 2
    const sectionWidth = this.width * 0.9

    // Section background
    const sectionBg = this.add
      .rectangle(this.width / 2, startY + sectionHeight / 2, sectionWidth, sectionHeight, 0x000000, 0.75)
      .setDepth(12)

    // Section border
    const border = this.add
      .rectangle(this.width / 2, startY + sectionHeight / 2, sectionWidth, sectionHeight, color, 0)
      .setStrokeStyle(3, color, 0.9)
      .setDepth(13)

    // Add subtle glow effect
    const glow = this.add
      .rectangle(this.width / 2, startY + sectionHeight / 2, sectionWidth + 8, sectionHeight + 8, color, 0.15)
      .setDepth(11)

    const sectionElements = [sectionTitle, sectionBg, border, glow]

    // Item list with proper spacing
    items.forEach((item, index) => {
      const itemY = startY + titleHeight + margin + index * itemHeight
      const itemText = this.add
        .bitmapText(this.width / 2 - sectionWidth / 2 + margin * 1.5, itemY, "pixelfont", item, 30 * this.scaleFactor)
        .setOrigin(0, 0.5)
        .setTint(0xffffff)
        .setDepth(15)

      sectionElements.push(itemText)

      // Stagger animation for items
      itemText.setAlpha(0)
      this.tweens.add({
        targets: itemText,
        alpha: 1,
        x: itemText.x + 10,
        duration: 400,
        delay: index * 100,
        ease: "Back.easeOut",
      })
    })

    // Add all elements to the appropriate page
    if (pageNumber === 1) {
      this.page1.add(sectionElements)
      this.page1Elements.push(...sectionElements)
    } else {
      this.page2.add(sectionElements)
      this.page2Elements.push(...sectionElements)
    }

    // Subtle floating animation
    this.tweens.add({
      targets: [sectionBg, border, glow],
      y: "+=2",
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    return {
      bottomY: startY + sectionHeight,
      elements: sectionElements,
    }
  }

  createEnemyShowcase(y) {
    const enemies = [
      { sprite: "enemy", label: "Basic", color: 0xffffff },
      { sprite: "enemy_1", label: "Armored", color: 0xff6600 },
      { sprite: "boss", label: "Boss", color: 0xff0000 },
    ]

    const containerWidth = this.width * 0.8
    const spacing = containerWidth / enemies.length
    const startX = (this.width - containerWidth) / 2 + spacing / 2

    const showcaseElements = []

    enemies.forEach((enemy, index) => {
      const x = startX + index * spacing

      // Background circle for enemy
      const bg = this.add.circle(x, y, 40 * this.scaleFactor, 0x333333, 0.6).setDepth(14)

      const sprite = this.add
        .image(x, y, enemy.sprite)
        .setScale(0.5 * this.scaleFactor)
        .setTint(enemy.color)
        .setDepth(15)

      const label = this.add
        .bitmapText(x, y + 65 * this.scaleFactor, "pixelfont", enemy.label, 28 * this.scaleFactor)
        .setOrigin(0.5)
        .setTint(enemy.color)
        .setDepth(15)

      showcaseElements.push(bg, sprite, label)

      // Floating animation
      this.tweens.add({
        targets: [sprite, bg],
        y: y - 5,
        duration: 1800,
        yoyo: true,
        repeat: -1,
        delay: index * 500,
        ease: "Sine.easeInOut",
      })

      // Scale animation
      this.tweens.add({
        targets: sprite,
        scaleX: sprite.scaleX * 1.1,
        scaleY: sprite.scaleY * 1.1,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        delay: index * 300,
        ease: "Sine.easeInOut",
      })
    })

    this.page1.add(showcaseElements)
    this.page1Elements.push(...showcaseElements)
  }

  createPlayButton() {
    const buttonY = this.height - 100 * this.scaleFactor

    // Button background
    const buttonBg = this.add
      .rectangle(this.width / 2, buttonY, 320 * this.scaleFactor, 60 * this.scaleFactor, 0x00ff00, 0.9)
      .setDepth(20)

    // Button border
    const buttonBorder = this.add
      .rectangle(this.width / 2, buttonY, 320 * this.scaleFactor, 60 * this.scaleFactor, 0x00ff00, 0)
      .setStrokeStyle(4, 0x00ff00, 1)
      .setDepth(20)

    // Button glow
    const buttonGlow = this.add
      .rectangle(this.width / 2, buttonY, 330 * this.scaleFactor, 70 * this.scaleFactor, 0x00ff00, 0.2)
      .setDepth(19)

    // Button text
    const buttonText = this.add
      .bitmapText(this.width / 2, buttonY, "pixelfont", "TAP TO PLAY!", 36 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0x000000)
      .setDepth(21)

    const buttonElements = [buttonBg, buttonBorder, buttonGlow, buttonText]
    this.page2.add(buttonElements)
    this.page2Elements.push(...buttonElements)

    // Pulsing animation
    this.tweens.add({
      targets: [buttonBg, buttonBorder, buttonGlow],
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    // Glowing text effect
    this.tweens.add({
      targets: buttonText,
      alpha: { from: 0.8, to: 1 },
      duration: 800,
      yoyo: true,
      repeat: -1,
    })

    this.playButton = { bg: buttonBg, border: buttonBorder, text: buttonText, glow: buttonGlow }
  }

  createNavigation() {
    // Destroy previous navigation elements
    this.navigationElements.forEach((el) => {
      if (el && el.destroy) el.destroy()
    })
    this.navigationElements = []

    const dotY = this.height - 40 * this.scaleFactor
    const dotSpacing = 50 * this.scaleFactor
    const startX = this.width / 2 - ((this.totalPages - 1) * dotSpacing) / 2

    // Page indicator dots
    this.pageIndicators = []
    for (let i = 0; i < this.totalPages; i++) {
      const isActive = i === this.currentPage - 1

      const dot = this.add
        .circle(
          startX + i * dotSpacing,
          dotY,
          isActive ? 12 * this.scaleFactor : 8 * this.scaleFactor,
          isActive ? 0x00ffff : 0x666666,
          isActive ? 1 : 0.6,
        )
        .setDepth(25)

      this.navigationElements.push(dot)
      this.pageIndicators.push(dot)

      if (isActive) {
        const dotGlow = this.add
          .circle(startX + i * dotSpacing, dotY, 16 * this.scaleFactor, 0x00ffff, 0.3)
          .setDepth(24)

        this.navigationElements.push(dotGlow)

        this.tweens.add({
          targets: dotGlow,
          alpha: { from: 0.1, to: 0.4 },
          duration: 1000,
          yoyo: true,
          repeat: -1,
        })
      }
    }

    // Navigation arrows with improved visibility
    if (this.currentPage === 1) {
      const arrowBg = this.add
        .circle(this.width - 50 * this.scaleFactor, this.height / 2, 30 * this.scaleFactor, 0x00ffff, 0.3)
        .setDepth(24)

      this.nextArrow = this.add
        .bitmapText(this.width - 50 * this.scaleFactor, this.height / 2, "pixelfont", "→", 60 * this.scaleFactor)
        .setOrigin(0.5)
        .setTint(0x00ffff)
        .setDepth(25)
        .setInteractive({ cursor: "pointer" })

      arrowBg.setInteractive({ cursor: "pointer" })

      this.tweens.add({
        targets: [this.nextArrow, arrowBg],
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      this.nextArrow.on("pointerdown", () => this.nextPage())
      arrowBg.on("pointerdown", () => this.nextPage())

      // Hover effects
      this.nextArrow.on("pointerover", () => {
        this.nextArrow.setTint(0xffffff)
        arrowBg.setFillStyle(0x00ffff, 0.5)
      })

      this.nextArrow.on("pointerout", () => {
        this.nextArrow.setTint(0x00ffff)
        arrowBg.setFillStyle(0x00ffff, 0.3)
      })

      arrowBg.on("pointerover", () => {
        this.nextArrow.setTint(0xffffff)
        arrowBg.setFillStyle(0x00ffff, 0.5)
      })

      arrowBg.on("pointerout", () => {
        this.nextArrow.setTint(0x00ffff)
        arrowBg.setFillStyle(0x00ffff, 0.3)
      })

      this.navigationElements.push(this.nextArrow, arrowBg)
    }

    if (this.currentPage === 2) {
      const arrowBg = this.add
        .circle(50 * this.scaleFactor, this.height / 2, 30 * this.scaleFactor, 0x00ffff, 0.3)
        .setDepth(24)

      this.prevArrow = this.add
        .bitmapText(50 * this.scaleFactor, this.height / 2, "pixelfont", "←", 60 * this.scaleFactor)
        .setOrigin(0.5)
        .setTint(0x00ffff)
        .setDepth(25)
        .setInteractive({ cursor: "pointer" })

      arrowBg.setInteractive({ cursor: "pointer" })

      this.tweens.add({
        targets: [this.prevArrow, arrowBg],
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      })

      this.prevArrow.on("pointerdown", () => this.prevPage())
      arrowBg.on("pointerdown", () => this.prevPage())

      // Hover effects
      this.prevArrow.on("pointerover", () => {
        this.prevArrow.setTint(0xffffff)
        arrowBg.setFillStyle(0x00ffff, 0.5)
      })

      this.prevArrow.on("pointerout", () => {
        this.prevArrow.setTint(0x00ffff)
        arrowBg.setFillStyle(0x00ffff, 0.3)
      })

      arrowBg.on("pointerover", () => {
        this.prevArrow.setTint(0xffffff)
        arrowBg.setFillStyle(0x00ffff, 0.5)
      })

      arrowBg.on("pointerout", () => {
        this.prevArrow.setTint(0x00ffff)
        arrowBg.setFillStyle(0x00ffff, 0.3)
      })

      this.navigationElements.push(this.prevArrow, arrowBg)
    }
  }

  setupInputHandling() {
    // Improved input handling to avoid conflicts
    this.input.on("pointerdown", (pointer) => {
      const clickX = pointer.x
      const isArrowClick =
        (this.currentPage === 1 && clickX > this.width - 100 * this.scaleFactor) ||
        (this.currentPage === 2 && clickX < 100 * this.scaleFactor)

      if (!isArrowClick) {
        if (this.currentPage === 2) {
          this.startGame()
        } else {
          this.nextPage()
        }
      }
    })

    // Keyboard navigation
    this.input.keyboard.on("keydown-SPACE", () => {
      if (this.currentPage === 1) {
        this.nextPage()
      } else {
        this.startGame()
      }
    })

    this.input.keyboard.on("keydown-ENTER", () => {
      this.startGame()
    })

    this.input.keyboard.on("keydown-RIGHT", () => {
      if (this.currentPage === 1) this.nextPage()
    })

    this.input.keyboard.on("keydown-LEFT", () => {
      if (this.currentPage === 2) this.prevPage()
    })
  }

  nextPage() {
    if (this.currentPage >= this.totalPages) return

    this.currentPage++
    this.updatePageIndicators()

    // Slide animation
    this.tweens.add({
      targets: this.page1,
      x: -this.width,
      duration: this.animationSpeed,
      ease: "Power2.easeInOut",
    })

    this.page2.setVisible(true)
    this.page2.setActive(true)
    this.page2.x = this.width
    this.tweens.add({
      targets: this.page2,
      x: 0,
      duration: this.animationSpeed,
      ease: "Power2.easeInOut",
      onComplete: () => {
        this.page1.setVisible(false)
        this.page1.setActive(false)
      },
    })

    this.createNavigation()
  }

  prevPage() {
    if (this.currentPage <= 1) return

    this.currentPage--
    this.updatePageIndicators()

    // Slide animation
    this.tweens.add({
      targets: this.page2,
      x: this.width,
      duration: this.animationSpeed,
      ease: "Power2.easeInOut",
    })

    this.page1.setVisible(true)
    this.page1.setActive(true)
    this.page1.x = -this.width
    this.tweens.add({
      targets: this.page1,
      x: 0,
      duration: this.animationSpeed,
      ease: "Power2.easeInOut",
    })

    this.createNavigation()
  }

  updatePageIndicators() {
    this.pageIndicators.forEach((dot, index) => {
      const isActive = index === this.currentPage - 1
      dot.setFillStyle(isActive ? 0x00ffff : 0x666666)
      dot.setRadius(isActive ? 12 * this.scaleFactor : 8 * this.scaleFactor)
      dot.setAlpha(isActive ? 1 : 0.6)

      if (isActive) {
        this.tweens.add({
          targets: dot,
          scaleX: 1.2,
          scaleY: 1.2,
          duration: 200,
          yoyo: true,
          ease: "Back.easeOut",
        })
      }
    })
  }

  startGame() {
    this.cameras.main.fadeOut(500, 0, 0, 0)

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("GameScene")
    })
  }
}

// Enhanced Game Scene with improved mechanics and UI
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" })
    this.score = 0

    // Game state variables
    this.maxEnemiesThisLevel = 5
    this.currentEnemyCount = 0
    this.enemiesSpawnedThisLevel = 0
    this.gameState = "playing"

    // Health system (replacing lives)
    this.maxHealth = 100
    this.currentHealth = 100
    this.canTakeDamage = true

    // Time slowdown system
    this.isSlowTime = false
    this.slowTimeCooldown = false
    this.slowTimeDuration = 2000
    this.slowTimeCooldownTime = 5000

    // Speed boost system
    this.isSpeedBoost = false
    this.normalPlayerSpeed = 300
    this.boostedPlayerSpeed = 500
    this.currentPlayerSpeed = this.normalPlayerSpeed

    // Ammo system
    this.maxAmmo = 15
    this.currentAmmo = 15

    // Fire bullets system
    this.fireBulletActive = false
    this.fireBulletShotsLeft = 0
  }

  preload() {
    for (const key in _CONFIG.imageLoader) {
      this.load.image(key, _CONFIG.imageLoader[key])
    }

    for (const key in _CONFIG.soundsLoader) {
      this.load.audio(key, [_CONFIG.soundsLoader[key]])
    }

    for (const key in _CONFIG.libLoader) {
      this.load.image(key, _CONFIG.libLoader[key])
    }

    const fontName = "pix"
    const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/"
    this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml")

    if (joystickEnabled) this.load.plugin("rexvirtualjoystickplugin", rexJoystickUrl, true)
    if (buttonEnabled) this.load.plugin("rexbuttonplugin", rexButtonUrl, true)

    displayProgressLoader.call(this)
  }

  calculateScaleFactor() {
    const baseWidth = 720
    const baseHeight = 1280
    const widthFactor = this.width / baseWidth
    const heightFactor = this.height / baseHeight
    return Math.min(widthFactor, heightFactor) * 1.2
  }

  create() {
    this.scale.on("resize", this.resize, this)
    this.isLandscape = window.innerWidth > window.innerHeight

    // Reset game state
    gameScore = 0
    gameLevel = 1
    levelThreshold = 50
    this.currentHealth = this.maxHealth
    this.gameState = "playing"
    this.maxEnemiesThisLevel = 5
    this.currentEnemyCount = 0
    this.enemiesSpawnedThisLevel = 0
    this.currentAmmo = this.maxAmmo

    this.width = this.game.config.width
    this.height = this.game.config.height
    this.scaleFactor = this.calculateScaleFactor()

    // Initialize sounds
    this.sounds = {}
    for (const key in _CONFIG.soundsLoader) {
      this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.6 })
    }

    // Background
    this.bg = this.add.image(this.width / 2, this.height / 2, "background").setOrigin(0.5)
    const bgScale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight)
    this.bg.setScale(bgScale)

    // Input listeners
    this.input.keyboard.on("keydown-ESC", () => this.togglePause())
    this.shiftKey = this.input.keyboard.addKey("SHIFT")

    // Create UI
    this.createUI()

    // Create player (cannon)
    const playerScale = 0.7 * this.scaleFactor
    this.player = this.physics.add
      .sprite(this.width / 2, this.height - 80 * this.scaleFactor, "player")
      .setScale(playerScale)
      .setOrigin(0.5, 0.5)
      .setDepth(10)

    this.player.setImmovable(true)
    this.player.body.allowGravity = false

    // Create groups
    this.bullets = this.physics.add.group()
    this.enemies = this.physics.add.group()
    this.powerUps = this.physics.add.group()

    this.cursors = this.input.keyboard.createCursorKeys()

    // Setup collisions
    this.setupCollisions()

    // Spawn timers
    spawnTimer = this.time.addEvent({
      delay: 2000,
      callback: () => this.spawnEnemyIfAllowed(),
      loop: true,
    })

    this.powerUpTimer = this.time.addEvent({
      delay: 15000,
      callback: () => this.spawnSpeedPowerUp(),
      loop: true,
    })

    // Ammo box spawn timer
    this.time.addEvent({
      delay: 10000,
      callback: this.spawnAmmoBox,
      callbackScope: this,
      loop: true,
    })

    // Fire bullet powerup spawn timer
    this.time.addEvent({
      delay: 20000,
      callback: this.spawnFireBulletPowerup,
      callbackScope: this,
      loop: true,
    })

    // Health regeneration
    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        if (this.currentHealth < this.maxHealth) {
          this.currentHealth += 3
          this.updateHealthBar()
        }
      },
    })

    this.input.keyboard.disableGlobalCapture()

    // Mouse controls
    this.input.on("pointermove", (pointer) => {
      if (this.gameState === "playing") {
        this.rotateCannonToPointer(pointer)
      }
    })

    this.input.on("pointerdown", (pointer) => {
      if (this.gameState === "playing") {
        this.rotateCannonToPointer(pointer)
      }
    })

    this.input.on("pointerup", () => {
      canFireBullet = true
    })
  }

    createUI() {
      // Enhanced UI with better visual feedback

      // Pause button
      this.pauseButton = this.add
        .sprite(this.width - 60 * this.scaleFactor, 60 * this.scaleFactor, "pauseButton")
        .setOrigin(0.5, 0.5)
        .setDepth(15)
        .setScale(3 * this.scaleFactor)
        .setInteractive({ cursor: "pointer" })

      this.pauseButton.on("pointerdown", () => this.togglePause())
    
      // Enhanced health bar with better visuals
      this.createHealthBar()

      // Score display with background
      this.createScoreDisplay()

      // Ammo display
      this.createAmmoDisplay()

      // Level display
      this.createLevelDisplay()

      // Status displays
      this.createStatusDisplays()

      // Create joystick and fire button
      this.createControls()
    }

  createHealthBar() {
    // Health bar background
    this.healthBarBg = this.add
      .rectangle(this.width / 2 - 100, 30, 200, 25, 0x333333, 0.8)
      .setOrigin(0, 0.5)
      .setDepth(15)

    // Health bar border
    this.healthBarBorder = this.add
      .rectangle(this.width / 2 - 100, 30, 200, 25, 0xffffff, 0)
      .setStrokeStyle(2, 0xffffff, 0.8)
      .setOrigin(0, 0.5)
      .setDepth(15)

    // Health bar fill
    this.healthBarFill = this.add
      .rectangle(this.width / 2 - 100, 30, 200, 25, 0x00ff00)
      .setOrigin(0, 0.5)
      .setDepth(15)

    // Health text
    this.healthText = this.add
      .bitmapText(this.width / 2, 30, "pixelfont", "HEALTH", 24 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(15)
      .setTint(0xffffff)
  }

  createScoreDisplay() {
    // Score background
    this.scoreBg = this.add
      .rectangle(this.width / 2, 80 * this.scaleFactor, 300 * this.scaleFactor, 50 * this.scaleFactor, 0x000000, 0.7)
      .setDepth(14)

    // Score border
    this.scoreBorder = this.add
      .rectangle(this.width / 2, 80 * this.scaleFactor, 300 * this.scaleFactor, 50 * this.scaleFactor, 0x00ffff, 0)
      .setStrokeStyle(2, 0x00ffff, 0.8)
      .setDepth(14)

    // Score text
    this.scoreText = this.add
      .bitmapText(this.width / 2, 80 * this.scaleFactor, "pixelfont", `Score: ${gameScore}`, 36 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(15)
      .setTint(0x00ffff)
  }

  createAmmoDisplay() {
    this.ammoText = this.add
      .bitmapText(
        this.width - 20 * this.scaleFactor,
        30 * this.scaleFactor,
        "pixelfont",
        `Ammo: ${this.currentAmmo}`,
        28 * this.scaleFactor,
      )
      .setOrigin(1, 0.5)
      .setDepth(15)
      .setTint(0xffff00)

    // No ammo warning
    this.noAmmoText = this.add
      .bitmapText(this.width / 2, this.height / 2, "pixelfont", "NO AMMO!", 64 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(20)
      .setVisible(false)
      .setTint(0xff0000)
  }

  createLevelDisplay() {
    this.levelText = this.add
      .bitmapText(
        20 * this.scaleFactor,
        30 * this.scaleFactor,
        "pixelfont",
        `Level: ${gameLevel}`,
        28 * this.scaleFactor,
      )
      .setOrigin(0, 0.5)
      .setDepth(15)
      .setTint(0x00ff00)
  }

  createStatusDisplays() {
    // Time slowdown status
    this.slowTimeText = this.add
      .bitmapText(
        this.width - 20 * this.scaleFactor,
        120 * this.scaleFactor,
        "pixelfont",
        "SHIFT: Ready",
        24 * this.scaleFactor,
      )
      .setOrigin(1, 0.5)
      .setDepth(15)

    // Speed boost indicator
    this.speedBoostText = this.add
      .bitmapText(this.width / 2, 150 * this.scaleFactor, "pixelfont", "", 32 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(15)
      .setTint(0x00ff00)

    // Fire bullet status
    this.fireBulletText = this.add
      .bitmapText(this.width / 2, 120 * this.scaleFactor, "pixelfont", "", 28 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(15)
      .setTint(0xff0000)
  }

  createControls() {
    // Joystick
    const joyStickRadius = 50 * this.scaleFactor
    if (joystickEnabled) {
      const joyX = this.isLandscape ? joyStickRadius * 2.5 : joyStickRadius * 2
      const joyY = this.isLandscape ? this.height - joyStickRadius * 2 : this.height - joyStickRadius * 4

      this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
        x: joyX,
        y: joyY,
        radius: joyStickRadius,
        base: this.add.circle(0, 0, 80 * this.scaleFactor, 0x888888, 0.5).setDepth(12),
        thumb: this.add.circle(0, 0, 40 * this.scaleFactor, 0xcccccc, 0.5).setDepth(12),
      })
      this.joystickKeys = this.joyStick.createCursorKeys()
    }

    // Fire button
    if (buttonEnabled) {
      const buttonSize = 80 * this.scaleFactor
      const buttonX = this.isLandscape ? this.width - 150 * this.scaleFactor : this.width - 80 * this.scaleFactor
      const buttonY = this.isLandscape ? this.height - 100 * this.scaleFactor : this.height - 200 * this.scaleFactor

      this.buttonA = this.add.rectangle(buttonX, buttonY, buttonSize, buttonSize, 0xcccccc, 0.5).setDepth(12)

      const fontSize = Math.max(16 * this.scaleFactor, 12)
      this.buttonAText = this.add
        .text(buttonX, buttonY, "FIRE", {
          font: `${fontSize}px Arial`,
          fill: "#000000",
        })
        .setOrigin(0.5, 0.5)
        .setDepth(12)

      this.buttonA.button = this.plugins.get("rexbuttonplugin").add(this.buttonA, {
        mode: 1,
        clickInterval: 300,
      })

      this.buttonA.button.on(
        "down",
        () => {
          if (this.gameState === "playing") {
            this.fireBullet()
          }
        },
        this,
      )
    }
  }

  setupCollisions() {
    // Player-enemy collision (damage health)
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (this.sounds.hit) {
        this.sounds.hit.setVolume(0.4).play()
      }

      if (this.canTakeDamage) {
        this.currentHealth -= 10
        this.updateHealthBar()
        this.createDamageEffect()

        this.canTakeDamage = false
        this.time.delayedCall(1000, () => {
          this.canTakeDamage = true
        })
      }
    })

    // Bullet-enemy collision
    this.physics.add.collider(this.bullets, this.enemies, (bullet, enemy) => {
      if (!enemy || !bullet || !enemy.body || !bullet.body) return

      this.sounds.blast.setVolume(0.12).setLoop(false).play()
      this.createHitEffect(enemy.x, enemy.y)
      bullet.disableBody(true, true)

      if (enemy.isBoss) {
        const damage = bullet.texture.key === "firebullet" ? 3 : 1
        enemy.health -= damage

        if (enemy.body.velocity.x === 0) {
          const dir = Phaser.Math.Between(0, 1) === 0 ? -1 : 1
          enemy.setVelocityX(dir * 150)
        }

        if (enemy.health <= 0) {
          enemy.disableBody(true, true)
          this.currentEnemyCount--
          if (this.bossFireTimer) this.bossFireTimer.remove()
          this.showWinScreen()
        }
      } else if (enemy.enemyType === "enemy_1") {
        const damage = bullet.texture.key === "firebullet" ? 3 : 1
        enemy.health -= damage
        if (enemy.health <= 0) {
          enemy.disableBody(true, true)
          this.currentEnemyCount--
          this.increaseScore(20)
        } else {
          this.updateEnemyHealthOutline(enemy)
        }
      } else if (gameLevel >= 3 && enemy.canSplit) {
        for (let i = 0; i < 2; i++) {
          const splitEnemy = this.enemies.create(enemy.x, enemy.y, "enemy").setScale(0.2)
          splitEnemy.setBounce(0.9)
          splitEnemy.setGravityY(300)
          splitEnemy.setCollideWorldBounds(true)

          const dir = Phaser.Math.Between(0, 1) === 0 ? -1 : 1
          splitEnemy.setVelocityX(dir * 100)
          splitEnemy.setVelocityY(0)
          splitEnemy.canSplit = false

          this.currentEnemyCount++
        }

        enemy.disableBody(true, true)
        this.currentEnemyCount--
        this.increaseScore(10)
      } else {
        enemy.disableBody(true, true)
        this.currentEnemyCount--
        this.increaseScore(10)
      }

      this.checkLevelComplete()
    })

    // Player-powerup collision
    this.physics.add.overlap(this.player, this.powerUps, (player, powerUp) => {
      this.activateSpeedBoost()
      powerUp.destroy()
    })

    // Boss bullets collision with player
    if (this.bossBullets) {
      this.physics.add.overlap(this.player, this.bossBullets, (player, bullet) => {
        if (this.canTakeDamage) {
          this.currentHealth -= 15
          this.updateHealthBar()
          this.createDamageEffect()
          bullet.destroy()

          this.canTakeDamage = false
          this.time.delayedCall(1000, () => {
            this.canTakeDamage = true
          })
        }
      })
    }
  }

  createHitEffect(x, y) {
    // Create explosion effect
    const explosion = this.add.circle(x, y, 5, 0xffff00, 0.8).setDepth(20)

    this.tweens.add({
      targets: explosion,
      radius: 30,
      alpha: 0,
      duration: 200,
      onComplete: () => explosion.destroy(),
    })

    // Create particles
    for (let i = 0; i < 5; i++) {
      const particle = this.add
        .circle(x + Phaser.Math.Between(-10, 10), y + Phaser.Math.Between(-10, 10), 3, 0xff6600, 0.8)
        .setDepth(19)

      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-50, 50),
        y: particle.y + Phaser.Math.Between(-50, 50),
        alpha: 0,
        duration: 300,
        onComplete: () => particle.destroy(),
      })
    }
  }

  createDamageEffect() {
    // Screen flash effect
    this.cameras.main.flash(200, 255, 0, 0, false)

    // Screen shake
    this.cameras.main.shake(300, 0.02)
  }

  updateHealthBar() {
    this.currentHealth = Phaser.Math.Clamp(this.currentHealth, 0, this.maxHealth)
    const percentage = this.currentHealth / this.maxHealth

    // Update bar width
    this.healthBarFill.width = 200 * percentage

    // Change color based on health
    if (percentage > 0.6) {
      this.healthBarFill.setFillStyle(0x00ff00) // green
    } else if (percentage > 0.3) {
      this.healthBarFill.setFillStyle(0xffff00) // yellow
    } else {
      this.healthBarFill.setFillStyle(0xff0000) // red
    }

    // Game over if health reaches 0
    if (this.currentHealth <= 0) {
      this.gameOver()
    }
  }

  spawnEnemyIfAllowed() {
    if (this.gameState !== "playing") return

    if (this.enemiesSpawnedThisLevel >= this.maxEnemiesThisLevel) {
      return
    }

    const spawnX = Phaser.Math.Between(100, this.width - 100)
    const spawnY = 50 * this.scaleFactor

    let enemyType = "enemy"
    let enemyHealth = gameLevel

    if (gameLevel >= 3 && (gameLevel === 3 || gameLevel >= 5)) {
      if (Math.random() < 0.3) {
        enemyType = "enemy_1"
        enemyHealth = 5
      }
    }

    const enemy = this.enemies
      .create(spawnX, spawnY, enemyType)
      .setScale(0.6 * this.scaleFactor)
      .setDepth(3)

    enemy.setBounce(0.7)
    enemy.setGravityY(200)
    enemy.setCollideWorldBounds(true)

    const direction = Phaser.Math.Between(0, 1) === 0 ? -1 : 1
    const speed = Phaser.Math.Between(25, 75)
    enemy.setVelocityX(direction * speed)

    enemy.level = gameLevel
    enemy.enemyType = enemyType
    enemy.health = enemyHealth
    enemy.maxHealth = enemyHealth
    enemy.canSplit = true

    if (enemyType === "enemy_1") {
      this.createEnemyHealthOutline(enemy)
    }

    this.currentEnemyCount++
    this.enemiesSpawnedThisLevel++
  }

  createEnemyHealthOutline(enemy) {
    const graphics = this.add.graphics()
    graphics.setDepth(4)
    enemy.healthOutline = graphics
    this.updateEnemyHealthOutline(enemy)
  }

  updateEnemyHealthOutline(enemy) {
    if (!enemy.healthOutline) return

    enemy.healthOutline.clear()

    const healthPercent = enemy.health / enemy.maxHealth
    const thickness = 3

    let color = 0x00ff00
    if (healthPercent < 0.7) color = 0xffff00
    if (healthPercent < 0.3) color = 0xff0000

    enemy.healthOutline.lineStyle(thickness, color)
    enemy.healthOutline.strokeRect(
      enemy.x - enemy.displayWidth / 2,
      enemy.y - enemy.displayHeight / 2,
      enemy.displayWidth,
      enemy.displayHeight,
    )
  }

  spawnSpeedPowerUp() {
    if (this.gameState !== "playing") return

    if (Math.random() < 0.5) {
      const spawnX = Phaser.Math.Between(100, this.width - 100)
      const spawnY = 100 * this.scaleFactor

      const powerUp = this.powerUps
        .create(spawnX, spawnY, "projectile")
        .setScale(0.8 * this.scaleFactor)
        .setDepth(4)
        .setTint(0x00ff00)

      powerUp.setGravityY(150)
      powerUp.setBounce(0.8)
      powerUp.setCollideWorldBounds(true)

      this.tweens.add({
        targets: powerUp,
        scaleX: 1.2 * this.scaleFactor,
        scaleY: 1.2 * this.scaleFactor,
        duration: 500,
        yoyo: true,
        repeat: -1,
      })

      this.time.delayedCall(10000, () => {
        if (powerUp && powerUp.active) {
          powerUp.destroy()
        }
      })
    }
  }

  activateSpeedBoost() {
    if (this.isSpeedBoost) return

    this.isSpeedBoost = true
    this.currentPlayerSpeed = this.boostedPlayerSpeed
    this.speedBoostText.setText("SPEED BOOST!")

    this.sounds.upgrade.setVolume(0.3).setLoop(false).play()

    this.time.delayedCall(4000, () => {
      this.isSpeedBoost = false
      this.currentPlayerSpeed = this.normalPlayerSpeed
      this.speedBoostText.setText("")
    })
  }

  spawnAmmoBox() {
    if (this.gameState !== "playing") return

    const x = Phaser.Math.Between(50, this.width - 50)
    const ammoBox = this.physics.add.sprite(x, -50, "ammobox").setScale(0.4)

    ammoBox.setVelocityY(150)
    ammoBox.setCollideWorldBounds(false)

    this.physics.add.overlap(this.player, ammoBox, () => {
      if (!ammoBox.active) return

      ammoBox.disableBody(true, true)

      if (this.sounds.pickup) {
        this.sounds.pickup.play()
      }

      this.currentAmmo = this.maxAmmo
      this.updateAmmoText()
      this.noAmmoText.setVisible(false)

      this.showPickupText("Ammo Refilled!", 0x00ff00)
    })

    // Auto-destroy if it falls off screen
    this.time.delayedCall(5000, () => {
      if (ammoBox && ammoBox.active) {
        ammoBox.destroy()
      }
    })
  }

  spawnFireBulletPowerup() {
    if (this.gameState !== "playing") return

    const x = Phaser.Math.Between(50, this.width - 50)
    const fireBulletBox = this.physics.add.sprite(x, -50, "firebullet").setScale(0.4)

    fireBulletBox.setVelocityY(150)

    this.physics.add.overlap(this.player, fireBulletBox, () => {
      if (!fireBulletBox.active) return

      fireBulletBox.disableBody(true, true)

      this.fireBulletActive = true
      this.fireBulletShotsLeft = 7

      this.updateFireBulletDisplay()
      this.showPickupText("FIRE CANNON ACTIVE!", 0xff0000)

      if (this.sounds.pickup) {
        this.sounds.pickup.play()
      }
    })

    // Auto-destroy if it falls off screen
    this.time.delayedCall(5000, () => {
      if (fireBulletBox && fireBulletBox.active) {
        fireBulletBox.destroy()
      }
    })
  }

  showPickupText(text, color) {
    const pickupText = this.add
      .bitmapText(this.player.x, this.player.y - 50, "pixelfont", text, 32 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(color)
      .setDepth(20)

    this.tweens.add({
      targets: pickupText,
      y: pickupText.y - 50,
      alpha: 0,
      duration: 1500,
      onComplete: () => pickupText.destroy(),
    })
  }

  updateFireBulletDisplay() {
    if (this.fireBulletActive) {
      this.fireBulletText.setText(`Fire Shots: ${this.fireBulletShotsLeft}`)
    } else {
      this.fireBulletText.setText("")
    }
  }

  updateAmmoText() {
    this.ammoText.setText(`Ammo: ${this.currentAmmo}`)
  }

  fireBullet() {
    if (this.currentAmmo <= 0) {
      this.noAmmoText.setVisible(true)

      // Hide the warning after 2 seconds
      this.time.delayedCall(2000, () => {
        this.noAmmoText.setVisible(false)
      })
      return
    }

    this.sounds.shoot.setVolume(0.1).setLoop(false).play()

    const bulletTexture = this.fireBulletActive ? "firebullet" : "projectile"

    const bullet = this.bullets
      .create(this.player.x, this.player.y, bulletTexture)
      .setScale(0.5 * this.scaleFactor)
      .setDepth(5)

    const angle = this.player.rotation - Math.PI / 2
    const bulletSpeed = 1000

    bullet.setVelocityX(Math.cos(angle) * bulletSpeed)
    bullet.setVelocityY(Math.sin(angle) * bulletSpeed)

    this.currentAmmo--
    this.updateAmmoText()

    if (this.fireBulletActive) {
      this.fireBulletShotsLeft--
      this.updateFireBulletDisplay()

      if (this.fireBulletShotsLeft <= 0) {
        this.fireBulletActive = false
        this.updateFireBulletDisplay()
      }
    }

    // Auto-destroy bullet after 10 seconds
    this.time.delayedCall(10000, () => {
      if (bullet && bullet.destroy) bullet.destroy()
    })
  }

  handleTimeSlowdown() {
    if (this.slowTimeCooldown || this.isSlowTime) return

    this.isSlowTime = true
    this.slowTimeCooldown = true

    this.physics.world.timeScale = 0.5
    this.slowTimeText.setText("SLOW TIME!").setTint(0x00ffff)

    this.time.delayedCall(this.slowTimeDuration, () => {
      this.physics.world.timeScale = 1
      this.isSlowTime = false
      this.slowTimeText.setText("Cooldown...").setTint(0xff0000)
    })

    this.time.delayedCall(this.slowTimeCooldownTime, () => {
      this.slowTimeCooldown = false
      this.slowTimeText.setText("SHIFT: Ready").setTint(0xffffff)
    })
  }

  rotateCannonToPointer(pointer) {
    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y)
    this.player.setRotation(angle + Math.PI / 2)
  }

  update() {
    if (this.gameState !== "playing") return

    // Time slowdown activation
    if (Phaser.Input.Keyboard.JustDown(this.shiftKey)) {
      this.handleTimeSlowdown()
    }

    // Player movement
    const moveSpeed = this.currentPlayerSpeed * (1 / 60)

    if (this.cursors.left.isDown) {
      this.player.x -= moveSpeed
      this.player.x = Math.max(50, this.player.x)
    } else if (this.cursors.right.isDown) {
      this.player.x += moveSpeed
      this.player.x = Math.min(this.width - 50, this.player.x)
    }
    // Joystick controls
    else if (joystickEnabled && this.joyStick) {
      if (this.joyStick.force > 10) {
        const angle = this.joyStick.angle
        if (!((angle > 45 && angle < 135) || (angle > 225 && angle < 315))) {
          const force = Math.min(this.joyStick.force, 50) / 50
          const radians = Phaser.Math.DegToRad(angle)
          const velocityX = Math.cos(radians) * moveSpeed * force

          this.player.x += velocityX
          this.player.x = Math.max(50, Math.min(this.width - 50, this.player.x))
        }
      }
    }

    // Firing
    if (this.input.activePointer.isDown && canFireBullet) {
      this.fireBullet()
      canFireBullet = false
    }

    // Update enemy health outlines
    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.enemyType === "enemy_1" && enemy.healthOutline) {
        enemy.healthOutline.x = enemy.x
        enemy.healthOutline.y = enemy.y
      }
    })

    // Clean up and update game state
    this.cleanupGameObjects()
    this.updateGameLevel()

    // Boss movement logic
    if (this.boss && this.boss.body) {
      if (this.boss.body.blocked.left) {
        this.boss.setVelocityX(150)
      }
      if (this.boss.body.blocked.right) {
        this.boss.setVelocityX(-150)
      }
    }
  }

  cleanupGameObjects() {
    // Clean up enemies
    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy || !enemy.body) return

      if (enemy.y > this.height + 100) {
        if (enemy.healthOutline) enemy.healthOutline.destroy()
        enemy.disableBody(true, true)
        this.currentEnemyCount--
        return
      }

      if (enemy.x < -enemy.width || enemy.x > this.width + enemy.width) {
        if (enemy.healthOutline) enemy.healthOutline.destroy()
        enemy.disableBody(true, true)
        this.currentEnemyCount--
        return
      }

      if (enemy.body && enemy.body.velocity && enemy.body.velocity.y < -300) {
        enemy.body.setVelocityY(-300)
      }
    })

    // Clean up bullets
    this.bullets.getChildren().forEach((bullet) => {
      if (bullet.y < -50 || bullet.x < -50 || bullet.x > this.width + 50) {
        bullet.destroy()
      }
    })
  }

  checkLevelComplete() {
    if (this.enemiesSpawnedThisLevel >= this.maxEnemiesThisLevel && this.currentEnemyCount === 0) {
      this.completeLevel()
    }
  }

  updateGameLevel() {
    if (this.gameState === "playing" && gameScore >= levelThreshold && !this.levelJustCompleted) {
      this.levelJustCompleted = true
      this.completeLevel()
    }
  }

  completeLevel() {
    this.cameras.main.shake(400, 0.04)
    this.sounds.upgrade.setVolume(0.5).setLoop(false).play()

    gameLevel++
    levelThreshold += 50

    if (gameLevel <= 5) {
      this.maxEnemiesThisLevel = gameLevel === 1 ? 5 : 10
      this.enemiesSpawnedThisLevel = 0
      this.currentEnemyCount = 0

      let newDelay = baseSpawnDelay - spawnDelayDecrease * (gameLevel - 1)
      newDelay = Math.max(newDelay, 800)
      spawnTimer.delay = newDelay

      this.updateLevelText()
      this.levelJustCompleted = false
    } else if (gameLevel === 6) {
      this.updateLevelText()

      if (spawnTimer) spawnTimer.destroy()

      this.enemies.children.iterate((enemy) => {
        if (enemy && enemy.active) {
          enemy.disableBody(true, true)
        }
      })

      this.centerText = this.add
        .bitmapText(this.width / 2, this.height / 2, "pixelfont", "BOSS INCOMING...", 64 * this.scaleFactor)
        .setOrigin(0.5, 0.5)
        .setDepth(100)
        .setTint(0xff0000)

      // Pulsing effect for boss warning
      this.tweens.add({
        targets: this.centerText,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 500,
        yoyo: true,
        repeat: -1,
      })

      this.time.delayedCall(3000, () => {
        if (this.centerText) this.centerText.destroy()
        this.spawnBoss()
      })
    }
  }

  spawnBoss() {
    console.log("Spawning Boss")

    this.boss = this.enemies.create(this.width / 2, 150, "boss").setScale(0.4)

    this.boss.setGravityY(0)
    this.boss.setBounce(0)
    this.boss.setCollideWorldBounds(true)
    this.boss.setVelocityX(150)

    this.boss.health = 20
    this.boss.maxHealth = 20
    this.boss.isBoss = true

    // Create boss health bar
    this.createBossHealthBar()

    this.bossBullets = this.physics.add.group()

    this.bossFireTimer = this.time.addEvent({
      delay: 1000,
      callback: () => this.fireBossBullet(this.boss),
      callbackScope: this,
      loop: true,
    })

    this.currentEnemyCount = 1

    // Boss entrance effect
    this.cameras.main.shake(200, 0.02)

    // Boss warning text
    const bossText = this.add
      .bitmapText(this.width / 2, this.height / 2 + 100, "pixelfont", "FINAL BOSS!", 48 * this.scaleFactor)
      .setOrigin(0.5)
      .setTint(0xff0000)
      .setDepth(100)

    this.tweens.add({
      targets: bossText,
      alpha: 0,
      y: bossText.y - 50,
      duration: 2000,
      onComplete: () => bossText.destroy(),
    })
  }

  createBossHealthBar() {
    // Boss health bar background
    this.bossHealthBg = this.add
      .rectangle(this.width / 2, 100, 300, 20, 0x333333, 0.8)
      .setOrigin(0.5)
      .setDepth(15)

    // Boss health bar fill
    this.bossHealthFill = this.add
      .rectangle(this.width / 2, 100, 300, 20, 0xff0000)
      .setOrigin(0.5)
      .setDepth(15)

    // Boss health bar border
    this.bossHealthBorder = this.add
      .rectangle(this.width / 2, 100, 300, 20, 0xffffff, 0)
      .setStrokeStyle(2, 0xffffff, 0.8)
      .setOrigin(0.5)
      .setDepth(15)

    // Boss label
    this.bossLabel = this.add
      .bitmapText(this.width / 2, 80, "pixelfont", "BOSS", 24 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(15)
      .setTint(0xff0000)
  }

  updateBossHealthBar() {
    if (!this.boss || !this.bossHealthFill) return

    const percentage = this.boss.health / this.boss.maxHealth
    this.bossHealthFill.width = 300 * percentage

    // Change color based on health
    if (percentage > 0.6) {
      this.bossHealthFill.setFillStyle(0xff0000)
    } else if (percentage > 0.3) {
      this.bossHealthFill.setFillStyle(0xff6600)
    } else {
      this.bossHealthFill.setFillStyle(0xff0000)
    }
  }

  fireBossBullet(boss) {
    if (!boss.active) return

    const bullet = this.bossBullets
      .create(boss.x, boss.y + boss.displayHeight / 2, "projectile")
      .setScale(0.3)
      .setTint(0xff0000)

    bullet.setVelocityY(300)

    this.time.delayedCall(5000, () => {
      if (bullet && bullet.destroy) bullet.destroy()
    })
  }

  togglePause() {
    if (this.gameState === "playing") {
      this.gameState = "paused"
      this.physics.pause()
      this.anims.pauseAll()

      if (spawnTimer) spawnTimer.paused = true
      if (this.powerUpTimer) this.powerUpTimer.paused = true

      this.pauseOverlay = this.add
        .rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.7)
        .setDepth(50)

      this.pauseText = this.add
        .bitmapText(
          this.width / 2,
          this.height / 2,
          "pixelfont",
          "PAUSED\nPress ESC or Pause to continue",
          48 * this.scaleFactor,
        )
        .setOrigin(0.5, 0.5)
        .setDepth(51)
        .setTint(0x00ffff)
    } else if (this.gameState === "paused") {
      this.gameState = "playing"
      this.physics.resume()
      this.anims.resumeAll()

      if (spawnTimer) spawnTimer.paused = false
      if (this.powerUpTimer) this.powerUpTimer.paused = false

      if (this.pauseOverlay) this.pauseOverlay.destroy()
      if (this.pauseText) this.pauseText.destroy()
    }
  }

  increaseScore(points) {
    gameScore += points
    this.updateScoreText()
  }

  updateLevelText() {
    this.levelText.setText(`Level: ${gameLevel}`)
    this.levelJustCompleted = false
  }

  updateScoreText() {
    this.scoreText.setText(`Score: ${gameScore}`)
  }

  gameOver() {
    this.gameState = "gameOver"

    this.cameras.main.shake(600, 0.06)

    if (spawnTimer) spawnTimer.destroy()
    if (this.powerUpTimer) this.powerUpTimer.destroy()

    // Game over screen with better styling
    this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.8).setDepth(50)

    this.add
      .bitmapText(this.width / 2, this.height / 2 - 50, "pixelfont", "GAME OVER", 64 * this.scaleFactor)
      .setOrigin(0.5, 0.5)
      .setDepth(51)
      .setTint(0xff0000)

    this.add
      .bitmapText(this.width / 2, this.height / 2 + 20, "pixelfont", `Final Score: ${gameScore}`, 36 * this.scaleFactor)
      .setOrigin(0.5, 0.5)
      .setDepth(51)
      .setTint(0xffffff)

    this.add
      .bitmapText(
        this.width / 2,
        this.height / 2 + 60,
        "pixelfont",
        `Level Reached: ${gameLevel}`,
        36 * this.scaleFactor,
      )
      .setOrigin(0.5, 0.5)
      .setDepth(51)
      .setTint(0xffffff)

    if (typeof initiateGameOver === "function") {
      this.time.delayedCall(2000, () => {
        initiateGameOver.bind(this)({ score: gameScore })
      })
    }
  }

  showWinScreen() {
    this.gameState = "gameOver"

    this.cameras.main.shake(600, 0.06)

    if (spawnTimer) spawnTimer.destroy()
    if (this.powerUpTimer) this.powerUpTimer.destroy()
    if (this.bossFireTimer) this.bossFireTimer.remove()

    // Victory screen
    this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.8).setDepth(50)

    this.add
      .bitmapText(this.width / 2, this.height / 2 - 50, "pixelfont", "VICTORY!", 64 * this.scaleFactor)
      .setOrigin(0.5, 0.5)
      .setDepth(51)
      .setTint(0x00ff00)

    this.add
      .bitmapText(this.width / 2, this.height / 2 + 20, "pixelfont", `Final Score: ${gameScore}`, 36 * this.scaleFactor)
      .setOrigin(0.5, 0.5)
      .setDepth(51)
      .setTint(0xffffff)

    this.add
      .bitmapText(this.width / 2, this.height / 2 + 60, "pixelfont", "You defeated the boss!", 28 * this.scaleFactor)
      .setOrigin(0.5, 0.5)
      .setDepth(51)
      .setTint(0xffff00)
  }

  resize(gameSize) {
    const width = gameSize.width
    const height = gameSize.height

    this.width = width
    this.height = height
    this.isLandscape = width > height
    this.scaleFactor = this.calculateScaleFactor()

    // Resize background
    if (this.bg) {
      this.bg.setPosition(width / 2, height / 2)
      const scale = Math.max(width / this.bg.width, height / this.bg.height)
      this.bg.setScale(scale)
    }

    // Resize UI elements
    if (this.scoreText) {
      const scoreFontSize = Math.max(36 * this.scaleFactor, 24)
      this.scoreText.setPosition(width / 2, 80 * this.scaleFactor)
      this.scoreText.setFontSize(scoreFontSize)
    }

    if (this.levelText) {
      const levelFontSize = Math.max(28 * this.scaleFactor, 18)
      this.levelText.setPosition(20 * this.scaleFactor, 30 * this.scaleFactor)
      this.levelText.setFontSize(levelFontSize)
    }

    if (this.pauseButton) {
      this.pauseButton.setPosition(width - 60 * this.scaleFactor, 60 * this.scaleFactor)
      this.pauseButton.setScale(3 * this.scaleFactor)
    }

    if (this.player) {
      const playerScale = 0.7 * this.scaleFactor
      this.player.setScale(playerScale)
      this.player.setPosition(this.player.x, height - 80 * this.scaleFactor)
    }

    // Resize other UI elements as needed
    if (this.healthBarBg) {
      this.healthBarBg.setPosition(width / 2 - 100, 30)
    }
    if (this.healthBarFill) {
      this.healthBarFill.setPosition(width / 2 - 100, 30)
    }
    if (this.healthBarBorder) {
      this.healthBarBorder.setPosition(width / 2 - 100, 30)
    }
    if (this.healthText) {
      this.healthText.setPosition(width / 2, 30)
    }
  }

  pauseGame() {
    this.togglePause()
  }
}

// Progress loader function
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
    progressBar.fillStyle(0x364afe, 1)
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

// Global game variables
let gameScore = 0
let gameLevel = 1
let levelThreshold = 50
const enemySpeed = 120
const baseSpawnDelay = 2000
const spawnDelayDecrease = 400
let spawnTimer
let enemies
let bg
let canFireBullet = true

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [MenuScene, InstructionsScene, GameScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    orientation: Phaser.Scale.Orientation.AUTO,
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
    name: _CONFIG.title,
    description: _CONFIG.description,
    instructions: _CONFIG.instructions,
  },
  deviceOrientation: null,
}

console.log("Creating Phaser.Game with config:", config)
new Phaser.Game(config)

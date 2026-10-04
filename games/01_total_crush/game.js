// Game Scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" })

    // Game state
    this.score = 0
    this.isGameOver = false
    this.currentLevel = 1
    // Game objects
    this.targets = null
    this.projectiles = null
    this.cannon = null
    this.ground = null
    this.bullet = null

    // Target system
    this.targetsDestroyed = 0
    this.totalTargets = 0

    // Ammo system
    this.ammo = 0
    this.maxAmmo = 0

    // Cannon properties - UPDATED FOR TOTAL CRUSH STYLE
    this.cannonAngle = -22.5 // Start at middle of 0-45 range
    this.cannonPower = 700
    this.minPower = 700
    this.maxPower = 1700
    this.minAngle = 0 // Changed from -85 to 0 degrees
    this.maxAngle = -45 // Changed from -5 to -45 degrees

    // Aiming states
    this.aimingState = "ready"
    this.angleDirection = 1
    this.powerDirection = 1
    this.lockedAngle = null
    this.lockedPower = null

    // Visual elements
    this.aimLine = null
    this.powerBar = null
    this.powerBarBg = null
    this.powerText = null
    this.bulletFollowTimer = null

    // VFX Elements - ENHANCED TRAIL SYSTEM
    this.particles = null
    this.bulletTrailEmitter = null
    this.smokeEmitter = null
    this.sparkEmitter = null
    this.dustEmitter = null
    this.backgroundParticles = null
    this.explosionEmitter = null

    // Game dimensions
    this.gameWidth = 1280
    this.gameHeight = 720

    // Physics settings
    this.gravity = 600

    // UI elements - ENHANCED UI CONTAINERS
    this.ammoText = null
    this.levelText = null
    this.instructionText = null
    this.comboText = null
    this.streakCounter = 0
    this.uiContainer = null
    this.levelAmmoBox = null

    this._CONFIG = _CONFIG // Declare _CONFIG variable
    this.Phaser = Phaser // Declare Phaser variable
  }

  preload() {
    // Load assets using existing config
    for (const key in this._CONFIG.imageLoader) {
      this.load.image(key, this._CONFIG.imageLoader[key])
    }

    for (const key in this._CONFIG.soundsLoader) {
      this.load.audio(key, [this._CONFIG.soundsLoader[key]])
    }

    this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png")

    displayProgressLoader.call(this)
  }

  create() {
    this.game.events.off("blur", this.game.scene.pause)
    this.input.keyboard.enabled = true
    this.input.keyboard.removeAllListeners()
    this.input.keyboard.addCapture(["ESC", "SPACE", "LEFT", "RIGHT", "UP", "DOWN", "ENTER"])

    // REMOVE all existing key listeners that might auto-pause
    this.input.keyboard.removeAllListeners("keydown")
    this.input.keyboard.removeAllListeners("keydown-ESC")

    // Initialize sounds
    this.sounds = {}
    for (const key in this._CONFIG.soundsLoader) {
      this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 })
    }
    if (this.sounds.background) {
      this.sounds.background.setVolume(0.1).setLoop(true).play()
    }

    // Set physics world
    this.physics.world.setBounds(0, 0, this.gameWidth * 2, this.gameHeight)
    this.physics.world.gravity.y = 0

    // Create background
    this.createBackground()

    // Create physics groups
    this.targets = this.physics.add.group({
      collideWorldBounds: false,
      immovable: true,
    })
    this.projectiles = this.physics.add.group()
    this.ground = this.physics.add.staticGroup()

    // Create ENHANCED particle systems
    this.createEnhancedParticleSystems()

    // Create game elements
    this.createGround()
    this.createCannon()
    this.setupCamera()
    this.setupInput()
    this.createCleanUI() // NEW CLEAN UI WITHOUT BOXES
    this.setupCollisions()

    // Add atmospheric effects
    this.createAtmosphericEffects()

    // Start first level
    this.time.delayedCall(500, () => this.startLevel(1))
  }

  createBackground() {
    // Main background
    const bg = this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(this.gameWidth * 2, this.gameHeight)

    // Add subtle gradient overlay
    // const gradient = this.add.graphics()
    // gradient.fillGradientStyle(0x000033, 0x000033, 0x001122, 0x001122, 0.1, 0.3, 0.1, 0.3)
    // gradient.fillRect(0, 0, this.gameWidth * 2, this.gameHeight)

    // Animated clouds
    this.createFloatingClouds()
  }

  createFloatingClouds() {
    for (let i = 0; i < 3; i++) {
      const cloud = this.add.circle(
        Phaser.Math.Between(0, this.gameWidth * 2),
        Phaser.Math.Between(50, 200),
        Phaser.Math.Between(30, 60),
        0xffffff,
        0.1,
      )

      this.tweens.add({
        targets: cloud,
        x: cloud.x + Phaser.Math.Between(100, 300),
        duration: Phaser.Math.Between(15000, 25000),
        repeat: -1,
        yoyo: true,
        ease: "Sine.easeInOut",
      })
    }
  }

  // ENHANCED PARTICLE SYSTEM WITH LARGER TRAILS AND EXPLOSION VFX
  createEnhancedParticleSystems() {
    // Create particle textures programmatically
    this.createParticleTextures()

    // LARGER BULLET TRAIL - Increased size as requested
    this.bulletTrailEmitter = this.add
      .particles(0, 0, "blackTrail", {
        scale: { start: 0.8, end: 0 },
        alpha: { start: 0.9, end: 0 },
        speed: { min: 20, max: 50 },
        lifespan: 1200,
        emitting: false,
        tint: 0x000000,
        quantity: 4,
      })
      .setDepth(15)

    // Enhanced smoke particles for explosions
    this.smokeEmitter = this.add
      .particles(0, 0, "smoke", {
        scale: { start: 1.0, end: 2.5 },
        alpha: { start: 0.8, end: 0 },
        speed: { min: 30, max: 80 },
        lifespan: 3000,
        emitting: false,
        tint: [0x666666, 0x888888, 0x444444],
      })
      .setDepth(20)

    // Enhanced explosion particles
    this.explosionEmitter = this.add
      .particles(0, 0, "explosion", {
        scale: { start: 0.8, end: 0.1 },
        alpha: { start: 1, end: 0 },
        speed: { min: 150, max: 300 },
        lifespan: 800,
        emitting: false,
        tint: [0xff4444, 0xff8800, 0xffaa00, 0xffff00],
      })
      .setDepth(22)

    // Spark particles
    this.sparkEmitter = this.add
      .particles(0, 0, "spark", {
        scale: { start: 0.6, end: 0.1 },
        alpha: { start: 1, end: 0 },
        speed: { min: 100, max: 250 },
        lifespan: 1200,
        emitting: false,
        tint: [0xff0000, 0xffff00, 0xff8800],
      })
      .setDepth(21)

    // Dust particles
    this.dustEmitter = this.add
      .particles(0, 0, "dust", {
        scale: { start: 0.6, end: 1.5 },
        alpha: { start: 1, end: 0 },
        speed: { min: 40, max: 80 },
        lifespan: 4000,
        emitting: false,
        tint: 0xffa07a,
      })
      .setDepth(19)

    // Background ambient particles
    this.backgroundParticles = this.add.particles(this.gameWidth, 0, "ambient", {
      x: { min: 0, max: this.gameWidth * 2 },
      y: { min: 0, max: this.gameHeight },
      scale: { start: 0.02, end: 0.05 },
      alpha: { start: 0.3, end: 0 },
      speed: { min: 5, max: 15 },
      lifespan: 8000,
      frequency: 200,
      tint: [0xffffff, 0xaaffff, 0xffffaa],
    })
  }

  createParticleTextures() {
    // Create BLACK TRAIL texture - Larger size
    const blackTrailGraphics = this.add.graphics()
    blackTrailGraphics.fillStyle(0x000000)
    blackTrailGraphics.fillCircle(10, 10, 10)
    blackTrailGraphics.generateTexture("blackTrail", 20, 20)
    blackTrailGraphics.destroy()

    // Create smoke texture - Larger
    const smokeGraphics = this.add.graphics()
    smokeGraphics.fillStyle(0x666666)
    smokeGraphics.fillCircle(12, 12, 12)
    smokeGraphics.generateTexture("smoke", 24, 24)
    smokeGraphics.destroy()

    // Create explosion texture
    const explosionGraphics = this.add.graphics()
    explosionGraphics.fillStyle(0xff4444)
    explosionGraphics.fillCircle(8, 8, 8)
    explosionGraphics.generateTexture("explosion", 16, 16)
    explosionGraphics.destroy()

    // Create spark texture
    const sparkGraphics = this.add.graphics()
    sparkGraphics.fillStyle(0xffff00)
    sparkGraphics.fillCircle(6, 6, 6)
    sparkGraphics.generateTexture("spark", 12, 12)
    sparkGraphics.destroy()

    // Create dust texture
    const dustGraphics = this.add.graphics()
    dustGraphics.fillStyle(0x8b4513)
    dustGraphics.fillCircle(4, 4, 4)
    dustGraphics.generateTexture("dust", 8, 8)
    dustGraphics.destroy()

    // Create ambient particle texture
    const ambientGraphics = this.add.graphics()
    ambientGraphics.fillStyle(0xffffff)
    ambientGraphics.fillCircle(2, 2, 2)
    ambientGraphics.generateTexture("ambient", 4, 4)
    ambientGraphics.destroy()
  }

  createAtmosphericEffects() {
    // Subtle screen vignette
    const vignette = this.add.graphics()
    vignette.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.3, 0, 0.3, 0)
    vignette.fillRect(0, 0, this.cameras.main.width, 100)
    vignette.fillRect(0, this.cameras.main.height - 100, this.cameras.main.width, 100)
    vignette.setScrollFactor(0)
    vignette.setDepth(1)

    // Animated light rays
    this.createLightRays()
  }

  createLightRays() {
    for (let i = 0; i < 5; i++) {
      const ray = this.add.graphics()
      ray.lineStyle(2, 0xffff88, 0.1)
      ray.lineBetween(
        Phaser.Math.Between(0, this.gameWidth),
        0,
        Phaser.Math.Between(0, this.gameWidth),
        this.gameHeight,
      )
      ray.setDepth(1)

      this.tweens.add({
        targets: ray,
        alpha: { from: 0.1, to: 0.3 },
        duration: Phaser.Math.Between(3000, 5000),
        repeat: -1,
        yoyo: true,
        ease: "Sine.easeInOut",
      })
    }
  }

  createGround() {
    if (this.ground) this.ground.clear(true, true)

    for (let x = 0; x < this.gameWidth * 2; x += 100) {
      const groundPiece = this.ground.create(x, this.gameHeight - 10, null)
      groundPiece.setSize(100, 20)
      groundPiece.setVisible(false)
    }
  }

  createCannon() {
    // Create cannon platform
    this.cannonPlatform = this.add.image(120, this.gameHeight - 80, "platform")
    this.cannonPlatform.setScale(8.0, 0.8)

    // Add platform glow
    const platformGlow = this.add.circle(120, this.gameHeight - 80, 60, 0x00ff88, 0.1)
    platformGlow.setDepth(1)

    // Create cannon with enhanced visuals
    this.cannon = this.add.image(120, this.gameHeight - 120, "player_cannon")
    this.cannon.setScale(1.0)
    this.cannon.setDepth(3)
    this.cannon.setOrigin(0.15, 0.5)

    // Store original cannon position for recoil animation
    this.cannonOriginalX = this.cannon.x
    this.cannonOriginalY = this.cannon.y

    // Add cannon glow effect
    const cannonGlow = this.add.circle(120, this.gameHeight - 120, 40, 0xff6600, 0.2)
    cannonGlow.setDepth(2)

    // Platform collision
    const platformCollider = this.ground.create(120, this.gameHeight - 80, null)
    platformCollider.setSize(120, 30)
    platformCollider.setVisible(false)

    // Create TOTAL CRUSH style aim line
    this.aimLine = this.add.graphics().setDepth(2)

    // Create power bar
    this.createPowerBar()
  }

  createPowerBar() {
    const powerBarX = 120 + 80
    const powerBarY = this.gameHeight - 200

    // Power bar background with glow
    this.powerBarBg = this.add.graphics()
    this.powerBarBg.fillStyle(0x000000, 0.8)
    this.powerBarBg.fillRoundedRect(powerBarX - 5, powerBarY - 10, 130, 20, 10)
    this.powerBarBg.lineStyle(2, 0x00ff88, 0.8)
    this.powerBarBg.strokeRoundedRect(powerBarX - 5, powerBarY - 10, 130, 20, 10)
    this.powerBarBg.setDepth(12)
    this.powerBarBg.setVisible(false)

    // Power bar fill
    this.powerBar = this.add.graphics()
    this.powerBar.setDepth(13)
    this.powerBar.setVisible(false)

    // Power text with Arial font and larger size
    this.powerText = this.add.text(powerBarX + 60, powerBarY - 25, "POWER", {
      fontFamily: "Arial",
      fontSize: "18px",
      fill: "#00ff88",
      fontStyle: "bold",
    })
    this.powerText.setOrigin(0.5, 0.5)
    this.powerText.setDepth(14)
    this.powerText.setVisible(false)

    // Add power bar glow effect
    const powerGlow = this.add.circle(powerBarX + 60, powerBarY, 80, 0x00ff88, 0.05)
    powerGlow.setDepth(11)
    powerGlow.setVisible(false)
    this.powerBarGlow = powerGlow
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, this.gameWidth * 2, this.gameHeight)
    this.cameras.main.setZoom(1)
  }

  setupInput() {
    this.input.on("pointerdown", (pointer) => {
      this.handleAimingClick()
    })

    this.cursors = this.input.keyboard.createCursorKeys()
    this.input.keyboard.on("keydown-ESC", () => this.pauseGame())

    this.input.keyboard.disableGlobalCapture()
    this.input.keyboard.addCapture(["LEFT", "RIGHT", "UP", "DOWN", "SPACE"])
  }

  // NEW: CLEAN UI WITHOUT BOXES - Just text with larger Arial fonts
  createCleanUI() {
    // Mobile responsive font sizes
    const isMobile = this.cameras.main.width < 768
    const baseFontSize = isMobile ? 24 : 32
    const mediumFontSize = isMobile ? 20 : 28
    const smallFontSize = isMobile ? 16 : 24
    const instructionFontSize = isMobile ? 18 : 26

    // Create a UI container that is fixed to the camera
    this.uiContainer = this.add.container(0, 0)
    this.uiContainer.setScrollFactor(0)
    this.uiContainer.setDepth(15) // Ensure UI is on top

    // 1. SCORE - Top center, larger font
    this.scoreText = this.add.text(this.cameras.main.width / 2, 40, "0", {
      fontFamily: "Arial",
      fontSize: `${baseFontSize + 8}px`,
      fill: "#FFD700",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
    })
    this.scoreText.setOrigin(0.5, 0.5)
    this.uiContainer.add(this.scoreText)

    // 2. LEVEL - Top left, larger font
    this.levelText = this.add.text(30, 30, `LEVEL ${this.currentLevel}`, {
      fontFamily: "Arial",
      fontSize: `${mediumFontSize}px`,
      fill: "#00FF88",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 2,
    })
    this.uiContainer.add(this.levelText)

    // 3. AMMO - Below level, larger font
    this.ammoText = this.add.text(30, 70, `AMMO: ${this.ammo}`, {
      fontFamily: "Arial",
      fontSize: `${smallFontSize}px`,
      fill: "#FFAA00",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 2,
    })
    this.uiContainer.add(this.ammoText)

    // 4. TARGETS - Below ammo, larger font
    this.targetsText = this.add.text(30, 110, `TARGETS: ${this.targetsDestroyed}/${this.totalTargets}`, {
      fontFamily: "Arial",
      fontSize: `${smallFontSize}px`,
      fill: "#FFFFFF",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 2,
    })
    this.uiContainer.add(this.targetsText)

    // 5. STREAK - Center below score (when active), larger font
    this.comboText = this.add.text(this.cameras.main.width / 2, 90, "", {
      fontFamily: "Arial",
      fontSize: `${mediumFontSize}px`,
      fill: "#FF4444",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
    })
    this.comboText.setOrigin(0.5, 0.5)
    this.uiContainer.add(this.comboText)
    this.comboText.setVisible(false)

    // 7. INSTRUCTION - Bottom center, larger font
    this.instructionText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height - 40,
      "CLICK TO START AIMING",
      {
        fontFamily: "Arial",
        fontSize: `${instructionFontSize}px`,
        fill: "#00FFFF",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
      },
    )
    this.instructionText.setOrigin(0.5, 0.5)
    this.uiContainer.add(this.instructionText)

    // Animated instruction glow
    this.tweens.add({
      targets: this.instructionText,
      alpha: { from: 0.7, to: 1 },
      duration: 1000,
      repeat: -1,
      yoyo: true,
      ease: "Sine.easeInOut",
    })
  }

  setupCollisions() {
    // Collisions will be set up when bullet is created
  }

  startLevel(level) {
    this.currentLevel = level
    this.targetsDestroyed = 0
    this.streakCounter = 0

    // Disable input during camera tour
    this.input.enabled = false
    this.instructionText.setText("PREPARING LEVEL...")

    // Dynamic target and ammo calculation for infinite levels
    this.totalTargets = Math.min(3 + Math.floor(level / 2), 15) // Start with 3 targets, max 15
    this.ammo = this.totalTargets + Math.max(3 - Math.floor(level / 5), 1) // Ammo decreases slightly with level, but always at least 1 bonus
    this.maxAmmo = this.ammo

    this.updateLevelText()
    this.updateAmmoText()

    this.targets.clear(true, true)
    this.resetAiming() // Reset aiming visuals, but input is still disabled

    this.showEnhancedLevelAnnouncement(level)

    this.time.delayedCall(1500, () => {
      this.createRandomTargets(this.totalTargets, level)
      const bounds = this.calculateTargetsBounds()
      this.panCameraToShowTargets(bounds)
    })
  }

  // New: Calculate the bounding box of all active targets
  calculateTargetsBounds() {
    let minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY

    if (this.targets.getLength() === 0) {
      return null
    }

    this.targets.children.entries.forEach((target) => {
      minX = Math.min(minX, target.x - target.displayWidth / 2)
      maxX = Math.max(maxX, target.x + target.displayWidth / 2)
      minY = Math.min(minY, target.y - target.displayHeight / 2)
      maxY = Math.max(maxY, target.y + target.displayHeight / 2)
    })

    return { minX, maxX, minY, maxY }
  }

  // New: Pan and zoom camera to show all targets
  panCameraToShowTargets(bounds) {
    if (!bounds) {
      this.returnCameraToCannonAndEnableInput()
      return
    }

    const camera = this.cameras.main
    const padding = 100 // Padding around targets
    const targetWidth = bounds.maxX - bounds.minX + padding * 2
    const targetHeight = bounds.maxY - bounds.minY + padding * 2

    const zoomX = camera.width / targetWidth
    const zoomY = camera.height / targetHeight
    const targetZoom = Math.min(zoomX, zoomY, 1.0) // Max zoom 1.0 (no zoom out beyond default)

    const targetCenterX = bounds.minX + (bounds.maxX - bounds.minX) / 2
    const targetCenterY = bounds.minY + (bounds.maxY - bounds.minY) / 2

    camera.pan(targetCenterX, targetCenterY, 1000, "Sine.easeInOut")
    //camera.zoomTo(targetZoom, 1000, "Sine.easeInOut")

    // After showing targets, return to cannon view
    this.time.delayedCall(2500, () => {
      // Wait for pan to complete + a brief display time
      this.returnCameraToCannonAndEnableInput()
    })
  }

  // New: Return camera to cannon and enable input
  returnCameraToCannonAndEnableInput() {
    const camera = this.cameras.main
    camera.pan(0, 0, 1200, "Sine.easeInOut") // Pan back to cannon (scrollX 0)
    camera.zoomTo(1, 1200, "Sine.easeInOut") // Zoom back to default

    this.time.delayedCall(1200, () => {
      // Wait for return pan to complete
      this.input.enabled = true // Re-enable input
      this.instructionText.setText("CLICK TO START AIMING")
    })
  }

  showEnhancedLevelAnnouncement(level) {
    // Screen flash
    const flash = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0xffffff,
      0.3,
    )
    flash.setScrollFactor(0)
    flash.setDepth(30)

    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 200,
      onComplete: () => flash.destroy(),
    })

    // Level announcement with Arial font
    const isMobile = this.cameras.main.width < 768
    const announcement = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `LEVEL ${level}`, {
      fontFamily: "Arial",
      fontSize: isMobile ? "48px" : "64px",
      fill: "#00FF88",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 4,
    })
    announcement.setOrigin(0.5, 0.5)
    announcement.setDepth(31)
    announcement.setAlpha(0)
    announcement.setScrollFactor(0)

    // Announcement animation
    this.tweens.add({
      targets: announcement,
      alpha: 1,
      scaleX: { from: 0.5, to: 1.2 },
      scaleY: { from: 0.5, to: 1.2 },
      duration: 600,
      ease: "Back.easeOut",
      onComplete: () => {
        this.tweens.add({
          targets: announcement,
          alpha: 0,
          scaleX: 0.8,
          scaleY: 0.8,
          duration: 400,
          delay: 800,
          onComplete: () => announcement.destroy(),
        })
      },
    })

    // Particle burst
    this.sparkEmitter.explode(20, this.cameras.main.width / 2, this.cameras.main.height / 2)
  }

  createRandomTargets(count, level) {
    const groundY = this.gameHeight - 80
    const minX = this.gameWidth * 0.6 // Start targets further right
    const maxX = this.gameWidth * 1.9 // Extend targets further right in the world
    const minY = groundY - 250 // Max height for targets
    const maxY = groundY - 80 // Min height for targets (above ground)

    const maxAttempts = 50 // Max attempts to find a non-overlapping position

    for (let i = 0; i < count; i++) {
      let newX, newY, newScale, newRadius
      let foundPosition = false
      let attempts = 0

      while (!foundPosition && attempts < maxAttempts) {
        newX = Phaser.Math.Between(minX, maxX)
        newY = Phaser.Math.Between(minY, maxY)
        newScale = Phaser.Math.FloatBetween(0.25, 0.45)
        // Assuming target image is roughly square, radius is half of display width/height
        newRadius = ((this.textures.get("enemy_target").source[0].width * newScale) / 2) * 0.8 // 0.8 for padding

        if (!this.isOverlapping(newX, newY, newRadius)) {
          foundPosition = true
        }
        attempts++
      }

      if (foundPosition) {
        const target = this.physics.add
          .sprite(newX, newY, "enemy_target")
          .setScale(newScale)
          .setDepth(5)
          .setAlpha(0)
          .setTint(0xff6b35)

        const targetRadius = ((target.width * target.scaleX) / 2) * 0.8
        target.body.setCircle(targetRadius)
        target.body.setOffset((target.width - targetRadius * 2) / 2, (target.height - targetRadius * 2) / 2)
        target.body.setCollideWorldBounds(false)
        target.setImmovable(true)

        const targetGlow = this.add.circle(newX, newY, targetRadius * 1.5, 0xff6b35, 0.2)
        targetGlow.setDepth(4)
        targetGlow.setAlpha(0)
        target.glowEffect = targetGlow

        // Randomly decide if target moves, increasing chance with level
        if (Math.random() < 0.3 + level * 0.02) {
          // Start with 30% chance, increase by 2% per level
          target.moveDirection = Math.random() > 0.5 ? 1 : -1
          target.moveSpeed = Phaser.Math.Between(40, 70) + level * 2 // Speed increases with level
          target.originalY = newY
          target.moveRange = Phaser.Math.Between(40, 80) // Random move range
        }

        this.targets.add(target)

        this.tweens.add({
          targets: [target, targetGlow],
          alpha: 1,
          scaleX: newScale,
          scaleY: newScale,
          duration: 500,
          delay: i * 300,
          ease: "Back.easeOut",
          onStart: () => {
            this.dustEmitter.explode(10, newX, newY)
          },
        })

        this.tweens.add({
          targets: targetGlow,
          alpha: { from: 0.2, to: 0.4 },
          duration: 2000,
          repeat: -1,
          yoyo: true,
          ease: "Sine.easeInOut",
        })
      } else {
        console.warn(`Could not find a non-overlapping position for target ${i + 1} after ${maxAttempts} attempts.`)
      }
    }
  }

  // New: Helper function to check for target overlap
  isOverlapping(x, y, radius) {
    let overlapping = false
    this.targets.children.entries.forEach((existingTarget) => {
      const existingRadius = (existingTarget.width * existingTarget.scaleX) / 2
      const distance = Phaser.Math.Distance.Between(x, y, existingTarget.x, existingTarget.y)
      // Add a small buffer to prevent targets from being too close
      if (distance < radius + existingRadius + 10) {
        // 10 pixels buffer
        overlapping = true
      }
    })
    return overlapping
  }

  updateMovingTargets() {
    this.targets.children.entries.forEach((target) => {
      if (target.moveDirection !== undefined) {
        const moveAmount = target.moveDirection * target.moveSpeed * (1 / 60)
        target.y += moveAmount

        // Update glow position
        if (target.glowEffect) {
          target.glowEffect.y = target.y
        }

        if (target.y <= target.originalY - target.moveRange || target.y >= target.originalY + target.moveRange) {
          target.moveDirection *= -1
        }
      }
    })
  }

  handleAimingClick() {
    if (!this.bullet && this.ammo > 0 && this.input.enabled) {
      // Check if input is enabled
      switch (this.aimingState) {
        case "ready":
          this.startAngleAiming()
          break
        case "angle":
          this.lockAngle()
          break
        case "power":
          this.lockPowerAndFire()
          break
      }
    }
  }

  startAngleAiming() {
    this.aimingState = "angle"
    this.instructionText.setText("CLICK TO LOCK ANGLE")
    this.angleDirection = 1
  }

  lockAngle() {
    this.lockedAngle = this.cannonAngle
    this.aimingState = "power"
    this.instructionText.setText("CLICK TO LOCK POWER")

    this.powerBar.setVisible(true)
    this.powerBarBg.setVisible(true)
    this.powerText.setVisible(true)
    this.powerBarGlow.setVisible(true)
    this.powerDirection = 1
  }

  lockPowerAndFire() {
    this.lockedPower = this.cannonPower
    this.aimingState = "firing"
    this.instructionText.setText("FIRING...")

    this.powerBar.setVisible(false)
    this.powerBarBg.setVisible(false)
    this.powerText.setVisible(false)
    this.powerBarGlow.setVisible(false)

    this.time.delayedCall(200, () => {
      this.fireCannon()
    })
  }

  resetAiming() {
    this.aimingState = "ready"
    this.lockedAngle = null
    this.lockedPower = null

    // Reset cannon angle and power to defaults
    this.cannonAngle = -22.5
    this.cannonPower = 400

    this.powerBar.setVisible(false)
    this.powerBarBg.setVisible(false)
    this.powerText.setVisible(false)
    if (this.powerBarGlow) this.powerBarGlow.setVisible(false)
    this.aimLine.clear()
    // Instruction text is now handled by returnCameraToCannonAndEnableInput
  }

  updateAimingSystem() {
    if (this.aimingState === "angle" && !this.bullet && this.ammo > 0 && this.input.enabled) {
      this.cannonAngle += this.angleDirection * 0.4

      // TOTAL CRUSH STYLE: 0 to -45 degrees only
      if (this.cannonAngle >= this.minAngle) {
        this.cannonAngle = this.minAngle
        this.angleDirection = -1
      } else if (this.cannonAngle <= this.maxAngle) {
        this.cannonAngle = this.maxAngle
        this.angleDirection = 1
      }

      this.drawTotalCrushAimLine()
    }

    if (this.aimingState === "power" && this.input.enabled) {
      // INCREASED SPEED: Changed from 4 to 8 for faster power selection
      this.cannonPower += this.powerDirection * 8

      if (this.cannonPower >= this.maxPower) {
        this.cannonPower = this.maxPower
        this.powerDirection = -1
      } else if (this.cannonPower <= this.minPower) {
        this.cannonPower = this.minPower
        this.powerDirection = 1
      }

      this.updateEnhancedPowerBar()
      this.drawTotalCrushAimLine()
    }
  }

  // TOTAL CRUSH STYLE AIM LINE - Solid line like Total Crush
  drawTotalCrushAimLine() {
    this.aimLine.clear()

    const angleRad = Phaser.Math.DegToRad(this.cannonAngle)
    const length = Phaser.Math.Linear(150, 300, (this.cannonPower - this.minPower) / (this.maxPower - this.minPower))

    const cannonLength = 120
    const startX = this.cannon.x + Math.cos(angleRad) * cannonLength
    const startY = this.cannon.y + Math.sin(angleRad) * cannonLength
    const endX = startX + Math.cos(angleRad) * length
    const endY = startY + Math.sin(angleRad) * length

    // Total Crush style - solid line with glow
    this.aimLine.lineStyle(8, 0x00ffff, 0.3) // Outer glow
    this.aimLine.beginPath()
    this.aimLine.moveTo(startX, startY)
    this.aimLine.lineTo(endX, endY)
    this.aimLine.strokePath()

    this.aimLine.lineStyle(4, 0xffffff, 0.9) // Inner solid line
    this.aimLine.beginPath()
    this.aimLine.moveTo(startX, startY)
    this.aimLine.lineTo(endX, endY)
    this.aimLine.strokePath()

    // Add aim point indicator
    this.aimLine.fillStyle(0xff0000, 0.8)
    this.aimLine.fillCircle(endX, endY, 6)
  }

  updateEnhancedPowerBar() {
    const powerPercent = (this.cannonPower - this.minPower) / (this.maxPower - this.minPower)

    this.powerBar.clear()

    // Dynamic color based on power
    let color = 0x00ff88
    if (powerPercent > 0.7) color = 0xff4444
    else if (powerPercent > 0.4) color = 0xffaa00

    // Gradient power bar
    this.powerBar.fillGradientStyle(
      color,
      color,
      Phaser.Display.Color.GetColor32(
        Phaser.Display.Color.Interpolate.ColorWithColor(
          Phaser.Display.Color.ValueToColor(color),
          Phaser.Display.Color.ValueToColor(0xffffff),
          100,
          20,
        ),
      ),
      color,
      1,
      1,
      1,
      1,
    )

    this.powerBar.fillRoundedRect(120 + 80 - 2, this.gameHeight - 205, 116 * powerPercent, 10, 5)

    // Update power text color
    this.powerText.setStyle({ fill: `#${color.toString(16).padStart(6, "0")}` })
  }

  fireCannon() {
    if (this.ammo <= 0 || this.bullet) return

    this.ammo--
    this.updateAmmoText()

    const fireAngle = this.lockedAngle || this.cannonAngle
    const firePower = this.lockedPower || this.cannonPower

    const cannonLength = 120
    const startX = this.cannon.x + Math.cos(Phaser.Math.DegToRad(fireAngle)) * cannonLength
    const startY = this.cannon.y + Math.sin(Phaser.Math.DegToRad(fireAngle)) * cannonLength

    // Create enhanced bullet
    this.bullet = this.physics.add.sprite(startX, startY, "projectile_cannonball")
    this.bullet.setScale(0.15)
    this.bullet.setDepth(10)
    this.bullet.body.setCollideWorldBounds(false)

    const velocityMultiplier = 0.8
    const velocityX = Math.cos(Phaser.Math.DegToRad(fireAngle)) * firePower * velocityMultiplier
    const velocityY = Math.sin(Phaser.Math.DegToRad(fireAngle)) * firePower * velocityMultiplier

    this.bullet.setVelocity(velocityX, velocityY)
    this.bullet.setGravityY(this.gravity)

    // ENHANCED CANNON RECOIL ANIMATION
    this.createCannonRecoilAnimation(fireAngle)

    // Enhanced cannon fire VFX
    this.createEnhancedCannonFireVFX(startX, startY)
    if (this.sounds.shoot) this.sounds.shoot.play()

    this.physics.add.collider(this.bullet, this.ground, this.bulletHitGround, null, this)
    this.physics.add.collider(this.bullet, this.targets, this.hitTarget, null, this)

    this.resetAiming()

    // Enhanced camera follow
    this.cameras.main.startFollow(this.bullet, false, 0.08, 0.08)

    this.bulletFollowTimer = this.time.delayedCall(3000, () => {
      this.returnCameraToCannonSmoothly()
    })
  }

  // NEW: Enhanced cannon recoil animation
  createCannonRecoilAnimation(fireAngle) {
    const recoilDistance = 25
    const angleRad = Phaser.Math.DegToRad(fireAngle)

    // Calculate recoil direction (opposite to firing direction)
    const recoilX = -Math.cos(angleRad) * recoilDistance
    const recoilY = -Math.sin(angleRad) * recoilDistance

    // Recoil animation sequence
    this.tweens.add({
      targets: this.cannon,
      x: this.cannonOriginalX + recoilX,
      y: this.cannonOriginalY + recoilY,
      duration: 100,
      ease: "Power2.easeOut",
      onComplete: () => {
        // Return to original position
        this.tweens.add({
          targets: this.cannon,
          x: this.cannonOriginalX,
          y: this.cannonOriginalY,
          duration: 300,
          ease: "Bounce.easeOut",
        })
      },
    })

    // Add cannon shake effect
    this.tweens.add({
      targets: this.cannon,
      rotation: { from: -0.05, to: 0.05 },
      duration: 50,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        this.cannon.rotation = 0
      },
    })
  }

  createEnhancedCannonFireVFX(x, y) {
    // Multiple muzzle flash layers
    const flash1 = this.add.circle(x, y, 35, 0xffff00, 0.9).setDepth(20)
    const flash2 = this.add.circle(x, y, 25, 0xff8800, 0.8).setDepth(21)
    const flash3 = this.add.circle(x, y, 15, 0xffffff, 1).setDepth(22)

    // Flash animations
    this.tweens.add({
      targets: flash1,
      scaleX: 4,
      scaleY: 4,
      alpha: 0,
      duration: 300,
      ease: "Power3",
      onComplete: () => flash1.destroy(),
    })

    this.tweens.add({
      targets: flash2,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 250,
      ease: "Power3",
      onComplete: () => flash2.destroy(),
    })

    this.tweens.add({
      targets: flash3,
      scaleX: 2,
      scaleY: 2,
      alpha: 0,
      duration: 200,
      ease: "Power3",
      onComplete: () => flash3.destroy(),
    })

    // Particle effects
    this.smokeEmitter.explode(15, x, y)
    this.sparkEmitter.explode(25, x, y)

    // Enhanced screen shake
    this.cameras.main.shake(200, 0.012)

    // Screen flash
    const screenFlash = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0xffffff,
      0.2,
    )
    screenFlash.setScrollFactor(0)
    screenFlash.setDepth(25)

    this.tweens.add({
      targets: screenFlash,
      alpha: 0,
      duration: 150,
      onComplete: () => screenFlash.destroy(),
    })
  }

  returnCameraToCannonSmoothly() {
    this.cameras.main.stopFollow()

    this.tweens.add({
      targets: this.cameras.main,
      scrollX: 0,
      duration: 1200,
      ease: "Power2.easeInOut",
      onComplete: () => {
        this.checkGameState()
      },
    })
  }

  bulletHitGround(bullet, ground) {
    this.createRealisticExplosion(bullet.x, bullet.y, 0.8)
    this.destroyBullet()
  }

  hitTarget(bullet, target) {
    // Destroy target glow
    if (target.glowEffect) {
      target.glowEffect.destroy()
    }

    // REALISTIC EXPLOSION VFX - No more circles!
    this.createRealisticExplosion(target.x, target.y, 1.2)
    this.createShockwave(target.x, target.y)
    if (this.sounds.destroy) this.sounds.destroy.play()

    // Streak system
    this.streakCounter++
    this.showStreakEffect()

    // Score calculation with streak bonus
    const baseScore = 100
    const levelMultiplier = this.currentLevel
    const streakBonus = this.streakCounter * 25
    const scoreGained = baseScore * levelMultiplier + streakBonus
    this.updateScore(scoreGained)

    target.destroy()
    this.destroyBullet()
    this.targetsDestroyed++

    if (this.targetsDestroyed >= this.totalTargets) {
      this.completeLevel()
    } else if (this.ammo <= 0) {
      this.time.delayedCall(1500, () => this.gameOver())
    }
  }

  // NEW: Realistic explosion with smoke and fire instead of circles
  createRealisticExplosion(x, y, size = 1) {
    // Large smoke explosion
    this.smokeEmitter.explode(Math.floor(25 * size), x, y)

    // Fire/explosion particles
    this.explosionEmitter.explode(Math.floor(35 * size), x, y)

    // Sparks flying out
    this.sparkEmitter.explode(Math.floor(30 * size), x, y)

    // Dust cloud
    this.dustEmitter.explode(Math.floor(20 * size), x, y)

    // Create expanding smoke rings instead of circles
    for (let i = 0; i < 3; i++) {
      const smokeRing = this.add.circle(x, y, 20 + i * 10, 0x666666, 0.6 - i * 0.2)
      smokeRing.setDepth(18 + i)

      this.tweens.add({
        targets: smokeRing,
        scaleX: (3 + i) * size,
        scaleY: (3 + i) * size,
        alpha: 0,
        duration: 800 + i * 200,
        ease: "Power2",
        onComplete: () => smokeRing.destroy(),
      })
    }

    // Debris particles
    for (let i = 0; i < Math.floor(15 * size); i++) {
      const debris = this.add.circle(x, y, Phaser.Math.Between(2, 6), 0x444444).setDepth(17)
      const angle = (i / 15) * Math.PI * 2
      const speed = (100 + Math.random() * 100) * size

      this.tweens.add({
        targets: debris,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        alpha: 0,
        rotation: Math.random() * Math.PI * 2,
        duration: 1000,
        ease: "Power2",
        onComplete: () => debris.destroy(),
      })
    }

    // Screen effects
    this.cameras.main.shake(400, 0.025 * size)
    this.createScreenFlash(0.3 * size)
  }

  createShockwave(x, y) {
    const shockwave = this.add.circle(x, y, 10, 0xffffff, 0)
    shockwave.setStrokeStyle(4, 0x00ffff, 0.8)
    shockwave.setDepth(25)

    this.tweens.add({
      targets: shockwave,
      scaleX: 15,
      scaleY: 15,
      alpha: 0,
      duration: 800,
      ease: "Power2",
      onComplete: () => shockwave.destroy(),
    })
  }

  createScreenFlash(intensity = 0.2) {
    const flash = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0xffffff,
      intensity,
    )
    flash.setScrollFactor(0)
    flash.setDepth(30)

    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 200,
      onComplete: () => flash.destroy(),
    })
  }

  showStreakEffect() {
    if (this.streakCounter > 1) {
      this.comboText.setText(`${this.streakCounter}x STREAK!`)
      this.comboText.setVisible(true)
      this.comboText.setAlpha(1)
      this.comboText.setScale(1)

      // Streak animation
      this.tweens.add({
        targets: this.comboText,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 200,
        yoyo: true,
        onComplete: () => {
          this.tweens.add({
            targets: this.comboText,
            alpha: 0,
            duration: 1000,
            delay: 1000,
            onComplete: () => this.comboText.setVisible(false),
          })
        },
      })
    }
  }

  destroyBullet() {
    if (this.bullet) {
      this.bullet.destroy()
      this.bullet = null

      if (this.bulletFollowTimer) {
        this.bulletFollowTimer.remove()
        this.bulletFollowTimer = null
      }

      this.returnCameraToCannonSmoothly()
    }
  }

  updateScore(points) {
    this.score += points
    this.updateScoreText()

    // Enhanced score popup with Arial font
    const isMobile = this.cameras.main.width < 768
    const scorePopup = this.add.text(this.cameras.main.width / 2 + 100, 50, `+${points}`, {
      fontFamily: "Arial",
      fontSize: isMobile ? "18px" : "24px",
      fill: "#00FF88",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 2,
    })
    scorePopup.setOrigin(0.5, 0.5)
    scorePopup.setDepth(20)
    scorePopup.setScrollFactor(0)

    // Score popup animation
    this.tweens.add({
      targets: scorePopup,
      y: scorePopup.y - 50,
      alpha: 0,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 800,
      ease: "Power2",
      onComplete: () => scorePopup.destroy(),
    })

    // Score text pulse
    this.tweens.add({
      targets: this.scoreText,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 150,
      yoyo: true,
      ease: "Power2",
    })
  }

  updateScoreText() {
    this.scoreText.setText(this.score.toString())
  }

  updateLevelText() {
    this.levelText.setText(`LEVEL ${this.currentLevel}`)
  }

  updateAmmoText() {
    this.ammoText.setText(`AMMO: ${this.ammo}`)
    this.targetsText.setText(`TARGETS: ${this.targetsDestroyed}/${this.totalTargets}`)

    // Color based on ammo remaining
    if (this.ammo <= 1) {
      this.ammoText.setStyle({ fill: "#FF4444" })
    } else if (this.ammo <= 2) {
      this.ammoText.setStyle({ fill: "#FFAA00" })
    } else {
      this.ammoText.setStyle({ fill: "#00FF88" })
    }
  }

  checkGameState() {
    if (this.ammo <= 0 && this.targetsDestroyed < this.totalTargets) {
      this.streakCounter = 0 // Reset streak on failure
      this.gameOver()
    }
  }

  completeLevel() {
    if (this.sounds.success) this.sounds.success.play()

    // Bonus score for remaining ammo
    const ammoBonus = this.ammo * 50
    const streakBonus = this.streakCounter * 100
    this.updateScore(ammoBonus + streakBonus)

    // Enhanced level completion celebration
    this.createLevelCompleteVFX()

    // Always progress to the next level, as levels are infinite
    this.time.delayedCall(3000, () => {
      this.startLevel(this.currentLevel + 1)
    })
  }

  createLevelCompleteVFX() {
    // Screen celebration flash
    this.createScreenFlash(0.4)

    // Fireworks display
    for (let i = 0; i < 8; i++) {
      this.time.delayedCall(i * 200, () => {
        const cam = this.getCameraCenter()
        const x = cam.x - 200 + Math.random() * 400
        const y = cam.y - 100 + Math.random() * 200

        // Main firework explosion
        const firework = this.add.circle(x, y, 5, 0xffff00).setDepth(25)

        this.tweens.add({
          targets: firework,
          scaleX: 8,
          scaleY: 8,
          alpha: 0,
          duration: 800,
          ease: "Power2",
          onComplete: () => firework.destroy(),
        })

        // Firework particles
        this.sparkEmitter.explode(30, x, y)
      })
    }

    // Victory text with Arial font
    const isMobile = this.cameras.main.width < 768
    const victoryText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 100,
      "LEVEL COMPLETE!",
      {
        fontFamily: "Arial",
        fontSize: isMobile ? "36px" : "48px",
        fill: "#00FF88",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 4,
      },
    )
    victoryText.setOrigin(0.5, 0.5)
    victoryText.setDepth(30)
    victoryText.setScrollFactor(0)
    victoryText.setAlpha(0)

    this.tweens.add({
      targets: victoryText,
      alpha: 1,
      scaleX: { from: 0.5, to: 1.2 },
      scaleY: { from: 0.5, to: 1.2 },
      duration: 800,
      ease: "Back.easeOut",
      onComplete: () => {
        this.tweens.add({
          targets: victoryText,
          alpha: 0,
          duration: 500,
          delay: 2000,
          onComplete: () => victoryText.destroy(),
        })
      },
    })
  }

  showGameCompleteMessage() {
    const isMobile = this.cameras.main.width < 768
    const message = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, "GAME COMPLETE!", {
      fontFamily: "Arial",
      fontSize: isMobile ? "42px" : "56px",
      fill: "#00FF88",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 4,
    })
    message.setOrigin(0.5)
    message.setScrollFactor(0)
    message.setDepth(30)

    const finalScoreText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      `FINAL SCORE: ${this.score}`,
      {
        fontFamily: "Arial",
        fontSize: isMobile ? "28px" : "36px",
        fill: "#FFFFFF",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
      },
    )
    finalScoreText.setOrigin(0.5)
    finalScoreText.setScrollFactor(0)
    finalScoreText.setDepth(30)

    // Game over animation
    this.tweens.add({
      targets: [message, finalScoreText],
      scaleX: 1.3,
      scaleY: 1.3,
      duration: 1000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: 3,
    })

    // Final celebration
    this.sparkEmitter.explode(50, this.cameras.main.width / 2, this.cameras.main.height / 2)
  }

  gameOver() {
    this.isGameOver = true
    if (this.sounds.background) this.sounds.background.stop()

    // Enhanced game over screen
    const overlay = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.9,
    )
    overlay.setScrollFactor(0)
    overlay.setDepth(25)

    const isMobile = this.cameras.main.width < 768
    const gameOverText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 80,
      this.targetsDestroyed >= this.totalTargets ? "VICTORY!" : "GAME OVER",
      {
        fontFamily: "Arial",
        fontSize: isMobile ? "48px" : "64px",
        fill: this.targetsDestroyed >= this.totalTargets ? "#00FF00" : "#FF4444",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 4,
      },
    )
    gameOverText.setOrigin(0.5)
    gameOverText.setScrollFactor(0)
    gameOverText.setDepth(26)

    const finalScoreText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      `FINAL SCORE: ${this.score}`,
      {
        fontFamily: "Arial",
        fontSize: isMobile ? "28px" : "36px",
        fill: "#FFFFFF",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
      },
    )
    finalScoreText.setOrigin(0.5)
    finalScoreText.setScrollFactor(0)
    finalScoreText.setDepth(26)

    // Game over animation
    this.tweens.add({
      targets: [gameOverText, finalScoreText],
      alpha: { from: 0, to: 1 },
      y: { from: "+=50", to: "-=50" },
      duration: 1000,
      ease: "Power2.easeOut",
    })

    initiateGameOver({ score: this.score })
  }

  pauseGame() {
    handlePauseGame.bind(this)()
  }

  getCameraCenter() {
    return {
      x: this.cameras.main.scrollX + this.cameras.main.width / 2,
      y: this.cameras.main.scrollY + this.cameras.main.height / 2,
    }
  }

  update() {
    this.updateAimingSystem()
    this.updateMovingTargets() // Update moving targets every frame

    // ENHANCED TRAIL UPDATE - Larger trail particles
    if (this.bullet && this.bullet.active) {
      // Emit larger black trail particles at bullet position
      this.bulletTrailEmitter.emitParticleAt(this.bullet.x, this.bullet.y, 5)
    }
  }
}

function displayProgressLoader() {
  const width = 320
  const height = 50
  const x = this.cameras.main.width / 2 - 160
  const y = this.cameras.main.height / 2 - 50

  const progressBox = this.add.graphics()
  progressBox.fillStyle(0x222222, 0.8)
  progressBox.fillRect(x, y, width, height)

  const loadingText = this.add
    .text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 20, "Loading...", {
      fontFamily: "Arial",
      fontSize: "20px",
      fill: "#ffffff",
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

function initiateGameOver(data) {
  console.log("Game Over! Final Score:", data.score)
}

function handlePauseGame() {
  if (this.scene.isPaused()) {
    this.scene.resume()
  } else {
    this.scene.pause()
  }
}

const config = {
  type: Phaser.AUTO,
  width: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].width,
  height: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].height,
  scene: [GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  pixelArt: false,
}

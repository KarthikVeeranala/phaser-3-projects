// Touch Screen Controls
const joystickEnabled = true
const buttonEnabled = false

// JOYSTICK DOCUMENTATION: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/virtualjoystick/
const rexJoystickUrl =
  "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js"

// BUTTON DOCMENTATION: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/button/
const rexButtonUrl = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js"

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" })
    this.score = 0
    this.gameLevel = 1
    this.levelThreshold = 50

    this.enemySpeed = 120
    this.baseSpawnDelay = 2000
    this.spawnDelayDecrease = 400
    this.canFireBullet = true
    this.spawnTimer = null
    this.bossFireTimer = null

    // Game state variables
    this.maxEnemiesThisLevel = 5
    this.currentEnemyCount = 0
    this.enemiesSpawnedThisLevel = 0
    this.gameState = "playing"

    // Health system (replacing lives)
    this.maxHealth = 100
    this.currentHealth = 100
    this.canTakeDamage = true

    // Speed boost system
    this.isSpeedBoost = false
    this.normalPlayerSpeed = 300
    this.boostedPlayerSpeed = 500
    this.currentPlayerSpeed = this.normalPlayerSpeed

    // Unlimited bullets system
    this.hasUnlimitedBullets = true

    // Fire bullets system with VFX limit
    this.fireBulletActive = false
    this.fireBulletShotsLeft = 0
    this.maxFireBulletVFX = 10
    this.currentFireBulletVFX = 0

    this.lowHealthOverlay = null
    this.lowHealthText = null
    this.lowHealthActive = false
    this.playerOriginalY = 0 // Initialize player original Y position
    this.isMobile = false // Initialize here, set properly in preload
  }

  preload() {
    // Mobile detection - MOVED HERE
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0

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

    // Only load mobile controls if on mobile device
    if (this.isMobile) {
      if (joystickEnabled) this.load.plugin("rexvirtualjoystickplugin", rexJoystickUrl, true)
      if (buttonEnabled) this.load.plugin("rexbuttonplugin", rexButtonUrl, true)
    }

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
    this.scale.on("enterfullscreen", () => {
      this.resize(this.scale.gameSize)
    })

    this.scale.on("leavefullscreen", () => {
      setTimeout(() => this.resize(this.scale.gameSize), 200)
    })

    window.addEventListener("orientationchange", () => {
      setTimeout(() => this.resize(this.scale.gameSize), 300)
    })

    this.input.enabled = true
    this.input.keyboard.enabled = true

    this.scale.on("resize", this.resize, this)
    this.isLandscape = innerWidth > innerHeight

    // Reset game state
    this.currentHealth = this.maxHealth
    this.gameState = "playing"
    this.maxEnemiesThisLevel = 5
    this.currentEnemyCount = 0
    this.enemiesSpawnedThisLevel = 0
    this.currentFireBulletVFX = 0
    this.width = this.game.config.width
    this.height = this.game.config.height
    this.scaleFactor = this.calculateScaleFactor()

    // FIXED: Proper bullet destruction at screen boundaries
    this.physics.world.on("worldbounds", (body) => {
      const bullet = body.gameObject

      // Check if it's a bullet (either regular or fire bullet)
      if (
        bullet &&
        (bullet.texture?.key === "projectile_cannonball" || bullet.texture?.key === "collectible_firebullet")
      ) {
        // Destroy bullet when it hits any boundary, especially top
        this.createBulletExplodeVFX(bullet.x, bullet.y)
        bullet.destroy()
      }
    })

    // Initialize sounds
    this.sounds = {}
    for (const key in _CONFIG.soundsLoader) {
      this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.6 })
    }

    // Play background music for gameplay
    if (this.cache.audio.has("gameMusic")) {
      this.gameMusic = this.sound.add("gameMusic", {
        loop: true,
        volume: 0.1,
      })
      this.gameMusic.play()
    } else if (this.sounds && this.sounds.background) {
      this.gameMusic = this.sounds.background
      this.gameMusic.play()
    }

    // Background
this.bg = this.add.image(this.width / 2, this.height / 2, 'background').setOrigin(0.5);
const bgScale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
this.bg.setScale(bgScale);


    this.tweens.add({
      targets: this.bg,
      x: this.width / 2 + 20,
      y: this.height / 2 + 10,
      duration: 8000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    // Input listeners
this.input.keyboard.on('keydown-ESC', () => this.pauseGame());

window.resumeGame = () => {
  this.gameState = "playing";
};


    // Create UI
    this.createUI()

    // Create player (canon)
    const playerScale = 0.35 * this.scaleFactor
    this.player = this.physics.add
      .sprite(this.width / 2, this.height - 80 * this.scaleFactor, "player_canon")
      .setScale(playerScale)
      .setOrigin(0.5, 0.5)
      .setDepth(10)

    this.player.setImmovable(true)
    this.player.body.allowGravity = false
    this.playerOriginalY = this.player.y // Store original Y position

    this.originalPlayerScale = {
      x: this.player.scaleX,
      y: this.player.scaleY,
    }

    // Create groups
    this.bullets = this.physics.add.group()
    this.enemies = this.physics.add.group()

    // Create invisible ground platform for enemy bounce
    this.ground = this.physics.add
      .staticImage(this.width / 2, this.height - 5, null)
      .setDisplaySize(this.width, 10)
      .setVisible(false)

    // ENHANCED: Super bouncy ground collision for dramatic bouncing
    this.physics.add.collider(this.enemies, this.ground, (enemy, ground) => {
      if (enemy.body.velocity.y > 0) {
        // MUCH stronger bounce with randomness
        const bounceDirection = (Math.random() - 0.5) * 1.2
        enemy.body.velocity.x += bounceDirection * 100
        enemy.body.velocity.y = -Math.abs(enemy.body.velocity.y) * 0.75
        enemy.setAngularVelocity(Phaser.Math.Between(-180, 180))
      }
    })

    this.powerUps = this.physics.add.group()
    this.cursors = this.input.keyboard.createCursorKeys()

    // Setup collisions
    this.setupCollisions()

    // Spawn timers
    this.spawnTimer = this.time.addEvent({
      delay: this.baseSpawnDelay,
      callback: () => this.spawnEnemyIfAllowed(),
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
      delay: 3000,
      loop: true,
      callback: () => {
        if (this.currentHealth < this.maxHealth) {
          this.currentHealth += 3
          this.updateHealthBar()
        }
      },
    })

    this.input.keyboard.disableGlobalCapture()

    // Click to aim and shoot controls
    this.input.on("pointermove", (pointer) => {
      if (this.gameState === "playing") {
        this.rotateCannonToPointer(pointer)
      }
    })

    this.input.on("pointerdown", (pointer) => {
      if (this.gameState !== "playing") return

      this.rotateCannonToPointer(pointer)

      // Fire on click for desktop, but not if touching mobile controls
      if (!this.isMobile || !this.isTouchingMobileControls(pointer)) {
        this.fireBullet()
        this.createCannonShotVFX()
      }
    })
  


  }

  // Helper function to check if touching mobile control areas
  isTouchingMobileControls(pointer) {
    if (!this.isMobile) return false

    const joyArea = 200 * this.scaleFactor
    const fireArea = 200 * this.scaleFactor

    const isJoyArea = pointer.x < joyArea && pointer.y > this.height - joyArea
    const isFireArea = pointer.x > this.width - fireArea && pointer.y > this.height - fireArea

    return isJoyArea || isFireArea
  }

  createUI() {
    this.createTopLeftUI()
    this.createTopCenterUI()
    this.createTopRightUI()

    // Only create mobile controls if on mobile device
    if (this.isMobile) {
      this.createMobileControls()
    }

    this.createStatusDisplays()
  }

  createTopLeftUI() {
    // FIXED: Level display positioning to avoid overlap
    const levelBgWidth = 120 * this.scaleFactor // Reduced width
    const levelBgHeight = 60 * this.scaleFactor // Reduced height
    const levelX = 15 + levelBgWidth / 2 // Moved closer to left edge
    const levelY = 15 + levelBgHeight / 2 // Moved closer to top edge

    this.levelBg = this.add.graphics()
    this.levelBg.fillStyle(0x333333, 0.9)
    this.levelBg.fillRoundedRect(-levelBgWidth / 2, -levelBgHeight / 2, levelBgWidth, levelBgHeight, 12)

    // Border
    this.levelBg.lineStyle(4, 0x666666, 1)
    this.levelBg.strokeRoundedRect(-levelBgWidth / 2, -levelBgHeight / 2, levelBgWidth, levelBgHeight, 12)

    // Accent
    this.levelBg.lineStyle(2, 0x888888, 0.8)
    this.levelBg.strokeRoundedRect(
      -levelBgWidth / 2 + 3,
      -levelBgHeight / 2 + 3,
      levelBgWidth - 6,
      levelBgHeight - 6,
      9,
    )
    this.levelBg.setPosition(levelX, levelY)
    this.levelBg.setDepth(14)

    // Text - PROPERLY CENTERED
    this.levelText = this.add
      .text(levelX, levelY, `LV ${this.gameLevel}`, {
        fontSize: `${18 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(15)
  }

  createTopCenterUI() {
    const healthBgWidth = 320 * this.scaleFactor
    const healthBgHeight = 60 * this.scaleFactor
    const healthX = this.width / 2
    const healthY = 35 * this.scaleFactor

    // Filled colored bar
    this.healthBarBg = this.add.graphics()
    this.healthBarBg.fillStyle(0x228b22, 1)
    this.healthBarBg.fillRoundedRect(
      healthX - healthBgWidth / 2,
      healthY - healthBgHeight / 2,
      healthBgWidth,
      healthBgHeight,
      15,
    )
    this.healthBarBg.setDepth(14)

    // HEALTH text on top
    this.healthText = this.add
      .text(healthX, healthY, "HEALTH", {
        fontSize: `${28 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(15)

    // Score display below health
    const scoreBgWidth = 280 * this.scaleFactor
    const scoreBgHeight = 50 * this.scaleFactor

    const scoreY = healthY + 50 * this.scaleFactor

    this.scoreBg = this.add.graphics()
    this.scoreBg.fillStyle(0x333333, 0.9)
    this.scoreBg.fillRoundedRect(
      healthX - scoreBgWidth / 2,
      scoreY - scoreBgHeight / 2,
      scoreBgWidth,
      scoreBgHeight,
      12,
    )

    // Border
    this.scoreBg.lineStyle(3, 0x666666, 1)
    this.scoreBg.strokeRoundedRect(
      healthX - scoreBgWidth / 2,
      scoreY - scoreBgHeight / 2,
      scoreBgWidth,
      scoreBgHeight,
      12,
    )
    this.scoreBg.setDepth(14)

    this.scoreText = this.add
      .text(healthX, scoreY, `Score: ${this.score}`, {
        fontSize: `${26 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(15)
  }

  createTopRightUI() {
    const vfxBgWidth = 140 * this.scaleFactor
    const vfxBgHeight = 50 * this.scaleFactor
    const vfxX = this.width - 180 * this.scaleFactor // Moved significantly left
    const vfxY = 35 * this.scaleFactor

    this.vfxBg = this.add.graphics()
    this.vfxBg.fillStyle(0x333333, 0.9)
    this.vfxBg.fillRoundedRect(-vfxBgWidth / 2, -vfxBgHeight / 2, vfxBgWidth, vfxBgHeight, 10)

    // Border
    this.vfxBg.lineStyle(3, 0x666666, 1)
    this.vfxBg.strokeRoundedRect(-vfxBgWidth / 2, -vfxBgHeight / 2, vfxBgWidth, vfxBgHeight, 10)

    // Accent
    this.vfxBg.lineStyle(2, 0x888888, 0.8)
    this.vfxBg.strokeRoundedRect(-vfxBgWidth / 2 + 2, -vfxBgHeight / 2 + 2, vfxBgWidth - 4, vfxBgHeight - 4, 8)
    this.vfxBg.setPosition(vfxX, vfxY)
    this.vfxBg.setDepth(14)

    this.powerupStatusText = this.add
      .text(vfxX, vfxY, "", {
        fontSize: `${16 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ff4500",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(20)
  }

  createMobileControls() {
// Bigger size & more padding from bottom
const boxSize = 140 * this.scaleFactor; // Increased from 110
const paddingBottom = 180 * this.scaleFactor; // Moves buttons higher up
const paddingSide = 40 * this.scaleFactor; // Extra from screen edges

// LEFT arrow button box
this.leftButtonBase = this.add.graphics();
this.leftButtonBase.fillStyle(0x333333, 0.9);
this.leftButtonBase.fillRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 20);
this.leftButtonBase.lineStyle(4, 0x666666, 1);
this.leftButtonBase.strokeRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 20);
this.leftButtonBase.lineStyle(2, 0x888888, 0.8);
this.leftButtonBase.strokeRoundedRect(-boxSize / 2 + 5, -boxSize / 2 + 5, boxSize - 10, boxSize - 10, 15);
this.leftButtonBase.setPosition(paddingSide + boxSize / 2, this.height - paddingBottom).setDepth(12);

// RIGHT arrow button box
this.rightButtonBase = this.add.graphics();
this.rightButtonBase.fillStyle(0x333333, 0.9);
this.rightButtonBase.fillRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 20);
this.rightButtonBase.lineStyle(4, 0x666666, 1);
this.rightButtonBase.strokeRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 20);
this.rightButtonBase.lineStyle(2, 0x888888, 0.8);
this.rightButtonBase.strokeRoundedRect(-boxSize / 2 + 5, -boxSize / 2 + 5, boxSize - 10, boxSize - 10, 15);
this.rightButtonBase.setPosition(this.width - paddingSide - boxSize / 2, this.height - paddingBottom).setDepth(12);

// LEFT arrow label
this.leftButtonText = this.add.text(this.leftButtonBase.x, this.leftButtonBase.y, '←', {
  fontSize: `${56 * this.scaleFactor}px`,
  fontFamily: 'Arial Black',
  fill: '#ffffff',
}).setOrigin(0.5).setDepth(13);

// RIGHT arrow label
this.rightButtonText = this.add.text(this.rightButtonBase.x, this.rightButtonBase.y, '→', {
  fontSize: `${56 * this.scaleFactor}px`,
  fontFamily: 'Arial Black',
  fill: '#ffffff',
}).setOrigin(0.5).setDepth(13);

// Interact zones
this.leftZone = this.add.zone(this.leftButtonBase.x, this.leftButtonBase.y, boxSize, boxSize)
  .setOrigin(0.5)
  .setInteractive()
  .on('pointerdown', () => this.leftHeld = true)
  .on('pointerup', () => this.leftHeld = false)
  .on('pointerout', () => this.leftHeld = false)
  .setDepth(15);

this.rightZone = this.add.zone(this.rightButtonBase.x, this.rightButtonBase.y, boxSize, boxSize)
  .setOrigin(0.5)
  .setInteractive()
  .on('pointerdown', () => this.rightHeld = true)
  .on('pointerup', () => this.rightHeld = false)
  .on('pointerout', () => this.rightHeld = false)
  .setDepth(15);


  }

  createStatusDisplays() {
    this.speedBoostText = this.add
      .text(this.width / 2, 200 * this.scaleFactor, "", {
        fontSize: `${36 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#00ff00",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(15)

    this.fireBulletText = this.add
      .text(this.width / 2, 160 * this.scaleFactor, "", {
        fontSize: `${32 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ff4500",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(15)
  }

  updateLevelText() {
    this.levelText.setText(`LV ${this.gameLevel}`)
    this.levelJustCompleted = false
  }

  updateScoreText() {
    this.scoreText.setText(`Score: ${this.score}`)
  }

  updateFireBulletDisplay() {
    if (this.fireBulletActive) {
      this.powerupStatusText.setText(`[FIRE] Ammo: ${this.fireBulletShotsLeft}`)
      this.time.delayedCall(4000, () => {
        this.powerupStatusText.setText("")
      })
    } else {
      this.fireBulletText.setText("")
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

    // Bullet-enemy collision with splitting mechanism
    this.physics.add.collider(this.bullets, this.enemies, (bullet, enemy) => {
      // Safety check
      if (!bullet?.body || !enemy?.body) return

      // Extract data BEFORE destroy
      const ex = enemy.x
      const ey = enemy.y
      const eType = enemy.enemyType
      const isBoss = enemy.isBoss // Correctly checking enemy.isBoss
      let wasKilled = false

      if (enemy.y < 0) return

      // Play effects
      if (this.sounds.blast) this.sounds.blast.setVolume(0.12).play()
      this.createHitEffect(ex, ey)

      // Destroy bullet
      bullet.disableBody(true, true)
      bullet.destroy()

      // Boss enemy logic
      if (isBoss) {
        const damage = bullet.texture.key === "collectible_firebullet" ? 3 : 1
        enemy.health -= damage
        this.updateBossHealthBar() // Ensure this is called

if (enemy.health <= 0) {
  wasKilled = true;
  this.createEnemyDestroyVFX(ex, ey, true);
  enemy.disableBody(true, true);
  enemy.destroy();
  this.currentEnemyCount--;
  if (this.bossFireTimer) this.bossFireTimer.remove();
  this.gameOver(); // ✅ Properly triggers Aicade's built-in game over screen
}
 else {
          // Keep boss moving
          if (enemy.body.velocity.x === 0) {
            const dir = Phaser.Math.Between(0, 1) === 0 ? -1 : 1
            enemy.setVelocityX(dir * 150)
          }
        }
      }

      // Regular enemies with Ball Blast splitting mechanism
      else {
        const damage = bullet.texture.key === "collectible_firebullet" ? 3 : 1
        enemy.health -= damage
        this.setEnemyHealthTint(enemy)

        // Update number display
        if (enemy.numberText) {
          enemy.numberText.setText(enemy.health.toString())
        }

        if (enemy.health <= 0) {
          wasKilled = true
          this.createEnemyDestroyVFX(ex, ey, false)

          // BALL BLAST SPLITTING MECHANISM (starts at level 3)
          if (this.gameLevel >= 3 && enemy.canSplit && enemy.splitLevel > 0) {
            this.splitEnemy(enemy, ex, ey)
          }

          // Clean up number text
          if (enemy.numberText) {
            enemy.numberText.destroy()
          }

          enemy.disableBody(true, true)
          enemy.destroy()
          this.currentEnemyCount--
          this.increaseScore(10)
        }
      }

      // Drop powerup if needed
      if (wasKilled && Math.random() < 0.15) {
        this.spawnPowerupFromEnemy(ex, ey)
      }

      // Check level end
      this.checkLevelComplete()
    })

    // Player-powerup collision
    this.physics.add.overlap(this.player, this.powerUps, (player, powerUp) => {
      this.activateSpeedBoost()
      powerUp.destroy()
    })
  }

  // ENHANCED: Cannon shot VFX with stronger recoil
  createCannonShotVFX() {
    const muzzleFlash = this.add.circle(this.player.x, this.player.y - 30, 20, 0xffffff, 0.9).setDepth(20)

    this.tweens.add({
      targets: muzzleFlash,
      radius: 35,
      alpha: 0,
      duration: 200,
      onComplete: () => muzzleFlash.destroy(),
    })

    // Enhanced smoke puff
    const smoke = this.add.circle(this.player.x, this.player.y - 25, 12, 0x666666, 0.8).setDepth(19)
    this.tweens.add({
      targets: smoke,
      radius: 30,
      alpha: 0,
      y: smoke.y - 40,
      duration: 500,
      onComplete: () => smoke.destroy(),
    })

    // ENHANCED: Much stronger recoil effect on cannon
    this.tweens.add({
      targets: this.player,
      scaleX: this.originalPlayerScale.x * 0.75, // More dramatic scale change
      scaleY: this.originalPlayerScale.y * 0.75,
      y: this.playerOriginalY + 15, // Use original Y for consistent recoil
      duration: 120,
      yoyo: true,
      ease: "Power3.easeOut", // More dramatic easing
    })

    // Add screen shake for extra impact
    this.cameras.main.shake(80, 0.008)
  }

  // Enemy destroy VFX
  createEnemyDestroyVFX(x, y, isBoss = false) {
    const size = isBoss ? 50 : 30
    const particleCount = isBoss ? 12 : 8
    const colors = [0xff4500, 0xff6600, 0xff8800, 0xffaa00]

    // Main explosion
    const explosion = this.add.circle(x, y, 10, 0xff4500, 0.9).setDepth(20)
    this.tweens.add({
      targets: explosion,
      radius: size,
      alpha: 0,
      duration: 300,
      onComplete: () => explosion.destroy(),
    })

    // Particle burst
    for (let i = 0; i < particleCount; i++) {
      const color = Phaser.Utils.Array.GetRandom(colors)
      const particle = this.add.circle(x, y, Phaser.Math.Between(3, 6), color, 0.8).setDepth(19)

      const angle = (i / particleCount) * Math.PI * 2
      const distance = Phaser.Math.Between(40, 80)

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        duration: 500,
        onComplete: () => particle.destroy(),
      })
    }

    // Screen flash for boss
    if (isBoss) {
      const flash = this.add
        .rectangle(this.width / 2, this.height / 2, this.width, this.height, 0xffffff, 0.3)
        .setDepth(25)
      this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 200,
        onComplete: () => flash.destroy(),
      })
    }
  }

  // BALL BLAST STYLE: Enemy splitting mechanism
  splitEnemy(parentEnemy, x, y) {
    const splitCount = Phaser.Math.Between(2, 3) // Split into 2-3 smaller enemies
    const newSplitLevel = parentEnemy.splitLevel - 1

    if (newSplitLevel <= 0) return // No more splitting

    // Create enhanced split VFX
    this.createEnemySplitVFX(x, y)

    for (let i = 0; i < splitCount; i++) {
      // Calculate spawn positions around the original enemy
      const angle = (i / splitCount) * Math.PI * 2
      const distance = 50 * this.scaleFactor
      const splitX = x + Math.cos(angle) * distance
      const splitY = y + Math.sin(angle) * distance

      // Create smaller enemy
      const splitEnemy = this.enemies
        .create(splitX, splitY, parentEnemy.enemyType)
        .setScale(0.3 * this.scaleFactor) // Much smaller than original
        .setDepth(3)

      // ENHANCED: Super bouncy physics for split enemies
      // MODIFIED: Reduced vertical bounce and disabled top collision
      splitEnemy.setCollideWorldBounds(true, true, true, false, true) // left, right, top, bottom
      splitEnemy.setBounce(0.4, 0.3)
      splitEnemy.setGravityY(150) // Lower gravity for more air time
      splitEnemy.setVelocityY(Math.sin(angle) * 250 - 150) // Strong upward bias
      splitEnemy.setVelocityX(Math.cos(angle) * 250 + Phaser.Math.Between(-80, 80))
      splitEnemy.setDrag(30, 0)

      // Set properties
      splitEnemy.level = this.gameLevel
      splitEnemy.enemyType = parentEnemy.enemyType
      splitEnemy.health = Math.max(1, Math.floor(parentEnemy.maxHealth / 2)) // Half health
      splitEnemy.maxHealth = splitEnemy.health
      splitEnemy.canSplit = true
      splitEnemy.splitLevel = newSplitLevel
      splitEnemy.enemySize = newSplitLevel > 1 ? "medium" : "small"

      // Add number display for split enemies (Ball Blast style)
      if (this.gameLevel >= 3) {
        splitEnemy.numberText = this.add
          .text(splitX, splitY, splitEnemy.health.toString(), {
            fontSize: `${22 * this.scaleFactor}px`,
            fontFamily: "Arial Black",
            fill: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 3,
          })
          .setOrigin(0.5)
          .setDepth(4)
      }

      this.currentEnemyCount++
      this.setEnemyHealthTint(splitEnemy)

      // Add spawn effect
      const spawnFlash = this.add.circle(splitX, splitY, 20, 0x00ffff, 0.9).setDepth(20)
      this.tweens.add({
        targets: spawnFlash,
        radius: 35,
        alpha: 0,
        duration: 250,
        onComplete: () => spawnFlash.destroy(),
      })
    }
  }

  // Enhanced split VFX
  createEnemySplitVFX(x, y) {
    // Split flash with cyan color
    const splitFlash = this.add.circle(x, y, 30, 0x00ffff, 0.9).setDepth(20)
    this.tweens.add({
      targets: splitFlash,
      radius: 60,
      alpha: 0,
      duration: 350,
      onComplete: () => splitFlash.destroy(),
    })

    // Split particles with cyan color
    for (let i = 0; i < 10; i++) {
      const particle = this.add.circle(x, y, 6, 0x00ffff, 0.8).setDepth(19)
      const angle = (i / 10) * Math.PI * 2

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 80,
        y: y + Math.sin(angle) * 80,
        alpha: 0,
        scale: 0.2,
        duration: 500,
        onComplete: () => particle.destroy(),
      })
    }

    // Add stronger screen shake effect for splitting
    this.cameras.main.shake(150, 0.015)
  }

  createHitEffect(x, y) {
    // Create explosion effect
    const explosion = this.add.circle(x, y, 5, 0x888888, 0.9).setDepth(20)

    this.tweens.add({
      targets: explosion,
      radius: 35,
      alpha: 0,
      duration: 250,
      onComplete: () => explosion.destroy(),
    })

    // Create particles
    for (let i = 0; i < 6; i++) {
      const particle = this.add
        .circle(x + Phaser.Math.Between(-10, 10), y + Phaser.Math.Between(-10, 10), 4, 0x666666, 0.9)
        .setDepth(19)

      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-60, 60),
        y: particle.y + Phaser.Math.Between(-60, 60),
        rotation: Phaser.Math.Between(0, Math.PI * 2),
        alpha: 0,
        duration: 400,
        onComplete: () => particle.destroy(),
      })
    }

    // Add smoke
    const smoke = this.add.circle(x, y, 8, 0x666666, 0.6).setDepth(18)
    this.tweens.add({
      targets: smoke,
      radius: 25,
      alpha: 0,
      duration: 600,
      onComplete: () => smoke.destroy(),
    })
  }

  createDamageEffect() {
    // Add damage particles effect
    for (let i = 0; i < 5; i++) {
      const particle = this.add
        .rectangle(
          this.player.x + Phaser.Math.Between(-30, 30),
          this.player.y + Phaser.Math.Between(-30, 30),
          Phaser.Math.Between(8, 15),
          2,
          0x333333,
          0.8,
        )
        .setDepth(20)

      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-50, 50),
        y: particle.y + Phaser.Math.Between(-50, 50),
        rotation: Phaser.Math.Between(0, Math.PI * 2),
        alpha: 0,
        duration: 800,
        onComplete: () => particle.destroy(),
      })
    }
  }

  updateHealthBar() {
    this.currentHealth = Phaser.Math.Clamp(this.currentHealth, 0, this.maxHealth)
    const percentage = this.currentHealth / this.maxHealth

    const fullWidth = 320 * this.scaleFactor
    const fullHeight = 60 * this.scaleFactor
    const healthX = this.width / 2
    const healthY = 35 * this.scaleFactor

    // Clear and redraw health bar fill
    this.healthBarBg.clear()
    let color = 0x228b22
    if (percentage <= 0.3) color = 0xffa500
    if (percentage <= 0.25) color = 0xff0000
    this.healthBarBg.fillStyle(color, 1)
    this.healthBarBg.fillRoundedRect(
      healthX - fullWidth / 2,
      healthY - fullHeight / 2,
      fullWidth * percentage,
      fullHeight,
      15,
    )

    // Trigger low health overlay if below 25%
    if (percentage <= 0.25 && !this.lowHealthActive) {
      this.showLowHealthWarning()
    } else if (percentage > 0.25 && this.lowHealthActive) {
      this.hideLowHealthWarning()
    }

    if (this.currentHealth <= 0) {
      this.gameOver()
    }
  }

  showLowHealthWarning() {
    this.lowHealthActive = true

    // Red translucent overlay
    this.lowHealthOverlay = this.add
      .rectangle(this.width / 2, this.height / 2, this.width, this.height, 0xff0000, 0.3)
      .setDepth(30)

    // Warning text
    this.lowHealthText = this.add
      .text(this.width / 2, this.height / 2, "WAIT UNTIL HEALTH IS REGENERATED", {
        fontSize: `${36 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(31)

    // Optional: Flicker effect
    this.tweens.add({
      targets: this.lowHealthText,
      alpha: { from: 1, to: 0.5 },
      duration: 500,
      yoyo: true,
      repeat: -1,
    })
  }

  createBulletExplodeVFX(x, y) {
    const explosion = this.add.circle(x, y, 6, 0xffa500).setDepth(5)

    this.tweens.add({
      targets: explosion,
      scale: { from: 1, to: 2.5 },
      alpha: { from: 1, to: 0 },
      duration: 300,
      onComplete: () => explosion.destroy(),
    })
  }

  // Enhanced fireball trail effect
  createFireballTrail(x, y) {
    const colors = [0xff4500, 0xffa500, 0xffff00]
    const color = Phaser.Utils.Array.GetRandom(colors)

    const spark = this.add
      .circle(x + Phaser.Math.Between(-8, 8), y + Phaser.Math.Between(-8, 8), 6, color, 0.8) // Increased size
      .setDepth(2)

    this.tweens.add({
      targets: spark,
      scale: { from: 1.2, to: 0.4 }, // Larger initial scale
      alpha: { from: 0.8, to: 0 },
      duration: 400, // Longer duration
      ease: "Power2.easeOut",
      onComplete: () => spark.destroy(),
    })
  }

  hideLowHealthWarning() {
    this.lowHealthActive = false
    if (this.lowHealthOverlay) this.lowHealthOverlay.destroy()
    if (this.lowHealthText) this.lowHealthText.destroy()
  }

  spawnEnemyIfAllowed() {
    if (this.gameState !== "playing") return

    if (this.enemiesSpawnedThisLevel >= this.maxEnemiesThisLevel) {
      return
    }

    // Spawn enemies outside screen and fall in
    const spawnX = Phaser.Math.Between(100, this.width - 100)
    const spawnY = -50

    let enemyType = "enemy"
    let enemyHealth = this.gameLevel

    if (this.gameLevel >= 3 && (this.gameLevel === 3 || this.gameLevel >= 5)) {
      if (Math.random() < 0.3) {
        enemyType = "enemy_1"
        enemyHealth = 5
      }
    }

    const enemy = this.enemies
      .create(spawnX, spawnY, enemyType)
      .setScale(0.5 * this.scaleFactor)
      .setDepth(3)

    // MODIFIED: Reduced vertical bounce and disabled top collision
    enemy.setCollideWorldBounds(true, true, true, false, true) // left, right, top, bottom
    enemy.setBounce(0.45, 0.35)
    enemy.setGravityY(180) // Lower gravity for more air time
    enemy.setVelocityY(Phaser.Math.Between(20, 60)) // Gentler initial drop
    enemy.setVelocityX(Phaser.Math.Between(-80, 80)) // More horizontal movement
    enemy.setDrag(30, 0)

    // Ball Blast splitting system (starts at level 3)
    enemy.level = this.gameLevel
    enemy.enemyType = enemyType
    enemy.health = enemyHealth
    enemy.maxHealth = enemyHealth
    enemy.canSplit = true
    enemy.splitLevel = this.gameLevel >= 3 ? Math.min(3, Math.floor(this.gameLevel / 2) + 1) : 0
    enemy.enemySize = "large"

    // Add number display on enemy (Ball Blast style) - starts at level 3
    if (this.gameLevel >= 3) {
      enemy.numberText = this.add
        .text(enemy.x, enemy.y, enemy.health.toString(), {
          fontSize: `${26 * this.scaleFactor}px`,
          fontFamily: "Arial Black",
          fill: "#ffffff",
          align: "center",
          stroke: "#000000",
          strokeThickness: 4,
        })
        .setOrigin(0.5)
        .setDepth(4)
    }

    this.currentEnemyCount++
    this.enemiesSpawnedThisLevel++
    this.setEnemyHealthTint(enemy)
  }

  spawnPowerupFromEnemy(x, y) {
    // Spawn powerup from destroyed enemy
    const powerUpType = Phaser.Math.RND.pick(["speed", "fire"])

    let powerUp
    if (powerUpType === "speed") {
      powerUp = this.powerUps
        .create(x, y, "projectile_cannonball")
        .setScale(0.8 * this.scaleFactor)
        .setDepth(4)
        .setTint(0x00ff88)
    } else if (powerUpType === "fire") {
      powerUp = this.physics.add.sprite(x, y, "collectible_firebullet").setScale(0.4)
      powerUp.setDepth(4)
    }

    if (powerUp) {
      powerUp.setGravityY(150)
      powerUp.setBounce(0.8)
      powerUp.setCollideWorldBounds(true)

      // Fire bullet powerup collision handling
      if (powerUpType === "fire") {
        const overlapCollider = this.physics.add.overlap(this.player, powerUp, () => {
          if (!powerUp.active) return

          overlapCollider.destroy()

          powerUp.disableBody(true, true)
          this.fireBulletActive = true
          this.fireBulletShotsLeft = 7
          this.currentFireBulletVFX = 0
          this.updateFireBulletDisplay()
          this.showPickupText("FIRE BULLETS LOADED!", 0xff4500)
          if (this.sounds.pickup) this.sounds.pickup.play()
        })
      }

      // Auto-destroy if it falls off screen
      this.time.delayedCall(8000, () => {
        if (powerUp && powerUp.active) {
          powerUp.destroy()
        }
      })
    }
  }

  spawnFireBulletPowerup() {
    if (this.gameState !== "playing") return

    if (Math.random() < 0.3) {
      const x = Phaser.Math.Between(50, this.width - 50)
      const fireBulletBox = this.physics.add.sprite(x, -50, "collectible_firebullet").setScale(0.4)

      fireBulletBox.setVelocityY(150)

      const overlapCollider = this.physics.add.overlap(this.player, fireBulletBox, () => {
        if (!fireBulletBox.active) return

        overlapCollider.destroy()

        fireBulletBox.disableBody(true, true)

        this.fireBulletActive = true
        this.fireBulletShotsLeft = 7
        this.currentFireBulletVFX = 0

        this.updateFireBulletDisplay()
        this.showPickupText("FIRE BULLETS LOADED!", 0xff4500)

        if (this.sounds.pickup) {
          this.sounds.pickup.play()
        }
      })

      this.time.delayedCall(5000, () => {
        if (fireBulletBox && fireBulletBox.active) {
          fireBulletBox.destroy()
        }
      })
    }
  }

  activateSpeedBoost() {
    if (this.isSpeedBoost) return

    this.isSpeedBoost = true
    this.currentPlayerSpeed = this.boostedPlayerSpeed
    this.powerupStatusText.setText("[SPEED BOOST]")

    this.time.delayedCall(4000, () => {
      this.powerupStatusText.setText("")
    })

    this.sounds.upgrade.setVolume(0.3).setLoop(false).play()

    // Add effect particles
    for (let i = 0; i < 8; i++) {
      const particle = this.add
        .circle(
          this.player.x + Phaser.Math.Between(-40, 40),
          this.player.y + Phaser.Math.Between(-40, 40),
          3,
          0x00ff88,
          0.7,
        )
        .setDepth(15)

      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-100, 100),
        y: particle.y - 50,
        alpha: 0,
        duration: 2000,
        onComplete: () => particle.destroy(),
      })
    }

    this.time.delayedCall(4000, () => {
      this.isSpeedBoost = false
      this.currentPlayerSpeed = this.normalPlayerSpeed
      this.speedBoostText.setText("")
    })
  }

  showPickupText(text, color) {
    const pickupText = this.add
      .text(this.player.x, this.player.y - 50, text, {
        fontSize: `${32 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: color,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(20)

    this.tweens.add({
      targets: pickupText,
      y: pickupText.y - 50,
      alpha: 0,
      duration: 1500,
      onComplete: () => pickupText.destroy(),
    })
  }

  fireBullet() {
    this.sounds.shoot.setVolume(0.1).setLoop(false).play()

    const bulletTexture = this.fireBulletActive ? "collectible_firebullet" : "projectile_cannonball"

    const bullet = this.bullets
      .create(this.player.x, this.player.y, bulletTexture)
      .setScale(0.5 * this.scaleFactor)
      .setDepth(5)

    // Proper bullet world bounds setup for destruction at screen edges
    bullet.setCollideWorldBounds(true)
    bullet.body.onWorldBounds = true

    const angle = this.player.rotation - Math.PI / 2
    const bulletSpeed = 1000

    bullet.setVelocityX(Math.cos(angle) * bulletSpeed)
    bullet.setVelocityY(Math.sin(angle) * bulletSpeed)

    // Fire bullet VFX handling
    if (this.fireBulletActive) {
      this.fireBulletShotsLeft--
      this.updateFireBulletDisplay()

      // Create fire trail VFX if VFX available
      if (this.currentFireBulletVFX < this.maxFireBulletVFX) {
        this.createFireTrailVFX(bullet)
        this.currentFireBulletVFX++
      }

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

  // ENHANCED: Fire trail VFX for fireballs with larger, more visible effects
  createFireTrailVFX(bullet) {
    if (!bullet || !bullet.body) return

    const trail = this.add
      .particles(bullet.x, bullet.y, "projectile_cannonball", {
        scale: { start: 0.6, end: 0.2 }, // INCREASED: Much larger trail particles
        tint: [0xff4500, 0xff6600, 0xff8800, 0xffa500],
        alpha: { start: 0.9, end: 0 }, // INCREASED: Higher initial alpha
        lifespan: 500, // INCREASED: Longer lifespan
        frequency: 30, // INCREASED: More frequent particles
        quantity: 4, // INCREASED: More particles per emission
      })
      .setDepth(4)

    // Follow the bullet
    const trailUpdate = () => {
      if (bullet && bullet.active && bullet.body) {
        trail.setPosition(bullet.x, bullet.y)
      } else {
        trail.destroy()
        this.time.removeEvent(trailTimer)
      }
    }

    const trailTimer = this.time.addEvent({
      delay: 16,
      callback: trailUpdate,
      loop: true,
    })

    // Clean up trail when bullet is destroyed
    bullet.on("destroy", () => {
      if (trail) {
        trail.destroy()
      }
      if (trailTimer) {
        this.time.removeEvent(trailTimer)
      }
    })
  }

  rotateCannonToPointer(pointer) {
    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y)
    this.player.setRotation(angle + Math.PI / 2)
  }

  update() {
    if (this.gameState !== "playing") return

    // Player movement
    const moveSpeed = this.currentPlayerSpeed * (1 / 60)

    if (this.cursors.left.isDown) {
      this.player.x -= moveSpeed
      this.player.x = Math.max(50, this.player.x)
    } else if (this.cursors.right.isDown) {
      this.player.x += moveSpeed
      this.player.x = Math.min(this.width - 50, this.player.x)
    }

else if (this.isMobile) {
  if (this.leftHeld) {
    this.player.x -= moveSpeed;
    this.player.x = Math.max(50, this.player.x);
  } else if (this.rightHeld) {
    this.player.x += moveSpeed;
    this.player.x = Math.min(this.width - 50, this.player.x);
  }
}


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

    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.healthOverlay && enemy.active) {
        enemy.healthOverlay.setPosition(enemy.x, enemy.y)
      }

      // Update number text position to follow enemy
      if (enemy.numberText && enemy.active) {
        enemy.numberText.setPosition(enemy.x, enemy.y)
      }
    })

    this.bullets.getChildren().forEach((bullet) => {
      if (!bullet.active) return

      if (bullet.texture.key === "collectible_firebullet") {
        this.createFireballTrail(bullet.x, bullet.y)
      }
    })

    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy.body) return
      // Limit upward rebound
      if (enemy.body.velocity.y < -300) {
        enemy.body.setVelocityY(-300)
      }
      // Limit sideways ricochet
      if (Math.abs(enemy.body.velocity.x) > 120) {
        enemy.body.setVelocityX(enemy.body.velocity.x > 0 ? 120 : -120)
      }
    })
  }

  setEnemyHealthTint(enemy) {
    const ratio = enemy.health / enemy.maxHealth

    let tintColor = 0xffffff // No tint (full health)
    if (ratio <= 0.75) tintColor = 0xd4ff88 // light yellow-green
    if (ratio <= 0.5) tintColor = 0xffd580 // light orange
    if (ratio <= 0.25) tintColor = 0xffa0a0 // soft red

    enemy.setTint(tintColor)
  }

  cleanupGameObjects() {
    // Clean up enemies
    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy || !enemy.body) return

      // Enemies that go off the bottom of the screen
      if (enemy.y > this.height + 100) {
        if (enemy.numberText) enemy.numberText.destroy()
        enemy.disableBody(true, true)
        this.currentEnemyCount--
        return
      }

      // Enemies that go off the sides of the screen
      if (enemy.x < -enemy.width || enemy.x > this.width + enemy.width) {
        if (enemy.numberText) enemy.numberText.destroy()
        enemy.disableBody(true, true)
        this.currentEnemyCount--
        return
      }

      // Enemies that go off the top of the screen (due to setCollideWorldBounds(..., false, ...))
      if (enemy.y < -enemy.displayHeight) {
        if (enemy.numberText) enemy.numberText.destroy()
        enemy.disableBody(true, true)
        this.currentEnemyCount--
        return
      }

      if (enemy.body && enemy.body.velocity && enemy.body.velocity.y < -500) {
        enemy.body.setVelocityY(-500) // Allow very high upward velocity
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
    if (this.gameState === "playing" && this.score >= this.levelThreshold && !this.levelJustCompleted) {
      this.levelJustCompleted = true
      this.completeLevel()
    }
  }

  completeLevel() {
    this.sounds.upgrade.setVolume(0.5).setLoop(false).play()

    this.gameLevel++
    // Show LEVEL UP text
    let levelMessage = "LEVEL UP!"

    if (this.gameLevel === 7) {
      levelMessage = "GAME COMPLETE!"
    }

    const levelUpText = this.add
      .text(this.width / 2, this.height / 2, levelMessage, {
        fontSize: `${48 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: this.gameLevel === 7 ? "#ff4444" : "#00ffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100)

    this.tweens.add({
      targets: levelUpText,
      alpha: 0,
      y: levelUpText.y - 80,
      duration: 1800,
      ease: "Sine.easeInOut",
      onComplete: () => levelUpText.destroy(),
    })

    this.levelThreshold += 50

    if (this.gameLevel <= 5) {
      if (this.gameLevel === 1) {
        this.maxEnemiesThisLevel = 5
      } else if (this.gameLevel === 2) {
        this.maxEnemiesThisLevel = 7
      } else {
        this.maxEnemiesThisLevel = 3
      }

      this.enemiesSpawnedThisLevel = 0
      this.currentEnemyCount = 0

      let newDelay = this.baseSpawnDelay - this.spawnDelayDecrease * (this.gameLevel - 1)
      newDelay = Math.max(newDelay, 800)
      this.spawnTimer.delay = newDelay

      this.updateLevelText()
      this.levelJustCompleted = false
    } else if (this.gameLevel === 6) {
      this.updateLevelText()

      if (this.spawnTimer) this.spawnTimer.destroy()

      this.enemies.children.iterate((enemy) => {
        if (enemy && enemy.active) {
          if (enemy.numberText) enemy.numberText.destroy()
          enemy.disableBody(true, true)
        }
      })

      this.centerText = this.add
        .text(this.width / 2, this.height / 2, "BOSS INCOMING...", {
          fontSize: `${56 * this.scaleFactor}px`,
          fontFamily: "Arial Black",
          fill: "#ff0000",
          align: "center",
        })
        .setOrigin(0.5, 0.5)
        .setDepth(100)

      // Pulsing effect for boss warning
      this.tweens.add({
        targets: this.centerText,
        scaleX: 1.1,
        scaleY: 1.1,
        alpha: { from: 0.7, to: 1 },
        duration: 600,
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
    //console.log("Spawning Boss")

    this.boss = this.enemies.create(this.width / 2, 150, "enemy_boss").setScale(0.4)

    this.boss.setGravityY(0)
    this.boss.setBounce(0)
    this.boss.setCollideWorldBounds(true)
    this.boss.setVelocityX(150)

    this.boss.health = 20
    this.boss.maxHealth = 20
    this.boss.isBoss = true // FIX: Set isBoss on the boss object itself

    // Create boss health bar
    this.createBossHealthBar()

    this.bossBullets = this.physics.add.group()

    // Add boss bullets collision with player RIGHT AFTER creating the group
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

    this.bossFireTimer = this.time.addEvent({
      delay: 1000,
      callback: () => this.fireBossBullet(this.boss),
      callbackScope: this,
      loop: true,
    })

    this.currentEnemyCount = 1

    // Boss entrance effect
    const bossText = this.add
      .text(this.width / 2, this.height / 2 + 100, "BOSS BATTLE!", {
        fontSize: `${44 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ff0000",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100)

    this.tweens.add({
      targets: bossText,
      alpha: 0,
      y: bossText.y - 50,
      duration: 2500,
      onComplete: () => bossText.destroy(),
    })
  }

  createBossHealthBar() {
    // Boss health bar background
    this.bossHealthBg = this.add
      .rectangle(this.width / 2, 160, 320, 25, 0x333333, 0.9)
      .setOrigin(0.5)
      .setDepth(15)

    // Boss health bar fill
    this.bossHealthFill = this.add
      .rectangle(this.width / 2, 160, 320, 25, 0x8b0000)
      .setOrigin(0.5)
      .setDepth(15)

    // Border
    this.bossHealthBorder = this.add
      .rectangle(this.width / 2, 160, 320, 25, 0x666666, 0)
      .setStrokeStyle(3, 0x666666, 0.9)
      .setOrigin(0.5)
      .setDepth(15)

    // Boss label
    this.bossLabel = this.add
      .text(this.width / 2, 135, "BOSS", {
        fontSize: `${28 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        fill: "#ff0000",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(15)
  }

  updateBossHealthBar() {
    if (!this.boss || !this.bossHealthFill) return

    const percentage = this.boss.health / this.boss.maxHealth
    this.bossHealthFill.width = 320 * percentage

    // Change color based on health
    if (percentage > 0.6) {
      this.bossHealthFill.setFillStyle(0x8b0000) // Dark red
    } else if (percentage > 0.3) {
      this.bossHealthFill.setFillStyle(0xff0000) // Red
    } else {
      this.bossHealthFill.setFillStyle(0xff4500) // Orange red - enraged
    }
  }

  fireBossBullet(boss) {
    if (!boss.active) return

    const bullet = this.bossBullets
      .create(boss.x, boss.y + boss.displayHeight / 2, "projectile_cannonball")
      .setScale(0.35)
      .setTint(0x8b0000) // Dark red boss projectile

    bullet.setVelocityY(350)

    this.time.delayedCall(5000, () => {
      if (bullet && bullet.destroy) bullet.destroy()
    })
  }



  increaseScore(points) {
    this.score += points
    this.updateScoreText()
  }

gameOver() {
  this.sounds.background?.stop();
  initiateGameOver.bind(this)({ score: this.score });
}

  showWinScreen() {
    // Stop background music
    if (this.gameMusic) {
      this.gameMusic.stop()
    }

    // Stop timers
    if (this.spawnTimer) this.spawnTimer.destroy()
    if (this.powerUpTimer) this.powerUpTimer.destroy()
    if (this.bossFireTimer) this.bossFireTimer.remove?.()

    initiateGameOverScreen(this, this.score, true) // Call the global game over screen function, indicating win
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
      const scale = Math.max(width / this.bg.displayWidth, height / this.bg.displayHeight)
      this.bg.setScale(scale)
    }

    // Resize player
    if (this.player) {
      const playerScale = 0.35 * this.scaleFactor
      this.player.setScale(playerScale)
      this.player.setPosition(this.player.x, height - 80 * this.scaleFactor)
      this.playerOriginalY = this.player.y // Update original Y for recoil
    }

    // Resize UI elements
    // Top Left UI (Level)
    if (this.levelBg && this.levelText) {
      const levelBgWidth = 120 * this.scaleFactor
      const levelBgHeight = 60 * this.scaleFactor
      const levelX = 15 + levelBgWidth / 2
      const levelY = 15 + levelBgHeight / 2

      this.levelBg.clear()
      this.levelBg.fillStyle(0x333333, 0.9)
      this.levelBg.fillRoundedRect(-levelBgWidth / 2, -levelBgHeight / 2, levelBgWidth, levelBgHeight, 12)
      this.levelBg.lineStyle(4, 0x666666, 1)
      this.levelBg.strokeRoundedRect(-levelBgWidth / 2, -levelBgHeight / 2, levelBgWidth, levelBgHeight, 12)
      this.levelBg.lineStyle(2, 0x888888, 0.8)
      this.levelBg.strokeRoundedRect(
        -levelBgWidth / 2 + 3,
        -levelBgHeight / 2 + 3,
        levelBgWidth - 6,
        levelBgHeight - 6,
        9,
      )
      this.levelBg.setPosition(levelX, levelY)

      const levelFontSize = `${18 * this.scaleFactor}px`
      this.levelText.setPosition(levelX, levelY)
      this.levelText.setFontSize(levelFontSize)
    }

    // Top Center UI (Health & Score)
    if (this.healthBarBg && this.healthText && this.scoreBg && this.scoreText) {
      const healthBgWidth = 320 * this.scaleFactor
      const healthBgHeight = 60 * this.scaleFactor
      const healthX = width / 2
      const healthY = 35 * this.scaleFactor

      this.healthBarBg.clear()
      const percentage = this.currentHealth / this.maxHealth
      let color = 0x228b22
      if (percentage <= 0.3) color = 0xffa500
      if (percentage <= 0.25) color = 0xff0000

      this.healthBarBg.fillStyle(color, 1)
      this.healthBarBg.fillRoundedRect(
        healthX - healthBgWidth / 2,
        healthY - healthBgHeight / 2,
        healthBgWidth * percentage,
        healthBgHeight,
        15,
      )

      const healthFontSize = `${28 * this.scaleFactor}px`
      this.healthText.setPosition(healthX, healthY)
      this.healthText.setFontSize(healthFontSize)

      const scoreBgWidth = 280 * this.scaleFactor
      const scoreBgHeight = 50 * this.scaleFactor
      const scoreY = healthY + 50 * this.scaleFactor

      this.scoreBg.clear()
      this.scoreBg.fillStyle(0x333333, 0.9)
      this.scoreBg.fillRoundedRect(
        healthX - scoreBgWidth / 2,
        scoreY - scoreBgHeight / 2,
        scoreBgWidth,
        scoreBgHeight,
        12,
      )
      this.scoreBg.lineStyle(3, 0x666666, 1)
      this.scoreBg.strokeRoundedRect(
        healthX - scoreBgWidth / 2,
        scoreY - scoreBgHeight / 2,
        scoreBgWidth,
        scoreBgHeight,
        12,
      )

      const scoreFontSize = `${26 * this.scaleFactor}px`
      this.scoreText.setPosition(healthX, scoreY)
      this.scoreText.setFontSize(scoreFontSize)
    }

    // Top Right UI (Powerup Status)
    if (this.vfxBg && this.powerupStatusText) {
      const vfxBgWidth = 140 * this.scaleFactor
      const vfxBgHeight = 50 * this.scaleFactor
      const vfxX = width - 180 * this.scaleFactor
      const vfxY = 35 * this.scaleFactor

      this.vfxBg.clear()
      this.vfxBg.fillStyle(0x333333, 0.9)
      this.vfxBg.fillRoundedRect(-vfxBgWidth / 2, -vfxBgHeight / 2, vfxBgWidth, vfxBgHeight, 10)
      this.vfxBg.lineStyle(3, 0x666666, 1)
      this.vfxBg.strokeRoundedRect(-vfxBgWidth / 2, -vfxBgHeight / 2, vfxBgWidth, vfxBgHeight, 10)
      this.vfxBg.lineStyle(2, 0x888888, 0.8)
      this.vfxBg.strokeRoundedRect(-vfxBgWidth / 2 + 2, -vfxBgHeight / 2 + 2, vfxBgWidth - 4, vfxBgHeight - 4, 8)
      this.vfxBg.setPosition(vfxX, vfxY)

      const powerupStatusFontSize = `${16 * this.scaleFactor}px`
      this.powerupStatusText.setPosition(vfxX, vfxY)
      this.powerupStatusText.setFontSize(powerupStatusFontSize)
    }

    // Status Displays (Speed Boost, Fire Bullet)
    if (this.speedBoostText) {
      const speedBoostFontSize = `${36 * this.scaleFactor}px`
      this.speedBoostText.setPosition(width / 2, 200 * this.scaleFactor)
      this.speedBoostText.setFontSize(speedBoostFontSize)
    }
    if (this.fireBulletText) {
      const fireBulletFontSize = `${32 * this.scaleFactor}px`
      this.fireBulletText.setPosition(width / 2, 160 * this.scaleFactor)
      this.fireBulletText.setFontSize(fireBulletFontSize)
    }

    // Low Health Overlay
    if (this.lowHealthOverlay && this.lowHealthText) {
      this.lowHealthOverlay.setPosition(width / 2, height / 2)
      this.lowHealthOverlay.setDisplaySize(width, height)
      const lowHealthFontSize = `${36 * this.scaleFactor}px`
      this.lowHealthText.setPosition(width / 2, height / 2)
      this.lowHealthText.setFontSize(lowHealthFontSize)
    }

    // Boss Health Bar
    if (this.bossHealthBg && this.bossHealthFill && this.bossHealthBorder && this.bossLabel) {
      this.bossHealthBg.setPosition(width / 2, 160)
      this.bossHealthFill.setPosition(width / 2, 160)
      this.bossHealthBorder.setPosition(width / 2, 160)
      const bossLabelFontSize = `${28 * this.scaleFactor}px`
      this.bossLabel.setPosition(width / 2, 135)
      this.bossLabel.setFontSize(bossLabelFontSize)
      this.updateBossHealthBar() // Update fill width
    }

    // Mobile Controls
    if (this.isMobile) {
      const joyStickRadius = 100 * this.scaleFactor // Use the larger radius
      const joyX = this.isLandscape ? joyStickRadius * 2.5 : joyStickRadius * 2
      const joyY = this.isLandscape ? height - joyStickRadius * 2 : height - joyStickRadius * 3

      if (this.joyStick) {
        this.joyStick.setPosition(joyX, joyY)
        this.joyBase.setPosition(joyX, joyY)
        this.joyThumb.setPosition(joyX, joyY)
        this.joySpokes.forEach((spoke) => spoke.setPosition(joyX, joyY))
      }
    }
  }
resumeGame() {
  this.gameState = "playing";
}
pauseGame() {
  handlePauseGame.bind(this)();
}



}


// Progress loader function
function displayProgressLoader() {
  const width = 320
  const height = 50
  const x = this.game.config.width / 2 - 160
  const y = this.game.config.height / 2 - 50

  const progressBox = this.add.graphics()
  progressBox.fillStyle(0x333333, 0.9)
  progressBox.fillRect(x, y, width, height)

  // Add border
  progressBox.lineStyle(3, 0x666666, 1)
  progressBox.strokeRect(x, y, width, height)

  const loadingText = this.make
    .text({
      x: this.game.config.width / 2,
      y: this.game.config.height / 2 + 20,
      text: "Loading...",
      style: {
        font: "20px Arial Black",
        fill: "#ffffff",
      },
    })
    .setOrigin(0.5, 0.5)

  const progressBar = this.add.graphics()
  this.load.on("progress", (value) => {
    progressBar.clear()
    progressBar.fillStyle(0x888888, 1)
    progressBar.fillRect(x, y, width * value, height)
  })

  this.load.on("complete", () => {
    progressBar.destroy()
    progressBox.destroy()
    loadingText.destroy()
  })
}



const config = {
  type: Phaser.AUTO,
  width: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].width,
  height: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].height,
  scene: [GameScene],
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
    instructions: "Use arrows or touch to move, click to aim and shoot enemies, collect powerups.",
  },
  deviceOrientation: null,
}

// Global _CONFIG object (required by Aicade platform)


// Global placeholder functions (required by Aicade platform)
function addEventListenersPhaser() {
  // Placeholder for adding event listeners
}

function initiateGameOver(data) {
  // Placeholder for game over logic
}

function handlePauseGame() {
  // Placeholder for pause game logic
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" })

    // Game state variables
    this.score = 0
    this.coins = 0
    this.isGameOver = false
    this.player = null
    this.cameras = null
    this.platformGenerator = null
    this.gravityDirection = 1 // 1 for ground, -1 for ceiling

    // Player health system
    this.playerHealth = 100
    this.maxPlayerHealth = 100
    this.invulnerable = false
    this.invulnerabilityTime = 1000

    // Combat system
    this.projectiles = null
    this.lastShotTime = 0
    this.shotCooldown = 300

    // Game objects
    this.enemies = null
    this.collectibles = null
    this.obstacles = null
    this.chests = null
    this.healthDisplay = []

    // UI elements
    this.playerHealthBar = null
    this.coinText = null
    this.ammoText = null

    // Responsive design
    this.scaleFactor = 1
    this.isMobile = false

    this.fKey = null
    this.overlappingChest = null
    this.interactText = null
  }

  // VFX Library methods
  initializeVFX() {
    this.vfx = {
      shakeGameObject: (gameObject, duration, intensity) => {
        this.tweens.add({
          targets: gameObject,
          x: gameObject.x + Phaser.Math.Between(-intensity, intensity),
          y: gameObject.y + Phaser.Math.Between(-intensity, intensity),
          duration: 50,
          repeat: duration / 100,
          yoyo: true,
          onComplete: () => {
            gameObject.x = Math.round(gameObject.x)
            gameObject.y = Math.round(gameObject.y)
          },
        })
      },
      blinkEffect: (gameObject, duration, frequency) => {
        this.tweens.add({
          targets: gameObject,
          alpha: 0.3,
          duration: duration / (frequency * 2),
          repeat: frequency,
          yoyo: true,
          onComplete: () => {
            gameObject.alpha = 1
          },
        })
      },
      scaleGameObject: (gameObject, scale, duration) => {
        const originalScale = gameObject.scaleX
        this.tweens.add({
          targets: gameObject,
          scaleX: originalScale * scale,
          scaleY: originalScale * scale,
          duration: duration / 2,
          yoyo: true,
          ease: "Power2",
        })
      },
      shineEffect: (gameObject, duration, intensity) => {
        this.tweens.add({
          targets: gameObject,
          alpha: 1 + intensity,
          duration: duration / 4,
          repeat: -1,
          yoyo: true,
          ease: "Sine.easeInOut",
        })
      },
    }
  }

  preload() {
    this.isGameOver = false

    addEventListenersPhaser.bind(this)()

    // Load all images from _CONFIG.imageLoader as regular images first
    // This is a fallback for assets not loaded as atlases
    for (const key in _CONFIG.imageLoader) {
      // Only load as image if it's not a spritesheet that will be loaded as an atlas
      if (key !== "coin_spritesheet" && key !== "chest_spritesheet") {
        this.load.image(key, _CONFIG.imageLoader[key])
      }
    }

    for (const key in _CONFIG.soundsLoader) {
      this.load.audio(key, [_CONFIG.soundsLoader[key]])
    }

    // Load coin atlas using proper SOP method
    this.load.atlas("coinAtlas", _CONFIG.imageLoader["coin_spritesheet"], "https://files.catbox.moe/6p9mn6.json")

    // Load chest atlas using proper SOP method
    this.load.atlas("chestAtlas", _CONFIG.imageLoader["chest_spritesheet"], "https://files.catbox.moe/50c03j.json")

    this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png")
    const fontName = "pix"
    const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/"
    this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml")

    this.displayProgressLoader()
  }

  create() {
    // Initialize responsive design
    this.isMobile = !this.sys.game.device.os.desktop
    this.scaleFactor = Math.min(this.game.config.width / 1280, this.game.config.height / 720)

    const groundBaseY = this.game.config.height - 150
    const ceilingBaseY = 150

    // Initialize sounds
    this.sounds = {}
    for (const key in _CONFIG.soundsLoader) {
      this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 })
    }
    this.sounds.background.setVolume(0.1).setLoop(true).play()

    // Initialize VFX
    this.initializeVFX()

    // Create animations
    this.createAnimations()

    // Add background
    this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)

    this.width = this.game.config.width
    this.height = this.game.config.height
    this.bg = this.add.sprite(0, 0, "background").setOrigin(0, 0)
    this.bg.setScrollFactor(0)
    this.bg.displayHeight = this.game.config.height
    this.bg.displayWidth = this.game.config.width

    // Initialize platform generator
    this.platformGenerator = new CavePlatformGenerator(this, {
      levelWidth: 5000,
      playerHeight: 50,
      jumpHeight: 300,
      platformWidthMin: 100,
      platformWidthMax: 300,
      groundVariation: 200,
      minPlatformGap: 80,
      maxPlatformGap: 120,
      minCeilingHeight: 80,
      maxCeilingHeight: 250,
      minVerticalClearance: 80,
      platformHeight: 30,
      groundBaseY: groundBaseY,
      ceilingBaseY: ceilingBaseY,
    })

    this.platformGenerator.generateUnevenGround()
    this.platformGenerator.generateCeilingPlatforms()

    // Create player
    this.player = this.physics.add.sprite(100, groundBaseY - 50, "player").setOrigin(0, 0)
    this.player.setDisplaySize(100 * this.scaleFactor, 100 * this.scaleFactor)
    this.player.setCollideWorldBounds(false)
    this.physics.add.collider(this.player, this.platformGenerator.platforms)

    // Create game object groups
    this.enemies = this.physics.add.group()
    this.collectibles = this.physics.add.group()
    this.obstacles = this.physics.add.group()
    this.projectiles = this.physics.add.group()
    this.chests = this.physics.add.group()

    // Add physics collisions for all objects with platforms
    this.physics.add.collider(this.collectibles, this.platformGenerator.platforms)
    this.physics.add.collider(this.chests, this.platformGenerator.platforms)
    this.physics.add.collider(this.obstacles, this.platformGenerator.platforms)

    // Setup camera
    this.cameras.main.setBounds(0, 0, this.platformGenerator.config.levelWidth, this.game.config.height)
    this.cameras.main.startFollow(this.player, true)

    // Create UI elements
    this.createUI()

    // Setup input
    this.cursors = this.input.keyboard.createCursorKeys()
    this.toggleKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
    this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    this.input.keyboard.disableGlobalCapture()

    // Add pause button
    this.pauseButton = this.add
      .sprite(this.game.config.width - 60, 60, "pauseButton")
      .setOrigin(0.5, 0.5)
      .setDepth(1)
    this.pauseButton.setInteractive({ cursor: "pointer" })
    this.pauseButton.setScale(3 * this.scaleFactor)
    this.pauseButton.on("pointerdown", () => this.pauseGame())
    this.pauseButton.setScrollFactor(0)

    // Spawn initial game objects
    this.spawnGameObjects()

    // Setup collisions
    this.setupCollisions()
  }

  createAnimations() {
    // Create coin spinning animation using atlas frames
    this.anims.create({
      key: "coin_spin",
      frames: [
        { key: "coinAtlas", frame: "tile0.png" },
        { key: "coinAtlas", frame: "tile1.png" },
        { key: "coinAtlas", frame: "tile2.png" },
        { key: "coinAtlas", frame: "tile3.png" },
        { key: "coinAtlas", frame: "tile4.png" },
        { key: "coinAtlas", frame: "tile5.png" },
      ],
      frameRate: this.isMobile ? 8 : 10,
      repeat: -1,
    })

    // Create chest opening animation using atlas frames
    // Assuming frames are named tile0.png to tile6.png based on previous 7-frame animation
    this.anims.create({
      key: "chest_open",
      frames: [
        { key: "chestAtlas", frame: "tile0.png" },
        { key: "chestAtlas", frame: "tile1.png" },
        { key: "chestAtlas", frame: "tile2.png" },
        { key: "chestAtlas", frame: "tile3.png" },
        { key: "chestAtlas", frame: "tile4.png" },
        { key: "chestAtlas", frame: "tile5.png" },
        { key: "chestAtlas", frame: "tile6.png" },
      ],
      frameRate: 10,
      repeat: 0, // Play once
    })
  }

  createUI() {
    // Score display
    this.scoreText = this.add
      .bitmapText(this.width / 2, 50, "pixelfont", "Score: 0", 64 * this.scaleFactor)
      .setOrigin(0.5, 0.5)
    this.scoreText.setDepth(11).setScrollFactor(0)

    // Coin display
    this.coinText = this.add
      .bitmapText(this.width - 200, 50, "pixelfont", "Coins: 0", 48 * this.scaleFactor)
      .setOrigin(0.5, 0.5)
    this.coinText.setDepth(11).setScrollFactor(0)

    // Player health bar
    this.createPlayerHealthBar()

    // Instructions
    this.instructionText = this.add
      .bitmapText(
        this.width / 2,
        this.height - 50,
        "pixelfont",
        "X: Shoot | SPACE: Switch Gravity | Arrows: Move",
        32 * this.scaleFactor,
      )
      .setOrigin(0.5, 0.5)
    this.instructionText.setDepth(11).setScrollFactor(0)
  }

  createPlayerHealthBar() {
    // Health bar background
    this.playerHealthBarBg = this.add
      .rectangle(200, 100, 200 * this.scaleFactor, 20 * this.scaleFactor, 0x333333)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(11)

    // Health bar fill
    this.playerHealthBar = this.add
      .rectangle(200, 100, 200 * this.scaleFactor, 20 * this.scaleFactor, 0x00ff00)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(12)

    // Health text
    this.healthText = this.add
      .bitmapText(50, 100, "pixelfont", "HP:", 48 * this.scaleFactor)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(11)
  }

  createEnemyHealthBar(enemy) {
    // Health bar background
    const healthBarBg = this.add
      .rectangle(enemy.x, enemy.y - 40, 60, 8, 0x333333)
      .setOrigin(0.5, 0.5)
      .setDepth(10)

    // Health bar fill
    const healthBar = this.add
      .rectangle(enemy.x, enemy.y - 40, 60, 8, 0xff0000)
      .setOrigin(0.5, 0.5)
      .setDepth(11)

    enemy.healthBarBg = healthBarBg
    enemy.healthBar = healthBar
    enemy.health = 50
    enemy.maxHealth = 50
  }

  updatePlayerHealthBar() {
    const healthPercentage = this.playerHealth / this.maxPlayerHealth
    this.playerHealthBar.displayWidth = 200 * this.scaleFactor * healthPercentage

    // Change color based on health
    if (healthPercentage > 0.6) {
      this.playerHealthBar.setFillStyle(0x00ff00) // Green
    } else if (healthPercentage > 0.3) {
      this.playerHealthBar.setFillStyle(0xffff00) // Yellow
    } else {
      this.playerHealthBar.setFillStyle(0xff0000) // Red
    }
  }

  updateEnemyHealthBar(enemy) {
    if (enemy.healthBar && enemy.healthBarBg) {
      const healthPercentage = enemy.health / enemy.maxHealth
      enemy.healthBar.displayWidth = 60 * healthPercentage

      // Update position to follow enemy
      enemy.healthBarBg.x = enemy.x
      enemy.healthBarBg.y = enemy.y - 40
      enemy.healthBar.x = enemy.x
      enemy.healthBar.y = enemy.y - 40
    }
  }

  update() {
    if (this.isGameOver) return

    // Player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200)
      this.player.setFlipX(true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200)
      this.player.setFlipX(false)
    } else {
      this.player.setVelocityX(0)
    }

    // Shooting
    if (Phaser.Input.Keyboard.JustDown(this.shootKey)) {
      this.shootProjectile()
    }

    // Gravity switching
    if (Phaser.Input.Keyboard.JustDown(this.toggleKey)) {
      this.gravityDirection *= -1
      this.physics.world.gravity.y = 400 * this.gravityDirection
      this.player.setVelocityY(0)
      this.sounds.jump.play()
      this.vfx.shakeGameObject(this.player, 200, 5)
    }

    // Jumping
    if (this.cursors.up.isDown && this.player.body.touching.down && this.gravityDirection === 1) {
      this.player.setVelocityY(-300)
      this.sounds.jump.play()
    } else if (this.cursors.up.isDown && this.player.body.touching.up && this.gravityDirection === -1) {
      this.player.setVelocityY(300)
      this.sounds.jump.play()
    }

    // Check for game over conditions
    if (this.player.y > this.game.config.height + 100 || this.player.y < -100) {
      this.takeDamage(this.maxPlayerHealth) // Instant death for falling
    }

    // Update camera follow
    this.cameras.main.scrollX = this.player.x - this.game.config.width / 4

    // Update projectiles
    this.updateProjectiles()

    // Spawn more objects as player progresses
    this.spawnObjectsBasedOnProgress()

    // Update enemy AI and health bars
    this.updateEnemies()

    // Update UI
    this.updatePlayerHealthBar()

    // Handle chest interaction
    if (this.overlappingChest && Phaser.Input.Keyboard.JustDown(this.fKey)) {
      this.openChest(this.player, this.overlappingChest)
      this.clearChestOverlap()
    }

    // Clear interact text if player moves away from chest
    if (this.interactText && this.interactText.visible && !this.overlappingChest) {
      // Check if player is still overlapping any chest
      let isPlayerOverlappingAnyChest = false
      this.physics
        .overlapRect(this.player.x, this.player.y, this.player.width, this.player.height, true, true)
        .forEach((body) => {
          if (this.chests.contains(body.gameObject) && !body.gameObject.opened) {
            isPlayerOverlappingAnyChest = true
          }
        })

      if (!isPlayerOverlappingAnyChest) {
        this.clearChestOverlap()
      }
    }
  }

  shootProjectile() {
    const currentTime = this.time.now
    if (currentTime - this.lastShotTime < this.shotCooldown) return

    this.lastShotTime = currentTime
    this.sounds.shoot.play()

    const direction = this.player.flipX ? -1 : 1
    const projectile = this.projectiles.create(this.player.x + direction * 30, this.player.y + 25, "projectile")

    projectile.setScale(0.05 * this.scaleFactor)
    projectile.setVelocityX(direction * 400)
    projectile.body.setSize(20, 20)

    // Add trail effect
    this.vfx.shineEffect(projectile, 1000, 0.3)

    // Destroy projectile after 3 seconds
    this.time.delayedCall(3000, () => {
      if (projectile.active) {
        projectile.destroy()
      }
    })
  }

  updateProjectiles() {
    this.projectiles.children.entries.forEach((projectile) => {
      if (!projectile.active) return

      // Destroy projectile if it goes off screen
      if (
        projectile.x < this.cameras.main.scrollX - 100 ||
        projectile.x > this.cameras.main.scrollX + this.game.config.width + 100
      ) {
        projectile.destroy()
      }
    })
  }

  spawnGameObjects() {
    // Spawn collectibles with coin animation using atlas
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(200, this.platformGenerator.config.levelWidth - 200)
      const groundY = this.platformGenerator.getGroundHeightAtX(x)
      const collectible = this.collectibles.create(x, groundY - 40, "coinAtlas", "tile0.png")
      collectible.setScale(0.2 * this.scaleFactor) // Smaller scale for proper size
      collectible.body.setSize(60, 60) // Adjust hitbox for new scale
      collectible.setBounce(0.3)
      collectible.setCollideWorldBounds(true)
      collectible.play("coin_spin")
    }

    // // Spawn treasure chests using atlas
    // for (let i = 0; i < 8; i++) {
    //   const x = Phaser.Math.Between(500, this.platformGenerator.config.levelWidth - 500)
    //   const groundY = this.platformGenerator.getGroundHeightAtX(x)
    //   const chest = this.chests.create(x, groundY - 35, "chestAtlas", "tile0.png") // Use chestAtlas and initial frame
    //   chest.setScale(0.2 * this.scaleFactor)
    //   chest.body.setSize(50, 40)
    //   chest.setBounce(0)
    //   chest.setCollideWorldBounds(true)
    //   chest.opened = false
    //   // chest.setFrame(0) // No longer needed as we set initial frame in create
    // }

    // Spawn enemies with health bars
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(300, this.platformGenerator.config.levelWidth - 300)
      const groundY = this.platformGenerator.getGroundHeightAtX(x)
      const enemyType =  "enemy"
      const enemy = this.enemies.create(x, groundY - 60, enemyType)
      enemy.setScale(0.3 * this.scaleFactor)
      enemy.body.setSize(100, 100)
      enemy.setVelocityX(Phaser.Math.Between(-50, 50))
      enemy.patrolDirection = enemy.body.velocity.x > 0 ? 1 : -1
      enemy.patrolDistance = Phaser.Math.Between(100, 200)
      enemy.startX = x

      // Create health bar for enemy
      this.createEnemyHealthBar(enemy)
    }

    // Spawn obstacles (spikes)
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(400, this.platformGenerator.config.levelWidth - 400)
      const groundY = this.platformGenerator.getGroundHeightAtX(x)
      const obstacle = this.obstacles.create(x, groundY - 25, "avoidable")
      obstacle.setScale(0.1 * this.scaleFactor)
      obstacle.body.setSize(30, 30)
      obstacle.body.setImmovable(true)
    }
  }

  spawnObjectsBasedOnProgress() {
    const playerProgress = this.player.x

    // Spawn more collectibles as player progresses
    if (Math.random() < 0.001 && playerProgress > 1000) {
      const x = playerProgress + Phaser.Math.Between(500, 800)
      const groundY = this.platformGenerator.getGroundHeightAtX(x)
      if (x < this.platformGenerator.config.levelWidth) {
        const collectible = this.collectibles.create(x, groundY - 40, "coinAtlas", "tile0.png")
        collectible.setScale(0.3 * this.scaleFactor)
        collectible.body.setSize(60, 60)
        collectible.setBounce(0.3)
        collectible.setCollideWorldBounds(true)
        collectible.play("coin_spin")
      }
    }
  }

  updateEnemies() {
    this.enemies.children.entries.forEach((enemy) => {
      if (!enemy.active) return

      // Simple patrol AI
      if (Math.abs(enemy.x - enemy.startX) > enemy.patrolDistance) {
        enemy.patrolDirection *= -1
      }

      enemy.setVelocityX(enemy.patrolDirection * 30)
      enemy.setFlipX(enemy.patrolDirection < 0)

      // Update health bar position
      this.updateEnemyHealthBar(enemy)
    })
  }

  setupCollisions() {
    // Player collects collectibles
    this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this)

    // Player opens chests
    this.physics.add.overlap(this.player, this.chests, this.handleChestOverlap, null, this)

    // Player takes damage from enemies
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)

    // Player takes damage from obstacles
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this)

    // Projectiles hit enemies
    this.physics.add.overlap(this.projectiles, this.enemies, this.projectileHitEnemy, null, this)



    // Enemies collide with platforms
    this.physics.add.collider(this.enemies, this.platformGenerator.platforms)
  }

  collectItem(player, collectible) {
    collectible.destroy()
    this.coins += 1
    this.updateScore(10)
    this.sounds.collect.play()

    // VFX effect
    this.vfx.scaleGameObject(player, 1.1, 200)
    this.updateCoinDisplay()
  }

  handleChestOverlap(player, chest) {
    if (chest.opened) return

    this.overlappingChest = chest
    if (!this.interactText) {
      this.interactText = this.add
        .bitmapText(chest.x, chest.y - 80, "pixelfont", "Press F to open", 32 * this.scaleFactor)
        .setOrigin(0.5, 0.5)
        .setTint(0xffffff)
        .setDepth(10)
    } else {
      this.interactText.setPosition(chest.x, chest.y - 80)
      this.interactText.setText("Press F to open")
      this.interactText.setVisible(true)
    }
  }

  clearChestOverlap() {
    if (this.overlappingChest) {
      this.overlappingChest = null
    }
    if (this.interactText) {
      this.interactText.setVisible(false)
    }
  }

  openChest(player, chest) {
    chest.opened = true
    chest.play("chest_open") // Play the atlas animation
    this.sounds.chest_open.play()

    // Give coins
    const coinsEarned = Phaser.Math.Between(5, 15)
    this.coins += coinsEarned
    this.updateScore(coinsEarned * 5)

    // Create floating text
    const floatingText = this.add
      .bitmapText(chest.x, chest.y - 60, "pixelfont", `+${coinsEarned} coins`, 32)
      .setOrigin(0.5, 0.5)
      .setTint(0xffd700)

    this.tweens.add({
      targets: floatingText,
      y: floatingText.y - 50,
      alpha: 0,
      duration: 1500,
      onComplete: () => floatingText.destroy(),
    })

    this.updateCoinDisplay()
    this.vfx.shineEffect(chest, 1000, 0.5)

    // Destroy the chest after animation (or immediately if no animation)
    // The chest_open animation has 7 frames at 10fps, so ~700ms duration
    this.time.delayedCall(700, () => {
      if (chest.active) {
        chest.destroy()
      }
    })
  }

  projectileHitEnemy(projectile, enemy) {
    projectile.destroy()

    // Damage enemy
    enemy.health -= 25
    this.sounds.damage.play()

    // VFX effects
    this.vfx.shakeGameObject(enemy, 200, 8)
    this.vfx.blinkEffect(enemy, 500, 3)

    // Update enemy health bar
    this.updateEnemyHealthBar(enemy)

    // Destroy enemy if health is 0
    if (enemy.health <= 0) {
      // Clean up health bar
      if (enemy.healthBar) enemy.healthBar.destroy()
      if (enemy.healthBarBg) enemy.healthBarBg.destroy()

      enemy.destroy()
      this.updateScore(50)
    }
  }

  projectileHitPlatform(projectile, platform) {
    projectile.destroy()
  }

  hitEnemy(player, enemy) {
    if (!this.invulnerable) {
      this.takeDamage(20)
      this.sounds.damage.play()

      // Knockback effect
      const knockbackForce = player.x < enemy.x ? -200 : 200
      player.setVelocityX(knockbackForce)

      // VFX effects
      this.vfx.shakeGameObject(player, 300, 10)
      this.vfx.blinkEffect(player, 1000, 5)
    }
  }

  hitObstacle(player, obstacle) {
    if (!this.invulnerable) {
      this.takeDamage(15)
      this.sounds.damage.play()

      // VFX effects
      this.vfx.shakeGameObject(player, 300, 10)
      this.vfx.blinkEffect(player, 1000, 5)
    }
  }

  takeDamage(amount) {
    if (this.invulnerable) return

    this.playerHealth -= amount
    this.playerHealth = Math.max(0, this.playerHealth)

    if (this.playerHealth <= 0) {
      this.gameOver()
    } else {
      // Make player temporarily invulnerable
      this.invulnerable = true
      this.time.delayedCall(this.invulnerabilityTime, () => {
        this.invulnerable = false
      })
    }
  }

  updateScore(points) {
    this.score += points
    this.gamePoint = this.score
    this.updateScoreText()
  }

  updateScoreText() {
    this.scoreText.setText(`Score: ${this.score}`)
  }

  updateCoinDisplay() {
    this.coinText.setText(`Coins: ${this.coins}`)
  }

  gameOver() {
    this.isGameOver = true
    this.sounds.background.stop()
    this.sounds.lose.play()

    // Stop all movement
    this.player.setVelocity(0, 0)
    this.enemies.children.entries.forEach((enemy) => {
      enemy.setVelocity(0, 0)
    })

    initiateGameOver.bind(this)({
      score: this.score,
    })
  }

  pauseGame() {
    handlePauseGame.bind(this)()
  }

  displayProgressLoader() {
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
    this.load.on("fileprogress", (file) => {})
    this.load.on("complete", () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
    })
  }
}

class CavePlatformGenerator {
  constructor(scene, config) {
    this.scene = scene
    this.config = {
      levelWidth: config.levelWidth || 5000,
      playerHeight: config.playerHeight || 50,
      jumpHeight: config.jumpHeight || 300,
      platformWidthMin: config.platformWidthMin || 100,
      platformWidthMax: config.platformWidthMax || 300,
      groundVariation: config.groundVariation || 200,
      minPlatformGap: config.minPlatformGap || 80,
      maxPlatformGap: config.maxPlatformGap || 120,
      minCeilingHeight: config.minCeilingHeight || 80,
      maxCeilingHeight: config.maxCeilingHeight || 250,
      minVerticalClearance: config.minVerticalClearance || (config.playerHeight || 50) + 30,
      platformHeight: config.platformHeight || 30,
      groundBaseY: config.groundBaseY || scene.game.config.height - 150,
      ceilingBaseY: config.ceilingBaseY || 150,
    }
    this.platforms = []
    this.groundSegments = []
    this.ceilingSegments = []
  }

  generateUnevenGround() {
    let currentX = 0
    let currentHeight = this.config.groundBaseY
    const initialPlatformWidth = 500
    this.createGroundSegment(currentX, this.config.groundBaseY, initialPlatformWidth)
    currentX += initialPlatformWidth

    while (currentX < this.config.levelWidth) {
      let segmentWidth = Phaser.Math.Between(150, 300)
      const heightChange = Phaser.Math.Between(-this.config.groundVariation, this.config.groundVariation)
      let newHeight = this.config.groundBaseY + heightChange
      newHeight = Phaser.Math.Clamp(
        newHeight,
        this.config.groundBaseY - this.config.groundVariation,
        this.config.groundBaseY + 20,
      )

      if (Math.abs(newHeight - currentHeight) > 40) {
        const intermediateHeight = currentHeight + (newHeight - currentHeight) * 0.5
        const intermediateWidth = segmentWidth * 0.3
        this.createGroundSegment(currentX, intermediateHeight, intermediateWidth)
        currentX += intermediateWidth
        segmentWidth -= intermediateWidth
      }

      this.createGroundSegment(currentX, newHeight, segmentWidth)
      currentX += segmentWidth
      currentHeight = newHeight
    }
  }

  createGroundSegment(x, topY, width) {
    const groundHeight = this.scene.game.config.height - topY
    this.groundSegments.push({
      x: x,
      width: width,
      topY: topY,
      endX: x + width,
    })

    const grassHeight = 20
    const dirtHeight = 36
    const groundHeightColor = groundHeight - grassHeight - dirtHeight

    const grass = this.scene.add.tileSprite(x, topY, width, grassHeight, "platform_grass").setOrigin(0, 0)
    const dirt = this.scene.add.tileSprite(x, topY + grassHeight, width, dirtHeight, "platform").setOrigin(0, 0)
    const ground = this.scene.add
      .rectangle(x, topY + grassHeight + dirtHeight, width, groundHeightColor, 0x8b4513)
      .setOrigin(0, 0)

    this.platforms.push(grass, dirt, ground)
    this.scene.physics.add.existing(grass, true)
    this.scene.physics.add.existing(dirt, true)
    this.scene.physics.add.existing(ground, true)
  }

  generateCeilingPlatforms() {
    let currentX = 0
    let currentHeight = this.config.ceilingBaseY
    const initialPlatformWidth = 500
    this.createCeilingSegment(currentX, this.config.ceilingBaseY, initialPlatformWidth)
    currentX += initialPlatformWidth

    while (currentX < this.config.levelWidth) {
      let segmentWidth = Phaser.Math.Between(150, 300)
      const heightChange = Phaser.Math.Between(-this.config.groundVariation, this.config.groundVariation)
      let newHeight = this.config.ceilingBaseY - heightChange
      newHeight = Phaser.Math.Clamp(
        newHeight,
        this.config.ceilingBaseY - 20,
        this.config.ceilingBaseY + this.config.groundVariation,
      )

      if (Math.abs(newHeight - currentHeight) > 40) {
        const intermediateHeight = currentHeight + (newHeight - currentHeight) * 0.5
        const intermediateWidth = segmentWidth * 0.3
        this.createCeilingSegment(currentX, intermediateHeight, intermediateWidth)
        currentX += intermediateWidth
        segmentWidth -= intermediateWidth
      }

      if (this.isValidCeilingPosition(currentX, newHeight, segmentWidth)) {
        this.createCeilingSegment(currentX, newHeight, segmentWidth)
        currentX += segmentWidth
        currentHeight = newHeight
      } else {
        currentX += this.config.minPlatformGap
      }
    }
  }

  createCeilingSegment(x, bottomY, width) {
    const ceilingHeight = bottomY
    this.ceilingSegments.push({
      x: x,
      width: width,
      bottomY: bottomY,
      endX: x + width,
    })

    const grassHeight = 20
    const dirtHeight = 36
    const ceilingHeightColor = ceilingHeight - grassHeight - dirtHeight

    const grass = this.scene.add
      .tileSprite(x, bottomY - grassHeight, width, grassHeight, "platform_grass")
      .setOrigin(0, 0)
    const dirt = this.scene.add
      .tileSprite(x, bottomY - grassHeight - dirtHeight, width, dirtHeight, "platform")
      .setOrigin(0, 0)
    const ceiling = this.scene.add.rectangle(x, 0, width, ceilingHeightColor, 0x8b4513).setOrigin(0, 0)

    this.platforms.push(grass, dirt, ceiling)
    this.scene.physics.add.existing(grass, true)
    this.scene.physics.add.existing(dirt, true)
    this.scene.physics.add.existing(ceiling, true)
  }

  isValidCeilingPosition(x, bottomY, width) {
    const ceilingTopY = bottomY - this.config.platformHeight
    if (ceilingTopY > this.scene.game.config.height - 100) {
      return false
    }
    return !this.checkGroundCeilingOverlap(x, bottomY, width)
  }

  checkGroundCeilingOverlap(platformX, platformBottomY, platformWidth) {
    for (const segment of this.groundSegments) {
      if (platformX < segment.endX && platformX + platformWidth > segment.x) {
        const platformTopY = platformBottomY - this.config.platformHeight
        const groundTopY = segment.topY
        if (groundTopY - platformTopY < this.config.minVerticalClearance + this.config.playerHeight) {
          return true
        }
      }
    }
    return false
  }

  getGroundHeightAtX(x) {
    for (const segment of this.groundSegments) {
      if (x >= segment.x && x < segment.endX) {
        return segment.topY
      }
    }
    return this.config.groundBaseY
  }

  getCeilingHeightAtX(x) {
    for (const segment of this.ceilingSegments) {
      if (x >= segment.x && x < segment.endX) {
        return segment.bottomY
      }
    }
    return this.config.ceilingBaseY
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
    progressBar.fillStyle(0x364afe, 1)
    progressBar.fillRect(x, y, width * value, height)
  })
  this.load.on("fileprogress", (file) => {})
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
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    orientation: Phaser.Scale.Orientation.LANDSCAPE,
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
  dataObject: {
    name: _CONFIG.title,
    description: _CONFIG.description,
    instructions: _CONFIG.instructions,
  },
  deviceOrientation: _CONFIG.deviceOrientation === "landscape",
}

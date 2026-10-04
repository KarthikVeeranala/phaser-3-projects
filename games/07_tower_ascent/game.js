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
class SmartLadderSystem {
constructor(scene) {
    this.scene = scene
    this.maxJumpDistance = 4
    this.maxJumpHeight = 3
    this.ladderPlacements = []
    this.maxLadders = 10
    this.minLadderDistance = 3 // Min distance between ladders, in tiles
}

  // Main function to analyze and place ladders
  analyzePlatformsAndPlaceLadders() {
    console.log("🪜 Starting smart ladder analysis...")

    // Step 1: Extract platform data from the maze
    const platforms = this.extractPlatformData()
    console.log(`Found ${platforms.length} platforms:`, platforms)

    // Step 2: Analyze connectivity between platforms
    const connectivityMap = this.analyzeConnectivity(platforms)
    console.log("Connectivity analysis:", connectivityMap)

    // Step 3: Identify gaps that need ladders
    const requiredLadders = this.identifyRequiredLadders(platforms, connectivityMap)
    console.log(`Need ${requiredLadders.length} ladders:`, requiredLadders)

    // Step 4: Place the ladders
    this.placeLadders(requiredLadders)

    console.log("✅ Smart ladder placement complete!")
  }

  // Extract platform information from the maze
  extractPlatformData() {
    const platforms = []
    const maze = this.scene.maze

    for (let row = 0; row < maze.length; row++) {
      let platformStart = null

      for (let col = 0; col < maze[row].length; col++) {
        const isWall = maze[row][col] === 1
        const hasSpaceAbove = row > 0 && maze[row - 1][col] === 0
        const hasSpaceBelow = row < maze.length - 1 && maze[row + 1][col] === 0

        // This is a platform tile (wall with space above)
        if (isWall && hasSpaceAbove) {
          if (platformStart === null) {
            platformStart = col
          }
        } else {
          // End of platform or no platform
          if (platformStart !== null) {
            platforms.push({
              row: row,
              startCol: platformStart,
              endCol: col - 1,
              length: col - platformStart,
              centerCol: Math.floor((platformStart + col - 1) / 2),
            })
            platformStart = null
          }
        }
      }

      // Handle platform that extends to the edge
      if (platformStart !== null) {
        platforms.push({
          row: row,
          startCol: platformStart,
          endCol: maze[row].length - 1,
          length: maze[row].length - platformStart,
          centerCol: Math.floor((platformStart + maze[row].length - 1) / 2),
        })
      }
    }

    // Sort platforms by row (top to bottom)
    return platforms.sort((a, b) => a.row - b.row)
  }

  // Analyze which platforms can be reached from others through jumping
  analyzeConnectivity(platforms) {
    const connectivity = new Map()

    platforms.forEach((platform, index) => {
      connectivity.set(index, {
        platform: platform,
        reachableByJumping: [],
        reachableByFalling: [],
        needsLadder: [],
      })
    })

    // Check each platform pair
    for (let i = 0; i < platforms.length; i++) {
      for (let j = 0; j < platforms.length; j++) {
        if (i === j) continue

        const fromPlatform = platforms[i]
        const toPlatform = platforms[j]
        const connection = connectivity.get(i)

        if (this.canReachByJumping(fromPlatform, toPlatform)) {
          connection.reachableByJumping.push(j)
        } else if (this.canReachByFalling(fromPlatform, toPlatform)) {
          connection.reachableByFalling.push(j)
        } else if (this.shouldConnectWithLadder(fromPlatform, toPlatform)) {
          connection.needsLadder.push(j)
        }
      }
    }

    return connectivity
  }

  // Check if player can jump from one platform to another
  canReachByJumping(fromPlatform, toPlatform) {
    const horizontalDistance = this.getMinHorizontalDistance(fromPlatform, toPlatform)
    const verticalDistance = fromPlatform.row - toPlatform.row // Positive = jumping up

    // Can't jump to platforms that are too far horizontally
    if (horizontalDistance > this.maxJumpDistance) {
      return false
    }

    // Can't jump up too high
    if (verticalDistance > 0 && verticalDistance > this.maxJumpHeight) {
      return false
    }

    // Can jump down from any reasonable height
    if (verticalDistance < 0) {
      return horizontalDistance <= this.maxJumpDistance
    }

    // For upward jumps, use a formula that considers both horizontal and vertical distance
    const jumpDifficulty = horizontalDistance + verticalDistance * 1.5
    return jumpDifficulty <= this.maxJumpDistance + this.maxJumpHeight
  }

  // Check if player can reach by falling (no horizontal movement needed)
  canReachByFalling(fromPlatform, toPlatform) {
    // Can only fall down
    if (fromPlatform.row >= toPlatform.row) {
      return false
    }

    // Check if platforms overlap horizontally
    return this.platformsOverlapHorizontally(fromPlatform, toPlatform)
  }

  // Determine if two platforms should be connected with a ladder
shouldConnectWithLadder(fromPlatform, toPlatform) {
    const verticalDistance = Math.abs(fromPlatform.row - toPlatform.row);

    // Only connect platforms that are reasonably close vertically.
    if (verticalDistance < 4 || verticalDistance > 8) { 
        return false;
    }

    // The NEW CRITICAL CHECK:
    // Only return true if the platforms overlap horizontally.
    // This prevents ladders between platforms that are far apart on the X-axis.
    if (this.platformsOverlapHorizontally(fromPlatform, toPlatform)) {
        return true;
    }

    return false;
}

  // Get minimum horizontal distance between two platforms
  getMinHorizontalDistance(platform1, platform2) {
    // If platforms overlap, distance is 0
    if (this.platformsOverlapHorizontally(platform1, platform2)) {
      return 0
    }

    // Calculate gap between platforms
    if (platform1.endCol < platform2.startCol) {
      return platform2.startCol - platform1.endCol
    } else {
      return platform1.startCol - platform2.endCol
    }
  }

  // Check if two platforms overlap horizontally
  platformsOverlapHorizontally(platform1, platform2) {
    return !(platform1.endCol < platform2.startCol || platform2.endCol < platform1.startCol)
  }

  // Identify where ladders are actually needed
// Replace the existing identifyRequiredLadders function with this new version

identifyRequiredLadders(platforms, connectivityMap) {
    const potentialLadders = [];
    const processedConnections = new Set();

    // Step 1: Collect ALL possible ladder locations from the entire map.
    connectivityMap.forEach((connection, fromIndex) => {
        connection.needsLadder.forEach((toIndex) => {
            const connectionKey = `${Math.min(fromIndex, toIndex)}-${Math.max(fromIndex, toIndex)}`;

            if (!processedConnections.has(connectionKey)) {
                processedConnections.add(connectionKey);
                const fromPlatform = platforms[fromIndex];
                const toPlatform = platforms[toIndex];
                const placement = this.calculateOptimalLadderPlacement(fromPlatform, toPlatform);

                if (placement) {
                    potentialLadders.push({ fromPlatform: fromIndex, toPlatform: toIndex, ...placement });
                }
            }
        });
    });

    // Step 2: Shuffle the list. This removes the top-down bias and ensures
    // ladders are chosen from all over the map, not just the top.
    Phaser.Utils.Array.Shuffle(potentialLadders);

    const finalLadders = [];
    // Step 3: Iterate through the shuffled list and select the final ladders.
    for (const ladder of potentialLadders) {
        // Stop once we've reached the maximum number of ladders.
        if (finalLadders.length >= this.maxLadders) {
            break;
        }

        // CRITICAL CHECK: Use our new helper to ensure ladders are spaced out.
        if (!this.isLadderTooClose(ladder, finalLadders)) {
            finalLadders.push(ladder);
        }
    }

    // The critical path check is preserved for gameplay integrity.
    const criticalLadders = this.ensureCriticalPathConnectivity(platforms, finalLadders);
    const combinedLadders = [...finalLadders, ...criticalLadders];
    
    // Return the final list, ensuring we don't exceed the max limit.
    return combinedLadders.slice(0, this.maxLadders);
}
  // Calculate the optimal position for a ladder between two platforms
  calculateOptimalLadderPlacement(lowerPlatform, upperPlatform) {
    // Ensure lowerPlatform is actually lower
    if (lowerPlatform.row < upperPlatform.row) {
      ;[lowerPlatform, upperPlatform] = [upperPlatform, lowerPlatform]
    }

    const verticalGap = lowerPlatform.row - upperPlatform.row
    if (verticalGap < 2) return null // Too close for a ladder

    // Find the best horizontal position
    let bestCol = null
    let bestScore = -1

    // Try positions where platforms might overlap or are close
    const searchStart = Math.max(Math.min(lowerPlatform.startCol, upperPlatform.startCol) - 1, 1)
    const searchEnd = Math.min(Math.max(lowerPlatform.endCol, upperPlatform.endCol) + 1, this.scene.cols - 2)

    for (let col = searchStart; col <= searchEnd; col++) {
      const score = this.scoreLadderPosition(col, lowerPlatform, upperPlatform)
      if (score > bestScore) {
        bestScore = score
        bestCol = col
      }
    }

    if (bestCol === null) return null

return {
  col: bestCol,
  startRow: upperPlatform.row,     // CORRECTED: Starts AT the upper platform's surface
  endRow: lowerPlatform.row - 1,   // End just above lower platform
  length: lowerPlatform.row - upperPlatform.row, // CORRECTED: Adjusted length
}
  }

  // Score a potential ladder position (higher score = better position)
  scoreLadderPosition(col, lowerPlatform, upperPlatform) {
    let score = 0

    // Check if the ladder path is clear
    for (let row = upperPlatform.row + 1; row < lowerPlatform.row; row++) {
      if (this.scene.maze[row][col] === 1) {
        return -1000 // Path blocked
      }
    }

    // Prefer positions closer to platform centers
    const lowerDistance = Math.abs(col - lowerPlatform.centerCol)
    const upperDistance = Math.abs(col - upperPlatform.centerCol)
    score += 10 - lowerDistance - upperDistance

    // Prefer positions that are accessible from both platforms
    const lowerAccessible = col >= lowerPlatform.startCol && col <= lowerPlatform.endCol
    const upperAccessible = col >= upperPlatform.startCol && col <= upperPlatform.endCol

    if (lowerAccessible) score += 20
    if (upperAccessible) score += 20
    if (lowerAccessible && upperAccessible) score += 30 // Bonus for double accessibility

    // Slight preference for positions closer to the left (arbitrary tie-breaker)
    score += (this.scene.cols - col) * 0.1

    return score
  }

  // Ensure there's always a path from bottom to top
  ensureCriticalPathConnectivity(platforms, existingLadders) {
    const additionalLadders = []

    // Sort platforms by row (bottom to top)
    const sortedPlatforms = platforms.slice().sort((a, b) => b.row - a.row)

    if (sortedPlatforms.length < 2) return additionalLadders

    // Check if we can reach from bottom platform to top platform
    const reachabilityMap = this.buildReachabilityMap(platforms, existingLadders)
    const bottomPlatformIndex = platforms.findIndex((p) => p.row === sortedPlatforms[0].row)
    const topPlatformIndex = platforms.findIndex((p) => p.row === sortedPlatforms[sortedPlatforms.length - 1].row)

    if (!this.canReachPlatform(bottomPlatformIndex, topPlatformIndex, reachabilityMap)) {
      console.log("⚠️ Critical path not connected, adding emergency ladder")

      // Find a good intermediate platform to connect
      const midPlatform = sortedPlatforms[Math.floor(sortedPlatforms.length / 2)]
      const midPlatformIndex = platforms.findIndex((p) => p.row === midPlatform.row)

      const emergencyLadder = this.calculateOptimalLadderPlacement(
        sortedPlatforms[0], // Bottom platform
        midPlatform,
      )

      if (emergencyLadder) {
        additionalLadders.push({
          fromPlatform: bottomPlatformIndex,
          toPlatform: midPlatformIndex,
          emergency: true,
          ...emergencyLadder,
        })
      }
    }

    return additionalLadders
  }

  // Build a map of which platforms can reach which others (including via ladders)
  buildReachabilityMap(platforms, ladders) {
    const reachability = new Map()

    // Initialize with direct jump connections
    platforms.forEach((platform, index) => {
      reachability.set(index, new Set())

      platforms.forEach((otherPlatform, otherIndex) => {
        if (index !== otherIndex && this.canReachByJumping(platform, otherPlatform)) {
          reachability.get(index).add(otherIndex)
        }
      })
    })

    // Add ladder connections
    ladders.forEach((ladder) => {
      reachability.get(ladder.fromPlatform).add(ladder.toPlatform)
      reachability.get(ladder.toPlatform).add(ladder.fromPlatform)
    })

    return reachability
  }

  // Check if one platform can reach another (directly or indirectly)
  canReachPlatform(fromIndex, toIndex, reachabilityMap) {
    const visited = new Set()
    const queue = [fromIndex]

    while (queue.length > 0) {
      const current = queue.shift()

      if (current === toIndex) {
        return true
      }

      if (visited.has(current)) {
        continue
      }

      visited.add(current)

      const reachable = reachabilityMap.get(current) || new Set()
      reachable.forEach((next) => {
        if (!visited.has(next)) {
          queue.push(next)
        }
      })
    }

    return false
  }

// In the SmartLadderSystem class, replace the entire function with this one.
placeLadders(requiredLadders) {
    if (!this.scene.ladders) {
      console.error("Ladders group not initialized!");
      return;
    }

    requiredLadders.forEach((ladder, index) => {
      console.log(`Placing ladder ${index + 1} with a custom collider:`, ladder);

      const xPos = ladder.col * this.scene.tileSize + this.scene.tileSize / 2 + this.scene.mazeOffsetX;

      // --- Step 1: Create the visual ladder pieces WITHOUT physics ---
      for (let row = ladder.startRow; row <= ladder.endRow; row++) {
        const yPos = row * this.scene.tileSize + this.scene.tileSize / 2 + this.scene.mazeOffsetY;
        
        // Create the visual sprite.
        const ladderSprite = this.scene.add.sprite(xPos, yPos, "ladder")
        .setDepth(3)
            .setDisplaySize(this.scene.tileSize * 0.8, this.scene.tileSize);
this.scene.visualLadders.add(ladderSprite); 
        // Add visual indicator for emergency ladders.
        if (ladder.emergency) {
          ladderSprite.setTint(0xff6666);
        }
      }

      // --- Step 2: Create a single, invisible collider for the whole ladder ---
      
      // Define the width and height of the collider.
      const colliderWidth = 20; // A fixed narrow width for the collider.
      const colliderHeight = ladder.length * this.scene.tileSize;

      // Calculate the Y position for the center of the entire collider.
      const colliderY = ladder.startRow * this.scene.tileSize + colliderHeight / 2 + this.scene.mazeOffsetY;

      // Create an invisible rectangle that will act as the collider.
      const ladderCollider = this.scene.add.rectangle(xPos, colliderY, colliderWidth, colliderHeight);

      // Add the invisible rectangle to the 'ladders' physics group.
      // The group will automatically give it a static physics body of the correct size.
      this.scene.ladders.add(ladderCollider);
      
    });

    this.ladderPlacements = requiredLadders;
}

  // Debug function to visualize the analysis
  debugVisualization() {
    if (!this.scene.add) return

    const platforms = this.extractPlatformData()

    // Draw platform outlines
    platforms.forEach((platform, index) => {
      const graphics = this.scene.add.graphics()
      graphics.lineStyle(2, 0x00ff00, 0.8)

      const startX = platform.startCol * this.scene.tileSize + this.scene.mazeOffsetX
      const endX = (platform.endCol + 1) * this.scene.tileSize + this.scene.mazeOffsetX
      const y = platform.row * this.scene.tileSize + this.scene.mazeOffsetY

      graphics.strokeRect(startX, y, endX - startX, this.scene.tileSize)

      // Add platform number
      const text = this.scene.add
        .text(startX + (endX - startX) / 2, y + this.scene.tileSize / 2, index.toString(), {
          fontSize: "16px",
          fill: "#ffffff",
        })
        .setOrigin(0.5)
    })

    // Draw ladder positions
    this.ladderPlacements.forEach((ladder, index) => {
      const graphics = this.scene.add.graphics()
      graphics.lineStyle(3, ladder.emergency ? 0xff0000 : 0x0000ff, 1)

      const x = ladder.col * this.scene.tileSize + this.scene.tileSize / 2 + this.scene.mazeOffsetX
      const startY = ladder.startRow * this.scene.tileSize + this.scene.mazeOffsetY
      const endY = (ladder.endRow + 1) * this.scene.tileSize + this.scene.mazeOffsetY

      graphics.strokeRect(x - 5, startY, 10, endY - startY)
    })
  }

  isLadderTooClose(newLadder, existingLadders) {
    for (const existing of existingLadders) {
        // Calculate the horizontal distance in tiles between the two ladders.
        const distance = Math.abs(newLadder.col - existing.col);
        if (distance < this.minLadderDistance) {
            return true; // It's too close!
        }
    }
    return false; // It's a safe distance from all others.
}
}
// Example usage and configuration
const LADDER_CONFIG = {
  // Maximum horizontal distance player can jump (in tiles)
  maxJumpDistance: 4,

  // Maximum vertical distance player can jump up (in tiles)
  maxJumpHeight: 3,

  // Minimum vertical gap required for ladder placement
  minLadderHeight: 2,

  // Maximum vertical distance for ladder connections
  maxLadderHeight: 6,

  // Preference weights for ladder positioning
  centerWeight: 10, // Prefer positions near platform centers
  accessibilityWeight: 20, // Prefer positions accessible from platforms
  overlapBonus: 30, // Bonus for positions accessible from both platforms
}


class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" })
    this.mazeTiles = null

    this.cameraTarget = new Phaser.Math.Vector2()
    this.isMobile = false
    this.currentLevel = 1
    this.enemyDirectionArrows = null
    this.levelTransitioning = false
    this.mazeRows = 25
    this.mazeCols = 35
    this.doubleDamage = false
    this.playerMaxSpeed = 150 // Increased for platformer movement
    this.originalPlayerSpeed = 150
    this.player = { maxAmmo: 20 }
    this.isPlayerDead = false
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
    this.directionArrows = []

    // Platformer specific properties
    this.playerJumpPower = 900

    this.jumpButton = null

this.ladders = null // <-- Add this

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
    }

    this.powerupTypes = [
      { type: "speedBoost", displayName: "Speed Boost", spriteKey: "power_speed", duration: 7000, color: 0x00bfff },
      {
        type: "doubleDamage",
        displayName: "Double Damage",
        spriteKey: "power_damage",
        duration: 5000,
        color: 0xff4500,
      },
      { type: "extraLife", displayName: "Extra Life", spriteKey: "power_life", duration: 0, color: 0xff69b4 },
      { type: "freezeEnemies", displayName: "Freeze", spriteKey: "power_freeze", duration: 10000, color: 0xadd8e6 },
    ]
    this.playerPowerups = {}
    this.powerupButtons = {}
    this.powerupUIContainer = null

    this.setupCamera = () => {
      this.cameras.main.setZoom(2.5) // Slightly less zoom for platformer
      const worldWidth = this.cols * this.tileSize
      const worldHeight = this.rows * this.tileSize
      this.cameras.main.setBounds(this.mazeOffsetX, this.mazeOffsetY, worldWidth, worldHeight)

      this.physics.world.setBounds(this.mazeOffsetX, this.mazeOffsetY, worldWidth, worldHeight)

      this.cameras.main.startFollow(this.player, true, 1, 1)
      this.cameras.main.stopFollow()
      console.log(`Camera setup complete - Manual follow enabled.`)
      console.log(`Camera setup complete - Zoom: 2.5x, Bounds: ${worldWidth}x${worldHeight}`)
    }
  }

  preload() {

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
    this.load.bitmapFont("pixel_font", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml")
    if (joystickEnabled) this.load.plugin("rexvirtualjoystickplugin", rexJoystickUrl)
    if (buttonEnabled) this.load.plugin("rexbuttonplugin", rexButtonUrl)
    displayProgressLoader.call(this)
  }

  create() {
    this.isMobile = this.sys.game.device.os.mobile
    const isPortrait = this.game.config.height > this.game.config.width

    this.scaleFactor = isPortrait ? this.game.config.width / 800 : this.game.config.width / 1200

    this.width = this.game.config.width
    this.height = this.game.config.height

    // Procedural ladder texture fallback
    try { this.textures.remove('ladder'); } catch(e) {}
    const ladderCvs = this.textures.createCanvas('ladder', 32, 32);
    const ladderCtx = ladderCvs.context;
    ladderCtx.fillStyle = '#8b5a2b';
    ladderCtx.fillRect(4, 0, 5, 32);
    ladderCtx.fillRect(23, 0, 5, 32);
    ladderCtx.fillStyle = '#4a2e16';
    ladderCtx.fillRect(3, 0, 1, 32);
    ladderCtx.fillRect(9, 0, 1, 32);
    ladderCtx.fillRect(22, 0, 1, 32);
    ladderCtx.fillRect(28, 0, 1, 32);
    [4, 12, 20, 28].forEach(y => {
      ladderCtx.fillStyle = '#4a2e16';
      ladderCtx.fillRect(4, y - 1, 24, 5);
      ladderCtx.fillStyle = '#c68c53';
      ladderCtx.fillRect(5, y, 22, 3);
      ladderCtx.fillStyle = '#f4c38d';
      ladderCtx.fillRect(5, y, 22, 1);
    });
    ladderCvs.refresh();

    this.enemyDirectionArrows = this.add.group()
    this.pointerOnUI = false
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

    this.backgroundTextures = ["background_cave", "background_volcano", "background"]
    this.wallTextures = ["wall_bush", "wall_lava", "wall_cave"]

    this.input.keyboard.on("keydown-ESC", this.pauseGame, this)

    this.diamonds = this.physics.add.group({
      defaultKey: "ui_gem",
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
    })

    this.playerMaxLives = 80
    this.playerLives = this.playerMaxLives
    this.activePowerups = {}
    this.activePowerupsUI = {}

    //this.setupGraphics()
    this.createModernUI()
    this.initializeLevel()
  }

  createModernUI() {
    this.gameUI = this.add.container(0, 0).setDepth(5000)

    this.createHealthUI()
    this.createEnemyCounterUI()
    this.createLevelTextUI()
    this.createScoreUI()
    this.createWeaponUI()
    this.createPowerupUI()
    this.createCrosshair()
    this.reloadText = this.add
      .bitmapText(this.width / 2, this.height - 150, "pixel_font", "Press R to Reload", 22)
      .setOrigin(0.5)
    this.reloadText.setVisible(false)
    this.gameUI.add(this.reloadText)
     this.setupControls() 
    this.add.existing(this.gameUI)
  }

  createHealthUI() {
    const healthContainer = this.add.container(30, 50)
    this.gameUI.add(healthContainer)

    this.uiHealthBars = this.add.group()

    this.playerMaxLives = 50
    this.playerLives = this.playerMaxLives

    const barWidth = 40
    const barHeight = 50
    const spacing = 0
    for (let i = 0; i < 5; i++) {
      const bar = this.add
        .image(i * 30, 0, "ui_health_bar")
        .setOrigin(0, 0.5)
        .setDisplaySize(barWidth, barHeight)
      bar.setTint(0xff0000)
      healthContainer.add(bar)
      this.uiHealthBars.add(bar)
    }
  }

  createEnemyCounterUI() {
    this.enemyCounterContainer = this.add.container(this.width / 1.15, 50)
    this.gameUI.add(this.enemyCounterContainer)

    this.enemyIcons = this.add.group()
  }

  createScoreUI() {
    const scoreContainer = this.add.container(this.width - 250, this.height - 70)
    this.gameUI.add(scoreContainer)

    const gem = this.add.image(60, 0, "ui_gem").setOrigin(-0.2, 0.5).setDisplaySize(64, 64)
    this.scoreText = this.add.bitmapText(gem.displayWidth + 65, -9, "pixel_font", "0", 48).setOrigin(-0.2, 0.5)

    scoreContainer.add([gem, this.scoreText])
  }

  createWeaponUI() {
    const weaponContainer = this.add.container(40, this.height - 120)
    this.gameUI.add(weaponContainer)

    this.weaponIcon = this.add.image(0, 0, "basic_gun").setOrigin(0, 1).setDisplaySize(128, 64)

    const barYOffset = 50
    const mainBarWidth = 100
    const mainBarHeight = 18
    const reloadBarY = barYOffset - mainBarHeight - 8

    const reloadBarBg = this.add.graphics().fillStyle(0x000000, 0.7)
    reloadBarBg.fillRect(0, reloadBarY, mainBarWidth, mainBarHeight)
    this.reloadBar = this.add.graphics().fillStyle(0x24cacf, 1)
    this.reloadBar.fillRect(0, reloadBarY, mainBarWidth, mainBarHeight)
    this.reloadBarContainer = this.add.container(0, 0, [reloadBarBg, this.reloadBar])
    this.reloadBarContainer.setVisible(false)

    this.ammoBarSegments = this.add.group()
    const segmentWidth = 15
    const segmentHeight = 22
    const segmentSpacing = 3
    const rowSpacing = 5
    const segmentsPerRow = 10
    const totalSegments = this.player.maxAmmo

    for (let i = 0; i < totalSegments; i++) {
      const row = Math.floor(i / segmentsPerRow)
      const col = i % segmentsPerRow

      const segmentX = 5 + col * (segmentWidth + segmentSpacing)
      const segmentY = barYOffset + mainBarHeight / 2 + row * (segmentHeight + rowSpacing)

      const segment = this.add.image(segmentX, segmentY, "ui_ammo_bar").setDisplaySize(segmentWidth, segmentHeight)

      this.ammoBarSegments.add(segment)
    }

    weaponContainer.add([this.weaponIcon, this.reloadBarContainer, ...this.ammoBarSegments.getChildren()])
  }

  createCrosshair() {
    this.input.setDefaultCursor("none")
    this.crosshair = this.add.image(0, 0, "crosshair").setDisplaySize(20, 20).setDepth(6000)
  }

  createUIBackground() {
    const topPanel = this.add.graphics()
    topPanel.fillStyle(0x000000, 0.7)
    topPanel.fillRoundedRect(0, 0, this.width, 80 * this.scaleFactor, 8)
    topPanel.lineStyle(2, 0x444444)
    topPanel.strokeRoundedRect(0, 0, this.width, 80 * this.scaleFactor, 8)
    this.gameUI.add(topPanel)

    const bottomHeight = 120 * this.scaleFactor
    const bottomPanel = this.add.graphics()
    bottomPanel.fillStyle(0x000000, 0.7)
    bottomPanel.fillRoundedRect(0, this.height - bottomHeight, this.width, bottomHeight, 8)
    bottomPanel.lineStyle(2, 0x444444)
    bottomPanel.strokeRoundedRect(0, this.height - bottomHeight, this.width, bottomHeight, 8)
    this.gameUI.add(bottomPanel)

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
    this.healthIcons = this.add.group()
    const startX = 30 * this.scaleFactor
    const startY = 30 * this.scaleFactor
    const iconSize = 28 * this.scaleFactor
    const hearts = this.playerMaxLives / 10

    for (let i = 0; i < hearts; i++) {
      const heart = this.add
        .image(startX + i * (iconSize + 8), startY, "icon_heart")
        .setDisplaySize(iconSize, iconSize)
        .setOrigin(0, 0.5)

      this.healthIcons.add(heart)
      this.gameUI.add(heart)
    }
  }

  setupStatsUI() {
    const startX = 30 * this.scaleFactor
    const startY = this.height - 80 * this.scaleFactor
    const fontSize = 24 * this.scaleFactor
    const iconSize = 22 * this.scaleFactor

    const killsIcon = this.add.text(startX, startY, "KILLS:", { fontSize: `${iconSize * 0.75}px`, fontStyle: 'bold', fill: '#ef4444' }).setOrigin(0, 0.5)

    this.killsText = this.add
      .text(startX + 65 * this.scaleFactor, startY, "0", { fontSize: `${fontSize}px`, fill: "#ffffff" })
      .setOrigin(0, 0.5)

    const diamondsIcon = this.add
      .text(startX, startY + 35 * this.scaleFactor, "GEMS:", { fontSize: `${iconSize * 0.75}px`, fontStyle: 'bold', fill: '#38bdf8' })
      .setOrigin(0, 0.5)

    this.diamondsText = this.add
      .text(startX + 65 * this.scaleFactor, startY + 35 * this.scaleFactor, "0", {
        fontSize: `${fontSize}px`,
        fill: "#ffffff",
      })
      .setOrigin(0, 0.5)

    this.gameUI.add([killsIcon, this.killsText, diamondsIcon, this.diamondsText])
  }

  setupLevelUI() {
    const levelX = this.width / 2
    const levelY = 30 * this.scaleFactor
    const fontSize = 28 * this.scaleFactor

    this.levelText = this.add
      .text(levelX, levelY, `LEVEL ${this.currentLevel}`, {
        fontSize: `${fontSize}px`,
        fill: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)

    this.gameUI.add(this.levelText)
  }

  setupObjectiveUI() {
    const objectiveX = this.width / 2
    const objectiveY = 60 * this.scaleFactor
    const fontSize = 20 * this.scaleFactor

    this.objectiveText = this.add
      .text(objectiveX, objectiveY, "Eliminate all enemies", { fontSize: `${fontSize}px`, fill: "#ffffff" })
      .setOrigin(0.5)

    this.gameUI.add(this.objectiveText)

    if (this.objectiveContainer) this.objectiveContainer.destroy()
    if (this.objectiveTitle) this.objectiveTitle.destroy()
  }

//   setupGraphics() {
//     //this.vfx.addCircleTexture("iceBlue", 0x99ccff, 1, 10)
//     //this.vfx.addCircleTexture("whiteSoft", 0xffffff, 0.8, 8)
//     //this.vfx.addCircleTexture("red", 0xff0000, 1, 10)
//     //this.vfx.addCircleTexture("orange", 0xffa500, 1, 10)
//     //this.vfx.addCircleTexture("yellow", 0xffff00, 1, 10)
//     //this.vfx.addCircleTexture("white", 0xffffff, 1, 10)
//     //this.vfx.addCircleTexture("blue", 0x0000ff, 1, 10)
//     //this.vfx.addCircleTexture("cyan", 0x00ffff, 1, 10)
//   }

initializeLevel() {
    console.log(`🎮 Initializing Level ${this.currentLevel}`)

    this.input.keyboard.resetKeys()
    this.cleanupLevel()

this.patrolPlatforms = [
    // Top-most long platform
    { y: 13, startX: 4, endX: 35 },
    // Middle platforms (with smaller gaps)
    { y: 17, startX: 8, endX: 15 },      // Was endX: 13
    { y: 17, startX: 17, endX: 26 },      // Was startX: 18, endX: 25
    { y: 17, startX: 28, endX: 35 },
    // Bottom-most long platform
    { y: 25, startX: 4, endX: 35 },
];

    this.generateMaze()
    this.buildMazeAndPlaceEntities()
    // this.setupControls()

    console.log(`✅ Level ${this.currentLevel} initialized`)
    this.setupEnemyCounter()
    this.levelText.setText(`LEVEL ${this.currentLevel}`)
}

  cleanupLevel() {
    if (this.endpointSprite) {
      this.endpointSprite.destroy()
      this.endpointSprite = null
    }
    if (this.endpointText) {
      this.endpointText.destroy()
      this.endpointText = null
    }

    this.cleanupDirectionArrows()

    if (this.enemies) this.enemies.clear(true, true)
    if (this.playerBullets) this.playerBullets.clear(true, true)
    if (this.enemyBullets) this.enemyBullets.clear(true, true)
    if (this.diamonds) this.diamonds.clear(true, true)
    if (this.powerups) this.powerups.clear(true, true)
    if (this.obstacles) this.obstacles.clear(true, true)
    if (this.mazeTiles) this.mazeTiles.clear(true, true)
      if (this.visualLadders) this.visualLadders.clear(true, true)

    this.mazeEndpoint = null
    this.endpointReached = false
    this.enemiesKilled = 0
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

    const originalMaze = this.currentLevel === 1 ? level1Maze : level2Maze
    const scaleFactor = 2
    const wallProbability = 100

    const upscaledMaze = this.upscaleMaze(originalMaze, scaleFactor, wallProbability)
    this.maze = this.addThickBorder(upscaledMaze)
    this.rows = this.maze.length
    this.cols = this.maze[0].length

    const maxTileSize = Math.min(this.width / this.cols, this.height / this.rows)
    this.tileSize = Math.max(maxTileSize, 32 * this.scaleFactor)

    this.mazeOffsetX = (this.width - this.cols * this.tileSize) / 2
    this.mazeOffsetY = (this.height - this.rows * this.tileSize) / 2
  }

  addThickBorder(maze) {
    const rows = maze.length
    if (rows === 0) return maze
    const cols = maze[0].length

    if (rows < 4 || cols < 4) return maze

    for (let c = 0; c < cols; c++) {
      maze[0][c] = 1 // Top row
      maze[1][c] = 1 // Second row from top
      maze[rows - 1][c] = 1 // Bottom row
      maze[rows - 2][c] = 1 // Second row from bottom
    }

    for (let r = 0; r < rows; r++) {
      maze[r][0] = 1 // Left column
      maze[r][1] = 1 // Second column from left
      maze[r][cols - 1] = 1 // Right column
      maze[r][cols - 2] = 1 // Second column from right
    }

    return maze
  }
placeLaddersProcedurally() {
    // The SmartLadderSystem class needs access to the maze data and game scene
    // so we pass `this` (the GameScene instance) to its constructor.
    const smartLadderSystem = new SmartLadderSystem(this);

    // This function handles everything: analyzing platforms,
    // finding gaps, and creating the ladder sprites.
    smartLadderSystem.analyzePlatformsAndPlaceLadders();
}
  buildMazeAndPlaceEntities() {
    if (this.bg) {
      this.bg.destroy()
    }

    this.bg = this.add.tileSprite(0, 0, this.width, this.height, "background")
    this.bg.setOrigin(0, 0)
    this.bg.setScrollFactor(0)
    this.bg.setDepth(-1)

    this.obstacles = this.physics.add.staticGroup()
    this.ladders = this.physics.add.staticGroup()
    this.visualLadders = this.add.group()
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

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const isWall = this.maze[r][c] === 1
        const isFloorBelow = r < this.rows - 1 && this.maze[r + 1][c] === 0

        if (isWall && isFloorBelow) {
          const shadowX = c * this.tileSize + this.mazeOffsetX
          const shadowY = (r + 1) * this.tileSize + this.mazeOffsetY

          const shadow = this.add.graphics({ x: shadowX, y: shadowY })
          shadow.fillStyle(0x000000, 0.4)
          shadow.setDepth(-1)

          shadow.fillRect(0, 0, this.tileSize, this.tileSize / 2)
        }
      }
    }

    const emptyCells = []
    this.mazeTiles = this.add.group()

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = c * this.tileSize + this.tileSize / 2 + this.mazeOffsetX
        const y = r * this.tileSize + this.tileSize / 2 + this.mazeOffsetY

        if (this.maze[r][c] === 1) {
          const wallTile = this.add.image(x, y, "tile_fill").setDisplaySize(this.tileSize, this.tileSize).setDepth(2)

          this.physics.add.existing(wallTile, true)
          this.obstacles.add(wallTile)
          this.mazeTiles.add(wallTile)

          const edgeThickness = this.tileSize * 0.5
          const halfTile = this.tileSize / 2
          const cornerSize = edgeThickness

          // ---- Bottom Edge ----
          if (r + 1 < this.rows && this.maze[r + 1][c] === 0) {
            const bottomEdge = this.add
              .image(x, y + this.tileSize / 2, "tile_edge")
              .setDisplaySize(this.tileSize, edgeThickness)
              .setDepth(2)
            this.physics.add.existing(bottomEdge, true)
            bottomEdge.body.setSize(this.tileSize, edgeThickness)
            this.obstacles.add(bottomEdge)
            this.mazeTiles.add(bottomEdge)
          }

          // ---- Top Edge ----
          if (r - 1 >= 0 && this.maze[r - 1][c] === 0) {
            const topEdge = this.add
              .image(x, y - this.tileSize / 2, "tile_edge")
              .setDisplaySize(this.tileSize, edgeThickness)
              .setRotation(Math.PI)
              .setDepth(2)
            this.physics.add.existing(topEdge, true)
            topEdge.body.setSize(this.tileSize, edgeThickness)
            this.obstacles.add(topEdge)
            this.mazeTiles.add(topEdge)
          }

          // ---- Right Edge ----
          if (c + 1 < this.cols && this.maze[r][c + 1] === 0) {
            const rightEdge = this.add
              .image(x + this.tileSize / 2, y, "tile_edge")
              .setDisplaySize(this.tileSize, edgeThickness)
              .setRotation(Math.PI / 2)
              .setDepth(2)
            this.physics.add.existing(rightEdge, true)
            rightEdge.body.setSize(edgeThickness, this.tileSize)
            this.obstacles.add(rightEdge)
            this.mazeTiles.add(rightEdge)
          }

          // ---- Left Edge ----
          if (c - 1 >= 0 && this.maze[r][c - 1] === 0) {
            const leftEdge = this.add
              .image(x - this.tileSize / 2, y, "tile_edge")
              .setDisplaySize(this.tileSize, edgeThickness)
              .setRotation(-Math.PI / 2)
              .setDepth(2)
            this.physics.add.existing(leftEdge, true)
            leftEdge.body.setSize(edgeThickness, this.tileSize)
            this.obstacles.add(leftEdge)
            this.mazeTiles.add(leftEdge)
          }

          // ---- Corners ----
          const isAboveEmpty = r - 1 < 0 || this.maze[r - 1][c] === 0
          const isBelowEmpty = r + 1 >= this.rows || this.maze[r + 1][c] === 0
          const isLeftEmpty = c - 1 < 0 || this.maze[r][c - 1] === 0
          const isRightEmpty = c + 1 >= this.cols || this.maze[r][c + 1] === 0

          if (isBelowEmpty && isRightEmpty) {
            const cornerBR = this.add
              .image(x + halfTile, y + halfTile, "tile_corner")
              .setDisplaySize(cornerSize, cornerSize)
              .setDepth(2)
            this.physics.add.existing(cornerBR, true)
            this.obstacles.add(cornerBR)
            this.mazeTiles.add(cornerBR)
          }

          if (isBelowEmpty && isLeftEmpty) {
            const cornerBL = this.add
              .image(x - halfTile, y + halfTile, "tile_corner")
              .setDisplaySize(cornerSize, cornerSize)
              .setRotation(Math.PI / 2)
              .setDepth(2)
            this.physics.add.existing(cornerBL, true)
            this.obstacles.add(cornerBL)
            this.mazeTiles.add(cornerBL)
          }

          if (isAboveEmpty && isLeftEmpty) {
            const cornerTL = this.add
              .image(x - halfTile, y - halfTile, "tile_corner")
              .setDisplaySize(cornerSize, cornerSize)
              .setRotation(Math.PI)
              .setDepth(2)
            this.physics.add.existing(cornerTL, true)
            this.obstacles.add(cornerTL)
            this.mazeTiles.add(cornerTL)
          }

          if (isAboveEmpty && isRightEmpty) {
            const cornerTR = this.add
              .image(x + halfTile, y - halfTile, "tile_corner")
              .setDisplaySize(cornerSize, cornerSize)
              .setRotation(-Math.PI / 2)
              .setDepth(2)
            this.physics.add.existing(cornerTR, true)
            this.obstacles.add(cornerTR)
            this.mazeTiles.add(cornerTR)
          }
        } else {
          emptyCells.push({ x: x, y: y, col: c, row: r })
        }
      }
    }

this.placeLaddersProcedurally(); // This new function will handle placing ladders

    this.placePlayer(emptyCells)
    this.placeEnemies(emptyCells)
    this.setupPhysics()
    this.setupCamera()
  }

  upscaleMaze(maze, scaleFactor, wallProbability) {
    const originalRows = maze.length
    const originalCols = maze[0].length
    const newRows = originalRows * scaleFactor
    const newCols = originalCols * scaleFactor
    const newMaze = Array.from({ length: newRows }, () => Array(newCols).fill(0))

    for (let r = 0; r < originalRows; r++) {
      for (let c = 0; c < originalCols; c++) {
        const value = maze[r][c]
        if (value === 1) {
          for (let i = 0; i < scaleFactor; i++) {
            for (let j = 0; j < scaleFactor; j++) {
              if (Phaser.Math.Between(1, 100) < wallProbability) {
                newMaze[r * scaleFactor + i][c * scaleFactor + j] = 1
              }
            }
          }
        }
      }
    }
    return newMaze
  }

  placePlayer(emptyCells) {
    let startCell = null

    // Find spawn position at bottom-left of the maze
    for (let r = this.rows - 3; r >= 1; r--) {
      // Start from bottom and go up
      for (let c = 1; c < this.cols - 2; c++) {
        // Start from left
        const isClear =
          this.maze[r][c] === 0 &&
          this.maze[r + 1][c] === 0 &&
          this.maze[r][c + 1] === 0 &&
          this.maze[r + 1][c + 1] === 0

        if (isClear) {
          const x = c * this.tileSize + this.tileSize / 2 + this.mazeOffsetX
          const y = r * this.tileSize + this.tileSize / 2 + this.mazeOffsetY
          startCell = { x: x, y: y, col: c, row: r }
          break
        }
      }
      if (startCell) {
        break
      }
    }

    if (!startCell && emptyCells.length > 0) {
      console.warn("Could not find a safe 2x2 spawn area at bottom-left. Using a random empty cell as a fallback.")
      startCell = Phaser.Utils.Array.GetRandom(emptyCells)
    }

    this.startPoint = { x: startCell.col, y: startCell.row }

    if (this.player && this.player.body) {
      // Move existing player
      this.player.setPosition(startCell.x, startCell.y)
      this.player.body.setVelocity(0, 0)
    } else {
      // Create new player
      const playerSprite = this.add.sprite(0, 0, "player").setDisplaySize(30, 30)
      const shadow = this.add.graphics()
      shadow.fillStyle(0x000000, 0.35)
      shadow.fillEllipse(0, playerSprite.displayHeight / 2 - 4, playerSprite.displayWidth * 0.9, 15)

      const weaponData = this.weaponTypes.basic_gun
      const weapon = this.add
        .sprite(weaponData.offsetX, weaponData.offsetY, weaponData.key)
        .setDisplaySize(20, 20)
        .setOrigin(0.2, 0.5)

      this.player = this.add.container(startCell.x, startCell.y, [shadow, playerSprite, weapon])
      this.physics.add.existing(this.player)
      this.player.body.setCollideWorldBounds(true)
      this.player.body.setMaxVelocity(this.playerMaxSpeed, 600) // Allow higher Y velocity for jumping

      const bodyWidth = 30
      const bodyHeight = 30
      this.player.body.setSize(bodyWidth, bodyHeight)
    this.player.body.setOffset(-bodyWidth / 2, -bodyHeight / 2 + 5)

      this.player.isInvincible = false
      this.player.sprite = playerSprite
      this.player.weapon = weapon
      this.player.currentWeapon = "basic_gun"
      this.player.maxAmmo = 20
      this.player.currentAmmo = 20
      this.player.isReloading = false
    }

    this.player.currentTile = { x: startCell.col, y: startCell.row }
    this.playerFireCooldown = 0

    const startIndex = emptyCells.findIndex((cell) => cell.x === startCell.x && cell.y === startCell.y)
    if (startIndex !== -1) {
      emptyCells.splice(startIndex, 1)
    }
  }

  setupUI() {
    const style = {
      fontSize: "18px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 2,
    }

    // Create health text
    this.healthText = this.add
      .text(20, 20, `Health: ${this.player?.health || 100}`, style)
      .setScrollFactor(0)
      .setDepth(1000)

    // Create kills text
    this.killsText = this.add
      .text(20, 50, `Kills: ${this.kills || 0}`, style)
      .setScrollFactor(0)
      .setDepth(1000)

    // Create diamonds text
    this.diamondText = this.add
      .text(20, 80, `Diamonds: ${this.diamondCount || 0}`, style)
      .setScrollFactor(0)
      .setDepth(1000)

    // powerup buttons, only if powerups are available
    if (this.playerPowerups) {
      this.powerupButtons = this.add.group()
      let xOffset = 20

      Object.keys(this.playerPowerups).forEach((key) => {
        const p = this.playerPowerups[key]
        const btn = this.add
          .image(xOffset, 120, p.key)
          .setScrollFactor(0)
          .setInteractive()
          .setDisplaySize(10, 10)
          .setDepth(1000)

        btn.on("pointerdown", () => this.activatePowerup(key))
        this.powerupButtons.add(btn)
        xOffset += 48
      })
    }
  }
placeEnemies(emptyCells) {
    const numEnemies = 3 + this.currentLevel
    const enemyTypesToSpawn = []
    const chaserEnemyType = this.enemyTypes.find((e) => e.type === "chaser")

    for (let i = 0; i < numEnemies; i++) {
        if (chaserEnemyType) {
            enemyTypesToSpawn.push(chaserEnemyType)
        }
    }

    // --- CHANGE STARTS HERE ---
    // Shuffle the platforms to ensure unique assignment
    const availablePlatforms = Phaser.Utils.Array.Shuffle([...this.patrolPlatforms]);

    for (const enemyType of enemyTypesToSpawn) {
        if (!enemyType) continue

        // Take one platform from the shuffled list. If we run out, stop spawning.
        const platform = availablePlatforms.pop();
        if (!platform) continue;

        const healthMultiplier = 1 + (this.currentLevel - 1) * 0.05
        const scaledHealth = Math.ceil(enemyType.health * healthMultiplier)
        
        const enemyCol = Phaser.Math.Between(platform.startX, platform.endX);
        const enemyRow = platform.y;
        const enemyCell = {
            x: enemyCol * this.tileSize + this.tileSize / 2 + this.mazeOffsetX,
            y: enemyRow * this.tileSize + this.tileSize / 2 + this.mazeOffsetY,
        };

        const isBoss = enemyType.type === "boss"
        const displaySize = isBoss ? 120 : 60
        const enemySprite = this.add.sprite(0, 0, enemyType.spriteKey).setDisplaySize(displaySize, displaySize)
        const shadow = this.add
            .graphics()
            .fillStyle(0x000000, 0.35)
            .fillEllipse(0, displaySize / 2 - 5, displaySize * 0.7, displaySize * 0.2)
        const enemy = this.add.container(enemyCell.x, enemyCell.y, [shadow, enemySprite])
        this.enemies.add(enemy)
        this.physics.world.enable(enemy)
        const bodyWidth = displaySize * 0.5
        const bodyHeight = displaySize * 0.6
        enemy.body.setSize(bodyWidth, bodyHeight)
        const offsetX = -bodyWidth / 2
        const offsetY = displaySize / 2 - bodyHeight
        enemy.body.setOffset(offsetX, offsetY)
        enemy.body.setCollideWorldBounds(true)
        enemy.body.pushable = false
        enemy.body.setImmovable(true)
        enemy.body.setBounce(0)
        enemy.body.setAllowGravity(false); // Make the enemy ignore gravity.

        enemy.sprite = enemySprite
        enemy.type = enemyType.type
        enemy.maxHealth = scaledHealth
        enemy.health = scaledHealth
        enemy.speed = enemyType.speed;
        enemy.setDepth(3)
        enemy.state = "idle"
        enemy.visionCone = this.add.graphics({
            fillStyle: {
                color: 0xffffaa,
                alpha: 0.2
            }
        })
        enemy.targetTile = null
        enemy.path = []
        enemy.visitedTiles = new Set()
        enemy.currentTile = {
            x: enemyCell.col,
            y: enemyCell.row
        }
        enemy.nextFireTime = 0

        // Store patrol data on the enemy object
        enemy.patrolStartX = platform.startX * this.tileSize + this.tileSize / 2 + this.mazeOffsetX;
        enemy.patrolEndX = platform.endX * this.tileSize + this.tileSize / 2 + this.mazeOffsetX;
        enemy.patrolDirection = (Phaser.Math.Between(0, 1) === 0) ? -1 : 1;
    }
}

setupPhysics() {
    // Set gravity for platformer gameplay
    this.physics.world.gravity.y = 800

    this.physics.add.collider(this.player, this.obstacles)
    this.physics.add.collider(this.enemies, this.obstacles)
    this.physics.add.collider(this.player, this.enemies)
    this.physics.add.overlap(this.player, this.diamonds, this.collectDiamond, null, this)
    this.physics.add.collider(this.enemies, this.enemies)
    this.physics.add.overlap(this.player, this.powerups, this.handlePowerupCollect, null, this)
    this.physics.add.collider(this.powerups, this.obstacles)
    this.physics.add.overlap(this.playerBullets, this.enemies, this.hitEnemy, null, this)
    this.physics.add.overlap(this.enemyBullets, this.player, this.hitPlayer, null, this)
    this.physics.add.collider(this.playerBullets, this.obstacles, this.bulletHitWall, null, this)
    this.physics.add.collider(this.enemyBullets, this.obstacles, this.bulletHitWall, null, this)

    // Handle endpoint collision
    if (this.endpointSprite) {
      this.physics.add.overlap(this.player, this.endpointSprite, this.reachEndpoint, null, this)
    }

    this.physics.add.collider(this.enemyBullets, this.obstacles, this.bulletHitWall, null, this)
    // this.physics.add.overlap(this.player, this.ladders, () => {
    //     // This callback sets a flag when the player is touching a ladder
    //     if (this.player && this.player.body) {
    //         this.player.onLadder = true;
    //     }
    // }, null, this);
  }

  setupCamera() {
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)

    const worldWidth = this.cols * this.tileSize
    const worldHeight = this.rows * this.tileSize
    this.cameras.main.setBounds(this.mazeOffsetX, this.mazeOffsetY, worldWidth, worldHeight)
    this.physics.world.setBounds(this.mazeOffsetX, this.mazeOffsetY, worldWidth, worldHeight)
  }

  updateWeaponUI() {
    if (!this.player || !this.player.active) return
    this.ammoBarSegments.children.each((segment, index) => {
      if (index < this.player.currentAmmo) {
        segment.setTint(0x00bfff) // Full/blue tint
      } else {
        segment.setTint(0x111111) // Empty/dark tint
      }
    })

    // Show or hide the reload prompt
    if (this.player.currentAmmo <= 0) {
      this.reloadText.setVisible(true)
    } else {
      this.reloadText.setVisible(false)
    }
  }

  handleJump() {
      // Only jump if on the ground or on a ladder
      if (this.player.body.blocked.down || this.player.onLadder) {
          this.player.body.setVelocityY(-this.playerJumpPower);
          // When jumping from a ladder, make sure gravity is re-enabled
          if(this.player.onLadder) {
              this.player.body.setAllowGravity(true);
              this.player.onLadder = false;
          }
      }
  }

setupControls() {
    // The check now reliably uses the scene's 'isMobile' property
if (this.isMobile) { 
    // --- MOBILE CONTROLS ---
    console.log("Attempting to create mobile UI controls...");

    // Create joystick for mobile
    const joyPlugin = this.plugins.get("rexvirtualjoystickplugin");
    if (joyPlugin) {
        const R = 60 * this.scaleFactor;
        const joystick = joyPlugin.add(this, {
            x: 150 * this.scaleFactor,
            y: this.scale.height - R * 1.5,
            radius: R,
            base: this.add.circle(0, 0, R * 1.6, 0x888888, 0.6),
            thumb: this.add.circle(0, 0, R * 0.8, 0xcccccc, 0.8),
        });
        
        // ADD THE JOYSTICK PARTS TO THE UI CONTAINER
        this.gameUI.add(joystick.base);
        this.gameUI.add(joystick.thumb);
        this.joystick = joystick; // Keep reference to the joystick object
    }

    // Create jump and reload buttons for mobile
    const buttonPlugin = this.plugins.get("rexbuttonplugin");
    if (buttonPlugin) {
        // JUMP BUTTON
        const jumpButton = this.add.circle(this.width - 100, this.height - 180, 50, 0x00ff00, 0.8)
            .setInteractive()
            .on("pointerdown", () => {
                this.handleJump();
            });
        
        const jumpText = this.add.text(this.width - 100, this.height - 180, "JUMP", {
                fontSize: "20px",
                fill: "#ffffff",
                fontStyle: "bold",
            }).setOrigin(0.5);

        // RELOAD BUTTON
        const reloadButton = this.add.circle(this.width - 100, this.height - 80, 40, 0xffa500, 0.8)
            .setInteractive()
            .on("pointerdown", () => {
               this.handleReload();
            });
        
        const reloadText = this.add.text(this.width - 100, this.height - 80, "RELOAD", {
                fontSize: "16px",
                fill: "#ffffff",
                fontStyle: "bold",
            }).setOrigin(0.5);
        
        // ADD THE BUTTONS AND TEXT TO THE UI CONTAINER
        this.gameUI.add([jumpButton, jumpText, reloadButton, reloadText]);
    }

    // Setup tap-to-shoot for mobile
    this.input.on("pointerdown", (pointer) => {
        // Create a list of all UI elements to ignore taps on
        const uiElements = this.gameUI.getAll();
        for(const element of uiElements) {
            if(element.getBounds && element.getBounds().contains(pointer.x, pointer.y)){
                return; // Pointer is on a UI element, so don't shoot
            }
        }
        this.fireBullet(this.player, pointer.worldX, pointer.worldY, this.playerBullets);
    });

} else {
        // --- DESKTOP CONTROLS ---
        this.moveState = {
            left: false,
            right: false
        }

        // Add listeners for A/D keydown events
        this.input.keyboard.on("keydown-A", () => {
            this.moveState.left = true
        })
        this.input.keyboard.on("keydown-D", () => {
            this.moveState.right = true
        })

        // Add listeners for A/D keyup events
        this.input.keyboard.on("keyup-A", () => {
            this.moveState.left = false
        })
        this.input.keyboard.on("keyup-D", () => {
            this.moveState.right = false
        })

        // Define a single object for all keys for clarity
        this.keys = {
            jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        };

        // Prevent default browser behavior (e.g., page scrolling)
        this.input.keyboard.addCapture("W,S,SPACE");

        // Reload key event
        this.input.keyboard.on("keydown-R", this.handleReload, this)
    }
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

    arrow.rotation = angleToEndpoint
  }

spawnEndpoint() {
    console.log("🎯 Spawning maze endpoint");

    let endpointX, endpointY, endpointCol, endpointRow;
 
// Search from the top-right corner of the maze.
    for (let r = 1; r < this.rows - 1; r++) {
        // Start from the right-most column and move left.
        for (let c = this.cols - 2; c > 0; c--) {
            if (this.maze[r][c] === 0) { // Find the first available empty cell
                endpointCol = c;
                endpointRow = r;
                endpointX = c * this.tileSize + this.tileSize / 2 + this.mazeOffsetX;
                endpointY = r * this.tileSize + this.tileSize / 2 + this.mazeOffsetY;
                break; // Found the highest, right-most spot, so exit.
            }
        }
        if (endpointX) { // If a spot was found, break from the outer loop too.
            break;
        }
    }

 
    if (endpointX === undefined) {
        console.warn("Could not find endpoint in bottom-right. Searching entire maze...");
        const emptyCells = [];
        for (let r = 1; r < this.rows - 1; r++) {
            for (let c = 1; c < this.cols - 1; c++) {
                if (this.maze[r][c] === 0) {
                    // Avoid spawning on the player's starting tile
                    if (r !== this.startPoint.y || c !== this.startPoint.x) {
                         emptyCells.push({r, c});
                    }
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = Phaser.Utils.Array.GetRandom(emptyCells);
            endpointCol = randomCell.c;
            endpointRow = randomCell.r;
            endpointX = endpointCol * this.tileSize + this.tileSize / 2 + this.mazeOffsetX;
            endpointY = endpointRow * this.tileSize + this.tileSize / 2 + this.mazeOffsetY;
        } else {
            console.error("FATAL: No empty cells found in maze to spawn endpoint.");
            return;  
        }
    }
  

 
    this.endpointSprite = this.add
      .sprite(endpointX, endpointY, "portal")
      .setDisplaySize(50, 50)
      .setDepth(15);

this.physics.add.existing(this.endpointSprite);
    this.endpointSprite.body.setAllowGravity(false); // <-- ADD THIS LINE
    this.endpointSprite.body.setSize(this.tileSize * 5, this.tileSize * 5);

    this.mazeEndpoint = {
      x: endpointX,
      y: endpointY,
      col: endpointCol,
      row: endpointRow,
    };

    this.physics.add.overlap(this.player, this.endpointSprite, this.reachEndpoint, null, this);
    this.createDirectionArrows();

    console.log(`✅ Endpoint created at (${endpointCol}, ${endpointRow})`);
  }
  clearAreaForEndpoint(startRow, startCol, clearSize = 2) {
    const tilesToClear = new Set();
    // Identify all tiles that need to be cleared
    for (let r = 0; r < clearSize; r++) {
        for (let c = 0; c < clearSize; c++) {
            const row = startRow + r;
            const col = startCol + c;
            if (row < this.rows && col < this.cols) {
                this.maze[row][col] = 0; // Update the underlying maze data
                tilesToClear.add(`${col},${row}`);
            }
        }
    }

    // Find and destroy all obstacle sprites within the cleared area.
    // This is necessary because the obstacles are created before this function is called.
    const obstaclesToDestroy = this.obstacles.getChildren().filter(obstacle => {
        // We check the tile coordinates of each part of the obstacle group
        const tile = this.getTileCoordsFromPixels(obstacle.x, obstacle.y);
        return tilesToClear.has(`${tile.col},${tile.row}`);
    });

    obstaclesToDestroy.forEach(obstacle => {
        // Use a try-catch block for safety in case an object is already being destroyed
        try {
            obstacle.destroy();
        } catch (e) {
            console.warn("Could not destroy obstacle, it might already be gone.", e);
        }
    });
}

  reachEndpoint(player, endpoint) {
    if (this.endpointReached || this.levelTransitioning) {
      return
    }

    console.log("🚪 Player reached endpoint!")
    this.endpointReached = true

    this.cleanupDirectionArrows()

    if (this.endpointSprite && this.endpointSprite.body) {
      this.endpointSprite.body.enable = false
    }

    //this.vfx.createEmitter("white", endpoint.x, endpoint.y, 1.5, 0, 1000).explode(40)
    //this.vfx.createEmitter("yellow", endpoint.x, endpoint.y, 1.2, 0, 800).explode(30)
    //this.vfx.createEmitter("orange", endpoint.x, endpoint.y, 1, 0, 600).explode(20)

    this.cameras.main.shake(300, 0.02)

    this.advanceToNextLevel()
  }

  advanceToNextLevel() {
    this.levelTransitioning = true
    this.physics.pause()

    // Clean panel background
    const panel = this.add
      .rectangle(this.width / 2, this.height / 2, this.width * 0.7, this.height * 0.4, 0x1a1a1a, 0.9)
      .setScrollFactor(0)
      .setDepth(1500)

    // "Level Complete" Text
    const titleText = this.add
      .bitmapText(this.width / 2, this.height / 2 - 40, "pixel_font", `LEVEL ${this.currentLevel} COMPLETE`, 48)
      .setOrigin(0.5)
      .setDepth(1501)
      .setScrollFactor(0)

    // "Loading..." Text
    const subtitleText = this.add
      .bitmapText(this.width / 2, this.height / 2 + 30, "pixel_font", "Loading Next Area...", 24)
      .setOrigin(0.5)
      .setDepth(1501)
      .setScrollFactor(0)

    // Simple fade-in animation for the panel and text
    this.tweens.add({
      targets: [panel, titleText, subtitleText],
      alpha: { from: 0, to: 1 },
      duration: 500,
      ease: "Power2",
    })

    // Advance to the next level after a delay
    this.time.delayedCall(3000, () => {
      // Add these three lines to remove the screen elements
      panel.destroy()
      titleText.destroy()
      subtitleText.destroy()

      this.currentLevel++
      this.levelTransitioning = false
      this.physics.resume()
      this.initializeLevel()
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
    console.log("--- killEnemy called ---")

    let iconToUpdate = null

    const icons = this.enemyIcons.getChildren()

    for (let i = icons.length - 1; i >= 0; i--) {
      if (icons[i].texture.key === "ui_skull") {
        iconToUpdate = icons[i]
        break
      }
    }

    if (iconToUpdate) {
      iconToUpdate.setTexture("ui_skull_crossed")
    }

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

    // Create diamond with better scaling
    const diamond = this.diamonds.create(enemy.x, enemy.y, "collectible")
    diamond.setDepth(2)
    diamond.setDisplaySize(30, 30)
    diamond.setBounce(0.5)
    diamond.setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(-50, 50))
    diamond.setDrag(0.95)
    diamond.setCollideWorldBounds(true)

    // Clean up enemy
    if (enemy.visionCone) {
      enemy.visionCone.destroy()
    }

    this.enemies.remove(enemy, true, true)

    console.log(`Enemies remaining: ${this.enemies.countActive(true)}`)

    // Check if all enemies are defeated
    if (this.enemies.countActive(true) === 0) {
      console.log("🎯 All enemies defeated - spawning endpoint")
      if (!this.levelTransitioning && !this.mazeEndpoint) {
        this.spawnEndpoint()
      }
    }

    if (enemy.directionArrow) {
      enemy.directionArrow.destroy()
    }
  }

  updateHealthUI() {
    const healthPerBar = 10
    this.uiHealthBars.children.each((bar, index) => {
      const healthThreshold = (index + 1) * healthPerBar

      // Change tint based on player's health
      if (this.playerLives >= healthThreshold) {
        bar.setTint(0xff0000) // Full/red tint
      } else {
        bar.setTint(0x111111) // Empty/dark tint
      }
    })
  }

  spawnRandomPowerup(x, y) {
    const powerupData = Phaser.Utils.Array.GetRandom(this.powerupTypes)
    const baseScale = 0.5 * this.scaleFactor
    const adjustedScale = powerupData.spriteKey === "power_area" ? baseScale * 0.4 : baseScale

const powerup = this.add.sprite(0, 0, powerupData.spriteKey).setDisplaySize(30, 30)

    powerup.setData("type", powerupData.type)
    powerup.setData("duration", powerupData.duration)

    const glow = this.add.graphics()
    glow.fillStyle(0xffd700, 0.6)
    glow.fillCircle(0, 0, powerup.displayWidth * 0.8)
    const powerupContainer = this.add.container(x, y, [glow, powerup])
    powerupContainer.setDepth(2)

    this.physics.world.enable(powerupContainer)
    powerupContainer.body.setAllowGravity(false);
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
    const powerupData = this.powerupTypes.find((p) => p.type === type)
    if (powerupData) {
      this.showCollectionNotification(powerupData)
    }
  }

  showCollectionNotification(powerupData) {
    const textStyle = {
      fontSize: `${24 * this.scaleFactor}px`,
      fill: "#ffffff",
      fontStyle: "bold",
      backgroundColor: "#00000099",
      padding: { x: 15, y: 10 },
      align: "center",
    }

    const notificationText = this.add
      .text(this.width / 2, 80 * this.scaleFactor, `Collected: ${powerupData.displayName}!`, textStyle)
      .setOrigin(0.5)
      .setDepth(2000)

    this.gameUI.add(notificationText)

    this.tweens.add({
      targets: notificationText,
      alpha: { from: 0, to: 1 },
      y: `+=${20 * this.scaleFactor}`,
      duration: 300,
      ease: "Power2",
      yoyo: true,
      hold: 1500,
      onComplete: () => {
        notificationText.destroy()
      },
    })
  }

  showGameAlert(text, color = "#ffffff", duration = 1500) {
    const alertText = this.add
      .bitmapText(this.width / 2, this.height / 2, "pixel_font", text, 48)
      .setOrigin(0.5)
      .setDepth(7000)
      .setTint(color.replace("#", "0x")) // Set the color

    this.gameUI.add(alertText)

    this.tweens.add({
      targets: alertText,
      alpha: { from: 1, to: 0 },
      y: "-=40",
      duration: duration,
      ease: "Power2",
      onComplete: () => {
        alertText.destroy()
      },
    })
  }

  setupEnemyCounter() {
    this.enemyIcons.clear(true, true)
    this.enemyCounterContainer.removeAll(true)

    const totalEnemies = this.enemies.countActive(true)
    const iconSize = 48
    const spacing = 6
    const totalWidth = totalEnemies * (iconSize + spacing) - spacing

    for (let i = 0; i < totalEnemies; i++) {
      const x = -totalWidth / 2 + i * (iconSize + spacing)
      const icon = this.add.image(x, 0, "ui_skull").setDisplaySize(iconSize, iconSize)

      this.enemyCounterContainer.add(icon)
      this.enemyIcons.add(icon)
    }
  }

  createLevelTextUI() {
    const levelX = this.width / 2
    const levelY = 40
    const fontSize = 32

    this.levelText = this.add.bitmapText(levelX, levelY, "pixel_font", "", fontSize).setOrigin(0.5)

    this.gameUI.add(this.levelText)
  }

  createPowerupUI() {
    const powerupContainer = this.add.container(30, 120)
    this.gameUI.add(powerupContainer)

    let xOffset = 0
    const buttonSpacing = 65
    this.powerupButtons = {}

    this.powerupTypes.forEach((powerupData) => {
      const icon = this.add
        .image(xOffset, 0, powerupData.spriteKey)
        .setDisplaySize(50, 50)
        .setOrigin(0, 0.5)
        .setInteractive()
        .on("pointerover", () => {
          this.pointerOnUI = true
        }) // Pointer enters the icon
        .on("pointerout", () => {
          this.pointerOnUI = false
        }) // Pointer leaves the icon
        .on("pointerdown", () => this.usePowerup(powerupData.type))

      const countText = this.add.bitmapText(xOffset + 65, 35, "pixel_font", "0", 36).setOrigin(1, 0.5)

      const barWidth = 60
      const barHeight = 10
      const barY = icon.displayHeight / 2 + 5
      const barX = (icon.displayWidth - barWidth) / 2

      const timerBarBg = this.add.graphics().fillStyle(0x000000, 0.7)
      timerBarBg.fillRect(0, 0, barWidth, barHeight)

      const timerBar = this.add.graphics().fillStyle(powerupData.color, 1)
      timerBar.fillRect(0, 0, barWidth, barHeight)

      const timerContainer = this.add.container(xOffset + barX, barY, [timerBarBg, timerBar])

      timerContainer.setVisible(false)

      powerupContainer.add([icon, countText, timerContainer])

      this.powerupButtons[powerupData.type] = {
        icon: icon,
        countText: countText,
        timerContainer: timerContainer,
        timerBar: timerBar,
      }

      this.updatePowerupCountUI(powerupData.type)

      xOffset += buttonSpacing
    })
  }

  startPowerupTimer(powerupData) {
    const { type, duration } = powerupData
    if (duration === 0) return

    const button = this.powerupButtons[type]
    if (!button || !button.timerContainer) return

    button.timerContainer.setVisible(true)
    button.timerBar.scaleX = 1

    this.tweens.add({
      targets: button.timerBar,
      scaleX: 0,
      duration: duration,
      ease: "Linear",
      onComplete: () => {
        // Hide the timer when it's done
        button.timerContainer.setVisible(false)
      },
    })
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

      this.showGameAlert(`${powerupData.displayName.toUpperCase()} ACTIVATED!`, `#${powerupData.color.toString(16)}`)

      switch (type) {
        case "speedBoost":
          this.applySpeedBoost(powerupData)
          break
        case "doubleDamage":
          this.applyDoubleDamage(powerupData)
          break
        case "extraLife":
          this.applyExtraLife()
          break
        case "freezeEnemies":
          this.applyFreezeEnemies(powerupData)
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
        button.icon.setAlpha(1)
        button.countText.setVisible(true)
      } else {
        button.icon.setAlpha(0.5)
        button.countText.setVisible(false)
      }
    }
  }

  applyExtraLife() {
    if (this.playerLives < this.playerMaxLives) {
      this.playerLives += 10

      this.playerLives = Math.min(this.playerLives, this.playerMaxLives)

      this.updateHealthUI()

      this.sfx.powerup.play()
    }
  }

  applySpeedBoost(powerupData) {
    if (this.speedBoostTimer) {
      this.speedBoostTimer.remove(false)
    }

    this.playerMaxSpeed = this.originalPlayerSpeed * 1.5

    if (this.player && this.player.body) {
      this.player.body.setMaxVelocity(this.playerMaxSpeed, 600) // Keep high Y velocity for jumping
    }

    this.startPowerupTimer(powerupData)

    this.speedBoostTimer = this.time.delayedCall(powerupData.duration, () => {
      this.playerMaxSpeed = this.originalPlayerSpeed

      if (this.player && this.player.body) {
        this.player.body.setMaxVelocity(this.playerMaxSpeed, 600)
      }
    })
  }

  applyDoubleDamage(powerupData) {
    if (this.doubleDamageTimer) {
      this.doubleDamageTimer.remove(false)
    }
    this.doubleDamage = true

    this.startPowerupTimer(powerupData)

    this.doubleDamageTimer = this.time.delayedCall(powerupData.duration, () => {
      this.doubleDamage = false
    })
    //this.vfx.createEmitter("explosion", this.player.x, this.player.y, 1, 0, 300).explode(30)
  }

  applyFreezeEnemies(powerupData) {
    if (this.freezeEnemiesTimer) {
      this.freezeEnemiesTimer.remove(false)
    }

    this.startPowerupTimer(powerupData)

    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy.active) return
      enemy.body.moves = false
      enemy.isFrozen = true
      enemy.sprite.setTint(0x99ccff)
      //this.vfx.createEmitter("iceBlue", enemy.x, enemy.y, 0.5, 0, 800).explode(15)
      //this.vfx.createEmitter("whiteSoft", enemy.x, enemy.y, 0.4, 0, 800).explode(10)
    })

    //this.vfx.createEmitter("iceBlue", this.player.x, this.player.y, 0.8, 0, 500).explode(12)
    //this.vfx.createEmitter("whiteSoft", this.player.x, this.player.y, 0.6, 0, 500).explode(8)
    this.cameras.main.shake(150, 0.004)

    this.freezeEnemiesTimer = this.time.delayedCall(powerupData.duration, () => {
      this.enemies.getChildren().forEach((enemy) => {
        if (!enemy.active) return
        enemy.body.moves = true
        enemy.isFrozen = false
        enemy.sprite.clearTint()
      })
    })
  }

  fireBullet(shooter, targetX, targetY, bulletGroup, bulletSpeed = 500) {
    if (shooter === this.player) {
      if (this.player.currentAmmo <= 0 || this.player.isReloading) {
        if (this.player.currentAmmo <= 0) {
          if (this.sfx && this.sfx.click) {
            this.sfx.click.play()
          }
          this.showGameAlert("NO AMMO! PRESS 'R' TO RELOAD", "#ff4444", 800)
        }
        return
      }
      this.player.currentAmmo--
      this.updateWeaponUI()
      this.sfx.shootBasic.play()
    }

    let spawnX, spawnY, finalAngle
    const bulletConfig = {
      texture: "projectile",
      scale: 0.1 * this.scaleFactor,
      damage: 1,
      spread: 0,
      pellets: 1,
      piercing: false,
      tint: 0xffffff,
    }

    if (shooter === this.player) {
      // Player-specific logic to fire from the gun barrel
      const weapon = this.player.weapon
      const barrelLength = 20 // Distance from gun's origin to its tip

      // Get the weapon's true position and rotation in the world
      const weaponMatrix = weapon.getWorldTransformMatrix()
      const weaponWorldX = weaponMatrix.tx
      const weaponWorldY = weaponMatrix.ty
      finalAngle = weapon.rotation // The weapon's rotation is already the correct aiming angle

      // Calculate the barrel tip's world position
      spawnX = weaponWorldX + Math.cos(finalAngle) * barrelLength
      spawnY = weaponWorldY + Math.sin(finalAngle) * barrelLength
    } else {
      // Original logic for enemies
      const spawnOffset = 35 * this.scaleFactor
      finalAngle = Phaser.Math.Angle.Between(shooter.x, shooter.y, targetX, targetY)
      spawnX = shooter.x + Math.cos(finalAngle) * spawnOffset
      spawnY = shooter.y + Math.sin(finalAngle) * spawnOffset
    }

    const fireSingleBullet = () => {
      const bullet = bulletGroup.create(spawnX, spawnY, bulletConfig.texture)
bullet.body.setAllowGravity(false);
      if (!bullet) return

      bullet.setDepth(2)
      bullet.setActive(true)
      bullet.setVisible(true)
      bullet.setOrigin(0.5)
      bullet.setDisplaySize(10, 10)
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
      fireSingleBullet()
    }
  }

  hitEnemy(bullet, enemy) {
    this.hitStop(30)
    const damage = this.doubleDamage ? 5 : 1
    enemy.health -= damage
    this.sfx.enemyHit.play()

    //this.vfx.createEmitter("orange", enemy.x, enemy.y, 1, 0, 500).explode(15)
    //this.vfx.createEmitter("yellow", bullet.x, bullet.y, 0.5, 0, 300).explode(8)

    if (enemy.health <= 0) {
      this.killEnemy(enemy)
    } else {
      enemy.sprite.setTint(0xff0000) // Changed to enemy.sprite
      this.time.delayedCall(100, () => enemy.sprite.clearTint()) // Changed to enemy.sprite
    }
    bullet.disableBody(true, true)
  }

  hitPlayer(player, bullet) {
    console.log("--- TRYING TO APPLY BULLET DAMAGE ---")
    if (this.player.isInvincible) {
      console.log("Player is invincible, no bullet damage taken.")
      bullet.disableBody(true, true) // Still remove the bullet
      return
    }

    bullet.disableBody(true, true)
    this.sfx.playerHit.play()
    this.bulletHitCounter++

    if (this.bulletHitCounter >= 2) {
      this.playerLives -= 10
      this.bulletHitCounter = 0
      this.updateHealthUI()
      console.log(`BULLET DAMAGE APPLIED! New lives: ${this.playerLives}`)
    }

    player.sprite.setTint(0xff0000)
    this.time.delayedCall(
      200,
      () => {
        if (player && player.sprite) {
          player.sprite.clearTint()
        }
      },
      [],
      this,
    )

    // This is the correct block to use
    if (this.playerLives <= 0 && !this.isPlayerDead) {
      console.log(">>> GAME OVER FROM BULLET! <<<")
      this.isPlayerDead = true
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

    //this.vfx.createEmitter("red", enemyX, enemyY, 1, 0, 500).explode(20)
    //this.vfx.createEmitter("yellow", enemyX, enemyY, 1, 0, 500).explode(20)
    //this.vfx.createEmitter("orange", enemyX, enemyY, 1, 0, 500).explode(20)

    this.cameras.main.shake(200, 0.01)

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
    const diamond = this.diamonds.create(x, y, "collectible").setDisplaySize(20, 20)
  }

  collectDiamond(player, diamond) {
    diamond.disableBody(true, true)
    this.diamondsCollected++
    this.scoreText.setText(this.diamondsCollected.toString())
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

  // Add this new function anywhere inside your GameScene class
  handleReload() {
    if (this.player.currentAmmo < this.player.maxAmmo && !this.player.isReloading) {
      this.showGameAlert("RELOADING...", "#24cacf")
      this.player.isReloading = true
      this.reloadBarContainer.setVisible(true)
      this.reloadBar.scaleX = 1

      this.tweens.add({
        targets: this.reloadBar,
        scaleX: 0,
        duration: 2000,
        ease: "Linear",
      })

      this.time.delayedCall(2000, () => {
        this.player.currentAmmo = this.player.maxAmmo
        this.updateWeaponUI()
        this.player.isReloading = false
        this.reloadBarContainer.setVisible(false)
      })
    }
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

    // Set the flipX based on horizontal direction
    if (dir === "left") {
      enemy.sprite.setFlipX(true)
    } else if (dir === "right") {
      enemy.sprite.setFlipX(false)
    }

    this.tweens.add({
      targets: enemy,
      x: targetX,
      y: targetY,
      duration: speed,
      ease: "Linear",
      onComplete: () => {
        enemy.isMoving = false
        enemy.x = targetX,
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
    initiateGameOver.bind(this)({
      score: this.diamondsCollected,
    })
  }

  pauseGame() {
    handlePauseGame.bind(this)()
  }

update(time, delta) {
    if (this.isPlayerDead) {
        return;
    }

    if (this.crosshair) {
        const pointer = this.input.activePointer;
        this.crosshair.setPosition(pointer.worldX, pointer.worldY);
    }

    if (this.player && this.player.active) {
        const pointer = this.input.activePointer;
        const playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);
        const pointerPos = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);

        const weight = 0.3;
        this.cameraTarget.x = Phaser.Math.Interpolation.Linear([playerPos.x, pointerPos.x], weight);
        this.cameraTarget.y = Phaser.Math.Interpolation.Linear([playerPos.y, pointerPos.y], weight);

        const cameraLerp = 0.15;
        const targetX = this.cameraTarget.x - this.cameras.main.width / 2;
        const targetY = this.cameraTarget.y - this.cameras.main.height / 2;

        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, targetX, cameraLerp);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, targetY, cameraLerp);
    }

    if (this.bg) {
        this.bg.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.bg.tilePositionY = this.cameras.main.scrollY * 0.3;
    }

    if (this.gameUI) {
        this.gameUI.x = this.cameras.main.worldView.x;
        this.gameUI.y = this.cameras.main.worldView.y;
        this.gameUI.setScale(1 / this.cameras.main.zoom);
    }

    if (this.levelTransitioning || !this.player || !this.player.active) return;
    
    this.player.onLadder = false;

    if (this.isMobile) {
        // --- MOBILE CONTROLS ---
        if (this.joystick && this.joystick.force > 0.1) {
            // Horizontal Movement
            this.player.body.setVelocityX(this.joystick.forceX / this.joystick.radius * this.playerMaxSpeed);

            // Ladder climbing
            const onLadder = this.physics.world.overlap(this.player, this.ladders);
            if (onLadder) {
                 this.player.body.setAllowGravity(false);
                 if (this.joystick.forceY < -this.joystick.radius * 0.5) { // Moving joystick up
                     this.player.body.setVelocityY(-this.playerMaxSpeed);
                 } else if (this.joystick.forceY > this.joystick.radius * 0.5) { // Moving joystick down
                     this.player.body.setVelocityY(this.playerMaxSpeed);
                 } else {
                     this.player.body.setVelocityY(0);
                 }
            } else {
                this.player.body.setAllowGravity(true);
            }

            // Aiming and Flipping Sprite
            const weaponData = this.weaponTypes[this.player.currentWeapon];
            this.player.weapon.rotation = this.joystick.angle();
            if (this.joystick.forceX < 0) {
                this.player.sprite.setFlipX(true);
                this.player.weapon.x = -weaponData.offsetX;
            } else {
                this.player.sprite.setFlipX(false);
                this.player.weapon.x = weaponData.offsetX;
            }

            if (this.player.weapon.rotation < -Math.PI / 2 || this.player.weapon.rotation > Math.PI / 2) {
                this.player.weapon.setFlipY(true);
            } else {
                this.player.weapon.setFlipY(false);
            }

        } else {
             // Stop player if joystick is not in use
             this.player.body.setVelocityX(0);
             const onLadder = this.physics.world.overlap(this.player, this.ladders);
             if (onLadder) {
                this.player.body.setVelocityY(0); // Hover on ladder
             }
        }
    } else {
        // --- DESKTOP CONTROLS ---
        
        // ** FIX: Moved variable declaration inside the desktop 'else' block **
        const jumpPressed = Phaser.Input.Keyboard.JustDown(this.keys.jump);
        
        const pointer = this.input.activePointer;
        const weaponData = this.weaponTypes[this.player.currentWeapon];
        
        // Aiming Logic (no changes)
        const aimAngleRaw = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
        if (pointer.worldX < this.player.x) {
            this.player.sprite.setFlipX(true);
            this.player.weapon.x = -weaponData.offsetX;
        } else {
            this.player.sprite.setFlipX(false);
            this.player.weapon.x = weaponData.offsetX;
        }
        const forwardAngle = this.player.sprite.flipX ? Math.PI : 0;
        let angleDifference = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(forwardAngle), Phaser.Math.RadToDeg(aimAngleRaw));
        angleDifference = Phaser.Math.Clamp(angleDifference, -90, 90);
        const finalAngle = forwardAngle + Phaser.Math.DegToRad(angleDifference);
        this.player.weapon.rotation = finalAngle;
        if (finalAngle < -Math.PI / 2 || finalAngle > Math.PI / 2) {
            this.player.weapon.setFlipY(true);
        } else {
            this.player.weapon.setFlipY(false);
        }



// Movement & Jumping Logic
        // -----------------------------------------------------------------

        // --- Horizontal Movement (Always Active) ---
        let moveX = 0;
        if (this.moveState.left) {
            moveX = -1;
        } else if (this.moveState.right) {
            moveX = 1;
        }
        this.player.body.setVelocityX(moveX * this.playerMaxSpeed);


        // --- Ladder vs. Ground Logic ---
        // Manually check if the player's body is currently overlapping with the ladders group.
        const onLadder = this.physics.world.overlap(this.player, this.ladders);

        if (onLadder) {
            // State: ON LADDER
            // The player is touching a ladder, so disable gravity and enable climbing.
            this.player.body.setAllowGravity(false);
            this.player.setDepth(4);

            if (this.keys.up.isDown) { // W key to climb
                this.player.body.setVelocityY(-this.playerMaxSpeed);
            } else if (this.keys.down.isDown) { // S key to descend
                this.player.body.setVelocityY(this.playerMaxSpeed);
            } else {
                this.player.body.setVelocityY(0); // Hover in place
            }

        } else {
            // State: NOT ON LADDER (Ground or Air)
            // The player is not touching a ladder, so gravity is active.
            this.player.body.setAllowGravity(true);
            this.player.setDepth(0);

            // Check for a jump command.
            const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.keys.jump);
            const wJustPressed = Phaser.Input.Keyboard.JustDown(this.keys.up);

            if ((spaceJustPressed || wJustPressed) && this.player.body.blocked.down) {
                // Only jump if on the ground.
                this.player.body.setVelocityY(-this.playerJumpPower);
            }
        }
        
        // -----------------------------------------------------------------

        // At the end of every frame, reset the ladder flag.
        // The physics overlap will set it to true again on the next frame if needed.
        this.player.onLadder = false;
        
        // -----------------------------------------------------------------
        
        if (jumpPressed) {
            console.log(
                `Jump attempt: onGround=${this.player.body.blocked.down}, onLadder=${this.player.onLadder}, vy=${this.player.body.velocity.y}`
            );
        }

        const canShoot = !this.pointerOnUI && pointer.isDown;
        if (canShoot && this.playerFireCooldown <= 0) {
            this.fireBullet(this.player, pointer.worldX, pointer.worldY, this.playerBullets);
            this.playerFireCooldown = this.playerFireRate;
        }
    }

    if (this.playerFireCooldown > 0) {
        this.playerFireCooldown -= delta
    }

    if (this.diamonds && this.player && this.player.active) {
        this.diamonds.children.each((diamond) => {
            if (diamond.active && diamond.body) {
                const angle = Phaser.Math.Angle.Between(diamond.x, diamond.y, this.player.x, this.player.y)
                this.physics.velocityFromRotation(angle, this.diamondAttractionForce, diamond.body.velocity)
            }
        })
    }

// Replace the entire enemies.children.iterate block in your update function with this final version.
this.enemies.children.iterate((enemy) => {
    if (!enemy.active || enemy.isFrozen || !enemy.visionCone) return;
    enemy.isVisible = this.isEnemyVisible(enemy);
    const distToPlayer = Phaser.Math.Distance.Between(enemy.x, enemy.y, this.player.x, this.player.y);
    const hasLOS = this.hasLineOfSight(enemy.x, enemy.y, this.player.x, this.player.y);

    // If the enemy has a clear line of sight and is close, it stops and attacks.
    if (enemy.isVisible && distToPlayer < (this.tileSize * 6) && hasLOS) {
        
        // If the enemy is moving, kill its tween to prevent jitter.
        if (enemy.isMoving) {
            this.tweens.killTweensOf(enemy);
            enemy.isMoving = false;        
        }
        enemy.body.setVelocity(0); 

        // Aiming and shooting logic...
        if (this.player.x < enemy.x) {
            enemy.sprite.setFlipX(true);
        } else {
            enemy.sprite.setFlipX(false);
        }
        if (time > enemy.nextFireTime) {
            this.fireBullet(enemy, this.player.x, this.player.y, this.enemyBullets);
            enemy.nextFireTime = time + 600;
        }
    }
    // Otherwise, continue pathfinding.
    else {
        if (!enemy.isMoving && enemy.body.moves) {
            this.smartEnemyMovement(enemy);
        }
    }

    // This handles the off-screen direction arrows.
    if (enemy.isVisible) {
        if (enemy.directionArrow) {
            enemy.directionArrow.destroy();
            enemy.directionArrow = null;
        }
    } else {
        if (!enemy.directionArrow) {
            const arrow = this.add.graphics().fillStyle(0xff0000, 1).lineStyle(1, 0xffffff, 1);
            arrow.beginPath().moveTo(0, -5).lineTo(5, 5).lineTo(-5, 5).closePath().fillPath().strokePath();
            arrow.setDepth(2000);
            this.enemyDirectionArrows.add(arrow);
            enemy.directionArrow = arrow;
        }
        const cam = this.cameras.main;
        const padding = 50;
        const arrowX = Phaser.Math.Clamp(enemy.x, cam.worldView.x + padding, cam.worldView.right - padding);
        const arrowY = Phaser.Math.Clamp(enemy.y, cam.worldView.y + padding, cam.worldView.bottom - padding);
        enemy.directionArrow.setPosition(arrowX, arrowY);
        const angle = Phaser.Math.Angle.Between(arrowX, arrowY, enemy.x, enemy.y);
        enemy.directionArrow.setRotation(angle + Math.PI / 2);
    }
});

    if (this.mazeEndpoint && this.directionArrows.length > 0) {
        this.updateDirectionArrows()
    }
}

  hitStop(duration) {
    this.physics.pause()
    this.time.delayedCall(duration, () => {
      this.physics.resume()
    })
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
  pixelArt: false,
  render: {
    pixelArt: false,
    roundPixels: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 }, // Added gravity for platformer
      debug: false, // Changed to false for cleaner look
    },
  },
  dataObject: {
    name: _CONFIG.title,
    description: _CONFIG.description,
    instructions: _CONFIG.instructions,
  },
  deviceOrientation: _CONFIG.deviceOrientation === "landscape",
}


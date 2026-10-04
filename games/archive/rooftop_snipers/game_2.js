// ADD THIS SCENE at the top of game.js

// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // Preload the font if not already loaded elsewhere
        const fontName = "pix";
        const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/";
        this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml");
    }

    create() {
        this.add.bitmapText(this.game.config.width / 2, this.game.config.height / 3, 'pixelfont', 'Rooftop Snipers', 96).setOrigin(0.5);

        // --- Player vs AI Button ---
        const pveButton = this.add.bitmapText(this.game.config.width / 2, this.game.config.height / 2 + 50, 'pixelfont', 'Player vs AI', 64).setOrigin(0.5);
        pveButton.setInteractive({ cursor: 'pointer' });
        pveButton.on('pointerdown', () => {
            // Start the game in Player vs. AI mode
            this.scene.start('GameScene', { gameMode: 'pve' });
        });

        // --- Player vs Player Button ---
        const pvpButton = this.add.bitmapText(this.game.config.width / 2, this.game.config.height / 2 + 150, 'pixelfont', 'Player vs Player', 64).setOrigin(0.5);
        pvpButton.setInteractive({ cursor: 'pointer' });
        pvpButton.on('pointerdown', () => {
            // Go to the instructions screen for PvP mode
            this.scene.start('InstructionsScene', { gameMode: 'pvp' });
        });
    }
}


// ADD THIS SCENE as well, right after MainMenuScene

// Instructions Scene for PvP
class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionsScene' });
    }

    init(data) {
        // Get the game mode passed from the main menu
        this.gameMode = data.gameMode;
    }
    
    preload() {
        // Preload the font if not already loaded elsewhere
        const fontName = "pix";
        const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/";
        this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml");
    }

    create() {
        this.add.bitmapText(this.game.config.width / 2, 100, 'pixelfont', 'Controls', 80).setOrigin(0.5);

        // Player 1 Controls
        this.add.bitmapText(this.game.config.width / 4, 250, 'pixelfont', 'Player 1', 64).setOrigin(0.5);
        this.add.bitmapText(this.game.config.width / 4, 350, 'pixelfont', 'W : JUMP', 48).setOrigin(0.5);
        this.add.bitmapText(this.game.config.width / 4, 420, 'pixelfont', 'SPACE : SHOOT', 48).setOrigin(0.5);

        // Player 2 Controls
        this.add.bitmapText(this.game.config.width * 0.75, 250, 'pixelfont', 'Player 2', 64).setOrigin(0.5);
        this.add.bitmapText(this.game.config.width * 0.75, 350, 'pixelfont', 'UP ARROW : JUMP', 48).setOrigin(0.5);
        this.add.bitmapText(this.game.config.width * 0.75, 420, 'pixelfont', 'P : SHOOT', 48).setOrigin(0.5);

        // --- Start Game Button ---
        const startButton = this.add.bitmapText(this.game.config.width / 2, this.game.config.height - 100, 'pixelfont', 'Start Game', 64).setOrigin(0.5);
        startButton.setInteractive({ cursor: 'pointer' });
        startButton.on('pointerdown', () => {
            // Start the game with the chosen mode (pvp)
            this.scene.start('GameScene', { gameMode: this.gameMode });
        });
    }
}

// Game Scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" })

    // Initialize ALL game variables properly
    this.score = 0
    this.isGameOver = false
    this.playerScore = 0
    this.aiScore = 0
    this.roundsToWin = 5
    this.gameStarted = false
    this.roundActive = false
     this.gameMode = 'pve';

    // Player ragdoll objects - initialize as null
    this.playerRagdoll = null
    this.opponentRagdoll  = null
    this.opponentRagdoll = null

    // Physics groups - initialize as null
    this.platforms = null
    this.bullets = null
    this.mainPlatform = null


    // Jump states
    this.playerCanJump = true
    this.aiCanJump = true
    this.jumpCooldown = 200

    // AI difficulty settings
this.aiDifficulty = {
  reactionTime: 800,
  shootAccuracy: 0.7,
  jumpFrequency: 0.3,
  aggressiveness: 0.6,
  dodgeChance: 0.4,
  aimPrecisionChance: 0.75 // Add this line - 75% chance to aim accurately
};

    // AI timers
    this.aiNextAction = 0
    this.aiLastJump = 0
    this.aiLastShoot = 0

    // In GameScene constructor()
this.playerCanJump = true;

this.aimingState = "ready"; // Can be "ready" or "aiming"
this.aimingAngle = 0;
this.lockedAngle = null;
this.firePower = 35; // A fixed power for all shots. Adjust this value as needed.
this.angleDirection = 1; // 1 for down, -1 for up

// Visual aiming lines
this.playerAimLine = null;
this.aiAimLine = null;

    // Screen properties
    this.width = 0
    this.height = 0
    this.isMobile = false
    this.scaleFactor = 1

    // UI elements
    this.playerScoreText = null
    this.aiScoreText = null
    this.pauseButton = null

    // Sound objects
    this.sounds = {}


  }

  preload() {
    this.isGameOver = false

    // Load assets from config
    for (const key in _CONFIG.imageLoader) {
      this.load.image(key, _CONFIG.imageLoader[key])
    }

    for (const key in _CONFIG.soundsLoader) {
      this.load.audio(key, [_CONFIG.soundsLoader[key]])
    }

    // Load UI assets
    this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png")
    const fontName = "pix"
    const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/"
    this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml")

       this.displayProgressLoader()
  }

  create() {
this.matter.world.setBounds(0, 0, this.width * 3, this.height);
    this.time.delayedCall(500, () => {
  this.startNewRound();
});
    //("Creating game scene...")

    // Initialize screen properties
    this.width = this.game.config.width
    this.height = this.game.config.height
    this.isMobile = !this.sys.game.device.os.desktop

    // Calculate scale factor
    const isPortrait = this.height > this.width
    this.scaleFactor = isPortrait ? this.width / 800 : this.width / 1200

    // Initialize sounds with safety checks
    this.initializeSounds()

    // Add background
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.width, this.height)
.setScrollFactor(0);
    // Create physics world with Matter.js
    this.createPhysicsWorld()

    // Create platform FIRST
    this.createPlatform()

    this.createDeathPlatform();

    // Create ragdoll players AFTER platform
    this.createRagdollPlayers()

    // Setup UI
    this.setupUI()

    // Setup controls
    this.setupControls()

    // Setup collisions AFTER everything is created
    this.setupCollisions()

    // Initialize aiming graphics
    this.playerAimLine = this.add.graphics().setDepth(2)
    this.aiAimLine = this.add.graphics().setDepth(2)

    // Start the game after a delay to ensure everything is ready
    this.time.delayedCall(500, () => {
      this.startNewRound()
    })

    //("Game scene created successfully")
  }

  initializeSounds() {
    this.sounds = {}
    const soundKeys = ["background", "shoot", "jump", "damage", "success"]

    soundKeys.forEach((key) => {
      try {
        this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 })
      } catch (error) {
        console.warn(`Could not load sound: ${key}`)
      }
    })

    // Start background music if available
    if (this.sounds.background) {
      try {
        this.sounds.background.setVolume(0.1).setLoop(true).play()
      } catch (error) {
        console.warn("Could not play background music")
      }
    }
  }

createPhysicsWorld() {
    // Enhanced gravity and physics settings
    this.matter.world.update30Hz();
    this.matter.world.runner.isFixed = true;
    
    // Adjust global physics for snappier feel
    this.matter.world.engine.world.gravity.y = 1.0; // Slightly stronger gravity
    this.matter.world.engine.world.gravity.scale = 0.001;
    
    this.bulletsArray = [];
}


// REPLACE your existing createPlatform function with this one
init(data) {
    // Get the game mode, defaulting to 'pve' (player vs ai) if none is passed
    this.gameMode = data.gameMode || 'pve';
}
createPlatform() {
    // Make the platform much wider than the screen to create a long arena.
    const platformWidth = this.width * 0.8; // Platform will be 60% of the screen width
    const platformHeight = 40;
    const platformX = this.width / 2;
    // Set a fixed Y position for the platform.
    const platformY = this.height - 100;

    const platformBody = this.matter.add.rectangle(platformX, platformY, platformWidth, platformHeight, {
      isStatic: true,
      label: "platform",
      friction: 1.0,
      frictionStatic: 1.0
    });

    const platformGraphics = this.add.graphics({ fillStyle: { color: 0x666666 } });
    platformGraphics.fillRect(-platformWidth / 2, -platformHeight / 2, platformWidth, platformHeight);
    
    this.mainPlatform = this.matter.add.gameObject(platformGraphics, platformBody);
    this.mainPlatform.yPos = platformY;
}
  createDeathPlatform() {
    const platformWidth = this.width * 10; // Make it very wide
    const platformHeight = 50;
    const platformX = this.width / 2;
    // Position it well below the main platform
    const platformY = this.height + 300; 

    const deathPlatformBody = this.matter.add.rectangle(platformX, platformY, platformWidth, platformHeight, {
        isStatic: true,
        // This label is crucial for collision detection
        label: "deathPlatform", 
        // Make it a sensor so ragdolls pass through it slightly before triggering
        isSensor: true 
    });

    // You can add a visual for debugging, but it's not necessary
    const platformGraphics = this.add.graphics({ fillStyle: { color: 0xff0000 } }); // Red color
    platformGraphics.fillRect(-platformWidth / 2, -platformHeight / 2, platformWidth, platformHeight);
    this.matter.add.gameObject(platformGraphics, deathPlatformBody);
}

createRagdollPlayers() {
    const platformY = this.height - 100;
    const spawnY = platformY - 120; // Spawn above the platform

    // Create Player 1 (Human player) ragdoll on the left
    this.playerRagdoll = this.createSimpleRagdoll(this.width * 0.3, spawnY, "player", false);

    // Create Opponent (AI or Player 2) ragdoll on the right
    const opponentType = this.gameMode === 'pvp' ? 'player' : 'ai'; // Use 'player' style for P2
    this.opponentRagdoll = this.createSimpleRagdoll(this.width * 0.7, spawnY, opponentType, true);
}

createSimpleRagdoll(x, y, type, flipX = false) {
    const isPlayer = type === 'player';
    const group = this.matter.world.nextGroup(true);

    // --- Define Ragdoll Proportions (Increased Size) ---
    // Highlight: All these values have been increased for a larger ragdoll
    const bodyWidth = 40;
    const bodyHeight = 200;
    const headRadius = 25;
    const feetHeight = 10;
    const armLength = 80;
    const armWidth = 14;
    const shoulderOffset = { x: bodyWidth / 2, y: -bodyHeight / 2 + 15 };


        // --- Create Feet (New Part) ---
const feetY = y + bodyHeight / 2;
const feet = this.matter.add.rectangle(x, feetY, bodyWidth, feetHeight, {
    collisionFilter: { group: group },
    mass: 10, // Give feet some weight to be a stable base
    friction: 1.0, // High friction to prevent sliding
    frictionStatic: 1.0,
    label: type + "_feet",
    inertia: Infinity
});

    // --- Create Body ---
// In the body creation section, modify the physics properties:
const body = this.matter.add.rectangle(x, y, bodyWidth, bodyHeight, {
    collisionFilter: { group: group },
    chamfer: { radius: 8 },
    mass: 15, // Reduced from 20 for more responsive movement
    friction: 0.8, // Slightly reduced for more sliding
    frictionStatic: 0.9,
    frictionAir: 0.08 // Increased air resistance for more control
});

    body.label = type + "_body";



// --- Create Joints ---
// New joint to connect body to feet
this.matter.add.constraint(body, feet, 0, 1, {
    pointA: { x: 0, y: bodyHeight / 2 }, // Bottom of the body
    pointB: { x: 0, y: -feetHeight / 2 }, // Top of the feet
    length: 0,
    stiffness: 0.5 // Very stiff connection
});

    // --- Create Head ---
    // Highlight: Updated Y position to place the head directly above the body
    const headY = y - (bodyHeight/2) - headRadius;
const head = this.matter.add.circle(x, headY, headRadius, {
  collisionFilter: { group: group },
  mass: 5,
  friction: 0.8,
  frictionStatic: 1.0,
  frictionAir: 0.05
});

    head.label = type + "_head";

    // --- Create Arms ---
    const armX = flipX ? -shoulderOffset.x : shoulderOffset.x;

    const rightArm = this.matter.add.rectangle(x + armX, y + shoulderOffset.y, armWidth, armLength, {
        collisionFilter: { group: group },
        chamfer: { radius: 6 },
        mass: 1,
        friction: 0.9,
frictionStatic: 1.0,
frictionAir: 0.05
 // Highlight: Increased mass
    });
    rightArm.label = type + "_right_arm";

    // --- Create Joints ---
    // Neck Joint
    this.matter.add.constraint(body, head, 0, 1, {
        pointA: { x: 0, y: -bodyHeight / 2 }, // Top of the body
        pointB: { x: 0, y: 0 },              // Center of the head
        // Highlight: Set length to headRadius to keep the head above the body
        length: headRadius, 
        stiffness: 0.1
    });

    this.matter.add.constraint(body, rightArm, 0, 1, {
    pointA: { x: bodyWidth / 2, y: -bodyHeight / 2 + 10 }, // Adjusted
    pointB: { x: 0, y: -armLength / 2 },  
        length: 0,
        stiffness: 0.05
    });
    
    // --- Create Visuals ---
    const bodyVisual = this.add.rectangle(x, y, bodyWidth, bodyHeight, isPlayer ? 0x333333 : 0x222222).setDepth(1);
    const faceTexture = isPlayer ? 'player_face' : 'ai_face';
    const headVisual = this.add.image(x, headY, faceTexture).setDepth(3).setDisplaySize(100,100);
    const rightArmVisual = this.add.rectangle(x, y, armWidth, armLength, isPlayer ? 0xEEEEEE : 0xDDDDDD).setDepth(2);
    const feetVisual = this.add.rectangle(x, y, bodyWidth, feetHeight, isPlayer ? 0x111111 : 0x000000).setDepth(1);
    
    if (flipX) {
        headVisual.setFlipX(true);
    }

    // --- Return the new ragdoll object ---
const ragdoll = {
    head: { body: head, visual: headVisual },
    body: { body: body, visual: bodyVisual },
    feet: { body: feet, visual: feetVisual }, // Add feet to the ragdoll object
    rightArm: { body: rightArm, visual: rightArmVisual, length: armLength },
    alive: true,
    type: type,
    flipX: flipX,
    isWobbly: false
};
    
    body.ragdoll = ragdoll;
    head.ragdoll = ragdoll;
    rightArm.ragdoll = ragdoll;
    feet.ragdoll = ragdoll;

    return ragdoll;
}
// REPLACE your old setupUI function with this one

// REPLACE your old setupUI function with this one
setupUI() {
    // Score display
    const scoreY = 60;
    this.playerScoreText = this.add
      .bitmapText(this.width * 0.25, scoreY, "pixelfont", "PLAYER 1: 0", 48 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(11)
      .setScrollFactor(0);

    const opponentLabel = this.gameMode === 'pvp' ? 'PLAYER 2: 0' : 'AI: 0';
    this.aiScoreText = this.add
      .bitmapText(this.width * 0.75, scoreY, "pixelfont", opponentLabel, 48 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(11)
      .setScrollFactor(0);


    // VS text (Optional, you can remove if you have labels above)
    this.add
      .bitmapText(this.width / 2, scoreY, "pixelfont", "VS", 48 * this.scaleFactor)
      .setOrigin(0.5)
      .setDepth(11)
      .setScrollFactor(0);

    // Instructions for desktop
    if (!this.isMobile && this.gameMode !== 'pvp') {
      const instructionY = this.height - 40;
      this.add
        .bitmapText(this.width / 2, instructionY, "pixelfont", "W: JUMP  SPACE: SHOOT", 32 * this.scaleFactor)
        .setOrigin(0.5)
        .setDepth(11)
        .setScrollFactor(0);
    }

    // Pause button
    this.pauseButton = this.add
      .sprite(this.width - 60, 60, "pauseButton")
      .setOrigin(0.5, 0.5)
      .setDepth(11)
      .setScrollFactor(0);
    this.pauseButton.setInteractive({ cursor: "pointer" });
    this.pauseButton.setScale(3 * this.scaleFactor);
    this.pauseButton.on("pointerdown", () => this.pauseGame());
}
  setupMobileControls() {
    const buttonSize = 80 * this.scaleFactor
    const buttonY = this.height - 100

     // Enhanced button events with proper checks
    this.jumpBtn.on("pointerdown", () => {
        if (this.canRagdollJump(this.playerRagdoll)) {
            this.jumpRagdoll(this.playerRagdoll);
        } else {
            // Visual feedback - make button flash red briefly
            this.tweens.add({
                targets: this.jumpBtn,
                fillColor: 0xff0000,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.jumpBtn.fillColor = 0x4caf50; // Reset to green
                }
            });
        }
    });
    
    this.shootBtn.on("pointerdown", () => {
        this.handlePlayerShootInput();
    });
}

// REPLACE your existing setupControls function with this one
setupControls() {
    this.input.keyboard.removeAllListeners();

    // --- Player 1 Controls ---
    this.input.keyboard.on("keydown-W", () => {
        if (this.roundActive && this.playerRagdoll && this.playerRagdoll.alive && this.playerCanJump) {
            this.jumpRagdoll(this.playerRagdoll);
            this.playerCanJump = false;
        }
    });

    this.input.keyboard.on("keydown-SPACE", () => {
        this.handlePlayerShootInput(); // This already handles Player 1 shooting
    });

    // --- Player 2 Controls (only in PvP mode) ---
    if (this.gameMode === 'pvp') {
        // We need a separate jump variable for player 2
        this.opponentCanJump = true; 
        
        // We need a separate aiming system for player 2
        this.opponentAimingState = 'ready';
        this.opponentAimingAngle = 0;
        this.opponentAngleDirection = 1;
        this.opponentAimLine = this.add.graphics().setDepth(2);

        this.input.keyboard.on("keydown-UP", () => {
            if (this.roundActive && this.opponentRagdoll && this.opponentRagdoll.alive && this.opponentCanJump) {
                this.jumpRagdoll(this.opponentRagdoll);
                this.opponentCanJump = false;
            }
        });

        this.input.keyboard.on("keydown-P", () => {
            if (!this.opponentRagdoll || !this.opponentRagdoll.alive || !this.roundActive) return;

            if (this.opponentAimingState === 'ready') {
                this.opponentAimingState = 'aiming';
            } else if (this.opponentAimingState === 'aiming') {
                this.shootBullet(this.opponentRagdoll, 2, this.opponentAimingAngle, this.firePower);
                this.opponentAimingState = 'ready';
            }
        });
    }
}



showJumpBlocked() {
    // Create a quick red flash near the player to show jump is blocked
    if (this.playerRagdoll && this.playerRagdoll.alive) {
        const x = this.playerRagdoll.body.body.position.x;
        const y = this.playerRagdoll.body.body.position.y - 30;
        
        const flash = this.add.text(x, y, "CAN'T JUMP", {
            fontSize: '16px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: flash,
            y: y - 20,
            alpha: 0,
            duration: 500,
            onComplete: () => flash.destroy()
        });
    }
}


// REPLACE your existing setupCollisions function with this one
setupCollisions() {
    // Use the generic opponentRagdoll variable
    if (!this.playerRagdoll || !this.opponentRagdoll) {
      console.error("Cannot setup collisions - objects not created");
      return;
    }

    // Event for checking ground contact to re-enable jumping
    this.matter.world.on('collisionactive', (event) => {
        for (const pair of event.pairs) {
            const { bodyA, bodyB } = pair;
            const labels = [bodyA.label, bodyB.label];

            // Check if any part of a player is touching the platform
            if (labels.includes('platform')) {
                if (labels.some(l => l.includes('player_'))) {
                    this.playerCanJump = true;
                }
                // In PVP mode, opponent also uses 'player_' label, so we check ragdoll type
                if (labels.some(l => l.includes(this.opponentRagdoll.type))) {
                    if(this.gameMode === 'pvp') this.opponentCanJump = true;
                    else this.aiCanJump = true;
                }
            }
        }
    });

    // Event for bullet hits and falling off the map
    this.matter.world.on("collisionstart", (event) => {
        for (const pair of event.pairs) {
            const { bodyA, bodyB } = pair;
            if (!bodyA.label || !bodyB.label) continue;

            this.handleDeathCollision(bodyA, bodyB);
            this.handleBulletCollision(bodyA, bodyB);
        }
    });
}


// ADD this new helper function to your GameScene class
handleDeathCollision(bodyA, bodyB) {
    let ragdollBody = null;
    if (bodyA.label === 'deathPlatform' && (bodyB.label.includes('player_') || bodyB.label.includes('ai_'))) {
        ragdollBody = bodyB;
    } else if (bodyB.label === 'deathPlatform' && (bodyA.label.includes('player_') || bodyA.label.includes('ai_'))) {
        ragdollBody = bodyA;
    }

    if (ragdollBody) {
        if (ragdollBody.label.includes('player_')) {
            this.playerFellOff(1); // Player 1 fell
        } else if (ragdollBody.label.includes('ai_')) {
            this.playerFellOff(2); // Opponent fell
        }
    }
}

// ADD this new helper function to your GameScene class
handleBulletCollision(bodyA, bodyB) {
    const isBulletA = bodyA.label.includes('bullet');
    const isBulletB = bodyB.label.includes('bullet');

    if (isBulletA || isBulletB) {
        const bulletBody = isBulletA ? bodyA : bodyB;
        const otherBody = isBulletA ? bodyB : bodyA;

        // Ignore bullet-on-bullet collisions
        if (otherBody.label.includes('bullet')) return;

        // Opponent's bullet hits Player 1
        if (otherBody.label.includes('player_') && bulletBody.label.includes('aibullet')) {
            this.handleRagdollHit(bulletBody, otherBody);
        }
        // Player 1's bullet hits Opponent
        else if (otherBody.label.includes('ai_') && bulletBody.label.includes('playerbullet')) {
            this.handleRagdollHit(bulletBody, otherBody);
        }
        // Bullet hits the platform
        else if (otherBody.label === 'platform') {
            this.createBulletImpact(bulletBody.position.x, bulletBody.position.y);
            this.removeBullet(bulletBody.gameObject);
        }
    }
}


  // Add this new shootBullet function
shootBullet(ragdoll, playerNum) {
    if (!ragdoll || !ragdoll.alive || !this.roundActive) return;

    const aimingArm = ragdoll.rightArm;
    const armBody = aimingArm.body;
    const armAngle = armBody.angle;
    const armLength = aimingArm.length;

    // Calculate the bullet's starting position at the "hand"
    const handVector = new Phaser.Math.Vector2(0, armLength / 2).rotate(armAngle);
    const bulletStartX = armBody.position.x + handVector.x;
    const bulletStartY = armBody.position.y + handVector.y;

    // Create a simple, physics-enabled bullet
    const bulletBody = this.matter.add.circle(bulletStartX, bulletStartY, 6, {
        label: `bullet_${playerNum}`,
        frictionAir: 0, // No air resistance
        friction: 0,    // No friction
        density: 0.01,
    });

    bulletBody.ignoreGravity = true; // IMPORTANT: Makes the bullet fly straight

    // Create the visual for the bullet
    const bulletGraphics = this.add.graphics({ fillStyle: { color: 0xffff00 } });
    bulletGraphics.fillCircle(0, 0, 6);
    const bullet = this.matter.add.gameObject(bulletGraphics, bulletBody);
    bullet.shooter = playerNum;
    this.bulletsArray.push(bullet);

    // Set a high velocity in the direction the arm is pointing
    const speed = 35; // A high speed for a straight shot
    const velocityX = Math.cos(armAngle) * speed;
    const velocityY = Math.sin(armAngle) * speed;
    this.matter.body.setVelocity(bulletBody, { x: velocityX, y: velocityY });

    if (this.sounds.shoot) {
        this.sounds.shoot.play();
    }

    // Automatically remove the bullet after 2 seconds to keep the game clean
    this.time.delayedCall(2000, () => {
        this.removeBullet(bullet);
    });
}

// REPLACE your entire update() function with this one

update() {
    // Exit immediately if the game isn't in an active round
    if (!this.gameStarted || this.isGameOver || !this.roundActive) {
        return;
    }

    // --- Player 1 Ragdoll State ---
    // Handle stabilization and wobble effects for player 1
    if (this.playerRagdoll && this.playerRagdoll.alive) {
        if (this.playerRagdoll.isWobbly) {
            this.wobbleRagdoll(this.playerRagdoll);
        } else {
            this.stabilizeRagdoll(this.playerRagdoll);
        }
    }

    // --- Opponent Ragdoll State ---
    // Handle stabilization and wobble effects for the opponent (AI or Player 2)
    if (this.opponentRagdoll && this.opponentRagdoll.alive) {
        if (this.opponentRagdoll.isWobbly) {
            this.wobbleRagdoll(this.opponentRagdoll);
        } else {
            this.stabilizeRagdoll(this.opponentRagdoll);
        }
    }

    // --- AI Logic ---
    // Only run the AI decision-making function in 'pve' (Player vs. AI) mode
    if (this.gameMode === 'pve') {
        this.updateAI();
    }

    // --- Visual Updates ---
    // Sync the visuals of the ragdolls with their physics bodies
    this.updateRagdollVisuals(this.playerRagdoll);
    this.updateRagdollVisuals(this.opponentRagdoll);

    // --- Aiming Systems ---
    // Update Player 1's aiming system (controlled by mouse/spacebar)
    this.updateAiming();

    // Update Player 2's aiming system (only in 'pvp' mode)
    if (this.gameMode === 'pvp' && this.opponentRagdoll && this.opponentRagdoll.alive) {
        // Check if Player 2 is in the 'aiming' state
        if (this.opponentAimingState === 'aiming') {
            const aimSpeed = 0.02;
            const minAngle = -1.9; // Aim up
            const maxAngle = 1.6;  // Aim down

            // Move the aiming angle up and down
            this.opponentAimingAngle += this.opponentAngleDirection * aimSpeed;

            // Reverse direction at the limits
            if (this.opponentAimingAngle >= maxAngle || this.opponentAimingAngle <= minAngle) {
                this.opponentAngleDirection *= -1;
            }
            
            // Apply the angle to the opponent's arm
            this.matter.body.setAngle(this.opponentRagdoll.rightArm.body, this.opponentAimingAngle);

            // Draw the visual aiming line for Player 2
            const lineLength = 150;
            this.opponentAimLine.clear();
            this.opponentAimLine.lineStyle(3, 0xff8800, 0.7); // Orange line for P2
            const handVector = new Phaser.Math.Vector2(0, lineLength).rotate(this.opponentAimingAngle);
            const arm = this.opponentRagdoll.rightArm.body;
            this.opponentAimLine.moveTo(arm.position.x, arm.position.y);
            this.opponentAimLine.lineTo(arm.position.x + handVector.x, arm.position.y + handVector.y);
        } else {
            // If not aiming, make sure the line is not visible
            this.opponentAimLine.clear();
        }
    }
    
    // --- Bullet Cleanup ---
    // Remove bullets that have gone off-screen
    this.cleanupBullets();
}

// In class GameScene, add this new function

// REPLACE your existing updateAiming function
updateAiming() {
    if (!this.playerRagdoll || !this.playerRagdoll.alive) return;

    const arm = this.playerRagdoll.rightArm.body;

    // --- Handle Player's Arm Movement ---
    if (this.aimingState === "aiming") {
        const aimSpeed = 0.02; // How fast the arm moves
        const minAngle = -1.9; // Aim up
        const maxAngle = 1.6;  // Aim down

        // Update the aiming angle
        this.aimingAngle += this.angleDirection * aimSpeed;

        // Reverse direction at limits
        if (this.aimingAngle >= maxAngle || this.aimingAngle <= minAngle) {
            this.angleDirection *= -1;
        }
        
        // Apply the angle to the arm's physics body
        this.matter.body.setAngle(arm, this.aimingAngle);

        // --- Draw Aiming Line (with a fixed length) ---
        const lineLength = 150; 

        this.playerAimLine.clear();
        this.playerAimLine.lineStyle(3, 0x00ff00, 0.7); // Green line
        const handVector = new Phaser.Math.Vector2(0, lineLength).rotate(this.aimingAngle);
        this.playerAimLine.moveTo(arm.position.x, arm.position.y);
        this.playerAimLine.lineTo(arm.position.x + handVector.x, arm.position.y + handVector.y);

    } else {
        // Clear the line when not aiming
        this.playerAimLine.clear();
    }
    
    // The AI's aiming is handled in the updateAI function, so we leave it out of here.
}


lockAngleAndFire() {
    // Lock the current angle from the aiming system
    this.lockedAngle = this.aimingAngle;

    // Immediately fire the bullet with the locked angle and fixed power
    this.shootBullet(this.playerRagdoll, 1, this.lockedAngle, this.firePower);

    // Reset the state for the next shot
    this.aimingState = "ready";
}

handlePlayerShootInput() {
    if (!this.playerRagdoll || !this.playerRagdoll.alive || !this.roundActive) return;

    if (this.aimingState === "ready") {
        // First press: Start aiming
        this.aimingState = "aiming";
    } else if (this.aimingState === "aiming") {
        // Second press: Lock angle and fire
        this.lockAngleAndFire();
    }
}

handleRagdollHit(bulletBody, ragdollPartBody) {
// REPLACE the existing content of handleRagdollHit with this:

if (!this.roundActive || !ragdollPartBody.ragdoll || !ragdollPartBody.ragdoll.alive) {
    return;
}

const bulletVelocity = bulletBody.velocity;

// --- 1. APPLY KNOCKBACK ---
// This value controls how hard the character is pushed back.
const knockbackPower = 0.3;

const knockbackVelocity = {
    x: bulletVelocity.x * knockbackPower,
    y: (bulletVelocity.y * knockbackPower) - 2 // Add a little upward pop
};

// Apply the knockback velocity to all parts of the ragdoll for a solid hit.
const allParts = [ragdollPartBody.ragdoll.head.body, ragdollPartBody.ragdoll.body.body, ragdollPartBody.ragdoll.feet.body, ragdollPartBody.ragdoll.rightArm.body];
allParts.forEach(part => {
    this.matter.body.setVelocity(part, {
        x: part.velocity.x + knockbackVelocity.x,
        y: part.velocity.y + knockbackVelocity.y
    });
});


// --- 2. APPLY OSCILLATION (WOBBLE) ---
const bodyToWobble = ragdollPartBody.ragdoll.body;
const torqueStrength = 50; // Increased for a more dramatic wobble
bodyToWobble.torque = torqueStrength * Math.sign(bulletVelocity.x);

    const ragdoll = ragdollPartBody.ragdoll;
    if (ragdoll && !ragdoll.isWobbly) {
        ragdoll.isWobbly = true;

        // After 1.5 seconds, the ragdoll will try to stabilize itself again.
        this.time.delayedCall(1500, () => {
            if (ragdoll) { // Safety check
                ragdoll.isWobbly = false;
            }
        });
    }


// --- 3. CLEANUP ---
if (this.sounds.damage) {
    this.sounds.damage.play();
}

if (bulletBody.gameObject) {
    this.removeBullet(bulletBody.gameObject);
}
}



// REPLACE the old updateAIAiming function with this
updateAIAiming() {
    if (!this.opponentRagdoll || !this.opponentRagdoll.alive || !this.roundActive) return;

    const currentTime = this.time.now;

    // Simple AI shooting timer
    if (currentTime > this.aiNextAction) {
        this.shootBullet(this.opponentRagdoll, 2);
        this.aiNextAction = currentTime + Phaser.Math.Between(800, 1500); // Cooldown for next shot
    }
}
// REPLACE your updateAI function with this more robust version

updateAI() {
    // --- Initial Safety Checks ---
    if (!this.roundActive || !this.opponentRagdoll || !this.opponentRagdoll.alive || !this.playerRagdoll || !this.playerRagdoll.alive) {
        return;
    }
    // Exit if crucial body parts don't exist yet, preventing errors
    if (!this.opponentRagdoll.rightArm.body || !this.playerRagdoll.body.body || !this.playerRagdoll.head.body) {
        return;
    }

    const currentTime = this.time.now;
    if (currentTime < this.aiNextAction) {
        return; // AI is "thinking" or on cooldown
    }

    // --- Improved Aiming Logic ---
    const aiArmPos = this.opponentRagdoll.rightArm.body.position;
    const playerBodyPos = this.playerRagdoll.body.body.position;
    let targetPosition = { x: playerBodyPos.x, y: playerBodyPos.y }; // Default target is the player's body
    let finalAngle;

    // Use the probability setting, with a fallback of 0.75 if it's missing
    const precisionChance = this.aiDifficulty.aimPrecisionChance || 0.75;

    if (Math.random() < precisionChance) {
        // --- PRECISE SHOT ---
        // Randomly choose to target the head or body for variety
        const targetPart = Math.random() < 0.5 ? this.playerRagdoll.head.body : this.playerRagdoll.body.body;
        if (targetPart && targetPart.position) {
            targetPosition = targetPart.position;
        }
    } else {
        // --- INACCURATE SHOT ---
        // Aim in the general direction but with a clear miss, e.g., above the player
        const errorSign = Math.random() < 0.5 ? -1 : 1;
        targetPosition.x += errorSign * 50; // Aim slightly to the side
        targetPosition.y -= 75;             // Aim high
    }

    // Calculate the angle towards the final target position
    finalAngle = Phaser.Math.Angle.Between(
        aiArmPos.x,
        aiArmPos.y,
        targetPosition.x,
        targetPosition.y
    );

    // Add a final, small inaccuracy based on overall skill
    const accuracyError = (1 - this.aiDifficulty.shootAccuracy) * (Math.PI / 8); // A small 22.5-degree variance
    finalAngle += Phaser.Math.FloatBetween(-accuracyError, accuracyError);

    // Apply the final calculated angle to the arm
    this.matter.body.setAngle(this.opponentRagdoll.rightArm.body, finalAngle);


    // --- SHOOTING & MOVEMENT (Logic is the same, but now uses the safe `finalAngle`) ---
    const distance = Phaser.Math.Distance.Between(aiArmPos.x, aiArmPos.y, playerBodyPos.x, playerBodyPos.y);

    if (distance < 800 && Math.random() < this.aiDifficulty.aggressiveness) {
        this.time.delayedCall(100, () => {
             if (this.opponentRagdoll.alive) {
                // Pass the calculated angle directly to the shoot function
                this.shootBullet(this.opponentRagdoll, 2, finalAngle, this.firePower);
             }
        });
    }

    const aiBody = this.opponentRagdoll.body.body;
    const optimalDistance = 400;
    if (distance > optimalDistance + 50) {
        const moveDirection = (playerBodyPos.x < aiBody.position.x) ? -1 : 1;
        this.matter.body.applyForce(aiBody, aiBody.position, { x: 0.01 * moveDirection, y: 0 });
    } else if (distance < optimalDistance - 50) {
        const moveDirection = (playerBodyPos.x < aiBody.position.x) ? 1 : -1;
        this.matter.body.applyForce(aiBody, aiBody.position, { x: 0.01 * moveDirection, y: 0 });
    }

    if (this.aiCanJump && Math.random() < this.aiDifficulty.jumpFrequency) {
        this.jumpRagdoll(this.opponentRagdoll);
        this.aiCanJump = false;
    }

    this.aiNextAction = currentTime + this.aiDifficulty.reactionTime + Phaser.Math.Between(-100, 100);
}


jumpRagdoll(ragdoll) {
    // 1. SAFETY CHECK: Ensure the ragdoll exists and is alive.
    if (!ragdoll || !ragdoll.alive) {
        return;
    }

    // 2. GET PHYSICS BODIES: We need both the main body (for angle) and the feet (for applying the jump).
    const mainBody = ragdoll.body.body;
    const feet = ragdoll.feet.body;

    // 3. JUMP STRENGTH: This value determines the power of the jump.
    const jumpStrength = 18;

    // 4. CALCULATE LAUNCH VECTOR:
    // Start with a vector pointing straight up.
    const launchVector = new Phaser.Math.Vector2(0, -1);
    
    // Rotate this vector by the main body's current angle.
    // This makes the jump launch in the direction the character is bent.
    launchVector.rotate(mainBody.angle);

    // Scale the vector by the jump strength to get the final velocity.
    launchVector.scale(jumpStrength);

    // 5. APPLY VELOCITY:
    // Set the velocity for both the main body and the feet.
    // This ensures the entire ragdoll moves together in a solid, controlled jump.
    this.matter.body.setVelocity(mainBody, { x: launchVector.x, y: launchVector.y });
    this.matter.body.setVelocity(feet, { x: launchVector.x, y: launchVector.y });

    // Optional: Play jump sound
    if (this.sounds.jump) {
        this.sounds.jump.play();
    }
} 

// Add this new function to your GameScene class

wobbleRagdoll(ragdoll) {
    if (!ragdoll || !ragdoll.alive) return;

    const body = ragdoll.body.body;

    // --- Wobble Parameters ---
    // Controls how fast the character rocks back and forth.
    const wobbleSpeed = 0.003; 
    // Controls how far they lean (in radians). 0.6 is about 35 degrees.
    const wobbleMagnitude = 0.6; 
    // The force used to push them into the wobble.
    const correctionForce = 0.02; 

    // Calculate a target angle that oscillates back and forth over time.
    const targetAngle = Math.sin(this.time.now * wobbleSpeed) * wobbleMagnitude;

    // Calculate the difference between the current angle and the rocking target.
    const angleError = targetAngle - body.angle;

    // Apply force to make the ragdoll rock.
    this.matter.body.setAngularVelocity(body, body.angularVelocity + (angleError * correctionForce));
}

shootBullet(ragdoll, playerNum, angle, power) {
    if (!ragdoll || !ragdoll.alive || !this.roundActive) return;

    const aimingArm = ragdoll.rightArm;
    const armBody = aimingArm.body;
    const armLength = aimingArm.length;

    // --- ACCURATE ORIGIN AND DIRECTION LOGIC ---

    // 1. Create a vector pointing from the arm's center to its tip (the "hand").
    const handVector = new Phaser.Math.Vector2(0, armLength / 2);

    // 2. Rotate this vector by the arm's angle to get its orientation in the game world.
    handVector.rotate(angle);

    // 3. The bullet's start position is the arm's center PLUS the rotated vector. This places it perfectly at the tip.
    const bulletStartX = armBody.position.x + handVector.x;
    const bulletStartY = armBody.position.y + handVector.y;

    // 4. For the direction, we normalize the hand vector to get a pure direction (with a length of 1).
    const direction = handVector.normalize();

    // 5. The final velocity is the pure direction multiplied by the shot's power.
    const velocityX = direction.x * power;
    const velocityY = direction.y * power;
    
    // --- END OF FIX ---

    const bulletLabel = playerNum === 1 ? 'playerbullet' : 'aibullet';
    const bulletBody = this.matter.add.circle(bulletStartX, bulletStartY, 6, {
        label: bulletLabel,
        frictionAir: 0,
        friction: 0,
        density: 0.01,
        ignoreGravity: true
    });

    const bulletGraphics = this.add.graphics({ fillStyle: { color: 0xffff00 } });
    bulletGraphics.fillCircle(0, 0, 6);
    const bullet = this.matter.add.gameObject(bulletGraphics, bulletBody);
    
    this.bulletsArray.push(bullet);

    this.matter.body.setVelocity(bulletBody, { x: velocityX, y: velocityY });

    if (this.sounds.shoot) {
        this.sounds.shoot.play();
    }

    this.time.delayedCall(2000, () => {
        this.removeBullet(bullet);
    });
}

// REPLACE your existing stabilizeRagdoll function with this new one

stabilizeRagdoll(ragdoll) {
    if (!ragdoll || !ragdoll.alive) return;

    const body = ragdoll.body.body;
    const targetAngle = 0; // The desired angle (straight up)
    const correctionForce = 0.01; // How quickly the ragdoll corrects its posture

    const angleError = targetAngle - body.angle;

    // Apply a corrective force to push the ragdoll upright
    this.matter.body.setAngularVelocity(body, body.angularVelocity + (angleError * correctionForce));
}
removeBullet(bullet) {
    if (bullet && bullet.active) {
        const index = this.bulletsArray.indexOf(bullet);
        if (index > -1) {
            this.bulletsArray.splice(index, 1);
        }
        bullet.destroy();
    }
}


playerFellOff(playerNum) {
    if (!this.roundActive) return;
    this.roundActive = false;

    // Use opponentRagdoll here
    const fallenRagdoll = playerNum === 1 ? this.playerRagdoll : this.opponentRagdoll;

    if (fallenRagdoll) {
        fallenRagdoll.alive = false;
        Object.values(fallenRagdoll).forEach(part => {
            if (part && part.visual && part.visual.setVisible) {
                part.visual.setVisible(false);
            }
        });
    }

    if (playerNum === 1) {
        this.aiScore++;
    } else {
        this.playerScore++;
    }
    this.updateScoreDisplay();

    this.time.delayedCall(1000, () => {
        if (this.playerScore >= this.roundsToWin || this.aiScore >= this.roundsToWin) {
            this.endGame();
        } else {
            this.startNewRound();
        }
    });
}
startNewRound() {
    //("Starting new round...");

    this.roundActive = true;
    this.gameStarted = true;

    

    // Make players non-immune to hits at the start of the round
    if (this.playerRagdoll) {
        this.playerRagdoll.hitImmune = false;
    }
    if (this.opponentRagdoll) {
        this.opponentRagdoll.hitImmune = false;
    }

    // Define the spawn height above the platform
    const platformY = this.height - 100;


// REPLACE the entire "Reset player ragdoll" block with this:
if (this.playerRagdoll) {
    const playerX = this.width * 0.3;
  const spawnY = this.mainPlatform.yPos - 120;

    // Reset all parts relative to the new position
    const allPlayerParts = [this.playerRagdoll.head.body, this.playerRagdoll.body.body, this.playerRagdoll.feet.body, this.playerRagdoll.rightArm.body];
    this.matter.body.setPosition(this.playerRagdoll.feet.body, { x: playerX, y: spawnY });
    this.matter.body.setPosition(this.playerRagdoll.body.body, { x: playerX, y: spawnY - 45 });
    this.matter.body.setPosition(this.playerRagdoll.head.body, { x: playerX, y: spawnY - 110 });
    this.matter.body.setPosition(this.playerRagdoll.rightArm.body, { x: playerX + 15, y: spawnY - 45 });

    // Reset physics state for all parts
    allPlayerParts.forEach(part => {
        this.matter.body.setVelocity(part, { x: 0, y: 0 });
        this.matter.body.setAngularVelocity(part, 0);
        this.matter.body.setAngle(part, 0);
    });

    this.playerRagdoll.alive = true;
    Object.values(this.playerRagdoll).forEach(part => {
        if (part && part.visual && part.visual.setVisible) {
            part.visual.setVisible(true);
        }
    });
}

// REPLACE the entire "Reset AI ragdoll" block with this:
if (this.opponentRagdoll) {
    const aiX = this.width * 0.7;
   const spawnY = this.mainPlatform.yPos - 120;

    // Reset all parts relative to the new position
    const allAiParts = [this.opponentRagdoll.head.body, this.opponentRagdoll.body.body, this.opponentRagdoll.feet.body, this.opponentRagdoll.rightArm.body];
    this.matter.body.setPosition(this.opponentRagdoll.feet.body, { x: aiX, y: spawnY });
    this.matter.body.setPosition(this.opponentRagdoll.body.body, { x: aiX, y: spawnY - 45 });
    this.matter.body.setPosition(this.opponentRagdoll.head.body, { x: aiX, y: spawnY - 110 });
    this.matter.body.setPosition(this.opponentRagdoll.rightArm.body, { x: aiX + 15, y: spawnY - 45 });

    // Reset physics state for all parts
    allAiParts.forEach(part => {
        this.matter.body.setVelocity(part, { x: 0, y: 0 });
        this.matter.body.setAngularVelocity(part, 0);
        this.matter.body.setAngle(part, 0);
    });

    this.opponentRagdoll.alive = true;
    Object.values(this.opponentRagdoll).forEach(part => {
        if (part && part.visual && part.visual.setVisible) {
            part.visual.setVisible(true);
        }
    });
}

    // Reset all cooldowns and states
    this.playerCanShoot = true;
    this.aiCanShoot = true;
    this.aiNextAction = this.time.now + 1000;
    this.aiLastShoot = 0;
    this.playerCanJump = true;
    this.aiCanJump = true;
    this.aiLastJump = 0;

    // Reset aiming states
    this.aimingState = "ready";
    this.aiAimState = "ready";
    this.playerAimLine.clear();
    this.aiAimLine.clear();

    // Clear all bullets from the previous round
    this.bulletsArray.forEach((bullet) => {
        this.removeBullet(bullet);
    });
    this.bulletsArray = [];

    //("New round started successfully");
}

  cleanupBullets() {
    if (!this.bulletsArray) return

    this.bulletsArray.forEach((bullet, index) => {
      if (bullet && bullet.body) {
        const pos = bullet.body.position
        if (pos.x < -100 || pos.x > this.width + 100 || pos.y > this.height + 200) {
          this.removeBullet(bullet)
        }
      }
    })
  }

// Replace the updateRagdollVisuals function with this
updateRagdollVisuals(ragdoll) {
    if (!ragdoll || !ragdoll.alive) return;

    // Sync Body
    if (ragdoll.body.visual && ragdoll.body.body) {
        ragdoll.body.visual.setPosition(ragdoll.body.body.position.x, ragdoll.body.body.position.y);
        ragdoll.body.visual.setRotation(ragdoll.body.body.angle);
    }
    // Sync Head
    if (ragdoll.head.visual && ragdoll.head.body) {
        ragdoll.head.visual.setPosition(ragdoll.head.body.position.x, ragdoll.head.body.position.y);
        ragdoll.head.visual.setRotation(ragdoll.head.body.angle);
    }
    // Sync Left Arm
    if (ragdoll.rightArm.visual && ragdoll.rightArm.body) {
        ragdoll.rightArm.visual.setPosition(ragdoll.rightArm.body.position.x, ragdoll.rightArm.body.position.y);
        ragdoll.rightArm.visual.setRotation(ragdoll.rightArm.body.angle);
    }
    // Sync Right Arm
    if (ragdoll.rightArm.visual && ragdoll.rightArm.body) {
        ragdoll.rightArm.visual.setPosition(ragdoll.rightArm.body.position.x, ragdoll.rightArm.body.position.y);
        ragdoll.rightArm.visual.setRotation(ragdoll.rightArm.body.angle);
    }
    // Sync Feet
if (ragdoll.feet.visual && ragdoll.feet.body) {
    ragdoll.feet.visual.setPosition(ragdoll.feet.body.position.x, ragdoll.feet.body.position.y);
    ragdoll.feet.visual.setRotation(ragdoll.feet.body.angle);
}
}

  createBulletImpact(x, y) {
    // Create spark particles
    for (let i = 0; i < 8; i++) {
      const spark = this.add.circle(x, y, 2, 0xffaa00)
      spark.setDepth(5)

      const angle = (i / 8) * Math.PI * 2
      const speed = 50 + Math.random() * 30

      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        scaleX: 0,
        scaleY: 0,
        alpha: 0,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          if (spark && spark.active) {
            spark.destroy()
          }
        },
      })
    }

    // Main impact flash
    const impact = this.add.circle(x, y, 20, 0xff4444)
    impact.setDepth(5)

    this.tweens.add({
      targets: impact,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      duration: 150,
      ease: "Power2",
      onComplete: () => {
        if (impact && impact.active) {
          impact.destroy()
        }
      },
    })
  }

updateScoreDisplay() {
    if (this.playerScoreText) {
        this.playerScoreText.setText(this.playerScore.toString());
        
        // Animate score change
        this.tweens.add({
            targets: this.playerScoreText,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 150,
            yoyo: true,
            ease: "Power2"
        });
    }

    if (this.aiScoreText) {
        this.aiScoreText.setText(this.aiScore.toString());
        
        this.tweens.add({
            targets: this.aiScoreText,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 150,
            yoyo: true,
            ease: "Power2"
        });
    }
}


endGame() {
    this.isGameOver = true;
    this.roundActive = false;
    
    this.isGameOver = true;
    this.roundActive = false;

    const winner = this.playerScore >= this.roundsToWin ? 1 : 2;
    let winnerText = "";
    if (winner === 1) {
        winnerText = "PLAYER 1 WINS!";
    } else {
        winnerText = this.gameMode === 'pvp' ? "PLAYER 2 WINS!" : "AI WINS!";
    }

    const victoryText = this.add.bitmapText(this.width / 2, this.height / 2, "pixelfont", winnerText, 72 * this.scaleFactor)
   

    // Animate victory text
    victoryText.setScale(0);
    this.tweens.add({
        targets: victoryText,
        scaleX: 1,
        scaleY: 1,
        duration: 500,
        ease: "Back.easeOut"
    });
    
    this.score = winner === 1 ? this.playerScore : this.aiScore;

    if (this.sounds.success) {
        this.sounds.success.setVolume(0.7).play();
    }

    if (this.sounds.background) {
        this.sounds.background.stop();
    }

    // Auto-restart after delay
    this.time.delayedCall(3000, () => {
        this.gameOver();
    });
}


  gameOver() {
    if (this.sounds.background) {
      this.sounds.background.stop()
    }
    // Game over logic would be handled by external functions
    //("Game Over! Final Score:", this.score)
  }

  pauseGame() {
    this.scene.pause()
    //("Game Paused")
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
    this.load.on("complete", () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
    })
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [MainMenuScene, InstructionsScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    orientation: Phaser.Scale.Orientation.LANDSCAPE,
  },
  pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0.8 },
      debug: false,
    },
  },
  dataObject: {
    name: "Rooftop Snipers Ragdoll",
    description: "Physics-based shooting game with ragdoll characters",
    instructions: "W: JUMP, SPACE: AIM & SHOOT. First to 5 wins!",
  },
  deviceOrientation: true,
}
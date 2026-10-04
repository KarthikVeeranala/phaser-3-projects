class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // We'll use the pixel font for the blocky style
        const fontName = "pix";
        const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/";
        this.load.bitmapFont("pixelfont", fontBaseURL + fontName + ".png", fontBaseURL + fontName + ".xml");
        
        // Load the background
        this.load.image("background", "https://aicade-user-store.s3.amazonaws.com/1760936552/games/Aq5pakzprn8n2Wwt/assets/images/extra_Gemini_Generated_Image_9tv6h79tv6h79tv6-removebg-preview.png_id.png?t=1754310615068");
    }

    create() {


            const helpIcon = this.add.image(60, 60, 'help_icon')
        .setScale(0.15) // Adjust scale as needed
        .setInteractive({ cursor: 'pointer' });
    
    helpIcon.on('pointerdown', () => {
        this.scene.start('HelpScene');
    });


    // Animate the help icon to draw attention
    this.tweens.add({
        targets: helpIcon,
        scale: 0.17,
        duration: 1000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });
        // Add the background image
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background')
            .setDisplaySize(this.game.config.width, this.game.config.height)
            .setDepth(-1);

        // --- Create the Title with Wobble Effect ---
        const title = this.createOutlinedText(this.game.config.width / 2, this.game.config.height / 3, 'Rooftop Snipers', 120);
        
        // Add a delayed wobble tween to the title container
        this.tweens.add({
            targets: title,
            angle: { from: -1.5, to: 1.5 }, // Rock back and forth by 1.5 degrees
            duration: 2000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1, // Loop forever
            delay: 500 // Wait half a second before starting
        });

        // --- Create Menu Buttons ---
        const isMobile = !this.sys.game.device.os.desktop;
        const pveButtonY = isMobile ? this.game.config.height / 2 + 120 : this.game.config.height / 2 + 80;

        const pveButton = this.createMenuButton(this.game.config.width / 2, pveButtonY, 'Player vs Comp', () => {
            this.scene.start('GameScene', { gameMode: 'pve' });
        });

        const allElements = [title, pveButton];

        if (!isMobile) {
            const pvpButton = this.createMenuButton(this.game.config.width / 2, pveButtonY + 110, 'PVP', () => {
                this.scene.start('InstructionsScene', { gameMode: 'pvp' });
            });
            allElements.push(pvpButton);
        }

        // --- Animate all elements on entry ---
        allElements.forEach((element, index) => {
            element.setAlpha(0).setScale(0.9);
            this.tweens.add({
                targets: element,
                alpha: 1,
                scale: 1,
                duration: 500,
                delay: 200 + index * 100,
                ease: 'Cubic.easeOut'
            });
        });
    }

    /**
     * Helper function to create text with a thick outline.
     * It works by layering a black text object behind a white one.
     */
    createOutlinedText(x, y, text, size) {
        // The black "outline" text, slightly offset
        const bg = this.add.bitmapText(0, 0, 'pixelfont', text, size).setTint(0x000000).setOrigin(0.5, 0.52);
        // The white "foreground" text
        const fg = this.add.bitmapText(0, 0, 'pixelfont', text, size).setOrigin(0.5);

        // Return them in a container for easy positioning and animation
        return this.add.container(x, y, [bg, fg]);
    }

    /**
     * Helper function to create a button with a background shape and text.
     */
    createMenuButton(x, y, text, onClick) {
    const buttonWidth = 520; // Increased width
    const buttonHeight = 100; 
        // --- Create the button shape ---
        const buttonBg = this.add.graphics();
        // Background fill
        buttonBg.fillStyle(0x1a1a1a, 0.7);
        buttonBg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20);
        // Border
        buttonBg.lineStyle(4, 0xffffff, 0.8);
        buttonBg.strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20);

        // --- Create the text ---
const buttonText = this.add.bitmapText(0, -13, 'pixelfont', text, 56).setOrigin(0.5); // Increased font size

        // --- Create a container to hold the shape and text ---
        const button = this.add.container(x, y, [buttonBg, buttonText]);
        button.setSize(buttonWidth, buttonHeight); // Important for making the whole area interactive

        // --- Add interactive effects to the container ---
        button.setInteractive({ cursor: 'pointer' })
            .on('pointerover', () => {
                buttonBg.clear().fillStyle(0x3d3d3d, 0.9).fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20); // Change bg color
                buttonBg.lineStyle(4, 0xffff00, 1).strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20); // Highlight border
                this.tweens.add({ targets: button, scale: 1.05, duration: 100 });
            })
            .on('pointerout', () => {
                buttonBg.clear().fillStyle(0x1a1a1a, 0.7).fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20);
                buttonBg.lineStyle(4, 0xffffff, 0.8).strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 20);
                this.tweens.add({ targets: button, scale: 1.0, duration: 100 });
            })
            .on('pointerdown', () => {
                this.tweens.add({ targets: button, scale: 0.98, duration: 50, yoyo: true });
                this.time.delayedCall(150, onClick);
            });

        return button;
    }
}

class HelpScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HelpScene' });
    }

    init(data) {
        this.fromSceneKey = data.fromSceneKey || 'MainMenuScene';
    }

    preload() {
        // We don't need to load the bitmap font anymore
        this.load.image("background", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/backgrounds/bg_1.png");
    }

    create() {
        // Add the background
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background')
            .setDisplaySize(this.game.config.width, this.game.config.height)
            .setDepth(-1);

        // --- Define Text Styles for "Arial Black" ---
        const baseStyle = {
            fontFamily: '"Arial Black", Arial, sans-serif',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
            align: 'center'
        };
        const titleStyle = { ...baseStyle, fontSize: '80px', strokeThickness: 8 };
        const headerStyle = { ...baseStyle, fontSize: '56px' };
        const descriptionStyle = { ...baseStyle, fontSize: '28px', strokeThickness: 4 };
        const controlsStyle = { ...baseStyle, fontSize: '42px' };

        // --- Main Title ---
        this.add.text(this.game.config.width / 2, 80, 'Help & Controls', titleStyle).setOrigin(0.5);
        
        // --- Define Column Positions ---
        const column1X = this.game.config.width * 0.3;
        const column2X = this.game.config.width * 0.7;
        let yPos; // We'll use this to control vertical spacing

        // ===================================
        // --- Column 1: Player vs AI ---
        // ===================================
        yPos = 180;
        this.add.text(column1X, yPos, 'Player vs AI', headerStyle).setOrigin(0.5);
        
        yPos += 60;
        this.add.text(column1X, yPos, 'A single player mode against a computer opponent.', descriptionStyle)
            .setOrigin(0.5)
            .setWordWrapWidth(this.game.config.width * 0.4);

        yPos += 110;
        this.add.text(column1X, yPos, 'Controls', headerStyle).setOrigin(0.5);

        yPos += 70;
        this.add.text(column1X, yPos, 'W: JUMP', controlsStyle).setOrigin(0.5);
        
        yPos += 60;
        this.add.text(column1X, yPos, 'SPACE: SHOOT', controlsStyle).setOrigin(0.5);

        // ===================================
        // --- Column 2: Player vs Player ---
        // ===================================
        yPos = 180; // Reset Y position for the second column
        this.add.text(column2X, yPos, 'Player vs Player', headerStyle).setOrigin(0.5);
        
        yPos += 60;
        this.add.text(column2X, yPos, 'Two players compete against each other on the same keyboard.', descriptionStyle)
            .setOrigin(0.5)
            .setWordWrapWidth(this.game.config.width * 0.4);

        yPos += 110;
        this.add.text(column2X, yPos, 'Controls', headerStyle).setOrigin(0.5);

        yPos += 70;
        this.add.text(column2X, yPos, 'P1: W / SPACE', controlsStyle).setOrigin(0.5);

        yPos += 60;
        this.add.text(column2X, yPos, 'P2: UP / P', controlsStyle).setOrigin(0.5);


        // --- Back Button ---
        const backButton = this.add.text(this.game.config.width / 2, this.game.config.height - 80, '< Back', headerStyle).setOrigin(0.5);
        
        backButton.setInteractive({ cursor: 'pointer' })
            .on('pointerover', () => backButton.setStyle({ fill: '#ffdd00' }))
            .on('pointerout', () => backButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                if (this.fromSceneKey === 'GameScene') {
                    this.scene.stop();
                    this.scene.resume(this.fromSceneKey);
                } else {
                    this.scene.start('MainMenuScene');
                }
            });
    }
}

class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionsScene' });
    }

    init(data) {
        this.gameMode = data.gameMode;
    }
    
    create() {
        // Add the background
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background')
            .setDisplaySize(this.game.config.width, this.game.config.height)
            .setDepth(-1);

        // Define text styles
        const titleStyle = {
            fontFamily: '"Arial Black", Arial, sans-serif',
            fontSize: '80px', color: '#ffffff', stroke: '#000000', strokeThickness: 8
        };
        const headerStyle = { ...titleStyle, fontSize: '64px' };
        const bodyStyle = { ...titleStyle, fontSize: '48px', strokeThickness: 6 };

        // --- Create UI Elements ---
        this.add.text(this.game.config.width / 2, 100, 'Controls', titleStyle).setOrigin(0.5);

        this.add.text(this.game.config.width / 4, 250, 'Player 1', headerStyle).setOrigin(0.5);
        this.add.text(this.game.config.width / 4, 350, 'W : JUMP', bodyStyle).setOrigin(0.5);
        this.add.text(this.game.config.width / 4, 420, 'SPACE : SHOOT', bodyStyle).setOrigin(0.5);

        this.add.text(this.game.config.width * 0.75, 250, 'Player 2', headerStyle).setOrigin(0.5);
        this.add.text(this.game.config.width * 0.75, 350, 'UP ARROW : JUMP', bodyStyle).setOrigin(0.5);
        this.add.text(this.game.config.width * 0.75, 420, 'P : SHOOT', bodyStyle).setOrigin(0.5);

        const startButton = this.add.text(this.game.config.width / 2, this.game.config.height - 100, 'Start Game', headerStyle).setOrigin(0.5);
        
        // Add hover/click effects to the start button
        startButton.setInteractive({ cursor: 'pointer' })
            .on('pointerover', () => startButton.setStyle({ fill: '#ffdd00' }))
            .on('pointerout', () => startButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => this.scene.start('GameScene', { gameMode: this.gameMode }));
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

         this.playerLastShot = 0;
    this.opponentLastShot = 0;
    this.shootCooldown = 1200; 

    // Player ragdoll objects - initialize as null
    this.playerRagdoll = null
    this.opponentRagdoll  = null
    this.opponentRagdoll = null


    this.aiAimingAngle = 0;
    this.aiAngleDirection = 1;
    this.aiTargetAngle = 0; //

    // Physics groups - initialize as null
    this.platforms = null
    this.bullets = null
    this.mainPlatform = null


    // Jump states
    this.playerCanJump = true
    this.aiCanJump = true
    this.jumpCooldown = 200

this.aiDifficulty = {
  reactionTime: 2500,
  shootAccuracy: 0.7,
  jumpFrequency: 0.3,
  aggressiveness: 0.6,
  dodgeChance: 0.4,
  aimPrecisionChance: 0.1,
   wobbleJumpChance: 0.15  // AI now has a 30% chance of being precise
};
   // this.aiCurrentAimOffset = 0; 
    this.aiAimingState = 'ready';     // 'ready' or 'aiming'
this.aiAimingAngle = 0;         // The current angle of the AI's sweeping arm
this.aiAngleDirection = 1;      // The direction the arm is sweeping (1 for down, -1 for up)
this.aiTargetReleaseAngle = 0;  
    // AI timers
    this.aiNextAction = 0
    this.aiLastJump = 0
    this.aiLastShoot = 0

    // In GameScene constructor()
this.playerCanJump = true;

this.aimingState = "ready"; 
this.aimingAngle = 0;
this.lockedAngle = null;
this.firePower = 35; 
this.angleDirection = 1; 



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

    // Sound objects
    this.sounds = {}


  }

  preload() {

     this.load.image("rooftop_texture", "https://aicade-user-store.s3.amazonaws.com/1760936552/games/Aq5pakzprn8n2Wwt/assets/images/extra_25wsrtcyvuhl.png_id.png?t=1754923066045"); 

            this.load.image("help_icon", "https://files.catbox.moe/5b3ird.png");
    this.isGameOver = false


    for (const key in _CONFIG.imageLoader) {
      this.load.image(key, _CONFIG.imageLoader[key])
    }

    for (const key in _CONFIG.soundsLoader) {
      this.load.audio(key, [_CONFIG.soundsLoader[key]])
    }

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
    this.matter.world.update60Hz();
    this.matter.world.runner.isFixed = true;
    
    // Adjust global physics for snappier feel
    this.matter.world.engine.world.gravity.y = 1.0; // Slightly stronger gravity
    this.matter.world.engine.world.gravity.scale = 0.001;
    
    this.bulletsArray = [];
}



init(data) {
    // Get the game mode, defaulting to 'pve' (player vs ai) if none is passed
    this.gameMode = data.gameMode || 'pve';
}
createPlatform() {
    const platformWidth = this.width * 0.8;
    const platformHeight = 300;
    const platformX = this.width / 2;
    const platformY = this.height - 60;

    // Create the invisible physics body for the platform (this stays the same)
    const platformBody = this.matter.add.rectangle(platformX, platformY, platformWidth, platformHeight, {
      isStatic: true,
      label: "platform",
      friction: 1.0,
      frictionStatic: 1.0
    });

    // --- This is the new part ---
    // Instead of drawing a gray box, create a repeating image sprite.
    const rooftopSprite = this.add.tileSprite(platformX, platformY, platformWidth, platformHeight, 'rooftop_texture');

    // Attach the physics body to our new rooftop image.
    this.mainPlatform = this.matter.add.gameObject(rooftopSprite, platformBody);
    
    // This line is needed to keep track of the platform's Y position for respawning.
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

    // --- Define Ragdoll Proportions ---
    const bodyWidth = 40;
    const bodyHeight = 200;
    const headWidth = 80;
    const headHeight = 70;
    const feetHeight = 10;
    const armLength = 80;
    const armWidth = 14;
    // UPDATED: Set the shoulder's X-offset to 0 to center it
    const shoulderOffset = { x: 0, y: -bodyHeight / 2 + 40 };

    // --- Create Feet ---
    const feetY = y + bodyHeight / 2;
    const feet = this.matter.add.rectangle(x, feetY, bodyWidth, feetHeight, {
        collisionFilter: { group: group },
        mass: 10,
        friction: 1.0,
        frictionStatic: 1.0,
        label: type + "_feet",
        inertia: Infinity
    });

    // --- Create Body ---
    const body = this.matter.add.rectangle(x, y, bodyWidth, bodyHeight, {
        collisionFilter: { group: group },
        chamfer: { radius: 8 },
        mass: 15,
        friction: 0.8,
        frictionStatic: 0.9,
        frictionAir: 0.08
    });
    body.label = type + "_body";

    // --- Create Head ---
    const headY = y - (bodyHeight / 2) - (headHeight / 2);
    const head = this.matter.add.rectangle(x, headY, headWidth, headHeight, {
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
    });
    rightArm.label = type + "_right_arm";

    // --- Create Joints ---
    // Connect body to feet
    this.matter.add.constraint(body, feet, 0, 1, {
        pointA: { x: 0, y: bodyHeight / 2 },
        pointB: { x: 0, y: -feetHeight / 2 },
        length: 0,
        stiffness: 0.5
    });

    // Neck Joint
    this.matter.add.constraint(body, head, 0, 1, {
        pointA: { x: 0, y: -bodyHeight / 2 },
        pointB: { x: 0, y: headHeight / 2 },
        length: 0,
        stiffness: 0.2
    });


    // Shoulder Joint
    // UPDATED: Set the joint's X-anchor to 0 to pivot from the body's center
    const shoulderAnchorX = 0; 
    this.matter.add.constraint(body, rightArm, 0, 1, {
        pointA: { x: shoulderAnchorX, y: -bodyHeight / 2 + 40 },
        pointB: { x: 0, y: -armLength / 2 },
        length: 0,
        stiffness: 0.05
    });
    
    // --- Create Visuals ---
    const bodyVisual = this.add.rectangle(x, y, bodyWidth, bodyHeight, isPlayer ? 0x333333 : 0x222222).setDepth(1);
    const faceTexture = isPlayer ? 'player_face' : 'ai_face';
    const headVisual = this.add.image(x, headY, faceTexture).setDepth(3).setDisplaySize(headWidth, headHeight);
    const rightArmVisual = this.add.rectangle(x, y, armWidth, armLength, isPlayer ? 0xEEEEEE : 0xDDDDDD).setDepth(2);
    const feetVisual = this.add.rectangle(x, y, bodyWidth, feetHeight, isPlayer ? 0x111111 : 0x000000).setDepth(1);
    
    if (flipX) {
        headVisual.setFlipX(true);
    }

    // --- Return the new ragdoll object ---
    const ragdoll = {
        head: { body: head, visual: headVisual },
        body: { body: body, visual: bodyVisual },
        feet: { body: feet, visual: feetVisual },
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

// Add this new function to your GameScene class
applyBobbleheadEffect(ragdoll) {
    // Safety check to ensure the ragdoll and its head exist and are alive
    if (!ragdoll || !ragdoll.alive || !ragdoll.head.body) {
        return;
    }

    // Target the HEAD's physics body specifically
    const head = ragdoll.head.body;

    // --- Wobble Parameters ---
    // You can tweak these values to get the wobble speed and intensity you like
    const wobbleSpeed = 2;        // How fast the head wobbles
    const wobbleMagnitude = 0.1;  // How far the head wobbles (in radians)
    const correctionForce = 0.015; // How strongly it tries to reach the wobble angle

    // Calculate a target angle that oscillates back and forth using a sine wave.
    // We use the game's time to create a continuous, smooth motion.
    const targetAngle = Math.sin(this.time.now * wobbleSpeed * 0.01) * wobbleMagnitude;

    // Calculate the difference between the head's current angle and our target angle
    const angleError = targetAngle - head.angle;

    // Apply a corrective angular velocity to make the head rock towards the target angle
    this.matter.body.setAngularVelocity(head, head.angularVelocity + (angleError * correctionForce));
}

// This is the corrected AI logic function.
// Replace your old updateAI() function with this one.
updateAI() {
    // Ensure both ragdolls exist and are alive
    if (!this.opponentRagdoll || !this.opponentRagdoll.alive || !this.playerRagdoll || !this.playerRagdoll.alive || !this.roundActive) {
        return;
    }

    const aiBody = this.opponentRagdoll.body.body;
    const playerBody = this.playerRagdoll.body.body;
    const aiArm = this.opponentRagdoll.rightArm.body;
    const timeNow = this.time.now;

    // Define arm constraints at the top to use them in different states
    const minAngle = -1.9;
    const maxAngle = 1.6;

    // --- Wobble-Jump Logic ---
// // --- Randomized Wobble-Jump Logic ---
// if (this.opponentRagdoll.isWobbly && this.aiCanJump && Math.random() < this.aiDifficulty.wobbleJumpChance) {
//     // Decide a completely random direction to jump: -1 for left, 1 for right.
//     const randomDirection = (Math.random() < 0.8) ? -1 : 1;
    
//     // Lean the AI's body in that random direction before jumping.
//     this.matter.body.setAngle(aiBody, 0.4 * randomDirection);
//     this.jumpRagdoll(this.opponentRagdoll);
//     this.aiCanJump = false;
//     return;
// }

    // --- AI STATE MACHINE ---

    if (this.aiAimingState === 'ready') {
        // --- 1. DECIDE TO AIM ---
        if (timeNow > this.aiLastShoot + this.shootCooldown) {
            this.aiAimingState = 'aiming';

            let perfectAngle = Phaser.Math.Angle.BetweenPoints(aiArm.position, playerBody.position) - (Math.PI / 2);

            if (Math.random() > this.aiDifficulty.aimPrecisionChance) {
                const maxInaccuracy = 0.5;
                const offset = (Math.random() * maxInaccuracy) - (maxInaccuracy / 2);
                this.aiTargetReleaseAngle = perfectAngle + offset;
            } else {
                this.aiTargetReleaseAngle = perfectAngle;
            }

            // --- THIS IS THE FIX ---
            // Clamp the target angle to ensure it's always within the arm's sweep range.
            this.aiTargetReleaseAngle = Phaser.Math.Clamp(this.aiTargetReleaseAngle, minAngle, maxAngle);
        }

    } else if (this.aiAimingState === 'aiming') {
        // --- 2. SWEEP THE ARM AND FIRE ---
        const aimSpeed = 0.012;
        this.aiAimingAngle += this.aiAngleDirection * aimSpeed;

        if (this.aiAimingAngle >= maxAngle || this.aiAimingAngle <= minAngle) {
            this.aiAngleDirection *= -1;
        }

        this.matter.body.setAngle(aiArm, this.aiAimingAngle);

        const previousAngle = this.aiAimingAngle - (this.aiAngleDirection * aimSpeed);
        
        if ((this.aiTargetReleaseAngle >= previousAngle && this.aiTargetReleaseAngle <= this.aiAimingAngle) || (this.aiTargetReleaseAngle <= previousAngle && this.aiTargetReleaseAngle >= this.aiAimingAngle)) {
            this.shootBullet(this.opponentRagdoll, 2, this.aiAimingAngle, this.firePower);
            this.aiLastShoot = timeNow;
            this.aiAimingState = 'ready';
        }
    }
}


setupUI() {
    // === NEW, VISUALLY APPEALING SCORE UI ============================
    const W = this.width; // Use scene width
    const scorePadding = 20; 
    const scoreY = 50; 

    // --- Player Score UI (Top-Left) ---
    this.playerScoreContainer = this.add.container(scorePadding, scoreY); 

    const playerScoreBg = this.add.graphics();
    playerScoreBg.fillStyle(0x46c4ff, 0.8); 
    playerScoreBg.fillRoundedRect(0, 0, 150, 60, 15); 
    playerScoreBg.lineStyle(3, 0xffffff, 0.8); 
    playerScoreBg.strokeRoundedRect(0, 0, 150, 60, 15); 

    // Use your existing 'player_face' asset key here
    const playerIcon = this.add.image(40, 30, 'player_face').setDisplaySize(45, 45); 

    this.playerScoreText = this.add.text(95, 30, '0', {
        fontFamily: '"Bebas Neue", Arial, sans-serif',
        fontSize: '42px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 5,
    }).setOrigin(0.5); 

    this.playerScoreContainer.add([playerScoreBg, playerIcon, this.playerScoreText]); 
    this.playerScoreContainer.setDepth(11).setScrollFactor(0);


    // --- Enemy Score UI (Top-Right) ---
    this.enemyScoreContainer = this.add.container(W - 150 - scorePadding, scoreY); 

    const enemyScoreBg = this.add.graphics();
    enemyScoreBg.fillStyle(0xff4d4d, 0.8); 
    enemyScoreBg.fillRoundedRect(0, 0, 150, 60, 15); 
    enemyScoreBg.lineStyle(3, 0xffffff, 0.8); 
    enemyScoreBg.strokeRoundedRect(0, 0, 150, 60, 15); 

    // Use your existing 'ai_face' asset key here
    const enemyIcon = this.add.image(110, 30, 'ai_face').setDisplaySize(45, 45).setFlipX(true); 

    // The variable for the enemy score text needs to be this.aiScoreText to match updateScoreDisplay()
    this.aiScoreText = this.add.text(55, 30, '0', {
        fontFamily: '"Bebas Neue", Arial, sans-serif',
        fontSize: '42px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 5,
    }).setOrigin(0.5); 

    this.enemyScoreContainer.add([enemyScoreBg, enemyIcon, this.aiScoreText]); 
    this.enemyScoreContainer.setDepth(11).setScrollFactor(0);


    // Instructions based on device
    const instructionY = this.height - 40;
    let instructionText = '';
    if (this.isMobile) {
        instructionText = "LEFT: JUMP | RIGHT: AIM & SHOOT";
    } else {
        if (this.gameMode !== 'pvp') {
            instructionText = "W: JUMP | SPACE(Hold and Release): AIM & SHOOT";
        }
    }

    if (instructionText) {
        this.add
            .bitmapText(this.width / 2, instructionY, "pixelfont", instructionText, 32 * this.scaleFactor)
            .setOrigin(0.5)
            .setDepth(11)
            .setScrollFactor(0);
    }

}

setupNewMobileControls() {
    // --- Jump Button (Left Side) ---
    const jumpButton = this.add.rectangle(this.width * 0.25, this.height / 2, this.width / 2, this.height)
        .setScrollFactor(0)
        .setInteractive()
        .setDepth(10);

    jumpButton.on('pointerdown', () => {
        if (this.roundActive && this.playerRagdoll && this.playerRagdoll.alive && this.playerCanJump) {
            this.jumpRagdoll(this.playerRagdoll);
            this.playerCanJump = false; // Prevent double-jumps
        }
    });

    // --- Shoot Button (Right Side) ---
    const shootButton = this.add.rectangle(this.width * 0.75, this.height / 2, this.width / 2, this.height)
        .setScrollFactor(0)
        .setInteractive()
        .setDepth(10);

    shootButton.on('pointerdown', () => {
        // This function already handles the aim/fire sequence
        this.handlePlayerShootInput();
    });

    // Optional: Add visual feedback for buttons
    jumpButton.on('pointerover', () => jumpButton.setFillStyle(0xffffff, 0.1));
    jumpButton.on('pointerout', () => jumpButton.setFillStyle(0xffffff, 0.0));
    shootButton.on('pointerover', () => shootButton.setFillStyle(0xffffff, 0.1));
    shootButton.on('pointerout', () => shootButton.setFillStyle(0xffffff, 0.0));
}


setupControls() {
    this.input.keyboard.removeAllListeners();

    if (this.isMobile) {
        // Mobile controls remain unchanged
        this.setupNewMobileControls();
    } else {
        // --- Player 1 Keyboard Controls (Desktop) ---
        // JUMP
        this.input.keyboard.on("keydown-W", () => {
            if (this.roundActive && this.playerRagdoll && this.playerRagdoll.alive && this.playerCanJump) {
                this.jumpRagdoll(this.playerRagdoll);
                this.playerCanJump = false;
            }
        });

        // NEW: HOLD to Aim
        this.input.keyboard.on("keydown-SPACE", () => {
            if (!this.playerRagdoll || !this.playerRagdoll.alive || !this.roundActive) return;

            // Start aiming only if ready and cooldown is over
            if (this.aimingState === "ready" && this.time.now > this.playerLastShot + this.shootCooldown) {
                this.aimingState = "aiming";
            }
        });

        // NEW: RELEASE to Fire
        this.input.keyboard.on("keyup-SPACE", () => {
            if (!this.playerRagdoll || !this.playerRagdoll.alive || !this.roundActive) return;

            // If we were aiming, fire the bullet upon release
            if (this.aimingState === "aiming") {
                this.lockAngleAndFire();
                this.playerLastShot = this.time.now; // Start cooldown
            }
        });


        // --- Player 2 Keyboard Controls (Desktop PvP mode) ---
        if (this.gameMode === 'pvp') {
            this.opponentCanJump = true;
            this.opponentAimingState = 'ready';
            this.opponentAimingAngle = 0;
            this.opponentAngleDirection = 1;
            this.opponentAimLine = this.add.graphics().setDepth(2);

            // JUMP
            this.input.keyboard.on("keydown-UP", () => {
                if (this.roundActive && this.opponentRagdoll && this.opponentRagdoll.alive && this.opponentCanJump) {
                    this.jumpRagdoll(this.opponentRagdoll);
                    this.opponentCanJump = false;
                }
            });

            // NEW: HOLD to Aim
            this.input.keyboard.on("keydown-P", () => {
                if (!this.opponentRagdoll || !this.opponentRagdoll.alive || !this.roundActive) return;

                if (this.opponentAimingState === 'ready' && this.time.now > this.opponentLastShot + this.shootCooldown) {
                    this.opponentAimingState = 'aiming';
                }
            });

            // NEW: RELEASE to Fire
            this.input.keyboard.on("keyup-P", () => {
                if (!this.opponentRagdoll || !this.opponentRagdoll.alive || !this.roundActive) return;

                if (this.opponentAimingState === 'aiming') {
                    this.shootBullet(this.opponentRagdoll, 2, this.opponentAimingAngle, this.firePower);
                    this.opponentLastShot = this.time.now; // Start cooldown
                    this.opponentAimingState = 'ready';
                }
            });
        }
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



setupCollisions() {
    if (!this.playerRagdoll || !this.opponentRagdoll) {
      console.error("Cannot setup collisions - objects not created");
      return;
    }

    // --- COLLISION ACTIVE: For continuous checks (Jumping and Bullet Hits) ---
    this.matter.world.on('collisionactive', (event) => {
        // Create a set to hold bullets that need to be removed in this frame.
        // A Set automatically handles duplicates.
        const bulletsToRemove = new Set();

        for (const pair of event.pairs) {
            const { bodyA, bodyB } = pair;
            if (!bodyA.label || !bodyB.label) continue;

            // Handle ground contact for jumping
            const labels = [bodyA.label, bodyB.label];
            if (labels.includes('platform')) {
                if (labels.some(l => l.includes('player_'))) { this.playerCanJump = true; }
                if (labels.some(l => l.includes(this.opponentRagdoll.type))) {
                    if (this.gameMode === 'pvp') this.opponentCanJump = true;
                    else this.aiCanJump = true;
                }
            }
            
            // Pass the temporary list to the collision handler.
            this.handleBulletCollision(bodyA, bodyB, bulletsToRemove);
        }

        // After checking all pairs, destroy the bullets that were marked for removal.
        if (bulletsToRemove.size > 0) {
            bulletsToRemove.forEach(bullet => this.removeBullet(bullet));
        }
    });

    // --- COLLISION START: For one-time events (Falling) ---
    this.matter.world.on("collisionstart", (event) => {
        for (const pair of event.pairs) {
            const { bodyA, bodyB } = pair;
            if (!bodyA.label || !bodyB.label) continue;
            this.handleDeathCollision(bodyA, bodyB);
        }
    });
}                                          


handleDeathCollision(bodyA, bodyB) {
    let ragdollBody = null;

    // Check if a ragdoll part has hit the death platform
    if (bodyA.label === 'deathPlatform' && bodyB.ragdoll) {
        ragdollBody = bodyB;
    } else if (bodyB.label === 'deathPlatform' && bodyA.ragdoll) {
        ragdollBody = bodyA;
    }

    if (ragdollBody) {
        // Check which specific ragdoll instance fell off
        if (ragdollBody.ragdoll === this.playerRagdoll) {
            this.playerFellOff(1); // Player 1 fell
        } else if (ragdollBody.ragdoll === this.opponentRagdoll) {
            this.playerFellOff(2); // The opponent (Player 2 or AI) fell
        }
    }
}


handleBulletCollision(bodyA, bodyB, bulletsToRemove) { // Added 'bulletsToRemove'
    const isBulletA = bodyA.label.includes('bullet');
    const isBulletB = bodyB.label.includes('bullet');

    if (isBulletA || isBulletB) {
        const bulletBody = isBulletA ? bodyA : bodyB;
        const otherBody = isBulletA ? bodyB : bodyA;

        if (otherBody.label.includes('bullet')) return;

        if (otherBody.ragdoll) {
            const bulletLabel = bulletBody.label;
            const hitRagdoll = otherBody.ragdoll;

            if (hitRagdoll === this.playerRagdoll && bulletLabel.includes('aibullet')) {
                this.handleRagdollHit(bulletBody, otherBody, bulletsToRemove); // Pass the list
                return; 
            }

            if (hitRagdoll === this.opponentRagdoll && bulletLabel.includes('playerbullet')) {
                this.handleRagdollHit(bulletBody, otherBody, bulletsToRemove); // Pass the list
                return;
            }
        }

        if (otherBody.label === 'platform') {
            this.createBulletImpact(bulletBody.position.x, bulletBody.position.y);
            // Instead of destroying the bullet, add it to the removal list.
            if (bulletBody.gameObject) {
                bulletsToRemove.add(bulletBody.gameObject);
            }
        }
    }
}



update() {
    // Exit immediately if the game isn't in an active round
    if (!this.gameStarted || this.isGameOver || !this.roundActive) {
        return;
    }

    // --- NEW: Apply continuous bobblehead effect ---
    this.applyBobbleheadEffect(this.playerRagdoll);
    this.applyBobbleheadEffect(this.opponentRagdoll);
    // ------------------------------------------------

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
        // This is the line you need to add
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
            const aimSpeed = 0.05;
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


updateAiming() {
    if (!this.playerRagdoll || !this.playerRagdoll.alive) return;

    const arm = this.playerRagdoll.rightArm.body;

    // --- Handle Player's Arm Movement ---
    if (this.aimingState === "aiming") {
        const aimSpeed = 0.02; // How fast the target angle moves
        const minAngle = -1.9; // Aim up
        const maxAngle = 1.6;  // Aim down

        // This part remains the same: it determines our goal or "target" angle
        this.aimingAngle += this.angleDirection * aimSpeed;
        if (this.aimingAngle >= maxAngle || this.aimingAngle <= minAngle) {
            this.angleDirection *= -1;
        }
        
        // --- NEW PHYSICS-FRIENDLY AIMING LOGIC ---
        // We apply a force to move the arm towards the target angle smoothly.

        // 1. Define how strongly the arm corrects its position.
        const correctionForce = 0.15; 

        // 2. Find the difference between where we want to be (targetAngle) and where we are (arm.angle).
        const angleError = this.aimingAngle - arm.angle;

        // 3. Apply a rotational velocity proportional to the error. This pushes the arm toward the target.
        this.matter.body.setAngularVelocity(arm, angleError * correctionForce);


        // --- Draw Aiming Line (with a fixed length) ---
        const lineLength = 150; 
        this.playerAimLine.clear();
        this.playerAimLine.lineStyle(3, 0x00ff00, 0.7); // Green line

        // IMPORTANT: We use the arm's ACTUAL angle (arm.angle) for the visual line.
        const handVector = new Phaser.Math.Vector2(0, lineLength).rotate(arm.angle);
        this.playerAimLine.moveTo(arm.position.x, arm.position.y);
        this.playerAimLine.lineTo(arm.position.x + handVector.x, arm.position.y + handVector.y);

    } else {
        // Clear the line when not aiming
        this.playerAimLine.clear();
    }
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

    // Check if the cooldown period has passed
    if (this.time.now < this.playerLastShot + this.shootCooldown) {
        return; // Exit if still on cooldown
    }

    if (this.aimingState === "ready") {
        // First press: Start aiming
        this.aimingState = "aiming";
    } else if (this.aimingState === "aiming") {
        // Second press: Lock angle and fire
        this.lockAngleAndFire();
        // Record the time of this shot
        this.playerLastShot = this.time.now;
    }
}
handleRagdollHit(bulletBody, ragdollPartBody, bulletsToRemove) { // Added 'bulletsToRemove'
    if (!this.roundActive || !ragdollPartBody.ragdoll || !ragdollPartBody.ragdoll.alive) {
        return;
    }

    const bulletVelocity = bulletBody.velocity;
    const knockbackPower = 0.3;
    const knockbackVelocity = {
        x: bulletVelocity.x * knockbackPower,
        y: (bulletVelocity.y * knockbackPower) - 2
    };

    const allParts = [ragdollPartBody.ragdoll.head.body, ragdollPartBody.ragdoll.body.body, ragdollPartBody.ragdoll.feet.body, ragdollPartBody.ragdoll.rightArm.body];
    allParts.forEach(part => {
        this.matter.body.setVelocity(part, {
            x: part.velocity.x + knockbackVelocity.x,
            y: part.velocity.y + knockbackVelocity.y
        });
    });

    const bodyToWobble = ragdollPartBody.ragdoll.body;
    const torqueStrength = 20;
    bodyToWobble.torque = torqueStrength * Math.sign(bulletVelocity.x);

    const ragdoll = ragdollPartBody.ragdoll;
    if (ragdoll && !ragdoll.isWobbly) {
        ragdoll.isWobbly = true;
        this.time.delayedCall(1500, () => {
            if (ragdoll) {
                ragdoll.isWobbly = false;
            }
        });
    }

    if (this.sounds.damage) {
        this.sounds.damage.play();
    }

    // Instead of destroying the bullet, add it to the removal list.
    if (bulletBody.gameObject) {
        bulletsToRemove.add(bulletBody.gameObject);
    }
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
    this.aiAimingState = "ready";
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
        // This sets the text to just the number, which is what the new UI needs.
        this.playerScoreText.setText(this.playerScore.toString());
        
        // The existing animation will now apply to the new text object.
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
        // This also sets just the number for the opponent.
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

    // --- Define Ending Titles ---
    const desktopTitles = ["Ouch!", "Game Over", "That must hurt.", "Are you even trying?", "Just press Ctrl + W", "Try again...", "Did you try jumping?", "Alt + F4 seems like a good option.", "You do disservice to your graphics card."];
    const mobileTitles = ["Ouch!", "Game Over", "That must hurt.", "Are you even trying?", "Is your screen broken?", "Did you try jumping?", "Press the home button lil bro", "Try turning it off and on again.", "You need a new phone."];

    const endingTitles = this.isMobile ? mobileTitles : desktopTitles;
    const randomTitle = Phaser.Math.RND.pick(endingTitles);

    // --- Display Random Title ---
    const titleText = this.add.bitmapText(this.width / 2, this.height / 2 - 80, "pixelfont", randomTitle, 48 * this.scaleFactor)
        .setOrigin(0.5)
        .setDepth(12)
        .setScrollFactor(0);

    // --- Determine and Display Winner ---
    const winner = this.playerScore >= this.roundsToWin ? 1 : 2;
    let winnerString = "";
    if (winner === 1) {
        winnerString = "PLAYER 1 WINS!";
    } else {
        winnerString = this.gameMode === 'pvp' ? "PLAYER 2 WINS!" : "AI WINS!";
    }

    const victoryText = this.add.bitmapText(this.width / 2, this.height / 2, "pixelfont", winnerString, 72 * this.scaleFactor)
        .setOrigin(0.5)
        .setDepth(12)
        .setScrollFactor(0);

    // Animate texts
    this.tweens.add({
        targets: [titleText, victoryText],
        scale: { from: 0, to: 1 },
        duration: 500,
        ease: "Back.easeOut"
    });

    this.score = winner === 1 ? this.playerScore : this.aiScore;

    if (this.sounds.success) this.sounds.success.setVolume(0.7).play();
    if (this.sounds.background) this.sounds.background.stop();

    this.time.delayedCall(3000, () => this.gameOver());
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
  scene: [MainMenuScene, InstructionsScene, HelpScene, GameScene],
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
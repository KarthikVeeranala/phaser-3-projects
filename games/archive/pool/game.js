class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        for (const key in _CONFIG.imageLoader) {
            this.load.image(key, _CONFIG.imageLoader[key]);
        }

        for (const key in _CONFIG.soundsLoader) {
            this.load.audio(key, _CONFIG.soundsLoader[key]);
        }

        const fontName = 'pix';
        const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/";
        this.load.bitmapFont('pixelfont', fontBaseURL + fontName + '.png', fontBaseURL + fontName + '.xml');

        displayProgressLoader.call(this);
    }

    create() {
        this.scene.start('TitleScene');
    }
}

class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: "TitleScene"
        });
    }

    create() {
        // Dynamic Background
        this.add
            .image(
                this.game.config.width / 2,
                this.game.config.height / 2,
                "background_blur"
            )
            .setAlpha(0.7);

        // Stylized Title
        const logo = this.add
            .image(this.game.config.width / 2, this.game.config.height / 3, "logo")
            .setDisplaySize(500, 250);
        this.tweens.add({
            targets: logo,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        // Procedurally Generated Play Button
        const playButton = this.add.container(
            this.game.config.width / 2,
            this.game.config.height / 2 + 200
        );
        const playButtonBG = this.add.graphics();
        playButtonBG
            .fillStyle(0x00ff00, 1)
            .fillRoundedRect(-125, -50, 250, 100, 32);
        playButtonBG
            .lineStyle(4, 0xffffff, 1)
            .strokeRoundedRect(-125, -50, 250, 100, 32);
        const playButtonText = this.add
            .text(0, 0, "Play", {
                fontFamily: "Arial",
                fontSize: "50px",
                fill: "#000000",
            })
            .setOrigin(0.5);
        playButton.add([playButtonBG, playButtonText]);

        const hitArea = new Phaser.Geom.Rectangle(-125, -50, 250, 100);
        playButton.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

        playButton.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
            this.tweens.add({
                targets: playButton,
                scale: 1.1,
                duration: 200
            });
        });
        playButton.on("pointerout", () => {
            this.input.setDefaultCursor("default");
            this.tweens.add({
                targets: playButton,
                scale: 1,
                duration: 200
            });
        });
        playButton.on("pointerdown", () => {
            this.tweens.add({
                targets: playButton,
                scale: 0.9,
                duration: 100,
                yoyo: true,
            });
            this.time.delayedCall(200, () => this.scene.start("MenuScene"));
        });
    }
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuScene"
        });
        this.playerConfigs = [{
            color: "red",
            type: "HUMAN",
            profileIndex: 1
        }, {
            color: "blue",
            type: "AI",
            profileIndex: 2
        }, ];
        this.numPlayers = 2; // Set this to 2
        this.playerUI = [];
    }

    create() {
        this.input.setDefaultCursor("default");
        this.add
            .image(
                this.game.config.width / 2,
                this.game.config.height / 2,
                "background_blur"
            )
            .setAlpha(0.7);

        this.add
            .text(this.game.config.width / 2, 50, "Game Setup", {
                fontFamily: "Arial",
                fontSize: "60px",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4,
            })
            .setOrigin(0.5);

        this.playerConfigs.forEach((config, index) =>
            this.createPlayerCard(config, index)
        );
        this.updateUI();

        const startButton = this.add.container(
            this.game.config.width / 2,
            this.game.config.height - 60
        );
        const startButtonBG = this.add
            .graphics()
            .fillStyle(0x00cc00, 1)
            .fillRoundedRect(-150, -50, 300, 100, 32);
        const startButtonText = this.add
            .text(0, 0, "Start Game", {
                fontFamily: "Arial",
                fontSize: "40px",
                fill: "#ffffff",
            })
            .setOrigin(0.5);
        startButton.add([startButtonBG, startButtonText]);

        const startHitArea = new Phaser.Geom.Rectangle(-150, -50, 300, 100);
        startButton.setInteractive(startHitArea, Phaser.Geom.Rectangle.Contains);

        startButton.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
            this.tweens.add({
                targets: startButton,
                scale: 1.1,
                duration: 200
            });
        });
        startButton.on("pointerout", () => {
            this.input.setDefaultCursor("default");
            this.tweens.add({
                targets: startButton,
                scale: 1,
                duration: 200
            });
        });
        startButton.on("pointerdown", () => {
            this.tweens.add({
                targets: startButton,
                scale: 0.9,
                duration: 100,
                yoyo: true,
            });
            this.time.delayedCall(200, () => {
                const player2 = this.playerConfigs[1];
                const gameMode = (player2.type === 'AI') ? 'PVE' : 'PVP';
                this.scene.start("GameScene", {
                    mode: gameMode
                });
            });
        });
    }

    createPlayerCard(config, index) {
        const cardHeight = 75;
        const cardYOffset = 10;
        const yPos = 245 + index * (cardHeight + cardYOffset);
        const cardWidth = 800;
        const cardX = this.game.config.width / 2 - cardWidth / 2;
        const card = this.add.graphics();
        const colorMap = {
            red: 0xff0000,
            blue: 0x0000ff,
            green: 0x00ff00,
            yellow: 0xffff00,
        };
        const cardColor = colorMap[config.color] || 0xffffff;

        card.fillStyle(0x1a1a1a, 0.8).fillRoundedRect(cardX, yPos, cardWidth, cardHeight, 16);
        card.lineStyle(3, cardColor, 1).strokeRoundedRect(cardX, yPos, cardWidth, cardHeight, 16);

        const colorIndicator = this.add.graphics();
        colorIndicator.fillStyle(cardColor, 1);
        colorIndicator.fillRoundedRect(cardX, yPos, 20, cardHeight, {
            tl: 16,
            bl: 16,
            tr: 0,
            br: 0,
        });

        const profileX = cardX + 80;
        const profileY = yPos + cardHeight / 2;

        const playerLabel = this.add.text(profileX - 35, profileY, `P${index + 1}`, {
            fontFamily: "Arial",
            fontSize: "32px",
            fill: "#FFF",
            fontStyle: "bold",
        }).setOrigin(0.5);

        const profileImage = this.add.image(profileX + 30, profileY, `profile_${config.profileIndex}`).setDisplaySize(65, 65);

        const leftArrow = this.add.text(profileX + 95, profileY, "<", {
            fontSize: "40px",
            fill: "#fff"
        }).setOrigin(0.5).setInteractive({
            useHandCursor: true
        });

        const rightArrow = this.add.text(profileX + 145, profileY, ">", {
            fontSize: "40px",
            fill: "#fff"
        }).setOrigin(0.5).setInteractive({
            useHandCursor: true
        });

        leftArrow.on("pointerdown", () => {
            config.profileIndex--;
            if (config.profileIndex < 1) config.profileIndex = 6;
            profileImage.setTexture(`profile_${config.profileIndex}`);
        });
        rightArrow.on("pointerdown", () => {
            config.profileIndex++;
            if (config.profileIndex > 6) config.profileIndex = 1;
            profileImage.setTexture(`profile_${config.profileIndex}`);
        });

        const typeSelectX = cardX + cardWidth - 150;
        let uiElements = {};

        if (index === 1) { // Player 2 Only
            const humanIcon = this.add.image(typeSelectX, profileY, "human_icon").setDisplaySize(55, 55).setInteractive({
                useHandCursor: true
            });
            const aiIcon = this.add.image(typeSelectX + 80, profileY, "bot_icon").setDisplaySize(55, 55).setInteractive({
                useHandCursor: true
            });

            humanIcon.on("pointerdown", () => {
                config.type = "HUMAN";
                this.updateUI();
            });
            aiIcon.on("pointerdown", () => {
                config.type = "AI";
                this.updateUI();
            });
            uiElements.humanIcon = humanIcon;
            uiElements.aiIcon = aiIcon;
        } else { // Player 1 is always HUMAN
            config.type = "HUMAN";
            this.add.image(typeSelectX + 40, profileY, "human_icon").setDisplaySize(55, 55).setAlpha(0.7);
        }

        this.playerUI[index] = {
            card,
            colorIndicator,
            playerLabel,
            profileImage,
            leftArrow,
            rightArrow,
            ...uiElements,
            config,
        };
    }

    updateUI() {
        this.playerUI.forEach((ui, index) => {
            const isVisible = index < this.numPlayers;
            for (const key in ui) {
                if (key !== "config" && ui[key].setVisible) {
                    ui[key].setVisible(isVisible);
                }
            }

            if (isVisible) {
                ui.leftArrow.setVisible(ui.config.type === "HUMAN");
                ui.rightArrow.setVisible(ui.config.type === "HUMAN");
                if (ui.humanIcon) {
                    ui.humanIcon.setAlpha(ui.config.type === "HUMAN" ? 1.0 : 0.4);
                }
                if (ui.aiIcon) {
                    ui.aiIcon.setAlpha(ui.config.type === "AI" ? 1.0 : 0.4);
                }
            }
        });
    }
}

class ResultScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'ResultScene'
        });
    }

    create(data) {
        // You can add a result background if you have one in config
        // this.add.image(0, 0, 'result_bg').setOrigin(0).setDisplaySize(this.width, this.height);
        this.add.bitmapText(this.width / 2, this.height / 2 - 80, 'pixelfont', data.winnerText || 'Game Over', 64).setOrigin(0.5);
        if (data.reason) {
            this.add.bitmapText(this.width / 2, this.height / 2 - 20, 'pixelfont', data.reason, 24).setOrigin(0.5);
        }
    }
}


function displayProgressLoader() {
    let width = 320;
    let height = 50;
    let x = (this.game.config.width / 2) - 160;
    let y = (this.game.config.height / 2) - 50;

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(x, y, width, height);

    const loadingText = this.make.text({
        x: this.game.config.width / 2,
        y: this.game.config.height / 2 + 20,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    }).setOrigin(0.5, 0.5);

    const progressBar = this.add.graphics();
    this.load.on('progress', (value) => {
        progressBar.clear();
        progressBar.fillStyle(0x364afe, 1);
        progressBar.fillRect(x, y, width * value, height);
    });
    this.load.on('complete', function() {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
    });
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ // Correct: super() is the first line
            key: 'GameScene'
        });
        
        this.ballInHand = false; // Now this is fine
        this.ballsPocketed = [];
        this.ballData = [{
            number: 0,
            key: 'ball_white',
            type: 'cue',
            x: 0,
            y: 0
        }, {
            number: 1,
            key: 'ball_red_1',
            type: 'solid',
            x: 0,
            y: 0
        }, {
            number: 2,
            key: 'ball_red_2',
            type: 'solid',
            x: 0,
            y: 0
        }, {
            number: 3,
            key: 'ball_red_3',
            type: 'solid',
            x: 0,
            y: 0
        }, {
            number: 4,
            key: 'ball_red_4',
            type: 'solid',
            x: 0,
            y: 0
        }, {
            number: 5,
            key: 'ball_red_5',
            type: 'solid',
            x: 0,
            y: 0
        }, {
            number: 6,
            key: 'ball_red_6',
            type: 'solid',
            x: 0,
            y: 0
        }, {
            number: 7,
            key: 'ball_red_7',
            type: 'solid',
            x: 0,
            y: 0
        }, {
            number: 8,
            key: 'ball_black',
            type: '8ball',
            x: 0,
            y: 0
        }, {
            number: 9,
            key: 'ball_yellow_9',
            type: 'stripe',
            x: 0,
            y: 0
        }, {
            number: 10,
            key: 'ball_yellow_10',
            type: 'stripe',
            x: 0,
            y: 0
        }, {
            number: 11,
            key: 'ball_yellow_11',
            type: 'stripe',
            x: 0,
            y: 0
        }, {
            number: 12,
            key: 'ball_yellow_12',
            type: 'stripe',
            x: 0,
            y: 0
        }, {
            number: 13,
            key: 'ball_yellow_13',
            type: 'stripe',
            x: 0,
            y: 0
        }, {
            number: 14,
            key: 'ball_yellow_14',
            type: 'stripe',
            x: 0,
            y: 0
        }, {
            number: 15,
            key: 'ball_yellow_15',
            type: 'stripe',
            x: 0,
            y: 0
        }];
    }

    preload() {
        for (const key in _CONFIG.imageLoader) {
            this.load.image(key, _CONFIG.imageLoader[key]);
        }

        for (const key in _CONFIG.soundsLoader) {
            this.load.audio(key, [_CONFIG.soundsLoader[key]]);
        }

        addEventListenersPhaser.bind(this)();

        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");
        const fontName = 'pix';
        const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/"
        this.load.bitmapFont('pixelfont', fontBaseURL + fontName + '.png', fontBaseURL + fontName + '.xml');
        displayProgressLoader.call(this);
    }

    create() {
        this.ballsPocketed = [];
        this.input.keyboard.disableGlobalCapture();

        this.vfx = new VFXLibrary(this);
        this.cursor = this.input.keyboard.createCursorKeys();

        this.sounds = {};
        for (const key in _CONFIG.soundsLoader) {
            this.sounds[key] = this.sound.add(key, {
                loop: false,
                volume: 0.5
            });
        }
        
        if (this.sounds.background) {
            this.sounds.background.setVolume(0.3).setLoop(true).play();
        }

        this.width = this.game.config.width;
        this.height = this.game.config.height;

        this.table = this.add.image(this.width / 2, this.height / 2, "table").setOrigin(0.5);
        this.table.setScale(0.25);

        this.currentPlayer = 'player';
        this.playerType = null;
        this.computerType = null;
        this.firstHit = true;
        this.turnEnded = false;
        this.shotTaken = false;
        this.score = 0;
        this.isGameOver = false;
        this.foul = false;
        this.gameState = 'aiming';

        this.setupPoolPhysics();
        this.createBalls();
        this.setupPockets();
        this.createCue();
        this.setupPowerMeter();
        this.createAimLine();
        this.createUI();
        this.setupInputHandlers();
        
    }

setupPoolPhysics() {
    const tableWidth = this.table.displayWidth;
    const tableHeight = this.table.displayHeight;
    const tableX = this.width / 2;
    const tableY = this.height / 2;

    // Define the inner playing area dimensions
    const innerWidth = tableWidth * 0.85;
    const innerHeight = tableHeight * 0.77;

    this.tableBounds = {
    left: tableX - innerWidth / 2,
    right: tableX + innerWidth / 2,
    top: tableY - innerHeight / 2,
    bottom: tableY + innerHeight / 2
};

    // Create a physics group for the cushions
    this.cushions = this.physics.add.staticGroup();

    // Create the 4 cushions (walls)
    // Top cushion
    this.cushions.create(tableX, tableY - innerHeight / 2).setSize(innerWidth, 20).refreshBody();
    // Bottom cushion
    this.cushions.create(tableX, tableY + innerHeight / 2).setSize(innerWidth, 20).refreshBody();
    // Left cushion
    this.cushions.create(tableX - innerWidth / 2, tableY).setSize(20, innerHeight).refreshBody();
    // Right cushion
    this.cushions.create(tableX + innerWidth / 2, tableY).setSize(20, innerHeight).refreshBody();

    // Add a collider between the balls and the cushions
    this.physics.add.collider(this.balls, this.cushions);

    // Remove world gravity (already present but good to confirm)
    this.physics.world.gravity.y = 0;
}

createBalls() {
    const ballDiameter = 28;
    const ballRadius = ballDiameter / 2;
    const ballSpacing = ballDiameter * 1.05;

    const tableWidth = this.table.displayWidth;
    const playableWidth = tableWidth * 0.85; // Use consistent percentage
    const cueBallX = this.width / 2 - playableWidth / 4;
    const rackX = this.width / 2 + playableWidth / 4;
    const rackY = this.height / 2;

    this.balls = this.physics.add.group();

    // --- CUE BALL CREATION ---
    this.cueBall = this.balls.create(cueBallX, this.height / 2, 'ball_white');
    this.cueBall.setDisplaySize(ballDiameter, ballDiameter);
    // Correctly size and center the physics body
    this.cueBall.body.setSize(ballDiameter, ballDiameter).setCircle(ballRadius);
    this.cueBall.setBounce(0.8).setCollideWorldBounds(true).setDamping(true).setDrag(0.2, 0.2);
    Object.assign(this.cueBall, { number: 0, type: 'cue', pocketed: false, depth: 1 });


    // --- RACKING LOGIC ---
    const positions = [{row: 0, col: 0}, {row: 1, col: -0.5}, {row: 1, col: 0.5}, {row: 2, col: -1}, {row: 2, col: 0}, {row: 2, col: 1}, {row: 3, col: -1.5}, {row: 3, col: -0.5}, {row: 3, col: 0.5}, {row: 3, col: 1.5}, {row: 4, col: -2}, {row: 4, col: -1}, {row: 4, col: 0}, {row: 4, col: 1}, {row: 4, col: 2}];
    const shuffledIndices = this.shuffleArray([...Array(15).keys()].map(i => i + 1));
    const eightBallIndex = shuffledIndices.indexOf(8);
    shuffledIndices[eightBallIndex] = shuffledIndices[4];
    shuffledIndices[4] = 8;

    // --- NUMBERED BALLS CREATION ---
    for (let i = 0; i < 15; i++) {
        const ballIndex = shuffledIndices[i];
        const data = this.ballData[ballIndex];
        const pos = positions[i];
        const x = rackX + pos.row * (ballSpacing * 0.866); // For tight triangle pack
        const y = rackY + pos.col * ballSpacing;

        const ball = this.balls.create(x, y, data.key);
        ball.setDisplaySize(ballDiameter, ballDiameter);
        // Correctly size and center the physics body
        ball.body.setSize(ballDiameter, ballDiameter).setCircle(ballRadius);
        ball.setBounce(0.8).setCollideWorldBounds(true).setDamping(true).setDrag(0.2, 0.2);
        Object.assign(ball, { number: data.number, type: data.type, pocketed: false, depth: 1, body: { mass: 1.0 } });
    }

    // Set a collider for all balls in the group
    this.physics.add.collider(this.balls, this.balls);
}

    handleWorldBoundsCollision(body, up, down, left, right) {
        if (body.gameObject && (up || down || left || right)) {
            const velocity = Math.sqrt(body.velocity.x * body.velocity.x + body.velocity.y * body.velocity.y);
            if (velocity > 50) {
                this.sounds.ball_hit.play();
            }
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

setupPockets() {
    const pocketRadius = 22; // The collision size of the pocket hole
    const tableWidth = this.table.displayWidth;
    const tableHeight = this.table.displayHeight;
    const tableX = this.width / 2;
    const tableY = this.height / 2;

    // Positions calculated relative to the table's center and size
    const pocketPositions = [
        { x: tableX - tableWidth * 0.48, y: tableY - tableHeight * 0.45 }, // Top left
        { x: tableX, y: tableY - tableHeight * 0.48 },                     // Top center
        { x: tableX + tableWidth * 0.48, y: tableY - tableHeight * 0.45 }, // Top right
        { x: tableX - tableWidth * 0.48, y: tableY + tableHeight * 0.45 }, // Bottom left
        { x: tableX, y: tableY + tableHeight * 0.48 },                     // Bottom center
        { x: tableX + tableWidth * 0.48, y: tableY + tableHeight * 0.45 }  // Bottom right
    ];

    this.pockets = this.physics.add.staticGroup();

    pocketPositions.forEach(pos => {
        const pocket = this.pockets.create(pos.x, pos.y);
        // Make the body a circle and disable the visual sprite
        pocket.body.setCircle(pocketRadius);
        pocket.setVisible(false); 
    });

    // Use overlap to detect when a ball falls in a pocket
    this.physics.add.overlap(this.balls, this.pockets, this.handlePocket, null, this);
}
    createCue() {
        this.cue = this.add.sprite(this.cueBall.x, this.cueBall.y, 'cue');
        this.cue.setOrigin(0, 0.5);
        this.cue.setScale(0.8);
        this.cue.depth = 2;
        this.cue.visible = true;
        this.cue.distance = 300;
    }

    setupPowerMeter() {
        const meterWidth = 200;
        const meterHeight = 20;

        this.powerMeterBg = this.add.rectangle(this.width / 2, this.height - 50, meterWidth, meterHeight, 0x333333).setOrigin(0.5).setDepth(5);
        this.powerMeterFill = this.add.rectangle(this.width / 2 - meterWidth / 2, this.height - 50, 0, meterHeight, 0xff0000).setOrigin(0, 0.5).setDepth(6);
        this.power = 0;
        this.maxPower = meterWidth;
        this.powerIncreasing = false;
    }

    createAimLine() {
        this.aimLine = this.add.graphics();
        this.aimLine.depth = 1;
        this.aimLine.visible = true;
    }

    createUI() {
        this.scoreText = this.add.bitmapText(20, 20, 'pixelfont', 'Score: 0', 20).setDepth(10);
        this.turnText = this.add.bitmapText(this.width / 2, 20, 'pixelfont', 'Your Turn', 20).setOrigin(0.5, 0).setDepth(10);
        this.playerTypeText = this.add.bitmapText(20, 50, 'pixelfont', 'Player: Not decided', 16).setDepth(10);
        this.computerTypeText = this.add.bitmapText(20, 70, 'pixelfont', 'Computer: Not decided', 16).setDepth(10);
        this.instructionText = this.add.bitmapText(this.width / 2, this.height - 80, 'pixelfont', 'Click to aim, click and hold to shoot', 16).setOrigin(0.5, 0).setDepth(10);
    }

setupInputHandlers() {
    this.input.on('pointermove', (pointer) => {
        if (this.gameState === 'aiming' && this.currentPlayer === 'player' && !this.ballInHand) {
            this.updateAim(pointer);
        }
    });

    this.input.on('pointerdown', (pointer) => {
        // --- ADD THIS BLOCK FOR BALL-IN-HAND ---
        if (this.ballInHand) {
            this.cueBall.setPosition(pointer.x, pointer.y);
            this.cueBall.body.enable = true;
            this.ballInHand = false;
            this.gameState = 'aiming';
            this.turnText.setText('Your Turn');
            return; // Stop further execution
        }
        // --- END OF NEW BLOCK ---

        if (this.gameState === 'aiming' && this.currentPlayer === 'player') {
            this.powerIncreasing = true;
            this.gameState = 'shooting';
        }
    });

    this.input.on('pointerup', (pointer) => {
        if (this.gameState === 'shooting' && this.currentPlayer === 'player') {
            this.shoot();
            this.powerIncreasing = false;
            this.gameState = 'ballsMoving';
        }
    });
}



    updateAim(pointer) {
        const dx = pointer.x - this.cueBall.x;
        const dy = pointer.y - this.cueBall.y;
        const angle = Math.atan2(dy, dx);
        this.cue.x = this.cueBall.x - Math.cos(angle) * this.cue.distance;
        this.cue.y = this.cueBall.y - Math.sin(angle) * this.cue.distance;
        this.cue.rotation = angle;
        this.updateAimLine(angle);
    }

    updateAimLine(angle) {
        this.aimLine.clear();
        this.aimLine.lineStyle(2, 0xffffff, 0.5);
        const startX = this.cueBall.x;
        const startY = this.cueBall.y;
        const endX = startX + Math.cos(angle) * 200;
        const endY = startY + Math.sin(angle) * 200;
        this.aimLine.beginPath();
        this.aimLine.moveTo(startX, startY);
        this.aimLine.lineTo(endX, endY);
        this.aimLine.strokePath();
    }

    shoot() {
        const minPower = 150;
        const maxPower = 600;
        const power = minPower + (this.power / this.maxPower * (maxPower - minPower));
        const angle = this.cue.rotation;
        const vx = Math.cos(angle) * power;
        const vy = Math.sin(angle) * power;

        this.cueBall.setVelocity(vx, vy);
        this.cue.visible = false;
        this.aimLine.visible = false;
        this.sounds.cue_hit.play();
        this.power = 0;
        this.powerMeterFill.width = 0;
        this.shotTaken = true;
        this.firstBallHit = null;
        this.ballsPocketed = [];
    }

    handleBallCollision(ball1, ball2) {
        const velocitySum = Math.abs(ball1.body.velocity.x) + Math.abs(ball1.body.velocity.y) + Math.abs(ball2.body.velocity.x) + Math.abs(ball2.body.velocity.y);
        if (velocitySum > 50) {
            this.sounds.ball_hit.play();
        }

        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return;

        const nx = dx / distance;
        const ny = dy / distance;
        const ballRadius = ball1.width * 0.18;
        const minDistance = ballRadius * 2;

        if (distance < minDistance) {
            const overlap = (minDistance - distance) * 0.5;
            ball1.x -= nx * overlap * 1.05;
            ball1.y -= ny * overlap * 1.05;
            ball2.x += nx * overlap * 1.05;
            ball2.y += ny * overlap * 1.05;

            this.keepBallInBounds(ball1);
            this.keepBallInBounds(ball2);

            const v1n = ball1.body.velocity.x * nx + ball1.body.velocity.y * ny;
            const v2n = ball2.body.velocity.x * nx + ball2.body.velocity.y * ny;
            if (v1n - v2n > 0) {
                const restitution = 0.95;
                const impulse = (v1n - v2n) * restitution;
                ball1.body.velocity.x -= impulse * nx;
                ball1.body.velocity.y -= impulse * ny;
                ball2.body.velocity.x += impulse * nx;
                ball2.body.velocity.y += impulse * ny;
            }
        }

        if (this.shotTaken && !this.firstBallHit && (ball1 === this.cueBall || ball2 === this.cueBall)) {
            this.firstBallHit = ball1 === this.cueBall ? ball2 : ball1;
        }
    }

    keepBallInBounds(ball) {
        if (ball.x < this.tableBounds.left) {
            ball.x = this.tableBounds.left;
            ball.body.velocity.x = Math.abs(ball.body.velocity.x) * 0.8;
        } else if (ball.x > this.tableBounds.right) {
            ball.x = this.tableBounds.right;
            ball.body.velocity.x = -Math.abs(ball.body.velocity.x) * 0.8;
        }

        if (ball.y < this.tableBounds.top) {
            ball.y = this.tableBounds.top;
            ball.body.velocity.y = Math.abs(ball.body.velocity.y) * 0.8;
        } else if (ball.y > this.tableBounds.bottom) {
            ball.y = this.tableBounds.bottom;
            ball.body.velocity.y = -Math.abs(ball.body.velocity.y) * 0.8;
        }
    }

handlePocket(ball, pocket) {
    // If the ball is already pocketed, do nothing.
    if (ball.pocketed) return;

    // Mark ball as pocketed
    ball.pocketed = true;
    
    // Play sound and add to the list of pocketed balls for this turn
    this.sounds.pocket.play();
    this.ballsPocketed.push(ball);

    // Check if the pocketed ball is the cue ball or 8-ball
    if (ball === this.cueBall) {
        this.foul = true;
    } else if (ball.number === 8) {
        this.handleEightBallPocket();
    }
    
    // Disable and hide the ball
    ball.setVisible(false);
    ball.setActive(false);
    ball.body.enable = false;
    ball.setVelocity(0, 0);
    ball.setPosition(-1000, -1000); // Move it far away
}

    handleEightBallPocket() {
        let playerWon = false;
        if (this.currentPlayer === 'player') {
            if (this.playerType) {
                const playerBalls = this.balls.getChildren().filter(b => b.type === this.playerType && !b.pocketed && b.number !== 8);
                playerWon = playerBalls.length === 0 && !this.foul;
            }
        } else {
            if (this.computerType) {
                const computerBalls = this.balls.getChildren().filter(b => b.type === this.computerType && !b.pocketed && b.number !== 8);
                playerWon = !(computerBalls.length === 0 && !this.foul);
            }
        }

        if (playerWon) {
            this.turnText.setText("You Win!");
            this.score += 100;
        } else {
            this.turnText.setText("Computer Wins!");
        }

        this.time.delayedCall(2000, () => {
            this.resetGame();
            this.gameOver();
        });
    }

handleCueBallPocket() {
    // This function is now used to initiate ball-in-hand
    this.cueBall.pocketed = false; // Reset pocketed flag
    this.cueBall.setVisible(true); // Make it visible for placing
    this.cueBall.setActive(true);
    this.cueBall.setVelocity(0, 0);
    this.cueBall.body.enable = false; // Temporarily disable physics

    this.ballInHand = true; // Set the flag
    this.turnText.setText('Ball in Hand! Place the cue ball.');
}

    checkBallsMoving() {
        const velocityThreshold = 0.3;
        for (const ball of this.balls.getChildren()) {
            if (!ball.pocketed) {
                const velocity = Math.sqrt(ball.body.velocity.x * ball.body.velocity.x + ball.body.velocity.y * ball.body.velocity.y);
                if (velocity > velocityThreshold) {
                    return true;
                } else if (velocity < velocityThreshold) {
                    ball.setVelocity(0, 0);
                }
            }
        }
        return false;
    }

    endTurn() {
        this.shotTaken = false;
        this.turnEnded = true;

        if (!this.playerType && this.ballsPocketed.length > 0) {
            const firstPocketed = this.ballsPocketed[0];
            if (firstPocketed.number < 8) {
                this.playerType = this.currentPlayer === 'player' ? 'solid' : 'stripe';
                this.computerType = this.currentPlayer === 'player' ? 'stripe' : 'solid';
            } else if (firstPocketed.number > 8) {
                this.playerType = this.currentPlayer === 'player' ? 'stripe' : 'solid';
                this.computerType = this.currentPlayer === 'player' ? 'solid' : 'stripe';
            }
            this.playerTypeText.setText(`Player: ${this.playerType || 'Not decided'}`);
            this.computerTypeText.setText(`Computer: ${this.computerType || 'Not decided'}`);
        }

        let keepTurn = false;
        if (!this.foul && this.ballsPocketed.length > 0) {
            if (this.playerType) {
                keepTurn = this.ballsPocketed.some(ball => (this.currentPlayer === 'player' && ball.type === this.playerType) || (this.currentPlayer === 'computer' && ball.type === this.computerType));
            } else {
                keepTurn = true;
            }
        }

        if (this.foul || (this.firstBallHit && this.playerType && ((this.currentPlayer === 'player' && this.firstBallHit.type !== this.playerType) || (this.currentPlayer === 'computer' && this.firstBallHit.type !== this.computerType)))) {
            keepTurn = false;
            if (this.cueBall.pocketed) {
                this.handleCueBallPocket();
            }
        }

        if (!keepTurn) {
            this.currentPlayer = this.currentPlayer === 'player' ? 'computer' : 'player';
            this.turnText.setText(this.currentPlayer === 'player' ? 'Your Turn' : 'Computer Turn');
        }

        this.foul = false;
        this.ballsPocketed = [];
        this.firstBallHit = null;

        if (this.currentPlayer === 'computer' && !this.isGameOver) {
            this.time.delayedCall(1000, this.computerTurn, [], this);
        } else {
            this.cue.visible = true;
            this.aimLine.visible = true;
            this.gameState = 'aiming';
        }
    }

    computerTurn() {
        if (this.isGameOver) return;
        this.gameState = 'computerTurn';

        const targets = this.getComputerTargets();
        if (targets.length === 0) return;

        const target = targets[Math.floor(Math.random() * targets.length)];
        const dx = target.ball.x - this.cueBall.x;
        const dy = target.ball.y - this.cueBall.y;
        const angle = Math.atan2(dy, dx);
        const accuracy = 0.1;
        const randomAngle = angle + (Math.random() * 2 - 1) * accuracy;

        this.cue.setPosition(this.cueBall.x - Math.cos(randomAngle) * this.cue.distance, this.cueBall.y - Math.sin(randomAngle) * this.cue.distance).setRotation(randomAngle).setVisible(true);
        this.updateAimLine(randomAngle);
        this.aimLine.visible = true;

        this.power = (Math.random() * 0.5 + 0.3) * this.maxPower;
        this.powerMeterFill.width = this.power;

        this.time.delayedCall(1500, () => {
            this.shoot();
            this.gameState = 'ballsMoving';
            this.shotTaken = true;
        });
    }

    getComputerTargets() {
        const targets = [];
        this.balls.getChildren().forEach(ball => {
            if (ball.pocketed || ball === this.cueBall) return;
            if (this.computerType) {
                if (ball.type === this.computerType || (ball.number === 8 && this.isComputerReadyFor8Ball())) {
                    targets.push({
                        ball,
                        priority: ball.number === 8 ? 2 : 1
                    });
                }
            } else {
                if (ball.number > 0) {
                    targets.push({
                        ball,
                        priority: 1
                    });
                }
            }
        });
        targets.sort((a, b) => b.priority - a.priority);
        return targets;
    }

    isComputerReadyFor8Ball() {
        return !this.balls.getChildren().some(ball => ball.type === this.computerType && !ball.pocketed);
    }

    update() {
        if (this.gameState === 'shooting' && this.powerIncreasing) {
            this.power += 2;
            if (this.power >= this.maxPower) {
                this.power = this.maxPower;
                this.powerIncreasing = false;
            }
            this.powerMeterFill.width = this.power;
        }

        if (this.gameState === 'ballsMoving') {
            if (!this.checkBallsMoving()) {
                this.gameState = 'waiting';
                this.time.delayedCall(800, () => {
                    if (!this.isGameOver && this.gameState === 'waiting') {
                        this.endTurn();
                    }
                });
            }
        }

        if (this.gameState === 'aiming' && this.currentPlayer === 'player') {
            const pointer = this.input.activePointer;
            if (pointer.isDown) { // This condition might be too restrictive
                this.updateAim(pointer);
            }
        }

        this.correctBallOverlaps();

        this.balls.getChildren().forEach(ball => {
    if (!ball.body) return;

    // Apply a constant friction factor
    ball.body.velocity.x *= 0.99;
    ball.body.velocity.y *= 0.99;

    // Stop the ball completely if it's moving very slowly
    if (Math.abs(ball.body.velocity.x) < 0.1) {
        ball.body.velocity.x = 0;
    }
    if (Math.abs(ball.body.velocity.y) < 0.1) {
        ball.body.velocity.y = 0;
    }
});

// At the very top of your update() method
if (this.ballInHand) {
    const pointer = this.input.activePointer;
    this.cueBall.setPosition(pointer.x, pointer.y);
    this.cue.visible = false;
    this.aimLine.visible = false;
    return; // Skip the rest of the update logic
}

    }

    correctBallOverlaps() {
        const balls = this.balls.getChildren();
        for (let i = 0; i < balls.length; i++) {
            const ball1 = balls[i];
            if (ball1.pocketed) continue;
            for (let j = i + 1; j < balls.length; j++) {
                const ball2 = balls[j];
                if (ball2.pocketed) continue;

                const dx = ball2.x - ball1.x;
                const dy = ball2.y - ball1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = ball1.width * 0.18 * 2;

                if (distance > 0 && distance < minDistance) {
                    const overlap = (minDistance - distance) / 2;
                    const nx = dx / distance;
                    const ny = dy / distance;
                    ball1.x -= nx * overlap;
                    ball1.y -= ny * overlap;
                    ball2.x += nx * overlap;
                    ball2.y += ny * overlap;
                    this.keepBallInBounds(ball1);
                    this.keepBallInBounds(ball2);
                }
            }
        }
    }

    resetGame() {
        this.isGameOver = true;
        this.sounds.background.stop();
        this.sounds.success.setVolume(1).setLoop(false).play();
    }

    updateScore(points) {
        this.score += points;
        this.updateScoreText();
    }

    updateScoreText() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    gameOver() {
        initiateGameOver.bind(this)({
            "score": this.score
        });
    }

    pauseGame() {
        handlePauseGame.bind(this)();
    }
}

const config = {
    type: Phaser.AUTO,
    width: _CONFIG.deviceOrientationSizes[_CONFIG.deviceOrientation].width,
    height: _CONFIG.deviceOrientationSizes[_CONFIG.deviceOrientation].height,
    scene: [BootScene, TitleScene, MenuScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: true,
        },
    },
    dataObject: {
        name: _CONFIG.title,
        description: _CONFIG.description,
        instructions: _CONFIG.instructions,
    },
    orientation: _CONFIG.deviceOrientation === "landscape"
};
/*
------------------- GLOBAL CODE STARTS HERE -------------------
*/

// Title Scene
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: "TitleScene" });
    }

    preload() {
        // Preload assets needed for this scene
        for (const key in _CONFIG.imageLoader) {
            this.load.image(key, _CONFIG.imageLoader[key]);
        }
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
            this.tweens.add({ targets: playButton, scale: 1.1, duration: 200 });
        });
        playButton.on("pointerout", () => {
            this.input.setDefaultCursor("default");
            this.tweens.add({ targets: playButton, scale: 1, duration: 200 });
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

// Menu Scene
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
        this.playerConfigs = [
            { color: "red", type: "HUMAN", profileIndex: 1 },
            { color: "blue", type: "AI", profileIndex: 2 },
            { color: "green", type: "AI", profileIndex: 3 },
            { color: "yellow", type: "AI", profileIndex: 4 },
        ];
        this.numPlayers = 4;
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

        this.add
            .text(this.game.config.width / 2, 110, "Number of Players:", {
                fontFamily: "Arial",
                fontSize: "32px",
                fill: "#ffffff",
            })
            .setOrigin(0.5);

        const playerCounts = [2, 3, 4];
        this.countButtons = [];
        const buttonSpacing = 120;
        const totalWidth = (playerCounts.length - 1) * buttonSpacing;
        const startX = this.game.config.width / 2 - totalWidth / 2;

        playerCounts.forEach((count, index) => {
            const btn = this.add
                .text(startX + index * buttonSpacing, 180, `${count}`, {
                    fontFamily: "Arial",
                    fontSize: "40px",
                    fill: "#ffffff",
                    backgroundColor: "#333333",
                    padding: { x: 20, y: 10 },
                })
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });
            btn.on("pointerdown", () => {
                this.numPlayers = count;
                this.updateUI();
            });
            this.countButtons.push({ count: count, button: btn });
        });

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
            this.tweens.add({ targets: startButton, scale: 1.1, duration: 200 });
        });
        startButton.on("pointerout", () => {
            this.input.setDefaultCursor("default");
            this.tweens.add({ targets: startButton, scale: 1, duration: 200 });
        });
        startButton.on("pointerdown", () => {
            this.tweens.add({
                targets: startButton,
                scale: 0.9,
                duration: 100,
                yoyo: true,
            });
            this.time.delayedCall(200, () => {
                this.assignAIProfiles();
                const activePlayers = this.playerConfigs.slice(0, this.numPlayers);
                this.scene.start("GameScene", { players: activePlayers });
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

        // --- FIXED: Used a direct map to convert color names to hex codes ---
        const colorMap = {
            red: 0xff0000,
            blue: 0x0000ff,
            green: 0x00ff00,
            yellow: 0xffff00,
        };
        const cardColor = colorMap[config.color] || 0xffffff; // Default to white if color not found

        card
            .fillStyle(0x1a1a1a, 0.8)
            .fillRoundedRect(cardX, yPos, cardWidth, cardHeight, 16);
        card
            .lineStyle(3, cardColor, 1)
            .strokeRoundedRect(cardX, yPos, cardWidth, cardHeight, 16);

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

        const playerLabel = this.add
            .text(profileX - 35, profileY, `P${index + 1}`, {
                fontFamily: "Arial",
                fontSize: "32px",
                fill: "#FFF",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        const profileImage = this.add
            .image(profileX + 30, profileY, `profile_${config.profileIndex}`)
            .setDisplaySize(65, 65);

        const leftArrow = this.add
            .text(profileX + 95, profileY, "<", { fontSize: "40px", fill: "#fff" })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        const rightArrow = this.add
            .text(profileX + 145, profileY, ">", { fontSize: "40px", fill: "#fff" })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

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
        const humanIcon = this.add
            .image(typeSelectX, profileY, "human_icon")
            .setDisplaySize(55, 55)
            .setInteractive({ useHandCursor: true });
        const aiIcon = this.add
            .image(typeSelectX + 80, profileY, "bot_icon")
            .setDisplaySize(55, 55)
            .setInteractive({ useHandCursor: true });

        humanIcon.on("pointerdown", () => {
            config.type = "HUMAN";
            this.updateUI();
        });
        aiIcon.on("pointerdown", () => {
            config.type = "AI";
            this.updateUI();
        });

        this.playerUI[index] = {
            card,
            colorIndicator,
            playerLabel,
            profileImage,
            leftArrow,
            rightArrow,
            humanIcon,
            aiIcon,
            config,
        };
    }

    assignAIProfiles() {
        let availableProfiles = Array.from({ length: 6 }, (_, i) => i + 1);
        const humanPlayers = this.playerConfigs
            .slice(0, this.numPlayers)
            .filter((p) => p.type === "HUMAN");
        humanPlayers.forEach((p) => {
            const index = availableProfiles.indexOf(p.profileIndex);
            if (index > -1) availableProfiles.splice(index, 1);
        });

        Phaser.Utils.Array.Shuffle(availableProfiles);

        const aiPlayers = this.playerConfigs
            .slice(0, this.numPlayers)
            .filter((p) => p.type === "AI");
        aiPlayers.forEach((p) => {
            p.profileIndex = availableProfiles.pop() || 1; // Failsafe to 1
        });
    }

    updateUI() {
        this.countButtons.forEach((item) =>
            item.button.setBackgroundColor(
                item.count === this.numPlayers ? "#888888" : "#333333"
            )
        );
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
                ui.humanIcon.setAlpha(ui.config.type === "HUMAN" ? 1.0 : 0.4);
                ui.aiIcon.setAlpha(ui.config.type === "AI" ? 1.0 : 0.4);
            }
        });
    }
}

// Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        this.score = 0;
        this.isGameOver = false;
        this.TILE_SIZE = 648 / 15;
        this.BOARD_START_X = (1280 - 648) / 2;
        this.BOARD_START_Y = (720 - 648) / 2;
        this.gameState = null;
        this.players = [];
        this.boardPaths = {};
        this.homeYardPositions = {};
        this.safeZones = [0, 8, 13, 21, 26, 34, 39, 47];
        this.currentPlayerIndex = 0;
        this.diceValue = 0;
        this.consecutiveSixes = 0;
        this.totalTurns = 0;
        this.diceSprite = null;
        this.playerSprites = {};
        this.highlightedSprites = [];
        this.winners = [];
        this.hud = {};
        this.diceTurnIndicator = null;
    }

    init(data) {
        this.playerConfig = data.players;
    }

    preload() {
        for (const key in _CONFIG.imageLoader) {
            this.load.image(key, _CONFIG.imageLoader[key]);
        }
        for (const key in _CONFIG.soundsLoader) {
            this.load.audio(key, [_CONFIG.soundsLoader[key]]);
        }
        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }

    create() {
        this.vfx = new VFXLibrary(this);
        this.vfx.addCircleTexture("particle_white", 0xffffff);

        this.sounds = {};
        for (const key in _CONFIG.soundsLoader) {
            this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 });
        }
        if (this.sounds.background) {
            this.sounds.background.setVolume(0.3).setLoop(true).play();
        }

        this.add.image(
            this.game.config.width / 2,
            this.game.config.height / 2,
            "background"
        );
        this.initializeGameData();
        this.setupBoardAndPlayers();
        this.setupUI();
        this.setupInput();
        this.startGame();
    }

    update() {
        if (this.isGameOver) return;
    }

    initializeGameData() {
        this.players = this.playerConfig.map((config) => ({
            ...config,
            pieces: this.createPieces(4),
            hasFinished: false,
        }));

        const T = this.TILE_SIZE;
        const X = this.BOARD_START_X;
        const Y = this.BOARD_START_Y;

        const offsets = {
            red: { x: -20, y: 20 },
            blue: { x: 20, y: 20 },
            yellow: { x: 20, y: -20 },
            green: { x: -20, y: -20 },
        };

        this.homeYardPositions = {
            red: [
                { x: X + T * 2.5 + offsets.red.x, y: Y + T * 12.5 + offsets.red.y },
                { x: X + T * 2.5 + offsets.red.x, y: Y + T * 10.5 + offsets.red.y },
                { x: X + T * 4.5 + offsets.red.x, y: Y + T * 12.5 + offsets.red.y },
                { x: X + T * 4.5 + offsets.red.x, y: Y + T * 10.5 + offsets.red.y },
            ],
            green: [
                { x: X + T * 2.5 + offsets.green.x, y: Y + T * 2.5 + offsets.green.y },
                { x: X + T * 2.5 + offsets.green.x, y: Y + T * 4.5 + offsets.green.y },
                { x: X + T * 4.5 + offsets.green.x, y: Y + T * 2.5 + offsets.green.y },
                { x: X + T * 4.5 + offsets.green.x, y: Y + T * 4.5 + offsets.green.y },
            ],
            yellow: [
                {
                    x: X + T * 10.5 + offsets.yellow.x,
                    y: Y + T * 2.5 + offsets.yellow.y,
                },
                {
                    x: X + T * 10.5 + offsets.yellow.x,
                    y: Y + T * 4.5 + offsets.yellow.y,
                },
                {
                    x: X + T * 12.5 + offsets.yellow.x,
                    y: Y + T * 2.5 + offsets.yellow.y,
                },
                {
                    x: X + T * 12.5 + offsets.yellow.x,
                    y: Y + T * 4.5 + offsets.yellow.y,
                },
            ],
            blue: [
                { x: X + T * 10.5 + offsets.blue.x, y: Y + T * 12.5 + offsets.blue.y },
                { x: X + T * 12.5 + offsets.blue.x, y: Y + T * 10.5 + offsets.blue.y },
                { x: X + T * 10.5 + offsets.blue.x, y: Y + T * 10.5 + offsets.blue.y },
                { x: X + T * 12.5 + offsets.blue.x, y: Y + T * 12.5 + offsets.blue.y },
            ],
        };

        const mainPath = [
            { i: 6, j: 1 },
            { i: 6, j: 2 },
            { i: 6, j: 3 },
            { i: 6, j: 4 },
            { i: 6, j: 5 },
            { i: 5, j: 6 },
            { i: 4, j: 6 },
            { i: 3, j: 6 },
            { i: 2, j: 6 },
            { i: 1, j: 6 },
            { i: 0, j: 6 },
            { i: 0, j: 7 },
            { i: 0, j: 8 },
            { i: 1, j: 8 },
            { i: 2, j: 8 },
            { i: 3, j: 8 },
            { i: 4, j: 8 },
            { i: 5, j: 8 },
            { i: 6, j: 9 },
            { i: 6, j: 10 },
            { i: 6, j: 11 },
            { i: 6, j: 12 },
            { i: 6, j: 13 },
            { i: 6, j: 14 },
            { i: 7, j: 14 },
            { i: 8, j: 14 },
            { i: 8, j: 13 },
            { i: 8, j: 12 },
            { i: 8, j: 11 },
            { i: 8, j: 10 },
            { i: 8, j: 9 },
            { i: 9, j: 8 },
            { i: 10, j: 8 },
            { i: 11, j: 8 },
            { i: 12, j: 8 },
            { i: 13, j: 8 },
            { i: 14, j: 8 },
            { i: 14, j: 7 },
            { i: 14, j: 6 },
            { i: 13, j: 6 },
            { i: 12, j: 6 },
            { i: 11, j: 6 },
            { i: 10, j: 6 },
            { i: 9, j: 6 },
            { i: 8, j: 5 },
            { i: 8, j: 4 },
            { i: 8, j: 3 },
            { i: 8, j: 2 },
            { i: 8, j: 1 },
            { i: 8, j: 0 },
            { i: 7, j: 0 },
            { i: 6, j: 0 },
        ].map((p) => ({ x: X + p.j * T + T / 2, y: Y + p.i * T + T / 2 }));
        const homePaths = {
            green: [
                { i: 7, j: 1 },
                { i: 7, j: 2 },
                { i: 7, j: 3 },
                { i: 7, j: 4 },
                { i: 7, j: 5 },
                { i: 7, j: 6 },
            ].map((p) => ({ x: X + p.j * T + T / 2, y: Y + p.i * T + T / 2 })),
            yellow: [
                { i: 1, j: 7 },
                { i: 2, j: 7 },
                { i: 3, j: 7 },
                { i: 4, j: 7 },
                { i: 5, j: 7 },
                { i: 6, j: 7 },
            ].map((p) => ({ x: X + p.j * T + T / 2, y: Y + p.i * T + T / 2 })),
            blue: [
                { i: 7, j: 13 },
                { i: 7, j: 12 },
                { i: 7, j: 11 },
                { i: 7, j: 10 },
                { i: 7, j: 9 },
                { i: 7, j: 8 },
            ].map((p) => ({ x: X + p.j * T + T / 2, y: Y + p.i * T + T / 2 })),
            red: [
                { i: 13, j: 7 },
                { i: 12, j: 7 },
                { i: 11, j: 7 },
                { i: 10, j: 7 },
                { i: 9, j: 7 },
                { i: 8, j: 7 },
            ].map((p) => ({ x: X + p.j * T + T / 2, y: Y + p.i * T + T / 2 })),
        };
        const startOffsets = { green: 0, yellow: 13, blue: 26, red: 39 };
        for (const color of ["red", "green", "yellow", "blue"]) {
            if (this.players.some((p) => p.color === color)) {
                const offset = startOffsets[color];
                const rotatedPath = [
                    ...mainPath.slice(offset),
                    ...mainPath.slice(0, offset),
                ];
                this.boardPaths[color] = [
                    ...rotatedPath.slice(0, 51),
                    ...homePaths[color],
                ];
            }
        }
    }

    createPieces(count) {
        let pieces = [];
        for (let i = 0; i < count; i++) {
            pieces.push({ id: i, position: -1, state: "home" });
        }
        return pieces;
    }

    setupBoardAndPlayers() {
        this.players.forEach((player) => {
            this.playerSprites[player.color] = [];
            player.pieces.forEach((pieceData, index) => {
                const homePos = this.homeYardPositions[player.color][index];
                const pieceSprite = this.add
                    .sprite(homePos.x, homePos.y, `piece_${player.color}`)
                    .setDisplaySize(50, 50)
                    .setInteractive();
                pieceSprite.setData({
                    pieceData: pieceData,
                    color: player.color,
                    isClickable: false,
                });
                this.playerSprites[player.color].push(pieceSprite);
            });
        });
    }

    setupUI() {
        this.add.graphics().fillStyle(0x000000, 0.5).fillCircle(1120, 360, 100);
        this.diceSprite = this.add
            .sprite(1120, 360, "dice_1")
            .setDisplaySize(80, 80)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", this.handleDiceClick, this);

        // --- NEW: Dice Turn Indicator ---
        this.diceTurnIndicator = this.add.graphics({ x: 1110, y: 360 - 80 });

        this.players.forEach((player) => this.createHUD(player));
        this.updateHUD();
    }

    createHUD(player) {
        const positions = {
            red: { x: 150, y: this.game.config.height - 100 },
            blue: {
                x: this.game.config.width - 150,
                y: this.game.config.height - 100,
            },
            green: { x: 150, y: 100 },
            yellow: { x: this.game.config.width - 150, y: 100 },
        };
        const pos = positions[player.color];

        const hudContainer = this.add.container(pos.x, pos.y);
        const panel = this.add
            .graphics()
            .fillStyle(0x000000, 0.6)
            .fillRoundedRect(-125, -75, 250, 170, 16);
        const playerIcon = this.add
            .image(-75, -25, `profile_${player.profileIndex}`)
            .setDisplaySize(80, 80);
        const typeIcon = this.add
            .image(90, -40, player.type === "HUMAN" ? "human_icon" : "bot_icon")
            .setDisplaySize(50, 50);

        const playerNameText = this.add
            .text(-30, 5, player.color.toUpperCase(), {
                fontFamily: "Arial",
                fontSize: "28px",
                fill: player.color,
                fontStyle: "bold",
                stroke: "#000",
                strokeThickness: 2,
            })
            .setOrigin(0, 0.5);

        const turnIndicatorText = this.add
            .text(0, 80, "YOUR TURN!", {
                fontFamily: "Arial",
                fontSize: "24px",
                fill: "#FFFF00",
                fontStyle: "bold",
                stroke: "#000",
                strokeThickness: 3,
            })
            .setOrigin(0.5)
            .setVisible(false);

        const pawnStatusIcons = [];
        for (let i = 0; i < 4; i++) {
            pawnStatusIcons.push(
                this.add
                    .image(-80 + i * 55, 45, `piece_${player.color}`)
                    .setDisplaySize(50, 50)
            );
        }

        hudContainer.add([
            panel,
            playerIcon,
            typeIcon,
            playerNameText,
            turnIndicatorText,
            ...pawnStatusIcons,
        ]);
        this.hud[player.color] = {
            container: hudContainer,
            pawnStatusIcons,
            turnIndicatorText,
        };

        this.tweens.add({
            targets: hudContainer,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            paused: true,
        });
    }

    updateHUD() {
        // --- NEW: Update Dice Turn Indicator ---
        if (this.diceTurnIndicator) {
            const currentPlayer = this.players[this.currentPlayerIndex];
            const indicatorColor = Phaser.Display.Color.HexStringToColor(
                currentPlayer.color
            ).color;
            this.diceTurnIndicator.clear();
            this.diceTurnIndicator.fillStyle(indicatorColor, 1);
            // A downward pointing triangle
            this.diceTurnIndicator.fillTriangle(0, 0, 20, 0, 10, 15);
            this.diceTurnIndicator.setVisible(!currentPlayer.hasFinished);
        }

        this.players.forEach((player) => {
            if (this.hud[player.color]) {
                const hudPlayer = this.hud[player.color];
                const isActive =
                    this.players[this.currentPlayerIndex].color === player.color &&
                    !player.hasFinished;

                // --- FIXED: Show/Hide "YOUR TURN!" text for HUMAN players only ---
                hudPlayer.turnIndicatorText.setVisible(
                    isActive && player.type === "HUMAN"
                );

                const tween = this.tweens.getTweensOf(hudPlayer.container)[0];
                if (isActive && tween && tween.isPaused()) {
                    hudPlayer.container.setScale(1);
                    tween.resume();
                } else if (!isActive && tween && !tween.isPaused()) {
                    tween.pause();
                    hudPlayer.container.setScale(1);
                }

                player.pieces.forEach((piece, index) => {
                    const icon = hudPlayer.pawnStatusIcons[index];
                    if (piece.state === "home") icon.setAlpha(1.0).setTint(0x888888);
                    else if (piece.state === "active") icon.setAlpha(1.0).clearTint();
                    else if (piece.state === "finished") icon.setAlpha(0.3).clearTint();
                });
            }
        });
    }

    setupInput() {
        this.input.keyboard.disableGlobalCapture();
        this.input.keyboard.on("keydown-SPACE", this.handleDiceClick, this);
        this.input.on("gameobjectdown", (pointer, gameObject) => {
            if (gameObject.getData("pieceData")) this.handlePieceClick(gameObject);
        });
    }

    startGame() {
        this.currentPlayerIndex = 0;
        this.gameState = "AWAITING_ROLL";
        this.updateHUD();
        if (this.players[this.currentPlayerIndex].type === "AI") {
            this.time.delayedCall(1000, () => this.runAITurn());
        }
    }

    handleDiceClick() {
        if (
            this.gameState !== "AWAITING_ROLL" ||
            this.players[this.currentPlayerIndex].hasFinished
        )
            return;
        this.sounds.roll_dice?.play();
        this.rollDice();
    }

    rollDice() {
        this.gameState = "DICE_ROLLING";
        let rollCount = 0;
        const rollAnimation = this.time.addEvent({
            delay: 100,
            callback: () => {
                const randomDiceFace = Phaser.Math.Between(1, 6);
                this.diceSprite.setTexture(`dice_${randomDiceFace}`);
                rollCount++;
                if (rollCount >= 10) {
                    rollAnimation.destroy();
                    this.finishDiceRoll();
                }
            },
            loop: true,
        });
    }

    finishDiceRoll() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const hasPawnsAtHome = currentPlayer.pieces.some((p) => p.state === "home");

        if (this.totalTurns < this.players.length * 2 && hasPawnsAtHome) {
            this.diceValue = Math.max(
                Phaser.Math.Between(1, 6),
                Phaser.Math.Between(1, 6)
            );
        } else {
            this.diceValue = Phaser.Math.Between(1, 6);
        }

        this.diceSprite.setTexture(`dice_${this.diceValue}`);
        if (this.diceValue === 6) this.consecutiveSixes++;
        else this.consecutiveSixes = 0;
        if (this.consecutiveSixes === 3) {
            this.time.delayedCall(1000, () => this.nextTurn());
            return;
        }

        const validMoves = this.getValidMoves(currentPlayer, this.diceValue);

        if (validMoves.length === 0) {
            this.time.delayedCall(1000, () => this.nextTurn());
        } else {
            this.gameState = "AWAITING_PIECE_SELECTION";
            if (currentPlayer.type === "HUMAN") {
                this.highlightPieces(validMoves);
            } else {
                this.time.delayedCall(1000, () => this.runAITurn(validMoves));
            }
        }
    }

    handlePieceClick(pieceSprite) {
        if (
            this.gameState !== "AWAITING_PIECE_SELECTION" ||
            this.players[this.currentPlayerIndex].type !== "HUMAN"
        )
            return;
        if (pieceSprite.getData("isClickable") === true) {
            this.clearHighlights();
            this.movePiece(pieceSprite);
        }
    }

    movePiece(pieceSprite) {
        this.gameState = "PIECE_MOVING";
        const pieceData = pieceSprite.getData("pieceData");
        const color = pieceSprite.getData("color");
        const path = this.boardPaths[color];
        const previousPosIndex = pieceData.position;

        let targetPosIndex;
        if (pieceData.state === "home") {
            targetPosIndex = 0;
            pieceData.state = "active";
        } else {
            targetPosIndex = pieceData.position + this.diceValue;
        }

        const startPosIndex =
            pieceData.position === -1 ? 0 : pieceData.position + 1;
        let currentStep = startPosIndex;

        const moveNextStep = () => {
            if (currentStep > targetPosIndex) {
                pieceData.position = targetPosIndex;
                if (targetPosIndex >= this.boardPaths[color].length - 1) {
                    pieceData.state = "finished";
                    this.sounds.finished.play();
                }

                if (previousPosIndex !== -1)
                    this.adjustStacking(previousPosIndex, color);
                this.adjustStacking(targetPosIndex, color);

                const captureHappened = this.checkForCapture(pieceSprite);

                if (this.checkForWin()) {
                    this.handleWin();
                } else {
                    // --- FIXED: If player rolled a 6 OR made a capture, they get another turn. ---
                    if (this.diceValue === 6 || captureHappened) {
                        this.gameState = "AWAITING_ROLL";
                        if (this.players[this.currentPlayerIndex].type === "AI") {
                            this.time.delayedCall(1000, () => this.runAITurn());
                        }
                    } else {
                        this.nextTurn();
                    }
                }
                return;
            }
            this.tweens.add({
                targets: pieceSprite,
                x: path[currentStep].x,
                y: path[currentStep].y,
                duration: 200,
                onStart: () => {
                    this.sounds.pawn_move?.play();
                },
                onComplete: () => {
                    currentStep++;
                    moveNextStep();
                },
            });
        };
        moveNextStep();
    }

    nextTurn() {
        this.consecutiveSixes = 0;
        this.clearHighlights();
        this.totalTurns++;
        let nextPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        while (this.players[nextPlayerIndex].hasFinished)
            nextPlayerIndex = (nextPlayerIndex + 1) % this.players.length;
        this.currentPlayerIndex = nextPlayerIndex;
        this.gameState = "AWAITING_ROLL";
        this.updateHUD();

        const activePlayers = this.players.filter((p) => !p.hasFinished).length;
        if (activePlayers <= 1) {
            this.endGame();
            return;
        }

        if (this.players[this.currentPlayerIndex].type === "AI")
            this.time.delayedCall(1000, () => this.runAITurn());
    }

    runAITurn(validMoves = null) {
        if (this.gameState === "AWAITING_ROLL") this.rollDice();
        else if (this.gameState === "AWAITING_PIECE_SELECTION" && validMoves) {
            let bestMove = null;
            let priority = -1;
            for (const move of validMoves) {
                const targetPosIndex =
                    move.state === "home" ? 0 : move.position + this.diceValue;
                const color = this.players[this.currentPlayerIndex].color;
                const targetCoords = this.boardPaths[color][targetPosIndex];
                if (
                    !this.isSafeZone(targetPosIndex) &&
                    this.getOpponentAt(targetCoords, color)
                ) {
                    bestMove = move;
                    priority = 4;
                    break;
                }
                if (targetPosIndex > 51 && priority < 3) {
                    bestMove = move;
                    priority = 3;
                } else if (move.state === "home" && priority < 2) {
                    bestMove = move;
                    priority = 2;
                } else if (priority < 1) {
                    if (!bestMove || move.position > bestMove.position) {
                        bestMove = move;
                        priority = 1;
                    }
                }
            }
            if (!bestMove) bestMove = validMoves[0];
            const pieceSpriteToMove = this.playerSprites[
                this.players[this.currentPlayerIndex].color
            ].find((s) => s.getData("pieceData").id === bestMove.id);
            this.movePiece(pieceSpriteToMove);
        }
    }

    getValidMoves(player, diceValue) {
        const validMoves = [];
        player.pieces.forEach((piece) => {
            if (piece.state === "finished") return;
            if (piece.state === "home") {
                if (diceValue === 6) validMoves.push(piece);
            } else if (piece.state === "active") {
                if (piece.position + diceValue < this.boardPaths[player.color].length) {
                    validMoves.push(piece);
                }
            }
        });
        return validMoves;
    }

    checkForCapture(movedPieceSprite) {
        const movedPieceData = movedPieceSprite.getData("pieceData");
        if (this.isSafeZone(movedPieceData.position)) return false;

        const movedColor = movedPieceSprite.getData("color");
        let captureMade = false;

        this.players.forEach((player) => {
            if (player.color === movedColor || player.hasFinished) return;

            this.playerSprites[player.color].forEach((opponentSprite) => {
                const opponentData = opponentSprite.getData("pieceData");
                if (
                    !captureMade &&
                    opponentData.state === "active" &&
                    Math.abs(opponentSprite.x - movedPieceSprite.x) < 5 &&
                    Math.abs(opponentSprite.y - movedPieceSprite.y) < 5
                ) {
                    this.sendPieceHome(opponentSprite);
                    captureMade = true;
                }
            });
        });
        return captureMade;
    }

    sendPieceHome(pieceSprite) {
        const emitterManager = this.vfx.createEmitter(
            "particle_white",
            pieceSprite.x,
            pieceSprite.y,
            0.8,
            0,
            500
        );
        if (emitterManager) {
            emitterManager.explode(20);
            this.time.delayedCall(2000, () => {
                emitterManager.destroy();
            });
        }

        this.tweens.killTweensOf(pieceSprite);
        const pieceData = pieceSprite.getData("pieceData");
        const color = pieceSprite.getData("color");
        const path = this.boardPaths[color];
        const capturePositionIndex = pieceData.position;

        pieceData.state = "home";
        pieceData.position = -1;
        this.adjustStacking(capturePositionIndex, color);

        const homePos = this.homeYardPositions[color][pieceData.id];
        let currentStep = capturePositionIndex;
        const backtrack = () => {
            if (currentStep < 0) {
                this.tweens.add({
                    targets: pieceSprite,
                    x: homePos.x,
                    y: homePos.y,
                    duration: 300,
                    ease: "Power2",
                });
                return;
            }

            this.tweens.add({
                targets: pieceSprite,
                x: path[currentStep].x,
                y: path[currentStep].y,
                duration: 50,
                onComplete: () => {
                    currentStep--;
                    backtrack();
                },
            });
        };

        this.sounds.eliminated?.play();
        this.updateScore(1);
        backtrack();
    }

    adjustStacking(positionIndex, colorForPathContext) {
        if (
            positionIndex < 0 ||
            !this.boardPaths[colorForPathContext] ||
            !this.boardPaths[colorForPathContext][positionIndex]
        ) {
            return;
        }
        const coords = this.boardPaths[colorForPathContext][positionIndex];
        if (!coords) return;
        const onTile = [];

        const allSprites = [].concat(...Object.values(this.playerSprites));
        allSprites.forEach((sprite) => {
            const pieceData = sprite.getData("pieceData");
            const color = sprite.getData("color");
            if (pieceData.state === "active") {
                const spriteCoords = this.boardPaths[color][pieceData.position];
                if (
                    spriteCoords &&
                    Math.abs(spriteCoords.x - coords.x) < 1 &&
                    Math.abs(spriteCoords.y - coords.y) < 1
                ) {
                    onTile.push(sprite);
                }
            }
        });

        if (onTile.length > 1) {
            const size = 25;
            const offsets = [
                { x: -size / 2, y: -size / 2 },
                { x: size / 2, y: -size / 2 },
                { x: -size / 2, y: size / 2 },
                { x: size / 2, y: size / 2 },
            ];
            onTile.forEach((sprite, index) => {
                if (index < 4) {
                    this.tweens.add({
                        targets: sprite,
                        displayWidth: size,
                        displayHeight: size,
                        x: coords.x + offsets[index].x,
                        y: coords.y + offsets[index].y,
                        duration: 200,
                    });
                }
            });
        } else if (onTile.length === 1) {
            this.tweens.add({
                targets: onTile[0],
                displayWidth: 50,
                displayHeight: 50,
                x: coords.x,
                y: coords.y,
                duration: 200,
            });
        }
    }

    checkForWin() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        return (
            !currentPlayer.hasFinished &&
            currentPlayer.pieces.every((p) => p.state === "finished")
        );
    }

    handleWin() {
        const player = this.players[this.currentPlayerIndex];
        player.hasFinished = true;
        this.winners.push(player.color);

        const rank = this.winners.length;
        const rankText = ["1st Place!", "2nd Place!", "3rd Place!"];

        const bannerContainer = this.add.container(
            this.game.config.width / 2,
            -100
        );
        const bannerBG = this.add
            .graphics()
            .fillStyle(0x000000, 0.7)
            .fillRoundedRect(-250, -100, 500, 200, 32);
        const bannerText = this.add
            .text(0, 0, `${player.color.toUpperCase()} is\n${rankText[rank - 1]}`, {
                fontFamily: "Arial",
                fontSize: "50px",
                fill: "#ffff00",
                align: "center",
            })
            .setOrigin(0.5);
        bannerContainer.add([bannerBG, bannerText]);

        this.tweens.add({
            targets: bannerContainer,
            y: this.game.config.height / 2,
            duration: 800,
            ease: "Bounce.easeOut",
            onComplete: () => {
                this.time.delayedCall(1500, () => {
                    this.tweens.add({
                        targets: bannerContainer,
                        y: this.game.config.height + 100,
                        duration: 500,
                        onComplete: () => bannerContainer.destroy(),
                    });
                });
            },
        });

        this.playerSprites[player.color].forEach((sprite) => sprite.setAlpha(0.5));

        const activePlayers = this.players.filter((p) => !p.hasFinished).length;
        if (activePlayers <= 1) {
            this.endGame();
        } else {
            this.nextTurn();
        }
    }

    endGame() {
        this.isGameOver = true;
        let winnerText = "Game Over!\n\n";
        this.winners.forEach((color, index) => {
            winnerText += `${index + 1}. ${color.toUpperCase()}\n`;
        });
        const lastPlayer = this.players.find((p) => !p.hasFinished);
        if (lastPlayer) {
            winnerText += `${this.winners.length + 1
                }. ${lastPlayer.color.toUpperCase()}\n`;
        }

        this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2,
                500,
                400,
                0x000000,
                0.7
            )
            .setStrokeStyle(4, 0xffffff);
        this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2,
                winnerText,
                {
                    fontFamily: "Arial",
                    fontSize: "40px",
                    fill: "#ffffff",
                    align: "center",
                }
            )
            .setOrigin(0.5);

        this.time.delayedCall(5000, () => this.gameOver());
    }

    isSafeZone(positionIndex) {
        if (positionIndex >= 51) return true;
        return this.safeZones.includes(positionIndex);
    }

    getOpponentAt(coords, ownColor) {
        for (const player of this.players) {
            if (player.color === ownColor) continue;
            for (const sprite of this.playerSprites[player.color]) {
                const data = sprite.getData("pieceData");
                if (
                    data.state === "active" &&
                    Math.abs(sprite.x - coords.x) < 5 &&
                    Math.abs(sprite.y - coords.y) < 5
                ) {
                    return sprite;
                }
            }
        }
        return null;
    }

    highlightPieces(pieces) {
        this.clearHighlights();
        const spritesToHighlight = this.playerSprites[
            this.players[this.currentPlayerIndex].color
        ].filter((sprite) => {
            const pieceData = sprite.getData("pieceData");
            return pieces.some((p) => p.id === pieceData.id);
        });

        this.highlightedSprites = spritesToHighlight;

        spritesToHighlight.forEach((s) => {
            s.setData("isClickable", true);
            s.setData("originalWidth", s.displayWidth);
            s.setData("originalHeight", s.displayHeight);

            this.tweens.add({
                targets: s,
                displayWidth: s.displayWidth * 1.3,
                displayHeight: s.displayHeight * 1.3,
                duration: 300,
                yoyo: true,
                repeat: -1,
            });
        });
    }

    clearHighlights() {
        if (this.highlightedSprites.length > 0) {
            this.tweens.killTweensOf(this.highlightedSprites);
            this.highlightedSprites.forEach((s) => {
                const originalWidth = s.getData("originalWidth");
                const originalHeight = s.getData("originalHeight");

                if (originalWidth && originalHeight) {
                    s.setDisplaySize(originalWidth, originalHeight);
                } else {
                    s.setDisplaySize(50, 50);
                }

                s.setData("isClickable", false);
            });
        }

        this.highlightedSprites = [];
    }

    updateScore(points) {
        this.score += points;
    }

    gameOver() {
        initiateGameOver.bind(this)({ score: this.score });
    }

    pauseGame() {
        handlePauseGame.bind(this)();
    }
}

function displayProgressLoader() {
    let width = 320;
    let height = 50;
    let x = this.game.config.width / 2 - 160;
    let y = this.game.config.height / 2 - 50;
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(x, y, width, height);

    const loadingText = this.make
        .text({
            x: this.game.config.width / 2,
            y: this.game.config.height / 2 + 20,
            text: "Loading...",
            style: { font: "20px monospace", fill: "#ffffff" },
        })
        .setOrigin(0.5, 0.5);
    loadingText.setOrigin(0.5, 0.5);

    const progressBar = this.add.graphics();
    this.load.on("progress", (value) => {
        progressBar.clear();
        progressBar.fillStyle(0x364afe, 1);
        progressBar.fillRect(x, y, width * value, height);
    });
    this.load.on("fileprogress", function (file) { });
    this.load.on("complete", function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
    });
}

const config = {
    type: Phaser.AUTO,
    width: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].width,
    height: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].height,
    scene: [TitleScene, MenuScene, GameScene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    pixelArt: true,
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
    dataObject: {
        name: _CONFIG.title,
        description: _CONFIG.description,
        instructions: _CONFIG.instructions,
    },
    orientation: _CONFIG.deviceOrientation === "portrait",
};

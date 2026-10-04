class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    preload() {
        // --- NEW: Load 'Inter' Font via JavaScript ---
        // This creates a <link> tag and adds it to the document's head to load the font.
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap';
        document.head.appendChild(link);
        // --- END NEW ---
        this.load.audio('star_chime', _CONFIG.soundsLoader.star_chime);
        this.load.audio('sfx_hover', _CONFIG.soundsLoader.sfx_hover);
this.load.audio('sfx_click', _CONFIG.soundsLoader.sfx_click);
this.load.audio('sfx_swoosh', _CONFIG.soundsLoader.sfx_swoosh);
this.load.audio('sfx_miss', _CONFIG.soundsLoader.sfx_miss);
this.load.audio('sfx_combo', _CONFIG.soundsLoader.sfx_combo);
this.load.audio('sfx_transition', _CONFIG.soundsLoader.sfx_transition);
this.load.audio('sfx_victory', _CONFIG.soundsLoader.sfx_victory);
this.load.audio('sfx_gameover', _CONFIG.soundsLoader.sfx_gameover);

        // Load all common assets used across multiple scenes here
        this.load.image('background', _CONFIG.libLoader.background);
        this.load.image('buttonbg', _CONFIG.libLoader.buttonbg);
        this.load.audio('title_music', _CONFIG.soundsLoader.title_music);
    }

    create() {
        // Once loading is complete, start the TitleScene
        this.scene.start('TitleScene');
    }
}

class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

// In TitleScene
create() {
    const W = this.sys.game.config.width;
    const H = this.sys.game.config.height;
    this.width = W;

    this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(W, H);
    this.sound.play('title_music', { loop: true, volume: 0.4 });

    const cutsceneContainer = this.add.container(0, 0).setDepth(900);
    const bg = this.add.rectangle(W / 2, H / 2, W, H, 0x000000).setAlpha(0);
    const title = this.add.text(W / 2, H / 2, 'Piano Tiles', this.txtStyle(128)).setOrigin(0.5).setAlpha(0);

    // --- NEW: Underline Trail Emitter ---
    const trailEmitter = this.add.particles(0, 0, 'buttonbg', {
        speed: 20,
        scale: { start: 0.04, end: 0 },
        blendMode: 'ADD',
        lifespan: 300,
        emitting: false
    }).setDepth(901);

    const underline = this.add.graphics().fillStyle(0x00ff00, 1)
        .fillRect(W / 2 - 250, H / 2 + 80, 500, 8)
        .setAlpha(0).setScale(0, 1);

    cutsceneContainer.add([bg, title, underline]);
    this.tweens.add({ targets: bg, alpha: 0.8, duration: 500 });

    this.tweens.add({
        targets: title,
        alpha: 1,
        y: H / 2 - 20,
        duration: 900,
        ease: 'Power2.easeOut',
        delay: 500,
        onComplete: () => {
            // --- NEW: Title Impact Effect ---
            this.cameras.main.shake(200, 0.015);
            // Create a particle shockwave
            this.add.particles(0, 0, 'buttonbg', {
                frame: '__DEFAULT',
                x: W / 2,
                y: (H / 2 - 20) + (title.height / 2),
                speed: { min: 400, max: 600 },
                lifespan: 600,
                scale: { start: 0.05, end: 0 },
                gravityY: 0,
                blendMode: 'ADD',
                emitting: true, // Fire once and disappear
                duration: 200,
                quantity: 40
            }).setDepth(899);
        }
    });

    this.tweens.add({
        targets: underline,
        alpha: 1,
        scaleX: 1,
        duration: 700,
        ease: 'Cubic.easeOut',
        delay: 1200,
        onUpdate: (tween) => {
            // --- NEW: Update trail emitter position ---
            const startX = W / 2 - 250;
            const width = 500;
            const tipX = startX + (width * tween.progress);
            trailEmitter.setPosition(tipX, H / 2 + 80);
            if (tween.progress > 0 && tween.progress < 1) {
                trailEmitter.emitParticle(2);
            }
        }
    });

    this.time.delayedCall(3500, () => {
        this.tweens.add({
            targets: cutsceneContainer.getAll(), alpha: 0, duration: 500, ease: 'Sine.InOut',
            onComplete: () => {
                this.sound.stopAll();
                cutsceneContainer.destroy();
                // Use our new transition function
                transitionToScene(this, 'MenuScene');
            }
        });
    });
}

    txtStyle(size = 24, align = 'center', color = '#ffffff') {
        const sf = this.scaleFactor || 1;
        return {
            fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: `${Math.round(size * sf)}px`,
            color,
            align,
            fontStyle: '900',
            wordWrap: { width: (this.width || 1280) - 40, useAdvancedWrap: true },
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true }
        };
    }
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
        this._fileInput = null;
    }

    create() {
        const W = this.sys.game.config.width;
        const H = this.sys.game.config.height;
        this.width = W; // for txtStyle function

        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(W, H).setDepth(-1);
        this.cameras.main.fadeIn(400, 0, 0, 0);
        
        this.add.text(W / 2, 80, 'Piano Tiles', this.txtStyle(96)).setOrigin(0.5);

        this.isSongsMenuOpen = false;
        const songButtonsContainer = this.add.container(W / 2, 320).setAlpha(0);
        const owned = new Set(this._getOwned());
        const defaultSongs = Object.keys(_CONFIG.soundsLoader || {});
        const buttonOffset = 100;

        let songIndex = 0;
        defaultSongs.forEach((songKey) => {
            if (!songKey.includes('song')) return;
            const isFree = songIndex === 0;
            const isOwned = isFree || owned.has(songKey);
            const label = isOwned ? `Play ${songKey.replace('g', 'g ')}` : `Buy ${songKey.replace('g', 'g ')}`;
            const yPos = songIndex * buttonOffset;

            const songButton = createAnimatedButton(this, 0, yPos, label, () => {
                if (!isOwned) transitionToScene(this, "BuyScene");
                else this._transitionToGame({ songKey });
            });
            songButtonsContainer.add(songButton);
            songIndex++;
        });

const songsDropdownButton = createAnimatedButton(this, W / 2, 200, 'Select Song', () => {
    this.isSongsMenuOpen = !this.isSongsMenuOpen;
    this.sound.play('sfx_swoosh'); // ADD THIS LINE
    const targetY = this.isSongsMenuOpen ? 320 : 280;
            const targetAlpha = this.isSongsMenuOpen ? 1 : 0;
            this.tweens.add({ targets: songButtonsContainer, alpha: targetAlpha, y: targetY, duration: 300, ease: 'Power2' });
        }, 1.0);

        createAnimatedButton(this, W / 2 - 250, H - 120, "Upload Song", () => this._fileInput.click());
        createAnimatedButton(this, W / 2 + 250, H - 120, "Shop", () => transitionToScene(this, "BuyScene"));

        this._fileInput = document.createElement("input");
        this._fileInput.type = "file";
        this._fileInput.accept = "audio/*";
        this._fileInput.style.display = "none";
        document.body.appendChild(this._fileInput);
        this._fileInput.addEventListener("change", (e) => {
            const file = e.target.files?.[0];
            if (file) {
                const url = URL.createObjectURL(file);
                this._transitionToGame({ songUrl: url });
            }
        });
    }

    _getOwned() {
        try { return JSON.parse(localStorage.getItem("ownedSongs") || "[]"); }
        catch { return []; }
    }

_transitionToGame(data = {}) {
    transitionToScene(this, 'DifficultyScene', data);
}

    shutdown() {
        if (this._fileInput) {
            this._fileInput.remove();
            this._fileInput = null;
        }
        super.shutdown?.();
    }

    txtStyle(size = 24, align = 'center', color = '#ffffff') {
        const sf = this.scaleFactor || 1;
        return {
            fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: `${Math.round(size * sf)}px`,
            color,
            align,
            fontStyle: '900',
            wordWrap: { width: (this.width || 1280) - 40, useAdvancedWrap: true },
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true }
        };
    }
}

class DifficultyScene extends Phaser.Scene {
    constructor() {
        super({ key: "DifficultyScene" });
        this.songData = null;
    }

    init(data) {
        this.songData = data;
    }

    create() {
        const W = this.sys.game.config.width;
        const H = this.sys.game.config.height;
        this.width = W;

        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(0, 0, "background").setOrigin(0).setDisplaySize(W, H);
        this.add.text(W / 2, 150, "Choose Difficulty", this.txtStyle(64)).setOrigin(0.5);

    const difficulties = [
        { name: 'Easy',   stdMult: 1.5, playbackRate: 0.75, lives: 25 },
        { name: 'Normal', stdMult: 1.1, playbackRate: 1.0,  lives: 25 },
        { name: 'Hard',   stdMult: 0.8, playbackRate: 1.25, lives: 100 }
    ];

    let yPos = 320;
    const buttonOffset = 120;

    // MODIFY the button's onClick function to pass the new data
    difficulties.forEach(diff => {
        createAnimatedButton(this, W / 2, yPos, diff.name, () => {
            // This now correctly passes the difficulty multiplier AND the playback rate
            const gameData = {
                ...this.songData,
                stdMult: diff.stdMult,
                playbackRate: diff.playbackRate,
                lives: diff.lives // <-- Add this line
            };
            this._transitionToGame(gameData);
        });
        yPos += buttonOffset;
    });
}

_transitionToGame(data) {
    transitionToScene(this, 'GameScene', data);
}

    txtStyle(size = 24, align = 'center', color = '#ffffff') {
        const sf = this.scaleFactor || 1;
        return {
            fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: `${Math.round(size * sf)}px`,
            color,
            align,
            fontStyle: '900',
            wordWrap: { width: (this.width || 1280) - 40, useAdvancedWrap: true },
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true }
        };
    }
}

class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: "VictoryScene" });
    }

    init(data) {
        this.results = data;
    }

    preload() {
        // Star images are specific to this scene, so we can load them here.
this.load.image("star", _CONFIG.libLoader.star);
this.load.image("starEmpty", _CONFIG.libLoader.starEmpty);
    }

create() {
    const W = this.sys.game.config.width;
    const H = this.sys.game.config.height;
    this.width = W;

    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.add.image(0, 0, "background").setOrigin(0).setDisplaySize(W, H);

    const titleText = this.results.isVictory ? "Level Complete!" : "Game Over";
    this.add.text(W / 2, 150, titleText, this.txtStyle(72)).setOrigin(0.5);
    this.add.text(W / 2, 250, `Score: ${this.results.score}`, this.txtStyle(48)).setOrigin(0.5);

    // --- NEW: DISPLAY COINS EARNED ---
    this.add.text(W / 2, 310, `Coins Earned: ${this.results.coinsEarned}`, this.txtStyle(36)).setOrigin(0.5);

    let starsToShow = 0;
    if (this.results.isVictory) {
        starsToShow = Math.max(1, this.results.livesLeft || 1); 
    }
    const starEmitter = this.add.particles(0, 0, 'star', {
        // ... (rest of particle code is unchanged)
    });

    // --- ADJUST Y POSITION OF STARS ---
    const starY = 380; // Changed from 350
    const starX = W / 2 - 120;
    for (let i = 0; i < 3; i++) {
        const starKey = i < starsToShow ? "star" : "starEmpty";
        
        const star = this.add.image(starX + i * 120, starY, starKey).setScale(0); // Use starY

        this.tweens.add({
            targets: star,
            scale: 0.5,
            duration: 400,
            ease: 'Back.easeOut', 
            delay: 300 + (i * 300), 
            onComplete: () => {
                if (starKey === 'star') {
                    this.sound.play('star_chime', { volume: 0.6 });
                    starEmitter.explode(20, star.x, star.y);
                }
            }
        });
    }

    if (this.results.isVictory) {
        this.sound.play('sfx_victory');
    } else {
        this.sound.play('sfx_gameover');
    }

    // --- ADJUST Y POSITION OF BUTTONS ---
    createAnimatedButton(this, W / 2, 530, 'Restart', () => { // Changed from 500
        this._transitionToScene('GameScene', this.results.audioData);
    });

    createAnimatedButton(this, W / 2, 630, 'Main Menu', () => { // Changed from 620
        this._transitionToScene('MenuScene');
    });
}

_transitionToScene(sceneKey, data = {}) {
    transitionToScene(this, sceneKey, data);
}

    txtStyle(size = 24, align = 'center', color = '#ffffff') {
        const sf = this.scaleFactor || 1;
        return {
            fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: `${Math.round(size * sf)}px`,
            color,
            align,
            fontStyle: '900',
            wordWrap: { width: (this.width || 1280) - 40, useAdvancedWrap: true },
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true }
        };
    }
}

class BuyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BuyScene' });
    }

    create() {
      
        const { width, height } = this.sys.game.config;
        this.width = width;

        this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);
        this.add.text(width / 2, 80, 'Shop', this.txtStyle(48, 'center', '#ffd54f')).setOrigin(0.5);
        const coins = parseInt(localStorage.getItem('coins') || '0', 10);
        this.add.text(width / 2, 150, `Your Coins: ${coins}`, this.txtStyle(32)).setOrigin(0.5);
        this.add.image(0, 0, "background").setOrigin(0).setDisplaySize(width, height).setDepth(-1);

        const PRICES = { song2: 50, song3: 80 };
        const owned = JSON.parse(localStorage.getItem('ownedSongs') || '[]');
        let y = 250;
Object.keys(PRICES).forEach(songKey => {
        const price = PRICES[songKey];
        const isOwned = owned.includes(songKey);

        const label = isOwned ? `✔ ${songKey} (Owned)` : `🔒 ${songKey} - ${price} coins`;

        // Create the button using your standard function
        const songButton = createAnimatedButton(this, width / 2, y, label, () => {
            // The onClick function only runs if the button is interactive
            if (isOwned) return;

            const currentCoins = parseInt(localStorage.getItem('coins') || '0', 10);
            if (currentCoins >= price) {
                localStorage.setItem('coins', currentCoins - price);
                owned.push(songKey);
                localStorage.setItem('ownedSongs', JSON.stringify(owned));
                this.scene.restart(); // Refresh the shop to show the new status
            } else {
                alert('Not enough coins!');
            }
        });

        // If the song is owned, disable the button and make it look different
// If the song is owned, disable the button and make it look different
if (isOwned) {
    songButton.disableInteractive(); // Makes it unclickable
    // The text label is now the third item in the container (index 2)
    const textLabel = songButton.list[2]; // CORRECTED
    textLabel.setColor('#00ff00'); // Set text color to green for owned items
}

        y += 100; // Increase spacing slightly for the larger buttons
    });

createAnimatedButton(this, width / 2, height - 100, 'Back to Menu', () => {
    transitionToScene(this, 'MenuScene');
});
    }
    
    txtStyle(size = 24, align = 'center', color = '#ffffff') {
        const sf = this.scaleFactor || 1;
        return {
            fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: `${Math.round(size * sf)}px`,
            color,
            align,
            fontStyle: '900',
            wordWrap: { width: (this.width || 1280) - 40, useAdvancedWrap: true },
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true }
        };
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" })
        
    }

    init(data) {
        this.lives = data.lives ?? 10;
        this.missCounter = 0;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.isGameOver = false;
        this.playbackRate = data.playbackRate ?? 1.0; 
        this.gameSpeed = 200 * this.playbackRate; 
        this.lanes = 3;
        this.laneWidth = 0;
        this.hitZoneY = 0;
        this.tiles = [];
        this.activeTiles = [];
        this.holdTiles = [];
        this.tileSpawnTimer = 0;
        this.songStartTime = 0;
        this.currentSongIndex = 0;
        this.songDuration = 30000; // 30 seconds
        this._decodedBuffer = null;
        this.perfectRange = 50;
        this.greatRange = 100;
        this.goodRange = 150;
        this.scaleFactor = 1;
            if (data.songKey) {
        const songKeys = Object.keys(_CONFIG.soundsLoader);
        data.songIndex = songKeys.indexOf(data.songKey);
    }
        this.currentSongIndex = data.songIndex ?? null;
        this.uploadedSongUrl = data.songUrl ?? null;
        this.beatsData = []; // Will store beat timestamps
    this.nextBeatIndex = 0;
    this.stdMult = data.stdMult ?? 1.1; // Get difficulty multiplier
        this.laneLastSpawnTime = new Array(this.lanes).fill(0);
    this.minLaneSpawnGap = 250; // 250ms gap before a lane can be reused
    this.coinsEarned = 0;
    this.pauseTime = 0; 
    }

    preload() {
        addEventListenersPhaser.bind(this)();
        if (this.uploadedSongUrl) {
    this.load.audio('uploadedSong', this.uploadedSongUrl);
} else {
    for (const key in _CONFIG.soundsLoader) {
        if (key.includes('song')) {
            this.load.audio(key, _CONFIG.soundsLoader[key]);
        }
    }
}

        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");
        displayProgressLoader.call(this);
    }

    create() {
// This is the CORRECT block for GameScene.create()
this.sounds = {};
if (this.uploadedSongUrl) {
    // If we have an uploaded song, only add that one.
    this.sounds['uploadedSong'] = this.sound.add('uploadedSong');
} else {
    // Otherwise, add all the default songs that were preloaded.
    for (const key in _CONFIG.soundsLoader) {
        if (key.includes('song')) {
            this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 });
        }
    }
}
        this.vfx = new VFXLibrary(this);
        
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.scaleFactor = this.height > this.width ? this.width / 720 : this.width / 1280;

        this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.width, this.height);
        this.laneWidth = this.width / this.lanes;
        this.hitZoneY = this.height - 120 * this.scaleFactor;
        
        this.createLanes();
        this.createHitZone();

        const uiPanel = this.add.rectangle(this.width / 2, 40 * this.scaleFactor, this.width, 80 * this.scaleFactor, 0x000000, 0.5).setDepth(10);
        this.scoreText = this.add.text(50 * this.scaleFactor, 40 * this.scaleFactor, "0", this.txtStyle(48)).setOrigin(0, 0.5).setDepth(11);
        this.livesText = this.add.text(this.width / 2, 40 * this.scaleFactor, `LIVES: ${this.lives}`, this.txtStyle(32)).setOrigin(0.5, 0.5).setDepth(11);
        this.comboText = this.add.text(this.width - 50 * this.scaleFactor, 40 * this.scaleFactor, "COMBO: 0", this.txtStyle(32)).setOrigin(1, 0.5).setDepth(11);
        this.judgmentText = this.add.text(this.width / 2, this.height / 2, "", this.txtStyle(60)).setOrigin(0.5, 0.5).setDepth(12);

        this.setupInput();
        this.pauseButton = this.add.sprite(this.width - 60 * this.scaleFactor, 40 * this.scaleFactor, "pauseButton")
            .setOrigin(0.5, 0.5).setDepth(11).setInteractive({ cursor: "pointer" }).setScale(2.5 * this.scaleFactor);
        this.pauseButton.on("pointerdown", () => this.pauseGame());
        this.analyzeBeats();
        
        this.startSongWithDelay();

        this.input.keyboard.on("keydown-ESC", () => this.pauseGame());
        this.events.on('resume', this.handleResume, this);

        // In GameScene.create()

// --- Particle Emitter for Hits ---
// This creates the particle manager. The 'false' means it won't be added to the display list yet.
const particles = this.add.particles(0, 0, 'buttonbg', {
    // We use 'buttonbg' which is already loaded, but scale it down to look like a particle
    frame: '__DEFAULT',
    speed: { min: 100, max: 300 },
    angle: { min: 220, max: 320 }, // Shoots particles up and out
    scale: { start: 0.05, end: 0 }, // Start small and shrink to nothing
    blendMode: 'ADD', // Creates a nice glow effect
    lifespan: 400,
    gravityY: 400,
    quantity: 15,
    emitting: false // IMPORTANT: We only want it to fire when we tell it to
});
particles.setDepth(20); // Make sure particles are on top
this.hitEmitter = particles; // Store it for later use
this.fallTime = (this.hitZoneY + 50) / this.gameSpeed * 1000; 

    }

    

    txtStyle(size = 24, align = 'center', color = '#ffffff') {
        const sf = this.scaleFactor || 1;
        return {
            fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: `${Math.round(size * sf)}px`,
            color,
            align,
            fontStyle: '900',
            wordWrap: { width: (this.width || 1280) - 40, useAdvancedWrap: true },
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true }
        };
    }

    analyzeBeats() {
    const songKeys = Object.keys(_CONFIG.soundsLoader);
    const currentSongKey = this.uploadedSongUrl ? 'uploadedSong' : songKeys[this.currentSongIndex];
    
    const audioCache = this.cache.audio.get(currentSongKey);
    if (!audioCache) return;
    
    this._decodedBuffer = audioCache;
    const buffer = this._decodedBuffer;
    const sampleRate = buffer.sampleRate;
    const channelData = buffer.getChannelData(0);
    
    const hopSize = Math.floor(sampleRate * 0.05); // 50ms windows
    const threshold = 1;
    const minBeatGap = 350; // NEW: Minimum 350ms between beats to prevent simultaneous spawns
    
    let prevEnergy = 0;
    let lastBeatTime = -1000; // NEW: Track last beat time
    
    for (let i = 0; i < channelData.length; i += hopSize) {
        const windowEnd = Math.min(i + hopSize, channelData.length);
        let energy = 0;
        
        for (let j = i; j < windowEnd; j++) {
            energy += channelData[j] * channelData[j];
        }
        energy = Math.sqrt(energy / hopSize);
        
        if (energy > prevEnergy * threshold * this.stdMult) {
            const timeInMs = (i / sampleRate) * 1000;
            
            // NEW: Only add beat if enough time has passed since last beat
            if (timeInMs - lastBeatTime >= minBeatGap) {
                this.beatsData.push(timeInMs);
                lastBeatTime = timeInMs;
            }
        }
        
        prevEnergy = energy * 0.9;
    }
}
    
// THIS IS THE CORRECTED CODE
startSongWithDelay() {
    this.time.delayedCall(this.fallTime, () => {
        this.nextBeatIndex = 0;
        
        // 1. DEFINE playConfig here, so it's always available
        const playConfig = {
            volume: 0.6,
            rate: this.playbackRate 
        };

        if (this.uploadedSongUrl) {
            // No need to re-add the sound, it was added in create()
            this.sounds['uploadedSong'].play(playConfig); // 2. Use the config
            this._decodedBuffer = this.sounds['uploadedSong'].source?.buffer;
        } else {
            const songKeys = Object.keys(_CONFIG.soundsLoader);
            const currentSongKey = songKeys[this.currentSongIndex];
            if (currentSongKey && this.sounds[currentSongKey]) {
                this.sounds[currentSongKey].play(playConfig); // 3. Use the config (and remove the extra .play())
                this._decodedBuffer = this.sounds[currentSongKey].source?.buffer;
            }
        }
        this.songStartTime = this.time.now;
    });
}


    _playSliceAt(timeSec, dur = 0.25) {
        if (!this._decodedBuffer) return;
        const ctx = this.sound.context;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(1.0, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        const src = ctx.createBufferSource();
        src.buffer = this._decodedBuffer;
        src.connect(gain).connect(ctx.destination);
        const startAt = Math.max(0, Math.min(timeSec, this._decodedBuffer.duration - 0.01));
        src.start(0, startAt, Math.min(dur, this._decodedBuffer.duration - startAt));
    }

    playHitVFX(x, y, points) {
        const scorePopup = this.add.text(x, y, `+${points}`, this.txtStyle(40)).setOrigin(0.5, 0.5).setDepth(15);
        this.tweens.add({ targets: scorePopup, y: y - 100, alpha: 0, duration: 800, ease: 'Power1', onComplete: () => scorePopup.destroy() });
        const shockwave = this.add.circle(x, y, 10, 0xffffff, 0.7).setDepth(0);
        this.tweens.add({ targets: shockwave, radius: this.laneWidth / 2, alpha: 0, duration: 400, ease: 'Quad.easeOut', onComplete: () => shockwave.destroy() });
        this.hitEmitter.explode(15, x, y);
        this.tweens.add({
    targets: this.hitZone,
    scaleY: 1.2, // Briefly make it taller
    alpha: 0.6,  // Briefly make it brighter
    duration: 80,
    yoyo: true,  // Animate back to the original state
    ease: 'Sine.easeInOut'
});
      }

// In GameScene
handleMiss() {
    //this.sound.play('sfx_miss');
    
    this.combo = 0;
    this.updateComboText();
    this.showJudgment("MISS");

    // --- NEW LIFE LOGIC ---
    this.missCounter++; // Add 1 to the miss counter

    // Check if the miss counter has reached the threshold
    if (this.missCounter >= 6) {
        this.lives--; // Lose one life
        this.livesText.setText(`LIVES: ${this.lives}`);
        this.missCounter = 0; // Reset the counter back to 0

        // Add a visual effect to the lives text to show a life was lost
        this.tweens.add({
            targets: this.livesText,
            scale: 1.4,
            duration: 150,
            yoyo: true,
            ease: 'Quad.easeInOut'
        });

        // Check for game over
        if (this.lives <= 0) {
            this.endGame(false);
        }
    }
    // --- END NEW LIFE LOGIC ---
}

update(time, delta) {
    if (this.isGameOver) return;
    this.updateTiles(delta);
    this.spawnTiles(time);
    this.checkMissedTiles();
    
    // MODIFY the song duration check
    const songDurationMs = (this._decodedBuffer?.duration * 1000) || this.songDuration;
    const adjustedDuration = songDurationMs / this.playbackRate;
    const songFinished = time - this.songStartTime >= adjustedDuration;

    const allBeatsSpawned = this.nextBeatIndex >= this.beatsData.length;
    
    if (songFinished && allBeatsSpawned && this.activeTiles.length === 0) {
        this.endGame(true);
    }
}

    createLanes() {
        for (let i = 1; i < this.lanes; i++) {
            const x = i * this.laneWidth;
            this.add.rectangle(x, this.height / 2, 4, this.height, 0x444444).setDepth(1);
        }
    }

    createHitZone() {
        this.hitZone = this.add.rectangle(this.width / 2, this.hitZoneY, this.width, 80 * this.scaleFactor, 0x00ff00, 0.3).setDepth(2);
        this.tweens.add({ targets: this.hitZone, alpha: { from: 0.3, to: 0.6 }, duration: 1000, yoyo: true, repeat: -1 });
    }

    setupInput() {
        const keys = ['ONE', 'TWO', 'THREE', 'A', 'S', 'D'];
        for (let i = 0; i < this.lanes; i++) {
            this.input.keyboard.on(`keydown-${keys[i]}`, () => this.handleLaneInput(i));
            if (keys[i+3]) this.input.keyboard.on(`keydown-${keys[i+3]}`, () => this.handleLaneInput(i));

            const zone = this.add.rectangle(i * this.laneWidth, 0, this.laneWidth, this.height, 0, 0).setOrigin(0).setInteractive();
            zone.on("pointerdown", () => this.handleLaneInput(i));
        }
    }

    startSong() {
        this.songStartTime = this.time.now;
        const songKeys = Object.keys(_CONFIG.soundsLoader);
    const currentSongKey = songKeys[this.currentSongIndex];

    if (currentSongKey && this.sounds[currentSongKey]) {
        this.sounds[currentSongKey].play({ volume: 0.6 });
    }
    }

// In GameScene
spawnTiles(time) {
    if (time < this.songStartTime - this.fallTime) return;

    while (this.nextBeatIndex < this.beatsData.length) {
        const beatTime = this.beatsData[this.nextBeatIndex];
        const spawnAtTime = this.songStartTime + (beatTime / this.playbackRate) - this.fallTime;

        if (time >= spawnAtTime) {
            // --- NEW LOGIC FOR RANDOMIZED SPAWNING ---

            // 1. Find all lanes where enough time has passed to be considered "available".
            const availableLanes = [];
            for (let i = 0; i < this.lanes; i++) {
                if (time - this.laneLastSpawnTime[i] > this.minLaneSpawnGap) {
                    availableLanes.push(i);
                }
            }

            let chosenLane;
            if (availableLanes.length > 0) {
                // 2a. If there are available lanes, pick one from the pool RANDOMLY.
                chosenLane = Phaser.Utils.Array.GetRandom(availableLanes);
            } else {
                // 2b. FALLBACK: If all lanes were used recently, pick the one that was used longest ago
                // to ensure the beat is not skipped.
                let oldestTime = Infinity;
                let oldestLane = 0;
                for (let i = 0; i < this.lanes; i++) {
                    if (this.laneLastSpawnTime[i] < oldestTime) {
                        oldestTime = this.laneLastSpawnTime[i];
                        oldestLane = i;
                    }
                }
                chosenLane = oldestLane;
            }

            // 3. Create the tile and record the spawn time for the chosen lane.
            this.createTile(chosenLane);
            this.laneLastSpawnTime[chosenLane] = time;
            this.nextBeatIndex++;

        } else {
            break;
        }
    }
}



    createTile(lane, offset = 0) {
    const x = lane * this.laneWidth + this.laneWidth / 2;
    const tile = this.add.rectangle(x, -50 + offset, this.laneWidth - 10, 100 * this.scaleFactor, 0x000000).setDepth(3);
    tile.lane = lane;
    this.tiles.push(tile);
    this.activeTiles.push(tile);
}


    updateTiles(delta) {
        for (let i = this.tiles.length - 1; i >= 0; i--) {
            const tile = this.tiles[i];
            tile.y += this.gameSpeed * (delta / 1000);
            if (tile.y > this.height + 100) {
                this.tiles.splice(i, 1);
                const activeIndex = this.activeTiles.indexOf(tile);
                if (activeIndex > -1) this.activeTiles.splice(activeIndex, 1);
                tile.destroy();
            }
        }
    }

    handleLaneInput(lane) {
        if (this.isGameOver) return;
        const windowTop = this.hitZoneY - this.goodRange;
        const windowBot = this.hitZoneY + this.goodRange;
        let closestTile = null;
        let closestDistance = Infinity;
        for (const tile of this.activeTiles) {
            if (tile.lane === lane && tile.y >= windowTop && tile.y <= windowBot) {
                const distance = Math.abs(tile.y - this.hitZoneY);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestTile = tile;
                }
            }
        }
        if (closestTile) this.hitTile(closestTile, closestDistance);
        else this.handleMiss();
    }

    hitTile(tile, distance) {
        let judgment = "MISS";
        let points = 0;
        if (distance < this.perfectRange) { judgment = "PERFECT"; points = 100; }
        else if (distance < this.greatRange) { judgment = "GREAT"; points = 75; }
        else if (distance < this.goodRange) { judgment = "GOOD"; points = 50; }

        if (judgment !== "MISS") {
             this.coinsEarned += 1;
    this.combo++;
            this.maxCombo = Math.max(this.maxCombo, this.combo);
            const comboMultiplier = Math.floor(this.combo / 10) + 1;
            this.updateScore(points * comboMultiplier);
            this.playAudioSliceOnTap();
            this.playHitVFX(tile.x, this.hitZoneY, points);
            this.showJudgment(judgment);
            const index = this.activeTiles.indexOf(tile);
            if (index > -1) this.activeTiles.splice(index, 1);
            this.removeTileFromGame(tile);
            this.gameSpeed = Math.min(this.gameSpeed + 1, 500);
        } else {
            this.handleMiss();
        }
    }

    playAudioSliceOnTap() {
        const songProgress = (this.time.now - this.songStartTime) / this.songDuration;
        const sliceTime = songProgress * (this._decodedBuffer?.duration || 30);
        this._playSliceAt(sliceTime, 0.22);
    }

    checkMissedTiles() {
        for (let i = this.activeTiles.length - 1; i >= 0; i--) {
            const tile = this.activeTiles[i];
            if (tile.y > this.hitZoneY + this.goodRange) {
                this.activeTiles.splice(i, 1);
                this.removeTileFromGame(tile);
                this.handleMiss();
            }
        }
    }

    showJudgment(judgment) {
        this.judgmentText.setText(judgment);
        const colors = { PERFECT: '#ffff00', GREAT: '#00ff00', GOOD: '#0080ff', MISS: '#ff0000' };
        this.judgmentText.setColor(colors[judgment] || '#ffffff');
        this.judgmentText.setScale(1.5).setAlpha(1);
        this.tweens.add({ targets: this.judgmentText, scale: 1, alpha: 0, duration: 800 });
    }

    removeTileFromGame(tile) {
        const index = this.tiles.indexOf(tile);
        if (index > -1) this.tiles.splice(index, 1);
        tile.destroy();
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(this.score.toString());
        this.updateComboText();
            if (this.combo > 0 && this.combo % 50 === 0 && this.combo !== oldCombo) {
        this.sound.play('sfx_combo', { volume: 0.7 });
    }
    }

    updateComboText() {
        this.comboText.setText(`COMBO: ${this.combo}`);
        const color = this.combo > 50 ? '#ff0000' : this.combo > 20 ? '#ffff00' : '#ffffff';
        this.comboText.setColor(color);
    }

// This is the CORRECTED code
// This is the CORRECTED code
endGame(isVictory) {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.sound.stopAll();

    // --- NEW COIN LOGIC ---
    const currentCoins = parseInt(localStorage.getItem('coins') || '0', 10);
    const newTotalCoins = currentCoins + this.coinsEarned;
    localStorage.setItem('coins', newTotalCoins.toString());
    // --- END NEW COIN LOGIC ---
    
    // Create a complete data object for restarting
    const restartData = {
        stdMult: this.stdMult,
        playbackRate: this.playbackRate,
        lives: this.lives // Make sure lives are carried over for restart
    };

    if (this.uploadedSongUrl) {
        // If it was an uploaded song, include its URL
        restartData.songUrl = this.uploadedSongUrl;
    } else {
        // Otherwise, include the key of the default song
        const songKeys = Object.keys(_CONFIG.soundsLoader);
        restartData.songKey = songKeys[this.currentSongIndex];
    }
    
    this.scene.start("VictoryScene", {
        score: this.score,
        isVictory: isVictory,
        livesLeft: this.lives,
        audioData: restartData, // Pass the complete object
        coinsEarned: this.coinsEarned // <-- ADD THIS LINE
    });
}
    
    pauseGame() {
        this.pauseTime = this.time.now; 
        handlePauseGame.bind(this)();
    }
    // In GameScene, for example, after the pauseGame() function

handleResume() {
    const pauseDuration = this.time.now - this.pauseTime;
    this.songStartTime += pauseDuration;

    // This part is crucial: If the song is being played from the sound manager,
    // you need to ensure it resumes playing. The handlePauseGame function
    // typically pauses all sounds, and this will resume them.
    if (!this.isGameOver) {
        this.sound.resumeAll();
    }
}
}


function createAnimatedButton(scene, x, y, text, onClick, scale = 0.8) {
    const buttonContainer = scene.add.container(x, y);
    const bg = scene.add.image(0, 0, 'buttonbg').setScale(scale);
    const label = scene.add.text(0, 0, text, scene.txtStyle(32, 'center', '#ffffff')).setOrigin(0.5);

    // Shine Effect
    const shine = scene.add.rectangle(-bg.width * scale * 0.75, 0, bg.width * scale * 0.4, bg.height * scale * 2.5, 0xffffff, 0.4);
    shine.setAngle(-15);

    // Mask for the shine
    const maskShape = scene.make.graphics().fillStyle(0xffffff).fillRoundedRect(x - (bg.width * scale / 2), y - (bg.height * scale / 2), bg.width * scale, bg.height * scale, 20 * scale);
    shine.setMask(maskShape.createGeometryMask());

    // CORRECTED: Add elements in a specific order. The label is now last.
    buttonContainer.add([bg, shine, label]);
    buttonContainer.setSize(bg.width * scale, bg.height * scale);
    buttonContainer.setInteractive({ useHandCursor: true });

    // --- Animations ---
buttonContainer.on('pointerover', () => {
    scene.sound.play('sfx_hover', { volume: 0.4 }); // ADD THIS LINE
    scene.tweens.add({ targets: buttonContainer, scale: { from: 1, to: 1.1 }, duration: 200, ease: 'Power2' });
    scene.tweens.add({ targets: shine, x: bg.width * scale * 0.75, duration: 450, ease: 'Power2.easeOut' });
});
    buttonContainer.on('pointerout', () => {
        scene.tweens.add({ targets: buttonContainer, scale: { from: 1.1, to: 1 }, duration: 200, ease: 'Power2' });
        scene.tweens.add({ targets: shine, x: -bg.width * scale * 0.75, duration: 10 });
    });
buttonContainer.on('pointerdown', () => {
    if(scene != 'GameScene') scene.sound.play('sfx_click'); // ADD THIS LINE
    scene.tweens.add({
        targets: buttonContainer, scale: 0.95, duration: 100, ease: 'Power1', yoyo: true,
        onComplete: () => {
            buttonContainer.setScale(1.0);
            if (onClick) onClick();
        }
    });
});

    return buttonContainer;
}

function transitionToScene(currentScene, nextSceneKey, data = {}) {
  currentScene.sound.play('sfx_transition');
    const W = currentScene.sys.game.config.width;
    const H = currentScene.sys.game.config.height;

    // Create top and bottom shutters
    const topShutter = currentScene.add.rectangle(W / 2, -H / 4, W, H / 2, 0x000000).setDepth(1000);
    const bottomShutter = currentScene.add.rectangle(W / 2, H + H / 4, W, H / 2, 0x000000).setDepth(1000);

    // Animate shutters closing
    currentScene.tweens.add({
        targets: topShutter,
        y: H / 4,
        duration: 500,
        ease: 'Cubic.easeInOut'
    });

    currentScene.tweens.add({
        targets: bottomShutter,
        y: H - H / 4,
        duration: 500,
        ease: 'Cubic.easeInOut',
        onComplete: () => {
            // Once closed, start the next scene
            currentScene.scene.start(nextSceneKey, data);
        }
    });
}

function displayProgressLoader() {
    const { width, height } = this.game.config;
    const boxWidth = 320, boxHeight = 50;
    const x = width / 2 - boxWidth / 2;
    const y = height / 2 - boxHeight / 2;
    const progressBox = this.add.graphics().fillStyle(0x222222, 0.8).fillRect(x, y, boxWidth, boxHeight);
    const loadingText = this.make.text({ x: width / 2, y: y + 70, text: "Loading...", style: { font: "20px monospace", fill: "#ffffff" } }).setOrigin(0.5);
    const progressBar = this.add.graphics();
    this.load.on("progress", v => progressBar.clear().fillStyle(0x364afe, 1).fillRect(x, y, boxWidth * v, boxHeight));
    this.load.on("complete", () => { progressBar.destroy(); progressBox.destroy(); loadingText.destroy(); });
}

const config = {
    type: Phaser.AUTO,
    width: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].width,
    height: _CONFIG.orientationSizes[_CONFIG.deviceOrientation].height,
    scene: [PreloaderScene, TitleScene, MenuScene, DifficultyScene, GameScene, VictoryScene, BuyScene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    pixelArt: true, // Set to false for smooth fonts
    physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
};
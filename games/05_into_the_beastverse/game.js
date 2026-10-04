//------------------------------------------------------ Global Var ---------------------------------
// const HarryGlobal = {
//     lives: 3,
//     maxO2: 0,
//     maxSpeed: 0,
//     time: 0,
//     child: 'Ivaan', 
//     cloakName: 'clok',
//     cloakTimeMax: 0
// };
const askedQuestions = [];
class HarryGlobal {
    static lives = 3;
    static maxO2 = 60;
    static score = 0;
    static deaths = 0;
    static time = 0;
    static child = '';
    static cloakName = 'clok';
    static cloakTimeMax = 0;
    


    static updateScore(basePoints, timeTaken) {
        let totalScore = basePoints;
        return totalScore;
    }

    static resetLevelStats() {

        HarryGlobal.deaths = 0;
    }

    static getNewQuestion() {
        if (this.questionPool.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.questionPool.length);
        const question = this.questionPool.splice(randomIndex, 1)[0];
        askedQuestions.push(question);
        return question;
    }
}

function initQuistion(child) {
    // Question pool for Rohan
    const rohanQuestionPool = [
        // Math (25)
        { question: 'What comes after number 5?', options: ['4', '6', '3', '7'], correctAnswer: '6' },
        { question: 'How many fingers do you have?', options: ['8', '10', '12', '9'], correctAnswer: '10' },
        { question: 'What shape has 3 sides?', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], correctAnswer: 'Triangle' },
        { question: 'Which number is the smallest?', options: ['2', '5', '9', '4'], correctAnswer: '2' },
        { question: 'What is 2 plus 1?', options: ['4', '2', '3', '5'], correctAnswer: '3' },
        { question: 'What shape is a ball?', options: ['Round', 'Square', 'Triangle', 'Flat'], correctAnswer: 'Round' },
        { question: 'What comes before number 7?', options: ['6', '8', '9', '5'], correctAnswer: '6' },
        { question: 'How many sides does a square have?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
        { question: 'Which number is bigger?', options: ['1', '7', '4', '3'], correctAnswer: '7' },
        { question: 'What is 1 + 1?', options: ['1', '3', '2', '4'], correctAnswer: '2' },
        { question: 'How many legs does a chair have?', options: ['3', '4', '2', '1'], correctAnswer: '4' },
        { question: 'Which number comes after 9?', options: ['8', '10', '7', '6'], correctAnswer: '10' },
        { question: 'What is 3 + 2?', options: ['4', '5', '6', '2'], correctAnswer: '5' },
        { question: 'How many eyes do you have?', options: ['1', '3', '2', '4'], correctAnswer: '2' },
        { question: 'Which number is less: 6 or 8?', options: ['6', '8', 'Both same', '9'], correctAnswer: '6' },
        { question: 'What is 4 minus 2?', options: ['1', '3', '2', '0'], correctAnswer: '2' },
        { question: 'How many toes do you have?', options: ['10', '8', '5', '12'], correctAnswer: '10' },
        { question: 'What is 0 + 5?', options: ['4', '5', '6', '3'], correctAnswer: '5' },
        { question: 'How many hands do you have?', options: ['2', '4', '1', '3'], correctAnswer: '2' },
        { question: 'What comes between 2 and 4?', options: ['1', '3', '5', '6'], correctAnswer: '3' },
        { question: 'What is 5 - 1?', options: ['3', '2', '4', '5'], correctAnswer: '4' },
        { question: 'How many legs does a dog have?', options: ['2', '4', '3', '5'], correctAnswer: '4' },
        { question: 'What comes after number 1?', options: ['2', '3', '0', '4'], correctAnswer: '2' },
        { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
        { question: 'Which is smaller: 3 or 5?', options: ['3', '5', 'Both same', '6'], correctAnswer: '3' },

        // Science (25)
        { question: 'What do we breathe in?', options: ['Water', 'Air', 'Juice', 'Smoke'], correctAnswer: 'Air' },
        { question: 'Which animal says “moo”?', options: ['Dog', 'Cow', 'Cat', 'Goat'], correctAnswer: 'Cow' },
        { question: 'What do plants need to grow?', options: ['Toys', 'Light', 'Ice', 'Soil'], correctAnswer: 'Light' },
        { question: 'Where do fish live?', options: ['Air', 'Water', 'Tree', 'Ground'], correctAnswer: 'Water' },
        { question: 'What color is the sun?', options: ['Blue', 'Yellow', 'Green', 'Red'], correctAnswer: 'Yellow' },
        { question: 'What do you wear when it rains?', options: ['Raincoat', 'Sweater', 'Cap', 'T-shirt'], correctAnswer: 'Raincoat' },
        { question: 'What do you see in the sky at night?', options: ['Stars', 'Clouds', 'Leaves', 'Sun'], correctAnswer: 'Stars' },
        { question: 'What fruit is red and round?', options: ['Apple', 'Banana', 'Grapes', 'Orange'], correctAnswer: 'Apple' },
        { question: 'How does a bird fly?', options: ['With wings', 'With legs', 'With hands', 'With fins'], correctAnswer: 'With wings' },
        { question: 'Which part of your body helps you see?', options: ['Ears', 'Nose', 'Eyes', 'Mouth'], correctAnswer: 'Eyes' },
        { question: 'What do you drink when thirsty?', options: ['Milk', 'Juice', 'Water', 'Oil'], correctAnswer: 'Water' },
        { question: 'Which animal barks?', options: ['Cat', 'Cow', 'Dog', 'Lion'], correctAnswer: 'Dog' },
        { question: 'What do you do with your ears?', options: ['Eat', 'Hear', 'See', 'Walk'], correctAnswer: 'Hear' },
        { question: 'What shines in the sky during the day?', options: ['Moon', 'Stars', 'Sun', 'Clouds'], correctAnswer: 'Sun' },
        { question: 'What do you use to smell?', options: ['Eyes', 'Nose', 'Mouth', 'Ears'], correctAnswer: 'Nose' },
        { question: 'Which animal has a long trunk?', options: ['Lion', 'Elephant', 'Monkey', 'Horse'], correctAnswer: 'Elephant' },
        { question: 'What do you wear on your feet?', options: ['Gloves', 'Shoes', 'Shirt', 'Hat'], correctAnswer: 'Shoes' },
        { question: 'Where does the sun go at night?', options: ['Under the sea', 'Behind clouds', 'It sets', 'To the moon'], correctAnswer: 'It sets' },
        { question: 'What do you see when it rains and the sun is out?', options: ['Snow', 'Rainbow', 'Storm', 'Lightning'], correctAnswer: 'Rainbow' },
        { question: 'Which part of your body helps you walk?', options: ['Hands', 'Legs', 'Ears', 'Mouth'], correctAnswer: 'Legs' },
        { question: 'What do plants grow in?', options: ['Sand', 'Soil', 'Water', 'Plastic'], correctAnswer: 'Soil' },
        { question: 'What does a clock show?', options: ['Temperature', 'Time', 'Speed', 'Date'], correctAnswer: 'Time' },
        { question: 'What can you see through?', options: ['Wood', 'Glass', 'Stone', 'Metal'], correctAnswer: 'Glass' },
        { question: 'What is frozen water called?', options: ['Juice', 'Ice', 'Steam', 'Milk'], correctAnswer: 'Ice' },
        { question: 'What do you use to brush your teeth?', options: ['Comb', 'Toothbrush', 'Spoon', 'Towel'], correctAnswer: 'Toothbrush' }
    ];

    // Question pool for Ivaan
    const ivaanQuestionPool = [
        // Math (25)
        { question: 'What is 12 + 8?', options: ['20', '18', '22', '19'], correctAnswer: '20' },
        { question: 'Which number is even?', options: ['7', '4', '9', '3'], correctAnswer: '4' },
        { question: 'What is the value of a dime?', options: ['10 cents', '5 cents', '25 cents', '15 cents'], correctAnswer: '10 cents' },
        { question: 'Which shape has 4 equal sides?', options: ['Rectangle', 'Triangle', 'Square', 'Circle'], correctAnswer: 'Square' },
        { question: 'What is 15 - 6?', options: ['9', '7', '11', '8'], correctAnswer: '9' },
        { question: 'Which number comes next: 5, 10, 15, ?', options: ['25', '20', '18', '30'], correctAnswer: '20' },
        { question: 'How many minutes are in an hour?', options: ['30', '60', '90', '45'], correctAnswer: '60' },
        { question: 'What is the smallest 2-digit number?', options: ['11', '10', '12', '13'], correctAnswer: '10' },
        { question: 'How many sides does a hexagon have?', options: ['5', '6', '8', '7'], correctAnswer: '6' },
        { question: 'What is half of 20?', options: ['15', '5', '10', '8'], correctAnswer: '10' },
        { question: 'What is 7 x 3?', options: ['21', '24', '18', '19'], correctAnswer: '21' },
        { question: 'What is 9 + 6?', options: ['14', '15', '13', '16'], correctAnswer: '15' },
        { question: 'How many hours in a day?', options: ['24', '12', '20', '22'], correctAnswer: '24' },
        { question: 'Which is greater: 89 or 98?', options: ['89', '98', 'Both', '88'], correctAnswer: '98' },
        { question: 'What is 100 - 45?', options: ['55', '65', '45', '60'], correctAnswer: '55' },
        { question: 'How many days in a week?', options: ['5', '6', '7', '8'], correctAnswer: '7' },
        { question: 'What is 11 + 11?', options: ['20', '21', '22', '23'], correctAnswer: '22' },
        { question: 'Which number is a multiple of 5?', options: ['11', '15', '13', '16'], correctAnswer: '15' },
        { question: 'What is 8 x 2?', options: ['16', '14', '12', '10'], correctAnswer: '16' },
        { question: 'What is 40 divided by 5?', options: ['5', '7', '8', '10'], correctAnswer: '8' },
        { question: 'What comes after 99?', options: ['100', '101', '98', '97'], correctAnswer: '100' },
        { question: 'What is 25 + 25?', options: ['50', '45', '55', '40'], correctAnswer: '50' },
        { question: 'Which of these is an odd number?', options: ['2', '4', '6', '9'], correctAnswer: '9' },
        { question: 'What is 30 - 15?', options: ['15', '14', '13', '12'], correctAnswer: '15' },
        { question: 'What is the square of 3?', options: ['6', '9', '3', '12'], correctAnswer: '9' },

        // Science (25)
        { question: 'Which part of the plant makes food?', options: ['Leaf', 'Root', 'Stem', 'Flower'], correctAnswer: 'Leaf' },
        { question: 'What do humans need to live?', options: ['Toys', 'Air', 'Gold', 'Candy'], correctAnswer: 'Air' },
        { question: 'What do animals eat?', options: ['Books', 'Food', 'Clothes', 'Plastic'], correctAnswer: 'Food' },
        { question: 'Which planet do we live on?', options: ['Mars', 'Earth', 'Jupiter', 'Venus'], correctAnswer: 'Earth' },
        { question: 'What do bees make?', options: ['Milk', 'Honey', 'Sugar', 'Butter'], correctAnswer: 'Honey' },
        { question: 'Which of these is a solid?', options: ['Water', 'Air', 'Rock', 'Juice'], correctAnswer: 'Rock' },
        { question: 'Which organ pumps blood?', options: ['Brain', 'Heart', 'Stomach', 'Lungs'], correctAnswer: 'Heart' },
        { question: 'What helps us to hear?', options: ['Eyes', 'Ears', 'Nose', 'Mouth'], correctAnswer: 'Ears' },
        { question: 'What do we wear to protect our eyes from the sun?', options: ['Gloves', 'Sunglasses', 'Cap', 'Scarf'], correctAnswer: 'Sunglasses' },
        { question: 'Which of these can fly?', options: ['Dog', 'Fish', 'Bird', 'Cat'], correctAnswer: 'Bird' },
        { question: 'What gas do we breathe out?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'], correctAnswer: 'Carbon Dioxide' },
        { question: 'What is the largest planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], correctAnswer: 'Jupiter' },
        { question: 'What do we call water when it turns to steam?', options: ['Ice', 'Gas', 'Vapor', 'Rain'], correctAnswer: 'Vapor' },
        { question: 'Which part of the body helps us think?', options: ['Brain', 'Heart', 'Lungs', 'Eyes'], correctAnswer: 'Brain' },
        { question: 'What is the boiling point of water?', options: ['100°C', '90°C', '80°C', '70°C'], correctAnswer: '100°C' },
        { question: 'Which animal lays eggs?', options: ['Cat', 'Dog', 'Bird', 'Tiger'], correctAnswer: 'Bird' },
        { question: 'What is the function of roots in a plant?', options: ['Make food', 'Absorb water', 'Grow flowers', 'Fly'], correctAnswer: 'Absorb water' },
        { question: 'Which is a source of light?', options: ['Moon', 'Bulb', 'Mirror', 'Fan'], correctAnswer: 'Bulb' },
        { question: 'Which planet is red?', options: ['Venus', 'Jupiter', 'Mars', 'Earth'], correctAnswer: 'Mars' },
        { question: 'What do we use to measure temperature?', options: ['Scale', 'Thermometer', 'Clock', 'Barometer'], correctAnswer: 'Thermometer' },
        { question: 'What is H2O?', options: ['Oxygen', 'Salt', 'Water', 'Carbon'], correctAnswer: 'Water' },
        { question: 'What are clouds made of?', options: ['Smoke', 'Dust', 'Water vapor', 'Air'], correctAnswer: 'Water vapor' },
        { question: 'What causes day and night?', options: ['Sun', 'Moon', 'Earth’s rotation', 'Stars'], correctAnswer: 'Earth’s rotation' },
        { question: 'Which animal is cold-blooded?', options: ['Lion', 'Lizard', 'Elephant', 'Dog'], correctAnswer: 'Lizard' },
        { question: 'What is the natural satellite of Earth?', options: ['Sun', 'Mars', 'Moon', 'Jupiter'], correctAnswer: 'Moon' }
    ];

    return child === 'Ivaan' ? ivaanQuestionPool : rohanQuestionPool;
}


//------------------------------------------------------ Selection Phase ----------------------------

// Game Scene
class Intro extends Phaser.Scene {
    constructor() {
        super({ key: 'Intro' });
    }

    preload() {
        // Load the Hogwarts background image
        this.load.image('hogwartsBackground', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/qJm9Cwy8zRSQoweX/assets/images/Copy%20of%20Prabal%283%29.png?t=1745016575936');
        
        // Load the magic uncle character
        this.load.image('magicUncle', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/qJm9Cwy8zRSQoweX/assets/images/magicuncle.png?t=1745016566746');
        
        // Load the dialogue box
        this.load.image('dialogueBox', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/qJm9Cwy8zRSQoweX/assets/images/newdialbox.png?t=1745016566480');
        
        // Load audio for each dialogue
        this.load.audio('dialogue1', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/EUoYuX8E21j3.mp3');
        this.load.audio('dialogue2', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/X5MTORXnIQ9J.mp3');
        this.load.audio('dialogue3', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/ZTfotT0gIePg.mp3'); // Replace with your actual audio URL
        this.load.audio('dialogue4', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/PJpILjRcUqm4.mp3'); // Replace with your actual audio URL
        this.load.audio('dialogue5', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/eVhtCFbV9JVT.mp3'); // Replace with your actual audio URL
        
        // Load ambient audio
        this.load.audio('backgroundMusic', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/IhjT5gsrcnRO.mp3');
        
        // Load bitmap font
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        this.load.image('skipButtons', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/jtNP30spHXlWUqGm/assets/images/newAsset_19.png?t=1741941007028');
        
        // Display loading progress
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width; //1920
        this.height = this.game.config.height;
        let skipisdone = false;
        
        
        this.backgroundMusic = this.sound.add('backgroundMusic', { volume: 0.3, loop: true });
        this.backgroundMusic.play();
        // Property to track current audio
this.currentAudio = null;
        
        // Add Hogwarts background
        this.background = this.add.image(this.width / 2, this.height / 2, 'hogwartsBackground').setOrigin(0.5);
        const bgScale = Math.max(this.width / this.background.displayWidth, this.height / this.background.displayHeight);
        this.background.setScale(bgScale);
        
        // Add dialogue box (centered on screen, initially hidden)
        this.dialogueBox = this.add.image(this.width / 2, this.height / 2, 'dialogueBox')
            .setOrigin(0.5)
            .setScale(1.2)
            .setAlpha(0);
            
        // Add dialogue text (initially hidden)
        this.dialogueText = this.add.bitmapText(this.width / 2, this.height / 2, 'pixelfont', '', 24)
            .setOrigin(0.5)
            .setAlpha(0);
        
        // Add magic uncle character (initially hidden, positioned at bottom right)
        this.magicUncle = this.add.image(this.width - 250, this.height * 0.77, 'magicUncle')
            .setOrigin(0.5)
            .setScale(0.6)
            .setAlpha(0);
        console.log(this.height);
        console.log(this.width);
        
        // Create dialogue data with text and corresponding audio
        this.dialogues = [
            { text: "Hey there, Kiddo!", audio: 'dialogue1', duration: 1000 },
            { text: "Welcome to the world of Harry Potter\ninto the BeastVerse!", audio: 'dialogue2', duration: 3000 },
            { text: "Get ready for an adventure full of magic.\nYou'll meet fight demons, mermaids, and DRAGONS!", audio: 'dialogue3', duration: 5000 },
            { text: "And don't worry — I'll be there\nwith you the whole way.", audio: 'dialogue4', duration: 2000 },
            { text: "Now, let's pick your character…\nand jump into the adventure!", audio: 'dialogue5', duration: 3000 }
        ];
        
        // Track current dialogue index
        this.currentDialogueIndex = 0;
        
        // Add skip button
        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });
        
        this.skipButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('S1');
        });
        
        // Fade in the scene
        this.cameras.main.fadeIn(1500, 0, 0, 0, () => {
            // Start dialogue sequence after fade-in
            this.showMagicUncle();
        });
    }
    
    showMagicUncle() {
        // Fade in the magic uncle character
        this.tweens.add({
            targets: this.magicUncle,
            alpha: 1,
            scale: 0.9,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Fade in the dialogue box after character appears
                this.tweens.add({
                    targets: this.dialogueBox,
                    alpha: 1,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        // Start first dialogue
                        this.showNextDialogue();
                    }
                });
            }
        });
    }
    
    showNextDialogue() {
    // If we've shown all dialogues, transition to next scene
    if (this.currentDialogueIndex >= this.dialogues.length) {
        this.fadeOutAndTransition();
        return;
    }
    
    // Stop any currently playing dialogue audio
    if (this.currentAudio && this.currentAudio.isPlaying) {
        this.currentAudio.stop();
    }
    
    // Get current dialogue data
    const dialogue = this.dialogues[this.currentDialogueIndex];
    
    // Play dialogue audio
    this.currentAudio = this.sound.add(dialogue.audio, { volume: 0.9 });
    this.currentAudio.play();
    
    // Show dialogue text with fade-in effect
    this.dialogueText.setText(dialogue.text);
    this.dialogueText.setAlpha(0);
    
    // Center the text within dialogue box
    this.dialogueText.setX(this.dialogueBox.x);
    this.dialogueText.setY(this.dialogueBox.y);
    this.dialogueText.setScale(2);
    
    // Fade in the text
    this.tweens.add({
        targets: this.dialogueText,
        alpha: 1,
        duration: 500,
        ease: 'Power2'
    });
    
    // Wait for audio to complete before moving to next dialogue
    this.currentAudio.once('complete', () => {
        // Add a small delay after audio completes
        this.time.delayedCall(800, () => {
            // Fade out the text
            this.tweens.add({
                targets: this.dialogueText,
                alpha: 0,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    // Move to next dialogue
                    this.currentDialogueIndex++;
                    this.showNextDialogue();
                }
            });
        });
    });
}
    
    fadeOutAndTransition() {
    // Stop any playing audio
    if (this.currentAudio && this.currentAudio.isPlaying) {
        this.currentAudio.stop();
    }
    
    // Fade out everything
    this.tweens.add({
        targets: [this.dialogueBox, this.magicUncle],
        alpha: 0,
        duration: 1000,
        ease: 'Power2',
        onComplete: () => {
            // Fade out camera
            this.cameras.main.fadeOut(1500, 0, 0, 0, () => {
                // Stop all audio
                this.sound.stopAll();
                
                // Transition to next scene
                this.scene.start('S1'); // Replace with your next scene key
            });
        }
    });
}
}

class StartGame extends Phaser.Scene{
    constructor(){
        super({key: 'StartGame'});
    }

    preload(){
        this.load.image('titleScreen', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/beastverse_intro.png?t=1745081259354');
        this.load.bitmapFont('pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml');
        if (_CONFIG && _CONFIG.soundsLoader && _CONFIG.soundsLoader.background) {
            this.load.audio('background', [_CONFIG.soundsLoader.background]);
        }
        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }
    create(){
         this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.vfx = new VFXLibrary(this);
        this.gameState = 'title'; // Start with title screen

        this.sounds = {};
        if (this.cache.audio.exists('background')) {
            this.sounds.background = this.sound.add('background', { loop: true, volume: 0.25 });
            this.sounds.background.play();
        } else {
            this.sounds.background = { stop: () => {}, play: () => {}, setLoop: () => this, setVolume: () => this };
        }

        this.titleGroup = this.add.group();

        // Add title logo
        this.titleLogo = this.add.image(this.width / 2, this.height * 0.4, 'titleScreen').setOrigin(0.5);
        this.titleGroup.add(this.titleLogo);
        this.startText = this.add.bitmapText(this.width / 2, this.height * 0.9, 'pixelfont', 'Click to Start', 30)
            .setOrigin(0.5)
            .setTint(0xffffff); // White color
        this.titleGroup.add(this.startText);
        this.input.on('pointerdown', () => {
            if (this.gameState === 'title') {
                this.sounds.background.stop();
                this.scene.start('Intro');
            }
        });
    }
    
}

class S1 extends Phaser.Scene {
    constructor() {
        super({ key: 'S1' });
    }

    preload() {
        this.score = 0;
        this.load.image('heart', 'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/heart.png');
        this.load.bitmapFont('pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml');
        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");
        this.load.image('background1', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Copy%20of%20Prabal%282%29.png?t=1744820077093');

        // Load character images
        this.load.image('rohan', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/rohan.png?t=1744820073553');
        this.load.image('ivaan', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/ivaan.png?t=1744820074005');

        // Load title screen
        this.load.image('titleScreen', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Copy%20of%20Prabal.png?t=1744820076129');

        if (_CONFIG && _CONFIG.soundsLoader && _CONFIG.soundsLoader.background) {
            this.load.audio('background', [_CONFIG.soundsLoader.background]);
        }

        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width; //1920
        this.height = this.game.config.height; //919

        console.log(this.width);
        console.log(this.height);
        this.vfx = new VFXLibrary(this);
        this.gameState = 'selection'; // Start with title screen

        this.sounds = {};
        if (this.cache.audio.exists('background')) {
            this.sounds.background = this.sound.add('background', { loop: true, volume: 0.25 });
            this.sounds.background.play();
        } else {
            this.sounds.background = { stop: () => {}, play: () => {}, setLoop: () => this, setVolume: () => this };
        }
        this.cameras.main.setBackgroundColor('#000')

        // Add input listeners
        this.input.keyboard.on('keydown-ESC', () => this.pauseGame());
        // this.pauseButton = this.add.image(this.game.config.width - 60, 60, "pauseButton");
        // this.pauseButton.setInteractive({ cursor: 'pointer' });
        // this.pauseButton.setScale(2).setScrollFactor(0).setDepth(11);
        // this.pauseButton.on('pointerdown', () => this.pauseGame());

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();

        // Create background
        this.bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "background1").setOrigin(0.5);

        // Use the larger scale factor to ensure the image covers the whole canvas
        const scale = Math.max(this.game.config.width / this.bg.displayWidth, this.game.config.height / this.bg.displayHeight);
        this.bg.setScale(scale, scale * 0.9);

        this.cameras.main.setBackgroundColor('#eee');

        // Create title screen group
        this.titleGroup = this.add.group();

        // Add title logo
        this.titleLogo = this.add.image(this.width / 2, this.height * 0.4, 'titleScreen').setOrigin(0.5).setVisible(false);
        this.titleGroup.add(this.titleLogo);

        // Add "Harry Potter" text
        // this.titleText = this.add.bitmapText(this.width / 2, this.height * 0.3, 'pixelfont', 'HARRY POTTER', 60)
        //     .setOrigin(0.5)
        //     .setTint(0xf0c000); // Gold color
        // this.titleGroup.add(this.titleText);

        // // Add "Into the Beastverse" text
        // this.subtitleText = this.add.bitmapText(this.width / 2, this.height * 0.5, 'pixelfont', 'INTO THE BEASTVERSE', 40)
        //     .setOrigin(0.5)
        //     .setTint(0xffffff); // White color
        // this.titleGroup.add(this.subtitleText);

        // Add instruction text
        

        // Create selection screen group (initially hidden)
        this.selectionGroup = this.add.group();

        // Add "Select Player" text
        // this.selectText = this.add.bitmapText(this.width / 2, this.height * 0.2, 'pixelfont', 'Select Player', 50)
        //     .setOrigin(0.5)
        //     .setTint(0xf0c000); // Gold color
        // this.selectionGroup.add(this.selectText);

        // Add character images with appropriate robes
        this.rohan = this.add.image(this.width * 0.7, this.height * 0.5, 'rohan').setOrigin(0.5).setScale(0.5);
        this.ivaan = this.add.image(this.width * 0.3, this.height * 0.5, 'ivaan').setOrigin(0.5).setScale(0.5);

        // Add character names
        // this.rohanText = this.add.bitmapText(this.width * 0.7, this.height * 0.75, 'pixelfont', 'ROHAN', 30)
        //     .setOrigin(0.5)
        //     .setTint(0xffffff);
        // this.ivaanText = this.add.bitmapText(this.width * 0.3, this.height * 0.75, 'pixelfont', 'IVAAN', 30)
        //     .setOrigin(0.5)
        //     .setTint(0xffffff);

        this.selectionGroup.add(this.rohan);
        this.selectionGroup.add(this.ivaan);
        // this.selectionGroup.add(this.rohanText);
        // this.selectionGroup.add(this.ivaanText);

        // Hide selection screen initially
        this.selectionGroup.setVisible(false);

        // Make the whole screen clickable to proceed from title to selection
        this.showSelectionScreen();
        

        // Make character selection interactive
        this.rohan.setInteractive({ cursor: 'pointer' });
        this.rohan.on('pointerdown', () => {
            HarryGlobal.child = 'Rohan';
            HarryGlobal.time = Date.now(); // Start the timer when Rohan is selected
            this.sound.stopAll();
            this.scene.start('C1');
        });

        // Add hover effects for Rohan
        this.rohan.on('pointerover', () => {
            this.rohan.setScale(0.8); // Scale up when hovered
        });
        this.rohan.on('pointerout', () => {
            this.rohan.setScale(0.5); // Return to normal scale when not hovered
        });

        // Make Ivaan interactive
        this.ivaan.setInteractive({ cursor: 'pointer' });
        this.ivaan.on('pointerdown', () => {
            HarryGlobal.child = 'Ivaan';
            HarryGlobal.time = Date.now(); // Start the timer when Ivaan is selected
            this.sound.stopAll();
            this.scene.start('C1');
        });

        // Add hover effects for Ivaan
        this.ivaan.on('pointerover', () => {
            this.ivaan.setScale(0.8); // Scale up when hovered
        });
        this.ivaan.on('pointerout', () => {
            this.ivaan.setScale(0.5); // Return to normal scale when not hovered
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.updateScore,
            callbackScope: this,
            loop: true,
            args: [1]
        });
    }

    showSelectionScreen() {
        
                this.selectionGroup.setVisible(true);
                this.selectionGroup.getChildren().forEach(child => child.setAlpha(0));
                this.tweens.add({
                    targets: this.selectionGroup.getChildren(),
                    alpha: 1,
                    duration: 500
                });
                this.gameState = 'selection';
            
        
    }

    update() {
        // Add any update logic here
    }

    gameOver() {
        initiateGameOver.bind(this)({ score: this.score });
    }

    pauseGame() {
        handlePauseGame.bind(this)();
    }

    gameOverWithEffects(player, boxes) {
        if (this.lives <= 0) {
            // Player is already dead, don't process further collisions
            return;
        }
        this.lives--;
        this.hearts[this.lives].destroy();

        if (this.lives === 1) {
            this.sounds.countdown.play({ volume: 0.6 }); // Duration in milliseconds
            this.time.delayedCall(3000, () => {
                this.sounds.countdown.stop();
            });
            this.instructionText.setAlpha(0);
            this.vfx.blinkEffect(this.lastLifeText, 400, 3);
        }

        if (this.lives > 0) {
            this.sounds.damage.play();
            boxes.destroy();
            this.vfx.shakeCamera(200, 0.01);
        } else {
            this.sound.stopAll();
            this.sounds.lose.play();
            this.player.setTint(0xff0000);
            this.physics.pause();
            this.vfx.shakeCamera(300, 0.04);
            this.time.delayedCall(1000, () => {
                this.gameOver();
            });
        }
    }
}

// Game Completion Scene
class S2 extends Phaser.Scene {
    constructor() {
        super({ key: 'S2' });
    }

    preload() {
        // Load any additional assets needed for this scene
        this.load.image('background', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/PLATFORM_934.png?t=1744269876539');
        this.load.bitmapFont('pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml');
        this.load.image('rohan', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/rohan.png?t=1744820073553'); // Update with actual path
        this.load.image('ivaan', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/ivaan.png?t=1744820074005'); // Update with actual path
    }

    create() {
        // Calculate time elapsed
        const endTime = Date.now();
        const startTime = HarryGlobal.time;
        const timeElapsed = endTime - startTime; // Time in milliseconds

        // Convert to seconds and format
        const seconds = Math.floor(timeElapsed / 1000);
        const milliseconds = timeElapsed % 1000;
        const formattedTime = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;

        // Calculate deaths (3 is assumed starting lives)
        const startingLives = 3; // Assuming game starts with 3 lives
        const deaths = startingLives - HarryGlobal.lives;

        // Background
        this.bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background').setOrigin(0.5);
        const scale = Math.max(this.game.config.width / this.bg.displayWidth, this.game.config.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        // Completion message
        this.add.bitmapText(
            this.game.config.width / 2,
            this.game.config.height * 0.1,
            'pixelfont',
            'LEVEL COMPLETED!',
            48
        ).setOrigin(0.5);

        HarryGlobal.child = 'Rohan';

        // Add character image based on which character was selected
        const characterImage = this.add.image(
            this.game.config.width / 2,
            this.game.config.height * 0.35,
            (HarryGlobal.child == 'Rohan' ? 'rohan':'ivaan' )
        ).setOrigin(0.5).setScale(0.3);

        // Create stats container for better organization
        const statsY = this.game.config.height * 0.55;
        const lineSpacing = 42;

        // Time display
        this.add.bitmapText(
            this.game.config.width / 2,
            statsY,
            'pixelfont',
            `TIME: ${formattedTime} seconds`,
            36
        ).setOrigin(0.5);

        // Total score display
        this.add.bitmapText(
            this.game.config.width / 2,
            statsY + lineSpacing,
            'pixelfont',
            `TOTAL SCORE: ${HarryGlobal.score || 0}`,
            36
        ).setOrigin(0.5);

        // Deaths display
        this.add.bitmapText(
            this.game.config.width / 2,
            statsY + lineSpacing * 2,
            'pixelfont',
            `DEATHS: ${deaths}`,
            36
        ).setOrigin(0.5);

        // Lives remaining display
        this.add.bitmapText(
            this.game.config.width / 2,
            statsY + lineSpacing * 3,
            'pixelfont',
            `LIVES REMAINING: ${HarryGlobal.lives}`,
            36
        ).setOrigin(0.5);

        // Play again button
        const playAgainButton = this.add.bitmapText(
            this.game.config.width / 2,
            this.game.config.height * 0.85,
            'pixelfont',
            'PLAY AGAIN',
            36
        ).setOrigin(0.5);

        playAgainButton.setInteractive({ cursor: 'pointer' });

        // Highlight on hover
        playAgainButton.on('pointerover', () => {
            playAgainButton.setTint(0xffff00);
        });

        playAgainButton.on('pointerout', () => {
            playAgainButton.clearTint();
        });

        // Return to selection screen on click
        playAgainButton.on('pointerdown', () => {
            // Reset game state
            HarryGlobal.lives = 3;
            HarryGlobal.time = 0;
            this.scene.start('S1');
            this.sound.stopAll();
        });

        // Add share score button
        const shareButton = this.add.bitmapText(
            this.game.config.width / 2,
            this.game.config.height * 0.93,
            'pixelfont',
            'SHARE SCORE',
            28
        ).setOrigin(0.5);

        shareButton.setInteractive({ cursor: 'pointer' });

        // Highlight on hover
        shareButton.on('pointerover', () => {
            shareButton.setTint(0x00ffff);
        });

        shareButton.on('pointerout', () => {
            shareButton.clearTint();
        });

        // Share functionality
        shareButton.on('pointerdown', () => {
            // Prepare share text with all stats
            const shareText = `Completed in ${formattedTime} seconds with ${HarryGlobal.score} points and ${deaths} deaths!`;
            console.log('Sharing: ' + shareText);
            this.showShareMessage(shareText);
        });
    }

    showShareMessage(text) {
        // Create a container for the share message
        const messageContainer = this.add.container(
            this.game.config.width / 2,
            this.game.config.height * 0.5
        );
        
        // Add background
        const bg = this.add.rectangle(
            0, 0,
            this.game.config.width * 0.8,
            this.game.config.height * 0.3,
            0x000000, 0.8
        ).setOrigin(0.5);
        
        // Add text
        const message = this.add.bitmapText(
            0, -20,
            'pixelfont',
            'Score shared!',
            42
        ).setOrigin(0.5);
        
        const details = this.add.bitmapText(
            0, 30,
            'pixelfont',
            text,
            24
        ).setOrigin(0.5).setWordWrapWidth(bg.width * 0.8);
        
        // Add all elements to container
        messageContainer.add([bg, message, details]);
        messageContainer.setAlpha(0);
        
        // Fade in and out animation
        this.tweens.add({
            targets: messageContainer,
            alpha: 1,
            duration: 500,
            yoyo: true,
            hold: 2000,
            onComplete: () => {
                messageContainer.destroy();
            }
        });
    }
}

// ---------------------------------------------- New Cutscene -------------------------------------------------------------------

class N1 extends Phaser.Scene {
    constructor() {
        super({ key: 'N1' });
    }

    preload() {
        // Load the space background (which already contains Earth and magic planet)
        this.load.image('spaceBackground', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/10.png?t=1744742174754');
        this.load.image('hogwartsTrain1', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/train.png?t=1744742173955');
        this.load.image('dialogueBox2', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/dialoguebox.png?t=1744742173554');


        this.load.audio('trainWhistle', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/SKYWALKER%2C_TRAIN_-_HOGWARTS_EXPRESS_WHISTLE_de47c9d2-9e18-4b23-8075-fcdc56ec67b8.mp3?t=1744276845169');
        this.load.audio('trainRunning', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Aboard%20the%20Hogwarts%20Express.%20audio%20atmosphere%20%E2%80%94%20Mozilla%20Firefox%202025-04-10%2014-51-47-%5BAudioTrimmer.com%5D_862149b0-4921-4c65-9913-bd41a964986d.mp3?t=1744277061341');
        this.load.audio('spaceAmbience', 'https://files.catbox.moe/ar11be.mp3');

        // Load narration audio clips
        this.load.audio('narration1', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/d1_7d9528ee-d95d-4aea-8a4e-f810d3f1020e.mp3?t=1744743964096'); // Replace with your actual audio URL
        this.load.audio('narration2', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/d2_83c8a68e-e78f-426c-8186-fa5787389892.mp3?t=1744743964272'); // Replace with your actual audio URL

        // Load bitmap font
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );

        // Display loading progress
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        // Initialize VFX library
        this.vfx = new VFXLibrary(this);

        // Add space background (which already contains Earth and magic planet)
        this.background = this.add.image(this.width / 2, this.height / 2, 'spaceBackground').setOrigin(0.5);
        const bgScale = Math.max(this.width / this.background.displayWidth, this.height / this.background.displayHeight);
        this.background.setScale(bgScale);

        // Define coordinates for Earth and magic planet based on their positions in the background
        this.earthPosition = {
            x: this.width * 0.2,  // Earth appears to be at about 20% from left
            y: this.height * 0.7  // And about 70% from top
        };

        this.magicPlanetPosition = {
            x: this.width * 0.9,  // Magic planet appears to be at about 80% from left
            y: this.height * 0.3  // And about 30% from top
        };

        // Calculate angle between Earth and Magic Planet
        const angleToMagicPlanet = Phaser.Math.Angle.Between(
            this.earthPosition.x,
            this.earthPosition.y,
            this.magicPlanetPosition.x,
            this.magicPlanetPosition.y
        );

        // Convert angle to degrees and adjust for sprite orientation
        const angleDegrees = Phaser.Math.RadToDeg(angleToMagicPlanet);

        // Add Hogwarts train (starting near Earth, pointing toward Magic Planet)
        this.train = this.add.image(this.earthPosition.x + 20, this.earthPosition.y - 10, 'hogwartsTrain1')
            .setOrigin(0.5)
            .setScale(0.5) // Start small
            .setAngle(angleDegrees - 15); // Point toward Magic Planet

        // Add dialogue box (initially hidden)
        this.dialogueBox = this.add.image(this.width * 0.7, this.height * 0.87, 'dialogueBox2')
            .setOrigin(0.5)
            .setScale(0.8)
            .setAlpha(0);

        this.dialogueText = this.add.bitmapText(this.dialogueBox.x, this.dialogueBox.y, 'pixelfont', '', 24)
            .setOrigin(0.5)
            .setAlpha(0);

        // Add sounds
        this.sounds = {
            whistle: this.sound.add('trainWhistle', { volume: 0.7 }),
            running: this.sound.add('trainRunning', { volume: 0.4, loop: true }),
            ambience: this.sound.add('spaceAmbience', { volume: 0.2, loop: true }),
            narration1: this.sound.add('narration1', { volume: 0.9 }),
            narration2: this.sound.add('narration2', { volume: 0.9 })
        };

        // Add particle effects for the train
        this.vfx.addCircleTexture('smokeParticle', 0xFFFFFF, 0.6, 15);
        this.smokeEmitter = this.vfx.createEmitter('smokeParticle', this.train.x - 40, this.train.y, 0.5, 0, 3000);
        this.smokeEmitter.startFollow(this.train, -40, 0);

        // Add star particles
        this.vfx.addCircleTexture('starParticle', 0xFFFFFF, 0.8, 2);
        this.starEmitter = this.vfx.createEmitter('starParticle', this.width / 2, this.height / 2, 0.5, 0.1, 8000);
        this.starEmitter.start();
        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });
        console.log('a')
        this.skipButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('L1');
            //this.scene.start('L1'); //test
        });

        // Track if dialogue box is currently displayed
        this.isDialogueActive = false;

        // Start the cutscene
        this.startCutscene();
    }

    startCutscene() {
        // Fade in the scene
        this.cameras.main.fadeIn(1500);

        // Play ambient sounds
        this.sounds.ambience.play();

        // Train departure sequence
        this.time.delayedCall(1000, () => {
            // Play train whistle
            this.sounds.whistle.play();

            // Start smoke emitter
            this.smokeEmitter.start();

            // Start train movement
            this.time.delayedCall(500, () => {
                this.sounds.running.play();

                // Start train journey immediately
                this.trainJourney();

                // Start narration sequence
                this.startNarration();
            });
        });
    }

    startNarration() {
        // First narration - after train starts moving
        this.time.delayedCall(1000, () => {
            // Play first narration audio
            this.sounds.narration1.play();

            // Show first part of narration text
            this.showDialogue("Harry thought this train \nwould take him to HOGWARTS.");

            // After 3.5 seconds, show second part of narration while first audio is still playing
            this.time.delayedCall(3500, () => {
                this.showDialogue("Little did he know, \nhe's going on the greatest journey of his life.");

                // Second narration - after the first 7-second narration finishes
                this.time.delayedCall(4000, () => {
                    // Play second narration audio
                    this.sounds.narration2.play();

                    // Show the third part of narration text
                    this.showDialogue("To an alternate world, \nwhere Mr. Beast is the new Dumbledore and \nElon Musk the new Professor Snape.");
                });
            });
        });
    }

    trainJourney() {
        // Define the complete path from Earth to Magic Planet
        const journeyDuration = 10000; // 6 seconds for the entire journey

        // Single direct tween from Earth to Magic Planet
        this.tweens.add({
            targets: this.train,
            x: this.magicPlanetPosition.x - 50,
            y: this.magicPlanetPosition.y + 20,
            scale: 0.3, // Final smaller scale
            // No angle change - train keeps pointing to magic planet
            duration: journeyDuration,
            ease: 'Linear',
            onComplete: () => {
                this.handleJourneyComplete();
            }
        });
    }

    handleJourneyComplete() {
        // Add special effect - shine to destination area
        const shineGraphics = this.add.graphics();
        shineGraphics.fillStyle(0xffffff, 0.5);
        shineGraphics.fillCircle(this.magicPlanetPosition.x, this.magicPlanetPosition.y, 10).setAlpha(1);

        this.tweens.add({
            targets: shineGraphics,
            alpha: 0,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                shineGraphics.destroy();
            }
        });

        // Play whistle for arrival
        this.sounds.whistle.play();

        // Fade out to next scene after a short delay
        this.time.delayedCall(5000, () => {
            // Stop all audio
            this.sounds.running.stop();
            this.sounds.ambience.stop();

            // If narration is still playing, stop it
            if (this.sounds.narration1.isPlaying) this.sounds.narration1.stop();
            if (this.sounds.narration2.isPlaying) this.sounds.narration2.stop();

            // Fade out camera
            this.cameras.main.fadeOut(2000, 0, 0, 0, () => {
                // Transition to next scene
                this.scene.start('L1');
                //this.scene.start('L1'); //test
            });
        });
    }

    showDialogue(text) {
        // If there's active dialogue, fade it out first
        if (this.isDialogueActive) {
            this.tweens.add({
                targets: this.dialogueText,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    // When fade out is complete, show the new dialogue
                    this.displayNewDialogue(text);
                }
            });
        } else {
            // If no active dialogue, display directly and fade in dialogue box
            this.isDialogueActive = true;

            // Fade in dialogue box if not already visible
            if (this.dialogueBox.alpha < 1) {
                this.tweens.add({
                    targets: this.dialogueBox,
                    alpha: 1,
                    duration: 500,
                    ease: 'Power2'
                });
            }

            this.displayNewDialogue(text);
        }
    }

    displayNewDialogue(text) {
        // Update text content
        this.dialogueText.setText(text);
        this.dialogueText.setAlpha(0);

        // Center the text
        this.dialogueText.setX(this.dialogueBox.x - 100);
        this.dialogueText.setY(this.dialogueBox.y - 30);

        // Fade in the text
        this.tweens.add({
            targets: this.dialogueText,
            alpha: 1,
            duration: 300,
            ease: 'Power2'
        });
    }

    update() {
        // Update particle effects
        if (this.smokeEmitter && this.train) {
            // Update smoke emitter position based on train angle
            const rad = Phaser.Math.DegToRad(this.train.angle);
            const offsetX = -40 * Math.cos(rad);
            const offsetY = -40 * Math.sin(rad);
            this.smokeEmitter.setPosition(this.train.x + offsetX, this.train.y + offsetY);
        }
    }
}

//------------------------------------------------------ CutScene -----------------------------------
class C1 extends Phaser.Scene {
    constructor() {
        super({ key: 'C1' });
    }

    preload() {
        this.load.image('backgroundz', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/PLATFORM_934.png?t=1744269876539');
        this.load.image('hogwartsTrain', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/2d_sprite_of_the_iconic_hogwarts_express_train_facing_right_detailed-2025-04-09-174321-removebg-preview.png?t=1744269873455');
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        this.load.atlas('harryPotter', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/spritesheet%288%29.png?t=1744280112820', 'https://aicade-ui-assets.s3.amazonaws.com/bigsmoke/games/harrypotterwalk/history/json/LAVngqd7hXIT.json');
        this.load.audio('trainWhistle', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/SKYWALKER%2C_TRAIN_-_HOGWARTS_EXPRESS_WHISTLE_de47c9d2-9e18-4b23-8075-fcdc56ec67b8.mp3?t=1744276845169');
        this.load.audio('trainRunning', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Aboard%20the%20Hogwarts%20Express.%20audio%20atmosphere%20%E2%80%94%20Mozilla%20Firefox%202025-04-10%2014-51-47-%5BAudioTrimmer.com%5D_862149b0-4921-4c65-9913-bd41a964986d.mp3?t=1744277061341');
        this.load.image('skipButtons', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/jtNP30spHXlWUqGm/assets/images/newAsset_19.png?t=1741941007028');

        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.vfx = new VFXLibrary(this);

        this.bg = this.add.image(this.width / 2, this.height / 2, 'backgroundz').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        this.train = this.add.image(-1000, this.height * 0.7, 'hogwartsTrain').setScale(4).setOrigin(0.5);

        this.sounds = {
            whistle: this.sound.add('trainWhistle', { volume: 0.9 }),
            running: this.sound.add('trainRunning', { volume: 0.5, loop: true })
        };

        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });
        console.log('a')
        this.skipButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('N1');
        });

        this.tweens.add({
            targets: this.train,
            x: this.width + 1000,
            duration: 8000,
            ease: 'Linear',
            onStart: () => {
                this.sounds.running.play();
            },
            onComplete: () => {
                this.train.destroy();
                this.sounds.running.stop();
                this.startHarryPotter();
            }
        });

        this.time.delayedCall(1000, () => {
            if (this.sounds.whistle) {
                this.sounds.whistle.play();
            }
        }, [], this);

        this.vfx.addCircleTexture('smokeParticle', 0xFFFFFF, 0.8, 20);
        this.smokeEmitter = this.vfx.createEmitter('smokeParticle', this.train.x + 980, this.train.y - 150, 2, 0, 2000);
        this.smokeEmitter.startFollow(this.train, 980, -770);
        this.smokeEmitter.start();

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'harryPotter', frame: 'image_0(12).png' },
                { key: 'harryPotter', frame: 'image_1(12).png' },
                { key: 'harryPotter', frame: 'image_2(8).png' },
                { key: 'harryPotter', frame: 'image_3(5).png' },
                { key: 'harryPotter', frame: 'image_4(6).png' },
                { key: 'harryPotter', frame: 'image_5(3).png' },
                { key: 'harryPotter', frame: 'image_6(4).png' },
                { key: 'harryPotter', frame: 'image_7(2).png' },
                { key: 'harryPotter', frame: 'image_8(1).png' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.harryPotter = this.add.sprite(-50, this.height * 0.9, 'harryPotter').setScale(6).setOrigin(0, 1).setVisible(false);

        this.cutsceneText = this.add.bitmapText(this.width / 2, this.height / 3, 'pixelfont', 'Harry Potter in BeastVerse', 40)
            .setOrigin(0.5)
            .setAlpha(0);

        this.tweens.add({
            targets: this.cutsceneText,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            hold: 3000,
            onComplete: () => {
                this.cutsceneText.destroy();
            }
        });

        this.cameras.main.fadeIn(2000, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
                this.time.delayedCall(23000, () => {
                    this.cameras.main.fadeOut(2000);
                    this.sound.stopAll();

                    this.scene.start('N1');
                });
            }
        });

        this.smokeEmitter.setGravity(0, -50);
    }

    update(time, delta) {
        if (this.smokeEmitter && this.train) {
            this.smokeEmitter.setPosition(this.train.x + 980, this.train.y - 150);
        }
    }

    startHarryPotter() {
        this.harryPotter.setVisible(true);
        this.harryPotter.play('walk');
        this.harryPotter.setFlipX(true);

        this.tweens.add({
            targets: this.harryPotter,
            x: this.width / 2,
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                this.harryPotter.stop();
                this.time.delayedCall(1000, () => {
                    if (this.sounds.whistle) {
                        this.sounds.whistle.play();
                    }
                    this.harryPotter.setFlipX(false);
                    this.showDialogue();
                    this.time.delayedCall(2000, () => {
                        this.startNewTrain();
                    });
                });
            }
        });

        this.showInitialDialogue();
    }

    showInitialDialogue() {
        const dialogueText = this.add.bitmapText(this.width / 2, this.height * 0.9, 'pixelfont', 'Wait WAIT! That’s my train! No no no COME ON! I can’t miss \nthe first day!', 40)
            .setOrigin(0.5)
            .setAlpha(0)
            .setDepth(11);

        this.tweens.add({
            targets: dialogueText,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3500, () => {
                    this.tweens.add({
                        targets: dialogueText,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueText.destroy();
                        }
                    });
                });
            }
        });
    }

    showDialogue() {
        const dialogueText = this.add.bitmapText(this.width / 2, this.height * 0.9, 'pixelfont', 'OH YES ANOTHER TRAIN! LETS GO!', 40)
            .setOrigin(0.5)
            .setAlpha(0)
            .setDepth(11);

        this.tweens.add({
            targets: dialogueText,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(4000, () => {
                    this.tweens.add({
                        targets: dialogueText,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueText.destroy();
                        }
                    });
                });
            }
        });
    }

    startNewTrain() {
        this.newTrain = this.add.image(-1000, this.height * 0.7, 'hogwartsTrain')
            .setScale(4)
            .setOrigin(0.5)
            .setTint(0x00FF00);

        this.sounds.running.play();

        this.tweens.add({
            targets: this.newTrain,
            x: this.width / 2,
            duration: 4000,
            ease: 'Linear',
            onComplete: () => {
                this.sounds.running.stop();
                this.tweens.add({
                    targets: this.harryPotter,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2',
                    onComplete: () => {
                        this.harryPotter.destroy();
                    }
                });

                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: this.newTrain,
                        x: this.width + 1000,
                        duration: 4000,
                        ease: 'Linear',
                        onComplete: () => {
                            this.newTrain.destroy();
                            this.sounds.running.stop();
                        }
                    });
                    this.sounds.running.play();
                });
            }
        });
    }
}

class C2 extends Phaser.Scene {
    constructor() {
        super({ key: 'C2' });
    }

    preload() {
        this.load.image('hogwartsEntrance', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Prabal%282%29.png?t=1744298500592');
        this.load.image('harryPotters', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Harry%20Cutscene.png?t=1744298341793');
        this.load.image('mrBeastDumbledore', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/MrBeast.png?t=1744298392619');
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load aura spritesheet and JSON
        this.load.atlas('aura', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/aura.png?t=1744299911511', 'https://aicade-ui-assets.s3.amazonaws.com/bigsmoke/games/harrypotterwalk/history/json/XkvIbPQtonBf.json');
        this.load.audio('backgroundMusic', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry_potter_95ed8954-cd87-46ec-b11a-9b3cd93130d1.mp3?t=1744301596637');
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        // Initialize sounds
        this.sounds = {};
        for (const key in _CONFIG.soundsLoader) {
            this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 });
        }
        this.bg = this.add.image(this.width / 2, this.height / 2, 'hogwartsEntrance').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);


        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });
        console.log('a')
        this.skipButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('C5');
        });

        this.harry = this.add.sprite(300, this.height, 'harryPotters').setScale(0.5).setOrigin(0.5, 1);

        this.dialogueIndex = 0;
        this.dialogues = [
            { speaker: `${HarryGlobal.child}`, text: 'Who are you?!' },
            { speaker: 'MrBeast', text: 'Hey! You’re at BEASTWARTS!' },
            { speaker: 'MrBeast', text: 'I’m MrBeast, a cooler Dumbledore!' },
            { speaker: 'MrBeast', text: 'You are picked for the biggest Quidditch game!' },
            { speaker: 'MrBeast', text: 'Win it, and you get a big hug from Daddy!' },
            { speaker: `${HarryGlobal.child}`, text: 'Wait, what? I just got here!' },
            { speaker: 'MrBeast', text: 'Grab your broom, it’s game time!' }
        ];


        // Initialize VFXLibrary (not used for aura, but kept for future use)
        this.vfx = new VFXLibrary(this);

        // Add MrBeast
        this.mrBeast = this.add.sprite(this.width / 2 + 400, this.height, 'mrBeastDumbledore').setScale(0.5).setAlpha(0).setOrigin(0.5, 1);

        // Create aura animation
        this.anims.create({
            key: 'auraAnimation',
            frames: this.anims.generateFrameNames('aura', {
                start: 0,
                end: 9,
                zeroPad: 0,
                prefix: 'image_',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: 0
        });

        // Add aura sprite and play animation
        this.aura = this.add.sprite(this.mrBeast.x, this.mrBeast.y, 'aura').setScale(4).play('auraAnimation');

        this.sounds.entry.play();

        this.tweens.add({
            targets: this.aura,
            alpha: 0,
            duration: 2000,
            delay: 1000, // Animation plays for 1 second before fading
            onComplete: () => {
                this.aura.destroy();
                this.tweens.add({
                    targets: this.mrBeast,
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2',
                    onComplete: () => {
                        this.showNextDialogue();
                    }
                });
            }
        });

        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        this.uiText = this.add.bitmapText(this.width / 2, 50, 'pixelfont', 'BEASTWARTS', 60)
            .setOrigin(0.5)
            .setTint(0x00FF00);
    }

    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            this.scene.start('C5');
            this.sound.stopAll();

            return;
        }

        const { speaker, text } = this.dialogues[this.dialogueIndex];

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00) // Yellow color for speaker name
            .setOrigin(0, 0.5);

        // Create dialogue text with white color - FIXED: removed the initial alpha: 0
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setOrigin(0, 0.5)
            .setTint(0xFFFFFF) // Explicitly set to white color
            .setDepth(10);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    update() {
    }
}

class C3 extends Phaser.Scene {
    constructor() {
        super({ key: 'C3' });
    }

    preload() {
        this.load.image(
            'hogwartsEntrances',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Cutscene_Quiditch.png?t=1744302803908'
        );
        this.load.image(
            'harryPotterss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Assets_Download_1.png?t=1744302791370'
        );
        this.load.image(
            'mrBeastDumbledore',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/MrBeast.png?t=1744298392619'
        );
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load background music
        this.load.audio(
            'backgroundMusic',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry_potter_95ed8954-cd87-46ec-b11a-9b3cd93130d1.mp3?t=1744301596637'
        );

        // Load chest animation
        this.load.atlas(
            'goldChests',
            'https://files.catbox.moe/vvzwem.png',
            'https://files.catbox.moe/6hqri0.json'
        );

        // Load villain aura spritesheet
        this.load.atlas(
            'villainAura',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/villain_aura.png?t=1744307282860',
            'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/FundSKcOTbqr.json'
        );

        // Load quiz panel image
        this.load.image('quizPanel', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/quizpanel2-removebg-preview.png?t=1744476334311');

        // Load broom images
        this.load.image('nimbusBroom', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/nimbus.png?t=1744309683543');
        this.load.image('brooms', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Brooms.png?t=1744309683460');

        this.load.audio('chestOpenSounds', 'https://files.catbox.moe/l2wgrj.mp3')
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        this.bg = this.add.image(this.width / 2, this.height / 2, 'hogwartsEntrances').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);
        this.sounds = {};
        for (const key in _CONFIG.soundsLoader) {
            this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 });
        }
        this.anims.create({
            key: 'villainAura',
            frames: [
                { key: 'villainAura', frame: 'tile000.png' },
                { key: 'villainAura', frame: 'tile001.png' },
                { key: 'villainAura', frame: 'tile002.png' },
                { key: 'villainAura', frame: 'tile003.png' },
                { key: 'villainAura', frame: 'tile004.png' },
                { key: 'villainAura', frame: 'tile005.png' },
                { key: 'villainAura', frame: 'tile006.png' },
                { key: 'villainAura', frame: 'tile007.png' },
                { key: 'villainAura', frame: 'tile008.png' },
                { key: 'villainAura', frame: 'tile009.png' }
            ],
            frameRate: 10,
            repeat: 0  // Play once
        });

        this.harry = this.add.sprite(550, this.height * 1.5, 'harryPotterss')
            .setScale(0.8)
            .setOrigin(0.5, 1)
            .setDepth(3);

        this.dialogueIndex = 0;
        this.dialogues = [
            { speaker: 'MrBeast', text: `Okay ${HarryGlobal.child}, this chest has two brooms.` },
            { speaker: 'MrBeast', text: 'Answer my quiz right...' },
            { speaker: 'MrBeast', text: 'You will win the super-fast Nimbus 2000X!' },
            { speaker: 'MrBeast', text: 'Get it wrong... and you get a boring one. Boo!' }
        ];


        // Initialize VFXLibrary
        this.vfx = new VFXLibrary(this);

        // Add MrBeast present on the scene from the start
        this.mrBeast = this.add.sprite(this.width / 2 + 200, this.height * 0.9, 'mrBeastDumbledore')
            .setScale(0.6)
            .setOrigin(0.5, 1)
            .setDepth(1);

        // Add and play background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        // Initialize question pool
        this.initializeQuestionPool();

        // Start the dialogue immediately
        this.showNextDialogue();
    }

    // Function to store and manage questions with options
    initializeQuestionPool() {
        this.questionPool = initQuistion(HarryGlobal.child);

        this.askedQuestions = []; // Track asked questions
    }

    // Function to get a new unasked question
    getNewQuestion() {
        if (this.questionPool.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.questionPool.length);
        const question = this.questionPool.splice(randomIndex, 1)[0];
        this.askedQuestions.push(question);
        return question;
    }

    // Quiz function
    showQuiz() {
        // Create black transparent overlay
        const overlay = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.7)
            .setOrigin(0.5)
            .setDepth(20);

        // Add quiz panel image
        const quizPanel = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
            .setScale(2.4) // Adjust scale as needed
            .setDepth(21);

        // Get a new question
        const currentQuestion = this.getNewQuestion();
        if (!currentQuestion) {
            console.log('No more questions available!');
            return;
        }

        // Add question text on the yellow part
        const questionText = this.add.bitmapText(this.width / 2, this.height / 2 - 100, 'pixelfont', currentQuestion.question, 40)
            .setOrigin(0.5)
            .setTint(0xFF0000) // Red text for contrast on yellow
            .setDepth(22);

        // Arrange options in a 2x2 grid
        const optionXPositions = [this.width / 2 - 250, this.width / 2 + 250]; // Two columns
        const optionYPositions = [this.height / 2 + 30, this.height / 2 + 160]; // Two rows
        const optionTexts = [];
        currentQuestion.options.forEach((option, index) => {
            const row = Math.floor(index / 2);
            const col = index % 2;
            const optionText = this.add.bitmapText(optionXPositions[col], optionYPositions[row], 'pixelfont', option, 30)
                .setOrigin(0.5)
                .setTint(0xFFFFFF) // Initial white text
                .setDepth(22)
                .setInteractive() // Make interactive for hover effect
                .on('pointerover', () => this.input.setDefaultCursor('pointer')) // Change to pointer cursor
                .on('pointerout', () => this.input.setDefaultCursor('default')); // Reset cursor
            optionTexts.push(optionText);
        });

        // Add interactivity
        this.input.on('pointerdown', (pointer) => {
            const clickedOption = currentQuestion.options.find((_, index) => {
                const row = Math.floor(index / 2);
                const col = index % 2;
                const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, optionXPositions[col], optionYPositions[row]);
                return dist < 50; // Rough click area
            });
            if (clickedOption) {
                // Color the clicked option based on correctness
                const clickedIndex = currentQuestion.options.indexOf(clickedOption);
                const row = Math.floor(clickedIndex / 2);
                const col = clickedIndex % 2;
                const selectedText = optionTexts[clickedIndex];
                selectedText.setTint(clickedOption === currentQuestion.correctAnswer ? 0x00FF00 : 0xFF0000); 

                // Show MrBeast dialogue
                const feedbackDialogue = clickedOption === currentQuestion.correctAnswer
                    ? 'You have answered correctly'
                    : 'You have answered wrong';
                this.showFeedbackDialogue(feedbackDialogue);
                HarryGlobal.maxSpeed = clickedOption === currentQuestion.correctAnswer ? 250 : 150;

                // Delay to allow dialogue to be read, then trigger chest animation
                this.time.delayedCall(1000, () => {
                    overlay.destroy();
                    quizPanel.destroy();
                    questionText.destroy();
                    optionTexts.forEach(text => text.destroy());
                    this.triggerChestAnimation(clickedOption === currentQuestion.correctAnswer);
                });
            }
        });
    }

    // Function to show feedback dialogue
    showFeedbackDialogue(text) {
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8).setDepth(19);

        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', 'MrBeast: ', 30)
            .setTint(0xFFFF00) // Yellow for speaker
            .setOrigin(0, 0.5)
            .setDepth(19);

        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF) // White for dialogue
            .setOrigin(0, 0.5)
            .setDepth(23);

        dialogueContainer.add([speakerText, dialogueText]);
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;
        dialogueContainer.setDepth(10);

        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => dialogueContainer.destroy()
                    });
                });
            }
        });
    }

    // Trigger chest animation with broom spawn
    triggerChestAnimation(isCorrect) {
        // Add villain aura sprite
        const aura = this.add.sprite(this.width / 2, this.height * 0.8, 'villainAura')
            .setScale(0.5)
            .setAlpha(0).setDepth(2);
        this.sounds.openChest.play();
        // Fade in the aura
        this.tweens.add({
            targets: aura,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Play villain aura animation
                aura.play('villainAura');
                this.time.delayedCall(1000, () => { // Wait 1 second for aura animation
                    // Fade out the aura
                    this.tweens.add({
                        targets: aura,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            aura.destroy();
                            // Add and play chest animation
                            const chest = this.add.sprite(this.width / 2, this.height * 0.8, 'goldChests')
                                .setScale(5).setDepth(2);
                            chest.play('goldChests').setDepth(2);

                            // Wait for chest animation to complete (approx 1 second for 10 frames at 10 fps)
                            this.time.delayedCall(1000, () => {
                                // Spawn broom based on correctness
                                const broomKey = isCorrect ? 'nimbusBroom' : 'brooms';

                                // Create broom at chest position and small initial scale
                                const broom = this.add.image(this.width / 2, this.height * 0.8, broomKey)
                                    .setScale(0.1) // Start with small scale
                                    .setDepth(25);

                                // Store the broom as a class property so it persists
                                this.broom = broom;

                                // Initial scale up
                                const targetScale = 0.4;
                                this.tweens.add({
                                    targets: broom,
                                    scale: targetScale,
                                    duration: 1000,
                                    ease: 'Power2'
                                });

                                // Use your provided code for the vertical movement
                                this.tweens.add({
                                    targets: broom,
                                    y: this.height / 2, // Rise to center of screen
                                    duration: 2000,
                                    ease: 'Quad.easeOut',
                                    onComplete: () => {
                                        // Ensure broom retains final scale
                                        broom.setScale(targetScale);

                                        // After reaching the center, apply the scaling effect
                                        this.vfx.scaleGameObject(
                                            broom,    // GameObject
                                            1.2,      // Amount (as per your parameters)
                                            1000,     // Duration (as per your parameters)
                                            -1        // Repeat infinitely (as per your parameters)
                                        );

                                        // Show final dialogue about the broom
                                        const broomMessage = isCorrect
                                            ? "Here's your Nimbus 2000X Hyperdrive! The fastest broom in the wizarding world!"
                                            : "Well, it's not the best broom, but it'll get you around...";
                                        this.showFeedbackDialogue(broomMessage);
                                        this.scene.start('L1');
                                        this.sound.stopAll();
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            // Trigger quiz after dialogues
            this.showQuiz();
            return;
        }

        const { speaker, text } = this.dialogues[this.dialogueIndex];

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8).setDepth(19);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00) // Yellow color for speaker name
            .setOrigin(0, 0.5).setDepth(19);

        // Create dialogue text with white color
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF) // White color for dialogue text
            .setOrigin(0, 0.5)
            .setDepth(19);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    update() {
        // No need for the scale check here since we're using the scaleGameObject function
        // with proper yoyo effect that will handle the animation continuously
    }
}

class C4 extends Phaser.Scene {
    constructor() {
        super({ key: 'C4' }); // Changed key to match the class name
    }

    preload() {
        this.load.image(
            'hogwartsEntrancess',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Prabal%284%29.png?t=1744314456805'
        );
        this.load.image(
            'harryPottersss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Harry%20Cutscene.png?t=1744298341793'
        );
        this.load.image(
            'mrBeastDumbledores',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/MrBeast.png?t=1744298392619'
        );
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load background music
        this.load.audio(
            'backgroundMusic',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry_potter_95ed8954-cd87-46ec-b11a-9b3cd93130d1.mp3?t=1744301596637'
        );
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        // Set background
        this.bg = this.add.image(this.width / 2, this.height / 2, 'hogwartsEntrancess').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        // Add Harry Potter sprite with pre-set position and scale
        this.harry = this.add.sprite(600, this.height, 'harryPottersss')
            .setScale(0.4)
            .setOrigin(0.5, 1);

        // Add MrBeastDumbledore sprite with pre-set position and scale
        this.mrBeast = this.add.sprite(this.width / 2 + 400, this.height, 'mrBeastDumbledores')
            .setScale(0.5)
            .setOrigin(0.5, 1);

        // Add and play background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        // Initialize dialogue sequence
        this.dialogueIndex = 0;
        this.dialogues = [
            { speaker: 'MrBeast', text: 'HARRY POTTER! You didn’t just win that match\nyou absolutely demolished the multiverse leaderboard!' },
            { speaker: 'MrBeast', text: 'And now… it’s time for the NEXT LEVEL.' },
            { speaker: `${HarryGlobal.child}`, text: 'You mean... there is more?' },
            { speaker: 'MrBeast', text: 'Cue the next challenge!' }
        ];


        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });
        console.log('a')
        this.skipButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('C5');
        });

        // Start the dialogue immediately
        this.showNextDialogue();
    }

    // Function to show next dialogue
    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            // End of cutscene (you can add a transition to another scene here if needed)
            this.scene.start('C5');
            this.sound.stopAll();

            return;
        }

        const { speaker, text } = this.dialogues[this.dialogueIndex];

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00) // Yellow color for speaker name
            .setOrigin(0, 0.5);

        // Create dialogue text with white color
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF) // White color for dialogue text
            .setOrigin(0, 0.5)
            .setDepth(10);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    update() { }
}

class C5 extends Phaser.Scene {
    constructor() {
        super({ key: 'C5' });
    }

    preload() {
        this.load.audio('mrbeast1', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/ElevenLabs_2025-04-16T11_43_46_Grandpa%20Spuds%20Oxley_pvc_sp82_s50_sb23_se0_b_m2_c8362aa8-bf9a-46e8-8ad0-b178c5fe956d.mp3?t=1744803870184');
        this.load.audio('mrbeast2', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/I%E2%80%99m%20Mr.%20Beast%2C%20a%20cooler%20Dumbledore%21_8ddd1356-d0d0-4ce7-81e2-fcf82e682826.mp3?t=1744803826292');
        this.load.audio('mrbeast3', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/One%20of%20your%20friends%20-%20RON%20is%20stuck%20underwater%21_1903d8be-fbf2-4992-9aae-1c2905964d79.mp3?t=1744801030530');
        this.load.audio('mrbeast4', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/To%20save%20them%2C%20you%20must%20dive%20deep%E2%80%94as%20my%20magic%20doesn%E2%80%99t%20work%20underwater_b1e2270d-0cad-4dd9-9aaf-4c91b8b7caa0.mp3?t=174480103197');
        this.load.audio('mrbeast5', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Answer%20this%20quiz%20right%2C%20and%20you%20will%20get%20the%20GillyGlow%20Leaf%21_e6f334b3-8401-47fd-a0d2-acfdb7b3d7cc.mp3?t=1744801031627');
        this.load.image(
            'hogwartsEntrancesss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/firstcutscenebackground.png?t=1744823568107'
        );
        this.load.image(
            'harryPotterssss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Harry%20Cutscene.png?t=1744298341793'
        );
        this.load.image(
            'mrBeastDumbledoress',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/MrBeast.png?t=1744298392619'
        );
        // Load the Hogwarts train image
        this.load.image(
            'greenhogwartsTrain',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/train.png?t=1744796584958'
        );
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load background music
        this.load.audio(
            'backgroundMusic',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry_potter_95ed8954-cd87-46ec-b11a-9b3cd93130d1.mp3?t=1744301596637'
        );
        // Load train sound effect
        this.load.audio(
            'trainSound',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Aboard%20the%20Hogwarts%20Express.%20audio%20atmosphere%20%E2%80%94%20Mozilla%20Firefox%202025-04-10%2014-51-47-%5BAudioTrimmer.com%5D_862149b0-4921-4c65-9913-bd41a964986d.mp3?t=1744277061341'
        );

        // Load chest animation
        this.load.atlas(
            'goldChest',
            'https://files.catbox.moe/vvzwem.png',
            'https://files.catbox.moe/6hqri0.json'
        );

        // Load villain aura spritesheet
        this.load.atlas(
            'villainAura',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/villain_aura.png?t=1744307282860',
            'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/FundSKcOTbqr.json'
        );

        // Load quiz panel image
        this.load.image('quizPanel', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/quizpanel2-removebg-preview.png?t=1744476334311');

        // Load GillyGlow Leaf and Bubble Shield images
        this.load.image('gillyGlowLeaf', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/gillyglowleaf-removebg-preview.png?t=1744316495958');
        this.load.image('bubbleShield', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/soap-bubble-free-vector.png?t=1744316496018');
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        // Set background
        this.bg = this.add.image(this.width / 2, this.height / 2, 'hogwartsEntrancesss').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        this.anims.create({
            key: 'goldChest',
            frames: this.anims.generateFrameNames('goldChest', {
                prefix: 'chest_',
                start: 0,
                end: 9,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0  // Play once
        });

        this.anims.create({
            key: 'villainAura',
            frames: [
                { key: 'villainAura', frame: 'tile000.png' },
                { key: 'villainAura', frame: 'tile001.png' },
                { key: 'villainAura', frame: 'tile002.png' },
                { key: 'villainAura', frame: 'tile003.png' },
                { key: 'villainAura', frame: 'tile004.png' },
                { key: 'villainAura', frame: 'tile005.png' },
                { key: 'villainAura', frame: 'tile006.png' },
                { key: 'villainAura', frame: 'tile007.png' },
                { key: 'villainAura', frame: 'tile008.png' },
                { key: 'villainAura', frame: 'tile009.png' }
            ],
            frameRate: 10,
            repeat: 0  // Play once
        });

        // Add Harry Potter sprite but keep it hidden for now (will appear from train)
        this.harry = this.add.sprite(this.width - 500, this.height * 0.75, 'harryPotterssss')
            .setScale(0.2)
            .setOrigin(0.5, 1)
            .setVisible(false).setFlipX(true);

        // Add MrBeastDumbledore sprite with pre-set position and scale
        this.mrBeast = this.add.sprite(700, this.height * 0.75, 'mrBeastDumbledoress')
            .setScale(0.3)
            .setOrigin(0.5, 1)
            .setVisible(false);

        // Add and play background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
        this.backgroundMusic.play();

        // Add train sound effect
        this.trainSound = this.sound.add('trainSound', { loop: false, volume: 0.7 });

        // Initialize dialogue sequence with updated dialogues and audio timing
        this.dialogueIndex = 0;
        this.dialogues = [
            { speaker: `${HarryGlobal.child}`, text: 'Ouch! Where am I', audioTime: 2000 },
            { speaker: 'MrBeast', text: 'Hey you are at beastwarts!', audioTime: 3000, audioKey: 'mrbeast1' },
            { speaker: `${HarryGlobal.child}`, text: 'Who are you!?', audiotime: 2000 },
            { speaker: 'MrBeast', text: 'I am Mrbeast, the cooler dumbledore', audioTime: 4000, audioKey: 'mrbeast2' },
            { speaker: 'MrBeast', text: 'One of your friends - RON is stuck underwater!', audioTime: 4000, audioKey: 'mrbeast3' },
            { speaker: 'MrBeast', text: 'To save them, you must dive deep as my magic doesnt work underwater', audioTime: 8000, audioKey: 'mrbeast4' },
            { speaker: 'MrBeast', text: 'Answer this quiz right and you will get the gillyglow leaf', audioTime: 5000, audioKey: 'mrbeast5' }
        ];

        // Add Hogwarts train at top left of screen
        this.train = this.add.image(-200, 100, 'greenhogwartsTrain')
            .setScale(0.8)
            .setDepth(5);

        let skipisdone = false;
        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' })
            .setDepth(30); // Make sure it's above everything

        if(!skipisdone)
        {
            skipisdone = true;
            this.skipButton.on('pointerdown', () => {
            // Stop all sounds and animations
            this.sound.stopAll();

            // Clear any existing tweens and timers
            this.tweens.killAll();
            this.time.removeAllEvents();

            // Remove/destroy all dialogue elements and temporary objects
            this.children.each(child => {
                if (child.type === 'Container' ||
                    (child.type === 'BitmapText' && child.parentContainer === null)) {
                    child.destroy();
                }
            });

            // Set up the scene as it should be right before the quiz
            // Stop the train animation and remove the train


            // Make sure Harry and MrBeast are visible and in their final positions
            this.harry.setVisible(true)
                .setPosition(this.width - 700, this.height * 0.75)
                .setFlipX(true);

            this.mrBeast.setVisible(true)
                .setPosition(700, this.height * 0.75);
            if (this.train) {
                this.train.destroy();
            }

            // Jump directly to the quiz
            this.showQuiz();
        });
        }
        else{
            this.skipButton.setVisible(false);
        }
        

        // Start the train animation sequence
        this.startTrainSequence();

        this.initializeQuestionPool();
    }

    startTrainSequence() {
        // Play train sound
        this.trainSound.play();

        // Animate train from top left to center top
        this.tweens.add({
            targets: this.train,
            x: this.width / 2, // Move to center of screen horizontally
            duration: 3000,
            ease: 'Power1',
            onComplete: () => {
                // Train arrival smoke/particles effect
                this.createTrainArrivalEffect();

                // Short pause when train arrives at center
                this.time.delayedCall(500, () => {
                    // Make Harry visible and position him next to the train
                    this.harry.setPosition(this.train.x + 200, this.train.y + 150).setVisible(true);

                    // Animate Harry dropping from train and landing
                    this.tweens.add({
                        targets: this.harry,
                        y: this.height * 0.75, // Harry's final vertical position
                        duration: 1000,
                        ease: 'Bounce.Out', // Bounce effect for landing
                        onComplete: () => {
                            // Start first dialogue (Harry's reaction)
                            this.showNextDialogue();

                            // After a short delay, animate train continuing to the right
                            this.time.delayedCall(3000, () => {
                                // Make MrBeast appear once Harry has landed
                                this.mrBeast.setVisible(true);

                                // Continue train animation to the right
                                this.tweens.add({
                                    targets: this.train,
                                    x: this.width + 400, // Move off screen to the right
                                    duration: 3000,
                                    ease: 'Power1',
                                    onComplete: () => {
                                        this.train.destroy(); // Remove train from scene
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    createTrainArrivalEffect() {
        // Create smoke particles when train arrives
        const particles = this.add.particles(0, 0, 'bubbleShield', {
            x: this.train.x,
            y: this.train.y + 50,
            quantity: 15,
            scale: { start: 0.1, end: 0.3 },
            speed: { min: 50, max: 100 },
            alpha: { start: 0.7, end: 0 },
            lifespan: 2000,
            blendMode: 'ADD',
            tint: 0xcccccc // Light gray color for smoke
        });

        // Auto-destroy particles after 2 seconds
        this.time.delayedCall(2000, () => {
            particles.destroy();
        });
    }

    initializeQuestionPool() {
        this.questionPool = initQuistion(HarryGlobal.child);

        this.askedQuestions = []; // Track asked questions
    }

    // Function to get a new unasked question
    getNewQuestion() {
        if (this.questionPool.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.questionPool.length);
        const question = this.questionPool.splice(randomIndex, 1)[0];
        askedQuestions.push(question);
        return question;
    }

    // Quiz function
    showQuiz() {
        this.skipButton.destroy();
        // Create black transparent overlay
        const overlay = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.7)
            .setOrigin(0.5)
            .setDepth(20);

        // Add quiz panel image
        const quizPanel = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
            .setScale(2.4)
            .setDepth(21);

        // Get a new question
        const currentQuestion = this.getNewQuestion();
        if (!currentQuestion) {
            console.log('No more questions available!');
            return;
        }

        // Add question text on the yellow part
        const questionText = this.add.bitmapText(this.width / 2, this.height / 2 - 100, 'pixelfont', currentQuestion.question, 40)
            .setOrigin(0.5)
            .setTint(0xFF0000) // Red text for contrast on yellow
            .setDepth(22);

        // Arrange options in a 2x2 grid
        const optionXPositions = [this.width / 2 - 250, this.width / 2 + 250]; // Two columns
        const optionYPositions = [this.height / 2 + 30, this.height / 2 + 160]; // Two rows
        const optionTexts = [];
        currentQuestion.options.forEach((option, index) => {
            const row = Math.floor(index / 2);
            const col = index % 2;
            const optionText = this.add.bitmapText(optionXPositions[col], optionYPositions[row], 'pixelfont', option, 30)
                .setOrigin(0.5)
                .setTint(0xFFFFFF) // Initial white text
                .setDepth(22)
                .setInteractive()
                .on('pointerover', () => this.input.setDefaultCursor('pointer'))
                .on('pointerout', () => this.input.setDefaultCursor('default'));
            optionTexts.push(optionText);
        });

        // Add interactivity
        this.input.on('pointerdown', (pointer) => {
            const clickedOption = currentQuestion.options.find((_, index) => {
                const row = Math.floor(index / 2);
                const col = index % 2;
                const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, optionXPositions[col], optionYPositions[row]);
                return dist < 50; // Rough click area
            });
            if (clickedOption) {
                // Color the clicked option based on correctness
                const clickedIndex = currentQuestion.options.indexOf(clickedOption);
                const row = Math.floor(clickedIndex / 2);
                const col = clickedIndex % 2;
                const selectedText = optionTexts[clickedIndex];
                selectedText.setTint(clickedOption === currentQuestion.correctAnswer ? 0x00FF00 : 0xFF0000);

                // Show MrBeast dialogue
                const feedbackDialogue = clickedOption === currentQuestion.correctAnswer
                    ? "Correct! You've earned the GillyGlow Leaf!"
                    : "Wrong! You've earned a Bubble Shield instead!";
                this.showFeedbackDialogue(feedbackDialogue, 3000);

                // Delay to allow dialogue to be read, then trigger animation
                this.time.delayedCall(1000, () => {
                    overlay.destroy();
                    quizPanel.destroy();
                    questionText.destroy();
                    optionTexts.forEach(text => text.destroy());
                    if (clickedOption === currentQuestion.correctAnswer) {
                        this.triggerChestAnimation(true); // Trigger chest animation with GillyGlow Leaf
                    } else {
                        this.triggerChestAnimation(false); // Trigger chest animation with Bubble Shield
                    }
                });
            }
        });
    }

    // Function to show feedback dialogue with custom time
    showFeedbackDialogue(text, audioTime = 3000) {
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', 'MrBeast: ', 30)
            .setTint(0xFFFF00)
            .setOrigin(0, 0.5);

        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF)
            .setOrigin(0, 0.5)
            .setDepth(23);

        dialogueContainer.add([speakerText, dialogueText]);
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;
        dialogueContainer.setDepth(10);

        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(audioTime, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => dialogueContainer.destroy()
                    });
                });
            }
        });
    }

    // Trigger chest animation with villain aura and power-up emergence
    triggerChestAnimation(isCorrect) {
        // Add villain aura sprite
        const aura = this.add.sprite(this.width / 2, this.height * 0.7, 'villainAura')
            .setScale(0.5)
            .setAlpha(0);

        // Fade in the aura
        this.tweens.add({
            targets: aura,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Play villain aura animation
                aura.play('villainAura');
                this.time.delayedCall(1000, () => { // Wait 1 second for aura animation
                    // Fade out the aura
                    this.tweens.add({
                        targets: aura,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            aura.destroy();
                            // Add and play chest animation
                            const chest = this.add.sprite(this.width / 2, this.height * 0.7, 'goldChest')
                                .setScale(5);
                            chest.play('goldChest');

                            // Wait for chest animation to complete (approx 1 second for 10 frames at 10 fps)
                            this.time.delayedCall(1000, () => {
                                // Spawn power-up based on correctness
                                const powerUpKey = isCorrect ? 'gillyGlowLeaf' : 'bubbleShield';
                                if (powerUpKey === 'bubbleShield') {
                                    HarryGlobal.maxO2 = 25;
                                } else {
                                    HarryGlobal.maxO2 = 40;
                                }

                                // Create power-up at chest position with small initial scale
                                const powerUp = this.add.image(this.width / 2, this.height * 0.6, powerUpKey)
                                    .setScale(0.1) // Start with small scale
                                    .setDepth(25);

                                // Store the power-up as a class property so it persists
                                this.powerUp = powerUp;

                                // Initial scale up
                                const targetScale = 0.4;
                                this.tweens.add({
                                    targets: powerUp,
                                    scale: targetScale,
                                    duration: 1000,
                                    ease: 'Power2'
                                });

                                // Vertical movement to center of screen
                                this.tweens.add({
                                    targets: powerUp,
                                    y: this.height / 2, // Rise to center of screen
                                    duration: 2000,
                                    ease: 'Quad.easeOut',
                                    onComplete: () => {
                                        // Ensure power-up retains final scale
                                        powerUp.setScale(targetScale);

                                        // Apply scaling effect (mimicking vfx.scaleGameObject)
                                        this.tweens.add({
                                            targets: powerUp,
                                            scaleX: 1.2 * targetScale,
                                            scaleY: 1.2 * targetScale,
                                            duration: 1000,
                                            yoyo: true,
                                            repeat: -1
                                        });

                                        // Show final dialogue about the power-up
                                        const powerUpMessage = isCorrect
                                            ? "Here's your GillyGlow Leaf! Dive in and save your friend!"
                                            : "You got a Bubble Shield! You're safe from harm for 10 seconds!";
                                        this.showFeedbackDialogue(powerUpMessage, 3000);
                                        this.sound.stopAll();
                                        this.scene.start("L2")
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    // Function to show next dialogue with specific audio timing
    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            // Trigger quiz after dialogues
            this.showQuiz();
            return;
        }

        const { speaker, text, audioTime, audioKey } = this.dialogues[this.dialogueIndex];
        if (speaker === 'MrBeast' && audioKey) {
            const voiceLine = this.sound.add(audioKey, { volume: 1 });
            voiceLine.play();
        }

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00)
            .setOrigin(0, 0.5);

        // Create dialogue text with white color
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF)
            .setOrigin(0, 0.5)
            .setDepth(10);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Use the specific audioTime for each dialogue
                this.time.delayedCall(audioTime, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    update() { }
}

class C6 extends Phaser.Scene {
    constructor() {
        super({ key: 'C6' }); // Changed key to match the class name
    }

    preload() {
        this.load.image(
            'hogwartsEntrancessss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Copy_of_Prabal.png?t=1744818183987'
        );
        this.load.image(
            'harryPottersssss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Harry%20Cutscene.png?t=1744298341793'
        );
        this.load.image(
            'mrBeastDumbledoresss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/MrBeast.png?t=1744298392619'
        );
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load background music
        this.load.audio(
            'backgroundMusic',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry_potter_95ed8954-cd87-46ec-b11a-9b3cd93130d1.mp3?t=1744301596637'
        );

        this.load.audio('mrbeast_congrats', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/ElevenLabs_2025-04-16T12_42_22_Grandpa%20Spuds%20Oxley_pvc_sp82_s50_sb23_se0_b_m2_ecda66df-d03b-4606-b017-0309390b2533.mp3?t=1744807393168');
        this.load.audio('mrbeast_adventure', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/You%20swam%20deep...%20now%20your%20Beastverse%20adventure%20is%20complete%21_81447f26-8d06-4e4f-82a2-270cb851c281.mp3?t=1744805069180');
        this.load.audio('mrbeast_special', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Not%20yet...%20someone%20special%20wants%20to%20meet%20you._4e1d2c16-df9c-45d9-8569-a421a56d5be1.mp3?t=1744805068238');
        this.load.audio('mrbeast_waiting', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/He%20has%20been%20waiting%20a%20long%20time%2C%20just%20for%20you..._3146f383-1eee-458f-a4f3-371fec5d80b5.mp3?t=1744805068768');
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        // Set background
        this.bg = this.add.image(this.width / 2, this.height / 2, 'hogwartsEntrancessss').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });
        
        this.skipButton.on('pointerdown', () => {
            // Stop all sounds including any playing voice lines
            this.sound.stopAll();

            // Kill any active tweens and pending events
            this.tweens.killAll();
            this.time.removeAllEvents();

            // Start the next scene
            this.scene.start('L3');
        });


        // Add Harry Potter sprite with pre-set position and scale
        this.harry = this.add.sprite(600, this.height, 'harryPottersssss')
            .setScale(0.4)
            .setOrigin(0.5, 1).setVisible(false);

        // Add MrBeastDumbledore sprite with pre-set position and scale
        this.mrBeast = this.add.sprite(this.width / 2 + 400, this.height, 'mrBeastDumbledoresss')
            .setScale(0.5)
            .setOrigin(0.5, 1).setVisible(false);

        // Add and play background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        // Initialize dialogue sequence
        this.dialogueIndex = 0;
        this.dialogues = [
            { speaker: 'MrBeast', text: `I cant believe it..you did it!`, audioKey: 'mrbeast_congrats', audioTime: 3000 },
            { speaker: 'MrBeast', text: 'You swam deep... now your Beastverse adventure is complete.', audioKey: 'mrbeast_adventure', audioTime: 7000 },
            { speaker: `${HarryGlobal.child}`, text: 'Wait what? That is it?' },
            { speaker: 'MrBeast', text: 'Not yet... someone special wants to meet you.', audioKey: 'mrbeast_special', audioTime: 4000 },
            { speaker: 'MrBeast', text: 'He has been waiting a long time, just for you.', audioKey: 'mrbeast_waiting', audioTime: 5000 }
        ];

        // Start the dialogue immediately
        this.showNextDialogue();
    }

    // Function to show next dialogue
    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            // End of cutscene
            this.scene.start("L3");
            this.sound.stopAll();
            return;
        }

        const { speaker, text, audioKey, audioTime = 3000 } = this.dialogues[this.dialogueIndex];

        // Play audio if it's MrBeast speaking and there's an audio key
        let voiceLine;
        if (speaker === 'MrBeast' && audioKey) {
            voiceLine = this.sound.add(audioKey, { volume: 1 });
            voiceLine.play();
        }

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00)
            .setOrigin(0, 0.5);

        // Create dialogue text with white color
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF)
            .setOrigin(0, 0.5)
            .setDepth(10);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Use the specific audioTime if provided, otherwise default to 3000ms
                this.time.delayedCall(audioTime, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    update() { }
}

class C7 extends Phaser.Scene {
    constructor() {
        super({ key: 'C7' }); // Key matches the class name
    }

    preload() {
        this.load.audio('elon_brooms', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/I%27m%20Professor%20Musk.%20Brooms%20here%20are%20faster%20than%20rockets_4265348c-aa1f-4fba-9dba-bb76c94d8621.mp3?t=1744814374606');
        this.load.audio('elon_dungeon', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Welcome%20to%20the%20Dungeon%20of%20Alchemy.%20You%20are%20late_c8cf332e-f3a7-4578-91bd-b194ff6d4cb8.mp3?t=1744814374385');
        this.load.audio('elon_ingredients', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/I%20need%20a%20rare%20magic%20potion%20.%20Its%20guarded%20by%20the%20three-headed%20dragon._a1d509f3-c0bd-4bf8-a495-a6796b03be97.mp3?t=1744814374492');
        this.load.audio('elon_dontdie', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Bring%20it%20to%20me%20back%20And%20try%20not%20to%20die_ec98bb58-62ab-4a89-96d9-a0bd01760447.mp3?t=1744814373489');
        this.load.image(
            'hogwartsEntrancesssss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Prabal%286%29.png?t=1744317537197'
        );
        this.load.image(
            'harryPotterssssss',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Harry%20Cutscene.png?t=1744298341793'
        );
        this.load.image(
            'elon',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Elon.png?t=1744317614994'
        );
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load background music
        this.load.audio(
            'backgroundMusic',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry_potter_95ed8954-cd87-46ec-b11a-9b3cd93130d1.mp3?t=1744301596637'
        );

        // Load villain aura spritesheet
        this.load.atlas(
            'villainAura',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/villain_aura.png?t=1744307282860',
            'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/FundSKcOTbqr.json'
        );

        this.load.image('skipButton', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/jtNP30spHXlWUqGm/assets/images/newAsset_19.png?t=1741941007028');

        // Load the orange light image
        this.load.image('orangeLight', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/orange-starburst-lights-isolated-on-transparent-background-file-png.png?t=1744319158230'); // Replace with actual base64 or URL of the uploaded image
        displayProgressLoader.call(this);
    }

    create() {
        this.vfx = new VFXLibrary(this);
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.initializeQuestionPool();
        // Set background
        this.bg = this.add.image(this.width / 2, this.height / 2, 'hogwartsEntrancesssss').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        

        // Add Harry Potter sprite with pre-set position and scale
        this.harry = this.add.sprite(600, this.height, 'harryPotterssssss')
            .setScale(0.5)
            .setOrigin(0.5, 1)
            .setVisible(true);

        // Add Elon sprite (initially invisible)
        this.elon = this.add.sprite(this.width / 2 + 400, this.height, 'elon')
            .setScale(0.7)
            .setOrigin(0.5, 1)
            .setVisible(false);

        // Add and play background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();
        this.dialogueIndex = 0;
        this.dialogues = [
            { speaker: `${HarryGlobal.child}`, text: 'Uh, who are you?' },
            { speaker: 'Elon', text: "I'm Professor Musk. Brooms here are faster than rockets!", audioKey: 'elon_brooms', audioTime: 3000 },
            { speaker: 'Elon', text: 'Welcome to the Dungeon of Alchemy. You are late.', audioKey: 'elon_dungeon', audioTime: 2000 },
            { speaker: 'Elon', text: 'I need a rare magic potion, its guarded by three headed dragon.', audioKey: 'elon_ingredients', audioTime: 4000 },
            { speaker: `${HarryGlobal.child}`, text: 'Oh my god dragons...' },
            { speaker: 'Elon', text: 'Bring them back. And try not to die.', audioKey: 'elon_dontdie', audioTime: 2000 }
        ];

        let skipisdone = false;

        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButton')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });

        if(!skipisdone){
            this.skipButton.on('pointerdown', () => {
            // Stop all sounds and animations
            this.sound.stopAll();

            // Clear any existing tweens and timers
            this.tweens.killAll();
            this.time.removeAllEvents();

            // Remove/destroy all dialogue elements and temporary objects
            this.children.each(child => {
                if (child.type === 'Container' ||
                    (child.type === 'BitmapText' && child.parentContainer === null)) {
                    child.destroy();
                }
            });

            // Set up the scene as it should be right before the quiz
            // Stop the train animation and remove the train


            // Make sure Harry and MrBeast are visible and in their final positions
            this.harry.setVisible(true);

            this.elon.setVisible(true);
            if (this.train) {
                this.train.destroy();
            }

            // Jump directly to the quiz
            this.showQuiz();
        });
        }
        else{
            this.skipButton.setVisible(false);
        }

        
        

        // Create villain aura animation
        this.anims.create({
            key: 'villainAura',
            frames: [
                { key: 'villainAura', frame: 'tile000.png' },
                { key: 'villainAura', frame: 'tile001.png' },
                { key: 'villainAura', frame: 'tile002.png' },
                { key: 'villainAura', frame: 'tile003.png' },
                { key: 'villainAura', frame: 'tile004.png' },
                { key: 'villainAura', frame: 'tile005.png' },
                { key: 'villainAura', frame: 'tile006.png' },
                { key: 'villainAura', frame: 'tile007.png' },
                { key: 'villainAura', frame: 'tile008.png' },
                { key: 'villainAura', frame: 'tile009.png' }
            ],
            frameRate: 10,
            repeat: 0  // Play once
        });

        // Start the villain aura animation and Elon appearance
        this.startSceneAnimation();
    }

    // Function to start the scene with villain aura and Elon appearance
    startSceneAnimation() {
        // Add villain aura sprite
        const aura = this.add.sprite(this.width / 2 + 400, this.height, 'villainAura')
            .setScale(2)
            .setAlpha(0);

        // Fade in the aura
        this.tweens.add({
            targets: aura,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Play villain aura animation
                aura.play('villainAura');
                this.time.delayedCall(1000, () => { // Wait 1 second for aura animation
                    // Fade out the aura
                    this.tweens.add({
                        targets: aura,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            aura.destroy();
                            // Fade in Elon after aura
                            this.elon.setVisible(true);
                            this.tweens.add({
                                targets: this.elon,
                                alpha: 1,
                                duration: 500,
                                ease: 'Power2',
                                onComplete: () => {
                                    // Start the dialogue session
                                    this.dialogueIndex = 0;
                                    this.showNextDialogue();
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    // Function to show next dialogue
    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            // End of cutscene, add pitch-black overlay and glow effect
            this.showQuiz();
            this.createDoorOverlayAndGlow();
            return;
        }

        const { speaker, text, audioKey, audioTime = 3000 } = this.dialogues[this.dialogueIndex];

        // Play audio if it's Elon speaking and there's an audio key
        let voiceLine;
        if (speaker === 'Elon' && audioKey) {
            voiceLine = this.sound.add(audioKey, { volume: 1 });
            voiceLine.play();
        }

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00)
            .setOrigin(0, 0.5);

        // Create dialogue text with white color
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF)
            .setOrigin(0, 0.5)
            .setDepth(10);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Use the specific audioTime if provided, otherwise default to 3000ms
                this.time.delayedCall(audioTime, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    initializeQuestionPool() {
        this.questionPool = initQuistion(HarryGlobal.child);

        this.askedQuestions = []; // Track asked questions
    }

    // Function to get a new unasked question
    getNewQuestion() {
        if (this.questionPool.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.questionPool.length);
        const question = this.questionPool.splice(randomIndex, 1)[0];
        this.askedQuestions.push(question);
        return question;
    }

    // Quiz function
    showQuiz() {
        this.skipButton.destroy();
        this.elon.setVisible(true);
        // Create black transparent overlay
        const overlay = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.7)
            .setOrigin(0.5)
            .setDepth(20);

        // Add quiz panel image
        const quizPanel = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
            .setScale(2.4)
            .setDepth(21);

        // Get a new question
        const currentQuestion = this.getNewQuestion();
        if (!currentQuestion) {
            console.log('No more questions available!');
            return;
        }

        // Add question text on the yellow part
        const questionText = this.add.bitmapText(this.width / 2, this.height / 2 - 100, 'pixelfont', currentQuestion.question, 40)
            .setOrigin(0.5)
            .setTint(0xFF0000) // Red text for contrast on yellow
            .setDepth(22);

        // Arrange options in a 2x2 grid
        const optionXPositions = [this.width / 2 - 250, this.width / 2 + 250]; // Two columns
        const optionYPositions = [this.height / 2 + 30, this.height / 2 + 160]; // Two rows
        const optionTexts = [];
        currentQuestion.options.forEach((option, index) => {
            const row = Math.floor(index / 2);
            const col = index % 2;
            const optionText = this.add.bitmapText(optionXPositions[col], optionYPositions[row], 'pixelfont', option, 30)
                .setOrigin(0.5)
                .setTint(0xFFFFFF) // Initial white text
                .setDepth(22)
                .setInteractive()
                .on('pointerover', () => this.input.setDefaultCursor('pointer'))
                .on('pointerout', () => this.input.setDefaultCursor('default'));
            optionTexts.push(optionText);
        });

        // Add interactivity
        this.input.on('pointerdown', (pointer) => {
            const clickedOption = currentQuestion.options.find((_, index) => {
                const row = Math.floor(index / 2);
                const col = index % 2;
                const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, optionXPositions[col], optionYPositions[row]);
                return dist < 50; // Rough click area
            });
            if (clickedOption) {
                // Color the clicked option based on correctness
                const clickedIndex = currentQuestion.options.indexOf(clickedOption);
                const row = Math.floor(clickedIndex / 2);
                const col = clickedIndex % 2;
                const selectedText = optionTexts[clickedIndex];
                selectedText.setTint(clickedOption === currentQuestion.correctAnswer ? 0x00FF00 : 0xFF0000);
                console.log("quiz set")
                // Show MrBeast dialogue
                const feedbackDialogue = clickedOption === currentQuestion.correctAnswer
                    ? "Correct! You've earned the Invisible Cloak!"
                    : "Wrong! You've earned a Small Invisible Boot instead!";
                this.showFeedbackDialogue(feedbackDialogue, 3000);
                console.log("feedback")

                // Delay to allow dialogue to be read, then trigger animation
                this.time.delayedCall(1000, () => {
                    overlay.destroy();
                    quizPanel.destroy();
                    questionText.destroy();
                    optionTexts.forEach(text => text.destroy());
                    if (clickedOption === currentQuestion.correctAnswer) {
                        this.triggerChestAnimation(true); // Trigger chest animation with GillyGlow Leaf
                    } else {
                        this.triggerChestAnimation(false); // Trigger chest animation with Bubble Shield
                    }
                });
            }
        });
    }

    // Function to show feedback dialogue with custom time
    showFeedbackDialogue(text, audioTime = 3000) {
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', 'Prof Musk: ', 30)
            .setTint(0xFFFF00)
            .setOrigin(0, 0.5);

        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF)
            .setOrigin(0, 0.5)
            .setDepth(23);

        dialogueContainer.add([speakerText, dialogueText]);
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;
        dialogueContainer.setDepth(10);
        console.log('a')
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(audioTime, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => dialogueContainer.destroy()
                    });
                });
            }
        });
        console.log('a')

    }


    // Trigger chest animation with villain aura and power-up emergence
    triggerChestAnimation(isCorrect) {
        // Add villain aura sprite
        const aura = this.add.sprite(this.width / 2, this.height * 0.9, 'villainAura')
            .setScale(0.5)
            .setAlpha(0);

        // Fade in the aura
        this.tweens.add({
            targets: aura,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Play villain aura animation
                aura.play('villainAura');
                this.time.delayedCall(1000, () => { // Wait 1 second for aura animation
                    // Fade out the aura
                    this.tweens.add({
                        targets: aura,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            aura.destroy();
                            // Add and play chest animation
                            const chest = this.add.sprite(this.width / 2, this.height * 0.9, 'goldChest')
                                .setScale(5);
                            chest.play('goldChest');

                            // Wait for chest animation to complete (approx 1 second for 10 frames at 10 fps)
                            this.time.delayedCall(1000, () => {
                                // Spawn power-up based on correctness
                                const powerUpKey = isCorrect ? 'cloakInvi' : 'boot';
                                if (powerUpKey === 'cloakInvi') {
                                    HarryGlobal.cloakTimeMax = 10000;
                                    HarryGlobal.cloakName = 'clok'
                                } else {
                                    HarryGlobal.cloakTimeMax = 5000;
                                    HarryGlobal.cloakName = 'boot'
                                }

                                // Create power-up at chest position with small initial scale
                                const powerUp = this.add.image(this.width / 2, this.height * 0.6, powerUpKey)
                                    .setScale(0.1) // Start with small scale
                                    .setDepth(25);

                                // Store the power-up as a class property so it persists
                                this.powerUp = powerUp;

                                // Initial scale up
                                const targetScale = 0.6;

                                this.tweens.add({
                                    targets: powerUp,
                                    scale: targetScale,
                                    duration: 1000,
                                    ease: 'Power2'
                                });

                                // Vertical movement to center of screen
                                this.tweens.add({
                                    targets: powerUp,
                                    y: this.height / 2, // Rise to center of screen
                                    duration: 2000,
                                    ease: 'Quad.easeOut',
                                    onComplete: () => {
                                        // Ensure power-up retains final scale
                                        powerUp.setScale(targetScale);

                                        // Apply scaling effect (mimicking vfx.scaleGameObject)
                                        this.tweens.add({
                                            targets: powerUp,
                                            scaleX: 1.2 * targetScale,
                                            scaleY: 1.2 * targetScale,
                                            duration: 1000,
                                            yoyo: true,
                                            repeat: -1
                                        });

                                        this.tweens.add({
                                            targets: powerUp,
                                            scaleX: 1.2 * targetScale,
                                            scaleY: 1.2 * targetScale,
                                            duration: 1000,
                                            yoyo: true,
                                            repeat: -1
                                        });

                                        // Show final dialogue about the power-up
                                        const powerUpMessage = isCorrect
                                            ? "Here's your GillyGlow Leaf! Dive in and save your friend!"
                                            : "You got a Bubble Shield! You're safe from harm for 10 seconds!";
                                        this.showFeedbackDialogue(powerUpMessage, 3000);
                                        this.sound.stopAll();
                                        this.scene.start('L3', { fromCutscene: true });
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    // Function to create pitch-black overlay and glow effect on the door
    createDoorOverlayAndGlow() {
        // Create pitch-black rectangular overlay centered in the scene
        const overlayWidth = 380; // Adjust width to cover the door
        const overlayHeight = 700; // Adjust height to cover the door
        const overlay = this.add.graphics()
            .fillStyle(0x000000, 1) // Pitch black
            .fillRect(this.width / 2 - overlayWidth / 2, this.height / 2 - overlayHeight / 2, overlayWidth, overlayHeight)
            .setDepth(19);

        // Use the orange light image instead of a generated circle
        const glowSprite = this.add.sprite(this.width / 2, this.height / 2, 'orangeLight')
            .setScale(0.5) // Initial scale (adjust based on image size)
            .setDepth(20);

        // Apply scaling effect using scaleGameObject
        this.vfx.scaleGameObject(glowSprite, 3, 1500, -1); // Scale up to 1.5x original size, loop indefinitely

        // Apply clockwise rotation using rotateGameObject
        this.vfx.rotateGameObject(glowSprite, 5000, 360, 0); // Rotate 360 degrees once over 5 seconds

        // Optional: Add a shine effect for extra dynamism
        //this.vfx.addShine(glowSprite, 2000, 0.7); // Sweeping shine effect

        // Wait 3 seconds then return to L3
        // Wait 3 seconds then return to L3
        this.time.delayedCall(3000, () => {
            // Stop any playing music and voice lines before transitioning back
            this.sound.stopAll();

            this.scene.start('L3', { fromCutscene: true });
        });
    }
    update() { }
}

class C8 extends Phaser.Scene {
    constructor() {
        super({ key: 'C8' }); // Key matches the class name
    }

    preload() {
        // Load Elon's voice lines
        this.load.audio('elon-dialogue1', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Looks%20good.%20Nice%20work_181c7958-f768-46d1-9b9b-17ced882cece.mp3?t=1744815860349');
        this.load.audio('elon-dialogue2', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/You%20are%20done%20here%20Back%20to%20Beastwarts_bc8b08d5-4b19-4af6-9b54-f816bb3b0306.mp3?t=1744815860265');
        this.load.audio('elon-dialogue3', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/And%20maybe%20don%E2%80%99t%20let%20the%20dragons%20escape%20next%20time_e47fdd43-23bd-43d0-879a-2ff751332b15.mp3?t=1744815860125');

        this.load.image(
            'goFinal',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Prabal%288%29.png?t=1744354884012'
        );
        this.load.image(
            'harryPoter',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Harry%20Cutscene.png?t=1744298341793'
        );
        this.load.image(
            'eln',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Elon.png?t=1744317614994'
        );
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load background music
        this.load.audio(
            'backgroundMusic',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry_potter_95ed8954-cd87-46ec-b11a-9b3cd93130d1.mp3?t=1744301596637'
        );
        // Load portal sound
        this.load.audio(
            'portalSound',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/sci-fi-portal-83746_fbf27acc-78a6-4f10-aea5-ce3874223be6.mp3?t=1744355808834' // Replace with actual portal sound URL
        );

        // Load portal spritesheet
        this.load.atlas(
            'portal',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/spritesheet%289%29.png?t=1744355339281',
            'https://aicade-ui-assets.s3.amazonaws.com/bigSmoke/games/portal/history/json/o5YbwnGvTdaU.json'
        );
        displayProgressLoader.call(this);
    }

    create() {
        this.vfx = new VFXLibrary(this);
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        // Set background
        this.bg = this.add.image(this.width / 2, this.height / 2, 'goFinal').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);
        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });

        this.skipButton.on('pointerdown', () => {
            // Stop all sounds including any playing voice lines
            this.sound.stopAll();

            // Kill any active tweens and pending events
            this.tweens.killAll();
            this.time.removeAllEvents();

            // Start the next scene
            this.scene.start('C10');
        });

        // Add Harry Potter sprite with pre-set position and scale
        this.harry = this.add.sprite(600, this.height, 'harryPoter')
            .setScale(0.5)
            .setOrigin(0.5, 1)
            .setVisible(true)
            .setAlpha(0); // Start invisible for fade-in

        // Add Elon sprite with pre-set position and scale
        this.elon = this.add.sprite(this.width / 2 + 400, this.height, 'eln')
            .setScale(0.7)
            .setOrigin(0.5, 1)
            .setVisible(true)
            .setAlpha(0); // Start invisible for fade-in

        // Fade in both characters
        this.tweens.add({
            targets: [this.harry, this.elon],
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Add and play background music
                this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
                this.backgroundMusic.play();
                this.dialogueIndex = 0;
                this.dialogues = [
                    { speaker: `${HarryGlobal.child}`, text: 'The potion is ready!' },
                    { speaker: 'Elon', text: 'Looks good. Nice work.', audioKey: 'elon-dialogue1', audioTime: 1000 },
                    { speaker: 'Elon', text: 'You are done here. Back to Beastwarts!', audioKey: 'elon-dialogue2', audioTime: 2000 },
                    { speaker: 'Elon', text: "And maybe don't let the dragons escape next time.", audioKey: 'elon-dialogue3', audioTime: 2000 }
                ];

                this.showNextDialogue();
            }
        });

        // Create portal animation with full image file names
        this.anims.create({
            key: 'portalAnim',
            frames: [
                { key: 'portal', frame: 'image_0(13).png' },
                { key: 'portal', frame: 'image_1(13).png' },
                { key: 'portal', frame: 'image_2(9).png' },
                { key: 'portal', frame: 'image_3(6).png' },
                { key: 'portal', frame: 'image_4(7).png' },
                { key: 'portal', frame: 'image_5(4).png' }
            ],
            frameRate: 10,
            repeat: -1 // Loop indefinitely
        });
    }

    // Function to show next dialogue
    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            // End of dialogue, create portal and trigger effects
            this.createPortalAndMoveHarry();
            return;
        }

        const { speaker, text, audioKey, audioTime = 3000 } = this.dialogues[this.dialogueIndex];

        // Play audio if it's Elon speaking and there's an audio key
        let voiceLine;
        if (speaker === 'Elon' && audioKey) {
            voiceLine = this.sound.add(audioKey, { volume: 1 });
            voiceLine.play();
        }

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00) // Yellow color for speaker name
            .setOrigin(0, 0.5);

        // Create dialogue text with white color
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF) // White color for dialogue text
            .setOrigin(0, 0.5)
            .setDepth(10);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Use the specific audioTime if provided, otherwise default to 3000ms
                this.time.delayedCall(audioTime, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    // Function to create portal, move Harry, apply thunder effect, make Harry disappear, and fade out screen
    createPortalAndMoveHarry() {
        // Create portal sprite on the right side
        const portalX = this.width - 200; // Position near the right edge
        const portal = this.add.sprite(portalX, this.height / 2, 'portal')
            .setScale(10)
            .setAlpha(0);

        // Fade in the portal
        this.tweens.add({
            targets: portal,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Play portal sound
                this.portalSound = this.sound.add('portalSound', { loop: true });
                this.portalSound.play();

                // Play portal animation
                portal.play('portalAnim');

                // Move Harry toward the portal
                this.tweens.add({
                    targets: this.harry,
                    x: portalX,
                    //y: this.height / 2, // Align with portal center
                    duration: 2000,
                    ease: 'Linear',
                    onComplete: () => {
                        // Create thunder effect (flashy screen effect) after Harry reaches portal
                        const thunderOverlay = this.add.graphics()
                            .fillStyle(0xFFFFFF, 0.8) // Bright white for thunder effect
                            .fillRect(0, 0, this.width, this.height)
                            .setDepth(100);

                        this.vfx.shakeCamera(500, 0.02); // Shake camera for 0.5 seconds
                        this.vfx.blinkEffect(thunderOverlay, 200, 3); // Blink effect 3 times

                        // After thunder effect, make Harry disappear
                        this.time.delayedCall(1000, () => {
                            this.tweens.add({
                                targets: this.harry,
                                alpha: 0,
                                duration: 500,
                                ease: 'Power2',
                                onComplete: () => {
                                    this.harry.destroy(); // Remove Harry from scene
                                    this.portalSound.stop(); // Stop portal sound when Harry disappears
                                    // Fade out the entire screen
                                    this.backgroundMusic.stop();
                                    // In your createPortalAndMoveHarry function where you transition to the next scene:
                                    this.cameras.main.fadeOut(2000, 0, 0, 0, (camera, progress) => {
                                        if (progress === 1) {
                                            // Scene fully faded out
                                            this.scene.start('C10'); // Replace with your next scene or logic
                                            this.sound.stopAll(); // This will stop all audio including dialogue and background music
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    update() { }
}

class C9 extends Phaser.Scene {
    constructor() {
        super({ key: 'C9' });
    }

    preload() {
        // Load MrBeast voice lines
        this.load.audio('mrbeast_great_job', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Great%20job%21%20You%20really%20are%20the%20chosen%20one._40630351-91db-4146-b0a6-9891831c7055.mp3?t=1744816341405');
        this.load.audio('mrbeast_bye', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Bye%21%20Take%20care%21_5130f1e3-fd70-4e0f-aac2-1a3f1023c4d6.mp3?t=1744816341225');

        // Load Elon voice lines
        this.load.audio('elon_well_done', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/You%20did%20well%2C%20Potter_e00dda6f-6817-4d1c-8f7a-2797fd918c3d.mp3?t=1744816341036');
        this.load.audio('elon_try_not_die', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Try%20not%20to%20die%20on%20the%20way._49ec18ce-f42b-44ad-a875-a993556737c7.mp3?t=1744816341320');
        this.load.image('backgroundss', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/PLATFORM_934.png?t=1744269876539');
        this.load.image('hogwartsTrains', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/2d_sprite_of_the_iconic_hogwarts_express_train_facing_right_detailed-2025-04-09-174321-removebg-preview.png?t=1744269873455');
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        this.load.atlas('harryPotter', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/spritesheet%288%29.png?t=1744280112820', 'https://aicade-ui-assets.s3.amazonaws.com/bigsmoke/games/harrypotterwalk/history/json/LAVngqd7hXIT.json');
        this.load.audio('trainWhistle', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/SKYWALKER%2C_TRAIN_-_HOGWARTS_EXPRESS_WHISTLE_de47c9d2-9e18-4b23-8075-fcdc56ec67b8.mp3?t=1744276845169');
        this.load.audio('trainRunning', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Aboard%20the%20Hogwarts%20Express.%20audio%20atmosphere%20%E2%80%94%20Mozilla%20Firefox%202025-04-10%2014-51-47-%5BAudioTrimmer.com%5D_862149b0-4921-4c65-9913-bd41a964986d.mp3?t=1744277061341');
        this.load.image('mrBeastDumbledore', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/MrBeast.png?t=1744298392619');
        this.load.image('elon', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Elon.png?t=1744317614994');
        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.vfx = new VFXLibrary(this);

        // Background
        this.bg = this.add.image(this.width / 2, this.height / 2, 'backgroundss').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        // Sounds
        this.sounds = {
            whistle: this.sound.add('trainWhistle', { volume: 0.9 }),
            running: this.sound.add('trainRunning', { volume: 0.5, loop: true })
        };

        // Characters on platform
        this.harryPotter = this.add.sprite(this.width / 2, this.height * 0.9, 'harryPotter').setScale(6).setOrigin(0.5, 1);
        this.mrBeastDumbledore = this.add.image(this.width / 2 - 200, this.height * 0.9, 'mrBeastDumbledore').setScale(0.5).setOrigin(0.5, 1);
        this.elon = this.add.image(this.width / 2 + 200, this.height * 0.9, 'elon').setScale(0.5).setOrigin(0.5, 1);

        // Title text
        this.cutsceneText = this.add.bitmapText(this.width / 2, this.height / 3, 'pixelfont', 'Back to the station', 40)
            .setOrigin(0.5)
            .setAlpha(0);

        this.tweens.add({
            targets: this.cutsceneText,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            hold: 3000,
            onComplete: () => {
                this.cutsceneText.destroy();
                this.startDialogueSequence();
            }
        });

        // Fade in
        this.cameras.main.fadeIn(2000);

        // Create smoke particle
        this.vfx.addCircleTexture('smokeParticle', 0xFFFFFF, 0.8, 20);
    }

    startDialogueSequence() {
    const dialogues = [
        { speaker: 'MrBeast', text: 'Great job, Harry! You really are the chosen one.', audioKey: 'mrbeast_great_job', audioTime: 4000 },
        { speaker: 'Elon', text: 'You did well, Potter.', audioKey: 'elon_well_done', audioTime: 1000 },
        { speaker: `${HarryGlobal.child}`, text: 'Thanks, MrBeast and Elon, for the help!' },
        { speaker: `${HarryGlobal.child}`, text: "My train's here. Time to go!" },
        { speaker: 'MrBeast', text: 'Bye, Harry! Take care!', audioKey: 'mrbeast_bye', audioTime: 2000 },
        { speaker: 'Elon', text: 'Try not to die on the way.', audioKey: 'elon_try_not_die', audioTime: 1000 }
    ];
    let index = 0;

    const showNextDialogue = () => {
        if (index >= dialogues.length) {
            this.startTrainSequence();
            return;
        }

        const dialogue = dialogues[index];

        // Play audio if it's MrBeast or Elon speaking and there's an audio key
        let voiceLine;
        if ((dialogue.speaker === 'MrBeast' || dialogue.speaker === 'Elon') && dialogue.audioKey) {
            voiceLine = this.sound.add(dialogue.audioKey, { volume: 1 });
            voiceLine.play();
        }

        // Create a container to hold both text elements
        const container = this.add.container(this.width / 2, this.height * 0.9);
        container.setDepth(11);
        container.setAlpha(0);
        
        // Add the speaker name in yellow
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${dialogue.speaker}:`, 30)
            .setOrigin(0.5, 0.5)
            .setTint(0xffff00); // Yellow color
        
        // Add the dialogue text in white (default color)
        const messageText = this.add.bitmapText(speakerText.width/2 + 10, 0, 'pixelfont', dialogue.text, 30)
            .setOrigin(0, 0.5);
        
        // Calculate positions to center the whole text
        const totalWidth = speakerText.width + messageText.width + 10;
        speakerText.setPosition(-totalWidth/2 + speakerText.width/2, 0);
        messageText.setPosition(-totalWidth/2 + speakerText.width + 10, 0);
        
        // Add both text elements to the container
        container.add([speakerText, messageText]);

        this.tweens.add({
            targets: container,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Use the specific audioTime if provided, otherwise default to 3000ms
                const waitTime = dialogue.audioTime || 3000;

                this.time.delayedCall(waitTime, () => {
                    this.tweens.add({
                        targets: container,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            container.destroy();
                            index++;
                            showNextDialogue();
                        }
                    });
                });
            }
        });
    };

    showNextDialogue();
}

    startTrainSequence() {
        // Create train with blue tint
        this.train = this.add.image(-1000, this.height * 0.7, 'hogwartsTrains')
            .setScale(4)
            .setOrigin(0.5)
            .setTint(0x0000FF);

        // Create smoke emitter
        // this.smokeEmitter = this.vfx.createEmitter('smokeParticle', this.train.x + 980, this.train.y - 150, 2, 0, 2000);
        // this.smokeEmitter.startFollow(this.train, 980, -770);
        // this.smokeEmitter.start();


        this.sounds.running.play();
        this.sounds.whistle.play();

        // Train arrives
        this.tweens.add({
            targets: this.train,
            x: this.width / 2,
            duration: 4000,
            ease: 'Linear',
            onComplete: () => {
                this.sounds.running.stop();
                // Pause for a second
                this.time.delayedCall(1000, () => {
                    // Harry disappears
                    this.tweens.add({
                        targets: this.harryPotter,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            this.harryPotter.destroy();
                            // Train departs
                            this.sounds.running.play();
                            this.tweens.add({
                                targets: this.train,
                                x: this.width + 1000,
                                duration: 4000,
                                ease: 'Linear',
                                onComplete: () => {
                                    this.train.destroy();
                                    //this.smokeEmitter.stop();
                                    this.sounds.running.stop();
                                    // Fade out scene
                                    this.cameras.main.fadeOut(2000);
                                    this.sound.stopAll();
                                    this.scene.start('Outro');


                                }
                            });
                        }
                    });
                });
            }
        });
        //this.smokeEmitter.setGravity(0, -50);
    }

    update(time, delta) {
        // if (this.smokeEmitter && this.train) {
        //     this.smokeEmitter.setPosition(this.train.x + 980, this.train.y - 150);
        // }
    }
}
class Outro extends Phaser.Scene {
    constructor() {
        super({ key: 'Outro' });
    }

    preload() {
        // Load the Hogwarts background image
        this.load.image('hogwartsBackground', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/qJm9Cwy8zRSQoweX/assets/images/Copy%20of%20Prabal%283%29.png?t=1745016575936');
        
        // Load the magic uncle character
        this.load.image('magicUncle', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/qJm9Cwy8zRSQoweX/assets/images/magicuncle.png?t=1745016566746');
        
        // Load the dialogue box
        this.load.image('dialogueBox', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/qJm9Cwy8zRSQoweX/assets/images/newdialbox.png?t=1745016566480');
        
        // Load audio for each dialogue
        this.load.audio('dialogue11', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Well%20done%20my%20brave%20adventurer_f21a1379-fd64-4f3f-bc75-6ff67f65dd53.mp3?t=1745017994108');
        this.load.audio('dialogue21', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/You%20faced%20with%20demons_2b259ada-2af4-4cce-bb0c-5144c324623a.mp3?t=1745017993365');
        this.load.audio('dialogue31', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/The%20beastverse%20will%20always%20be%20here%2C%20waiting_56558a74-ec19-49ba-8e09-247f6c3b713f.mp3?t=17450179953753'); // Replace with your actual audio URL
        this.load.audio('dialogue41', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Until%20then%2C%20stay_15706db8-6564-46f8-9f0a-a6f211c0b2fe.mp3?t=1745017993958'); // Replace with your actual audio URL
        this.load.audio('dialogue51', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/Love%20You%20Kiddo_facb2ef3-6746-447b-be72-430d9b2ccc68.mp3?t=1745017992130'); // Replace with your actual audio URL
        
        // Load ambient audio
        this.load.audio('backgroundMusic', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/IhjT5gsrcnRO.mp3');
        this.load.audio('fireworksound','https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/audio/dK4lHzhxfj7k.wav');
        
        // Load bitmap font
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        this.load.image('skipButtons', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/jtNP30spHXlWUqGm/assets/images/newAsset_19.png?t=1741941007028');
        
        // Display loading progress
        displayProgressLoader.call(this);
    }

    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        
        
        this.backgroundMusic = this.sound.add('backgroundMusic', { volume: 0.3, loop: true });
        this.backgroundMusic.play();
        // Property to track current audio
this.currentAudio = null;
        
        // Add Hogwarts background
        this.background = this.add.image(this.width / 2, this.height / 2, 'hogwartsBackground').setOrigin(0.5);
        const bgScale = Math.max(this.width / this.background.displayWidth, this.height / this.background.displayHeight);
        this.background.setScale(bgScale);
        
        // Add dialogue box (centered on screen, initially hidden)
        this.dialogueBox = this.add.image(this.width / 2, this.height / 2, 'dialogueBox')
            .setOrigin(0.5)
            .setScale(1.2)
            .setAlpha(0);
            
        // Add dialogue text (initially hidden)
        this.dialogueText = this.add.bitmapText(this.width / 2, this.height / 2, 'pixelfont', '', 24)
            .setOrigin(0.5)
            .setAlpha(0);
        
        // Add magic uncle character (initially hidden, positioned at bottom right)
        this.magicUncle = this.add.image(this.width - 250, this.height * 0.77, 'magicUncle')
            .setOrigin(0.5)
            .setScale(0.6)
            .setAlpha(0);
        
        // Create dialogue data with text and corresponding audio
        this.dialogues = [
            { text: "Well done, my brave adventurer!", audio: 'dialogue11', duration: 2000 },
            { text: "You faced the demons, swam with mermaids,\nsoared with dragons\nand came out stronger than ever.\nI couldn’t be prouder of you.", audio: 'dialogue21', duration: 7000 },
            { text: "The BeastVerse will always be here, \nwaiting for your next adventure.", audio: 'dialogue31', duration: 4000 },
            { text: "Until then, stay curious, stay brave \nand always believe in the magic inside you.", audio: 'dialogue41', duration: 4000 },
            { text: "Love you, kiddo.", audio: 'dialogue51', duration: 1000 }
        ];
        
        // Track current dialogue index
        this.currentDialogueIndex = 0;
        
        // Add skip button
        this.skipButton = this.add.sprite(this.width - 150, 100, 'skipButtons')
            .setOrigin(0.5).setScale(0.3)
            .setInteractive({ cursor: 'pointer' });
        console.log('a')
        this.skipButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('S2');
        });
        
        // Add to the create() method after setting up other elements but before starting the scene:
this.vfx = new VFXLibrary(this);

// Create textures for fireworks
this.vfx.addCircleTexture('firework1', 0xff0000, 0.8, 5);
this.vfx.addCircleTexture('firework2', 0x00ff00, 0.8, 5);
this.vfx.addCircleTexture('firework3', 0x0000ff, 0.8, 5);
this.vfx.addCircleTexture('firework4', 0xffff00, 0.8, 5);
this.vfx.addCircleTexture('firework5', 0xff00ff, 0.8, 5);

// Modify the fadeIn callback in the camera:
this.cameras.main.fadeIn(1500, 0, 0, 0, () => {
    // First show fireworks
    this.showFireworks();
    
    // After 2 seconds, show the magic uncle
    this.time.delayedCall(2000, () => {
        this.showMagicUncle();
    });
});
    }
    showFireworks() {
    // Check if we already played the sound in this scene
    // Add a flag to track if the sound has been played
    if (!this.fireworkSoundPlayed) {
        const fireworkSound = this.sound.add('fireworksound');
        fireworkSound.play({ volume: 0.4 });
        
        // Set the flag to prevent playing again
        this.fireworkSoundPlayed = true;
    }
    
    // Create multiple fireworks over 2 seconds
    for (let i = 0; i < 8; i++) {
        this.time.delayedCall(i * 200, () => {
            // Random position for each firework
            const x = Phaser.Math.Between(100, this.width - 100);
            const y = Phaser.Math.Between(100, this.height - 200); // Keep above bottom area
            
            // Random color texture
            const colorKey = Phaser.Utils.Array.GetRandom(
                ['firework1', 'firework2', 'firework3', 'firework4', 'firework5']
            );
            
            // Create firework particles using multiple small emitters in a circular pattern
            const numDirections = 12;
            const radius = 300; // Maximum distance particles will travel
            
            for (let j = 0; j < numDirections; j++) {
                const angle = (Math.PI * 2 / numDirections) * j;
                const endX = x + Math.cos(angle) * radius;
                const endY = y + Math.sin(angle) * radius;
                
                // Create a temporary image to move along the trajectory
                const particle = this.add.image(x, y, colorKey).setScale(1.5);
                
                // Create movement tween
                this.tweens.add({
                    targets: particle,
                    x: endX,
                    y: endY,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    duration: 1500,
                    ease: 'Power2',
                    onComplete: () => {
                        particle.destroy();
                    }
                });
            }
            
            // Add camera shake for dramatic effect
            if (i % 3 === 0) {
                this.vfx.shakeCamera(200, 0.003);
            }
        });
    }
}
    
    showMagicUncle() {
        // Fade in the magic uncle character
        this.tweens.add({
            targets: this.magicUncle,
            alpha: 1,
            scale: 0.9,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Fade in the dialogue box after character appears
                this.tweens.add({
                    targets: this.dialogueBox,
                    alpha: 1,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        // Start first dialogue
                        this.showNextDialogue();
                    }
                });
            }
        });
    }
    
    showNextDialogue() {
    // If we've shown all dialogues, transition to next scene
    if (this.currentDialogueIndex >= this.dialogues.length) {
        this.fadeOutAndTransition();
        return;
    }
    
    // Stop any currently playing dialogue audio
    if (this.currentAudio && this.currentAudio.isPlaying) {
        this.currentAudio.stop();
    }
    
    // Get current dialogue data
    const dialogue = this.dialogues[this.currentDialogueIndex];
    
    // Play dialogue audio
    this.currentAudio = this.sound.add(dialogue.audio, { volume: 0.9 });
    this.currentAudio.play();
    
    // Show dialogue text with fade-in effect
    this.dialogueText.setText(dialogue.text);
    this.dialogueText.setAlpha(0);
    
    // Center the text within dialogue box
    this.dialogueText.setX(this.dialogueBox.x);
    this.dialogueText.setY(this.dialogueBox.y);
    this.dialogueText.setScale(2);
    
    // Fade in the text
    this.tweens.add({
        targets: this.dialogueText,
        alpha: 1,
        duration: 500,
        ease: 'Power2'
    });
    
    // Wait for audio to complete before moving to next dialogue
    this.currentAudio.once('complete', () => {
        // Add a small delay after audio completes
        this.time.delayedCall(800, () => {
            // Fade out the text
            this.tweens.add({
                targets: this.dialogueText,
                alpha: 0,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    // Move to next dialogue
                    this.currentDialogueIndex++;
                    this.showNextDialogue();
                }
            });
        });
    });
}
    
    fadeOutAndTransition() {
    // Stop any playing audio
    if (this.currentAudio && this.currentAudio.isPlaying) {
        this.currentAudio.stop();
    }
    
    // Fade out everything
    this.tweens.add({
        targets: [this.dialogueBox, this.magicUncle],
        alpha: 0,
        duration: 1000,
        ease: 'Power2',
        onComplete: () => {
            // Fade out camera
            this.cameras.main.fadeOut(1500, 0, 0, 0, () => {
                // Stop all audio
                this.sound.stopAll();
                
                // Transition to next scene
                this.scene.start('S2'); // Replace with your next scene key
            });
        }
    });
}
}



class C10 extends Phaser.Scene {
    constructor() {
        super({ key: 'C10' }); // Key matches the class name
    }

    preload() {
        this.load.image(
            'hogwartssEntrance',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/2.png?t=1744356086124'
        );
        this.load.image(
            'haarryPotter',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/hyARr7Yi9NWD4b34/assets/images/Assets_Download_4.png?t=1744657428116'
        );
        this.load.image(
            'elon',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Elon.png?t=1744317614994'
        );
        this.load.image(
            'dumbledoreBoat',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/Assets_Download_12.png?t=1744663464360'
        );
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Load background music
        this.load.audio(
            'backgroundMusic10',
            'https://files.catbox.moe/es8ku0.mp3'
        );
        // Load portal sound
        this.load.audio(
            'portalSound',
            'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/sci-fi-portal-83746_fbf27acc-78a6-4f10-aea5-ce3874223be6.mp3?t=1744355808834'
        );

        // Load portal spritesheet
        this.load.atlas(
            'portal1',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/spritesheet%289%29.png?t=1744355339281',
            'https://aicade-ui-assets.s3.amazonaws.com/bigSmoke/games/portal/history/json/o5YbwnGvTdaU.json'
        );

        // Load fire spritesheet
        this.load.atlas(
            'fire',
            'https://aicade-user-store.s3.amazonaws.com/6994335331/games/hyARr7Yi9NWD4b34/assets/images/spritesheet%2810%29.png?t=1744657335076', // Replace with the actual URL of the fire spritesheet image
            'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/j2wKC6yamzMA.json' // Replace with the actual URL of the fire JSON file
        );
        displayProgressLoader.call(this);
    }

    create() {
        this.vfx = new VFXLibrary(this);
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        // Set background
        this.bg = this.add.image(this.width / 2, this.height / 2, 'hogwartssEntrance').setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        // Add multiple fire animations on the castle (centered)
        this.fireAnimations = [];
        const firePositions = [
            { x: this.width / 2 - 100, y: this.height / 2 - 50 },
            { x: this.width / 2 + 50, y: this.height / 2 - 30 },
            { x: this.width / 2 - 150, y: this.height / 2 + 20 },
            { x: this.width / 2 + 100, y: this.height / 2 + 10 }
        ];
        this.createFireAnimations();
        firePositions.forEach(pos => {
            const fire = this.add.sprite(pos.x, pos.y, 'fire')
                .setScale(2)
                .setAlpha(1);
            fire.play('fireAnim');
            this.fireAnimations.push(fire);

            // Add smoke effect above each fire
            const smokeEmitter = this.vfx.createEmitter('fire', pos.x, pos.y - 20, 0.5, 0.1, 2000);
            smokeEmitter.start();
        });

        // Add Dumbledore on boat sprite, starting off-screen left
        this.dumbledore = this.add.sprite(-200, this.height, 'dumbledoreBoat')
            .setScale(0.5)
            .setOrigin(0.5, 1)
            .setAlpha(0); // Start invisible for fade-in

        // Fade in and move Dumbledore to the left side
        this.tweens.add({
            targets: this.dumbledore,
            x: 400, // Position on the left side of the screen
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                // Show Dumbledore's first dialogue
                this.showDumbledoreDialogue();
            }
        });

        // Create portal animation with full image file names
        this.anims.create({
            key: 'portalAnim',
            frames: [
                { key: 'portal1', frame: 'image_0(13).png' },
                { key: 'portal1', frame: 'image_1(13).png' },
                { key: 'portal1', frame: 'image_2(9).png' },
                { key: 'portal1', frame: 'image_3(6).png' },
                { key: 'portal1', frame: 'image_4(7).png' },
                { key: 'portal1', frame: 'image_5(4).png' }
            ],
            frameRate: 10,
            repeat: -1 // Loop indefinitely
        });
    }

    // Function to create fire animation
    createFireAnimations() {
        this.anims.create({
            key: 'fireAnim',
            frames: [
                { key: 'fire', frame: 'image_0(14).png' },
                { key: 'fire', frame: 'image_1(14).png' },
                { key: 'fire', frame: 'image_2(10).png' },
                { key: 'fire', frame: 'image_3(7).png' },
                { key: 'fire', frame: 'image_4(8).png' },
                { key: 'fire', frame: 'image_5(5).png' },
                { key: 'fire', frame: 'image_6(5).png' },
                { key: 'fire', frame: 'image_7(3).png' },
                { key: 'fire', frame: 'image_8(2).png' },
                { key: 'fire', frame: 'image_9(3).png' },
                { key: 'fire', frame: 'image_10(1).png' },
                { key: 'fire', frame: 'image_11(1).png' },
                { key: 'fire', frame: 'image_12.png' },
                { key: 'fire', frame: 'image_13.png' }
            ],
            frameRate: 10,
            repeat: -1 // Loop indefinitely
        });
    }

    // Function to show Dumbledore's first dialogue
    showDumbledoreDialogue() {
        const dialogueContainer = this.add.container(this.width / 4, this.height * 0.8); // Position on left side

        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', 'MrBeast: ', 30)
            .setTint(0xFFFF00) // Yellow color for speaker name
            .setOrigin(0, 0.5);

        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', 'OH NO WE ARE DOOMED!', 30)
            .setTint(0xFFFFFF) // White color for dialogue text
            .setOrigin(0, 0.5)
            .setDepth(10);

        dialogueContainer.add([speakerText, dialogueText]);

        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the dialogue
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.createPortalAndHarry();
                        }
                    });
                });
            }
        });
    }

    // Function to create portal, make Harry appear, and start conversation
    createPortalAndHarry() {
        // Create portal sprite in top-right corner
        const portalX = this.width - 100;
        const portalY = 100;
        const portal = this.add.sprite(portalX, portalY, 'portal1')
            .setScale(5) // Adjusted scale for top-right corner
            .setAlpha(0);

        // Fade in the portal
        this.tweens.add({
            targets: portal,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Play portal sound
                this.portalSound = this.sound.add('portalSound', { loop: true });
                this.portalSound.play();

                // Play portal animation
                portal.play('portalAnim');

                // Add Harry emerging from portal
                this.harry = this.add.sprite(portalX, portalY + 200, 'haarryPotter')
                    .setScale(0.2)
                    .setOrigin(0.5, 1)
                    .setAlpha(0);

                // Fade in Harry
                this.tweens.add({
                    targets: this.harry,
                    alpha: 1,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        // Add and play background music
                        this.backgroundMusic = this.sound.add('backgroundMusic10', { loop: true });
                        this.backgroundMusic.play();
                        this.dialogueIndex = 0;
                        this.dialogues = [
                            { speaker: `${HarryGlobal.child}`, text: 'What happened?!' },
                            { speaker: 'MrBeast', text: `${HarryGlobal.child}! Voldemort attacked us!` },
                            { speaker: 'MrBeast', text: 'You’re the chosen one—stop that evil snake!' },
                            { speaker: `${HarryGlobal.child}`, text: 'Got it! I’ll take him down!' }
                        ];
                        this.showNextDialogue();
                    }
                });

                // Add Elon sprite (initially invisible, will appear during dialogue)
                this.elon = this.add.sprite(this.width / 2 + 400, this.height, 'elon')
                    .setScale(0.7)
                    .setOrigin(0.5, 1)
                    .setVisible(true)
                    .setAlpha(0);
            }
        });

        this.time.delayedCall(2000, () => {
            this.portalSound.stop();
        })
    }

    // Function to show next dialogue
    showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            this.createPortalAndMoveHarry();
            return;
        }

        const { speaker, text } = this.dialogues[this.dialogueIndex];

        // Create a container for the speaker name and dialogue text
        const dialogueContainer = this.add.container(this.width / 2, this.height * 0.8);

        // Create speaker portion with yellow color
        const speakerText = this.add.bitmapText(0, 0, 'pixelfont', `${speaker}: `, 30)
            .setTint(0xFFFF00) // Yellow color for speaker name
            .setOrigin(0, 0.5);

        // Create dialogue text with white color
        const dialogueText = this.add.bitmapText(speakerText.width, 0, 'pixelfont', text, 30)
            .setTint(0xFFFFFF) // White color for dialogue text
            .setOrigin(0, 0.5)
            .setDepth(10);

        // Combine texts into the container
        dialogueContainer.add([speakerText, dialogueText]);

        // Center the container based on total width
        const totalWidth = speakerText.width + dialogueText.width;
        dialogueContainer.x -= totalWidth / 2;

        // Fade in Elon if it's his turn to speak
        if (speaker === 'Elon' && this.dialogueIndex === 1) { // First Elon dialogue
            this.tweens.add({
                targets: this.elon,
                alpha: 1,
                duration: 500,
                ease: 'Power2'
            });
        }

        // Start with the entire container invisible
        dialogueContainer.setAlpha(0);

        // Fade in the entire container
        this.tweens.add({
            targets: dialogueContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.tweens.add({
                        targets: dialogueContainer,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            dialogueContainer.destroy();
                            this.dialogueIndex++;
                            this.showNextDialogue();
                        }
                    });
                });
            }
        });
    }

    // Function to move Harry to center, reduce size, and apply effects
    createPortalAndMoveHarry() {
        // Move Harry to the center of the screen
        this.tweens.add({
            targets: this.harry,
            x: this.width / 2,
            y: this.height / 2,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                // Reduce Harry's size until he disappears
                this.tweens.add({
                    targets: this.harry,
                    scaleX: 0.01,
                    scaleY: 0.01,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2',
                    onComplete: () => {
                        this.harry.destroy(); // Remove Harry from scene
                        // Create thunder effect (flashy screen effect)
                        const thunderOverlay = this.add.graphics()
                            .fillStyle(0xFFFFFF, 0.8) // Bright white for thunder effect
                            .fillRect(0, 0, this.width, this.height)
                            .setDepth(100);

                        this.vfx.shakeCamera(500, 0.02); // Shake camera for 0.5 seconds
                        this.vfx.blinkEffect(thunderOverlay, 200, 3); // Blink effect 3 times

                        // Stop sounds and fade out screen
                        this.portalSound.stop();
                        this.backgroundMusic.stop();
                        this.cameras.main.fadeOut(2000, 0, 0, 0, (camera, progress) => {
                            if (progress === 1) {
                                // Scene fully faded out, optionally restart or end
                                this.scene.start('L4'); // Replace with your next scene or logic
                                this.sound.stopAll();

                            }
                        });
                    }
                });
            }
        });
    }

    update() { }
}

//------------------------------------------------------ Level --------------------------------------

// Game Scene
class ScoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ScoreScene' });
    }

    preload() {
        this.load.audio('countTick', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/047747_high-score-fill-75680_ddaaa233-3fc0-4d6c-abbc-eb042b58030c.mp3?t=1745013698987');
        this.load.audio('countComplete', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/arcade-ui-6-229503_d6d03c53-222a-47c5-a97a-937cbc0aaa17.mp3?t=1745013698107');
        this.load.image("scorePanel", "https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/scorepanel.png?t=1745009524245");
        this.load.bitmapFont(
            'pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml'
        );
        // Ensure progress loader and event listeners are functional
        if (typeof addEventListenersPhaser === 'function') {
            addEventListenersPhaser.bind(this)();
        }
        if (typeof displayProgressLoader === 'function') {
            displayProgressLoader.call(this);
        }
    }

    init(data) {
        this.startTime = data.startTime || 10000;
        this.endTime = data.endTime || 20000;
        this.levelScore = data.levelScore || 1000;
        this.nextScene = data.nextScene || null; // Allow next scene to be optional
        // Fallback dimensions from game config
        this.levelId = data.levelId || 1;
        this.width = this.sys.game.config.width || 800; // Default to 800 if undefined
        this.height = this.sys.game.config.height || 600; // Default to 600 if undefined
        
        // Store previous total score before adding new score
        this.previousTotalScore = HarryGlobal.score || 0;
        
        // Import VFX Library
        this.vfx = new VFXLibrary(this);
        
        // Add this flag to track if the scene can be skipped
        this.canSkip = false;
    }

    create() {
        // Ensure physics is available
        if (!this.physics) {
            this.physics = this.sys.game.physics || new Phaser.Physics.Arcade(this);
        }
        this.physics.pause(); // Pause physics to freeze the game
        this.playerControlsEnabled = false;

        // Create overlay
        const overlay = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.7)
            .setOrigin(0.5)
            .setDepth(20)
            .setScrollFactor(0);

        // Calculate scores
        const timeTaken = (this.endTime - this.startTime) / 1000;
        let timeBonus = 0;
        if(this.levelId == 1)
        {
            if (timeTaken <= 60) timeBonus = 500;
            else if (timeTaken <= 100) timeBonus = 300;
            else if (timeTaken <= 120) timeBonus = 100;
            else timeBonus = 0;
        }
        else if(this.levelId == 2) //underwater
        {
            if (timeTaken <= 45) timeBonus = 500;
            else if (timeTaken <= 55) timeBonus = 300;
            else if (timeTaken <= 75) timeBonus = 100;
            else timeBonus = 0;
        }
        else if(this.levelId == 3) //dragon level
        {
            if (timeTaken <= 70) timeBonus = 500;
            else if (timeTaken <= 100) timeBonus = 300;
            else if (timeTaken <= 130) timeBonus = 100;
            else timeBonus = 0;
        }
        else if(this.levelId == 4) //voldemort
        {
            if (timeTaken <= 30) timeBonus = 500;
            else if (timeTaken <= 45) timeBonus = 300;
            else if (timeTaken <= 60) timeBonus = 100;
            else timeBonus = 0;
        }
        else{
            if (timeTaken <= 30) timeBonus = 500;
            else if (timeTaken <= 45) timeBonus = 300;
            else if (timeTaken <= 60) timeBonus = 100;
            else timeBonus = 0;
        }

        // Base score and final score
        const baseScore = this.levelScore;
        const finalScore = baseScore + timeBonus;
        
        // Create continue text that will be shown later
        this.continueText = this.add.bitmapText(this.width / 2, this.height - 50, 'pixelfont', 'Press Any Key to Continue', 30)
            .setOrigin(0.5)
            .setTint(0x00FF00)
            .setDepth(23)
            .setScrollFactor(0)
            .setAlpha(0); // Start invisible
        
        // Setup input handler for skipping (will be enabled only when animations are complete)
        this.input.keyboard.on('keydown', this.handleKeyPress, this);
        
        // First, show the "LEVEL COMPLETE" text
        const levelCompleteText = this.add.bitmapText(this.width / 2, this.height / 2, 'pixelfont', 'LEVEL COMPLETE', 80)
            .setOrigin(0.5)
            .setTint(0xFFFFFF)
            .setDepth(23)
            .setScrollFactor(0)
            .setAlpha(0); // Start invisible

        // Animate the level complete text
        this.tweens.add({
            targets: levelCompleteText,
            alpha: 1,
            scale: { from: 0.5, to: 1.2 },
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                // Make it pulse for a moment
                this.vfx.scaleGameObject(levelCompleteText, 1.1, 800, 1);
                
                // After showing level complete, fade it out then show score panel
                this.time.delayedCall(1200, () => {
                    this.tweens.add({
                        targets: levelCompleteText,
                        alpha: 0,
                        scale: 1.5,
                        duration: 800,
                        ease: 'Power1',
                        onComplete: () => {
                            levelCompleteText.destroy();
                            this.showScorePanel(overlay, baseScore, timeBonus, finalScore);
                        }
                    });
                });
            }
        });

        // Debugging: Log to ensure assets and scene are loading
        console.log("ScoreScene created with width:", this.width, "height:", this.height);
        console.log("Assets loaded:", this.textures.exists('scorePanel'), this.cache.bitmapFont.has('pixelfont'));
    }
    
    // New method to handle key presses
    handleKeyPress() {
        // Only proceed if the scene is ready to be skipped
        if (!this.canSkip) {
            return;
        }
        
        this.vfx.shakeCamera(300, 0.01);
        
        // Fade out all elements
        const allElements = this.children.list.filter(child => child.type === 'Image' || child.type === 'BitmapText');
        
        this.tweens.add({
            targets: [this.children.list.find(child => child.type === 'Rectangle'), ...allElements],
            alpha: 0,
            duration: 500,
            onComplete: () => {
                // Clean up elements
                allElements.forEach(element => element.destroy());
                
                // Remove the event listener to prevent memory leaks
                this.input.keyboard.off('keydown', this.handleKeyPress, this);
                
                this.physics.resume();
                this.playerControlsEnabled = true;
                if (this.nextScene) {
                    this.scene.start(this.nextScene);
                } else {
                    console.log("No next scene specified, staying in ScoreScene.");
                }
            }
        });
    }
    
    showScorePanel(overlay, baseScore, timeBonus, finalScore) {
        // Create score panel
        const scorePanel = this.add.image(this.width / 2, this.height / 2, 'scorePanel')
            .setScale(0.8)
            .setDepth(21)
            .setScrollFactor(0)
            .setAlpha(0);
            
        // Animate score panel appearing
        this.tweens.add({
            targets: scorePanel,
            alpha: 1,
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut',
            onComplete: () => {
                // Add a shine effect to the score panel
                //this.vfx.addShine(scorePanel, 1500, 0.7);
                this.vfx.shakeCamera(300, 0.005); // Gentle camera shake
                
                // Start the score counting animations
                this.startScoreCountingAnimations(baseScore, timeBonus, finalScore);
            }
        });
    }
    
    startScoreCountingAnimations(baseScore, timeBonus, finalScore) {
        // Create level score text that will count up to base score first
        let currentDisplayScore = 0;
        const levelScoreText = this.add.bitmapText(this.width / 2, this.height / 2 + 150, 'pixelfont', `Level Score: 0`, 50)
            .setOrigin(0.5)
            .setTint(0xFFFF00)
            .setDepth(23)
            .setScrollFactor(0);
            
        // Create particle emitter for score numbers
        this.vfx.addCircleTexture('scoreParticle', 0xFFFF00, 0.8, 10);
        const scoreEmitter = this.vfx.createEmitter('scoreParticle', this.width / 2, this.height / 2 + 50);

        // Phase 1: Count up animation for base level score
        this.tweens.addCounter({
            from: 0,
            to: baseScore,
            duration: 1500,
            ease: 'Power1',
            onUpdate: (tween) => {
                currentDisplayScore = Math.floor(tween.getValue());
                levelScoreText.setText(`Level Score: ${currentDisplayScore}`);
                
                // Emit particles occasionally during counting
                if (Math.random() > 0.9) {
                    scoreEmitter.emitParticle(3);
                }
            },
            onComplete: () => {
                // Play the completion sound when base counting completes
                this.sound.play('countComplete', { volume: 0.7 });
                
                // Shake the score text when it completes
                this.vfx.shakeGameObject(levelScoreText, 200, 5);
                
                // If there's a time bonus, show that animation
                if (timeBonus > 0) {
                    this.showTimeBonusAnimation(levelScoreText, baseScore, timeBonus, finalScore);
                } else {
                    // If no time bonus, skip to total score animation
                    this.showTotalScoreAnimation(finalScore);
                }
            }
        });
    }

    showTimeBonusAnimation(levelScoreText, baseScore, timeBonus, finalScore) {
        // Create the "+ time bonus" text
        const timeBonusText = this.add.bitmapText(this.width / 2 + 220, this.height / 2 + 150, 'pixelfont', `+ ${timeBonus}`, 40)
            .setOrigin(0, 0.5)
            .setTint(0x00FFFF)
            .setDepth(23)
            .setScrollFactor(0)
            .setAlpha(0);
            
        // Animate the time bonus text appearing
        this.tweens.add({
            targets: timeBonusText,
            alpha: 1,
            x: this.width / 2 + 240,
            duration: 500,
            ease: 'Power1',
            onComplete: () => {
                // Shake and glow the time bonus text
                this.vfx.shakeGameObject(timeBonusText, 200, 5);
                
                // Phase 2: Count from base score to final score
                let currentDisplayScore = baseScore;
                
                this.tweens.addCounter({
                    from: baseScore,
                    to: finalScore,
                    duration: 1000,
                    ease: 'Power1',
                    delay: 400, // Short delay before continuing the count
                    onUpdate: (tween) => {
                        currentDisplayScore = Math.floor(tween.getValue());
                        levelScoreText.setText(`Level Score: ${currentDisplayScore}`);
                        
                        // Emit cyan particles to differentiate time bonus counting
                        if (Math.random() > 0.8) {
                            this.vfx.addCircleTexture('timeBonusParticle', 0x00FFFF, 0.8, 10);
                            const bonusEmitter = this.vfx.createEmitter('timeBonusParticle', this.width / 2, this.height / 2 + 50);
                            bonusEmitter.emitParticle(2);
                        }
                    },
                    onComplete: () => {
                        // Play the completion sound when time bonus counting completes
                        this.sound.play('countComplete', { volume: 0.7 });
                        
                        // Shake the final score
                        this.vfx.shakeGameObject(levelScoreText, 200, 5);
                        
                        // Fade out the time bonus text
                        this.tweens.add({
                            targets: timeBonusText,
                            alpha: 0,
                            duration: 500,
                            ease: 'Power1',
                            onComplete: () => {
                                timeBonusText.destroy();
                                
                                // Move to total score animation
                                this.showTotalScoreAnimation(finalScore);
                            }
                        });
                    }
                });
            }
        });
    }

    showTotalScoreAnimation(levelScore) {
        // First show previous score
        const previousScoreText = this.add.bitmapText(this.width / 2, this.height / 2 + 250, 'pixelfont', `Total Score: ${this.previousTotalScore}`, 40)
            .setOrigin(0.5)
            .setTint(0xFFFFFF)
            .setDepth(23)
            .setScrollFactor(0);
            
        // After a short delay, show the "+" animation
        this.time.delayedCall(800, () => {
            // Create the "+" text that will animate
            const plusScoreText = this.add.bitmapText(this.width / 2 + 230, this.height / 2 + 250, 'pixelfont', `+ ${levelScore}`, 40)
                .setOrigin(0, 0.5)
                .setTint(0x00FF00)
                .setDepth(23)
                .setScrollFactor(0)
                .setAlpha(0);
                
            // Animate the "+" text appearing
            this.tweens.add({
                targets: plusScoreText,
                alpha: 1,
                x: this.width / 2 + 250,
                duration: 500,
                ease: 'Power1',
                onComplete: () => {
                    // Shake and highlight the plus text
                    this.vfx.shakeGameObject(plusScoreText, 200, 5);
                    
                    // After showing the plus animation, update the total score
                    this.time.delayedCall(600, () => {
                        // Now actually update the global score
                        HarryGlobal.score += levelScore;
                        
                        // Play the completion sound for total score update
                        this.sound.play('countComplete', { volume: 0.7 });
                        
                        // Create the new total score text that will replace the previous one
                        const newTotalScoreText = this.add.bitmapText(this.width / 2, this.height / 2 + 250, 'pixelfont', `Total Score: ${HarryGlobal.score}`, 40)
                            .setOrigin(0.5)
                            .setTint(0xFFFFFF)
                            .setDepth(23)
                            .setScrollFactor(0)
                            .setAlpha(0);
                            
                        // Fade out previous score and plus score
                        this.tweens.add({
                            targets: [previousScoreText, plusScoreText],
                            alpha: 0,
                            duration: 500,
                            ease: 'Power1',
                            onComplete: () => {
                                previousScoreText.destroy();
                                plusScoreText.destroy();
                            }
                        });
                        
                        // Fade in and scale the new total score
                        this.tweens.add({
                            targets: newTotalScoreText,
                            alpha: 1,
                            scale: { from: 1.5, to: 1 },
                            duration: 800,
                            ease: 'Bounce',
                            onComplete: () => {
                                // Create a glow effect around the new score
                                this.vfx.addCircleTexture('glowParticle', 0xFFFFFF, 0.3, 20);
                                const glowEmitter = this.vfx.createEmitter('glowParticle', this.width / 2, this.height / 2 + 150);
                                glowEmitter.emitParticle(10);
                                
                                // Now we enable skipping - all animations are complete
                                this.canSkip = true;
                                
                                // Show the continue text
                                this.tweens.add({
                                    targets: this.continueText,
                                    alpha: 1,
                                    duration: 500,
                                    ease: 'Power1',
                                    onComplete: () => {
                                        // Blink effect on continue text
                                        this.time.addEvent({
                                            delay: 700,
                                            callback: () => {
                                                this.vfx.blinkEffect(this.continueText, 500, 1);
                                            },
                                            callbackScope: this,
                                            loop: true
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });
    }
}

const joystickEnabled = false;
const buttonEnabled = false;
var isMobile = false;



class L1 extends Phaser.Scene {
    constructor() {
        super({ key: 'L1' });
        this.previousHeartCount = 3; 
        this.isCastingSpell = false;
    }

    preload() {
        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);

        // Load image
        this.load.image('goalMarker','https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/Assets_Download_20.png?t=1745176321239');
        this.load.image("ideabox1","https://aicade-user-store.s3.amazonaws.com/3891523574/games/8Nbm3iYEHLV4erBX/assets/images/ideaBox.png?t=1744634833823");
        this.load.image("downarrow", "https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/newAsset_109.png?t=1745135799695");
        this.load.image("playerProjectile1", "https://media-hosting.imagekit.io/22e3d2aefe3048c0/Projectiles-Photoroom.png?Expires=1838550716&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=h5mTlY0-21EZpcZO6eSA7uVDPpAlxtVUIA~Zo4mzMor3iyuxvM7~ol~Wo6NwAX-QoC4Tx40GMDCagknIaduUws5DHpx3eA-wBC6tvb4uP9wOn5glNAwvJxcBcm3xi1cfoGPKHXc0oL8I87ZXc6yFTShVJFRBEyk0tVAOGKWex35Tzm6DLQ15ar9jVOhZGBnN~7px7pBG7hzZ~yDjqNO4nEnRTIFrpjfOCKBGBfAJLjidUTIHdBIZpVibTo4Kk7Z-UzVlm8EfQj1vW1QipRskPEJfS8vXqGO-vZ34pcyt9FSj4-AOpwUWc1eHQei4RbHUeiNjeMZTlKpndNvei15Cgg__");
        this.load.image("X1", "https://aicade-user-store.s3.amazonaws.com/3891523574/games/8Nbm3iYEHLV4erBX/assets/images/X.png?t=1744662885364");
        this.load.image("Z1", "https://aicade-user-store.s3.amazonaws.com/3891523574/games/8Nbm3iYEHLV4erBX/assets/images/Zz.png?t=1744469815675");
        this.load.image("ARROWUP1", "https://aicade-user-store.s3.amazonaws.com/3891523574/games/8Nbm3iYEHLV4erBX/assets/images/ARROWUP.png?t=1744470829469");
        this.load.image("ARROWLEFT1", "https://aicade-user-store.s3.amazonaws.com/3891523574/games/8Nbm3iYEHLV4erBX/assets/images/ARROWLEFT.png?t=1744470836064");
        this.load.image("ARROWRIGHT1", "https://aicade-user-store.s3.amazonaws.com/3891523574/games/8Nbm3iYEHLV4erBX/assets/images/ARROWRIGHT.png?t=1744470843763");
        this.load.image('RedFlash1', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/red.png?t=1745070348602');


        this.load.image('helpIcon1', "https://aicade-user-store.s3.amazonaws.com/3891523574/games/8Nbm3iYEHLV4erBX/assets/images/helpIcon.png?t=1744635719420");
        this.load.image("platform", "https://aicade-ui-assets.s3.amazonaws.com/6994335331/games/D5lOhf9d1f6hsI3e/assets/image_5_D_platform.webp");
        this.load.image("enemy", "https://aicade-ui-assets.s3.amazonaws.com/6994335331/games/D5lOhf9d1f6hsI3e/assets/image_2_enemy.webp");
        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");
        this.load.image('trainBackground', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/D5lOhf9d1f6hsI3e/assets/images/14.png?t=1744929158880');
        this.load.image('cutscene1', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/D5lOhf9d1f6hsI3e/assets/images/15.png?t=1744965199377');
        this.load.image('cutscene2', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/D5lOhf9d1f6hsI3e/assets/images/16.png?t=1744965200123');
        this.load.image('heart', 'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/heart.png');
        this.load.image('box', 'https://aicade-user-store.s3.amazonaws.com/1310301592/games/BzqiiwLVHux1lJbU/assets/images/normal%20box.png?t=1745060408086');
        this.load.image('explosiveBox', 'https://aicade-user-store.s3.amazonaws.com/1310301592/games/BzqiiwLVHux1lJbU/assets/images/specailbox.png?t=1745061608706');
        this.load.image('powerup', 'https://aicade-user-store.s3.amazonaws.com/1310301592/games/BzqiiwLVHux1lJbU/assets/images/newAsset_109.png?t=1745071519777');
        this.load.image('mildpowerup', 'https://aicade-user-store.s3.amazonaws.com/1310301592/games/BzqiiwLVHux1lJbU/assets/images/newAsset_109.png?t=1745071519777');
        this.load.image('quizPanels', 'https://files.catbox.moe/xq36rf.png');

        // Load font
        const fontName = 'pix';
        const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/";
        this.load.bitmapFont('pixelfont', fontBaseURL + fontName + '.png', fontBaseURL + fontName + '.xml');

        // Load atlases
        this.load.atlas('move', 'https://files.catbox.moe/219iff.png', 'https://files.catbox.moe/vektaz.json');
        this.load.atlas('deathWarder', 'https://files.catbox.moe/u685ci.png', 'https://files.catbox.moe/dnbs2o.json');
        this.load.atlas('spell', 'https://files.catbox.moe/9d54x7.png', 'https://files.catbox.moe/g423sw.json');
        this.load.atlas('attack', 'https://files.catbox.moe/r6qm6c.png', 'https://files.catbox.moe/1du73w.json');
        this.load.atlas(
            'goldChest1',
            'https://files.catbox.moe/vvzwem.png',
            'https://files.catbox.moe/6hqri0.json'
        );
        this.load.atlas('spell',
            'https://files.catbox.moe/9d54x7.png',
            'https://files.catbox.moe/g423sw.json'
        );
        // Load audio
        this.load.audio("background1", "https://aicade-user-store.s3.amazonaws.com/GameAssets/music/scary-horror-suspense-background-music-40-seconds-320054_357dffde-f1db-4fad-bacb-cfd0bf4493a5.mp3?t=1744965361483");
        this.load.audio("lose1", "https://aicade-user-store.s3.amazonaws.com/GameAssets/music/edited_audio_f5f307bd-5f34-4501-ae37-215cc9eefc75.mp3?t=1745180075842");
        this.load.audio("jump", "https://aicade-user-store.s3.amazonaws.com/GameAssets/music/edited_audio_66d5024f-3517-4da0-8ca1-958361ea42cd.mp3?t=1745144462798");
        this.load.audio("shoot", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/sfx/shoot_3.mp3");
        this.load.audio("destroy", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/sfx/blast.mp3");
        this.load.audio("success", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/sfx/upgrade_2.mp3");
        this.load.audio("cutscenebg", "https://aicade-user-store.s3.amazonaws.com/GameAssets/music/warrior_30sec-192838_6a885ccb-60d7-48bf-b12f-8aca8305ce99.mp3?t=1744965359367");
        this.load.audio("dodge", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/sfx/jump_2.mp3");
        this.load.audio("hit", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/sfx/damage_1.mp3");
        this.load.audio("powerup", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/sfx/upgrade_1.mp3");
    }

    chestAnimation() {
        this.anims.create({
            key: 'goldChest',
            frames: this.anims.generateFrameNames('goldChest1', {
                prefix: 'chest_',
                start: 0,
                end: 9,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0
        });
    }

    create() {
    this.chestAnimation();
    // Initialize game state
    this.dementorsDefeated = 0;
    this.score = 0;
    this.width = this.game.config.width;
    this.height = this.game.config.height;
    this.gameIsOver = false;
    this.sounds = {};
    this.worldSize = this.width * 5;
    this.level = 1;
    this.dementorSpawnTime = 2000;
    this.spellCooldown = 800;
    this.lastSpellTime = 0;
    this.canCastSpell = true;
    this.cutsceneActive = true;
    this.dodgeCooldown = 1000;
    this.lastDodgeTime = 0;
    this.isDodging = false;
    this.maxDementorsInView = 4;
    this.hasMovedEnough = false;
    this.goalX = this.worldSize - this.width / 2;
    this.playerHealth = 100;
    this.isInvincible = false;
    this.lastHitTime = 0;
    this.hasPowerup = false;
    this.powerupStunDuration = 4000;
    this.lastShakeTime = 0;
    this.previousHeartCount = 3; // Reset heart count
    this.hasFlashed = false; // Reset flash flag
    this.data.set('currentAttacker', null);
    this.data.set('lastAttackTime', 0);
    this.data.set('nextShakeTime', 0);
    this.isQuizActive = false; // Reset quiz state
    this.askedQuestions = []; // Reset asked questions

    this.initializeQuestionPool();

    // Create animations
    this.anims.create({
        key: 'deathWarder',
        frames: this.anims.generateFrameNames('deathWarder', { prefix: 'walk_', start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNames('attack', { prefix: 'attack_', start: 0, end: 1 }),
        frameRate: 5,
        repeat: -1
    });

    // Set up physics world
    this.physics.world.setBounds(0, 0, this.worldSize, this.height);
    this.cameras.main.setBounds(0, 0, this.worldSize - 900, this.height);

    // Initialize sounds
    this.sounds.background = this.sound.add("background1", { loop: true, volume: 0.001 });
    this.sounds.lose = this.sound.add("lose1", { loop: false, volume: 0.5 });
    this.sounds.jump = this.sound.add("jump", { loop: false, volume: 0.5 });
    this.sounds.shoot = this.sound.add("shoot", { loop: false, volume: 0.5 });
    this.sounds.destroy = this.sound.add("destroy", { loop: false, volume: 0.5 });
    this.sounds.success = this.sound.add("success", { loop: false, volume: 0.5 });
    this.sounds.cutscenebg = this.sound.add("cutscenebg", { loop: false, volume: 0.06 });
    this.sounds.dodge = this.sound.add("dodge", { loop: false, volume: 0.5 });
    this.sounds.powerup = this.sound.add("powerup", { loop: false, volume: 0.5 });

    isMobile = !this.sys.game.device.os.desktop;
    this.vfx = new VFXLibrary(this);

    this.startCutscenes();
}



    initializeQuestionPool() {
        this.questionPool = initQuistion(HarryGlobal.child);

        this.askedQuestions = []; // Track asked questions
    }

    howToPlay() {
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, 2000, 2000);
        this.graphics.setDepth(50).setScrollFactor(0);

        this.howToPlayS = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.2, 'pixelfont', "How To Play", 50).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);
        this.arrowkeyU = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.4, "ARROWUP1").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        //this.arrowkeyD = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.45, "ARROWDOWN").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowkeyL = this.add.image(this.game.config.width * 0.35, this.game.config.height * 0.45, "ARROWLEFT1").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowkeyR = this.add.image(this.game.config.width * 0.45, this.game.config.height * 0.45, "ARROWRIGHT1").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowKeyT = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.4, 'pixelfont', "Move", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.zText = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.6, "Z1").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.zPNG = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.6, 'pixelfont', "Spell", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.xText = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.7, "X1").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.xPNG = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.7, 'pixelfont', "Power Up", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.cont = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.9, 'pixelfont', "Press Any Key or Click To Continue", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);
        this.tweens.add({
            targets: this.cont,
            alpha: { from: 1, to: 0.3 },
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        this.input.keyboard.on('keydown', this.clearHowToPlay, this);
        this.input.once('pointerdown', this.clearHowToPlay, this);
    }

    clearHowToPlay() {
        this.graphics.destroy();
        this.howToPlayS.destroy();
        this.arrowkeyU.destroy();
        //this.arrowkeyD.destroy();
        this.arrowkeyL.destroy();
        this.arrowkeyR.destroy();
        this.arrowKeyT.destroy();
        this.zText.destroy();
        this.zPNG.destroy();
        this.xText.destroy();
        this.xPNG.destroy();
        this.cont.destroy();
        this.input.keyboard.off('keydown', this.clearHowToPlay, this);
        this.input.off('pointerdown', this.clearHowToPlay, this);
        this.startGame();
    }

    startCutscenes() {
        this.cutsceneContainer = this.add.container(0, 0).setDepth(1000);
        this.sounds.cutscenebg.play();

        this.cutsceneImage = this.add.image(this.width / 2, this.height / 2, 'cutscene1')
            .setAlpha(0)
            .setDisplaySize(this.width, this.height);

        this.dialogueBox = this.add.rectangle(this.width / 2, this.height - 100, this.width - 100, 80, 0x000000, 0.7);
        this.dialogueText = this.add.bitmapText(this.width / 2, this.height - 100, 'pixelfont', 'Why the train is so empty, something is wrong here...', 24)
            .setOrigin(0.5);

        this.cutsceneContainer.add([this.cutsceneImage, this.dialogueBox, this.dialogueText]);

        this.tweens.add({
            targets: this.cutsceneImage,
            alpha: 1,
            duration: 1000,
            onComplete: () => this.time.delayedCall(3000, this.showSecondCutscene, [], this)
        });
    }

    showSecondCutscene() {
        this.tweens.add({
            targets: this.cutsceneImage,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                this.cutsceneImage.setTexture('cutscene2');
                this.dialogueText.setText('Who is that!?');
                this.tweens.add({
                    targets: this.cutsceneImage,
                    alpha: 1,
                    duration: 300,
                    onComplete: () => this.time.delayedCall(2000, this.endCutscene, [], this)
                });
            }
        });
    }

    endCutscene() {
        this.tweens.add({
            targets: this.cutsceneContainer,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.cutsceneContainer.destroy();
                this.sounds.cutscenebg.stop();
                this.howToPlay();
            }
        });
    }

    startGame() {
        this.zKey = this.input.keyboard.addKey('Z');
        this.startTime = this.time.now;
        this.cutsceneActive = false;
        this.createBackgrounds();
        this.setupGameElements();
        this.sounds.background.setVolume(0.1).setLoop(true).play();
        this.createUI();
        this.addHint();

        const blackOverlayWidth = this.worldSize - this.goalX;
        this.add.rectangle(this.goalX + blackOverlayWidth / 2, this.height / 2, blackOverlayWidth, this.height, 0x000000)
            .setOrigin(0.5)
            .setDepth(1000);

        this.showObjective();

        if (this.hasMovedEnough) {
            this.time.addEvent({
                delay: this.dementorSpawnTime,
                callback: this.spawnDementor,
                callbackScope: this,
                loop: true
            });
        }
    }

    setupGameElements() {
        this.createPlatforms();
        this.createBoxes();

        // Create player
        this.player = this.physics.add.sprite(100, this.height - 200, 'walk_0')
            .setScale(3)
            .setFlipX(true);
        this.player.body.setSize(this.player.body.width / 2, this.player.body.height)
            .setOffset(this.player.body.width * 1.5, this.player.body.height * 0.3);
        this.player.setBounce(0.1).setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Create animations
        this.cursors = this.input.keyboard.createCursorKeys();
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNames('move', { prefix: 'walk_', start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'spell',
            frames: this.anims.generateFrameNames('spell', { prefix: 'spell_', start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });

        this.player.setTexture('move', 'walk_0');

        // Create groups
        this.dementors = this.physics.add.group();
        this.spells = this.physics.add.group({ defaultKey: 'playerProjectile1', active: false, maxSize: 10 });
        this.powerups = this.physics.add.group();

        // Set up input
        this.input.keyboard.on('keydown-Z', this.castSpell, this);
        this.input.keyboard.on('keydown-D', this.dodge, this);
        this.input.keyboard.on('keydown-X', this.usePowerup, this);

        // Set up collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.boxes);
        this.physics.add.collider(this.player, this.explosiveBoxes);
        this.physics.add.collider(this.dementors, this.platforms);
        this.physics.add.overlap(this.spells, this.dementors, this.hitDementor, null, this);
        this.physics.add.overlap(this.platforms, this.spells, (platform, spell) => spell.destroy(), null, this);
        this.physics.add.overlap(this.boxes, this.spells, (box, spell) => spell.destroy(), null, this);
        this.physics.add.overlap(this.explosiveBoxes, this.spells, this.hitExplosiveBox, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, null, this);
        this.playerDementorCollider = this.physics.add.collider(this.player, this.dementors, this.hitDementor, null, this);

        this.input.keyboard.disableGlobalCapture();
    }

    addHint() {
        // Create help button
        this.helpButton = this.physics.add.sprite(
            this.width - 60,
            120, // Below pause button
            'helpIcon1', // Assumes you have a help icon; replace with appropriate asset
            0
        ).setInteractive({ cursor: 'pointer' })
            .setScrollFactor(0)
            .setDepth(80)
            .setScale(0.09);
        this.helpButton.body.setAllowGravity(false);

        // Add hover effect
        this.helpButton.on('pointerover', () => this.helpButton.setTint(0xcccccc));
        this.helpButton.on('pointerout', () => this.helpButton.clearTint());

        // Show objective on click
        this.helpButton.on('pointerdown', () => this.showObjective());
    }

    showObjective() {
        // Create temporary objective text
       const saveText = this.add.bitmapText(
            this.game.config.width * 0.5,
            this.game.config.height * 0.325,
            'pixelfont',
            "1. Fight the Dementor \n2. Unlock the chest \n3. Go to the end",
            26
        ).setOrigin(0.5, 0.5).setDepth(100).setScrollFactor(0);

        // Add sprite to the container
        const saveRon = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.25,
            'ideabox1'
        ).setScrollFactor(0).setDepth(99).setScale(0.6);

        // Set a timer to destroy the elements after 5 seconds
        this.time.delayedCall(5000, () => {
            saveText.destroy();
            saveRon.destroy();
        });
    }

    createUI() {
        // Initialize heart sprites
        this.heartSprites = [];
        for (let i = 0; i < 3; i++) {
            this.heartSprites.push(
                this.add.sprite(50 + i * 70, 80, 'heart')
                    .setScale(0.06)
                    .setScrollFactor(0)
                    .setDepth(80)
            );
        }

        // Initialize power-up sprites
        this.powerupSprite = this.add.sprite(50, 140, 'powerup')
            .setScale(0.2)
            .setScrollFactor(0)
            .setDepth(80)
            .setVisible(this.hasPowerup); // Reflect initial state

        this.powerupCooldownText = this.add.bitmapText(50, 160, 'pixelfont', '20', 20)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(81)
            .setVisible(false);

        // Initialize cooldown variables
        this.powerupCooldown = 20000; // 20 seconds in milliseconds
        this.lastPowerupTime = 0;

        this.input.keyboard.on('keydown-ESC', () => this.pauseGame());
    //     this.pauseButton = this.add.sprite(this.width - 60, 60, 'pauseButton')
    //         .setOrigin(0.5)
    //         .setScrollFactor(0)
    //         .setScale(3)
    //         .setInteractive({ cursor: 'pointer' })
    //         .on('pointerdown', () => this.pauseGame());
    }

    createBackgrounds() {
        const originalWorldSize = this.width * 3;
        const imageRatio = this.textures.get('trainBackground').getSourceImage().height /
            this.textures.get('trainBackground').getSourceImage().width;
        const bgWidth = originalWorldSize;
        const bgHeight = originalWorldSize * imageRatio * 1.2;
        const numBackgrounds = Math.ceil(this.worldSize / bgWidth);

        this.backgrounds = [];
        for (let i = 0; i < numBackgrounds; i++) {
            const bg = this.add.image(i * bgWidth, (this.height - bgHeight) / 2, "trainBackground")
                .setOrigin(0, 0)
                .setDepth(-1);
            bg.displayWidth = bgWidth;
            bg.displayHeight = bgHeight;
            this.backgrounds.push(bg);
        }
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        const originalWorldSize = this.width * 3;
        const segmentWidth = originalWorldSize;
        const numSegments = Math.ceil(this.worldSize / segmentWidth);

        for (let i = 0; i < numSegments; i++) {
            this.platforms.create(i * segmentWidth + segmentWidth / 2, this.height * 0.86, 'platform')
                .setScale(originalWorldSize / 64, 0.035)
                .setOrigin(0.5, 1)
                .refreshBody();
        }
    }

    createBoxes() {
        this.boxes = this.physics.add.staticGroup();
        this.explosiveBoxes = this.physics.add.staticGroup();
        this.explosiveBoxArrows = []; // Array to store arrow sprites
        const boxHeight = 60;
        const boxWidth = 60;
        const platformY = this.height * 0.92;
        const segmentWidth = this.width * 0.5;
        const numSegments = Math.ceil(this.worldSize / segmentWidth);

        const patterns = [
            (x, y) => [
                { x, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - 2 * boxHeight, width: boxWidth, height: boxHeight }
            ],
            (x, y) => [{ x, y: y - boxHeight, width: boxWidth, height: boxHeight }],
            (x, y) => [
                { x, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - 2 * boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth * 2, y: y - boxHeight, width: boxWidth, height: boxHeight }
            ],
            (x, y) => [
                { x, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + 2 * boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + 2 * boxHeight, y: y - 2 * boxHeight, width: boxWidth, height: boxHeight }
            ],
            (x, y) => [
                { x, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight }
            ],
            (x, y) => [
                { x, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - 2 * boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth * 2, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + 2 * boxWidth, y: y - 2 * boxHeight, width: boxWidth, height: boxHeight }
            ],
            (x, y) => [{ x, y: y - boxHeight, width: boxWidth, height: boxHeight }],
            (x, y) => [
                { x: x - boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight },
                { x: x + boxWidth, y: y - 2 * boxHeight, width: boxWidth, height: boxHeight },
                { x: x + 2 * boxWidth, y: y - boxHeight, width: boxWidth, height: boxHeight }
            ],
            (x, y) => [{ x, y: y - boxHeight, width: boxWidth, height: boxHeight, explosive: true }]
        ];

        let segmentIndex = 0;
        for (let i = 0; segmentIndex < numSegments - 1; i++) {
            const baseX = segmentIndex * segmentWidth + segmentWidth / 2;
            let patternIndex = i % (patterns.length - 1);

            if (patternIndex === 3) {
                patterns[patternIndex](baseX, platformY).forEach(box => {
                    this.boxes.create(box.x, box.y, 'box')
                        .setDisplaySize(box.width, box.height)
                        .setOrigin(0.5, 1)
                        .refreshBody();
                });

                const explosiveBaseX = baseX + 5 * boxWidth;
                patterns[8](explosiveBaseX, platformY).forEach(box => {
                    const explosiveBox = this.explosiveBoxes.create(box.x, box.y, 'explosiveBox')
                        .setDisplaySize(box.width, box.height)
                        .setOrigin(0.5, 1)
                        .refreshBody();
                    // Create arrow above explosive box
                    const arrow = this.add.sprite(box.x, box.y - box.height + 100, 'downarrow')
                        .setScale(0.2)
                        .setDepth(10)
                        .setScrollFactor(1);
                    this.explosiveBoxArrows.push({ box: explosiveBox, arrow });
                });
                segmentIndex++;
            } else {
                patterns[patternIndex](baseX, platformY).forEach(box => {
                    const group = box.explosive ? this.explosiveBoxes : this.boxes;
                    const createdBox = group.create(box.x, box.y, box.explosive ? 'explosiveBox' : 'box')
                        .setDisplaySize(box.width, box.height)
                        .setOrigin(0.5, 1)
                        .refreshBody();
                    if (box.explosive) {
                        // Create arrow above explosive box
                        const arrow = this.add.sprite(box.x, box.y - box.height + 100, 'downarrow')
                            .setScale(0.5)
                            .setDepth(10)
                            .setScrollFactor(1);
                        this.explosiveBoxArrows.push({ box: createdBox, arrow });
                    }
                });
                segmentIndex++;
            }
        }
    }

    getNearestExplosiveBox() {
        let nearestBox = null;
        let minDistance = 300; // Range for "near" (pixels)
        this.explosiveBoxes.getChildren().forEach(box => {
            if (box.active) {
                const dx = box.x - this.player.x;
                const dy = box.y - this.player.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestBox = box;
                }
            }
        });
        return nearestBox;
    }

    hitExplosiveBox(spell, box) {
        this.sounds.destroy.play();
        this.vfx.createEmitter('explosiveBox', box.x, box.y, 0.05, 0, 500).explode(50);
        spell.destroy();
        box.destroy();

        // 50% chance for powerup, 50% for mildpowerup
        const powerupType = 'powerup';
        const powerup = this.powerups.create(box.x, box.y - 30, powerupType)
            .setScale(0.1)
            .setBounce(0.5)
            .setCollideWorldBounds(true)
            .setData('type', powerupType);
        powerup.body.setAllowGravity(true);

        // Bounce animation
        this.tweens.add({
            targets: powerup,
            y: powerup.y - 20,
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Despawn after 5 seconds
        this.time.delayedCall(5000, () => {
            if (powerup.active) powerup.destroy();
        });
    }

    triggerChestAnimation() {
        const animatedSprite = this.add.sprite(
            this.width * 0.5,
            this.height * 0.825,
            ''
        );
        animatedSprite.setDepth(10).setScrollFactor(0).setScale(4);

        animatedSprite.play('goldChest');

        animatedSprite.on('animationcomplete', function () {
            // Create power-up image after chest animation completes
            const powerI = this.add.sprite(
                this.width * 0.5,
                this.height * 0.725,
                'powerup'
            );
            powerI.setDepth(9).setScrollFactor(0).setScale(0.2);

            this.tweens.add({
                targets: powerI,
                y: this.height * 0.5,
                scaleX: 0.25,
                scaleY: 0.25,
                duration: 500,
                ease: 'Power1',
                onComplete: () => {
                    // Add bitmap text for "Press 'X' to use Ability"
                    const abilityText = this.add.bitmapText(
                        this.game.config.width * 0.5,
                        this.game.config.height * 0.4,
                        'pixelfont',
                        "Press 'X' to use Ability\nNear the enemy",
                        26
                    ).setOrigin(0.5, 0.5).setDepth(100).setScrollFactor(0);

                    // Add ideabox1 sprite behind the text
                    const abilityBox = this.add.sprite(
                        this.game.config.width * 0.5,
                        this.game.config.height * 0.325,
                        'ideabox1'
                    ).setScrollFactor(0).setDepth(99).setScale(0.6);

                    animatedSprite.destroy();
                    powerI.destroy();

                    // Destroy text and box after 5 seconds
                    this.time.delayedCall(5000, () => {
                        abilityText.destroy();
                        abilityBox.destroy();
                        // Ensure power-up sprite is visible after animation
                        if (this.hasPowerup) {
                            this.powerupSprite.setVisible(true);
                            this.powerupCooldownText.setVisible(false);
                        }
                    });
                }
            });
        }, this);
    }

    collectPowerup(player, powerup) {
    this.showQuiz().then(isCorrect => {
        if (isCorrect) {
            console.log("Right answer!");
            this.sounds.powerup.play();
            this.triggerChestAnimation();

            const type = powerup.getData('type');
            powerup.destroy();

            const currentTime = this.time.now;
           
                this.hasPowerup = true;
                this.powerupSprite.setVisible(true); // Ensure sprite is visible
                this.powerupCooldownText.setVisible(false); // Hide cooldown text
                this.lastPowerupTime = 0; // Reset cooldown to allow immediate use
            
        } else {
            console.log("Wrong answer!");
        }
    }).catch(error => {
        console.log("Quiz error:", error);
    });
}
    usePowerup() {
        if (this.cutsceneActive || this.gameIsOver || !this.player) return;

        const currentTime = this.time.now;
        if (!this.hasPowerup || currentTime - this.lastPowerupTime < this.powerupCooldown) {
           this.sounds.lose.play();
            return;
        }

        this.hasPowerup = false;
        this.lastPowerupTime = currentTime;
        this.powerupSprite.setVisible(true);
        this.powerupCooldownText.setVisible(true).setText('20');
        this.sounds.powerup.play();

        // Flashbang effect: Bright white screen flash
        const flash = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0xffffff)
            .setScrollFactor(0)
            .setDepth(1000)
            .setAlpha(0.9);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 600,
            ease: 'Power2',
            onComplete: () => flash.destroy()
        });

        // Radial light burst (shockwave)
        const burst = this.add.circle(this.player.x, this.player.y, 50, 0xffffff, 0.7)
            .setDepth(999);
        this.tweens.add({
            targets: burst,
            radius: 500,
            alpha: 0,
            duration: 800,
            ease: 'Power3',
            onUpdate: () => {
                burst.setPosition(this.player.x, this.player.y);
            },
            onComplete: () => burst.destroy()
        });

        // Enhanced particle burst for flashbang effect
        this.vfx.createEmitter('spell', this.player.x, this.player.y, 0.07, 0, 700)
            .explode(150);

        // Existing pulse effect (blue radial pulse)
        const pulse = this.add.circle(this.player.x, this.player.y, 50, 0x00aaff, 0.5)
            .setDepth(998);
        this.tweens.add({
            targets: pulse,
            radius: Math.max(this.width, this.height),
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onUpdate: () => {
                pulse.setPosition(this.player.x, this.player.y);
            },
            onComplete: () => pulse.destroy()
        });

        // Freeze all active dementors at their current position
        this.dementors.getChildren().forEach(dementor => {
            if (dementor.active) {
                console.log(`Powerup: Stunning dementor at (${dementor.x}, ${dementor.y}), isAttacking: ${dementor.getData('isAttacking')}`);
                dementor.setData('isStunned', true);
                this.tweens.killTweensOf(dementor);
                dementor.setVelocity(0, 0);
                dementor.body.stop();
                dementor.anims.stop();
                dementor.setAlpha(0.5);
                if (dementor === this.data.get('currentAttacker')) {
                    this.data.set('currentAttacker', null);
                }
                dementor.setData('homeX', dementor.x);
                dementor.setData('homeY', dementor.y);
                this.tweens.add({
                    targets: dementor,
                    scale: 2.1,
                    duration: 200,
                    yoyo: true,
                    repeat: Math.floor(this.powerupStunDuration / 400)
                });
                this.time.delayedCall(this.powerupStunDuration, () => {
                    if (dementor.active) {
                        console.log(`Powerup: Resuming dementor at (${dementor.x}, ${dementor.y}), isAttacking: ${dementor.getData('isAttacking')}`);
                        dementor.setData('isStunned', false);
                        dementor.setScale(2);
                        dementor.setAlpha(1);
                        if (dementor.getData('isAttacking')) {
                            dementor.play('attack');
                            const directionX = this.player.x - dementor.x;
                            const directionY = this.player.y - dementor.y;
                            const length = Math.sqrt(directionX * directionX + directionY * directionY);
                            if (length > 0) {
                                dementor.setVelocityX((directionX / length) * 200);
                                dementor.setVelocityY((directionX / length) * 200);
                                dementor.flipX = directionX < 0;
                            }
                        } else {
                            dementor.play('deathWarder');
                            this.tweens.add({
                                targets: dementor,
                                y: dementor.y - 15,
                                duration: 1500,
                                ease: 'Sine.easeInOut',
                                yoyo: true,
                                repeat: -1
                            });
                        }
                    }
                });
            }
        });

        // Camera shake with cooldown
        if (currentTime >= this.lastShakeTime + 1000) {
            this.cameras.main.shake(300, 0.01);
            this.lastShakeTime = currentTime;
        }

        // Reset power-up after cooldown
        this.time.delayedCall(this.powerupCooldown, () => {
            if (!this.gameIsOver && !this.cutsceneActive) {
                this.hasPowerup = true;
                this.powerupSprite.setVisible(true);
                this.powerupCooldownText.setVisible(false);
                console.log('Power-up ready again after cooldown');
            }
        });
    }


    // Function to get a new unasked question
    getNewQuestion() {
        if (this.questionPool.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.questionPool.length);
        const question = this.questionPool.splice(randomIndex, 1)[0];
        askedQuestions.push(question);
        return question;
    }

    // Quiz function
    showQuiz() {
        // If a quiz is already active, return a rejected promise
        if (this.isQuizActive) {
            console.log("Quiz already in progress, ignoring request");
            return Promise.reject("Quiz already in progress");
        }

        console.log("Quiz started");
        this.isQuizActive = true; // Mark quiz as active

        // Return a Promise that resolves when selection is made
        return new Promise((resolve) => {
            // Pause physics and player movement during quiz
            this.physics.pause();
            const prevPlayerControlsEnabled = this.playerControlsEnabled;
            this.playerControlsEnabled = false;

            // Create black transparent overlay
            const overlay = this.add.rectangle(this.width / 2, this.height / 2,
                this.width, this.height, 0x000000, 0.7)
                .setOrigin(0.5)
                .setDepth(20)
                .setScrollFactor(0);

            // Add quiz panel image
            const quizPanel = this.add.image(this.width / 2, this.height / 2, 'quizPanels')
                .setScale(1)
                .setDepth(21)
                .setScrollFactor(0);

            // Get a new question
            const currentQuestion = this.getNewQuestion();
            if (!currentQuestion) {
                console.log('No more questions available!');
                overlay.destroy();
                quizPanel.destroy();

                // Resume physics and player control
                this.physics.resume();
                this.playerControlsEnabled = prevPlayerControlsEnabled;
                this.isQuizActive = false; // Mark quiz as inactive

                resolve(false); // Resolve with false if no questions
                return;
            }
            console.log("Question loaded:", currentQuestion.question);

            // Add question text on the yellow part
            const questionText = this.add.bitmapText(
                this.width / 2,
                this.height / 2 - 100,
                'pixelfont',
                currentQuestion.question,
                40
            )
                .setOrigin(0.5)
                .setTint(0xFF0000) // Red text for contrast on yellow
                .setDepth(22)
                .setScrollFactor(0);

            // Create an array to hold all UI elements for easy cleanup
            const uiElements = [overlay, quizPanel, questionText];

            // Arrange options in a 2x2 grid
            const optionXPositions = [this.width * 0.33, this.width * 0.65]; // Two columns
            const optionYPositions = [this.height * 0.55, this.height * 0.73]; // Two row
            const optionTexts = [];

            currentQuestion.options.forEach((option, index) => {
                const row = Math.floor(index / 2);
                const col = index % 2;
                const optionText = this.add.bitmapText(
                    optionXPositions[col],
                    optionYPositions[row],
                    'pixelfont',
                    option,
                    30
                )
                    .setOrigin(0.5)
                    .setTint(0xFFFFFF) // Initial white text
                    .setDepth(22)
                    .setInteractive({ useHandCursor: true })
                    .setScrollFactor(0);

                optionText.on('pointerdown', () => {
                    // Handle click on option
                    handleOptionClick(option, index);
                });

                optionTexts.push(optionText);
                uiElements.push(optionText);
            });

            console.log("Options displayed");

            // Function to handle option clicks
            const handleOptionClick = (clickedOption, clickedIndex) => {
                // Disable all options to prevent multiple clicks
                optionTexts.forEach(text => text.disableInteractive());

                const isCorrect = clickedOption === currentQuestion.correctAnswer;

                // Set color based on correctness (green if correct, red if wrong)
                optionTexts[clickedIndex].setTint(isCorrect ? 0x00FF00 : 0xFF0000);

                // If wrong, highlight the correct answer in green
                if (!isCorrect) {
                    const correctIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);
                    if (correctIndex >= 0) {
                        optionTexts[correctIndex].setTint(0x00FF00);
                    }
                }

                console.log("Answer selected:", clickedOption, "Correct:", isCorrect);

                // Delay to allow player to see the result, then clean up
                this.time.delayedCall(1500, () => {
                    console.log("Cleaning up quiz UI");

                    // Safely destroy all UI elements
                    uiElements.forEach(element => {
                        if (element && element.active) {
                            element.destroy();
                        }
                    });

                    // Resume physics and player control
                    this.physics.resume();
                    this.playerControlsEnabled = prevPlayerControlsEnabled;
                    this.isQuizActive = false; // Mark quiz as inactive

                    // Resolve the promise with the result
                    resolve(isCorrect);
                });
            };

            console.log("Quiz interaction ready");
        });
    }


    // useMildPowerup() {
    //     if (this.cutsceneActive || this.gameIsOver || !this.player) return;

    //     const currentTime = this.time.now;
    //     if (!this.hasMildPowerup || currentTime - this.lastMildPowerupTime < this.mildPowerupCooldown) {
    //         this.sounds.lose.play();
    //         this.mildPowerupText.setTint(0xff0000);
    //         this.time.delayedCall(200, () => this.mildPowerupText.setTint(0xffffff));
    //         return;
    //     }

    //     this.hasMildPowerup = false;
    //     this.lastMildPowerupTime = currentTime;
    //     this.mildPowerupText.setText('MILDPOWERUP COOLDOWN').setTint(0xffffff);
    //     this.mildPowerupSprite.setVisible(false);
    //     this.mildPowerupCooldownText.setVisible(true).setText('10');
    //     this.sounds.powerup.play();

    //     // Flashbang effect: Smaller white screen flash
    //     const flash = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0xffffff)
    //         .setScrollFactor(0)
    //         .setDepth(1000)
    //         .setAlpha(0.6);
    //     this.tweens.add({
    //         targets: flash,
    //         alpha: 0,
    //         duration: 400,
    //         ease: 'Power2',
    //         onComplete: () => flash.destroy()
    //     });

    //     // Smaller radial light burst (shockwave)
    //     const burst = this.add.circle(this.player.x, this.player.y, 30, 0xffffff, 0.5)
    //         .setDepth(999);
    //     this.tweens.add({
    //         targets: burst,
    //         radius: 300,
    //         alpha: 0,
    //         duration: 600,
    //         ease: 'Power3',
    //         onUpdate: () => {
    //             burst.setPosition(this.player.x, this.player.y);
    //         },
    //         onComplete: () => burst.destroy()
    //     });

    //     // Moderate particle burst for flashbang effect
    //     this.vfx.createEmitter('spell', this.player.x, this.player.y, 0.04, 0, 400)
    //         .explode(80);

    //     // Expanding glowing circle effect
    //     const initialRadius = 50;
    //     const maxRadius = 400;
    //     const explosion = this.add.circle(this.player.x, this.player.y, initialRadius, 0x00ffcc, 0.7)
    //         .setDepth(998);
    //     this.tweens.add({
    //         targets: explosion,
    //         radius: maxRadius,
    //         alpha: 0,
    //         duration: 800,
    //         ease: 'Power2',
    //         onUpdate: () => {
    //             explosion.setPosition(this.player.x, this.player.y);
    //             const interpolatedColor = Phaser.Display.Color.Interpolate.ColorWithColor(
    //                 { r: 0, g: 255, b: 204 },
    //                 { r: 255, g: 255, b: 255 },
    //                 maxRadius,
    //                 explosion.radius
    //             );
    //             const colorObject = new Phaser.Display.Color(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b);
    //             explosion.fillColor = colorObject.color;
    //         },
    //         onComplete: () => explosion.destroy()
    //     });

    //     // Pulsing glow effect
    //     this.tweens.add({
    //         targets: explosion,
    //         alpha: 0.4,
    //         duration: 100,
    //         yoyo: true,
    //         repeat: 3
    //     });

    //     // Collect and sort nearby dementors by distance
    //     const nearbyDementors = [];
    //     this.dementors.getChildren().forEach(dementor => {
    //         if (dementor.active) {
    //             const dx = dementor.x - this.player.x;
    //             const dy = dementor.y - this.player.y;
    //             const distance = Math.sqrt(dx * dx + dy * dy);
    //             const isInRange = distance <= maxRadius && dy <= 0;
    //             if (isInRange) {
    //                 nearbyDementors.push({ dementor, distance });
    //             }
    //         }
    //     });

    //     // Sort by distance and take the 2 closest
    //     nearbyDementors.sort((a, b) => a.distance - b.distance);
    //     const toStun = nearbyDementors.slice(0, 2);

    //     // Freeze the selected dementors
    //     toStun.forEach(({ dementor }, index) => {
    //         if (dementor.active) {
    //             console.log(`MildPowerup: Stunning dementor ${index + 1} at (${dementor.x}, ${dementor.y}), isAttacking: ${dementor.getData('isAttacking')}`);
    //             dementor.setData('isStunned', true);
    //             this.tweens.killTweensOf(dementor);
    //             dementor.setVelocity(0, 0);
    //             dementor.body.stop();
    //             dementor.anims.stop();
    //             dementor.setAlpha(0.5);
    //             if (dementor === this.data.get('currentAttacker')) {
    //                 this.data.set('currentAttacker', null);
    //             }
    //             dementor.setData('homeX', dementor.x);
    //             dementor.setData('homeY', dementor.y);
    //             this.tweens.add({
    //                 targets: dementor,
    //                 scale: 2.1,
    //                 duration: 200,
    //                 yoyo: true,
    //                 repeat: Math.floor(this.powerupStunDuration / 400)
    //             });
    //             this.time.delayedCall(this.powerupStunDuration, () => {
    //                 if (dementor.active) {
    //                     console.log(`MildPowerup: Resuming dementor ${index + 1} at (${dementor.x}, ${dementor.y}), isAttacking: ${dementor.getData('isAttacking')}`);
    //                     dementor.setData('isStunned', false);
    //                     dementor.setScale(2);
    //                     dementor.setAlpha(1);
    //                     if (dementor.getData('isAttacking')) {
    //                         dementor.play('attack');
    //                         const directionX = this.player.x - dementor.x;
    //                         const directionY = this.player.y - dementor.y;
    //                         const length = Math.sqrt(directionX * directionX + directionY * directionY);
    //                         if (length > 0) {
    //                             dementor.setVelocityX((directionX / length) * 200);
    //                             dementor.setVelocityY((directionX / length) * 200);
    //                             dementor.flipX = directionX > 0;
    //                         }
    //                     } else {
    //                         dementor.play('deathWarder');
    //                         this.tweens.add({
    //                             targets: dementor,
    //                             y: dementor.y - 15,
    //                             duration: 1500,
    //                             ease: 'Sine.easeInOut',
    //                             yoyo: true,
    //                             repeat: -1
    //                         });
    //                     }
    //                 }
    //             });
    //         }
    //     });

    //     // Camera shake with cooldown
    //     if (currentTime >= this.lastShakeTime + 1000) {
    //         this.cameras.main.shake(300, 0.01);
    //         this.lastShakeTime = currentTime;
    //     }
    // }

    setupTouchControls() {
        // Touch controls disabled
    }

    update(time, delta) {
        if (this.cutsceneActive || this.gameIsOver || !this.player) return;

        this.backgrounds.forEach(bg => bg.tilePositionX = this.cameras.main.scrollX * 0.6);

        // Player movement
        if (!this.isCastingSpell) { // Only allow movement animations if not casting
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-300).setFlipX(false);
                if (!this.player.anims.isPlaying) this.player.play('move');
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(300).setFlipX(true);
                if (!this.player.anims.isPlaying) this.player.play('move');
            } else {
                this.player.setVelocityX(0).anims.stop().setTexture('move', 'walk_0');
            }
        }

        if (this.input.keyboard.checkDown(this.cursors.up, 0) && this.player.body.touching.down) {
            this.sounds.jump.play();
            this.player.setVelocityY(-350);
        }

        if (this.player.y > this.height) {
            this.hitDementor(this.player, null);
        }

        // Update UI
        const isSpellReady = this.canCastSpell && (time - this.lastSpellTime >= this.spellCooldown);

        this.player.setTint(this.isDodging ? 0xaaaaaa : 0xffffff).setScale(this.isDodging ? 3.2 : 3);

        // Update power-up cooldowns
        const powerupTimeLeft = this.powerupCooldown - (time - this.lastPowerupTime);
        if (powerupTimeLeft > 0 && !this.hasPowerup) {
            this.powerupCooldownText.setVisible(true).setText(Math.ceil(powerupTimeLeft / 1000));
            this.powerupSprite.setVisible(false);
        } else if (this.hasPowerup) {
            this.powerupCooldownText.setVisible(false);
            this.powerupSprite.setVisible(true);
        } else {
            this.powerupCooldownText.setVisible(false);
            this.powerupSprite.setVisible(false);
        }

        // Update explosive box arrows
        this.explosiveBoxArrows.forEach(({ box, arrow }) => {
            if (box.active) {
                arrow.setPosition(box.x, box.y - box.height - 30);
                arrow.setVisible(true);
            } else {
                arrow.setVisible(false);
            }
        });

        if (this.player.x >= this.goalX) {
            this.winGame();
        }

        // Dementor spawning
        if (this.dementors.countActive() === 0 && this.hasMovedEnough) {
            this.spawnDementor();
        } else {
            let allOutOfView = true;
            this.dementors.getChildren().forEach(dementor => {
                if (dementor.active && dementor.x >= this.cameras.main.scrollX - this.width) {
                    allOutOfView = false;
                }
            });
            if (allOutOfView && this.hasMovedEnough) {
                this.dementors.getChildren().forEach(dementor => {
                    if (dementor.active && !dementor.getData('isAttacking')) {
                        if (dementor === this.data.get('currentAttacker')) {
                            this.data.set('currentAttacker', null);
                        }
                        console.log(`Destroying out-of-view dementor at x=${dementor.x}`);
                        dementor.destroy();
                    }
                });
                this.spawnDementor();
            }
        }

        if (!this.hasMovedEnough && this.player.x > 200) {
            this.hasMovedEnough = true;
            this.spawnDementor();
        }

        this.dementors.getChildren().forEach(dementor => {
            if (dementor.active && !dementor.getData('isStunned')) {
                this.updateDementorMovement(dementor);
            } else if (dementor.active && dementor.getData('isStunned')) {
                dementor.setVelocity(0, 0);
                dementor.body.stop();
            }
        });
    }


    spawnDementor() {
        if (this.gameIsOver || this.cutsceneActive) return;

        let visibleDementors = 0;
        this.dementors.getChildren().forEach(dementor => {
            if (dementor.active && this.cameras.main.worldView.contains(dementor.x, dementor.y)) {
                visibleDementors++;
            }
        });

        if (visibleDementors >= this.maxDementorsInView) return;

        const baseX = this.cameras.main.scrollX + this.width + 50;
        const trainTopY = this.height * 0.4;
        const trainBottomY = this.height * 0.6;
        const minXSeparation = 100;
        const minYSeparation = 50;
        const maxAttempts = 10;

        for (let i = visibleDementors; i < this.maxDementorsInView; i++) {
            let x, y, attempts = 0, validPosition = false;

            while (attempts < maxAttempts && !validPosition) {
                x = baseX + Phaser.Math.Between(0, 300);
                y = Phaser.Math.Between(trainTopY, trainBottomY);
                validPosition = true;

                for (let dementor of this.dementors.getChildren()) {
                    if (dementor.active && (Math.abs(x - dementor.x) < minXSeparation || Math.abs(y - dementor.y) < minYSeparation)) {
                        validPosition = false;
                        break;
                    }
                }
                attempts++;
            }

            if (!validPosition) {
                x = baseX + (i * minXSeparation);
                y = trainTopY + (i % 2 === 0 ? 0 : (trainBottomY - trainTopY));
            }

            const dementor = this.dementors.create(x, y, 'deathWarder')
                .setScale(2)
                .setCollideWorldBounds(true);
            dementor.body.setAllowGravity(false)
                .setSize(dementor.body.width / 1.5, dementor.body.height);
            dementor.play('deathWarder')
                .setVelocityX(-50)
                .setFlipX(false)
                .setData({
                    homeX: x - 50,
                    homeY: y,
                    isAttacking: false,
                    isStunned: false,
                    detectionRange: 800, // How far the dementor can see the player
                    pushStrength: 100   // How strongly the dementor pushes the player
                });

            this.time.delayedCall(1000, () => {
                if (dementor.active && !dementor.getData('isStunned') && !this.data.get('playerDetected')) {
                    dementor.setVelocityX(0);
                    this.tweens.add({
                        targets: dementor,
                        y: y - 15,
                        duration: 1500,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            });
        }
    }

    updateDementorMovement(dementor) {
    if (!dementor.active || !this.player || this.gameIsOver || this.cutsceneActive || dementor.getData('isStunned')) {
        return;
    }

    // Check if player is near the goal
    const goalProximityThreshold = 700; // Distance in pixels
    const distanceToGoal = Math.abs(this.player.x - this.goalX);
    const isPlayerNearGoal = distanceToGoal < goalProximityThreshold;

    if (isPlayerNearGoal) {
        // Stop pursuit and return to home position
        this.tweens.killTweensOf(dementor);
        const homeX = dementor.getData('homeX');
        const homeY = dementor.getData('homeY');

        if (Math.abs(dementor.x - homeX) > 5 || Math.abs(dementor.y - homeY) > 5) {
            this.tweens.add({
                targets: dementor,
                x: homeX,
                y: homeY,
                duration: 1000,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    if (dementor.active && !dementor.getData('isStunned')) {
                        dementor.setVelocity(0, 0);
                        this.tweens.add({
                            targets: dementor,
                            y: homeY - 15,
                            duration: 1500,
                            ease: 'Sine.easeInOut',
                            yoyo: true,
                            repeat: -1
                        });
                    }
                }
            });
        }
        return; // Exit function to prevent further pursuit logic
    }

    // Existing logic for when player is not near goal
    const playerDetected = this.checkPlayerDetection();

    const dx = this.player.x - dementor.x;
    const dy = this.player.y - dementor.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const attackRange = 150;

    if (playerDetected) {
        this.tweens.killTweensOf(dementor);
        const directionX = this.player.x - dementor.x;
        const directionY = this.player.y - dementor.y;
        const length = Math.sqrt(directionX * directionX + directionY * directionY);

        if (length > 0) {
            const baseSpeed = 150;
            const speedMultiplier = Math.min(2, length / 200);
            const speed = baseSpeed * speedMultiplier;

            dementor.setVelocityX((directionX / length) * speed);
            dementor.setVelocityY((directionY / length) * speed);
            dementor.flipX = directionX > 0;

            if (distance <= attackRange && dementor.anims.getName() !== 'attack') {
                dementor.play('attack');
            } else if (distance > attackRange && dementor.anims.getName() === 'attack') {
                dementor.play('deathWarder');
            }

            if (distance < 150) {
                this.applyPushEffect(dementor);
            }
        }
    } else {
        const homeX = dementor.getData('homeX');
        const homeY = dementor.getData('homeY');

        if (Math.abs(dementor.x - homeX) > 5 || Math.abs(dementor.y - homeY) > 5) {
            this.tweens.add({
                targets: dementor,
                x: homeX,
                y: homeY,
                duration: 1000,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    if (dementor.active && !dementor.getData('isStunned')) {
                        dementor.setVelocity(0, 0);
                        this.tweens.add({
                            targets: dementor,
                            y: homeY - 15,
                            duration: 1500,
                            ease: 'Sine.easeInOut',
                            yoyo: true,
                            repeat: -1
                        });
                    }
                }
            });
        }
    }
}

    // New function to check if any dementor can detect the player
    checkPlayerDetection() {
        if (!this.player) return false;

        let playerDetected = false;

        this.dementors.getChildren().forEach(dementor => {
            if (!dementor.active || dementor.getData('isStunned')) return;

            const distance = Phaser.Math.Distance.Between(
                dementor.x, dementor.y,
                this.player.x, this.player.y
            );

            // If any dementor can see the player, all dementors are alerted
            if (distance < dementor.getData('detectionRange')) {
                playerDetected = true;
                // Set a game-level flag that player has been detected
                this.data.set('playerDetected', true);

                // Optional: Play a sound when player is first detected
                if (!this.data.get('detectionSoundPlayed')) {
                    if (this.sounds && this.sounds.dementorAlert) {
                        this.sounds.dementorAlert.play();
                    }
                    this.data.set('detectionSoundPlayed', true);
                }
            }
        });

        return playerDetected;
    }

    // New function to apply push effect to player
    applyPushEffect(dementor) {
        if (!this.player || !dementor.active) return;

        const directionX = this.player.x - dementor.x;
        const directionY = this.player.y - dementor.y;
        const distance = Math.sqrt(directionX * directionX + directionY * directionY);

        if (distance < 150) {
            // Calculate push strength based on proximity (stronger when closer)
            const pushFactor = 1 - (distance / 150); // 0-1 value, 1 when closest
            const pushStrength = dementor.getData('pushStrength') * pushFactor;

            // Calculate push vector (away from dementor)
            let pushX = (directionX / distance) * pushStrength;
            let pushY = (directionY / distance) * pushStrength;

            // Important: Only push backward (negative X) to prevent forward movement
            if (pushX > 0) {
                pushX = -pushStrength; // Force push backward
            }

            // Apply push force to player
            this.player.setVelocityX(pushX);
            this.player.setVelocityY(pushY * 0.5); // Reduced vertical push

            // Visual and audio feedback
            if (!this.data.get('pushEffectActive')) {
                this.data.set('pushEffectActive', true);

                // Optional: Add screen shake effect
                this.cameras.main.shake(100, 0.005);

                // Optional: Play sound
                if (this.sounds && this.sounds.dementorPush) {
                    this.sounds.dementorPush.play();
                }

                // Reset the effect flag after a short delay
                this.time.delayedCall(200, () => {
                    this.data.set('pushEffectActive', false);
                });
            }
        }
    }

    // Keep this function for backward compatibility
    returnDementor(dementor) {
        // This function is now only used when a dementor is hit by a spell
        if (!dementor.active) return;

        // Set dementor as stunned temporarily
        dementor.setData('isStunned', true);
        dementor.setTint(0x6666ff); // Blue tint to indicate stunned state

        // Stop the dementor
        dementor.setVelocity(0, 0);

        // Play stunned animation if available
        if (dementor.anims.exists('stunned')) {
            dementor.play('stunned');
        }

        // Recovery after stun duration
        this.time.delayedCall(3000, () => {
            if (dementor.active) {
                dementor.setData('isStunned', false);
                dementor.clearTint();

                // Return to normal behavior
                const homeX = dementor.getData('homeX');
                const homeY = dementor.getData('homeY');

                // Check if the player is still detected
                if (this.data.get('playerDetected')) {
                    // Resume attack
                    dementor.play('attack');
                } else {
                    // Or return to home position
                    dementor.play('deathWarder');
                    this.tweens.add({
                        targets: dementor,
                        x: homeX,
                        y: homeY,
                        duration: 1000,
                        ease: 'Sine.easeOut',
                        onComplete: () => {
                            if (dementor.active && !dementor.getData('isStunned')) {
                                dementor.setVelocity(0, 0).setFlipX(true);
                                this.tweens.add({
                                    targets: dementor,
                                    y: homeY - 15,
                                    duration: 1500,
                                    ease: 'Sine.easeInOut',
                                    yoyo: true,
                                    repeat: -1
                                });
                            }
                        }
                    });
                }
            }
        });
    }
    getNearestDementor() {
        let nearestDementor = null;
        let minDistance = Infinity;
        this.dementors.getChildren().forEach(dementor => {
            if (dementor.active) {
                const dx = dementor.x - this.player.x;
                const dy = dementor.y - this.player.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestDementor = dementor;
                }
            }
        });
        return nearestDementor;
    }
    throwSpell(isPlayerThrowing = true, spellType = 'normal') {
    if (!this.player) return;

    let startX, velocityX, velocityY, shooterY;
    const nearestDementor = this.getNearestDementor();

    if (isPlayerThrowing && nearestDementor) {
        startX = this.player.x + 80;
        shooterY = this.player.y - 20;
        const dx = nearestDementor.x - startX;
        const dy = nearestDementor.y - shooterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 1200;
        velocityX = (dx / distance) * speed;
        velocityY = (dy / distance) * speed;
    } else {
        startX = this.player.x + (this.player.flipX ? 80 : -80);
        shooterY = this.player.y - 20;
        velocityX = (this.player.flipX ? 1 : -1) * 600;
        velocityY = 0;
    }

    let spell = this.spells.getFirstDead(true, startX, shooterY);

    if (spell) {
        this.isCastingSpell = true; // Set flag
        this.player.setFlipX(false);
        this.player.play('spell'); // Play spell animation
        // Ensure animation completes
        this.player.once('animationcomplete', () => {
            this.isCastingSpell = false; // Reset flag after animation
        });

        spell.setActive(true)
            .setVisible(true)
            .setScale(0.5)
            .setVelocityX(velocityX)
            .setVelocityY(velocityY)
            .setTint(0xffffff);
        spell.rotation = Math.atan2(velocityY, velocityX);

        if (spell.body) {
            spell.body.enable = true;
            spell.body.setAllowGravity(false);
            spell.body.setSize(spell.width * 0.7, spell.height * 0.3);
        }

        if (this.lights && this.lights.addLight) {
            const light = this.lights.addLight(startX, shooterY, 100, 0x00aaff, 1);
            this.time.addEvent({
                delay: 16,
                repeat: 250,
                callback: () => {
                    if (spell.active) {
                        light.x = spell.x;
                        light.y = spell.y;
                    } else {
                        light.setVisible(false);
                    }
                }
            });
        }

        console.log(`Spell cast at (${startX}, ${shooterY}), active spells: ${this.spells.countActive(true)}`);

        this.time.delayedCall(4000, () => {
            if (spell && spell.active) {
                spell.setActive(false);
                spell.setVisible(false);
                if (spell.body) {
                    spell.body.enable = false;
                    spell.body.setVelocity(0, 0);
                }
                spell.setPosition(-100, -100);
                console.log(`Spell despawned, active spells: ${this.spells.countActive(true)}`);
            }
        });

        return true;
    } else {
        console.warn('No available spell in pool');
        return false;
    }
}

    castSpell() {
        if (this.cutsceneActive || this.isDodging || !this.player) return;

        const currentTime = this.time.now;
        if (currentTime - this.lastSpellTime < this.spellCooldown) {
            console.log('Spell on cooldown:', (currentTime - this.lastSpellTime) / 1000, 'seconds passed');
            return;
        }

        if (this.throwSpell(true, 'normal')) {
            this.lastSpellTime = currentTime;
            this.canCastSpell = false;
            this.sounds.shoot.play();

            //this.cooldownText.setText('SPELL COOLDOWN').setVisible(true);fillColor = 0xff0000;

            // this.tweens.add({
            //     targets: this.cooldownBar,
            //     fillColor: 0x00ff00,
            //     duration: this.spellCooldown,
            //     onComplete: () => {
            //         this.canCastSpell = true;
            //         this.cooldownBar.setVisible(false);
            //     }
            // });
        }
    }

    dodge() {
        if (this.cutsceneActive || this.gameIsOver || !this.player) return;

        const currentTime = this.time.now;
        if (currentTime - this.lastDodgeTime < this.dodgeCooldown) return;

        this.lastDodgeTime = currentTime;
        this.isDodging = true;
        this.sounds.dodge.play();

        if (this.playerDementPlayerDementorCollider) {
            this.physics.world.removeCollider(this.playerDementorCollider);
            this.playerDementorCollider = null;
        }

        const dodgeDirection = this.player.flipX ? 1 : -1;
        this.player.setVelocityX(dodgeDirection * 800).setVelocityY(-200);
        this.sounds.jump.play();

        this.time.delayedCall(300, () => {
            this.isDodging = false;
            if (!this.playerDementorCollider) {
                this.playerDementorCollider = this.physics.add.collider(this.player, this.dementors, this.hitDementor, null, this);
            }
        });
    }

    hitDementor(spell, dementor) {
        if (!spell || spell === this.player) {
            if (this.isDodging || !this.player || this.isInvincible) return;

            this.playerHealth -= 5;
            this.player.setTint(0xff0000);
            this.cameras.main.shake(200);
            this.isInvincible = true;
            this.lastHitTime = this.time.now;

            this.time.delayedCall(500, () => {
                if (this.player) {
                    this.player.clearTint();
                    this.isInvincible = false;
                }
            });

            this.updateHealthUI();

            if (this.playerHealth <= 0) {
                this.physics.pause();
                this.gameIsOver = true;
                this.sound.stopAll();
                this.sounds.lose.play();
                this.time.delayedCall(2000, this.gameOver, [], this);
            }
            return;
        }

        console.log("Hit dementor, stunned:", dementor.getData('isStunned'));
        this.sounds.destroy.play();
        this.vfx.createEmitter('enemy', dementor.x, dementor.y, 0.03, 0, 300).explode(20);

        spell.setActive(false).setVisible(false);
        if (spell.body) {
            spell.body.enable = false;
            spell.body.setVelocity(0, 0);
            spell.setPosition(-100, -100);
        }

        if (dementor.getData('isStunned')) {
            this.tweens.killTweensOf(dementor);
            dementor.setData('isStunned', false);
            dementor.setAlpha(1);
            dementor.setScale(2);
        }

        if (dementor === this.data.get('currentAttacker')) {
            this.data.set('currentAttacker', null);
        }
        dementor.destroy();

        this.updateScore(20);
        this.dementorsDefeated++;

        this.spellCooldown = Math.max(200, this.spellCooldown - 50);
        if (!this.canCastSpell) {
            // this.tweens.killTweensOf(this.cooldownBar);
            // this.cooldownBar.fillColor = 0x00ff00;
            this.lastSpellTime = this.time.now; // Sync cooldown time
            this.canCastSpell = true;
            //this.cooldownBar.setVisible(false);
        }

        if (this.dementors.countActive() === 0 && this.hasMovedEnough) {
            this.spawnDementor();
        }
    }

    updateHealthUI() {
        const healthPerHeart = 100 / 3; // ≈ 33.33
        const heartsToShow = Math.ceil(this.playerHealth / healthPerHeart); // 3 at >66.67, 2 at >33.33, 1 at >0, 0 at ≤0
        
        // Check if hearts decreased from 3 to 2
        if (this.previousHeartCount === 3 && heartsToShow === 2) {
            console.log("Health decreased! Lost one heart!");
            if (!this.hasFlashed) {
                // Prevent further flashes
                const flash = this.add.image(this.player.x, this.player.y, 'RedFlash1');
                flash.setDepth(1000);
                flash.setScale(10);
                flash.setAlpha(0.7);
                this.tweens.add({
                    targets: flash,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2',
                    onComplete: () => {
                        flash.destroy();
                    }
                });
            }
        }
        
        // Check if hearts decreased from 2 to 1
        if (this.previousHeartCount === 2 && heartsToShow === 1) {
            console.log("Health critically low! Only one heart left!");
            if (!this.hasFlashed) {
                // Prevent further flashes
                const flash = this.add.image(this.player.x, this.player.y, 'RedFlash1');
                flash.setDepth(1000);
                flash.setScale(10);
                flash.setAlpha(0.7);
                this.tweens.add({
                    targets: flash,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2',
                    onComplete: () => {
                        flash.destroy();
                    }
                });
            }
        }
        
        // Update heart sprites
        this.heartSprites.forEach((heart, i) => heart.setVisible(i < heartsToShow));
        
        // Store current heart count for next comparison
        this.previousHeartCount = heartsToShow;
    }

    winGame() {
    this.physics.pause();
    this.gameIsOver = true;
    this.sound.stopAll();
    this.sounds.success.play();

    this.add.bitmapText(this.width / 2, this.height / 2, 'pixelfont', '', 64)
        .setOrigin(0.5)
        .setTint(0x00ff00)
        .setScrollFactor(0);

                const endTime = this.time.now;
                const levelScore = 1000; //replace this value corresponding to the base point
                this.sound.stopAll();
                this.scene.start('ScoreScene', { startTime: this.startTime, endTime: endTime, levelScore: levelScore,levelId : 1, nextScene: 'C5' });
    
}

    levelUp() {
        this.level++;
        this.levelText.setText(`LEVEL: ${this.level}`);
        this.sounds.success.play();
        this.levelUpText.setVisible(true);

        this.dementorSpawnTime = Math.max(1000, this.dementorSpawnTime - 500);
        this.time.removeAllEvents();
        this.time.addEvent({
            delay: this.dementorSpawnTime,
            callback: this.spawnDementor,
            callbackScope: this,
            loop: true
        });

        this.time.delayedCall(2000, () => {
            this.levelUpText.setVisible(false);
            for (let i = 0; i < this.level; i++) {
                this.spawnDementor();
            }
        });
    }

    updateScore(points) {
        this.score += points;
        // this.scoreText.setText(`x ${this.score}`);
    }

    gameOver() {
    // Reset game state
    this.playerHealth = 100;
    this.score = 0;
    this.dementorsDefeated = 0;
    this.hasPowerup = false;
    this.lastPowerupTime = 0;
    this.level = 1;
    this.dementorSpawnTime = 2000;
    this.spellCooldown = 500;
    this.lastSpellTime = 0;
    this.canCastSpell = true;
    this.dodgeCooldown = 1000;
    this.lastDodgeTime = 0;
    this.isDodging = false;
    this.hasMovedEnough = false;
    this.isInvincible = false;
    this.lastHitTime = 0;
    this.lastShakeTime = 0;
    this.previousHeartCount = 3;
    this.hasFlashed = false;
    this.isQuizActive = false;
    this.askedQuestions = [];
    this.data.set('currentAttacker', null);
    this.data.set('lastAttackTime', 0);
    this.data.set('nextShakeTime', 0);

    // Stop all sounds
    this.sound.stopAll();

    // Restart the scene to replay from cutscene
    this.add.bitmapText(this.width / 2, this.height / 2, 'pixelfont', 'YOU DIED', 64)
        .setOrigin(0.5)
        .setTint(0xFF0000)
        .setScrollFactor(0);
    
    this.time.delayedCall(1500, () => {
            this.scene.restart();
        });
    
}

    pauseGame() {
        if (!this.cutsceneActive) {
            handlePauseGame.bind(this)();
        }
    }
}









const BASE_WIDTH = 1280;  // Base design width
const BASE_HEIGHT = 720;  // Base design height

// Function to calculate scale factor based on current screen size
function getScaleFactor(scene) {
    const width = scene.game.config.width;
    const height = scene.game.config.height;
    const scaleX = width / BASE_WIDTH;
    const scaleY = height / BASE_HEIGHT;
    return Math.min(scaleX, scaleY);
}

// Game Scene
class L2 extends Phaser.Scene {
    constructor() {
        super({ key: 'L2' });
    }

    preload() {
        for (const key in _CONFIG.imageLoader) {
            this.load.image(key, _CONFIG.imageLoader[key]);
        }

        for (const key in _CONFIG.soundsLoader) {
            this.load.audio(key, [_CONFIG.soundsLoader[key]]);
        }
        this.load.image('redFlash', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/red.png?t=1745070348602');

        this.load.image('heart', 'https://files.catbox.moe/ldfl5c.png');
        this.load.bitmapFont('pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml');
        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");

        this.load.atlas('goldChest',
            'https://files.catbox.moe/rkfeer.png',
            'https://files.catbox.moe/6hqri0.json'
        );

        this.load.atlas('mermaid',
            'https://files.catbox.moe/cctkpr.png',
            'https://files.catbox.moe/ustner.json'
        );

        this.load.atlas('swim',
            'https://files.catbox.moe/ysjtui.png',
            'https://files.catbox.moe/i7rj0x.json'
        );

        this.load.atlas('bubble',
            'https://files.catbox.moe/w5yni0.png',
            'https://files.catbox.moe/tco8oe.json'
        );

        this.load.atlas('bubbleBar',
            'https://files.catbox.moe/qt5zyd.png',
            'https://files.catbox.moe/9agqvp.json'
        );

        this.load.image('quizPanel', 'https://files.catbox.moe/xq36rf.png');

        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }

    howToPlay() {
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, 2000, 2000);
        this.graphics.setDepth(50).setScrollFactor(0);

        this.howToPlayS = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.2, 'pixelfont', "How To Play", 50).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);
        this.arrowkeyU = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.4, "ARROWUP").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowkeyD = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.45, "ARROWDOWN").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowkeyL = this.add.image(this.game.config.width * 0.35, this.game.config.height * 0.45, "ARROWLEFT").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowkeyR = this.add.image(this.game.config.width * 0.45, this.game.config.height * 0.45, "ARROWRIGHT").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowKeyT = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.4, 'pixelfont', "Swim", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.cont = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.7, 'pixelfont', "Press Any Key To Continue", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        // Add listener for any key press
        this.input.keyboard.on('keydown', this.clearHowToPlay, this);
    }

    clearHowToPlay() {
        // Destroy all how to play elements
        this.graphics.destroy();
        this.howToPlayS.destroy();
        this.arrowkeyU.destroy();
        this.arrowkeyD.destroy();
        this.arrowkeyL.destroy();
        this.arrowkeyR.destroy();
        this.arrowKeyT.destroy();
        this.cont.destroy();

        // Remove the listener to prevent memory leaks
        this.input.keyboard.off('keydown', this.clearHowToPlay, this);
        this.addHint();
        this.findTheKey("Find the chest!!");
        this.sounds.v1.play();
    }

    create() {
        this.gotkey=false;
        this.hasFlashed = false; // Flag to prevent multiple flashes
        
        this.startTime = this.time.now;
        this.scaleFactor = getScaleFactor(this);
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.lives = HarryGlobal.lives;
        this.hearts = [];
        this.isSwimming = false;
        this.isSwimmingUp = false;
        this.waterDrag = 0.97; // Reduced drag for faster movement (was 0.95)
        this.found = false;
        this.cageOpen = false;
        this.isBeingDragged = false;
        this.playerControlsEnabled = true;
        this.dragImmunity = false;  // Add immunity flag
        this.shakeUsed = false;
        this.startDes = false;
        this.currentObj = "Find the chest!!"
        this.ronFollowingPlayer = false;
        this.isQuizActive = false;
        this.howToPlay();

        this.zKey = this.input.keyboard.addKey('Z');

        // Setup oxygen system
        this.maxOxygen = HarryGlobal.maxO2; // Maximum oxygen in seconds (60 seconds = 1 minute)
        this.currentOxygen = this.maxOxygen; // Start with full oxygen
        this.setupOxygenBar();

        // Setup sounds
        this.sounds = {};
        for (const key in _CONFIG.soundsLoader) {
            this.sounds[key] = this.sound.add(key, { loop: false, volume: 1 });
        }

        // Setup UI
        // this.pauseButton = this.add.image(this.game.config.width - 60, 60, "pauseButton");
        // this.pauseButton.setInteractive({ cursor: 'pointer' });
        // this.pauseButton.setScale(2).setScrollFactor(0).setDepth(85);
        // this.pauseButton.on('pointerdown', () => this.pauseGame());

        // this.restart = this.add.image(this.game.config.width - 60, this.game.config.height * 0.2, "restart");
        // this.restart.setInteractive({ cursor: 'pointer' });
        // this.restart.setScale(0.1 * this.scaleFactor).setScrollFactor(0).setDepth(85);
        // this.restart.on('pointerdown', () => this.restartGame());

        // Setup background
        this.bg = this.add.image(this.game.config.width * 0.75, this.game.config.height * 1.25, "Background").setOrigin(0.5);
        // Instead of scaling based on screen dimensions, set explicit scaling to cover your desired area
        this.bg.setScale(1.5); // Adjust this value as needed to ensure proper coverage

        // Set the background boundaries to match the platforms (box)
        // This ensures the background covers from x=0 to x=1.5*width and y=0 to y=3*height
        this.bg.displayWidth = this.game.config.width * 1.5;
        this.bg.displayHeight = this.game.config.height * 3.5;

        this.gold = this.physics.add.sprite(this.width * 0.5, this.height * 0.4, 'goldKey').setScale(0.2).setVisible(false);
        this.gold.body.setGravity(0, 0);
        this.gold.body.allowGravity = false;

        this.chestAnimation();
        this.mermaidAnimation();
        this.harryPotter();
        this.bubbleAnimation();

        // Setup player
        this.player = this.physics.add.sprite(this.width * 0.4, this.height * 2.7, 'swimIdle');
        this.player.setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setDrag(0.4, 0.4); // Reduced drag on player itself (was 0.9, 0.9)

        // Setup swimming physics (reduced gravity for water)
        this.physics.world.gravity.y = 70; // Slightly reduced gravity (was 80)

        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Setup camera with slight lag for fluid underwater movement
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(
            0,                           // Left edge (min X)
            -200,                      // Top edge (min Y)
            this.scale.width * 1.5,    // Right edge (max width)
            this.scale.height * 4.25  // Bottom edge (max height)
        );

        // Add hearts
        for (let i = 0; i < this.lives; i++) {
            this.hearts.push(
                this.add.image(50 + (i * 50), 50, 'heart')
                    .setScrollFactor(0)
                    .setScale(0.04)
                    .setDepth(10)
            );
        }

        // Input listeners
        this.input.keyboard.on('keydown-ESC', () => this.pauseGame());

        // Timer for increasing score
        this.time.addEvent({
            delay: 1000,
            callback: this.updateScore,
            callbackScope: this,
            loop: true,
            args: [1]
        });

        // Timer for depleting oxygen
        this.oxygenTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateOxygen,
            callbackScope: this,
            loop: true
        });

        this.platforms = this.physics.add.staticGroup();
        this.obstacle = this.physics.add.staticGroup();
        this.weeds = this.physics.add.staticGroup();
        this.topPlatforms = this.physics.add.staticGroup();
        this.cageSystem();
        this.createBox(this.platforms);
        this.createObstacle(this.obstacle);
        this.createWeed(this.weeds);
        this.enemy();
        this.collision();

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.createPlayerBubble(this.player);
                this.sounds.bubble.play();
            },
            callbackScope: this,
            loop: true
        });

        this.sounds.bubble.play();

        this.initializeQuestionPool();

        this.sounds.L2Music.setVolume(1).setLoop(true).play();
    }

    restartGame() {
    this.hasFlashed = false; // Reset flash flag
    this.scene.start("L2");
}

    addHint() {
        // Create help button
        const helpButton = this.physics.add.sprite(
            this.game.config.width * 0.93,
            this.game.config.height * 0.07,
            'helpIcon'
        ).setInteractive()
            .setScrollFactor(0)
            .setDepth(80)
            .setScale(0.1);
        helpButton.body.setGravity(0, 0);
        helpButton.body.allowGravity = false;
        helpButton.body.setSize(helpButton.width * 0.1, helpButton.height * 0.05); // Adjust the size
        helpButton.body.setOffset(helpButton.width * 0.35, helpButton.height * 0.375); // Position the collider

        // Add hover effect
        helpButton.on('pointerover', () => {
            helpButton.setTint(0xcccccc);
        });

        helpButton.on('pointerout', () => {
            helpButton.clearTint();
        });

        // Add click functionality
        helpButton.on('pointerdown', () => {
            this.findTheKey(this.currentObj);
        });
    }

    findTheKey(tex) {
        // Add text to the container
        const saveText = this.add.bitmapText(
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pixelfont',
            tex,
            30
        ).setOrigin(0.5, 0.5).setDepth(100).setScrollFactor(0);

        // Add sprite to the container
        const saveRon = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.25,
            'ideaBox'
        ).setScrollFactor(0).setDepth(99).setScale(0.4);

        // Set a timer to destroy the elements after 5 seconds
        this.time.delayedCall(5000, () => {
            saveText.destroy();
            saveRon.destroy();
        });
    }

    createPlayerBubble(player) {
        // Create bubble at player position with slight randomness
        const offsetX = Phaser.Math.Between(-20, 20);
        const offsetY = Phaser.Math.Between(-30, 10);

        const bubble = this.add.sprite(
            player.x + offsetX,
            player.y + offsetY - 20, // Position slightly above player's head
            'bubble'
        );

        // Scale the bubble
        bubble.setScale(0.1);  // Start small since you're scaling in the animation

        // Play the animation
        bubble.play('bubble');

        // Remove the bubble when animation completes
        bubble.on('animationcomplete', () => {
            bubble.destroy();
        });

        // Add some upward movement to the bubble
        this.tweens.add({
            targets: bubble,
            y: bubble.y - 100, // Move upward
            alpha: { from: 1, to: 0 }, // Fade out
            duration: 2000,
            ease: 'Power1',
            onComplete: () => {
                if (bubble && bubble.active) {
                    bubble.destroy();
                }
            }
        });
    }

    bubbleAnimation() {
        this.anims.create({
            key: 'bubble',
            frames: this.anims.generateFrameNames('bubble', {
                prefix: 'bubble_',
                start: 1,
                end: 8,
                zeroPad: 0
            }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'bubbleBar',
            frames: this.anims.generateFrameNames('bubbleBar', {
                prefix: '',
                start: 0,
                end: 10,
                zeroPad: 0
            }),
            frameRate: 5,
            repeat: 0
        });
    }

    harryPotter() {
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNames('swim', {
                prefix: 'swim_',
                start: 0,
                end: 4,
                zeroPad: 0
            }),
            frameRate: 5,
            repeat: -1
        });
    }

    mermaidAnimation() {
        this.anims.create({
            key: 'mermaid',
            frames: this.anims.generateFrameNames('mermaid', {
                prefix: 'mermaid_',
                start: 0,
                end: 4,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0
        });
    }

    chestAnimation() {
        this.anims.create({
            key: 'goldChest',
            frames: this.anims.generateFrameNames('goldChest', {
                prefix: 'chest_',
                start: 0,
                end: 9,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0
        });
    }

    // Setup oxygen bubble display
    setupOxygenBar() {
        // Container position
        const x = this.width / 2 - 150;
        const y = 20;

        // Create container for the bubbles
        this.bubbleContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(10);

        // Store bubble sprites in an array
        this.bubbleSprites = [];

        // Calculate how many bubbles we need (one per 5 seconds of oxygen)
        this.totalBubbles = Math.ceil(this.maxOxygen / 5);

        // Create initial bubbles
        this.createInitialBubbles();

        // Set timer for updating bubbles
        this.lastBubbleUpdateTime = 0;
    }

    // Create all initial bubble sprites
    createInitialBubbles() {
        const startX = this.width / 2 - 150;
        const y = 50;
        const bubbleSize = 50;
        const bubbleSpacing = 5;

        for (let i = 0; i < this.totalBubbles; i++) {
            const bubbleX = startX + (i * (bubbleSize + bubbleSpacing));

            // Create bubble sprite
            const bubble = this.add.sprite(bubbleX, y, 'bubbleI').setScrollFactor(0).setDepth(10);
            bubble.setScale(bubbleSize / bubble.width);

            // Add to container and array
            this.bubbleContainer.add(bubble);
            this.bubbleSprites.push(bubble);
        }
    }

    // Update the oxygen display
    updateOxygenBar() {
        // Update the time text
        // Determine which bubbles should be full or empty
        const currentTime = this.time.now;
        const fullBubbles = Math.ceil(this.currentOxygen / 5);

        // Check if it's time to update bubble appearance (every 5 seconds)
        if (currentTime - this.lastBubbleUpdateTime >= 5000 || fullBubbles !== this.lastFullBubbles) {
            // Store current full bubbles count
            this.lastFullBubbles = fullBubbles;
            this.lastBubbleUpdateTime = currentTime;

            // Update bubble appearances
            for (let i = 0; i < this.bubbleSprites.length; i++) {
                if (i < fullBubbles) {
                    // Full bubbles
                    this.bubbleSprites[i].setTexture('bubbleI');

                    // Determine color tint based on oxygen level
                    const percentage = this.currentOxygen / this.maxOxygen;
                    if (percentage > 0.6) {
                        this.bubbleSprites[i]; // Cyan for high oxygen
                    } else if (percentage > 0.3) {
                        this.bubbleSprites[i]; // Yellow for medium oxygen
                    } else {
                        this.bubbleSprites[i]; // Red for low oxygen
                    }
                } else {
                    // Empty bubbles
                    this.bubbleSprites[i].setTexture('bubbleV');
                    this.bubbleSprites[i].clearTint();
                }
            }
        }
    }

    // Update oxygen level and UI
    updateOxygen() {
        // Decrease oxygen by 1 second
        this.currentOxygen -= 1;

        // Update the oxygen bar visual
        this.updateOxygenBar();

        // Check if oxygen is depleted
        
        if (this.currentOxygen <= 0 && !this.hasFlashed) {
            this.gameOverWithEffects();
        }

        // Warning effects when oxygen is low
        if (this.currentOxygen <= 10) {
            // Create pulsing red effect when oxygen is critical
            if (!this.oxygenWarningEffect) {
                this.oxygenWarningEffect = this.tweens.add({
                    targets: this.player,
                    alpha: 0.6,
                    yoyo: true,
                    repeat: -1,
                    duration: 300,
                    ease: 'Sine.easeInOut'
                });
            }
        } else if (this.oxygenWarningEffect) {
            // Remove warning effect if oxygen level recovers
            this.oxygenWarningEffect.stop();
            this.oxygenWarningEffect = null;
            this.player.alpha = 1;
        }
    }


    // Function to refill oxygen (can be called when player collects oxygen bubbles)
    refillOxygen(amount) {
        // Add oxygen amount but don't exceed maximum
        this.currentOxygen = Math.min(this.maxOxygen, this.currentOxygen + amount);
        this.updateOxygen();

        // Cancel warning effect if active and oxygen is no longer critical
        if (this.oxygenWarningEffect && this.currentOxygen > 10) {
            this.oxygenWarningEffect.stop();
            this.oxygenWarningEffect = null;
            this.player.alpha = 1;
        }
    }

    enemy() {
        this.mermaid1 = this.physics.add.sprite(this.width * 0.4, this.height * 2.4, 'MermaidBlue');
        this.mermaid1.setScale(0.3);
        this.mermaid1.setBounce(0.2);

        this.mermaid2 = this.physics.add.sprite(this.width, this.height / 2, 'MermaidBlue');
        this.mermaid2.setScale(0.3);
        this.mermaid2.setBounce(0.2);
        this.mermaid2.body.setGravity(0, 0);
        this.mermaid2.body.allowGravity = false;

        this.mermaid3 = this.physics.add.sprite(this.width * 0.7, this.height / 2, 'MermaidBlue');
        this.mermaid3.setScale(0.3);
        this.mermaid3.setBounce(0.2);
        this.mermaid3.body.setGravity(0, 0);
        this.mermaid3.body.allowGravity = false;

        this.mermaid4 = this.physics.add.sprite(this.width * 0.2, this.height / 2, 'MermaidBlue');
        this.mermaid4.setScale(0.3);
        this.mermaid4.setBounce(0.2);
        this.mermaid4.body.setGravity(0, 0);
        this.mermaid4.body.allowGravity = false;
    }

    cageSystem() {
        // Add chains with custom colliders
        this.chain1 = this.physics.add.staticImage(this.width * 0.1125, this.height * 2.1, 'Chain').setScale(0.3 * this.scaleFactor);
        this.chain1.setImmovable(true);
        // Set custom collider for chain1
        this.chain1.body.setSize(this.chain1.width * 0.3, this.chain1.height * 0.05); // Adjust the size
        this.chain1.body.setOffset(this.chain1.width * 0.35, this.chain1.height * 0.375); // Position the collider

        this.chain2 = this.physics.add.staticImage(this.width * 0.0125, this.height * 2.1, 'Chain').setScale(0.3 * this.scaleFactor);
        this.chain2.setImmovable(true);
        // Set custom collider for chain2
        this.chain2.body.setSize(this.chain1.width * 0.3, this.chain1.height * 0.05); // Adjust the size
        this.chain2.body.setOffset(this.chain1.width * 0.35, this.chain1.height * 0.375); // Position the collider

        // Add key
        this.key = this.physics.add.sprite(this.width * 0.5, this.height * 0.4, 'goldC').setScale(2.5 * this.scaleFactor).setDepth(1);
        this.key.body.setGravity(0, 0);
        this.key.body.allowGravity = false;

        this.zBtnImg = this.add.sprite(this.width * 0.5, this.height * 0.3, 'Zz').setScale(2.5 * this.scaleFactor).setDepth(1);

        this.ron = this.physics.add.sprite(this.width * 0.1, this.height * 2.5, 'ron128').setScale(1.2 * this.scaleFactor);
        this.ron.body.setGravity(0, 0);
        this.ron.body.allowGravity = false;

        // Add cage
        this.cage = this.physics.add.sprite(this.width * 0.095, this.height * 2.45, 'cage').setScale(0.6 * this.scaleFactor);
        this.cage.body.setSize(this.cage.width * 0.4, this.cage.height * 0.3); // Sets collision box size to 30px width, 60px height
        this.cage.body.setOffset(this.cage.width * 0.3, this.cage.height * 0.35);
        this.cage.setImmovable(true); // Make the cage immovable
        this.cage.body.allowGravity = false;

        this.zBtnImg1 = this.add.sprite(this.width * 0.095, this.height * 2.35, 'Zz').setScale(2.5 * this.scaleFactor).setVisible(0);
    }

    collision() {
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.chain1);
        this.physics.add.collider(this.player, this.chain2);
        this.physics.add.collider(this.player, this.obstacle);
        this.physics.add.collider(this.mermaid1, this.platforms);
        this.physics.add.collider(this.mermaid2, this.platforms);

        this.physics.add.overlap(this.player, this.weeds, this.weedInteraction, null, this);
        this.physics.add.overlap(this.key, this.player, this.keyGot, null, this);
        this.physics.add.overlap(this.cage, this.player, this.cageInteraction, null, this);

        this.physics.add.collider(this.player, this.topPlatforms, this.endGame, null, this);

        // Add collisions with mermaids - NEW CODE
        this.physics.add.collider(this.player, this.mermaid1, this.mermaidCatch, null, this);
        this.physics.add.collider(this.player, this.mermaid2, this.mermaidCatch, null, this);
        this.physics.add.collider(this.player, this.mermaid3, this.mermaidCatch, null, this);
        this.physics.add.collider(this.player, this.mermaid4, this.mermaidCatch, null, this);
        this.physics.add.collider(this.cage, this.platforms, this.shakeEffect, null, this);

        this.physics.add.collider(this.mermaid1, this.mermaid2);
        this.physics.add.collider(this.mermaid1, this.mermaid3);
        this.physics.add.collider(this.mermaid1, this.mermaid4);
        this.physics.add.collider(this.mermaid2, this.mermaid4);
        this.physics.add.collider(this.mermaid2, this.mermaid3);
        this.physics.add.collider(this.mermaid3, this.mermaid4);

    }

    endGame() {
        if (this.cageOpen) {
            this.topPlatforms.clear(true);
            HarryGlobal.lives = this.lives
            this.startLastScene();
            this.time.delayedCall(3000, () => {
                const endTime = this.time.now;
                const levelScore = 1200; //replace this value corresponding to the base point
                this.sound.stopAll();
                this.scene.start('ScoreScene', { startTime: this.startTime, endTime: endTime, levelScore: levelScore,levelId : 2, nextScene: 'C6' }); //instead of c6 you will add the nextscene class name
            }, [], this);
        }
    }

    startLastScene() {
        // Stop camera from following the player
        this.cameras.main.stopFollow();

        // Disable player controls
        this.playerControlsEnabled = false;

        // Set player's vertical velocity to move upward
        this.player.setVelocityY(-300);

        // Optional: You might want to play a swimming animation if available
        if (this.player.anims.exists('swim')) {
            this.player.anims.play('swim', true);
        }

        this.missionClear("");
    }

    misssionFailed() {
        // Stop camera from following the player
        this.cameras.main.stopFollow();

        // Disable player controls
        this.playerControlsEnabled = false;
        this.player.setTint(0x0055ff); // Blue tint

        // Optional: Add a pulsing blue tint effect for more dramatic appearance
        this.tweens.add({
            targets: this.player,
            tint: { from: 0x0055ff, to: 0x00aaff }, // Pulse between darker and lighter blue
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        // Set player's vertical velocity to move upward
        this.player.setVelocityY(300);

        this.missionClear("Mission Failed");
    }

    missionClear(text) {
        console.log('a')

        // Add a black overlay that covers the entire screen
        this.blackOverlay = this.add.rectangle(
            0, 0,
            this.game.config.width * 2, // Make it larger than needed to ensure full coverage
            this.game.config.height * 2,
            0x000000 // Black color
        )
            .setOrigin(0, 0)
            .setDepth(18) // Lower depth than the text
            .setScrollFactor(0)
            .setAlpha(0); // Start fully transparent

        // Create the mission complete text
        this.howToPlayS = this.add.bitmapText(
            this.game.config.width * 0.50,
            this.game.config.height * 0.5,
            'pixelfont',
            text,
            50
        )
            .setOrigin(0.5, 0.5)
            .setVisible(true)
            .setDepth(19)
            .setScrollFactor(0)
            .setAlpha(0);

        // Create a tween for the black overlay
        this.tweens.add({
            targets: this.blackOverlay,
            alpha: 0.7, // Fade to 0.7 opacity
            duration: 3000,
            ease: 'Linear'
        });

        // Create a tween to fade in the text
        this.tweens.add({
            targets: this.howToPlayS,
            alpha: 1, // Animate to alpha 1 (fully visible)
            duration: 3000, // Duration in milliseconds (3 seconds)
            ease: 'Linear' // You can use different easing functions: 'Power1', 'Sine.easeIn', etc.
        });
    }

    shakeEffect() {
        if (!this.shakeUsed) {
            this.cameras.main.shake(1000, 0.02);
            this.shakeUsed = true; // Mark the effect as used
            this.sounds.cageDump.setVolume(1).setLoop(false).play();
        }
    }

    mermaidCatch(player, mermaid) {
        // Only play sound if it's not already playing or if it's been more than 2 seconds since last play
        if (!this.lastMermaidSoundTime || (this.time.now - this.lastMermaidSoundTime > 5000)) {
            this.sounds.mermaidSound.setVolume(1).setLoop(false).play();
            this.lastMermaidSoundTime = this.time.now;
        }

        // Only execute if cage is open and mermaids are chasing
        if (!this.cageOpen) return;

        // Don't catch player again if they're already being dragged
        if (this.isBeingDragged) return;

        // Don't catch player if they're in the immunity period
        if (this.dragImmunity) return;

        // Find nearest weed group
        let closestWeed = this.findClosestWeed();

        if (closestWeed) {
            // Set being dragged flag
            this.isBeingDragged = true;

            // Disable player controls temporarily
            this.playerControlsEnabled = false;

            // Make player struggle (visual effect)
            player.setTint(0xff6666);

            // Stop all mermaids from chasing for 3 seconds
            this.mermaidAvoidPlayer = true;

            // Move all mermaids away from player
            const avoidDistance = 200; // Distance to move away
            this.moveAllMermaidsAway(avoidDistance);

            // Calculate path to weed
            const targetX = closestWeed.x;
            const targetY = closestWeed.y;

            // Create movement to the weed
            this.tweens.add({
                targets: player,
                x: targetX,
                y: targetY,
                duration: 1000, // 1 second drag
                ease: 'Power2',
                onComplete: () => {
                    // Re-enable player controls
                    this.playerControlsEnabled = false;
                    this.isBeingDragged = false;

                    // Reset player tint
                    player.clearTint();

                    // Set immunity flag to prevent immediate recapture
                    this.dragImmunity = true;

                    // Create a visual indicator for immunity (pulsing effect)
                    this.immunityEffect = this.tweens.add({
                        targets: player,
                        alpha: 0.6,
                        yoyo: true,
                        repeat: 9, // 10 pulses (5 seconds with 0.5s duration)
                        duration: 500,
                        onComplete: () => {
                            // Reset player alpha
                            player.alpha = 1;
                        }
                    });

                    // Give player a small delay to recover and move
                    this.time.delayedCall(500, () => {
                        this.playerControlsEnabled = true;
                    });

                    // Remove immunity after 5 seconds
                    this.time.delayedCall(5000, () => {
                        this.dragImmunity = false;
                    });

                    // Allow mermaids to approach player again after 3 seconds
                    this.time.delayedCall(5000, () => {
                        this.mermaidAvoidPlayer = false;
                    });
                }
            });
        }
    }

    // Add this new method to move mermaids away from player
    moveAllMermaidsAway(distance) {
        const mermaids = [this.mermaid1, this.mermaid2, this.mermaid3, this.mermaid4];

        mermaids.forEach(mermaid => {
            // Calculate direction from player to mermaid (opposite of chase direction)
            const dx = mermaid.x - this.player.x;
            const dy = mermaid.y - this.player.y;

            // Normalize the direction vector
            const length = Math.sqrt(dx * dx + dy * dy);

            if (length > 0) {
                // Calculate target position away from player
                const targetX = mermaid.x + (dx / length) * distance;
                const targetY = mermaid.y + (dy / length) * distance;

                // Move mermaid away
                this.tweens.add({
                    targets: mermaid,
                    x: targetX,
                    y: targetY,
                    duration: 2000,
                    ease: 'Power1'
                });
            }
        });
    }

    // Add this function to find the closest weed to the player
    findClosestWeed() {
        let closestWeed = null;
        let closestDistance = Infinity;

        // Check all weeds (iterate through the static group)
        this.weeds.getChildren().forEach((weed) => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                weed.x, weed.y
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestWeed = weed;
            }
        });

        return closestWeed;
    }

    keyGot() {
        if (this.zKey.isDown) {
            this.zBtnImg.destroy();
            this.zBtnImg1.setVisible(1)
            this.gotkey = true;

            this.key.play("goldChest").setScale(2 * this.scaleFactor);
            this.key.body.setGravity(0, 0);
            this.key.body.allowGravity = false;
            this.sounds.open.play();
            this.key.once('animationcomplete', () => {
                this.gold.setVisible(true)
                this.tweens.add({
                    targets: this.gold,
                    y: this.height * 0.2, // Move upward (smaller y value)
                    scaleX: 0.25, // Increase scale by 0.25
                    scaleY: 0.25, // Increase scale by 0.25
                    duration: 500, // Animation duration in ms
                    ease: 'Power1',
                    onComplete: () => {
                        // Destroy the gold key after animation completes
                        this.gold.setVisible(false);
                        this.gold.destroy();
                        this.key.destroy();
                        this.found = true;
                        this.currentObj = "Rescue Ron!!"
                        this.sounds.V2.play();
                        this.findTheKey(this.currentObj)
                        this.gold1 = this.add.sprite(this.width * 0.05, this.height * 0.15, 'goldKey').setScale(0.2).setScrollFactor(0);
                    }
                });
            });
        }
    }

    cageInteraction() {
        if (this.found && this.zKey.isDown) {
            this.zBtnImg1.destroy();
            this.sounds.L2Music.setVolume(1).setLoop(true).pause();
            this.sounds.MCL2.setVolume(0.3).setLoop(true).play();
            this.gold1.destroy();
            if(this.gold1) this.gold1.setVisible(false);
            this.currentObj = "Swim to the surface!!"
            this.sounds.v3.play();
            this.cageOpen = true;
            this.enemyBeginChase();
            this.cageScene();
            this.setupRonFollowing();
            this.text();
        }
    }

    setupRonFollowing() {
        // Make sure Ron is active and visible
        

        // You'll need to call this in your update function
        this.ronFollowingPlayer = true;

        
    }

    text() {
        // Create a container to hold both elements
        this.saveContainer = this.add.container(0, 0);

        // Add text to the container
        const saveText = this.add.bitmapText(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'pixelfont',
            "Save Ron",
            70
        ).setOrigin(0.5, 0.5).setDepth(100).setScrollFactor(0);

        // Add sprite to the container
        const saveRon = this.add.sprite(
            this.game.config.width * 0.7,
            this.game.config.height * 0.5,
            'ron128'
        ).setScrollFactor(0);

        // Add both elements to the container
        this.saveContainer.add([saveText, saveRon]);
        this.saveContainer.setDepth(100);

        // Use a more direct approach with a hard reference to the container
        const container = this.saveContainer;
        this.time.addEvent({
            delay: 2000,
            callback: function () {
                if (container && container.active) {
                    container.destroy();
                }
            },
            callbackScope: this,
            loop: false
        });
    }
    cageScene() {
        this.cage.body.allowGravity = true;
        this.cage.setImmovable(false);
    }
    // Modified createWeed function with proper scaling
    createWeed(weed) {
        const weed1 = weed.create(
            this.game.config.width * 0.5,
            this.game.config.height * 0.45,
            'seaweed2'
        ).setScale(0.5 * this.scaleFactor).setAlpha(0.7).setDepth(2);

        weed1.body.setSize(weed1.width * 0.4, weed1.height * 0.3);
        weed1.body.setOffset(weed1.width * 0.3, weed1.height * 0.35);

        this.time.addEvent({
            delay: 2500,
            callback: () => this.createPlayerBubble(weed1),
            callbackScope: this,
            loop: true
        });

        const weed2 = weed.create(
            this.game.config.width * 0.45,
            this.game.config.height * 1.15,
            'seaweed1'
        ).setScale(0.5 * this.scaleFactor).setAlpha(0.7);

        weed2.body.setSize(weed1.width * 0.4, weed1.height * 0.3);
        weed2.body.setOffset(weed1.width * 0.3, weed1.height * 0.35);

        this.time.addEvent({
            delay: 3000,
            callback: () => this.createPlayerBubble(weed2),
            callbackScope: this,
            loop: true
        });

        const weed3 = weed.create(
            this.game.config.width * 0.7,
            this.game.config.height * 1.25,
            'seaweed3'
        ).setScale(0.5 * this.scaleFactor).setAlpha(0.7);

        weed3.body.setSize(weed1.width * 0.4, weed1.height * 0.3);
        weed3.body.setOffset(weed1.width * 0.3, weed1.height * 0.35);

        this.time.addEvent({
            delay: 1000,
            callback: () => this.createPlayerBubble(weed3),
            callbackScope: this,
            loop: true
        });

        const aweed = weed.create(
            this.game.config.width * 0.6,
            this.game.config.height * 2.1,
            'seaweed2'
        ).setScale(0.5 * this.scaleFactor).setAlpha(0.7);

        aweed.body.setSize(weed1.width * 0.4, weed1.height * 0.5);
        aweed.body.setOffset(weed1.width * 0.3, weed1.height * 0.35);

        this.time.addEvent({
            delay: 2000,
            callback: () => this.createPlayerBubble(aweed),
            callbackScope: this,
            loop: true
        });

        const weed4 = weed.create(
            this.game.config.width * 1.4,
            this.game.config.height * 1.45,
            'seaweed3'
        ).setScale(0.5 * this.scaleFactor).setAlpha(0.7);

        weed4.body.setSize(weed1.width * 0.4, weed1.height * 0.3);
        weed4.body.setOffset(weed1.width * 0.3, weed1.height * 0.35);

        this.time.addEvent({
            delay: 5000,
            callback: () => this.createPlayerBubble(weed4),
            callbackScope: this,
            loop: true
        });

        const weed5 = weed.create(
            this.game.config.width * 1.2,
            this.game.config.height * 0.95,
            'seaweed2'
        ).setScale(0.5 * this.scaleFactor).setAlpha(0.7);

        weed5.body.setSize(weed1.width * 0.4, weed1.height * 0.3);
        weed5.body.setOffset(weed1.width * 0.3, weed1.height * 0.35);

        this.time.addEvent({
            delay: 1000,
            callback: () => this.createPlayerBubble(weed5),
            callbackScope: this,
            loop: true
        });

        // const weed6 = weed.create(
        //     this.game.config.width * 0.9,
        //     this.game.config.height * 2.9,
        //     'seaweed1'
        // ).setScale(0.5 * this.scaleFactor).setAlpha(0.7);

        // weed6.body.setSize(weed1.width * 0.4, weed1.height * 0.3);
        // weed6.body.setOffset(weed1.width * 0.29, weed1.height * 0.35);

        // this.time.addEvent({
        //     delay: 4000,
        //     callback: () => this.createPlayerBubble(weed6),
        //     callbackScope: this,
        //     loop: true
        // });

        const weed7 = weed.create(
            this.game.config.width * 1.3,
            this.game.config.height * 2.45,
            'seaweed3'
        ).setScale(0.5 * this.scaleFactor).setAlpha(0.7);

        weed7.body.setSize(weed1.width * 0.4, weed1.height * 0.3);
        weed7.body.setOffset(weed1.width * 0.29, weed1.height * 0.35);

        this.time.addEvent({
            delay: 2000,
            callback: () => this.createPlayerBubble(weed7),
            callbackScope: this,
            loop: true
        });
    }

    // Modified createObstacle function with proper scaling
    createObstacle(obstacle) {
        const obs = obstacle.create(
            this.game.config.width * 0.6,
            this.game.config.height * 2.3,
            'floatPlat'
        ).setScale(0.5 * this.scaleFactor);

        obs.body.setSize(obs.width * 0.4, obs.height * 0.3);
        obs.body.setOffset(obs.width * 0.3, obs.height * 0.35);

        const obs1 = obstacle.create(
            this.game.config.width * 0.5,
            this.game.config.height * 0.65,
            'floatPlat'
        ).setScale(0.5 * this.scaleFactor);

        obs1.body.setSize(obs1.width * 0.4, obs1.height * 0.3);
        obs1.body.setOffset(obs1.width * 0.3, obs1.height * 0.35);

        const obs2 = obstacle.create(
            this.game.config.width * 0.45,
            this.game.config.height * 1.35,
            'floatPlat'
        ).setScale(0.5 * this.scaleFactor);

        obs2.body.setSize(obs2.width * 0.4, obs2.height * 0.3);
        obs2.body.setOffset(obs2.width * 0.3, obs2.height * 0.35);

        const obs3 = obstacle.create(
            this.game.config.width * 0.7,
            this.game.config.height * 1.45,
            'floatPlat'
        ).setScale(0.5 * this.scaleFactor);

        obs3.body.setSize(obs3.width * 0.4, obs3.height * 0.3);
        obs3.body.setOffset(obs3.width * 0.3, obs3.height * 0.35);

        const obs4 = obstacle.create(
            this.game.config.width * 1.4,
            this.game.config.height * 1.65,
            'floatPlat'
        ).setScale(0.5 * this.scaleFactor);

        obs4.body.setSize(obs4.width * 0.4, obs4.height * 0.3);
        obs4.body.setOffset(obs4.width * 0.3, obs4.height * 0.35);

        const obs5 = obstacle.create(
            this.game.config.width * 1.2,
            this.game.config.height * 1.15,
            'floatPlat'
        ).setScale(0.5 * this.scaleFactor);

        obs5.body.setSize(obs5.width * 0.4, obs5.height * 0.3);
        obs5.body.setOffset(obs5.width * 0.3, obs5.height * 0.35);

        const obs6 = obstacle.create(
            this.game.config.width * 1.3,
            this.game.config.height * 2.65,
            'floatPlat'
        ).setScale(0.5 * this.scaleFactor);

        obs6.body.setSize(obs6.width * 0.4, obs6.height * 0.3);
        obs6.body.setOffset(obs6.width * 0.3, obs6.height * 0.35);
    }

    // Modified createBox function with proper scaling
    createBox(platforms) {
        // bot
        for (let i = 0; i < 1.5; i += 0.05) {
            const platform = platforms.create(
                this.scale.width * i,
                this.scale.height * 3,
                'platform'
            ).setScale(0.8 * this.scaleFactor).setDepth(-1);
        }

        // up
        for (let i = 0; i < 1.5; i += 0.05) {
            this.topPlatforms.create(
                this.scale.width * i,
                this.scale.height * -0.3,
                'platform'
            ).setScale(0.8 * this.scaleFactor).setDepth(-1);
        }

        // left
        for (let i = 0; i < 3; i += 0.05) {
            const platform = platforms.create(
                this.scale.width * 1.5,
                this.scale.height * i,
                'platform'
            ).setScale(0.2 * this.scaleFactor).setDepth(-1);

            platform.body.setSize(platform.width * 0.4, platform.height * 0.3);
            platform.body.setOffset(platform.width * 0.3, platform.height * 0.35);
        }

        // right
        for (let i = 0; i < 3; i += 0.05) {
            const platform = platforms.create(
                this.scale.width * 0,
                this.scale.height * i,
                'platform'
            ).setScale(0.2 * this.scaleFactor).setDepth(-1);

            platform.body.setSize(platform.width * 0.4, platform.height * 0.3);
            platform.body.setOffset(platform.width * 0.3, platform.height * 0.35);
        }
    }

    weedInteraction(player, weed) {
        player.setVelocityX(player.body.velocity.x * 0.9);
        player.setVelocityY(player.body.velocity.y * 0.9);

        player.setTint(0x88FF88);

        this.time.delayedCall(100, () => {
            player.clearTint();
        });
    }

    enemyBeginChase() {
        // Calculate direction from mermaid1 to player
        const dx1 = this.player.x - this.mermaid1.x;
        const dy1 = this.player.y - this.mermaid1.y;

        // Calculate direction from mermaid2 to player
        const dx2 = this.player.x - this.mermaid2.x;
        const dy2 = this.player.y - this.mermaid2.y;

        // Calculate direction from mermaid3 to player
        const dx3 = this.player.x - this.mermaid3.x;
        const dy3 = this.player.y - this.mermaid3.y;

        // Calculate direction from mermaid4 to player
        const dx4 = this.player.x - this.mermaid4.x;
        const dy4 = this.player.y - this.mermaid4.y;

        // Normalize the direction vectors
        const length1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const length2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const length3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
        const length4 = Math.sqrt(dx4 * dx4 + dy4 * dy4);

        // Set chase speed
        const chaseSpeed = 200;

        // Move mermaid1 towards player if not too close
        if (length1 > 10) {
            this.mermaid1.setVelocityX((dx1 / length1) * chaseSpeed);
            this.mermaid1.setVelocityY((dy1 / length1) * chaseSpeed);
            // Flip sprite based on direction
            this.mermaid1.flipX = dx1 < 0;
            // Play the animation if not already playing
            if (!this.mermaid1.anims.isPlaying) {
                this.mermaid1.play('mermaid', true);
            }
        }

        // Move mermaid2 towards player if not too close
        if (length2 > 10) {
            this.mermaid2.setVelocityX((dx2 / length2) * chaseSpeed);
            this.mermaid2.setVelocityY((dy2 / length2) * chaseSpeed);
            // Flip sprite based on direction
            this.mermaid2.flipX = dx2 < 0;
            // Play the animation if not already playing
            if (!this.mermaid2.anims.isPlaying) {
                this.mermaid2.play('mermaid', true);
            }
        }

        // Move mermaid3 towards player if not too close
        if (length3 > 10) {
            this.mermaid3.setVelocityX((dx3 / length3) * chaseSpeed);
            this.mermaid3.setVelocityY((dy3 / length3) * chaseSpeed);
            // Flip sprite based on direction
            this.mermaid3.flipX = dx3 < 0;
            // Play the animation if not already playing
            if (!this.mermaid3.anims.isPlaying) {
                this.mermaid3.play('mermaid', true);
            }
        }

        // Move mermaid4 towards player if not too close
        if (length4 > 10) {
            this.mermaid4.setVelocityX((dx4 / length4) * chaseSpeed);
            this.mermaid4.setVelocityY((dy4 / length4) * chaseSpeed);
            // Flip sprite based on direction
            this.mermaid4.flipX = dx4 < 0;
            // Play the animation if not already playing
            if (!this.mermaid4.anims.isPlaying) {
                this.mermaid4.play('mermaid', true);
            }
        }
    }

    update(time, delta) {
        
        if (this.cageOpen) {
            this.enemyBeginChase();
        }

        // Skip player controls if being dragged
        if (this.isBeingDragged) {
            return;
        }

        // Apply water resistance by multiplying existing velocity by drag factor
        this.player.setVelocityX(this.player.body.velocity.x * this.waterDrag);
        this.player.setVelocityY(this.player.body.velocity.y * this.waterDrag);

        // Swimming mechanics
        let isSwimmingNow = false;

        // Only allow player controls if not being dragged
        if (!this.isBeingDragged && (this.playerControlsEnabled === undefined || this.playerControlsEnabled)) {
            // Player controls with smoother acceleration
            if (this.cursors.left.isDown) {
                // Accelerate left, increased acceleration (was -100)
                this.player.setAccelerationX(-800);
                this.player.flipX = true;
                isSwimmingNow = true;
            } else if (this.cursors.right.isDown) {
                // Accelerate right, increased acceleration (was 100)
                this.player.setAccelerationX(800);
                this.player.flipX = false;
                isSwimmingNow = true;
            } else {
                // Stop acceleration but let drag handle deceleration
                this.player.setAccelerationX(0);
            }

            // Swimming up mechanic with buoyancy
            if (this.cursors.up.isDown) {
                // Accelerate upward, increased acceleration (was -150)
                this.player.setAccelerationY(-800);
                if (!this.isSwimmingUp) {
                    this.isSwimmingUp = true;
                }
                isSwimmingNow = true;
            } else {
                this.isSwimmingUp = false;
                // Natural buoyancy - slight upward tendency when not pressing down
                this.player.setAccelerationY(200); // Slightly increased (was -10)
            }

            // Faster sinking with down key
            if (this.cursors.down.isDown) {
                this.player.setAccelerationY(800); // Increased acceleration (was 120)
                isSwimmingNow = true;
            }
        }

        // Handle swimming state change and play animations
        if (isSwimmingNow && !this.isSwimming) {
            this.isSwimming = true;
            this.player.play('swim', true); // Play swim animation
        } else if (!isSwimmingNow && this.isSwimming) {
            this.isSwimming = false;
            this.player.setTexture('swimIdle'); // Switch back to idle texture
        }

        // Limit maximum velocity - increased for faster movement (was 160)
        const maxVelocity = 500;
        if (Math.abs(this.player.body.velocity.x) > maxVelocity) {
            this.player.setVelocityX(Math.sign(this.player.body.velocity.x) * maxVelocity);
        }
        if (Math.abs(this.player.body.velocity.y) > maxVelocity) {
            this.player.setVelocityY(Math.sign(this.player.body.velocity.y) * maxVelocity);
        }

        if (this.ronFollowingPlayer && this.ron && this.player) {
            const followDistance = 60; // Adjust this value as needed
            const followSpeed = 800; // Adjust this value as needed

            // Calculate direction to player
            const dx = this.player.x - this.ron.x;
            const dy = this.player.y - this.ron.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > followDistance) {
                // Move Ron towards player
                const vx = (dx / distance) * followSpeed;
                const vy = (dy / distance) * followSpeed;

                this.ron.setVelocity(vx, vy);
            } else {
                // Ron is close enough to the player, stop moving
                this.ron.setVelocity(0, 0);
            }
        }
    }

    initializeQuestionPool() {
        this.questionPool = initQuistion(HarryGlobal.child);

        this.askedQuestions = []; // Track asked questions
    }

    createHearts() {
        console.log('a')
        for (let i = 0; i < this.lives; i++) {
            const xPosition = this.width * (0.05 + (i * 0.03));
            const yPosition = this.height * 0.1;

            const heart = this.add.image(xPosition, yPosition, 'heart')
                .setScrollFactor(0)
                .setDepth(10);

            heart.setScale(0.04 * this.scaleFactor);
            this.hearts.push(heart);
        }
        console.log('a')
    }


    // Function to get a new unasked question
    getNewQuestion() {
        if (this.questionPool.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.questionPool.length);
        const question = this.questionPool.splice(randomIndex, 1)[0];
        askedQuestions.push(question);
        return question;
    }

    // Quiz function
    showQuiz() {
        // If a quiz is already active, return a rejected promise
        if (this.isQuizActive) {
            console.log("Quiz already in progress, ignoring request");
            return Promise.reject("Quiz already in progress");
        }

        console.log("Quiz started");
        this.isQuizActive = true; // Mark quiz as active

        // Return a Promise that resolves when selection is made
        return new Promise((resolve) => {
            // Pause physics and player movement during quiz
            this.physics.pause();
            const prevPlayerControlsEnabled = this.playerControlsEnabled;
            this.playerControlsEnabled = false;

            // Create black transparent overlay
            const overlay = this.add.rectangle(this.width / 2, this.height / 2,
                this.width, this.height, 0x000000, 0.7)
                .setOrigin(0.5)
                .setDepth(20)
                .setScrollFactor(0);

            // Add quiz panel image
            const quizPanel = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
                .setScale(2.4 * this.scaleFactor)
                .setDepth(21)
                .setScrollFactor(0);

            const Herte = this.add.image(this.width / 2, this.height * 0.15, 'Hrte')
                .setScale(1.4 * this.scaleFactor, 1 * this.scaleFactor)
                .setDepth(21)
                .setScrollFactor(0);

            // Get a new question
            const currentQuestion = this.getNewQuestion();
            if (!currentQuestion) {
                console.log('No more questions available!');
                overlay.destroy();
                quizPanel.destroy();

                // Resume physics and player control
                this.physics.resume();
                this.playerControlsEnabled = prevPlayerControlsEnabled;
                this.isQuizActive = false; // Mark quiz as inactive

                resolve(false); // Resolve with false if no questions
                return;
            }
            console.log("Question loaded:", currentQuestion.question);

            // Add question text on the yellow part
            const questionText = this.add.bitmapText(
                this.width / 2,
                this.height / 2 - 100,
                'pixelfont',
                currentQuestion.question,
                40
            )
                .setOrigin(0.5)
                .setTint(0xFF0000) // Red text for contrast on yellow
                .setDepth(22)
                .setScrollFactor(0);

            // Create an array to hold all UI elements for easy cleanup
            const uiElements = [overlay, quizPanel, questionText];

            // Arrange options in a 2x2 grid
            const optionXPositions = [this.width * 0.35, this.width * 0.65]; // Two columns
            const optionYPositions = [this.height * 0.55, this.height * 0.75]; // Two row
            const optionTexts = [];

            currentQuestion.options.forEach((option, index) => {
                const row = Math.floor(index / 2);
                const col = index % 2;
                const optionText = this.add.bitmapText(
                    optionXPositions[col],
                    optionYPositions[row],
                    'pixelfont',
                    option,
                    30
                )
                    .setOrigin(0.5)
                    .setTint(0xFFFFFF) // Initial white text
                    .setDepth(22)
                    .setInteractive({ useHandCursor: true })
                    .setScrollFactor(0);

                optionText.on('pointerdown', () => {
                    // Handle click on option
                    handleOptionClick(option, index);
                });

                optionTexts.push(optionText);
                uiElements.push(optionText);
            });

            console.log("Options displayed");

            // Function to handle option clicks
            const handleOptionClick = (clickedOption, clickedIndex) => {
                // Disable all options to prevent multiple clicks
                optionTexts.forEach(text => text.disableInteractive());

                const isCorrect = clickedOption === currentQuestion.correctAnswer;

                // Set color based on correctness (green if correct, red if wrong)
                optionTexts[clickedIndex].setTint(isCorrect ? 0x00FF00 : 0xFF0000);

                // If wrong, highlight the correct answer in green
                if (!isCorrect) {
                    const correctIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);
                    if (correctIndex >= 0) {
                        optionTexts[correctIndex].setTint(0x00FF00);
                    }
                }

                console.log("Answer selected:", clickedOption, "Correct:", isCorrect);

                // Delay to allow player to see the result, then clean up
                this.time.delayedCall(1500, () => {
                    console.log("Cleaning up quiz UI");

                    // Safely destroy all UI elements
                    uiElements.forEach(element => {
                        if (element && element.active) {
                            element.destroy();
                        }
                    });

                    // Resume physics and player control
                    this.physics.resume();
                    this.playerControlsEnabled = prevPlayerControlsEnabled;
                    this.isQuizActive = false; // Mark quiz as inactive

                    // Resolve the promise with the result
                    resolve(isCorrect);
                });
            };

            console.log("Quiz interaction ready");
        });
    }

    gameOverWithEffects() {
    this.lives--;

    // Update hearts UI
    if (this.lives >= 0 && this.hearts[this.lives]) {
        this.hearts[this.lives].destroy();
        if (!this.hasFlashed) {
         // Prevent further flashes
        const flash = this.add.image(this.player.x, this.player.y, 'redFlash');
        flash.setDepth(1000);
        flash.setScale(10);
        flash.setAlpha(0.7);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                flash.destroy();
            }
        });
    }
    }

    if (this.lives > 0) {
        // Player still has lives, just refill oxygen
        this.refillOxygen(20);
        return;
    }

    // Show flash effect only once when lives are exhausted
    

    // If a quiz is already active, don't show another one
    if (this.isQuizActive) {
        console.log("Quiz already active, skipping another quiz");
        return;
    }

    console.log("Showing quiz for last chance");

    this.misssionFailed();
    this.time.delayedCall(3000, () => {
        // Show quiz and wait for it to complete before game over
        this.showQuiz().then((quizPassed) => {
            console.log('Quiz completed, result:', quizPassed);

            if (quizPassed) {
                // Player passed the quiz, give another life
                HarryGlobal.lives = 2;
                this.scene.start("C5");
                this.sound.stopAll();
            } else {
                // Player failed the quiz but still gets one life
                HarryGlobal.lives = 1;
                this.scene.start("C5");
                this.sound.stopAll();
            }
        }).catch(error => {
            console.log("Quiz error or interrupted:", error);
        });
    }, [], this);
}

    updateScore(points) {

    }

    gameOver() {

    }

    pauseGame() {
        handlePauseGame.bind(this)();
    }
}

class L3 extends Phaser.Scene {
    constructor() {
        super({ key: 'L3' });
        this.cauldronUsed = false;
    }

    preload() {
        this.score = 0;
        for (const key in _CONFIG.imageLoader) {
            this.load.image(key, _CONFIG.imageLoader[key]);
        }

        for (const key in _CONFIG.soundsLoader) {
            this.load.audio(key, [_CONFIG.soundsLoader[key]]);
        }

        this.load.image('heart', 'https://files.catbox.moe/ldfl5c.png');
        this.load.bitmapFont('pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml');
        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");

        this.load.image('quizPanel', 'https://files.catbox.moe/xq36rf.png');

        this.load.atlas('dragon',
            'https://files.catbox.moe/3t4ofe.png',
            'https://files.catbox.moe/rk248i.json'
        );

        this.load.atlas('portal',
            'https://files.catbox.moe/5x2lg5.png',
            'https://files.catbox.moe/xtugbk.json'
        );

        this.load.atlas('blackChest',
            'https://files.catbox.moe/7tftm9.png',
            'https://files.catbox.moe/6hqri0.json'
        );

        this.load.atlas('goldChest',
            'https://files.catbox.moe/vvzwem.png',
            'https://files.catbox.moe/6hqri0.json'
        );

        this.load.atlas('cauldrons',
            'https://files.catbox.moe/kax25n.png',
            'https://files.catbox.moe/s34zim.json'
        );

        this.load.atlas('move',
            'https://files.catbox.moe/219iff.png',
            'https://files.catbox.moe/vektaz.json'
        );

        this.load.atlas('itemGet',
            'https://files.catbox.moe/3mlx4c.png',
            'https://files.catbox.moe/vektaz.json'
        );

        this.load.atlas('fireball',
            'https://files.catbox.moe/eo260u.png',
            'https://files.catbox.moe/znff9y.json'
        );

        this.load.atlas('spell',
            'https://files.catbox.moe/9d54x7.png',
            'https://files.catbox.moe/g423sw.json'
        );

        this.load.atlas('z_button',
            'https://files.catbox.moe/qgfccs.png',
            'https://files.catbox.moe/i4bhll.json'
        );

        this.load.atlas('death',
            'https://files.catbox.moe/fsh74w.png',
            'https://files.catbox.moe/vektaz.json'
        );
        this.load.image('redFlash', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/red.png?t=1745070348602');

        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }

    howToPlay() {
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, 2000, 2000);
        this.graphics.setDepth(50).setScrollFactor(0);

        this.howToPlayS = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.2, 'pixelfont', "New Instruction", 50).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        // this.aText = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.4, "A").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        // this.aPNG = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.4, 'pixelfont', "Lumo", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.zText = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.5, "Zz").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.zPNG = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.5, 'pixelfont', "Interact", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.xText = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.6, "X").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.xPNG = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.6, 'pixelfont', "Invisible (Find First)", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.cont = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.7, 'pixelfont', "Press Any Key To Continue", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        // Add listener for any key press
        this.input.keyboard.on('keydown', this.clearHowToPlay, this);

    }

    clearHowToPlay() {
        // Destroy all how to play elements
        this.graphics.destroy();
        this.howToPlayS.destroy();

        // this.aText.destroy();
        // this.aPNG.destroy();
        this.zText.destroy();
        this.zPNG.destroy();
        this.xText.destroy();
        this.xPNG.destroy();

        this.cont.destroy();

        this.addHint();
        this.findTheKey("Find Professor Musk")
        // Remove the listener to prevent memory leaks
        this.input.keyboard.off('keydown', this.clearHowToPlay, this);

    }

    create(data) {
        this.hasFlashed = false;
       
        isMobile = !this.sys.game.device.os.desktop
        const isPortrait = this.game.config.height > this.game.config.width;
        this.scaleFactor = isPortrait ? this.game.config.width / 800 : this.game.config.width / 1200;

        this.invisibleUnlock = false;

        this.hasCheckedPotions = false;

        // Setup sounds
        this.sounds = {
            flying: this.sound.add('flying'),
            a: this.sound.add('a'),
            hurt: this.sound.add('hurt'),
            itemFound: this.sound.add('itemFound'),
            walk: this.sound.add('walk'),
            caul: this.sound.add('caul'),
            lm: this.sound.add('lm'),
            startt: this.sound.add('startt'),
            jump: this.sound.add('jump'),
            fe: this.sound.add('find elon'),
            cp: this.sound.add('collect potions'),
            fc: this.sound.add('Find the cauldron'),
            be: this.sound.add('bring to elon')
        };

        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.currentObj = "Talk To Elon";

        this.cloakImgName = 'clok';
        // Check if we're returning from the cutscene
        const fromCutscene = data && data.fromCutscene;

        // Initialize properties
        if (!fromCutscene) {
            this.sounds.startt.play();
            this.lives = HarryGlobal.lives;
            this.red = 0;
            this.black = 0;
            this.yellow = 0;
            this.talk = false;
            this.currentObj = "Talk To Elon"
            this.howToPlay();
            this.sounds.fe.play();
            // Other initializations
        } else {
            // Restore state from registry  
            this.startTime = this.time.now;
            this.currentObj = "Find all three potions"
            this.addHint();
            this.findTheKey("Find all three potions")
            this.lives = this.registry.get('lives') || 3;
            this.red = this.registry.get('red') || 0;
            this.black = this.registry.get('black') || 0;
            this.yellow = this.registry.get('yellow') || 0;
            this.talk = true; // Already talked to Musk
            this.sounds.cp.play();
            this.invisibleUnlock = true;
            this.invisibleTimer = HarryGlobal.cloakTimeMax
            this.cloakImgName = HarryGlobal.cloakName
            this.cauldronUsed = false
        }

        this.scaleFactor = getScaleFactor(this);

        this.hearts = [];
        this.found = false;
        this.playerControlsEnabled = true;
        this.dragImmunity = false;
        this.playerSpeed = 600 * this.scaleFactor;
        this.invisible;
        this.darkness = null;
        this.lightMask = null;
        this.lightRadius = 200;
        this.darknessEnabled = true;
        this.pRT;
        this.pRN;
        this.pYT;
        this.pYN;
        this.pBT;
        this.pBN;

        // Define the Z button animation
        this.anims.create({
            key: 'z_button_anim',
            frames: this.anims.generateFrameNames('z_button', {
                prefix: 'image_0-',
                start: 0,
                end: 1,
                suffix: '.png'
            }),
            frameRate: 2,
            repeat: -1
        });

        // Add Z key for dialog
        this.zKey = this.input.keyboard.addKey('Z');
        this.xKey = this.input.keyboard.addKey('X');
        this.aKey = this.input.keyboard.addKey('A');

        // Setup UI
        // this.pauseButton = this.add.image(this.game.config.width * 0.95, this.game.config.height * 0.075, "pauseButton");
        // this.pauseButton.setInteractive({ cursor: 'pointer' });
        // this.pauseButton.setScale(2).setScrollFactor(0).setDepth(10);
        // this.pauseButton.on('pointerdown', () => this.pauseGame());

        // Setup background
        this.bg = this.add.image(
            this.game.config.width * 3,
            this.game.config.height * 3,
            "Background_L3"
        ).setOrigin(0.5);

        this.dragonAnimation();
        this.chestAnimation();
        this.portalAnimation();
        this.cauldronAnimation();
        this.harryPotter();
        this.fireballAnimation();

        // Calculate scale
        const scaleX = (4 * this.game.config.width) / this.bg.width;
        const scaleY = (4 * this.game.config.height) / this.bg.height;
        this.bg.setScale(scaleX, scaleY);

        // Position the player
        let playerX, playerY;
        if (fromCutscene) {
            playerX = this.registry.get('playerX');
            playerY = this.registry.get('playerY');
        } else {
            playerX = this.width * 2; //2
            playerY = this.height * 4.5; // 4.5
        }

        this.player = this.physics.add.sprite(playerX, playerY, 'idle');
        this.player.setScale(3 * this.scaleFactor);
        this.player.setBounce(0.2);
        this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.775);
        this.player.body.setOffset(this.player.width * 0.3, 0);


        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Setup camera
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

        // Input listeners
        this.input.keyboard.on('keydown-ESC', () => this.pauseGame());

        this.platforms = this.physics.add.staticGroup();
        this.obstacle = this.physics.add.staticGroup();
        this.removeables = this.physics.add.staticGroup();

        this.createBox(this.platforms);
        this.createObstacle(this.obstacle);
        this.item();

        this.fireball();
        this.enemy = this.physics.add.sprite(this.width * 3, this.height, 'd2');
        this.enemy.body.setGravity(0, 0);
        this.enemy.body.allowGravity = false;

        this.aura = this.physics.add.staticImage(this.width * 3.935, this.height * 4.7, 'Aura').setScale(0.4 * this.scaleFactor).setAlpha(0.7);
        this.musk = this.physics.add.sprite(this.width * 3.95, this.height * 4.815, 'Elon').setScale(0.2 * this.scaleFactor);

        // Only create Z button if we haven't talked to Musk yet
        if (!this.talk) {
            this.zButton = this.add.sprite(this.width * 3.95, this.height * 4.615, 'z_button')
                .setScale(3 * this.scaleFactor)
                .setDepth(11);
            this.zButton.play('z_button_anim');
        } else {
            // If we've already talked to Musk, create the potion list and platform
            for (let i = 3.8; i > 3.7; i -= 0.03) {
                this.obstacle.create(
                    this.scale.width * i,
                    this.scale.height * 4.6,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);
            }
            this.createPotionList();
        }

        this.musk.body.setGravity(0, 0);
        this.musk.body.allowGravity = false;

        this.enemyMovement();
        this.collision();

        // Initialize hearts display
        this.createHearts();

        this.light = this.physics.add.sprite(this.width * 2, this.height * 4.3, 'darkness1').setScale(1.15 * this.scaleFactor, 1.15 * this.scaleFactor).setAlpha(0.6);
        this.light.body.allowGravity = false;

        this.sounds.flying.setVolume(1).setLoop(true).play();

        this.initializeQuestionPool();

        this.cloakImg = this.add.sprite(this.width * 0.05, this.height * 0.25, this.cloakImgName).setScale(0.3 * this.scaleFactor).setScrollFactor(0).setVisible(false);
        this.xbotn = this.add.sprite(this.width * 0.1, this.height * 0.25, 'X').setScale(2 * this.scaleFactor).setScrollFactor(0).setVisible(false);

        if (fromCutscene) {
            this.cloakImg.setVisible(true)
            this.xbotn.setVisible(true)
        }

        this.isQuizActive = false;
        this.quizQueue = [];
    }

    checkAllPotionsCollected() {
        // Check if player has one of each potion
        if (!this.hasCheckedPotions) {
            if (this.red >= 1 && this.black >= 1 && this.yellow >= 1) {
                this.findTheKey("Find Cauldron");
                this.currentObj = "Find Cauldron";
                this.sounds.fc.play();
                this.hasCheckedPotions = true;
            }
        }
    }


    addHint() {
        // Create help button
        const helpButton = this.add.sprite(
            this.game.config.width * 0.9,
            this.game.config.height * 0.075,
            'helpIcon'
        ).setInteractive()
            .setScrollFactor(0)
            .setDepth(99)
            .setScale(0.1);

        // Add hover effect
        helpButton.on('pointerover', () => {
            helpButton.setTint(0xcccccc);
        });

        helpButton.on('pointerout', () => {
            helpButton.clearTint();
        });

        // Add click functionality
        helpButton.on('pointerdown', () => {
            this.findTheKey(this.currentObj);
        });
    }

    findTheKey(tex) {
        // Add text to the container
        const saveText = this.add.bitmapText(
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pixelfont',
            tex,
            30
        ).setOrigin(0.5, 0.5).setDepth(100).setScrollFactor(0);

        // Add sprite to the container
        const saveRon = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.25,
            'ideaBox'
        ).setScrollFactor(0).setDepth(99).setScale(0.4);

        // Set a timer to destroy the elements after 5 seconds
        this.time.delayedCall(5000, () => {
            saveText.destroy();
            saveRon.destroy();
        });
    }

    fireballAnimation() {
        // black chest
        this.anims.create({
            key: 'fireball',
            frames: this.anims.generateFrameNames('fireball', {
                prefix: 'fireball_',
                start: 0,
                end: 23,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: -1  // Changed from -1 to 0 (play once)
        });
    }

    harryPotter() {
        // black chest
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNames('move', {
                prefix: 'walk_',
                start: 0,
                end: 8,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: -1  // Changed from -1 to 0 (play once)
        });

        this.anims.create({
            key: 'itemGet',
            frames: this.anims.generateFrameNames('itemGet', {
                prefix: 'walk_',
                start: 0,
                end: 2,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0  // Changed from -1 to 0 (play once)
        });

        this.anims.create({
            key: 'spell',
            frames: this.anims.generateFrameNames('spell', {
                prefix: 'spell_',
                start: 0,
                end: 5,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0  // Changed from -1 to 0 (play once)
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNames('death', {
                prefix: 'walk_',
                start: 0,
                end: 7,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0 // Changed from -1 to 0 (play once)
        });
    }

    chestAnimation() {
        // black chest
        this.anims.create({
            key: 'blackChest',
            frames: this.anims.generateFrameNames('blackChest', {
                prefix: 'chest_',
                start: 0,
                end: 9,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0  // Changed from -1 to 0 (play once)
        });

        // gold chest
        this.anims.create({
            key: 'goldChest',
            frames: this.anims.generateFrameNames('goldChest', {
                prefix: 'chest_',
                start: 0,
                end: 9,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0  // Changed from -1 to 0 (play once)
        });
    }

    portalAnimation() {
        // portal
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNames('portal', {
                prefix: 'portal_',
                start: 0,
                end: 5,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    cauldronAnimation() {
        this.anims.create({
            key: 'cauldrons',
            frames: this.anims.generateFrameNames('cauldrons', {
                prefix: 'cauldron_',
                start: 0,
                end: 4,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    dragonAnimation() {
        this.anims.create({
            key: 'dragon',
            frames: this.anims.generateFrameNames('dragon', {
                prefix: 'dragon_',
                start: 0,
                end: 5,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    enemyMovement() {
        // Define the movement boundaries
        const minX = this.width * 1;
        const maxX = this.width * 4;
        const minY = this.height;
        const maxY = this.height * 1.5;

        // Set initial position
        this.enemy.x = this.width * 3;
        this.enemy.y = this.height;

        // Set initial velocity
        let velocityX = 100 + Math.random() * 100; // Random velocity between 100-200
        let velocityY = 100 + Math.random() * 100;

        // Randomly set initial direction
        if (Math.random() > 0.5) velocityX *= -1;
        if (Math.random() > 0.5) velocityY *= -1;

        // Create a timer event to update the enemy's movement
        this.time.addEvent({
            delay: 50, // Update movement every 50ms for smooth motion
            callback: () => {
                // Move the enemy
                this.enemy.x += velocityX * (50 / 1000); // Convert to per-frame velocity
                this.enemy.y += velocityY * (50 / 1000);

                // Check X boundaries
                if (this.enemy.x <= minX) {
                    this.enemy.x = minX;
                    velocityX = Math.abs(velocityX) * (0.8 + Math.random() * 0.4); // Bounce with random speed variation
                } else if (this.enemy.x >= maxX) {
                    this.enemy.x = maxX;
                    velocityX = -Math.abs(velocityX) * (0.8 + Math.random() * 0.4);
                }

                // Check Y boundaries
                if (this.enemy.y <= minY) {
                    this.enemy.y = minY;
                    velocityY = Math.abs(velocityY) * (0.8 + Math.random() * 0.4);
                } else if (this.enemy.y >= maxY) {
                    this.enemy.y = maxY;
                    velocityY = -Math.abs(velocityY) * (0.8 + Math.random() * 0.4);
                }

                // Occasionally change direction randomly for more erratic movement
                if (Math.random() < 0.02) { // 2% chance per update
                    velocityX = (Math.random() * 200 + 50) * (Math.random() > 0.5 ? 1 : -1);
                    velocityY = (Math.random() * 200 + 50) * (Math.random() > 0.5 ? 1 : -1);
                }
            },
            callbackScope: this,
            loop: true
        });

        // Make the dragon face the direction it's moving
        this.time.addEvent({
            delay: 100, // Check less frequently than movement
            callback: () => {
                // Flip the sprite based on movement direction
                if (velocityX < 0) {
                    this.enemy.setFlipX(true);
                } else {
                    this.enemy.setFlipX(false);
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    // Add missing createBox method
    createBox(platforms) {
        // left
        for (let i = 0; i < 5; i += 0.04) {
            const platform = platforms.create(
                this.scale.width,
                this.scale.height * i,
                'tileset_L3'
            ).setScale(0.8 * this.scaleFactor);
        }

        // right
        for (let i = 0; i < 5; i += 0.04) {
            const platform = platforms.create(
                this.scale.width * 5,
                this.scale.height * i,
                'tileset_L3'
            ).setScale(0.8 * this.scaleFactor);
        }

        // up
        for (let i = 0; i < 5; i += 0.03) {
            const platform = platforms.create(
                this.scale.width * i,
                this.scale.height * 5,
                'tileset_L3'
            ).setScale(0.8 * this.scaleFactor, 1.5 * this.scaleFactor);
            platform.body.setSize(platform.width * 0.4, platform.height * 2.4); // Sets collision box size to 30px width, 60px height
            platform.body.setOffset(platform.width * 0.3, platform.height * 0.1);
        }
    }

    // Add missing createHearts method
    createHearts() {
        console.log('a')
        for (let i = 0; i < this.lives; i++) {
            const xPosition = this.width * (0.05 + (i * 0.03));
            const yPosition = this.height * 0.1;

            const heart = this.add.image(xPosition, yPosition, 'heart')
                .setScrollFactor(0)
                .setDepth(10);

            heart.setScale(0.04 * this.scaleFactor);
            this.hearts.push(heart);
        }
        console.log('a')
    }

    fireball() {
        this.fireballs = this.physics.add.group();
        this.fireballTimer = this.time.addEvent({
            delay: 2000,           // 3000ms = 3 seconds (increased from 1 second)
            callback: this.shootFireball,
            callbackScope: this,
            loop: true
        });
    }

    shootFireball() {
        // Check if there are any active fireballs
        if (this.fireballs.getChildren().some(fireball => fireball.active)) {
            return; // Don't create a new fireball if one already exists
        }

        // Create a single fireball at the enemy's position
        const fireball = this.fireballs.create(this.enemy.x, this.enemy.y, 'fireball_sheet');
        fireball.body.allowGravity = false;
        fireball.body.setSize(fireball.width * 0.4, fireball.height * 1.75);
        fireball.body.setOffset(fireball.width * 0.3, fireball.height * -0.05);
        // Play the fireball animation
        fireball.play('fireball');

        // Initialize trail particle array for this fireball
        fireball.trailParticles = [];

        // Add a light circle to the fireball
        fireball.lightCircle = this.add.graphics();
        fireball.lightRadius = 100; // Smaller light radius than player

        // Set the fireball speed
        const fireballSpeed = 600;

        // Calculate direction vector from enemy to player
        const dirX = this.player.x - this.enemy.x;
        const dirY = this.player.y - this.enemy.y;

        // Normalize the direction vector
        const length = Math.sqrt(dirX * dirX + dirY * dirY);
        const normalizedDirX = dirX / length;
        const normalizedDirY = dirY / length;

        // Set the fireball velocity directly toward the player (no spread)
        fireball.setVelocity(normalizedDirX * fireballSpeed, normalizedDirY * fireballSpeed);

        // Initialize homing properties
        fireball.homingRange = 500;
        fireball.hasHomed = false;

        // Set up trail creation timer
        fireball.trailTimer = this.time.addEvent({
            delay: 50, // Create a trail particle every 50ms
            callback: () => this.createFireballTrail(fireball),
            callbackScope: this,
            loop: true
        });

        // Add a collider for this fireball
        this.physics.add.collider(this.player, fireball, this.hitPlayer, null, this);

        // Destroy the fireball after it's traveled for a while
        this.time.delayedCall(5000, () => {
            if (fireball && fireball.active) {
                if (fireball.lightCircle) {
                    fireball.lightCircle.destroy();
                }
                // Stop creating trails
                if (fireball.trailTimer) {
                    fireball.trailTimer.remove();
                }
                // Remove any remaining trail particles
                fireball.trailParticles.forEach(particle => {
                    if (particle && particle.active) {
                        particle.destroy();
                    }
                });
                fireball.destroy();
            }
        });
    }

    // New method to create trail for fireballs with trails 3x bigger
    createFireballTrail(fireball) {
        if (fireball && fireball.active) {
            // Track the number of existing trail particles
            const trailCount = fireball.trailParticles.length;

            // Calculate scaling factor based on trail particle distance - increased by 3x
            const scaleFactor = 0.8 + (trailCount * 0.15); // 3x larger than before (0.7 → 2.1, 0.05 → 0.15)

            // Create a trail particle with a fire-like color (orange/red)
            const trailParticle = this.add.rectangle(
                fireball.x,
                fireball.y,
                30 * scaleFactor, // Base width multiplied by 3 (10 → 30)
                30 * scaleFactor, // Base height multiplied by 3 (10 → 30)
                Phaser.Display.Color.GetColor(255, 150 - trailCount * 10, 0), // From orange to red
                0.5 // Opacity
            );

            // Rotate the trail particle to match fireball rotation
            trailParticle.rotation = fireball.rotation;

            // Add to the game and track in the fireball's trail array
            fireball.trailParticles.push(trailParticle);

            // Fade out and remove old trail particles
            this.tweens.add({
                targets: trailParticle,
                alpha: 0,
                scaleX: scaleFactor * 0.5,
                scaleY: scaleFactor * 0.5,
                duration: 300, // Faster fade than player trail
                onComplete: () => {
                    if (trailParticle && trailParticle.active) {
                        trailParticle.destroy();
                    }
                    // Remove from array if the fireball still exists
                    if (fireball && fireball.active) {
                        const index = fireball.trailParticles.indexOf(trailParticle);
                        if (index > -1) {
                            fireball.trailParticles.splice(index, 1);
                        }
                    }
                }
            });
        }
    }

    hitPlayer(player, fireball) {
    // Destroy the fireball
    fireball.destroy();
    
    // Create a red flash effect
    const flash = this.add.image(this.player.x, this.player.y, 'redFlash');
        flash.setDepth(1000);
        flash.setScale(10);
        flash.setAlpha(0.7);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                flash.destroy();
            }
        });
    
    
    
    // Handle player damage logic here
    // e.g., player.health -= 10;
    
    // Continue with game over logic
    this.gameOverWithEffects();
}

    collision() {
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.obstacle);

        this.physics.add.collider(this.potionRed, this.obstacle);
        this.physics.add.collider(this.potionYellow, this.obstacle);
        this.physics.add.collider(this.potionBlack, this.obstacle);
        this.physics.add.collider(this.cloak, this.obstacle);

        this.physics.add.overlap(this.player, this.musk, this.handleMuskCollision, null, this);
        //this.physics.add.overlap(this.player, this.cloak, this.handleCloak, null, this);
        this.physics.add.overlap(this.player, this.potionRed, this.handleRed, null, this);
        this.physics.add.overlap(this.player, this.potionBlack, this.handleBlack, null, this);
        this.physics.add.overlap(this.player, this.potionYellow, this.handleYellow, null, this);
        this.physics.add.overlap(this.player, this.cauldron, this.handleCauldron, null, this);
    }

    handlePortal() {
        const endTime = this.time.now;
        const levelScore = 1500;
        this.sound.stopAll();
        this.scene.start('ScoreScene', { startTime: this.startTime, endTime: endTime, levelScore: levelScore,levelId:3, nextScene: 'C8' }); 
    }

    handleCauldron() {
        // Only proceed if the cauldron hasn't been used yet
        if (this.cauldronUsed) return;


        if (this.red === 1 && this.yellow === 1 && this.black === 1) {
            // Mark the cauldron as used so this can't be triggered again
            this.cauldronUsed = true;
            this.playerControlsEnabled = false

            // Stop player's current velocity
            this.cauldron.play("cauldrons");

            this.player.setVelocity(0);
            // Create fill meter
            const meterWidth = 200;
            const meterHeight = 30;
            const meterX = this.cameras.main.centerX - meterWidth / 2;
            const meterY = this.cameras.main.centerY + 100;

            // Background of the meter
            this.meterBg = this.add.rectangle(meterX, meterY, meterWidth, meterHeight, 0x000000);
            this.meterBg.setOrigin(0, 0).setScrollFactor(0);
            this.meterBg.setStrokeStyle(4, 0xffffff);

            // Fill part of the meter (starts empty)
            this.meterFill = this.add.rectangle(meterX + 4, meterY + 4, 0, meterHeight - 8, 0x7700ff);
            this.meterFill.setOrigin(0, 0).setScrollFactor(0);

            // Add text above meter
            this.meterText = this.add.text(meterX + meterWidth / 2, meterY - 15, 'Brewing Potion...', {
                fontSize: '20px',
                fill: '#ffffff'
            }).setOrigin(0.5).setScrollFactor(0);

            // Fill the meter over 3 seconds
            const fillDuration = 7000;
            const maxFillWidth = meterWidth - 8;

            this.tweens.add({
                targets: this.meterFill,
                width: maxFillWidth,
                duration: fillDuration,
                ease: 'Linear',
                onComplete: () => {
                    // Remove the meter when complete
                    this.meterBg.destroy();
                    this.meterFill.destroy();
                    this.meterText.destroy();

                    this.cauldron.anims.stop();
                    this.cauldron.body.setGravity(0, 0);
                    this.cauldron.body.allowGravity = false;
                    this.destroyPotionList()
                    this.findTheKey("Find Professor Elon");
                    this.currentObj = "Find Professor Elon"
                    this.sounds.be.play();
                    this.portal = this.physics.add.sprite(this.width * 4.05, this.height * 4.8, 'Dimensional_Portal');
                    this.portal.play("portal").setScale(7 * this.scaleFactor);
                    this.portal.body.setGravity(0, 0);
                    this.portal.body.allowGravity = false;

                    this.physics.add.overlap(this.player, this.portal, this.handlePortal, null, this);

                    this.playerControlsEnabled = true;
                    this.destroyPlatform();
                }
            });
        }
    }

    // handleCloak() {
    //     // Add a check for the cloakHandlingInProgress flag
    //     if ((!this.cloakItem || !this.cloakItem.active) && !this.cloakHandlingInProgress) {
    //         // Set flag to prevent multiple executions
    //         this.cloakHandlingInProgress = true;

    //         this.playerControlsEnabled = false;
    //         // Stop player's current velocity
    //         this.player.setVelocity(0, 0);

    //         console.log("outside")
    //         // Show quiz and wait for it to complete
    //         this.showQuiz().then(() => {
    //             console.log("inside")
    //             // Continue with the rest after quiz is complete
    //             this.cloakItem = this.physics.add.staticImage(
    //                 this.player.x,
    //                 this.player.y - 100,
    //                 this.itemGot
    //             ).setScale(0.7 * this.scaleFactor);
    //             this.cloakImg.setVisible(true);
    //             this.xbotn.setVisible(true);
    //             this.cloak.play("blackChest").setScale(2 * this.scaleFactor);
    //             this.player.play("itemGet");
    //             this.cloak.body.setGravity(0, 0);
    //             this.cloak.body.allowGravity = false;
    //             // Wait for animation to complete before destroying
    //             this.cloak.once('animationcomplete', () => {
    //                 this.cloak.destroy();
    //                 this.cloakItem.destroy();
    //                 this.invisibleUnlock = true;
    //                 this.playerControlsEnabled = true;

    //                 // Reset the flag when everything is complete
    //                 this.cloakHandlingInProgress = false;
    //             });
    //         });
    //     }
    // }

    handleRed() {
        if (!this.redP || !this.redP.active) {
            // Disable player controls when animation starts
            this.playerControlsEnabled = false;
            this.sounds.flying.setVolume(1).setLoop(true).play();

            // Stop player's current velocity
            this.player.setVelocity(0, 0);

            this.redP = this.physics.add.staticImage(
                this.player.x,
                this.player.y - 100,
                'red'
            ).setScale(0.2 * this.scaleFactor);

            // Play the animation
            this.potionRed.play("goldChest");
            this.player.play("itemGet");

            // Disable gravity so it stays in place
            this.potionRed.body.setGravity(0, 0);
            this.potionRed.body.allowGravity = false;

            // When animation completes, destroy the sprite, increment counter, and re-enable controls
            this.potionRed.once('animationcomplete', () => {
                this.potionRed.destroy();
                this.redP.destroy();
                this.red++;

                // Re-enable player controls after animation is complete
                this.playerControlsEnabled = true;
                this.reCreatePotionList();
            });
        }
    }

    handleBlack() {
        if (!this.blackP || !this.blackP.active) {
            this.playerControlsEnabled = false;
            this.sounds.flying.setVolume(1).setLoop(true).play();

            // Stop player's current velocity
            this.player.setVelocity(0, 0);
            this.blackP = this.physics.add.staticImage(
                this.player.x,
                this.player.y - 100,
                'purple'
            ).setScale(0.2 * this.scaleFactor);
            this.potionBlack.play("goldChest").setScale(2 * this.scaleFactor);
            this.player.play("itemGet");
            this.potionBlack.body.setGravity(0, 0);
            this.potionBlack.body.allowGravity = false;
            this.potionBlack.once('animationcomplete', () => {
                this.potionBlack.destroy();
                this.blackP.destroy();
                this.black++;
                this.playerControlsEnabled = true;
                this.reCreatePotionList();
            });
        }
    }

    handleYellow() {
        if (!this.yellowP || !this.yellowP.active) {
            this.playerControlsEnabled = false;
            this.sounds.flying.setVolume(1).setLoop(true).play();

            // Stop player's current velocity
            this.player.setVelocity(0, 0);
            this.yellowP = this.physics.add.staticImage(
                this.player.x,
                this.player.y - 100,
                'yellow'
            ).setScale(0.2 * this.scaleFactor);
            this.potionYellow.play("goldChest").setScale(2 * this.scaleFactor);
            this.player.play("itemGet");
            this.potionYellow.body.setGravity(0, 0);
            this.potionYellow.body.allowGravity = false;
            this.potionYellow.once('animationcomplete', () => {
                this.potionYellow.destroy();
                this.yellowP.destroy();
                this.yellow++;
                this.playerControlsEnabled = true;
                this.reCreatePotionList();
            });
        }
    }

    handleMuskCollision(player, musk) {
        this.sounds.a.setVolume(1).setLoop(false).play();

        // Check if player is near musk and Z is pressed
        if (this.zKey.isDown) {
            if (!this.talk) {
                // Save player position before transitioning
                this.registry.set('playerX', this.player.x);
                this.registry.set('playerY', this.player.y);
                this.registry.set('red', this.red);
                this.registry.set('yellow', this.yellow);
                this.registry.set('black', this.black);
                this.registry.set('lives', this.lives);

                // Stop any playing music
                if (this.backgroundMusic) {
                    this.backgroundMusic.stop();
                }

                // Save any other necessary game state

                // Transition to cutscene
                this.scene.start('C7');
                this.sound.stopAll();

                this.talk = true;
            }
        }
    }

    createPotionList() {
        this.pRT = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.1, 'red').setScrollFactor(0).setDepth(10).setScale(0.2 * this.scaleFactor);
        this.pRN = this.add.bitmapText(this.game.config.width * 0.425, this.game.config.height * 0.0, 'pixelfont', this.red, 50).setScrollFactor(0).setDepth(10).setVisible(true);
        this.pYT = this.add.image(this.game.config.width * 0.475, this.game.config.height * 0.1, 'yellow').setScrollFactor(0).setDepth(10).setScale(0.2 * this.scaleFactor);
        this.pYN = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.0, 'pixelfont', this.yellow, 50).setScrollFactor(0).setDepth(10).setVisible(true);
        this.pBT = this.add.image(this.game.config.width * 0.55, this.game.config.height * 0.1, 'purple').setScrollFactor(0).setDepth(10).setScale(0.2 * this.scaleFactor);
        this.pBN = this.add.bitmapText(this.game.config.width * 0.575, this.game.config.height * 0.0, 'pixelfont', this.black, 50).setScrollFactor(0).setDepth(10).setVisible(true);
    }

    reCreatePotionList() {
        this.pRT.destroy();
        this.pRN.destroy();
        this.pYT.destroy();
        this.pYN.destroy();
        this.pBT.destroy();
        this.pBN.destroy();
        this.pRT = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.08, 'red').setScrollFactor(0).setDepth(10).setScale(0.2 * this.scaleFactor);
        this.pRN = this.add.bitmapText(this.game.config.width * 0.425, this.game.config.height * 0.01, 'pixelfont', this.red, 50).setScrollFactor(0).setDepth(10).setVisible(true);
        this.pYT = this.add.image(this.game.config.width * 0.475, this.game.config.height * 0.08, 'yellow').setScrollFactor(0).setDepth(10).setScale(0.2 * this.scaleFactor);
        this.pYN = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.01, 'pixelfont', this.yellow, 50).setScrollFactor(0).setDepth(10).setVisible(true);
        this.pBT = this.add.image(this.game.config.width * 0.55, this.game.config.height * 0.08, 'purple').setScrollFactor(0).setDepth(10).setScale(0.2 * this.scaleFactor);
        this.pBN = this.add.bitmapText(this.game.config.width * 0.575, this.game.config.height * 0.01, 'pixelfont', this.black, 50).setScrollFactor(0).setDepth(10).setVisible(true);
    }

    destroyPotionList() {
        this.pRT.destroy();
        this.pRN.destroy();
        this.pYT.destroy();
        this.pYN.destroy();
        this.pBT.destroy();
        this.pBN.destroy();

        this.pRT = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.08, 'potionTutu').setScrollFactor(0).setDepth(10).setScale(0.2 * this.scaleFactor);
    }

    showDialog(text) {
        // Remove any existing dialog
        if (this.dialogText) {
            this.dialogText.destroy();
            if (this.dialogBox) this.dialogBox.destroy();
        }

        // Define dialog dimensions for a large font (much bigger box needed)
        const fontSize = 30;
        const boxWidth = 600;
        const boxHeight = 400;
        const padding = 20;

        // Create dialog box
        this.dialogBox = this.add.graphics();
        this.dialogBox.fillStyle(0x000000, 0.8); // Slightly darker background for better readability
        this.dialogBox.lineStyle(4, 0xffffff, 0.5); // Add a white border
        this.dialogBox.fillRoundedRect(
            this.musk.x - boxWidth / 2,
            this.musk.y - boxHeight - 30,
            boxWidth,
            boxHeight,
            15
        );
        this.dialogBox.strokeRoundedRect(
            this.musk.x - boxWidth / 2,
            this.musk.y - boxHeight - 30,
            boxWidth,
            boxHeight,
            15
        );
        this.dialogBox.setScrollFactor(1).setDepth(12);

        // Create text with word wrapping
        this.dialogText = this.add.text(
            this.musk.x - boxWidth / 2 + padding,
            this.musk.y - boxHeight - 30 + padding,
            text,
            {
                fontFamily: 'Arial',
                fontSize: `${fontSize}px`,
                color: '#ffffff',
                wordWrap: { width: boxWidth - (padding * 2) },
                align: 'left',
                lineSpacing: 10
            }
        );
        this.dialogText.setScrollFactor(1).setDepth(13);

        // Auto-remove dialog after 8 seconds (increased time for the larger text)
        this.time.delayedCall(8000, () => {
            if (this.dialogText) {
                this.dialogText.destroy();
                this.dialogText = null;
            }
            if (this.dialogBox) {
                this.dialogBox.destroy();
                this.dialogBox = null;
            }
        });
    }

    item() {
        this.potionRed = this.physics.add.sprite(this.width * 4.9, this.height * 3.9, 'goldC').setScale(2 * this.scaleFactor);
        this.potionYellow = this.physics.add.sprite(this.width * 1.9, this.height * 1.65, 'goldC').setScale(2 * this.scaleFactor);
        this.potionBlack = this.physics.add.sprite(this.width * 1.2, this.height * 3.6, 'goldC').setScale(2 * this.scaleFactor);
        this.cloak = this.physics.add.sprite(-this.width * 1.5, -this.height * 2.8, 'blackC').setScale(2 * this.scaleFactor);

        this.cauldron = this.physics.add.sprite(this.width * 4.5, this.height * 1.65, 'Cauldron').setScale(0.3 * this.scaleFactor);
        this.cauldron.body.setGravity(0, 0);
        this.cauldron.body.allowGravity = false;
    }

    potionUsage() {
        // To be implemented
    }

    destroyPlatform() {
        this.time.delayedCall(4000, () => {
            this.obstacles.forEach(obs => {
                obs.destroy();
            });
        });
    }

    createObstacle(obstacle) {
        // SP
        this.obstacles = [];

        for (let i = 5; i > 4; i -= 0.03) {
            for (let j = 5; j > 4; j -= 0.05) {
                const obs = obstacle.create(
                    this.scale.width * i,
                    this.scale.height * j,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);

                obs.body.setSize(obs.width * 0.4, obs.height * 1.75);
                obs.body.setOffset(obs.width * 0.3, obs.height * -0.05);

                if (i < 4.08) {
                    // Add each obstacle to the array
                    this.obstacles.push(obs);
                }
            }
        }

        // Remove all obstacles after 4 seconds
        // Using Phaser's time event (preferred method in Phaser games)


        //AP
        for (let i = 5; i > 4; i -= 0.03) {
            for (let j = 4.5; j > 4; j -= 0.05) {
                const obs = obstacle.create(
                    this.scale.width * i,
                    this.scale.height * j,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);

                obs.body.setSize(obs.width * 0.4, obs.height * 1.75); // Sets collision box size to 30px width, 60px height
                obs.body.setOffset(obs.width * 0.3, obs.height * -0.05);
            }
        }

        //BP
        for (let i = 1.5; i > 1; i -= 0.03) {
            for (let j = 3.9; j > 3.7; j -= 0.05) {
                const obs = obstacle.create(
                    this.scale.width * i,
                    this.scale.height * j,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);
                obs.body.setSize(obs.width * 0.4, obs.height * 1.75); // Sets collision box size to 30px width, 60px height
                obs.body.setOffset(obs.width * 0.3, obs.height * -0.05);
            }
        }

        //CP
        for (let i = 2; i > 1.25; i -= 0.03) {
            for (let j = 1.9; j > 1.7; j -= 0.05) {
                const obs = obstacle.create(
                    this.scale.width * i,
                    this.scale.height * j,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);
                obs.body.setSize(obs.width * 0.4, obs.height * 1.75); // Sets collision box size to 30px width, 60px height
                obs.body.setOffset(obs.width * 0.3, obs.height * -0.05);
            }
        }

        //DP
        for (let i = 5; i > 4.25; i -= 0.03) {
            for (let j = 1.9; j > 1.7; j -= 0.05) {
                const obs = obstacle.create(
                    this.scale.width * i,
                    this.scale.height * j,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);
                obs.body.setSize(obs.width * 0.4, obs.height * 1.75); // Sets collision box size to 30px width, 60px height
                obs.body.setOffset(obs.width * 0.3, obs.height * -0.05);
            }
        }

        //EP
        for (let i = 1.5; i > 1; i -= 0.03) {
            for (let j = 3; j > 2.9; j -= 0.05) {
                const obs = obstacle.create(
                    this.scale.width * i,
                    this.scale.height * j,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);
                obs.body.setSize(obs.width * 0.4, obs.height * 1.75); // Sets collision box size to 30px width, 60px height
                obs.body.setOffset(obs.width * 0.3, obs.height * -0.05);
            }
        }

        //FP
        for (let i = 5; i > 4; i -= 0.03) {
            for (let j = 3.6; j > 3.3; j -= 0.05) {
                const obs = obstacle.create(
                    this.scale.width * i,
                    this.scale.height * j,
                    'tileset_L3'
                ).setScale(1.4 * this.scaleFactor);
                obs.body.setSize(obs.width * 0.4, obs.height * 1.75); // Sets collision box size to 30px width, 60px height
                obs.body.setOffset(obs.width * 0.3, obs.height * -0.05);
            }
        }

        //1
        for (let i = 3.5; i > 3; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 4.4,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        //2
        for (let i = 3.8; i > 3.75; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 4.1,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 3; i > 2.75; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 4.1,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 2.5; i > 2.25; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 4.1,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 2; i > 1.75; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 4.1,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        //3
        for (let i = 3.25; i > 3; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 3.7,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 1.65; i > 1.5; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 3.7,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 3.75; i > 3.5; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 3.7,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        //4
        for (let i = 3; i > 2.75; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 3.3,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 3.5; i > 3.25; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 3.3,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 2.25; i > 2.5; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 3.3,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        //5
        for (let i = 3.3; i > 3; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.9,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 4; i > 3.75; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.9,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 2; i > 1.25; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.9,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        //6
        for (let i = 3.1; i > 3; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.5,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 2.75; i > 2.5; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.5,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 2.3; i > 2; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.5,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        //7
        for (let i = 2.9; i > 2.4; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.1,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 3.4; i > 3.2; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.1,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 3.8; i > 3.6; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 2.1,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        //8
        for (let i = 2.3; i > 2; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 1.7,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }

        for (let i = 4; i > 3.7; i -= 0.03) {
            obstacle.create(
                this.scale.width * i,
                this.scale.height * 1.7,
                'tileset_L3'
            ).setScale(1.4 * this.scaleFactor);
        }
    }

    update(time, delta) {
        this.checkAllPotionsCollected();
        // Create a spell casting state flag if it doesn't exist
        if (this.isSpellCasting === undefined) {
            this.isSpellCasting = false;
        }

        if (this.light && this.player) {
            this.light.x = this.player.x;
            this.light.y = this.player.y;
        }

        // Spell casting logic - takes priority
        // if (this.aKey.isDown && !this.isSpellCasting) {
        //     this.playerControlsEnabled = false
        //     console.log('Casting spell');
        //     this.lightRadius = 500;
        //     this.player.play("death", true);
        //     this.sounds.lm.setVolume(1).setLoop(false).play();

        //     this.isSpellCasting = true;
        //     this.light.setScale(2 * this.scaleFactor)
        //     this.time.delayedCall(1000, () => {
        //         this.playerControlsEnabled = true
        //         this.isSpellCasting = false;
        //     });
        //     // Reset after spell animation completes
        //     this.time.delayedCall(8000, () => {
        //         this.lightRadius = 200;
        //         this.light.setScale(1 * this.scaleFactor)
        //     });
        // }

        // Keep existing player movement code, but don't override spell animations
        if (this.player && this.playerControlsEnabled && !this.isSpellCasting) {
            // Horizontal movement
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
                this.player.play("move", true);
                this.player.setFlipX(false); // Flip sprite to face left
                this.player.setScale(3 * this.scaleFactor);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(this.playerSpeed);
                this.player.play("move", true);
                this.player.setFlipX(true); // Make sprite face right (default)
                this.player.setScale(3 * this.scaleFactor);
            } else {
                this.player.setVelocityX(0);
                // Play idle animation if you have one, or stop animation
                this.player.setTexture("idle"); // Assuming you have an idle animation
                // Or if you want to stop the animation: this.player.anims.stop();
            }
        } else if (this.player && this.playerControlsEnabled) {
            // Even during spellcasting, allow movement but don't change animation
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
                this.player.setFlipX(false);
                this.player.setScale(3 * this.scaleFactor);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(this.playerSpeed);
                this.player.setFlipX(true);
                this.player.setScale(3 * this.scaleFactor);
            } else {
                this.player.setVelocityX(0);
            }
        }

        // Add invisibility logic
        if (this.invisibleUnlock) {
            if (this.xKey.isDown && !this.isSpellCasting && !this.invisibilityCooldown) {
                this.player.setAlpha(0.2);
                this.cloakImg.setAlpha(0.3);
                this.invisible = true;
                this.player.setTexture(this.cloakImgName)
                // Set cooldown flag to prevent immediate reuse
                this.invisibilityCooldown = true;

                // Create cooldown timer display (optional)
                this.invisibilityTimerText = this.add.text(
                    this.width * 0.05, this.height * 0.25,
                    '20',
                    { font: '40px Arial', fill: '#ffffff' }
                ).setDepth(1000).setOrigin(0.5).setScrollFactor(0);

                // Update the cooldown timer display every second
                this.invisibilityCountdown = 20;
                this.invisibilityTimerEvent = this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.invisibilityCountdown--;
                        if (this.invisibilityTimerText) {
                            this.invisibilityTimerText.setText(this.invisibilityCountdown.toString());
                        }
                    },
                    callbackScope: this,
                    repeat: 19
                });

                // Reset invisibility after the effect duration
                this.time.delayedCall(this.invisibleTimer, () => {
                    this.player.setTexture('idle')
                    this.player.setAlpha(1);
                    this.cloakImg.setAlpha(1);
                    this.invisible = false;
                });

                // Reset cooldown after 20 seconds
                this.time.delayedCall(20000, () => {
                    this.invisibilityCooldown = false;
                    if (this.invisibilityTimerText) {
                        this.invisibilityTimerText.destroy();
                        this.invisibilityTimerText = null;
                    }
                });
            }

            // Update position of cooldown timer if it exists
            if (this.invisibilityTimerText) {
                this.invisibilityTimerText.setPosition(this.width * 0.05, this.height * 0.25);
            }
        }

        // Define gravity constants for more natural movement
        const normalGravity = 1500;
        const fallMultiplier = 1.5;
        const lowJumpMultiplier = 2.0;

        // Jump logic
        if (this.player) {
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-1200 * this.scaleFactor);
                this.justJumped = true;
                this.sounds.jump.play();
            } else {
                this.justJumped = false;
            }

            // Apply variable gravity
            let gravity = normalGravity;

            if (this.player.body.velocity.y > 0) {
                gravity = normalGravity * fallMultiplier;
            } else if (this.player.body.velocity.y < 0 && !this.cursors.up.isDown) {
                gravity = normalGravity * lowJumpMultiplier;
            }

            this.player.body.velocity.y += gravity * (delta / 1000);

            const maxFallSpeed = 800;
            if (this.player.body.velocity.y > maxFallSpeed) {
                this.player.setVelocityY(maxFallSpeed);
            }
        }

        if (!this.invisible) {
            if (this.fireballs) {
                this.fireballs.getChildren().forEach(fireball => {
                    if (fireball && fireball.active) {
                        // Check if the fireball has already adjusted its trajectory
                        if (!fireball.hasHomed) {
                            // Calculate distance to player
                            const dx = this.player.x - fireball.x;
                            const dy = this.player.y - fireball.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            // If within homing range and hasn't homed yet, adjust trajectory once
                            if (distance < fireball.homingRange) {
                                // Calculate direction to player
                                const dirX = dx / distance;
                                const dirY = dy / distance;

                                // Get current velocity
                                const currentVelX = fireball.body.velocity.x;
                                const currentVelY = fireball.body.velocity.y;
                                const speed = Math.sqrt(currentVelX * currentVelX + currentVelY * currentVelY);

                                // Apply a one-time adjustment with moderate homing strength
                                const homingStrength = 0.6; // Reduced from previous values

                                const newVelX = currentVelX * (1 - homingStrength) + dirX * speed * homingStrength;
                                const newVelY = currentVelY * (1 - homingStrength) + dirY * speed * homingStrength;

                                // Normalize and apply the new velocity to maintain speed
                                const newSpeed = Math.sqrt(newVelX * newVelX + newVelY * newVelY);
                                fireball.setVelocity(
                                    (newVelX / newSpeed) * speed,
                                    (newVelY / newSpeed) * speed
                                );

                                // Mark this fireball as having already homed in
                                fireball.hasHomed = true;
                            }
                        }
                    }
                });
            }
        }
    }

    initializeQuestionPool() {
        this.questionPool = initQuistion(HarryGlobal.child);

        this.askedQuestions = []; // Track asked questions
    }

    // Function to get a new unasked question
    getNewQuestion() {
        if (this.questionPool.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.questionPool.length);
        const question = this.questionPool.splice(randomIndex, 1)[0];
        askedQuestions.push(question);
        return question;
    }

    async showQuiz() {
        // If a quiz is already active, add to queue and wait
        if (this.isQuizActive) {
            console.log("Quiz already active, queueing");
            return new Promise((resolve) => {
                this.quizQueue.push(() => {
                    this.showQuiz().then(resolve);
                });
            });
        }

        this.isQuizActive = true;
        console.log("showQuiz started");

        // Return a Promise that resolves when selection is made
        try {
            return await new Promise((resolve) => {
                // Create black transparent overlay
                const overlay = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.7)
                    .setOrigin(0.5)
                    .setDepth(20)
                    .setScrollFactor(0);

                // Add quiz panel image
                const quizPanel = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
                    .setScale(2.4 * this.scaleFactor)
                    .setDepth(21)
                    .setScrollFactor(0);

                // Get a new question
                const currentQuestion = this.getNewQuestion();
                if (!currentQuestion) {
                    console.log('No more questions available!');
                    resolve(); // Resolve immediately if no questions
                    return;
                }
                console.log("Question loaded");

                // Add question text on the yellow part
                const questionText = this.add.bitmapText(this.width / 2, this.height / 2 - 100, 'pixelfont', currentQuestion.question, 40)
                    .setOrigin(0.5)
                    .setTint(0xFF0000) // Red text for contrast on yellow
                    .setDepth(22)
                    .setScrollFactor(0);

                // Arrange options in a 2x2 grid
                const optionXPositions = [this.width * 0.35, this.width * 0.65]; // Two columns
                const optionYPositions = [this.height * 0.55, this.height * 0.75]; // Two row
                const optionTexts = [];
                currentQuestion.options.forEach((option, index) => {
                    const row = Math.floor(index / 2);
                    const col = index % 2;
                    const optionText = this.add.bitmapText(optionXPositions[col], optionYPositions[row], 'pixelfont', option, 30)
                        .setOrigin(0.5)
                        .setTint(0xFFFFFF) // Initial white text
                        .setDepth(22)
                        .setInteractive()
                        .setScrollFactor(0)
                        .on('pointerover', () => this.input.setDefaultCursor('pointer'))
                        .on('pointerout', () => this.input.setDefaultCursor('default'));
                    optionTexts.push(optionText);
                });
                console.log("Options displayed");

                // Create a pointer down listener that will be removed after use
                const pointerDownListener = (pointer) => {
                    const clickedOption = currentQuestion.options.find((_, index) => {
                        const row = Math.floor(index / 2);
                        const col = index % 2;
                        const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, optionXPositions[col], optionYPositions[row]);
                        return dist < 50; // Rough click area
                    });

                    if (clickedOption) {
                        // Remove the event listener to prevent multiple calls
                        this.input.off('pointerdown', pointerDownListener);

                        // Color the clicked option based on correctness
                        const clickedIndex = currentQuestion.options.indexOf(clickedOption);
                        const row = Math.floor(clickedIndex / 2);
                        const col = clickedIndex % 2;
                        const selectedText = optionTexts[clickedIndex];
                        selectedText.setTint(clickedOption === currentQuestion.correctAnswer ? 0x00FF00 : 0xFF0000);

                        // Delay to allow dialogue to be read, then trigger animation
                        this.time.delayedCall(1000, () => {
                            overlay.destroy();
                            quizPanel.destroy();
                            questionText.destroy();
                            optionTexts.forEach(text => text.destroy());
                            if (clickedOption === currentQuestion.correctAnswer) {
                                this.itemGot = "clok";
                                this.invisibleTimer = 5000;
                            } else {
                                this.itemGot = "clok";
                                this.invisibleTimer = 2000;
                            }

                            // Resolve the promise after cleanup
                            resolve();
                        });
                    }
                };

                // Add the pointer down event listener
                this.input.on('pointerdown', pointerDownListener);

                console.log("Quiz interaction ready");
            });
        } finally {
            // Make sure we always mark the quiz as inactive when done
            this.isQuizActive = false;

            // Check if there are any queued quizzes waiting
            if (this.quizQueue.length > 0) {
                console.log("Processing next quiz in queue");
                const nextQuiz = this.quizQueue.shift();
                nextQuiz(); // Run the next queued quiz
            }
        }
    }

    // Modified Quiz with lives function
    async showQuizLives() {
        // If a quiz is already active, add to queue and wait
        if (this.isQuizActive) {
            console.log("Quiz already active, queueing lives quiz");
            return new Promise((resolve) => {
                this.quizQueue.push(() => {
                    this.showQuizLives().then(resolve);
                });
            });
        }

        this.isQuizActive = true;
        console.log("showQuizLives started");

        try {
            // Return a Promise that resolves when selection is made
            return await new Promise((resolve) => {
                // Pause physics and player movement during quiz
                this.physics.pause();
                const prevPlayerControlsEnabled = this.playerControlsEnabled;
                this.playerControlsEnabled = false;

                // Create black transparent overlay
                const overlay = this.add.rectangle(this.width / 2, this.height / 2,
                    this.width, this.height, 0x000000, 0.7)
                    .setOrigin(0.5)
                    .setDepth(20)
                    .setScrollFactor(0);

                // Add quiz panel image
                const quizPanel = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
                    .setScale(2.4 * this.scaleFactor)
                    .setDepth(21)
                    .setScrollFactor(0);

                const Herte = this.add.image(this.width / 2, this.height * 0.15, 'Hrte')
                    .setScale(1.4 * this.scaleFactor, 1 * this.scaleFactor)
                    .setDepth(21)
                    .setScrollFactor(0);

                // Get a new question
                const currentQuestion = this.getNewQuestion();
                if (!currentQuestion) {
                    console.log('No more questions available!');
                    overlay.destroy();
                    quizPanel.destroy();

                    // Resume physics and player control
                    this.physics.resume();
                    this.playerControlsEnabled = prevPlayerControlsEnabled;

                    resolve(false); // Resolve with false if no questions
                    return;
                }
                console.log("Question loaded:", currentQuestion.question);

                // Add question text on the yellow part
                const questionText = this.add.bitmapText(
                    this.width / 2,
                    this.height / 2 - 100,
                    'pixelfont',
                    currentQuestion.question,
                    40
                )
                    .setOrigin(0.5)
                    .setTint(0xFF0000) // Red text for contrast on yellow
                    .setDepth(22)
                    .setScrollFactor(0);

                // Create an array to hold all UI elements for easy cleanup
                const uiElements = [overlay, quizPanel, questionText];

                // Arrange options in a 2x2 grid
                const optionXPositions = [this.width * 0.35, this.width * 0.65]; // Two columns
                const optionYPositions = [this.height * 0.55, this.height * 0.75]; // Two row
                const optionTexts = [];

                currentQuestion.options.forEach((option, index) => {
                    const row = Math.floor(index / 2);
                    const col = index % 2;
                    const optionText = this.add.bitmapText(
                        optionXPositions[col],
                        optionYPositions[row],
                        'pixelfont',
                        option,
                        30
                    )
                        .setOrigin(0.5)
                        .setTint(0xFFFFFF) // Initial white text
                        .setDepth(22)
                        .setInteractive({ useHandCursor: true })
                        .setScrollFactor(0);

                    optionText.on('pointerdown', () => {
                        // Handle click on option
                        handleOptionClick(option, index);
                    });

                    optionTexts.push(optionText);
                    uiElements.push(optionText);
                });

                console.log("Options displayed");

                // Function to handle option clicks
                const handleOptionClick = (clickedOption, clickedIndex) => {
                    // Disable all options to prevent multiple clicks
                    optionTexts.forEach(text => text.disableInteractive());

                    const isCorrect = clickedOption === currentQuestion.correctAnswer;

                    // Set color based on correctness (green if correct, red if wrong)
                    optionTexts[clickedIndex].setTint(isCorrect ? 0x00FF00 : 0xFF0000);

                    // If wrong, highlight the correct answer in green
                    if (!isCorrect) {
                        const correctIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);
                        if (correctIndex >= 0) {
                            optionTexts[correctIndex].setTint(0x00FF00);
                        }
                    }

                    console.log("Answer selected:", clickedOption, "Correct:", isCorrect);

                    // Delay to allow player to see the result, then clean up
                    this.time.delayedCall(1500, () => {
                        console.log("Cleaning up quiz UI");

                        // Safely destroy all UI elements
                        uiElements.forEach(element => {
                            if (element && element.active) {
                                element.destroy();
                            }
                        });

                        // Resume physics and player control
                        this.physics.resume();
                        this.playerControlsEnabled = prevPlayerControlsEnabled;

                        // Resolve the promise with the result
                        resolve(isCorrect);
                    });
                };

                console.log("Quiz interaction ready");
            });
        } finally {
            // Make sure we always mark the quiz as inactive when done
            this.isQuizActive = false;

            // Check if there are any queued quizzes waiting
            if (this.quizQueue.length > 0) {
                console.log("Processing next quiz in queue");
                const nextQuiz = this.quizQueue.shift();
                nextQuiz(); // Run the next queued quiz
            }
        }
    }

    updateScore(points) {
        this.score += points;
        if (this.scoreText) {
            this.scoreText.setText('SCORE: ' + this.score);
        } else {
            // Create score text if it doesn't exist
            this.scoreText = this.add.bitmapText(20, 20, 'pixelfont', 'SCORE: ' + this.score, 16)
                .setScrollFactor(0)
                .setDepth(10);
        }
    }

    gameOver() {
        initiateGameOver.bind(this)({ score: this.score });
    }

    pauseGame() {
        handlePauseGame.bind(this)();
    }

    gameOverWithEffects() {
        this.lives--;
        this.sounds.hurt.setVolume(0.2).setLoop(false).play();

        // Update hearts UI
        if (this.lives >= 0 && this.hearts[this.lives]) {
            this.hearts[this.lives].destroy();
        }

        if (this.lives > 0) {
            // Player still has lives, just refill oxygen
            this.isGameOver = false; // Reset flag
            return;
        }
        const flash = this.add.image(this.player.x, this.player.y, 'redFlash');
        flash.setDepth(1000);
        flash.setScale(10);
        flash.setAlpha(0.7);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                flash.destroy();
            }
        });
    

        // First disable controls and play death animation
        this.playerControlsEnabled = false;
        this.player.play("death", true);

        // Add an event listener for when the animation completes
        this.player.once('animationcomplete-death', () => {
            this.misssionFailed()
            this.time.delayedCall(3000, () => {

                // Now show the quiz after animation is done
                this.showQuizLives().then((quizPassed) => {
                    console.log('Quiz completed, result:', quizPassed);

                    if (quizPassed) {
                        // Clear existing hearts array
                        this.hearts.forEach(heart => {
                            if (heart) heart.destroy();
                        });
                        this.hearts = [];

                        // Player passed the quiz, give another life
                        this.lives = 2;

                        HarryGlobal.lives = 2

                        // Recreate the heart UI
                        // this.createHearts();

                        // this.isGameOver = false; // Reset flag
                        // this.playerControlsEnabled = true; // Re-enable player controls
                        this.scene.start("C7");
                        this.sound.stopAll();
                    } else {
                        // Clear existing hearts array
                        this.hearts.forEach(heart => {
                            if (heart) heart.destroy();
                        });
                        this.hearts = [];

                        // Player passed the quiz, give another life
                        this.lives = 1;
                        HarryGlobal.lives = 1

                        // Recreate the heart UI
                        // this.createHearts();

                        // this.isGameOver = false; // Reset flag
                        // this.playerControlsEnabled = true; // Re-enable player controls
                        this.scene.start("C7");
                        this.sound.stopAll();
                    }
                }).catch(error => {
                    console.error("Quiz error:", error);
                    this.hasFlashed = false;
                    this.scene.start('L3');
                });

            }, [], this);

        });
    }

    misssionFailed() {
        // Stop camera from following the player
        this.cameras.main.stopFollow();

        // Disable player controls
        this.playerControlsEnabled = false;
        this.player.setTint(0x0055ff); // Blue tint

        // Optional: Add a pulsing blue tint effect for more dramatic appearance
        this.tweens.add({
            targets: this.player,
            tint: { from: 0x0055ff, to: 0x00aaff }, // Pulse between darker and lighter blue
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        // Set player's vertical velocity to move upward

        this.missionClear("Mission Failed");
    }

    missionClear(text) {
        console.log('a')

        // Add a black overlay that covers the entire screen
        this.blackOverlay = this.add.rectangle(
            0, 0,
            this.game.config.width * 2, // Make it larger than needed to ensure full coverage
            this.game.config.height * 2,
            0x000000 // Black color
        )
            .setOrigin(0, 0)
            .setDepth(15) // Lower depth than the text
            .setScrollFactor(0)
            .setAlpha(0); // Start fully transparent

        // Create the mission complete text
        this.howToPlayS = this.add.bitmapText(
            this.game.config.width * 0.50,
            this.game.config.height * 0.5,
            'pixelfont',
            text,
            50
        )
            .setOrigin(0.5, 0.5)
            .setVisible(true)
            .setDepth(16)
            .setScrollFactor(0)
            .setAlpha(0);

        // Create a tween for the black overlay
        this.tweens.add({
            targets: this.blackOverlay,
            alpha: 0.7, // Fade to 0.7 opacity
            duration: 3000,
            ease: 'Linear'
        });

        // Create a tween to fade in the text
        this.tweens.add({
            targets: this.howToPlayS,
            alpha: 1, // Animate to alpha 1 (fully visible)
            duration: 3000, // Duration in milliseconds (3 seconds)
            ease: 'Linear' // You can use different easing functions: 'Power1', 'Sine.easeIn', etc.
        });
    }
}


const rexJoystickUrl = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js";
const rexButtonUrl = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js";


function getCustomQuestionsForChild(child) {
    const customQuestions = {
        Rohan: [
            { question: "What is the color of grass?", options: ["Red", "Blue", "Green", "Yellow"], correct: 2 },
            { question: "How many days are there in a week?", options: ["5", "6", "7", "8"], correct: 2 },
            { question: "Which animal is known as man’s best friend?", options: ["Cat", "Elephant", "Dog", "Tiger"], correct: 2 },
            { question: "What color is the sky on a clear day?", options: ["Green", "Blue", "Pink", "Black"], correct: 1 },
            { question: "What do you use to write?", options: ["Fork", "Pen", "Spoon", "Eraser"], correct: 1 }
        ],
        Ivaan: [
            { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
            { question: "What do we call a baby cat?", options: ["Pup", "Cub", "Kitten", "Calf"], correct: 2 },
            { question: "Which sense organ do we use to smell?", options: ["Eyes", "Ears", "Nose", "Mouth"], correct: 2 },
            { question: "Which is the fastest land animal?", options: ["Horse", "Cheetah", "Dog", "Lion"], correct: 1 },
            { question: "Which shape is round?", options: ["Square", "Triangle", "Rectangle", "Circle"], correct: 3 }
        ]
    };

    return customQuestions[child] || [];
}
//------------------DONT MAKE CHANGES IN IT-----------------
class L4 extends Phaser.Scene {
    constructor() {
        super({ key: 'L4' }); this.frameDimensions = {
            //    player_sprites: {
            //        'spell1.png': { w: 19, h: 44 },
            //        'spell2.png': { w: 19, h: 44 },
            //        'spell3.png': { w: 19, h: 44 },
            //        'spell4.png': { w: 22, h: 44 },
            //        'spell5.png': { w: 20, h: 44 },
            //        'spell6.png': { w: 30, h: 44 }
            //    },
            harryWalk: {
                'image_0(12).png': { w: 15, h: 38 },
                'image_1(12).png': { w: 17, h: 42 },
                'image_2(8).png': { w: 16, h: 40 },
                'image_3(5).png': { w: 17, h: 41 },
                'image_4(6).png': { w: 15, h: 41 },
                'image_5(3).png': { w: 15, h: 42 },
                'image_6(4).png': { w: 19, h: 43 },
                'image_7(2).png': { w: 19, h: 40 },
                'image_8(1).png': { w: 15, h: 42 }
            }
        };
        this.heartChestSpawns = 0;
        this.maxHeartChestSpawns = 2;
        this.chestTimer = null;
        this.chest = null;



        this.chestActive = false;



        this.quizType = null;
        this.smokeEmitter = null;
        this.recoveringHearts = false;
        this.playerLives = 1;
        this.enemyLives = 5;
        this.playerWon = false;
        this.difficultyLevel = 'hard';
        this.playerThrowCooldown = 2000;
        this.enemyThrowCooldown = 2000;
        this.lastPlayerShotTime = 0;
        this.lastEnemyShotTime = 0;
        this.platformHeight = 100;
        this.quizTriggered = false;
        this.secondQuizTriggered = false;
        this.quizBonus = false;
        this.flightMode = false;
        this.quizActive = false;
        this.askedQuizIndices = [];
        this.spellChallengeTriggered = false;
        this.freezeGame = false;
        this.enemyFlightTimer = null;
        this.bulletSpeed = 1000;
        this.beamFireRate = 45;
        this.beamGraphic = null;
        this.beamCircle = null;
        this.beamShakeTimer = null;
        this.enemyHitCount = 0;
        this.enemyDialogue1Triggered = false;
        this.enemyDialogue2Triggered = false;
        this.globalDialogueActive = false;
        this.lightningIcon = null;
        this.lastBeamTime = 0;
        this.beamCooldown = 15000;
        this.beamActive = false;
        this.beamDirection = 0;
        this.lightningProgress = 0;
        this.lightningSpeed = 0.01;
        this.cooldownText = null;
        this.lightningDamage = 40;
        this.xButtonSprite = null;
        this.pressText = null;
        this.vfx = null;
        this.playerHearts = []; // Initialize as empty array
        this.enemyHearts = [];
        this.gameStarted = false;
        this.snakeAnimationTriggered = false;
        this.victoryTriggered = false;
    }

    preload() {
        this.load.image('redFlash', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/red.png?t=1745070348602');
        this.load.atlas('heartChest', 'https://files.catbox.moe/vvzwem.png', 'https://files.catbox.moe/6hqri0.json');
        this.load.atlas('goldChest', 'https://files.catbox.moe/vvzwem.png', 'https://files.catbox.moe/6hqri0.json');
        this.load.image('smoke', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/360_F_364758164_ANQkupmAkX7mj1VUGiz4wWgJ9IXPDpoE-removebg-preview.png?t=1744676729326');
        this.load.audio('patronusCast', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/edited_audio_0cccdbd9-c2f1-432a-8b84-b60c8386e2ac.mp3?t=1744676192219');
        this.load.audio('voldemortDefeat', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/voldie_13c5291e-1d9b-4bdb-9dcb-d4523a5068b1.mp3?t=1744673513737'); // Replace with actual audio URL
        this.load.audio('parseltongue', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/parsel_tongue_d67aa421-47b5-4be3-8933-9f0d857f0c75.mp3?t=1744670576628'); // Replace with correct URL
        this.load.audio('castSpell', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/magic-spell-6005_682a88ca-8636-47aa-af1b-466c7c783c8d.mp3?t=1744669576620'); // Add spell cast sound (example URL, replace with actual)
        this.load.image("vP", "https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/vP-removebg-preview.png?t=1744665558486")
        this.load.image('red_heart', 'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/heart.png'); // Red heart for Harry
        this.load.image('teal_heart', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/Assets_Download_11.png?t=1744663715928'); // Teal pixel heart for Voldemort
        this.load.image('glowParticlePlayer1', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/11.png?t=1744660924757');
        this.load.image('quizPanel', 'https://files.catbox.moe/xq36rf.png');
        this.load.image('backgrounds', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/uzl2OxeUWmlv2DjQ/assets/images/voldemortvsharry.png?t=1745090945931');
        this.load.image('enemy', _CONFIG.imageLoader.enemy);
        this.load.image('enemyShoot', _CONFIG.imageLoader.enemyShoot);
        this.load.image('playerProjectile', _CONFIG.imageLoader.playerProjectile);
        this.load.image('enemyProjectile', _CONFIG.imageLoader.enemyProjectile);
        this.load.image('platform', _CONFIG.imageLoader.platform);
        this.load.image('harry_flight', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/Assets_Download_4.png?t=1744389753314');
        this.load.image('lightning_icon', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/newAsset_15.png?t=1744380124881');
        for (const key in _CONFIG.imageLoader) {
            if (['background', 'enemy', 'enemyShoot', 'playerProjectile', 'enemyProjectile', 'platform'].includes(key))
                continue;
            this.load.image(key, _CONFIG.imageLoader[key]);
        }
        for (const key in _CONFIG.soundsLoader) {
            this.load.audio(key, [_CONFIG.soundsLoader[key]]);
        }
        this.load.image('platform', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/ChatGPT%20Image%20Apr%2015%2C%202025%2C%2005_46_57%20AM.png?t=1744676234172');
        this.load.image("heart", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/heart.png");
        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");
        this.load.bitmapFont('pixelfont', "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml");
        this.load.audio('bgm', 'https://files.catbox.moe/386bam.mp3');

        this.load.audio('voldemortIntro', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/harry-potter-the-boy-who-lived-come-to-die_c06fcf01-d76e-4508-98ef-198f03755d1c.mp3?t=1744174994378');
        this.load.audio('voldemortHitDialogue', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/I-HAVE~1%20%28mp3cut.net%29%20%281%29_c457c431-bdd0-48b7-adf8-d84be4d114b8.mp3?t=1744177297733');
        this.load.audio('voldemortHitDialogue2', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/I-HAVE~1%20%28mp3cut.net%29%20%281%29_c457c431-bdd0-48b7-adf8-d84be4d114b8.mp3?t=1744177297733');
        this.load.audio('randomDialogue1', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/tonight-you-die-harry-101soundboards_cf7c981f-068f-49ec-ad30-3d34290a7b14.mp3?t=1744178547371');
        this.load.audio('randomDialogue2', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/hahaha-ha-ha-hahaha-hahaha-101soundboards_2399c0f5-58f9-489d-91b6-92ea865d3a35.mp3?t=1744178553769');
        this.load.audio('randomDialogue3', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/avada-kedavra-101soundboards_6d3e6493-f1da-45a1-b9a0-d55435d3354f.mp3?t=1744178557640');
        this.load.audio('randomDialogue4', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/prepare-to-die-101soundboards_0cf2f46c-4bb2-4622-9bc1-0db4a5a6a5e9.mp3?t=1744178563164');
        this.load.audio('spellCollision', 'https://aicade-user-store.s3.amazonaws.com/GameAssets/music/spell%20collision%20%28mp3cut.net%29_80c3ec3d-089f-406b-a8c8-f8b3f4b837c7.mp3?t=1744179664988');

        // this.load.atlas('player_sprites', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/spellcast.png?t=1744212219347', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/1IT9uWda8qus.json');
        this.load.atlas('harryWalk', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/spritesheet%288%29.png?t=1744375564341', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/zAUibhXOKpeo.json');
        this.load.atlas('spritesheet', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/spritesheet%2811%29.png?t=1744379657110', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/TF7cWM85wndu.json');
        this.load.atlas('snake', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/spritesheet%2817%29.png?t=1744670981124', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/ULT28oxcHy5W.json');
        this.load.atlas('x_spritesheet', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/spritesheet%2812%29.png?t=1744414094879', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/JUZle6v7sZBT.json');
        this.load.image('parchment', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/parchmentnew-removebg-preview.png?t=1744412785184');
        this.load.atlas('patronus', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/spritesheet%2816%29.png?t=1744656881554', 'https://aicade-ui-assets.s3.amazonaws.com/default_user/games/default_game/history/json/0PBXAtz78aZm.json');

        this.load.atlas('moves',
            'https://files.catbox.moe/219iff.png',
            'https://files.catbox.moe/vektaz.json'
        );

        this.load.atlas('spell',
            'https://files.catbox.moe/9d54x7.png',
            'https://files.catbox.moe/g423sw.json'
        );

        this.preloadAssets();
        addEventListenersPhaser.bind(this)();
        displayProgressLoader.call(this);
    }

    preloadAssets() {
        this.load.image('border_0', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/Border_0.png?t=1744393886941');
        this.load.image('border_1', 'https://aicade-user-store.s3.amazonaws.com/6994335331/games/2mN2vEYSfiTcPBRk/assets/images/Border_1.png?t=1744393886410');
    }

    howToPlay() {
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, 2000, 2000);
        this.graphics.setDepth(50).setScrollFactor(0);

        this.howToPlayS = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.2, 'pixelfont', "How To Play", 50).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);
        this.arrowkeyU = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.4, "ARROWUP").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        //this.arrowkeyD = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.45, "ARROWDOWN").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowkeyL = this.add.image(this.game.config.width * 0.35, this.game.config.height * 0.45, "ARROWLEFT").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowkeyR = this.add.image(this.game.config.width * 0.45, this.game.config.height * 0.45, "ARROWRIGHT").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.arrowKeyT = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.4, 'pixelfont', "Move", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.zText = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.6, "Zz").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.zPNG = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.6, 'pixelfont', "Spell", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.xText = this.add.image(this.game.config.width * 0.4, this.game.config.height * 0.7, "X").setOrigin(0.5).setDepth(100).setScrollFactor(0).setScale(2.5);
        this.xPNG = this.add.bitmapText(this.game.config.width * 0.60, this.game.config.height * 0.7, 'pixelfont', "Special", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.cont = this.add.bitmapText(this.game.config.width * 0.50, this.game.config.height * 0.9, 'pixelfont', "Press Any Key To Continue", 40).setOrigin(0.5, 0.5).setVisible(true).setDepth(100).setScrollFactor(0);

        this.input.keyboard.on('keydown', this.clearHowToPlay, this);
    }

    clearHowToPlay() {
        this.graphics.destroy();
        this.howToPlayS.destroy();
        this.arrowkeyU.destroy();
        //this.arrowkeyD.destroy();
        this.arrowkeyL.destroy();
        this.arrowkeyR.destroy();
        this.arrowKeyT.destroy();
        this.zText.destroy();
        this.zPNG.destroy();
        this.xText.destroy();
        this.xPNG.destroy();
        this.cont.destroy();
        this.input.keyboard.off('keydown', this.clearHowToPlay, this);
        this.initializeGame();
        this.gameStarted = true;
    }

    create(data) {
        this.howToPlay();

        this.anims.create({
            key: 'moves',
            frames: this.anims.generateFrameNames('moves', {
                prefix: 'walk_',
                start: 0,
                end: 8,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: -1  // Changed from -1 to 0 (play once)
        });

        this.anims.create({
            key: 'spell',
            frames: this.anims.generateFrameNames('spell', {
                prefix: 'spell_',
                start: 0,
                end: 5,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0  // Changed from -1 to 0 (play once)
        });
    }
    initializeGame() {
        this.flashed = false;
        this.startTime = this.time.now;
        this.physics.world.gravity.y = 0;


        this.quizTriggered = false;
        this.secondQuizTriggered = false;
        this.quizBonus = false;
        this.quizActive = false;
        this.askedQuizIndices = [];
        this.spellChallengeTriggered = false;
        this.freezeGame = false;
        this.enemyHitCount = 0;
        this.enemyDialogue1Triggered = false;
        this.enemyDialogue2Triggered = false;

        this.vfx = new VFXLibrary(this);
        this.vfx.addCircleTexture("explosionCircle", 0xffffff, 1, 10);

        this.sounds = {};
        for (const key in _CONFIG.soundsLoader) {
            this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 });
        }
        this.sounds.patronusCast = this.sound.add('patronusCast', { loop: false, volume: 1.5 });
        this.sounds.bgm = this.sound.add('bgm', { loop: true, volume: 0.8 });
        this.sounds.castSpell = this.sound.add('castSpell', { loop: false, volume: 0.5 }); // Added castSpell sound
        this.sounds.parseltongue = this.sound.add('parseltongue', { loop: false, volume: 0.5 });
        this.sounds.voldemortIntro = this.sound.add('voldemortIntro', { loop: false, volume: 1 });
        this.sounds.voldemortDefeat = this.sound.add('voldemortDefeat', { loop: false, volume: 1 });
        this.sounds.voldemortHitDialogue = this.sound.add('voldemortHitDialogue', { loop: false, volume: 1 });
        this.sounds.voldemortHitDialogue2 = this.sound.add('voldemortHitDialogue2', { loop: false, volume: 1 });
        this.sounds.randomDialogue1 = this.sound.add('randomDialogue1', { loop: false, volume: 1 });
        this.sounds.randomDialogue2 = this.sound.add('randomDialogue2', { loop: false, volume: 1 });
        this.sounds.randomDialogue3 = this.sound.add('randomDialogue3', { loop: false, volume: 1 });
        this.sounds.randomDialogue4 = this.sound.add('randomDialogue4', { loop: false, volume: 1 });
        this.sounds.spellCollision = this.sound.add('spellCollision', { loop: true, volume: 1 });
        this.hind = this.sound.add('defeat voldemort', { loop: false, volume: 1 });

        var isMobile = !this.sys.game.device.os.desktop;
        this.sounds.bgm.setVolume(0.6).setLoop(true).play();

        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.bg = this.add.image(this.width / 2, this.height / 2, "backgrounds").setOrigin(0.5);
        const scale = Math.max(this.width / this.bg.displayWidth, this.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        this.input.keyboard.on('keydown-ESC', () => this.pauseGame());
        // this.pauseButton = this.add.sprite(this.width - 60, 60, "pauseButton").setOrigin(0.5);
        // this.pauseButton.setInteractive({ cursor: 'pointer' });
        // this.pauseButton.setScale(3);
        // this.pauseButton.on('pointerdown', () => this.pauseGame());

        this.toggleControlsVisibility(isMobile);

        this.platforms = this.physics.add.staticGroup();
        let platform = this.add.tileSprite(0, this.height - this.platformHeight, this.width, this.platformHeight, 'platform').setOrigin(0, 0);
        this.platforms.add(platform);
        this.physics.world.enable(platform);
        platform.body.setSize(this.width, this.platformHeight);
        //platform.body.setFrictionX(1);
        platform.body.immovable = true;
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;
        platform.setTint(0x808080);

        this.projectiles = this.physics.add.group();
        this.physics.add.collider(this.projectiles, this.projectiles, (projectile1, projectile2) => {
            if (projectile1.shooter !== projectile2.shooter && projectile1.spellType === 'normal') {
                this.projectiles.killAndHide(projectile1);
                this.projectiles.killAndHide(projectile2);
                projectile1.body.enable = false;
                projectile2.body.enable = false;
                if (this.vfx && typeof this.vfx.addExplosion === "function") {
                    //this.vfx.addExplosion(projectile1.x, projectile1.y, 0.5);
                }
            }
        }, null, this);
        this.physics.add.collider(this.projectiles, this.platforms, (projectile, platform) => {
            projectile.destroy();
        }, null, this);
        this.vfx.addCircleTexture('smokeParticle', 0xffffff, 0.6, 20);
        this.smokeEmitter = this.vfx.createEmitter('smokeParticle', this.width / 2, this.height / 2, 2, 0, 3000);
        this.smokeEmitter.setPosition(this.width / 2, this.height - this.platformHeight / 2);
        // Slight upward movement
        this.smokeEmitter.setAlpha({ start: 0.6, end: 0 }); // Fade out effect
        this.smokeEmitter.setScale({ start: 0.5, end: 1.5 }); // Scaling for smoke puff effect
        //this.smokeEmitter.setBlendMode('NORMAL');
        this.smokeEmitter.setDepth(0); // Behind platform (depth 1) and characters (depth 10+)
        this.smokeEmitter.start();

        this.player = this.physics.add.sprite(100, this.height - this.platformHeight - (44 * 3 / 2), 'spell1').setScale(3);
        this.player.setCollideWorldBounds(true);

        this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.775);
        this.player.body.setOffset(this.player.width * 0.3, 0);

        this.player.body.setGravityY(600);
        // this.anims.create({
        //     key: 'cast_spell',
        //     frames: [
        //         { key: 'player_sprites', frame: 'spell1.png' },
        //         { key: 'player_sprites', frame: 'spell2.png' },
        //         { key: 'player_sprites', frame: 'spell3.png' },
        //         { key: 'player_sprites', frame: 'spell4.png' },
        //         { key: 'player_sprites', frame: 'spell5.png' },
        //         { key: 'player_sprites', frame: 'spell6.png' }
        //     ],
        //     frameRate: 12,
        //     repeat: 0
        // });
        // this.player.on('animationupdate-cast_spell', () => {
        //        this.updatePhysicsBody(this.player);
        //    });
        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'harryWalk', frame: 'image_0(12).png' },
                { key: 'harryWalk', frame: 'image_1(12).png' },
                { key: 'harryWalk', frame: 'image_2(8).png' },
                { key: 'harryWalk', frame: 'image_3(5).png' },
                { key: 'harryWalk', frame: 'image_4(6).png' },
                { key: 'harryWalk', frame: 'image_5(3).png' },
                { key: 'harryWalk', frame: 'image_6(4).png' },
                { key: 'harryWalk', frame: 'image_7(2).png' },
                { key: 'harryWalk', frame: 'image_8(1).png' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'patronus_walk',
            frames: [
                { key: 'patronus', frame: 'image_0(15).png' },
                { key: 'patronus', frame: 'image_1(15).png' },
                { key: 'patronus', frame: 'image_2(11).png' },
                { key: 'patronus', frame: 'image_3(8).png' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({



            key: 'goldChest',



            frames: this.anims.generateFrameNames('goldChest', {



                prefix: 'chest_',



                start: 0,



                end: 9,



                zeroPad: 0



            }),



            frameRate: 10,



            repeat: 0



        });
        this.anims.create({
            key: 'heartChest',
            frames: this.anims.generateFrameNames('heartChest', {
                prefix: 'chest_',
                start: 0,
                end: 9,
                zeroPad: 0
            }),
            frameRate: 10,
            repeat: 0
        });

        this.enemy = this.physics.add.sprite(this.width - 200, 500, 'enemy').setScale(1.5);
        this.enemy.setCollideWorldBounds(true);
        this.enemy.body.setGravityY(800);
        this.enemy.body.setSize(this.enemy.body.width * 0.2, this.enemy.body.height * 0.8);
        this.enemyBodyWidth = this.enemy.body.width;
        this.enemyBodyHeight = this.enemy.body.height;

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.overlap(this.projectiles, this.enemy, this.hitEnemy, null, this);
        this.physics.add.overlap(this.projectiles, this.player, this.hitPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.projectiles, (projectile1, projectile2) => {
            if (projectile1.shooter !== projectile2.shooter && projectile1.spellType === 'normal') {
                this.projectiles.killAndHide(projectile2);
                //this.vfx.addExplosion(projectile1.x, projectile1.y, 0.5);
                this.projectiles.killAndHide(projectile1);
            }
        }, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.beamKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        this.offset = 20;
        this.playerHealth = 100;
        this.enemyHealth = 100;

        // Initialize player hearts (red)
        const heartSize = 40;
        const portraitScale = 0.1;
        this.playerPortrait = this.add.image(60, 150, 'hP')
            .setScale(portraitScale)
            .setDepth(11);
        for (let i = 0; i < 5; i++) {
            let heart = this.add.image(150 + i * (heartSize + 25), 150, 'red_heart').setScale(0.06).setDepth(10);
            this.playerHearts.push(heart);
        }

        this.enemyPortrait = this.add.image(this.width - 60, 150, 'vP')
            .setScale(0.2)
            .setDepth(11);

        // Initialize enemy hearts (teal)
        for (let i = 0; i < 5; i++) {
            let heart = this.add.image(this.width - 150 - i * (heartSize + 30), 150, 'teal_heart').setScale(0.5).setDepth(10);
            this.enemyHearts.push(heart);
        }

        // Add glow particle effect behind player portrait
        this.vfx.addCircleTexture('glowParticlePlayer', 0x00ff00, 0.8, 10);
        this.playerGlowEmitter = this.vfx.createEmitter(
            'glowParticlePlayer',
            this.playerPortrait.x,
            this.playerPortrait.y,
            {
                scale: { start: 2.0, end: 0.1 },
                lifespan: 2000,
                frequency: 50,
                speed: { min: -20, max: 20 },
                alpha: { start: 0.6, end: 0, ease: 'Linear' },
                emitZone: { source: new Phaser.Geom.Circle(0, 0, 30), type: 'random' }
            }
        );
        this.playerGlowEmitter.setDepth(10); // Behind portrait (depth 11)
        this.playerGlowEmitter.startFollow(this.playerPortrait);
        this.playerGlowEmitter.start();

        // Add glow particle effect behind enemy portrait
        this.vfx.addCircleTexture('glowParticleEnemy', 0xff0000, 0.8, 10);
        this.enemyGlowEmitter = this.vfx.createEmitter(
            'glowParticleEnemy',
            this.enemyPortrait.x,
            this.enemyPortrait.y,
            {
                scale: { start: 1.0, end: 0.1 },
                lifespan: 2000,
                frequency: 50,
                speed: { min: -20, max: 20 },
                alpha: { start: 0.6, end: 0, ease: 'Linear' },
                emitZone: { source: new Phaser.Geom.Circle(0, 0, 30), type: 'random' }
            }
        );
        this.enemyGlowEmitter.setDepth(10); // Behind portrait (depth 11)
        this.enemyGlowEmitter.startFollow(this.enemyPortrait);
        this.enemyGlowEmitter.start();

        this.lightningIcon = this.add.sprite(150, 200, 'lightning_icon')
            .setScale(0.3)
            .setOrigin(0.5, 0)
            .setDepth(20);
        this.lightningIcon.setAlpha(1);
        this.cooldownText = this.add.bitmapText(150, 250, 'pixelfont', '', 30)
            .setOrigin(0.5, 0)
            .setDepth(20)
            .setAlpha(0);

        this.timerText = this.add.bitmapText(this.width / 2, 20, 'pixelfont', '03:00', 24).setOrigin(0.5, 0);
        this.matchStartTime = 0;
        this.matchDuration = 180;

        this.questions = getCustomQuestionsForChild(HarryGlobal.child);

        this.anims.create({
            key: 'x_button_anim',
            frames: [
                { key: 'x_spritesheet', frame: 'x1.png' },
                { key: 'x_spritesheet', frame: 'x2.png' }
            ],
            frameRate: 5,
            repeat: -1
        });

        this.input.keyboard.disableGlobalCapture();

        const randomDialogues = [
            { key: 'randomDialogue1', text: "Tonight you DIE Harry" },
            { key: 'randomDialogue2', text: "Ha Ha Hahahaahaha Ha Hahaha" },
            { key: 'randomDialogue3', text: "Avada Kedavara" },
            { key: 'randomDialogue4', text: "Prepare to DIE" }
        ];
        randomDialogues.forEach(dialogue => {
            let delay = Phaser.Math.Between(10000, 170000);
            this.time.delayedCall(delay, () => {
                if (!this.globalDialogueActive && !this.quizActive && !this.snakeAnimationActive && dialogue.key !== 'randomDialogue2') {
                    this.showRandomDialogue(dialogue.key, dialogue.text);
                } else if (!this.globalDialogueActive && !this.quizActive && this.snakeAnimationActive && dialogue.key === 'randomDialogue2') {
                    this.showRandomDialogue(dialogue.key, dialogue.text);
                }
            });
        });
        this.addHint();
        this.hind.play();

        this.dialogueTriggered = false;
        this.input.keyboard.once('keydown', () => {
            if (!this.dialogueTriggered && !this.quizActive) {
                this.dialogueTriggered = true;
                this.showDialogueIntro();
            }
        });
    }
    addHint() {
        // Create help button
        const helpButton = this.add.sprite(
            this.game.config.width * 0.9,
            this.game.config.height * 0.075,
            'helpIcon'
        ).setInteractive()
            .setScrollFactor(0)
            .setDepth(99)
            .setScale(0.1);

        // Add hover effect
        helpButton.on('pointerover', () => {
            helpButton.setTint(0xcccccc);
        });

        helpButton.on('pointerout', () => {
            helpButton.clearTint();
        });

        // Add click functionality
        helpButton.on('pointerdown', () => {
            this.findTheKey("Defeat Voldemort to go back\nTry using special attack");
        });
    }

    findTheKey(tex) {
        // Add text to the container
        const saveText = this.add.bitmapText(
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pixelfont',
            tex,
            30
        ).setOrigin(0.5, 0.5).setDepth(100).setScrollFactor(0);

        // Add sprite to the container
        const saveRon = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.25,
            'ideaBox'
        ).setScrollFactor(0).setDepth(99).setScale(0.6);

        // Set a timer to destroy the elements after 5 seconds
        this.time.delayedCall(5000, () => {
            saveText.destroy();
            saveRon.destroy();
        });
    }

    updatePhysicsBody(sprite) {
        const textureKey = sprite.texture.key;
        const frameName = sprite.frame.name;
        const frameData = this.frameDimensions[textureKey] && this.frameDimensions[textureKey][frameName];

        if (frameData) {
            const scale = sprite.scaleX || 1;
            const newWidth = frameData.w * 0.8 * scale; // 80% width for tighter collision
            const newHeight = frameData.h * 0.9 * scale; // 90% height for stability

            sprite.body.setSize(newWidth / scale, newHeight / scale, false);

            const offsetX = (frameData.w - newWidth / scale) / 2;
            const offsetY = frameData.h - newHeight / scale; // Align bottom with platform
            sprite.body.setOffset(offsetX, offsetY);

            // Prevent falling through platform
            if (sprite.body.bottom > this.height - this.platformHeight) {
                sprite.setY(this.height - this.platformHeight - (newHeight / scale) / 2);
                sprite.body.updateFromGameObject();
            }
        }
    }





    showDialogueIntro() {
        if (this.globalDialogueActive || this.quizActive || this.snakeAnimationActive) return;
        const fullText = "Harry Potter, The boy who lived, come to DIE";
        const sound = this.sounds.voldemortIntro;
        const x = this.width / 2;
        const y = this.height - 40;
        const boxWidth = this.width * 0.6;
        const boxHeight = 80;
        const dialogueBox = this.add.rectangle(x, y, boxWidth, boxHeight, 0x000000, 0.7)
            .setOrigin(0.5, 0.5)
            .setStrokeStyle(6, 0x000000)
            .setAlpha(0)
            .setDepth(1000);
        const dialogueText = this.add.text(x, y, '', {
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: boxWidth - 40 }
        }).setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setDepth(1001);
        this.tweens.add({
            targets: [dialogueBox, dialogueText],
            alpha: 1,
            duration: 500,
            onComplete: () => {
                this.globalDialogueActive = true;
                sound.play();
                let charIndex = 0;
                this.time.addEvent({
                    delay: 50,
                    repeat: fullText.length - 1,
                    callback: () => {
                        dialogueText.text += fullText[charIndex++];
                    }
                });
                sound.once('complete', () => {
                    this.tweens.add({
                        targets: [dialogueText, dialogueBox],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            dialogueText.destroy();
                            dialogueBox.destroy();
                            this.globalDialogueActive = false;
                        }
                    });
                });
            }
        });
    }

    showEnemyHitDialogue() {
        if (this.globalDialogueActive || this.quizActive || this.snakeAnimationActive) return;
        const fullText = "I have conquered Death itself, bent the will of countless Wizards and slaughtered those who dared defy me";
        const sound = this.sounds.voldemortHitDialogue;
        const x = this.width / 2;
        const y = this.height - 40;
        const boxWidth = this.width * 0.6;
        const boxHeight = 80;
        const dialogueBox = this.add.rectangle(x, y, boxWidth, boxHeight, 0x000000, 0.7)
            .setOrigin(0.5, 0.5)
            .setStrokeStyle(6, 0x000000)
            .setAlpha(0)
            .setDepth(1000);
        const dialogueText = this.add.text(x, y, '', {
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: boxWidth - 40 }
        }).setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setDepth(1001);
        this.tweens.add({
            targets: [dialogueBox, dialogueText],
            alpha: 1,
            duration: 500,
            onComplete: () => {
                this.globalDialogueActive = true;
                sound.play();
                let charIndex = 0;
                this.time.addEvent({
                    delay: 50,
                    repeat: fullText.length - 1,
                    callback: () => {
                        dialogueText.text += fullText[charIndex++];
                    }
                });
                sound.once('complete', () => {
                    this.tweens.add({
                        targets: [dialogueText, dialogueBox],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            dialogueText.destroy();
                            dialogueBox.destroy();
                            this.globalDialogueActive = false;
                        }
                    });
                });
            }
        });
    }

    showEnemyHitDialogue2() {
        if (this.globalDialogueActive || this.quizActive || this.snakeAnimationActive) return;
        const fullText = "You are nothing more than a relic, a servant shackled to a feeble emperor, BOW BEFORE ME, NOW!";
        const sound = this.sounds.voldemortHitDialogue2;
        const x = this.width / 2;
        const y = this.height - 40;
        const boxWidth = this.width * 0.6;
        const boxHeight = 80;
        const dialogueBox = this.add.rectangle(x, y, boxWidth, boxHeight, 0x000000, 0.7)
            .setOrigin(0.5, 0.5)
            .setStrokeStyle(6, 0x000000)
            .setAlpha(0)
            .setDepth(1000);
        const dialogueText = this.add.text(x, y, '', {
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: boxWidth - 40 }
        }).setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setDepth(1001);
        this.tweens.add({
            targets: [dialogueBox, dialogueText],
            alpha: 1,
            duration: 500,
            onComplete: () => {
                this.globalDialogueActive = true;
                sound.play();
                let charIndex = 0;
                this.time.addEvent({
                    delay: 50,
                    repeat: fullText.length - 1,
                    callback: () => {
                        dialogueText.text += fullText[charIndex++];
                    }
                });
                sound.once('complete', () => {
                    this.tweens.add({
                        targets: [dialogueText, dialogueBox],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            dialogueText.destroy();
                            dialogueBox.destroy();
                            this.globalDialogueActive = false;
                        }
                    });
                });
            }
        });
    }

    showRandomDialogue(key, text) {
        if (this.globalDialogueActive || this.quizActive) return;
        if (this.snakeAnimationActive && key !== 'randomDialogue2') return;
        if (!this.snakeAnimationActive && key === 'randomDialogue2') return;
        const sound = this.sounds[key];
        const x = this.width / 2;
        const y = this.height * 0.9;
        const boxWidth = this.width * 0.6;
        const boxHeight = 80;
        const dialogueBox = this.add.rectangle(x, y, boxWidth, boxHeight, 0x000000, 0.7)
            .setOrigin(0.5)
            .setStrokeStyle(6, 0x000000)
            .setAlpha(0)
            .setDepth(1000);
        const dialogueText = this.add.text(x, y, '', {
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: boxWidth - 40 }
        }).setOrigin(0.5)
            .setAlpha(0)
            .setDepth(1001);
        this.tweens.add({
            targets: [dialogueBox, dialogueText],
            alpha: 1,
            duration: 500,
            onComplete: () => {
                this.globalDialogueActive = true;
                sound.play();
                let charIndex = 0;
                this.time.addEvent({
                    delay: 50,
                    repeat: text.length - 1,
                    callback: () => {
                        dialogueText.text += text[charIndex++];
                    }
                });
                sound.once('complete', () => {
                    this.tweens.add({
                        targets: [dialogueText, dialogueBox],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            dialogueText.destroy();
                            dialogueBox.destroy();
                            this.globalDialogueActive = false;
                        }
                    });
                });
            }
        });
    }

    update(time, delta) {
        if (!this.gameStarted || this.quizActive || this.freezeGame) {
            return;
        }
        this.updatePhysicsBody(this.player);

        if (this.matchStartTime === 0) {
            this.matchStartTime = time;
        }
        this.updateUI(time);
        let elapsed = timeToSeconds(this.matchStartTime, this.time.now);
        if (elapsed >= this.matchDuration) {
            this.gameOver(false);
        }


        // Enemy movement: slight left-right motion and jumping
        if (!this.beamActive && !this.snakeAnimationActive && !this.spellChallengeTriggered) {
            const oscillation = Math.sin(time / 1000) * 50;
            this.enemy.setVelocityX(oscillation * 0.5);
            this.maybeJump(this.difficultyLevel === 'hard' ? 9 : 10, time);
        } else {
            this.enemy.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.beamKey)) {
            const elapsedSinceBeam = time - this.lastBeamTime;
            if (!this.beamActive && elapsedSinceBeam >= this.beamCooldown) {
                this.beamActive = true;
                this.lastBeamTime = time;
                this.lightningProgress = 0.5;
                this.beamDirection = 0;
                this.sounds.spellCollision.play();

                this.playerLightningSprite = this.add.sprite(this.player.x + 80, this.player.y, 'spritesheet');
                this.playerLightningSprite.setOrigin(0, 0.5);
                this.anims.create({
                    key: 'playerLightningBeam',
                    frames: this.anims.generateFrameNames('spritesheet', { start: 1, end: 7, zeroPad: 0, suffix: '.png' }),
                    frameRate: 15,
                    repeat: -1
                });
                this.playerLightningSprite.play('playerLightningBeam');

                this.enemyLightningSprite = this.add.sprite(this.enemy.x - 80, this.enemy.y, 'spritesheet');
                this.enemyLightningSprite.setOrigin(1, 0.5);
                this.enemyLightningSprite.setTint(0xFF0000);
                this.anims.create({
                    key: 'enemyLightningBeam',
                    frames: this.anims.generateFrameNames('spritesheet', { start: 1, end: 7, zeroPad: 0, suffix: '.png' }),
                    frameRate: 15,
                    repeat: -1
                });
                this.enemyLightningSprite.play('enemyLightningBeam');
                this.enemyLightningSprite.setFlipX(true);

                this.xButtonSprite = this.add.sprite(this.width / 2, 200, 'x_spritesheet').setScale(4);
                this.xButtonSprite.play('x_button_anim');
                this.xButtonSprite.setDepth(1002);
                this.pressText = this.add.text(this.width / 2, 280, 'Press continuously', {
                    fontSize: '40px',
                    fontStyle: 'bold',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 2
                }).setOrigin(0.5, 0).setDepth(1002);

                this.enemyPushStrength = 0.012;
            } else if (this.beamActive) {
                this.beamDirection += 0.02;
            }
        }

        if (this.beamActive) {
            this.player.setVelocity(0);
            this.enemy.setVelocity(0);

            const angle = Phaser.Math.Angle.Between(this.player.x + 80, this.player.y, this.enemy.x - 80, this.enemy.y);
            this.playerLightningSprite.rotation = angle;
            this.enemyLightningSprite.rotation = angle;

            const distance = Phaser.Math.Distance.Between(this.player.x + 80, this.player.y, this.enemy.x - 80, this.enemy.y);
            const currentMidpoint = this.player.x + 80 + (distance * this.lightningProgress);

            const playerLength = Phaser.Math.Distance.Between(this.player.x + 80, this.player.y, currentMidpoint, this.player.y);
            const enemyLength = Phaser.Math.Distance.Between(currentMidpoint, this.enemy.y, this.enemy.x - 80, this.enemy.y);
            const maxLength = this.playerLightningSprite.width;

            this.playerLightningSprite.x = this.player.x + 80;
            this.playerLightningSprite.y = this.player.y;
            this.playerLightningSprite.setScale(Math.max(playerLength / maxLength, 0.1), 1);
            this.playerLightningSprite.setVisible(playerLength > 0);

            this.enemyLightningSprite.x = this.enemy.x - 80;
            this.enemyLightningSprite.y = this.enemy.y;
            this.enemyLightningSprite.setScale(Math.max(enemyLength / maxLength, 0.1), 1);
            this.enemyLightningSprite.setVisible(enemyLength > 0);

            const normalizedDelta = delta / 16.66;
            if (this.beamKey.isDown) {
                this.beamDirection += 0.018 * normalizedDelta;
            } else {
                this.beamDirection -= (this.enemyPushStrength * 0.75) * normalizedDelta;
            }

            this.beamDirection = Phaser.Math.Clamp(this.beamDirection, -0.1, 0.1);
            this.lightningProgress += this.beamDirection * this.lightningSpeed * normalizedDelta;
            this.lightningProgress = Phaser.Math.Clamp(this.lightningProgress, 0, 1);

            if (!this.beamShakeTimer) {
                this.beamShakeTimer = this.time.addEvent({
                    delay: 100,
                    loop: true,
                    callback: () => this.vfx.shakeCamera(100, 0.02)
                });
            }

            if (this.lightningProgress <= 0) {
                this.playerHealth -= this.lightningDamage;
                this.updateHearts();
                this.hitPlayer(this.player, { x: this.player.x, y: this.player.y });
                let pointText = this.add.text(this.player.x, this.player.y - 50, '-40', {
                    fontSize: '48px', fontStyle: 'bold', fill: '#FF0000', stroke: '#000000', strokeThickness: 4
                }).setShadow(2, 2, '#333333', 2, true, true);
                pointText.setScale(0.8).setAngle(-15);
                this.tweens.add({
                    targets: pointText, scale: 1.2, angle: 0, duration: 300, ease: 'Back.out',
                    onComplete: () => this.tweens.add({
                        targets: pointText, y: '-=100', alpha: { from: 1, to: 0 }, duration: 800, ease: 'Expo.easeIn', angle: '+=15',
                        onComplete: () => pointText.destroy()
                    })
                });
                this.endBeam();
            } else if (this.lightningProgress >= 1) {
                this.enemyHealth -= this.lightningDamage;
                this.updateHearts();
                this.hitEnemy(this.enemy, { x: this.enemy.x, y: this.enemy.y });
                let pointText = this.add.text(this.enemy.x, this.enemy.y - 50, '-40', {
                    fontSize: '48px',
                    fontStyle: 'bold',
                    fill: '#FF0000',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setShadow(2, 2, '#333333', 2, true, true);
                pointText.setScale(0.8).setAngle(-15);
                this.tweens.add({
                    targets: pointText,
                    scale: 1.2,
                    angle: 0,
                    duration: 300,
                    ease: 'Back.out',
                    onComplete: () => this.tweens.add({
                        targets: pointText,
                        y: '-=100',
                        alpha: { from: 1, to: 0 },
                        duration: 800,
                        ease: 'Expo.easeIn',
                        onComplete: () => pointText.destroy()
                    })
                });
                const emitter = this.add.particles(this.enemy.x, this.enemy.y, 'teal_heart', {
                    speed: { min: -100, max: 300 },
                    scale: { start: 0.8, end: 0 },
                    blendMode: 'NORMAL',
                    lifespan: 750,
                });
                emitter.explode(7);
                this.endBeam();
            }
        } else {
            if (this.playerLightningSprite) {
                this.playerLightningSprite.destroy();
                this.playerLightningSprite = null;
            }
            if (this.enemyLightningSprite) {
                this.enemyLightningSprite.destroy();
                this.enemyLightningSprite = null;
            }
            if (this.beamShakeTimer) {
                this.beamShakeTimer.remove(false);
                this.beamShakeTimer = null;
            }
            if (this.sounds.spellCollision.isPlaying) {
                this.sounds.spellCollision.stop();
            }
            this.beamDirection = 0;
            if (this.xButtonSprite) {
                this.xButtonSprite.destroy();
                this.xButtonSprite = null;
            }
            if (this.pressText) {
                this.pressText.destroy();
                this.pressText = null;
            }
        }

        if (!this.beamActive && !this.beamKey.isDown) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-150);
                if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'moves') {
                    this.player.anims.play('moves', true);
                    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.775);
                    this.player.body.setOffset(this.player.width * 0.3, 0);

                }
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(150);
                if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'moves') {
                    this.player.setFlipX(true);
                    this.player.anims.play('moves', true);
                    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.775);
                    this.player.body.setOffset(this.player.width * 0.3, 0);

                }
            } else {
                this.player.setFlipX(false);
                this.player.setVelocityX(0);
                if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'moves') {
                    this.player.anims.stop();
                    this.player.setTexture('spell1').setFlipX(false);
                }
            }
            let joystickKeys = this.joyStick ? this.joyStick.createCursorKeys() : {};
            if (((joystickKeys.up && joystickKeys.up.isDown) || this.cursors.up.isDown) && this.player.body.touching.down) {
                this.sounds.jump.setVolume(1).setLoop(false).play();
                this.player.setVelocityY(-550);
            }

            if (Phaser.Input.Keyboard.JustDown(this.zKey) && time > this.lastPlayerShotTime + this.playerThrowCooldown) {
                this.sounds.castSpell.play();
                this.sounds.shoot.setVolume(1).setLoop(false).play();
                this.player.setFlipX(false);
                this.player.play('spell', true);
                this.time.delayedCall(600, () => {
                    this.player.setTexture('spell1');
                    this.throw(true, 'normal');
                });
                this.lastPlayerShotTime = time;
            }

            if (time > this.lastEnemyShotTime + this.enemyThrowCooldown &&
                Phaser.Math.Between(0, 100) < (this.difficultyLevel === 'hard' ? 75 : 15)) {
                this.sounds.castSpell.play();
                this.throw(false);
                this.lastEnemyShotTime = time;
            }

            if (this.player.isShooting && this.difficultyLevel !== 'easy') {
                this.maybeJump(9, time);
            } else {
                this.maybeJump(10, time);
            }
        }

        if (this.enemyHealth <= 10 && !this.spellChallengeTriggered && !this.snakeAnimationActive && this.snakeAnimationTriggered && !this.recoveringHearts) {
            this.enemy.setVelocity(0);
            this.showSpellChallenge();
            return;
        }
        if (this.playerHealth <= 0) {
            this.gameOver(false);
        }

        if (this.smokeEmitter) {
            this.smokeEmitter.setPosition(this.width / 2, this.height - this.platformHeight / 2);
            this.smokeEmitter.setFrequency(100);
        }

        if (!this.quizTriggered && this.playerHealth <= 70 && !this.quizActive && !this.chestActive && !this.chest && Phaser.Math.Between(0, 100) < 5) {
            this.quizTriggered = true;
            this.spawnChest("powerup");
        }
        if (!this.secondQuizTriggered && this.playerHealth <= 30 && !this.quizActive && !this.chestActive && !this.chest && Phaser.Math.Between(0, 100) < 5) {
            this.secondQuizTriggered = true;
            this.spawnChest("powerup");
        }
        if (this.playerHealth <= 80 && this.heartChestSpawns < this.maxHeartChestSpawns && !this.quizActive && !this.chestActive && !this.chest && Phaser.Math.Between(0, 100) < 10) {
            this.heartChestSpawns++;
            this.spawnChest("heart");
        }
    }
    triggerVictoryEffect(time) {
        console.log('victory initiated');
        // Stop enemy actions and clear attacks
        this.enemy.setVelocity(0);
        this.clearAttacks();

        this.sounds.voldemortDefeat.play();

        // Create fireworks-like effect using VFXLibrary
        this.vfx.addCircleTexture('fireworkParticle', 0xffff00, 0.8, 20); // Yellow particles for fireworks
        const fireworkEmitter = this.vfx.createEmitter(
            'fireworkParticle',
            this.width / 2,
            this.height / 2,
            {
                speed: { min: 200, max: 400 },
                scale: { start: 10.0, end: 0.1 },
                lifespan: 1500,
                frequency: 100,
                blendMode: 'ADD',
                emitZone: { source: new Phaser.Geom.Circle(0, 0, 100), type: 'random' },
                quantity: 50
            }
        );
        fireworkEmitter.setDepth(10);
        fireworkEmitter.start();
        console.log('created fireworks');

        // Add additional bursts for more fireworks flair
        for (let i = 0; i < 3; i++) {
            this.time.delayedCall(i * 500, () => {
                const burstEmitter = this.vfx.createEmitter(
                    'fireworkParticle',
                    Phaser.Math.Between(this.width * 0.3, this.width * 0.7),
                    Phaser.Math.Between(this.height * 0.3, this.height * 0.7),
                    {
                        speed: { min: 150, max: 300 },
                        scale: { start: 0.8, end: 0 },
                        lifespan: 1000,
                        blendMode: 'ADD',
                        quantity: 30
                    }
                );
                burstEmitter.setDepth(5);
                burstEmitter.start();
                burstEmitter.explode();
            });
        }

        // Shake camera for dramatic effect
        this.vfx.shakeCamera(2000, 0.02); // Increased duration for more impact

        // Fade out enemy
        this.tweens.add({
            targets: this.enemy,
            alpha: 0,
            duration: 1000,
            delay: 2000 // Delay fade to allow fireworks to play
        });

        // Transition to next scene after all effects
        this.time.delayedCall(5000, () => { // Increased delay to 5 seconds
            fireworkEmitter.stop();
            const endTime = this.time.now;
const levelScore = 2000; //replace this value corresponding to the base point
this.sound.stopAll();
this.scene.start('ScoreScene', { startTime: this.startTime, endTime: endTime, levelScore: levelScore,levelId : 4, nextScene: 'C9' }); //instead of c6 you will add the nextscene class name
            
        });
    }

    updateUI(time) {
        let elapsed = timeToSeconds(this.matchStartTime, this.time.now);
        let remaining = Math.max(this.matchDuration - elapsed, 0);
        this.timerText.setText(formatTime(remaining));

        const elapsedSinceBeam = time - this.lastBeamTime;
        if (elapsedSinceBeam < this.beamCooldown && !this.beamActive) {
            const remainingCooldown = Math.ceil((this.beamCooldown - elapsedSinceBeam) / 1000);
            this.lightningIcon.setTint(0x666666);
            this.lightningIcon.setAlpha(0.5);
            this.cooldownText.setText(`${remainingCooldown}s`);
            this.cooldownText.setAlpha(1);
        } else {
            this.lightningIcon.clearTint();
            this.lightningIcon.setAlpha(1);
            this.cooldownText.setText('');
            this.cooldownText.setAlpha(0);
        }
    }

    endBeam() {
        this.beamActive = false;
        if (this.playerLightningSprite) {
            this.playerLightningSprite.destroy();
            this.playerLightningSprite = null;
        }
        if (this.enemyLightningSprite) {
            this.enemyLightningSprite.destroy();
            this.enemyLightningSprite = null;
        }
        if (this.lightningTrail) {
            this.lightningTrail.stop();
            this.lightningTrail.destroy();
            this.lightningTrail = null;
        }
        if (this.beamShakeTimer) {
            this.beamShakeTimer.remove(false);
            this.beamShakeTimer = null;
        }
        if (this.sounds.spellCollision.isPlaying) {
            this.sounds.spellCollision.stop();
        }
        this.lightningProgress = 0;
        this.lastBeamTime = this.time.now;
    }

    maybeJump(chance, time) {
        if (this.enemy.body.touching.down && Phaser.Math.Between(0, 100) < chance) {
            this.enemy.setVelocityY(Phaser.Math.Between(-400, -200));
        }
    }

    throw(isPlayerThrowing = true, spellType = 'normal') {
    let startX, velocityX, velocityY, shooterY;
    if (isPlayerThrowing) {
        startX = this.player.x + 80;
        shooterY = this.player.y;
        
        // Calculate direction to enemy
        const dx = this.enemy.x - startX;
        const dy = this.enemy.y - shooterY;
        
        // Calculate distance
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize direction and set velocity
        const speed = 1200; // The original speed was 1200
        velocityX = (dx / distance) * speed;
        velocityY = (dy / distance) * speed;
    } else {
        startX = this.enemy.x - 80;
        shooterY = this.enemy.y;
        
        // Calculate direction to player
        const dx = this.player.x - startX;
        const dy = this.player.y - shooterY;
        
        // Calculate distance
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize direction and set velocity
        const speed = 900; // The original speed was 900
        velocityX = (dx / distance) * speed;
        velocityY = (dy / distance) * speed;
        
        this.enemy.setTexture('enemyShoot');
        this.enemy.body.setSize(this.enemyBodyWidth, this.enemyBodyHeight);
        this.time.delayedCall(200, () => {
            this.enemy.setTexture(this.flightMode ? 'enemyFly' : 'enemy');
            this.enemy.body.setSize(this.enemyBodyWidth, this.enemyBodyHeight);
        });
    }
    let projKey = isPlayerThrowing ? 'playerProjectile' : 'enemyProjectile';
    let projectile = this.projectiles.get(startX, shooterY, projKey);
    if (projectile) {
        projectile.setActive(true);
        projectile.setVisible(true);
        projectile.setTexture(projKey);
        projectile.body.enable = true;
        projectile.body.gravity.y = 0;
        projectile.setScale(0.3);
        projectile.setSize(projectile.width,projectile.height);
        projectile.setOffset(projectile.width,0);
        projectile.setVelocityX(velocityX);
        projectile.setVelocityY(velocityY);
        projectile.shooter = isPlayerThrowing ? 'player' : 'enemy';
        projectile.spellType = spellType;
        projectile.body.setSize(projectile.width, projectile.height);
        this.time.delayedCall(4000, () => {
            if (projectile.active) {
                this.projectiles.killAndHide(projectile);
                projectile.body.enable = false;
            }
        });
    } else {
        projectile = this.projectiles.create(startX, shooterY, projKey);
        if (projectile) {
            projectile.setActive(true);
            projectile.setVisible(true);
            projectile.body.gravity.y = 0;
            projectile.setScale(0.3);
            projectile.setVelocityX(velocityX);
            projectile.setVelocityY(velocityY);
            projectile.shooter = isPlayerThrowing ? 'player' : 'enemy';
            projectile.spellType = spellType;
            projectile.body.setSize(projectile.width, projectile.height * 0.3);
            this.time.delayedCall(4000, () => {
                if (projectile.active) {
                    this.projectiles.killAndHide(projectile);
                    projectile.body.enable = false;
                }
            });
        }
    }
}

    cutBomb(bomb) {
        if (this.timerEvent) { this.timerEvent.destroy(); }
        this.cameras.main.shake(100, 0.1, true);
        if (this.sounds && this.sounds.explosion) {
            this.sounds.explosion.setVolume(1).setLoop(false).play();
        }
        this.cameras.main.flash(200);
        this.createParticles(bomb.x, bomb.y, "avoidable");
    }

    createParticles(x, y, type = "collectible") {
        const emitter = this.add.particles(x, y, type, {
            speed: 100,
            scale: { start: 0.025, end: 0 },
            blendMode: 'ADD',
            lifespan: 400,
            on: false
        });
        emitter.explode(20);
        this.time.delayedCall(1000, () => { emitter.destroy(); });
    }

    hitEnemy(enemy, projectile) {
        if (!projectile || !projectile.active) return;
        this.sounds.hurt.setVolume(1).setLoop(false).play();
        this.projectiles.killAndHide(projectile);
        projectile.body.enable = false;

        if (projectile.shooter === 'player') {
            const shineSprite = this.add.sprite(enemy.x, enemy.y, 'enemy').setScale(0.15);
            this.vfx.addShine(shineSprite, 1000, 0.5);
            this.tweens.add({
                targets: shineSprite,
                alpha: 0,
                duration: 1000,
                onComplete: () => { shineSprite.destroy(); }
            });
            const emitter = this.add.particles(projectile.x, projectile.y, 'teal_heart', {
                speed: { min: -100, max: 300 },
                scale: { start: 0.5, end: 0 },
                blendMode: 'NORMAL',
                lifespan: 750,
            });
            emitter.explode(5);
            let damage = this.quizBonus ? 10 : 5;
            let pointText = this.add.text(projectile.x, projectile.y, `-${damage}`, {
                fontSize: '48px',
                fontStyle: 'bold',
                fill: '#FF0000',
                stroke: '#000000',
                strokeThickness: 4
            }).setShadow(2, 2, '#333333', 2, true, true);
            pointText.setScale(0.8);
            pointText.setAngle(-15);
            this.tweens.add({
                targets: pointText,
                scale: 1.2,
                angle: 0,
                duration: 300,
                ease: 'Back.out',
                onComplete: () => {
                    this.tweens.add({
                        targets: pointText,
                        y: '-=100',
                        alpha: { from: 1, to: 0 },
                        duration: 800,
                        ease: 'Expo.easeIn',
                        angle: '+=15',
                        onComplete: () => { pointText.destroy(); }
                    });
                }
            });
            this.enemyLives--;
            this.enemyHealth -= damage;
            this.updateHearts();
            this.enemyHitCount++;

            // Trigger snake animation at health <= 50
            if (this.enemyHealth <= 50 && !this.snakeAnimationTriggered && !this.snakeAnimationActive) {
                this.snakeAnimationTriggered = true;
                this.triggerSnakeAnimation();
            }

            if (this.enemyHitCount === 1 && !this.enemyDialogue1Triggered) {
                this.enemyDialogue1Triggered = true;
                this.showEnemyHitDialogue();
            }
        } else if (projectile.shooter === 'enemy') {
            if (this.projectiles.getChildren().some(p => p.active && p.shooter === 'player' && p.spellType === 'normal')) {
                this.projectiles.killAndHide(projectile);
            }
        }
    }


    triggerSnakeAnimation() {
        this.sounds.parseltongue.play();
        this.snakeGroup = this.physics.add.group();
        this.clearAttacks();
        this.snakeAnimationActive = true;

        // Play dialogue
        this.showRandomDialogue('randomDialogue2', "Ha Ha Hahahaahaha Ha Hahaha");

        // Define snake animation
        this.anims.create({
            key: 'snakeMove',
            frames: [
                { key: 'snake', frame: 'image_0(16).png' },
                { key: 'snake', frame: 'image_1(16).png' },
                { key: 'snake', frame: 'image_2(12).png' },
                { key: 'snake', frame: 'image_3(9).png' },
                { key: 'snake', frame: 'image_4(9).png' },
                { key: 'snake', frame: 'image_6(6).png' },
                { key: 'snake', frame: 'image_7(4).png' },
                { key: 'snake', frame: 'image_8(3).png' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // Spawn snakes
        const directions = [
            { x: -100, y: this.height / 2 },
            { x: this.width + 100, y: this.height / 2 },
            { x: this.width / 2, y: -100 },
            { x: this.width / 2, y: this.height + 100 }
        ];

        directions.forEach(direction => {
            for (let i = 0; i < 2; i++) {
                const snake = this.snakeGroup.create(direction.x, direction.y, 'snake', 'image_0(16).png')
                    .setScale(2)
                    .setDepth(100)
                    .play('snakeMove');
                snake.body.setSize(32, 110);

                const angle = Phaser.Math.Angle.Between(direction.x, direction.y, this.enemy.x, this.enemy.y);
                const speed = 200;
                snake.body.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
                snake.rotation = angle + Math.PI / 2;

                this.tweens.add({
                    targets: snake,
                    rotation: angle + Math.PI / 2,
                    duration: 100,
                    repeat: -1,
                    onUpdate: () => {
                        if (snake.active && this.enemy && this.enemy.active) {
                            const newAngle = Phaser.Math.Angle.Between(snake.x, snake.y, this.enemy.x, this.enemy.y);
                            snake.body.setVelocity(
                                Math.cos(newAngle) * speed,
                                Math.sin(newAngle) * speed
                            );
                            snake.rotation = newAngle + Math.PI / 2;
                        }
                    }
                });
            }
        });

        // Remove snakes after 6 seconds
        this.time.delayedCall(6000, () => {
            if (this.snakeGroup) {
                this.snakeGroup.clear(true, true);
            }
            this.sounds.parseltongue.stop();
            this.snakeAnimationActive = false;
            this.recoveringHearts = true; // Set flag before recovery
            this.recoverHearts();
        });
    }

    recoverHearts() {
        const maxHearts = 5;
        const currentHearts = Math.ceil(this.enemyHealth / 20);
        const heartsToRecover = maxHearts - currentHearts;

        if (heartsToRecover > 0) {
            let recoveryCount = 0;
            const recoverInterval = this.time.addEvent({
                delay: 300,
                callback: () => {
                    if (recoveryCount < heartsToRecover) {
                        this.enemyHealth += 20; // Recover 20 health per heart
                        this.updateHearts();
                        let plusText = this.add.text(this.enemy.x, this.enemy.y - 50, '+1', {
                            fontSize: '48px',
                            fontStyle: 'bold',
                            fill: '#00FF00',
                            stroke: '#000000',
                            strokeThickness: 4
                        }).setShadow(2, 2, '#333333', 2, true, true);
                        plusText.setScale(0.8).setAngle(-15);
                        this.tweens.add({
                            targets: plusText,
                            scale: 1.2,
                            angle: 0,
                            duration: 300,
                            ease: 'Back.out',
                            onComplete: () => {
                                this.tweens.add({
                                    targets: plusText,
                                    y: '-=100',
                                    alpha: { from: 1, to: 0 },
                                    duration: 800,
                                    ease: 'Expo.easeIn',
                                    onComplete: () => plusText.destroy()
                                });
                            }
                        });
                        recoveryCount++;
                    } else {
                        recoverInterval.remove();
                        this.recoveringHearts = false; // Reset flag after recovery
                    }
                },
                loop: true
            });
        } else {
            this.recoveringHearts = false; // Ensure flag is reset if no recovery needed
        }
    }

    hitPlayer(player, projectile) {
        if (!projectile || !projectile.active) return;
        this.sounds.hurt.setVolume(1).setLoop(false).play();
        this.cameras.main.shake(250, 0.01, true);
        this.projectiles.killAndHide(projectile);
        projectile.body.enable = false;

        const playerBloomSprite = this.add.sprite(this.player.x, this.player.y, 'spell1').setScale(0.15);
        const playerBloom = playerBloomSprite.postFX.addBloom(0xffffff, 1, 1, 5, 1.2);
        let pointText = this.add.text(projectile.x, projectile.y, '-10', {
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#FF0000',
            stroke: '#000000',
            strokeThickness: 4
        }).setShadow(2, 2, '#333333', 2, true, true);
        pointText.setScale(0.8);
        pointText.setAngle(-15);
        this.tweens.add({
            targets: pointText,
            scale: 1.2,
            angle: 0,
            duration: 300,
            ease: 'Back.out',
            onComplete: () => {
                this.tweens.add({
                    targets: pointText,
                    y: '-=100',
                    alpha: { from: 1, to: 0 },
                    duration: 800,
                    ease: 'Expo.easeIn',
                    angle: '+=15',
                    onComplete: () => { pointText.destroy(); }
                });
            }
        });
        const emitter = this.add.particles(projectile.x - 75, projectile.y, 'heart', {
            speed: { min: -100, max: 300 },
            scale: { start: 0.1, end: 0 },
            blendMode: 'NORMAL',
            lifespan: 750,
        });
        emitter.explode(5);
        this.tweens.add({
            targets: playerBloom,
            strength: 0,
            duration: 1000,
            onComplete: () => { playerBloom.destroy(); playerBloomSprite.destroy(); }
        });
        this.playerLives--;
        this.playerHealth -= 10;
        if(!this.flashed){
            const flash = this.add.image(this.player.x, this.player.y, 'redFlash');
    flash.setDepth(1000); // Set high depth to appear above everything
    flash.setScale(10); // Scale to cover the screen (adjust as needed)
    flash.setAlpha(0.7); // Start with some transparency
    
    // Add a tween to fade out the flash
    this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 1000,
        ease: 'Power2',
        onComplete: () => {
            flash.destroy();
            
        }
    });}
        
        this.updateHearts();

        if (this.playerHealth <= 80 && this.heartChestSpawns < this.maxHeartChestSpawns && !this.quizActive && !this.chestActive && Phaser.Math.Between(0, 100) < 10) {
            this.heartChestSpawns++;
            this.spawnChest("heart");
        }
    }

    updateHearts() {
        // Update player hearts
        let playerHeartCount = Math.ceil(this.playerHealth / 20);
        this.playerHearts.forEach((heart, index) => {
            heart.setVisible(index < Math.min(playerHeartCount, this.playerHearts.length));
        });

        // Update enemy hearts
        let enemyHeartCount = Math.ceil(this.enemyHealth / 20);
        this.enemyHearts.forEach((heart, index) => {
            heart.setVisible(index < Math.min(enemyHeartCount, this.enemyHearts.length));
        });
    }

    clearAttacks() {
        this.projectiles.getChildren().forEach(projectile => {
            if (projectile.active) {
                this.projectiles.killAndHide(projectile);
                projectile.body.enable = false;
            }
        });
        if (this.beamActive) {
            this.endBeam();
        }
        this.lastEnemyShotTime = this.time.now;
    }
    spawnChest(quizType) {
        if (this.chestActive || this.chest) return; // Prevent multiple chests
        this.chestActive = true;
        this.quizType = quizType;
        const chestKey = quizType === "heart" ? 'heartChest' : 'goldChest';
        this.chest = this.physics.add.sprite(this.width / 2, -100, chestKey).setScale(3);
        if (quizType === "powerup") {
            this.chest.setTint(0xCCCCCC); // Greyish-white tint for power-up chest
        }
        this.chest.body.setGravityY(800);
        // Reduce collider height to ensure proper landing
        this.chest.body.setSize(this.chest.body.width, this.chest.body.height * 0.3);
        this.physics.add.collider(this.chest, this.platforms);
        this.tweens.add({
            targets: this.chest,
            y: this.height - this.platformHeight - this.chest.displayHeight,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.physics.add.overlap(this.player, this.chest, this.openChest, null, this);
                this.chestTimer = this.time.delayedCall(5000, () => {
                    if (this.chest && this.chest.active) {
                        this.chest.destroy();
                        this.chest = null;
                        this.chestActive = false;
                    }
                });
            }
        });
    }

    openChest() {
        if (!this.chestActive || !this.chest || !this.chest.active) return;
        this.chestActive = false;
        const chestAnim = this.quizType === "heart" ? 'heartChest' : 'goldChest';
        this.chest.play(chestAnim);
        this.chest.once('animationcomplete', () => {
            this.chest.destroy();
            this.chest = null;
            this.player.setVelocity(0);
            this.clearAttacks();
            if (this.chestTimer) {
                this.chestTimer.remove();
                this.chestTimer = null;
            }
            if (this.quizType === "heart") {
                this.playerHealth = Math.min(this.playerHealth + 20, 100);
                this.updateHearts();
                let plusText = this.add.text(this.player.x, this.player.y - 50, '+1 Heart', {
                    fontSize: '48px',
                    fontStyle: 'bold',
                    fill: '#00FF00',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setShadow(2, 2, '#333333', 2, true, true);
                plusText.setScale(0.8).setAngle(-15);
                this.tweens.add({
                    targets: plusText,
                    scale: 1.2,
                    angle: 0,
                    duration: 300,
                    ease: 'Back.out',
                    onComplete: () => {
                        this.tweens.add({
                            targets: plusText,
                            y: '-=100',
                            alpha: { from: 1, to: 0 },
                            duration: 800,
                            ease: 'Expo.easeIn',
                            onComplete: () => plusText.destroy()
                        });
                    }
                });
            } else {
                this.showQuiz(this.quizType);
            }
        });
    }

    showQuiz(type) {
        if (this.quizActive) return;
        this.quizActive = true;

        let overlay = this.add.rectangle(0, 0, this.width, this.height, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setDepth(999);

        let parchment = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
            .setOrigin(0.5, 0.5)
            .setDepth(1000);
        parchment.setScale(2.4);

        let availableIndices = this.questions.map((q, i) => i).filter(i => !this.askedQuizIndices.includes(i));
        let randomIndex = Phaser.Math.Between(0, availableIndices.length - 1);
        let questionIndex = availableIndices[randomIndex];
        this.askedQuizIndices.push(questionIndex);
        let q = this.questions[questionIndex];

        let questionText = this.add.bitmapText(this.width / 2, this.height / 2 - 100, 'pixelfont', q.question, 40)
            .setOrigin(0.5)
            .setTint(0xFF0000)
            .setDepth(1001)
            .setAlpha(0);

        const optionXPositions = [this.width / 2 - 280, this.width / 2 + 250];
        const optionYPositions = [this.height / 2 + 30, this.height / 2 + 160];
        let optionTexts = [];
        for (let i = 0; i < q.options.length; i++) {
            let row = Math.floor(i / 2);
            let col = i % 2;
            let optionX = optionXPositions[col];
            let optionY = optionYPositions[row];

            let option = this.add.bitmapText(optionX, optionY, 'pixelfont', q.options[i], 30)
                .setOrigin(0.5)
                .setTint(0xFFFFFF)
                .setDepth(1001)
                .setInteractive()
                .setAlpha(0)
                .on('pointerover', () => this.input.setDefaultCursor('pointer'))
                .on('pointerout', () => this.input.setDefaultCursor('default'));

            option.on('pointerdown', () => {
                let correct = (i === q.correct);
                if (type === "damage" && correct) {
                    this.quizBonus = true;
                }
                let message = "";
                if (type === "powerup") {
                    message = correct ? "Correct Answer, Power-up granted!" : "Wrong Answer, No power-up for you!";
                }

                option.setTint(correct ? 0x00FF00 : 0xFF0000);

                let messageText = this.add.text(-200, this.height - 100, message, {
                    fontSize: '32px',
                    fontStyle: 'bold',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setOrigin(0.5, 0.5).setDepth(1002);

                this.tweens.add({
                    targets: messageText,
                    x: this.width / 2,
                    alpha: 1,
                    duration: 500,
                    ease: 'Power2'
                });

                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: messageText,
                        x: this.width + 200,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            messageText.destroy();
                            if (type === "powerup" && correct) {
                                this.activatePatronus();
                            }
                            this.tweens.add({
                                targets: [overlay, parchment, questionText, ...optionTexts],
                                alpha: 0,
                                duration: 500,
                                onComplete: () => {
                                    overlay.destroy();
                                    parchment.destroy();
                                    questionText.destroy();
                                    optionTexts.forEach(opt => opt.destroy());
                                    this.quizActive = false;
                                    if (type === "powerup" && correct) {
                                        this.time.delayedCall(500, () => {
                                            this.showEnemyHitDialogue2();
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
            });

            optionTexts.push(option);
        }

        this.tweens.add({ targets: overlay, alpha: 0.7, duration: 500 });
        this.tweens.add({ targets: parchment, alpha: 1, duration: 500 });
        this.tweens.add({ targets: questionText, alpha: 1, duration: 500 });
        optionTexts.forEach(opt => {
            this.tweens.add({ targets: opt, alpha: 1, duration: 500 });
        });
    }

    activatePatronus() {
        this.clearAttacks();
        this.sounds.patronusCast.play(); // Play patronus sound effect
        const patronus = this.physics.add.sprite(this.player.x + 80, this.height - this.platformHeight - 100, 'patronus')
            .setScale(2)
            .setDepth(10);
        patronus.anims.play('patronus_walk');

        const patronusEmitter = this.add.particles(0, 0, 'glowParticlePlayer1', {
            x: { onEmit: () => patronus.x },
            y: { onEmit: () => patronus.y },
            lifespan: 2000,
            speed: { min: -150, max: 150 },
            scale: { start: 1.0, end: 0.5 },
            alpha: { start: 0.9, end: 0 },
            quantity: 10,
            blendMode: 'ADD',
            frequency: 10
        });
        patronusEmitter.setDepth(20);
        patronusEmitter.startFollow(patronus);

        if (!this.textures.exists('glowParticlePlayer1')) {
            console.error('Texture glowParticlePlayer1 not found. Check preload.');
            return;
        }

        patronusEmitter.setDepth(20);
        patronusEmitter.start();

        const trailEmitter = this.add.particles(0, 0, 'square', {
            x: { onEmit: () => patronus.x },
            y: { onEmit: () => patronus.y },
            lifespan: 1500,
            speedX: { min: -100, max: 100 },
            speedY: { min: -100, max: 100 },
            scale: { start: 1.0, end: 0.3 },
            alpha: { start: 0.9, end: 0 },
            tint: [0xFFFFFF, 0xFFFF00, 0x00FFFF],
            blendMode: 'ADD',
            frequency: 10,
            emitZone: { source: new Phaser.Geom.Circle(0, 0, 50) }
        });
        trailEmitter.startFollow(patronus);

        const velocityX = 400;
        patronus.setVelocityX(velocityX);

        this.physics.add.overlap(patronus, this.enemy, () => {
            if (patronus.active) {
                this.enemyHealth -= 50;
                this.sounds.hurt.play();
                this.updateHearts();

                // Add damage text
                let pointText = this.add.text(this.enemy.x, this.enemy.y - 50, '-50', {
                    fontSize: '48px',
                    fontStyle: 'bold',
                    fill: '#FF0000',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setShadow(2, 2, '#333333', 2, true, true);
                pointText.setScale(0.8).setAngle(-15);
                this.tweens.add({
                    targets: pointText,
                    scale: 1.2,
                    angle: 0,
                    duration: 300,
                    ease: 'Back.out',
                    onComplete: () => {
                        this.tweens.add({
                            targets: pointText,
                            y: '-=100',
                            alpha: { from: 1, to: 0 },
                            duration: 800,
                            ease: 'Expo.easeIn',
                            onComplete: () => pointText.destroy()
                        });
                    }
                });

                // Add teal heart particle effect
                const heartEmitter = this.add.particles(this.enemy.x, this.enemy.y, 'teal_heart', {
                    speed: { min: -100, max: 300 },
                    scale: { start: 0.8, end: 0 },
                    blendMode: 'NORMAL',
                    lifespan: 750,
                });
                heartEmitter.explode(10);

                patronus.destroy();
                patronusEmitter.stop();
                trailEmitter.stop();
            }
        }, null, this);
        this.time.delayedCall(5000, () => {
            if (patronus.active) {
                patronus.destroy();
                patronusEmitter.stop();
                trailEmitter.stop();
            }
        });
    }

    showSpellChallenge() {
        this.flashed = true;
        this.spellChallengeTriggered = true;
        this.tweens.add({
            targets: this.player,
            x: this.width * 0.25,
            y: this.height / 2,
            duration: 1000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.enemy,
            x: this.width * 0.75,
            y: this.height / 2,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.physics.pause();
                this.freezeGame = true;
                this.quizActive = true; // Reuse quizActive flag to prevent other interactions

                // Create overlay and parchment background
                let overlay = this.add.rectangle(0, 0, this.width, this.height, 0x000000, 0.7)
                    .setOrigin(0, 0)
                    .setDepth(999);
                let parchment = this.add.image(this.width / 2, this.height / 2, 'quizPanel')
                    .setOrigin(0.5, 0.5)
                    .setDepth(1000)
                    .setScale(2.4);

                // Define the question and options
                const question = "What is the secret easter egg spell to defeat Voldemort?";
                const correctAnswer = "Avada Kedavra";
                const possibleIncorrectAnswers = [
                    "DOOM",
                    "Expelliarmus",
                    "Sectumsempra",
                    "Crucio",
                    "Boom",
                    "Shakalaka",
                    "Stupefy",
                    "Imperio",
                    "Lumos",
                    "Reducto"
                ];
                // Randomly select 3 incorrect answers
                const incorrectAnswers = Phaser.Utils.Array.Shuffle(possibleIncorrectAnswers).slice(0, 3);
                // Combine and shuffle options, ensuring DOOM is included
                const options = [correctAnswer, ...incorrectAnswers];
                Phaser.Utils.Array.Shuffle(options); // Shuffle to randomize option positions
                const correctIndex = options.indexOf(correctAnswer);

                // Display question
                let questionText = this.add.bitmapText(this.width / 2, this.height / 2 - 100, 'pixelfont', question, 40)
                    .setOrigin(0.5)
                    .setTint(0xFF0000)
                    .setDepth(1001)
                    .setAlpha(0);

                // Display options
                const optionXPositions = [this.width / 2 - 280, this.width / 2 + 250];
                const optionYPositions = [this.height / 2 + 30, this.height / 2 + 160];
                let optionTexts = [];
                for (let i = 0; i < options.length; i++) {
                    let row = Math.floor(i / 2);
                    let col = i % 2;
                    let optionX = optionXPositions[col];
                    let optionY = optionYPositions[row];

                    let option = this.add.bitmapText(optionX, optionY, 'pixelfont', options[i], 30)
                        .setOrigin(0.5)
                        .setTint(0xFFFFFF)
                        .setDepth(1001)
                        .setInteractive()
                        .setAlpha(0)
                        .on('pointerover', () => this.input.setDefaultCursor('pointer'))
                        .on('pointerout', () => this.input.setDefaultCursor('default'));

                    option.on('pointerdown', () => {
                        let correct = (i === correctIndex);
                        let message = correct ? "Correct! The secret spell defeats Voldemort!" : "Wrong spell! Voldemort prevails!";

                        option.setTint(correct ? 0x00FF00 : 0xFF0000);

                        let messageText = this.add.text(-200, this.height - 100, message, {
                            fontSize: '32px',
                            fontStyle: 'bold',
                            fill: '#ffffff',
                            stroke: '#000000',
                            strokeThickness: 4
                        }).setOrigin(0.5, 0.5).setDepth(1002);

                        this.tweens.add({
                            targets: messageText,
                            x: this.width / 2,
                            alpha: 1,
                            duration: 500,
                            ease: 'Power2'
                        });

                        this.time.delayedCall(2000, () => {
                            this.tweens.add({
                                targets: messageText,
                                x: this.width + 200,
                                alpha: 0,
                                duration: 500,
                                ease: 'Power2',
                                onComplete: () => {
                                    messageText.destroy();
                                    this.tweens.add({
                                        targets: [overlay, parchment, questionText, ...optionTexts],
                                        alpha: 0,
                                        duration: 500,
                                        onComplete: () => {
                                            overlay.destroy();
                                            parchment.destroy();
                                            questionText.destroy();
                                            optionTexts.forEach(opt => opt.destroy());
                                            this.quizActive = false;
                                            if (correct) {
                                                this.enemyHealth = 0;
                                                this.updateHearts();
                                                this.victoryTriggered = true;
                                                this.triggerVictoryEffect(this.time.now);
                                            } else {
                                                this.playerHealth = 0;
                                                this.tweens.add({
                                                    targets: this.player,
                                                    alpha: 0,
                                                    duration: 1000,
                                                    onComplete: () => { this.gameOver(false); }
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    });

                    optionTexts.push(option);
                }

                // Fade in elements
                this.tweens.add({ targets: overlay, alpha: 0.7, duration: 500 });
                this.tweens.add({ targets: parchment, alpha: 1, duration: 500 });
                this.tweens.add({ targets: questionText, alpha: 1, duration: 500 });
                optionTexts.forEach(opt => {
                    this.tweens.add({ targets: opt, alpha: 1, duration: 500 });
                });
            }
        });
    }

gameOver(playerWon) {
    this.playerWon = playerWon;

    // Stop all physics immediately to prevent body-related errors
    this.physics.pause();
    
    // Stop background music
    this.sounds.background.stop();

    if (playerWon && this.enemyHealth <= 0) {
        for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * 200;
            const offsetY = (Math.random() - 0.5) * 100;

            const fireworkEmitter = this.vfx.createEmitter(
                `glowParticlePlayer`,
                this.enemy.x + offsetX,
                this.enemy.y - 100 + offsetY,
                1.5 * this.uiScale,
                0.1 * this.uiScale,
                1500 * this.uiScale
            );

            fireworkEmitter.setDepth(1000);

            if (fireworkEmitter.manager) {
                fireworkEmitter.manager.emitters.forEach(e => {
                    e.speedX = { min: -200, max: 200 };
                    e.speedY = { min: -200, max: 200 };
                });
            }

            fireworkEmitter.forEachAlive((particle) => {
                particle.tint = 0xFFD700;
            });

            fireworkEmitter.explode(40);

            this.time.delayedCall(i * 300, () => {
                const colors = [0xFF4500, 0x00FFFF, 0xFF00FF, 0xFFFF00];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                const secondaryEmitter = this.vfx.createEmitter(
                    `glowParticlePlayer`,
                    this.enemy.x + offsetX + (Math.random() - 0.5) * 50,
                    this.enemy.y - 100 + offsetY + (Math.random() - 0.5) * 50,
                    1.2 * this.uiScale,
                    0.1 * this.uiScale,
                    1200 * this.uiScale
                );

                secondaryEmitter.setDepth(1000);
                secondaryEmitter.forEachAlive((particle) => {
                    particle.tint = randomColor;
                });

                secondaryEmitter.explode(30);
            });
        }

        this.time.delayedCall(1500, () => {
            initiateGameOver.bind(this)({ playerWon: this.playerWon });
        });
    } else {
        // Create a semi-transparent black overlay
        const overlay = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            this.cameras.main.width, 
            this.cameras.main.height, 
            0x000000, 
            0.7
        );
        overlay.setDepth(1001);
        overlay.setAlpha(0);
        
        // Use standard text instead of bitmap text to avoid font issues
        const deathText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "YOU DIED",
            { 
                fontFamily: 'Arial, sans-serif', // Use web-safe font
                fontSize: '64px', 
                color: '#FF0000', 
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 6
            }
        );
        deathText.setOrigin(0.5);
        deathText.setDepth(1002);
        deathText.setAlpha(0);
        
        // Fade in overlay and text
        this.tweens.add({
            targets: [overlay, deathText],
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                 this.time.delayedCall(2000, () => {
                    this.scene.start('C10');
                });
            }
        });
    }
}

    pauseGame() {
        handlePauseGame.bind(this)();
    }

    toggleControlsVisibility(isMobileDevice) {
        if (joystickEnabled && this.joyStick) {
            this.joyStick.base.visible = isMobileDevice;
            this.joyStick.thumb.visible = isMobileDevice;
        }
        if (buttonEnabled && this.buttonA) {
            this.buttonA.visible = isMobileDevice;
        }
    }
}
function timeToSeconds(startTime, currentTime) {
    return Math.floor((currentTime - startTime) / 1000);
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
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
    loadingText.setOrigin(0.5, 0.5);

    const progressBar = this.add.graphics();
    this.load.on('progress', (value) => {
        progressBar.clear();
        progressBar.fillStyle(0x364afe, 1);
        progressBar.fillRect(x, y, width * value, height);
    });
    this.load.on('fileprogress', function (file) {

    });
    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
    });
}

// Configuration objec
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 919,
    scene: [StartGame,Intro,S1, S2,N1, C5, C2, C1, C3, C4,C6,C7, C8,C9, C10,L1,L2,L3,L4,Outro,ScoreScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        orientation: Phaser.Scale.Orientation.LANDSCAPE
    },
    dom: { createContainer: true },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false,
        },
    },
    dataObject: {
        name: _CONFIG.title,
        description: _CONFIG.description,
        instructions: _CONFIG.instructions,
    },
    deviceOrientation: _CONFIG.deviceOrientation === "landscape"
};
class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        // Everything else is dependent on body location
        // Leg location
        let legSpacing = 45;
        this.rLegX = this.bodyX + legSpacing;
        this.lLegX = this.bodyX - legSpacing;
        this.legY = this.bodyY + 120;
        // Arm location
        let armSpacing = 80;
        this.rArmX = this.bodyX + armSpacing;
        this.lArmX = this.bodyX - armSpacing;
        this.armY = this.bodyY + 65;
        // Eye Location
        let eyeSpacing = 40;
        this.rEyeX = this.bodyX + eyeSpacing;
        this.lEyeX = this.bodyX - eyeSpacing;
        this.eyeY = this.bodyY - 15;
        // Mouth location
        this.mouthY = this.bodyY + 40;
        // Horn location
        let hornSpacing = 40;
        this.rHornX = this.bodyX + hornSpacing;
        this.lHornX = this.bodyX - hornSpacing;
        this.hornY = this.bodyY - 70;

        // Variables for monster movement
        this.my.moveSpeed = 0.5;
        this.my.moveDirection = 0; // 0 = no movement, 1 = right, -1 = left
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the legs
        my.sprite.rightLeg = this.add.sprite(this.rLegX, this.legY, "monsterParts", "leg_darkC.png");
        my.sprite.leftLeg = this.add.sprite(this.lLegX, this.legY, "monsterParts", "leg_darkC.png");
        my.sprite.leftLeg.flipX = true;

        // Create the arms
        my.sprite.rightArm = this.add.sprite(this.rArmX, this.armY, "monsterParts", "arm_darkE.png");
        my.sprite.leftArm = this.add.sprite(this.lArmX, this.armY, "monsterParts", "arm_darkE.png");
        my.sprite.leftArm.flipX = true;

        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_darkD.png");
    
        // Create the eyes
        my.sprite.rightOpenEye = this.add.sprite(this.rEyeX, this.eyeY, "monsterParts", "eye_yellow.png");
        my.sprite.leftOpenEye = this.add.sprite(this.lEyeX, this.eyeY, "monsterParts", "eye_yellow.png");
        my.sprite.rightClosedEye = this.add.sprite(this.rEyeX, this.eyeY, "monsterParts", "eye_closed_happy.png");
        my.sprite.leftClosedEye = this.add.sprite(this.lEyeX, this.eyeY, "monsterParts", "eye_closed_happy.png");
        my.sprite.rightClosedEye.visible = false;
        my.sprite.leftClosedEye.visible = false;

        // Create the mouths
        my.sprite.mouth = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouthG.png");
        my.sprite.mouthFangs = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouthJ.png");
        my.sprite.smileMouth = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouthA.png");
        my.sprite.smileMouthFangs = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouthB.png");
        my.sprite.mouthFangs.visible = false;
        my.sprite.smileMouth.visible = false;
        my.sprite.smileMouthFangs.visible = false;

        // Create head accessories
        my.sprite.rightHorn = this.add.sprite(this.rHornX, this.hornY, "monsterParts", "detail_dark_horn_small.png");
        my.sprite.leftHorn = this.add.sprite(this.lHornX, this.hornY, "monsterParts", "detail_dark_horn_small.png");
        my.sprite.leftHorn.flipX = true;

        // Bind inputs
        this.input.keyboard.on("keydown", function(event) {
            if (event.key == 's') {
                console.log("s pressed");
                if (my.sprite.mouth.visible == true) {
                    console.log("mouth changed");
                    my.sprite.mouth.visible = false;
                    my.sprite.smileMouth.visible = true;
                } else if (my.sprite.mouthFangs.visible == true) {
                    my.sprite.mouthFangs.visible = false;
                    my.sprite.smileMouthFangs.visible = true;
                } else if (my.sprite.smileMouth.visible == true) {
                    my.sprite.smileMouth.visible = false;
                    my.sprite.mouth.visible = true;
                } else if (my.sprite.smileMouthFangs.visible == true) {
                    my.sprite.smileMouthFangs.visible = false;
                    my.sprite.mouthFangs.visible = true;
                }
            }
            if (event.key == 'f') {
                if (my.sprite.mouth.visible == true) {
                    my.sprite.mouth.visible = false;
                    my.sprite.mouthFangs.visible = true;
                } else if (my.sprite.mouthFangs.visible == true) {
                    my.sprite.mouthFangs.visible = false;
                    my.sprite.mouth.visible = true;
                } else if (my.sprite.smileMouth.visible == true) {
                    my.sprite.smileMouth.visible = false;
                    my.sprite.smileMouthFangs.visible = true;
                } else if (my.sprite.smileMouthFangs.visible == true) {
                    my.sprite.smileMouthFangs.visible = false;
                    my.sprite.smileMouth.visible = true;
                }
            }
            if (event.key == 'a') {
                my.moveDirection = -1;
            }
            if (event.key == 'd') {
                my.moveDirection = 1;
            }
        })
        this.input.keyboard.on("keyup", function(event) {
            if (event.key == 'a' && my.moveDirection == -1) {
                my.moveDirection = 0;
            }
            if (event.key == 'd' && my.moveDirection == 1) {
                my.moveDirection = 0;
            }
        })
    }

    update() {
        let my = this.my; // create an alias to this.my for readability

        // Move monster according to move direction and speed
        for (let i in my.sprite) {
            my.sprite[i].x += my.moveSpeed * my.moveDirection;
        }
    }
}
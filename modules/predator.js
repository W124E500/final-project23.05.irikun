var LivingCreature = require("./livingcreature.js")
module.exports = class Predator extends LivingCreature { 
        constructor(x, y, index) {
            super(x, y, index);
            this.energy = 8;
        }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        this.energy--;
        var vandakner = Random(this.chooseCell(0));

        if (vandakner) {
            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {
        var xotakerner = Random(this.chooseCell(2));
       
        if (xotakerner) {
            this.energy += 3;
           
            var newX = xotakerner[0];
            var newY = xotakerner[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in geArr) {
                if (newX == geArr[i].x && newY == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;

        }

    }
    mul() {
        var newCell = Random(this.chooseCell(0));
       
        if (this.energy >= 5 && newCell) {
            var ge = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(ge);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


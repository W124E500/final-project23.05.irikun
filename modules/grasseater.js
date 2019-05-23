var LivingCreature = require("./livingcreature.js")
module.exports = class GrassEater extends LivingCreature {
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

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {


        var xoter = Random(this.chooseCell(1));

        if (xoter) {
            this.energy += 3;

            var newX = xoter[0];
            var newY = xoter[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;

        }

    }
    mul() {
        var newCell = Random(this.chooseCell(0));

        if (this.energy >= 12 && newCell) {
            var ge = new GrassEater(newCell[0], newCell[1], this.index);
            geArr.push(ge);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in geArr) {
                if (this.x == geArr[i].x && this.y == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}

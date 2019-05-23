var LivingCreature = require("./livingcreature.js")
module.exports = class XotaqaylEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x, this.y + 3],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        var vandakner = Random(this.chooseCell(0));
        if (vandakner) {
            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {
        var ank = Random(this.chooseCell(4));
        var pred = Random(this.chooseCell(3));
        var datarkArr = []
        datarkArr.push(ank);
        datarkArr.push(pred);
        var choose = Random(datarkArr);
        if (choose) {
            this.energy += 3;
            var newX = choose[0];
            var newY = choose[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;

            if (choose == ank) {

                for (var i in xotaqaylArr) {
                    if (newX == xotaqaylArr[i].x && newY == xotaqaylArr[i].y) {
                        xotaqaylArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (choose == pred) {
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            this.x = newX;
            this.y = newY;
        }


    }
    mul() {
        var vandakner = Random(this.chooseCell(0));
        if (vandakner && this.energy >= 12) {
            var newAnkeater = new XotaqaylEater(vandakner[0], vandakner[1], this.index);
            xotaqaylEaterArr.push(newAnkeater);
            matrix[vandakner[1]][vandakner[0]] = 5;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in xotaqaylEaterArr) {
                if (this.x == xotaqaylEaterArr[i].x && this.y == xotaqaylEaterArr[i].y) {
                    xotaqaylEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
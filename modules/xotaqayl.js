var LivingCreature = require("./livingcreature.js")
module.exports =class Xotaqayl extends LivingCreature  {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 6;
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

        var mv = Random(this.chooseCell(1));
       
        if (mv) {
            this.energy-=2 ;
           
            var newX = mv[0];
            var newY = mv[1];

            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 1;
           
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


    eat() {
        var pred = Random(this.chooseCell(3));
        if (pred) {
            this.energy += 3;
            var newX = pred[0];
            var newY = pred[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;
        }
    }
   mul() {
        var vandakner = Random(this.chooseCell(0));
        if (vandakner && this.energy >= 14) {
            var newAnk = new Xotaqayl(vandakner[0], vandakner[1], this.index);
            xotaqaylArr.push(newAnk);
            matrix[vandakner[1]][vandakner[0]] = 4; 
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in xotaqaylArr) {
                if (this.x == xotaqaylArr[i].x && this.y == xotaqaylArr[i].y) {
                    xotaqaylArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}

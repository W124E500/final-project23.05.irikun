//kanchum enq socet io-n haytararum em ide setupi hamar
var side = 20;
var socket = io();
//haytararum enq popoxakan exanaki hamar vor@ kereva menak  script.js-um
var weatherclient = "Summer";
//servei exanak@ berum e talis e clientin
socket.on("exanak", function (w) {
    weatherclient = w;
});
//setup
function setup() {
    createCanvas(30 * side, 30 * side);
    background('#acacac');

}
//haytararum enq function vor@ kashxati exanak@ tanalu depqum, w parametr@
function drawWeather(w) {
    p = document.getElementById('seasons');
    var weather = w;
    if (weather == "Summer") {
        p.innerText = "Summer";
    }
    else if (weather == "Winter") {
        p.innerText = "Winter";
    }
    else if (weather == "Autumn") {
        p.innerText = "Autumn";
    }
    else if (weather == "Spring") {
        p.innerText = "Spring";
    }
}

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if (weatherclient == "Summer") {
                    fill("green");
                }
                else if (weatherclient != "Summer") {
                    fill("#a79f15");
                }
            }
            else if (matrix[y][x] == 2) {
                if (weatherclient == "Winter") {
                    fill("#696968");
                }
                else if (weatherclient != "Winter") {
                    fill("Yellow");
                }
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
            }
            rect(x * side, y * side, side, side);

        }
    }
}

socket.on("matrix", drawMatrix)
socket.on("exanak", drawWeather)
//function event kisata grac serverum el code petqa grvi sa vorpes hushum
function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x, y];
    //console.log(arr);
    socket.emit("Sxmvec", arr)
    socket.on("matrix", matrix)

}

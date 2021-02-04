//principais variaveis do jogo
let order = [];
let clickedOrder = [];
let score = 0;
let colores = [];
// seletores de propriedades
let blue = document.querySelector('.blue');
let red = document.querySelector('.red');
let green = document.querySelector('.green');
let yellow = document.querySelector('.yellow');

// função de inicio de jogo
let playGame = () => {
    alert(`Bem vindo ao Genius! Iniciando novo jogo!`);
    score = 0;
    nextLevel();
}
//função para próximo nível do jogo
let nextLevel = () => {    
    if (score > 0) {   
        changeColor() 
    }   
    score++; 
    shuffleOrder();
}
//função para trocar a cor aleatórias
let changeColor = () => {
    getColor(3);    
    rgbToHex(colores);
    blue.style.backgroundColor = colorHex;
    getColor(3);
    rgbToHex(colores);   
    red.style.backgroundColor = colorHex;
    getColor(3);
    rgbToHex(colores);    
    yellow.style.backgroundColor = colorHex;
    getColor(3);
    rgbToHex(colores);    
    green.style.backgroundColor = colorHex;     
}
let getColor = () => {
    
    for (let i = 0; i < 3; i++) {
        colores[i] = Math.floor(Math.random() * 256);
    }    
}
let rgbToHex = ( colores) => {;
    
    return colorHex = "#" + 
            ((1 << 24) + (colores[0] << 16) + 
            (colores[1] << 8) + 
            colores[2]).toString(16).slice(1);   
}
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = []

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor,Number(i) + 1);
    }

}
//função para retornar cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}
//acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number)
}
// função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        //verifica se está correto
        checkOrder();
    }, 250)
    
}
//configura os click
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
// 
let checkOrder = () => {
    for(let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\n Você acertou! Iniciando próximo nível!`)
        nextLevel();
    }
}
let gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu noob!\n Clique em Ok para iniciar um novo jogo!`);
    //reiniciando as variaveis globais
    order = [];
    clickedOrder = [];
    blue.style.backgroundColor = "blue";
    red.style.backgroundColor = "red";
    yellow.style.backgroundColor = "yellow";
    green.style.backgroundColor = "green";
    
    playGame();
}
// Começa o jogo
playGame();
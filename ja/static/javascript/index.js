

let claerT;


function getRotationValues(element) {
    const style = window.getComputedStyle(element);
    const transform = style.getPropertyValue('transform');

    if (transform === 'none') {
        return { rotateX: 0, rotateY: 0 };
    }

    const values = transform.match(/matrix3d\((.+)\)/);

    if (values) {
        const matrix = values[1].split(', ');
        
        const a = parseFloat(matrix[5]);
        const b = parseFloat(matrix[6]);
        const c = parseFloat(matrix[9]);
        const d = parseFloat(matrix[10]);

        const rotateX = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        const rotateY = Math.round(Math.atan2(c, d) * (180 / Math.PI));
        
        return { rotateX, rotateY };
    }

    return { rotateX: 0, rotateY: 0 };
}


function moveFunction() {
    let moveCount = parseInt(Math.random() * 6 + 1);
    let cube = document.getElementById("Box3D");
    const randomBtn = document.getElementById("randomBtn");
    randomBtn.disabled = true;

    cube.style.animation = `rotate-to-${moveCount} linear forwards 1.5s`

    if (claerT) {
        clearTimeout(claerT)
    }

    claerT = setTimeout(() => {

        const rotate = getRotationValues(cube);

        const styleSheet = document.styleSheets;
        let targetStyleSheet;
        for (let i = 0; i < styleSheet.length; i++) {
            if (styleSheet[i].ownerNode.tagName === "STYLE") {
                targetStyleSheet = styleSheet[i];
                break
            }
        }

        for (let i = 0; i < targetStyleSheet.cssRules.length; i++) {
            if (targetStyleSheet.cssRules[i].name === "rotate-goBack") {
                targetStyleSheet.deleteRule(i);
                break
            }
        }

        const keyframes = `
                @keyframes rotate-goBack {
                    from {
                        transform: translateX(100px) translateY(-1400px) scale(6) rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg);
                    }
                    to {
                        transform: translate(0,0) scale(1) rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg);
                    }
                }
            `;
            targetStyleSheet.insertRule(keyframes, targetStyleSheet.cssRules.length);

        cube.style.animation = `rotate-goBack ease forwards 0.3s`

        //console.log(`rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg)`)

        playerMove(moveCount)
    }, 2400);
}


function isOverlapping(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom);
}

function Overlapping(e,e2) {
    e.style.left = `${e.offsetLeft - 40}px`
    e2.style.left = `${e2.offsetLeft + 40}px`
}

function winGame(p) {
    alert(`玩家${p}獲得勝利！`)
}


function foodEvent(e) {
    const foodInfo = Array.from(document.getElementsByClassName("foodCount"));
    if (character[e] === "成年紅耳龜") {
        pFood[e]+=1;
        foodInfo[e].innerHTML = `食物: ${pFood[e]}`;
        return
    }
    if (character[e] === "流浪兔") {
        pFood[e]+=2;
        foodInfo[e].innerHTML = `食物: ${pFood[e]}`;
        return
    }
}

function foodRemoveEvent(e) {
    const foodInfo = Array.from(document.getElementsByClassName("foodCount"));
    if (character[e] === "成年紅耳龜") {
        pFood[e]-=1;
        foodInfo[e].innerHTML = `食物: ${pFood[e]}`;
        return
    }
    if (character[e] === "流浪兔") {
        pFood[e]-=2;
        foodInfo[e].innerHTML = `食物: ${pFood[e]}`;
        return
    }
}

function foodRemoveCheck(e) {
    const thresholds = [7, 12, 19, 25, 32, 44, 37 , 49];
    const foodTimes = [1, 2, 3, 4, 5, 6, 7, 8];

    for (let i = 0; i < thresholds.length; i++) {
        if (pMoveTime[e] >= thresholds[i] && !(pFoodTime[e] >= foodTimes[i])) {
            foodRemoveEvent(e);
            pFoodTime[e]++;
            return;
        }
    }
}

function playerMove(moveCount) {

    const player = document.getElementsByClassName("player");
    const allBox = document.getElementsByClassName("cell");
    
    if (pMoveTime[roundTime]) {
        pMoveTime[roundTime] += moveCount;
    } else {
        pMoveTime[roundTime] = moveCount;
        pStatus[roundTime] = false;
    }

    // = - = - = - = 食物懲罰 = - = - = - =
    foodRemoveCheck(roundTime)




    if ( pMoveTime[roundTime] < 24 ) {
        player[roundTime].style.left = allBox[pMoveTime[roundTime]].offsetLeft + 120 + 'px';
        player[roundTime].style.top = allBox[pMoveTime[roundTime]].offsetTop + 30 + 'px';

        // = - = - = - = 事件偵測 = - = - = - =
        if (allBox[pMoveTime[roundTime]].style.backgroundColor === "aqua") {
            console.log("hi")
        }

        // = - = - = - = 食物偵測 = - = - = - =
        if (allBox[pMoveTime[roundTime]].style.backgroundColor === "greenyellow") {
            foodEvent(roundTime);
        }

    } else if ( pMoveTime[roundTime] >= 24 && pMoveTime[roundTime] <= 47 ) {
        player[roundTime].style.left = allBox[pMoveTime[roundTime]].offsetLeft + allBox[pMoveTime[roundTime]].parentElement.offsetLeft + 50 + 'px';
        player[roundTime].style.top = allBox[pMoveTime[roundTime]].offsetTop + allBox[pMoveTime[roundTime]].parentElement.offsetTop + 10 + 'px';

        // = - = - = - = 事件偵測 = - = - = - =
        if (allBox[pMoveTime[roundTime]].style.backgroundColor === "aqua") {
            console.log("hi")
        }

        // = - = - = - = 食物偵測 = - = - = - =
        if (allBox[pMoveTime[roundTime]].style.backgroundColor === "greenyellow") {
            foodEvent(roundTime);
        }

    } else if ( pMoveTime[roundTime] >= 48 && pMoveTime[roundTime] <= 50 ) {
        const allPoint = document.getElementsByClassName("point");
        player[roundTime].style.left = allPoint[pMoveTime[roundTime] - 48].offsetLeft + allPoint[pMoveTime[roundTime] - 48].parentElement.offsetLeft + allPoint[pMoveTime[roundTime] - 48].parentElement.parentElement.offsetLeft + 12.5 + 'px';
        player[roundTime].style.top = allPoint[pMoveTime[roundTime] - 48].offsetTop + allPoint[pMoveTime[roundTime] - 48].parentElement.offsetTop + allPoint[pMoveTime[roundTime] - 48].parentElement.parentElement.offsetLeft - 152.5 + 'px';

        // = - = - = - = 事件偵測 = - = - = - =
        if (roundTime == 49) {
            console.log("hi")
        }

    } else {
        const allPoint = document.getElementsByClassName("point");
        player[roundTime].style.left = allPoint[3].offsetLeft + allPoint[3].parentElement.offsetLeft + allPoint[3].parentElement.parentElement.offsetLeft + 88.5 + 'px';
        player[roundTime].style.top = allPoint[3].offsetTop + allPoint[3].parentElement.offsetTop + allPoint[3].parentElement.parentElement.offsetLeft - 152.5 + 'px';
        winGame(roundTime + 1);
    }
    



    // = - = - = - = 碰撞偵測 = - = - = - =

    setTimeout(() => {
        const loop = setInterval(() => {
            if (document.hasFocus()) {
                const e1 = player[roundTime];
                const e2 = Array.from(player);
                e2.splice(roundTime,1)
                e2.forEach(e => {
                    if (isOverlapping(e1,e)) { 
                        console.log('YYYYYYY');
                           Overlapping(e1,e);
                    } else { 
                        console.log('NNNNNNN');
                    }
                });
                const randomBtn = document.getElementById("randomBtn");
                randomBtn.disabled = false;
    
                clearInterval(loop);
            }
        }, 600);
    }, 100);



    roundTime++;
    if ( roundTime == player.length ) {
        roundTime = 0;
    }

}



let roundTime = 0
let pStatus = {};
let pMoveTime = {};
let pFood = {};
let pFoodTime = {};
let character = {};

function startGame() {

    roundTime = 0
    pStatus = {};
    pMoveTime = {};
    pFood = {};
    pFoodTime = {};

    const player = Array.from(document.getElementsByClassName("player"));
    const foodInfo = Array.from(document.getElementsByClassName("foodCount"));
    const roleInfo = Array.from(document.getElementsByClassName("roleInfo"));

    let i = 0;
    player.forEach(element => {
        element.setAttribute("idNumber", i);
        pFood[i] = 15;
        pFoodTime[i] = 0;
        foodInfo[i].innerHTML = `食物: ${pFood[i]}`
        roleInfo[i].innerHTML = `角色: ${character[i]}`
        i++;
    });

    const section1 = document.getElementById("section1");
    const section2 = document.getElementById("section2");
    const section4 = document.getElementById("section4");

    section4.style.opacity = "0";

    setTimeout(() => {
        section4.style.display = "none";
        section4.style.position = "absolute";
    
        section1.style.position = "relative";
        section2.style.position = "relative";
        section1.style.opacity = "1";
        section2.style.opacity = "1";
    }, 1000);



}


function choseCharacter() {

    character = {};

    const section3 = document.getElementById("section3");
    const section4 = document.getElementById("section4");

    section3.style.opacity = "0";

    setTimeout(() => {
        section3.style.display = "none";
        section3.style.position = "absolute";
    
        section4.style.position = "relative";
        section4.style.opacity = "1";
    }, 400);

    let choseTime = 0

    Array.from(document.getElementsByClassName('card')).forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
    
            const xAxisRotation = (y / rect.height) * 30;
            const yAxisRotation = (x / rect.width) * -30;
    
            card.style.transform = `rotateX(${xAxisRotation}deg) rotateY(${yAxisRotation}deg)`;
        });
    
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    
        card.onclick = () => { 
            if (!(card.style.cursor == "no-drop")) {
                card.innerHTML = `玩家${choseTime+1}`;
                card.className = "card";
                card.style.cursor = "no-drop"
    
                character[choseTime] = card.getAttribute("Character");
                choseTime++
    
                const choseCharacterInfoBox = document.getElementById("choseCharacterInfoBox");
                choseCharacterInfoBox.innerHTML = `選擇角色 ---- 玩家${choseTime+1}`;
            }
        }
    });
    

}
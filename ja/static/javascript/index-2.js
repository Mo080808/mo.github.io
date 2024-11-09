

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


/*
const styleSheet = document.styleSheets;

/*let targetStyleSheet;
for (let i = 0; i < styleSheet.length; i++) {
    if (styleSheet[i].href && styleSheet[i].href.includes("index.css")) {
        targetStyleSheet = styleSheet[i];
        break
    }
}*/
/*
let targetStyleSheet;
for (let i = 0; i < styleSheet.length; i++) {
    if (styleSheet[i].ownerNode.tagName === "STYLE") {
        targetStyleSheet = styleSheet[i];
        break
    }
}
console.log(targetStyleSheet.cssRules)
*/




function moveFunction() {
    let moveCount = parseInt(Math.random() * 6 + 1);
    let cube = document.getElementById("Box3D");

    cube.style.animation = `rotate-to-${moveCount} linear forwards 3s`

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
                //console.log("Succeed Remove");
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

        console.log(`rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg)`)

        playerMove(moveCount)
    }, 6000);

    //alert(`移動步數: ${moveCount}`)
}



let roundTime = 0
let p1MoveTime = 0
let p2MoveTime = 0

function playerMove(moveCount) {
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");

    if (roundTime==0) {
        p1MoveTime += moveCount;
        p1.style.left = p1.offsetLeft + 300*moveCount + "px";

        console.log(moveCount)
        console.log(p1.style.left)

        roundTime++;
    } else {
        p2MoveTime += moveCount;
        p2.style.left = p2.offsetLeft + 300*moveCount + "px";
        
        roundTime = 0;

        console.log(moveCount)
        console.log(p1.style.left)
    }
}


/*

function ChangeLeft(element) {
    const centerX = element.offsetWidth / 2;

    return element.offsetLeft + centerX;
}
    
function ChangeTop(element) {
    const centerY = element.offsetHeight / 2;

    return element.offsetTop + centerY;
}
*/

/*
function getGlobalLeft(element) {
    let left = 0;
    while (element) {
        left += element.offsetLeft;
        element = element.offsetParent;
    }
    return left;
}

function getGlobalTop(element) {
    let top = 0;
    while (element) {
        top += element.offsetTop;
        element = element.offsetParent;
    }
    return top;
}*/

function isOverlapping(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}






    /*
    if ( pMoveTime[roundTime] >= 24 && !(pStatus[roundTime])) {
        pStatus[roundTime] = true;
        player[roundTime].remove()

        let gameBox2 = document.getElementById("gameBox2");
        
        const newPlayer = document.createElement("div");
        newPlayer.className = "player";
        newPlayer.innerHTML = `P${roundTime + 1}`;

        gameBox2.appendChild(newPlayer)
    }



    if ( pMoveTime[roundTime] < 24 ) {
        player[roundTime].style.left = allBox[pMoveTime[roundTime]].offsetLeft + 120 + 'px';
        player[roundTime].style.top = allBox[pMoveTime[roundTime]].offsetTop + 30 + 'px';

        console.log("HI" , allBox[pMoveTime[roundTime]].offsetLeft)
    } else if ( pMoveTime[roundTime] >= 24 ) {
        player[roundTime].style.left = allBox[pMoveTime[roundTime]].offsetLeft + 50 + 'px';
        player[roundTime].style.top = allBox[pMoveTime[roundTime]].offsetTop + 10 + 'px';
    }


    roundTime++;
    if ( roundTime == player.length ) {
        roundTime = 0;
    }








    

*/




/*
const element = document.querySelector('.your-element-class');
const rect = element.getBoundingClientRect();

const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

console.log('CCC:', { centerX, centerY });
*/

/*
window.onload = () => {
    const player = Array.from(document.getElementsByClassName("player"));
    const foodInfo = Array.from(document.getElementsByClassName("foodCount"));
    //const allBox = document.getElementsByClassName("cell")[33];

    let i = 0;
    player.forEach(element => {
        element.setAttribute("idNumber", i);

        //element.style.left = ChangeLeft(element) + 'px';
        //element.style.top = ChangeTop(element) + 'px';

        //element.style.left = allBox.offsetLeft + allBox.parentElement.offsetLeft + 'px';

        pFood[i] = 15;
        foodInfo[i].innerHTML = `食物: ${pFood[i]}`

        i++;

    });

}*/



/*
function Overlapping(e) {
    if (!(e.getAttribute('haveKids') == "True" && e.getAttribute('haveKids') == "True")) {
        const gameBox = document.getElementById("gameBox")
        const newObject = document.createElement("div");
        newObject.setAttribute("idNumber" , e.getAttribute('idNumber'));
        e.setAttribute('haveKids', "True");
    
        newObject.id = "OverlappingShow";
        console.log(e.offsetLeft);

        gameBox.appendChild(newObject);

        setTimeout(() => {
            newObject.style.left = `${e.offsetLeft + 10}px`;
            newObject.style.top = `${e.offsetTop - 60}px`;
        }, 1);

        console.log(newObject);
    }
}
*/




    /*
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");
    const allBox = document.getElementsByClassName("cell");

    if (roundTime==0) {
        p1MoveTime += moveCount;

        console.log(allBox[p1MoveTime]);

        if (p1MoveTime >=24 && !(pStatus[`p${"1"}`])) {
            pStatus[`p${"1"}`] = true;

            p1.remove();
            
        }

        if (p1MoveTime <= 23) {
            p1.style.left = allBox[p1MoveTime].offsetLeft + 120 + 'px';
            p1.style.top = allBox[p1MoveTime].offsetTop + 30 + 'px';
        } else if (p1MoveTime >= 24) {
            
            p1.style.left = allBox[p1MoveTime].offsetLeft + 120 + 'px';
            p1.style.top = allBox[p1MoveTime].offsetTop + 30 + 'px';
        }

        console.log(moveCount)
        console.log(p1.style.left)

        roundTime++;
    } else {
        p2MoveTime += moveCount;

        p2.style.left = allBox[p2MoveTime].offsetLeft + 120 + 'px';
        p2.style.top = allBox[p2MoveTime].offsetTop + 30 + 'px';
        
        roundTime = 0;

        console.log(moveCount)
        console.log(p1.style.left)
    }*/

/*
        function getLeft(element) {
            const rect = element.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            return rect.left + scrollLeft;
        }
        
        function getTop(element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return rect.top + scrollTop;
        }
            */
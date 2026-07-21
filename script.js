// ===============================
// 夫妻人生旅程 Wedding Edition
// script.js (Part 1)
// ===============================

// -------------------------------
// 地圖資料
// -------------------------------

const spaces = [

{ x:80 , y:340 , icon:"🏠", type:"start" },

{ x:135 , y:240 , icon:"💕", type:"love" },

{ x:240 , y:200 , icon:"📸", type:"memory" },

{ x:340 , y:160 , icon:"🎁", type:"surprise" },

{ x:450 , y:140 , icon:"🤣", type:"fun" },

{ x:560 , y:130 , icon:"💍", type:"love" },

{ x:670 , y:140 , icon:"📸", type:"memory" },

{ x:780 , y:170 , icon:"🎁", type:"surprise" },

{ x:890 , y:230 , icon:"💕", type:"love" },

{ x:980 , y:320 , icon:"⭐", type:"challenge" },

{ x:1010 , y:430 , icon:"📸", type:"memory" },

{ x:970 , y:540 , icon:"🤣", type:"fun" },

{ x:900 , y:630 , icon:"💍", type:"love" },

{ x:790 , y:680 , icon:"🎁", type:"surprise" },

{ x:670 , y:700 , icon:"📸", type:"memory" },

{ x:550 , y:690 , icon:"💕", type:"love" },

{ x:430 , y:660 , icon:"🤣", type:"fun" },

{ x:320 , y:620 , icon:"📸", type:"memory" },

{ x:220 , y:560 , icon:"🎁", type:"surprise" },

{ x:150 , y:470 , icon:"💕", type:"love" },

{ x:140 , y:360 , icon:"🤣", type:"fun" },

{ x:220 , y:310 , icon:"📸", type:"memory" },

{ x:320 , y:320 , icon:"💍", type:"love" },

{ x:430 , y:360 , icon:"🎁", type:"surprise" },

{ x:540 , y:410 , icon:"💕", type:"love" },

{ x:650 , y:450 , icon:"📸", type:"memory" },

{ x:760 , y:470 , icon:"🤣", type:"fun" },

{ x:840 , y:430 , icon:"🎁", type:"surprise" },

{ x:760 , y:360 , icon:"💕", type:"love" },

{ x:630 , y:320 , icon:"⭐", type:"challenge" },

{ x:520 , y:300 , icon:"👑", type:"goal" }

];


// -------------------------------
// 道路
// -------------------------------

const roads = [

[0,1],
[1,2],
[2,3],
[3,4],
[4,5],
[5,6],
[6,7],
[7,8],
[8,9],
[9,10],
[10,11],
[11,12],
[12,13],
[13,14],
[14,15],
[15,16],
[16,17],
[17,18],
[18,19],
[19,20],
[20,21],
[21,22],
[22,23],
[23,24],
[24,25],
[25,26],
[26,27],
[27,28],
[28,29],
[29,30]

];

// -------------------------------
// 遊戲資料
// -------------------------------

const teams = [

{
name:"第一隊",
position:0,
score:0
},

{
name:"第二隊",
position:0,
score:0
},

{
name:"第三隊",
position:0,
score:0
},

{
name:"第四隊",
position:0,
score:0
},

{
name:"第五隊",
position:0,
score:0
}

];

let currentTeam = 0;

const board = document.getElementById("board");

const roadLayer = document.getElementById("roadLayer");

// -------------------------------
// 建立格子
// -------------------------------

function buildBoard(){

spaces.forEach((space,index)=>{

const div=document.createElement("div");

div.className="space "+space.type;

div.dataset.index=index;

div.style.left=space.x+"px";

div.style.top=space.y+"px";

div.innerHTML=space.icon;

board.appendChild(div);

});

}

// -------------------------------
// 畫道路
// -------------------------------

function drawRoads(){

roads.forEach(r=>{

const a=spaces[r[0]];

const b=spaces[r[1]];

const line=document.createElementNS(
"http://www.w3.org/2000/svg",
"path"
);

line.setAttribute(
"d",
`M ${a.x+41} ${a.y+41}
L ${b.x+41} ${b.y+41}`
);

roadLayer.appendChild(line);

});

}

// -------------------------------
// 放置棋子
// -------------------------------

function placePieces(){

teams.forEach((team,index)=>{

const piece=document.getElementById("piece"+index);

const p=spaces[team.position];

piece.style.left=(p.x+26+(index%2)*10)+"px";

piece.style.top=(p.y+26+Math.floor(index/2)*10)+"px";

});

}

// -------------------------------
// 更新隊名
// -------------------------------

function updateNames(){

for(let i=0;i<5;i++){

teams[i].name=document.getElementById("team"+i).value;

document.getElementById("scoreName"+i).textContent=teams[i].name;

}

document.getElementById("currentTeam").textContent=
teams[currentTeam].name;

}

// -------------------------------
// 更新目前隊伍
// -------------------------------

function updateTurn(){

document.getElementById("currentTeam").textContent=
teams[currentTeam].name;

}
// -------------------------------
// 題庫（之後會改成 questions.json）
// -------------------------------

const questions=[

"第一次見面是誰先主動？",
"第一次約會去哪裡？",
"另一半最愛吃什麼？",
"第一次牽手在哪裡？",
"另一半最大的優點？",
"如果中樂透第一件事？",
"最想一起去哪個國家？",
"誰比較容易生氣？",
"第一次旅行去哪裡？",
"對方最喜歡的飲料？"

];

// -------------------------------
// 骰子
// -------------------------------

const dice=document.getElementById("dice");

const rollBtn=document.getElementById("rollBtn");

const questionBox=document.getElementById("questionBox");
const questionOverlay=document.getElementById("questionOverlay");

const overlayQuestion=document.getElementById("overlayQuestion");

const startAnswerBtn=document.getElementById("startAnswerBtn");

const closeQuestionBtn=document.getElementById("closeQuestionBtn");

const correctBtn=document.getElementById("correctBtn");

const excellentBtn=document.getElementById("excellentBtn");

let moving=false;

// -------------------------------
// 擲骰
// -------------------------------

rollBtn.addEventListener("click",()=>{

if(moving) return;

updateNames();

moving=true;

dice.classList.add("rolling");

let value=1;

const timer=setInterval(()=>{

value=Math.floor(Math.random()*6)+1;

dice.textContent=value;

},70);

setTimeout(()=>{

clearInterval(timer);

value=Math.floor(Math.random()*6)+1;

dice.textContent=value;

dice.classList.remove("rolling");

movePiece(value);

},700);

});

// -------------------------------
// 棋子移動
// -------------------------------

function movePiece(step){

const team=teams[currentTeam];

let target=team.position+step;

if(target>=spaces.length){

target=spaces.length-1;

}

moveStep(team.position,target,()=>{

team.position=target;

showQuestion();

placePieces();

moving=false;

});

}

// -------------------------------
// 一格一格移動
// -------------------------------

function moveStep(now,target,finish){

if(now>=target){

finish();

return;

}

const piece=document.getElementById("piece"+currentTeam);

const next=spaces[now+1];

piece.style.left=(next.x+26+(currentTeam%2)*10)+"px";

piece.style.top=(next.y+26+Math.floor(currentTeam/2)*10)+"px";

piece.classList.remove("jump");

void piece.offsetWidth;

piece.classList.add("jump");

setTimeout(()=>{

moveStep(now+1,target,finish);

},430);

}

// -------------------------------
// 題目
// -------------------------------

function showQuestion(){
closeQuestionBtn.onclick=()=>{

questionOverlay.classList.remove("show");

};
closeQuestionBtn.onclick=()=>{

questionOverlay.classList.remove("show");

};

startAnswerBtn.onclick=()=>{

startCountdown();

};
startAnswerBtn.onclick=()=>{

questionOverlay.classList.remove("show");

startCountdown();

};
correctBtn.onclick=()=>{

addScore(currentTeam,1);

questionOverlay.classList.remove("show");

};
excellentBtn.onclick=()=>{

addScore(currentTeam,2);

questionOverlay.classList.remove("show");

};
const q=

questions[
Math.floor(
Math.random()*questions.length
)
];

questionBox.textContent=q;

overlayQuestion.textContent=q;

questionOverlay.classList.add("show");

}

// -------------------------------
// 下一隊
// -------------------------------

document

.getElementById("nextBtn")

.addEventListener("click",()=>{

currentTeam++;

if(currentTeam>=teams.length){

currentTeam=0;

}

updateTurn();

});

// -------------------------------
// 加分
// -------------------------------

function addScore(index,point=1){

teams[index].score+=point;

document.getElementById(

"score"+index

).textContent=

teams[index].score;

}
// -------------------------------
// 10 秒倒數
// -------------------------------

const overlay=document.getElementById("countdownOverlay");
const countdownNumber=document.getElementById("countdownNumber");

document
.getElementById("countdownBtn")
.addEventListener("click",startCountdown);

function startCountdown(){

let time=10;

overlay.classList.add("show");

countdownNumber.textContent=time;

const timer=setInterval(()=>{

time--;

if(time>0){

countdownNumber.textContent=time;

}else{

clearInterval(timer);

countdownNumber.textContent="時間到！";

setTimeout(()=>{

overlay.classList.remove("show");

questionOverlay.classList.add("show");

},1200);

}

},1000);

}



// -------------------------------
// 是否到終點
// -------------------------------

function checkWinner(){

const team=teams[currentTeam];

if(team.position===spaces.length-1){

setTimeout(()=>{

alert(
"🏆 "+team.name+" 抵達終點！\n\n恭喜獲勝！"
);

},300);

}

}

// -------------------------------
// 覆寫 movePiece
// (加入終點判斷)
// -------------------------------

const originalMovePiece=movePiece;

movePiece=function(step){

const team=teams[currentTeam];

let target=team.position+step;

if(target>=spaces.length){

target=spaces.length-1;

}

moveStep(team.position,target,()=>{

team.position=target;

placePieces();

showQuestion();

checkWinner();

moving=false;

});

};

// -------------------------------
// Enter 更新隊名
// -------------------------------

for(let i=0;i<5;i++){

document
.getElementById("team"+i)
.addEventListener("keyup",updateNames);

}
function fitBoard(){

const container=document.getElementById("boardContainer");

const rightPanel=document.getElementById("rightPanel");

const topBar=95;

const padding=30;

const availableWidth=

window.innerWidth-rightPanel.offsetWidth-padding;

const availableHeight=

window.innerHeight-topBar-padding;

const scale=Math.min(

availableWidth/1350,

availableHeight/900,

1

);

container.style.transform=

`scale(${scale})`;

}

// -------------------------------
// 初始化
// -------------------------------

buildBoard();

drawRoads();

placePieces();

updateNames();

updateTurn();
fitBoard();

window.addEventListener("resize",fitBoard);

questionBox.textContent=
"🎲 點擊『擲骰』開始遊戲";

// -------------------------------
// Console
// -------------------------------

console.log(
"%c夫妻人生旅程 Wedding Edition",
"color:#ff4d88;font-size:20px;font-weight:bold;"
);

console.log(
"Board Ready."
);
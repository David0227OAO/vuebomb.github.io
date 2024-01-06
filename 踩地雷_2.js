let answer = []; // 答案
let flag = false; //檢查是否可繼續遊玩
let timestop = false; //計時器是否暫停
let senser_creatanswer = true; //是否要設定answerarray

//新局呼叫
function newGame() {
  flag = true;
  //console.log(flag);
}

//產生地雷位置
function creatanswer(posx, posy) {
  if (senser_creatanswer == true) {
    let bomb = document.getElementById("numberofbomb").value; //炸彈數量
    let x = document.getElementById("long").value; //抓長
    let y = document.getElementById("wide").value; //抓寬
    //console.log("creatanswer" + x, y);
    //設定炸彈位置
    function resectbomb() {
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      let a = [];
      for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
          const value = i + "_" + j; // 在字符串后面添加分隔符号
          a.push(value);
          if (!answer[i]) answer[i] = [];
          answer[i][j] = 0;
        }
      }
      //console.log(a);
      shuffle(a);
      //console.log(a);
      for (let i = 0; i < bomb; i++) {
        if (a[i] == posx + "_" + posy) {
          bomb++;
          continue;
        }
        let temp = a[i].split("_");
        answer[temp[0]][temp[1]] = 1;
        console.log("bomb");
      }
    }
    resectbomb();
    //console.log(bomb);
    //console.log(x,y);
    //console.log(answer);
  }
  senser_creatanswer = false;
}
//確認周圍有多少炸彈
function clickCall(posX, posY) {
  let tablelenx = document.getElementById("long").value; //遊戲區塊 X
  let tebleleny = document.getElementById("wide").value; //遊戲區塊 Y
  posX = posX--;
  posY = posY--;
  if (flag == true) {
  //console.log(posX, posY);
  if (answer[posX][posY] == 1)
    return (flag = false), (timestop = true), ending(), bombsound();//遊戲失敗執行
    let bombcount = 0;
    for (
      let i = posX == 0 ? 0 : posX - 1;
      i <= (posX == tablelenx - 1 ? tablelenx - 1 : posX + 1);
      i++
    ) {
      for (
        let j = posY == 0 ? 0 : posY - 1;
        j <= (posY == tebleleny - 1 ? tebleleny - 1 : posY + 1);
        j++
      ) {
        if (answer[i][j] == 1) bombcount++;
      }
    }
    if (bombcount == 0) bombcount = "0️⃣";
    if (bombcount == 1) bombcount = "1️⃣";
    if (bombcount == 2) bombcount = "2️⃣";
    if (bombcount == 3) bombcount = "3️⃣";
    if (bombcount == 4) bombcount = "4️⃣";
    if (bombcount == 5) bombcount = "5️⃣";
    if (bombcount == 6) bombcount = "6️⃣";
    if (bombcount == 7) bombcount = "7️⃣";
    if (bombcount == 8) bombcount = "8️⃣";
    //console.log(posX,posY)
    document.getElementById(posX + "_" + posY).innerHTML = bombcount;
    if (Vactory()) {
      flag = false;
      timestop = true;
      winner();
      // 執行遊戲成功的相應操作
    }
  }
}

function Vactory() {
  let x = parseInt(document.getElementById("long").value, 10);
  let y = parseInt(document.getElementById("wide").value, 10);
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (answer[i][j] === 0 && document.getElementById(i + "_" + j).innerText === "❓") {
        return false;
      }
    }
  }
  return true;
}

//遊戲勝利
function winner() {
  document.getElementById("game_ending").innerHTML = "Winner";
}

//遊戲失敗
function ending() {
  document.getElementById("game_ending").innerHTML = "GameOver";
  let x = parseInt(document.getElementById("long").value, 10);
  let y = parseInt(document.getElementById("wide").value, 10);
  //console.log(x,y)
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (answer[i][j] == 1) {
        document.getElementById(i + "_" + j).innerHTML = "💣";
        //console.log("💣");
      }
      if(answer[i][j] == 0 && document.getElementById(i + "_" + j).innerText == "🏴"){
        document.getElementById(i + "_" + j).innerHTML = "❌";
        //console.log("❌")
      }
    }
  }
}

//開始計時
let clickbutton = false;
function timer_start(event) {
  //console.log(event.button);
  if (event.button == 0 && clickbutton == false) {
    clickbutton = true;
    Elapsed_time();
  }
}

//經過時間
function Elapsed_time() {
  let time = 0;
  let timer = setInterval(() => {
    //console.log("1s");
    document.getElementById("time").innerHTML = "經過時間：" + time;
    time++;
    if (timestop == true) {
      clearTimeout(timer);
    }
  }, 1000);
}

//重新開始
function resectgame() {
  let x = parseInt(document.getElementById("long").value, 10);
  let y = parseInt(document.getElementById("wide").value, 10);
  document.getElementById("game_ending").innerHTML = "";
  //重製遊戲版面
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      document.getElementById(i + "_" + j).innerHTML = "❓";
      //console.log("❓");
    }
  }
  //重製答案
  answer = [];
  senser_creatanswer = true;
  //console.log(answer);
  //重製時間
  document.getElementById("time").innerHTML = "經過時間：0";
  timestop = false;
  clickbutton = false;
  //檢查是否可繼續遊玩
  flag = false;
  //sconsole.log(flag);
}

//炸彈爆炸聲音
function bombsound() {
  const bombsound = new Audio('bomb.mp3');
  bombsound.play();
}
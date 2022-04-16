// 랜덤하게 바뀌어서 유저가 누르길 기다리는 가위바위보 이미지
let imgArray = new Array();
imgArray[0] = "rock.png";
imgArray[1] = "scissor.png";
imgArray[2] = "paper.png";

function showImage() {
  let imgNum = Math.round(Math.random()*2);
  let orgImg = document.getElementById("randomimg");
  orgImg.src = imgArray[imgNum];
}

showImage();

let timerId = setTimeout(function tick() {
  showImage();
  timerId = setTimeout(tick, 1000); 
},1000);

function gamestart() {
  // step1. 유저가 누르면 눌렀을 때의 이미지가 유저의 선택이 됨
  let uc = document.getElementById("randomimg")
  let ucstr = uc.src;
  let u1 = ucstr.lastIndexOf("/");
  let u2 = ucstr.indexOf("png");
  let up = ucstr.slice(u1+1, u2-1); //userpick

    // step2. 유저의 선택이 끝나면 랜덤하게 컴퓨터도 하나 고름
    let imgNum = Math.round(Math.random()*2);
    let cc = document.getElementById("comimg");
    comimg.src = imgArray[imgNum];
    let ccstr = cc.src;
    let c1 = ccstr.lastIndexOf("/");
    let c2 = ccstr.indexOf("png");
    let cp = ccstr.slice(c1+1, c2-1); //computerpick
}

function convertType(pick) {
  if(pick == "scissor"){
    return 0;
  }
  else if (pick == "rock") {
    return 1;
  }
  else{
    return 2;
  }
}

function match(up, cp) {
  let userpoint = document.getElementById("user");
  let compoint = document.getElementById("computer");

  let upt = Number(userpoint.innerHTML);
  let cpt = Number(compoint.innerHTML);
  if(up == cp) {
    return;
  }
  else{
    if(up == 2){ //유저가 보
      (cp == 1) ? upt+=1 : cpt+=1; //컴퓨터가 바위면 유저 승 컴퓨터가 가위면 컴퓨터 승
    }else if(up == 1) { //유저가 바위
      (cp == 0) ? upt+=1 : cpt +=1; //컴퓨터가 가위면 유저가 승 컴퓨터가 보면 컴퓨터 승
    }else{ // 유저가 가위
      (cp == 2) ? upt+=1 : cpt += 1; //컴퓨터가 보면 유저 승 컴퓨터가 바위면 컴퓨터 승
    }
  }
  userpoint.innerHTML = upt;
  compoint.innerHTML = cpt;
  
}
// 가위-바위-보 순서대로 보여주는 유저 선택용 가위바위보 이미지
let imgArray = new Array();
let imageNum = 0;
imgArray[0] = "scissor.png";
imgArray[1] = "rock.png";
imgArray[2] = "paper.png";

function showImage() {
  let orgImg = document.getElementById("randomimg");
  orgImg.src = imgArray[imageNum%3];
  imageNum++;
}

showImage();

var timerId = setTimeout(function tick() {
  showImage();
  timerId = setTimeout(tick, 1000); 
},1000);

//let timerId = setInterval(showImage,300);

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

    // step3. 유저와 컴퓨터의 승부를 가려서 점수를 표시
    up = convertType(up);
    cp = convertType(cp);
    
    //showImage 멈춘 후 점수 표시
    clearTimeout(timerId);
    match(up, cp);

    //showImage() 3초 후 재개
    setTimeout(()=>{
      timerId = setInterval(showImage,1000);
    },3000);
}
userpick = document.getElementById("randomimg");
userpick.addEventListener("click", gamestart);

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
    Swal.fire('Draw!')
    return;
  }
  else{
    if(up == 2){ //유저가 보
      //컴퓨터가 바위면 유저 승 컴퓨터가 가위면 컴퓨터 승
      if(cp==1){
        Swal.fire('You Win!')
        upt+=1
      }
      else{
        Swal.fire('You Lose!')
        cpt+=1
      }

    }else if(up == 1) { //유저가 바위
      //컴퓨터가 가위면 유저가 승 컴퓨터가 보면 컴퓨터 승
      if(cp == 0){
        Swal.fire('You Win!')
        upt+=1  
      } 
      else{
        Swal.fire('You Lose!')
        cpt +=1
      }
    }else{ // 유저가 가위
      //컴퓨터가 보면 유저 승 컴퓨터가 바위면 컴퓨터 승
      if(cp == 2){
        Swal.fire('You Win!')
        upt+=1
      }
      else{
        Swal.fire('You Lose!')
        cpt += 1
      }
    }
  }

  userpoint.innerHTML = upt;
  compoint.innerHTML = cpt;
  
}

//버튼을 누르면 점수가 0 : 0으로  초기화
function setInitialization() {
  let userscore = document.getElementById("user");
  let comscore = document.getElementById("computer");
  userscore.innerHTML = 0;
  comscore.innerHTML = 0;
  window.location.reload()
}

mybutton = document.getElementById("mybutton")
mybutton.addEventListener("click", setInitialization)

Swal.fire({
  icon : 'info',
  title: '게임 룰',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  },
  html :  
  "좌측 이미지는 가위,바위,보 순서로 1초마다 바뀝니다.<br>사용자는 좌측 이미지를 눌러 패를 선택합니다.<br>사용자의 선택이 끝나면 컴퓨터가 패를 정합니다.<br>둘의 승부를 가려 점수를 집계합니다.<br>승부를 가린 후엔 3초간 쉬는시간을 가지고 다시 게임이 재개됩니다.<br>reset 버튼을 누르면 점수가 초기화되고 게임이 다시 로딩됩니다.",
  
})
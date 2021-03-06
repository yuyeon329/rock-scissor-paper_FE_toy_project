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
let comborder = document.querySelector(".com");
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
    },2000);

}
userpick = document.getElementById("randomimg");
userpick.addEventListener("click", gamestart);

// 유저가 패를 선택할 때마다 컴퓨터는 무엇을 선택했는지 알아보기 쉽게 테두리 효과 부여
userpick.addEventListener("click", function(){
      setTimeout(()=>{
        comborder.classList.add('clicked');
      },0);

      setTimeout(()=>{
        comborder.classList.remove('clicked');
      },1000);
})

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

let gResult = document.getElementById("gameResult")

function match(up, cp) {
  let userpoint = document.getElementById("user");
  let compoint = document.getElementById("computer");

  let upt = Number(userpoint.innerHTML);
  let cpt = Number(compoint.innerHTML);
  if(up == cp) {
    setTimeout(()=>{
      gResult.innerHTML = "Draw!"
    },0);

    setTimeout(()=>{
      gResult.innerHTML = ""
    },1000);
    return;
  }
  else{
    if(up == 2){ //유저가 보
      //컴퓨터가 바위면 유저 승 컴퓨터가 가위면 컴퓨터 승
      if(cp==1){
        upt+=1
        setTimeout(()=>{
          gResult.innerHTML = "You Win!"
        },0);
  
        setTimeout(()=>{
          gResult.innerHTML = ""
        },1000);
      }
      else{
        cpt+=1
        setTimeout(()=>{
          gResult.innerHTML = "You Lose!"
        },0);
  
        setTimeout(()=>{
          gResult.innerHTML = ""
        },1000);
      }

    }else if(up == 1) { //유저가 바위
      //컴퓨터가 가위면 유저가 승 컴퓨터가 보면 컴퓨터 승
      if(cp == 0){
        upt+=1  
        setTimeout(()=>{
          gResult.innerHTML = "You Win!"
        },0);
  
        setTimeout(()=>{
          gResult.innerHTML = ""
        },1000);
      } 
      else{
        cpt +=1
        setTimeout(()=>{
          gResult.innerHTML = "You Lose!"
        },0);
  
        setTimeout(()=>{
          gResult.innerHTML = ""
        },1000);
      }
    }else{ // 유저가 가위
      //컴퓨터가 보면 유저 승 컴퓨터가 바위면 컴퓨터 승
      if(cp == 2){
        upt+=1
        setTimeout(()=>{
          gResult.innerHTML = "You Win!"
        },0);
  
        setTimeout(()=>{
          gResult.innerHTML = ""
        },1000);
      }
      else{
        cpt += 1
        setTimeout(()=>{
          gResult.innerHTML = "You Lose!"
        },0);
  
        setTimeout(()=>{
          gResult.innerHTML = ""
        },1000);
      }
    }
  }

  if(upt>99 || cpt>99){
    let score = document.querySelector(".score")
    score.classList.add("smaller");
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

  let timerInterval
  Swal.fire({
    title: '게임이 다시 시작됩니다!',
    html: '게임이 <b></b>초 뒤에 시작됩니다!',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = parseInt(Swal.getTimerLeft()/1000)
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}

mybutton = document.getElementById("mybutton")
mybutton.addEventListener("click", setInitialization)

Swal.fire({
  icon : 'info',
  title: '왼쪽의 이미지를 눌러서 컴퓨터와 겨뤄보세요!',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
  
})

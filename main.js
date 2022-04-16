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

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

}
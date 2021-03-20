//スライドショーの配列
const images = [
  "img/bk-1.JPG",
  "img/bk-2.JPG",
  "img/bk-3.JPG",
  "img/bk-4.jpg",
  "img/bk-5.jpg",
  "img/bk-6.JPG",
  "img/bk-7.jpg",
  "img/bk-8.jpg",
];
//スライド
let count = 0;
const slideimage = () => {
  if (count >= images.length) {
    count = 0;
  } else {
    document.getElementById("top").style.backgroundImage =
      "url(" + images[count] + ")";
    count++;
  }
};

const slidestart = () => {
  setInterval(slideimage, 2000);
};
setTimeout(slidestart, 0);

//ヘッダーの高さを取得
let head = document.getElementById("header").offsetHeight;
//document.body.style.marginTop = head + "px";

//スムーススクロール関数
let smoothScroll = (target, offset) => {
  let toY;
  let nowY = window.pageYOffset; //現在のスクロール値
  const divisor = 32; //近づく割合
  const range = divisor / 2 + 1; //処理終了

  //ターゲットの座標
  const targetRect = target.getBoundingClientRect(); //ターゲットの座標取得
  const targetY = targetRect.top + nowY - offset; //現在のスクロール値とヘッダーの高さを踏まえた座標
  //スクロール終了まで繰り返す処理
  (function () {
    let thisFunc = arguments.callee; //自信を呼び出すために変数に代入
    toY = nowY + Math.round((targetY - nowY) / divisor); //次に移動する場所
    window.scrollTo(0, toY); //スクロールさせる
    nowY = toY; //nowY更新

    if (document.body.clientHeight - window.innerHeight < toY) {
      //最下部にスクロールしても対象に届かないとき下限までスクロールして強制終了
      window.scrollTo(0, document.body.clientHeight);
      return;
    }
    if (toY >= targetY + range || toY <= targetY - range) {
      //+-rangeの範囲内へ近くまで繰り返す
      window.setTimeout(thisFunc, 10);
    } else {
      //+-rangeの範囲内に来れば正確な値へ移動して終了
      window.scrollTo(0, targetY);
    }
  })();
};

//アンカータグにクリックイベントを登録
const smoothOffset = head; //変数に高さを入れておく
const links = document.querySelectorAll('a[href*="#"]'); //#が含まれるaタグを全て取得
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => {
    const href = e.currentTarget.getAttribute("href"); //href取得
    const splitHref = href.split("#");
    const targetID = splitHref[1];
    const target = document.getElementById(targetID); //リンク先の要素取得

    if (target) {
      smoothScroll(target, smoothOffset);
    } else {
      return true;
    }
    return false;
  });
}
//fedin
const screenOffset = window.innerHeight / 2;

const elements = document.getElementsByClassName("fadein");
for (let element of elements) {
  window.addEventListener("scroll", () => {
    if (window.scrollY + screenOffset > element.offsetTop) {
      element.classList.add("is-active");
    }
  });
}

//portfolioモーダルウィンドウ
const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("modal");
const mask = document.getElementById("mask");

open.addEventListener("click", () => {
  modal.classList.remove("hidden");
  mask.classList.remove("hidden");
});
close.addEventListener("click", () => {
  modal.classList.add("hidden");
  mask.classList.add("hidden");
});
mask.addEventListener("click", () => {
  modal.classList.add("hidden");
  mask.classList.add("hidden");
});

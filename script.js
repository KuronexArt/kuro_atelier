// 이미지 확대 보기
// .zoom 버튼 안의 이미지를 클릭하면 화면 가득 크게 보여줍니다.
// 닫기: 바깥(또는 이미지) 클릭, × 버튼, Esc 키

(function () {
  const lightbox = document.getElementById('lightbox');
  const bigImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  let lastFocus = null;

  function open(img) {
    lastFocus = document.activeElement;
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    bigImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.zoom').forEach(function (btn) {
    btn.addEventListener('click', function () {
      open(btn.querySelector('img'));
    });
  });

  lightbox.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });
})();

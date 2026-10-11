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

// 예상 견적: 수량 × (장착 + 선택된 물리·닐로툰·텍스처링)
(function () {
  const section = document.querySelector('#estimate');
  if (!section) return;
  const rows = Array.from(section.querySelectorAll('tbody tr'));
  const won = n => n.toLocaleString('ko-KR') + '원';
  function calculate() {
    let total = 0, count = 0;
    const detail = [];
    rows.forEach(row => {
      const qtyInput = row.querySelector('input[type="number"]');
      const qty = Math.max(0, Math.min(999, Number.parseInt(qtyInput.value, 10) || 0));
      const [physics, nilo, texture] = row.querySelectorAll('input[type="checkbox"]');
      const rate = Number(row.dataset.fit) + (physics.checked ? (row.dataset.type === 'hair' ? 10000 : 15000) : 0) + (nilo.checked ? Number(row.dataset.nilo) : 0) + (texture.checked ? 5000 : 0);
      if (qty) {
        const name = row.querySelector('th').textContent.trim().replace(/\s+/g, ' ');
        total += qty * rate;
        count += qty;
        detail.push(name + ' ' + qty + '개 × ' + won(rate) + ' = ' + won(qty * rate));
      }
    });
    if (section.querySelector('#estimate-collider').checked) { total += 50000; detail.push('바디 정밀 콜라이더 +50,000원'); }
    section.querySelector('#estimate-total').textContent = won(total) + (count ? '부터' : '');
    section.querySelector('#estimate-count').textContent = count + '개';
    section.querySelector('#estimate-breakdown').textContent = detail.length ? detail.join('\n') : '항목의 수량을 입력해 주세요.';
  }
  section.addEventListener('input', calculate);
  section.addEventListener('change', calculate);
  section.querySelector('#estimate-reset').addEventListener('click', () => {
    rows.forEach(row => {
      row.querySelector('input[type="number"]').value = '0';
      row.querySelectorAll('input[type="checkbox"]').forEach(c => { c.checked = true; });
    });
    section.querySelector('#estimate-collider').checked = false;
    calculate();
  });
  calculate();
})();

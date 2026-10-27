  // entrances: once, staggered through --i
  (function () {
    var els = document.querySelectorAll('.rise');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('on'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }); }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    // быстрая прокрутка или переход по якорю: всё, что осталось выше нижней границы экрана, уже показано
    var ticking = false;
    function sweep() { ticking = false; var h = window.innerHeight; els.forEach(function (e) { if (!e.classList.contains('on') && e.getBoundingClientRect().top < h * 0.94) { e.classList.add('on'); io.unobserve(e); } }); }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } }, { passive: true });
  })();

  // live thing: pick who and what, read what the first training looks like
  (function () {
    var out = document.getElementById('pick-out');
    var hall = { box: 'зал с рингом', mma: 'отдельный зал с клеткой' };
    function show() {
      var who = document.querySelector('input[name=who]:checked').value, what = document.querySelector('input[name=what]:checked').value;
      out.textContent = (who === 'kid' ? 'Ребёнок, ' : 'Взрослый, ') + (what === 'box' ? 'бокс' : 'ММА') + ': ' + hall[what] + ', 3 этаж. Первая тренировка с Виталием Сотниковым. Дни, время и цена: уточняются (демо).';
    }
    document.getElementById('pick').addEventListener('change', show); show();
  })();

  // demo form: nothing is sent
  document.getElementById('lead').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, msg = document.getElementById('lead-msg');
    if (!f.name.value.trim() || f.phone.value.replace(/\D/g, '').length < 10) { msg.textContent = 'Укажите имя и телефон.'; return; }
    msg.textContent = 'Демо: форма не отправляет заявки. В рабочей версии она придёт клубу.';
  });

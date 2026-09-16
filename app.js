// One quiet reveal-on-scroll pass, not per-card hover flourishes
if ('IntersectionObserver' in window) {
  var revealTargets = document.querySelectorAll(
    '.section > .wrap > *, .post, .qa-item, .faq-item, .product-card, .shot-row'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(function (el) { io.observe(el); });
}

// Copy-to-clipboard fallback for anyone without a default mail app
document.querySelectorAll('.copy-email').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var email = btn.getAttribute('data-email');
    var original = btn.textContent;
    navigator.clipboard.writeText(email).then(function () {
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = original; }, 1800);
    }).catch(function () {
      window.prompt('Copy this email address:', email);
    });
  });
});

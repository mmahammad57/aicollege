// mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // application form submission (Formspree)
  const applyForm = document.getElementById('applyForm');
  if (applyForm) {
    const statusEl = document.getElementById('formStatus');
    const submitBtn = applyForm.querySelector('.btn-primary');
    const originalBtnText = submitBtn.textContent;

    applyForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (applyForm.action.includes('YOUR_FORM_ID')) {
        statusEl.textContent = 'Form hələ qoşulmayıb: Formspree ID əlavə edilməlidir.';
        statusEl.style.color = '#C0392B';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Göndərilir...';
      statusEl.textContent = '';

      try {
        const response = await fetch(applyForm.action, {
          method: 'POST',
          body: new FormData(applyForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          submitBtn.textContent = 'Göndərildi ✓';
          statusEl.style.color = 'var(--teal)';
          statusEl.textContent = 'Təşəkkürlər! Komandamız tezliklə sizinlə əlaqə saxlayacaq.';
          applyForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        submitBtn.textContent = originalBtnText;
        statusEl.style.color = '#C0392B';
        statusEl.textContent = 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.';
      } finally {
        submitBtn.disabled = false;
        if (submitBtn.textContent === 'Göndərilir...') submitBtn.textContent = originalBtnText;
      }
    });
  }

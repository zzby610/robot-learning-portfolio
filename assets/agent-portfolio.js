(() => {
  'use strict';

  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('.demo-panel')];
  function showTab(name, focus = false) {
    const active = tabs.find(tab => tab.dataset.tab === name);
    if (!active) return;
    tabs.forEach(tab => {
      const selected = tab === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      const selected = panel.id === `panel-${name}`;
      if (!selected) panel.querySelectorAll('video').forEach(video => video.pause());
      panel.hidden = !selected;
    });
    if (focus) active.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showTab(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      showTab(tabs[next].dataset.tab, true);
    });
  });

  document.querySelectorAll('[data-show-demo]').forEach(link => {
    link.addEventListener('click', () => showTab(link.dataset.showDemo));
  });

  const dialog = document.querySelector('.lightbox');
  const dialogImage = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const original = document.getElementById('lightbox-original');
  let opener = null;
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;
      event.preventDefault();
      opener = link;
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector('img')?.alt || link.dataset.caption || 'Project image';
      caption.textContent = link.dataset.caption || '';
      original.href = link.href;
      dialog.showModal();
      document.body.classList.add('modal-open');
      dialog.querySelector('button').focus();
    });
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (opener) opener.focus({ preventScroll: true });
  });

  const navLinks = [...document.querySelectorAll('.site-header nav a')];
  function updateActiveNav() {
    const threshold = window.scrollY + 180;
    let current = null;
    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section && section.offsetTop <= threshold) current = link;
    });
    navLinks.forEach(link => {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(() => { updateActiveNav(); scheduled = false; });
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.querySelectorAll('video').forEach(video => video.pause());
  });
})();

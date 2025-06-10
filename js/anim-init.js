(() => {

  const choice = localStorage.getItem('anim-toggle-choice');
  const docEl = document.documentElement;

  if (!choice) {
    docEl.style.overflow = 'hidden';
  } else {
    docEl.style.overflow = '';
    if (choice === 'allowed') {
      docEl.classList.remove('anim-deactivated');
    } else {
      docEl.classList.add('anim-deactivated');
    }
  }

  // Modal-HTML als erstes Kind von <body> einfügen
  document.addEventListener('DOMContentLoaded', () => {
    const modalHTML = `
      <div id="anim-toggle-modal" role="dialog" aria-labelledby="anim-modal-title" aria-describedby="anim-modal-desc" style="display: none;">
        <div id="anim-toggle-modal-content">
          <span class="h2" id="anim-modal-title">Anima&shy;tion</span>
          <p id="anim-modal-desc">Die Seite verwendet einige Anima&shy;tionen, um Inhalte natürlich und lese&shy;unter&shy;stützend anzuzeigen.</p>
          <p id="anim-modal-desc">Falls Sie dennoch keine Animationen wünschen, können Sie dies hier unten ausstellen.<br><small><em>Die Ein&shy;stellung kann jeder&shy;zeit geändert werden.</em></small></p>
          <button id="anim-allow" aria-label="Ja">Ja</button>
          <button id="anim-decline" aria-label="Ja">Nein</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', modalHTML);
  });
})();
$(document).ready(function () {
  $('body').removeClass('no-js');

  // Dem Body-Element das aktuelle Path-Attribut hinzufügen
  $('body').attr('data-path', window.location.pathname);

  // Header-Scroll-Handler
  setInterval(function () {
    if ($(window).scrollTop() > 1) {
      $('#main-navigation').addClass('scrolled');
    } else {
      $('#main-navigation').removeClass('scrolled');
    }
  }, 300);

  const modal = $('#anim-toggle-modal');
  const body = $('body');
  const html = $('html');
  const storageChoiceKey = 'anim-toggle-choice';
  const storageStateKey = 'anim-toggle-state';
  const button = $('#anim-stop');

  function clearButtonExceptStatus() {
    button.children().not('#status-message').remove();
  }

  function updateButton(state) {
    clearButtonExceptStatus();
    if (state === 'on') {
      button
        .removeClass('off').addClass('on')
        .append('<span>Animation abspielen</span>')
        .append('<img src="svg/play circle.svg" alt="Symbol von \'Animation abspielen\'" />');
      body.addClass('anim-deactivated');
    } else {
      button
        .removeClass('on').addClass('off')
        .append('<span>Animation stoppen</span>')
        .append('<img src="svg/pause circle.svg" alt="Symbol von \'Animation stoppen\'" />');
      body.removeClass('anim-deactivated');
    }
    localStorage.setItem(storageStateKey, state);
  }

  const savedChoice = localStorage.getItem(storageChoiceKey);
  const savedState = localStorage.getItem(storageStateKey);
  const initialState = savedState === 'off' ? 'off' : 'on';
  updateButton(initialState);

  // Wenn eine Entscheidung bereits getroffen wurde, Inhalt sofort zeigen
  if (savedChoice) {
    body.removeClass('content-hidden');
  }

  // Modal nur anzeigen, wenn noch keine Entscheidung getroffen wurde
  if (!savedChoice) {
    modal.css('display', 'flex');
  }

  // Modal-Button-Handler
  $('#anim-allow').on('click', function () {
    body.removeClass('anim-deactivated');
    localStorage.setItem(storageChoiceKey, 'allowed');
    updateButton('off');
    modal.fadeOut();
    html.css('overflow', '');
    body.removeClass('content-hidden');
  });

  $('#anim-decline').on('click', function () {
    body.addClass('anim-deactivated');
    localStorage.setItem(storageChoiceKey, 'declined');
    updateButton('on');
    modal.fadeOut();
    html.css('overflow', '');
    body.removeClass('content-hidden');
  });

  // Klick-Handler für den Button
  button.on('click', function () {
    const newState = button.hasClass('on') ? 'off' : 'on';
    updateButton(newState);
  });

  // Scroll-Effekt-Handler für .scroll-effect
  $('.scroll-effect').removeClass('visible');
  let hasBeenVisibleScrollEffect = [];

  setInterval(function () {
    var animStopTop = $('#anim-stop').offset().top - $(window).scrollTop();

    $('.scroll-effect').each(function (index) {
      if (!hasBeenVisibleScrollEffect[index]) {
        var scrollEffectTop = $(this).offset().top - $(window).scrollTop();
        if ((animStopTop - 100) > scrollEffectTop) {
          $(this).addClass('visible');
          hasBeenVisibleScrollEffect[index] = true;
        }
      }
    });
  }, 300);

  // Scroll-Effekt-Handler für .global-scroll
  $('.global-scroll').removeClass('visible');
  let hasBeenVisibleGlobalScroll = [];

  setInterval(function () {
    $('.global-scroll').each(function (index) {
      if (!hasBeenVisibleGlobalScroll[index]) {
        var elementTop = $(this).offset().top;
        var viewportBottom = $(window).scrollTop() + $(window).height();
        if (viewportBottom >= (elementTop + 100)) {
          $(this).addClass('visible');
          hasBeenVisibleGlobalScroll[index] = true;
        }
      }
    });
  }, 300);
});


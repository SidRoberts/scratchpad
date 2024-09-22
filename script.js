/* global $, hotkeys */

class State {
  static get () {
    $('#content').css(
      'font-size',
      window.localStorage.getItem('fontSize')
    )

    if (window.localStorage.getItem('textAlign')) {
      $('body').attr(
        'class',
        window.localStorage.getItem('textAlign')
      )
    }

    if (window.localStorage.getItem('darkMode')) {
      $('body').addClass('dark-mode')
    }

    $('#content').css(
      'column-count',
      window.localStorage.getItem('columnCount')
    )

    $('#content').html(
      window.localStorage.getItem('content')
    )
  }

  static save () {
    window.localStorage.setItem(
      'textAlign',
      $('body').attr('class')
    )

    window.localStorage.removeItem('darkMode')

    if ($('body').hasClass('dark-mode')) {
      window.localStorage.setItem(
        'darkMode',
        true
      )
    }

    window.localStorage.setItem(
      'fontSize',
      $('#content').css('font-size')
    )

    window.localStorage.setItem(
      'columnCount',
      $('#content').css('column-count')
    )

    window.localStorage.setItem(
      'content',
      $('#content').html()
    )
  }

  static reset () {
    window.localStorage.removeItem('fontSize')
    window.localStorage.removeItem('textAlign')
    window.localStorage.removeItem('darkMode')
    window.localStorage.removeItem('columnCount')
    window.localStorage.removeItem('content')

    window.location.reload()
  }
}

$(document).ready(
  function () {
    $('#content').focus()

    State.get()
  }
)

$('#content').on('keyup cut paste', State.save)

const changeAlignment = function (newAlign) {
  $('body').removeClass('align-left align-center align-right align-justify')
  $('body').addClass('align-' + newAlign)

  State.save()
}

const incrementFontSize = function (increment) {
  $('#content').css(
    'font-size',
    function () {
      const oldFontSize = parseInt($(this).css('font-size'))

      let newFontSize = (oldFontSize + increment)

      if (newFontSize < 1) {
        newFontSize = oldFontSize
      }

      return newFontSize + 'px'
    }
  )

  State.save()
}

const iterateColumnCount = function () {
  let columnCount = parseInt(
    $('#content').css('column-count')
  )

  if (isNaN(columnCount)) {
    columnCount = 1
  }

  columnCount = (columnCount % 3) + 1

  $('#content').css('column-count', columnCount)

  State.save()
}

const toggleDarkMode = function () {
  $('body').toggleClass('dark-mode')

  State.save()
}

$('.align-button').on(
  'click',
  function () {
    const newAlign = $(this).data('align')

    changeAlignment(newAlign)
  }
)

$('.size-button').on(
  'click',
  function () {
    const increment = parseInt($(this).data('increment'))

    incrementFontSize(increment)
  }
)

$('#columns').on(
  'click',
  function () {
    iterateColumnCount()
  }
)

$('#fullscreen').on(
  'click',
  function () {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.body.parentElement.requestFullscreen()
    }
  }
)

$('#darkMode').on(
  'click',
  function () {
    toggleDarkMode()
  }
)

$('#reset').on(
  'click',
  function () {
    State.reset()
  }
)

$('main').on(
  'click',
  function () {
    $('#content').focus()
  }
)

hotkeys.filter = function (event) {
  const tagName = (event.target || event.srcElement).tagName

  return !(tagName.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA')
}

hotkeys(
  'ctrl+alt+1,command+option+1',
  function (event, handler) {
    changeAlignment('left')
  }
)

hotkeys(
  'ctrl+alt+2,command+option+2',
  function (event, handler) {
    changeAlignment('center')
  }
)

hotkeys(
  'ctrl+alt+3,command+option+3',
  function (event, handler) {
    changeAlignment('right')
  }
)

hotkeys(
  'ctrl+alt+4,command+option+4',
  function (event, handler) {
    changeAlignment('justify')
  }
)

hotkeys(
  'ctrl+alt+\\,command+option+\\',
  function (event, handler) {
    iterateColumnCount()
  }
)

hotkeys(
  'ctrl+alt+=,command+alt+=',
  function (event, handler) {
    incrementFontSize(+10)
  }
)

hotkeys(
  'ctrl+alt+-,command+option+-',
  function (event, handler) {
    incrementFontSize(-10)
  }
)

hotkeys(
  'ctrl+alt+esc,command+option+esc',
  function (event, handler) {
    State.reset()
  }
)

hotkeys(
  'ctrl+alt+/,command+option+/',
  function (event, handler) {
    $('#icons').toggle()
  }
)

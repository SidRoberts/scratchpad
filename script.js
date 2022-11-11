/* global $, hotkeys */

function State () {
  this.get = function () {
    $('#content').css(
      'font-size',
      window.localStorage.getItem('fontSize')
    )

    $('body').attr(
      'class',
      window.localStorage.getItem('textAlign')
    )

    $('#content').css(
      'column-count',
      window.localStorage.getItem('columnCount')
    )

    $('#content').html(
      window.localStorage.getItem('content')
    )
  }

  this.save = function () {
    window.localStorage.setItem(
      'textAlign',
      $('body').attr('class')
    )

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
}

const state = new State()

$(document).ready(
  function () {
    $('#content').focus()

    state.get()
  }
)

$('#content').on('keyup cut paste', state.save)

const changeAlignment = function (newAlign) {
  $('body').removeClass('align-left align-center align-right align-justify')
  $('body').addClass('align-' + newAlign)

  state.save()
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

  state.save()
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

  state.save()
}

const reset = function () {
  window.localStorage.removeItem('fontSize')
  window.localStorage.removeItem('textAlign')
  window.localStorage.removeItem('columnCount')
  window.localStorage.removeItem('content')

  window.location.reload()
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

$('#reset').on(
  'click',
  function () {
    reset()
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
    reset()
  }
)

hotkeys(
  'ctrl+alt+/,command+option+/',
  function (event, handler) {
    $('#icons').toggle()
  }
)

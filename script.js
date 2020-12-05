/* global $ */

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

var state = new State()

$(document).ready(
  function () {
    $('#content').focus()

    state.get()
  }
)

$('#content').on('keyup cut paste', state.save)

$('.align-button').on(
  'click',
  function () {
    newAlign = $(this).data('align')

    $('body').removeClass('align-left align-center align-right align-justify')
    $('body').addClass('align-' + newAlign)
  }
)

$('#sizePlus').on(
  'click',
  function () {
    $('#content').css(
      'font-size',
      function () {
        var oldFontSize = parseInt($(this).css('font-size'))

        var newFontSize = (oldFontSize + 10)

        return newFontSize + 'px'
      }
    )
  }
)

$('#sizeMinus').on(
  'click',
  function () {
    $('#content').css(
      'font-size',
      function () {
        var oldFontSize = parseInt($(this).css('font-size'))

        var newFontSize = (oldFontSize - 10)

        if (newFontSize < 1) {
          newFontSize = oldFontSize
        }

        return newFontSize + 'px'
      }
    )
  }
)

$('#columns').on(
  'click',
  function () {
    var columnCount = parseInt(
      $('#content').css('column-count')
    )

    if (isNaN(columnCount)) {
      columnCount = 1
    }

    columnCount = (columnCount % 3) + 1

    $('#content').css('column-count', columnCount)
  }
)

$('button').not('#fullscreen, #reset').on('click', state.save)

$('#fullscreen').on(
  'click',
  function () {
    if (document.fullscreen) {
      document.exitFullscreen()
    } else {
      document.body.parentElement.requestFullscreen()
    }
  }
)

$('#reset').on(
  'click',
  function () {
    window.localStorage.removeItem('fontSize')
    window.localStorage.removeItem('textAlign')
    window.localStorage.removeItem('columnCount')
    window.localStorage.removeItem('content')

    window.location.reload()
  }
)

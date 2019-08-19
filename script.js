/* global $ */

function State () {
  this.get = function () {
    $('#content').css(
      'font-size',
      window.localStorage.getItem('fontSize')
    )

    $('#content').css(
      'text-align',
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
      $('#content').css('text-align')
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

$('#leftAlign').on(
  'click',
  function () {
    $('#content').css('text-align', 'left')
  }
)

$('#centerAlign').on(
  'click',
  function () {
    $('#content').css('text-align', 'center')
  }
)

$('#rightAlign').on(
  'click',
  function () {
    $('#content').css('text-align', 'right')
  }
)

$('#justifyAlign').on(
  'click',
  function () {
    $('#content').css('text-align', 'justify')
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

    columnCount += 1

    if (columnCount > 3) {
      columnCount = 1
    }

    $('#content').css('column-count', columnCount)
  }
)

$('button').not('#reset').on('click', state.save)

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

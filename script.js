/* global $, hotkeys */

import Cursor from './js/cursor.js'

import State from './js/state.js'

import Blocks from './js/blocks.js'

$(document).ready(
  function () {
    State.get()
  }
)

$('#content').on('keyup cut paste', State.save)

const changeAlignment = function (newAlign) {
  $('body').removeClass('align-start align-center align-end align-justify')
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

hotkeys.filter = function (event) {
  const tagName = (event.target || event.srcElement).tagName

  return !(tagName.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA')
}

hotkeys(
  'ctrl+alt+1,command+option+1',
  function (event, handler) {
    changeAlignment('start')
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
    changeAlignment('end')
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
    $('body > header').toggle()
  }
)

hotkeys(
  'up,left',
  function (event, handler) {
    const block = (event.target || event.srcElement)

    const cursorPosition = Cursor.getPosition(block)

    if (cursorPosition === -1) {
      return true
    }

    if (cursorPosition.focus > 0) {
      return true
    }

    const previousBlock = block.previousElementSibling

    if (!previousBlock) {
      return true
    }

    Blocks.focusBlock(previousBlock, -1)

    return false
  }
)

hotkeys(
  'down,right',
  function (event, handler) {
    const block = (event.target || event.srcElement)

    const cursorPosition = Cursor.getPosition(block)

    if (cursorPosition === -1) {
      return true
    }

    if (cursorPosition.focus < block.textContent.trimEnd('\n').length) {
      return true
    }

    const nextBlock = block.nextElementSibling

    if (!nextBlock) {
      return true
    }

    Cursor.setPosition(nextBlock, 0, 0)

    return false
  }
)

hotkeys(
  'enter',
  function (event, handler) {
    const block = (event.target || event.srcElement)

    const cursorPosition = Cursor.getPosition(block)

    if (cursorPosition === -1) {
      return true
    }

    const keepInThisBlock = block.textContent.substring(0, cursorPosition.min)
    const moveToNextBlock = block.textContent.substring(cursorPosition.max)

    const newBlockTag = (block.tagName === 'LI') ? 'li' : 'text'

    let nextBlock = Blocks.makeNewBlock(newBlockTag)

    $(block).after(nextBlock)

    block.textContent = keepInThisBlock
    nextBlock.textContent = moveToNextBlock

    nextBlock = Blocks.applyBlockFormatter(nextBlock)

    Cursor.setPosition(nextBlock, 0, 0)

    return false
  }
)

hotkeys(
  'backspace',
  function (event, handler) {
    let block = (event.target || event.srcElement)

    const cursorPosition = Cursor.getPosition(block)

    if (cursorPosition === -1) {
      return true
    }

    if (cursorPosition.base !== cursorPosition.focus) {
      return true
    }

    if (cursorPosition.focus > 0) {
      return true
    }

    if (block.tagName !== 'TEXT') {
      block = Blocks.replaceBlock(block, 'text')

      Cursor.setPosition(block, 0, 0)

      return false
    }

    const previousBlock = block.previousElementSibling

    if (!previousBlock) {
      const nextBlock = block.nextElementSibling

      if (nextBlock && block.textContent.length === 0) {
        block.parentNode.removeChild(block)

        Cursor.setPosition(nextBlock, 0, 0)

        return false
      }

      return true
    }

    const offset = previousBlock.textContent.length

    previousBlock.textContent += block.textContent

    Cursor.setPosition(previousBlock, offset, offset)

    block.parentNode.removeChild(block)

    return false
  }
)

$('main').on(
  'input',
  '*[contenteditable]',
  function () {
    Blocks.applyBlockFormatter(this)
  }
)

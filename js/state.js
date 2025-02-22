/* global $ */

import Blocks from './blocks.js'

export default class State {
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

    if (window.localStorage.getItem('wordSpacing')) {
      $('#content').css(
        'word-spacing',
        window.localStorage.getItem('wordSpacing')
      )
    }

    $('#content').css(
      'column-count',
      window.localStorage.getItem('columnCount')
    )

    $('#content').html(
      window.localStorage.getItem('content') || '<div contenteditable></div>'
    )

    Blocks.focusOnLastBlock()
  }

  static save () {
    window.localStorage.setItem(
      'textAlign',
      $('body').attr('class')
    )

    window.localStorage.setItem(
      'fontSize',
      $('#content').css('font-size')
    )

    window.localStorage.setItem(
      'wordSpacing',
      $('#content').css('word-spacing')
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
    window.localStorage.removeItem('wordSpacing')
    window.localStorage.removeItem('columnCount')
    window.localStorage.removeItem('content')

    window.location.reload()
  }
}

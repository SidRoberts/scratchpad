/* global $ */

import Cursor from './cursor.js'

export default class Blocks {
  static makeNewBlock () {
    const newBlock = document.createElement('div')

    newBlock.contentEditable = true

    return newBlock
  }

  static toggleDataAttribute (block, key, value) {
    key = 'data-' + key

    if (block.getAttribute(key) === value) {
      block.removeAttribute(key)
    } else {
      block.setAttribute(key, value)
    }
  }

  static applyBlockFormatter (block) {
    const blockFormatters = {
      '=1': { size: 'h1' },
      '=2': { size: 'h2' },
      '=3': { size: 'h3' },
      '=4': { size: 'h4' },
      '=5': { size: 'h5' },
      '=6': { size: 'h6' },
      '- ': { style: 'list' },
      '<>': { font: 'monospace' },
      '~~': { decoration: 'strikethrough' },
      __: { decoration: 'underline' },
      '[1': { bg: 'red' },
      '[2': { bg: 'orange' },
      '[3': { bg: 'yellow' },
      '[4': { bg: 'green' },
      '[5': { bg: 'blue' },
      '[6': { bg: 'purple' },
      '[7': { bg: 'pink' },
      '[8': { bg: 'black' },
      '[9': { bg: 'white' },
      '[0': { bg: 'rainbow' },
      '-1': { border: 'red' },
      '-2': { border: 'orange' },
      '-3': { border: 'yellow' },
      '-4': { border: 'green' },
      '-5': { border: 'blue' },
      '-6': { border: 'purple' },
      '-7': { border: 'pink' },
      '-8': { border: 'black' },
      '-9': { border: 'white' },
      '-0': { border: 'rainbow' },
      '/1': { color: 'red' },
      '/2': { color: 'orange' },
      '/3': { color: 'yellow' },
      '/4': { color: 'green' },
      '/5': { color: 'blue' },
      '/6': { color: 'purple' },
      '/7': { color: 'pink' },
      '/8': { color: 'black' },
      '/9': { color: 'white' },
      '/0': { color: 'rainbow' }
    }

    for (const blockFormatter in blockFormatters) {
      const dataAttributes = blockFormatters[blockFormatter]

      if (block.textContent.startsWith(blockFormatter)) {
        const cursorPosition = Cursor.getPosition(block)

        block.textContent = block.textContent.replace(blockFormatter, '')

        for (const key in dataAttributes) {
          const value = dataAttributes[key]

          Blocks.toggleDataAttribute(block, key, value)
        }

        if (cursorPosition !== -1) {
          let newPosition = cursorPosition.focus - blockFormatter.length

          if (newPosition < 0) {
            newPosition = 0
          }

          Cursor.setPosition(block, newPosition, newPosition)
        }

        return block
      }
    }

    return block
  }

  static focusBlock (block, position) {
    Cursor.setPosition(block, position, position)
  }

  static focusOnFirstBlock () {
    const firstBlock = $('#content *[contenteditable]').first()[0]

    Blocks.focusBlock(firstBlock, -1)
  }

  static focusOnLastBlock () {
    const lastBlock = $('#content *[contenteditable]').last()[0]

    Blocks.focusBlock(lastBlock, -1)
  }
}

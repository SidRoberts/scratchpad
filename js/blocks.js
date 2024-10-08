/* global $ */

import Cursor from './cursor.js'

export default class Blocks {
  static makeNewBlock () {
    const newBlock = document.createElement('div')

    newBlock.contentEditable = 'plaintext-only'

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
      '[1': { bg: 'red' },
      '[2': { bg: 'orange' },
      '[3': { bg: 'yellow' },
      '[4': { bg: 'green' },
      '[5': { bg: 'blue' },
      '[6': { bg: 'purple' },
      '[7': { bg: 'pink' },
      '[8': { bg: 'rainbow' },
      '/1': { color: 'red' },
      '/2': { color: 'orange' },
      '/3': { color: 'yellow' },
      '/4': { color: 'green' },
      '/5': { color: 'blue' },
      '/6': { color: 'purple' },
      '/7': { color: 'pink' },
      '/8': { color: 'rainbow' }
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

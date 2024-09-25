/* global $ */

import Cursor from './cursor.js'

export default class Blocks {
  static makeNewBlock (newBlockTag) {
    const newBlock = document.createElement(newBlockTag)

    newBlock.contentEditable = 'plaintext-only'

    return newBlock
  }

  static replaceBlock (block, newBlockTag) {
    const newBlock = Blocks.makeNewBlock(newBlockTag)

    newBlock.textContent = block.textContent

    block.parentNode.replaceChild(newBlock, block)

    return newBlock
  }

  static applyBlockFormatter (block) {
    const blockFormatters = {
      '=1': 'h1',
      '=2': 'h2',
      '=3': 'h3',
      '=4': 'h4',
      '=5': 'h5',
      '=6': 'h6',
      '- ': 'li',
      '<>': 'pre',
      '~~': 'del',
      '[1': 'box-red',
      '[2': 'box-orange',
      '[3': 'box-yellow',
      '[4': 'box-green',
      '[5': 'box-blue',
      '[6': 'box-purple',
      '[7': 'box-pink',
      '[8': 'box-rainbow',
      '/1': 'text-red',
      '/2': 'text-orange',
      '/3': 'text-yellow',
      '/4': 'text-green',
      '/5': 'text-blue',
      '/6': 'text-purple',
      '/7': 'text-pink',
      '/8': 'text-rainbow'
    }

    for (const blockFormatter in blockFormatters) {
      const newBlockTag = blockFormatters[blockFormatter]

      if (block.textContent.startsWith(blockFormatter)) {
        const cursorPosition = Cursor.getPosition(block)

        block.textContent = block.textContent.replace(blockFormatter, '')

        const newBlock = Blocks.replaceBlock(block, newBlockTag)

        if (cursorPosition !== -1) {
          let newPosition = cursorPosition.focus - blockFormatter.length

          if (newPosition < 0) {
            newPosition = 0
          }

          Cursor.setPosition(newBlock, newPosition, newPosition)
        }

        return newBlock
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

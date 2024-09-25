/* global Node */

export default class Cursor {
  static getPosition (parentNode) {
    const selection = window.getSelection()

    if (!selection.focusNode) {
      return -1
    }

    const node = selection.focusNode

    if (!Cursor._isOrIsChildOf(node, parentNode)) {
      return -1
    }

    const charactersBeforeFocusNodeCount = Cursor._charactersBeforeFocusNodeCount(parentNode, node)

    const base = charactersBeforeFocusNodeCount + selection.baseOffset
    const focus = charactersBeforeFocusNodeCount + selection.focusOffset

    const min = Math.min(base, focus)
    const max = Math.max(base, focus)

    return {
      base: base,
      focus: focus,
      min: min,
      max: max,
      selection: selection.toString()
    }
  }

  static setPosition (parentNode, baseOffset, focusOffset) {
    if (baseOffset < 0) {
      baseOffset += parentNode.textContent.length + 1
    }
    if (focusOffset < 0) {
      focusOffset += parentNode.textContent.length + 1
    }

    const selection = window.getSelection()

    // An empty parent will have no text nodes. :(
    if (parentNode.textContent.length === 0 && baseOffset === 0 && focusOffset === 0) {
      selection.setBaseAndExtent(parentNode, 0, parentNode, 0)
    }

    const baseNode = Cursor._getTextNodeAtOffset(parentNode, baseOffset)
    const focusNode = Cursor._getTextNodeAtOffset(parentNode, focusOffset)

    if (!baseNode || !focusNode) {
      return
    }

    baseOffset -= Cursor._charactersBeforeFocusNodeCount(parentNode, baseNode)
    focusOffset -= Cursor._charactersBeforeFocusNodeCount(parentNode, focusNode)

    selection.setBaseAndExtent(baseNode, baseOffset, focusNode, focusOffset)
  }

  static _getTextNodeAtOffset (node, offset) {
    let length = 0

    const textNodes = Cursor._flattenTextNodes(node)

    for (let i = 0; i < textNodes.length; i++) {
      const textNode = textNodes[i]

      length += textNode.textContent.length

      if (offset <= length) {
        return textNode
      }
    }

    return false
  }

  static _flattenTextNodes (node) {
    const childNodes = node.childNodes

    const textNodes = []

    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i]

      if (childNode.nodeType === Node.TEXT_NODE) {
        textNodes.push(childNode)
      } else {
        const flattenedTextNodes = Cursor._flattenTextNodes(childNode)

        textNodes.push(...flattenedTextNodes)
      }
    }

    return textNodes
  }

  static _charactersBeforeFocusNodeCount (parentNode, node) {
    let charactersBeforeFocusNodeCount = 0

    while (node && node !== parentNode) {
      if (node.previousSibling) {
        node = node.previousSibling
        charactersBeforeFocusNodeCount += node.textContent.length
      } else {
        node = node.parentNode
      }
    }

    return charactersBeforeFocusNodeCount
  }

  static _isOrIsChildOf (node, parentNode) {
    while (node) {
      if (node === parentNode) {
        return true
      }

      node = node.parentNode
    }

    return false
  }
}

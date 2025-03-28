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

    const anchor = charactersBeforeFocusNodeCount + selection.anchorOffset
    const focus = charactersBeforeFocusNodeCount + selection.focusOffset

    const min = Math.min(anchor, focus)
    const max = Math.max(anchor, focus)

    return {
      anchor,
      focus,
      min,
      max,
      selection: selection.toString()
    }
  }

  static setPosition (parentNode, anchorOffset, focusOffset) {
    if (anchorOffset < 0) {
      anchorOffset += parentNode.textContent.length + 1
    }
    if (focusOffset < 0) {
      focusOffset += parentNode.textContent.length + 1
    }

    const selection = window.getSelection()

    // An empty parent will have no text nodes. :(
    if (parentNode.textContent.length === 0 && anchorOffset === 0 && focusOffset === 0) {
      parentNode.focus()
      selection.setBaseAndExtent(parentNode, 0, parentNode, 0)
    }

    const anchorNode = Cursor._getTextNodeAtOffset(parentNode, anchorOffset)
    const focusNode = Cursor._getTextNodeAtOffset(parentNode, focusOffset)

    if (!anchorNode || !focusNode) {
      return
    }

    anchorOffset -= Cursor._charactersBeforeFocusNodeCount(parentNode, anchorNode)
    focusOffset -= Cursor._charactersBeforeFocusNodeCount(parentNode, focusNode)

    focusNode.parentElement.focus()
    selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)
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

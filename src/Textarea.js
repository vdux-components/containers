/**
 * Imports
 */

import {component, decodeNode, findDOMNode, element} from 'vdux'
import CSSContainer from './CSSContainer'
import {Textarea} from 'vdux-ui'
import wrap from './wrap'

/**
 * Hidden Textarea
 */

let hiddenTextarea
const hiddenTextareaStyle = 'position: absolute !important; visibility: hidden !important; overflow: hidden !important; min-height: 0px !important; max-height: 0px !important; height: 0px !important; z-index: -1000 !important; right: 0px !important; top: 0px !important'

/**
 * Sizing-related styles
 */

const sizingStyles = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]

/**
 * <Textarea/> container
 */

export default wrap(CSSContainer)(component({
  onCreate (model) {
    return dispatch => {
      setTimeout(() => {
        const node = findDOMNode(model)

        if (node) {
          const ta = node.querySelector('textarea')

          if (ta) {
            const newHeight = calculateHeight(ta)
            ta.style.height = (isNaN(model.props.height)
              ? newHeight
              : Math.max(Number(model.props.height), newHeight)) + 'px'

            dispatch(model.actions.setHeight(newHeight))
          }
        }
      })
    }
  },

  render ({props, state, actions}) {
    const {onChange, onInvalid, onInput} = props
    const {invalid, message} = state

    return (
      <Textarea
        invalid={invalid}
        message={message}
        rows={1}
        {...props}
        resize='none'
        overflow='hidden'
        onInput={[decodeNode(actions.handleInput(props.height, state.height)), onInput]}
        onChange={[onChange, actions.clearValidity]}
        onInvalid={[onInvalid, actions.setValidity]} />
    )
  },

  controller: {
    * handleInput ({actions}, initialHeight, currentHeight, node) {
      const newHeight = calculateHeight(node)

      if (newHeight !== currentHeight) {
        node.style.height = isNaN(initialHeight)
          ? newHeight + 'px'
          : Math.max(Number(initialHeight), currentHeight) + 'px'

        yield actions.setHeight(newHeight)
      }
    }
  },

  reducer: {
    clearValidity: () => ({
      invalid: false,
      message: ''
    }),
    setValidity: (state, message) => ({
      invalid: !!message,
      message
    }),
    setHeight: (state, height) => ({
      height
    })
  }
}))

/**
 * Helpers
 */

function calculateHeight (ta) {
  const {boxSizing, paddingSize, borderSize, sizingStyle} = getNodeStyle(ta)

  hiddenTextarea = hiddenTextarea || createHiddenTextarea()
  hiddenTextarea.setAttribute('style', sizingStyle + ';' + hiddenTextareaStyle)

  hiddenTextarea.value = ''
  const rowHeight = hiddenTextarea.scrollHeight - paddingSize
  const numRows = Number(ta.getAttribute('rows'))
  const heightOfRows = numRows * rowHeight
  const baseHeight = isNaN(numRows)
    ? 0
    : (boxSizing === 'border-box' ? heightOfRows + paddingSize + borderSize : heightOfRows)

  hiddenTextarea.value = ta.value || ta.placeholder || 'x'
  const height = hiddenTextarea.scrollHeight

  return Math.max(
    baseHeight,
    boxSizing === 'border-box'
      ? height + borderSize
      : height - paddingSize
  )
}

function getNodeStyle (node) {
  const style = window.getComputedStyle(node)

  return {
    boxSizing: style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing'),
    paddingSize: parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top')),
    borderSize: parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width')),
    sizingStyle: sizingStyles.map(name => `${name}:${style.getPropertyValue(name)}`).join(';')
  }
}

function createHiddenTextarea () {
  const node = document.createElement('textarea')

  node.setAttribute('style', hiddenTextareaStyle)
  document.body.appendChild(node)

  return node
}

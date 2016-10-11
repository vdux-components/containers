/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import CSSContainer from './CSSContainer'
import {findDOMNode} from 'virtex'
import element from 'vdux/element'
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
 * onCreate
 */

function onCreate (model) {
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

          dispatch(model.local(setHeight)(newHeight))
        }
      }
    })
  }
}

/**
 * <Textarea/> container
 */

function render ({props, state, local}) {
  const {onChange, onInvalid, onInput} = props
  const {invalid, message} = state

  const height = isNaN(props.height)
    ? state.height
    : Math.max(Number(props.height), state.height)

  return (
    <Textarea
      invalid={invalid}
      message={message}
      rows={1}
      {...props}
      resize='none'
      overflow='hidden'
      onInput={[handleInput, onInput]}
      onChange={[onChange, local(e => setValidity(''))]}
      onInvalid={[onInvalid, local(e => setValidity(e.target.validationMessage))]}/>
  )

  function handleInput (e) {
    const newHeight = calculateHeight(e.target)

    if (newHeight !== state.height) {
      e.target.style.height = isNaN(props.height)
        ? newHeight + 'px'
        : Math.max(Number(props.height), state.height) + 'px'

      return local(setHeight)(newHeight)
    }
  }
}

/**
 * Actions
 */

const setValidity = createAction('<Textarea/>: set validity')
const setHeight = createAction('<Textarea/>: set height')

/**
 * Reducer
 */

const reducer = handleActions({
  [setValidity]: (state, message) => ({
    ...state,
    invalid: !!message,
    message: message
  }),
  [setHeight]: (state, height) => ({
    ...state,
    height
  })
})

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

/**
 * Exports
 */

export default wrap(CSSContainer)({
  onCreate,
  reducer,
  render
})

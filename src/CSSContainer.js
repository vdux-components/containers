/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'
import extend from '@f/extend'
import omit from '@f/omit'

/**
 * Constants
 */

const filterProps = omit(['ui', 'hoverProps', 'lingerProps', 'activeProps', 'focusProps'])

/**
 * CSS Emulator - Mimic hover/active/focus states in a robust way
 */

function render ({props, children, state, local}) {
  const {hoverProps, lingerProps, activeProps, focusProps, ui: Ui} = props
  const newProps = filterProps(props)

  if (hoverProps) {
    newProps.onHoverChange = handler(props.onHoverChange, local(hoverChange))
    if (state.hover) extend(newProps, hoverProps)
  }

  if (lingerProps) {
    newProps.onLingerChange = handler(props.onLingerChange, local(lingerChange))
    if (state.linger) extend(newProps, lingerProps)
  }

  if (activeProps) {
    newProps.onActiveChange = handler(props.onActiveChange, local(activeChange))
    if (state.active) extend(newProps, activeProps)
  }

  if (focusProps) {
    newProps.onFocusChange = handler(props.onFocusChange, local(focusChange))
    if (state.focus) extend(newProps, focusProps)
  }

  return (
    <Ui {...newProps}>
      {children}
    </Ui>
  )
}

/**
 * Actions
 */

const metaCreator = () => ({logLevel: 'debug'})
const hoverChange = createAction('<CSSContainer/>: hoverChange', null, metaCreator)
const lingerChange = createAction('<CSSContainer/>: lingerChange', null, metaCreator)
const activeChange = createAction('<CSSContainer/>: activeChange', null, metaCreator)
const focusChange = createAction('<CSSContainer/>: focusChange', null, metaCreator)

/**
 * Reducer
 */

const reducer = handleActions({
  [hoverChange]: (state, hover) => ({...state, hover}),
  [lingerChange]: (state, linger) => ({...state, linger}),
  [activeChange]: (state, active) => ({...state, active}),
  [focusChange]: (state, focus) => ({...state, focus})
})

/**
 * Helpers
 */

function handler (a, b) {
  if (a && !b) return a
  if (b && !a) return b
  return [a, b]
}

/**
 * Exports
 */

export default {
  render,
  reducer
}

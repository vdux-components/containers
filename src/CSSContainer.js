/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import contains from '@f/contains-element'
import forEach from '@f/foreach-obj'
import Document from 'vdux/document'
import element from 'vdux/element'
import Delay from 'vdux-delay'
import extend from '@f/extend'
import omit from '@f/omit'

/**
 * initialState
 */

function initialState () {
  return {
    hover: false,
    linger: false,
    active: false,
    focus: false
  }
}

/**
 * Constants
 */

const filterProps = omit(['hoverProps', 'activeProps', 'focusProps', 'lingerProps', 'lingerDelay', 'ui'])

/**
 * Css Emulator
 */

function render ({props, children, state, local}) {
  const mergedProps = filterProps(props)
  const {hoverProps, activeProps, focusProps, lingerProps, ui: Ui} = props

  if (state.hover && hoverProps) extend(mergedProps, hoverProps)
  if (state.linger && lingerProps) extend(mergedProps, lingerProps)
  if (state.focus && focusProps) extend(mergedProps, focusProps)
  if (state.active && activeProps) extend(mergedProps, activeProps)

  return (
    <Ui {...mergedProps}>
      {children}
    </Ui>
  )
}

function onUpdate (prev, next) {
  const {props, local, state} = next
  const {lingerDelay = 500} = props

  if (next.state.hover && !prev.state.hover) {
    return dispatch => dispatch(local(storeTimeoutId)(setTimeout(() => dispatch(local(linger)()), lingerDelay)))
  }

  if (!next.state.hover && prev.state.hover) {
    clearTimeout(state.timeoutId)
    return local(storeTimeoutId)(null)
  }
}

function afterRender ({local, state, path, props}, node) {
  const {hoverProps, activeProps, focusProps, lingerProps, lingerDelay = 500} = props

  delegate()
  return dispatch => {
    clear(node, path)
    clear(document, path)

    if (hoverProps || lingerProps) {
      handle(node, path, 'mouseenter', () => {
        prop(node, 'hover', true)
        dispatch(local(mouseEnter)())
      })

      handle(node, path, 'mouseleave', () => {
        prop(node, 'hover', false)
        dispatch(local(mouseLeave)())
      })

      if (state.hover && !state.linger) {
        handle(document, path, 'mousemove', (e) => contains(node, e.target) || dispatch(local(mouseLeave)()))
      }
    }

    if (activeProps) {
      handle(node, path, 'mousedown', () => dispatch(local(mouseDown)()))
      if (state.active) {
        handle(document, path, 'mouseup', () => dispatch(local(mouseUp)()))
      }
    }

    if (focusProps) {
      handle(node, path, 'focus', () => dispatch(local(focus)()))
      handle(node, path, 'blur', () => dispatch(local(blur)()))
    }
  }
}

function onRemove ({path, state}) {
  clearTimeout(state.timeoutId)
  clear(document, path)
}

/**
 * Event delegation helpers
 */

function handle (node, path, name, fn) {
  const store = node[delegateKey] = node[delegateKey] || {}
  const events = store[path] = store[path] || {}

  events[name] = fn
}

function clear (node, path) {
  if (node[delegateKey] && node[delegateKey][path]) {
    delete node[delegateKey][path]
  }
}

function prop (node, name, value) {
  const key = delegateKey + '_' + name

  if (arguments.length === 3) {
    node[key] = value
  }

  return node[key]
}

/**
 * Actions
 */

const metaCreator = () => ({logLevel: 'debug'})
const mouseEnter = createAction('<CSSContainer/>: mouseEnter', null, metaCreator)
const mouseLeave = createAction('<CSSContainer/>: mouseLeave', null, metaCreator)
const mouseDown = createAction('<CSSContainer/>: mouseDown', null, metaCreator)
const mouseUp = createAction('<CSSContainer/>: mouseUp', null, metaCreator)
const focus = createAction('<CSSContainer/>: focus', null, metaCreator)
const blur = createAction('<CSSContainer/>: blur', null, metaCreator)
const linger = createAction('<CSSContainer/>: linger', null, metaCreator)
const storeTimeoutId = createAction('<CSSContainer/>: storeTimeoutId', null, metaCreator)

/**
 * Reducer
 */

const reducer = handleActions({
  [mouseEnter]: state => ({...state, hover: true}),
  [mouseLeave]: state => ({...state, hover: false, linger: false}),
  [mouseDown]: state => ({...state, active: true}),
  [mouseUp]: state => ({...state, active: false}),
  [focus]: state => ({...state, focus: true}),
  [blur]: state => ({...state, focus: false}),
  [linger]: state => ({...state, linger: true}),
  [storeTimeoutId]: (state, timeoutId) => ({...state, timeoutId})
})

/**
 * Parallel event delegation system so that our
 * handlers don't conflict with those added natively
 */

let delegated = false
const delegateKey = '$$CSSContainer'
const events = ['mousedown', 'mouseup', 'mousemove', 'mouseenter', 'mouseleave', 'blur', 'focus']


function delegate () {
  if (delegated) return
  delegated = true

  events.forEach(name => document.addEventListener(name, e => {
    let node = e.target
    while (node) {
      const store = node[delegateKey]

      if (store) {
        forEach(events => {
          if (events[e.type]) {
            events[e.type](e, node)
          }
        }, store)
      }

      if (!e.bubbles) break
      node = node.parentNode
    }
  }, true))
}

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
  initialState,
  render,
  onUpdate,
  afterRender,
  reducer,
  onRemove
}

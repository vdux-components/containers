/**
 * Imports
 */

import contains from '@f/contains-element'
import matches from '@f/matches-selector'
import {element, component} from 'vdux'
import forEach from '@f/foreach-obj'
import extend from '@f/extend'
import omit from '@f/omit'

/**
 * Constants
 */

const filterProps = omit(['hoverProps', 'activeProps', 'focusProps', 'lingerProps', 'lingerDelay', 'ui'])

/**
 * <CSSContainer/>
 */

export default component({
  initialState: {
    hover: false,
    linger: false,
    active: false,
    focus: false
  },

  render ({props, children, state}) {
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
  },

  afterRender ({actions, state, path, props}, node) {
    const {hoverProps, activeProps, focusProps, lingerProps} = props

    delegate()
    return dispatch => {
      clear(node, path)
      clear(document, path)

      if (hoverProps || lingerProps) {
        handle(node, path, 'mouseenter', () => {
          prop(node, 'hover', true)
          dispatch(actions.mouseEnter())
        })

        handle(node, path, 'mouseleave', () => {
          prop(node, 'hover', false)
          dispatch(actions.mouseLeave())
        })

        if (state.hover) {
          handle(document, path, 'mousemove', e => {
            contains(node, e.target) || dispatch(actions.mouseLeave())
          })

          setTimeout(() => matches(node, ':hover') || dispatch(actions.mouseLeave()))
        }
      }

      if (activeProps) {
        handle(node, path, 'mousedown', () => dispatch(actions.mouseDown()))
        if (state.active) {
          handle(document, path, 'mouseup', () => dispatch(actions.mouseUp()))
        }
      }

      if (focusProps) {
        handle(node, path, 'focus', () => dispatch(actions.focus()))
        handle(node, path, 'blur', () => dispatch(actions.blur()))
      }
    }
  },

  onUpdate (prev, next) {
    const {props, actions, state} = next
    const {lingerDelay = 500} = props

    if (next.state.hover && !prev.state.hover) {
      return dispatch => dispatch(actions.storeTimeoutId(setTimeout(() => dispatch(actions.linger()), lingerDelay)))
    }

    if (!next.state.hover && prev.state.hover) {
      clearTimeout(state.timeoutId)
      return actions.storeTimeoutId(null)
    }
  },

  onRemove ({path, state, props}) {
    clearTimeout(state.timeoutId)
    clear(document, path)
  },

  reducer: {
    mouseEnter: state => ({hover: true}),
    mouseLeave: state => ({hover: false, linger: false}),
    mouseDown: state => ({active: true}),
    mouseUp: state => ({active: false}),
    focus: state => ({focus: true}),
    blur: state => ({focus: false}),
    linger: state => ({linger: true}),
    storeTimeoutId: (state, timeoutId) => ({timeoutId})
  }
})

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

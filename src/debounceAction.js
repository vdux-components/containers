/**
 * Imports
 */

import element from 'vdux/element'
import debounce from '@f/debounce'

/**
 * Debounce action
 */

function debounceAction (fn, ms) {
  let dispatch, args
  const debounced = debounce(() => dispatch(fn(...args)), ms)

  return (..._args) => _dispatch => {
    args = _args
    dispatch = _dispatch
    debounced()
  }
}

/**
 * Exports
 */

export default debounceAction

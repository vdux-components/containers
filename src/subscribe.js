/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import mapValues from '@f/map-values'
import element from 'vdux/element'
import map from '@f/map-obj'

/**
 * Actions
 */

const update = createAction('vdux-subscribe: update', null, () => ({logLevel: 'debug'}))

/**
 * Subscribe
 */

function subscribe (subscriptions) {
  return Component => {
    return {
      initialState ({props, local, path}) {
        return map((sub, key) =>
          sub.initialState
            ? sub.initialState(props, value => local(update)({key, value}), path)
            : {}, subscriptions)
      },

      * onCreate ({path, props, state, local}) {
        yield mapValues((sub, key) =>
          sub(props, state[key], value => local(update)({key, value}), path), subscriptions)
      },

      render ({props, state, children}) {
        return (
          <Component {...props} {...state}>
            {children}
          </Component>
        )
      },

      * onUpdate (prev, {path, props, state, local}) {
        yield mapValues((sub, key) =>
          sub(props, state[key], value => local(update)({key, value}), path), subscriptions)
      },

      reducer
    }
  }
}

/**
 * Reducer - Constant for all instances
 */

const reducer = handleActions({
  [update]: (state, {key, value}) => ({
    ...state,
    [key]: {
      ...(state[key] || {}),
      ...value
    }
  })
})

/**
 * Exports
 */

export default subscribe

/**
 * Imports
 */

import {component, element} from 'vdux'
import mapValues from '@f/map-values'
import map from '@f/map-obj'

/**
 * Subscribe
 */

export default subscriptions => Component => component({
  initialState ({props, actions, path}) {
    return map((sub, key) =>
      sub.initialState
        ? sub.initialState(props, value => actions.update(key, value), path)
        : {}, subscriptions)
  },

  * onCreate ({path, props, state, actions}) {
    yield mapValues((sub, key) => sub(props, state[key], value => actions.update(key, value), path), subscriptions)
  },

  render ({props, state, children}) {
    return (
      <Component {...props} {...state}>
        {children}
      </Component>
    )
  },

  * onUpdate (prev, {path, props, state, actions}) {
    yield mapValues((sub, key) => sub(props, state[key], value => actions.update(key, value), path), subscriptions)
  },

  reducer: {
    update: (state, key, value) => ({
      [key]: {
        ...(state[key] || {}),
        ...value
      }
    })
  }
})

/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import loadImage from '@f/load-image'
import element from 'vdux/element'

/**
 * imagesLoaded higher order component
 */

function imageLoaded (fn) {
  return Component => ({
    initialState () {
      return {
        loaded: false
      }
    },

    * onCreate ({props, local}) {
      const url = fn(props)

      if (url) {
        yield loadImage(url)
        yield local(loaded)()
      }
    },

    render ({props, state, children}) {
      return <Component {...props} isLoaded={state.loaded}>{children}</Component>
    },

    * onUpdate (prev, next) {
      const purl = fn(prev.props)
      const nurl = fn(next.props)

      if (nurl && purl !== nurl) {
        yield next.local(unloaded)()
        yield loadImage(nurl)
        yield next.local(loaded)()
      }
    },

    reducer
  })
}

/**
 * Actions
 */

const loaded = createAction('Image loader: image loaded', null, () => ({logLevel: 'debug'}))
const unloaded = createAction('Image loader: image unloaded', null, () => ({logLevel: 'debug'}))

/**
 * Reducer
 */

const reducer = handleActions({
  [unloaded]: state => ({
    ...state,
    loaded: false
  }),
  [loaded]: state => ({
    ...state,
    loaded: true
  })
})

/**
 * Exports
 */

export default imageLoaded

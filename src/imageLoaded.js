/**
 * Imports
 */

import {component, element} from 'vdux'
import loadImage from '@f/load-image'

/**
 * Constants
 */

const hasImage = (typeof window !== 'undefined')

/**
 * imagesLoaded HOC
 */

export default fn => Component => component({
  initialState: {
    loaded: false
  },

  * onCreate ({props, actions}) {
    const url = fn(props)

    if (hasImage && url) {
      yield loadImage(url)
      yield actions.loaded
    }
  },

  render ({props, state, children}) {
    return <Component {...props} isLoaded={state.loaded}>{children}</Component>
  },

  * onUpdate (prev, next) {
    const purl = fn(prev.props)
    const nurl = fn(next.props)

    if (hasImage && nurl && purl !== nurl) {
      yield next.actions.unloaded
      yield loadImage(nurl)
      yield next.actions.loaded
    }
  },

  reducer: {
    loaded: () => ({loaded: true}),
    unloaded: () => ({loaded: false})
  }
})

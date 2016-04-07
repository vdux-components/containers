/**
 * Imports
 */

import {MenuItem} from 'vdux-ui'
import element from 'vdux/element'
import CSSContainer from './CSSContainer'

/**
 * Button container
 */

function render ({props, children}) {
  return (
    <CSSContainer ui={MenuItem} hoverProps={{highlight: true}} {...props}>
      {children}
    </CSSContainer>
  )
}

/**
 * Exports
 */

export default {
  render
}

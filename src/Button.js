/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import element from 'vdux/element'
import {Button} from 'vdux-ui'

/**
 * Button container
 */

function render ({props, children}) {
  return (
    <CSSContainer ui={Button} hoverProps={{highlight: true}} lingerProps={{ttShown: true}} {...props}>
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

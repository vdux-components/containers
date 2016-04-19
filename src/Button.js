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
  const {ui = Button} = props

  return (
    <CSSContainer hoverProps={{highlight: true}} lingerProps={{ttShown: true}} {...props} ui={ui}>
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

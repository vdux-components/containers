/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import element from 'vdux/element'
import {Toggle} from 'vdux-ui'

/**
 * Button container
 */

function render ({props, children}) {
  const {ui = Toggle, uiProps = {}} = props

  return (
    <CSSContainer activeProps={{uiProps: {squished: true, ...uiProps}}} {...props} ui={ui}>
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

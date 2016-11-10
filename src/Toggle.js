/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import {component, element} from 'vdux'
import {Toggle} from 'vdux-ui'

/**
 * <Toggle/>
 */

export default component({
  render ({props, children}) {
    const {ui = Toggle, uiProps = {}} = props

    return (
      <CSSContainer activeProps={{uiProps: {squished: true, ...uiProps}}} {...props} ui={ui}>
        {children}
      </CSSContainer>
    )
  }
})

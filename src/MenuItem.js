/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import {component, element} from 'vdux'
import {MenuItem} from 'vdux-ui'

/**
 * Constants
 */

const highlight = {highlight: 0.05}

/**
 * <MenuItem/> container
 */

export default component({
  render ({props, children}) {
    return (
      <CSSContainer ui={MenuItem} hoverProps={highlight} {...props}>
        {children}
      </CSSContainer>
    )
  }
})

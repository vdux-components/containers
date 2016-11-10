/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import {component, element} from 'vdux'
import {Button} from 'vdux-ui'

/**
 * <Button/> container
 */

export default component({
  render ({props, children}) {
    const {ui = Button} = props

    return (
      <CSSContainer hoverProps={{highlight: true}} focusProps={{highlight: true}} activeProps={{highlight: false}} lingerProps={{ttShown: true}} {...props} ui={ui}>
        {children}
      </CSSContainer>
    )
  }
})

/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import {component, element} from 'vdux'
import {Tooltip, Base} from 'vdux-ui'
import wrap from './wrap'

/**
 * Setup CSSContainer wrapper
 */

const wrapper = wrap(CSSContainer, ({immediate}) => ({
  [immediate ? 'hoverProps' : 'lingerProps']: {show: true}
}))

/**
 * <Tooltip/> container
 */

export default wrapper(component({
  render ({props, children}) {
    const {ui: Tt = Tooltip, message, show, placement, space, tooltipProps = {}, ...otherProps} = props

    return (
      <Base overflow='visible' {...otherProps}>
        {children}
        <Tt placement={placement} space={space} show={message && show} {...tooltipProps}>
          {message}
        </Tt>
      </Base>
    )
  }
}))

/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import CSSContainer from './CSSContainer'
import {Tooltip, Base} from 'vdux-ui'
import element from 'vdux/element'
import wrap from './wrap'

/**
 * Tooltip container component
 */

function render ({props, children}) {
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

/**
 * Exports
 */

export default wrap(CSSContainer, ({immediate}) => ({
  [immediate ? 'hoverProps' : 'lingerProps']: {
    show: true
  }
}))({
  render
})

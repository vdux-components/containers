/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import {component, element} from 'vdux'
import {Input} from 'vdux-ui'
import wrap from './wrap'

/**
 * <Input/>
 */

export default wrap(CSSContainer)(component({
  render ({props, state, children, actions}) {
    const {ui: Ui = Input, onInvalid, onChange} = props
    const {invalid, message} = state

    return (
      <Ui
        invalid={invalid}
        message={message}
        {...props}
        onChange={[onChange, actions.clearValidity]}
        onInvalid={[onInvalid, actions.setValidity]} />
    )
  },

  reducer: {
    clearValidity: state => ({
      invalid: false,
      message: ''
    }),
    setValidity: (state, message) => ({
      invalid: !!message,
      message
    })
  }
}))

/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import CSSContainer from './CSSContainer'
import element from 'vdux/element'
import {Input} from 'vdux-ui'

/**
 * Input container
 */

function render ({props, state, local, children}) {
  const {ui: Ui = Input, onInvalid, onChange} = props
  const {invalid, message} = state

  return (
    <Ui
      invalid={invalid}
      message={message}
      {...props}
      onChange={[onChange, local(e => setValidity(''))]}
      onInvalid={[onInvalid, local(e => setValidity(e.target.validationMessage))]} />
  )
}

/**
 * Actions
 */

const setValidity = createAction('<Input/>: setValidity')

/**
 * Reducer
 */

const reducer = handleActions({
  [setValidity]: (state, message) => ({
    invalid: !!message,
    message: message
  })
})

/**
 * Exports
 */

export default {
  reducer,
  render
}

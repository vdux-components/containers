/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import CSSContainer from './CSSContainer'
import {findDOMNode} from 'virtex'
import element from 'vdux/element'
import {Textarea} from 'vdux-ui'
import autosize from 'autosize'
import wrap from './wrap'

/**
 * onCreate
 */

function onCreate (model) {
  return () => {
    if (typeof window === 'undefined') return

    setTimeout(() => {
      const ta = findDOMNode(model).querySelector('textarea')
      if (ta) {
        autosize(ta)
        const e = document.createEvent('event')
        e.initEvent('autosize:update', true, false)
        ta.dispatchEvent(e)
      }
    }, 100)
  }
}

/**
 * <Textarea/> container
 */

function render ({props, state, local}) {
  const {h, sq, height, onChange, onInvalid} = props
  const {invalid, message} = state

  if (h || sq || height) {
    throw new Error('<Textarea/>: autogrowable textarea does not accept an explicit height. If you want to set a starting height parameter, uses the `rows` prop')
  }

  return (
    <Textarea
      invalid={invalid}
      message={message}
      rows={1}
      {...props}
      onChange={[onChange, local(e => setValidity(''))]}
      onInvalid={[onInvalid, local(e => setValidity(e.target.validationMessage))]}/>
  )
}

/**
 * Actions
 */

const setValidity = createAction('<Textarea/>: setValidity')

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

export default wrap(CSSContainer)({
  onCreate,
  reducer,
  render
})

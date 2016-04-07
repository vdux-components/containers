/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import {Dropdown, DropdownMenu} from 'vdux-ui'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'

/**
 * initialState
 */

function initialState () {
  return {
    open: false
  }
}

/**
 * Render dropdown component
 */

function render ({props, state, local, children}) {
  const {open} = state
  const {btn} = props
  const api = {toggle: local(toggle), close: local(close)}

  if (props.ref) props.ref(api)
  if (!props.btn) throw new Error('Forgot to pass required `btn` prop to <Dropdown/>')

  return (
    <Dropdown>
      {
        typeof btn === 'function'
          ? btn(api)
          : <span onClick={api.toggle}>{btn}</span>
      }
      <DropdownMenu {...props} open={open} onDismiss={[local(close), props.onDismiss]}>
        {children}
      </DropdownMenu>
    </Dropdown>
  )
}

/**
 * Actions
 */

const toggle = createAction('<Dropdown/>: toggle')
const close = createAction('<Dropdown/>: close')

/**
 * Reducer
 */

const reducer = combineReducers({
  open: handleActions({
    [toggle]: state => !state,
    [close]: () => false
  })
})

/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}

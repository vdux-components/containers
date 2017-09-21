/**
 * Imports
 */

import {Dropdown, DropdownMenu, Box} from 'vdux-ui'
import {stopPropagation, component, element} from 'vdux'

/**
 * <Dropdown/>
 */

export default component({
  initialState: {
    open: false
  },

  render ({props, state, actions, children}) {
    const {open} = state
    const {btn, closeOnEsc = true, disabled} = props

    if (props.ref) props.ref(actions)
    if (!props.btn) throw new Error('Forgot to pass required `btn` prop to <Dropdown/>')

    return (
      <Dropdown onKeyup={{esc: closeOnEsc && actions.close}} onClick={[stopPropagation, props.onClick, actions.trigger]}>
        {
          typeof btn === 'function'
            ? btn(actions, open)
            : <Box tag='span' onClick={!disabled && actions.toggle} pointer={!disabled}>{btn}</Box>
        }
        <DropdownMenu {...props} open={open} onDismiss={[actions.close, props.onDismiss]}>
          {children}
        </DropdownMenu>
      </Dropdown>
    )
  },

  controller: {
    trigger () {
      document.body.click()
    }
  },

  onUpdate (prev, next) {
    if (!prev.state.open && next.state.open && next.props.onOpen) {
      return next.props.onOpen()
    }

    if (prev.state.open && !next.state.open && next.props.onClose) {
      return next.props.onClose()
    }
  },

  reducer: {
    toggle: state => ({open: !state.open}),
    close: state => ({open: false})
  }
})

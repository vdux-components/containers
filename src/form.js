/**
 * Imports
 */

import {findDOMNode, element, component, decoder} from 'vdux'
import serialize from '@f/serialize-form'
import noop from '@f/noop'

/**
 * Name decoder
 */

const decodeName = decoder(e => e.target.name)

/**
 * <Form/> container component
 */

export default fn => Component => component({
  initialState ({props, context}) {
    const {fields = [], defaults = {}} = fn(props, context)

    return {
      submitted: false,
      fields: fields.reduce((acc, field) => {
        acc[field] = {
          error: null,
          touched: false,
          value: defaults[field]
        }
        return acc
      }, {})
    }
  },

  render ({props, state, actions, children}) {
    return (
      <form onSubmit={actions.handleSubmit} onChange={decodeName(actions.fieldChanged)}>
        <Component {...props} {...state} toggleAll={actions.toggleAll} submit={actions.handleSubmit}>
          {children}
        </Component>
      </form>
    )
  },

  controller: {
    * toggleAll (thunk, name) {
      const form = findDOMNode(thunk)
      const {actions} = thunk

      const checkboxes = form.querySelectorAll(`input[name="${name}[]"]`)
      let changed = false

      for (let i = 0; i < checkboxes.length; i++) {
        const box = checkboxes[i]
        if (!box.checked) {
          box.checked = true
          changed = true
        }
      }

      if (!changed) {
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false
        }
      }

      yield actions.fieldChanged(name)
    },

    * fieldChanged (thunk, name) {
      const {actions, props} = thunk
      const {validate = defaultValidate} = props
      const form = findDOMNode(thunk)

      name = normalizeName(name)

      const model = serialize(form)
      const {valid, errors} = validate(model, name)

      yield actions.change({name, value: model[name]})
      if (!valid) {
        const [error] = errors
        yield actions.invalidate({name, error})
      }
    },

    * handleSubmit (thunk) {
      const form = findDOMNode(thunk)
      const {props, actions, context} = thunk
      const {validate = defaultValidate} = props
      const {onSuccess = noop, onSubmit = noop, onFailure = noop} = fn(props, context)
      const model = serialize(form)
      const {valid, errors} = validate(model)

      yield actions.submit()

      if (valid) {
        try {
          const res = yield onSubmit(model)
          yield onSuccess(res)
        } catch (err) {
          yield onFailure(err)
        }
      } else {
        yield errors.map(({field, message}) => actions.invalidate({name: field, error: message}))
      }
    }
  },

  reducer: {
    submit: () => ({submitted: true}),
    change: (state, {name, value}) => ({
      fields: {
        ...state.fields,
        [name]: {
          ...state.fields[name],
          error: null,
          touched: true,
          value
        }
      }
    }),
    invalidate: (state, {name, error}) => ({
      fields: {
        ...state.fields,
        [name]: {
          ...state.fields[name],
          error
        }
      }
    })
  }
})

/**
 * Helpers
 */

function defaultValidate () {
  return {
    valid: true,
    errors: []
  }
}

function normalizeName (name) {
  const idx = name.indexOf('[')
  return idx === -1
    ? name
    : name.slice(0, idx)
}

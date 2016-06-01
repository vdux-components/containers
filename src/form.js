/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import serialize from '@f/serialize-form'
import element from 'vdux/element'
import identity from '@f/identity'
import noop from '@f/noop'

/**
 * <Form/> container component
 */

function form (fn) {
  return Component => ({
    initialState ({props}) {
      const {fields} = fn(props)
      return {
        submitted: false,
        fields: fields.reduce((acc, field) => {
          acc[field] = {
            error: null,
            touched: false,
            value: undefined
          }
          return acc
        }, {})
      }
    },
    render ({props, state, local, children}) {
      const {
        validate = defaultValidate, cast = identity,
        onSubmit = noop,
        onSuccess = noop, onFailure = noop
      } = fn(props)
      let node

      return (
        <form ref={_node => node = _node} onSubmit={handleSubmit} onChange={handleChange}>
          <Component {...props} {...state} toggleAll={toggleAll}>
            {children}
          </Component>
        </form>
      )

      function * toggleAll (name) {
        const checkboxes = node.querySelectorAll(name + '[]')
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
            box.checked = false
          }
        }

        yield fieldChanged(form, name)
      }

      function * handleChange (e) {
        const {form, name} = e.target
        yield fieldChanged(form, name)
      }

      function *fieldChanged (form, name) {
        const model = serialize(form)
        const {valid, errors} = validate(model, name)

        yield local(change)({name, value: model[name]})
        if (!valid) {
          const [error] = errors
          yield local(invalidate)({name, error})
        }
      }

      function * handleSubmit (e) {
        e.preventDefault()

        const form = e.target
        const model = serialize(form)
        const {valid, errors} = validate(model)

        yield local(submit)()
        if (valid) {
          try {
            const res = yield onSubmit(model)
            yield onSuccess(res)
          } catch (err) {
            yield onFailure(err)
          }
        } else {
          yield errors.map(({field, message}) =>
            local(invalidate)({name: field, error: message}))
        }
      }
    },
    reducer: handleActions({
      [submit]: state => ({
        ...state,
        submitted: true
      }),
      [change]: (state, {name, value}) => ({
        ...state,
        fields: {
          ...state.fields,
          [name]: {
            ...state.fields[name],
            error: null,
            touched: true,
            value,
          }
        }
      }),
      [invalidate]: (state, {name, error}) => ({
        ...state,
        fields: {
          ...state.fields,
          [name]: {
            ...state.fields[name],
            error
          }
        }
      })
    })
  })
}

/**
 * Actions
 */

const change = createAction('<FormContainer/>: change', null, () => ({logLevel: 'debug'}))
const submit = createAction('<FormContainer/>: submit', null, () => ({logLevel: 'debug'}))
const invalidate = createAction('<FormContainer/>: invalidate', null, () => ({logLevel: 'debug'}))

/**
 * Helpers
 */

function defaultValidate () {
  return {
    valid: true,
    errors: []
  }
}

/**
 * Exports
 */

export default form

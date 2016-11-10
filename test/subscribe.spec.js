/**
 * Imports
 */

import test from 'tape'
import flo from 'redux-flo'
import vdux from 'vdux/dom'
import {subscribe} from '../src'
import {element} from 'vdux'

/**
 * Tests
 */

test('should work', t => {
  let node
  const {render, subscribe: _subscribe} = vdux({middleware: [flo()]})
  const off = _subscribe(a => a)

  thing.initialState = () => ({
    changes: 1,
    n: 1
  })

  const Component = subscribe({
    thing
  })({
    render: ({props}) => (<div>{props.thing && props.thing.n}</div>)
  })

  node = render(<Component n={1} />)
  t.equal(node.innerText, '1')
  node = render(<Component n={1} />)
  t.equal(node.innerText, '1')
  node = render(<Component n={2} />)
  t.equal(node.innerText, '2')

  off()
  t.end()

  function * thing (props, state = {}, update) {
    const {n} = props

    if (state.n !== n) {
      const changes = (state.changes || 0) + 1
      yield update({
        n,
        changes
      })
    }
  }
})

/**
 * Imports
 */

import trigger from '@f/trigger-event'
import {element} from 'vdux'
import {Button} from '../src'
import vdux from 'vdux/dom'
import test from 'tape'

/**
 * Tests
 */

test('<Button/> should work with hover', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<Button bgColor='rgb(12, 12, 12)'>test</Button>)
  t.equal(node.style.backgroundColor, 'rgb(12, 12, 12)')

  trigger(node, 'mouseenter')
  node = render(<Button bgColor='rgb(12, 12, 12)'>test</Button>)
  t.equal(node.style.backgroundColor, 'rgb(15, 15, 15)')

  trigger(node, 'mouseleave')
  node = render(<Button bgColor='rgb(12, 12, 12)'>test</Button>)
  t.equal(node.style.backgroundColor, 'rgb(12, 12, 12)')

  off()
  t.end()
})

test('<Button/> should work with tooltips', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  t.plan(3)
  node = render(<Button tooltip='message' bgColor='rgb(12, 12, 12)'>test</Button>)
  t.equal(node.querySelector('.vui-tooltip').style.opacity, '0')
  trigger(node, 'mouseenter')
  node = render(<Button tooltip='message' bgColor='rgb(12, 12, 12)' tooltip='test'>test</Button>)

  setTimeout(() => {
    node = render(<Button tooltip='message' bgColor='rgb(12, 12, 12)' tooltip='test'>test</Button>)
    t.equal(node.querySelector('.vui-tooltip').style.opacity, '1')

    trigger(node, 'mouseleave')
    node = render(<Button tooltip='message' bgColor='rgb(12, 12, 12)'>test</Button>)
    t.equal(node.querySelector('.vui-tooltip').style.opacity, '0')

    off()
    t.end()
  }, 500)
})

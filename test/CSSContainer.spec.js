/**
 * Imports
 */

import trigger from '@f/trigger-event'
import {CSSContainer} from '../src'
import element from 'vdux/element'
import {Block} from 'vdux-ui'
import vdux from 'vdux/dom'
import test from 'tape'

/**
 * Tests
 */

test('<CSSContainer/> should work with hover', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSContainer ui={Block} hoverProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), null)

  trigger(node, 'mouseenter')
  node = render(<CSSContainer ui={Block} hoverProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), 'test')

  trigger(node, 'mouseleave')
  node = render(<CSSContainer ui={Block} hoverProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), null)

  off()
  t.end()
})

test('<CSSContainer/> should work with active', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSContainer ui={Block} activeProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), null)

  trigger(node, 'mousedown')
  node = render(<CSSContainer ui={Block} activeProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), 'test')

  trigger(node, 'mouseup', {bubbles: true})
  node = render(<CSSContainer ui={Block} activeProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), null)

  off()
  t.end()
})

test('<CSSContainer/> should work with focus', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSContainer ui={Block} focusProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), null)

  trigger(node, 'focus')
  node = render(<CSSContainer ui={Block} focusProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), 'test')

  trigger(node, 'blur')
  node = render(<CSSContainer ui={Block} focusProps={{attr: 'test'}} />)
  t.equal(node.getAttribute('attr'), null)

  off()
  t.end()
})

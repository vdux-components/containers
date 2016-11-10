/**
 * Imports
 */

import trigger from '@f/trigger-event'
import {element} from 'vdux'
import {MenuItem} from '../src'
import vdux from 'vdux/dom'
import test from 'tape'

/**
 * Tests
 */

test('<MenuItem/> should work with hover', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<MenuItem bgColor='rgb(12, 12, 12)'>test</MenuItem>)
  t.equal(node.style.backgroundColor, 'rgb(12, 12, 12)')

  trigger(node, 'mouseenter')
  node = render(<MenuItem bgColor='rgb(12, 12, 12)'>test</MenuItem>)
  t.equal(node.style.backgroundColor, 'rgb(15, 15, 15)')

  trigger(node, 'mouseleave')
  node = render(<MenuItem bgColor='rgb(12, 12, 12)'>test</MenuItem>)
  t.equal(node.style.backgroundColor, 'rgb(12, 12, 12)')

  off()
  t.end()
})

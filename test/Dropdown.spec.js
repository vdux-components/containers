/**
 * Imports
 */

import trigger from '@f/trigger-event'
import element from 'vdux/element'
import {Dropdown} from '../src'
import vdux from 'vdux/dom'
import test from 'tape'

/**
 * Tests
 */

test('<Dropdown/> should work', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)

  app()
  t.equal($('.vui-dropdown-menu').style.display, 'none')

  trigger($('#test'), 'click', {bubbles: true})
  app()

  t.equal($('.vui-dropdown-menu').style.display, 'flex')

  stop()
  t.end()

  function app () {
    return render(<Dropdown btn={<div id='test'>Open Dropdown</div>}></Dropdown>)
  }
})

/**
 * Helpers
 */

function $ (selector) {
  return document.querySelector(selector)
}

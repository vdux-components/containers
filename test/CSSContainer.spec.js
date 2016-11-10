/**
 * Imports
 */

import trigger from '@f/trigger-event'
import {CSSContainer} from '../src'
import {element} from 'vdux'
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

  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'starts out unset')

  trigger(node, 'mouseenter')
  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), 'test', 'sets on hover')

  trigger(node, 'mouseleave')
  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'clears on mouseleave')

  // Unhover on normal mouseenter
  trigger(node, 'mouseenter')
  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), 'test', 'sets again on hover')

  // Unhover on mousemove anywhere outside the target
  trigger(document.body, 'mousemove', {bubbles: true})
  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'clears on outside mousemove')

  off()
  t.end()
})

test('<CSSContainer/> should work with active', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSContainer ui={Block} activeProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'starts out unset')

  trigger(node, 'mousedown')
  node = render(<CSSContainer ui={Block} activeProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), 'test', 'sets on mousedown')

  trigger(node, 'mouseup', {bubbles: true})
  node = render(<CSSContainer ui={Block} activeProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'clears on mouseup')

  off()
  t.end()
})

test('<CSSContainer/> should work with focus', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSContainer ui={Block} focusProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'starts out unset')

  trigger(node, 'focus')
  node = render(<CSSContainer ui={Block} focusProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), 'test', 'sets on focus')

  trigger(node, 'blur')
  node = render(<CSSContainer ui={Block} focusProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'clears on blur')

  off()
  t.end()
})


test('<CSSContainer/> should nest and work with multiple concurrently active instances', t => {
  const {render, subscribe} = vdux()
  const off = subscribe(a => a)
  let node

  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}}><CSSContainer ui={Block} id='inner' hoverProps={{name: 'test'}} /></CSSContainer>)

  trigger(node, 'mouseenter')
  trigger(document.getElementById('inner'), 'mouseenter')

  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}}><CSSContainer ui={Block} id='inner' hoverProps={{name: 'test'}} /></CSSContainer>)
  const inner = document.getElementById('inner')

  t.equal(node.getAttribute('name'), 'test', 'sets outer on hover')
  t.equal(inner.getAttribute('name'), 'test', 'sets inner on hover')

  trigger(document.body, 'mousemove', {bubbles: true})

  node = render(<CSSContainer ui={Block} hoverProps={{name: 'test'}}><CSSContainer ui={Block} id='inner' hoverProps={{name: 'test'}} /></CSSContainer>)
  t.equal(node.getAttribute('name'), null, 'clears outer on outside mousemove')
  t.equal(inner.getAttribute('name'), null, 'clears inner on outside mousemove')


  let nameShouldBe
  node = render(<CSSContainer ui={Component} hoverProps={{name: 'test'}} />)

  nameShouldBe = 'test'
  trigger(node, 'mouseenter')
  node = render(<CSSContainer ui={Component} hoverProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), 'asdf', 'actual attribute - set on mouseenter')

  nameShouldBe = undefined
  trigger(node, 'mouseleave')
  node = render(<CSSContainer ui={Component} hoverProps={{name: 'test'}} />)
  t.equal(node.getAttribute('name'), null, 'actual attribute - clear on mouseleave')

  off()
  t.end()

  function Component ({props}) {
    t.equal(props.name, nameShouldBe, 'nested container attribute - set/unset')
    return <CSSContainer ui={Block} hoverProps={{name: 'asdf'}} />
  }
})

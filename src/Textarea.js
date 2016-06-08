/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import {findDOMNode} from 'virtex'
import element from 'vdux/element'
import {Textarea} from 'vdux-ui'
import autosize from 'autosize'
import wrap from './wrap'

/**
 * onCreate
 */

function onCreate (model) {
  return () => setTimeout(() => autosize(findDOMNode(model).querySelector('textarea')))
}

/**
 * <Textarea/> container
 */

function render ({props}) {
  return (
    <Textarea rows={1} {...props} />
  )
}

/**
 * Exports
 */

export default wrap(CSSContainer)({
  onCreate,
  render
})

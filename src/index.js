/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import element from 'vdux/element'
import MenuItem from './MenuItem'
import Dropdown from './Dropdown'
import Button from './Button'
import Input from './Input'

/**
 * Wrap
 */

function wrap (components) {
  const result = {}

  for (let key in components) {
    const Component = components[key]

    result[key] = function render ({props, children}) {
      return (
        <CSSContainer ui={Component} {...props}>
          {children}
        </CSSContainer>
      )
    }
  }

  return result
}

/**
 * Exports
 */

module.exports = {
  ...wrap(require('vdux-ui')),
  CSSContainer,
  Button,
  MenuItem,
  Dropdown,
  Input
}

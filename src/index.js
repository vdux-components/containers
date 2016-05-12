/**
 * Imports
 */

import CSSContainer from './CSSContainer'
import subscribe from './subscribe'
import element from 'vdux/element'
import MenuItem from './MenuItem'
import Dropdown from './Dropdown'
import Tooltip from './Tooltip'
import Button from './Button'
import map from '@f/map-obj'
import Input from './Input'
import wrap from './wrap'

/**
 * Exports
 */

module.exports = {
  // Contained components
  ...map(wrap(CSSContainer), require('vdux-ui')),
  CSSContainer,
  Button,
  MenuItem,
  Dropdown,
  Tooltip,
  Input,

  // Higher-order component wrappers
  subscribe,
  wrap
}

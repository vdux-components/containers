/**
 * Imports
 */

import debounceAction from './debounceAction'
import CSSContainer from './CSSContainer'
import imageLoaded from './imageLoaded'
import subscribe from './subscribe'
import element from 'vdux/element'
import MenuItem from './MenuItem'
import Textarea from './Textarea'
import Dropdown from './Dropdown'
import Tooltip from './Tooltip'
import Toggle from './Toggle'
import Button from './Button'
import map from '@f/map-obj'
import Input from './Input'
import wrap from './wrap'
import form from './form'

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
  Toggle,
  Input,
  Textarea,

  // Higher-order component wrappers
  imageLoaded,
  subscribe,
  wrap,
  form,

  // Utilities
  debounceAction
}

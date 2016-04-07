# MenuItem

Stateful container around [vdux-ui](https://github.com/vdux-components/ui)'s MenuItem component.

## Usage

This wrapper makes MenuItem highlight when it is hovered by default. In addition, it provides you with the [CSSContainer api](https://github.com/vdux-components/containers/tree/master/docs/CSSContainer.md).

```javascript
import {Menu, MenuItem} from 'vdux-containers'

function render ({props}) {
  return (
    <Menu>
      <MenuItem>Hover me</MenuItem>
    </Menu>
  )
}
```

## API - props

  * `hoverProps` - Props to pass along with the item is hovered. If specified, overrides the default `{highlight: true}`.
  * `activeProps` - Applies these props when the item is being pressed
  * `lingerProps` - Applied when the item is being lingered on (hovered over for > 500ms)
  * `focusProps` - When the item has focus

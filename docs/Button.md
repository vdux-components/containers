# Button

Stateful container around [vdux-ui](https://github.com/vdux-components/ui)'s Button component.

## Usage

This wrapper imbues your Button with two new capabilities: highlighting on hover, and showing tooltips on 'linger' (long hover). You can use it like this:

```javascript
import {Button} from 'vdux-containers'

function render ({props}) {
  return (
    Counter: {props.count}
    <Button tooltip='Increment the counter by 1'>increment</Button>
  )
}
```

## API - props

  * `hoverProps` - Props to pass along with the button is hovered. If specified, overrides the default `{highlight: true}`.
  * `activeProps` - Applies these props when the button is being pressed
  * `lingerProps` - Applied when the button is being lingered on (hovered over for > 500ms)
  * `focusProps` - When the button has focus

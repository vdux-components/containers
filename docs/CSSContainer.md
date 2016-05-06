# CSSContainer

Add hover/active/focus/linger state and lets you pass along different props when any of these conditions are true.

## Usage

You use this component by passing `hoverProps`, `activeProps` and `focusProps`. All other props will be forwarded to the underlying component (specified by `ui`).

```javascript
import {Button} from 'vdux-ui'
import {CSSContainer} from 'vdux-containers'

function render ({props, children}) {
  return (
    <CSSContainer ui={Button} {...props} hoverProps={{...(props.hoverProps || {}), highlight: true, tooltipShown: true}}>
      {children}
    </CSSContainer>
  )
}
```

## API - props

  * `ui` - The component you want to render within the container
  * `hoverProps` - Props to pass along when the component is hovered
  * `activeProps` - Props to pass along when the component is active
  * `focusProps` - Props to pass along when the component is focused
  * `lingerProps` - This is a synthetic state that happens if the user hovers over an element for a specified number of milliseconds. That number defaults to `500` but can be set explicitly with the `lingerDelay` prop.
  * `lingerDelay` - How long of a hover is required to trigger the `linger` state.

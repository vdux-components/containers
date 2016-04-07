# CSSContainer

Add hover/active/focus state and lets you pass along different props when any of these conditions are true.

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

## CSSEmulator

This component assumes the presence of [vdux-css-emulator](https://github.com/vdux-components/vdux-css-emulator) beneath it in the hierarchy, or something that provides `onHoverChange`, `onActiveChange`, and `onFocusChange` apis.


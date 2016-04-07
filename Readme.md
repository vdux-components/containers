
# containers

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Container components that wrap presentational components and give them state.

## Installation

    $ npm install vdux-containers

## Containers

  * [CSSContainer](https://github.com/vdux-components/containers/tree/master/docs/CSSContainer.md) - Let's you pass along special props when the component is hovered, focused, or active
  * [Button](https://github.com/vdux-components/containers/tree/master/docs/Button.md) - Manages hover/tooltip state
  * [Dropdown](https://github.com/vdux-components/containers/tree/master/docs/Dropdown.md) - Manages openness
  * [MenuItem](https://github.com/vdux-components/containers/tree/master/docs/MenuItem.md) - Manages hover / css emulation

## Example

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

You can then use that button like:

```javascript
function render () {
  return (
    <Button tooltip='Some hovertext!' activeProps={{border: true}}>
      Hover me!
    </Button>
  )
}
```

## TBD - Composition of containers?

Right now you can do this sort of awkwardly, but it may be nice to come up with a consistent pattern for mixing them together.

## License

MIT

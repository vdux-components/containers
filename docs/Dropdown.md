# Dropdown

Stateful container around [vdux-ui](https://github.com/vdux-components/ui)'s Dropdown and DropdownMenu components.

## Usage

This manages the state around openness so that you don't have to do that yourself:

```javascript
import {Button, Dropdown, MenuItem} from 'vdux-containers'

function render ({props}) {
  return (
    <Dropdown btn={<Button icon='settings' />}>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Account</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Dropdown>
  )
}
```

## API - props

  * `btn` - Accepts JSX. The thing that opens the dropdown. This can also be a function, in which case it will receive an object of the form `{toggle, close}`, which are functions that allow you to determine the opening/closing behavior yourself.
  * `ref` - If you want to use the API directly from outside, you can pass this along, and it'll be called with the dropdown's API `{toggle, close}`.

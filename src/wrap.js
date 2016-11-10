/**
 * Imports
 */

import {component, element} from 'vdux'

/**
 * Wrap a component in a container
 */

export default (Container, defaultProps = {}) => Component => component({
  render ({props, children}) {
    const defProps = typeof defaultProps === 'function'
      ? defaultProps(props)
      : defaultProps

    return (
      <Container {...defProps} ui={Component} {...props}>
        {children}
      </Container>
    )
  }
})

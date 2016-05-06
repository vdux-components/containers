/**
 * Imports
 */

import element from 'vdux/element'

/**
 * Wrap a component in a container
 */

function wrap (Container, defaultProps) {
  return Component => ({
    render ({props, children}) {
      return (
        <Container {...defaultProps} ui={Component} {...props}>
          {children}
        </Container>
      )
    }
  })
}

/**
 * Exports
 */

export default wrap

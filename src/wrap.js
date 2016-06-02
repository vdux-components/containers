/**
 * Imports
 */

import element from 'vdux/element'

/**
 * Wrap a component in a container
 */

function wrap (Container, defaultProps = {}) {
  return Component => ({
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
}

/**
 * Exports
 */

export default wrap

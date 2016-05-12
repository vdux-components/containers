# subscribe

Subscribe a component to external data sources.

## Usage

You can use this higher-order component to inject data from outside sources into the component tree. You use it like this:

```javascript
function render ({props}) {
  const {user} = props

  if (user.loading) return <Spinner />
  if (user.error) return <Error error=0
}

export default subscribe({
  user: function * (props, state, update) {
    const {userId} = props

    if (userId !== state.userId) {
      yield update({
        userId: props.userId,
        loading: true
      })

      try {
        const {value} = yield fetch(`/user/${userId}`)
        yield update({
          loading: false,
          value,
          error: null
        })
      } catch (error) {
        yield update({
          loading: false,
          value: null,
          error
        })
      }
    }
  }
})({
  render
})
```

Your function will be called every time the props passed to the component change. It is your job to figure out if you need to recompute your state or not. The `update` function you are given lets you modify the value of `state`, which will be passed to the underlying component as a prop.

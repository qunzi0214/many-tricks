import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

const lowerCase = ([first, ...rest]) => first.toLowerCase() + rest.join('')

const formatPath = path => {
  /\.\/(\w+)/.test(path)
  return '/' + lowerCase(RegExp.$1)
}

const loadRoutes = files =>
  files
    .keys()
    .reduce((arr, key) => {
      const route = files(key).default
      route.path = formatPath(key)
      return arr.concat(route)
    }, [])

const routes = loadRoutes(require.context('./tricks', true, /index\.jsx$/))
const menus = routes.map(({ path, description }) => ({
  path,
  description,
}))

const Menu = () => {
  return (
    <>
      {menus.map(({ path, description }, i) => (
        <Link to={path} replace key={i}>{path}-{description}</Link>
      ))}
    </>
  )
}

ReactDOM.render(
  <Router>
    <Menu />
    <Switch>
      {routes.map((route, index) => (
        <Route
          path={route.path}
          key={index}
        >
          {route.component}
        </Route>
      ))}
    </Switch>
  </Router>,
  document.getElementById('app'),
)

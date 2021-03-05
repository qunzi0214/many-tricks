import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import styles from './index.less'

const lowerCase = ([first, ...rest]) => first.toLowerCase() + rest.join('')

const formatPath = path => {
  /\.\/(\w+)/.test(path)
  return lowerCase(RegExp.$1)
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
    <nav className={styles.menu}>
      <ul>
        {menus.map(({ path, description }, i) => (
          <li key={i}>
            <Link to={`/${path}`} replace>· {path}</Link>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </nav>
  )
}

ReactDOM.render(
  <Router>
    <main className={styles.root}>
      <Menu />
      <section className={styles.playground}>
        <Switch>
          {routes.map(({ path, component }, index) => (
            <Route
              path={`/${path}`}
              key={index}
            >
              {component}
            </Route>
          ))}
        </Switch>
      </section>
    </main>
  </Router>,
  document.getElementById('app'),
)

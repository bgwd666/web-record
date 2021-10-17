import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
const Home = React.lazy(() => import('./pages/home'));
const Replay = React.lazy(() => import('./pages/replay'));

const Loading = <div>loading...</div>

function AppRouter() {
  return (
    <Switch>
      {/* 录制 */}
      <Route exact path="/">
        <Suspense fallback={Loading}>
          <Home />
        </Suspense>
      </Route>

      {/* 回放 */}
      <Route exact path="/replay">
        <Suspense fallback={Loading}>
          <Replay />
        </Suspense>
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
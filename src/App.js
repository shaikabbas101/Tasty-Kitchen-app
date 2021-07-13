import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import Payment from './components/Payment'
import SignIn from './components/SignIn'
import AddFood from './components/AddFood'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/sign-in" component={SignIn} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/Cart" component={Cart} />
    <ProtectedRoute exact path="/add-food/:id" component={AddFood} />
    <ProtectedRoute exact path="/payment" component={Payment} />
    <Route component={NotFound} />
  </Switch>
)

export default App

require('./index.scss')

const React = require('react')
const {render} = require('react-dom')
const {Router, Route, IndexRedirect, hashHistory} = require('react-router')

const {Dashboard} = require('./dashboard')

const App = ({children}) => children

App.routes = [
    <Route path="dashboard" component={Dashboard} children={Dashboard.routes}/>,
    <IndexRedirect to="dashboard"/>,
]

const Root = () => {
    return <Router history={hashHistory}>
        <Route path="/" component={App} children={App.routes}/>
    </Router>
}

render(<Root/>, document.getElementById('root'))

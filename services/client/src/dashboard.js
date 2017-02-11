require('./dashboard.scss')

const React = require('react')
const {Route, IndexRedirect} = require('react-router')
const {
    Layout, Header, Drawer, Content,
} = require('react-mdl')

const {Posts} = require('./components/posts')

const Dashboard = ({children}) => {
    return <Layout fixedHeader className="dashboard">
        <Header title="channel"></Header>
        <Drawer></Drawer>
        <Content>
            <div className="dashboard-content">{children}</div>
        </Content>
    </Layout>
}
Dashboard.routes = [
    <Route path="posts" component={Posts}/>,
    <IndexRedirect to="posts"/>,
]

module.exports = {
    Dashboard,
}

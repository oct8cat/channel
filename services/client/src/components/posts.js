require('./posts.scss')

const React = require('react')
const {
    Card, CardTitle, CardText, CardActions, CardMenu,
    Button, IconButton,
    Textfield,
} = require('react-mdl')

const PostEditor = ({post, expanded, onChange, onSave, onToggle}) => {
    const onChangeTextfield = (e) => onChange(Object.assign(post, {[e.target.name]: e.target.value}))
    const onSubmit = (e) => { e.preventDefault(); onSave(post) }

    const $text = !expanded ? null : <CardText>
        <Textfield required label="Title" floatingLabel name="title" value={post.title || ''} onChange={onChangeTextfield}/><br/>
        <Textfield required label="Text" floatingLabel name="text" value={post.text || ''} onChange={onChangeTextfield} rows={4}/>
    </CardText>

    const $actions = !expanded ? null : <CardActions style={{textAlign: 'right'}}>
        <Button type="submit" raised colored>Save</Button>
    </CardActions>

    return <form action="/rest/api/post" method="post" onSubmit={onSubmit}>
        <Card className="post-editor" shadow={0} style={{width: 'auto', minHeight: 'auto'}}>
            <CardTitle>New post</CardTitle>
            {$text}
            {$actions}
            <CardMenu>
                <IconButton type="button" name={`keyboard_arrow_${expanded ? 'up' : 'down'}`} onClick={onToggle}/>
            </CardMenu>
        </Card>
    </form>
}
PostEditor.propTypes = {
    post: React.PropTypes.object,
    expanded: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onToggle: React.PropTypes.func,
}

const PostList = ({posts}) => {
    const $posts = posts.map((post, i) => {
        return <Card key={i} shadow={0} className="post-list__item">
            <CardTitle>{post.title}</CardTitle>
            <CardText>{post.text}</CardText>
        </Card>
    })
    return <div className="post-list">{$posts}</div>
}
PostList.propTypes = {
    posts: React.PropTypes.array,
}

const PostCounter = ({posts}) => {
    return <div className="post-counter">Total: {posts.length} posts.</div>
}
PostCounter.propTypes = {
    posts: React.PropTypes.array,
}

const Posts = React.createClass({
    getInitialState: function() {
        return {
            posts: [],
            newPost: {},
            postEditorExpanded: false,
        }
    },
    componentWillMount: function() {
        fetch('/api/rest/post').then(r => r.json()).then(posts => {
            this.setState({posts, numPosts: posts.length})
        })
    },
    render: function() {
        const postEditorOpts = {
            post: this.state.newPost,
            expanded: this.state.postEditorExpanded,
            onToggle: this.togglePostEditor,
            onChange: this.setNewPost,
            onSave: this.savePost,
        }
        return <div className="posts">
            <PostEditor {...postEditorOpts}/>
            <PostCounter posts={this.state.posts}/>
            <PostList posts={this.state.posts}/>
        </div>
    },
    setNewPost: function(newPost) {
        this.setState({newPost})
    },
    togglePostEditor: function() {
        this.setState({postEditorExpanded: !this.state.postEditorExpanded})
    },
    savePost: function(post) {
        fetch('/api/rest/post', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(post)
        }).then(r => r.ok ? r.json() : Promise.reject(r)).then((post) => {
            this.setState({
                newPost: {},
                postEditorExpanded: false,
                posts: [post].concat(this.state.posts),
            })
        })
    }
})

module.exports = {
    Posts,
}

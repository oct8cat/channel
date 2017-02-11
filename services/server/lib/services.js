const createServices = (opts) => {
    return Promise.resolve({
        posts: createPostsService(opts),
    })
}

const createPostsService = ({db}) => {
    const coll = 'posts'
    return {
        list: () => db.collection(coll).find(),
        create: (attrs) => db.collection(coll).insert(attrs).then(result => result.ops[0]),
    }
}

module.exports = {
    createServices,
}

const {createWeb, startWeb} = require('../lib/web')
const {createClient, connectClient} = require('../lib/db')

const start = () => {
    return createClient()
        .then(connectClient)
        .then(db => createWeb({db}))
        .then(startWeb)
}

module.exports = {
    start,
}

if (require.main === module) start().then((web) => {
    console.log('Now running.')
})

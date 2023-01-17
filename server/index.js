require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env          
const {getAllPosts, getCurrentUserPosts, addPost, deletePost} = require('./controllers/posts')
const {register, login}= require('./controllers/auth')
const {isAuthenticated}= require('./middleware/isAuthenticated')
const {sequelize}= require('./util/database')
const {User}= require('./models/Users')
const {Post}= require('./models/Post')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

app.post('/register', register)
app.post('/login', login)
app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync()
.then(()=>{
    app.listen(SERVER_PORT, ()=> console.log(`docked up on ${SERVER_PORT}`))

})
.catch(error => console.log(error))
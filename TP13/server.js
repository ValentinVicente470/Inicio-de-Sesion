const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const contenedorMsg = require('./src/controllers/contenedorMensajes.js')
const contenedorProd = require('./src/controllers/contedorProductos.js')
const contenedorUsers = require('./src/controllers/contenedorUsers.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { response } = require('express')
const session = require('express-session')

const passport = require('passport')
const {Strategy: LocalStrategy} = require('passport-local')

const connectMongo = require('connect-mongo')
const cookieParser = require('cookie-parser')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true }

const MongoStore = connectMongo.create({
    mongoUrl: 'mongodb+srv://ValentinVicente:kpoctmaster470@cluster0.4hxnz.mongodb.net/Cluster0?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 600
})

app.use(express.static('./src/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.use(session({
    store: MongoStore,
    secret: 'MySecretValue',
    resave: false,
    saveUninitialized: false,
}));

//--------------------PASSPORT------------------------------------------------------------------------------------------------------------------------


app.use(passport.initialize())
app.use(passport.session())

passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const {gmail} = req.body
    const usuarios = await contenedorUsers.getUsers()
    const usuario = usuarios.find(usuario => usuario.username == username)
    if(usuario){
        return done('user already registered')
    }

    const user = {
        username,
        gmail,
        password,
    }
    
    await contenedorUsers.saveUser(username, gmail, password)
    return done(null, user)
}))


passport.use('login', new LocalStrategy((username, password, done) => {

    const user = usuarios.find(usuario => usuario.username == username)
    if(!user) {
        return done(mull, false)
    }

    if(user.password != password) {
        return done(null, false)
    }

    return done(null, user)
}))

//-------------Serializar y deserializar-------------------------------------------------------------------------------------------------------------------------------

passport.serializeUser(function(user, done){
    done(null, user.username)
})

passport.deserializeUser(function(username, done){
    const usuario = usuarios.find(usuario => usuario.username == username)
    done(null, usuario)
})

//-------------Middlewares-------------------------------------------------------------------------------------------------------------------------------


function isAuth(req, res, next){
    if (req.isAuthenticated()) {
        next()
    }
    else{
        res.render('login.ejs')
    }
}

//-------------rutasRegister-------------------------------------------------------------------------------------------------------------------------------

app.get('/register', (req, res) =>{
    res.render('register.ejs')
})

app.post('/register', passport.authenticate ('register', {failureRedirect: '/failregister', successRedirect: '/'}))

app.get('/failregister', (req, res) =>{
    res.render('register-error.ejs')
})

//-------------rutasLogin-------------------------------------------------------------------------------------------------------------------------------

app.get('/login', (req, res) =>{

    if(req.isAuthenticated()){
        res.render('index.ejs')
    }
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/datos'}))

app.get('/faillogin', (req, res) =>{
    res.render('login-error.ejs')
})

//-------------rutasDatos-------------------------------------------------------------------------------------------------------------------------------

app.get('/datos', isAuth, (req, res) =>{
    res.render('index.ejs', {
        datos: usuarios.find(usuario => usuario.username == req.user.username)
    })
})

//-------------rutasLogOut-------------------------------------------------------------------------------------------------------------------------------

app.get('/logout', (req, res) =>{
    req.logout(err =>{
        res.redirect('/login')
    })
})

//-------------rutasInicio-------------------------------------------------------------------------------------------------------------------------------

app.get('/', isAuth, (req, res) =>{
    res.render('index.ejs')
})




//--------------------sockets------------------------------------------------------------------------------------------------------------------------

io.on('connection', async (sockets) => {
    console.log('Un cliente se ha conectado!: ' + sockets.id)

    sockets.emit('productos', await contenedorProd.listarProductos())
    sockets.emit('messages', await contenedorMsg.getMSGS())
    

    sockets.on('new-producto', async data => {
        await contenedorProd.insertarProductos(data)
        console.log(data)

        io.sockets.emit('productos', await contenedorProd.listarProductos())
    })

    sockets.on('new-message', async dato => {
        console.log(dato)
        const author = dato.author
        const messageText = dato.text
        const fecha = dato.fecha
        const hora = dato.hora
        await contenedorMsg.saveMSG(author, messageText, fecha, hora)

        io.sockets.emit('messages', await contenedorMsg.getMSGS())
    })
})


//--------------------server------------------------------------------------------------------------------------------------------------------------

const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))
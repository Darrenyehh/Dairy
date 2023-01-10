const express = require('express')
const mongoose = require('mongoose')
const Article = require('./model/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()


mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://DarrenD:14521@cluster0.zdhm950.mongodb.net/test',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))
app.use('/public', express.static('public'))
app.use(methodOverride('_method'))

app.get('/', async(req,res)=> {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles : articles})
})
app.use('/articles',articleRouter)

app.listen(5600)

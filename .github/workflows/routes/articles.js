const express = require('express')
const Article = require('./../model/article')
const { findById } = require('./../model/article')
const article = require('./../model/article')
const { render } = require('ejs')
const router = express.Router()


router.get('/new', (req,res) =>{
    res.render('articles/new', {article : new Article()})
})
router.get('/:id', async (req,res)=> {
    const article = await Article.findById(req.params.id)
    if(article == null){ res.redirect('/')}
        res.render('articles/show', {article : article})

})
router.post('/', async (req, res) => {
    let article = new Article({
        title : req.body.title,
        markdown : req.body.markdown,
        passCode : req.body.passCode
    })
    try {
        if(article.passCode == 'post'){
        article = await article.save()
        res.redirect(`/`)
        }
        else{
            res.render('articles/new', { article : article })
        }
    } catch (e){
        console.log(e)
        res.render('articles/new', { article : article })
    }
})

router.put('/:id', async(req,res) => {
    let article = await Article.findByIdAndUpdate(req.params.id)
    article.passCode = req.body.passCode
    try{
        article = await article.save()
    }
    catch(e){
        console.log(e)
    }
})


router.delete('/:id', async (req,res) =>{
    const article = await Article.findById(req.params.id)
    if(article.passCode == 'delete'){ await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
    }
    else res.redirect('/')
})


module.exports = router
const hbs = require('handlebars');
let router = require('express').Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('68e4f42592d0436a8f8a928de65c8ff5');
const request = require("request");

router.get("/news",(req,res)=>{
newsapi.v2.topHeadlines({
  category: 'technology',
  language: 'en',
  country:'in'
}).then(response => {
 	console.log(response.articles)
 	res.render("news/news_page",{layout:'newslayout' ,resource:response})
});
 	
})
module.exports = router;
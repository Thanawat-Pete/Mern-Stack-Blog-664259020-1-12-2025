const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/Article.controller');

//localhost:5000/api/v1/article/
router.get("/", ArticleController.getAllArticles);
//localhost:5000/api/v1/article/:id
router.get("/:id", ArticleController.getArticleById);
//localhost:5000/api/v1/article/
router.post("/", ArticleController.createArticle);
//localhost:5000/api/v1/article/:id
router.put("/:id", ArticleController.updateArticle);
//localhost:5000/api/v1/article/:id
router.delete("/:id", ArticleController.deleteArticle);

module.exports = router;
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/Article.controller');
const authJWT = require('../middleware/authJwt.middleware');

//localhost:5000/api/v1/article/
router.get("/", ArticleController.getAllArticles);
//localhost:5000/api/v1/article/:id
router.get("/:id", ArticleController.getArticleById);
//localhost:5000/api/v1/article/
router.post("/", authJWT.verifyToken, ArticleController.createArticle);
//localhost:5000/api/v1/article/:id
router.put("/:id",authJWT.verifyToken, ArticleController.updateArticle);
//localhost:5000/api/v1/article/:id
router.delete("/:id", authJWT.verifyToken, ArticleController.deleteArticle);
//localhost:5000/api/v1/article/author/:authorId
router.get("/author/:authorId", ArticleController.getArticleByAuthor);

module.exports = router;
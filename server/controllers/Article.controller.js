const ArticleModel = require('../models/Article');

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20);

    if (!articles || articles.length === 0) {
      return res.status(404).send({ message: 'No articles found' });
    }

    return res.status(200).json(articles);

  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).send({
      message: error.message || 'Error fetching articles'
    });
  }
};

exports.getArticleById= async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: 'Article ID is missing.' });
    }
    try {
        const article = await ArticleModel.findById(id).populate('author', ['username']);
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }
        res.send(article);
    } catch (error) {
        console.error("Error checking existing article:", error);
        res.status(500).send({ message: error.message || 'Error fetching article' });
    }
};

exports.getArticleByAuthor = async (req, res) => {
    const { authorId } = req.params;
    //check authorId
    if (!authorId) {
        return res.status(400).send({ message: 'Author ID is missing.' });
    }
    try {
        //find articles by authorId
        const articles = await ArticleModel.find({ author: authorId }).populate('author', ['username']).sort({ createdAt: -1 });
        if (!articles || articles.length === 0) {
            return res.status(404).send({ message: 'No articles found for this author' });
        }
    res.status(200).send(articles);
    } catch (error) {
        console.error("Error checking existing article:", error);
        res.status(500).send({ message: error.message || 'Error fetching article' });
    }
}

exports.createArticle= async (req, res) => {
    const { title, cover, summary, content } = req.body;
    const  authorId = req.authorId;
    if (!title || !cover || !summary || !content )
    {
        return res.status(400).send({ message: 'All fields are required' });
    } try {
        const existingArticle = await ArticleModel.findOne({ title });
        if (existingArticle) {
            return res.status(400).send({ message: 'An article with this title already exists' });
        }
        const newArticle = new ArticleModel({
            title,
            cover: req.file.filenaseUrl,
            summary,
            content,
            author: authorId
        });
        if (!newArticle) {
            return res.status(400).send({ message: 'Article creation failed' });
        }
        await newArticle.save();
        res.status(201).send(newArticle);
    } catch (error) {
        console.error("Error checking existing article:", error);
        return res.status(500).send({ message: "Internal server error.", error: error.message });
    }
}

exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    const  authorId = req.authorId;
    if (!id) {
        return res.status(400).send({ message: "Article ID is missing" });
    }
    const { title, cover, content, summary } = req.body;

    if (!title || !cover || !content || !summary ) {
        return res.status(400).send({ message: "Please provide all fields" });
    }

    try {
        const articleDoc = await ArticleModel.findOne({
            _id: id,
            author: authorId
        });

        if (!articleDoc) {
            return res.status(404).send({ message: "Post not found " });
        }

        if (articleDoc.length === 0) {
            return res.status(403).send({
                message: "You are not authorized to update this post"
            });
        } else {
            // articleDoc.title = title;
            // articleDoc.cover = cover;
            // articleDoc.content = content;
            // articleDoc.summary = summary;
            // await articleDoc.save();
            const updateArticle = await ArticleModel.findByIdAndUpdate(
                { author: authorId, _id: id },
                { title, cover, content, summary },
                { new: true }
            );

            if (!updateArticle) {
                return res.status(500).send({
                    message: "Cannot update this Article "
                });
            }

            res.send({
                message: "Article updated successfully",
                data: updateArticle
            });
        }
    } catch (error) {
                console.error('Error deleting article:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.authorId;
        if (!id) {
            return res.status(400).send({ message: 'Article ID is missing.' });
        }
        // if (!author) {
        //     return res.status(400).send({ message: 'Author ID is missing.' });
        // }
        const deletedArticle = await ArticleModel.findOneAndDelete({
            author: authorId,
            _id: id
        });
        if (!deletedArticle) {
            return res.status(404).send({
                message: 'Article not found'
            });
        }
        if (deletedArticle.length === 0) {
            return res.status(404).send({
                message: 'Article not found'
            });
        }
        res.status(200).send({
            message: 'Article deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).send({
            message: 'Internal server error',
            error: error.message
        });
    }
};


const Article = require('../models/Article');

exports.getAllArticles= async (req, res) => {
    try{
        const articles = await Article.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
    res.send(articles);
    if (!articles) {
        return res.status(404).json({ message: 'No articles found' });
    }
    res.send(articles);
    res.status(200).json(articles);
    } catch (error) {
        console.error("Error checking existing article:", error);
        res.status(500).json({ message: error.message || 'Error fetching articles' });
    }
};

exports.getArticleById= async (req, res) => {
    const { id } = req.params;
    await Article.findById(id).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.status(500).json({ message: error.message || 'Error fetching article' });
    })
};

exports.createArticle= async (req, res) => {
    const {
        title,
        cover,
        summary,
        content,
        author
    } = req.body;
    if (!title || !cover || !summary || !content || !author)
    {
        return res.status(400).json({ message: 'All fields are required' });
    } try {
        const existingArticle = await Article.findOne({ title });
        if (existingArticle) {
            return res.status(400).json({ message: 'An article with this title already exists' });
        }
        const newArticle = new Article({
            title,
            cover,
            summary,
            content,
            author
        });
        if (!newArticle) {
            return res.status(400).json({ message: 'Article creation failed' });
        }
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error checking existing article:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}


exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        cover,
        summary,
        content,
        author
    } = req.body;
    if (!title || !cover || !summary || !content || !author)
    {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const updatedArticle = await Article.findByIdAndUpdate(id, {
            title,
            cover,
            summary,
            content,
            author
        }, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(updatedArticle);
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

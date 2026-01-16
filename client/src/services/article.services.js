import api from "./api"
const API_URL = import.meta.env.VITE_ARTICLE_URL;

const getArticles = async () => {
    return await api.get(API_URL);
};

const getArticleById = async (id) => {
    return await api.get(API_URL + "/" + id);
};

const getArticlesByAuthor = async (authorId) => {
    return await api.get(`${API_URL}/author/${authorId}`);
}

const createArticle = async(article) => {
    return await api.post(API_URL + "/" , article, 
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}

const updateArticle = async(id, article) => {
    return await api.put(API_URL + "/" + id, article, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

const deleteArticle = async(id) => {
    return await api.delete(API_URL + "/" + id);
}

const articleService = {
    getArticles,
    getArticleById,
    getArticlesByAuthor,
    createArticle,
    updateArticle,
    deleteArticle
};


export default articleService;
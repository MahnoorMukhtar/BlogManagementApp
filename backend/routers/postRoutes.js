const { allPost, getPost, createPost, editPost, deletePost } = require("../controllers/postController")
const { authenticate } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.get('/', allPost)
router.get('/:id', getPost)
router.post('/', authenticate, createPost)
router.put('/:id',authenticate,  editPost)
router.delete('/:id',authenticate, deletePost)

module.exports = router
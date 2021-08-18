const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'create_at'
             ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'create_at', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
               model: User,
              attributes: ['username']
            }

        ]
    })
        .then(dbBlogData => {
            const post = dbBlogData.map(post => post.get({ plain: true }));
            res.render('dashboard', { post, loggedIn: true });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'title',
            'content',
            'create_at'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'create_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbBlogData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router;

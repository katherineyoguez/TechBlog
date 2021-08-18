const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const router = require('express').Router();
router.get('/', (req, res) => {
    Blog.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'create_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'create_at'],
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
            const posts = dbBlogData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/blog/:id', (req, res) => {
    Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'create_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'create_at'],
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
            if (!dbBlogData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbBlogData.get({ plain: true });
            console.log(post);
            res.render('single-post', { blog, loggedIn: req.session.loggedIn });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/blog-comments', (req, res) => {
    Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'create_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'create_at'],
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
            if (!dbBlogData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbBlogData.get({ plain: true });

            res.render('blog-comments', { blog, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
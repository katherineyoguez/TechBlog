const router = require('express').Router();
const { Blog, User, Comment } = require('../..models');
const sequelize = require('../..config/connections');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
    Blog.findAll({
        attributes: ['id',
            'title',
            'content',
            'create_at'
        ],
        order: [
            ['create_id', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }

        ]

    })
    .then(dbBlogData => res.json(dbBlogData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.put('/:id', withAuth, (req, res) => {
    Blog.update({
        title: req.body.title,
        content: req.body.constent
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})
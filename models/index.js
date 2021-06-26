const Blog = require('./Blog');
const Comment = require('./Comment');
const User = require('./User');

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'cascade'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: "cascade"
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

module.exports = { Blog, Comment, User };


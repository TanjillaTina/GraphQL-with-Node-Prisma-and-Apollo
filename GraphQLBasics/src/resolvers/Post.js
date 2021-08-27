const Post = {
  author(parent, args, ctx, info) {
    return ctx.db.usrs.find((usr) => {
      return usr.id === parent.author;
    });
  },
  comments(parent, args, ctx, info) {
    return ctx.db.cmntz.filter((cmt) => {
      return cmt.post === parent.id;
    });
  },
};
export default Post;

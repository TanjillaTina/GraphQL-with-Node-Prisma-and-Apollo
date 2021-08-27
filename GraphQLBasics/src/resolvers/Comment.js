const Comment = {
  author(parent, args, ctx, info) {
    return ctx.db.usrs.find((usr) => {
      return usr.id === parent.author;
    });
  },
  post(parent, args, ctx, info) {
    return ctx.db.postz.find((pst) => {
      return pst.id === parent.post;
    });
  },
};
export default Comment;

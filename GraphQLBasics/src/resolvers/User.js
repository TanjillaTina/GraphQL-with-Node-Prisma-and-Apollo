const User = {
  posts(parent, args, ctx, info) {
    return ctx.db.postz.filter((pst) => {
      return pst.author === parent.id;
    });
  },
};
export default User;

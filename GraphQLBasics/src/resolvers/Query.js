const Query = {
  comments(parent, args, ctx, info) {
    return ctx.db.cmntz;
  },
  allPosts(parent, args, ctx, info) {
    if (!args.query) {
      return ctx.db.postz;
    }
    return ctx.db.postz.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },
  filterUsrsByName(parent, args, ctx, info) {
    if (!args.query) {
      return ctx.db.usrs;
    }
    return ctx.db.usrs.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  allUsers(parent, args, ctx, info) {
    return ctx.db.usrs;
  },
  me() {
    return {
      id: '14235427',
      name: 'Tina',
      email: 'tina@gmail.com',
      age: 23,
    };
  },
  post() {
    return {
      id: 2132,
      title: 'The Title Goes Here',
      body: 'The Post Body Goes Here',
      published: true,
      author: 'Tina',
    };
  },
};
export default Query;

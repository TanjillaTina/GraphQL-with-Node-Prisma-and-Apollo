//Subscription
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count: count,
        });
      }, 1000);
      return pubsub.asyncIterator('count');
    },
  },
  comment: {
    subscribe(parent, { postId }, ctx, info) {
      const post = ctx.db.postz.find((pt) => pt.id === postId);
      if (!post || !post.published) {
        throw new Error('Post Not Found');
      }
      return ctx.pubsub.asyncIterator(`comment ${postId}`); ///channel name would be: 'comment postId'
    },
  },
  post: {
    subscribe(parent, args, ctx, info) {
      return ctx.pubsub.asyncIterator('post'); ///channel name would be: 'post'
    },
  },
};
export default Subscription;

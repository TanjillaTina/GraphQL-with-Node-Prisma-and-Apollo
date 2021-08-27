import { v4 as uuidv4 } from 'uuid';
const Mutation = {
  ///////User Starts Here
  createUserWithInputType(parent, args, ctx, info) {
    const emailTaken = ctx.db.usrs.some(
      (usr) => usr.email === args.userInput.email
    );
    if (emailTaken) {
      throw Error('Email Taken');
    }
    const newUser = {
      id: uuidv4(),
      ...args.userInput,
    };
    ctx.db.usrs.push(newUser);
    return newUser;
  },
  createUserWithSpreadOp(parent, args, ctx, info) {
    const emailTaken = ctx.db.usrs.some((usr) => usr.email === args.email);
    if (emailTaken) {
      throw Error('Email Taken');
    }
    const newUser = {
      id: uuidv4(),
      ...args,
    };
    ctx.db.usrs.push(newUser);
    return newUser;
    // console.log(args);
  },
  createUser(parent, args, ctx, info) {
    const emailTaken = ctx.db.usrs.some((usr) => usr.email === args.email);
    if (emailTaken) {
      throw Error('Email Taken');
    }
    const newUser = {
      id: uuidv4(),
      name: args.name,
      email: args.email,
      age: args.age,
    };
    ctx.db.usrs.push(newUser);
    return newUser;
    // console.log(args);
  },
  deleteUser(parent, args, ctx, info) {
    const userIndex = ctx.db.usrs.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const deletedUser = ctx.db.usrs.splice(userIndex, 1);
    const postzIndex = ctx.db.postz.findIndex((pt) => pt.author === args.id);
    if (postzIndex === -1) {
      throw new Error('User not found');
    }
    ctx.db.postz.splice(postzIndex, 1);
    const cmntzIndex = ctx.db.cmntz.findIndex(
      (comment) => comment.author !== args.id
    );
    ctx.db.cmntz.splice(cmntzIndex, 1);
    return deletedUser[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.usrs.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.usrs.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new Error('Email taken');
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },
  ///////User Ends Here
  //////Post Starts Here
  createPost(parent, args, ctx, info) {
    const userExists = ctx.db.usrs.some((usr) => usr.id === args.author);
    if (!userExists) {
      throw Error('User Not Found');
    }
    const newPost = {
      id: uuidv4(),
      title: args.title,
      body: args.body,
      published: args.published,
      author: args.author,
    };

    ctx.db.postz.push(newPost);
    return newPost;
  },
  createPostWithInputType(parent, args, ctx, info) {
    //postInput
    const userExists = ctx.db.usrs.some(
      (usr) => usr.id === args.postInput.author
    );
    if (!userExists) {
      throw Error('User Not Found');
    }
    const newPost = {
      id: uuidv4(),
      ...args.postInput,
    };

    ctx.db.postz.push(newPost);
    return newPost;
  },
  deletePost(parent, args, ctx, info) {
    const postzIndex = ctx.db.postz.findIndex((pt) => pt.id === args.id);
    if (postzIndex === -1) {
      throw new Error('Post not found');
    }
    const deletedPost = ctx.db.postz.splice(postzIndex, 1);
    const cmntzIndex = ctx.db.cmntz.findIndex(
      (comment) => comment.author !== args.id
    );
    ctx.db.cmntz.splice(cmntzIndex, 1);
    return deletedPost[0];
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.postz.find((post) => post.id === id);

    if (!post) {
      throw new Error('Post not found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }

    return post;
  },
  //////Post Ends Here
  //////Comment Starts Here
  createComment(parent, args, ctx, info) {
    const authorExists = ctx.db.usrs.some((usr) => usr.id === args.author);
    const postExists = ctx.db.postz.some((pst) => pst.id === args.post);
    if (authorExists && postExists) {
      const newComment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post,
      };
      ctx.db.cmntz.push(newComment);
      return newComment;
    } else {
      throw Error('Unable To Find User and Post');
    }
  },
  createCommentWithInputType(parent, args, ctx, info) {
    const authorExists = ctx.db.usrs.some(
      (usr) => usr.id === args.cmtInput.author
    );
    const postExists = ctx.db.postz.some(
      (pst) => pst.id === args.cmtInput.post
    );
    if (authorExists && postExists) {
      const newComment = {
        id: uuidv4(),
        ...args.cmtInput,
      };
      ctx.db.cmntz.push(newComment);
      return newComment;
    } else {
      throw Error('Unable To Find User and Post');
    }
  },
  deleteComment(parent, args, ctx, info) {
    const cmntzIndex = ctx.db.cmntz.findIndex(
      (comment) => comment.id !== args.id
    );
    ctx.db.cmntz.splice(cmntzIndex, 1);
    return deletedPost[0];
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.cmntz.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    return comment;
  },
  //////Comment Ends Here
};
export default Mutation;

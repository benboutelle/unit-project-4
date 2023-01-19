const { Post } = require("../models/Post");
const { User } = require("../models/Users");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("eror in getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getCurrentUserPosts: async (req, res) => {
    console.log("current user posts");
    try {
      const {userId}= req.params
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("error in getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  addPost: async (req, res) => {
    console.log("add post");
    try {
      const { title, content, status, userId } = req.body;
      await Post.create({ title, content, priavatStatus: status, userId });
      res.sendStatus(200);
    } catch (error) {
      console.log("error in addPost")
      res.sendStatus(400)
    }
  },

  editPost: async (req, res) => {
    console.log("edit post");
    try{
      const {id}= req.params
      const {status}= req.body
      await Post.update({privateStatus: status}, {
        where:{id: +id}
      })
      res.sendStatus(200)
    }catch(error){
      console.log('error in editPost')
      console.log(error)
      res.sendStatus(400)
    }
  },

  deletePost: async (req, res) => {
    console.log("delete post");
    try{
      const {id}= req.params
      await Post.destroy({where:{id: +id}})
      res.sendStatus(200)
    }catch (error){
      console.log('error in deletePost')
      console.log(error) 
      res.sendStatus(400)
    }
  },
};

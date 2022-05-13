const handleSuccess = require('../service/handleSuccess')
// const handleError = require('../service/handleError')
const Post = require('../model/postModel')
const User = require('../model/userModel')

const appError = require("../service/appError");

const PostControllers = {
  async getPosts(req, res, next) {
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    const postData = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    handleSuccess(res, postData);
  },
  async createPost(req, res, next) {
    const { body } = req
      if ( body.content ) {
        const newPost = await Post.create({
          user: body.user,
          content: body.content,
        })
        handleSuccess(res, newPost)
      } else {
        // handleError(res)
        return next(appError(400, "請填寫 content 資料，此欄位必填", next))
      }
  },
  // 刪除全部
  async deletePosts(req, res, next) {
    await Post.deleteMany({});
    const postData = await Post.find();
    handleSuccess(res, postData)
  },
  // 刪除單筆
  async deletePost(req, res, next) {
    const { id } = req.params
    const postData = await Post.findByIdAndDelete(id);
    postData == null ? next(appError(400, "無此貼文 id", next)) : handleSuccess(res, postData)
    
    // if (typeof id === undefined || id === null || id.trim() === '') {
    //   return next(appError(404, '無此貼文 id', next));
    // } else {
    //   handleSuccess(res, postData)
    // }
   
  },
  // 編輯單筆
  async updatePost(req, res, next) {
    const { id } = req.params
    const { body } = req
    const postData = await Post.findByIdAndUpdate(
      id, 
      {
        name: body.name,
        content: body.content,
        image: body.image,
        type: body.tags,
        tags: body.type
      }
    )
    postData == null ? next(appError(400, "無此貼文 id", next)) : handleSuccess(res, postData)
  }
}

module.exports = PostControllers
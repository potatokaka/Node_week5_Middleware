const express = require('express')
const router = express.Router()
const PostControllers = require('../controllers/posts')
const handleErrorAsync = require('../service/handleErrorAsync')

// 取得貼文
router.get('/', handleErrorAsync(async (req, res, next)=> {
  /**
    * #swagger.tags = ['Posts 貼文']
    * #swagger.description = '取得<b>全部</b>貼文 API'
    * #swagger.responses[200] = {
        description: 'Some description...',
        schema: {
          "status": true,
          "data": [
            {
              "_id": "627626a03a157745c4a5bc36",
              "user": {
                "_id": "6274db79fb4848bafcdc387f",
                "name": "John",
                "photo": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg"
              },
              "image": "",
              "content": "測試測試",
              "likes": 0
            }
          ]
        }
      }
  */
  PostControllers.getPosts(req, res, next)
}));

// 新增
router.post('/', handleErrorAsync(async (req, res, next)=> {
    /**
      * #swagger.tags = ['Posts 貼文']
      * #swagger.description = '新增貼文 API'
      * #swagger.parameters['body'] = {
          in: "body",
          type: "object",
          required: true,
          description: "資料格式",
          schema: { 
            "$user": "6274db79fb4848bafcdc387f",
            "$content": "test",
            "tags": "團購",
            "type": "group",
          }
        }
      * #swagger.responses[200] = {
            description: 'Some description...',
            schema: {
              "status": true,
              "data": [
                {
                  "_id": "627626a03a157745c4a5bc36",
                  "user": {
                    "_id": "6274db79fb4848bafcdc387f",
                    "name": "John",
                    "photo": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg"
                  },
                  "image": "",
                  "content": "測試測試",
                  "likes": 0
                }
              ]
            }
          }
    */
    PostControllers.createPost(req, res, next)
}));

// 刪除 -全部
router.delete('/', handleErrorAsync(async (req, res, next) => {
    /**
    * #swagger.tags = ['Posts 貼文']
    */
    PostControllers.deletePosts(req, res, next)
}))

// 刪除 -單筆
router.delete('/:id', handleErrorAsync(async (req, res, next) => {
  /**
    * #swagger.tags = ['Posts 貼文']
    * #swagger.security = [{ "apiKeyAuth": [] }]
  */
  PostControllers.deletePost(req, res, next)
}));

// 編輯 -單筆
router.patch('/:id', handleErrorAsync(async(req, res, next) => {
    /**
    * #swagger.tags = ['Posts 貼文']
    */
    PostControllers.updatePost(req, res, next)
}));

module.exports = router;
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser') //讓express可以用POST
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// require express-handlebars here
const exphbs = require('express-handlebars')

// 載入同層的JS檔
// const gTrashTalk = require('./generate_trashTalk.js')

// 引入Jason檔案
const restaurantList = require('./restaurant.json')

// 為了要使用register helper而引入
// const handlebars = require('handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 設定 Express 路由以提供靜態檔案(就是讓CSS或者是JS可以使用)
app.use(express.static('public'))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// register helper
// handlebars.registerHelper('ifEqual', function (job, targetJob, options) {
//   if (job === targetJob) {
//     return options.fn(this)
//   }
//   return options.inverse(this)
// })

// mongoDB資料連線
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// =========== routes setting Start ===========
// 進入index頁面
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
// 進入show頁面
app.get('/show/:restaurant_id', (req, res) => { /* params 動態路由 */
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})
//搜尋電影並將結果列表顯示 
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})
// =========== routes setting End ===========

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
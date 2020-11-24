// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// 引入Jason檔案
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 設定 Express 路由以提供靜態檔案(就是讓CSS或者是JS可以使用)
app.use(express.static('public'))

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
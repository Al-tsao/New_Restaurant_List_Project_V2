const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const listGenerated = require('../restaurantList.js') // 載入 restaurantList
const restaurantList = require('./restaurant.json')

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
  restaurantList.results.forEach(element => {
    listGenerated.create(element) //
  });
})
// 反正Schema裡面的設定就是一個物件，所以直接把restaurant.json中的物件拋進去就可以了
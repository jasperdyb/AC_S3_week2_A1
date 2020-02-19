const express = require('express')
const pug = require('pug')
const bodyParser = require('body-parser')

const app = express()

port = 3000

const task = {
  engineer: ['加個按鈕', '加新功能', '切個版', '改一點 code'],
  designer: ['畫一張圖', '改個 logo', '順便幫忙設計一下', '隨便換個設計'],
  entrepreneur: ['週末加班', '要能賺錢', '想個 business model', '找 VC 募錢']
}

const phrase = ['很簡單', '很容易', '很快', '很正常']

const target = { engineer: '工程師', designer: '設計師', entrepreneur: '創業家' }

task_item = undefined
phrase_item = undefined
error = undefined


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')

app.get('/', function (req, res) {


  res.render('index');
});

app.post('/', (req, res) => {
  target_key = req.body.target
  target_item = undefined

  if (target_key) {
    task_index = Math.floor(Math.random() * task[target_key].length)
    phrase_index = Math.floor(Math.random() * phrase.length)

    target_item = target[target_key]
    task_item = task[target_key][task_index]
    phrase_item = phrase[phrase_index]
    error = undefined
  }
  else {
    console.log('No chosen target.')
    error = '請選擇想說幹話的對象。'
  }
  console.log(error)
  console.log(target_item, task_item, phrase_item)
  res.render('index', { target: target_item, task: task_item, phrase: phrase_item, error })
})

app.listen(port)
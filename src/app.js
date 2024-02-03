const express = require('express')
const app = express()
app.listen(3000)

// routes
app.get('/api',(req,res)=>{
res.send('API online')
})
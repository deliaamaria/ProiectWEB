import express from 'express'
import cors from 'cors'
import { sequelize } from './sequelize.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())


app.listen(5000, async () => {
    console.log('Express web server running on port 5000')
    // try {
    //   await sequelize.authenticate()
    //   console.log('Connection has been established!')
    // } catch (err) {
    //   console.error('Unable to connect to the database!', err)
    // }
})    
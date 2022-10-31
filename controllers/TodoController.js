const m$todo = require('../modules/todo.module')
const { Router } = require('express')
const response = require('../helpers/response')

const TodoController = Router()

/**
 * List todo
 * 
 * http://localhost:8000/api/todos/list
 */
TodoController.get('/list', async (req, res) => {
    const list = await m$todo.listTodo(req.body)

    response.sendResponse(res, list)
})

/**
 * Create Todo
 * @param {number} user_id
 * @param {string} description
 * 
 * http://localhost:8000/api/todos
 */
TodoController.post('/', async (req, res) => {
    const add = await m$todo.createTodo(req.body)

    response.sendResponse(res, add)
})

/**
 * Update todo
 * @param { number } user_id
 * @param { string } description
 * 
 * http:localhost:8000/api/todos
 */
TodoController.put('/', async (req, res) => {
    // req.body input dari client yang berupa json
    const update = await m$todo.updateTodo(req.body)

    // response helper
    response.sendResponse(res, update)
})

/**
 * Delete Todo
 * @param {number} id
 * 
 * http://localhost:8000/api/todos/:user_id
 */
 TodoController.delete('/:id', async (req, res) => {
    const del = await m$todo.deleteTodo(Number(req.params.id))

    response.sendResponse(res, del)
})


module.exports = TodoController
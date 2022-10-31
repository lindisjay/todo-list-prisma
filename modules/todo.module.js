const prisma = require('../helpers/database')
const Joi = require('joi')

class _todo {
    listTodo = async () => {
        try {
            const list = await prisma.todo.findMany()

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listTodo user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    createTodo = async (body) => {
        try {
            // Validation input
            const schema = Joi.object({
                user_id: Joi.number().required(),
                description: Joi.string().required(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await prisma.todo.create({
                data: {
                    user_id: body.user_id,
                    description: body.description,
                    complete: 0
                }
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('createTodo todo module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    updateTodo = async (body) => {
        try {
            // Validation input
            const schema = Joi.object({
                id: Joi.number().required(),
                user_id: Joi.number(),
                description: Joi.string(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
             
            // nama, email, password
            const update = await prisma.todo.update({
                where: {
                    id: body.id
                },
                data: {
                    user_id: body.user_id,
                    description: body.description,
                    complete: 0
                }
            })

            return {
                status: true,
                data: update
            }
            
        } catch (error) {
            console.error('updateTodo todo module Error: ', error)

            return {
                status: false,
                error: error.message
            }
        }
    }

    deleteTodo = async (id) => {
        try {
            // Validation input
            const schema = Joi.number().required()

            const validation = schema.validate(id)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await prisma.todo.delete({
                where: {
                    id: id
                }
            })

            return{
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteTodo todo module Error: ', error)

            return {
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = new _todo()
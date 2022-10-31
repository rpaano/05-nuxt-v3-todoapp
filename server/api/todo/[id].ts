import { db } from "~~/server/db"

export default defineEventHandler((e) => {
    const method = e.req.method
    const context = e.context
    const { id } = context.params

    const findTodoByID = (todoId) => {
        let index

        const todo = db.todos.find((t, i) => {
            if (t.id === todoId) {
                index = i
                return true
            }

            return false
        })

        if (!todo) {
            const notFoundError = createError({
                statusCode: 404,
                statusMessage: "Todo not Found",
                data: {}
            })

            sendError(e, notFoundError)
        }

        return { todo, index }
    }

    if (method === "PUT"){
        const { todo, index } = findTodoByID(id)

        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        }

        db.todos[index] = updatedTodo

        return updatedTodo
    }

    if (method === "DELETE"){
        const { todo, index } = findTodoByID(id)

        db.todos.splice(index, 1)

        return {
            message: "item deleted"
        }
    }
})
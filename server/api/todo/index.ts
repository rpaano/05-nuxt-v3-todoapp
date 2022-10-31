import { db } from "~~/server/db"
import { v4 as uuid } from "uuid";

export default defineEventHandler( async (e) => {

    const method = e.req.method

    if (method === "GET"){
        return db.todos
    }

    if (method === "POST"){
        const body = await useBody(e)

        if (!body.item) {
            const notFoundError = createError({
                statusCode: 400,
                statusMessage: "No item provided",
                data: {}
            })

            sendError(e, notFoundError)
        }

        const newTodo = {
            id: uuid(),
            item: body.item,
            completed: false,
        }

        db.todos.push(newTodo)

        return newTodo
    }
})
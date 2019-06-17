import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    // 1st one is for HTTP request
    // 2nd one is for websocket (subscription)
    const header = request.request ?
    request.request.headers.authorization :
    request.connection.context.Authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        return decoded.userId 
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    }

    return null
}

export { getUserId as default }

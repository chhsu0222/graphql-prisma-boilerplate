import getUserId from '../utils/getUserId'

const User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false)

            if (userId && userId === parent.id) {
                // if user is logged in, he can see his email
                return parent.email
            }

            return null
        }
    }
}

export { User as default }

import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hash('12345', 10),
        isAdmin:true
    },
    {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: bcrypt.hash('12345', 10),
        isAdmin:false
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@email.com',
        password: bcrypt.hash('12345', 10),
        isAdmin:false
    },
]

export default users
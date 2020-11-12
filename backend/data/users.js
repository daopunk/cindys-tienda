import bycrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bycrypt.hashSync('1234', 10),
    isAdmin: true
  },
  {
    name: 'John Dowd',
    email: 'john@example.com',
    password: bycrypt.hashSync('1234', 10)
  },
  {
    name: 'Jane Dowd',
    email: 'jane@example.com',
    password: bycrypt.hashSync('1234', 10)
  }
]

export default users
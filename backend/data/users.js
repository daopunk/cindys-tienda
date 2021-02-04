import bycrypt from 'bcryptjs';

const users = [
  {
    name: 'TEST_ADMIN',
    email: 'admin@example.com',
    password: bycrypt.hashSync('1234$', 10),
    isAdmin: true
  },
  {
    name: 'Cindita',
    email: 'cinditastiendita@gmail.com',
    password: bycrypt.hashSync('1234', 10),
    isAdmin: true
  },
  {
    name: 'Hunter',
    email: 'hking6776@gmail.com',
    password: bycrypt.hashSync('1234$', 10)
  }
]

export default users
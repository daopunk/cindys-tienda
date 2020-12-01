import bycrypt from 'bcryptjs';

const users = [
  {
    name: 'TEST_ADMIN',
    email: 'admin@example.com',
    password: bycrypt.hashSync('123', 10),
    isAdmin: true
  },
  {
    name: 'Cindita',
    email: 'cindymaci010@gmail.com',
    password: bycrypt.hashSync('12345', 10),
    isAdmin: true
  },
  {
    name: 'Hunter',
    email: 'hking6776@gmail.com',
    password: bycrypt.hashSync('123456', 10)
  }
]

export default users
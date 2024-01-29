const users = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Jane Doe'
  }
]


export const getUserById = (id: number, callback: (message: string | null, data?: any) => void) => {
  const user = users.find(user => user.id === id)

  if (!user) {
    return callback(`User with id ${id} not found`)
  }

  return callback(null, user)
}

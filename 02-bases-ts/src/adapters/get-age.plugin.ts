export const getAge = (birthDate: string) => {

  if (!birthDate) throw new Error('birthDate is required')

  return new Date(birthDate).getFullYear() - new Date().getFullYear()
}

export const required = value => (value ? undefined : 'Campo obrigatório')

export const maxLength = max => value =>
  value && value.length > max ? `Deve ter ${max} caracteres ou menos` : undefined

export const minLength = min => value =>
  value && value.length < min ? `Deve ter ${min} caracteres ou mais` : undefined

export const maxLength50 = maxLength(50)
export const maxLength16 = maxLength(16)
export const minLength6 = minLength(6)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'E-mail inválido' : undefined

export function decodeLoginState (isInLoginState) {
  if (isInLoginState) {
    return 'зарегистрироваться'
  }
  return 'войти'
}

export function decodePageTitle (isInLoginState) {
  if (isInLoginState) {
    return 'Аутентификация'
  }
  return 'Регистрация'
}

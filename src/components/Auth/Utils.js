export function decodeLoginState (isInLoginState) {
  if (isInLoginState) {
    return 'зарегистрироваться'
  }
  return 'войти'
}

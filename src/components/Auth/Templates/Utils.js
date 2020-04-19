export function decodeException (exception) {
  switch (exception) {
    case '':
      return '';
    case 'Wrong username or password.':
      return 'Неверный пароль или юзернейм'
    default:
      return exception
  }
}

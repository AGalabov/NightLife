import { validate as validateEmail } from 'email-validator';

export function isValidEmail(email: string) {
  if (!validateEmail(email)) {
    return 'Invalid email address';
  }
  return undefined;
}

export function isValidPassword(password: string) {
  const regexContainsOneNumber = /.*[0-9].*/;
  const regexContainsOneLetter = /.*[a-zA-Z].*/;
  const regexContainsOneSpecialCharacter = /.*([!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/;

  if (password.length < 8) {
    return 'Password must have at least 8 symbols';
  }
  const isValid =
    regexContainsOneNumber.test(password) &&
    regexContainsOneLetter.test(password) &&
    regexContainsOneSpecialCharacter.test(password);

  if (!isValid) {
    return 'Password must contain at least one letter, one number and one special character';
  }
  return undefined;
}

export function isValidFullName(password: string) {
  const fullNameRegex = /[\wа-яa-z- ]+ [\wа-яa-z- ]+/gi;

  if (!fullNameRegex.test(password)) {
    return 'First and Last names are required';
  }
  return undefined;
}

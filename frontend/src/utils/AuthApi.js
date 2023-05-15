import { authUrl } from './constants.js';

const AUTH_HEADERS = {
  'Content-Type': 'application/json'
}

const processResponse = (response, error) => {
	if (response.status === 200 || response.status === 201) {
		return response.json();
	} else {
		console.log('Данные некорректны');
		return Promise.reject(error);
	}
};

const requestConstructor = (endpoint, requestOptions, error) => {
  return fetch(`${authUrl}/${endpoint}`, requestOptions)
    .then(response => processResponse(response, error))
}

const registerUser = formValue => {
  return requestConstructor('signup', {
    method: 'POST',
    headers: AUTH_HEADERS,
    body: JSON.stringify(formValue),
    credentials: 'include'
  }, 'Ошибка регистрации')
}

const loginUser = formValue => {
  return requestConstructor('signin', {
    method: 'POST',
    headers: AUTH_HEADERS,
    body: JSON.stringify(formValue),
    credentials: 'include'
  }, 'Ошибка авторизации')
}

const logout = () => {
  return requestConstructor('logout', {
    method: 'GET',
    credentials: 'include'
  }, 'Ошибка выхода из системы')
}

const getContent = () => {
  return requestConstructor('users/me', {
    method: 'GET',
    headers: AUTH_HEADERS,
    credentials: 'include'
  }, 'Ошибка получения данных')
}

export { registerUser, loginUser, getContent, logout };

import { url } from './constants';
class Api {
  constructor(url) {
    this._url = url;
  }

  _processResponse(response, error) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(error);
  }

  _createRequest(endpointUrl, requestOptions, error) {
    return fetch(`${this._url}/${endpointUrl}`, requestOptions)
      .then(response => this._processResponse(response, error))
  }

  getUserInfo() {
    return this._createRequest('users/me', {
      method: 'GET',
      credentials: 'include'
    }, 'Ошибка авторизации')
  }

  getCardsData() {
    return this._createRequest('cards', {
      method: 'GET',
      credentials: 'include'
    }, 'Ошибка обновления карточек')
  }

  deleteCardData(cardId) {
    return this._createRequest(`cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include'
    }, 'Ошибка удаления карточки')
  }

  updateAvatarData(formData) {
    return this._createRequest('users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    }, 'Ошибка обновления аватара')
  }

  sendCardData(formData) {
    return this._createRequest('cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    }, 'Ошибка добавления карточки')
  }

  updateProfileData(formData) {
    return this._createRequest('users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    }, 'Ошибка обновления профиля')
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
      return this._createRequest(`cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include'
      }, 'Ошибка добавления лайка')
    } else {
      return this._createRequest(`cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include'
      }, 'Ошибка удаления лайка')
    }
  }
}

const api = new Api(url);

export {api};



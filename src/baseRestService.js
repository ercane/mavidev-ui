import axios from 'axios';
import CryptoJS from 'crypto-js';
import Constants from './components/util/Constants'

const TAG = 'BaseService'
export function get(url, successCallback, failCallback) {

  const headers = {
    'Authorization': publicToken(),
    'Content-Type': 'application/json;charset=UTF-8'
  };


  axios.get(url, { headers: headers })
    .then(response => {
      successCallback(response.data);
    }).catch(err => {
      failCallback(getRestErrorMessage(err));
    })
}

export function post(url, data, successCallback, failCallback) {

  const headers = {
    'Authorization': publicToken(),
    'Content-Type': 'application/json;charset=UTF-8'
  };

  axios.post(url, data, { headers: headers })
    .then(response => {
      successCallback(response.data);
    }).catch(err => {
      failCallback(getRestErrorMessage(err));
    })
}

export function put(url, data, successCallback, failCallback) {

  const headers = {
    'Authorization': publicToken(),
    'Content-Type': 'application/json;charset=UTF-8'
  };

  axios.put(url, data, { headers: headers })
    .then(response => {
      successCallback(response.data);
    }).catch(err => {
      failCallback(getRestErrorMessage(err));
    })
}

export function del(url, data, successCallback, failCallback) {

  const headers = {
    'Authorization': publicToken(),
    'Content-Type': 'application/json;charset=UTF-8'
  };

  axios.delete(url, data, { headers: headers })
    .then(response => {
      successCallback(response.data);
    }).catch(err => {
      failCallback(getRestErrorMessage(err));
    })
}


export function publicToken() {
  var secret = Constants.SECRET;
  var timestamp = new Date().getTime();
  var data = {
    secret: secret,
    timestamp: timestamp
  };
  var hash = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(data)));
  return hash;
}

export function getRestErrorMessage(obj) {
  try {
    if (obj.response != undefined && obj.response.data != undefined && obj.response.data.message != undefined)
      return obj.response.data.message;
    else
      return response.message;
  } catch (err) {
    return "Beklenmedik bir hata oluştu";
  }
}




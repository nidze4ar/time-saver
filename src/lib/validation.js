export const date_validation = (str) => {
  const reg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/;
  return ((!isNaN(str) && reg.test(str))) 
}

export const number_validation = (str) => {
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  return ((!isNaN(str) && reg.test(str)) || str === '' || str === '-') 
}

export const string_validation = (str) => {
  const reg = /^[a-zA-Z0-9]+$/;
  return ((!isNaN(str) && reg.test(str))) 
}

export const ID_validation = (id, arr) => arr.map(item => item.id === id).length ? true : false



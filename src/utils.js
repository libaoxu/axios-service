export const deepCopy = (target, ...source) => {

}

export const formatRestFulUrl = (resfulUrl = '', urlData = {}) => 
  Object.keys(urlData || {})
    .reduce((url, key) => url.replace(`$${key}`, urlData[key]), resfulUrl || '')
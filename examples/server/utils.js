const SUCCESS_MSG = 'success'
const SUCCESS_CODE = 0

exports.sucessResponse = function (data) {
  return {
    code: SUCCESS_CODE,
    message: SUCCESS_MSG,
    data
  }
}

exports.code1SuccessResponse = function (data) {
  return {
    code: 1,
    message: SUCCESS_MSG,
    data
  }
}
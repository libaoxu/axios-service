
exports.sucessResponse = function (data) {
  const SUCCESS_CODE = 0
  const SUCCESS_MSG = 'success'
  return {
    code: SUCCESS_CODE,
    message: SUCCESS_MSG,
    data
  }
}
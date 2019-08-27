import { serviceHocs, getRequestsByRoot } from 'axios-service'
import { compose } from 'redux'

const { requestOptsWrapper, setCustomDataWrapper, setCustomParamsWrapper } = serviceHocs
const { get: baseGet, post: basePost, postXForm } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

const requestOpts = {
  msgKey: 'error_msg',
  codeKey: 'dm_error',
  successCode: 0
}

const customData = { name: 'libx', birth: '1996' }

const customParams = { uid: 123, sid: 456 }

const get = requestOptsWrapper(baseGet, requestOpts)

const post = requestOptsWrapper(basePost, requestOpts)

const composeGet = compose(
  fn => setCustomParamsWrapper(fn, customData),
  fn => requestOptsWrapper(fn, requestOpts),
)(baseGet)
  
const composePost = compose(
  fn => setCustomDataWrapper(fn, customData),
  fn => requestOptsWrapper(fn, requestOpts),
  fn => setCustomParamsWrapper(fn, customParams),
)(post)

export const getInfoCustom = get('/api/getInfoCustom')

export const postInfoCustom = post('/api/postInfoCustom')

/**
 * 混合 setCustomDataWrapper 和 requestOptsWrapper 两种预置
 */
export const getInfoCustomComposedData = composeGet('/api/getInfoCustom')

/**
 * 混合 requestOptsWrapper 和 setCustomParamsWrapper 两种预置
 */
export const postInfoCustomComposedParamsAndData = composePost('/api/postInfoCustom')

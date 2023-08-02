import HttpClint from './request'
const baseUrl ="http://127.0.0.1:3000"
const test = (data)=>{
   return HttpClint.request({
        url:`${baseUrl}/test`,
        method:'POST',
        data,
    })
}
const login = (data)=>{
    return HttpClint.request({
         url:`${baseUrl}/login`,
         method:'get',
         data,
     })
 }
 const getUserInfo = ()=>{
  return HttpClint.request({
       url:`${baseUrl}/user`,
       method:'get',
   })
}
export {
    test,
    login,
    getUserInfo
}
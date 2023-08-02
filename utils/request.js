class Request {
    constructor() { }
    request(options) {
        return new Promise((resolve, reject) => {
            wx.request({
                ...options,
                header : {
                    'X-Access-Token':wx.getStorageSync('token'),
                    'Content-Type': 'application/json'
                },
                success(res) {
                    resolve(res)
                },
                reject(err) {
                    reject(err)
                }
            })
        })
    }
}
const HttpClint = new Request()
export default HttpClint;
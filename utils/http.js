// 对象合并
export function merge() {
	var result = {};
	function assignValue(val, key) {
		if (isObject(result[key]) && isObject(val)) {
			result[key] = merge(result[key], val);
		} else {
			result[key] = val;
		}
	}
	for (var i = 0, l = arguments.length; i < l; i++) {
		forEach(arguments[i], assignValue);
	}
	return result;
}
// http规则校验
function urlRegExp(value) {
	return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}

class Http {
    constructor(config = {}) {
        this.config = merge({}, {
                baseUrl: '', // 请求的根域名
                header: {}, // 默认的请求头
                method: 'POST',
                dataType: 'json',
                responseType: 'text', // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
                loading: true, // 默认请求是否开启loading
		}, config)
		// 拦截器
		this.interceptor = {
                // 请求前的拦截
                request: null,
                // 请求后的拦截
                response: null
        }
}

	// 主要请求部分
	request(options = {}) {
		let requestTask = {}
		if (options.loading === undefined) options.loading = this.config.loading
		// 检查请求拦截
		if (this.interceptor.request && typeof this.interceptor.request === 'function') {
			let tmpConfig = {};
			let interceptorRequest = this.interceptor.request(options);
			if (interceptorRequest === false) {
				// 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
				return new Promise(() => {});
			}
			this.options = interceptorRequest;
		}
		options.dataType = options.dataType || this.config.dataType;
		options.responseType = options.responseType || this.config.responseType;
		options.url = options.url || '';
		options.params = options.params || {};
		options.header = merge({}, this.config.header, options.header);
		options.method = options.method || this.config.method;

		return new Promise((resolve, reject) => {
			options.complete = (response) => {
				response.loading = options.loading
				// 判断是否存在拦截器
				if (this.interceptor.response && typeof this.interceptor.response === 'function') {
					let resInterceptors = this.interceptor.response(response);
					// 如果拦截器不返回false，直接接入then回调
					if (resInterceptors !== false) {
						resolve(resInterceptors);
					} else {
						// 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
						reject(response.data || response);
					}
				} else {
					// 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
					resolve(response);
				}
			}
			// 判断用户传递的URL是否/开头,如果不是,加上/，
			options.url = urlRegExp(options.url) ? options.url : (this.config.baseUrl + options.url);

			// 发送请求
			requestTask = wx.request(options);
			if (options.setCancelToken) options.setCancelToken(requestTask)
		})
	}
}
export default Http


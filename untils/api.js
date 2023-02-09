//封装请求
const BASE_URL = 'https://www.uinav.com'; //根地址
export const myRequest = (options)=>{
return new Promise((resolve,reject)=>{
	uni.request({
		url:BASE_URL + options.url,
		method:options.method,
		data:options.data || {},
		success: (res) => {
				//获取为失败时
				// console.log(res)
				if(res.data.meta.status != 200){
				return uni.showToast({
						title:'获取数据为空',
						icon:"error",
						duration:1600,
					})
				}
				//获取成功时
				resolve(res)
		    },
			fail: (err)=>{
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
				
			}
		
	})
})

	//请求数据 事例 在以后的页面中使用封装
	// myRequest({
	// 	url:'',
	// 	method:'POST',
	// 	data:{}
	// })
	
}

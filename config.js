let CONFIG = {
	URL:'',
	UPLOAD_URL:'',
	CRYPTO:'',
}

if(process.env.NODE_ENV === 'development'){
    // 开发环境
	CONFIG.URL = "http://127.0.0.1:8001/api/v1"
}else{
    // 生产环境
    CONFIG.URL = "http://127.0.0.1:8001/api/v1"
}

export default CONFIG
import request from './request'

const URL_MAP = {
	"SHOP_QUERY": "/shop/query",
	"SHOP_QUERY_TOP": "/shop/queryTop",
}

exports.queryTop = (success, fail) => {
	request.post(URL_MAP["SHOP_QUERY_TOP"], {}, success, fail)
}

exports.query = (page, limit, success, fail) => {
	request.post(URL_MAP["SHOP_QUERY"], {
		page,
		limit
	}, success, fail)
}

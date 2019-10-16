import request from './request'
const qs = require('qs');

const URL_MAP = {
	"SHOP_QUERY": "/shop/query",
	"SHOP_QUERY_TOP": "/shop/queryTop",
}

exports.QueryTop = (success, fail) => {
	request.post(URL_MAP["SHOP_QUERY_TOP"], {}, success, fail)
}

exports.Query = (page, limit, success, fail) => {
	const data={
		page,
		limit
	}
	request.post(URL_MAP["SHOP_QUERY"], data, success, fail)
}

import { api, isObject, isString } from '../util/index'

// 根据vdom，创建节点el
export function createEle (vdom) {
	let i, e 
	if( !vdom.el && (i = vdom.text)) {
		e = vdom.el = api.createTextNode(i)
		return vdom
	} 
	if ( (i = vdom.tagName) && vdom.el === null) {
		e = vdom.el = api.createElement(i)
	}else if (vdom.el.nodeType === 1) {
		e = vdom.el
	}
	updateEle(e, vdom)
	return vdom
}

// 根据vdom，往el上添加属性，当不存在旧节点时（新创建），会给el循环创建el children
export function updateEle (e ,vdom, oldVdom) {
	let i
	if( (i = vdom.className).length > 0 ) api.setClass(e, i)
	if( (i = vdom.data) !== null ) api.setAttrs(e, i)
	if( (i = vdom.id) !== null ) api.setId(e, i)
	// 若新节点有子节点，且不存在旧节点时，要循环创建节点
	if( (i = vdom.children) !== null && !oldVdom) api.appendChildren(e, i)
}

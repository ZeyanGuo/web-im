const lan = {
	login:{
		usrname:'账号：',
		password:'密码：',
		loginButton:'登 录',
		IMinfo:'IM 网页版',
		useInfo:'成为新用户:',
		registe:'注册',
	}
}

const transLan = (areaParent,areaChild) => {
	return lan[areaParent][areaChild];
}

export default transLan;
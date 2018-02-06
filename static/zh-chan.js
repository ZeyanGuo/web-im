const lan = {
	login:{
		usrname:'账号：',
		password:'密码：',
		loginButton:'登 录',
		IMinfo:'IM 网页版',
		registeInfo:'成为新用户:',
		registe:'注册',
	},
	registe:{
		usrname:'用户名：',
		password:'密码：',
		checkPwd:'确认密码：',
		registeButton:'注 册',
		IMinfo:'欢迎注册 IM',
		login:'登录',
		loginInfo:'已有账号:',
		phone:'手机号：',
		email:'电子邮箱：',
	}
}

const transLan = (areaParent,areaChild) => {
	return lan[areaParent][areaChild];
}

export default transLan;
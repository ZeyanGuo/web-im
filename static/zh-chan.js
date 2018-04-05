const lan = {
	login:{
		usrname:'账号：',
		password:'密码：',
		loginButton:'登 录',
		IMinfo:'IM 网页版',
		registeInfo:'成为新用户:',
		registe:'注册',
		error:{
			username:'请输入用户名',
			password:'请输入密码',
			noExist:'用户名不存在',
			loginError:'用户名或密码错误',
		}
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
		error:{
			username:'用户名必须大于6个字符',
			password:'密码必须大于6个字符',
			checkPwd:'确认密码与密码不一致',
			phone:'手机号码格式错误',
			email:'邮箱格式错误',
			usernameExist:'用户名已存在',
			registeError:'操作失败，请稍后重试',
			registeSuccess:'注册成功',
			networkError:'操作失败，请检查网络设置',
		}

	},
	main:{
		search:'搜索',
	}

}

const transLan = (areaParent,areaChild) => {
	return lan[areaParent][areaChild];
}

export default transLan;
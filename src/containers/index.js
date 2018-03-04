import React from 'react';
import {	
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import Register from './register'
import Login from './login';

import Main from './main';
import actions from '../redux/actions';
import {connect} from 'react-redux';
import './main.css';



//The Main router class
class AppRouter extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.location !== this.props.location)
			this.props.history.push(nextProps.location);
	}
	componentDidMount(){
		let checkUser = this.props.checkUser;
		window.addEventListener('popstate',()=>{
			
			if(location.pathname === '/assert/login'){
				checkUser({from:'main'},this.props.history);
			}
			if(location.pathname === '/assert/main'){
				checkUser({from:'login'},this.props.history);
			}
		})
	}
	render(){
		return (
			<div>
				<Route path = "/login" component = {Login} />
				<Route path = "/main" component = {Main} />
				<Route history = {this.props.history} path = "/register" component = {Register} />
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		checkUser: (info,history) => dispatch(actions.checkUser(info,history))
	}
}

const mapStateToPropsRouter = (state) => {
	return {
		location:state.loginReducer.location
	}
}

AppRouter = connect(mapStateToPropsRouter,mapDispatchToProps)(AppRouter);




//The parent of Router
class App extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		this.props.checkUser();
	}
	render(){
		return (
			<Router basename = "/assert">
				<Route path = "/" component = {AppRouter} />
			</Router>
		)
	}
}


export default connect(null,mapDispatchToProps)(App);
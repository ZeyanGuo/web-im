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
	render(){
		return (
			<div>
				<Route path = "/login" component = {Login} />
				<Route path = "/main" component = {Main} />
				<Route path = "/register" component = {Register} />
			</div>
		)
	}
}

const mapStateToPropsRouter = (state) => {
	return {
		location:state.loginReducer.location
	}
}

AppRouter = connect(mapStateToPropsRouter)(AppRouter);




//The parent of Router
class App extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		console.log(this.props);
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

const mapDispatchToProps = (dispatch) =>{
	return {
		checkUser: () => dispatch(actions.checkUser())
	}
}

export default connect(null,mapDispatchToProps)(App);
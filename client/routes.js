
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './history';
import { Main, Login, Signup } from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;
		return (
			<Router history={history}>
				<Main>
					<Switch>
						<Route path="/signup" component={Signup} />
						<Route component={Login} />
					</Switch>
				</Main>
			</Router>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		}
	};
};

export default connect(mapState, mapDispatch)(Routes);


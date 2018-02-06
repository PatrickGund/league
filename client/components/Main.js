import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store';

/**
 * COMPONENT
 */
const Main = (props) => {
	const { children } = props;

	return (
		<div>
			<hr />
			{children}
		</div>
	);
};

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
		handleClick() {
			dispatch(logout());
		}
	};
};

export default withRouter(connect(mapState, mapDispatch)(Main));

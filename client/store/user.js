import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_MY_TOTAL_FOLLOWERS = 'UPDATE_MY_TOTAL_FOLLOWERS';

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateMyFollowers = (offset) => ({ type: UPDATE_MY_TOTAL_FOLLOWERS, offset });

/*
 INITIAL STATE
*/

const defaultUser = {};

/**
 * THUNK CREATORS
 */
export const me = () =>
	dispatch =>
		axios.get('/auth/me')
			.then(res =>
				dispatch(getUser(res.data || defaultUser)))
			.catch(err => console.log(err));

export const auth = (email, password, method) =>
	dispatch =>
		axios.post(`/auth/${method}`, { email, password })
			.then(res => {
				dispatch(getUser(res.data));
				history.push('/home');
			})
			.catch(error =>
				dispatch(getUser({ error })));

export const logout = () =>
	dispatch =>
		axios.post('/auth/logout')
			.then(_ => {
				dispatch(removeUser());
				history.push('/login');
			})
			.catch(err => console.log(err));

export const updateUser = (id, info) => (dispatch) => {
	axios.put(`/api/users/${id}`, info)
		.then((res) => {
			dispatch(getUser(res.data));
		})
		.catch(err => console.log(err));
};


export const updateMyTotalFollowers = (offset) => (dispatch) => {
	dispatch(updateMyFollowers(offset));
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
	switch (action.type) {
	case GET_USER:
		return action.user;
	case REMOVE_USER:
		return defaultUser;
	case UPDATE_MY_TOTAL_FOLLOWERS:
		return Object.assign({}, state, { totalFollowers: state.totalFollowers + action.offset });
	default:
		return state;
	}
}

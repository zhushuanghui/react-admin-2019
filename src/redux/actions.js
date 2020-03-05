/*
 * @Author: your name
 * @Date: 2020-02-18 12:52:22
 * @LastEditTime: 2020-03-04 16:21:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-fp-admin/src/redux/actions.js
 */

import { LOGILOAD, RECIVE_USER } from './actionTypes'
import { reqLogin } from '../api'
import { message } from 'antd'

export const isLoad = (value) => ({ type: LOGILOAD, data: value })

export const reciveUser = (user) => ({ type: RECIVE_USER, user })


//登陆

export const login = (values, history) => async dispatch => {
	dispatch(isLoad(true));
	const result = await reqLogin(values);
	if (result.status === 0) {
		const Authorization = result.data.Authorization
		localStorage.setItem('Authorization', Authorization);
		// history.replace('/');
		// window.location.href = '/';
		dispatch(reciveUser(values));
	} else {
		message.warning(result.message)
	}
	dispatch(isLoad(false));
}


import {takeLatest,all,put,call} from 'redux-saga/effects';
import UserActionTypes from '../../redux/user/user.types';
import {clearCart} from './cart.actions';
function* clearCartOnSignout(){
    yield put(clearCart());
}

function* onSignoutSuccess(){
    yield takeLatest(UserActionTypes.SIGNOUT_SUCCESS,clearCartOnSignout);
}

export function* cartSagas(){
    yield all([
        call(onSignoutSuccess)
    ]);
}
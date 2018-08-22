import { call, put, fork, takeLatest } from 'redux-saga/effects';
import AuthService from 'scripts/services/AuthService';
import ApplicationService from 'scripts/services/ApplicationService';

// selector
const getState = (state, type) => state[type];

//*****************create root worker********************
/**
 * get access_token
 */
function* getAuthInfo() {
    let token = sessionStorage.getItem('access_token');
    
    if (token) {
        yield put({ type: "updateAuthInfo", authInfo: { access_token: token } });
        //get userInfo
        yield fork(getUserInfo, { access_token: token });
    } else {
        yield put({ type: "updateAuthInfo", authInfo: { access_token: null } });
    }
}

function* login(action) {
    try {
        const authInfo = yield call(AuthService.login, action.username, action.password);
        sessionStorage.setItem('access_token', authInfo.access_token);
        //get userInfo
        yield fork(getUserInfo, { access_token: authInfo.access_token });
    } catch (err) {
        yield put({ type: "updateAuthInfo", authInfo: { access_token: null }  });
    }
}

/**
 * get userInfo by access_token
 */
function* getUserInfo(action) {
    try {
        const userInfo = yield call(AuthService.getUserInfoByToken, action.access_token);
        yield put({ type: "updateAuthInfo", authInfo: { access_token: action.access_token } });
        yield put({ type: "updateUserInfo", userInfo: userInfo.data });
        // get app data
        yield call(getAppData);
    } catch (err) {
        // todo: error tip
        yield put({ type: "updateAuthInfo", authInfo: { access_token: null }  });
        yield put({ type: "updateUserInfo", userInfo: null });
    }
}

/**
 * get all appData
 */
function* getAppData() {
    try {
        const appData = yield call(ApplicationService.getAppSet);
        yield put({ type: "updatAppMap", appMap: appData.data });
    } catch (err) {
        yield put({ type: "updateAuthInfo", authInfo: { access_token: null }  });
        yield put({ type: "updateUserInfo", userInfo: null });
        yield put({ type: "updatAppMap", appMap: null });
    }
}

//*****************create worker********************
function* appSaga() {
    yield takeLatest('CHECK_AUTHINFO', getAuthInfo);
    yield takeLatest('TO_LOGIN_IN', login);
    yield takeLatest('LOAD_APP', getAppData);
}

export default appSaga;
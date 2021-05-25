import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  auth,
  getCurrentUser,
  GoogleProvider,
  handleUserProfile,
} from "../../firebase/utils";
import {
  signInSuccess,
  signOutUserSuccess,
  userError,
  resetPasswordSuccess,
  setUsers,
  setUser,
  fetchUsersSuccess,
  fetchUsersStart,
  fetchUserSuccess,
} from "./user.actions";
import {
  handleDeleteUser,
  handleEditUser,
  handleFetchUser,
  handleFetchUsers,
  handleResetPasswordAPI,
} from "./user.helper";
import userTypes from "./user.types";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);

    // dispatch({
    //   type: userTypes.SIGN_IN_SUCCESS,
    //   payload: true,
    // });
  } catch (error) {
    console.log(error);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      return;
    }
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    console.log(error);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (error) {
    console.log(error);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
  payload: { displayName, email, password, confirmPassword },
}) {
  if (password !== confirmPassword) {
    const err = ["Password don't match!"];
    yield put(userError(err));
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
    // yield call(handleUserProfile, {
    //   userAuth: user,
    //   additionalData: {
    //     displayName,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
  } catch (error) {
    console.log(error);
    yield put(userError(error));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.log(error);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* fetchUsers() {
  try {
    const users = yield handleFetchUsers();
    yield put(fetchUsersSuccess());
    yield put(setUsers(users));
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchUsersStart() {
  yield takeLatest(userTypes.FETCH_USERS_START, fetchUsers);
}

export function* deleteUser({ payload }) {
  try {
    yield handleDeleteUser(payload);
    yield put(fetchUsersStart());
  } catch (error) {
    console.log(error);
  }
}

export function* onDeleteUserStart() {
  yield takeLatest(userTypes.DELETE_USER_START, deleteUser);
}

export function* fetchUser({ payload }) {
  try {
    const userObject = yield handleFetchUser(payload);
    yield put(setUser(userObject));
    yield put(fetchUserSuccess());
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchUserStart() {
  yield takeLatest(userTypes.FETCH_USER_START, fetchUser);
}

export function* editUser({ payload }) {
  try {
    yield handleEditUser(payload);
    yield put(fetchUsersStart());
  } catch (error) {
    console.log(error);
  }
}

export function* onEditUserStart() {
  yield takeLatest(userTypes.EDIT_USER_START, editUser);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
    call(onFetchUsersStart),
    call(onDeleteUserStart),
    call(onFetchUserStart),
    call(onEditUserStart),
  ]);
}

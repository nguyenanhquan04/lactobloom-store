import request from './axios';

const login = (email, password) => {
    return request.post('auth/login', {
        email: email,
        password: password
    });
};

const register = (fullName, email, password) => {
    return request.post('auth/register',{
        fullName: fullName,
        email: email,
        password: password
    });
}

const logOut = () => {
    return request.post('auth/logout');
}

const userInfo =() => {
    return request.get('user/info');
}

export { login, register, logOut, userInfo }; 
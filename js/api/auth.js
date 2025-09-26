import request from '../utils/request';

//get All proposal
export const requestLogin = (params) => { return request.post(`auth/login`, params).then(res => res.data); };

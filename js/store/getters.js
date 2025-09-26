const getters = {

    token: state => state.user.token,
    // status: state => state.user.status,
    name: state => state.user.name,
    roles: state => state.user.roles,
    // permissions: state => state.user.permissions,
    email:state=>state.user.email,
    // // introduction: state => state.user.introduction,
    designation:state=>state.user.designation,
    status: state => state.user.status,
    group_code:state=>state.user.group_code,
    // errorLogs: state => state.errorLog.logs,
    isAuthenticated: state => state.user.token,
    authStatus: state => state.user.status,
    profile: state => state.user.profile,

    permission_routers: state => state.permission.new_routers,
    // addRouters: state => state.permission.addRouters,
    language: state => state.app.language,

}
export default getters
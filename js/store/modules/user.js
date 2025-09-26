import {
    requestLogin,
    changePassword,
    refreshToken
} from '../../api/auth'

const user = {
    state: {
        // status: localStorage.getItem('status') || null,
        token: localStorage.getItem('token') || null,
        // name: localStorage.getItem('first_name') || null,
        // profile: localStorage.getItem('profile') || null,
        email: localStorage.getItem('email') || null,
        // roles: localStorage.getItem('roles') || [],
        status: localStorage.getItem('active') || null,
        // designation: localStorage.getItem('designation') || null,
        // group_code: localStorage.getItem('group_code') || null,
        // permissions: [],
        // roles: [],

    },

    mutations: {

        SET_TOKEN: (state, token) => {
            state.token = token
        },

        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },

        SET_ROLES: (state, roles) => {
            state.roles = roles
        },

        SET_GROUP: (state, group_code) => {
            state.group_code = group_code
        },

        SET_PROFILE: (state, profile) => {
            state.profile = profile
        },
        SET_PRIVILEGE: (state, privileges) => {
            state.privileges = privileges
        },
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_DESIGNATION: (state, designation) => {
            state.designation = designation;
        },
        // SET_PERMISSIONS:(state,permissions)=>{
        //   state.permissions = permissions
        // },
        SET_LOGOUT(state) {
            localStorage.removeItem('token')
            state.token = null
            state.authenticated = false
            state.profile = null
            state.permissions = []
            state.email = null
            state.name = null
            state.status = null
            state.designation = null

            state.menus = []
            state.menus2 = []
            state.privilege = []
            state.group_code = null


            //storage clear
            localStorage.removeItem("email");
            // localStorage.removeItem("first_name");
            localStorage.removeItem("isAuthenticated");
            // localStorage.removeItem("profile");
            localStorage.removeItem("id");
            // localStorage.removeItem("privileges");
            // localStorage.removeItem("roles");
            // localStorage.removeItem("designation");

            // localStorage.removeItem("menus");
            // localStorage.removeItem("menus2");
            // localStorage.removeItem("privilege");
            // localStorage.removeItem("group_code");
        }
    },

    actions: {

        requestLogin({
            commit,
            dispatch
        }, userInfo) {
            const username = userInfo.username.trim()

            var submitParams = new FormData();

            submitParams.append("email", username);
            submitParams.append("password", userInfo.password);
            return new Promise((resolve, reject) => {
                requestLogin(submitParams).then(response => {
                        console.log(response);

                        if (response.error == 'Unauthorized') {

                            reject(response);
                        }
                        // var response = response;
                        if (!response.error) {

                            const data = response
                            commit('SET_TOKEN', data.access_token)

                            // commit('SET_STATUS', data.profile.user.status)
                            // commit('SET_STATUS', data.status)
                            // commit('SET_PROFILE', data.profile)
                            // commit('SET_PRIVILEGE', data.profile.group.privileges)
                            // commit('SET_NAME', data.profile.firstName)
                            commit('SET_EMAIL', data.user.email)
                            commit('SET_ID', data.user.id)
                            // commit('SET_ROLES', data.profile.roles)
                            // commit('SET_DESIGNATION', data.profile.designation)
                            //
                            // commit('SET_GROUP', data.profile.group.code)
                            //
                            // dispatch('GenerateRoutes', data.profile.group.modules)

                            localStorage.setItem('token', data.access_token)
                            localStorage.setItem("isAuthenticated", 1);
                            // localStorage.setItem("profile",JSON.stringify(data.profile));
                            // localStorage.setItem("privilege",JSON.stringify(data.profile.group.privileges));
                            localStorage.setItem("email", data.user.email);
                            localStorage.setItem("id", data.user.id);
                            // localStorage.setItem("first_name",data.profile.firstName);
                            // localStorage.setItem("roles",data.profile.roles);
                            //
                            // localStorage.setItem("designation", data.profile.designation);
                            // localStorage.setItem("group_code", data.profile.group.code);
                            //
                            // setToken(response.data.token.access_token)
                            // setToken(response.data.token.access_token)
                            resolve(response)
                        } else {

                            reject(response);
                            // alert('rj');
                        }
                    })
                    .catch(error => {

                        reject(error);
                    })
            });
        },

        changePassword({
            commit
        }, password) { //change status 2 (system generated password) to 1

            var submitParams = new FormData();
            submitParams.append("password", userInfo.password);
            return new Promise((resolve, reject) => {
                changePassword(submitParams).then(response => {
                    if (response.code == 200) {
                        const data = response.data
                        commit('SET_STATUS', 'ACTIVE') //Change Status to 1 as active user with reset own password
                        resolve()
                    } else if (response.code == 500) {
                        reject(response);
                    }
                }).catch(error => {

                    reject(error)
                })

            }).catch(error => {
                reject(error)
            })

        },

        refreshToken({
            state,
            commit
        }) {
            // console.log('The current state token is ', state.token);
            // debugger;
            refreshToken(state.token).then(response => {
                const data = response.data;
                commit('SET_TOKEN', data.token.access_token)
                // localStorage.setItem('token',data.token.access_token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        },

        //Logout

        logOut({
            commit,
            state,
            dispatch
        }) {
            return new Promise((resolve, reject) => {
                commit('SET_LOGOUT');

                //clear store
                dispatch('ClearDynamicRoutes', null);

                resolve()
                // }).catch(error => {
                //   reject(error)
                // })
            }).catch(error => {
                console.log();
            })
        },

        // setFirstName({ commit }, firstname) {
        //     commit('SET_NAME', firstname)
        // },

        // setDesignation({ commit }, designation) {
        //     commit('SET_DESIGNATION',designation)
        // }

    }
}

export default user
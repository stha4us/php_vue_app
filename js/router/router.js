import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// import Welcome from '../components/Example';

import Role from "../components/Role";
import PermissionRoles from "../components/PermissionRoles";
import Vuetabletwo from "../components/Vuetabletwo";
import Suppliers from "../components/Suppliers";

Vue.use(Router);

/*
    Import Required components
*/
import Login from "../views/Login.vue";
// import Welcome from '../components/Example';

import Master from "../views/Master";
import Dashboard from "../views/Dashboard";
import AddUser from "../views/user/AddUser";
import EditUser from "../views/user/EditUser";
import ViewUser from "../views/user/ViewUser";
import Profile from "../views/user/Profile";
import UserProfile from "../views/user/UserProfile";

//import manage views
import Unit from "../views/manage/Unit";
import StoreSetting from "../views/manage/StoreSetting";

// import Users from "../components/Users";
import Roles from "../views/user/Roles";
// import RoleUser from "../components/RoleUser";
import AssignRole from "../views/user/AssignRole";
// import Permissions from '../components/Permissions';
// import PermissionRole from '../components/PermissionRole';

/*
   Function to check authentication
*/
function requireAuth(to, from, next) {
  // if (!!store.getters.isAuthenticated) {
  if (!localStorage.getItem("token")) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath
      }
    });
  } else {
    next();
  }
}

export const constantRouterMap = [
  {
    path: "/",
    name: "Login",
    component: Login,
    hidden: true,
    meta: {
      title: "Login",
      roles: ["ABC", "abc"]
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    hidden: true,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/dashboard-path",
    name: "DASHBOARD-HOME",
    component: Master,
    leaf: true,
    iconCls: "icon-home  icon-blue",
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        name: "DASHBOARD"
      },
      {
        path: "/profile",
        component: Profile,
        name: "Profile"
      }
    ],
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true
    }
  },

  // {
  //     path: '/home',
  //     name: 'welcome',
  //     component: Welcome,
  //     props: {
  //         title: "home"
  //     }
  // },

  {
    path: "/User",
    name: "USER",
    component: Master,
    children: [
      {
        path: "/user/add",
        component: AddUser,
        name: "Add New User"
      },
      {
        path: "/user/:id/edit",
        component: EditUser,
        name: "Edit",
        hidden: true
      },
      {
        path: "/user/view",
        component: ViewUser,
        name: "View User"
      },
      {
        path: "/role",
        component: Roles,
        name: "User Role"
      },
      {
        path: "/roleuser/edit",
        component: AssignRole,
        name: "Asign Role"
      },
      {
        path: "/user/:id/profile",
        component: UserProfile,
        name: "User Profile",
        hidden: true
      }
    ],
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true
    }
  },

  // {
  //     path: '/users',
  //     name: 'DASHBOARD',
  //     component: Master,
  //     leaf: true,
  //     children: [{
  //         path: '/users/view',
  //         component: Users,
  //         name: 'USERS'
  //     }, ],
  //     beforeEnter: requireAuth,
  //     meta: {
  //         requiresAuth: true
  //     },
  // },
  {
    path: "/roleuser",
    name: "ROLES",
    component: Master,
    children: [
      {
        path: "/roles/list",
        component: Role,
        name: "EDIT-ROLES"
      },
      {
        path: "/roles/edit",
        component: PermissionRoles,
        name: "ROLE-PERMISSION"
      }
    ],
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true
    }
    // props: { title: "roleuser" }
  },

  {
    path: "/manage",
    name: "MANAGE",
    component: Master,
    children: [
      {
        path: "/manage/vuetable2",
        component: Vuetabletwo,
        name: "SUPPLIERS"
      },
      {
        path: "/manage/view",
        component: Suppliers,
        name: "SUPPLIERS-TABLE"
      }
    ],
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true
    }
    // props: { title: "roleuser" }
  },
  {
    path: "/manage",
    component: Master,
    name: "MANAGE",
    leaf: false,
    children: [
      {
        path: "/manage/unit",
        component: Unit,
        name: "Unit"
      },
      {
        path: "/manage/store",
        component: StoreSetting,
        name: "Store"
      }
    ]
  }

  // { path: '*', redirect: '/404', hidden: true }
];
export default new Router({
  mode: "history",
  base: __dirname,
  routes: constantRouterMap
});

export const asyncRouterMap = [
  // userRouter
];

<template>
  <div>
    <vue-headful title="SI | Login"/>

    <!--<Topheader></Topheader>-->
    <!--<Header> </Header>-->

    <el-row style="margin-top:15px;"></el-row>
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <div class="header-logo">
        <!--<img src="../assets/tz_logo.png" alt="" width="100">-->
      </div>

      <h2 class="title">Smart Inventory</h2>

      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm2.username"
          auto-complete="off"
          placeholder="username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          placeholder="password"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">Remember</el-checkbox>
      <a @click="forgetPassword">Password Forget</a>

      <el-form-item style="width:100%;">
        <el-button
          class="margin-bottom-20 font-white"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit2"
          :loading="loading"
        >Login</el-button>
        <!--<el-button type="default" style="width:100%;" @click.native.prevent="handleRegister"> {{ $t("Login.register")}}</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Header from '@/components/Header'

// import Topheader from '@/components/TopHeader'
// import {constantRouterMap} from '@/router/router'

// import localeSwitcher from '@/components/LocaleSwitcher'

// import local from '@/views/frontend/translation'
// const viewName = 'Login'

export default {
  name: "I18n",
  // components:{ Header,
  //     Topheader,},
  data() {
    //     var checkPassword = (rule, value, callback)=>{

    //   if(!value){
    //     return callback(this.$t("Login.passwordRequired"))
    //   }else{
    //     return callback();
    //   }
    // };

    //  var checkUsername = (rule, value, callback)=>{
    //   if(!value){
    //     return callback(this.$t("Login.usernameRequired"))
    //   }else {
    //     // console.table({value,rule,callback});
    //     return callback();
    //   }
    // }

    return {
      loading: false,
      ruleForm2: {
        username: "deb.katwal@gmail.com",
        password: "123456"
      },
      // credentials: false,
      rules2: {
        username: [
          //  {required:false, validator: checkUsername, trigger: "blur"},
          { required: true, message: "username required", trigger: "blur" },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "password required", trigger: "blur" },

          {
            min: 5,
            message: "Password length must be greater than 5 characters",
            trigger: "blur"
          }
        ]
      },
      checked: true
    };
  },
  created() {
    // if (!this.$i18n.getLocaleMessage('en')[viewName]) {
    //     this.$i18n.mergeLocaleMessage('en', local.en)
    //     this.$i18n.mergeLocaleMessage('sw', local.sw)
    // }
  },

  mounted() {
    // console.log("URL:" + window.location);
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },

    forgetPassword() {
      this.$router.push({ path: "/forget-password" });
    },
    handleSubmit2() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("requestLogin", this.ruleForm2)
            .then(response => {
              // alert('success');
              this.$router.push("/dashboard");
            })
            .catch(error => {
              //reject handling
              this.loading = false;
              if (error.code == 500 && error.retries > 0) {
                this.$message({
                  showClose: true,
                  message:
                    "Invalid credentials, your remaining attempt is " +
                    5 -
                    parseInt(error.retries),
                  type: "error"
                });

                if (error.retries == 5) {
                  this.$router.push("/forget-password");
                }
              } else if (error.code == 401) {
                this.$message({
                  showClose: false,
                  message:
                    "Your account has not been activated, please check your mail for the activation link.",
                  type: "error",
                  duration: 20000
                });
              } else {
                this.$message({
                  showClose: true,
                  message: error.data + error.response.data.error,
                  type: "error"
                });
              }
            });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
      // }).catch(error => {
      //     loading.close();
      //     this.$message({
      //       showClose: true,
      //       message: "Oops, something went wrong.",
      //       type: "error"
      //     });
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;

  margin-top: 30px !important;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  a {
    text-decoration: none;
    margin-left: 110px;
    color: #399cff;
    cursor: pointer !important;
  }
}

.el-button + .el-button {
  margin-left: 0px !important;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.logo {
  margin-top: 40px;
}
.el-button {
  border: 1px solid #98afe4 !important;
}
.header-logo {
  text-align: center;
  width: 90px;
  height: 90px;
  border-radius: 90px;
  border: 4px solid #eeeeee;
  // margin-top:30px;
  vertical-align: middle;
  overflow: hidden;
  margin: auto;
  margin-bottom: 10px;
}
.header-logo img {
  width: 100%;
}
.login {
  float: left;
}
.register {
  float: right;
}
.lightblack-font {
  color: #929292 !important;
  font-size: 13px !important;
  font-weight: normal !important;
}
.font-blue {
  color: #28409a;
}
</style>
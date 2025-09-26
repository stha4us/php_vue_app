<template>
  <div>
    <div class="scuccess" v-if="success">
      <el-alert title="Successfully User Added" type="success" center show-icon>{{errorMessage}}</el-alert>
    </div>

    <div class="errors" v-if="error">
      <el-alert title="User can't be Added" type="error" center show-icon></el-alert>
    </div>
    <!--Add user form -->
    <el-card shadow="always">
      <el-form
        :model="addUserForm"
        :rules="addUserFormRules"
        ref="addUserForm"
        class="demo-ruleForm"
        v-if="userForm"
      >
        <h3 class="title">Enter User Basics</h3>

        <el-form-item prop="username">
          <el-input placeholder="Enter UserName" v-model="addUserForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input type="email" placeholder="Enter Email" v-model="addUserForm.email"></el-input>
          <div v-if="emailError" class="el-form-item__error">Email Already taken</div>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" placeholder="Provide Password" v-model="addUserForm.password"></el-input>
        </el-form-item>

        <el-form-item label="Active">
          <el-switch v-model="addUserForm.active"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="validateUser">Next</el-button>
          <el-button>
            <router-link :to="{ name: 'View User' }">Cancel</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--End of Add user form -->

    <!-- User Detail form -->
    <el-card shadow="always">
      <el-form :model="userDetail" ref class="user-detail-form" v-if="showUserDetailForm">
        <h3 class="title">Enter User Details</h3>

        <el-form-item label="Firstname" prop>
          <el-input placeholder="Enter Firstname" v-model="userDetail.firstname"></el-input>
        </el-form-item>

        <el-form-item label="Lastname" prop>
          <el-input placeholder="Enter Lastname" v-model="userDetail.lastname"></el-input>
        </el-form-item>

        <el-form-item label="Contact Primary" prop>
          <el-input
            type="number"
            placeholder="Enter Mobile Number"
            v-model="userDetail.mobile_primary"
          ></el-input>
        </el-form-item>

        <el-form-item label="Contact Secondary" prop>
          <el-input
            type="number"
            placeholder="Enter Mobile Number"
            v-model="userDetail.mobile_secondary"
          ></el-input>
        </el-form-item>

        <el-form-item label="Address">
          <el-input placeholder="Enter Full Address" v-model="userDetail.address"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="showUserDetailForm=false;userForm=true;">Previous</el-button>
          <el-button type="primary" @click="addNewUser">Create</el-button>
          <el-button>
            <router-link :to="{ name: 'View User' }">Cancel</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- End of User Detail Form -->
  </div>
</template>

<!--Scripts -->
<script>
import axios from "axios";
export default {
  data() {
    return {
      addUserForm: {
        id: "",
        username: "",
        email: "",
        password: "",
        active: false
      },
      userDetail: {
        firstname: "",
        lastname: "",
        mobile_primary: "",
        mobile_secondary: "",
        address: ""
      },
      output: "",
      success: false,
      error: false,
      errorMessage: "",
      showUserDetailForm: false,
      userForm: true,
      emailError: false,
      //rules for form fields
      addUserFormRules: {
        username: [
          { required: true, message: "Please input user name", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "Plesea enter email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" }
        ]
      }
      //end for rules in form field
    };
  },
  methods: {
    /* -----------------------------------------------
      method to validate and show new form on next key
    -------------------------------------------------*/
    validateUser() {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          axios
            .post("/api/user/checkmail", {
              mail: this.addUserForm.email
            })
            .then(response => {
              this.showUserDetailForm = true;
              this.userForm = false;
            })
            .catch(error => {
              this.emailError = true;
            });
        } else {
          alert("enter valid data");
          return false;
        }
      });
    },

    /* ----------------------
      post new user to server
    -------------------------*/
    addNewUser(e) {
      var vm = this;
      // this.$refs.addUserForm.validate(valid => {
      // if (valid) {
      axios
        .post("/api/user/add", {
          formData: this.addUserForm,
          detailData: this.userDetail
        })
        .then(response => {
          if (response.status === 201) {
            this.successUpdate();
            this.$router.push("/user/view");
          }
        })
        .catch(function(error) {
          console.log(error);
          vm.error = true;
          vm.success = false;
          alert(error);
        });
      // } else {
      //   console.log("validation errors");
      //   return false;
      // }
      // });
    },
    //end of addNewUSer method

    /*------------
     Alert Success
    --------------*/
    successUpdate() {
      this.$notify({
        title: "Created",
        message: "User Created Successfully",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 50px;
}

.demo-ruleForm .el-form-item,
.title {
  width: 40%;
  margin: auto;
  margin-bottom: 20px;
}
@media only screen and (max-width: 720px) {
  .el-form-item,
  .title {
    width: 100%;
  }
}
</style>



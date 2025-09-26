<template>
  <div>
    <div class="scuccess" v-if="success">
      <el-alert title="Successfully User Updated" type="success" center show-icon></el-alert>
    </div>
    <div class="errors" v-if="error">
      <el-alert title="User can't be Updated" type="error" center show-icon></el-alert>
    </div>
    <el-col :span="4">.</el-col>
    <!--Add user form -->
    <el-col :span="12">
      <el-card shadow="hover">
        <el-form :model="user" :rules="addUserFormRules" ref="user" class="demo-ruleForm">
          <h3 class="title">Edit User</h3>
          <el-form-item prop="username">
            <el-input placeholder="Enter UserName" v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="email" placeholder="Enter Email" v-model="user.email"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="password">
        <el-input type="password" placeholder="Provide Password" v-model="user.password"></el-input>
          </el-form-item>-->
          <el-form-item label="Active" prop="active">
            <el-switch v-model="user.active"></el-switch>
          </el-form-item>
          <!-- <el-form-item>
        <el-button type="primary" @click="editUser">Update</el-button>
        <el-button>
          <router-link :to="{ name: 'View' }">Cancel</router-link>
        </el-button>
          </el-form-item>-->
        </el-form>
        <!--End of Add user form -->

        <!-- User Detail form-->
        <el-form :model="profile" ref class="user-detail-form">
          <h3 class="title">Enter User Details</h3>

          <el-form-item label="Firstname" prop>
            <el-input placeholder="Enter Firstname" v-model="profile.first_name"></el-input>
          </el-form-item>

          <el-form-item label="Lastname" prop>
            <el-input placeholder="Enter Lastname" v-model="profile.last_name"></el-input>
          </el-form-item>

          <el-form-item label="Contact Primary" prop>
            <el-input
              type="number"
              placeholder="Enter Mobile Number"
              v-model="profile.mobile_primary"
            ></el-input>
          </el-form-item>

          <el-form-item label="Contact Secondary" prop>
            <el-input
              type="number"
              placeholder="Enter Mobile Number"
              v-model="profile.mobile_secondary"
            ></el-input>
          </el-form-item>

          <el-form-item label="Address">
            <el-input placeholder="Enter Full Address" v-model="profile.address"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editUser">Update</el-button>
            <el-button>
              <router-link :to="{ name: 'View User' }">Cancel</router-link>
            </el-button>
          </el-form-item>
        </el-form>
        <!-- End of user detail form -->
      </el-card>
    </el-col>
  </div>
</template>

<!--Scripts -->
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        active: true
      },
      profile: {
        first_name: "",
        last_name: "",
        mobile_primary: "",
        mobile_secondary: "",
        address: ""
      },
      success: false,
      error: false,
      loaded: false,
      //rules for form fields
      addUserFormRules: {
        name: [
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
        ]
      }
      //end for rules in form field
    };
  },

  created() {
    this.fetchUserData(this.$route.params.id);
  },

  methods: {
    //add new user method
    editUser(e) {
      var vm = this;
      vm.success = true;
      vm.error = false;
      this.$refs.user.validate(valid => {
        if (valid) {
          axios
            .put("/api/user/update/" + this.user.id, {
              formData: this.user,
              detailData: this.profile
            })
            .then(response => {
              vm.success = true;
              vm.error = false;
              this.successUpdate();
              this.$router.push("/user/view");
            })
            .catch(error => {
              console.log(error);
              vm.error = true;
              vm.success = false;
              console.log(error);
            });
        } else {
          console.log("validation errors");
          return false;
        }
      });
    },
    //end of editUser method
    fetchUserData(id) {
      console.log(id);
      var url = "/api/user/find/" + id;
      axios.get(url).then(response => {
        if (response.data.data.profile != null) {
          this.profile = response.data.data.profile;
        }
        delete response.data.data.profile;
        this.user = response.data.data;
        console.log(this.user);
        // this.loaded = true;
      });
    },
    /*
      success notification
    */
    successUpdate() {
      this.$notify({
        title: "Updated",
        message: "User " + this.user.name + " updated successfully",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
</style>



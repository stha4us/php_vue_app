<template>
  <div class="content">
    <el-row :gutter="20">
      <!-- bacis user information -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="name">
            <p>
              <b>{{userData.profile.first_name}} {{userData.profile.last_name}}</b>
            </p>
            <p>
              <small>{{userData.email}}</small>
            </p>
          </div>
          <div class="other-info">
            <el-tag type="success" v-if="userData.active">Active</el-tag>
            <el-tag type="danger" v-else>Inactive</el-tag>
          </div>
        </div>
      </el-col>
      <!-- end of basic user information -->

      <!-- user profile details -->
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-row :gutter="10">
            <el-col>
              <h4>Profile Information</h4>
              <div>Username : {{userData.name}}</div>
              <div></div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- end of user profile details -->
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  /* 
    all data
  */
  data() {
    return {
      userData: {
        name: "",
        email: "",
        active: "",
        profile: {}
      }
    };
  },

  /*
      created
    */
  created() {
    this.fetchUserData(this.$route.params.id);
  },

  /*----------------
        Methods
    -----------------*/
  methods: {
    /*------------------------- 
        Method to fetch user data
    --------------------------*/
    fetchUserData(id) {
      const url = "/api/user/find/" + id;
      axios
        .get(url)
        .then(response => {
          console.log(response);
          this.userData = response.data.data;
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style scoped>
.content {
  margin: 30px;
}
.grid-content {
  border-radius: 10px;
  min-height: 36px;
  border: 1px solid #d3dce6;
  box-shadow: 0px 0px 5px #d3dce6, -0px -0px 5px #d3dce6;
  padding: 10px;
}

.name {
  text-align: center;
}
.other-info {
  text-align: center;
}
</style>

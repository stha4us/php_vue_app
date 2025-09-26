<style scoped>
</style>

<template>
  <div>
    <br>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="always">
          <h4>Basic Info</h4>
          <p>Username : {{user.name}}</p>
          <p>Email : {{user.email}}</p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <h4>Profile Detail</h4>
          <p>Full Name : {{user.profile.first_name}} {{user.profile.last_name}}</p>
          <p>Contact Number(primary): {{user.profile.mobile_primary}}</p>
          <p>Contact Number(secondary): {{user.profile.mobile_secondary}}</p>
          <p>Address: {{user.profile.address}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      id: localStorage.getItem("id"),
      user: ""
    };
  },
  created() {
    this.fetchUserData();
  },

  methods: {
    /*
      Fetch all the users except the current user
    */
    fetchUserData() {
      var url = "/api/user/find/" + this.id;
      axios.get(url).then(response => {
        this.user = response.data.data;
      });
    }

    
  }
};
</script>

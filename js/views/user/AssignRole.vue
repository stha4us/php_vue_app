<template>
  <div class="roles">
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>

      <el-table-column label="Role" prop="roles">
        <template slot-scope="scope">
          <span v-for="role in scope.row.roles" :key="role">
            <span v-text="role.title"></span>
            <br>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogFormVisible = true, handleEdit(scope.row)">Add Role</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- <ul v-if="roleuser"> -->
    <!-- <li v-for="roles in roleuser" :key="roles"> -->
    <!-- <strong>Role:</strong> {{ roles.roles }} -->
    <!-- <p v-for="role in roles.roles">{{role.title}}</p> -->
    <!-- </li> -->
    <!-- </ul> -->

    <!-- Form -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">open a Form nested Dialog</el-button> -->

    <el-dialog title="Change User Role" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <br>
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Role" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="Please assign a role to user">
            <el-option
              v-for="role in roles"
              v-bind:label="role.title"
              v-bind:value="role.id"
              v-bind:key="role.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="changeRole(form.email,form.role), dialogFormVisible = false "
        >Save Changes</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      roleuser: null,
      error: null,
      tableData: [],
      search: "",
      dialogFormVisible: false,
      form: {
        name: "",
        email: "",
        role: ""
      },
      formLabelWidth: "120px",
      roles: ""
    };
  },
  created() {
    this.fetchData();
    this.fetchRole();
  },
  methods: {
    // checkRole(scope){
    //     console.log(scope.row.roles);
    // },
    /* 
        Method to show error notification
    */
    roleAssignError() {
      this.$notify.error({
        title: "Sorry!!!",
        message: "Role Cannot be Assigned!!"
      });
    },

    /*
        Fetch User Data Role
    */
    fetchData() {
      this.error = this.roleuser = null;
      this.loading = true;
      axios
        .get("/api/roleuser")
        .then(response => {
          this.loading = false;
          this.roleuser = response.data;
          this.tableData = this.roleuser;
          // console.log(this.roleuser);
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    },

    /*
        Fetch All Available roles 
    */
    fetchRole() {
      axios
        .get("/api/fetchrole")
        .then(response => {
          this.roles = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    /*
        Handle Edit
    */
    handleEdit(userrow) {
      this.form.name = userrow.name;
      this.form.email = userrow.email;
      this.form.role = "";
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    changeRole(email, role) {
      // console.log(email, role);
      let currentObj = this;
      axios
        .post("/api/roleuser", {
          name: this.form.name,
          email: this.form.email,
          role: this.form.role
        })
        .then(function(response) {
          currentObj.output = response.data;
          currentObj.fetchData();
          //   this.$router.push("/user.view");
        })
        .catch(function(error) {
          currentObj.output = error;
          currentObj.roleAssignError();
        });
    }
  }
};
</script>
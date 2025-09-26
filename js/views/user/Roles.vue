<template>
  <div class="roles">
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <el-table
      v-loading="loading"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Roles" prop="title"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-row>
            <el-button type="primary" @click="addRole(), dialogFormVisible = true">Add Role</el-button>
          </el-row>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row.id)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <ul v-if="roles">
            <li v-for="{ title } in roles">
                <strong>Role:</strong> {{ title }}
            </li>
    </ul>-->

    <el-dialog title="Add User Role" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <br>
        <el-form-item label="Role" :label-width="formLabelWidth">
          <el-input v-model="form.role" autocomplete="off" :disabled="false"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="confirmRole(form.role), dialogFormVisible = false "
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
      loading: false,
      roles: null,
      error: null,
      tableData: [],
      dialogFormVisible: false,
      form: {
        role: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchRoles();
  },
  methods: {
    fetchRoles() {
      this.error = this.roles = null;
      this.loading = true;
      axios
        .get("/api/roles")
        .then(response => {
          this.loading = false;
          this.roles = response.data.data;
          this.tableData = this.roles;
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    },
    addRole() {
      // this.form.name=userrow.name;
      // this.form.email=userrow.email;
      this.form.role = "";
      // console.log(userrow);
    },
    handleDelete(index, id) {
      // rows.splice(index, 1);
      //   console.log([index, id]);
      let curObj = this;
      axios
        .post("/api/deleteroles", {
          id: id
        })
        .then(function(response) {
          curObj.output = response.data;
          this.roles.splice(index, 1);
        })
        .catch(function(error) {
          curObj.output = error;
        });
    },
    confirmRole(role) {
      // this.form.name=userrow.name;
      // this.form.email=userrow.email;
      // this.form.role=role;
      let currentObj = this;
      let roleDate = new Date().toLocaleString();
      axios
        .post("/api/roles", {
          role: this.form.role,
          date: roleDate.replace(",", "")
        })
        .then(function(response) {
          currentObj.output = response.data;
          this.fetchData();
        })
        .catch(function(error) {
          currentObj.output = error;
        });
    }
  }
};
</script>
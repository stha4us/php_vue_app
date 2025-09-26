<template>
  <div class="roles">
    <vue-headful title="SI | AddRole"/>
    <br>
    <el-row :gutter="10">
      <span>Per-page Items:</span>
      <el-col :span="2">
        <el-select v-model="pagesize" placeholder="Select" size="mini">
          <el-option :value="5">5/page</el-option>
          <el-option :value="10">10/page</el-option>
          <el-option :value="50">50/page</el-option>
        </el-select>
      </el-col>
    </el-row>

    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 1)"
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

    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next,jumper"
        :total="total"
        @current-change="current_change"
      ></el-pagination>
    </div>

    <!-- <ul v-if="roles">
            <li v-for="{ title } in roles">
                <strong>Role:</strong> {{ title }}
            </li>
    </ul>-->

    <el-dialog title="Confirm delete role?" :visible.sync="deletedialogVisible" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletedialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmDelete(),deletedialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Add User Role" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <br>
        <el-form-item label="Role" :label-width="formLabelWidth" prop="role">
          <el-input v-model="form.role" autocomplete="off" :disabled="false"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="confirmRole(form.role,'form'), dialogFormVisible = false "
        >Save Changes</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    var checkRole = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input role"));
      }
      setTimeout(() => {
        callback();
      }, 100);
    };
    return {
      //   tableKey: 0,
      deletedialogVisible: false,
      loading: true,
      roles: null,
      error: null,
      tableData: [],
      dialogFormVisible: false,
      total: 0,
      pagesize: 10,
      currentPage: 1,
      form: {
        role: ""
      },
      rules: {
        role: [{ validator: checkRole, trigger: "blur" }]
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
          this.total = response.data.data.length;
          this.roles = response.data.data;
          this.tableData = this.roles;
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    },

    current_change: function(currentPage) {
      this.currentPage = currentPage;
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
      //   this.tableKey = this.tableKey + 1;
      this.fetchRoles();
    },
    confirmRole(role, formName) {
      // this.form.name=userrow.name;
      // this.form.email=userrow.email;
      // this.form.role=role;
      let currentObj = this;
      let roleDate = new Date().toLocaleString();
      currentObj.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/api/roles", {
              role: currentObj.form.role,
              date: roleDate.replace(",", "")
            })
            .then(function(response) {
              currentObj.output = response.data;
              currentObj.$refs[formName].resetFields();
              currentObj.fetchRoles();
            })
            .catch(function(error) {
              currentObj.output = error;
            });
        } else {
          currentObj.$refs[formName].resetFields();
          // alert("error adding role!!");
        }
      });
      //   this.tableKey = this.tableKey + 1;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scope>
/* span {
  float: left;
  padding-top: 1px;
} */
</style>
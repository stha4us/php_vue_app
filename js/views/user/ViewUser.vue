<template>
  <div>
    <vue-headful title="SI | Users"/>
    <p>List User</p>
    <!-- <div v-if="users != null"> -->
    <el-row :gutter="10">
      <el-col :span="2">
        <el-select v-model="pagesize" placeholder="Select" size="mini">
          <el-option :value="5">5/page</el-option>
          <el-option :value="10">10/page</el-option>
          <el-option :value="20">20/page</el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchKey" placeholder="Search" size="mini"></el-input>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="users.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      max-height="700"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <el-table-column fixed prop="email" label="Email"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="roles" label="Role" sortable>
        <template slot-scope="scope">
          <span v-for="role in scope.row.roles" :key="role">
            <span v-text="role.title"></span>
            <br>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="active" label="Status" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.active">
            <el-tag type="success" size="mini" v-if="scope.row.active == 1">Active</el-tag>
          </span>
          <span v-else>
            <el-tag type="danger" size="mini" v-if="scope.row.active == 0">Inactive</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Action">
        <template slot-scope="scope">
          <el-button
            @click="setID(scope.row.id,scope.$index);centerDialogVisible = true"
            type="danger"
            title="Permanently Delete User"
            size="small"
          >
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="info" size="small" title="Edit User">
            <router-link :to="{ name: 'Edit',params : {id:scope.row.id} }">
              <i class="el-icon-edit"></i>
            </router-link>
          </el-button>
          <el-button type="info" size="small" title="Edit User">
            <router-link :to="{ name: 'User Profile',params : {id:scope.row.id} }">
              <i class="el-icon-view"></i>
            </router-link>
          </el-button>

          <!-- <el-dropdown>
            <span class="el-dropdown-link">
              <el-button>Action</el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-cross"
                @click="setID(scope.row.id,scope.$index);centerDialogVisible = true"
              >Delete</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">
                <router-link :to="{ name: 'Edit',params : {id:scope.row.id} }">Edit</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
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
    <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
    <!-- </div> -->
    <!-- <div class="loading" v-if="loading">Loading...</div> -->
    <el-dialog title="Warning" :visible.sync="centerDialogVisible" width="30%" center>
      <span>Sure want to delete permanently????</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteUser">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";

export default {
  //
  data() {
    return {
      users: [],
      errors: null,
      loading: true,
      id: "",
      centerDialogVisible: false,
      index: "",
      total: 0,
      pagesize: 10,
      currentPage: 1,
      searchKey: ""
    };
  },
  //end of data

  created() {
    this.fetchData();
  },

  methods: {
    // ------ fectch data to view  ------\\
    fetchData() {
      axios
        .get(`/api/user/get?id=${localStorage.getItem("id")}`)
        .then(response => {
          this.loading = false;
          this.total = response.data.data.length;
          console.log(this.total);
          this.users = response.data.data;
          console.log(this.total);
        })
        .catch(error => {
          this.errors = error.response.data.message || error.message;
          console.log(this.errors);
        });
    },
    // --- end fetch data function here ---\\
    editUser() {},

    // --- set id and index for later user in deletion of records --\\
    setID(id, index) {
      console.log(index);
      this.id = id;
      this.index = index;
    },

    // function to handle deletion of data
    deleteUser() {
      var url = "/api/user/delete/" + this.id;
      axios
        .get(url)
        .then(response => {
          this.centerDialogVisible = false;
          this.users.splice(this.index, 1);
          console.log(response);
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    // deleteUser Ends here

    current_change: function(currentPage) {
      this.currentPage = currentPage;
    }
  },
  /**
   * Search method
   */

  searchUser() {
    // this.users = this.users.filter(
    //   data =>
    //     !this.searchKey ||
    //     data.name.toLowerCase().includes(this.searchKey.toLowerCase())
    // );
    console.log(this.searchKey);
  }
  //all  methods end here
};
</script>


<style scoped>
button.edit > a {
  color: white;
}
</style>


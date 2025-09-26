<template>
  <div class="permissionroles">
    <br>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-for="role in roleList">
      <!-- <el-row> -->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{role.title}}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="showModal(role.id,role.title), dialogFormVisible = true"
              >Edit Permission</el-button>
            </div>
            <div v-for="permission in role.permissions" class="text item">{{permission.slug}}</div>
          </el-card>
        </div>
      </el-col>
      <!-- </el-row> -->
    </div>

    <el-dialog title="Edit Permissions" :visible.sync="dialogFormVisible">
      <el-transfer :titles="['Available','Assigned']" v-model="value" :data="datalist"></el-transfer>
      <el-col>
        <el-button
          id="but1"
          type="primary"
          @click="changePermission(value), dialogFormVisible = false"
        >Save Changes</el-button>
      </el-col>
    </el-dialog>
  </div>
</template>

<style>
.text {
  font-size: 14px;
}

#but1 {
  margin-top: 12px;
  float: right;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      roleid: 0,
      loading: false,
      error: null,
      permissionList: null,
      rolepermissionList: null,
      roleList: [],
      datalist: [],
      value: [],
      dialogFormVisible: false
      // formLabelWidth: '120px',
    };
  },
  created() {
    this.fetchRole();
    // this.fetchPermission();
    // this.fetchRolePermission();
  },
  methods: {
    fetchPermission(id, title) {
      this.error = this.permissionList = null;
      var vm = this;
      axios
        .get("/api/getpermission")
        .then(response => {
          vm.permissionList = response.data;
          vm.fetchRolePermission(id, title);
        })
        .catch(error => {
          vm.error = error.response.data.message || error.message;
        });
    },
    fetchRole() {
      this.error = this.roleList = null;
      axios
        .get("/api/getrole")
        .then(response => {
          this.roleList = response.data;
          // return axios.get('/api/getpermission');
        })
        // .then(res=>{
        //     this.permissionList = res.data;
        // }
        // )
        .catch(error => {
          this.error = error.response.data.message || error.message;
        });
    },
    generateDatalist() {
      let flag = 0;
      let datalist = [];
      let value = [];
      let vm = this;
      this.permissionList.forEach(function(item) {
        vm.rolePermissionList.forEach(function(row) {
          if (item.id == row.id) {
            flag = 1;
            datalist.push({
              key: row.id,
              label: row.slug, //`Option ${ i }`,
              disabled: false
            });
            value.push(row.id);
          }
        });
        if (flag == 0) {
          datalist.push({
            key: item.id,
            label: item.slug,
            disabled: false
          });
        }
        flag = 0;
      });
      this.datalist = datalist;
      this.value = value;

      console.log("datalist", datalist);
    },
    fetchRolePermission(id, role) {
      //   let currentObj = this;
      var vm = this;
      axios
        .post("/api/rolepermission", {
          id: id,
          role: role
        })
        .then(function(response) {
          //   vm.output = response.data;
          vm.rolePermissionList = response.data;
          vm.generateDatalist();
        })
        .catch(function(error) {
          vm.output = error;
        });
    },
    changePermission(value, roleid) {
      // alert("Permission changed!");
      var vm = this;
      axios
        .post("/api/permissionroles", {
          id: value,
          roleid: this.roleid
        })
        .then(function(response) {
          vm.fetchRole();
          // vm.rolePermissionList = response.data;
        })
        .catch(function(error) {
          vm.output = error;
        });
    },
    showModal(id, title) {
      this.fetchPermission(id, title);
      this.roleid = id;
      //   this.editPermission();
    }
  }
};
</script>
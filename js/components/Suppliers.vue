<template>
  <div class="suppliers">
     <vue-headful title="SI | Suppliers"/>
    <br>
    <el-row :gutter="10">
      <span>Per-page Items</span>
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
    v-loading="loading"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    :default-sort = "{prop: 'supplier_name', order: 'descending'}"
    style="width: 100%"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 1)">
    
    <el-table-column
      prop="supplier_name"
      label="Name"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address"
      :formatter="formatter"
      sortable>
    </el-table-column>
     <el-table-column
      prop="contact_person"
      label="Person"
      >
    </el-table-column>
     <el-table-column
      prop="contact_person_mobile"
      label="mobile"
      >
    </el-table-column>
     <el-table-column
      prop="phone_one"
      label="Contact-1"
      >
    </el-table-column>
     <el-table-column
      prop="phone_two"
      label="Contact-2"
      >
    </el-table-column>
     <el-table-column
      prop="email"
      label="Email"
      >
    </el-table-column>
     <el-table-column
      prop="website"
      label="Website"
      >
    </el-table-column>
     <el-table-column
      prop="pan_no"
      label="PAN"
      >
    </el-table-column>
     <el-table-column
      prop="other_supplier_details"
      label="Details"
      >
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      error: null,
      loading: true,
      suppliers: null,
      tableData: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,
    };
  },
  created() {
    this.fetchSupplier();
  },
  methods: {
    fetchSupplier() {
      this.error = this.tableData = null;
      this.loading = true;
      axios
        .get("/api/suppliers")
        .then(response => {
          this.loading = false;
          this.total = response.data.data.length;
          this.tableData = response.data.data;
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    },

    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    
    formatter(row, column) {
        return row.address;
      },
    created() {
    this.fetchRoles();
  },
  }
};
</script>

<style>
#suppliers {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style scoped>
.loading {
  position: relative;
  height: 100px;
  background-color: rgba(74, 112, 238, 0.438);
}
.el-icon-loading {
  position: relative;
  left: 50%;
  top: 70px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
<template>
  <div class="view-unit">
    <br>
    <!-- Add new unit -->
    <div class="add-new-unit" v-if="add">
      <el-form ref="form">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item>
              <el-input v-model="unit" :span="10" placeholder="Enter New Unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button type="primary" @click="addUnit" :span="4">Create</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <hr>
    <!-- end for add new unit -->
    <h4>All Units</h4>
    <el-row>
      <el-col :span="3">
        <el-select v-model="pagesize" placeholder="Select" size="mini">
          <el-option :value="5">5/page</el-option>
          <el-option :value="10">10/page</el-option>
          <el-option :value="20">20/page</el-option>
        </el-select>
      </el-col>
    </el-row>
    <br>
    <el-table
      border
      :data="allUnits.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :default-sort="{prop: 'id', order: {order}}"
      width="300"
    >
      <el-table-column label="index" prop="id" width="180"></el-table-column>
      <el-table-column prop="unit" label="unit" sortable></el-table-column>
      <!-- <el-table-column prop="address" label="Address" :formatter="formatter"></el-table-column> -->
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="current_change"
    ></el-pagination>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      allUnits: [],
      loading: true,
      unit: "",
      add: true,
      currentPage: 1,
      total: 0,
      pagesize: 5,
      order: "ascending"
    };
  },

  /* ---------
        Created
    ---------- */
  created() {
    this.fetchUnit();
    // console.log(Object.keys(this.allUnits).length);
  },

  methods: {
    /*------------------
         Fetch all unit data
        --------------------*/
    fetchUnit() {
      axios
        .get("/api/manage/unit")
        .then(response => {
          // console.log(response.data.units.length);
          this.allUnits = response.data.units;
          this.total = response.data.units.length;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    /**-------------------------
     * Add New Unit
    --------------------------- */
    addUnit() {
      const vm = this;
      axios
        .post("/api/manage/unit", {
          unit: this.unit
        })
        .then(response => {
          console.log(response);
          this.success();
          vm.fetchUnit();
          this.unit = "";
        })
        .catch(error => {
          console.log(error.data);
          this.failure(error);
        });
    },

    /**------------------------------
     * Change in Page in pagination
     --------------------------------*/
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },

    /**-----------------------------
     * Success Notification
    ----------------------------- */
    success() {
      this.$notify({
        title: "Success",
        message: "New Unit Added",
        type: "success"
      });
    },

    /**----------------------
     * Failed/Error Message
    ------------------------ */
    failure(error) {
      this.$notify.error({
        title: error.response.data.error,
        message: "New Unit Cannot be Added"
      });
    }
  }
};
</script>

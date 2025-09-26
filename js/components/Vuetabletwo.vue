<template>
  <div id="manage">
    <vuetable
      ref="vuetable"
      api-mode:true
      api-url="../api/suppliers"
      :fields="fields"
      :http-method="get"
      pagination-path
      :sort-order="sortOrder"
    ></vuetable>

    <!-- <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination> -->
  </div>
</template>

<script>
import axios from "axios";
import Vuetable from "vuetable-2";
import accounting from "accounting";
export default {
  paginationInfo: {
    infoClass: "left floated left aligned six wide column"
  },
  components: {
    Vuetable
  },
  data() {
    return {
      error: null,
      loading: false,
      suppliers: null,
      sortOrder: [
        {
          field: "supplier_name",
          direction: "asc"
        }
      ],
      fields: [
        {
          name: "supplier_name",
          title: "Supplier-name",
          titleClass: "right aligned",
          formatter(value) {
            return value.toUpperCase();
          }
        },
        "address",
        "contact_person",
        {
          name: "contact_person_mobile",
          title: '<i class="orange birthday icon"></i> Contact',
          titleClass: "right aligned",
          dataClass: "right aligned"
        },
        // {
        //   name: "gender",
        //   titleClass: "center aligned",
        //   dataClass: "center aligned",
        //   formatter(value) {
        //     return value == "M"
        //       ? '<span class="label label-info"><i class="glyphicon glyphicon-star"></i> Male</span>'
        //       : '<span class="label label-success"><i class="glyphicon glyphicon-heart"></i> Female</span>';
        //   }
        // },
        "email",
        "website",
        {
          name: "pan_no",
          titleClass: "center aligned",
          dataClass: "right aligned",
          formatter(value) {
            return accounting.formatNumber(value, 2);
          }
        },
        "contact_person"
      ]
    };
  },
  created() {
    this.fetchSupplier();
  },
  methods: {
    fetchSupplier() {
      this.error = this.suppliers = null;
      this.loading = true;
      axios
        .get("/api/suppliers")
        .then(response => {
          this.loading = false;
          this.suppliers = response.data;
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    }
  }
};
</script>

<style>
#manage {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.vuetable th.sortable:hover {
  color: #2185d0;
  cursor: pointer;
}
</style>
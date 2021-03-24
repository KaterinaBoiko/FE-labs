<template>
  <div class="table">
    <md-table v-model="data" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Currency" md-sort-by="currency">{{
          item.currency
        }}</md-table-cell>
        <md-table-cell md-label="NBU" md-sort-by="saleRateNB">{{
          item.rate_nb
        }}</md-table-cell>
        <md-table-cell md-label="Privat Purchase" md-sort-by="purchaseRate">{{
          item.purchase_privat
        }}</md-table-cell>
        <md-table-cell md-label="Privat Sale" md-sort-by="saleRate">{{
          item.sale_privat
        }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";
import dateFormat from "dateformat";

export default {
  props: ["date"],
  data: () => ({
    data: [],
  }),
  mounted() {
    this.getRateByDate();
  },
  watch: {
    date: {
      handler: function (newDate) {
        this.getRateByDate(newDate);
      },
      deep: true,
    },
  },
  methods: {
    getRateByDate() {
      axios
        .get(
          "http://localhost:3000/rate/" + dateFormat(this.date, "dd.mm.yyyy")
        )
        .then((response) => {
          this.data = response.data;
          if (this.data[0]?.saleRateNB) {
            this.data.forEach((record) => {
              record.rate_nb = record.saleRateNB;
              record.sale_privat = record.saleRate;
              record.purchase_privat = record.purchaseRate;
            });
          }
        });
    },
  },
};
</script>

<style scope>
.table {
  padding-bottom: 30px;
}
.md-table.md-theme-default .md-table-head {
  color: white !important;
}
.md-table-content {
  background-color: #424242 !important;
  color: white !important;
  padding: 0 25px;
}
</style>

<template>
  <div class="header">
    <h1 class="title">Exchange Rates</h1>
    <datepicker
      v-model="date"
      @selected="onDateChange"
      :disabledDates="disabledDates"
      format="dd.MM.yyyy"
    ></datepicker>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  data: () => ({
    date: new Date(),
    disabledDates: {
      from: new Date(),
    },
  }),
  components: {
    Datepicker,
  },
  methods: {
    onDateChange(date) {
      //   this.date = new Date(date);
      this.$emit("dateChanges", {
        date: new Date(date),
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}
.title {
  color: white;
}
</style>

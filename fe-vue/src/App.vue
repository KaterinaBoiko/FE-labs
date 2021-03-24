<template>
  <div class="wrapper">
    <Header @dateChanges="onDateChange" />
    <Table :date="date" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Table from "./components/Table";

export default {
  name: "App",
  components: {
    Header,
    Table,
  },
  data: () => ({
    date: new Date(),
  }),
  methods: {
    onDateChange(data) {
      this.date = data.date;
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 80%;
  min-height: 100%;
  margin: 0 auto;
}
</style>

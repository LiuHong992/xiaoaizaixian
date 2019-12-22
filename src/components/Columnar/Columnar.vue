<template>
  <div>
    <!-- 柱状图 -->
    <el-card class="box-card">
      <ve-histogram :data="chartData"></ve-histogram>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: [],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    getColumn() {
      this.$axios
        .req("/homeChat")
        .then(res => {
          // console.log(Object.keys(res.data[0]));
          this.chartData.columns = Object.keys(res.data[0]);
          this.chartData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getColumn()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>
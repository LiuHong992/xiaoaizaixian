<template>
  <div>
    <!-- 雷达图 -->
    <el-card class="box-card">
      <ve-radar :data="radarData"></ve-radar>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radarData: {
        columns: [],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    getRadar() {
      this.$axios
        .req("/radarChat")
        .then(res => {
          this.radarData.columns = Object.keys(res.data[0]);
          this.radarData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getRadar();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>
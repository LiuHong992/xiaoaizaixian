<template>
  <div>
    <el-card class="box-card">
      <ve-pie class="vradar" :data="ringData" :settings="chartSettings"></ve-pie>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ringData: {
        columns: [],
        rows: []
      },
      chartSettings: {
        roseType: "radius"
      }
    };
  },
  components: {},
  methods: {
    getRing() {
      this.$axios
        .req("/ringChat")
        .then(res => {
          // console.log(Object.keys(res.data[0]));
          this.ringData.columns = Object.keys(res.data[0]);
          this.ringData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getRing();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>
<template>
  <div>
    <el-card class="box-card">
      <ve-line class="vline" :data="chatdata"></ve-line>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatdata: {
        columns: ["date", "expected", "actual"],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    getChat() {
      this.$axios
        .req("/homeChat")
        .then(res => {
          // console.log(this.chatdata);
          res.data.map(item => {
            this.chatdata.rows.push(item);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getChat();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>

</style>
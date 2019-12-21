<template>
  <div>
    <div class="exitimg">
      <img src="../../assets/images/exit.gif" alt />
    </div>
    <div class="exitbtn">
      <el-button @click="exit" type="danger" round>退出系统</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    exit() {
      sessionStorage.removeItem("users");
      this.$router.push("/login");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.exitimg {
  width: 250px;
  height: 250px;
  margin: 150px auto 0;
}
.exitbtn {
  width: 104px;
  height: 40px;
  margin: 20px auto;
}
</style>
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
      this.$confirm("即将退出本系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("users");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(err => {
          console.log(err);
        });
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
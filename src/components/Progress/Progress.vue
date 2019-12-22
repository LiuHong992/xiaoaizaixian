<template>
  <div>
    <!-- 百分比进度条 -->
    <el-card class="box-card">
      <img src="../../assets/images/s1.png" alt />
      <div class="promodel" v-for="(item,index) in progres" :key="index">
        <p>{{item.name}}</p>
        <el-progress :percentage="100" status="success" v-if="(item.progress)*100 === 100"></el-progress>
        <el-progress :percentage="(item.progress)*100" v-else></el-progress>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progres: []
    };
  },
  components: {},
  methods: {
    getProgress() {
      this.$axios
        .req("/progress")
        .then(res => {
          this.progres = res.data;
          // console.log(this.progres);
          // console.log(this.orderData[0].status);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getProgress();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box-card{
  height: 544px;
}
img {
  width: 100%;
}
.promodel{
  margin-top: 20px;
}
</style>
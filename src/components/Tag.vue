<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未读消息" name="first" v-for="(item,index) in arr" :key="index">
        <el-card class="box-card">
          <div v-if="item.status === 1">
            <span>{{item.msg}}</span>
            <span class="spp">{{item.times}}</span>
            <el-button plain>标记已读</el-button>
            <el-divider></el-divider>
          </div>
          <el-button type="primary">全部标记为已读</el-button>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second">
        <el-card class="box-card">
          <span>【系统提示】该系统将于今晚凌晨2点到5点进行升级维护</span>
          <span class="spp">2019-12-20 20:00:00</span>
          <el-button plain>删除</el-button>
          <el-divider></el-divider>
          <el-button type="danger">删除全部</el-button>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="回收站" name="third">
        <el-card class="box-card">
          <span class="sps">【系统提示】您的优惠券已经过期</span>
          <span class="spp">2019-12-20 20:00:00</span>
          <el-button plain>还原</el-button>
          <el-divider></el-divider>
          <el-button type="info">清空回收站</el-button>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      arr: [
        {
          msg: "【系统提示】该系统将于今晚凌晨2点到5点进行升级维护",
          times: "2019-12-20 20:00:00",
          status: 1
        },
        {
          msg: "今晚12点发大红包，先到先得",
          times: "2019-12-20 18:00:00",
          status: 1
        },
        {
          msg: "【系统提示】该系统将于今晚凌晨2点到5点进行升级维护",
          times: "2019-12-20 20:00:00",
          status: 2
        },
        {
          msg: "【系统提示】您的优惠券已经过期",
          times: "2019-12-20 20:00:00",
          status: 3
        }
      ]
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.sps {
  display: inline-block;
  width: 402px;
}
.spp {
  display: inline-block;
  margin-left: 600px;
  margin-right: 20px;
}
</style>
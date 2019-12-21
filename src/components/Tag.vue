<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="sum1" name="first">
        <el-card class="box-card">
          <div class="md" v-for="(item,index) in arr1" :key="index">
            <span class="sps">{{item.msg}}</span>
            <span class="spp">{{item.times}}</span>
            <el-button @click="changealready(item)" plain>标记已读</el-button>
            <el-divider></el-divider>
          </div>
          <el-button @click="changeall" type="primary" v-if="this.arr1.length > 0">全部标记为已读</el-button>
          <div v-else>暂无消息</div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="sum2" name="second">
        <el-card class="box-card">
          <div class="md" v-for="(item,index) in arr2" :key="index">
            <span class="sps">{{item.msg}}</span>
            <span class="spp">{{item.times}}</span>
            <el-button @click="del(item)" plain>删除</el-button>
            <el-divider></el-divider>
          </div>
          <el-button @click="delall" type="danger" v-if="this.arr2.length > 0">删除全部</el-button>
          <div v-else>暂无消息</div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="sum3" name="third">
        <el-card class="box-card">
          <div class="md" v-for="(item,index) in arr3" :key="index">
            <span class="sps">{{item.msg}}</span>
            <span class="spp">{{item.times}}</span>
            <el-button @click="reduction(item)" plain>还原</el-button>
            <el-divider></el-divider>
          </div>
          <el-button @click="reductionall" type="info" v-if="this.arr3.length > 0">清空回收站</el-button>
            <div v-else>暂无消息</div>
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
      arr1: [
        {
          msg: "【系统提示】该系统将于今晚凌晨2点到5点进行升级维护啊",
          times: "2019-12-20 20:00:00"
        },
        {
          msg: "今晚12点发大红包，先到先得",
          times: "2019-12-20 18:00:00"
        }
      ],
      arr2: [
        {
          msg: "【系统提示】该系统将于今晚凌晨2点到5点进行升级维护",
          times: "2019-12-20 20:00:00"
        }
      ],
      arr3: [
        {
          msg: "【系统提示】您的优惠券已经过期",
          times: "2019-12-20 20:00:00"
        }
      ]
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 标记已读
    changealready(item0) {
      // this.arr1 = this.arr1.filter(item => {
      //   return item0 !== item;
      // });
      this.arr1.splice(item0, 1);
      this.arr2.push(item0);
    },
    // 标记全部
    changeall() {
      // this.arr2 = this.arr2.concat(this.arr1);
      this.arr2.push(...this.arr1);
      this.arr1.splice(0);
    },
    // 删除
    del(item1) {
      this.arr2.splice(item1, 1);
      this.arr3.push(item1);
    },
    // 删除全部
    delall() {
      this.arr3.push(...this.arr2);
      this.arr2.splice(0);
    },
    // 还原
    reduction(item2) {
      this.arr3.splice(item2, 1);
      this.arr1.push(item2);
    },
    // 清空回收站
    reductionall() {
      this.arr3.splice(0);
    }
  },
  mounted() {},
  watch: {},
  computed: {
    sum1() {
      return `未读消息(${this.arr1.length})`;
    },
    sum2() {
      return `已读消息(${this.arr2.length})`;
    },
    sum3() {
      return `回收站(${this.arr3.length})`;
    }
  }
};
</script>

<style scoped lang='scss'>
.sps {
  display: inline-block;
  width: 420px;
}
.spp {
  display: inline-block;
  margin-left: 600px;
  margin-right: 20px;
}
</style>
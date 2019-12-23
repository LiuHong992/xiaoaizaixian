<template>
  <div>
    <!-- 头部计数器 -->
    <div class="vcounto">
      <div class="flex shadow">
        <img src="../../assets/images/people.svg" alt />
        <div class="people">
          <div>New Visits</div>
          <div>
            <countTo :startVal="startVal" :endVal="this.countdata.visits" :duration="duration"></countTo>
          </div>
        </div>
      </div>
      <div class="flex shadow">
        <img src="../../assets/images/news.svg" alt />
        <div class="people">
          <div>Message</div>
          <div>
            <countTo :startVal="startVal" :endVal="this.countdata.messages" :duration="duration"></countTo>
          </div>
        </div>
      </div>
      <div class="flex shadow">
        <img src="../../assets/images/money.svg" alt />
        <div class="people">
          <div>Purchases</div>
          <div>
            <countTo :startVal="startVal" :endVal="this.countdata.purchases" :duration="duration"></countTo>
          </div>
        </div>
      </div>
      <div class="flex shadow">
        <img src="../../assets/images/car.svg" alt />
        <div class="people">
          <div>Shoppings</div>
          <div>
            <countTo :startVal="startVal" :endVal="this.countdata.shopping" :duration="duration"></countTo>
          </div>
        </div>
      </div>
    </div>
    <!-- 折线图 -->
    <vueLine class="vline"></vueLine>
    <div class="middle flex">
      <!-- 雷达图 -->
      <radarChat class="radar"></radarChat>
      <!-- 饼状图 -->
      <ringChat class="ring"></ringChat>
      <!-- 柱状图 -->
      <column class="col"></column>
    </div>
    <div class="bottom flex">
      <!-- 订单图 -->
      <order class="od"></order>
      <!-- TodoList -->
      <todoList class="todo"></todoList>
      <!-- 进度条 -->
      <progresses class="pro"></progresses>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import vueLine from "../../components/Brokenline/Brokenline";
import radarChat from "../../components/Radarchat/Radarchat";
import ringChat from "../../components/Ringchat/Ringchat";
import column from "../../components/Columnar/Columnar";
import order from "../../components/Order/Order";
import todoList from "../../components/Todolist/Todolist";
import progresses from "../../components/Progress/Progress";
export default {
  data() {
    return {
      // 用于接收计数器的对象
      countdata: {},
      // 计数器在5秒内加载完成
      duration: 5000,
      // 计数器起始值
      startVal: 0
    };
  },
  components: {
    countTo,
    vueLine,
    radarChat,
    ringChat,
    column,
    order,
    todoList,
    progresses
  },
  methods: {
    // 获取计数器数据
    getCount() {
      this.$axios
        .req("/homeData")
        .then(res => {
          this.countdata = res.data;
          // console.log(this.countdata);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCount();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 头部计数器
.vcounto {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  .shadow {
    border-radius: 5px;
    box-shadow: 0 0 15px rgb(168, 160, 163);
  }
  div {
    justify-content: space-between;
    width: 300px;
    background-color: white;
    padding: 12px;
    text-align: center;
  }
  .people {
    padding: 0;
    width: 90px;
    div {
      padding: 0;
      width: 90px;
      height: 40px;
      font-size: 18px;
      line-height: 40px;
      &:last-child {
        color: darkgray;
        font-weight: 700;
      }
    }
  }
}
// 折线图
.vline {
  width: 100%;
  margin-top: 20px;
}
// 雷达图+饼状图 +柱状图
.middle {
  justify-content: space-between;
  // background-color: white;
  margin-top: 20px;
  .radar {
    width: 33%;
  }
  .ring {
    width: 33%;
  }
  .col {
    width: 33%;
  }
}
// 订单+Todolist+进度条
.bottom {
  margin-top: 20px;
  .od {
    width: 48%;
  }
  .todo {
    width: 24%;
    margin-left: 0.8%;
  }
  .pro {
    width: 24%;
    margin-left: 3.2%;
  }
}
</style>
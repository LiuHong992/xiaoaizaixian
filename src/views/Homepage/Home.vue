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
      <!-- <el-card class="box-card" v-for="(item,index) in countlist" :key="index" >
        <div class="text item">
          <img :src="item.src" alt="">
          <p>{{item.msg}}</p>
          <p><countTo :startVal="startVal" :endVal="item.num" :duration="duration"></countTo></p>
          </div>
      </el-card>-->
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
    <div class="bottom">
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
      countdata: {},
      countlist: [
        {
          msg: "New Visits",
          src: "../../assets/images/people.svg",
          num: 102400
        },
        {
          msg: "Messages",
          src: "../../assets/images/news.svg",
          num: 81212
        },
        {
          msg: "Purchases",
          src: "../../assets/images/money.svg",
          num: 9280
        },
        {
          msg: "Shoppings",
          src: "../../assets/images/car.svg",
          num: 13600
        }
      ],
      duration: 5000,
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
    width: 305px;
    background-color: white;
    padding: 10px;
  }
  .people {
    padding: 0;
    width: 80px;
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
.vline {
  width: 100%;
  margin-top: 20px;
}
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
.bottom {
  display: flex;
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
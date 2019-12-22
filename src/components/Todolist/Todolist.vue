<template>
  <div>
    <!-- TodoList -->
    <el-card class="box-card">
      <div class="todoheader">
        <img src="..//../assets/images/arrow.png" alt @click="checkAll" :checked="checked" />
        <span>Todo List</span>
      </div>
      <div class="mainbody" v-if="newlist.length>0">
        <div
          class="content"
          v-for="(item,index) in newlist"
          :key="index"
          @mouseenter="changeCount(index)"
          @mouseleave="changeCounts"
        >
          <div class="contentleft">
            <div class="flag" @click="checkOne(item)">
              <img
                src="../../assets/images/right.png"
                alt
                width="20px"
                height="20px"
                :checked="item.checked"
                v-show="item.checked === true"
              />
            </div>
            <span>{{item.name}}</span>
          </div>
          <img
            src="../../assets/images/wrong.png"
            alt
            class="wrong"
            v-show="count === index"
            @click="del(item)"
          />
        </div>
      </div>
      <div class="else" v-else>暂无数据</div>
      <div class="bodyfooter">
        <span>{{check}} item left</span>
        <div @click="chooseAll()" :class="{'addBoder' :num2 === 1}">All</div>
        <div @click="chooseActive()" :class="{'addBoder' :num2 === 2}">Active</div>
        <div @click="chooseCompleted()" :class="{'addBoder' :num2 === 3}">Completed</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      newlist: [],
      count: -1,
      checked: false,
      num2: 1
    };
  },
  components: {},
  methods: {
    ref() {
      if (this.num2 === 2) {
        this.chooseActive();
      } else if (this.num2 === 3) {
        this.chooseCompleted();
      }
    },
    //全选
    checkAll() {
      if (this.num2 === 1) {
        this.checked = !this.checked;
        this.newlist.map(item => {
          item.checked = this.checked;
        });
      }
    },
    //单选
    checkOne(item) {
      item.checked = !item.checked;
      this.checked = this.newlist.every(item => {
        return item.checked === true;
      });
      this.ref();
    },
    //鼠标移入移出显示'×'
    changeCount(index) {
      this.count = index;
    },
    changeCounts() {
      this.count = -1;
    },
    //删除
    del(item0) {
      this.list = this.list.filter(item => {
        return item !== item0;
      });
      this.newlist = this.newlist.filter(item => {
        return item !== item0;
      });
    },
    //选择全部
    chooseAll() {
      this.num2 = 1;
      this.newlist = this.list;
    },
    //选择未完成项
    chooseActive() {
      this.num2 = 2;
      // console.log(this.num2);
      this.newlist = this.list.filter(item => {
        return item.checked !== true;
      });
    },
    //选择完成项
    chooseCompleted() {
      this.num2 = 3;
      this.newlist = this.list.filter(item => {
        return item.checked === true;
      });
    },
    getTodo() {
      this.$axios
        .req("/todoList")
        .then(res => {
          this.list = res.data;
          this.newlist = this.list;
          // console.log(this.list);
          // console.log(this.newlist);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getTodo();
  },
  watch: {},
  computed: {
    check() {
      let num = 0;
      this.list.map(item => {
        if (item.checked === false) {
          num++;
        }
      });
      return num;
    }
  }
};
</script>

<style scoped lang='scss'>
.box-card {
  height: 544px;
}
div {
  width: 350px;
  height: 100%;
  .todoheader {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  .mainbody {
    justify-content: space-around;
    width: 100%;
    height: 430px;
    overflow: auto;
    /*margin: 0 auto;*/
    border-bottom: 1px solid #ccc;
    margin: 0 auto;

    .content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 30px;
      margin: 10px auto;

      .contentleft {
        display: flex;

        .flag {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #ccc;
        }
      }
    }
  }

  .else {
    width: 100%;
    height: 330px;
  }

  .bodyfooter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
    font-size: 14px;

    span {
      text-align: center;
      line-height: 35px;
    }

    div {
      width: 75px;
      height: 35px;
      text-align: center;
      line-height: 35px;
    }

    div:hover {
      cursor: pointer;
    }
  }

  .addBoder {
    border: 1px solid pink;
  }
}
</style>
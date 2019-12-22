<template>
  <div class="comm">
    <el-container class="el__container">
      <el-header>
        <div class="headers flex" v-if="user">
          <div class="welcome">
            <span>欢迎{{user.username}}来到小爱后台管理系统</span>
          </div>
          <div class="sayhello">
            <span>
              <span>{{sayHello}}</span>
              ,亲爱的{{user.username}} 当前时间：{{formatime}}
            </span>
          </div>
        </div>
        <div class="headers flex" v-else>
          <div class="welcome">
            <span>欢迎****来到小爱后台管理系统</span>
          </div>
          <div class="sayhello">
            <span>
              <span>****</span>
              ,亲爱的**** 当前时间：{{formatime}}
            </span>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              @click="goTorouter(item.path)"
              v-for="(item,index) in arr"
              :index="item.path"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { parse } from "path";
export default {
  data() {
    return {
      arr: [
        {
          title: "首页",
          icon: "el-icon-location",
          path: "/"
        },
        {
          title: "分页表格",
          icon: "el-icon-menu",
          path: "/paging"
        },
        {
          title: "标签页",
          icon: "el-icon-document",
          path: "/tab"
        },
        {
          title: "图片上传",
          icon: "el-icon-camera",
          path: "/upload"
        },
        {
          title: "已发表",
          icon: "el-icon-check",
          path: "/alreadypublished"
        },
        {
          title: "发布文章",
          icon: "el-icon-tickets",
          path: "/markdown"
        },
        {
          title: "统计",
          icon: "el-icon-circle-plus-outline",
          path: "/statistics"
        },
        {
          title: "导出excel",
          icon: "el-icon-folder-opened",
          path: "/export"
        },
        {
          title: "退出",
          icon: "el-icon-delete",
          path: "/exit"
        }
      ],
      user: "",
      hour: "",
      msg: ""
    };
  },
  components: {},
  methods: {
    goTorouter(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("users"));
    this.hour = this.$dayjs().format("HH");
    // console.log(this.user);
  },
  watch: {},
  computed: {
    formatime() {
      // setInterval()
      return this.$dayjs().format("YYYY年MM月DD日HH时mm分ss秒");
    },
    sayHello() {
      if (this.hour > 6 && this.hour < 12) return (this.msg = "早上好");
      else if (this.hour >= 12 && this.hour < 14) return (this.msg = "中午好");
      else if (this.hour >= 14 && this.hour < 18) return (this.msg = "下午好");
      else if (this.hour >= 18 && this.hour < 24) return (this.msg = "晚上好");
      else if(this.hour >= 0 && this.hour <= 6) return (this.msg = "该睡觉了哦");
      else return this.msg = '请先登录'
    }
  }
};
</script>

<style scoped lang='scss'>
.comm {
  width: 100vm;
  height: 100vh;
}
.headers {
  justify-content: space-between;
  // line-height: 60px;
  color: white;
  height: 100%;
  align-items: center;
  .welcome {
    margin-left: 10px;
  }
  .sayhello {
    margin-right: 10px;
  }
}
</style>
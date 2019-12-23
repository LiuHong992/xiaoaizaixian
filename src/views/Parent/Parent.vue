<template>
  <div class="comm">
    <el-container class="el__container">
      <!-- 父路由头部 -->
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
      <!-- 侧边栏+主要内容显示页面 -->
      <el-container>
        <!-- 侧边栏 -->
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
        <!-- 父路由的显示页面（子路由挂载处） -->
        <el-main>
          <keep-alive include="markdown">
            <router-view />
          </keep-alive>
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
      // 循环侧边栏的数组数据
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
      // 定义的变量来接收从sessionStorage中获取到的users对象
      user: "",
      // 定义来接收并格式化从登录接口穿过来的时间并进一步进行判断sayHello里面显示的内容
      hour: "",
      // sayHello里的数据
      msg: ""
    };
  },
  components: {},
  methods: {
    // 路由跳转
    goTorouter(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    // 进入首页时将存在sessionStorage中的users对象取出来（注：存值时转换成了JSON字符串，取的时候需要
    // 用JSON.parse转换回来）
    this.user = JSON.parse(sessionStorage.getItem("users"));
    // 格式化小时，来判断问好的内容
    this.hour = this.$dayjs().format("HH");
  },
  watch: {},
  computed: {
    // 格式化时间
    formatime() {
      return this.$dayjs().format("YYYY年MM月DD日HH时mm分ss秒");
    },
    // 导航栏问候内容
    sayHello() {
      if (this.hour > 6 && this.hour < 12) return (this.msg = "早上好");
      else if (this.hour >= 12 && this.hour < 14) return (this.msg = "中午好");
      else if (this.hour >= 14 && this.hour < 18) return (this.msg = "下午好");
      else if (this.hour >= 18 && this.hour < 24) return (this.msg = "晚上好");
      else if (this.hour >= 0 && this.hour <= 6)
        return (this.msg = "该睡觉了哦");
      else return (this.msg = "请先登录");
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
  // line-height: 60px
  min-width: 1200px;
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
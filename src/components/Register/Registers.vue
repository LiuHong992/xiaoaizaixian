<template>
<!-- 注册组件 -->
  <div class="registerbx">
    <h3 class="rtitle">欢迎来到小爱后台管理系统</h3>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="elruleForm"
    >
      <el-form-item label="请输入用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="请输入密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <div class="goto">
        <el-button @click="registerTo('ruleForm')" type="primary" round>立即注册</el-button>
        <el-button @click="goTologin" type="primary" round>立即登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        let filter = /[\u4E00-\u9FA5]/g;
        if (filter.test(value)) {
          callback(new Error("用户名不能有中文"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password.length >= 6) {
          // this.$refs.ruleForm.validateField("password");
          callback();
        }
        callback(new Error("密码必须大于6位"));
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    registerTo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .req("/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: "恭喜你，注册成功",
                  type: "success"
                });
                this.$router.push('/login')
                // this.$store.state.username = this.ruleForm.username;
                // this.$store.state.password = this.ruleForm.password;
              } else if (res.code === 1) {
                this.$message({
                  showClose: true,
                  message: "该用户已被注册了哦",
                  type: "warning"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({
            showClose: true,
            message: "请输入完整信息",
            type: "error"
          });
          return false;
        }
      });
    },
    goTologin() {
      this.$router.push('/login')
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.registerbx {
  width: 650px;
  height: 300px;
  background-color: white;
  box-shadow: 0px 0px 20px rgb(160, 153, 153);
  margin: 120px auto 0;
  .rtitle {
    height: 60px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid rgb(160, 153, 153);
  }
  .elruleForm {
    width: 80%;
    height: 100px;
    margin: 30px auto 50px;
  }
  .goto {
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin: 0 auto;
  }
}
</style>
<template>
  <div>
    <div class="reg">
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
          <el-form-item class="el__form" label="请输入验证码" prop="captcha">
            <el-input v-model="ruleForm.captcha" autocomplete="off"></el-input>
            <img
              @click="changeCaptcha"
              src="/api/captcha"
              ref="captcha"
              alt
              width="150"
              height="50"
              style="margin-left:20px;"
            />
          </el-form-item>
          <div class="goto">
            <el-button @click="goTohomes('ruleForm')" type="primary" round>立即登录</el-button>
            <el-button @click="registerTo" type="primary" round>立即注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
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
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (this.ruleForm.captcha !== "") {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        captcha: [{ required: true, validator: validatePass3, trigger: "blur" }]
      },
      yzm: ""
    };
  },
  components: {},
  methods: {
    registerTo() {
      this.$router.push("/register");
    },
    //动态获取随机验证码
    changeCaptcha() {
      this.$refs.captcha.src = "/api/captcha?time=" + Date.now();
    },
    goTohomes(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .req("user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code: this.ruleForm.captcha
            })
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: "恭喜你，登录成功",
                  type: "success"
                });
               sessionStorage.setItem('users',JSON.stringify(res.data[0]))
                this.$router.push("/");
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
                this.ruleForm.username = "";
                this.ruleForm.password = "";
                this.ruleForm.captcha = "";
                this.changeCaptcha();
              }
            });
        } else {
          this.$message.error("请检查登录信息是否完整");
          this.ruleForm.username = "";
          this.ruleForm.password = "";
          this.ruleForm.captcha = "";
          this.changeCaptcha();
          return false;
        }
      });
    }
  },
  mounted() {
    this.changeCaptcha();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.reg {
  position: absolute;
  width: 100%;
  height: 100%;
  // height: 1000px;
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: cover;
  .registerbx {
    width: 650px;
    height: 350px;
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
}
</style>
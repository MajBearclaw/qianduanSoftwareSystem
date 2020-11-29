<template>
<!--  <body id="poster">-->
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <u style="float: left;color: dodgerblue" >忘了密码？</u>
      <u style="float: right;color: dodgerblue" v-on:click="regist">没有账号？点击注册</u>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: dodgerblue;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
<!--  </body>-->
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      var _this = this
      this.$axios
        .post('/api/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
            _this.$store.commit('login', _this.loginForm)
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/' : path})
          } else {
            this.$message({
              type: 'error',
              message: '账号密码错误'
            })
          }
        })
        .catch(failResponse => {
          this.$message({
            type: 'error',
            message: '服务器未响应'
          })
        })
    },
    regist () {
      this.$router.replace({path: '/regist'})
    }
  }
}
</script>

<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background:url("../assets/timg.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }

</style>

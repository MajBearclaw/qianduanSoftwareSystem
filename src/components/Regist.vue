<template>
<!--  <body id="poster">-->
  <el-form class="regist-container" label-position="left"
           label-width="0px">
    <h3 class="regist_title">注册</h3>
<!--    <el-form-item>-->
<!--      <el-input placeholder="请输入内容" v-model="registForm.email">-->
<!--        <el-button slot="append" icon="el-icon-message" v-on:click="email"></el-button>-->
<!--      </el-input>-->
<!--    </el-form-item>-->
    <el-form-item>
      <el-input type="text" v-model="registForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="registForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="registForm.repasswd"
                auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: dodgerblue;border: none" v-on:click="login">注册</el-button>
    </el-form-item>
  </el-form>
<!--  </body>-->
</template>

<script>
export default {
  name: 'Regist',
  data () {
    return {
      registForm: {
        username: '',
        password: '',
        repasswd: '',
        email: ''
      },
      responseResult: []
      // verification: ''
    }
  },
  methods: {
    login () {
      var _this = this
      var self = this
      // if (self.verification === '') {
      //   self.$message({
      //     type: 'warning',
      //     message: '请输入验证码'})
      // } else {
      console.log(this.$store.state)
      this.$axios
        .post('/api/register', {
          username: _this.registForm.username,
          password: _this.registForm.password,
          surepswd: _this.registForm.repasswd
          // verification: _this.verification
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            self.$message({
              type: 'success',
              message: '登录成功'})
            _this.$store.commit('login', _this.registForm)
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
            // eslint-disable-next-line brace-style
          } // else if (successResponse.data.code === 300) {
          //   self.$message({
          //     type: 'warning',
          //     message: '验证码错误或不存在，请注意查收邮件中的验证码'})
          // }
          else {
            console.log(successResponse.data)
            self.$message({
              type: 'warning',
              message: '账号密码错误'})
          }
        })
        .catch(failResponse => {
          self.$message({
            type: 'warning',
            message: '服务器异常'})
        })
      // }
    }// ,
    // email () {
    //   var self = this
    //   if (self.registForm.email === '') {
    //     self.$message({
    //       type: 'warning',
    //       message: '请输入邮箱'})
    //   } else {
    //     self.$axios.post('/api/ClBlogs', {
    //       email: self.registForm.email
    //     })
    //       .then(function (response) {
    //         if (response.data.code === 200) {
    //           self.$message({
    //             type: 'success',
    //             message: '邮件已发送至 : ' + self.registForm.email + '，请注意查收'})
    //         } else if (response.data.code === 400) {
    //           self.$message({
    //             type: 'warning',
    //             message: '邮箱格式错误，或发送邮件失败，请检查邮箱后重新发送'})
    //         } else {
    //           alert('code = ' + response.data.code)
    //         }
    //       })
    //       .catch(function (error) {
    //         alert(error)
    //       })
    //   }
    // }
  }
}
</script>

<style scoped>
  .regist-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .regist_title {
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

<template>
  <el-menu
    router
    mode="horizontal"
    background-color="white"
    default-active='activeIndex'
    text-color="#222"
    active-text-color="red"
    style="width: 100%">
    <el-menu-item v-on:click="changeNo('/index/blogList/listRecommend')" index="/index/blogList/listRecommend">
      <router-link :to="{ path: '/index'}" style="color: dodgerblue;"><p>首页</p></router-link>
    </el-menu-item>
    <el-menu-item v-on:click="changeNo('/search')" index="/search">
      <router-link :to="{ path: '/search'}" style="color: dodgerblue;"><p>搜索</p></router-link>
    </el-menu-item>
    <!-- <el-menu-item v-on:click="changeNo('/write')" index="/write">
      <p @click="showWarn('/write')" style="color: dodgerblue;">上传资源</p>
    </el-menu-item> -->
    <el-menu-item  v-on:click="changeNo('/admin/myProfile')" index="/admin/myProfile">
      <p @click="showWarn('/admin')" style="color: dodgerblue;">个人中心</p>
    </el-menu-item>
    <!--    -->
    <!--    -->
    <!--    -->
    <!--    -->
    <router-link v-if="!username" :to="{ path: '/login' }" style="color: dodgerblue;float: right;padding: 20px;">登录</router-link>
    <router-link v-if="!username" :to="{ path: '/regist' }" style="color: dodgerblue;float: right;padding: 20px;">注册</router-link>
    <el-button v-if="username" type="text" @click="open" style="color: dodgerblue;float: right;padding: 22px">注销</el-button>
    <router-link v-if="username" :to="{ path: '/admin/myProfile' }"  @click="showWarn('/admin')" style="color: dodgerblue;float: right;padding: 20px">{{username}}</router-link>
    <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px;color: dodgerblue"></i>
<!--    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold;color: cornflowerblue">技术分享博客网站</span>-->
  </el-menu>
</template>

<script>
export default {
  inject: ['reload'],
  name: 'NavMenu',
  data () {
    return {
      username: this.$store.state.user.username,
      activeIndex: window.localStorage.getItem('activeIndex')
    }
  },
  methods: {
    open () {
      this.$confirm('确定登出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('logout', this.$store.state.user)
        this.reload()
        this.$message({
          type: 'success',
          message: '注销成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    showWarn (s) {
      if (!this.$store.state.user.username) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      }
      this.$router.replace({path: s})
    },
    changeNo (index) {
      // console.log('before' + this.activeIndex)
      this.activeIndex = index
      // console.log('after' + this.activeIndex)
      window.localStorage.setItem('activeIndex', index)
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>

<template>
  <div>
    <el-container>
      <el-aside width="175px">
        <el-menu
          class="categories"
          background-color="transparent"
          default-active='activePath'
        >
          <el-menu-item @click="gotoList('0', 'myProfile')" style="color: gray">
            <span slot="title" :class="{'textcolor' : activePath === '0'}">个人资料</span>
          </el-menu-item>
          <el-menu-item @click="gotoList('1', 'myFavor')" style="color: gray">
            <span slot="title" :class="{'textcolor' : activePath === '1'}">我的收藏</span>
          </el-menu-item>
          <el-menu-item @click="gotoList('2', 'myFollowing')" style="color: gray">
            <span slot="title" :class="{'textcolor' : activePath === '2'}">我的关注</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="content">
        <router-view style="float: left"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      activePath: window.localStorage.getItem('activePath')
    }
  },
  methods: {
    gotoList: function (active, Type) {
      this.changeActive(active)
      this.$router.push('/admin/' + Type)
      // this.reload()
    },
    changeActive (a) {
      this.activePath = a
      window.localStorage.setItem('activePath', a)
    }
  },
  destroyed () {
    window.localStorage.setItem('activePath', '0')
  }
}
</script>

<style scoped>
  .categories {
    width: 150px;
  }
  .textcolor {
      color: dodgerblue;
  }
</style>

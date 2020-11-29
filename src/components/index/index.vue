<template>
  <div>
    <el-container>
      <el-aside width="180px">
        <LSideMenu></LSideMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import LSideMenu from '../common/LSideMenu'
export default {
  name: 'index',
  components: {
    LSideMenu
  },
  mounted () {
    window.localStorage.setItem('bid', 'goudan')
  }
}
</script>

<style scoped>

</style>

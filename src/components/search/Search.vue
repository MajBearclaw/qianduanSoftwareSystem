<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容" style="margin-left: -50px;width: 50%"></el-input>
    <div style="clear: both"></div>
    <el-button icon="el-icon-search" v-on:click="processClick">标题搜索</el-button>
    <el-button icon="el-icon-search" v-on:click="processClick1">全文搜索</el-button>
    <el-button icon="el-icon-search" v-on:click="processClickUser">作者搜索</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
import BlogListSearch from '../blog/BlogListSearch'
export default {
  inject: ['reload'],
  components: {BlogListSearch},
  data () {
    return {
      input: ''
    }
  },
  methods: {
    processClick: function () {
      if (this.input === '') {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        this.$router.push('/search/listSearch/' + this.input)
        this.reload()
      }
    },
    processClick1: function () {
      if (this.input === '') {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        this.$router.push('/search/listSearch1/' + this.input)
        this.reload()
      }
    },
    processClickUser: function () {
      if (this.input === '') {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        this.$router.push('/search/userSearch/' + this.input)
        this.reload()
      }
    }
  }
}
</script>

<style scoped>

</style>

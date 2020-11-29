<template>
  <el-menu
    class="categories"
    background-color="white"
    default-active='activeIndex'>
    <el-menu-item index="0" style="color: gray" v-on:click="gotoList('0', 'listRecommend')">
      <i class="el-icon-menu"></i>
      <span slot="title" :class="{'textcolor' : activeIndex === '0'}">推荐</span>
    </el-menu-item>
    <el-menu-item index="1" style="color: gray" v-on:click="gotoList('1', 'listFollow')">
      <i class="el-icon-menu"></i>
      <span slot="title" :class="{'textcolor' : activeIndex === '1'}">收藏</span>
    </el-menu-item>
    <!-- <el-menu-item index="2" style="color: gray" v-on:click="gotoList('2', 'vue')">
      <i class="el-icon-menu"></i>
      <span slot="title" :class="{'textcolor' : activeIndex === '2'}">vue</span>
    </el-menu-item>
    <el-menu-item index="3" style="color: gray" v-on:click="gotoList('3', 'springboot')">
      <i class="el-icon-menu"></i>
      <span slot="title" :class="{'textcolor' : activeIndex === '3'}">springboot</span>
    </el-menu-item>
    <el-menu-item index="4" style="color: gray" v-on:click="gotoList('4', 'MongoDB')">
      <i class="el-icon-menu"></i>
      <span slot="title" :class="{'textcolor' : activeIndex === '4'}">MongoDB</span>
    </el-menu-item>
    <el-menu-item index="5" style="color: gray" v-on:click="gotoList('5', 'HTML')">
      <i class="el-icon-menu"></i>
      <span slot="title" :class="{'textcolor' : activeIndex === '5'}">HTML</span>
    </el-menu-item>
    <el-menu-item index="6" style="color: gray" v-on:click="gotoList('6', 'Others')">
      <i class="el-icon-menu"></i>
      <span slot="title" :class="{'textcolor' : activeIndex === '6'}">杂项</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  inject: ['reload'],
  data () {
    return {
      activeIndex: window.localStorage.getItem('SMaP')
    }
  },
  methods: {
    gotoList: function (active, Type) {
      this.changeActive(active)
      this.$router.push('/index/blogList/' + Type)
      this.reload()
    },
    changeActive: function (index) {
      this.activeIndex = index
      window.localStorage.setItem('SMaP', index)
      console.log(index)
    }
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

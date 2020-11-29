<template>
  <div id="blog-list" style="width: 90%">
    <h3 style="float: left">我的收藏</h3>
    <div style="clear: both;"></div>
    <el-row :gutter="30">
      <!-- 单个的卡片列 -->
      <div class="container" v-if="show" style="float: left;width: 100%;">
        <el-table style="width: 750px"
                  :stripe="true"
                  :data="blogList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column label="author" prop="author" :formatter = "authorFormat" width="180">
          </el-table-column>
          <el-table-column label="title" prop="title" width="280">
          </el-table-column>
          <el-table-column label="type" prop="subejct" :formatter = "typeFormat" width="120">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="blogList.length"
          style="float: left"
        >
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BlogListFollow',
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      blogList: [],
      show: true
    }
  },
  created: function () {
    this.handleBlogList()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    handleBlogList () {
      var self = this
      self.$axios.post('/api/ClBlogs', {
        username: self.$store.state.user.username
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.show = true
            self.blogList = response.data.data
          } else if (response.data.code === 400) {
            self.show = false
            self.$message({
              type: 'warning',
              message: response.data.message})
          } else {
            alert('code = ' + response.data.code)
          }
        })
        .catch(function (error) {
          alert(error)
        })
    },
    authorFormat (row, column) {
      return row.author.join(',')
    },
    typeFormat (row, column) {
      return row.subject.join(',')
    },
    handleClick (row) {
      this.$router.push('/index/blog/' + row._id)
    },
    handleClickType (row) {
      this.$router.push('/index/blogList/' + row.type)
    },
    handleClickUser (row) {
      this.$router.push('/user/' + row.username + '/othersProfile')
    }

  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <div id="blog-list" v-if="show">
      <h3>资源列表</h3>

      <el-row>
        <div class="container" v-if="show">
          <el-col :span="16" :offset="4" >
            <el-table style="width: 100%"
                      :stripe="true"
                      :data="blogList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
              <el-table-column type="index" width="50">
              </el-table-column>
              <el-table-column label="author" prop="author" :formatter = "authorFormat" width="180">
              </el-table-column>
              <el-table-column label="title" prop="title" width="280">
              </el-table-column>
              <el-table-column label="type" prop="subject" :formatter = "typeFormat" width="120">
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <div style="clear: both"></div>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="blogList.length">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <div v-if="!show">
      <br>
      <br>
      <br>
      <img src="../../assets/blank.png">
      <br>
      <br>
      <p style="color: gray">空空如也</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogListSearch',
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      blogList: [],
      input: this.$route.params.input,
      show: true
    }
  },
  mounted () {
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
      self.$axios.post('/api/searchTitle', {
        title: this.input
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.show = true
            self.blogList = response.data.data
          } else if (response.data.code === 400) {
            self.show = false
            self.$message({
              type: 'warning',
              message: '无结果'
            })
          } else {
            alert('code = ' + response.data.code)
          }
        })
        .catch(function (error) {
          alert(error)
        }
        )
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

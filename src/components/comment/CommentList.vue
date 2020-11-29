<template>
  <div id="comment-list" style="width: 95%">
    <h3 style="float: left">精彩评论</h3>
    <div style="clear: both"></div>
    <el-row :gutter="50">
      <!-- 单个的卡片列 -->
      <div class="container">
        <el-table style="width: 80%;"
                  :data="commentList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :show-header="false"
                  :stripe="true"
        >
        <el-table-column label="username" prop="username" width="150">
        </el-table-column>
        <el-table-column label="content" prop="content" width="600">
        </el-table-column>
        </el-table>
        <el-pagination
          style="width: 70%"
          small
          @current-change="handleCurrentChange"
          :current-page="currentPage"
        layout="prev, pager, next"
        :total="commentList.length">    //这是显示总共有多少数据，
        </el-pagination>
<!--      <el-col :span="24" v-for="(item, index) in commentList"-->
<!--              :index="index"-->
<!--              :key="index"-->
<!--              class="">&lt;!&ndash; 0 == flag || item.courseType == flag ? '' : 'hide' &ndash;&gt;-->
<!--        &lt;!&ndash; card div &ndash;&gt;-->
<!--        <router-link :to="'/index/blog/' + item._id">-->
<!--          <div class="comment" >-->
<!--            &lt;!&ndash; info div &ndash;&gt;-->
<!--            <div class="comment-info">-->
<!--              <div class="user">-->
<!--                {{item.username}}-->
<!--              </div>-->
<!--              <div class="comment">-->
<!--                {{item.content}}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </router-link>-->
<!--      </el-col>-->
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  inject: ['reload'],
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      commentList: [],
      blog: this.$route.params.blogNo
    }
  },
  created: function () {
    this.handleCommentList()
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
    handleCommentList () {
      var self = this
      self.$axios.post('/api/blogReview', {_id: this.blog})
        .then(function (response) {
          self.commentList = response.data.data
        })
        .catch(function (error) {
          alert(error)
        })
    }

  }

}
</script>

<style scoped>
  .container {
    width: 100%;
    float: left
  }
</style>

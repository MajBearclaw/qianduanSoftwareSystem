<template>
  <div>
    <el-col :span="12">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4}"
        placeholder="请输入评论"
        v-model="textarea"
      >
      </el-input>
      <el-button type="primary" @click="handleClick">发表评论</el-button>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'CommentWrite',
  inject: ['reload'],
  data () {
    return {
      textarea: '',
      username: this.$store.state.user.username,
      blog: this.$route.params.blogNo
    }
  },
  methods: {
    handleClick: function () {
      var self = this
      if (self.textarea === '') {
        self.$message({
          type: 'warning',
          message: '评论不得为空'})
      } else {
        self.$axios.post('/api/postReview', {
          content: self.textarea,
          username: self.username,
          bid: self.blog
        })
          .then(function (response) {
            self.$message({
              type: 'success',
              message: '成功发送评论'})
            self.textarea = ''
            self.reload()
          })
          .catch(function (error) {
            alert(error)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>

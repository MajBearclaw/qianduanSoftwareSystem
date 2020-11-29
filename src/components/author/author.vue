<template>
  <div id="author">
      <el-container>
      <el-aside width="150px">
        <el-menu
          class="categories"
          background-color="transparent">
          <el-menu-item @click="back()">
          <span>返回</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <h3 style="float: left">作者详细信息</h3>
        <div style="clear: both"></div>
        <hr align="left" width="75%">
        <div style="clear: both"></div>
        <section class="box" style="float: left;margin-left: 20px;background-color: white; width: 600px">
        <p style="float: left;color: black">姓名: &nbsp;{{name}}</p><br>
        <hr align="left" width="75%">
        <p style="float: left;color: black">已知资源: &nbsp;&nbsp;</p>
          <section style="float: left;margin-left: 20px;background-color: white; width: 400px;">
            <template v-for="item in pubs">
            <el-button type="text" @click="handleClick(item)" :key="item.id" style="float: left;">{{item}}</el-button>
            </template>
          </section>
        <hr align="left" width="75%">
        <p style="float: left;color: black">涉及领域: &nbsp;&nbsp;{{strFormat(tag)}}</p>
        <hr align="left" width="75%">
        <p style="float: left;color: black">所属机构: &nbsp;&nbsp;{{organ}}</p>
        </section>
        <section class="p-user-data">
          <div class="btn" v-if="!isFollowed" @click="follow">关注</div>
          <div class="btn" v-if="isFollowed" @click="unfollow">取消关注</div>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'author',
  inject: ['reload'],
  data () {
    return {
      auId: this.$route.params.auid,
      name: '',
      pubs: [],
      tag: [],
      organ: '',
      username: this.$store.state.user.username,
      id: '',
      isFollowed: false
    }
  },
  mounted () {
    this.checkFollowed()
    var self = this
    self.$axios
      .post('/api/forOneAuthor', {
        _id: self.auId
      })
      .then(response => {
        self.name = response.data.data.name
        self.pubs = response.data.data.pubs
        self.tag = response.data.data.tag
        self.organ = response.data.data.organ
        self.url = response.data.data.url
      }
      )
      .catch(failResponse => {
        this.$message({
          type: 'error',
          message: '服务器错误'
        })
      })
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    strFormat (_val) {
      return _val.join(', ')
    },
    handleClick (item) {
      var self = this
      self.$axios.post('/api/forOneBlog', {
        username: self.name,
        title: item
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.id = response.data.data._id
            self.$router.push('/index/blog/' + self.id)
          } else if (response.data.code === 400) {
            self.$message({
              type: 'warning',
              message: '本站暂未收集该文章信息哦！'
            })
          } else {
            alert('code = ' + response.data.code)
          }
        })
        .catch(function (error) {
          alert(error)
        }
        )
      if (self.id) {
        this.$router.push('/index/blog/' + self.id)
        this.reload()
      }
    },
    follow: function () {
      var self = this
      self.$axios.post('/api/follow', {
        authorid: self.auId,
        username: self.username
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.$message({
              type: 'success',
              message: self.username + ' has just followed ' + self.name})
            self.reload()
          } else {
            alert('code = ' + response.data.code)
          }
        })
        .catch(function (error) {
          alert(error)
        }
        )
    },
    unfollow: function () {
      var self = this
      self.$axios.post('/api/dfollow', {
        authorid: self.auId,
        username: self.username
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.$message({
              type: 'success',
              message: self.username + ' has just stop following ' + self.name})
            self.reload()
          } else {
            alert('code = ' + response.data.code)
          }
        })
        .catch(function (error) {
          alert(error)
        }
        )
    },
    checkFollowed: function () {
      var self = this
      self.$axios.post('/api/DoIFollow', {
        authorid: self.auId,
        username: self.username
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.isFollowed = true
          } else {
            self.isFollowed = false
          }
        })
        .catch(function (error) {
          alert(error)
        }
        )
    }
  }
}
</script>

<style scoped>
  .categories {
    position: fixed;
    width: 150px;
  }
  .textcolor {
    color: dodgerblue;
  }
  .box {
    width: 600px;
    height: 400px;
    background-color: black;
  }
</style>

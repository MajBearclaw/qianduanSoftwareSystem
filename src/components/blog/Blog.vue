<template>
  <div id="blog">
    <h3 id="c" style="float: left"></h3>
    <div style="clear: both"></div>
    <div>
      <div id="d" style="font-size: 100%;color: gray;float: left">作者:&nbsp;
        <template v-for="item in authorname">
        <el-button type="text" @click="handleClick(item)" class="area" :key="item.id">{{item}}</el-button>
        </template>
      </div>
      <div id="e" style="font-size: 100%;color: gray; float: left; margin-left: 200px; margin-top: 10px">收藏数:&nbsp;</div>

      <div style="clear: both"></div>
      <el-button type="warning" plain v-if="!isFavored" @click="favor" icon="el-icon-star-off" circle style="float: left;"></el-button>
      <el-button type="warning" v-if="isFavored" @click="unfavor" icon="el-icon-star-off" circle style="float: left;"></el-button>
    </div>
    <div style="clear: both"></div>
    <hr align="left" width="75%">
      <div style="maigin: 2em;line-height: 3;text-align:left; font-size: 1.2em">
        摘要：
      </div>
    <div>
      <el-col :span="18">
        <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);min-height: 100px;text-indent: 2em;maigin: 1em;line-height: 2;text-align:left;" id="a">
          <input type="hidden" id="b" name="b">
        </div>
      </el-col>
    </div>
    <div style="clear: both"></div>
    <!-- <div style="margin-top: 50px">
      <comment-write></comment-write>
      <div style="clear: both"></div>
      <comment-list></comment-list>
    </div> -->
    <br>
    <br>
    <br>
    <div id="f" style="font-size: 100%;color: gray;float: left">类型:&nbsp;{{strFormat(type)}}</div>
    <div style="clear: both"></div>
    <div id="g" style="line-height: 2;font-size: 100%;color: gray;float: left">取自:&nbsp;</div>
    <div style="clear: both"></div>
    <div id="h" style="line-height: 2.5;font-size: 100%;color: gray;float: left">
      <a :href="url" >外链地址</a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// import CommentList from '../comment/CommentList'
// import CommentWrite from '../comment/CommentWrite'
export default {
  name: 'blog',
  // components: {CommentWrite, CommentList},
  inject: ['reload'],
  data () {
    return {
      blogId: this.$route.params.blogNo,
      title: '',
      content: '',
      isFavored: false,
      username: this.$store.state.user.username,
      authorname: [],
      type: [],
      url: '',
      id: ''
    }
  },
  mounted () {
    var self = this
    self.$axios
      .post('/api/forOne', {
        _id: self.blogId
      })
      .then(response => {
        self.title = response.data.data.title
        self.content = response.data.data.abstract
        self.authorname = response.data.data.author
        self.type = response.data.data.subject
        self.url = response.data.data.url
        $('#a').append(this.content)
        $('#c').append(this.title)
        $('#e').append(response.data.data.collectedTimes)
        $('#g').append(response.data.data.from)
        self.checkFavored()
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
    handleClick (name) {
      var self = this
      self.$axios.post('/api/authorHome', {
        name: name
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.id = response.data.data._id
            self.$router.push('/author/' + self.id)
          } else if (response.data.code === 400) {
            self.$message({
              type: 'warning',
              message: '本站暂未收集该作者信息哦！'
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
        this.$router.push('/author/' + self.id)
        this.reload()
      }
    },
    handleClick2 () {
      this.$router.push('/index/blogList/' + this.type)
    },
    strFormat (_val) {
      return _val.join(',')
    },
    favor: function () {
      var self = this
      self.$axios.post('/api/collect', {
        username: self.username,
        _id: this.blogId
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.$message({
              type: 'success',
              message: self.username + ' has just favored ' + self.blogId})
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
    unfavor: function () {
      var self = this
      self.$axios.post('/api/dcollect', {
        username: self.username,
        _id: this.blogId
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.$message({
              type: 'info',
              message: self.username + ' has just stop favoring ' + self.blogId})
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
    checkFavored: function () {
      var self = this
      self.$axios.post('/api/isCollected', {
        username: self.username,
        _id: this.blogId
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.isFavored = true
          } else {
            self.isFavored = false
          }
        })
        .catch(function (error) {
          alert(error)
        }
        )
    }
    // ,
    // rewrite () {
    //   window.localStorage.setItem('draft', this.content)
    //   window.localStorage.setItem('draft_t', this.title)
    //   this.$router.push('/write')
    // }
  }
}
</script>

<style scoped>

</style>

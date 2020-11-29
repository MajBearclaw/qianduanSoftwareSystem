<template>
  <section class="p-user-data">
    <img :src="imgSrc">
    <div class="btn" @click="showCutter=true">点击上传图片</div>
    <AvatarCutter v-if="showCutter" @cancel="showCutter = false" return-type="url" @enter="uploadAvatar"></AvatarCutter>
  </section>
</template>

<script>
import AvatarCutter from './AvatarCutter'
export default {
  name: 'Avatar',
  components: {AvatarCutter},
  data () {
    return {
      imgSrc: 'http://www.luckly-mjw.cn/baseSource/picture-avatar-03.png',
      showCutter: false, // 是否显示头像裁剪组件
      userInfo: {},
      username: this.$store.state.user.username
    }
  },
  mounted () {
    this.showAvatar()
  },
  methods: {
    // 上传裁剪好的头像
    uploadAvatar (src) {
      var self = this
      self.imgSrc = src
      self.showCutter = false
      self.$axios.post('/api/postHead', {
        username: self.username,
        picture: self.imgSrc
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message({
              type: 'success',
              message: '上传成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '上传失败'
            })
          }
        })
        .catch(failResponse => {
          this.$message({
            type: 'error',
            message: '服务器未响应'
          })
        })
    },
    showAvatar () {
      var self = this
      self.$axios.post('/api/myHead', {
        username: self.username
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            self.imgSrc = successResponse.data.data
          } else {
            this.$message({
              type: 'warning',
              message: '接收图片失败'
            })
          }
        })
        .catch(failResponse => {
          this.$message({
            type: 'error',
            message: '服务器未响应'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .p-user-data {
    background-color: white;
    img {
      display: block;
      width: 100px;
      height: 100px;
      background-image: url(../../../assets/empty.png);
      background-repeat: round;
    }
    .btn {
      display: block;
      float: left;
      margin-top: 20px;
      width: 100px;
      height: 20px;
      line-height: 10px;
      font-size: 12px;
      color: white;
      border-radius: 4px;
      text-align: center;
      box-sizing: border-box;
      background-color: #3D8AC7;
    }
  }
</style>

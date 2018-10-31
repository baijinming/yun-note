<template>
  <div class="article">
    <div class="author">
      <div class="img">
        <img :src="form.author.avatar" >
      </div>
      <div class="text">
        <p class="title">{{form.title}}</p>
        <p class="looknums">{{form.createdAt.substring(0,10)}} 阅读：{{form.looknums}} 作者：{{form.author.username}}</p>
      </div>
    </div>
    <div class="content" v-html="form.content"></div>
    <div class="comment">
      <h1>评论</h1>
      <el-input v-model="commenttext" @keyup.enter.native="comment" placeholder="请在此处评论" style="margin: 20px 0"></el-input>
      <div class="allComment" v-if="form.comments">
        <div class="comment-item" v-for="(item, index) in form.comments" :key="index">
          <div class="reviewer">
            <img :src="item.avatar" alt="">
            <p>{{item.name}}</p>
          </div>
          <p class="text">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          id: '',
          form: {
            author: {
              avatar: '',
              username: ''
            },
            title: '',
            createdAt: '',
            looknums: '',
            content: '',
            comments: []
          },
          commenttext: ''
        }
      },
      methods: {
        getArticle() {
          this.id = this.$route.params.id
          this.$axios.get(`/article/${this.id}`).then(res => {
            this.form = res.data
            this.form.comments.reverse()
          })
        },
        comment() {
          let info = {
            name: this.$store.state.userInfo.username,
            avatar: this.$store.state.userInfo.avatar,
            content: this.commenttext
          }
          this.$axios.put(`/article/comment/${this.id}`,info).then(res => {
            if(res.code == 200) {
              this.commenttext = ''
              this.$message.success(res.msg)
              this.getArticle()
            }
          })
        }
      },
      created() {
        this.getArticle()
      }
    }
</script>

<style scoped lang="scss">
  .article {
    width: 760px;
    margin: 40px auto;
    background-color: #fff;
    border-radius: 6px;
    padding: 20px 40px;
    box-sizing: border-box;
  }

  .author {
    display: flex;

    .img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 60px;
        height: 60px;
      }
    }

    .text {
      margin-left: 10px;

      .title {
        font-size: 18px;
        font-weight: 700;
      }

      .looknums {
        font-size: 14px;
        color: #888;
        margin-top: 10px;
      }
    }
  }

  .content {
    margin-top: 50px;
  }

  .comment {
    margin-top: 50px;

    h1 {
      color: #555;
      text-align: center;
      font-size: 26px;
      font-weight: 500;
    }
  }

  .allComment {
    padding-left: 30px;

    .comment-item {
      margin-top: 10px;
      border-bottom: 1px solid #e9e9e9;

      .text {
        margin: 10px;
        font-size: 14px;
      }
    }
  }

  .reviewer {
    display: flex;

    img {
      width: 60px;
      height: 60px;
    }

    p {
      margin: 20px 0 0 10px;
    }
  }
</style>

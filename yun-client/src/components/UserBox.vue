<template>
  <div class="user-box">
    <div v-if="!userInfo.username">
      <div class="mb30">
        <el-input placeholder="邮箱" v-model="form.email"></el-input>
      </div>
      <div class="mb30">
        <el-input type="password" placeholder="密码" v-model="form.password" @keyup.center="login"></el-input>
      </div>
      <div class="btn mb30">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <div class="btn mb30">
        <el-button @click="$router.push('/register')">注册</el-button>
      </div>
    </div>
    <div v-else>
      <div class="user-msg">
        <div class="avatar">
          <img :src="userInfo.avatar" alt="">
          <p>萌新：{{userInfo.username}}</p>
        </div>
        <p>邮箱:{{userInfo.email}}</p>
        <p>个性签名:
          <strong v-if="userInfo.desc">{{userInfo.desc}}</strong>
          <strong v-else>这家伙很懒，什么都没留下</strong>
        </p>
      </div>
      <el-button class="quitbtn" type="warning" style="margin-top: 30px;width: 100%" @click="quitLogin">退出登录</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          form: {
            email: '',
            password: ''
          }
        }
      },
      methods: {
        login() {
          this.$axios.post('/user/login', this.form).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$store.commit('CHANGE_INFO', res.data)
            }else {
              this.$message.error(res.msg)
            }
          })
        },
        quitLogin() {
          this.$axios.post('/user/quitlogin').then(res => {
            let userInfo = {
              avatar: '',
              desc: '',
              email: '',
              username: '',
            }
            if(res.code == 200){
              this.$message.success(res.msg)
              this.$store.commit('CHANGE_INFO', userInfo)
            }else {
              this.$message.error(res.msg)
              this.$store.commit('CHANGE_INFO', userInfo)
            }
          })
        }
      },
      computed: {
        userInfo() {
          return this.$store.state.userInfo
        }
      },
      created() {

      }
    }
</script>

<style scoped lang="scss">
  .user-box {
    height: 340px;
    width: 360px;
    padding: 50px 30px 0;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
  }

  .btn /deep/ .el-button {
    width: 100%;
  }

  .mb30 {
    margin-bottom: 30px;
  }

  .user-msg {
    text-align: center;

    p {
      margin-top: 20px;
    }

    strong {
      font-weight: 400;
      font-size: 14px;
      color: #555;
    }

    .avatar {
      display: flex;

      img {
        width: 100px;
        height: 100px;
      }
    }
  }

</style>

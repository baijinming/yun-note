<template>
    <div class="write-note">
      <div class="title">
        <p>标题</p>
        <el-input v-model="form.title" placeholder="标题"></el-input>
      </div>
      <div class="editor">
        <p>内容</p>
        <div class="quill-wrap">
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="handleChange"
          >
          </quill-editor>
        </div>
      </div>
      <div class="label">
        <p>标签：</p>
        <div class="tags">
          <div v-for="(item, index) in categories" :key="index" style="margin-left: 10px">
            <el-radio v-model="radio" :label="item._id" @change="choose(item.name)">{{item.name}}</el-radio>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="publish">发布笔记</el-button>
    </div>
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)

  export default {
    components: {quillEditor},
    data() {
      return {
        radio: 1,
        tag: '',
        form: {
          title: '',
          content: '',
          contentText: ''
        },
        categories: [],
        // 富文本框参数设置
        editorOption: {
          uploadConfig: {
            token: 'hiaSMM1QqBT-0Q0KywiDrpp_tXbgBz8p1mFXkoil:h6RXhGWohEGKS_GzVPbwPUpuHiE=:eyJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6ICQoa2V5KSwgXCJoYXNoXCI6ICQoZXRhZyksIFwidXJsXCI6IFwiaHR0cDovL3BibC55YW9qdW5yb25nLmNvbS8kKGtleSlcIn0iLCJzY29wZSI6InB1YmxpYyIsImRlYWRsaW5lIjoxNTM4MTkwNzUyfQ==',
            action: 'https://upload-z1.qiniup.com',
            res: (respnse) => {
              return respnse.url
            }
          }
        }
      }
    },
    methods: {
      getCategory() {
        this.$axios.get('/category').then(res => {
          this.categories = res.data
        })
      },
      handleChange({ quill, html, text }) {
        this.form.content = html
        text = `${text.substring(0,10)}...`
        this.form.contentText = text
      },
      publish() {
        if(this.tag) {
          this.$axios.post('/article/add',{...this.form,tag: this.tag}).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push('/')
            }else {
              this.$message.error(res.msg)
            }
          })
        }else {
          this.$message.error('请选择标签')
        }
      },
      choose(tag) {
        this.tag = tag
      }
    },
    created() {
      this.getCategory()
    }
  }
</script>

<style scoped lang="scss">
  .write-note {
    padding: 30px;
    background-color: #fff;
    margin-top: 30px;
    border-radius: 6px;

    p {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin-bottom: 10px;
    }
  }

  .editor {
    margin-top: 10px;

    .quill-wrap /deep/ .ql-container{
      height: 300px;
    }
  }

  .label {
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;

    p {
      font-size: 14px;
      color: #409eff;
    }

    .tags {
      margin-left: 10px;
      display: flex;

    }
  }
</style>

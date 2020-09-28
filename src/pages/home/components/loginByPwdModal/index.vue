<template>
  <div class="modal-wrapper">
    <t-modal v-model="visible"
             @close="hide">
      <!-- 内容 -->
      <div class="box">
        <div class="box-header">
            <span>账号登录</span>
        </div>
        <div class="box-content">
          <div class="form-wrapper">
            <div class="form-item">
              <div class="label">账号</div>
              <input class="input" type="text" v-model.trim="formData.uid" placeholder="请输入账号">
            </div>
            <div class="form-item">
              <div class="label">密码</div>
              <input class="input"  type="password" v-model.trim="formData.pwd" placeholder="请输入密码">
            </div>
            <t-button class="login-btn" type="primary" @click="formValidate">登录</t-button>
          </div>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
import MD5 from 'crypto-js/md5';
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      visible : false,
      formData : {
        uid : '',
        pwd : ''
      }
    };
  },
    methods : {
      ...mapMutations([
        'UPDATE_USERINFO'
      ]),
      show () {
        this.visible = true;
      },
      hide () {
        this.visible = false;
      },
      formValidate () {
        if (!this.formData.pwd || !this.formData.uid) {
          this.$msg.error('请输入完整信息');
          return;
        }
        this.pwdLogin();
      },
      pwdLogin () {
        this.$ajax.post({
          apiKey: 'wxLoginByPwd',
          params: {
            uid : this.formData.uid,
            pwd : MD5(this.formData.pwd).toString()
          }
        }).then(res => {
          if (res.code === 0) {
            this.hide();
            this.$nextTick(() => {
              this.UPDATE_USERINFO(res.data);
              this.$router.push('/upload');
              this.$msg.success('登录成功');
            })
          } else {
            this.$msg.error('登录失败');
          }
        }).catch(() => {
          this.$msg.error('登录失败');
        });
      }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.modal-wrapper {
  /deep/ .t-modal-box {
    width: 398px;
    height: 382px;
  }
  .box {
    box-sizing: border-box;
    padding-top: 20px;
    width: 100%;
    height: 100%;
    .box-header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 9.5px 0;
      border-bottom: 0.5px solid #E5E5E5;
      color: #333333;
      font-size: 20px;
    }
    .box-content {
      @include flex_layout(column, center, center);
      .form-wrapper {
        width: 50%;
        margin-top: 39px;
        .form-item {
          margin-bottom: 20px;
          text-align: left;
          .label {
            margin-bottom: 3px;
            font-size: 14px;
          }

          .input {
            display: inline-block;
            padding: 0 15px;
            height: 30px;
            line-height: 20px;
            box-sizing: border-box;
            outline: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            font-size: 14px;
          }
        }

        .login-btn {
          margin-top: 40px;
        }
      }
    }
  }
}

</style>

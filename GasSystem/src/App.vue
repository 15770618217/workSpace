<template>
  <div id="app">
  <!-- 登录框 -->
    <Login v-on:showState="loginInState" v-if="loginShow"></Login>
  <!-- 系统页面 -->
    <div class="webContent" v-if="webShow">
      <!-- 系统头部 -->
      <div class="topHeader">
        <GasHeader v-on:loginOut="loginOutState" :headerUserName="headerUserName"></GasHeader><!-- :headerUserName="headerUserName" -->
      </div>
      <!-- 系统主内容 -->
      <div class="middleContent">
        <!-- 系统左侧操作栏目 -->
        <div class="GasController">
          <GasController></GasController>
        </div>
        <!-- 系统中间表格 -->
        <div class="GasRenderContent">
           <router-view :AccountType="AccountType"></router-view>
        </div>
      </div>

    </div> 
  </div>
</template>

<script>
import Login from './components/login.vue'
import GasHeader from './components/header.vue'
import GasController from './components/navController.vue'
export default {
  name: 'app',
  data () {
    return {
      loginShow: true,
      webShow: false,
      headerUserName: '',
      AccountType: '',
    }
  },
  methods: {
    loginInState:function(data) {//登录成功
      // console.log(data)
      if(data[0] === false){
        this.webShow = true;//显示web应用内容
        this.loginShow = false;//隐藏login组件
        this.headerUserName = data[1];
        this.AccountType = data[2];
      }
    },

    loginOutState: function(data) {//退出登录
      if (data[0] === true) {
        this.webShow = false;
        this.loginShow = true;
      }
    }
  },

  components: {
    Login,
    GasHeader,
    GasController
  }
}
</script>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
    min-width: 1250px;
    min-height: 750px;
    overflow: auto;
  }
  .webContent{
    width: 100%;
    height: 100%;
  }
  .topHeader{
    width: 100%;
    height: 10%;
  }
  .middleContent{
    position: relative;
    width: 100%;
    height: 90%;
    background-color: #fff;
  }
  .middleContent>.GasController{
    float: left;
    width: 20%;
    height: 100%;
    min-width: 250px;
    background-color: #04A1E4;
  }
  .middleContent>.GasRenderContent{
    float: right;
    width: 80%;
    height: 100%;
    min-width: 1000px;
  }
</style>

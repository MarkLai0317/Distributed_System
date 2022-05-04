<template>
    <div>
      <MarkComponent :prop="testProp"></MarkComponent>
      <el-button @click="registerCustomer()">register</el-button>
      <div class="error" v-if="error">{{error}}</div>
    </div>
</template>

<script>

import MarkComponent from './test/MarkComponent.vue'

export default {
  components:{
    MarkComponent
  },
  created(){
    this.getSensorData()
    this.getTradeHistory()
    
  },
  data(){
    return{
      options:[
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      valueA: '',
      table: [{
          id:'1',
          name: 'n',
        },
        {
          id: '2',
          name: 'n2'
        }
      ],
      testProp: 'testProp string',
      shopID: '',
      type: '',
      page: 3,
      error: ''
    }
  },
  methods:{
    handle() {
      console.log(console.log(this.firebase.auth().currentUser.email))
      
    },
    getSensorData() {

      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/searchProduct', {
        params: {
          //get 參數放這裡
          ShopID: this.shopID,
          Type: this.type,
          page: this.page,
      //    ManagerID: this.firebase.auth().currentUser.email
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.data)
        
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    registerCustomer(){

      //post 寫法
      this.axios.post('http://127.0.0.1:9000/mark/register/customer', {
        // post 參數放這裡
        Email: 'test1@gmail.com',
        Name: 'test1',
        PhoneNum: '0919191919'
      })
      .then(response => {// 回傳的 response 處理
        console.log(response);
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) 
        if(resobj.error){
          this.error = resobj.error
        }
        else{
          /*this.firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
              console.log("here");
              this.$router.replace({ name: "Buy" });
            })
            .catch(error => (this.error = error));*/
          console.log('success')
        }

      })
      .catch(error => {
        console.log(error)
        this.error = 'register fail'
        console.log(this.page)
      });
    },
    getTradeHistory(){
      this.axios.get('http://127.0.0.1:9000/ni/TradeHistory', {
        params: {
          //get 參數放這裡
          ManagerID: '108703060@nccu.edu.tw' ,
          page: 1,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.data)
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    }
    
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
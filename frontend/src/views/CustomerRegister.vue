<template>
  <div>
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="pressed">
      Register
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="name">
        <input type="name" v-model="name" placeholder="name" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
        <div class="error" v-if="passwordNotConsistent">password not consistent</div>
      </div>
      <div class="password">
        <input type="password" v-model="passwordConfirm" placeholder="password confirm" />
      </div>
      <div class="phoneNumber">
        <input type="phoneNumber" placeholder="phoneNumber" v-model="phoneNumber"/>
      </div>
      <div class="error" v-if="error">{{error}}</div>
      <button type="submit"  :disabled="registerDisable">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      error: "",
      
    };
  },
  computed:{
    registerDisable(){
      return !(this.password == this.passwordConfirm) || this.password == '' || this.email == ''
              || this.phoneNumber == '' || this.phoneNumber.length != 10 || !(/^\d+$/.test(this.phoneNumber))
              || this.name == '' 
    },
    passwordNotConsistent(){
      return !(this.password == this.passwordConfirm)
    }
  },
  methods: {
    pressed() {

      this.axios.get('http://127.0.0.1:9000/mark/existCustomer',{
        params: {
          //get 參數放這裡
          email: this.email,
        }
      }).then(response => {
        
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res)
        
        if(!resobj.exist){
          this.axios.post('http://127.0.0.1:9000/mark/register/Customer', {
            // post 參數放這裡
            Email: this.email,
            Name: this.name,
            PhoneNum: this.phoneNumber
          })
          .then(response => {// 回傳的 response 處理
            console.log(response);
            let res = JSON.stringify(response.data); // 先 變字串
            let resobj = JSON.parse(res) 
            if(resobj.error){
              this.error = resobj.error
            }
            else{
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                  console.log("here");
                  this.$router.replace({ name: "Buy" });
                })
                .catch(error => (this.error = error));
            }

          })
          .catch(error => {
            console.log(error);
            this.error = 'register fail'

          });
        }else{
          this.error = 'user exist'
        }

      })
      


      
      
      
      // call api
      
    }
  },

};
</script>

<style  scoped>
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>
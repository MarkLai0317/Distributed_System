import { createApp } from 'vue'
import App from './App.vue'
//import Vue from 'vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import ajax from "vuejs-ajax"
import axios from 'axios'

//import firebase from 'firebase/app'



// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
//import { onAuthStateChanged } from 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo2tXj0grmhufacfU44WmrCDIj2NNNwVQ",
  authDomain: "dbfinalproject-ff1dd.firebaseapp.com",
  projectId: "dbfinalproject-ff1dd",
  storageBucket: "dbfinalproject-ff1dd.appspot.com",
  messagingSenderId: "1026474221634",
  appId: "1:1026474221634:web:984ecefc2f68a53f724ddb"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = createApp(App).use(store).use(router).use(ElementPlus)
    app.config.globalProperties.axios=axios
    app.config.globalProperties.firebase=fire
    app.mount('#app')
  }
})

//const app = createApp(App).use(store).use(router).use(fire).use(ElementPlus).mount('#app')
//app.config.globalProperties.axios=axios




//createApp(App).use(store).use(router).use(fire).mount('#app')


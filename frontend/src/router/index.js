import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//import firebase from "firebase/compat/app"
import 'firebase/compat/auth'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customerLogin',
    name: 'CustomerLogin',
    component: () => import('../views/CustomerLogin.vue')
  },
  {
    path: '/managerLogin',
    name: 'ManagerLogin',
    component: () => import('../views/ManagerLogin.vue')
  },
  {
    path: '/managerRegister',
    name: 'ManagerRegister',
    component: () => import('../views/ManagerRegister.vue')
  },
  {
    path: '/customerRegister',
    name: 'CustomerRegister',
    component: () => import('../views/CustomerRegister.vue')
  },
  {
    path: '/managerHome',
    name: 'ManagerHome',
    component: () => import('../views/ManagerHome.vue'),
    children:[
      {
        path: 'orderHistory',
        component: () => import('../components/OrderHistory.vue')
      },
      {
        path: 'tradeHistory',
        component: () => import('../components/TradeHistory.vue')
      },
      {
        path: 'order',
        component: () => import('../components/Order.vue')
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('../components/Shop.vue')
      },
      {
        path: 'revenue',
        component: () => import('../components/Revenue.vue')
      },
    ]
  },
  {
    path: '/customerHome',
    name: 'CustomerHome',
    component: ()=> import('../views/CustomerHome.vue'),
    children:[
      {
        path: 'buy',
        name: 'Buy',
        component: () => import('../components/BuyTable.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'history',
        name: 'History',
        component: ()=> import('../components/CustomerHistory.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: ()=> import('../components/CustomerCart.vue') 
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component:  () => import('../views/Test.vue'),
    children:[
      {
        path: 'nn',
        component: () => import('../components/test/NNTest.vue')
      },
      {
        path: 'mark',
        component: () => import('../components/MarkTest.vue')
      },
      {
        path: 'lin',
        component: () => import('../components/test/linTest.vue')
      },
      {
        path: 'chang',
        component: () => import('../components/test/changTest.vue')
      },
      {
        path: 'tsai',
        component: () => import('../components/test/tsaiTest.vue')

      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});*/

export default router
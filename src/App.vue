<template>
 <div id="app" class="light min-h-screen " :class="this.$store.state.them">
    <nav-page />
    <router-view></router-view>
  </div>
</template>

<script>

import NavPage from './components/NavPage'

export default {
  name: 'App',
  components:{
    NavPage,
  },
  created(){
    if(localStorage.getItem('them') == undefined){
      localStorage.setItem('them', 'light');
      console.log('1')
    }else{
      this.$store.state.them = localStorage.getItem('them');
    }
  },
  watch:{
    '$store.state.them': function(x){
      x == 'dark'? document.body.style.backgroundColor = '#202d36' : document.body.style.backgroundColor = 'white';
      localStorage.setItem('them', this.$store.state.them);
    },
  }
}
</script>


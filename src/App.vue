<template>
  <body>
    <the-header></the-header>
    <div class="container">
      <main-page></main-page>
    </div>
  </body>
</template>

<script>
//import UserAuth from './components/userAuth.vue';
//import SignupFrom from './components/SignUpFrom.vue';
import TheHeader from "./components/layout/TheHeader.vue";
import MainPage from "./pages/MainPage.vue";

export default {
  components: {
    // UserAuth,
    // SignupFrom,
    TheHeader,
    MainPage
  },


  created(){
    this.fetchdata('https://api.themoviedb.org/3/trending/all/day?api_key=b9e62fadaa93179070f235a9087033e2');
   
  },

  data() {
    return {
      fetchInfo:'',
    };
  },

  methods: {
    async fetchdata(url){
      let data;
      try {
         data = await fetch(url)
         const response = await data.json()
         this.fetchdata = await response
        await console.log(this.fetchdata)

      } catch(e){
        console.log(e)
      }
      
     
    },

  
  
  }

};
</script>

<style>
:root {
  --main-color: rgb(255, 209, 26);
}

*,
*::before,
*:after {
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: "Montserrat", sans-serif;
  background-color:var(--main-color)
}
.container {
  width: 90%;
  height: 88vh;
  overflow: hidden;
  background-color: var(--main-color);
  margin: 0 auto;
  border:1px solid black;
}
</style>

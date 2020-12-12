<template>
    <main>
        <standard-carousel ></standard-carousel>
    </main>
</template>
<script>

export default {
    provide:{
        posterUrl:'/wzJRB4MKi3yK138bJyuL9nx47y6.jpg',
        imgUrl:"/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
        type:"movie" ,
        title:"Tenet" ,
        overview:"Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    },

    data() {
    return {
        trendingData:null,
    };
  },

  created(){
      this.getPopular();
      setTimeout(()=>{console.log(this.trendingData)},1500)
  },

  methods: {

    async fetchData(url){
      
      try {
        let data = await fetch(url);
        const response = await data.json();
        return await response
      } catch(e){
        console.log(e)
      }
      
    },

    getPopular(){
        this.fetchData('https://api.themoviedb.org/3/trending/all/day?api_key=b9e62fadaa93179070f235a9087033e2').then(data=>{
            console.log(data.results)
            this.trendingData = data.results[0];
        })
        
    }
}
}
</script>



<style scoped>

</style>
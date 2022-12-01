<template>
    <div class="w-full py-[20px] px-[20px] sm:px-[40px] xl:px-[40px] pt-[40px] dark:bg-[#202d36]">
       <div class="w-full grid grid-cols-[100%] md:grid-cols-[1fr_auto] gap-[40px] gap-x-[20px] justify-between items-center">
           <div class="w-full max-w-[555px] flex justify-start items-center shadow-[0px_4px_6px_#dbdbdbd4] dark:shadow-[0px_3px_6px_#0000001a]  rounded-sm px-[35px] py-[15px] dark:bg-[#2b3743]">
              <i class="fa-solid fa-magnifying-glass text-[1.56em] text-[#94a3b8] pr-[25px] dark:text-white"></i>
              <input type="text" placeholder="Search for a country..."  @keyup.enter="search_country()" v-model="search_value" class="w-full text-[1.36em] dark:text-white dark:bg-[#2b3743]  text-[#94a3b8] font-[300] placeholder:text-[#94a3b8] dark:placeholder:text-[white] py-[5px] focus:outline-[0px]"> 
           </div>
           <div class="relative w-full flex md:justify-end">
              <div ref="mytoogle_region" class="dark:bg-[#2b3743] dark:text-white w-[70%] md:w-[220px] cursor-pointer py-[20px] rounded-sm px-[18px] text-[1.24em] md:text-[1.18em] font-[100] tracking-widest shadow-[0px_4px_6px_#dbdbdbd4] dark:shadow-[0px_3px_6px_#0000001a] flex justify-between items-center" @click="toogle_region == false? toogle_region = true : toogle_region = false"><p class="pr-[35px] md:pr-[20px] capitalize">{{select_region}}</p> <i class="fa-solid fa-angle-down" :class="{'-rotate-90': toogle_region}"></i></div>
              <ul id="navbar" class="w-[70%] md:w-[220px] dark:bg-[#2b3743] dark:text-white shadow-[0px_3px_6px_#dbdbdbd4] dark:shadow-[0px_3px_6px_#0000001a] py-[10px] rounded-sm text-[.98em] bg-white absolute top-[115%]" :class="{'block': toogle_region, hidden: !toogle_region}">
                 <li v-for="(region, index) in regions" :key="region" @click="selectOF_region(region, index)" class="capitalize cursor-pointer py-[8px] px-[18px] text-[1.24em] md:text-[1.18em] font-[600] tracking-widest flex items-center">{{region}}</li>
              </ul>
           </div>
       </div>

      <div class="pt-[22vh] text-[#c4d1dd] text-[2em] flex w-full justify-center" v-show="this.$store.state.state_search == false">
         <h1>Not Found Result</h1>
      </div>

      <div class="w-full py-[50px]" v-show="this.$store.state.state_search">
         <div class="w-full grid grid-cols-[100%] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-[30px]">
            <div v-for="(country, index) in this.$store.state.countrys" :key="index" @click="go_to_details(country.name.common)" class="w-full rounded-lg overflow-hidden dark:bg-[#2b3743] shadow-[0px_4px_6px_#dbdbdbd4] dark:shadow-[0px_3px_6px_#1c1c1c08]">
               <img :src="country.flags.png" class="w-full object-cover h-[50vw] sm:h-[20vw] lg:h-[10.6vw]">
               <div class="w-full px-[20px] py-[25px] dark:text-white">
                  <h1 class="font-[800] text-[1.52em] md:text-[1.4em] mb-[18px]">{{country.name.common}}</h1>
                  <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px]">population: <span class="font-[400]">{{country.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}}</span></p>
                  <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px]">Region: <span class="font-[400]">{{country.region}}</span></p>
                  <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px]">Capital: <span class="font-[400]">{{country.capital !== undefined? country.capital[0] : 'Not Found Capital'}}</span></p>
               </div>
            </div>
         </div>
         <button @click="more_data()" v-show="this.$store.state.state_more && this.$store.state.countrys.length > 0" class="flex rounded-full m-auto text-[5em] w-[80px] h-[80px] text-[#48a8fb] justify-center items-center mt-[100px] hover:text-[#3b87ca]"><i class="fa-solid fa-angle-down"></i></button>
      </div>
    </div>
</template>
<script>


export default {
  name: 'HomePage',
  data(){
     return{
        regions: ['all', 'africa', 'americas', 'asia', 'antarctic', 'europe', 'oceania'],
        select_region: 'Filter by Region',
        toogle_region : false,
        search_value: '',
     }
  },
  created(){
      this.$store.state.regions_selcet_here = 'all';
      this.$store.dispatch("fetchUsers", 'https://restcountries.com/v3.1/all');
      this.$store.state.country_detils = [];
        
  },
  methods:{
     selectOF_region(x){
      this.$store.state.countrys = [];
      this.$store.state.count_data = 12;
      this.select_region = x;
      this.$store.state.regions_selcet_here = x;
      this.$store.commit('set_data', this.$store.state.allData)
     },
     more_data(){
            this.$store.state.countrys = [];
            this.$store.state.count_data += 12;
            this.$store.commit('set_data', this.$store.state.allData)
     },
     search_country(){
       this.$store.state.countrys = [];
       this.$store.state.count_data = 12;
        if(this.search_value !== ''){
            this.$store.dispatch("fetchUsers", `https://restcountries.com/v3.1/name/${this.search_value}`);
        }else{
            this.$store.dispatch("fetchUsers", 'https://restcountries.com/v3.1/all');
        }
     },
     go_to_details(x){
        this.$router.push(`country/${x}`)
     }
  },
   mounted() {
         let self = this;
        document.addEventListener('click', (e)=> {
            if (self.$refs.mytoogle_region !==undefined && self.$refs.mytoogle_region.contains(e.target)===false) {
                self.toogle_region = false;
            }
        })
  },  

}
</script>
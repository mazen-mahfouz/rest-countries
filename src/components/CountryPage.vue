<template>
    <div class="w-full pt-[60px] pb-[20px] px-[20px] sm:px-[40px] xl:px-[40px] bg-white dark:bg-[#202d36] dark:text-white mt-[10px]">
      <div class="w-full flex flex-wrap justify-between items-center">
        <div class="w-full mb-[60px]">
            <button @click="go_to_home()" class="grid dark:bg-[#2b3743] grid-cols-[auto_auto] gap-[14px] text-[1.08em] cursor-pointer px-[35px] py-[10px] shadow-[0px_4px_5px_1px_#0000001a] items-center rounded-md"><i class="fa-solid fa-arrow-left"></i> <p>Back</p></button>
        </div>
        <div class="w-full grid grid-cols-[auto] md:grid-cols-[1.2fr_1fr]" v-for="(country_detils, index) in this.$store.state.country_detils" :key="index">
            <div>
                <img :src="country_detils.flags.svg" class="mb-[30px] w-full object-cover h-[50vw] md:h-auto md:w-[92%]">
            </div>
            <div class="md:mt-[50px]">
                <h1 class="font-[600] text-[2.1em] md:text-[2.3em] mb-[20px]">{{country_detils.name.common}}</h1>
                <div class="w-full grid grid-cols-[1fr] gap-[30px] md:grid-cols-[1fr_1fr] mb-[30px]">
                    <div class="w-full dark:text-white">
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">{{country_detils.name.nativeName !== undefined? 'Native' : 'Official'}} Name: <span class="font-[400]">{{country_detils.name.nativeName !== undefined? Object.values(country_detils.name.nativeName)[0].common : country_detils.name.official}}</span></p>
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">population: <span class="font-[400]">{{country_detils.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}}</span></p>
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">Region: <span class="font-[400]">{{country_detils.region}}</span></p>
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">Sub Region: <span class="font-[400]">{{country_detils.subregion}}</span></p>                        
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">Capital: <span class="font-[400]">{{country_detils.capital !== undefined? country_detils.capital[0] : 'Not Found Capital'}}</span></p>
                    </div>
                    <div class="w-full dark:text-white">
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">Top Level Domain: <span class="font-[400]">{{Object.values(country_detils.tld)[0]}}</span></p>
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">Currencies: <span class="font-[400]">{{country_detils.currencies !== undefined? Object.values(country_detils.currencies)[0].name : '/'}}</span></p>
                        <p class="text-[1.2em] md:text-[1.05em] font-[700] mb-[10px] md:mb-[20px]">Languages: <span class="font-[400]">{{country_detils.languages !== undefined? Object.values(country_detils.languages)[0] : '/'}}</span></p>
                    </div>
               </div>
               <div class="flex flex-col w-full">
                   <h1 class="font-[600] text-[1.4em] md:text-[1.5em] mb-[20px] block">Border Countries:</h1>
                   <ul class="flex flex-wrap">
                       <li v-for="(border, index) in country_detils.borders" :key="index" class="text-[1.07em] px-[14px] py-[8px] dark:bg-[#2b3743] shadow-[0px_4px_5px_1px_#0000001a] cursor-pointer mx-[10px] mb-[10px] rounded-md">{{border}}</li>
                       <li v-if="country_detils.borders == undefined"  class="text-[#abb8c4] text-[1.07em] px-[14px] py-[8px] dark:bg-[#2b3743] shadow-[0px_4px_5px_1px_#0000001a] cursor-pointer mx-[10px] mb-[10px] rounded-md">Not Found Borders</li>
                   </ul>
               </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>


export default {
  name: 'CountryPage',
  data(){
      return{
          country: null,
      }
  },
  props:['name'],
    created() {
      this.$store.dispatch("fetchUsers", `https://restcountries.com/v3.1/name/${this.name}?fullText=true`);
      setTimeout(() => {
                console.log(this.$store.state.country_detils[0].borders)
      }, 1000);

  },
  methods:{
      go_to_home(){
           this.$router.push('/')
      }
  }
}
</script>
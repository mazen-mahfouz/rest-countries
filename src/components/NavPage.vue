<template>
    <nav class="w-full py-[20px] px-[20px] sm:px-[40px] xl:px-[40px] bg-white dark:bg-[#2b3743] dark:text-white shadow-[0px_0px_10px_#d5d5d5] dark:shadow-[0px_3px_6px_#0000001a]">
      <div class="w-full flex justify-between items-center">
        <h1 class="font-[700] text-[1.33em] sm:text-[1.46em] md:text-[1.33em] dark:text-white">Where in the world?</h1>
        <button @click="$store.state.them == 'light'? $store.state.them = 'dark' : $store.state.them = 'light'" class="dark:text-white flex items-center cursor-pointer"><i class="fa-regular mr-[8px] text-[1.3em] -rotate-12" :class="{'fa-moon': $store.state.them == 'light', 'fa-sun': $store.state.them == 'dark'}"></i><p class="text-[1.15em]">{{$store.state.them == 'light'? 'Dark' : 'Light'}} Mode</p></button>
      </div>
    </nav>
</template>

<script>


export default {
  name: 'NavBar',
}
</script>
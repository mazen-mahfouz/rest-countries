import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        them: 'light',
        countrys: [],
        country_detils: [],
        count_data: 12,
        allData: '',
        regions_selcet_here: 'all',
        state_more: true,
        state_search: true,
    },
    mutations: {
      set_data(state, data){
        state.countrys = [];
        state.allData = data;
        // state.count_data = (data.length > 12 ? 12 : data.length);  
        function s(){
          if(state.regions_selcet_here == 'all'){
            data.map(function(element){
              if(state.countrys.length < state.count_data){
                state.countrys.push(element)
              }
            })
          }else{
              data.map(function(element){
                if(element.region.toLowerCase() == state.regions_selcet_here){
                    state.countrys.push(element)
                }
            })
          }
        }
          if(data.length < 12){
              s()
              state.state_more = false;
          }else{
            if(state.count_data > data.length - 12){
              s()
              if(state.countrys.length == data.length){
                state.state_more = false;
              }
            }else{
              state.state_more = true;
              if(state.regions_selcet_here == 'all'){
                data.map(function(element){
                  if(state.countrys.length < state.count_data){
                    state.countrys.push(element)
                  }
                })
              }else{
                let limit = data.filter(x => x.region.toLowerCase() == state.regions_selcet_here).length;
                if(limit < state.count_data){
                  state.state_more = false;
                }
                data.map(function(element){
                    if(element.region.toLowerCase() == state.regions_selcet_here){
                      if(state.countrys.length < state.count_data){
                        state.countrys.push(element)
                      }
                    }
                })
              }
            }
          }
          console.log(state.count_data + ' : ' + state.countrys.length + ' : ' +  data.length)
      },
    },
    actions: {
        async fetchUsers({commit, state},e) {
          try {
            state.state_search = true;
            const data = await axios.get(e)
              
              if(e.indexOf('?fullText=true') !== -1){
                state.country_detils = data.data;
              }else{
                commit('set_data', data.data)
              }
            }
            catch (error) {
              state.state_search = false;
          }
        }
    },
})
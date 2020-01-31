import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from '@/axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        items: [],
    },
    getters: {
        getItems: state => {
            return state.items
        },
    },
    mutations: {
        getItems: (state, payload) => {
            state.items = payload;
        },
        deleteItem: (state, id) => {
            let index = state.items.findIndex(item => item.id == id)
            state.items.splice(index, 1)
        },
        addItem: (state, item) => {
            state.items.push(item)
        },
        editItem: (state, newItem) => {
            let index = state.items.findIndex(item => item.id == newItem.id)
            state.items.splice(index, 1, newItem)
        }
    },
    actions: {
        getItems: async (context) => {
            let {
                data
            } = await VueAxios.get('items/');
            context.commit('getItems', data);
        },
        deleteItem: async (context, item_id) => {
            await VueAxios.delete(`items/${item_id}`)
            context.commit('deleteItem', item_id)
        },
        addItem: async (context, item) => {
            let {
                data
            } = await VueAxios.post('items/', item)
            context.commit('addItem', data)
        },
        editItem: async (context, item) => {
            let {
                data
            } = await VueAxios.put(`items/${item.id}`, item)
            context.commit('editItem', data)
        }
    },
});
import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'

import createPersistedState from "vuex-persistedstate";
const persist = createPersistedState({
  key: 'zcastles',
  paths: ['map.filters']
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photos: {},
  },
  plugins: [persist],
  mutations: {
    ADD_PHOTOS (state, payload) {
      state.photos = payload.photos
      localStorage.setItem('zcastles-photos', JSON.stringify(payload.photos))
    },
    ADD_PLACE_ID_TO_PHOTO (state, payload) {
      state.photos[payload.photoID].mapPlaces.push(payload.placeID)
    }
  },
  getters: {
    photosReady(state) {
      return Object.keys(state.photos).length > 0
    }
  },
  actions: {
    addPhotos (context, payload) {
      context.commit('ADD_PHOTOS', payload)
    },
    addMapPlaceIDToPhoto (context, payload) {
      context.commit('ADD_PLACE_ID_TO_PHOTO', payload)
    }
  },
  modules: {
    map
  },
  strict: process.env.NODE_ENV !== 'production'
})

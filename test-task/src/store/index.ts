import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Array } from 'typescript'

export interface State {
  page: number,
  totalPages: number,
  limit: number,
  searchQuery: string,
  loading: boolean,
  packages: Array<string>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    page: 1,
    totalPages: 0,
    limit: 10,
    searchQuery: '',
    loading: false,
    packages: [] as Array<any>,
  },
  mutations: {
    setPage(state, page: number) {
      this.state.page = page;
    },

    setPackages({ state, commit }, data: Array<any>) {
      for (let i = 0; i < data.length; i++) {
        data[i].hits = data[i].hits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        data[i].bandwidth = Math.round(parseInt(data[i].bandwidth) * 10 ** -9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }
      this.state.packages = data
    },

    setTotalPages(state, totalPages: number) {
      if (totalPages <= 100) {
        this.state.totalPages = totalPages;
      } else {
        this.state.totalPages = 100;
      }
    },

    setLoading(state, loading: boolean) {
      this.state.loading = loading;
    },

    setSearchQuery(state, searchQuery: string) {
      this.state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPackages({ state, commit }) {
      const url = 'https://data.jsdelivr.com/v1/stats/packages?period=month&by=hits&page=' + this.state.page +'&limit=' + this.state.limit
      commit('setLoading', !this.state.loading)

      try {
        const response = await fetch(url)
        const data = await response.json()

        commit('setTotalPages', Math.ceil(response.headers.get('x-total-count') / this.state.limit));
        commit('setPackages', data)
      } catch (e) {
        console.log(e)
      }

      commit('setLoading', !this.state.loading)
    },
    async fetchSearchingPackages({ state, commit }) {
      const url = 'https://data.jsdelivr.com/v1/stats/packages?period=month&by=hits'
      commit('setLoading', !this.state.loading)

      try {
        const response = await fetch(url)
        const data = await response.json()

        commit('setTotalPages', Math.ceil(response.headers.get('x-total-count') / this.state.limit));
        commit('setPackages', data)
        commit('setPage', 1)
      } catch (e) {
        console.log(e)
      }

      commit('setLoading', !this.state.loading)
    },

  },

  getters: {
    sortedAndSearchedPackages(state, getters) {
      const result = [...state.packages].filter(myPackage => myPackage.name.toLowerCase().includes(state.searchQuery.toLowerCase()));
      if (state.searchQuery !== '') {
        state.totalPages = Math.ceil(result.length / state.limit)
      }
      return result
    },

    paginateSearchedPackages(state, getters) {
      if (state.searchQuery === '') {
        return getters.sortedAndSearchedPackages
      } else {
        return getters.sortedAndSearchedPackages.slice((state.page - 1) * state.limit, state.page * state.limit)
      }
    }
  },
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}

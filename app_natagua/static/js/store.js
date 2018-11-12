/**
 * Created by octavio on 19/12/17.
 */


const store = new Vuex.Store({
    state: {
        loading: false,

    },
    getters: {
        getLoading: state => state.loading,

    },
    mutations: {
        setLoading (state, payload) {
            eval('state.loading = payload.value');
        },
    },
    actions: {
        setLoading({ commit }, payload) {
            commit('setLoading', payload);
        },
        /*getactionApi({commit}, payload) {
            HTTP.get('/user//', {
                params: {
                    's': session_id
                }
            }).then(function(response) {
                commit({
                    type: '',
                    value: valor
                });
            });
        },*/
    },
});

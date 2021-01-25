export default {
    namespaced: true,
    state: () => ({
        isShowLNB: false 
    }),
    mutations: {
        updateState (state, payload) {
            Object.keys(payload).forEach(key => {
                // state.isShowLNB = payload.isShowLNB 
                // 범용으로 함수화 한 것
                state[key] = payload[key];
            })
        }
    },
    actions: {
        onNav ({ commit }) { // isShowLNB => true
            commit('updateState', {
                isShowLNB: true
            })
        },
        offNav ({ commit }) {
            commit('updateState', {
                isShowLNB: false
            })
        }
    }
}
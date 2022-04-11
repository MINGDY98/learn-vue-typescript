import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
// import getters from "./getters.js";
// import mutations from "./mutations.js";
// import actions from "./actions.js";

Vue.use(Vuex);
//만약 mutation에서 mu만 쳤을때 자동완성을 원한다면 store 타입으로
//StoreOptions를 붙여준다. 이 프로젝트에서는 RootState로 제네릭 타입을 넣어주고.
const store: StoreOptions<RootState> = {
  state: state,
  mutations: mutations,
  actions: actions,
};

export default new Vuex.Store(store);

// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== "production",
//   state: {
//     news: [],
//     ask: [],
//     jobs: [],
//     user: {},
//     item: {},
//     list: [],
//   },
//   getters,
//   mutations,
//   actions,
// });

import { NewsItem } from "@/api";
import { RootState } from "./state";

enum MutationTypes {
  SET_NEWS = "SET_NEWS",
}
//enum값을 넣어주어도 자동으로 문자열"SET_NEWS"이라는 것을 후에 알게됨.
const mutations = {
  [MutationTypes.SET_NEWS](state: RootState, news: NewsItem[]) {
    state.news = news;
  },
};
//Vuex 내부에서 Mutation을 쓰기 때문에 Mutations라고 꼭 s를 붙여야함
//이름 다른 걸로 바꿔도 무방 ex MyCustomMutations
type Mutations = typeof mutations;
export { mutations, Mutations };

// export default {
//   SET_NEWS(state, news) {
//     state.news = news;
//   },
//   SET_ASK(state, ask) {
//     state.ask = ask;
//   },
//   SET_JOBS(state, jobs) {
//     state.jobs = jobs;
//   },
//   SET_USER(state, user) {
//     state.user = user;
//   },
//   SET_ITEM(state, item) {
//     state.item = item;
//   },
//   SET_LIST(state, list) {
//     state.list = list;
//   },
// };

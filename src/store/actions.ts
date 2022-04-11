import { ActionContext } from "vuex";
import { fetchNews } from "../api/index";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";

enum ActionTypes {
  FETCH_NEWS = "FETCH_NEWS",
}

//1. action 내장 타입을 가져온다.https://joshua1988.github.io/vue-camp/ts/vuex.html#actions-%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4
//2. Mutations, RootState에 우리가 만든것을 넣어준다.

type MyActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState, RootState>, "commit">;
//3. OMit의 의미는 types에서 했던 것과 동일. 우리가 커스터마이징 하기 위함임.
//한마디로 우리가 정의한 types까지 액션함수안에서 추론되게끔 정의하겠다는 의미.
//4. 만약 모듈화를 진행한다면 Omit<ActionContext<JobState, RootState>, "commit">;로 모듈화된 스테이트가 왼쪽으로감.
//ActionContext를 들어가서 보면 어떻게 모듈화를 해야할지 감이온다고하심.
//5. MyActionContext 연결
//6. fetchNEws()적음으로서 이제 action 함수 정의는 완료. 이제 마우스만 올려도 타입이 보임
//7. type 변수에 담아서 Actions export, 그리고 actions, ActionTypes들도 export
/** 이 모든 활동은 .. actions가 컴포넌트 레벨에서 추론되게끔 하기위한것,
mutation 처럼 store 폴더의 types파일에 추가적 정의를 해주어야함.
*
*/
const actions = {
  async [ActionTypes.FETCH_NEWS](context: MyActionContext, payload?: any) {
    const { data } = await fetchNews();
    context.commit(MutationTypes.SET_NEWS, data);
    return data;
  },
  // FETCH_NEWS(context, payload){
  //   fetchNews();
  // }
};

type Actions = typeof actions;
export { ActionTypes, actions, Actions };
/***
 * 보통 this.$store.dispatch(ActionTypes.FETCH_NEWS);로 두번째 인자는 안들어갈일이 많기에 ?any로 둠.
 */

// import {
//   fetchNews,
//   fetchAsk,
//   fetchJobs,
//   fetchUser,
//   fetchItem,
//   fetchList,
// } from "../api/index";

// export default {
//   FETCH_NEWS({ commit }) {
//     return fetchNews().then((response) => commit("SET_NEWS", response.data));
//   },
//   FETCH_ASK({ commit }) {
//     return fetchAsk().then((response) => commit("SET_ASK", response.data));
//   },
//   FETCH_JOBS({ commit }) {
//     return fetchJobs().then((response) => commit("SET_JOBS", response.data));
//   },
//   FETCH_USER({ commit }, userId) {
//     return fetchUser(userId).then((res) => commit("SET_USER", res.data));
//   },
//   FETCH_ITEM({ commit }, itemId) {
//     return fetchItem(itemId).then((res) => commit("SET_ITEM", res.data));
//   },
//   // hoc
//   FETCH_LIST({ commit }, listType) {
//     return fetchList(listType).then((res) => commit("SET_LIST", res.data));
//   },
// };

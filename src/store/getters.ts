import { RootState } from "./state";

export const getters = {
  fetchedNews(state: RootState) {
    //getters는 store에서, component에서 computed 속성으로 매핑되는데(기능 동일),
    //getters는 타입 정의가 까다로워지기에 되도록 안쓰는 것을 추천.
    return state.news;
  },
};

export type Getters = typeof getters;

// export default {
//   fetchedItem(state) {
//     return state.item;
//   },
//   fetchedUser(state) {
//     return state.user;
//   },
//   fetchedList(state) {
//     return state.list;
//   },
//   // ItemView
//   userName(state) {
//     return state.item.user;
//   },
//   userContent(state) {
//     return state.item.content;
//   },
//   userQuestion(state) {
//     return state.item.title;
//   },
//   userTimeAgo(state) {
//     return state.item.time_ago;
//   },
//   contentPoints(state) {
//     return state.item.points;
//   },
// };

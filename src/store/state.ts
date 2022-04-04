import { NewsItem } from "@/api";

export const state = {
  //news라는 state는 newsItem이라는 객체를 배열로 갖는 타입.
  news: [] as NewsItem[],
};
//state라는 타입을 가져와서 RootState로 쓰겠다.
//state도 index.ts에서 가져오기 때문에 export
export type RootState = typeof state;

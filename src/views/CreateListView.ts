import ListView from "./ListView.vue";
import bus from "../utils/bus";
import { CreateElement } from "vue/types/umd";

export default function createListView(name: string) {
  return {
    name,
    mounted() {
      bus.$emit("off:progress");
    },
    render(h: CreateElement) {
      //h=> render functon을 이용해서 화면에 dom을 그려준다.
      //CreateElement라는 타입을 사용.
      return h(ListView);
    },
  };
}

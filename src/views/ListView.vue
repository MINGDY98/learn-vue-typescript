<template>
  <div>
    <ListItem :items="newsItems"></ListItem>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { fetchNews, NewsItem } from "@/api";
import ListItem from "../components/ListItem.vue";
export default Vue.extend({
  components: {
    ListItem,
  },

  data() {
    return {
      newsItems: [] as NewsItem[],
    };
  },

  //제네릭을 쓰면 타입 코드가 많이 줄어든다. 중복을 줄일 수 있다.
  methods: {
    async fetchNewsItems() {
      const response = await fetchNews();
      console.log(response.data);
      this.newsItems = response.data;
      //Type 'NewsItem[]' is not assignable to type 'never[]'.
      //data에 타입을 추가하니 오류해결.
    },
  },

  created() {
    this.fetchNewsItems();
  },
});
</script>

<style></style>

<template>
  <ul class="news-list">
    <li v-for="news in items" :key="news.id" class="post">
      <div class="points">
        {{ news.points || 0 }}
      </div>
      <div>
        <p class="news-title">
          <template v-if="news.domain">
            <a :href="news.url">{{ news.title }}</a
            ><small class="link-text" v-if="news.domain"
              >({{ news.domain }})</small
            >
          </template>
          <template v-else>
            <router-link :to="`/item/${news.id}`">{{ news.title }}</router-link
            ><small
              ><a class="link-text" :href="news.domain" v-if="news.domain"
                >({{ news.domain }})</a
              ></small
            >
          </template>
        </p>
        <small v-if="news.user" class="link-text">
          by
          <router-link :to="`/user/${news.user}`" class="link-text">{{
            news.user
          }}</router-link>
        </small>
        <small v-if="news.time_ago" class="link-text">
          {{ timeAgo(news) }}
        </small>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { NewsItem } from "@/api";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<NewsItem[]>,
      required: true,
    },
  },

  methods: {
    timeAgo(news: NewsItem): string {
      //파라메터를 받기 위해 computed에 선언했다가 옮김
      return news.time_ago.concat(". 2022");
    },
  },

  computed: {
    // listItems(): any{
    //   return this.$store.getters.fetchedList;
    // },
    // timeAgo(): string {
    //   //computed로 옮겨쓰면, 디버그가 쉬움.
    //   return this.items[0].time_ago.concat();
    // },
  },
});
</script>

<style scoped>
.news-list {
  padding: 0;
  margin: 0;
}
.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.points {
  width: 80px;
  height: 60px;
  color: #42b883;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-text {
  color: #828282;
}
.news-title {
  margin: 0;
}
</style>

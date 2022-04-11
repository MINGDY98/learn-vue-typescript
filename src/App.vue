<template>
  <div id="app">
    <spinner :loading="loading"></spinner>
    <tool-bar></tool-bar>
    <transition name="routing-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ToolBar from "./components/ToolBar.vue";
import Spinner from "./components/Spinner.vue";
import bus from "./utils/bus";
import { MutationTypes } from "./store/mutations";
import { ActionTypes } from "./store/actions";
export default Vue.extend({
  components: {
    ToolBar,
    Spinner,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onProgress() {
      this.loading = true;
    },
    offProgress() {
      this.loading = false;
    },
  },
  async created() {
    //this.$store.state;
    this.$store.commit(MutationTypes.SET_NEWS, 10);
    const response = await this.$store.dispatch(ActionTypes.FETCH_NEWS);
    //response가 void로 뜬다? 왜 그러지? 그 이유는 dispatch의 반환타입이 Promise<void>
    /**
     * FETCH_NEWS의 반환타입이
     * dispatch했을대 return을 안해서임.
     * 기본적으로 async await했을대 return안하게되면 Promise가 옴.
     * Promise속 resolve된 상태로 오려면 .. return을 해줘야하는데.
     * actions.ts에 
     * const actions = {
        async [ActionTypes.FETCH_NEWS](context: MyActionContext, payload?: any) {
          const { data } = await fetchNews();
          context.commit(MutationTypes.SET_NEWS, data);
          return data;
        },
      };
      return을 넣으면 NesItem[]으로 추론이 잘되게됨
     *
     */
    bus.$on("on:progress", this.onProgress);
    bus.$on("off:progress", this.offProgress);
  },
});
</script>

<style>
body {
  margin: 0;
}

a {
  color: #34495e;
  text-decoration: none;
}
a:hover {
  color: #42b883;
  text-decoration: underline;
}
a.router-link-active {
  text-decoration: underline;
}

/* Router Transition */
.routing-fade-enter-active,
.routing-fade-leave-active {
  transition: opacity 0.3s ease;
}
.routing-fade-enter, .routing-fade-leave-to
/* .routing-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

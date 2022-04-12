// store/types.ts
import { CommitOptions, DispatchOptions, Store } from "vuex";
import { Actions } from "./actions";
import { Getters } from "./getters";
import { Mutations } from "./mutations";
import { RootState } from "./state";

//정의한 mutation코드의 타입들이 컴포넌트레벨에서 잘 추론될 수 있도록 작성하는 매개코드
type MyMutations = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};
//Actions(19번째줄)와 DispatchopOptions(20번째줄)는
// 스토어 내부적으로 있는 타입.ctrl+space로 가져오기
type MyActions = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

//type A = keyof Getters;
type MyGetters = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
//mapped타입패턴의 사용.
//keyof getters.ts속 타입들을 반복해서 돌리는 것임.
//그렇게해서key를 뽑아낸 다음. key에 해당하는 속성함수의 반환타입을
//key value형태로 뽑고, 그 key에 해당하는 반환타입을 매칭해주는 것임.
//속성함수 이름이 왼쪽으로 들어오고, 오른쪽은 해당 속성함수의 반환타입 - 컴포넌트 레벨에서fetchedNews를 했을때 타입이 정해짐.

export type MyStore = Omit<
  Store<RootState>,
  "commit" | "dispatch" | "getters"
> &
  MyMutations &
  MyActions &
  MyGetters;

/***
 * MyMutations은 별다른게 아니라, 기존 store스펙에서
 * 내가 정의한 3번째줄에서 임포트해오는 Mutations 를 가져와서 쓰는게 다른 것.
 * MyMutations을 보면, 제네릭을 두개받는데
 * 첫번재는 Mutations의 키를 받는거고,
 * 두번째는 Mutations라는 것의 키를 앞에서 받아서 키의 [1]페이로드를 가져오겠다
 * 이런 부분.
 * 예를 들어..
 * commit(MuationTypes.SET_NEWS)
 * SET_NEWS의 키값에 따라, 두번째 파라미터의 타입이 추론되는것임.
 *
 */
//Omit은 특정 키만 빼고 나머지를 다 갖겠다고 하는 것
/*
const person = {
  name: "a",
  age: 10,
  skill: "js",
};
const josh = Omit<person, 'skill'>
josh = {
  name:'a',
  age:10,
}

 Omit<Store<RootState>, "commit">
 은 Store에서 commit만 빼겠다는것
 왜 이럼?
 commit에 대해 프로젝트 레벨에 대해 재정의하는 것.
 store에다가 현재 vuex의 mutations타입만 따로 갈아껴주는 것(내가 정의한 걸로.).
 결론적으로 MyStore을 다른 데서 사용하면 타입을 추론할 수 있게됨.
*/

//&는 INTERCEPTION
/*
type A = {
  name: string;
};
type B = {
  age: number;
};
type C = A & B;
const person: C = {
  name: "a",
  age: 10,
};
*/
//A와B둘다 합친 타입 쓰고 싶을 때 하는 게 interception
//https://joshua1988.github.io/vue-camp/ts/vuex.html#mutations-%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4
//참고

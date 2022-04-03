import axios, { AxiosInstance } from "axios";
import { setRequestOptions, setResponseOptions } from "./intercepter.js";

const APP_BASE_URI = "https://api.hnpwa.com/v0/";
const options = {};

function create(url: string, options = {}): AxiosInstance {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  return instance;
}

function createWithAuth(url: string, options = {}): AxiosInstance {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  setRequestOptions(instance);
  setResponseOptions(instance);
  return instance;
}

const news = create(`${APP_BASE_URI}news/`);
const user = createWithAuth(`${APP_BASE_URI}user/`, options);

export { news, user };

//url->string 타입 정의
//현재 create, createWithAuth의 반환 타입은 자동추론이 잘 되고있는 상태.
//그럼에도 지금은 학습중이니 직접 코드로 작성해주기.
//axios는 지금 type 파일을 별도로 제공을 해주기 때문에 npm i @types/axios -D를 안해줘도되는데
//몇개의 라이브러리는 별도로 설치해주어야한다고함.

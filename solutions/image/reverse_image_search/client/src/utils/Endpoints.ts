declare global {
    interface Window {
        _env_: any;
    }
}

// let endpoint = `http://172.16.20.10:5000`;
let endpoint = `http://node01:5000`;
if (window._env_ && window._env_.API_URL) {
    endpoint = window._env_.API_URL;
}

// 这个地方只是定义全局变量后续方便作为url使用
export const Train = `${endpoint}/img/load`;
export const Processing = `${endpoint}/progress`;
export const Count = `${endpoint}/img/count`;
export const ClearAll = `${endpoint}/img/drop`;
export const Search = `${endpoint}/img/search`;
export const GetImageUrl = `${endpoint}/data`;

// export const GetImageConnectInfo = `http://localhost:8081/azbi-data/front/getImageInfos`;
export const GetImageConnectInfo = `https://bi.gaoyaya.com/azbi-data/front/getImageInfos`;

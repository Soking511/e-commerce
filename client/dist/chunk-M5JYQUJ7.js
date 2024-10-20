import{a as $,l as a,m as f,n as l}from"./browser/chunk-7J3AGQJV.js";import{A as p,S as u,X as o,o as i}from"./chunk-TXHN3XOK.js";var m=class n{constructor(e,t,r){this._GlobalService=e;this._AuthService=t;this._Http=r;this.baseURL=e.baseURL,this.version=e.version,this.apiKey=e.apiKey}baseURL="";version="";apiKey="";get(e,t,r,c){r&&this._AuthService.checkToken();let h={"X-API-KEY":this.apiKey};return r&&(h.authorization=`Bearer ${localStorage.getItem("user")}`),this._Http.get(`${this.baseURL}${this.version}/${e}${t?"?limit="+t:""}${t||!c?"":"?"}${c||""}`,{headers:h,withCredentials:!0}).pipe(p(s=>s.status===0?i("Connection error"):s.status>=400&&s.status<500?i("Client error"):s.status>=500?i("Server error"):i("error")))}fetch=e=>this._Http.get(e);update(e,t,r){return this._AuthService.checkToken(),this._Http.put(`${this.baseURL}${this.version}/${e}${r?`/${r}`:""}`,t,{headers:{authorization:`Bearer ${localStorage.getItem("user")}`,"X-API-KEY":`${this.apiKey}`,"X-CSRF-Token":`${a.get("cookies")}`},withCredentials:!0})}post(e,t,r=""){return this._AuthService.checkToken(),this._Http.post(`${this.baseURL}${this.version}/${e}${r?`/${r}`:""}`,t,{headers:{authorization:`Bearer ${localStorage.getItem("user")}`,"X-API-KEY":`${this.apiKey}`,"X-CSRF-Token":`${a.get("cookies")}`},withCredentials:!0})}delete(e,t){return this._AuthService.checkToken(),this._Http.delete(`${this.baseURL}${this.version}/${e}${t?`/${t}`:""}`,{headers:{authorization:`Bearer ${localStorage.getItem("user")}`,"X-API-KEY":`${this.apiKey}`,"X-CSRF-Token":`${a.get("cookies")}`},withCredentials:!0})}static \u0275fac=function(t){return new(t||n)(o(f),o(l),o($))};static \u0275prov=u({token:n,factory:n.\u0275fac,providedIn:"root"})};export{m as a};

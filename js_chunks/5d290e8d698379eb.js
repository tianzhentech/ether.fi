;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="e23cd195-7ed6-81f7-5a9a-e82679da29e0")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,426570,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var o=e.i(585408);e.i(783601);var i=e.i(525559);e.i(992074),e.i(430210),e.i(67356);var n=e.i(134036),a=e.i(39050),l=t;e.i(417203);var s=e.i(624851);let c=s.css`
  :host {
    position: relative;
    border-radius: ${({borderRadius:e})=>e[2]};
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[1]};
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }
`;var d=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let p=class extends l.LitElement{constructor(){super(...arguments),this.walletImages=[]}render(){let e=this.walletImages.length<4;return r.html`${this.walletImages.slice(0,4).map(({src:e,walletName:t})=>r.html`
          <wui-wallet-image
            size="sm"
            imageSrc=${e}
            name=${(0,i.ifDefined)(t)}
          ></wui-wallet-image>
        `)}
    ${e?[...Array(4-this.walletImages.length)].map(()=>r.html` <wui-wallet-image size="sm" name=""></wui-wallet-image>`):null} `}};p.styles=[n.resetStyles,c],d([(0,o.property)({type:Array})],p.prototype,"walletImages",void 0),p=d([(0,a.customElement)("wui-all-wallets-image")],p),e.i(648812);let u=s.css`
  :host {
    width: 100%;
  }

  button {
    column-gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button > wui-wallet-image {
    background: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:hover:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-all-wallets='true'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-all-wallets='true']:hover:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: ${({tokens:e})=>e.core.glass010};
    color: ${({tokens:e})=>e.theme.foregroundTertiary};
  }

  wui-flex.namespace-icon {
    width: 16px;
    height: 16px;
    border-radius: ${({borderRadius:e})=>e.round};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.theme.backgroundPrimary};
    transition: box-shadow var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2);
  }

  button:hover:enabled wui-flex.namespace-icon {
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-flex.namespace-icon > wui-icon {
    width: 10px;
    height: 10px;
  }

  wui-flex.namespace-icon:not(:first-child) {
    margin-left: -4px;
  }
`;var h=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let m={eip155:"ethereum",solana:"solana",bip122:"bitcoin",polkadot:void 0,cosmos:void 0,sui:void 0,stacks:void 0,ton:"ton",tron:"tron"},w=class extends t.LitElement{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.namespaces=[],this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return this.dataset.size=this.size,r.html`
      <button
        ?disabled=${this.disabled}
        data-all-wallets=${this.showAllWallets}
        tabindex=${(0,i.ifDefined)(this.tabIdx)}
      >
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-flex flexDirection="column" justifyContent="center" alignItems="flex-start" gap="1">
          <wui-text variant="lg-regular" color="inherit">${this.name}</wui-text>
          ${this.templateNamespaces()}
        </wui-flex>
        ${this.templateStatus()}
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `}templateNamespaces(){return this.namespaces?.length?r.html`<wui-flex alignItems="center" gap="0">
        ${this.namespaces.map((e,t)=>r.html`<wui-flex
              alignItems="center"
              justifyContent="center"
              zIndex=${(this.namespaces?.length??0)*2-t}
              class="namespace-icon"
            >
              <wui-icon
                name=${(0,i.ifDefined)(m[e])}
                size="sm"
                color="default"
              ></wui-icon>
            </wui-flex>`)}
      </wui-flex>`:null}templateAllWallets(){return this.showAllWallets&&this.imageSrc?r.html` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?r.html` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?r.html`<wui-wallet-image
        size=${(0,i.ifDefined)("sm"===this.size?"sm":"md")}
        imageSrc=${this.imageSrc}
        name=${this.name}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:r.html`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?r.html`<wui-loading-spinner size="lg" color="accent-primary"></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?r.html`<wui-tag size="sm" variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:null}};w.styles=[n.resetStyles,n.elementStyles,u],h([(0,o.property)({type:Array})],w.prototype,"walletImages",void 0),h([(0,o.property)()],w.prototype,"imageSrc",void 0),h([(0,o.property)()],w.prototype,"name",void 0),h([(0,o.property)()],w.prototype,"size",void 0),h([(0,o.property)()],w.prototype,"tagLabel",void 0),h([(0,o.property)()],w.prototype,"tagVariant",void 0),h([(0,o.property)()],w.prototype,"walletIcon",void 0),h([(0,o.property)()],w.prototype,"tabIdx",void 0),h([(0,o.property)({type:Array})],w.prototype,"namespaces",void 0),h([(0,o.property)({type:Boolean})],w.prototype,"disabled",void 0),h([(0,o.property)({type:Boolean})],w.prototype,"showAllWallets",void 0),h([(0,o.property)({type:Boolean})],w.prototype,"loading",void 0),h([(0,o.property)({type:String})],w.prototype,"loadingSpinnerColor",void 0),w=h([(0,a.customElement)("wui-list-wallet")],w),e.s([],426570)},492718,e=>{"use strict";var t=e.i(851455),r=e.i(254729),o=e.i(887121);class i extends r.BaseError{constructor({body:e,cause:r,details:i,headers:n,status:a,url:l}){super("HTTP request failed.",{cause:r,details:i,metaMessages:[a&&`Status: ${a}`,`URL: ${(0,o.getUrl)(l)}`,e&&`Request body: ${(0,t.stringify)(e)}`].filter(Boolean),name:"HttpRequestError"}),Object.defineProperty(this,"body",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"headers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"status",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.body=e,this.headers=n,this.status=a,this.url=l}}class n extends r.BaseError{constructor({body:e,cause:r,details:i,url:n}){super("WebSocket request failed.",{cause:r,details:i,metaMessages:[`URL: ${(0,o.getUrl)(n)}`,e&&`Request body: ${(0,t.stringify)(e)}`].filter(Boolean),name:"WebSocketRequestError"}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.url=n}}class a extends r.BaseError{constructor({body:e,error:r,url:i}){super("RPC Request failed.",{cause:r,details:r.message,metaMessages:[`URL: ${(0,o.getUrl)(i)}`,`Request body: ${(0,t.stringify)(e)}`],name:"RpcRequestError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.code=r.code,this.data=r.data,this.url=i}}class l extends r.BaseError{constructor({url:e}={}){super("The socket has been closed.",{metaMessages:[e&&`URL: ${(0,o.getUrl)(e)}`].filter(Boolean),name:"SocketClosedError"}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.url=e}}class s extends r.BaseError{constructor({body:e,url:r}){super("The request took too long to respond.",{details:"The request timed out.",metaMessages:[`URL: ${(0,o.getUrl)(r)}`,`Request body: ${(0,t.stringify)(e)}`],name:"TimeoutError"}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.url=r}}e.s(["HttpRequestError",()=>i,"RpcRequestError",()=>a,"SocketClosedError",()=>l,"TimeoutError",()=>s,"WebSocketRequestError",()=>n])},98513,152314,e=>{"use strict";function t(){let e=()=>void 0,t=()=>void 0;return{promise:new Promise((r,o)=>{e=r,t=o}),resolve:e,reject:t}}e.s(["withResolvers",()=>t],152314);let r=new Map;function o({fn:e,id:o,shouldSplitBatch:i,wait:n=0,sort:a}){let l=async()=>{let t=c();s();let r=t.map(({args:e})=>e);0!==r.length&&e(r).then(e=>{a&&Array.isArray(e)&&e.sort(a);for(let r=0;r<t.length;r++){let{resolve:o}=t[r];o?.([e[r],e])}}).catch(e=>{for(let r=0;r<t.length;r++){let{reject:o}=t[r];o?.(e)}})},s=()=>r.delete(o),c=()=>r.get(o)||[],d=e=>r.set(o,[...c(),e]);return{flush:s,async schedule(e){let{promise:r,resolve:o,reject:a}=t();return(i?.([...c().map(({args:e})=>e),e])&&l(),c().length>0)?d({args:e,resolve:o,reject:a}):(d({args:e,resolve:o,reject:a}),setTimeout(l,n)),r}}}e.s(["createBatchScheduler",()=>o],98513)},693854,e=>{"use strict";function t(e,{errorInstance:t=Error("timed out"),timeout:r,signal:o}){return new Promise((i,n)=>{(async()=>{let a;try{let l=new AbortController;r>0&&(a=setTimeout(()=>{o?l.abort():n(t)},r)),i(await e({signal:l?.signal||null}))}catch(e){e?.name==="AbortError"&&n(t),n(e)}finally{clearTimeout(a)}})()})}e.s(["withTimeout",()=>t])},368077,871305,e=>{"use strict";var t=e.i(492718),r=e.i(693854),o=e.i(851455);let i={current:0,take(){return this.current++},reset(){this.current=0}};function n(e,a={}){let{url:l,headers:s}=function(e){try{let t=new URL(e),r=(()=>{if(t.username){let e=`${decodeURIComponent(t.username)}:${decodeURIComponent(t.password)}`;return t.username="",t.password="",{url:t.toString(),headers:{Authorization:`Basic ${btoa(e)}`}}}})();return{url:t.toString(),...r}}catch{return{url:e}}}(e);return{async request(e){let{body:n,fetchFn:c=a.fetchFn??fetch,onRequest:d=a.onRequest,onResponse:p=a.onResponse,timeout:u=a.timeout??1e4}=e,h={...a.fetchOptions??{},...e.fetchOptions??{}},{headers:m,method:w,signal:b}=h;try{let e,a=await (0,r.withTimeout)(async({signal:e})=>{let t={...h,body:Array.isArray(n)?(0,o.stringify)(n.map(e=>({jsonrpc:"2.0",id:e.id??i.take(),...e}))):(0,o.stringify)({jsonrpc:"2.0",id:n.id??i.take(),...n}),headers:{...s,"Content-Type":"application/json",...m},method:w||"POST",signal:b||(u>0?e:null)},r=new Request(l,t),a=await d?.(r,t)??{...t,url:l};return await c(a.url??l,a)},{errorInstance:new t.TimeoutError({body:n,url:l}),timeout:u,signal:!0});if(p&&await p(a),a.headers.get("Content-Type")?.startsWith("application/json"))e=await a.json();else{e=await a.text();try{e=JSON.parse(e||"{}")}catch(t){if(a.ok)throw t;e={error:e}}}if(!a.ok)throw new t.HttpRequestError({body:n,details:(0,o.stringify)(e.error)||a.statusText,headers:a.headers,status:a.status,url:l});return e}catch(e){if(e instanceof t.HttpRequestError||e instanceof t.TimeoutError)throw e;throw new t.HttpRequestError({body:n,cause:e,url:l})}}}}e.s(["idCache",0,i],871305),e.s(["getHttpRpcClient",()=>n],368077)},478661,e=>{"use strict";var t=e.i(254729),r=e.i(492718);class o extends t.BaseError{constructor(e,{code:t,docsPath:o,metaMessages:i,name:n,shortMessage:a}){super(a,{cause:e,docsPath:o,metaMessages:i||e?.metaMessages,name:n||"RpcError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name=n||e.name,this.code=e instanceof r.RpcRequestError?e.code:t??-1}}class i extends o{constructor(e,t){super(e,t),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=t.data}}class n extends o{constructor(e){super(e,{code:n.code,name:"ParseRpcError",shortMessage:"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."})}}Object.defineProperty(n,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32700});class a extends o{constructor(e){super(e,{code:a.code,name:"InvalidRequestRpcError",shortMessage:"JSON is not a valid request object."})}}Object.defineProperty(a,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32600});class l extends o{constructor(e,{method:t}={}){super(e,{code:l.code,name:"MethodNotFoundRpcError",shortMessage:`The method${t?` "${t}"`:""} does not exist / is not available.`})}}Object.defineProperty(l,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32601});class s extends o{constructor(e){super(e,{code:s.code,name:"InvalidParamsRpcError",shortMessage:"Invalid parameters were provided to the RPC method.\nDouble check you have provided the correct parameters."})}}Object.defineProperty(s,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32602});class c extends o{constructor(e){super(e,{code:c.code,name:"InternalRpcError",shortMessage:"An internal error was received."})}}Object.defineProperty(c,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32603});class d extends o{constructor(e){super(e,{code:d.code,name:"InvalidInputRpcError",shortMessage:"Missing or invalid parameters.\nDouble check you have provided the correct parameters."})}}Object.defineProperty(d,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32e3});class p extends o{constructor(e){super(e,{code:p.code,name:"ResourceNotFoundRpcError",shortMessage:"Requested resource not found."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ResourceNotFoundRpcError"})}}Object.defineProperty(p,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32001});class u extends o{constructor(e){super(e,{code:u.code,name:"ResourceUnavailableRpcError",shortMessage:"Requested resource not available."})}}Object.defineProperty(u,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32002});class h extends o{constructor(e){super(e,{code:h.code,name:"TransactionRejectedRpcError",shortMessage:"Transaction creation failed."})}}Object.defineProperty(h,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32003});class m extends o{constructor(e,{method:t}={}){super(e,{code:m.code,name:"MethodNotSupportedRpcError",shortMessage:`Method${t?` "${t}"`:""} is not supported.`})}}Object.defineProperty(m,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32004});class w extends o{constructor(e){super(e,{code:w.code,name:"LimitExceededRpcError",shortMessage:"Request exceeds defined limit."})}}Object.defineProperty(w,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32005});class b extends o{constructor(e){super(e,{code:b.code,name:"JsonRpcVersionUnsupportedError",shortMessage:"Version of JSON-RPC protocol is not supported."})}}Object.defineProperty(b,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32006});class f extends i{constructor(e){super(e,{code:f.code,name:"UserRejectedRequestError",shortMessage:"User rejected the request."})}}Object.defineProperty(f,"code",{enumerable:!0,configurable:!0,writable:!0,value:4001});class g extends i{constructor(e){super(e,{code:g.code,name:"UnauthorizedProviderError",shortMessage:"The requested method and/or account has not been authorized by the user."})}}Object.defineProperty(g,"code",{enumerable:!0,configurable:!0,writable:!0,value:4100});class y extends i{constructor(e,{method:t}={}){super(e,{code:y.code,name:"UnsupportedProviderMethodError",shortMessage:`The Provider does not support the requested method${t?` " ${t}"`:""}.`})}}Object.defineProperty(y,"code",{enumerable:!0,configurable:!0,writable:!0,value:4200});class C extends i{constructor(e){super(e,{code:C.code,name:"ProviderDisconnectedError",shortMessage:"The Provider is disconnected from all chains."})}}Object.defineProperty(C,"code",{enumerable:!0,configurable:!0,writable:!0,value:4900});class v extends i{constructor(e){super(e,{code:v.code,name:"ChainDisconnectedError",shortMessage:"The Provider is not connected to the requested chain."})}}Object.defineProperty(v,"code",{enumerable:!0,configurable:!0,writable:!0,value:4901});class E extends i{constructor(e){super(e,{code:E.code,name:"SwitchChainError",shortMessage:"An error occurred when attempting to switch chain."})}}Object.defineProperty(E,"code",{enumerable:!0,configurable:!0,writable:!0,value:4902});class R extends i{constructor(e){super(e,{code:R.code,name:"UnsupportedNonOptionalCapabilityError",shortMessage:"This Wallet does not support a capability that was not marked as optional."})}}Object.defineProperty(R,"code",{enumerable:!0,configurable:!0,writable:!0,value:5700});class x extends i{constructor(e){super(e,{code:x.code,name:"UnsupportedChainIdError",shortMessage:"This Wallet does not support the requested chain ID."})}}Object.defineProperty(x,"code",{enumerable:!0,configurable:!0,writable:!0,value:5710});class $ extends i{constructor(e){super(e,{code:$.code,name:"DuplicateIdError",shortMessage:"There is already a bundle submitted with this ID."})}}Object.defineProperty($,"code",{enumerable:!0,configurable:!0,writable:!0,value:5720});class O extends i{constructor(e){super(e,{code:O.code,name:"UnknownBundleIdError",shortMessage:"This bundle id is unknown / has not been submitted"})}}Object.defineProperty(O,"code",{enumerable:!0,configurable:!0,writable:!0,value:5730});class k extends i{constructor(e){super(e,{code:k.code,name:"BundleTooLargeError",shortMessage:"The call bundle is too large for the Wallet to process."})}}Object.defineProperty(k,"code",{enumerable:!0,configurable:!0,writable:!0,value:5740});class T extends i{constructor(e){super(e,{code:T.code,name:"AtomicReadyWalletRejectedUpgradeError",shortMessage:"The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."})}}Object.defineProperty(T,"code",{enumerable:!0,configurable:!0,writable:!0,value:5750});class U extends i{constructor(e){super(e,{code:U.code,name:"AtomicityNotSupportedError",shortMessage:"The wallet does not support atomic execution but the request requires it."})}}Object.defineProperty(U,"code",{enumerable:!0,configurable:!0,writable:!0,value:5760});class S extends o{constructor(e){super(e,{name:"UnknownRpcError",shortMessage:"An unknown RPC error occurred."})}}e.s(["AtomicReadyWalletRejectedUpgradeError",()=>T,"AtomicityNotSupportedError",()=>U,"BundleTooLargeError",()=>k,"ChainDisconnectedError",()=>v,"DuplicateIdError",()=>$,"InternalRpcError",()=>c,"InvalidInputRpcError",()=>d,"InvalidParamsRpcError",()=>s,"InvalidRequestRpcError",()=>a,"JsonRpcVersionUnsupportedError",()=>b,"LimitExceededRpcError",()=>w,"MethodNotFoundRpcError",()=>l,"MethodNotSupportedRpcError",()=>m,"ParseRpcError",()=>n,"ProviderDisconnectedError",()=>C,"ProviderRpcError",()=>i,"ResourceNotFoundRpcError",()=>p,"ResourceUnavailableRpcError",()=>u,"RpcError",()=>o,"SwitchChainError",()=>E,"TransactionRejectedRpcError",()=>h,"UnauthorizedProviderError",()=>g,"UnknownBundleIdError",()=>O,"UnknownRpcError",()=>S,"UnsupportedChainIdError",()=>x,"UnsupportedNonOptionalCapabilityError",()=>R,"UnsupportedProviderMethodError",()=>y,"UserRejectedRequestError",()=>f])},215560,e=>{"use strict";let t=new(e.i(284946)).LruMap(8192);function r(e,{enabled:r=!0,id:o}){if(!r||!o)return e();if(t.get(o))return t.get(o);let i=e().finally(()=>t.delete(o));return t.set(o,i),i}e.s(["withDedupe",()=>r])},926737,e=>{"use strict";async function t(e){return new Promise(t=>setTimeout(t,e))}e.s(["wait",()=>t])},670650,e=>{"use strict";var t=e.i(926737);function r(e,{delay:o=100,retryCount:i=2,shouldRetry:n=()=>!0}={}){return new Promise((r,a)=>{let l=async({count:s=0}={})=>{let c=async({error:e})=>{let r="function"==typeof o?o({count:s,error:e}):o;r&&await (0,t.wait)(r),l({count:s+1})};try{let t=await e();r(t)}catch(e){if(s<i&&await n({count:s,error:e}))return c({error:e});a(e)}};l()})}e.s(["withRetry",()=>r])},973355,e=>{"use strict";var t=e.i(254729),r=e.i(492718),o=e.i(478661),i=e.i(412626),n=e.i(215560),a=e.i(670650),l=e.i(851455);function s(e,c={}){return async(s,d={})=>{let{dedupe:p=!1,methods:u,retryDelay:h=150,retryCount:m=3,uid:w}={...c,...d},{method:b}=s;if(u?.exclude?.includes(b)||u?.include&&!u.include.includes(b))throw new o.MethodNotSupportedRpcError(Error("method not supported"),{method:b});let f=p?(0,i.stringToHex)(`${w}.${(0,l.stringify)(s)}`):void 0;return(0,n.withDedupe)(()=>(0,a.withRetry)(async()=>{try{return await e(s)}catch(e){switch(e.code){case o.ParseRpcError.code:throw new o.ParseRpcError(e);case o.InvalidRequestRpcError.code:throw new o.InvalidRequestRpcError(e);case o.MethodNotFoundRpcError.code:throw new o.MethodNotFoundRpcError(e,{method:s.method});case o.InvalidParamsRpcError.code:throw new o.InvalidParamsRpcError(e);case o.InternalRpcError.code:throw new o.InternalRpcError(e);case o.InvalidInputRpcError.code:throw new o.InvalidInputRpcError(e);case o.ResourceNotFoundRpcError.code:throw new o.ResourceNotFoundRpcError(e);case o.ResourceUnavailableRpcError.code:throw new o.ResourceUnavailableRpcError(e);case o.TransactionRejectedRpcError.code:throw new o.TransactionRejectedRpcError(e);case o.MethodNotSupportedRpcError.code:throw new o.MethodNotSupportedRpcError(e,{method:s.method});case o.LimitExceededRpcError.code:throw new o.LimitExceededRpcError(e);case o.JsonRpcVersionUnsupportedError.code:throw new o.JsonRpcVersionUnsupportedError(e);case o.UserRejectedRequestError.code:throw new o.UserRejectedRequestError(e);case o.UnauthorizedProviderError.code:throw new o.UnauthorizedProviderError(e);case o.UnsupportedProviderMethodError.code:throw new o.UnsupportedProviderMethodError(e);case o.ProviderDisconnectedError.code:throw new o.ProviderDisconnectedError(e);case o.ChainDisconnectedError.code:throw new o.ChainDisconnectedError(e);case o.SwitchChainError.code:throw new o.SwitchChainError(e);case o.UnsupportedNonOptionalCapabilityError.code:throw new o.UnsupportedNonOptionalCapabilityError(e);case o.UnsupportedChainIdError.code:throw new o.UnsupportedChainIdError(e);case o.DuplicateIdError.code:throw new o.DuplicateIdError(e);case o.UnknownBundleIdError.code:throw new o.UnknownBundleIdError(e);case o.BundleTooLargeError.code:throw new o.BundleTooLargeError(e);case o.AtomicReadyWalletRejectedUpgradeError.code:throw new o.AtomicReadyWalletRejectedUpgradeError(e);case o.AtomicityNotSupportedError.code:throw new o.AtomicityNotSupportedError(e);case 5e3:throw new o.UserRejectedRequestError(e);default:if(e instanceof t.BaseError)throw e;throw new o.UnknownRpcError(e)}}},{delay:({count:e,error:t})=>{if(t&&t instanceof r.HttpRequestError){let e=t?.headers?.get("Retry-After");if(e?.match(/\d/))return 1e3*Number.parseInt(e,10)}return~~(1<<e)*h},retryCount:m,shouldRetry:({error:e})=>{var t;return"code"in(t=e)&&"number"==typeof t.code?-1===t.code||t.code===o.LimitExceededRpcError.code||t.code===o.InternalRpcError.code:!(t instanceof r.HttpRequestError)||!t.status||403===t.status||408===t.status||413===t.status||429===t.status||500===t.status||502===t.status||503===t.status||504===t.status||!1}}),{enabled:p,id:f})}}e.s(["buildRequest",()=>s])},308834,e=>{"use strict";let t,r=256;function o(e=11){if(!t||r+e>512){t="",r=0;for(let e=0;e<256;e++)t+=(256+256*Math.random()|0).toString(16).substring(1)}return t.substring(r,r+++e)}e.s(["uid",()=>o])},653752,e=>{"use strict";var t=e.i(973355),r=e.i(308834);function o({key:e,methods:o,name:i,request:n,retryCount:a=3,retryDelay:l=150,timeout:s,type:c},d){let p=(0,r.uid)();return{config:{key:e,methods:o,name:i,request:n,retryCount:a,retryDelay:l,timeout:s,type:c},request:(0,t.buildRequest)(n,{methods:o,retryCount:a,retryDelay:l,uid:p}),value:d}}e.s(["createTransport",()=>o])},24446,778383,e=>{"use strict";var t=e.i(492718),r=e.i(254729);class o extends r.BaseError{constructor(){super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",{docsPath:"/docs/clients/intro",name:"UrlRequiredError"})}}e.s(["UrlRequiredError",()=>o],778383);var i=e.i(98513),n=e.i(368077),a=e.i(653752);function l(e,r={}){let{batch:s,fetchFn:c,fetchOptions:d,key:p="http",methods:u,name:h="HTTP JSON-RPC",onFetchRequest:m,onFetchResponse:w,retryDelay:b,raw:f}=r;return({chain:l,retryCount:g,timeout:y})=>{let{batchSize:C=1e3,wait:v=0}="object"==typeof s?s:{},E=r.retryCount??g,R=y??r.timeout??1e4,x=e||l?.rpcUrls.default.http[0];if(!x)throw new o;let $=(0,n.getHttpRpcClient)(x,{fetchFn:c,fetchOptions:d,onRequest:m,onResponse:w,timeout:R});return(0,a.createTransport)({key:p,methods:u,name:h,async request({method:e,params:r}){let o={method:e,params:r},{schedule:n}=(0,i.createBatchScheduler)({id:x,wait:v,shouldSplitBatch:e=>e.length>C,fn:e=>$.request({body:e}),sort:(e,t)=>e.id-t.id}),a=async e=>s?n(e):[await $.request({body:e})],[{error:l,result:c}]=await a(o);if(f)return{error:l,result:c};if(l)throw new t.RpcRequestError({body:o,error:l,url:x});return c},retryCount:E,retryDelay:b,timeout:R,type:"http"},{fetchOptions:d,url:x})}}e.s(["http",()=>l],24446)},400454,e=>{"use strict";var t=e.i(615147),r=e.i(478661),o=e.i(926737),i=e.i(653752);function n(e,t={}){let{key:r="fallback",name:l="Fallback",rank:s=!1,shouldThrow:c=a,retryCount:d,retryDelay:p}=t;return({chain:t,pollingInterval:n=4e3,timeout:a,...u})=>{let h=e,m=()=>{},w=(0,i.createTransport)({key:r,name:l,async request({method:e,params:r}){let o,i=async(n=0)=>{let l=h[n]({...u,chain:t,retryCount:0,timeout:a});try{let t=await l.request({method:e,params:r});return m({method:e,params:r,response:t,transport:l,status:"success"}),t}catch(a){if(m({error:a,method:e,params:r,transport:l,status:"error"}),c(a)||n===h.length-1||!(o??=h.slice(n+1).some(r=>{let{include:o,exclude:i}=r({chain:t}).config.methods||{};return o?o.includes(e):!i||!i.includes(e)})))throw a;return i(n+1)}};return i()},retryCount:d,retryDelay:p,type:"fallback"},{onResponse:e=>m=e,transports:h.map(e=>e({chain:t,retryCount:0}))});if(s){let e="object"==typeof s?s:{};!function({chain:e,interval:t=4e3,onTransports:r,ping:i,sampleCount:n=10,timeout:a=1e3,transports:l,weights:s={}}){let{stability:c=.7,latency:d=.3}=s,p=[],u=async()=>{let s=await Promise.all(l.map(async t=>{let r,o,n=t({chain:e,retryCount:0,timeout:a}),l=Date.now();try{await (i?i({transport:n}):n.request({method:"net_listening"})),o=1}catch{o=0}finally{r=Date.now()}return{latency:r-l,success:o}}));p.push(s),p.length>n&&p.shift();let h=Math.max(...p.map(e=>Math.max(...e.map(({latency:e})=>e))));r(l.map((e,t)=>{let r=p.map(e=>e[t].latency),o=r.reduce((e,t)=>e+t,0)/r.length,i=p.map(e=>e[t].success),n=i.reduce((e,t)=>e+t,0)/i.length;return 0===n?[0,t]:[d*(1-o/h)+c*n,t]}).sort((e,t)=>t[0]-e[0]).map(([,e])=>l[e])),await (0,o.wait)(t),u()};u()}({chain:t,interval:e.interval??n,onTransports:e=>h=e,ping:e.ping,sampleCount:e.sampleCount,timeout:e.timeout,transports:h,weights:e.weights})}return w}}function a(e){return!!("code"in e&&"number"==typeof e.code&&(e.code===r.TransactionRejectedRpcError.code||e.code===r.UserRejectedRequestError.code||t.ExecutionRevertedError.nodeMessage.test(e.message)||5e3===e.code))}e.s(["fallback",()=>n,"shouldThrow",()=>a])},926644,e=>{"use strict";var t=e.i(400454),r=e.i(24446),o=e.i(452345),i=e.i(516306),n=e.i(726662),a=e.i(531672);o.ConstantsUtil.CONNECTOR_ID.COINBASE,o.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK,o.ConstantsUtil.CONNECTOR_ID.BASE_ACCOUNT,o.ConstantsUtil.CONNECTOR_ID.SAFE,o.ConstantsUtil.CONNECTOR_ID.LEDGER,o.ConstantsUtil.CONNECTOR_ID.OKX,a.ConstantsUtil.METMASK_CONNECTOR_NAME,a.ConstantsUtil.TRUST_CONNECTOR_NAME,a.ConstantsUtil.SOLFLARE_CONNECTOR_NAME,a.ConstantsUtil.PHANTOM_CONNECTOR_NAME,a.ConstantsUtil.COIN98_CONNECTOR_NAME,a.ConstantsUtil.MAGIC_EDEN_CONNECTOR_NAME,a.ConstantsUtil.BACKPACK_CONNECTOR_NAME,a.ConstantsUtil.BITGET_CONNECTOR_NAME,a.ConstantsUtil.FRONTIER_CONNECTOR_NAME,a.ConstantsUtil.XVERSE_CONNECTOR_NAME,a.ConstantsUtil.LEATHER_CONNECTOR_NAME,a.ConstantsUtil.OKX_CONNECTOR_NAME,a.ConstantsUtil.BINANCE_CONNECTOR_NAME;let l={1:"ba0ba0cd-17c6-4806-ad93-f9d174f17900",42161:"3bff954d-5cb0-47a0-9a23-d20192e74600",43114:"30c46e53-e989-45fb-4549-be3bd4eb3b00",56:"93564157-2e8e-4ce7-81df-b264dbee9b00",250:"06b26297-fe0c-4733-5d6b-ffa5498aac00",10:"ab9c186a-c52f-464b-2906-ca59d760a400",137:"41d04d42-da3b-4453-8506-668cc0727900",5e3:"e86fae9b-b770-4eea-e520-150e12c81100",295:"6a97d510-cac8-4e58-c7ce-e8681b044c00",0xaa36a7:"e909ea0a-f92a-4512-c8fc-748044ea6800",84532:"a18a7ecd-e307-4360-4746-283182228e00",1301:"4eeea7ef-0014-4649-5d1d-07271a80f600",130:"2257980a-3463-48c6-cbac-a42d2a956e00",10143:"0a728e83-bacb-46db-7844-948f05434900",100:"02b53f6a-e3d4-479e-1cb4-21178987d100",9001:"f926ff41-260d-4028-635e-91913fc28e00",324:"b310f07f-4ef7-49f3-7073-2a0a39685800",314:"5a73b3dd-af74-424e-cae0-0de859ee9400",4689:"34e68754-e536-40da-c153-6ef2e7188a00",1088:"3897a66d-40b9-4833-162f-a2c90531c900",1284:"161038da-44ae-4ec7-1208-0ea569454b00",1285:"f1d73bb6-5450-4e18-38f7-fb6484264a00",7777777:"845c60df-d429-4991-e687-91ae45791600",42220:"ab781bbc-ccc6-418d-d32d-789b15da1f00",8453:"7289c336-3981-4081-c5f4-efc26ac64a00",0x4e454152:"3ff73439-a619-4894-9262-4470c773a100",2020:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",2021:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",80094:"e329c2c9-59b0-4a02-83e4-212ff3779900",2741:"fc2427d1-5af9-4a9c-8da5-6f94627cd900","5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp":"a1b58899-f671-4276-6a5e-56ca5bd59700","4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z":"a1b58899-f671-4276-6a5e-56ca5bd59700",EtWTRABZaYq6iMfeYKouRu166VU2xqa1:"a1b58899-f671-4276-6a5e-56ca5bd59700","000000000019d6689c085ae165831e93":"0b4838db-0161-4ffe-022d-532bf03dba00","000000000933ea01ad0ee984209779ba":"39354064-d79b-420b-065d-f980c4b78200","00000008819873e925422c1ff0f99f7c":"b3406e4a-bbfc-44fb-e3a6-89673c78b700","-239":"20f673c0-095e-49b2-07cf-eb5049dcf600","-3":"20f673c0-095e-49b2-07cf-eb5049dcf600","0x2b6653dc":"3502bb86-cc4e-420f-a387-59ea63a28b00","0x94a9059e":"3502bb86-cc4e-420f-a387-59ea63a28b00","0xcd8690dc":"3502bb86-cc4e-420f-a387-59ea63a28b00"};function s(e,t){let r=new URL("https://rpc.walletconnect.org/v1/");return r.searchParams.set("chainId",e),r.searchParams.set("projectId",t),r.toString()}o.ConstantsUtil.CONNECTOR_ID.COINBASE,o.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK,o.ConstantsUtil.CONNECTOR_ID.BASE_ACCOUNT,o.ConstantsUtil.CONNECTOR_ID.SAFE,o.ConstantsUtil.CONNECTOR_ID.LEDGER,o.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,o.ConstantsUtil.CONNECTOR_ID.INJECTED,o.ConstantsUtil.CONNECTOR_ID.INJECTED,o.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,o.ConstantsUtil.CONNECTOR_ID.COINBASE,o.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK,o.ConstantsUtil.CONNECTOR_ID.BASE_ACCOUNT,o.ConstantsUtil.CONNECTOR_ID.LEDGER,o.ConstantsUtil.CONNECTOR_ID.SAFE,o.ConstantsUtil.CONNECTOR_ID.INJECTED,o.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,o.ConstantsUtil.CONNECTOR_ID.EIP6963,o.ConstantsUtil.CONNECTOR_ID.AUTH,a.ConstantsUtil.CONNECTOR_TYPE_AUTH;let c=["near:mainnet","solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp","eip155:1101","eip155:56","eip155:42161","eip155:7777777","eip155:59144","eip155:324","solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1","eip155:5000","solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz","eip155:80084","eip155:5003","eip155:100","eip155:8453","eip155:42220","eip155:1313161555","eip155:17000","eip155:1","eip155:300","eip155:1313161554","eip155:1329","eip155:84532","eip155:421614","eip155:11155111","eip155:8217","eip155:43114","solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z","eip155:999999999","eip155:11155420","eip155:80002","eip155:97","eip155:43113","eip155:137","eip155:10","eip155:1301","eip155:80094","eip155:80069","eip155:560048","eip155:31","eip155:2818","eip155:57054","eip155:911867","eip155:534351","eip155:1112","eip155:534352","eip155:1111","eip155:146","eip155:130","eip155:1284","eip155:30","eip155:2810","eip155:55931","bip122:000000000019d6689c085ae165831e93","bip122:000000000933ea01ad0ee984209779ba"],d={extendRpcUrlWithProjectId(e,t){let r=!1;try{r="rpc.walletconnect.org"===new URL(e).host}catch(e){r=!1}if(r){let r=new URL(e);return r.searchParams.has("projectId")||r.searchParams.set("projectId",t),r.toString()}return e},isCaipNetwork:e=>"chainNamespace"in e&&"caipNetworkId"in e,getChainNamespace(e){return this.isCaipNetwork(e)?e.chainNamespace:o.ConstantsUtil.CHAIN.EVM},getCaipNetworkId(e){return this.isCaipNetwork(e)?e.caipNetworkId:`${o.ConstantsUtil.CHAIN.EVM}:${e.id}`},getDefaultRpcUrl(e,t,r){let o=e.rpcUrls?.default?.http?.[0];return c.includes(t)?s(t,r):o||""},extendCaipNetwork(e,{customNetworkImageUrls:t,projectId:r,customRpcUrls:o}){let i=this.getChainNamespace(e),n=this.getCaipNetworkId(e),a=e.rpcUrls?.default?.http?.[0],s=this.getDefaultRpcUrl(e,n,r),c=e?.rpcUrls?.chainDefault?.http?.[0]||a,d=o?.[n]?.map(e=>e.url)||[],p=[...d,...s?[s]:[]],u=[...d];return c&&!u.includes(c)&&u.push(c),{...e,chainNamespace:i,caipNetworkId:n,assets:{imageId:l[e.id],imageUrl:t?.[e.id]},rpcUrls:{...e.rpcUrls,default:{http:p},chainDefault:{http:u}}}},extendCaipNetworks:(e,{customNetworkImageUrls:t,projectId:r,customRpcUrls:o})=>e.map(e=>d.extendCaipNetwork(e,{customNetworkImageUrls:t,customRpcUrls:o,projectId:r})),getViemTransport(e,o,i){let n=[];return i?.forEach(e=>{n.push((0,r.http)(e.url,e.config))}),c.includes(e.caipNetworkId)&&n.push((0,r.http)(s(e.caipNetworkId,o),{fetchOptions:{headers:{"Content-Type":"text/plain"}}})),e?.rpcUrls?.default?.http?.forEach(e=>{n.push((0,r.http)(e))}),(0,t.fallback)(n)},extendWagmiTransports(e,o,i){if(c.includes(e.caipNetworkId)){let n=this.getDefaultRpcUrl(e,e.caipNetworkId,o);return(0,t.fallback)([i,(0,r.http)(n)])}return i},getUnsupportedNetwork:e=>({id:e.split(":")[1],caipNetworkId:e,name:o.ConstantsUtil.UNSUPPORTED_NETWORK_NAME,chainNamespace:e.split(":")[0],nativeCurrency:{name:"",decimals:0,symbol:""},rpcUrls:{default:{http:[]}}}),getCaipNetworkFromStorage(e){let t=n.StorageUtil.getActiveCaipNetworkId(),r=i.ChainController.getAllRequestedCaipNetworks(),o=Array.from(i.ChainController.state.chains?.keys()||[]),a=t?.split(":")[0],l=!!a&&o.includes(a),s=r?.find(e=>e.caipNetworkId===t);return l&&!s&&t?this.getUnsupportedNetwork(t):s||e||r?.[0]}};e.s(["CaipNetworksUtil",0,d],926644)},502853,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var o=e.i(585408),i=e.i(702599),n=e.i(134036),a=e.i(39050),l=t;e.i(992074),e.i(430210);var s=e.i(624851);let c=s.css`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    column-gap: ${({spacing:e})=>e[1]};
    color: ${({tokens:e})=>e.theme.textSecondary};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: transparent;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:e})=>e.theme.textPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:e})=>e.theme.textPrimary};
    }
  }
`;var d=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let p={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},u={lg:"md",md:"sm",sm:"sm"},h=class extends l.LitElement{constructor(){super(...arguments),this.icon="mobile",this.size="md",this.label="",this.active=!1}render(){return r.html`
      <button data-active=${this.active}>
        ${this.icon?r.html`<wui-icon size=${u[this.size]} name=${this.icon}></wui-icon>`:""}
        <wui-text variant=${p[this.size]}> ${this.label} </wui-text>
      </button>
    `}};h.styles=[n.resetStyles,n.elementStyles,c],d([(0,o.property)()],h.prototype,"icon",void 0),d([(0,o.property)()],h.prototype,"size",void 0),d([(0,o.property)()],h.prototype,"label",void 0),d([(0,o.property)({type:Boolean})],h.prototype,"active",void 0),h=d([(0,a.customElement)("wui-tab-item")],h);let m=s.css`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[32]};
    padding: ${({spacing:e})=>e["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;var w=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let b=class extends t.LitElement{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size="md",this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((e,t)=>{let o=t===this.activeTab;return r.html`
        <wui-tab-item
          @click=${()=>this.onTabClick(t)}
          icon=${e.icon}
          size=${this.size}
          label=${e.label}
          ?active=${o}
          data-active=${o}
          data-testid="tab-${e.label?.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(e){this.activeTab=e,this.onTabChange(e)}};b.styles=[n.resetStyles,n.elementStyles,m],w([(0,o.property)({type:Array})],b.prototype,"tabs",void 0),w([(0,o.property)()],b.prototype,"onTabChange",void 0),w([(0,o.property)()],b.prototype,"size",void 0),w([(0,i.state)()],b.prototype,"activeTab",void 0),b=w([(0,a.customElement)("wui-tabs")],b),e.s([],502853)},825408,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var o=e.i(702599),i=e.i(297807),n=e.i(291219),a=e.i(347771);e.i(520758);var l=e.i(39050),s=t,c=e.i(585408),d=e.i(134036),p=t;e.i(560589);var u=e.i(467708),h=e.i(624851);let m=h.css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({colors:e})=>e.neutrals300};
    border-radius: ${({borderRadius:e})=>e.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:e})=>e.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    background-color: ${({tokens:e})=>e.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:e})=>e.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:e})=>e.theme.textTertiary};
  }
`;var w=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let b=class extends p.LitElement{constructor(){super(...arguments),this.inputElementRef=(0,u.createRef)(),this.checked=!1,this.disabled=!1,this.size="md"}render(){return r.html`
      <label data-size=${this.size}>
        <input
          ${(0,u.ref)(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};b.styles=[d.resetStyles,d.elementStyles,m],w([(0,c.property)({type:Boolean})],b.prototype,"checked",void 0),w([(0,c.property)({type:Boolean})],b.prototype,"disabled",void 0),w([(0,c.property)()],b.prototype,"size",void 0),b=w([(0,l.customElement)("wui-toggle")],b);let f=h.css`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:e})=>e["2"]};
    padding: ${({spacing:e})=>e["2"]} ${({spacing:e})=>e["3"]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e["4"]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var g=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let y=class extends s.LitElement{constructor(){super(...arguments),this.checked=!1}render(){return r.html`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(e){e.stopPropagation(),this.checked=e.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("certifiedSwitchChange",{detail:this.checked,bubbles:!0,composed:!0}))}};y.styles=[d.resetStyles,d.elementStyles,f],g([(0,c.property)({type:Boolean})],y.prototype,"checked",void 0),y=g([(0,l.customElement)("wui-certified-switch")],y),e.i(334807),e.i(915118);var C=t;e.i(4892);let v=h.css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:e})=>e[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }
`;var E=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let R=class extends C.LitElement{constructor(){super(...arguments),this.inputComponentRef=(0,u.createRef)(),this.inputValue=""}render(){return r.html`
      <wui-input-text
        ${(0,u.ref)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?r.html`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(e){this.inputValue=e.detail||""}clearValue(){let e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value="",this.inputValue="",t.focus(),t.dispatchEvent(new Event("input")))}};R.styles=[d.resetStyles,v],E([(0,c.property)()],R.prototype,"inputValue",void 0),R=E([(0,l.customElement)("wui-search-bar")],R);var x=t;e.i(783601);var $=e.i(525559),O=e.i(602896),k=e.i(155853),T=e.i(773434),U=e.i(17960),S=t,N=e.i(24304);e.i(580258);let I=h.css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:e})=>e[2]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:e})=>e.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var P=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let j=class extends S.LitElement{constructor(){super(...arguments),this.type="wallet"}render(){return r.html`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?r.html` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${N.networkSvgMd}`:r.html`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};j.styles=[d.resetStyles,d.elementStyles,I],P([(0,c.property)()],j.prototype,"type",void 0),j=P([(0,l.customElement)("wui-card-select-loader")],j);var A=t,L=e.i(314351),D=e.i(983064);let W=D.css`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var _=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let M=class extends A.LitElement{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding&&L.UiHelperUtil.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&L.UiHelperUtil.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&L.UiHelperUtil.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&L.UiHelperUtil.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&L.UiHelperUtil.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&L.UiHelperUtil.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&L.UiHelperUtil.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&L.UiHelperUtil.getSpacingStyles(this.margin,3)};
    `,r.html`<slot></slot>`}};M.styles=[d.resetStyles,W],_([(0,c.property)()],M.prototype,"gridTemplateRows",void 0),_([(0,c.property)()],M.prototype,"gridTemplateColumns",void 0),_([(0,c.property)()],M.prototype,"justifyItems",void 0),_([(0,c.property)()],M.prototype,"alignItems",void 0),_([(0,c.property)()],M.prototype,"justifyContent",void 0),_([(0,c.property)()],M.prototype,"alignContent",void 0),_([(0,c.property)()],M.prototype,"columnGap",void 0),_([(0,c.property)()],M.prototype,"rowGap",void 0),_([(0,c.property)()],M.prototype,"gap",void 0),_([(0,c.property)()],M.prototype,"padding",void 0),_([(0,c.property)()],M.prototype,"margin",void 0),M=_([(0,l.customElement)("wui-grid")],M);var q=t,B=e.i(787591),z=e.i(307713);e.i(152462),e.i(624014),e.i(296113),e.i(883679);let H=h.css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:e})=>e["2"]};
    padding: ${({spacing:e})=>e["3"]} ${({spacing:e})=>e["0"]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:e})=>e["4"]}, 20px);
    transition:
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:e})=>e.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:e})=>e.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:e})=>e.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:e})=>e.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var F=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let V=class extends q.LitElement{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.isImpressed=!1,this.explorerId="",this.walletQuery="",this.certified=!1,this.displayIndex=0,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc(),this.sendImpressionEvent()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let e=this.wallet?.badge_type==="certified";return r.html`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${(0,$.ifDefined)(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?r.html`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?r.html`
      <wui-wallet-image
        size="lg"
        imageSrc=${(0,$.ifDefined)(this.imageSrc)}
        name=${(0,$.ifDefined)(this.wallet?.name)}
        .installed=${this.wallet?.installed??!1}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return r.html`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){!this.wallet||(this.imageSrc=B.AssetUtil.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await B.AssetUtil.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}sendImpressionEvent(){this.wallet&&!this.isImpressed&&(this.isImpressed=!0,z.EventsController.sendWalletImpressionEvent({name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.explorerId,view:n.RouterController.state.view,query:this.walletQuery,certified:this.certified,displayIndex:this.displayIndex}))}};V.styles=H,F([(0,o.state)()],V.prototype,"visible",void 0),F([(0,o.state)()],V.prototype,"imageSrc",void 0),F([(0,o.state)()],V.prototype,"imageLoading",void 0),F([(0,o.state)()],V.prototype,"isImpressed",void 0),F([(0,c.property)()],V.prototype,"explorerId",void 0),F([(0,c.property)()],V.prototype,"walletQuery",void 0),F([(0,c.property)()],V.prototype,"certified",void 0),F([(0,c.property)()],V.prototype,"displayIndex",void 0),F([(0,c.property)({type:Object})],V.prototype,"wallet",void 0),V=F([(0,l.customElement)("w3m-all-wallets-list-item")],V);let K=h.css`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:e})=>e["4"]};
    padding-bottom: ${({spacing:e})=>e["4"]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var J=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let G="local-paginator",Q=class extends x.LitElement{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!O.ApiController.state.wallets.length,this.wallets=O.ApiController.state.wallets,this.mobileFullScreen=T.OptionsController.state.enableMobileFullScreen,this.unsubscribe.push(O.ApiController.subscribeKey("wallets",e=>this.wallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),r.html`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","3","3","3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let e=this.shadowRoot?.querySelector("wui-grid");e&&(await O.ApiController.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,t){return[...Array(e)].map(()=>r.html`
        <wui-card-select-loader type="wallet" id=${(0,$.ifDefined)(t)}></wui-card-select-loader>
      `)}walletsTemplate(){return U.WalletUtil.getWalletConnectWallets(this.wallets).map((e,t)=>r.html`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${e.id}"
          @click=${()=>this.onConnectWallet(e)}
          .wallet=${e}
          explorerId=${e.id}
          certified=${"certified"===this.badge}
          displayIndex=${t}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:e,recommended:t,featured:r,count:o,mobileFilteredOutWalletsLength:i}=O.ApiController.state,n=window.innerWidth<352?3:4,a=e.length+t.length,l=Math.ceil(a/n)*n-a+n;return(l-=e.length?r.length%n:0,0===o&&r.length>0)?null:0===o||[...r,...e,...t].length<o-(i??0)?this.shimmerTemplate(l,G):null}createPaginationObserver(){let e=this.shadowRoot?.querySelector(`#${G}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){let{page:e,count:t,wallets:r}=O.ApiController.state;r.length<t&&O.ApiController.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){k.ConnectorController.selectWalletConnector(e)}};Q.styles=K,J([(0,o.state)()],Q.prototype,"loading",void 0),J([(0,o.state)()],Q.prototype,"wallets",void 0),J([(0,o.state)()],Q.prototype,"badge",void 0),J([(0,o.state)()],Q.prototype,"mobileFullScreen",void 0),Q=J([(0,l.customElement)("w3m-all-wallets-list")],Q);var X=t;e.i(563810);let Y=D.css`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var Z=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let ee=class extends X.LitElement{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.mobileFullScreen=T.OptionsController.state.enableMobileFullScreen,this.query=""}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.onSearch(),this.loading?r.html`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await O.ApiController.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:e}=O.ApiController.state,t=U.WalletUtil.markWalletsAsInstalled(e),o=U.WalletUtil.filterWalletsByWcSupport(t);return o.length?r.html`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","3","3","3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${o.map((e,t)=>r.html`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(e)}
              .wallet=${e}
              data-testid="wallet-search-item-${e.id}"
              explorerId=${e.id}
              certified=${"certified"===this.badge}
              walletQuery=${this.query}
              displayIndex=${t}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:r.html`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){k.ConnectorController.selectWalletConnector(e)}};ee.styles=Y,Z([(0,o.state)()],ee.prototype,"loading",void 0),Z([(0,o.state)()],ee.prototype,"mobileFullScreen",void 0),Z([(0,c.property)()],ee.prototype,"query",void 0),Z([(0,c.property)()],ee.prototype,"badge",void 0),ee=Z([(0,l.customElement)("w3m-all-wallets-search")],ee);var et=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let er=class extends t.LitElement{constructor(){super(...arguments),this.search="",this.badge=void 0,this.onDebouncedSearch=i.CoreHelperUtil.debounce(e=>{this.search=e})}render(){let e=this.search.length>=2;return r.html`
      <wui-flex .padding=${["1","3","3","3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${"certified"===this.badge}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?r.html`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:r.html`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onCertifiedSwitchChange(e){e.detail?(this.badge="certified",a.SnackController.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return i.CoreHelperUtil.isMobile()?r.html`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){n.RouterController.push("ConnectingWalletConnect")}};et([(0,o.state)()],er.prototype,"search",void 0),et([(0,o.state)()],er.prototype,"badge",void 0),er=et([(0,l.customElement)("w3m-all-wallets-view")],er),e.s(["W3mAllWalletsView",()=>er],825408)},271627,389643,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var o=e.i(585408),i=e.i(702599);e.i(783601);var n=e.i(525559),a=e.i(452345),l=e.i(602896),s=e.i(585767),c=e.i(155853),d=e.i(297807),p=e.i(307713),u=e.i(773434),h=e.i(291219);e.i(520758);var m=e.i(39050);e.i(426570);var w=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let b=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=c.ConnectorController.state.connectors,this.count=l.ApiController.state.count,this.filteredCount=l.ApiController.state.filteredWallets.length,this.isFetchingRecommendedWallets=l.ApiController.state.isFetchingRecommendedWallets,this.unsubscribe.push(c.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),l.ApiController.subscribeKey("count",e=>this.count=e),l.ApiController.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),l.ApiController.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.find(e=>"walletConnect"===e.id),{allWallets:t}=u.OptionsController.state;if(!e||"HIDE"===t||"ONLY_MOBILE"===t&&!d.CoreHelperUtil.isMobile())return null;let o=l.ApiController.state.featured.length,i=this.count+o,c=i<10?i:10*Math.floor(i/10),p=this.filteredCount>0?this.filteredCount:c,h=`${p}`;this.filteredCount>0?h=`${this.filteredCount}`:p<i&&(h=`${p}+`);let m=s.ConnectionController.hasAnyConnection(a.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT);return r.html`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${h}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${(0,n.ifDefined)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${m}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){p.EventsController.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),h.RouterController.push("AllWallets",{redirectView:h.RouterController.state.data?.redirectView})}};w([(0,o.property)()],b.prototype,"tabIdx",void 0),w([(0,i.state)()],b.prototype,"connectors",void 0),w([(0,i.state)()],b.prototype,"count",void 0),w([(0,i.state)()],b.prototype,"filteredCount",void 0),w([(0,i.state)()],b.prototype,"isFetchingRecommendedWallets",void 0),b=w([(0,m.customElement)("w3m-all-wallets-widget")],b),e.s([],271627);var f=t,g=e.i(173947),y=e.i(787591),C=e.i(516306),v=e.i(245940);e.i(334807);var E=e.i(408445),R=e.i(624851);let x=R.css`
  :host {
    margin-top: ${({spacing:e})=>e["1"]};
  }
  wui-separator {
    margin: ${({spacing:e})=>e["3"]} calc(${({spacing:e})=>e["3"]} * -1)
      ${({spacing:e})=>e["2"]} calc(${({spacing:e})=>e["3"]} * -1);
    width: calc(100% + ${({spacing:e})=>e["3"]} * 2);
  }
`;var $=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let O=class extends f.LitElement{constructor(){super(),this.unsubscribe=[],this.explorerWallets=l.ApiController.state.explorerWallets,this.connections=s.ConnectionController.state.connections,this.connectorImages=g.AssetController.state.connectorImages,this.loadingTelegram=!1,this.unsubscribe.push(s.ConnectionController.subscribeKey("connections",e=>this.connections=e),g.AssetController.subscribeKey("connectorImages",e=>this.connectorImages=e),l.ApiController.subscribeKey("explorerFilteredWallets",e=>{this.explorerWallets=e?.length?e:l.ApiController.state.explorerWallets}),l.ApiController.subscribeKey("explorerWallets",e=>{this.explorerWallets?.length||(this.explorerWallets=e)})),d.CoreHelperUtil.isTelegram()&&d.CoreHelperUtil.isIos()&&(this.loadingTelegram=!s.ConnectionController.state.wcUri,this.unsubscribe.push(s.ConnectionController.subscribeKey("wcUri",e=>this.loadingTelegram=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return r.html`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){return v.ConnectorUtil.connectorList().map((e,t)=>"connector"===e.kind?this.renderConnector(e,t):this.renderWallet(e,t))}getConnectorNamespaces(e){return"walletConnect"===e.subtype?[]:"multiChain"===e.subtype?e.connector.connectors?.map(e=>e.chain)||[]:[e.connector.chain]}renderConnector(e,t){let o,i,l=e.connector,c=y.AssetUtil.getConnectorImage(l)||this.connectorImages[l?.imageId??""],d=(this.connections.get(l.chain)??[]).some(e=>E.HelpersUtil.isLowerCaseMatch(e.connectorId,l.id));"walletConnect"===e.subtype?(o="qr code",i="accent"):"injected"===e.subtype||"announced"===e.subtype?(o=d?"connected":"installed",i=d?"info":"success"):(o=void 0,i=void 0);let p=s.ConnectionController.hasAnyConnection(a.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT),u=("walletConnect"===e.subtype||"external"===e.subtype)&&p;return r.html`
      <w3m-list-wallet
        displayIndex=${t}
        imageSrc=${(0,n.ifDefined)(c)}
        .installed=${!0}
        name=${l.name??"Unknown"}
        .tagVariant=${i}
        tagLabel=${(0,n.ifDefined)(o)}
        data-testid=${`wallet-selector-${l.id.toLowerCase()}`}
        size="sm"
        @click=${()=>this.onClickConnector(e)}
        tabIdx=${(0,n.ifDefined)(this.tabIdx)}
        ?disabled=${u}
        rdnsId=${(0,n.ifDefined)(l.explorerWallet?.rdns||void 0)}
        walletRank=${(0,n.ifDefined)(l.explorerWallet?.order)}
        .namespaces=${this.getConnectorNamespaces(e)}
      >
      </w3m-list-wallet>
    `}onClickConnector(e){let t=h.RouterController.state.data?.redirectView;if("walletConnect"===e.subtype){c.ConnectorController.setActiveConnector(e.connector),d.CoreHelperUtil.isMobile()?h.RouterController.push("AllWallets"):h.RouterController.push("ConnectingWalletConnect",{redirectView:t});return}if("multiChain"===e.subtype){c.ConnectorController.setActiveConnector(e.connector),h.RouterController.push("ConnectingMultiChain",{redirectView:t});return}if("injected"===e.subtype){c.ConnectorController.setActiveConnector(e.connector),h.RouterController.push("ConnectingExternal",{connector:e.connector,redirectView:t,wallet:e.connector.explorerWallet});return}if("announced"===e.subtype)return"walletConnect"===e.connector.id?void(d.CoreHelperUtil.isMobile()?h.RouterController.push("AllWallets"):h.RouterController.push("ConnectingWalletConnect",{redirectView:t})):(h.RouterController.push("ConnectingExternal",{connector:e.connector,redirectView:t,wallet:e.connector.explorerWallet}),void 0);h.RouterController.push("ConnectingExternal",{connector:e.connector,redirectView:t})}renderWallet(e,t){let o=e.wallet,i=y.AssetUtil.getWalletImage(o),l=s.ConnectionController.hasAnyConnection(a.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT),c=this.loadingTelegram,d="recent"===e.subtype?"recent":void 0,p="recent"===e.subtype?"info":void 0;return r.html`
      <w3m-list-wallet
        displayIndex=${t}
        imageSrc=${(0,n.ifDefined)(i)}
        name=${o.name??"Unknown"}
        @click=${()=>this.onClickWallet(e)}
        size="sm"
        data-testid=${`wallet-selector-${o.id}`}
        tabIdx=${(0,n.ifDefined)(this.tabIdx)}
        ?loading=${c}
        ?disabled=${l}
        rdnsId=${(0,n.ifDefined)(o.rdns||void 0)}
        walletRank=${(0,n.ifDefined)(o.order)}
        tagLabel=${(0,n.ifDefined)(d)}
        .tagVariant=${p}
      >
      </w3m-list-wallet>
    `}onClickWallet(e){let t=h.RouterController.state.data?.redirectView,r=C.ChainController.state.activeChain;if("featured"===e.subtype)return void c.ConnectorController.selectWalletConnector(e.wallet);if("recent"===e.subtype){if(this.loadingTelegram)return;c.ConnectorController.selectWalletConnector(e.wallet);return}if("custom"===e.subtype){if(this.loadingTelegram)return;h.RouterController.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:t});return}if(this.loadingTelegram)return;let o=r?c.ConnectorController.getConnector({id:e.wallet.id,namespace:r}):void 0;o?h.RouterController.push("ConnectingExternal",{connector:o,redirectView:t}):h.RouterController.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:t})}};O.styles=x,$([(0,o.property)({type:Number})],O.prototype,"tabIdx",void 0),$([(0,i.state)()],O.prototype,"explorerWallets",void 0),$([(0,i.state)()],O.prototype,"connections",void 0),$([(0,i.state)()],O.prototype,"connectorImages",void 0),$([(0,i.state)()],O.prototype,"loadingTelegram",void 0),O=$([(0,m.customElement)("w3m-connector-list")],O),e.s([],389643)},596559,222359,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var o=e.i(585408),i=e.i(702599);e.i(783601);var n=e.i(525559),a=e.i(787591),l=e.i(585767),s=e.i(297807),c=e.i(291219),d=e.i(347771),p=e.i(562643);e.i(902938),e.i(334807),e.i(152462),e.i(915118),e.i(711844),e.i(867953),e.i(296113),e.i(883679);var u=t;e.i(520758);var h=e.i(314351),m=e.i(39050),w=t;e.i(992074),e.i(430210),e.i(308982);var b=e.i(134036);e.i(712499);var f=e.i(624851);let g=f.css`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding-left: ${({spacing:e})=>e[3]};
    padding-right: ${({spacing:e})=>e[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[6]};
  }

  wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;var y=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let C=class extends w.LitElement{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return r.html`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};C.styles=[b.resetStyles,b.elementStyles,g],y([(0,o.property)({type:Boolean})],C.prototype,"disabled",void 0),y([(0,o.property)()],C.prototype,"label",void 0),y([(0,o.property)()],C.prototype,"buttonLabel",void 0),C=y([(0,m.customElement)("wui-cta-button")],C);let v=f.css`
  :host {
    display: block;
    padding: 0 ${({spacing:e})=>e["5"]} ${({spacing:e})=>e["5"]};
  }
`;var E=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let R=class extends u.LitElement{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:e,app_store:t,play_store:o,chrome_store:i,homepage:n}=this.wallet,a=s.CoreHelperUtil.isMobile(),l=s.CoreHelperUtil.isIos(),d=s.CoreHelperUtil.isAndroid(),p=[t,o,n,i].filter(Boolean).length>1,u=h.UiHelperUtil.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return p&&!a?r.html`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${()=>c.RouterController.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!p&&n?r.html`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:t&&l?r.html`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:o&&d?r.html`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&s.CoreHelperUtil.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&s.CoreHelperUtil.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&s.CoreHelperUtil.openHref(this.wallet.homepage,"_blank")}};R.styles=[v],E([(0,o.property)({type:Object})],R.prototype,"wallet",void 0),R=E([(0,m.customElement)("w3m-mobile-download-links")],R),e.s([],222359);let x=f.css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e["1"]} * -1);
    bottom: calc(${({spacing:e})=>e["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:e})=>e.lg};
    transition-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:e})=>e["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:e})=>e["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;var $=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};class O extends t.LitElement{constructor(){super(),this.wallet=c.RouterController.state.data?.wallet,this.connector=c.RouterController.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=a.AssetUtil.getConnectorImage(this.connector)??a.AssetUtil.getWalletImage(this.wallet),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=l.ConnectionController.state.wcUri,this.error=l.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(l.ConnectionController.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),l.ConnectionController.subscribeKey("wcError",e=>this.error=e)),(s.CoreHelperUtil.isTelegram()||s.CoreHelperUtil.isSafari())&&s.CoreHelperUtil.isIos()&&l.ConnectionController.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),l.ConnectionController.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,t="";return this.label?t=this.label:(t=`Continue in ${this.name}`,this.error&&(t="Connection declined")),r.html`
      <wui-flex
        data-error=${(0,n.ifDefined)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,n.ifDefined)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","0","0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?"error":"primary"}>
            ${t}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?r.html`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?r.html`
              <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){l.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let e=p.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return r.html`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(s.CoreHelperUtil.copyToClopboard(this.uri),d.SnackController.showSuccess("Link copied"))}catch{d.SnackController.showError("Failed to copy")}}}O.styles=x,$([(0,i.state)()],O.prototype,"isRetrying",void 0),$([(0,i.state)()],O.prototype,"uri",void 0),$([(0,i.state)()],O.prototype,"error",void 0),$([(0,i.state)()],O.prototype,"ready",void 0),$([(0,i.state)()],O.prototype,"showRetry",void 0),$([(0,i.state)()],O.prototype,"label",void 0),$([(0,i.state)()],O.prototype,"secondaryBtnLabel",void 0),$([(0,i.state)()],O.prototype,"secondaryLabel",void 0),$([(0,i.state)()],O.prototype,"isLoading",void 0),$([(0,o.property)({type:Boolean})],O.prototype,"isMobile",void 0),$([(0,o.property)()],O.prototype,"onRetry",void 0),e.s(["W3mConnectingWidget",()=>O],596559)},969887,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var o=e.i(585408);e.i(520758);var i=e.i(39050);e.i(334807),e.i(502853);var n=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let a=class extends t.LitElement{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.generateTabs();return r.html`
      <wui-flex justifyContent="center" .padding=${["0","0","4","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let e=this.platforms.map(e=>{if("browser"===e)return{label:"Browser",icon:"extension",platform:"browser"};if("mobile"===e)return{label:"Mobile",icon:"mobile",platform:"mobile"};if("qrcode"===e)return{label:"Mobile",icon:"mobile",platform:"qrcode"};if("web"===e)return{label:"Webapp",icon:"browser",platform:"web"};if("desktop"===e)return{label:"Desktop",icon:"desktop",platform:"desktop"};return{label:"Browser",icon:"extension",platform:"unsupported"}});return this.platformTabs=e.map(({platform:e})=>e),e}onTabChange(e){let t=this.platformTabs[e];t&&this.onSelectPlatfrom?.(t)}};n([(0,o.property)({type:Array})],a.prototype,"platforms",void 0),n([(0,o.property)()],a.prototype,"onSelectPlatfrom",void 0),a=n([(0,i.customElement)("w3m-connecting-header")],a),e.s([])},203783,319983,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var o=e.i(702599),i=e.i(602896),n=e.i(297807),a=e.i(773434),l=e.i(726662);e.i(520758);var s=e.i(39050);e.i(334807),e.i(271627),e.i(389643);var c=t,d=e.i(585408),p=e.i(48060),u=e.i(355736),h=e.i(516306),m=e.i(585767),w=e.i(307713),b=e.i(268574),f=e.i(545478),g=e.i(291219),y=e.i(347771),C=e.i(926644);e.i(969887);var v=e.i(155853),E=e.i(596559);let R=class extends E.W3mConnectingWidget{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),w.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:g.RouterController.state.view}})}async onConnectProxy(){try{this.error=!1;let{connectors:e}=v.ConnectorController.state,t=e.find(e=>"ANNOUNCED"===e.type&&e.info?.rdns===this.wallet?.rdns||"INJECTED"===e.type||e.name===this.wallet?.name);if(t)await m.ConnectionController.connectExternal(t,t.chain);else throw Error("w3m-connecting-wc-browser: No connector found");f.ModalController.close()}catch(e){e instanceof u.AppKitError&&e.originalName===p.ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?w.EventsController.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:e.message}}):w.EventsController.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};R=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}([(0,s.customElement)("w3m-connecting-wc-browser")],R);var x=E;let $=class extends x.W3mConnectingWidget{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),w.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:g.RouterController.state.view}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:e,name:t}=this.wallet,{redirect:r,href:o}=n.CoreHelperUtil.formatNativeUrl(e,this.uri);m.ConnectionController.setWcLinking({name:t,href:o}),m.ConnectionController.setRecentWallet(this.wallet),n.CoreHelperUtil.openHref(r,"_blank")}catch{this.error=!0}}};$=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}([(0,s.customElement)("w3m-connecting-wc-desktop")],$);var O=e.i(971058),k=e.i(604194),T=E,U=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let S=class extends T.W3mConnectingWidget{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=a.OptionsController.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{O.ConnectionControllerUtil.onConnectMobile(this.wallet)},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=k.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(m.ConnectionController.subscribeKey("wcUri",()=>{this.onHandleURI()})),w.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:g.RouterController.state.view}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){m.ConnectionController.setWcError(!1),this.onConnect?.()}};U([(0,o.state)()],S.prototype,"redirectDeeplink",void 0),U([(0,o.state)()],S.prototype,"redirectUniversalLink",void 0),U([(0,o.state)()],S.prototype,"target",void 0),U([(0,o.state)()],S.prototype,"preferUniversalLinks",void 0),U([(0,o.state)()],S.prototype,"isLoading",void 0),S=U([(0,s.customElement)("w3m-connecting-wc-mobile")],S),e.i(783601);var N=e.i(525559),I=e.i(787591),P=e.i(562643);e.i(152462),e.i(711844),e.i(502882),e.i(624014),e.i(296113),e.i(300622);var j=E;e.i(222359);var A=e.i(624851);let L=A.css`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var D=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let W=class extends j.W3mConnectingWidget{constructor(){super(),this.basic=!1}firstUpdated(){this.basic||w.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:g.RouterController.state.view}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e())}render(){return this.onRenderProxy(),r.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","5","5","5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0)}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.wallet?this.wallet.name:void 0;m.ConnectionController.setWcLinking(void 0),m.ConnectionController.setRecentWallet(this.wallet);let t=P.ThemeController.state.themeVariables["--apkt-qr-color"]??P.ThemeController.state.themeVariables["--w3m-qr-color"];return r.html` <wui-qr-code
      theme=${P.ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,N.ifDefined)(I.AssetUtil.getWalletImage(this.wallet))}
      color=${(0,N.ifDefined)(t)}
      alt=${(0,N.ifDefined)(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return r.html`<wui-button
      .disabled=${e}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};W.styles=L,D([(0,d.property)({type:Boolean})],W.prototype,"basic",void 0),W=D([(0,s.customElement)("w3m-connecting-wc-qrcode")],W);var _=t;e.i(883679);let M=class extends _.LitElement{constructor(){if(super(),this.wallet=g.RouterController.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");w.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:g.RouterController.state.view}})}render(){return r.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,N.ifDefined)(I.AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};M=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}([(0,s.customElement)("w3m-connecting-wc-unsupported")],M);var q=E,B=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let z=class extends q.W3mConnectingWidget{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=k.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(m.ConnectionController.subscribeKey("wcUri",()=>{this.updateLoadingState()})),w.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:g.RouterController.state.view}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:e,name:t}=this.wallet,{redirect:r,href:o}=n.CoreHelperUtil.formatUniversalUrl(e,this.uri);m.ConnectionController.setWcLinking({name:t,href:o}),m.ConnectionController.setRecentWallet(this.wallet),n.CoreHelperUtil.openHref(r,"_blank")}catch{this.error=!0}}};B([(0,o.state)()],z.prototype,"isLoading",void 0),z=B([(0,s.customElement)("w3m-connecting-wc-web")],z);let H=A.css`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`;var F=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let V=class extends c.LitElement{constructor(){super(),this.wallet=g.RouterController.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!a.OptionsController.state.siwx,this.remoteFeatures=a.OptionsController.state.remoteFeatures,this.displayBranding=!0,this.basic=!1,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(a.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return a.OptionsController.state.enableMobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),r.html`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding&&this.displayBranding?r.html`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if("browser"!==this.platform&&(!a.OptionsController.state.manualWCControl||e))try{let{wcPairingExpiry:t,status:r}=m.ConnectionController.state,{redirectView:o}=g.RouterController.state.data??{};if(e||a.OptionsController.state.enableEmbedded||n.CoreHelperUtil.isPairingExpired(t)||"connecting"===r){let e=m.ConnectionController.getConnections(h.ChainController.state.activeChain),t=this.remoteFeatures?.multiWallet,r=e.length>0;await m.ConnectionController.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(r&&t?(g.RouterController.replace("ProfileWallets"),y.SnackController.showSuccess("New Wallet Added")):o?g.RouterController.replace(o):f.ModalController.close())}}catch(e){if(e instanceof Error&&e.message.includes("An error occurred when attempting to switch chain")&&!a.OptionsController.state.enableNetworkSwitch&&h.ChainController.state.activeChain){h.ChainController.setActiveCaipNetwork(C.CaipNetworksUtil.getUnsupportedNetwork(`${h.ChainController.state.activeChain}:${h.ChainController.state.activeCaipNetwork?.id}`)),h.ChainController.showUnsupportedChainUI();return}e instanceof u.AppKitError&&e.originalName===p.ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?w.EventsController.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:e.message}}):w.EventsController.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),m.ConnectionController.setWcError(!0),y.SnackController.showError(e.message??"Connection error"),m.ConnectionController.resetWcConnection(),g.RouterController.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:e,desktop_link:t,webapp_link:r,injected:o,rdns:i}=this.wallet,l=o?.map(({injected_id:e})=>e).filter(Boolean),s=[...i?[i]:l??[]],c=!a.OptionsController.state.isUniversalProvider&&s.length,d=m.ConnectionController.checkInstalled(s),p=c&&d,u=t&&!n.CoreHelperUtil.isMobile();p&&!h.ChainController.state.noAdapters&&this.platforms.push("browser"),e&&this.platforms.push(n.CoreHelperUtil.isMobile()?"mobile":"qrcode"),r&&this.platforms.push("web"),u&&this.platforms.push("desktop");let w=b.MobileWalletUtil.isCustomDeeplinkWallet(this.wallet.id,h.ChainController.state.activeChain);p||!c||h.ChainController.state.noAdapters||w||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return r.html`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return r.html`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return r.html`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return r.html`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return r.html`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;default:return r.html`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?r.html`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){let t=this.shadowRoot?.querySelector("div");t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};V.styles=H,F([(0,o.state)()],V.prototype,"platform",void 0),F([(0,o.state)()],V.prototype,"platforms",void 0),F([(0,o.state)()],V.prototype,"isSiwxEnabled",void 0),F([(0,o.state)()],V.prototype,"remoteFeatures",void 0),F([(0,d.property)({type:Boolean})],V.prototype,"displayBranding",void 0),F([(0,d.property)({type:Boolean})],V.prototype,"basic",void 0),V=F([(0,s.customElement)("w3m-connecting-wc-view")],V),e.s(["W3mConnectingWcView",()=>V],319983);var K=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let J=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.isMobile=n.CoreHelperUtil.isMobile(),this.remoteFeatures=a.OptionsController.state.remoteFeatures,this.unsubscribe.push(a.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(this.isMobile){let{featured:e,recommended:t}=i.ApiController.state,{customWallets:o}=a.OptionsController.state,n=l.StorageUtil.getRecentWallets(),s=e.length||t.length||o?.length||n.length;return r.html`<wui-flex flexDirection="column" gap="2" .margin=${["1","3","3","3"]}>
        ${s?r.html`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return r.html`<wui-flex flexDirection="column" .padding=${["0","0","4","0"]}>
        <w3m-connecting-wc-view ?basic=${!0} .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","3","0","3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?r.html` <wui-flex flexDirection="column" .padding=${["1","0","1","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};K([(0,o.state)()],J.prototype,"isMobile",void 0),K([(0,o.state)()],J.prototype,"remoteFeatures",void 0),J=K([(0,s.customElement)("w3m-connecting-wc-basic-view")],J),e.s(["W3mConnectingWcBasicView",()=>J],203783)},950910,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980),o=e.i(297807),i=e.i(307713),n=e.i(291219);e.i(520758);var a=e.i(39050);e.i(334807),e.i(478399),e.i(296113);let l=class extends t.LitElement{constructor(){super(...arguments),this.wallet=n.RouterController.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return r.html`
      <wui-flex gap="2" flexDirection="column" .padding=${["3","3","4","3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?r.html`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?r.html`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?r.html`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?r.html`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}openStore(e){e.href&&this.wallet&&(i.EventsController.sendEvent({type:"track",event:"GET_WALLET",properties:{name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.wallet.id,type:e.type}}),o.CoreHelperUtil.openHref(e.href,"_blank"))}onChromeStore(){this.wallet?.chrome_store&&this.openStore({href:this.wallet.chrome_store,type:"chrome_store"})}onAppStore(){this.wallet?.app_store&&this.openStore({href:this.wallet.app_store,type:"app_store"})}onPlayStore(){this.wallet?.play_store&&this.openStore({href:this.wallet.play_store,type:"play_store"})}onHomePage(){this.wallet?.homepage&&this.openStore({href:this.wallet.homepage,type:"homepage"})}};l=function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}([(0,a.customElement)("w3m-downloads-view")],l),e.s(["W3mDownloadsView",()=>l])}]);

//# debugId=e23cd195-7ed6-81f7-5a9a-e82679da29e0
//# sourceMappingURL=a98310ff9d0d5072.js.map
;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="367f4f23-e6ec-8df2-f3c3-ed7957835676")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,538124,e=>{"use strict";e.s(["NavigationUtil",0,{URLS:{FAQ:"https://walletconnect.com/faq"}}])},656751,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var i=e.i(585408);e.i(783601);var a=e.i(525559);e.i(992074),e.i(430210);var o=e.i(134036),s=e.i(39050);e.i(4892);var n=e.i(983064);let l=n.css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var c=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};let d=class extends t.LitElement{constructor(){super(...arguments),this.disabled=!1}render(){return r.html`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="lg"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,a.ifDefined)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?r.html`<wui-text variant="sm-regular" color="error">${this.errorMessage}</wui-text>`:null}};d.styles=[o.resetStyles,l],c([(0,i.property)()],d.prototype,"errorMessage",void 0),c([(0,i.property)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,i.property)()],d.prototype,"value",void 0),c([(0,i.property)()],d.prototype,"tabIdx",void 0),d=c([(0,s.customElement)("wui-email-input")],d),e.s([],656751)},417225,e=>{"use strict";var t=e.i(745701),r=e.i(773434);let i=new AbortController;e.s(["ErrorUtil",0,{EmbeddedWalletAbortController:i,UniversalProviderErrors:{UNAUTHORIZED_DOMAIN_NOT_ALLOWED:{message:"Unauthorized: origin not allowed",alertErrorKey:"ORIGIN_NOT_ALLOWED"},JWT_VALIDATION_ERROR:{message:"JWT validation error: JWT Token is not yet valid",alertErrorKey:"JWT_TOKEN_NOT_VALID"},INVALID_KEY:{message:"Unauthorized: invalid key",alertErrorKey:"INVALID_PROJECT_ID"}},ALERT_ERRORS:{SWITCH_NETWORK_NOT_FOUND:{code:"APKT001",displayMessage:"Network Not Found",debugMessage:"The specified network is not recognized. Please ensure it is included in the `networks` array of your `createAppKit` configuration."},ORIGIN_NOT_ALLOWED:{code:"APKT002",displayMessage:"Invalid App Configuration",debugMessage:()=>`The origin ${(0,t.isSafe)()?window.origin:"unknown"} is not in your allow list. Please update your allowed domains at https://dashboard.reown.com. [PID: ${r.OptionsController.state.projectId}]`},IFRAME_LOAD_FAILED:{code:"APKT003",displayMessage:"Network Error: Wallet Load Failed",debugMessage:()=>"Failed to load the embedded wallet. This may be due to network issues or server downtime. Please check your network connection and try again shortly. Contact support if the issue persists."},IFRAME_REQUEST_TIMEOUT:{code:"APKT004",displayMessage:"Wallet Request Timeout",debugMessage:()=>"The request to the embedded wallet timed out. Please check your network connection and try again shortly. Contact support if the issue persists."},UNVERIFIED_DOMAIN:{code:"APKT005",displayMessage:"Unverified Domain",debugMessage:()=>"Embedded wallet load failed. Ensure your domain is verified in https://dashboard.reown.com."},JWT_TOKEN_NOT_VALID:{code:"APKT006",displayMessage:"Session Expired",debugMessage:"Your session is invalid or expired. Please check your system’s date and time settings, then reconnect."},INVALID_PROJECT_ID:{code:"APKT007",displayMessage:"Invalid Project ID",debugMessage:"The specified project ID is invalid. Please visit https://dashboard.reown.com to obtain a valid project ID."},PROJECT_ID_NOT_CONFIGURED:{code:"APKT008",displayMessage:"Project ID Missing",debugMessage:"No project ID is configured. You can create and configure a project ID at https://dashboard.reown.com."},SERVER_ERROR_APP_CONFIGURATION:{code:"APKT009",displayMessage:"Server Error",debugMessage:e=>`Unable to fetch App Configuration. ${e}. Please check your network connection and try again shortly. Contact support if the issue persists.`},RATE_LIMITED_APP_CONFIGURATION:{code:"APKT010",displayMessage:"Rate Limited",debugMessage:"You have been rate limited while retrieving App Configuration. Please wait a few minutes and try again. Contact support if the issue persists."}},ALERT_WARNINGS:{LOCAL_CONFIGURATION_IGNORED:{debugMessage:e=>`[Reown Config Notice] ${e}`},INACTIVE_NAMESPACE_NOT_CONNECTED:{code:"APKTW001",displayMessage:"Inactive Namespace Not Connected",debugMessage:(e,t)=>`An error occurred while connecting an inactive namespace ${e}: "${t}"`},INVALID_EMAIL:{code:"APKTW002",displayMessage:"Invalid Email Address",debugMessage:"Please enter a valid email address"}}}])},406066,e=>{"use strict";var t=e.i(450096),r=e.i(773434);let i={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}},a={56:"714",204:"714"};class o extends Error{}async function s(e,t){let i=function(){let{sdkType:e,sdkVersion:t,projectId:i}=r.OptionsController.getSnapshot(),a=new URL("https://rpc.walletconnect.org/v1/json-rpc");return a.searchParams.set("projectId",i),a.searchParams.set("st",e),a.searchParams.set("sv",t),a.searchParams.set("source","fund-wallet"),a.toString()}(),{projectId:a}=r.OptionsController.getSnapshot(),s={jsonrpc:"2.0",id:1,method:e,params:{...t||{},projectId:a}},n=await fetch(i,{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}),l=await n.json();if(l.error)throw new o(l.error.message);return l}async function n(e){return(await s("reown_getExchanges",e)).result}async function l(e){return(await s("reown_getExchangePayUrl",e)).result}async function c(e){return(await s("reown_getExchangeBuyStatus",e)).result}function d(e,r){let{chainNamespace:o,chainId:s}=t.ParseUtil.parseCaipNetworkId(e),n=i[o];if(!n)throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${o}`);let l=n.native.assetNamespace,c=n.native.assetReference;"native"!==r?(l=n.defaultTokenNamespace,c=r):"eip155"===o&&a[s]&&(c=a[s]);let d=`${o}:${s}`;return`${d}/${l}:${c}`}let p={network:"eip155:8453",asset:"0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},u={ethereumETH:{network:"eip155:1",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},baseETH:{network:"eip155:8453",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},baseUSDC:p,baseSepoliaETH:{network:"eip155:84532",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},ethereumUSDC:{network:"eip155:1",asset:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},arbitrumUSDC:{network:"eip155:42161",asset:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},polygonUSDC:{network:"eip155:137",asset:"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},solanaUSDC:{network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ethereumUSDT:{network:"eip155:1",asset:"0xdAC17F958D2ee523a2206206994597C13D831ec7",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},optimismUSDT:{network:"eip155:10",asset:"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},arbitrumUSDT:{network:"eip155:42161",asset:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},polygonUSDT:{network:"eip155:137",asset:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},solanaUSDT:{network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},solanaSOL:{network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"native",metadata:{name:"Solana",symbol:"SOL",decimals:9}}};function m(e){return Object.values(u).filter(t=>t.network===e)}e.s(["baseSepoliaUSDC",0,{network:"eip155:84532",asset:"0x036CbD53842c5426634e7929541eC2318f3dCF7e",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},"baseUSDC",0,p,"formatCaip19Asset",()=>d,"getBuyStatus",()=>c,"getExchanges",()=>n,"getPayUrl",()=>l,"getPaymentAssetsForNetwork",()=>m])},788517,e=>{"use strict";var t=e.i(407245),r=e.i(306925),i=e.i(282142),a=e.i(134848),o=e.i(604194),s=e.i(297807),n=e.i(406066),l=e.i(597614),c=e.i(516306),d=e.i(307713),p=e.i(773434),u=e.i(347771);let m={paymentAsset:null,amount:null,tokenAmount:0,priceLoading:!1,error:null,exchanges:[],isLoading:!1,currentPayment:void 0,isPaymentInProgress:!1,paymentId:"",assets:[]},h=(0,t.proxy)(m),g={state:h,subscribe:e=>(0,t.subscribe)(h,()=>e(h)),subscribeKey:(e,t)=>(0,r.subscribeKey)(h,e,t),resetState(){Object.assign(h,{...m})},async getAssetsForNetwork(e){let t=(0,n.getPaymentAssetsForNetwork)(e),r=await g.getAssetsImageAndPrice(t),i=t.map(e=>{let t="native"===e.asset?(0,a.getActiveNetworkTokenAddress)():`${e.network}:${e.asset}`,i=r.find(e=>e.fungibles?.[0]?.address?.toLowerCase()===t.toLowerCase());return{...e,price:i?.fungibles?.[0]?.price||1,metadata:{...e.metadata,iconUrl:i?.fungibles?.[0]?.iconUrl}}});return h.assets=i,i},async getAssetsImageAndPrice(e){let t=e.map(e=>"native"===e.asset?(0,a.getActiveNetworkTokenAddress)():`${e.network}:${e.asset}`);return await Promise.all(t.map(e=>l.BlockchainApiController.fetchTokenPrice({addresses:[e]})))},getTokenAmount(){if(!h?.paymentAsset?.price)throw Error("Cannot get token price");let e=i.NumberUtil.bigNumber(h.amount??0).round(8),t=i.NumberUtil.bigNumber(h.paymentAsset.price).round(8);return e.div(t).round(8).toNumber()},setAmount(e){h.amount=e,h.paymentAsset?.price&&(h.tokenAmount=g.getTokenAmount())},setPaymentAsset(e){h.paymentAsset=e},isPayWithExchangeEnabled:()=>p.OptionsController.state.remoteFeatures?.payWithExchange,isPayWithExchangeSupported:()=>g.isPayWithExchangeEnabled()&&c.ChainController.state.activeCaipNetwork&&o.ConstantsUtil.PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES.includes(c.ChainController.state.activeCaipNetwork.chainNamespace),async fetchExchanges(){try{let e=g.isPayWithExchangeSupported();if(!h.paymentAsset||!e){h.exchanges=[],h.isLoading=!1;return}h.isLoading=!0;let t=await (0,n.getExchanges)({page:0,asset:(0,n.formatCaip19Asset)(h.paymentAsset.network,h.paymentAsset.asset),amount:h.amount?.toString()??"0"});h.exchanges=t.exchanges.slice(0,2)}catch(e){throw u.SnackController.showError("Unable to get exchanges"),Error("Unable to get exchanges")}finally{h.isLoading=!1}},async getPayUrl(e,t){try{let r=Number(t.amount),i=await (0,n.getPayUrl)({exchangeId:e,asset:(0,n.formatCaip19Asset)(t.network,t.asset),amount:r.toString(),recipient:`${t.network}:${t.recipient}`});return d.EventsController.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{exchange:{id:e},configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:r},currentPayment:{type:"exchange",exchangeId:e},source:"fund-from-exchange",headless:!1}}),i}catch(e){if(e instanceof Error&&e.message.includes("is not supported"))throw Error("Asset not supported");throw Error(e.message)}},async handlePayWithExchange(e){try{let t=c.ChainController.getAccountData()?.address;if(!t)throw Error("No account connected");if(!h.paymentAsset)throw Error("No payment asset selected");let r=s.CoreHelperUtil.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!r)throw Error("Could not create popup window");h.isPaymentInProgress=!0,h.paymentId=crypto.randomUUID(),h.currentPayment={type:"exchange",exchangeId:e};let{network:i,asset:a}=h.paymentAsset,o={network:i,asset:a,amount:h.tokenAmount,recipient:t},n=await g.getPayUrl(e,o);if(!n){try{r.close()}catch(e){console.error("Unable to close popup window",e)}throw Error("Unable to initiate payment")}h.currentPayment.sessionId=n.sessionId,h.currentPayment.status="IN_PROGRESS",h.currentPayment.exchangeId=e,r.location.href=n.url}catch(e){h.error="Unable to initiate payment",u.SnackController.showError(h.error)}},async waitUntilComplete({exchangeId:e,sessionId:t,paymentId:r,retries:i=20}){let a=await g.getBuyStatus(e,t,r);if("SUCCESS"===a.status||"FAILED"===a.status)return a;if(0===i)throw Error("Unable to get deposit status");return await new Promise(e=>{setTimeout(e,5e3)}),g.waitUntilComplete({exchangeId:e,sessionId:t,paymentId:r,retries:i-1})},async getBuyStatus(e,t,r){try{if(!h.currentPayment)throw Error("No current payment");let i=await (0,n.getBuyStatus)({sessionId:t,exchangeId:e});if(h.currentPayment.status=i.status,"SUCCESS"===i.status||"FAILED"===i.status){let e=c.ChainController.getAccountData()?.address;h.currentPayment.result=i.txHash,h.isPaymentInProgress=!1,d.EventsController.sendEvent({type:"track",event:"SUCCESS"===i.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===i.status?s.CoreHelperUtil.parseError(h.error):void 0,source:"fund-from-exchange",paymentId:r,configuration:{network:h.paymentAsset?.network||"",asset:h.paymentAsset?.asset||"",recipient:e||"",amount:h.amount??0},currentPayment:{type:"exchange",exchangeId:h.currentPayment?.exchangeId,sessionId:h.currentPayment?.sessionId,result:i.txHash}}})}return i}catch(e){return{status:"UNKNOWN",txHash:""}}},reset(){h.currentPayment=void 0,h.isPaymentInProgress=!1,h.paymentId="",h.paymentAsset=null,h.amount=0,h.tokenAmount=0,h.priceLoading=!1,h.error=null,h.exchanges=[],h.isLoading=!1}};e.s(["ExchangeController",0,g])},1757,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var i=e.i(585408);e.i(569529);var a=e.i(134036),o=e.i(314351),s=e.i(39050),n=e.i(624851);let l=n.css`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
    border-radius: ${({borderRadius:e})=>e[16]};
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  :host([data-variant='generated']) {
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`;var c=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};let d=class extends t.LitElement{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0,this.size="xl"}render(){let e={inherit:"inherit",xxs:"3",xs:"5",sm:"6",md:"8",mdl:"8",lg:"10",xl:"16",xxl:"20"};return this.style.cssText=`
    --local-width: var(--apkt-spacing-${e[this.size??"xl"]});
    --local-height: var(--apkt-spacing-${e[this.size??"xl"]});
    `,r.html`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",r.html`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";let e=o.UiHelperUtil.generateAvatarColors(this.address);return this.style.cssText+=`
 ${e}`,null}return this.dataset.variant="default",null}};d.styles=[a.resetStyles,l],c([(0,i.property)()],d.prototype,"imageSrc",void 0),c([(0,i.property)()],d.prototype,"alt",void 0),c([(0,i.property)()],d.prototype,"address",void 0),c([(0,i.property)()],d.prototype,"size",void 0),d=c([(0,s.customElement)("wui-avatar")],d),e.s([],1757)},48706,e=>{"use strict";var t=e.i(407245),r=e.i(306925),i=e.i(452345),a=e.i(355736),o=e.i(773434);let s=(0,t.proxy)({message:"",variant:"info",open:!1}),n=(0,a.withErrorBoundary)({state:s,subscribeKey:(e,t)=>(0,r.subscribeKey)(s,e,t),open(e,t){let{debug:r}=o.OptionsController.state,{code:a,displayMessage:n,debugMessage:l}=e;if(n&&r&&(s.message=n,s.variant=t,s.open=!0),l){if(!i.ConstantsUtil.IS_DEVELOPMENT)return;let e="function"==typeof l?l():l,r=a?{code:a}:void 0;"error"===t?console.error(e,r):"warning"===t?console.warn(e,r):console.info(e,r)}},warn(e,t,r){s.open=!0,s.message=e,s.variant="warning",t&&console.warn(t,r)},close(){s.open=!1,s.message="",s.variant="info"}});e.s(["AlertController",0,n])},995278,e=>{"use strict";e.i(4892),e.s([])},21131,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var i=e.i(585408),a=e.i(282142);e.i(992074),e.i(569529),e.i(430210),e.i(308982);var o=e.i(134036),s=e.i(39050),n=e.i(624851);let l=n.css`
  :host {
    width: 100%;
  }

  button {
    padding: ${({spacing:e})=>e[3]};
    display: flex;
    gap: ${({spacing:e})=>e[3]};
    justify-content: space-between;
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    background-color: transparent;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: ${({spacing:e})=>e[10]};
    height: ${({spacing:e})=>e[10]};
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  .token-name-container {
    flex: 1;
  }
`;var c=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};let d=class extends t.LitElement{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1}render(){return r.html`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="2" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex
            flexDirection="column"
            justifyContent="space-between"
            gap="1"
            class="token-name-container"
          >
            <wui-text variant="md-regular" color="primary" lineClamp="1">
              ${this.tokenName}
            </wui-text>
            <wui-text variant="sm-regular-mono" color="secondary">
              ${a.NumberUtil.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          justifyContent="space-between"
          gap="1"
          alignItems="flex-end"
          width="auto"
        >
          <wui-text variant="md-regular-mono" color="primary"
            >$${this.tokenValue.toFixed(2)}</wui-text
          >
          <wui-text variant="sm-regular-mono" color="secondary">
            ${a.NumberUtil.formatNumberToLocalString(this.tokenAmount,4)}
          </wui-text>
        </wui-flex>
      </button>
    `}visualTemplate(){return this.tokenName&&this.tokenImageUrl?r.html`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`:r.html`<wui-icon name="coinPlaceholder" color="default"></wui-icon>`}};d.styles=[o.resetStyles,o.elementStyles,l],c([(0,i.property)()],d.prototype,"tokenName",void 0),c([(0,i.property)()],d.prototype,"tokenImageUrl",void 0),c([(0,i.property)({type:Number})],d.prototype,"tokenValue",void 0),c([(0,i.property)()],d.prototype,"tokenAmount",void 0),c([(0,i.property)()],d.prototype,"tokenCurrency",void 0),c([(0,i.property)({type:Boolean})],d.prototype,"clickable",void 0),d=c([(0,s.customElement)("wui-list-token")],d),e.s([],21131)},297009,e=>{"use strict";e.i(195126);var t,r,i=e.i(996838),a=e.i(850980);e.i(775353);var o=e.i(585408),s=e.i(702599),n=e.i(627041),l=e.i(516306),c=e.i(297807),d=e.i(307713),p=e.i(773434),u=e.i(291219),m=e.i(254801),h=e.i(134848);e.i(520758);var g=e.i(947356),y=e.i(39050);e.i(334807),e.i(915118),e.i(711844),e.i(296113);var w=i;e.i(783601);var f=e.i(525559);e.i(430210);var x=e.i(134036);(t=r||(r={})).approve="approved",t.bought="bought",t.borrow="borrowed",t.burn="burnt",t.cancel="canceled",t.claim="claimed",t.deploy="deployed",t.deposit="deposited",t.execute="executed",t.mint="minted",t.receive="received",t.repay="repaid",t.send="sent",t.sell="sold",t.stake="staked",t.trade="swapped",t.unstake="unstaked",t.withdraw="withdrawn";var b=i;e.i(992074),e.i(569529),e.i(67356);var v=e.i(624851);let C=v.css`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-no-images='true']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]} !important;
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }

  .swap-fallback-container {
    position: absolute;
    inset: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swap-fallback-container.first {
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-fallback-container.last {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }

  wui-flex.status-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
    border-radius: ${({borderRadius:e})=>e[4]};
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.theme.backgroundPrimary};
    overflow: hidden;
    width: 16px;
    height: 16px;
  }
`;var k=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};let T=class extends b.LitElement{constructor(){super(...arguments),this.images=[],this.secondImage={type:void 0,url:""},this.failedImageUrls=new Set}handleImageError(e){return t=>{t.stopPropagation(),this.failedImageUrls.add(e),this.requestUpdate()}}render(){let[e,t]=this.images;this.images.length||(this.dataset.noImages="true");let r=e?.type==="NFT",i=t?.url?"NFT"===t.type:r;return this.style.cssText=`
    --local-left-border-radius: ${r?"var(--apkt-borderRadius-3)":"var(--apkt-borderRadius-5)"};
    --local-right-border-radius: ${i?"var(--apkt-borderRadius-3)":"var(--apkt-borderRadius-5)"};
    `,a.html`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`}templateVisual(){let[e,t]=this.images;return 2===this.images.length&&(e?.url||t?.url)?this.renderSwapImages(e,t):e?.url&&!this.failedImageUrls.has(e.url)?this.renderSingleImage(e):e?.type==="NFT"?this.renderPlaceholderIcon("nftPlaceholder"):this.renderPlaceholderIcon("coinPlaceholder")}renderSwapImages(e,t){return a.html`<div class="swap-images-container">
      ${e?.url?this.renderImageOrFallback(e,"first",!0):null}
      ${t?.url?this.renderImageOrFallback(t,"last",!0):null}
    </div>`}renderSingleImage(e){return this.renderImageOrFallback(e,void 0,!1)}renderImageOrFallback(e,t,r=!1){return e.url?this.failedImageUrls.has(e.url)?r&&t?this.renderFallbackIconInContainer(t):this.renderFallbackIcon():a.html`<wui-image
      src=${e.url}
      alt="Transaction image"
      @onLoadError=${this.handleImageError(e.url)}
    ></wui-image>`:null}renderFallbackIconInContainer(e){return a.html`<div class="swap-fallback-container ${e}">${this.renderFallbackIcon()}</div>`}renderFallbackIcon(){return a.html`<wui-icon
      size="xl"
      weight="regular"
      color="default"
      name="networkPlaceholder"
    ></wui-icon>`}renderPlaceholderIcon(e){return a.html`<wui-icon size="xl" weight="regular" color="default" name=${e}></wui-icon>`}templateIcon(){let e,t="accent-primary";return(e=this.getIcon(),this.status&&(t=this.getStatusColor()),e)?a.html`
      <wui-flex alignItems="center" justifyContent="center" class="status-box">
        <wui-icon-box size="sm" color=${t} icon=${e}></wui-icon-box>
      </wui-flex>
    `:null}getDirectionIcon(){switch(this.direction){case"in":return"arrowBottom";case"out":return"arrowTop";default:return}}getIcon(){return this.onlyDirectionIcon?this.getDirectionIcon():"trade"===this.type?"swapHorizontal":"approve"===this.type?"checkmark":"cancel"===this.type?"close":this.getDirectionIcon()}getStatusColor(){switch(this.status){case"confirmed":return"success";case"failed":return"error";case"pending":return"inverse";default:return"accent-primary"}}};T.styles=[C],k([(0,o.property)()],T.prototype,"type",void 0),k([(0,o.property)()],T.prototype,"status",void 0),k([(0,o.property)()],T.prototype,"direction",void 0),k([(0,o.property)({type:Boolean})],T.prototype,"onlyDirectionIcon",void 0),k([(0,o.property)({type:Array})],T.prototype,"images",void 0),k([(0,o.property)({type:Object})],T.prototype,"secondImage",void 0),k([(0,s.state)()],T.prototype,"failedImageUrls",void 0),T=k([(0,y.customElement)("wui-transaction-visual")],T);let E=v.css`
  :host {
    width: 100%;
  }

  :host > wui-flex:first-child {
    align-items: center;
    column-gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;var I=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};let A=class extends w.LitElement{constructor(){super(...arguments),this.type="approve",this.onlyDirectionIcon=!1,this.images=[]}render(){return a.html`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${(0,f.ifDefined)(this.direction)}
          type=${this.type}
          .onlyDirectionIcon=${this.onlyDirectionIcon}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="lg-medium" color="primary">
            ${r[this.type]||this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="sm-medium" color="secondary"><span>${this.date}</span></wui-text>
      </wui-flex>
    `}templateDescription(){let e=this.descriptions?.[0];return e?a.html`
          <wui-text variant="md-regular" color="secondary">
            <span>${e}</span>
          </wui-text>
        `:null}templateSecondDescription(){let e=this.descriptions?.[1];return e?a.html`
          <wui-icon class="description-separator-icon" size="sm" name="arrowRight"></wui-icon>
          <wui-text variant="md-regular" color="secondary">
            <span>${e}</span>
          </wui-text>
        `:null}};A.styles=[x.resetStyles,E],I([(0,o.property)()],A.prototype,"type",void 0),I([(0,o.property)({type:Array})],A.prototype,"descriptions",void 0),I([(0,o.property)()],A.prototype,"date",void 0),I([(0,o.property)({type:Boolean})],A.prototype,"onlyDirectionIcon",void 0),I([(0,o.property)()],A.prototype,"status",void 0),I([(0,o.property)()],A.prototype,"direction",void 0),I([(0,o.property)({type:Array})],A.prototype,"images",void 0),A=I([(0,y.customElement)("wui-transaction-list-item")],A);var P=i;e.i(580258),e.i(308982);var $=i;let S=v.css`
  wui-flex {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e[128]};
  }

  .fallback-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
    border-radius: ${({borderRadius:e})=>e[3]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .direction-icon,
  .status-image {
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: ${({borderRadius:e})=>e[128]};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .direction-icon {
    padding: ${({spacing:e})=>e["01"]};
    color: ${({tokens:e})=>e.core.iconSuccess};

    background-color: color-mix(
      in srgb,
      ${({tokens:e})=>e.core.textSuccess} 30%,
      ${({tokens:e})=>e.theme.backgroundPrimary} 70%
    );
  }

  /* -- Sizes --------------------------------------------------- */
  :host([data-size='sm']) > wui-image:not(.status-image),
  :host([data-size='sm']) > wui-flex {
    width: 24px;
    height: 24px;
  }

  :host([data-size='lg']) > wui-image:not(.status-image),
  :host([data-size='lg']) > wui-flex {
    width: 40px;
    height: 40px;
  }

  :host([data-size='sm']) .fallback-icon {
    height: 16px;
    width: 16px;
    padding: ${({spacing:e})=>e[1]};
  }

  :host([data-size='lg']) .fallback-icon {
    height: 32px;
    width: 32px;
    padding: ${({spacing:e})=>e[1]};
  }

  :host([data-size='sm']) .direction-icon,
  :host([data-size='sm']) .status-image {
    transform: translate(40%, 30%);
  }

  :host([data-size='lg']) .direction-icon,
  :host([data-size='lg']) .status-image {
    transform: translate(40%, 10%);
  }

  :host([data-size='sm']) .status-image {
    height: 14px;
    width: 14px;
  }

  :host([data-size='lg']) .status-image {
    height: 20px;
    width: 20px;
  }

  /* -- Crop effects --------------------------------------------------- */
  .swap-crop-left-image,
  .swap-crop-right-image {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .swap-crop-left-image {
    left: 0;
    clip-path: inset(0px calc(50% + 1.5px) 0px 0%);
  }

  .swap-crop-right-image {
    right: 0;
    clip-path: inset(0px 0px 0px calc(50% + 1.5px));
  }
`;var D=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};let U={sm:"xxs",lg:"md"},N=class extends $.LitElement{constructor(){super(...arguments),this.type="approve",this.size="lg",this.statusImageUrl="",this.images=[]}render(){return a.html`<wui-flex>${this.templateVisual()} ${this.templateIcon()}</wui-flex>`}templateVisual(){switch(this.dataset.size=this.size,this.type){case"trade":return this.swapTemplate();case"fiat":return this.fiatTemplate();case"unknown":return this.unknownTemplate();default:return this.tokenTemplate()}}swapTemplate(){let[e,t]=this.images;return 2===this.images.length&&(e||t)?a.html`
        <wui-image class="swap-crop-left-image" src=${e} alt="Swap image"></wui-image>
        <wui-image class="swap-crop-right-image" src=${t} alt="Swap image"></wui-image>
      `:e?a.html`<wui-image src=${e} alt="Swap image"></wui-image>`:null}fiatTemplate(){return a.html`<wui-icon
      class="fallback-icon"
      size=${U[this.size]}
      name="dollar"
    ></wui-icon>`}unknownTemplate(){return a.html`<wui-icon
      class="fallback-icon"
      size=${U[this.size]}
      name="questionMark"
    ></wui-icon>`}tokenTemplate(){let[e]=this.images;return e?a.html`<wui-image src=${e} alt="Token image"></wui-image> `:a.html`<wui-icon
      class="fallback-icon"
      name=${"nft"===this.type?"image":"coinPlaceholder"}
    ></wui-icon>`}templateIcon(){return this.statusImageUrl?a.html`<wui-image
        class="status-image"
        src=${this.statusImageUrl}
        alt="Status image"
      ></wui-image>`:a.html`<wui-icon
      class="direction-icon"
      size=${U[this.size]}
      name=${this.getTemplateIcon()}
    ></wui-icon>`}getTemplateIcon(){return"trade"===this.type?"arrowClockWise":"arrowBottom"}};N.styles=[S],D([(0,o.property)()],N.prototype,"type",void 0),D([(0,o.property)()],N.prototype,"size",void 0),D([(0,o.property)()],N.prototype,"statusImageUrl",void 0),D([(0,o.property)({type:Array})],N.prototype,"images",void 0),N=D([(0,y.customElement)("wui-transaction-thumbnail")],N);let O=v.css`
  :host > wui-flex:first-child {
    gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`,R=class extends P.LitElement{render(){return a.html`
      <wui-flex alignItems="center" .padding=${["1","2","1","2"]}>
        <wui-shimmer width="40px" height="40px" rounded></wui-shimmer>
        <wui-flex flexDirection="column" gap="1">
          <wui-shimmer width="124px" height="16px" rounded></wui-shimmer>
          <wui-shimmer width="60px" height="14px" rounded></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" rounded></wui-shimmer>
      </wui-flex>
    `}};R.styles=[x.resetStyles,O],R=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s}([(0,y.customElement)("wui-transaction-list-item-loader")],R);var _=e.i(375790);let L=v.css`
  :host {
    min-height: 100%;
  }

  .group-container[last-group='true'] {
    padding-bottom: ${({spacing:e})=>e["3"]};
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:e})=>e["3"]};
  }

  .contentContainer > .textContent {
    width: 65%;
  }

  .emptyContainer {
    height: 100%;
  }
`;var j=function(e,t,r,i){var a,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,r,s):a(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};let F="last-transaction",z=class extends i.LitElement{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.page="activity",this.caipAddress=l.ChainController.state.activeCaipAddress,this.transactionsByYear=m.TransactionsController.state.transactionsByYear,this.loading=m.TransactionsController.state.loading,this.empty=m.TransactionsController.state.empty,this.next=m.TransactionsController.state.next,m.TransactionsController.clearCursor(),this.unsubscribe.push(l.ChainController.subscribeKey("activeCaipAddress",e=>{e&&this.caipAddress!==e&&(m.TransactionsController.resetTransactions(),m.TransactionsController.fetchTransactions(e)),this.caipAddress=e}),l.ChainController.subscribeKey("activeCaipNetwork",()=>{this.updateTransactionView()}),m.TransactionsController.subscribe(e=>{this.transactionsByYear=e.transactionsByYear,this.loading=e.loading,this.empty=e.empty,this.next=e.next}))}firstUpdated(){this.updateTransactionView(),this.createPaginationObserver()}updated(){this.setPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return a.html` ${this.empty?null:this.templateTransactionsByYear()}
    ${this.loading?this.templateLoading():null}
    ${!this.loading&&this.empty?this.templateEmpty():null}`}updateTransactionView(){m.TransactionsController.resetTransactions(),this.caipAddress&&m.TransactionsController.fetchTransactions(c.CoreHelperUtil.getPlainAddress(this.caipAddress))}templateTransactionsByYear(){return Object.keys(this.transactionsByYear).sort().reverse().map(e=>{let t=parseInt(e,10),r=Array(12).fill(null).map((e,r)=>({groupTitle:g.TransactionUtil.getTransactionGroupTitle(t,r),transactions:this.transactionsByYear[t]?.[r]})).filter(({transactions:e})=>e).reverse();return r.map(({groupTitle:e,transactions:t},i)=>{let o=i===r.length-1;return t?a.html`
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${o?"true":"false"}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["2","3","3","3"]}
            >
              <wui-text variant="md-medium" color="secondary" data-testid="group-title">
                ${e}
              </wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="2">
              ${this.templateTransactions(t,o)}
            </wui-flex>
          </wui-flex>
        `:null})})}templateRenderTransaction(e,t){let{date:r,descriptions:i,direction:o,images:s,status:n,type:l,transfers:c,isAllNFT:d}=this.getTransactionListItemProps(e);return a.html`
      <wui-transaction-list-item
        date=${r}
        .direction=${o}
        id=${t&&this.next?F:""}
        status=${n}
        type=${l}
        .images=${s}
        .onlyDirectionIcon=${d||1===c.length}
        .descriptions=${i}
      ></wui-transaction-list-item>
    `}templateTransactions(e,t){return e.map((r,i)=>{let o=t&&i===e.length-1;return a.html`${this.templateRenderTransaction(r,o)}`})}emptyStateActivity(){return a.html`<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${["10","5","10","5"]}
      gap="5"
      data-testid="empty-activity-state"
    >
      <wui-icon-box color="default" icon="wallet" size="xl"></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="2">
        <wui-text align="center" variant="lg-medium" color="primary">No Transactions yet</wui-text>
        <wui-text align="center" variant="lg-regular" color="secondary"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`}emptyStateAccount(){return a.html`<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="4"
      data-testid="empty-account-state"
    >
      <wui-icon-box icon="swapHorizontal" size="lg" color="default"></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="2"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="md-regular" align="center" color="primary">No activity yet</wui-text>
        <wui-text variant="sm-regular" align="center" color="secondary"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`}templateEmpty(){return"account"===this.page?a.html`${this.emptyStateAccount()}`:a.html`${this.emptyStateActivity()}`}templateLoading(){return"activity"===this.page?a.html` <wui-flex flexDirection="column" width="100%">
        <wui-flex .padding=${["2","3","3","3"]}>
          <wui-shimmer width="70px" height="16px" rounded></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2" width="100%">
          ${Array(7).fill(a.html` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map(e=>e)}
        </wui-flex>
      </wui-flex>`:null}onReceiveClick(){u.RouterController.push("WalletReceive")}createPaginationObserver(){let{projectId:e}=p.OptionsController.state;this.paginationObserver=new IntersectionObserver(([t])=>{t?.isIntersecting&&!this.loading&&(m.TransactionsController.fetchTransactions(c.CoreHelperUtil.getPlainAddress(this.caipAddress)),d.EventsController.sendEvent({type:"track",event:"LOAD_MORE_TRANSACTIONS",properties:{address:c.CoreHelperUtil.getPlainAddress(this.caipAddress),projectId:e,cursor:this.next,isSmartAccount:(0,h.getPreferredAccountType)(l.ChainController.state.activeChain)===_.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}))},{}),this.setPaginationObserver()}setPaginationObserver(){this.paginationObserver?.disconnect();let e=this.shadowRoot?.querySelector(`#${F}`);e&&this.paginationObserver?.observe(e)}getTransactionListItemProps(e){let t=n.DateUtil.formatDate(e?.metadata?.minedAt),r=g.TransactionUtil.mergeTransfers(e?.transfers||[]),i=g.TransactionUtil.getTransactionDescriptions(e,r),a=r?.[0],o=!!a&&r?.every(e=>!!e.nft_info),s=g.TransactionUtil.getTransactionImages(r);return{date:t,direction:a?.direction,descriptions:i,isAllNFT:o,images:s,status:e.metadata?.status,transfers:r,type:e.metadata?.operationType}}};z.styles=L,j([(0,o.property)()],z.prototype,"page",void 0),j([(0,s.state)()],z.prototype,"caipAddress",void 0),j([(0,s.state)()],z.prototype,"transactionsByYear",void 0),j([(0,s.state)()],z.prototype,"loading",void 0),j([(0,s.state)()],z.prototype,"empty",void 0),j([(0,s.state)()],z.prototype,"next",void 0),z=j([(0,y.customElement)("w3m-activity-list")],z),e.s([],297009)}]);

//# debugId=367f4f23-e6ec-8df2-f3c3-ed7957835676
//# sourceMappingURL=c48d7e401359f471.js.map
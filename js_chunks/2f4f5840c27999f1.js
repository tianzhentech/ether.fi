;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="2bfcfa79-a709-32f3-800e-513f3be22e59")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,603368,656378,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var i=e.i(585408),o=e.i(702599),n=e.i(545478),a=e.i(291219),s=e.i(407245),l=e.i(306925),c=e.i(355736);let w=(0,s.proxy)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),u=(0,c.withErrorBoundary)({state:w,subscribe:e=>(0,s.subscribe)(w,()=>e(w)),subscribeKey:(e,t)=>(0,l.subscribeKey)(w,e,t),showTooltip({message:e,triggerRect:t,variant:r}){w.open=!0,w.message=e,w.triggerRect=t,w.variant=r},hide(){w.open=!1,w.message="",w.triggerRect={width:0,height:0,top:0,left:0}}});e.i(520758);var m=e.i(39050),d=e.i(983064);let p=d.css`
  :host {
    width: 100%;
    display: block;
  }
`;var h=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let v=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.text="",this.open=u.state.open,this.unsubscribe.push(a.RouterController.subscribeKey("view",()=>{u.hide()}),n.ModalController.subscribeKey("open",e=>{e||u.hide()}),u.subscribeKey("open",e=>{this.open=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),u.hide()}render(){return r.html`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return r.html`<slot></slot> `}onMouseEnter(){let e=this.getBoundingClientRect();if(!this.open){let t=document.querySelector("w3m-modal"),r={width:e.width,height:e.height,left:e.left,top:e.top};if(t){let i=t.getBoundingClientRect();r.left=e.left-(window.innerWidth-i.width)/2,r.top=e.top-(window.innerHeight-i.height)/2}u.showTooltip({message:this.text,triggerRect:r,variant:"shade"})}}onMouseLeave(e){this.contains(e.relatedTarget)||u.hide()}};v.styles=[p],h([(0,i.property)()],v.prototype,"text",void 0),h([(0,o.state)()],v.prototype,"open",void 0),v=h([(0,m.customElement)("w3m-tooltip-trigger")],v),e.s([],603368);var g=t;e.i(334807),e.i(152462),e.i(296113);var f=e.i(624851);let C=f.css`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:e})=>e["3"]} 10px ${({spacing:e})=>e["3"]};
    border-radius: ${({borderRadius:e})=>e["3"]};
    color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:e})=>e["5"]});
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var y=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let b=class extends g.LitElement{constructor(){super(),this.unsubscribe=[],this.open=u.state.open,this.message=u.state.message,this.triggerRect=u.state.triggerRect,this.variant=u.state.variant,this.unsubscribe.push(u.subscribe(e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){this.dataset.variant=this.variant;let e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${e}px;
    --w3m-tooltip-left: ${t}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${+!!this.open};
    `,r.html`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};b.styles=[C],y([(0,o.state)()],b.prototype,"open",void 0),y([(0,o.state)()],b.prototype,"message",void 0),y([(0,o.state)()],b.prototype,"triggerRect",void 0),y([(0,o.state)()],b.prototype,"variant",void 0),b=y([(0,m.customElement)("w3m-tooltip")],b),e.s([],656378)},585342,e=>{"use strict";e.i(126987);var t=e.i(452345),r=e.i(450096),i=e.i(375790),o=e.i(516306),n=e.i(585767),a=e.i(155853),s=e.i(307713),l=e.i(545478),c=e.i(773434),w=e.i(291219),u=e.i(347771),m=e.i(134848),d=e.i(297807);let p=null,h={getSIWX:()=>c.OptionsController.state.siwx,async initializeIfEnabled(e=o.ChainController.getActiveCaipAddress()){let t=c.OptionsController.state.siwx;if(!(t&&e))return;let[r,i,a]=e.split(":");if(o.ChainController.checkIfSupportedNetwork(r,`${r}:${i}`))try{if(c.OptionsController.state.remoteFeatures?.emailCapture){let e=o.ChainController.getAccountData(r)?.user;await l.ModalController.open({view:"DataCapture",data:{email:e?.email??void 0}});return}if(p&&await p,(await t.getSessions(`${r}:${i}`,a)).length)return;await l.ModalController.open({view:"SIWXSignMessage"})}catch(e){console.error("SIWXUtil:initializeIfEnabled",e),s.EventsController.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:this.getSIWXEventProperties(e)}),await n.ConnectionController._getClient()?.disconnect().catch(console.error),w.RouterController.reset("Connect"),u.SnackController.showError("A problem occurred while trying initialize authentication")}},async isAuthenticated(e=o.ChainController.getActiveCaipAddress()){if(!c.OptionsController.state.siwx||!e)return!0;let{chainNamespace:t,chainId:i,address:n}=r.ParseUtil.parseCaipAddress(e),a=`${t}:${i}`;return(await h.getSessions({address:n,caipNetworkId:a})).length>0},async requestSignMessage(){let e=c.OptionsController.state.siwx,r=d.CoreHelperUtil.getPlainAddress(o.ChainController.getActiveCaipAddress()),i=(0,m.getActiveCaipNetwork)();if(!e)throw Error("SIWX is not enabled");if(!r)throw Error("No ActiveCaipAddress found");if(!i)throw Error("No ActiveCaipNetwork or client found");try{let c=await e.createMessage({chainId:i.caipNetworkId,accountAddress:r}),u=c.toString(),m="";e.signMessage?m=await e.signMessage({message:u,chainId:i.caipNetworkId,accountAddress:r}):(a.ConnectorController.getConnectorId(i.chainNamespace)===t.ConstantsUtil.CONNECTOR_ID.AUTH&&w.RouterController.pushTransactionStack({}),m=await n.ConnectionController.signMessage(u)||""),await e.addSession({data:c,message:u,signature:m}),o.ChainController.setLastConnectedSIWECaipNetwork(i),l.ModalController.close(),s.EventsController.sendEvent({type:"track",event:"SIWX_AUTH_SUCCESS",properties:this.getSIWXEventProperties()})}catch(e){l.ModalController.state.open&&"ApproveTransaction"!==w.RouterController.state.view||await l.ModalController.open({view:"SIWXSignMessage"}),u.SnackController.showError("Error signing message"),s.EventsController.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:this.getSIWXEventProperties(e)}),console.error("SWIXUtil:requestSignMessage",e)}},async cancelSignMessage(){try{let e=this.getSIWX();if(e?.getRequired?.()){let t=o.ChainController.getLastConnectedSIWECaipNetwork();if(t){let r=await e?.getSessions(t?.caipNetworkId,d.CoreHelperUtil.getPlainAddress(o.ChainController.getActiveCaipAddress())||"");r&&r.length>0?await o.ChainController.switchActiveNetwork(t):await n.ConnectionController.disconnect()}else await n.ConnectionController.disconnect()}else l.ModalController.close();l.ModalController.close(),s.EventsController.sendEvent({event:"CLICK_CANCEL_SIWX",type:"track",properties:this.getSIWXEventProperties()})}catch(e){console.error("SIWXUtil:cancelSignMessage",e)}},async getAllSessions(){let e=this.getSIWX(),t=o.ChainController.getAllRequestedCaipNetworks(),r=[];return await Promise.all(t.map(async t=>{let i=await e?.getSessions(t.caipNetworkId,d.CoreHelperUtil.getPlainAddress(o.ChainController.getActiveCaipAddress())||"");i&&r.push(...i)})),r},async getSessions(e){let t=c.OptionsController.state.siwx,r=e?.address;if(!r){let e=o.ChainController.getActiveCaipAddress();r=d.CoreHelperUtil.getPlainAddress(e)}let i=e?.caipNetworkId;if(!i){let e=o.ChainController.getActiveCaipNetwork();i=e?.caipNetworkId}return t&&r&&i?t.getSessions(i,r):[]},async isSIWXCloseDisabled(){let e=this.getSIWX();if(e){let t="ApproveTransaction"===w.RouterController.state.view,r="SIWXSignMessage"===w.RouterController.state.view;if(t||r)return e.getRequired?.()&&0===(await this.getSessions()).length}return!1},async authConnectorAuthenticate({authConnector:e,chainId:r,socialUri:i,preferredAccountType:n,chainNamespace:a}){let s=h.getSIWX(),l=(0,m.getActiveCaipNetwork)();if(!s||!a.includes(t.ConstantsUtil.CHAIN.EVM)||c.OptionsController.state.remoteFeatures?.emailCapture){let t=await e.connect({chainId:r,socialUri:i,preferredAccountType:n});return{address:t.address,chainId:t.chainId,accounts:t.accounts}}let w=`${a}:${r}`,u=await s.createMessage({chainId:w,accountAddress:"<<AccountAddress>>"}),d={accountAddress:u.accountAddress,chainId:u.chainId,domain:u.domain,uri:u.uri,version:u.version,nonce:u.nonce,notBefore:u.notBefore,statement:u.statement,resources:u.resources,requestId:u.requestId,issuedAt:u.issuedAt,expirationTime:u.expirationTime,serializedMessage:u.toString()},p=await e.connect({chainId:r,socialUri:i,siwxMessage:d,preferredAccountType:n});if(d.accountAddress=p.address,d.serializedMessage=p.message||"",p.signature&&p.message){let e=h.addEmbeddedWalletSession(d,p.message,p.signature);await e}return o.ChainController.setLastConnectedSIWECaipNetwork(l),{address:p.address,chainId:p.chainId,accounts:p.accounts}},async addEmbeddedWalletSession(e,t,r){if(p)return p;let i=h.getSIWX();return i?p=i.addSession({data:e,message:t,signature:r}).finally(()=>{p=null}):Promise.resolve()},async universalProviderAuthenticate({universalProvider:e,chains:t,methods:r}){let i=h.getSIWX(),n=(0,m.getActiveCaipNetwork)(),a=new Set(t.map(e=>e.split(":")[0]));if(!i||1!==a.size||!a.has("eip155"))return!1;let l=await i.createMessage({chainId:(0,m.getActiveCaipNetwork)()?.caipNetworkId||"",accountAddress:""}),c=await e.authenticate({nonce:l.nonce,domain:l.domain,uri:l.uri,exp:l.expirationTime,iat:l.issuedAt,nbf:l.notBefore,requestId:l.requestId,version:l.version,resources:l.resources,statement:l.statement,chainId:l.chainId,methods:r,chains:[l.chainId,...t.filter(e=>e!==l.chainId)]});u.SnackController.showLoading("Authenticating...",{autoClose:!1});let w={...c.session.peer.metadata,name:c.session.peer.metadata.name,icon:c.session.peer.metadata.icons?.[0],type:"WALLET_CONNECT"};if(o.ChainController.setAccountProp("connectedWalletInfo",w,Array.from(a)[0]),c?.auths?.length){let t=c.auths.map(t=>{let r=e.client.formatAuthMessage({request:t.p,iss:t.p.iss});return{data:{...t.p,accountAddress:t.p.iss.split(":").slice(-1).join(""),chainId:t.p.iss.split(":").slice(2,4).join(":"),uri:t.p.aud??"",version:t.p.version||l.version,expirationTime:t.p.exp,issuedAt:t.p.iat,notBefore:t.p.nbf},message:r,signature:t.s.s,cacao:t}});try{await i.setSessions(t),n&&o.ChainController.setLastConnectedSIWECaipNetwork(n),s.EventsController.sendEvent({type:"track",event:"SIWX_AUTH_SUCCESS",properties:h.getSIWXEventProperties()})}catch(t){throw console.error("SIWX:universalProviderAuth - failed to set sessions",t),s.EventsController.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:h.getSIWXEventProperties(t)}),await e.disconnect().catch(console.error),t}finally{u.SnackController.hide()}}return!0},getSIWXEventProperties(e){let t=o.ChainController.state.activeChain;if(!t)throw Error("SIWXUtil:getSIWXEventProperties - namespace is required");return{network:o.ChainController.state.activeCaipNetwork?.caipNetworkId||"",isSmartAccount:(0,m.getPreferredAccountType)(t)===i.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,message:e?d.CoreHelperUtil.parseError(e):void 0}},async clearSessions(){let e=this.getSIWX();e&&await e.setSessions([])}};e.s(["SIWXUtil",0,h])},214539,e=>{"use strict";var t=e.i(452345),r=e.i(773434),i=e.i(291219),o=e.i(992497);e.s(["HelpersUtil",0,{getTabsByNamespace:e=>e&&e===t.ConstantsUtil.CHAIN.EVM?r.OptionsController.state.remoteFeatures?.activity===!1?o.ConstantsUtil.ACCOUNT_TABS.filter(e=>"Activity"!==e.label):o.ConstantsUtil.ACCOUNT_TABS:[],isValidReownName:e=>/^[a-zA-Z0-9]+$/gu.test(e),isValidEmail:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/gu.test(e),validateReownName:e=>e.replace(/\^/gu,"").toLowerCase().replace(/[^a-zA-Z0-9]/gu,""),hasFooter(){let e=i.RouterController.state.view;if(o.ConstantsUtil.VIEWS_WITH_LEGAL_FOOTER.includes(e)){let{termsConditionsUrl:e,privacyPolicyUrl:t}=r.OptionsController.state,i=r.OptionsController.state.features?.legalCheckbox;return(!!e||!!t)&&!i}return o.ConstantsUtil.VIEWS_WITH_DEFAULT_FOOTER.includes(e)}}])},992497,e=>{"use strict";var t=e.i(307845);let r={ACCOUNT_TABS:[{label:"Tokens"},{label:"Activity"}],SECURE_SITE_ORIGIN:(void 0!==t.default&&void 0!==t.default.env?t.default.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",VIEW_DIRECTION:{Next:"next",Prev:"prev"},ANIMATION_DURATIONS:{HeaderText:120,ModalHeight:150,ViewTransition:150},VIEWS_WITH_LEGAL_FOOTER:["Connect","ConnectWallets","OnRampTokenSelect","OnRampFiatSelect","OnRampProviders"],VIEWS_WITH_DEFAULT_FOOTER:["Networks"]};e.s(["ConstantsUtil",0,r])},648812,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var i=e.i(585408);e.i(992074),e.i(430210);var o=e.i(134036),n=e.i(39050),a=e.i(624851);let s=a.css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    text-transform: uppercase;
    white-space: nowrap;
  }

  :host([data-variant='accent']) {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  :host([data-variant='info']) {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-variant='success']) {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    color: ${({tokens:e})=>e.core.textSuccess};
  }

  :host([data-variant='warning']) {
    background-color: ${({tokens:e})=>e.core.backgroundWarning};
    color: ${({tokens:e})=>e.core.textWarning};
  }

  :host([data-variant='error']) {
    background-color: ${({tokens:e})=>e.core.backgroundError};
    color: ${({tokens:e})=>e.core.textError};
  }

  :host([data-variant='certified']) {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-size='md']) {
    height: 30px;
    padding: 0 ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-size='sm']) {
    height: 20px;
    padding: 0 ${({spacing:e})=>e[1]};
    border-radius: ${({borderRadius:e})=>e[1]};
  }
`;var l=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let c=class extends t.LitElement{constructor(){super(...arguments),this.variant="accent",this.size="md",this.icon=void 0}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;let e="md"===this.size?"md-medium":"sm-medium",t="md"===this.size?"md":"sm";return r.html`
      ${this.icon?r.html`<wui-icon size=${t} name=${this.icon}></wui-icon>`:null}
      <wui-text
        display="inline"
        data-variant=${this.variant}
        variant=${e}
        color="inherit"
      >
        <slot></slot>
      </wui-text>
    `}};c.styles=[o.resetStyles,s],l([(0,i.property)()],c.prototype,"variant",void 0),l([(0,i.property)()],c.prototype,"size",void 0),l([(0,i.property)()],c.prototype,"icon",void 0),c=l([(0,n.customElement)("wui-tag")],c),e.s([],648812)},938626,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var i=e.i(702599),o=e.i(773434);e.i(520758);var n=e.i(39050);e.i(334807),e.i(296113),e.i(300622);var a=e.i(624851);let s=a.css`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({spacing:e})=>e["3"]};
  }

  a {
    text-decoration: none;
    color: ${({tokens:e})=>e.core.textAccentPrimary};
    font-weight: 500;
  }
`;var l=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let c=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=o.OptionsController.state.remoteFeatures,this.unsubscribe.push(o.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=o.OptionsController.state,i=o.OptionsController.state.features?.legalCheckbox;return(e||t)&&!i?r.html`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4","3","3","3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `:r.html`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `}andTemplate(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=o.OptionsController.state;return e&&t?"and":""}termsTemplate(){let{termsConditionsUrl:e}=o.OptionsController.state;return e?r.html`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){let{privacyPolicyUrl:e}=o.OptionsController.state;return e?r.html`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(e=!1){return this.remoteFeatures?.reownBranding?e?r.html`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:r.html`<wui-ux-by-reown></wui-ux-by-reown>`:null}};c.styles=[s],l([(0,i.state)()],c.prototype,"remoteFeatures",void 0),c=l([(0,n.customElement)("w3m-legal-footer")],c),e.s([],938626)},259410,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980),i=e.i(516306),o=e.i(307713),n=e.i(773434),a=e.i(291219),s=e.i(134848);e.i(520758);var l=e.i(39050);e.i(334807),e.i(152462),e.i(711844),e.i(296113);var c=e.i(375790),w=e.i(983064);let u=w.css``,m=class extends t.LitElement{render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.OptionsController.state;return e||t?r.html`
      <wui-flex
        .padding=${["4","3","3","3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return r.html` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){o.EventsController.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:(0,s.getPreferredAccountType)(i.ChainController.state.activeChain)===c.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),a.RouterController.push("WhatIsABuy")}};m.styles=[u],m=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}([(0,l.customElement)("w3m-onramp-providers-footer")],m),e.s([],259410)},36209,980865,e=>{"use strict";e.i(195126);var t=e.i(996838),r=e.i(850980);e.i(775353);var i=e.i(702599),o=e.i(291219);e.i(520758);var n=e.i(39050),a=t,s=e.i(307713);e.i(938626),e.i(259410);var l=e.i(214539),c=e.i(624851);let w=c.css`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;var u=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let m=class extends a.LitElement{constructor(){super(...arguments),this.resizeObserver=void 0,this.unsubscribe=[],this.status="hide",this.view=o.RouterController.state.view}firstUpdated(){this.status=l.HelpersUtil.hasFooter()?"show":"hide",this.unsubscribe.push(o.RouterController.subscribeKey("view",e=>{this.view=e,this.status=l.HelpersUtil.hasFooter()?"show":"hide","hide"===this.status&&document.documentElement.style.setProperty("--apkt-footer-height","0px")})),this.resizeObserver=new ResizeObserver(e=>{for(let t of e)if(t.target===this.getWrapper()){let e=`${t.contentRect.height}px`;document.documentElement.style.setProperty("--apkt-footer-height",e)}}),this.resizeObserver.observe(this.getWrapper())}render(){return r.html`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `}templatePageContainer(){return l.HelpersUtil.hasFooter()?r.html` ${this.templateFooter()}`:null}templateFooter(){switch(this.view){case"Networks":return this.templateNetworksFooter();case"Connect":case"ConnectWallets":case"OnRampFiatSelect":case"OnRampTokenSelect":return r.html`<w3m-legal-footer></w3m-legal-footer>`;case"OnRampProviders":return r.html`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;default:return null}}templateNetworksFooter(){return r.html` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`}onNetworkHelp(){s.EventsController.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),o.RouterController.push("WhatIsANetwork")}getWrapper(){return this.shadowRoot?.querySelector("div.container")}};m.styles=[w],u([(0,i.state)()],m.prototype,"status",void 0),u([(0,i.state)()],m.prototype,"view",void 0),m=u([(0,n.customElement)("w3m-footer")],m),e.s(["W3mFooter",()=>m],980865);let d=c.css`
  :host {
    display: block;
    width: inherit;
  }
`;var p=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let h=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.viewState=o.RouterController.state.view,this.history=o.RouterController.state.history.join(","),this.unsubscribe.push(o.RouterController.subscribeKey("view",()=>{this.history=o.RouterController.state.history.join(","),document.documentElement.style.setProperty("--apkt-duration-dynamic","var(--apkt-durations-lg)")}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),document.documentElement.style.setProperty("--apkt-duration-dynamic","0s")}render(){return r.html`${this.templatePageContainer()}`}templatePageContainer(){return r.html`<w3m-router-container
      history=${this.history}
      .setView=${()=>{this.viewState=o.RouterController.state.view}}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`}viewTemplate(e){switch(e){case"AccountSettings":return r.html`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return r.html`<w3m-account-view></w3m-account-view>`;case"AllWallets":return r.html`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return r.html`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return r.html`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return r.html`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return r.html`<w3m-connect-view></w3m-connect-view>`;case"Create":return r.html`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return r.html`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return r.html`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return r.html`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return r.html`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return r.html`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return r.html`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return r.html`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"DataCapture":return r.html`<w3m-data-capture-view></w3m-data-capture-view>`;case"DataCaptureOtpConfirm":return r.html`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;case"Downloads":return r.html`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return r.html`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return r.html`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return r.html`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return r.html`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return r.html`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return r.html`<w3m-network-switch-view></w3m-network-switch-view>`;case"ProfileWallets":return r.html`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;case"Transactions":return r.html`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return r.html`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampTokenSelect":return r.html`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return r.html`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return r.html`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return r.html`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return r.html`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return r.html`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return r.html`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return r.html`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return r.html`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return r.html`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return r.html`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return r.html`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return r.html`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WalletSendConfirmed":return r.html`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;case"WhatIsABuy":return r.html`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return r.html`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return r.html`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return r.html`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return r.html`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return r.html`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return r.html`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return r.html`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return r.html`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return r.html`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return r.html`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return r.html`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return r.html`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return r.html`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return r.html`<w3m-pay-loading-view></w3m-pay-loading-view>`;case"PayQuote":return r.html`<w3m-pay-quote-view></w3m-pay-quote-view>`;case"FundWallet":return r.html`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;case"PayWithExchange":return r.html`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;case"PayWithExchangeSelectAsset":return r.html`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;case"UsageExceeded":return r.html`<w3m-usage-exceeded-view></w3m-usage-exceeded-view>`;case"SmartAccountSettings":return r.html`<w3m-smart-account-settings-view></w3m-smart-account-settings-view>`}}};h.styles=[d],p([(0,i.state)()],h.prototype,"viewState",void 0),p([(0,i.state)()],h.prototype,"history",void 0),h=p([(0,n.customElement)("w3m-router")],h),e.s(["W3mRouter",()=>h],36209)},61201,e=>{"use strict";e.i(648812),e.s([])}]);

//# debugId=2bfcfa79-a709-32f3-800e-513f3be22e59
//# sourceMappingURL=3f390876d07e4047.js.map
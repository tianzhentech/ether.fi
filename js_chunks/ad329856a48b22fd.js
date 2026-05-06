;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="bdc3c152-a978-180e-50e6-6020e7522cfd")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,694318,482714,511731,741029,342118,505862,549988,911009,282966,133894,139283,39959,970431,224251,449814,651929,30601,638668,325085,414192,520698,181589,996808,e=>{"use strict";e.i(195126);var t=e.i(996838),i=e.i(850980);e.i(775353);var o=e.i(585408),n=e.i(702599);e.i(783601);var r=e.i(525559),a=e.i(173947),s=e.i(787591),l=e.i(516306),c=e.i(297807),d=e.i(545478),u=e.i(773434);e.i(520758);var h=e.i(39050),p=t;e.i(992074),e.i(569529),e.i(467630),e.i(430210),e.i(308982);var m=e.i(134036),w=e.i(314351);e.i(1757);var g=e.i(624851);let f=g.css`
  :host {
    display: block;
  }

  button {
    border-radius: ${({borderRadius:e})=>e["20"]};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    display: flex;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[1]};
    color: ${({tokens:e})=>e.theme.textSecondary};
    border-radius: ${({borderRadius:e})=>e[16]};
    height: 32px;
    transition: box-shadow ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: box-shadow;
  }

  button wui-flex.avatar-container {
    width: 28px;
    height: 24px;
    position: relative;

    wui-flex.network-image-container {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 12px;
      height: 12px;
    }

    wui-flex.network-image-container wui-icon {
      background: ${({tokens:e})=>e.theme.foregroundPrimary};
    }

    wui-avatar {
      width: 24px;
      min-width: 24px;
      height: 24px;
    }

    wui-icon {
      width: 12px;
      height: 12px;
    }
  }

  wui-image,
  wui-icon {
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  wui-text {
    white-space: nowrap;
  }

  button wui-flex.balance-container {
    height: 100%;
    border-radius: ${({borderRadius:e})=>e[16]};
    padding-left: ${({spacing:e})=>e[1]};
    padding-right: ${({spacing:e})=>e[1]};
    background: ${({tokens:e})=>e.theme.foregroundSecondary};
    color: ${({tokens:e})=>e.theme.textPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:focus-visible:enabled,
  button:active:enabled {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);

    wui-flex.balance-container {
      background: ${({tokens:e})=>e.theme.foregroundTertiary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled wui-text,
  button:disabled wui-flex.avatar-container {
    opacity: 0.3;
  }
`;var b=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let C=class extends p.LitElement{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.loading=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return i.html`
      <button
        ?disabled=${this.disabled}
        class=${(0,r.ifDefined)(this.balance?void 0:"local-no-balance")}
        data-error=${(0,r.ifDefined)(this.isUnsupportedChain)}
      >
        ${this.imageTemplate()} ${this.addressTemplate()} ${this.balanceTemplate()}
      </button>
    `}imageTemplate(){let e=this.networkSrc?i.html`<wui-image src=${this.networkSrc}></wui-image>`:i.html` <wui-icon size="inherit" color="inherit" name="networkPlaceholder"></wui-icon> `;return i.html`<wui-flex class="avatar-container">
      <wui-avatar
        .imageSrc=${this.avatarSrc}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>

      <wui-flex class="network-image-container">${e}</wui-flex>
    </wui-flex>`}addressTemplate(){return i.html`<wui-text variant="md-regular" color="inherit">
      ${this.address?w.UiHelperUtil.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
    </wui-text>`}balanceTemplate(){if(this.balance){let e=this.loading?i.html`<wui-loading-spinner size="md" color="inherit"></wui-loading-spinner>`:i.html`<wui-text variant="md-regular" color="inherit"> ${this.balance}</wui-text>`;return i.html`<wui-flex alignItems="center" justifyContent="center" class="balance-container"
        >${e}</wui-flex
      >`}return null}};C.styles=[m.resetStyles,m.elementStyles,f],b([(0,o.property)()],C.prototype,"networkSrc",void 0),b([(0,o.property)()],C.prototype,"avatarSrc",void 0),b([(0,o.property)()],C.prototype,"balance",void 0),b([(0,o.property)({type:Boolean})],C.prototype,"isUnsupportedChain",void 0),b([(0,o.property)({type:Boolean})],C.prototype,"disabled",void 0),b([(0,o.property)({type:Boolean})],C.prototype,"loading",void 0),b([(0,o.property)()],C.prototype,"address",void 0),b([(0,o.property)()],C.prototype,"profileName",void 0),b([(0,o.property)()],C.prototype,"charsStart",void 0),b([(0,o.property)()],C.prototype,"charsEnd",void 0),C=b([(0,h.customElement)("wui-account-button")],C);var y=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};class v extends t.LitElement{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.isSupported=!!u.OptionsController.state.allowUnsupportedChain||!l.ChainController.state.activeChain||l.ChainController.checkIfSupportedNetwork(l.ChainController.state.activeChain)}connectedCallback(){super.connectedCallback(),this.setAccountData(l.ChainController.getAccountData(this.namespace)),this.setNetworkData(l.ChainController.getNetworkData(this.namespace))}firstUpdated(){let e=this.namespace;e?this.unsubscribe.push(l.ChainController.subscribeChainProp("accountState",e=>{this.setAccountData(e)},e),l.ChainController.subscribeChainProp("networkState",t=>{this.setNetworkData(t),this.isSupported=l.ChainController.checkIfSupportedNetwork(e,t?.caipNetwork?.caipNetworkId)},e)):this.unsubscribe.push(a.AssetController.subscribeNetworkImages(()=>{this.networkImage=s.AssetUtil.getNetworkImage(this.network)}),l.ChainController.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),l.ChainController.subscribeChainProp("accountState",e=>{this.setAccountData(e)}),l.ChainController.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=s.AssetUtil.getNetworkImage(e),this.isSupported=!e?.chainNamespace||l.ChainController.checkIfSupportedNetwork(e?.chainNamespace),this.fetchNetworkImage(e)}))}updated(){this.fetchNetworkImage(this.network)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!l.ChainController.state.activeChain)return null;let e="show"===this.balance,t="string"!=typeof this.balanceVal,{formattedText:o}=c.CoreHelperUtil.parseBalance(this.balanceVal,this.balanceSymbol);return i.html`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${!u.OptionsController.state.allowUnsupportedChain&&!this.isSupported}
        address=${(0,r.ifDefined)(c.CoreHelperUtil.getPlainAddress(this.caipAddress))}
        profileName=${(0,r.ifDefined)(this.profileName)}
        networkSrc=${(0,r.ifDefined)(this.networkImage)}
        avatarSrc=${(0,r.ifDefined)(this.profileImage)}
        balance=${e?o:""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace?`-${this.namespace}`:""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${t}
      >
      </wui-account-button>
    `}onClick(){this.isSupported||u.OptionsController.state.allowUnsupportedChain?d.ModalController.open({namespace:this.namespace}):d.ModalController.open({view:"UnsupportedChain"})}async fetchNetworkImage(e){e?.assets?.imageId&&(this.networkImage=await s.AssetUtil.fetchNetworkImage(e?.assets?.imageId))}setAccountData(e){e&&(this.caipAddress=e.caipAddress,this.balanceVal=e.balance,this.balanceSymbol=e.balanceSymbol,this.profileName=e.profileName,this.profileImage=e.profileImage)}setNetworkData(e){e&&(this.network=e.caipNetwork,this.networkImage=s.AssetUtil.getNetworkImage(e.caipNetwork))}}y([(0,o.property)({type:Boolean})],v.prototype,"disabled",void 0),y([(0,o.property)()],v.prototype,"balance",void 0),y([(0,o.property)()],v.prototype,"charsStart",void 0),y([(0,o.property)()],v.prototype,"charsEnd",void 0),y([(0,o.property)()],v.prototype,"namespace",void 0),y([(0,n.state)()],v.prototype,"caipAddress",void 0),y([(0,n.state)()],v.prototype,"balanceVal",void 0),y([(0,n.state)()],v.prototype,"balanceSymbol",void 0),y([(0,n.state)()],v.prototype,"profileName",void 0),y([(0,n.state)()],v.prototype,"profileImage",void 0),y([(0,n.state)()],v.prototype,"network",void 0),y([(0,n.state)()],v.prototype,"networkImage",void 0),y([(0,n.state)()],v.prototype,"isSupported",void 0);let x=class extends v{};x=y([(0,h.customElement)("w3m-account-button")],x);let k=class extends v{};k=y([(0,h.customElement)("appkit-account-button")],k),e.s(["AppKitAccountButton",()=>k,"W3mAccountButton",()=>x],482714);var $=t,E=e.i(983064);let S=E.css`
  :host {
    display: block;
    width: max-content;
  }
`;var A=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};class N extends $.LitElement{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.namespace=void 0}firstUpdated(){this.caipAddress=this.namespace?l.ChainController.getAccountData(this.namespace)?.caipAddress:l.ChainController.state.activeCaipAddress,this.namespace?this.unsubscribe.push(l.ChainController.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},this.namespace)):this.unsubscribe.push(l.ChainController.subscribeKey("activeCaipAddress",e=>this.caipAddress=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.caipAddress?i.html`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${(0,r.ifDefined)(this.balance)}
            .charsStart=${(0,r.ifDefined)(this.charsStart)}
            .charsEnd=${(0,r.ifDefined)(this.charsEnd)}
            namespace=${(0,r.ifDefined)(this.namespace)}
          >
          </appkit-account-button>
        `:i.html`
          <appkit-connect-button
            size=${(0,r.ifDefined)(this.size)}
            label=${(0,r.ifDefined)(this.label)}
            loadingLabel=${(0,r.ifDefined)(this.loadingLabel)}
            namespace=${(0,r.ifDefined)(this.namespace)}
          ></appkit-connect-button>
        `}}N.styles=S,A([(0,o.property)({type:Boolean})],N.prototype,"disabled",void 0),A([(0,o.property)()],N.prototype,"balance",void 0),A([(0,o.property)()],N.prototype,"size",void 0),A([(0,o.property)()],N.prototype,"label",void 0),A([(0,o.property)()],N.prototype,"loadingLabel",void 0),A([(0,o.property)()],N.prototype,"charsStart",void 0),A([(0,o.property)()],N.prototype,"charsEnd",void 0),A([(0,o.property)()],N.prototype,"namespace",void 0),A([(0,n.state)()],N.prototype,"caipAddress",void 0);let I=class extends N{};I=A([(0,h.customElement)("w3m-button")],I);let R=class extends N{};R=A([(0,h.customElement)("appkit-button")],R),e.s(["AppKitButton",()=>R,"W3mButton",()=>I],511731);var T=t,O=t;let U=g.css`
  :host {
    position: relative;
    display: block;
  }

  button {
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='sm'] {
    padding: ${({spacing:e})=>e[2]};
  }

  button[data-size='md'] {
    padding: ${({spacing:e})=>e[3]};
  }

  button[data-size='lg'] {
    padding: ${({spacing:e})=>e[4]};
  }

  button[data-variant='primary'] {
    background: ${({tokens:e})=>e.core.backgroundAccentPrimary};
  }

  button[data-variant='secondary'] {
    background: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  button:hover:enabled {
    border-radius: ${({borderRadius:e})=>e[3]};
  }

  button:disabled {
    cursor: not-allowed;
  }

  button[data-loading='true'] {
    cursor: not-allowed;
  }

  button[data-loading='true'][data-size='sm'] {
    border-radius: ${({borderRadius:e})=>e[32]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]};
  }

  button[data-loading='true'][data-size='md'] {
    border-radius: ${({borderRadius:e})=>e[20]};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[4]};
  }

  button[data-loading='true'][data-size='lg'] {
    border-radius: ${({borderRadius:e})=>e[16]};
    padding: ${({spacing:e})=>e[4]} ${({spacing:e})=>e[5]};
  }
`;var D=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let P=class extends O.LitElement{constructor(){super(...arguments),this.size="md",this.variant="primary",this.loading=!1,this.text="Connect Wallet"}render(){return i.html`
      <button
        data-loading=${this.loading}
        data-variant=${this.variant}
        data-size=${this.size}
        ?disabled=${this.loading}
      >
        ${this.contentTemplate()}
      </button>
    `}contentTemplate(){let e={primary:"invert",secondary:"accent-primary"};return this.loading?i.html`<wui-loading-spinner
      color=${e[this.variant]}
      size=${this.size}
    ></wui-loading-spinner>`:i.html` <wui-text variant=${({lg:"lg-regular",md:"md-regular",sm:"sm-regular"})[this.size]} color=${e[this.variant]}>
        ${this.text}
      </wui-text>`}};P.styles=[m.resetStyles,m.elementStyles,U],D([(0,o.property)()],P.prototype,"size",void 0),D([(0,o.property)()],P.prototype,"variant",void 0),D([(0,o.property)({type:Boolean})],P.prototype,"loading",void 0),D([(0,o.property)()],P.prototype,"text",void 0),P=D([(0,h.customElement)("wui-connect-button")],P);var L=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};class j extends T.LitElement{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=d.ModalController.state.open,this.loading=this.namespace?d.ModalController.state.loadingNamespaceMap.get(this.namespace):d.ModalController.state.loading,this.unsubscribe.push(d.ModalController.subscribe(e=>{this.open=e.open,this.loading=this.namespace?e.loadingNamespaceMap.get(this.namespace):e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html`
      <wui-connect-button
        size=${(0,r.ifDefined)(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace?`-${this.namespace}`:""}`}
      >
        ${this.loading?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?d.ModalController.close():this.loading||d.ModalController.open({view:"Connect",namespace:this.namespace})}}L([(0,o.property)()],j.prototype,"size",void 0),L([(0,o.property)()],j.prototype,"label",void 0),L([(0,o.property)()],j.prototype,"loadingLabel",void 0),L([(0,o.property)()],j.prototype,"namespace",void 0),L([(0,n.state)()],j.prototype,"open",void 0),L([(0,n.state)()],j.prototype,"loading",void 0);let W=class extends j{};W=L([(0,h.customElement)("w3m-connect-button")],W);let F=class extends j{};F=L([(0,h.customElement)("appkit-connect-button")],F),e.s(["AppKitConnectButton",()=>F,"W3mConnectButton",()=>W],741029);var z=t,B=e.i(307713),_=t;e.i(67356);let M=g.css`
  :host {
    display: block;
  }

  button {
    border-radius: ${({borderRadius:e})=>e[32]};
    display: flex;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]}
      ${({spacing:e})=>e[1]} ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button[data-size='sm'] > wui-icon-box,
  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-icon-box,
  button[data-size='md'] > wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='lg'] > wui-icon-box,
  button[data-size='lg'] > wui-image {
    width: 24px;
    height: 24px;
  }

  wui-image,
  wui-icon-box {
    border-radius: ${({borderRadius:e})=>e[32]};
  }
`;var H=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let V=class extends _.LitElement{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.size="lg"}render(){return i.html`
      <button data-size=${this.size} data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant=${({sm:"sm-regular",md:"md-regular",lg:"lg-regular"})[this.size]} color="primary">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?i.html` <wui-icon-box color="error" icon="warningCircle"></wui-icon-box> `:this.imageSrc?i.html`<wui-image src=${this.imageSrc}></wui-image>`:i.html` <wui-icon size="xl" color="default" name="networkPlaceholder"></wui-icon> `}};V.styles=[m.resetStyles,m.elementStyles,M],H([(0,o.property)()],V.prototype,"imageSrc",void 0),H([(0,o.property)({type:Boolean})],V.prototype,"isUnsupportedChain",void 0),H([(0,o.property)({type:Boolean})],V.prototype,"disabled",void 0),H([(0,o.property)()],V.prototype,"size",void 0),V=H([(0,h.customElement)("wui-network-button")],V);let K=E.css`
  :host {
    display: block;
    width: max-content;
  }
`;var G=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};class q extends z.LitElement{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=l.ChainController.state.activeCaipNetwork,this.networkImage=s.AssetUtil.getNetworkImage(this.network),this.caipAddress=l.ChainController.state.activeCaipAddress,this.loading=d.ModalController.state.loading,this.isSupported=!!u.OptionsController.state.allowUnsupportedChain||!l.ChainController.state.activeChain||l.ChainController.checkIfSupportedNetwork(l.ChainController.state.activeChain),this.unsubscribe.push(a.AssetController.subscribeNetworkImages(()=>{this.networkImage=s.AssetUtil.getNetworkImage(this.network)}),l.ChainController.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),l.ChainController.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=s.AssetUtil.getNetworkImage(e),this.isSupported=!e?.chainNamespace||l.ChainController.checkIfSupportedNetwork(e.chainNamespace),s.AssetUtil.fetchNetworkImage(e?.assets?.imageId)}),d.ModalController.subscribeKey("loading",e=>this.loading=e))}firstUpdated(){s.AssetUtil.fetchNetworkImage(this.network?.assets?.imageId)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=!this.network||l.ChainController.checkIfSupportedNetwork(this.network.chainNamespace);return i.html`
      <wui-network-button
        .disabled=${!!(this.disabled||this.loading)}
        .isUnsupportedChain=${!u.OptionsController.state.allowUnsupportedChain&&!e}
        imageSrc=${(0,r.ifDefined)(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `}getLabel(){return this.network?this.isSupported||u.OptionsController.state.allowUnsupportedChain?this.network.name:"Switch Network":this.label?this.label:this.caipAddress?"Unknown Network":"Select Network"}onClick(){this.loading||(B.EventsController.sendEvent({type:"track",event:"CLICK_NETWORKS"}),d.ModalController.open({view:"Networks"}))}}q.styles=K,G([(0,o.property)({type:Boolean})],q.prototype,"disabled",void 0),G([(0,o.property)({type:String})],q.prototype,"label",void 0),G([(0,n.state)()],q.prototype,"network",void 0),G([(0,n.state)()],q.prototype,"networkImage",void 0),G([(0,n.state)()],q.prototype,"caipAddress",void 0),G([(0,n.state)()],q.prototype,"loading",void 0),G([(0,n.state)()],q.prototype,"isSupported",void 0);let Y=class extends q{};Y=G([(0,h.customElement)("w3m-network-button")],Y);let X=class extends q{};X=G([(0,h.customElement)("appkit-network-button")],X),e.s(["AppKitNetworkButton",()=>X,"W3mNetworkButton",()=>Y],342118),e.i(36209),e.i(980865);var Q=t,J=e.i(452345),Z=e.i(585767),ee=e.i(155853),et=e.i(604194),ei=e.i(291219),eo=e.i(347771);e.i(334807),e.i(953330),e.i(478399);var en=t;e.i(712499);let er=g.css`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[4]};
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  wui-flex > wui-icon {
    padding: ${({spacing:e})=>e[2]};
    color: ${({tokens:e})=>e.theme.textInvert};
    background-color: ${({tokens:e})=>e.core.backgroundAccentPrimary};
    border-radius: ${({borderRadius:e})=>e[2]};
    align-items: center;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent020};
    }
  }
`;var ea=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let es=class extends en.LitElement{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return i.html`
      <button>
        <wui-flex gap="2" alignItems="center">
          <wui-icon weight="fill" size="lg" name=${this.icon} color="inherit"></wui-icon>
          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="md-medium" color="primary">${this.label}</wui-text>
            <wui-text variant="md-regular" color="tertiary">${this.description}</wui-text>
          </wui-flex>
        </wui-flex>
        <wui-icon size="lg" color="accent-primary" name="chevronRight"></wui-icon>
      </button>
    `}};es.styles=[m.resetStyles,m.elementStyles,er],ea([(0,o.property)()],es.prototype,"label",void 0),ea([(0,o.property)()],es.prototype,"description",void 0),ea([(0,o.property)()],es.prototype,"icon",void 0),es=ea([(0,h.customElement)("wui-notice-card")],es),e.i(296113);var el=t,ec=e.i(726662),ed=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let eu=class extends el.LitElement{constructor(){super(),this.unsubscribe=[],this.socialProvider=ec.StorageUtil.getConnectedSocialProvider(),this.socialUsername=ec.StorageUtil.getConnectedSocialUsername(),this.namespace=l.ChainController.state.activeChain,this.unsubscribe.push(l.ChainController.subscribeKey("activeChain",e=>{this.namespace=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=ee.ConnectorController.getConnectorId(this.namespace),t=ee.ConnectorController.getAuthConnector();if(!t||e!==J.ConstantsUtil.CONNECTOR_ID.AUTH)return this.style.cssText="display: none",null;let o=t.provider.getEmail()??"";return o||this.socialUsername?i.html`
      <wui-list-item
        ?rounded=${!0}
        icon=${this.socialProvider??"mail"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${()=>{this.onGoToUpdateEmail(o,this.socialProvider)}}
      >
        <wui-text variant="lg-regular" color="primary">${this.getAuthName(o)}</wui-text>
      </wui-list-item>
    `:(this.style.cssText="display: none",null)}onGoToUpdateEmail(e,t){t||ei.RouterController.push("UpdateEmailWallet",{email:e,redirectView:"Account"})}getAuthName(e){return this.socialUsername?"discord"===this.socialProvider&&this.socialUsername.endsWith("0")?this.socialUsername.slice(0,-1):this.socialUsername:e.length>30?`${e.slice(0,-3)}...`:e}};ed([(0,n.state)()],eu.prototype,"namespace",void 0),eu=ed([(0,h.customElement)("w3m-account-auth-button")],eu);var eh=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let ep=class extends Q.LitElement{constructor(){super(),this.usubscribe=[],this.networkImages=a.AssetController.state.networkImages,this.address=l.ChainController.getAccountData()?.address,this.profileImage=l.ChainController.getAccountData()?.profileImage,this.profileName=l.ChainController.getAccountData()?.profileName,this.network=l.ChainController.state.activeCaipNetwork,this.disconnecting=!1,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.usubscribe.push(l.ChainController.subscribeChainProp("accountState",e=>{e&&(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName)}),l.ChainController.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}),u.OptionsController.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-account-settings-view: No account provided");let e=this.networkImages[this.network?.assets?.imageId??""];return i.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding=${["0","5","3","5"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${(0,r.ifDefined)(this.profileImage)}
          size="lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="1" alignItems="center" justifyContent="center">
            <wui-text variant="h5-medium" color="primary" data-testid="account-settings-address">
              ${w.UiHelperUtil.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="default"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="4">
        <wui-flex flexDirection="column" gap="2" .padding=${["6","4","3","4"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            imageSrc=${(0,r.ifDefined)(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            ?fullSize=${!0}
            ?rounded=${!0}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="lg-regular" color="primary">
              ${this.network?.name??"Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.smartAccountSettingsTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            ?rounded=${!0}
            icon="power"
            iconColor="error"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="lg-regular" color="primary">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}chooseNameButtonTemplate(){let e=this.network?.chainNamespace,t=ee.ConnectorController.getConnectorId(e),o=ee.ConnectorController.getAuthConnector();return l.ChainController.checkIfNamesSupported()&&o&&t===J.ConstantsUtil.CONNECTOR_ID.AUTH&&!this.profileName?i.html`
      <wui-list-item
        icon="id"
        ?rounded=${!0}
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="lg-regular" color="primary">Choose account name </wui-text>
      </wui-list-item>
    `:null}authCardTemplate(){let e=ee.ConnectorController.getConnectorId(this.network?.chainNamespace),t=ee.ConnectorController.getAuthConnector(),{origin:o}=location;return!t||e!==J.ConstantsUtil.CONNECTOR_ID.AUTH||o.includes(et.ConstantsUtil.SECURE_SITE)?null:i.html`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}isAllowedNetworkSwitch(){let e=l.ChainController.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:e})=>e===this.network?.id);return t||!i}onCopyAddress(){try{this.address&&(c.CoreHelperUtil.copyToClopboard(this.address),eo.SnackController.showSuccess("Address copied"))}catch{eo.SnackController.showError("Failed to copy")}}smartAccountSettingsTemplate(){let e=this.network?.chainNamespace,t=l.ChainController.checkIfSmartAccountEnabled(),o=ee.ConnectorController.getConnectorId(e);return ee.ConnectorController.getAuthConnector()&&o===J.ConstantsUtil.CONNECTOR_ID.AUTH&&t?i.html`
      <wui-list-item
        icon="user"
        ?rounded=${!0}
        ?chevron=${!0}
        @click=${this.onSmartAccountSettings.bind(this)}
        data-testid="account-smart-account-settings-button"
      >
        <wui-text variant="lg-regular" color="primary">Smart Account Settings</wui-text>
      </wui-list-item>
    `:null}onChooseName(){ei.RouterController.push("ChooseAccountName")}onNetworks(){this.isAllowedNetworkSwitch()&&ei.RouterController.push("Networks")}async onDisconnect(){try{this.disconnecting=!0;let e=this.network?.chainNamespace,t=Z.ConnectionController.getConnections(e).length>0,i=e&&ee.ConnectorController.state.activeConnectorIds[e],o=this.remoteFeatures?.multiWallet;await Z.ConnectionController.disconnect(o?{id:i,namespace:e}:{}),t&&o&&(ei.RouterController.push("ProfileWallets"),eo.SnackController.showSuccess("Wallet deleted"))}catch{B.EventsController.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:"Failed to disconnect"}}),eo.SnackController.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onGoToUpgradeView(){B.EventsController.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),ei.RouterController.push("UpgradeEmailWallet")}onSmartAccountSettings(){ei.RouterController.push("SmartAccountSettings")}};eh([(0,n.state)()],ep.prototype,"address",void 0),eh([(0,n.state)()],ep.prototype,"profileImage",void 0),eh([(0,n.state)()],ep.prototype,"profileName",void 0),eh([(0,n.state)()],ep.prototype,"network",void 0),eh([(0,n.state)()],ep.prototype,"disconnecting",void 0),eh([(0,n.state)()],ep.prototype,"remoteFeatures",void 0),ep=eh([(0,h.customElement)("w3m-account-settings-view")],ep),e.s(["W3mAccountSettingsView",()=>ep],505862);var em=t,ew=t,eg=e.i(788517),ef=e.i(134848);e.i(902938),e.i(152462),e.i(502853),e.i(61201),e.i(911283);var eb=e.i(375790);let eC=g.css`
  wui-icon-link {
    margin-right: calc(${({spacing:e})=>e["8"]} * -1);
  }

  wui-notice-card {
    margin-bottom: ${({spacing:e})=>e["1"]};
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .balance-container {
    display: inline;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .symbol {
    transform: translateY(-2px);
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e["3"]};
    height: 48px;
    padding: ${({spacing:e})=>e["2"]};
    padding-right: ${({spacing:e})=>e["3"]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[6]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
  }

  .account-button:hover {
    background-color: ${({tokens:e})=>e.core.glass010};
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.core.glass010};
  }

  wui-wallet-switch {
    margin-top: ${({spacing:e})=>e["2"]};
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.core.glass010};
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color ${({durations:e})=>e.md}
        ${({easings:e})=>e["ease-out-power-1"]},
      opacity ${({durations:e})=>e.md} ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`;var ey=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let ev=class extends ew.LitElement{constructor(){super(),this.unsubscribe=[],this.caipAddress=l.ChainController.getAccountData()?.caipAddress,this.address=c.CoreHelperUtil.getPlainAddress(l.ChainController.getAccountData()?.caipAddress),this.profileImage=l.ChainController.getAccountData()?.profileImage,this.profileName=l.ChainController.getAccountData()?.profileName,this.disconnecting=!1,this.balance=l.ChainController.getAccountData()?.balance,this.balanceSymbol=l.ChainController.getAccountData()?.balanceSymbol,this.features=u.OptionsController.state.features,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.namespace=l.ChainController.state.activeChain,this.activeConnectorIds=ee.ConnectorController.state.activeConnectorIds,this.unsubscribe.push(l.ChainController.subscribeChainProp("accountState",e=>{this.address=c.CoreHelperUtil.getPlainAddress(e?.caipAddress),this.caipAddress=e?.caipAddress,this.balance=e?.balance,this.balanceSymbol=e?.balanceSymbol,this.profileName=e?.profileName,this.profileImage=e?.profileImage}),u.OptionsController.subscribeKey("features",e=>this.features=e),u.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),ee.ConnectorController.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),l.ChainController.subscribeKey("activeChain",e=>this.namespace=e),l.ChainController.subscribeKey("activeCaipNetwork",e=>{e?.chainNamespace&&(this.namespace=e?.chainNamespace)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.caipAddress||!this.namespace)return null;let e=this.activeConnectorIds[this.namespace],t=e?ee.ConnectorController.getConnectorById(e):void 0,o=s.AssetUtil.getConnectorImage(t),{value:n,decimals:a,symbol:l}=c.CoreHelperUtil.parseBalance(this.balance,this.balanceSymbol);return i.html`<wui-flex
        flexDirection="column"
        .padding=${["0","5","4","5"]}
        alignItems="center"
        gap="3"
      >
        <wui-avatar
          alt=${(0,r.ifDefined)(this.caipAddress)}
          address=${(0,r.ifDefined)(c.CoreHelperUtil.getPlainAddress(this.caipAddress))}
          imageSrc=${(0,r.ifDefined)(null===this.profileImage?void 0:this.profileImage)}
          data-testid="single-account-avatar"
        ></wui-avatar>
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          imageSrc=${o}
          alt=${t?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
        <div class="balance-container">
          <wui-text variant="h3-regular" color="primary">${n}</wui-text>
          <wui-text variant="h3-regular" color="secondary">.${a}</wui-text>
          <wui-text variant="h6-medium" color="primary" class="symbol">${l}</wui-text>
        </div>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="2" .padding=${["0","3","3","3"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          .rounded=${!0}
          icon="power"
          iconColor="error"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          .rightIcon=${!1}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="lg-regular" color="primary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`}fundWalletTemplate(){if(!this.namespace)return null;let e=et.ConstantsUtil.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace),t=!!this.features?.receive,o=this.remoteFeatures?.onramp&&e,n=eg.ExchangeController.isPayWithExchangeEnabled();return o||t||n?i.html`
      <wui-list-item
        .rounded=${!0}
        data-testid="w3m-account-default-fund-wallet-button"
        iconVariant="blue"
        icon="dollar"
        ?chevron=${!0}
        @click=${this.handleClickFundWallet.bind(this)}
      >
        <wui-text variant="lg-regular" color="primary">Fund wallet</wui-text>
      </wui-list-item>
    `:null}orderedFeaturesTemplate(){return(this.features?.walletFeaturesOrder||et.ConstantsUtil.DEFAULT_FEATURES.walletFeaturesOrder).map(e=>{switch(e){case"onramp":return this.fundWalletTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}activityTemplate(){return this.namespace&&this.remoteFeatures?.activity&&et.ConstantsUtil.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace)?i.html` <wui-list-item
          .rounded=${!0}
          icon="clock"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="lg-regular" color="primary">Activity</wui-text>
        </wui-list-item>`:null}swapsTemplate(){let e=this.remoteFeatures?.swaps,t=l.ChainController.state.activeChain===J.ConstantsUtil.CHAIN.EVM;return e&&t?i.html`
      <wui-list-item
        .rounded=${!0}
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="lg-regular" color="primary">Swap</wui-text>
      </wui-list-item>
    `:null}sendTemplate(){let e=this.features?.send,t=l.ChainController.state.activeChain;if(!t)throw Error("SendController:sendTemplate - namespace is required");let o=et.ConstantsUtil.SEND_SUPPORTED_NAMESPACES.includes(t);return e&&o?i.html`
      <wui-list-item
        .rounded=${!0}
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="lg-regular" color="primary">Send</wui-text>
      </wui-list-item>
    `:null}authCardTemplate(){let e=l.ChainController.state.activeChain;if(!e)throw Error("AuthCardTemplate:authCardTemplate - namespace is required");let t=ee.ConnectorController.getConnectorId(e),o=ee.ConnectorController.getAuthConnector(),{origin:n}=location;return!o||t!==J.ConstantsUtil.CONNECTOR_ID.AUTH||n.includes(et.ConstantsUtil.SECURE_SITE)?null:i.html`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleClickFundWallet(){ei.RouterController.push("FundWallet")}handleClickSwap(){ei.RouterController.push("Swap")}handleClickSend(){ei.RouterController.push("WalletSend")}explorerBtnTemplate(){return l.ChainController.getAccountData()?.addressExplorerUrl?i.html`
      <wui-button size="md" variant="accent-primary" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}onTransactions(){B.EventsController.sendEvent({type:"track",event:"CLICK_TRANSACTIONS",properties:{isSmartAccount:(0,ef.getPreferredAccountType)(l.ChainController.state.activeChain)===eb.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),ei.RouterController.push("Transactions")}async onDisconnect(){try{this.disconnecting=!0;let e=Z.ConnectionController.getConnections(this.namespace).length>0,t=this.namespace&&ee.ConnectorController.state.activeConnectorIds[this.namespace],i=this.remoteFeatures?.multiWallet;await Z.ConnectionController.disconnect(i?{id:t,namespace:this.namespace}:{}),e&&i&&(ei.RouterController.push("ProfileWallets"),eo.SnackController.showSuccess("Wallet deleted"))}catch{B.EventsController.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:"Failed to disconnect"}}),eo.SnackController.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onExplorer(){let e=l.ChainController.getAccountData()?.addressExplorerUrl;e&&c.CoreHelperUtil.openHref(e,"_blank")}onGoToUpgradeView(){B.EventsController.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),ei.RouterController.push("UpgradeEmailWallet")}onGoToProfileWalletsView(){ei.RouterController.push("ProfileWallets")}};ev.styles=eC,ey([(0,n.state)()],ev.prototype,"caipAddress",void 0),ey([(0,n.state)()],ev.prototype,"address",void 0),ey([(0,n.state)()],ev.prototype,"profileImage",void 0),ey([(0,n.state)()],ev.prototype,"profileName",void 0),ey([(0,n.state)()],ev.prototype,"disconnecting",void 0),ey([(0,n.state)()],ev.prototype,"balance",void 0),ey([(0,n.state)()],ev.prototype,"balanceSymbol",void 0),ey([(0,n.state)()],ev.prototype,"features",void 0),ey([(0,n.state)()],ev.prototype,"remoteFeatures",void 0),ey([(0,n.state)()],ev.prototype,"namespace",void 0),ey([(0,n.state)()],ev.prototype,"activeConnectorIds",void 0),ev=ey([(0,h.customElement)("w3m-account-default-widget")],ev);var ex=t,ek=e.i(245940),e$=t;let eE=g.css`
  span {
    font-weight: 500;
    font-size: 38px;
    color: ${({tokens:e})=>e.theme.textPrimary};
    line-height: 38px;
    letter-spacing: -2%;
    text-align: center;
    font-family: var(--apkt-fontFamily-regular);
  }

  .pennies {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }
`;var eS=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let eA=class extends e$.LitElement{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return i.html`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};eA.styles=[m.resetStyles,eE],eS([(0,o.property)()],eA.prototype,"dollars",void 0),eS([(0,o.property)()],eA.prototype,"pennies",void 0),eA=eS([(0,h.customElement)("wui-balance")],eA);var eN=t;let eI=g.css`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  /* -- Variants --------------------------------------------------------- */
  :host([data-variant='fill']) {
    background-color: ${({colors:e})=>e.neutrals100};
  }

  :host([data-variant='shade']) {
    background-color: ${({colors:e})=>e.neutrals900};
  }

  :host([data-variant='fill']) > wui-text {
    color: ${({colors:e})=>e.black};
  }

  :host([data-variant='shade']) > wui-text {
    color: ${({colors:e})=>e.white};
  }

  :host([data-variant='fill']) > wui-icon {
    color: ${({colors:e})=>e.neutrals100};
  }

  :host([data-variant='shade']) > wui-icon {
    color: ${({colors:e})=>e.neutrals900};
  }

  /* -- Sizes --------------------------------------------------------- */
  :host([data-size='sm']) {
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-size='md']) {
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
  }

  /* -- Placements --------------------------------------------------------- */
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
`;var eR=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let eT={sm:"sm-regular",md:"md-regular"},eO=class extends eN.LitElement{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.size="md",this.message=""}render(){return this.dataset.variant=this.variant,this.dataset.size=this.size,i.html`<wui-icon data-placement=${this.placement} size="inherit" name="cursor"></wui-icon>
      <wui-text variant=${eT[this.size]}>${this.message}</wui-text>`}};eO.styles=[m.resetStyles,m.elementStyles,eI],eR([(0,o.property)()],eO.prototype,"placement",void 0),eR([(0,o.property)()],eO.prototype,"variant",void 0),eR([(0,o.property)()],eO.prototype,"size",void 0),eR([(0,o.property)()],eO.prototype,"message",void 0),eO=eR([(0,h.customElement)("wui-tooltip")],eO);var eU=e.i(214539),eD=t;e.i(297009);let eP=E.css`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`,eL=class extends eD.LitElement{render(){return i.html`<w3m-activity-list page="account"></w3m-activity-list>`}};eL.styles=eP,eL=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("w3m-account-activity-widget")],eL);var ej=t,eW=t;e.i(648812);let eF=g.css`
  :host {
    width: 100%;
  }

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({spacing:e})=>e[4]};
    padding: ${({spacing:e})=>e[4]};
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-text {
    max-width: 174px;
  }

  .tag-container {
    width: fit-content;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var ez=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let eB=class extends eW.LitElement{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.disabled=!1}render(){return i.html`
      <button ?disabled=${this.disabled}>
        <wui-flex alignItems="center" gap="3">
          <wui-icon-box padding="2" color="secondary" icon=${this.icon} size="lg"></wui-icon-box>
          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="md-medium" color="primary">${this.text}</wui-text>
            ${this.description?i.html`<wui-text variant="md-regular" color="secondary">
                  ${this.description}</wui-text
                >`:null}
          </wui-flex>
        </wui-flex>

        <wui-flex class="tag-container" alignItems="center" gap="1" justifyContent="flex-end">
          ${this.tag?i.html`<wui-tag tagType="main" size="sm">${this.tag}</wui-tag>`:null}
          <wui-icon size="md" name="chevronRight" color="default"></wui-icon>
        </wui-flex>
      </button>
    `}};eB.styles=[m.resetStyles,m.elementStyles,eF],ez([(0,o.property)()],eB.prototype,"icon",void 0),ez([(0,o.property)()],eB.prototype,"text",void 0),ez([(0,o.property)()],eB.prototype,"description",void 0),ez([(0,o.property)()],eB.prototype,"tag",void 0),ez([(0,o.property)({type:Boolean})],eB.prototype,"disabled",void 0),eB=ez([(0,h.customElement)("wui-list-description")],eB),e.i(21131);let e_=E.css`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`;var eM=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let eH=class extends ej.LitElement{constructor(){super(),this.unsubscribe=[],this.tokenBalance=l.ChainController.getAccountData()?.tokenBalance,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.unsubscribe.push(l.ChainController.subscribeChainProp("accountState",e=>{this.tokenBalance=e?.tokenBalance}),u.OptionsController.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html`${this.tokenTemplate()}`}tokenTemplate(){return this.tokenBalance&&this.tokenBalance?.length>0?i.html`<wui-flex class="contentContainer" flexDirection="column" gap="2">
        ${this.tokenItemTemplate()}
      </wui-flex>`:i.html` <wui-flex flexDirection="column">
      ${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Scan the QR code and receive funds"
        icon="qrCode"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="w3m-account-receive-button"
      ></wui-list-description
    ></wui-flex>`}onRampTemplate(){return this.remoteFeatures?.onramp?i.html`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="w3m-account-onramp-button"
      ></wui-list-description>`:i.html``}tokenItemTemplate(){return this.tokenBalance?.map(e=>i.html`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`)}onReceiveClick(){ei.RouterController.push("WalletReceive")}onBuyClick(){B.EventsController.sendEvent({type:"track",event:"SELECT_BUY_CRYPTO",properties:{isSmartAccount:(0,ef.getPreferredAccountType)(l.ChainController.state.activeChain)===eb.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),ei.RouterController.push("OnRampProviders")}};eH.styles=e_,eM([(0,n.state)()],eH.prototype,"tokenBalance",void 0),eM([(0,n.state)()],eH.prototype,"remoteFeatures",void 0),eH=eM([(0,h.customElement)("w3m-account-tokens-widget")],eH),e.i(603368),e.i(656378);let eV=g.css`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * ${({spacing:e})=>e["4"]});
  }

  wui-promo + wui-profile-button {
    margin-top: ${({spacing:e})=>e["4"]};
  }

  wui-tabs {
    width: 100%;
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
`;var eK=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let eG=class extends ex.LitElement{constructor(){super(...arguments),this.unsubscribe=[],this.network=l.ChainController.state.activeCaipNetwork,this.profileName=l.ChainController.getAccountData()?.profileName,this.address=l.ChainController.getAccountData()?.address,this.currentTab=l.ChainController.getAccountData()?.currentTab,this.tokenBalance=l.ChainController.getAccountData()?.tokenBalance,this.features=u.OptionsController.state.features,this.namespace=l.ChainController.state.activeChain,this.activeConnectorIds=ee.ConnectorController.state.activeConnectorIds,this.remoteFeatures=u.OptionsController.state.remoteFeatures}firstUpdated(){l.ChainController.fetchTokenBalance(),this.unsubscribe.push(l.ChainController.subscribeChainProp("accountState",e=>{e?.address?(this.address=e.address,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance):d.ModalController.close()}),ee.ConnectorController.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),l.ChainController.subscribeKey("activeChain",e=>this.namespace=e),l.ChainController.subscribeKey("activeCaipNetwork",e=>this.network=e),u.OptionsController.subscribeKey("features",e=>this.features=e),u.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearInterval(this.watchTokenBalance)}render(){if(!this.address)throw Error("w3m-account-features-widget: No account provided");if(!this.namespace)return null;let e=this.activeConnectorIds[this.namespace],t=e?ee.ConnectorController.getConnectorById(e):void 0,{icon:o,iconSize:n}=this.getAuthData();return i.html`<wui-flex
      flexDirection="column"
      .padding=${["0","3","4","3"]}
      alignItems="center"
      gap="4"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center" gap="2">
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          icon=${o}
          iconSize=${n}
          alt=${t?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        ${this.tokenBalanceTemplate()}
      </wui-flex>
      ${this.orderedWalletFeatures()} ${this.tabsTemplate()} ${this.listContentTemplate()}
    </wui-flex>`}orderedWalletFeatures(){let e=this.features?.walletFeaturesOrder||et.ConstantsUtil.DEFAULT_FEATURES.walletFeaturesOrder;if(e.every(e=>"send"===e||"receive"===e?!this.features?.[e]:"swaps"!==e&&"onramp"!==e||!this.remoteFeatures?.[e]))return null;let t=[...new Set(e.map(e=>"receive"===e||"onramp"===e?"fund":e))];return i.html`<wui-flex gap="2">
      ${t.map(e=>{switch(e){case"fund":return this.fundWalletTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}
    </wui-flex>`}fundWalletTemplate(){if(!this.namespace)return null;let e=et.ConstantsUtil.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace),t=this.features?.receive,o=this.remoteFeatures?.onramp&&e,n=eg.ExchangeController.isPayWithExchangeEnabled();return o||t||n?i.html`
      <w3m-tooltip-trigger text="Fund wallet">
        <wui-button
          data-testid="wallet-features-fund-wallet-button"
          @click=${this.onFundWalletClick.bind(this)}
          variant="accent-secondary"
          size="lg"
          fullWidth
        >
          <wui-icon name="dollar"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `:null}swapsTemplate(){let e=this.remoteFeatures?.swaps,t=l.ChainController.state.activeChain===J.ConstantsUtil.CHAIN.EVM;return e&&t?i.html`
      <w3m-tooltip-trigger text="Swap">
        <wui-button
          fullWidth
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          variant="accent-secondary"
          size="lg"
        >
          <wui-icon name="recycleHorizontal"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `:null}sendTemplate(){let e=this.features?.send,t=l.ChainController.state.activeChain,o=et.ConstantsUtil.SEND_SUPPORTED_NAMESPACES.includes(t);return e&&o?i.html`
      <w3m-tooltip-trigger text="Send">
        <wui-button
          fullWidth
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          variant="accent-secondary"
          size="lg"
        >
          <wui-icon name="send"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `:null}watchSwapValues(){this.watchTokenBalance=setInterval(()=>l.ChainController.fetchTokenBalance(e=>this.onTokenBalanceError(e)),1e4)}onTokenBalanceError(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===J.ConstantsUtil.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE&&clearInterval(this.watchTokenBalance)}listContentTemplate(){return 0===this.currentTab?i.html`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:1===this.currentTab?i.html`<w3m-account-activity-widget></w3m-account-activity-widget>`:i.html`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){if(this.tokenBalance&&this.tokenBalance?.length>=0){let e=c.CoreHelperUtil.calculateBalance(this.tokenBalance),{dollars:t="0",pennies:o="00"}=c.CoreHelperUtil.formatTokenBalance(e);return i.html`<wui-balance dollars=${t} pennies=${o}></wui-balance>`}return i.html`<wui-balance dollars="0" pennies="00"></wui-balance>`}tabsTemplate(){let e=eU.HelpersUtil.getTabsByNamespace(l.ChainController.state.activeChain);return 0===e.length?null:i.html`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      .tabs=${e}
    ></wui-tabs>`}onTabChange(e){l.ChainController.setAccountProp("currentTab",e,this.namespace)}onFundWalletClick(){ei.RouterController.push("FundWallet")}onSwapClick(){this.network?.caipNetworkId&&!et.ConstantsUtil.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)?ei.RouterController.push("UnsupportedChain",{swapUnsupportedChain:!0}):(B.EventsController.sendEvent({type:"track",event:"OPEN_SWAP",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:(0,ef.getPreferredAccountType)(l.ChainController.state.activeChain)===eb.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),ei.RouterController.push("Swap"))}getAuthData(){let e=ec.StorageUtil.getConnectedSocialProvider(),t=ec.StorageUtil.getConnectedSocialUsername(),i=ee.ConnectorController.getAuthConnector(),o=i?.provider.getEmail()??"";return{name:ek.ConnectorUtil.getAuthName({email:o,socialUsername:t,socialProvider:e}),icon:e??"mail",iconSize:e?"xl":"md"}}onGoToProfileWalletsView(){ei.RouterController.push("ProfileWallets")}onSendClick(){B.EventsController.sendEvent({type:"track",event:"OPEN_SEND",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:(0,ef.getPreferredAccountType)(l.ChainController.state.activeChain)===eb.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),ei.RouterController.push("WalletSend")}};eG.styles=eV,eK([(0,n.state)()],eG.prototype,"watchTokenBalance",void 0),eK([(0,n.state)()],eG.prototype,"network",void 0),eK([(0,n.state)()],eG.prototype,"profileName",void 0),eK([(0,n.state)()],eG.prototype,"address",void 0),eK([(0,n.state)()],eG.prototype,"currentTab",void 0),eK([(0,n.state)()],eG.prototype,"tokenBalance",void 0),eK([(0,n.state)()],eG.prototype,"features",void 0),eK([(0,n.state)()],eG.prototype,"namespace",void 0),eK([(0,n.state)()],eG.prototype,"activeConnectorIds",void 0),eK([(0,n.state)()],eG.prototype,"remoteFeatures",void 0),eG=eK([(0,h.customElement)("w3m-account-wallet-features-widget")],eG);var eq=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let eY=class extends em.LitElement{constructor(){super(),this.unsubscribe=[],this.namespace=l.ChainController.state.activeChain,this.unsubscribe.push(l.ChainController.subscribeKey("activeChain",e=>{this.namespace=e}))}render(){if(!this.namespace)return null;let e=ee.ConnectorController.getConnectorId(this.namespace),t=ee.ConnectorController.getAuthConnector();return i.html`
      ${t&&e===J.ConstantsUtil.CONNECTOR_ID.AUTH?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return i.html`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return i.html`<w3m-account-default-widget></w3m-account-default-widget>`}};eq([(0,n.state)()],eY.prototype,"namespace",void 0),eY=eq([(0,h.customElement)("w3m-account-view")],eY),e.s(["W3mAccountView",()=>eY],549988);var eX=t;e.i(452283);var eQ=e.i(898527),eJ=e.i(450096),eZ=e.i(971058),e0=e.i(58869),e3=t;e.i(835219),e.i(417203);let e1=g.css`
  wui-image {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  wui-image,
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    border-radius: ${({borderRadius:e})=>e[2]};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    border-radius: 50%;
    padding: ${({spacing:e})=>e["01"]};
  }

  .icon-badge {
    width: 8px;
    height: 8px;
  }
`;var e2=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let e5=class extends e3.LitElement{constructor(){super(...arguments),this.address="",this.profileName="",this.content=[],this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadge=void 0,this.iconBadgeSize="md",this.buttonVariant="neutral-primary",this.enableMoreButton=!1,this.charsStart=4,this.charsEnd=6}render(){return i.html`
      <wui-flex flexDirection="column" rowgap="2">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `}topTemplate(){return i.html`
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          variant="secondary"
          size="md"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          variant="secondary"
          size="md"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton?i.html`<wui-icon-link
              variant="secondary"
              size="md"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>`:null}
      </wui-flex>
    `}bottomTemplate(){return i.html` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `}imageOrIconTemplate(){return this.icon?i.html`
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon size="lg" color="default" name=${this.icon} class="custom-icon"></wui-icon>

            ${this.iconBadge?i.html`<wui-icon
                  color="accent-primary"
                  size="inherit"
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:i.html`
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `}contentTemplate(){return 0===this.content.length?null:i.html`
      <wui-flex flexDirection="column" rowgap="3">
        ${this.content.map(e=>this.labelAndTagTemplate(e))}
      </wui-flex>
    `}labelAndTagTemplate({address:e,profileName:t,label:o,description:n,enableButton:r,buttonType:a,buttonLabel:s,buttonVariant:l,tagVariant:c,tagLabel:d,alignItems:u="flex-end"}){return i.html`
      <wui-flex justifyContent="space-between" alignItems=${u} columngap="1">
        <wui-flex flexDirection="column" rowgap="01">
          ${o?i.html`<wui-text variant="sm-medium" color="secondary">${o}</wui-text>`:null}

          <wui-flex alignItems="center" columngap="1">
            <wui-text variant="md-regular" color="primary">
              ${w.UiHelperUtil.getTruncateString({string:t||e,charsStart:t?16:this.charsStart,charsEnd:t?0:this.charsEnd,truncate:t?"end":"middle"})}
            </wui-text>

            ${c&&d?i.html`<wui-tag variant=${c} size="sm">${d}</wui-tag>`:null}
          </wui-flex>

          ${n?i.html`<wui-text variant="sm-regular" color="secondary">${n}</wui-text>`:null}
        </wui-flex>

        ${r?this.buttonTemplate({buttonType:a,buttonLabel:s,buttonVariant:l}):null}
      </wui-flex>
    `}buttonTemplate({buttonType:e,buttonLabel:t,buttonVariant:o}){return i.html`
      <wui-button
        size="sm"
        variant=${o}
        @click=${"disconnect"===e?this.dispatchDisconnectEvent.bind(this):this.dispatchSwitchEvent.bind(this)}
        data-testid=${"disconnect"===e?"wui-active-profile-wallet-item-disconnect-button":"wui-active-profile-wallet-item-switch-button"}
      >
        ${t}
      </wui-button>
    `}dispatchDisconnectEvent(){this.dispatchEvent(new CustomEvent("disconnect",{bubbles:!0,composed:!0}))}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("switch",{bubbles:!0,composed:!0}))}dispatchExternalLinkEvent(){this.dispatchEvent(new CustomEvent("externalLink",{bubbles:!0,composed:!0}))}dispatchMoreButtonEvent(){this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0}))}dispatchCopyEvent(){this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0}))}};e5.styles=[m.resetStyles,m.elementStyles,e1],e2([(0,o.property)()],e5.prototype,"address",void 0),e2([(0,o.property)()],e5.prototype,"profileName",void 0),e2([(0,o.property)({type:Array})],e5.prototype,"content",void 0),e2([(0,o.property)()],e5.prototype,"alt",void 0),e2([(0,o.property)()],e5.prototype,"imageSrc",void 0),e2([(0,o.property)()],e5.prototype,"icon",void 0),e2([(0,o.property)()],e5.prototype,"iconSize",void 0),e2([(0,o.property)()],e5.prototype,"iconBadge",void 0),e2([(0,o.property)()],e5.prototype,"iconBadgeSize",void 0),e2([(0,o.property)()],e5.prototype,"buttonVariant",void 0),e2([(0,o.property)({type:Boolean})],e5.prototype,"enableMoreButton",void 0),e2([(0,o.property)({type:Number})],e5.prototype,"charsStart",void 0),e2([(0,o.property)({type:Number})],e5.prototype,"charsEnd",void 0),e5=e2([(0,h.customElement)("wui-active-profile-wallet-item")],e5),e.i(915118);var e6=t;let e4=g.css`
  wui-image,
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    border-radius: 50%;
    padding: ${({spacing:e})=>e["01"]};
  }

  .icon-badge {
    width: 8px;
    height: 8px;
  }
`;var e8=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let e7=class extends e6.LitElement{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.buttonLabel="",this.buttonVariant="accent-primary",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadgeSize="md",this.rightIcon="signOut",this.rightIconSize="md",this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return i.html`
      <wui-flex alignItems="center" columngap="2">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `}imageOrIconTemplate(){return this.icon?i.html`
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon size="lg" color="default" name=${this.icon} class="custom-icon"></wui-icon>

            ${this.iconBadge?i.html`<wui-icon
                  color="default"
                  size="inherit"
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:i.html`<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`}labelAndDescriptionTemplate(){return i.html`
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="lg-regular" color="primary">
          ${w.UiHelperUtil.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
        </wui-text>
      </wui-flex>
    `}buttonActionTemplate(){return i.html`
      <wui-flex columngap="1" alignItems="center" justifyContent="center">
        <wui-button
          size="sm"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
          data-testid="wui-inactive-profile-wallet-item-button"
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          variant="secondary"
          size="md"
          icon=${(0,r.ifDefined)(this.rightIcon)}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `}handleButtonClick(){this.dispatchEvent(new CustomEvent("buttonClick",{bubbles:!0,composed:!0}))}handleIconClick(){this.dispatchEvent(new CustomEvent("iconClick",{bubbles:!0,composed:!0}))}};e7.styles=[m.resetStyles,m.elementStyles,e4],e8([(0,o.property)()],e7.prototype,"address",void 0),e8([(0,o.property)()],e7.prototype,"profileName",void 0),e8([(0,o.property)()],e7.prototype,"alt",void 0),e8([(0,o.property)()],e7.prototype,"buttonLabel",void 0),e8([(0,o.property)()],e7.prototype,"buttonVariant",void 0),e8([(0,o.property)()],e7.prototype,"imageSrc",void 0),e8([(0,o.property)()],e7.prototype,"icon",void 0),e8([(0,o.property)()],e7.prototype,"iconSize",void 0),e8([(0,o.property)()],e7.prototype,"iconBadge",void 0),e8([(0,o.property)()],e7.prototype,"iconBadgeSize",void 0),e8([(0,o.property)()],e7.prototype,"rightIcon",void 0),e8([(0,o.property)()],e7.prototype,"rightIconSize",void 0),e8([(0,o.property)({type:Boolean})],e7.prototype,"loading",void 0),e8([(0,o.property)({type:Number})],e7.prototype,"charsStart",void 0),e8([(0,o.property)({type:Number})],e7.prototype,"charsEnd",void 0),e7=e8([(0,h.customElement)("wui-inactive-profile-wallet-item")],e7),e.i(806091);var e9=e.i(408445);let te={getAuthData(e){let t=e.connectorId===J.ConstantsUtil.CONNECTOR_ID.AUTH;if(!t)return{isAuth:!1,icon:void 0,iconSize:void 0,name:void 0};let i=e?.auth?.name??ec.StorageUtil.getConnectedSocialProvider(),o=e?.auth?.username??ec.StorageUtil.getConnectedSocialUsername(),n=ee.ConnectorController.getAuthConnector(),r=n?.provider.getEmail()??"";return{isAuth:!0,icon:i??"mail",iconSize:i?"xl":"md",name:t?ek.ConnectorUtil.getAuthName({email:r,socialUsername:o,socialProvider:i}):void 0}}},tt=g.css`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e["4"]};
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: ${({spacing:e})=>e["4"]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e["4"]};
  }

  wui-separator {
    margin: ${({spacing:e})=>e["2"]} 0 ${({spacing:e})=>e["2"]} 0;
  }

  .active-connection {
    padding: ${({spacing:e})=>e["2"]};
  }

  .recent-connection {
    padding: ${({spacing:e})=>e["2"]} 0 ${({spacing:e})=>e["2"]} 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`;var ti=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let to=4,tn=6,tr="md",ta="lightbulb",ts=[0,1],tl={eip155:"ethereum",solana:"solana",bip122:"bitcoin",ton:"ton",tron:"tron"},tc=[{namespace:"eip155",icon:tl.eip155,label:"EVM"},{namespace:"solana",icon:tl.solana,label:"Solana"},{namespace:"bip122",icon:tl.bip122,label:"Bitcoin"},{namespace:"ton",icon:tl.ton,label:"Ton"},{namespace:"tron",icon:tl.tron,label:"Tron"}],td={eip155:{title:"Add EVM Wallet",description:"Add your first EVM wallet"},solana:{title:"Add Solana Wallet",description:"Add your first Solana wallet"},bip122:{title:"Add Bitcoin Wallet",description:"Add your first Bitcoin wallet"},ton:{title:"Add TON Wallet",description:"Add your first TON wallet"},tron:{title:"Add TRON Wallet",description:"Add your first TRON wallet"}},tu=class extends eX.LitElement{constructor(){super(),this.unsubscribers=[],this.currentTab=0,this.namespace=l.ChainController.state.activeChain,this.namespaces=Array.from(l.ChainController.state.chains.keys()),this.caipAddress=void 0,this.profileName=void 0,this.activeConnectorIds=ee.ConnectorController.state.activeConnectorIds,this.lastSelectedAddress="",this.lastSelectedConnectorId="",this.isSwitching=!1,this.caipNetwork=l.ChainController.state.activeCaipNetwork,this.user=l.ChainController.getAccountData()?.user,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.currentTab=this.namespace?this.namespaces.indexOf(this.namespace):0,this.caipAddress=l.ChainController.getAccountData(this.namespace)?.caipAddress,this.profileName=l.ChainController.getAccountData(this.namespace)?.profileName,this.unsubscribers.push(Z.ConnectionController.subscribeKey("connections",()=>this.onConnectionsChange()),Z.ConnectionController.subscribeKey("recentConnections",()=>this.requestUpdate()),ee.ConnectorController.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),l.ChainController.subscribeKey("activeCaipNetwork",e=>this.caipNetwork=e),l.ChainController.subscribeChainProp("accountState",e=>{this.user=e?.user}),u.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.chainListener=l.ChainController.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName},this.namespace)}disconnectedCallback(){this.unsubscribers.forEach(e=>e()),this.resizeObserver?.disconnect(),this.removeScrollListener(),this.chainListener?.()}firstUpdated(){let e=this.shadowRoot?.querySelector(".wallet-list");if(!e)return;let t=()=>this.updateScrollOpacity(e);requestAnimationFrame(t),e.addEventListener("scroll",t),this.resizeObserver=new ResizeObserver(t),this.resizeObserver.observe(e),t()}render(){let e=this.namespace;if(!e)throw Error("Namespace is not set");return i.html`
      <wui-flex flexDirection="column" .padding=${["0","4","4","4"]} gap="4">
        ${this.renderTabs()} ${this.renderHeader(e)} ${this.renderConnections(e)}
        ${this.renderAddConnectionButton(e)}
      </wui-flex>
    `}renderTabs(){let e=this.namespaces.map(e=>tc.find(t=>t.namespace===e)).filter(Boolean);return e.length>1?i.html`
        <wui-tabs
          .onTabChange=${e=>this.handleTabChange(e)}
          .activeTab=${this.currentTab}
          .tabs=${e}
        ></wui-tabs>
      `:null}renderHeader(e){let t=this.getActiveConnections(e).flatMap(({accounts:e})=>e).length+ +!!this.caipAddress;return i.html`
      <wui-flex alignItems="center" columngap="1">
        <wui-icon
          size="sm"
          name=${tl[e]??tl.eip155}
        ></wui-icon>
        <wui-text color="secondary" variant="lg-regular"
          >${t>1?"Wallets":"Wallet"}</wui-text
        >
        <wui-text
          color="primary"
          variant="lg-regular"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${t}
        </wui-text>
        <wui-link
          color="secondary"
          variant="secondary"
          @click=${()=>Z.ConnectionController.disconnect({namespace:e})}
          ?disabled=${!this.hasAnyConnections(e)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `}renderConnections(e){let t=this.hasAnyConnections(e);return i.html`
      <wui-flex flexDirection="column" class=${(0,eQ.classMap)({"wallet-list":!0,"active-wallets-box":t,"empty-wallet-list-box":!t})} rowgap="3">
        ${t?this.renderActiveConnections(e):this.renderEmptyState(e)}
      </wui-flex>
    `}renderActiveConnections(e){let t=this.getActiveConnections(e),o=this.activeConnectorIds[e],n=this.getPlainAddress();return i.html`
      ${n||o||t.length>0?i.html`<wui-flex
            flexDirection="column"
            .padding=${["4","0","4","0"]}
            class="active-wallets"
          >
            ${this.renderActiveProfile(e)} ${this.renderActiveConnectionsList(e)}
          </wui-flex>`:null}
      ${this.renderRecentConnections(e)}
    `}renderActiveProfile(e){let t=this.activeConnectorIds[e];if(!t)return null;let{connections:o}=eZ.ConnectionControllerUtil.getConnectionsData(e),n=ee.ConnectorController.getConnectorById(t),r=s.AssetUtil.getConnectorImage(n),a=this.getPlainAddress();if(!a)return null;let l=e===J.ConstantsUtil.CHAIN.BITCOIN,c=te.getAuthData({connectorId:t,accounts:[]}),d=this.getActiveConnections(e).flatMap(e=>e.accounts).length>0,u=o.find(e=>e.connectorId===t),h=u?.accounts.filter(e=>!e9.HelpersUtil.isLowerCaseMatch(e.address,a));return i.html`
      <wui-flex flexDirection="column" .padding=${["0","4","0","4"]}>
        <wui-active-profile-wallet-item
          address=${a}
          alt=${n?.name}
          .content=${this.getProfileContent({address:a,connections:o,connectorId:t,namespace:e})}
          .charsStart=${to}
          .charsEnd=${tn}
          .icon=${c.icon}
          .iconSize=${c.iconSize}
          .iconBadge=${this.isSmartAccount(a)?ta:void 0}
          .iconBadgeSize=${this.isSmartAccount(a)?tr:void 0}
          imageSrc=${r}
          ?enableMoreButton=${c.isAuth}
          @copy=${()=>this.handleCopyAddress(a)}
          @disconnect=${()=>this.handleDisconnect(e,t)}
          @switch=${()=>{l&&u&&h?.[0]&&this.handleSwitchWallet(u,h[0].address,e)}}
          @externalLink=${()=>this.handleExternalLink(a)}
          @more=${()=>this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${d?i.html`<wui-separator></wui-separator>`:null}
      </wui-flex>
    `}renderActiveConnectionsList(e){let t=this.getActiveConnections(e);return 0===t.length?null:i.html`
      <wui-flex flexDirection="column" .padding=${["0","2","0","2"]}>
        ${this.renderConnectionList(t,!1,e)}
      </wui-flex>
    `}renderRecentConnections(e){let{recentConnections:t}=eZ.ConnectionControllerUtil.getConnectionsData(e);return 0===t.flatMap(e=>e.accounts).length?null:i.html`
      <wui-flex flexDirection="column" .padding=${["0","2","0","2"]} rowGap="2">
        <wui-text color="secondary" variant="sm-medium" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${["0","2","0","2"]}>
          ${this.renderConnectionList(t,!0,e)}
        </wui-flex>
      </wui-flex>
    `}renderConnectionList(e,t,o){return e.filter(e=>e.accounts.length>0).map((e,n)=>{let r=ee.ConnectorController.getConnectorById(e.connectorId),a=s.AssetUtil.getConnectorImage(r)??"",l=te.getAuthData(e);return e.accounts.map((r,s)=>{let c=this.isAccountLoading(e.connectorId,r.address);return i.html`
            <wui-flex flexDirection="column">
              ${0!==n||0!==s?i.html`<wui-separator></wui-separator>`:null}
              <wui-inactive-profile-wallet-item
                address=${r.address}
                alt=${e.connectorId}
                buttonLabel=${t?"Connect":"Switch"}
                buttonVariant=${t?"neutral-secondary":"accent-secondary"}
                rightIcon=${t?"bin":"power"}
                rightIconSize="sm"
                class=${t?"recent-connection":"active-connection"}
                data-testid=${t?"recent-connection":"active-connection"}
                imageSrc=${a}
                .iconBadge=${this.isSmartAccount(r.address)?ta:void 0}
                .iconBadgeSize=${this.isSmartAccount(r.address)?tr:void 0}
                .icon=${l.icon}
                .iconSize=${l.iconSize}
                .loading=${c}
                .showBalance=${!1}
                .charsStart=${to}
                .charsEnd=${tn}
                @buttonClick=${()=>this.handleSwitchWallet(e,r.address,o)}
                @iconClick=${()=>this.handleWalletAction({connection:e,address:r.address,isRecentConnection:t,namespace:o})}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `})})}renderAddConnectionButton(e){if(!this.isMultiWalletEnabled()&&this.caipAddress||!this.hasAnyConnections(e))return null;let{title:t}=this.getChainLabelInfo(e);return i.html`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${!0}
        @click=${()=>this.handleAddConnection(e)}
        data-testid="add-connection-button"
      >
        <wui-text variant="md-medium" color="secondary">${t}</wui-text>
      </wui-list-item>
    `}renderEmptyState(e){let{title:t,description:o}=this.getChainLabelInfo(e);return i.html`
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowgap="3"
          class="empty-box"
        >
          <wui-icon-box size="xl" icon="wallet" color="secondary"></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="1">
            <wui-text color="primary" variant="lg-regular" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="secondary" variant="md-regular" data-testid="empty-state-description"
              >${o}</wui-text
            >
          </wui-flex>

          <wui-link
            @click=${()=>this.handleAddConnection(e)}
            data-testid="empty-state-button"
            icon="plus"
          >
            ${t}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}handleTabChange(e){let t=this.namespaces[e];t&&(this.chainListener?.(),this.currentTab=this.namespaces.indexOf(t),this.namespace=t,this.caipAddress=l.ChainController.getAccountData(t)?.caipAddress,this.profileName=l.ChainController.getAccountData(t)?.profileName,this.chainListener=l.ChainController.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},t))}async handleSwitchWallet(e,t,i){try{this.isSwitching=!0,this.lastSelectedConnectorId=e.connectorId,this.lastSelectedAddress=t,this.caipNetwork?.chainNamespace!==i&&e?.caipNetwork&&(ee.ConnectorController.setFilterByNamespace(i),await l.ChainController.switchActiveNetwork(e?.caipNetwork)),await Z.ConnectionController.switchConnection({connection:e,address:t,namespace:i,closeModalOnConnect:!1,onChange({hasSwitchedAccount:e,hasSwitchedWallet:t}){t?eo.SnackController.showSuccess("Wallet switched"):e&&eo.SnackController.showSuccess("Account switched")}})}catch(e){eo.SnackController.showError("Failed to switch wallet")}finally{this.isSwitching=!1}}handleWalletAction(e){let{connection:t,address:i,isRecentConnection:o,namespace:n}=e;o?(ec.StorageUtil.deleteAddressFromConnection({connectorId:t.connectorId,address:i,namespace:n}),Z.ConnectionController.syncStorageConnections(),eo.SnackController.showSuccess("Wallet deleted")):this.handleDisconnect(n,t.connectorId)}async handleDisconnect(e,t){try{await Z.ConnectionController.disconnect({id:t,namespace:e}),eo.SnackController.showSuccess("Wallet disconnected")}catch{eo.SnackController.showError("Failed to disconnect wallet")}}handleCopyAddress(e){c.CoreHelperUtil.copyToClopboard(e),eo.SnackController.showSuccess("Address copied")}handleMore(){ei.RouterController.push("AccountSettings")}handleExternalLink(e){let t=this.caipNetwork?.blockExplorers?.default.url;t&&c.CoreHelperUtil.openHref(`${t}/address/${e}`,"_blank")}handleAddConnection(e){ee.ConnectorController.setFilterByNamespace(e),ei.RouterController.push("Connect",{addWalletForNamespace:e})}getChainLabelInfo(e){return td[e]??{title:"Add Wallet",description:"Add your first wallet"}}isSmartAccount(e){if(!this.namespace)return!1;let t=this.user?.accounts?.find(e=>"smartAccount"===e.type);return!!t&&!!e&&e9.HelpersUtil.isLowerCaseMatch(t.address,e)}getPlainAddress(){return this.caipAddress?c.CoreHelperUtil.getPlainAddress(this.caipAddress):void 0}getActiveConnections(e){let t=this.activeConnectorIds[e],{connections:i}=eZ.ConnectionControllerUtil.getConnectionsData(e),[o]=i.filter(e=>e9.HelpersUtil.isLowerCaseMatch(e.connectorId,t));if(!t)return i;let n=e===J.ConstantsUtil.CHAIN.BITCOIN,{address:r}=this.caipAddress?eJ.ParseUtil.parseCaipAddress(this.caipAddress):{},a=[...r?[r]:[]];return n&&o&&(a=o.accounts.map(e=>e.address)||[]),eZ.ConnectionControllerUtil.excludeConnectorAddressFromConnections({connectorId:t,addresses:a,connections:i})}hasAnyConnections(e){let t=this.getActiveConnections(e),{recentConnections:i}=eZ.ConnectionControllerUtil.getConnectionsData(e);return!!this.caipAddress||t.length>0||i.length>0}isAccountLoading(e,t){return e9.HelpersUtil.isLowerCaseMatch(this.lastSelectedConnectorId,e)&&e9.HelpersUtil.isLowerCaseMatch(this.lastSelectedAddress,t)&&this.isSwitching}getProfileContent(e){let{address:t,connections:i,connectorId:o,namespace:n}=e,[r]=i.filter(e=>e9.HelpersUtil.isLowerCaseMatch(e.connectorId,o));if(n===J.ConstantsUtil.CHAIN.BITCOIN&&r?.accounts.every(e=>"string"==typeof e.type))return this.getBitcoinProfileContent(r.accounts,t);let a=te.getAuthData({connectorId:o,accounts:[]});return[{address:t,tagLabel:"Active",tagVariant:"success",enableButton:!0,profileName:this.profileName,buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral-secondary",...a.isAuth?{description:this.isSmartAccount(t)?"Smart Account":"EOA Account"}:{}}]}getBitcoinProfileContent(e,t){let i=e.length>1,o=this.getPlainAddress();return e.map(e=>{let n=e9.HelpersUtil.isLowerCaseMatch(e.address,o),r="PAYMENT";return"ordinal"===e.type&&(r="ORDINALS"),{address:e.address,tagLabel:e9.HelpersUtil.isLowerCaseMatch(e.address,t)?"Active":void 0,tagVariant:e9.HelpersUtil.isLowerCaseMatch(e.address,t)?"success":void 0,enableButton:!0,...i?{label:r,alignItems:"flex-end",buttonType:n?"disconnect":"switch",buttonLabel:n?"Disconnect":"Switch",buttonVariant:n?"neutral-secondary":"accent-secondary"}:{alignItems:"center",buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral-secondary"}}})}removeScrollListener(){let e=this.shadowRoot?.querySelector(".wallet-list");e&&e.removeEventListener("scroll",()=>this.handleConnectListScroll())}handleConnectListScroll(){let e=this.shadowRoot?.querySelector(".wallet-list");e&&this.updateScrollOpacity(e)}isMultiWalletEnabled(){return!!this.remoteFeatures?.multiWallet}updateScrollOpacity(e){e.style.setProperty("--connect-scroll--top-opacity",e0.MathUtil.interpolate([0,50],ts,e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",e0.MathUtil.interpolate([0,50],ts,e.scrollHeight-e.scrollTop-e.offsetHeight).toString())}onConnectionsChange(){if(this.isMultiWalletEnabled()&&this.namespace){let{connections:e}=eZ.ConnectionControllerUtil.getConnectionsData(this.namespace);0===e.length&&ei.RouterController.reset("ProfileWallets")}this.requestUpdate()}};tu.styles=tt,ti([(0,n.state)()],tu.prototype,"currentTab",void 0),ti([(0,n.state)()],tu.prototype,"namespace",void 0),ti([(0,n.state)()],tu.prototype,"namespaces",void 0),ti([(0,n.state)()],tu.prototype,"caipAddress",void 0),ti([(0,n.state)()],tu.prototype,"profileName",void 0),ti([(0,n.state)()],tu.prototype,"activeConnectorIds",void 0),ti([(0,n.state)()],tu.prototype,"lastSelectedAddress",void 0),ti([(0,n.state)()],tu.prototype,"lastSelectedConnectorId",void 0),ti([(0,n.state)()],tu.prototype,"isSwitching",void 0),ti([(0,n.state)()],tu.prototype,"caipNetwork",void 0),ti([(0,n.state)()],tu.prototype,"user",void 0),ti([(0,n.state)()],tu.prototype,"remoteFeatures",void 0),tu=ti([(0,h.customElement)("w3m-profile-wallets-view")],tu),e.s(["W3mProfileWalletsView",()=>tu],911009);var th=t,tp=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let tm=class extends th.LitElement{constructor(){super(),this.unsubscribe=[],this.activeCaipNetwork=l.ChainController.state.activeCaipNetwork,this.features=u.OptionsController.state.features,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.exchangesLoading=eg.ExchangeController.state.isLoading,this.exchanges=eg.ExchangeController.state.exchanges,this.unsubscribe.push(u.OptionsController.subscribeKey("features",e=>this.features=e),u.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),l.ChainController.subscribeKey("activeCaipNetwork",e=>{this.activeCaipNetwork=e,this.setDefaultPaymentAsset()}),eg.ExchangeController.subscribeKey("isLoading",e=>this.exchangesLoading=e),eg.ExchangeController.subscribeKey("exchanges",e=>this.exchanges=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}async firstUpdated(){eg.ExchangeController.isPayWithExchangeSupported()&&(await this.setDefaultPaymentAsset(),await eg.ExchangeController.fetchExchanges())}render(){return i.html`
      <wui-flex flexDirection="column" .padding=${["1","3","3","3"]} gap="2">
        ${this.onrampTemplate()} ${this.receiveTemplate()} ${this.depositFromExchangeTemplate()}
      </wui-flex>
    `}async setDefaultPaymentAsset(){if(!this.activeCaipNetwork)return;let e=await eg.ExchangeController.getAssetsForNetwork(this.activeCaipNetwork.caipNetworkId),t=e.find(e=>"USDC"===e.metadata.symbol)||e[0];t&&eg.ExchangeController.setPaymentAsset(t)}onrampTemplate(){if(!this.activeCaipNetwork)return null;let e=this.remoteFeatures?.onramp,t=et.ConstantsUtil.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.activeCaipNetwork.chainNamespace);return e&&t?i.html`
      <wui-list-item
        @click=${this.onBuyCrypto.bind(this)}
        icon="card"
        data-testid="wallet-features-onramp-button"
      >
        <wui-text variant="lg-regular" color="primary">Buy crypto</wui-text>
      </wui-list-item>
    `:null}depositFromExchangeTemplate(){return this.activeCaipNetwork&&eg.ExchangeController.isPayWithExchangeSupported()?i.html`
      <wui-list-item
        @click=${this.onDepositFromExchange.bind(this)}
        icon="arrowBottomCircle"
        data-testid="wallet-features-deposit-from-exchange-button"
        ?loading=${this.exchangesLoading}
        ?disabled=${this.exchangesLoading||!this.exchanges.length}
      >
        <wui-text variant="lg-regular" color="primary">Deposit from exchange</wui-text>
      </wui-list-item>
    `:null}receiveTemplate(){return this.features?.receive?i.html`
      <wui-list-item
        @click=${this.onReceive.bind(this)}
        icon="qrCode"
        data-testid="wallet-features-receive-button"
      >
        <wui-text variant="lg-regular" color="primary">Receive funds</wui-text>
      </wui-list-item>
    `:null}onBuyCrypto(){ei.RouterController.push("OnRampProviders")}onReceive(){ei.RouterController.push("WalletReceive")}onDepositFromExchange(){eg.ExchangeController.reset(),ei.RouterController.push("PayWithExchange",{redirectView:ei.RouterController.state.data?.redirectView})}};tp([(0,n.state)()],tm.prototype,"activeCaipNetwork",void 0),tp([(0,n.state)()],tm.prototype,"features",void 0),tp([(0,n.state)()],tm.prototype,"remoteFeatures",void 0),tp([(0,n.state)()],tm.prototype,"exchangesLoading",void 0),tp([(0,n.state)()],tm.prototype,"exchanges",void 0),tm=tp([(0,h.customElement)("w3m-fund-wallet-view")],tm),e.s(["W3mFundWalletView",()=>tm],282966),e.i(825408);var tw=t,tg=e.i(418313),tf=e.i(17960),tb=t;let tC=g.css`
  button {
    display: flex;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[4]};
    width: 100%;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    justify-content: center;
    align-items: center;
  }

  :host([data-size='sm']) button {
    padding: ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-size='md']) button {
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
  }

  button:hover {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button:disabled {
    opacity: 0.5;
  }
`;var ty=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let tv=class extends tb.LitElement{constructor(){super(...arguments),this.text="",this.disabled=!1,this.size="lg",this.icon="copy",this.tabIdx=void 0}render(){this.dataset.size=this.size;let e=`${this.size}-regular`;return i.html`
      <button ?disabled=${this.disabled} tabindex=${(0,r.ifDefined)(this.tabIdx)}>
        <wui-icon name=${this.icon} size=${this.size} color="default"></wui-icon>
        <wui-text align="center" variant=${e} color="primary">${this.text}</wui-text>
      </button>
    `}};tv.styles=[m.resetStyles,m.elementStyles,tC],ty([(0,o.property)()],tv.prototype,"text",void 0),ty([(0,o.property)({type:Boolean})],tv.prototype,"disabled",void 0),ty([(0,o.property)()],tv.prototype,"size",void 0),ty([(0,o.property)()],tv.prototype,"icon",void 0),ty([(0,o.property)()],tv.prototype,"tabIdx",void 0),tv=ty([(0,h.customElement)("wui-list-button")],tv),e.i(300622);var tx=e.i(531672),tk=t;e.i(560589);var t$=e.i(467708),tE=e.i(48706),tS=e.i(602896);e.i(656751),e.i(563810);var tA=e.i(417225);let tN=g.css`
  wui-separator {
    margin: ${({spacing:e})=>e["3"]} calc(${({spacing:e})=>e["3"]} * -1);
    width: calc(100% + ${({spacing:e})=>e["3"]} * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: ${({spacing:e})=>e["2"]};
  }

  wui-loading-spinner {
    right: ${({spacing:e})=>e["3"]};
  }

  wui-text {
    margin: ${({spacing:e})=>e["2"]} ${({spacing:e})=>e["3"]}
      ${({spacing:e})=>e["0"]} ${({spacing:e})=>e["3"]};
  }
`;var tI=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let tR=class extends tk.LitElement{constructor(){super(),this.unsubscribe=[],this.formRef=(0,t$.createRef)(),this.email="",this.loading=!1,this.error="",this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.hasExceededUsageLimit=tS.ApiController.state.plan.hasExceededUsageLimit,this.unsubscribe.push(u.OptionsController.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}),tS.ApiController.subscribeKey("plan",e=>this.hasExceededUsageLimit=e.hasExceededUsageLimit))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){let e=Z.ConnectionController.hasAnyConnection(J.ConstantsUtil.CONNECTOR_ID.AUTH);return i.html`
      <form ${(0,t$.ref)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${(0,r.ifDefined)(this.tabIdx)}
          ?disabled=${e||this.hasExceededUsageLimit}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `}submitButtonTemplate(){return!this.loading&&this.email.length>3?i.html`
          <wui-icon-link
            size="lg"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?i.html`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:null}templateError(){return this.error?i.html`<wui-text variant="sm-medium" color="error">${this.error}</wui-text>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}async onSubmitEmail(e){if(!eU.HelpersUtil.isValidEmail(this.email))return void tE.AlertController.open({displayMessage:tA.ErrorUtil.ALERT_WARNINGS.INVALID_EMAIL.displayMessage},"warning");if(!J.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(e=>e===l.ChainController.state.activeChain)){let e=l.ChainController.getFirstCaipNetworkSupportsAuthConnector();if(e)return void ei.RouterController.push("SwitchNetwork",{network:e})}try{if(this.loading)return;this.loading=!0,e.preventDefault();let t=ee.ConnectorController.getAuthConnector();if(!t)throw Error("w3m-email-login-widget: Auth connector not found");let{action:i}=await t.provider.connectEmail({email:this.email});if(B.EventsController.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),"VERIFY_OTP"===i)B.EventsController.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),ei.RouterController.push("EmailVerifyOtp",{email:this.email});else if("VERIFY_DEVICE"===i)ei.RouterController.push("EmailVerifyDevice",{email:this.email});else if("CONNECT"===i){let e=this.remoteFeatures?.multiWallet;await Z.ConnectionController.connectExternal(t,l.ChainController.state.activeChain),e?(ei.RouterController.replace("ProfileWallets"),eo.SnackController.showSuccess("New Wallet Added")):ei.RouterController.replace("Account")}}catch(t){let e=c.CoreHelperUtil.parseError(t);e?.includes("Invalid email")?this.error="Invalid email. Try again.":eo.SnackController.showError(t)}finally{this.loading=!1}}onFocusEvent(){B.EventsController.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};tR.styles=tN,tI([(0,o.property)()],tR.prototype,"tabIdx",void 0),tI([(0,n.state)()],tR.prototype,"email",void 0),tI([(0,n.state)()],tR.prototype,"loading",void 0),tI([(0,n.state)()],tR.prototype,"error",void 0),tI([(0,n.state)()],tR.prototype,"remoteFeatures",void 0),tI([(0,n.state)()],tR.prototype,"hasExceededUsageLimit",void 0),tR=tI([(0,h.customElement)("w3m-email-login-widget")],tR),e.i(378703);var tT=t,tO=e.i(843540);e.i(418826);var tU=t;e.i(243171);let tD=g.css`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;var tP=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let tL=class extends tU.LitElement{constructor(){super(...arguments),this.logo="google",this.disabled=!1,this.tabIdx=void 0}render(){return i.html`
      <button ?disabled=${this.disabled} tabindex=${(0,r.ifDefined)(this.tabIdx)}>
        <wui-icon size="xxl" name=${this.logo}></wui-icon>
      </button>
    `}};tL.styles=[m.resetStyles,m.elementStyles,tD],tP([(0,o.property)()],tL.prototype,"logo",void 0),tP([(0,o.property)({type:Boolean})],tL.prototype,"disabled",void 0),tP([(0,o.property)()],tL.prototype,"tabIdx",void 0),tL=tP([(0,h.customElement)("wui-logo-select")],tL);var tj=e.i(349631);let tW=g.css`
  wui-separator {
    margin: ${({spacing:e})=>e["3"]} calc(${({spacing:e})=>e["3"]} * -1)
      ${({spacing:e})=>e["3"]} calc(${({spacing:e})=>e["3"]} * -1);
    width: calc(100% + ${({spacing:e})=>e["3"]} * 2);
  }
`;var tF=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let tz=class extends tT.LitElement{constructor(){super(),this.unsubscribe=[],this.walletGuide="get-started",this.tabIdx=void 0,this.connectors=ee.ConnectorController.state.connectors,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.isPwaLoading=!1,this.hasExceededUsageLimit=tS.ApiController.state.plan.hasExceededUsageLimit,this.unsubscribe.push(ee.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type)}),u.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),tS.ApiController.subscribeKey("plan",e=>this.hasExceededUsageLimit=e.hasExceededUsageLimit))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="2"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `}topViewTemplate(){let e="explore"===this.walletGuide,t=this.remoteFeatures?.socials;return!t&&e?(t=et.ConstantsUtil.DEFAULT_SOCIALS,this.renderTopViewContent(t)):t?this.renderTopViewContent(t):null}renderTopViewContent(e){return 2===e.length?i.html` <wui-flex gap="2">
        ${e.slice(0,2).map(e=>i.html`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
              tabIdx=${(0,r.ifDefined)(this.tabIdx)}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
      </wui-flex>`:i.html` <wui-list-button
      data-testid=${`social-selector-${e[0]}`}
      @click=${()=>{this.onSocialClick(e[0])}}
      size="lg"
      icon=${(0,r.ifDefined)(e[0])}
      text=${`Continue with ${w.UiHelperUtil.capitalize(e[0])}`}
      tabIdx=${(0,r.ifDefined)(this.tabIdx)}
      ?disabled=${this.isPwaLoading||this.hasConnection()}
    ></wui-list-button>`}bottomViewTemplate(){let e=this.remoteFeatures?.socials,t="explore"===this.walletGuide;return(this.authConnector&&e&&0!==e.length||!t||(e=et.ConstantsUtil.DEFAULT_SOCIALS),!e||e.length<=2)?null:e&&e.length>6?i.html`<wui-flex gap="2">
        ${e.slice(1,5).map(e=>i.html`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
              tabIdx=${(0,r.ifDefined)(this.tabIdx)}
              ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${(0,r.ifDefined)(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading||this.hasConnection()}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`:e?i.html`<wui-flex gap="2">
      ${e.slice(1,e.length).map(e=>i.html`<wui-logo-select
            data-testid=${`social-selector-${e}`}
            @click=${()=>{this.onSocialClick(e)}}
            logo=${e}
            tabIdx=${(0,r.ifDefined)(this.tabIdx)}
            ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
            ?disabled=${this.isPwaLoading||this.hasConnection()}
          ></wui-logo-select>`)}
    </wui-flex>`:null}onMoreSocialsClick(){ei.RouterController.push("ConnectSocials")}async onSocialClick(e){if(this.hasExceededUsageLimit)return void ei.RouterController.push("UsageExceeded");if(!J.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(e=>e===l.ChainController.state.activeChain)){let e=l.ChainController.getFirstCaipNetworkSupportsAuthConnector();if(e)return void ei.RouterController.push("SwitchNetwork",{network:e})}e&&await (0,tO.executeSocialLogin)(e)}async handlePwaFrameLoad(){if(c.CoreHelperUtil.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof tj.W3mFrameProvider&&await this.authConnector.provider.init()}catch(e){tE.AlertController.open({displayMessage:"Error loading embedded wallet in PWA",debugMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}hasConnection(){return Z.ConnectionController.hasAnyConnection(J.ConstantsUtil.CONNECTOR_ID.AUTH)}};tz.styles=tW,tF([(0,o.property)()],tz.prototype,"walletGuide",void 0),tF([(0,o.property)()],tz.prototype,"tabIdx",void 0),tF([(0,n.state)()],tz.prototype,"connectors",void 0),tF([(0,n.state)()],tz.prototype,"remoteFeatures",void 0),tF([(0,n.state)()],tz.prototype,"authConnector",void 0),tF([(0,n.state)()],tz.prototype,"isPwaLoading",void 0),tF([(0,n.state)()],tz.prototype,"hasExceededUsageLimit",void 0),tz=tF([(0,h.customElement)("w3m-social-login-widget")],tz);var tB=t;e.i(271627),e.i(389643);var t_=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let tM=class extends tB.LitElement{constructor(){super(...arguments),this.tabIdx=void 0}render(){return i.html`
      <wui-flex flexDirection="column" gap="2">
        <w3m-connector-list tabIdx=${(0,r.ifDefined)(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${(0,r.ifDefined)(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `}};t_([(0,o.property)()],tM.prototype,"tabIdx",void 0),tM=t_([(0,h.customElement)("w3m-wallet-login-list")],tM);let tH=g.css`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: ${({spacing:e})=>e["3"]} calc(${({spacing:e})=>e["3"]} * -1);
    width: calc(100% + ${({spacing:e})=>e["3"]} * 2);
  }
`;var tV=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let tK=class extends tw.LitElement{constructor(){super(),this.unsubscribe=[],this.connectors=ee.ConnectorController.state.connectors,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.features=u.OptionsController.state.features,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.enableWallets=u.OptionsController.state.enableWallets,this.noAdapters=l.ChainController.state.noAdapters,this.walletGuide="get-started",this.checked=tg.OptionsStateController.state.isLegalCheckboxChecked,this.isEmailEnabled=this.remoteFeatures?.email&&!l.ChainController.state.noAdapters,this.isSocialEnabled=this.remoteFeatures?.socials&&this.remoteFeatures.socials.length>0&&!l.ChainController.state.noAdapters,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors),this.unsubscribe.push(ee.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)}),u.OptionsController.subscribeKey("features",e=>{this.features=e}),u.OptionsController.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e,this.setEmailAndSocialEnableCheck(this.noAdapters,this.remoteFeatures)}),u.OptionsController.subscribeKey("enableWallets",e=>this.enableWallets=e),l.ChainController.subscribeKey("noAdapters",e=>this.setEmailAndSocialEnableCheck(e,this.remoteFeatures)),tg.OptionsStateController.subscribeKey("isLegalCheckboxChecked",e=>this.checked=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();let e=this.shadowRoot?.querySelector(".connect");e?.removeEventListener("scroll",this.handleConnectListScroll.bind(this))}firstUpdated(){let e=this.shadowRoot?.querySelector(".connect");e&&(requestAnimationFrame(this.handleConnectListScroll.bind(this)),e?.addEventListener("scroll",this.handleConnectListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleConnectListScroll()}),this.resizeObserver?.observe(e),this.handleConnectListScroll())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=u.OptionsController.state,o=u.OptionsController.state.features?.legalCheckbox,n=!!(e||t)&&!!o&&"get-started"===this.walletGuide&&!this.checked,r=u.OptionsController.state.enableWalletGuide,a=this.enableWallets,s=this.isSocialEnabled||this.authConnector;return i.html`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          .padding=${["0","0","4","0"]}
          class=${(0,eQ.classMap)({connect:!0,disabled:n})}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="2"
            .padding=${s&&a&&r&&"get-started"===this.walletGuide?["0","3","0","3"]:["0","3","3","3"]}
          >
            ${this.renderConnectMethod(n?-1:void 0)}
          </wui-flex>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `}reownBrandingTemplate(){return eU.HelpersUtil.hasFooter()||!this.remoteFeatures?.reownBranding?null:i.html`<wui-ux-by-reown></wui-ux-by-reown>`}setEmailAndSocialEnableCheck(e,t){this.isEmailEnabled=t?.email&&!e,this.isSocialEnabled=t?.socials&&t.socials.length>0&&!e,this.remoteFeatures=t,this.noAdapters=e}checkIfAuthEnabled(e){let t=e.filter(e=>e.type===tx.ConstantsUtil.CONNECTOR_TYPE_AUTH).map(e=>e.chain);return J.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(e=>t.includes(e))}renderConnectMethod(e){let t=tf.WalletUtil.getConnectOrderMethod(this.features,this.connectors);return i.html`${t.map((t,o)=>{switch(t){case"email":return i.html`${this.emailTemplate(e)} ${this.separatorTemplate(o,"email")}`;case"social":return i.html`${this.socialListTemplate(e)}
          ${this.separatorTemplate(o,"social")}`;case"wallet":return i.html`${this.walletListTemplate(e)}
          ${this.separatorTemplate(o,"wallet")}`;default:return null}})}`}checkMethodEnabled(e){switch(e){case"wallet":return this.enableWallets;case"social":return this.isSocialEnabled&&this.isAuthEnabled;case"email":return this.isEmailEnabled&&this.isAuthEnabled;default:return null}}checkIsThereNextMethod(e){let t=tf.WalletUtil.getConnectOrderMethod(this.features,this.connectors)[e+1];return t?this.checkMethodEnabled(t)?t:this.checkIsThereNextMethod(e+1):void 0}separatorTemplate(e,t){let o=this.checkIsThereNextMethod(e),n="explore"===this.walletGuide;switch(t){case"wallet":return this.enableWallets&&o&&!n?i.html`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;case"email":return this.isAuthEnabled&&this.isEmailEnabled&&"social"!==o&&o?i.html`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`:null;case"social":return this.isAuthEnabled&&this.isSocialEnabled&&"email"!==o&&o?i.html`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;default:return null}}emailTemplate(e){return this.isEmailEnabled&&this.isAuthEnabled?i.html`<w3m-email-login-widget tabIdx=${(0,r.ifDefined)(e)}></w3m-email-login-widget>`:null}socialListTemplate(e){return this.isSocialEnabled&&this.isAuthEnabled?i.html`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,r.ifDefined)(e)}
    ></w3m-social-login-widget>`:null}walletListTemplate(e){let t=this.enableWallets,o=this.features?.emailShowWallets===!1,n=this.features?.collapseWallets;return t?(c.CoreHelperUtil.isTelegram()&&(c.CoreHelperUtil.isSafari()||c.CoreHelperUtil.isIos())&&Z.ConnectionController.connectWalletConnect().catch(e=>({})),"explore"===this.walletGuide)?null:this.isAuthEnabled&&(this.isEmailEnabled||this.isSocialEnabled)&&(o||n)?i.html`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${(0,r.ifDefined)(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
        icon="wallet"
      ></wui-list-button>`:i.html`<w3m-wallet-login-list tabIdx=${(0,r.ifDefined)(e)}></w3m-wallet-login-list>`:null}legalCheckboxTemplate(){return"explore"===this.walletGuide?null:i.html`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`}handleConnectListScroll(){let e=this.shadowRoot?.querySelector(".connect");e&&(e.scrollHeight>470?(e.style.setProperty("--connect-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 100px,
          black calc(100% - 100px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--connect-scroll--top-opacity",e0.MathUtil.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",e0.MathUtil.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--connect-mask-image","none"),e.style.setProperty("--connect-scroll--top-opacity","0"),e.style.setProperty("--connect-scroll--bottom-opacity","0")))}onContinueWalletClick(){ei.RouterController.push("ConnectWallets")}};tK.styles=tH,tV([(0,n.state)()],tK.prototype,"connectors",void 0),tV([(0,n.state)()],tK.prototype,"authConnector",void 0),tV([(0,n.state)()],tK.prototype,"features",void 0),tV([(0,n.state)()],tK.prototype,"remoteFeatures",void 0),tV([(0,n.state)()],tK.prototype,"enableWallets",void 0),tV([(0,n.state)()],tK.prototype,"noAdapters",void 0),tV([(0,o.property)()],tK.prototype,"walletGuide",void 0),tV([(0,n.state)()],tK.prototype,"checked",void 0),tV([(0,n.state)()],tK.prototype,"isEmailEnabled",void 0),tV([(0,n.state)()],tK.prototype,"isSocialEnabled",void 0),tV([(0,n.state)()],tK.prototype,"isAuthEnabled",void 0),tK=tV([(0,h.customElement)("w3m-connect-view")],tK),e.s(["W3mConnectView",()=>tK],133894);var tG=e.i(48060),tq=e.i(355736),tY=e.i(596559);let tX=class extends tY.W3mConnectingWidget{constructor(){if(super(),this.externalViewUnsubscribe=[],this.connectionsByNamespace=Z.ConnectionController.getConnections(this.connector?.chain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.currentActiveConnectorId=ee.ConnectorController.state.activeConnectorIds[this.connector?.chain],!this.connector)throw Error("w3m-connecting-view: No connector provided");const e=this.connector?.chain;this.isAlreadyConnected(this.connector)&&(this.secondaryBtnLabel=void 0,this.label=`This account is already linked, change your account in ${this.connector.name}`,this.secondaryLabel=`To link a new account, open ${this.connector.name} and switch to the account you want to link`),B.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:ei.RouterController.state.view}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1,this.externalViewUnsubscribe.push(ee.ConnectorController.subscribeKey("activeConnectorIds",t=>{let i=t[e],o=this.remoteFeatures?.multiWallet,{redirectView:n}=ei.RouterController.state.data??{};i!==this.currentActiveConnectorId&&(this.hasMultipleConnections&&o?(ei.RouterController.replace("ProfileWallets"),eo.SnackController.showSuccess("New Wallet Added")):n?ei.RouterController.replace(n):d.ModalController.close())}),Z.ConnectionController.subscribeKey("connections",this.onConnectionsChange.bind(this)))}disconnectedCallback(){this.externalViewUnsubscribe.forEach(e=>e())}async onConnectProxy(){try{if(this.error=!1,this.connector){if(this.isAlreadyConnected(this.connector))return;this.connector.id===J.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK&&this.error||await Z.ConnectionController.connectExternal(this.connector,this.connector.chain)}}catch(e){e instanceof tq.AppKitError&&e.originalName===tG.ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?B.EventsController.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:e.message}}):B.EventsController.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}onConnectionsChange(e){if(this.connector?.chain&&e.get(this.connector.chain)&&this.isAlreadyConnected(this.connector)){let t=e.get(this.connector.chain)??[],i=this.remoteFeatures?.multiWallet;if(0===t.length)ei.RouterController.replace("Connect");else{let e=eZ.ConnectionControllerUtil.getConnectionsByConnectorId(this.connectionsByNamespace,this.connector.id).flatMap(e=>e.accounts),o=eZ.ConnectionControllerUtil.getConnectionsByConnectorId(t,this.connector.id).flatMap(e=>e.accounts);0===o.length?this.hasMultipleConnections&&i?(ei.RouterController.replace("ProfileWallets"),eo.SnackController.showSuccess("Wallet deleted")):d.ModalController.close():!e.every(e=>o.some(t=>e9.HelpersUtil.isLowerCaseMatch(e.address,t.address)))&&i&&ei.RouterController.replace("ProfileWallets")}}}isAlreadyConnected(e){return!!e&&this.connectionsByNamespace.some(t=>e9.HelpersUtil.isLowerCaseMatch(t.connectorId,e.id))}};tX=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("w3m-connecting-external-view")],tX),e.s(["W3mConnectingExternalView",()=>tX],139283);var tQ=t;e.i(883679);let tJ=E.css`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`;var tZ=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let t0=class extends tQ.LitElement{constructor(){super(),this.unsubscribe=[],this.activeConnector=ee.ConnectorController.state.activeConnector,this.unsubscribe.push(ee.ConnectorController.subscribeKey("activeConnector",e=>this.activeConnector=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3","5","5","5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${(0,r.ifDefined)(s.AssetUtil.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["0","3","0","3"]}
        >
          <wui-text variant="lg-medium" color="primary">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","2","0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `}networksTemplate(){return this.activeConnector?.connectors?.map((e,t)=>e.name?i.html`
            <w3m-list-wallet
              displayIndex=${t}
              imageSrc=${(0,r.ifDefined)(s.AssetUtil.getChainImage(e.chain))}
              name=${J.ConstantsUtil.CHAIN_NAME_MAP[e.chain]}
              @click=${()=>this.onConnector(e)}
              size="sm"
              data-testid="wui-list-chain-${e.chain}"
              rdnsId=${e.explorerWallet?.rdns}
            ></w3m-list-wallet>
          `:null)}onConnector(e){let t=this.activeConnector?.connectors?.find(t=>t.chain===e.chain),i=ei.RouterController.state.data?.redirectView;t?"walletConnect"===t.id?c.CoreHelperUtil.isMobile()?ei.RouterController.push("AllWallets"):ei.RouterController.push("ConnectingWalletConnect",{redirectView:i}):ei.RouterController.push("ConnectingExternal",{connector:t,redirectView:i,wallet:this.activeConnector?.explorerWallet}):eo.SnackController.showError("Failed to find connector")}};t0.styles=tJ,tZ([(0,n.state)()],t0.prototype,"activeConnector",void 0),t0=tZ([(0,h.customElement)("w3m-connecting-multi-chain-view")],t0),e.s(["W3mConnectingMultiChainView",()=>t0],39959),e.i(319983),e.i(203783);var t3=t,t1=e.i(538124);e.i(711844);let t2=E.css`
  .continue-button-container {
    width: 100%;
  }
`;var t5=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let t6=class extends t3.LitElement{constructor(){super(...arguments),this.loading=!1}render(){return i.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="6"
        .padding=${["0","0","4","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{c.CoreHelperUtil.openHref(t1.NavigationUtil.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return i.html` <wui-flex
      flexDirection="column"
      gap="6"
      alignItems="center"
      .padding=${["0","6","0","6"]}
    >
      <wui-flex gap="3" alignItems="center" justifyContent="center">
        <wui-icon-box icon="id" size="xl" iconSize="xxl" color="default"></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="3">
        <wui-text align="center" variant="lg-medium" color="primary">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="md-regular" color="primary">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return i.html`<wui-flex
      .padding=${["0","8","0","8"]}
      gap="3"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`}handleContinue(){ei.RouterController.push("RegisterAccountName"),B.EventsController.sendEvent({type:"track",event:"OPEN_ENS_FLOW",properties:{isSmartAccount:(0,ef.getPreferredAccountType)(l.ChainController.state.activeChain)===eb.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}})}};t6.styles=t2,t5([(0,n.state)()],t6.prototype,"loading",void 0),t6=t5([(0,h.customElement)("w3m-choose-account-name-view")],t6),e.s(["W3mChooseAccountNameView",()=>t6],970431),e.i(950910);var t4=t;let t8=class extends t4.LitElement{render(){return i.html`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="2">
        ${this.recommendedWalletsTemplate()}
        <w3m-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          size="sm"
          @click=${()=>{c.CoreHelperUtil.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></w3m-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){let{recommended:e,featured:t}=tS.ApiController.state,{customWallets:o}=u.OptionsController.state;return[...t,...o??[],...e].slice(0,4).map((e,t)=>i.html`
        <w3m-list-wallet
          displayIndex=${t}
          name=${e.name??"Unknown"}
          tagVariant="accent"
          size="sm"
          imageSrc=${(0,r.ifDefined)(s.AssetUtil.getWalletImage(e))}
          @click=${()=>{this.onWalletClick(e)}}
        ></w3m-list-wallet>
      `)}onWalletClick(e){B.EventsController.sendEvent({type:"track",event:"GET_WALLET",properties:{name:e.name,walletRank:void 0,explorerId:e.id,type:"homepage"}}),c.CoreHelperUtil.openHref(e.homepage??"https://walletconnect.com/explorer","_blank")}};t8=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("w3m-get-wallet-view")],t8),e.s(["W3mGetWalletView",()=>t8],224251);var t7=t,t9=t;e.i(654618);var ie=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let it=class extends t9.LitElement{constructor(){super(...arguments),this.data=[]}render(){return i.html`
      <wui-flex flexDirection="column" alignItems="center" gap="4">
        ${this.data.map(e=>i.html`
            <wui-flex flexDirection="column" alignItems="center" gap="5">
              <wui-flex flexDirection="row" justifyContent="center" gap="1">
                ${e.images.map(e=>i.html`<wui-visual size="sm" name=${e}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="1">
              <wui-text variant="md-regular" color="primary" align="center">${e.title}</wui-text>
              <wui-text variant="sm-regular" color="secondary" align="center"
                >${e.text}</wui-text
              >
            </wui-flex>
          `)}
      </wui-flex>
    `}};ie([(0,o.property)({type:Array})],it.prototype,"data",void 0),it=ie([(0,h.customElement)("w3m-help-widget")],it);let ii=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}],io=class extends t7.LitElement{render(){return i.html`
      <wui-flex
        flexDirection="column"
        .padding=${["6","5","5","5"]}
        alignItems="center"
        gap="5"
      >
        <w3m-help-widget .data=${ii}></w3m-help-widget>
        <wui-button variant="accent-primary" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){B.EventsController.sendEvent({type:"track",event:"CLICK_GET_WALLET_HELP"}),ei.RouterController.push("GetWallet")}};io=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("w3m-what-is-a-wallet-view")],io),e.s(["W3mWhatIsAWalletView",()=>io],449814);var ir=t;let ia=g.css`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var is=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let il=class extends ir.LitElement{constructor(){super(),this.unsubscribe=[],this.checked=tg.OptionsStateController.state.isLegalCheckboxChecked,this.unsubscribe.push(tg.OptionsStateController.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=u.OptionsController.state,o=u.OptionsController.state.features?.legalCheckbox,n=!!(e||t)&&!!o,a=n&&!this.checked;return i.html`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${n?["0","3","3","3"]:"3"}
        gap="2"
        class=${(0,r.ifDefined)(a?"disabled":void 0)}
      >
        <w3m-wallet-login-list tabIdx=${(0,r.ifDefined)(a?-1:void 0)}></w3m-wallet-login-list>
      </wui-flex>
    `}};il.styles=ia,is([(0,n.state)()],il.prototype,"checked",void 0),il=is([(0,h.customElement)("w3m-connect-wallets-view")],il),e.s(["W3mConnectWalletsView",()=>il],651929);var ic=t,id=e.i(585342),iu=t;let ih=g.css`
  :host {
    display: block;
    width: 120px;
    height: 120px;
  }

  svg {
    width: 120px;
    height: 120px;
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: ${e=>e.colors.accent100};
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`,ip=class extends iu.LitElement{render(){return i.html`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};ip.styles=[m.resetStyles,ih],ip=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("wui-loading-hexagon")],ip),e.i(594022);let im=E.css`
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

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;var iw=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let ig=class extends ic.LitElement{constructor(){super(),this.network=ei.RouterController.state.data?.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw Error("w3m-network-switch-view: No network provided");this.onShowRetry();let e=this.getLabel(),t=this.getSubLabel();return i.html`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","10","5"]}
        gap="7"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${(0,r.ifDefined)(s.AssetUtil.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:i.html`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box color="error" icon="close" size="sm"></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="h6-regular" color="primary">${e}</wui-text>
          <wui-text align="center" variant="md-regular" color="secondary">${t}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent-primary"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}getSubLabel(){let e=ee.ConnectorController.getConnectorId(l.ChainController.state.activeChain);return ee.ConnectorController.getAuthConnector()&&e===J.ConstantsUtil.CONNECTOR_ID.AUTH?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){let e=ee.ConnectorController.getConnectorId(l.ChainController.state.activeChain);return ee.ConnectorController.getAuthConnector()&&e===J.ConstantsUtil.CONNECTOR_ID.AUTH?`Switching to ${this.network?.name??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}async onSwitchNetwork(){try{this.error=!1,l.ChainController.state.activeChain!==this.network?.chainNamespace&&l.ChainController.setIsSwitchingNamespace(!0),this.network&&(await l.ChainController.switchActiveNetwork(this.network),await id.SIWXUtil.isAuthenticated()&&ei.RouterController.goBack())}catch(e){this.error=!0}}};ig.styles=im,iw([(0,n.state)()],ig.prototype,"showRetry",void 0),iw([(0,n.state)()],ig.prototype,"error",void 0),ig=iw([(0,h.customElement)("w3m-network-switch-view")],ig),e.s(["W3mNetworkSwitchView",()=>ig],30601);var ib=t,iC=e.i(670747);e.i(995278);var iy=t;let iv=g.css`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-text {
    text-transform: capitalize;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var ix=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let ik=class extends iy.LitElement{constructor(){super(...arguments),this.imageSrc=void 0,this.name="Ethereum",this.disabled=!1}render(){return i.html`
      <button ?disabled=${this.disabled} tabindex=${(0,r.ifDefined)(this.tabIdx)}>
        <wui-flex gap="2" alignItems="center">
          ${this.imageTemplate()}
          <wui-text variant="lg-regular" color="primary">${this.name}</wui-text>
        </wui-flex>
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `}imageTemplate(){return this.imageSrc?i.html`<wui-image ?boxed=${!0} src=${this.imageSrc}></wui-image>`:i.html`<wui-image
      ?boxed=${!0}
      icon="networkPlaceholder"
      size="lg"
      iconColor="default"
    ></wui-image>`}};ik.styles=[m.resetStyles,m.elementStyles,iv],ix([(0,o.property)()],ik.prototype,"imageSrc",void 0),ix([(0,o.property)()],ik.prototype,"name",void 0),ix([(0,o.property)()],ik.prototype,"tabIdx",void 0),ix([(0,o.property)({type:Boolean})],ik.prototype,"disabled",void 0),ik=ix([(0,h.customElement)("wui-list-network")],ik);let i$=E.css`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`;var iE=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let iS=class extends ib.LitElement{constructor(){super(),this.unsubscribe=[],this.network=l.ChainController.state.activeCaipNetwork,this.requestedCaipNetworks=l.ChainController.getCaipNetworks(),this.search="",this.onDebouncedSearch=c.CoreHelperUtil.debounce(e=>{this.search=e},100),this.unsubscribe.push(a.AssetController.subscribeNetworkImages(()=>this.requestUpdate()),l.ChainController.subscribeKey("activeCaipNetwork",e=>this.network=e),l.ChainController.subscribe(()=>{this.requestedCaipNetworks=l.ChainController.getAllRequestedCaipNetworks()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0","3","3","3"]}
        flexDirection="column"
        gap="2"
      >
        ${this.networksTemplate()}
      </wui-flex>
    `}templateSearchInput(){return i.html`
      <wui-flex gap="2" .padding=${["0","3","3","3"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}networksTemplate(){let e=l.ChainController.getAllApprovedCaipNetworkIds(),t=c.CoreHelperUtil.sortRequestedNetworks(e,this.requestedCaipNetworks);return this.search?this.filteredNetworks=t?.filter(e=>e?.name?.toLowerCase().includes(this.search.toLowerCase())):this.filteredNetworks=t,this.filteredNetworks?.map(e=>i.html`
        <wui-list-network
          .selected=${this.network?.id===e.id}
          imageSrc=${(0,r.ifDefined)(s.AssetUtil.getNetworkImage(e))}
          type="network"
          name=${e.name??e.id}
          @click=${()=>this.onSwitchNetwork(e)}
          .disabled=${l.ChainController.isCaipNetworkDisabled(e)}
          data-testid=${`w3m-network-switch-${e.name??e.id}`}
        ></wui-list-network>
      `)}onSwitchNetwork(e){iC.NetworkUtil.onSwitchNetwork({network:e})}};iS.styles=i$,iE([(0,n.state)()],iS.prototype,"network",void 0),iE([(0,n.state)()],iS.prototype,"requestedCaipNetworks",void 0),iE([(0,n.state)()],iS.prototype,"filteredNetworks",void 0),iE([(0,n.state)()],iS.prototype,"search",void 0),iS=iE([(0,h.customElement)("w3m-networks-view")],iS),e.s(["W3mNetworksView",()=>iS],638668);var iA=t;let iN=g.css`
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

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    border-radius: calc(
      ${({borderRadius:e})=>e["1"]} * 9 - ${({borderRadius:e})=>e["3"]}
    );
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(
      ${({borderRadius:e})=>e["1"]} * 9 - ${({borderRadius:e})=>e["3"]}
    );
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e["1"]} * -1);
    bottom: calc(${({spacing:e})=>e["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
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

  wui-link {
    padding: ${({spacing:e})=>e["01"]} ${({spacing:e})=>e["2"]};
  }

  .capitalize {
    text-transform: capitalize;
  }
`;var iI=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let iR={eip155:"eth",solana:"solana",bip122:"bitcoin",polkadot:void 0},iT=class extends iA.LitElement{constructor(){super(...arguments),this.unsubscribe=[],this.switchToChain=ei.RouterController.state.data?.switchToChain,this.caipNetwork=ei.RouterController.state.data?.network,this.activeChain=l.ChainController.state.activeChain}firstUpdated(){this.unsubscribe.push(l.ChainController.subscribeKey("activeChain",e=>this.activeChain=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.switchToChain?J.ConstantsUtil.CHAIN_NAME_MAP[this.switchToChain]:"supported";if(!this.switchToChain)return null;let t=J.ConstantsUtil.CHAIN_NAME_MAP[this.switchToChain];return i.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["4","2","2","2"]}
        gap="4"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="2">
          <wui-visual
            size="md"
            name=${(0,r.ifDefined)(iR[this.switchToChain])}
          ></wui-visual>
          <wui-flex gap="2" flexDirection="column" alignItems="center">
            <wui-text
              data-testid=${`w3m-switch-active-chain-to-${t}`}
              variant="lg-regular"
              color="primary"
              align="center"
              >Switch to <span class="capitalize">${t}</span></wui-text
            >
            <wui-text variant="md-regular" color="secondary" align="center">
              Connected wallet doesn't support connecting to ${e} chain. You
              need to connect with a different wallet.
            </wui-text>
          </wui-flex>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `}async switchActiveChain(){this.switchToChain&&(l.ChainController.setIsSwitchingNamespace(!0),ee.ConnectorController.setFilterByNamespace(this.switchToChain),this.caipNetwork?await l.ChainController.switchActiveNetwork(this.caipNetwork):l.ChainController.setActiveNamespace(this.switchToChain),ei.RouterController.reset("Connect"))}};iT.styles=iN,iI([(0,o.property)()],iT.prototype,"activeChain",void 0),iT=iI([(0,h.customElement)("w3m-switch-active-chain-view")],iT),e.s(["W3mSwitchActiveChainView",()=>iT],325085);var iO=t;let iU=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}],iD=class extends iO.LitElement{render(){return i.html`
      <wui-flex
        flexDirection="column"
        .padding=${["6","5","5","5"]}
        alignItems="center"
        gap="5"
      >
        <w3m-help-widget .data=${iU}></w3m-help-widget>
        <wui-button
          variant="accent-primary"
          size="md"
          @click=${()=>{c.CoreHelperUtil.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};iD=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("w3m-what-is-a-network-view")],iD),e.s(["W3mWhatIsANetworkView",()=>iD],414192);var iP=t;let iL=E.css`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var ij=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let iW=class extends iP.LitElement{constructor(){super(),this.swapUnsupportedChain=ei.RouterController.state.data?.swapUnsupportedChain,this.unsubscribe=[],this.disconnecting=!1,this.remoteFeatures=u.OptionsController.state.remoteFeatures,this.unsubscribe.push(a.AssetController.subscribeNetworkImages(()=>this.requestUpdate()),u.OptionsController.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["3","5","2","5"]}
          alignItems="center"
          gap="5"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="3" gap="2"> ${this.networksTemplate()} </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="3" gap="2">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="signOut"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="md-medium" color="secondary">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?i.html`
        <wui-text variant="sm-regular" color="secondary" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:i.html`
      <wui-text variant="sm-regular" color="secondary" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){let e=l.ChainController.getAllRequestedCaipNetworks(),t=l.ChainController.getAllApprovedCaipNetworkIds(),o=c.CoreHelperUtil.sortRequestedNetworks(t,e);return(this.swapUnsupportedChain?o.filter(e=>et.ConstantsUtil.SWAP_SUPPORTED_NETWORKS.includes(e.caipNetworkId)):o).map(e=>i.html`
        <wui-list-network
          imageSrc=${(0,r.ifDefined)(s.AssetUtil.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(e)}
        >
        </wui-list-network>
      `)}async onDisconnect(){try{this.disconnecting=!0;let e=l.ChainController.state.activeChain,t=Z.ConnectionController.getConnections(e).length>0,i=e&&ee.ConnectorController.state.activeConnectorIds[e],o=this.remoteFeatures?.multiWallet;await Z.ConnectionController.disconnect(o?{id:i,namespace:e}:{}),t&&o&&(ei.RouterController.push("ProfileWallets"),eo.SnackController.showSuccess("Wallet deleted"))}catch{B.EventsController.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:"Failed to disconnect"}}),eo.SnackController.showError("Failed to disconnect")}finally{this.disconnecting=!1}}async onSwitchNetwork(e){let t=l.ChainController.getActiveCaipAddress(),i=l.ChainController.getAllApprovedCaipNetworkIds(),o=(l.ChainController.getNetworkProp("supportsAllNetworks",e.chainNamespace),ei.RouterController.state.data);t?i?.includes(e.caipNetworkId)?await l.ChainController.switchActiveNetwork(e):ei.RouterController.push("SwitchNetwork",{...o,network:e}):t||(l.ChainController.setActiveCaipNetwork(e),ei.RouterController.push("Connect"))}};iW.styles=iL,ij([(0,n.state)()],iW.prototype,"disconnecting",void 0),ij([(0,n.state)()],iW.prototype,"remoteFeatures",void 0),iW=ij([(0,h.customElement)("w3m-unsupported-chain-view")],iW),e.s(["W3mUnsupportedChainView",()=>iW],520698);var iF=t,iz=t;let iB=g.css`
  wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
  }

  /* -- Types --------------------------------------------------------- */
  wui-flex[data-type='info'] {
    color: ${({tokens:e})=>e.theme.textSecondary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-flex[data-type='success'] {
    color: ${({tokens:e})=>e.core.textSuccess};
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  wui-flex[data-type='error'] {
    color: ${({tokens:e})=>e.core.textError};
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  wui-flex[data-type='warning'] {
    color: ${({tokens:e})=>e.core.textWarning};
    background-color: ${({tokens:e})=>e.core.backgroundWarning};
  }

  wui-flex[data-type='info'] wui-icon-box {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-flex[data-type='success'] wui-icon-box {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  wui-flex[data-type='error'] wui-icon-box {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  wui-flex[data-type='warning'] wui-icon-box {
    background-color: ${({tokens:e})=>e.core.backgroundWarning};
  }

  wui-text {
    flex: 1;
  }
`;var i_=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let iM=class extends iz.LitElement{constructor(){super(...arguments),this.icon="externalLink",this.text="",this.type="info"}render(){return i.html`
      <wui-flex alignItems="center" data-type=${this.type}>
        <wui-icon-box size="sm" color="inherit" icon=${this.icon}></wui-icon-box>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
      </wui-flex>
    `}};iM.styles=[m.resetStyles,m.elementStyles,iB],i_([(0,o.property)()],iM.prototype,"icon",void 0),i_([(0,o.property)()],iM.prototype,"text",void 0),i_([(0,o.property)()],iM.prototype,"type",void 0),iM=i_([(0,h.customElement)("wui-banner")],iM);let iH=E.css`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`,iV=class extends iF.LitElement{constructor(){super(),this.unsubscribe=[]}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html` <wui-flex flexDirection="column" .padding=${["2","3","3","3"]} gap="2">
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let e=l.ChainController.getAllRequestedCaipNetworks(),t=l.ChainController.getAllApprovedCaipNetworkIds(),o=l.ChainController.state.activeCaipNetwork,n=l.ChainController.checkIfSmartAccountEnabled(),a=c.CoreHelperUtil.sortRequestedNetworks(t,e);if(n&&(0,ef.getPreferredAccountType)(o?.chainNamespace)===eb.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT){if(!o)return null;a=[o]}return a.filter(e=>e.chainNamespace===o?.chainNamespace).map(e=>i.html`
        <wui-list-network
          imageSrc=${(0,r.ifDefined)(s.AssetUtil.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `)}};iV.styles=iH,iV=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("w3m-wallet-compatible-networks-view")],iV),e.s(["W3mWalletCompatibleNetworksView",()=>iV],181589);var iK=t,iG=t,iq=t;let iY=g.css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    box-shadow: 0 0 0 8px ${({tokens:e})=>e.theme.borderPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    overflow: hidden;
  }

  :host([data-border-radius-full='true']) {
    border-radius: 50px;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;var iX=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let iQ=class extends iq.LitElement{render(){return this.dataset.borderRadiusFull=this.borderRadiusFull?"true":"false",i.html`${this.templateVisual()}`}templateVisual(){return this.imageSrc?i.html`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:i.html`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`}};iQ.styles=[m.resetStyles,iY],iX([(0,o.property)()],iQ.prototype,"imageSrc",void 0),iX([(0,o.property)()],iQ.prototype,"alt",void 0),iX([(0,o.property)({type:Boolean})],iQ.prototype,"borderRadiusFull",void 0),iQ=iX([(0,h.customElement)("wui-visual-thumbnail")],iQ);let iJ=g.css`
  :host {
    display: flex;
    justify-content: center;
    gap: ${({spacing:e})=>e["4"]};
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`,iZ=class extends iG.LitElement{constructor(){super(...arguments),this.dappImageUrl=u.OptionsController.state.metadata?.icons,this.walletImageUrl=l.ChainController.getAccountData()?.connectedWalletInfo?.icon}firstUpdated(){let e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return i.html`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,t){e.animate([{transform:"translateX(0px)"},{transform:t}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};iZ.styles=iJ,iZ=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}([(0,h.customElement)("w3m-siwx-sign-message-thumbnails")],iZ);var i0=function(e,t,i,o){var n,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,i,a):n(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a};let i3=class extends iK.LitElement{constructor(){super(...arguments),this.dappName=u.OptionsController.state.metadata?.name,this.isCancelling=!1,this.isSigning=!1}render(){return i.html`
      <wui-flex justifyContent="center" .padding=${["8","0","6","0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex .padding=${["0","20","5","20"]} gap="3" justifyContent="space-between">
        <wui-text variant="lg-medium" align="center" color="primary"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["0","10","4","10"]} gap="3" justifyContent="space-between">
        <wui-text variant="md-regular" align="center" color="secondary"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["4","5","5","5"]} gap="3" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral-secondary"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling?"Cancelling...":"Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral-primary"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0;try{await id.SIWXUtil.requestSignMessage()}catch(e){if(e instanceof Error&&e.message.includes("OTP is required")){eo.SnackController.showError({message:"Something went wrong. We need to verify your account again."}),ei.RouterController.replace("DataCapture");return}throw e}finally{this.isSigning=!1}}async onCancel(){this.isCancelling=!0,await id.SIWXUtil.cancelSignMessage().finally(()=>this.isCancelling=!1)}};i0([(0,n.state)()],i3.prototype,"isCancelling",void 0),i0([(0,n.state)()],i3.prototype,"isSigning",void 0),i3=i0([(0,h.customElement)("w3m-siwx-sign-message-view")],i3),e.s(["W3mSIWXSignMessageView",()=>i3],996808),e.s([],694318)}]);

//# debugId=bdc3c152-a978-180e-50e6-6020e7522cfd
//# sourceMappingURL=6ca100c0c7e5a332.js.map
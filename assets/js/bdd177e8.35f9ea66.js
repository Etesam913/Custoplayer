"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[916],{6271:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>s,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var o=r(7896),n=(r(2784),r(876));const l={},a="Volume",i={unversionedId:"components/Volume",id:"components/Volume",title:"Volume",description:"To add volume controls to your video you need a volumeButton and a volumeBar.",source:"@site/docs/components/Volume.mdx",sourceDirName:"components",slug:"/components/Volume",permalink:"/custoplayer/docs/components/Volume",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Time",permalink:"/custoplayer/docs/components/Time"},next:{title:"Fullscreen Buttons",permalink:"/custoplayer/docs/components/fullscreen-buttons"}},u={},p=[{value:"Volume Button 1",id:"volume-button-1",level:2},{value:"Volume Bar 1",id:"volume-bar-1",level:2},{value:"Volume Bar 2",id:"volume-bar-2",level:2},{value:"Usage",id:"usage",level:2}],c={toc:p},m="wrapper";function s(e){let{components:t,...r}=e;return(0,n.kt)(m,(0,o.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"volume"},"Volume"),(0,n.kt)("p",null,"To add volume controls to your video you need a volumeButton and a volumeBar."),(0,n.kt)("p",null,"There is one volumeButton component"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},'"volumeButton1"'))),(0,n.kt)("h2",{id:"volume-button-1"},"Volume Button 1"),(0,n.kt)("svg",{width:"48",height:"48",viewBox:"0 0 32 32",fill:"none",stroke:"currentColor",xmlns:"http://www.w3.org/2000/svg"},(0,n.kt)("path",{d:"M4 13C4 12.4477 4.44772 12 5 12H9V20H5C4.44772 20 4 19.5523 4 19V13Z",stroke:"currentColor","stroke-width":"2"}),(0,n.kt)("path",{d:"M9 13L15 7","stroke-width":"2"}),(0,n.kt)("path",{d:"M15 7V26","stroke-width":"2","stroke-linecap":"round"}),(0,n.kt)("path",{d:"M9 20L15 26","stroke-width":"2"}),(0,n.kt)("path",{d:"M24 9.5C27.0185 11.7059 31.2444 17.7941 24 24.5",stroke:"currentColor","stroke-width":"2"}),(0,n.kt)("path",{d:"M19.5 13.5C21 14.6667 23.1 17.7 19.5 20.5","stroke-width":"2"})),(0,n.kt)("p",null,"There are two volumeBar components"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},'"volumeBar1"')),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},'"volumeBar2"'))),(0,n.kt)("h2",{id:"volume-bar-1"},"Volume Bar 1"),(0,n.kt)("video",{width:"min(10rem, 100%)",autoPlay:!0,loop:!0,src:"https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs%2Fvolume%2FvolumeBar1-demo.mp4"}),(0,n.kt)("h2",{id:"volume-bar-2"},"Volume Bar 2"),(0,n.kt)("video",{width:"min(10rem, 100%)",autoPlay:!0,loop:!0,src:"https://custoplayer.nyc3.digitaloceanspaces.com/docs%2Fvolume%2FvolumeBar2-demo.mp4"}),(0,n.kt)("h2",{id:"usage"},"Usage"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-jsx"},'item1: {\n  id: \'volumeButton1\',\n  barId: \'volumeBar2\',\n  volumeColor: \'#a4c3f5\',\n  barColor: "white",\n  buttonColor: "#a4c3f5",\n  scrubberColor: "#a4c3f5",\n  scrubberBorderColor: "white"\n},\n')),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"barId"),' property accepts values of "volumeBar1" or "volumeBar2".'),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"volumeBar1 is horizontal and volumeBar2 is vertical."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"volumeColor")," property changes the color of the volume progress in the bar."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Accepts any hex or rgb color code."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"barColor")," property changes the volume background color of the bar."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Accepts any hex or rgb color code."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"buttonColor")," property changes the color of the volume button icon."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Accepts any hex or rgb color code."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"scrubberColor")," property changes the color of the scrubber (the circle at the end of the progress)."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Accepts any hex or rgb color code"),(0,n.kt)("li",{parentName:"ul"},"If no ",(0,n.kt)("inlineCode",{parentName:"li"},"scrubberColor")," is defined, the ",(0,n.kt)("inlineCode",{parentName:"li"},"scrubberColor")," is defaulted to the same as the ",(0,n.kt)("inlineCode",{parentName:"li"},"progressColor"))))),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"scrubberBorder")," property changes the border color of the scrubber (the circle at the end of the volume progress)."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Accepts any hex or rgb color code"),(0,n.kt)("li",{parentName:"ul"},"If no ",(0,n.kt)("inlineCode",{parentName:"li"},"scrubberBorderColor")," is defined, the ",(0,n.kt)("inlineCode",{parentName:"li"},"scrubberBorderColor")," is defaulted to a lightened version of the ",(0,n.kt)("inlineCode",{parentName:"li"},"scrubberColor")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"hideOnMobile")," property hides the volumeButton & volumeBar component when the video's width is less than 768px."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Accepts values of ",(0,n.kt)("inlineCode",{parentName:"li"},"true")," or ",(0,n.kt)("inlineCode",{parentName:"li"},"false"))))))}s.isMDXComponent=!0},876:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>k});var o=r(2784);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},l=Object.keys(e);for(o=0;o<l.length;o++)r=l[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)r=l[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var u=o.createContext({}),p=function(e){var t=o.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=p(e.components);return o.createElement(u.Provider,{value:t},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(r),d=n,k=m["".concat(u,".").concat(d)]||m[d]||s[d]||l;return r?o.createElement(k,a(a({ref:t},c),{},{components:r})):o.createElement(k,a({ref:t},c))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,a=new Array(l);a[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[m]="string"==typeof e?e:n,a[1]=i;for(var p=2;p<l;p++)a[p]=r[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);
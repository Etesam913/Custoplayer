"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[995],{4550:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>b,frontMatter:()=>l,metadata:()=>p,toc:()=>d});var r=n(7896),a=n(2784),i=n(876),s=n(2194);function o(){return a.createElement(s.O8,{src:"https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/compressed-custoplayer-demo.mp4",crossOrigin:"anonymous",values:{controlsBar:{animate:"movement",barColor:"rgba(28, 28, 28, 0.85)"},item1:{id:"settingsButton1",settingsMenuOrientation:"right",options:{subtitles:!0}}}},a.createElement("track",{label:"English",kind:"metadata",src:"https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-subtitles/English.vtt",srcLang:"en",default:!0}),a.createElement("track",{label:"Spanish",kind:"metadata",srcLang:"es",src:"https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-subtitles/Spanish.vtt"}))}const l={sidebar_position:3},c="Setting Up Subtitles",p={unversionedId:"setting-up-subtitles",id:"setting-up-subtitles",title:"Setting Up Subtitles",description:"Configuring subtitles using Custoplayer is quite easy.",source:"@site/docs/setting-up-subtitles.mdx",sourceDirName:".",slug:"/setting-up-subtitles",permalink:"/Custoplayer/docs/setting-up-subtitles",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Settings Button",permalink:"/Custoplayer/docs/components/settings-button"},next:{title:"Setting Up Video Qualities",permalink:"/Custoplayer/docs/setting-up-video-qualities"}},u={},d=[{value:"Code Example",id:"code-example",level:2},{value:"Video Example",id:"video-example",level:2}],m={toc:d},g="wrapper";function b(e){let{components:t,...n}=e;return(0,i.kt)(g,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"setting-up-subtitles"},"Setting Up Subtitles"),(0,i.kt)("p",null,"Configuring subtitles using Custoplayer is quite easy."),(0,i.kt)("p",null,"There are two steps:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Add a track tag as a child to the Custoplayer tag",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"It should have a ",(0,i.kt)("inlineCode",{parentName:"li"},"label")," set and have ",(0,i.kt)("inlineCode",{parentName:"li"},"kind='metadata'")),(0,i.kt)("li",{parentName:"ul"},"The src attribute should be set to a url that contains a vtt file.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"This is where the subtitles info is held"),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"crossOrigin")," property will probably have to be set to ",(0,i.kt)("inlineCode",{parentName:"li"},'"anonymous"')," for this to work"))))),(0,i.kt)("li",{parentName:"ol"},"Add a ",(0,i.kt)("inlineCode",{parentName:"li"},"settingsButton1")," with the ",(0,i.kt)("inlineCode",{parentName:"li"},"options")," object having ",(0,i.kt)("inlineCode",{parentName:"li"},"subtitles: true"))),(0,i.kt)("h2",{id:"code-example"},"Code Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\nimport { Custoplayer } from 'custoplayer';\n\nexport default function SubtitlesExample() {\n  return (\n    <Custoplayer\n      src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/compressed-custoplayer-demo.mp4'\n      crossOrigin='anonymous'\n      values={{\n        controlsBar: {\n          animate: 'movement',\n          barColor: 'rgba(28, 28, 28, 0.85)',\n        },\n        item1: {\n          id: 'settingsButton1',\n          settingsMenuOrientation: 'right',\n          options: {\n            subtitles: true,\n          },\n        },\n      }}\n    >\n      <track\n        label='English'\n        kind='metadata'\n        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-subtitles/English.vtt'\n        srcLang='en'\n        default\n      />\n      <track\n        label='Spanish'\n        kind='metadata'\n        srcLang='es'\n        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-subtitles/Spanish.vtt'\n      />\n    </Custoplayer>\n  );\n}\n")),(0,i.kt)("h2",{id:"video-example"},"Video Example"),(0,i.kt)(o,{mdxType:"SubtitlesExample"}))}b.isMDXComponent=!0},876:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,g=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(g,s(s({ref:t},p),{},{components:n})):r.createElement(g,s({ref:t},p))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,s=new Array(i);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[u]="string"==typeof e?e:a,s[1]=o;for(var c=2;c<i;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);
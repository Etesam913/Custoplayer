"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[195],{1104:(e,t,n)=>{n.r(t),n.d(t,{default:()=>y});var a=n(2784),r=n(2896),i=n(5837),l=n(230),o=n(966),c=n(2194);const m=o.ZP.header`
  text-align: center;
  padding: 2.5rem;
`,s=o.ZP.main`
  padding: 0.25rem 0 1.5rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`,d=o.ZP.h1`
  font-weight: bold;
  font-size: 3.25em;

  @media screen and (max-width: 768px) {
    font-size: 2.5em;
  }
`,u=o.ZP.div`
  width: min(90vw, 50rem);
  margin: 0 auto;
`,p=o.ZP.h2`
  font-weight: 600;
  font-size: 1.75em;
  margin: 1.5rem 0;

  @media screen and (max-width: 768px) {
    font-size: 1.25em;
  }
`,g=o.ZP.label`
  font-size: 1.5em;
  margin: 1rem 0.75rem 0.75rem;
  font-weight: bold;
`,h=o.ZP.select`
  margin: 0.5rem;
  font-size: 1.1em;
  padding: 0.35rem;
  cursor: pointer;
`;function f(){const{siteConfig:e}=(0,i.Z)();return a.createElement(m,null,a.createElement("div",{className:"container"},a.createElement(d,null,e.title),a.createElement(p,null,e.tagline),a.createElement("button",{className:"link-button"},a.createElement(r.Z,{to:"/docs/quick-start"},"Learn More"))))}const E={midnightBlue:c.NT,fieryRed:c.FF,milkyWhite:c.L2,mint:c.DT,grassyGreen:c.Pv};function y(){const[e,t]=(0,a.useState)("midnightBlue");return a.createElement(l.Z,{title:"Custoplayer",description:"A React.js npm package that allows for the rapid creation of customizable video players."},a.createElement("div",null,a.createElement(f,null),a.createElement(s,null,a.createElement(u,null,a.createElement(c.O8,{poster:"https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/custoplayer-demo-poster.png",src:"https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/compressed-custoplayer-demo.mp4",values:E[e]})),a.createElement(g,{htmlFor:"preset-dropdown"},"Presets"),a.createElement(h,{id:"preset-dropdown",value:e,onChange:e=>t(e.target.value)},a.createElement("option",{value:"midnightBlue"},"\ud83c\udf15 Midnight Blue"),a.createElement("option",{value:"fieryRed"},"\ud83d\udd25 Fiery Red"),a.createElement("option",{value:"milkyWhite"},"\ud83e\udd5b Milky White"),a.createElement("option",{value:"grassyGreen"},"\ud83e\udd57 Grassy Green"),a.createElement("option",{value:"mint"},"\ud83c\udf3f Mint")))))}}}]);
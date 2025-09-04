"use strict";(self.webpackChunknassif_group_strapi=self.webpackChunknassif_group_strapi||[]).push([[3412],{43412:(j,M,s)=>{s.r(M),s.d(M,{FORMS:()=>R});var t=s(92132),a=s(94061),r=s(85963),h=s(48653),P=s(43064),c=s(38413),i=s(83997),d=s(30893),D=s(21610),m=s(56445),g=s(54894),l=s(74930),O=s(17703),_=s(71389),e=s(94929),E=s(59057),n=s(50515),U=s(15126),I=s(63299),K=s(67014),f=s(59080),u=s(79275),y=s(14718),p=s(21272),S=s(82437),$=s(61535),F=s(5790),N=s(12083),z=s(41286),Q=s(35223),G=s(5409),H=s(2600),J=s(48940);const v=()=>{const{push:B}=(0,O.W6)(),{formatMessage:o}=(0,g.A)(),{get:L}=(0,m.ry)(),{isLoading:C,data:A=[]}=(0,l.useQuery)(["ee","providers"],async()=>{const{data:T}=await L("/admin/providers");return T},{enabled:window.strapi.features.isEnabled(window.strapi.features.SSO)}),W=()=>{B("/auth/login")};return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!C&&A.length===0?(0,t.jsx)(O.rd,{to:"/auth/login"}):(0,t.jsx)(E.U,{children:(0,t.jsxs)(c.g,{children:[(0,t.jsxs)(E.e,{children:[(0,t.jsxs)(E.C,{children:[(0,t.jsx)(E.f,{}),(0,t.jsx)(a.a,{paddingTop:6,paddingBottom:1,children:(0,t.jsx)(d.o,{as:"h1",variant:"alpha",children:o({id:"Auth.form.welcome.title"})})}),(0,t.jsx)(a.a,{paddingBottom:7,children:(0,t.jsx)(d.o,{variant:"epsilon",textColor:"neutral600",children:o({id:"Auth.login.sso.subtitle"})})})]}),(0,t.jsxs)(i.s,{direction:"column",alignItems:"stretch",gap:7,children:[C?(0,t.jsx)(i.s,{justifyContent:"center",children:(0,t.jsx)(P.a,{children:o({id:"Auth.login.sso.loading"})})}):(0,t.jsx)(n.S,{providers:A}),(0,t.jsxs)(i.s,{children:[(0,t.jsx)(x,{}),(0,t.jsx)(a.a,{paddingLeft:3,paddingRight:3,children:(0,t.jsx)(d.o,{variant:"sigma",textColor:"neutral600",children:o({id:"or"})})}),(0,t.jsx)(x,{})]}),(0,t.jsx)(r.$,{fullWidth:!0,size:"L",onClick:W,children:o({id:"Auth.form.button.login.strapi"})})]})]}),(0,t.jsx)(i.s,{justifyContent:"center",children:(0,t.jsx)(a.a,{paddingTop:4,children:(0,t.jsx)(D.N,{as:_.k2,to:"/auth/forgot-password",children:(0,t.jsx)(d.o,{variant:"pi",children:o({id:"Auth.link.forgot-password"})})})})})]})})},x=(0,e.Ay)(h.c)`
  flex: 1;
`,R={providers:v}},50515:(j,M,s)=>{s.d(M,{S:()=>m});var t=s(92132),a=s(90151),r=s(68074),h=s(83997),P=s(79739),c=s(30893),i=s(54894),d=s(71389),D=s(94929);const m=({providers:_,displayAllProviders:e})=>{const{formatMessage:E}=(0,i.A)();return e?(0,t.jsx)(a.x,{gap:4,children:_.map(n=>(0,t.jsx)(r.E,{col:4,children:(0,t.jsx)(l,{provider:n})},n.uid))}):_.length>2&&!e?(0,t.jsxs)(a.x,{gap:4,children:[_.slice(0,2).map(n=>(0,t.jsx)(r.E,{col:4,children:(0,t.jsx)(l,{provider:n})},n.uid)),(0,t.jsx)(r.E,{col:4,children:(0,t.jsx)(P.m,{label:E({id:"global.see-more"}),children:(0,t.jsx)(O,{as:d.N_,to:"/auth/providers",children:(0,t.jsx)("span",{"aria-hidden":!0,children:"\u2022\u2022\u2022"})})})})]}):(0,t.jsx)(g,{justifyContent:"center",children:_.map(n=>(0,t.jsx)(l,{provider:n},n.uid))})},g=(0,D.Ay)(h.s)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:_})=>_.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:_})=>_.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:_})=>_.spaces[2]};
  }
`,l=({provider:_})=>(0,t.jsx)(P.m,{label:_.displayName,children:(0,t.jsx)(O,{href:`${window.strapi.backendURL}/admin/connect/${_.uid}`,children:_.icon?(0,t.jsx)("img",{src:_.icon,"aria-hidden":!0,alt:"",height:"32px"}):(0,t.jsx)(c.o,{children:_.displayName})})}),O=D.Ay.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:_})=>_.colors.neutral150};
  border-radius: ${({theme:_})=>_.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:_})=>_.colors.neutral600};
`}}]);

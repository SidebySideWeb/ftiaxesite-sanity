import{i as e,r as t}from"./sanity-1WPmoiig.js";import{useClient as n,useFormValue as r}from"sanity";import{Fragment as i,jsx as a,jsxs as o}from"react/jsx-runtime";import{useEffect as s,useState as c}from"react";import l from"styled-components";var u=l.div`
  max-width: 600px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  overflow: hidden;
`,d=l.div`
  background: #f8f9fa;
  padding: 12px 16px;
  border-bottom: 1px solid #dadce0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,f=l.div`
  padding: 16px;
`,p=l.p`
  margin: 0 0 4px;
  color: #006621;
  font-size: 13px;
  line-height: 1.4;
  word-break: break-word;
`,m=l.h3`
  margin: 0 0 8px;
  color: #1a0dab;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
  word-break: break-word;

  &:hover {
    text-decoration: underline;
  }
`,h=l.p`
  margin: 0;
  color: #545454;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,g=l.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #4f46e5;
  background: #f0f4ff;
  padding: 4px 8px;
  border-radius: 4px;
`,_=l=>{let{path:_,schemaType:v}=l,{options:y}=v,b=y?.baseUrl||`https://www.example.com`,x=y?.prefix,S=y?.titleSuffix,C=y?.titleSuffixInheritColor??!1,w=y?.titleSuffixQuery,T=n({apiVersion:y?.apiVersion??`2024-01-01`}),[E,D]=c(``);s(()=>{w&&T.fetch(w).then(e=>{D(e==null?``:String(e))}).catch(()=>{D(``)})},[w,T]);let O=r([_[0]])||{title:``,description:``,canonicalUrl:``},k=r([])||{slug:{current:``}},A=k?.slug?.current||``,{title:j,description:M,canonicalUrl:N}=O,P=w?E:S?typeof S==`function`?S(k):S:``,F=(N||b)?.replace(/\/+$/,``),I=String(A||``).replace(/^\/+/,``),L=[String(x?x(k):``).replace(/^\/+|\/+$/g,``),I].filter(Boolean).join(`/`),R=L?`${F}/${L}`:F,z=`${(()=>{try{return new URL(R||F).hostname}catch{return`example.com`}})()}${L?` \u203A ${L.split(`/`).slice(-1)[0]}`:``}`;return a(e,{padding:3,children:o(u,{children:[o(d,{children:[a(`span`,{style:{fontSize:`11px`,color:`#5f6368`,textTransform:`uppercase`,letterSpacing:`0.05em`},children:`Search Preview`}),o(g,{children:[a(`span`,{style:{width:`4px`,height:`4px`,borderRadius:`50%`,backgroundColor:`#4f46e5`,display:`inline-block`}}),`Live`]})]}),o(f,{children:[a(p,{children:R?z:`example.com › page-url`}),a(m,{children:j&&j.length>0?o(i,{children:[t(j,Math.max(1,60-(P?P.length+3:0))),P&&o(`span`,{style:C?void 0:{color:`#70757a`,fontWeight:400},children:[` `,`| `,P]})]}):`Your SEO Title will appear here`}),a(h,{children:M&&M.length>0?t(M,160):`Your meta description will show up here. Make it compelling!`})]})]})})};export{_ as default};
import {createHash} from 'node:crypto';
// Build embeds the finalized scoring and result copy here.
const categories=['C','A','T','S','F'];
const weights=[1,2,1,2,1,2,1,2];
const tieOrder=[5,7,3,1,0,6,2,4];
function calculate(answers){
 if(answers.length!==8||answers.some(a=>!categories.includes(a))) throw new Error('Eight valid answers are required.');
 const scores=Object.fromEntries(categories.map(c=>[c,0]));
 answers.forEach((c,i)=>scores[c]+=weights[i]);
 const ranked=[...categories].sort((a,b)=>scores[b]-scores[a]||tieOrder.findIndex(i=>answers[i]===a)-tieOrder.findIndex(i=>answers[i]===b));
 const primary=ranked[0];
 const secondary=ranked[1];
 return {scores,primary,secondary,secondaryFriction:secondary&&scores[primary]-scores[secondary]<=2?secondary:null,founderDependence:scores.F>=5};
}

const resultCopy=[
  {
    "key": "C",
    "name": "Clarity & Direction",
    "headline": "Your marketing has a direction problem.",
    "diagnosis": "You probably aren’t short on ideas. There’s always another campaign, platform, or shiny new tactic. But nobody has clearly decided what matters most right now, so your marketing becomes reactive.",
    "aha": "You probably don’t need more ideas. You need better prioritization.",
    "first": "If we could improve only ONE part of our marketing over the next 90 days, which change would have the biggest impact on the business?",
    "note": "Not every good marketing idea deserves to happen right now. Choose your spells wisely.",
    "looks": [
      "Lots of ideas, but no clear marketing priorities",
      "Starting campaigns without finishing them",
      "Constantly changing direction",
      "Marketing decisions based on urgency",
      "Different channels doing different things"
    ]
  },
  {
    "key": "A",
    "name": "Automation & Lead Nurture",
    "headline": "People are showing interest. Then things get a little fuzzy.",
    "diagnosis": "Your marketing is attracting interest without a reliable system for nurturing it toward a decision. Too much depends on prospects remembering you, or you remembering them.",
    "aha": "You might not need more leads. You may need to stop losing the ones you already have.",
    "first": "What happens after someone raises their hand?",
    "note": "Follow the journey from inquiry, download, or subscription. Does the next step happen consistently without someone having to remember?",
    "looks": [
      "Leads come in but follow-up is inconsistent",
      "Your email list exists but rarely hears from you",
      "People download a resource and then disappear",
      "Your CRM is basically a digital filing cabinet",
      "Follow-up depends on someone remembering to do it"
    ]
  },
  {
    "key": "T",
    "name": "Traffic & Trust",
    "headline": "Your business may be excellent. The right people need to notice.",
    "diagnosis": "Your offer works and people who know you tend to trust you. But your marketing may not consistently help new potential clients discover your business and find enough evidence to feel confident choosing you.",
    "aha": "Being excellent at what you do and being easy to discover are two different things.",
    "first": "If someone had never heard of us before today, would our marketing give them enough evidence to understand what we do and trust us?",
    "note": "Look at what buyers can access right now. Not eventually. Not after six conversations.",
    "looks": [
      "Most new business still comes from referrals",
      "Website traffic is lower than you’d like",
      "Your expertise isn’t obvious online",
      "Content is inconsistent or disconnected",
      "Search visibility is weak"
    ]
  },
  {
    "key": "S",
    "name": "Sales & Scale",
    "headline": "You have attention. The problem is what happens before someone says yes.",
    "diagnosis": "People are finding you. They may even be interested. But somewhere between interest and becoming a client, momentum is disappearing. Adding traffic to that journey can simply make the leak bigger.",
    "aha": "More traffic will not fix a conversion problem.",
    "first": "Walk through your customer journey as a stranger. What is the next step?",
    "note": "Is it obvious? Does it feel easy? Do prospects have the information and proof they need to take it?",
    "looks": [
      "Website traffic without enough inquiries",
      "People asking questions but not booking",
      "Plenty of discovery calls but inconsistent conversions",
      "Confusing offers",
      "Weak or buried calls to action"
    ]
  },
  {
    "key": "F",
    "name": "Founder Bottleneck",
    "headline": "Plot twist: the bottleneck might be you.",
    "diagnosis": "Not because you’re bad at marketing. Quite the opposite. You’ve probably kept it alive for years. But marketing still depends on you to think, decide, coordinate, approve, and keep every moving part moving.",
    "aha": "You don’t need to care less about marketing. Marketing needs to depend on you less.",
    "first": "If I disappeared from marketing for the next 30 days, what would stop?",
    "note": "There’s a difference between staying involved in meaningful decisions and personally holding the whole system together.",
    "looks": [
      "Nothing gets published without your approval",
      "Contractors wait for you to assign work",
      "You generate most of the ideas",
      "Campaigns stall when client work gets busy",
      "You rewrite marketing copy because it doesn’t sound right"
    ]
  }
]
;
const VERSION='bottleneck-v1';
const CTA='https://clevercalicco.thrivecart.com/marketing-relief-assessment/';
const ORIGINS=new Set(['https://clever-calicco-bottleneck.catladycandice.chatgpt.site','https://marketing-mayhem-meter.netlify.app','https://bottleneck.clevercalic.co']);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CONSENT='Yes, send me Clever Calicco’s marketing insights and occasional offers. I can unsubscribe anytime.';
function emails(s,result,from,internal){
 const r=resultCopy.find(r=>r.key===result.primary);const hi=s.name?`Hi ${s.name},`:'Hi there,';
 const text=[hi,'','Your Marketing Bottleneck: '+r.name,'',r.headline,r.diagnosis,'','What this can look like',...r.looks.map(x=>'• '+x),'','The aha',r.aha,'','One thing to look at first',r.first,r.note,'','Your bottleneck is a clue, not the whole diagnosis. The Marketing Assessment looks at how your marketing works together and what deserves attention first.','Start With a Marketing Assessment',CTA,'','Candice Tate','Chief Clever Officer | Clever Calicco','hello@clevercalic.co','https://clevercalic.co'].join('\n');
 const html=`<!doctype html><html lang="en"><body style="margin:0;background:#FFF8ED;color:#082A4A;font:16px/1.7 Arial,sans-serif;padding:24px"><div style="max-width:620px;margin:auto"><img src="https://clevercalic.co/wp-content/uploads/2025/02/Clever-Calicco.png" alt="Clever Calicco" width="85"><p>${esc(hi)}</p><p>Your most likely marketing bottleneck:</p><h1 style="font-size:34px;line-height:1.15">${esc(r.name)}</h1><h2 style="font-size:22px">${esc(r.headline)}</h2><p>${esc(r.diagnosis)}</p><h2>What this can look like</h2><ul>${r.looks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div style="background:#FFE07D;padding:22px"><strong>The aha</strong><h2>${esc(r.aha)}</h2></div><h2>One thing to look at first</h2><p><strong>${esc(r.first)}</strong></p><p>${esc(r.note)}</p><p>Your bottleneck is a clue, not the whole diagnosis. The Marketing Assessment looks at how your marketing works together and what deserves attention first.</p><p style="margin:30px 0"><a href="${CTA}" style="background:#086BB9;color:white;padding:16px 20px;display:inline-block;text-decoration:none;font-weight:bold;border-radius:5px">Start With a Marketing Assessment ↗</a></p><p>Candice Tate<br>Chief Clever Officer | Clever Calicco<br><a href="mailto:hello@clevercalic.co">hello@clevercalic.co</a><br><a href="https://clevercalic.co">clevercalic.co</a></p><p style="font-size:12px;color:#526778">You received this result because you completed the Clever Calicco Marketing Bottleneck Quiz. This result email does not subscribe you to marketing emails.</p></div></body></html>`;
 const internalText=['New Marketing Bottleneck Quiz lead',`Name: ${s.name||'(not supplied)'}`,`Email: ${s.email}`,`Marketing opt-in: ${s.marketingConsent?'Yes':'No'}`,`Consent wording: ${CONSENT}`,`Submission: ${s.submissionId}`,`Primary: ${r.name}`,`Secondary: ${resultCopy.find(r=>r.key===result.secondary).name}`,`Secondary friction: ${result.secondaryFriction||'None'}`,`Founder dependence: ${result.founderDependence?'Present':'Not flagged'}`,`Scores (internal only): ${JSON.stringify(result.scores)}`,`Answers: ${s.answers.join(',')}`,`Quiz version: ${VERSION}`].join('\n');
 return {user:{from,to:[s.email],subject:'Your Marketing Bottleneck Quiz result is here',text,html},internal:{from,to:[internal],subject:`New quiz lead: ${r.name}`,text:internalText,html:`<pre>${esc(internalText)}</pre>`}};
}
export function createHandler({env=process.env,fetcher=fetch}={}){
 let fieldPromise;
 async function ml(path,method='GET',body){const res=await fetcher('https://connect.mailerlite.com/api/'+path,{method,headers:{Authorization:`Bearer ${env.MAILERLITE_API_KEY}`,'Content-Type':'application/json',Accept:'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(8000)});if(!res.ok)throw Error('mailerlite:'+res.status);return res.json();}
 async function ensureFields(){const definitions=['Quiz Primary','Quiz Secondary','Quiz Secondary Friction','Quiz Founder Dependence','Quiz Consent At','Quiz Version'];const fields=[];let page=1;while(page<=20){const data=await ml('fields?limit=100&page='+page);fields.push(...data.data);if(!data.links?.next)break;page++;}const mapping={};for(const name of definitions){let field=fields.find(f=>f.name.toLowerCase()===name.toLowerCase()||f.key===name.toLowerCase().replaceAll(' ','_'));if(!field){try{field=(await ml('fields','POST',{name,type:'text'})).data;}catch(error){const refreshed=await ml('fields?filter%5Bkeyword%5D='+encodeURIComponent(name));field=refreshed.data?.find(f=>f.name===name);if(!field)throw error;}}mapping[name]=field.key;}return mapping;}
 async function sync(s,result){if(!s.marketingConsent)return 'not_requested';fieldPromise??=ensureFields().catch(error=>{fieldPromise=undefined;throw error;});const mapping=await fieldPromise;const values={'Quiz Primary':resultCopy.find(r=>r.key===result.primary).name,'Quiz Secondary':resultCopy.find(r=>r.key===result.secondary).name,'Quiz Secondary Friction':result.secondaryFriction||'None','Quiz Founder Dependence':result.founderDependence?'Present':'Not flagged','Quiz Consent At':s.consentAt,'Quiz Version':VERSION};const fields=Object.fromEntries(Object.entries(values).map(([k,v])=>[mapping[k],v]));if(s.name)fields.name=s.name;const groups=[env.MAILERLITE_GROUP_ID,env['MAILERLITE_GROUP_ID_'+result.primary]].filter(Boolean);await ml('subscribers','POST',{email:s.email,fields,...(groups.length?{groups}: {})});return 'synced';}
 async function send(payload,key){const res=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify(payload),signal:AbortSignal.timeout(8000)});if(!res.ok)throw Error('resend:'+res.status);return res.json();}
 return async event=>{
  const origin=event.headers?.origin||event.headers?.Origin||'';const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin','Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};if(ORIGINS.has(origin))headers['Access-Control-Allow-Origin']=origin;
  const response=(statusCode,body)=>({statusCode,headers,body:statusCode===204?'':JSON.stringify(body)});
  if(origin&&!ORIGINS.has(origin))return response(403,{ok:false,error:'Origin not allowed.'});
  if(event.httpMethod==='OPTIONS')return response(204,{});
  if(event.httpMethod==='GET')return response(200,{version:VERSION,emailConfigured:Boolean(env.RESEND_API_KEY),marketingConfigured:Boolean(env.MAILERLITE_API_KEY)});
  if(event.httpMethod!=='POST')return response(405,{ok:false,error:'Method not allowed.'});
  if(event.isBase64Encoded||typeof event.body!=='string'||event.body.length>10000)return response(400,{ok:false,error:'Invalid request.'});
  let s;try{s=JSON.parse(event.body);}catch{return response(400,{ok:false,error:'Invalid JSON.'});}
  if(!s||typeof s!=='object'||Array.isArray(s))return response(400,{ok:false,error:'Invalid submission.'});
  if(typeof s.email!=='string'||s.email.length>254||! /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(s.email.trim())||/[\r\n]/.test(s.email))return response(400,{ok:false,error:'A valid email is required.'});
  if(typeof s.name!=='string'||s.name.length>100||/[\r\n]/.test(s.name)||typeof s.marketingConsent!=='boolean'||typeof s.submissionId!=='string'||! /^[a-f0-9-]{36}$/i.test(s.submissionId)||!Array.isArray(s.answers)||s.answers.length!==8||s.answers.some(a=>!categories.includes(a))||typeof s.consentAt!=='string'||!Number.isFinite(Date.parse(s.consentAt)))return response(400,{ok:false,error:'Invalid quiz submission.'});
  if(s.websiteTrap)return response(400,{ok:false,error:'Invalid submission.'});
  if(!env.RESEND_API_KEY||(s.marketingConsent&&!env.MAILERLITE_API_KEY))return response(503,{ok:false,error:'Email service is not ready. Please try again later.'});
  s={...s,email:s.email.trim().toLowerCase(),name:s.name.trim()};const result=calculate(s.answers);const payload=emails(s,result,env.RESEND_FROM_EMAIL||'Clever Calicco <hello@clevercalic.co>',env.INTERNAL_LEAD_EMAIL||'hello@clevercalic.co');
  const hash=createHash('sha256').update(JSON.stringify({email:s.email,name:s.name,answers:s.answers,consent:s.marketingConsent,id:s.submissionId,consentAt:s.consentAt})).digest('hex');
  let stage='result_email';try{await send(payload.user,VERSION+'/user/'+hash);stage='marketing';const marketingStatus=await sync(s,result);stage='notification';await send(payload.internal,VERSION+'/internal/'+hash);return response(200,{ok:true,primary:result.primary,resultEmail:'accepted',marketingStatus});}
  catch(error){console.error('Bottleneck submission failed',{stage,provider:String(error.message).split(':')[0]});return response(502,{ok:false,error:stage==='marketing'?'Your result email was accepted, but we couldn’t save your marketing preference. Please retry.':'We couldn’t complete your submission. Please retry. Your answers are safe.'});}
 };
}
export const handler=createHandler();

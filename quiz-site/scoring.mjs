export const categories=['C','A','T','S','F'];
export const weights=[1,2,1,2,1,2,1,2];
export const tieOrder=[5,7,3,1,0,6,2,4];
export function calculate(answers){
 if(answers.length!==8||answers.some(a=>!categories.includes(a))) throw new Error('Eight valid answers are required.');
 const scores=Object.fromEntries(categories.map(c=>[c,0]));
 answers.forEach((c,i)=>scores[c]+=weights[i]);
 const ranked=[...categories].sort((a,b)=>scores[b]-scores[a]||tieOrder.findIndex(i=>answers[i]===a)-tieOrder.findIndex(i=>answers[i]===b));
 const primary=ranked[0];
 const secondary=ranked[1];
 return {scores,primary,secondary,secondaryFriction:secondary&&scores[primary]-scores[secondary]<=2?secondary:null,founderDependence:scores.F>=5};
}

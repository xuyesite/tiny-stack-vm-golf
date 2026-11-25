import{readFileSync,readdirSync,mkdirSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const A=process.env.MAKEFUN_INPUT_DIR||"/input",B=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const d of readdirSync(A).sort()){
const P=readFileSync(join(A,d,"program.bin")),N=readFileSync(join(A,d,"input.bin"));
let S=[],C=[],M=new Int32Array(256),O=[],p=0,i=0,s=0,e=0;
const u=n=>{if(S.length<n)throw 2},j=()=>P[p+1]|P[p+2]<<8,J=()=>(j()<<16)>>16;
try{while(1){
if(s++>=1e6)throw 10;
if(p<0||p>=P.length)throw 9;
const k=P[p];
if(k>=16&&k<=34&&k!==23&&k!==27&&k!==31){u(2);const b=S.pop(),a=S.pop();
if(k>=19&&k<=22&&!b)throw 4;
S.push(k===16?a+b|0:k===17?a-b|0:k===18?Math.imul(a,b):k===19?Math.trunc(a/b)|0:k===20?a%b:k===21?Math.trunc((a>>>0)/(b>>>0))|0:k===22?(a>>>0)%(b>>>0)|0:k===24?a&b:k===25?a|b:k===26?a^b:k===28?a<<(b&31):k===29?a>>(b&31):k===30?a>>>(b&31)|0:k===32?a===b?1:0:k===33?a<b?1:0:(a>>>0)<(b>>>0)?1:0);
p++;continue}
if(k===23||k===27){u(1);S.push(k===23?-S.pop()|0:~S.pop());p++;continue}
switch(k){
case 0:throw 0;
case 1:if(p+1>=P.length)throw 9;S.push(P.readInt8(p+1));p+=2;break;
case 2:if(p+4>=P.length)throw 9;S.push(P.readInt32LE(p+1));p+=5;break;
case 3:u(1);S.pop();p++;break;
case 4:u(1);S.push(S[S.length-1]);p++;break;
case 5:u(2);{const t=S[S.length-1];S[S.length-1]=S[S.length-2];S[S.length-2]=t}p++;break;
case 6:u(2);S.push(S[S.length-2]);p++;break;
case 7:u(3);S.push(S.splice(S.length-3,1)[0]);p++;break;
case 48:if(p+2>=P.length)throw 9;p+=3+J();break;
case 49:case 50:if(p+2>=P.length)throw 9;u(1);{const v=S.pop();p+=(v===0)===(k===49)?3+J():3}break;
case 51:if(p+2>=P.length)throw 9;if(C.length>63)throw 7;C.push(p+3);p=j();break;
case 52:if(!C.length)throw 8;p=C.pop();break;
case 64:u(1);{const a=S.pop();if(a<0||a>255)throw 6;S.push(M[a])}p++;break;
case 65:u(2);{const a=S.pop(),v=S.pop();if(a<0||a>255)throw 6;M[a]=v}p++;break;
case 80:u(1);{const v=String(S.pop());if(O.length+v.length>65536)throw 11;O.push(...Buffer.from(v))}p++;break;
case 81:u(1);if(O.length>65535)throw 11;O.push(S.pop()&255);p++;break;
case 82:S.push(i<N.length?N[i++]:-1);p++;break;
case 83:u(1);throw S.pop()&255;
default:throw 5}
if(S.length>256)throw 3;
}}catch(x){e=x}
mkdirSync(join(B,d),{recursive:true});
writeFileSync(join(B,d,"stdout.bin"),Buffer.from(O));
writeFileSync(join(B,d,"exit.txt"),e+"\n");
}

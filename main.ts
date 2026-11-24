import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I).sort()){
const P=readFileSync(join(I,d,'program.bin')),N=readFileSync(join(I,d,'input.bin'));
let D=[],C=[],M=new Int32Array(256),o=[],p=0,j=0,s=0,e=0;
const U=n=>{if(D.length<n)throw 2},T=c=>{throw c},J=()=>((P[p+1]|P[p+2]<<8)<<16)>>16;
try{for(;;){
if(s++>=1e6)throw 10;
if(p<0||p>=P.length)throw 9;
const k=P[p];
if(k>15&&k<35&&k!=23&&k!=27&&k!=31){U(2);let b=D.pop(),a=D.pop();
D.push(k==16?a+b|0:k==17?a-b|0:k==18?Math.imul(a,b):k==19?b?Math.trunc(a/b)|0:T(4):k==20?b?a%b|0:T(4):k==21?b?Math.trunc((a>>>0)/(b>>>0))|0:T(4):k==22?b?(a>>>0)%(b>>>0)|0:T(4):k==24?a&b:k==25?a|b:k==26?a^b:k==28?a<<b:k==29?a>>b:k==30?a>>>b|0:k==32?a==b?1:0:k==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0);p++;continue}
if(k==23||k==27){U(1);D.push(k==23?-D.pop()|0:~D.pop());p++;continue}
switch(k){
case 0:throw 0;
case 1:if(p+1>=P.length)throw 9;D.push((P[p+1]<<24)>>24);p+=2;break;
case 2:if(p+4>=P.length)throw 9;D.push(P[p+1]|P[p+2]<<8|P[p+3]<<16|P[p+4]<<24);p+=5;break;
case 3:U(1);D.pop();p++;break;
case 4:U(1);D.push(D[D.length-1]);p++;break;
case 5:U(2);{let t=D[D.length-1];D[D.length-1]=D[D.length-2];D[D.length-2]=t}p++;break;
case 6:U(2);D.push(D[D.length-2]);p++;break;
case 7:U(3);D.push(D.splice(D.length-3,1)[0]);p++;break;
case 48:if(p+2>=P.length)throw 9;p+=3+J();break;
case 49:case 50:if(p+2>=P.length)throw 9;U(1);{let v=D.pop();p+=(v==0)==(k==49)?3+J():3}break;
case 51:if(p+2>=P.length)throw 9;if(C.length>63)throw 7;C.push(p+3);p=P[p+1]|P[p+2]<<8;break;
case 52:if(!C.length)throw 8;p=C.pop();break;
case 64:U(1);{let a=D.pop();if(a<0||a>255)throw 6;D.push(M[a])}p++;break;
case 65:U(2);{let a=D.pop(),v=D.pop();if(a<0||a>255)throw 6;M[a]=v}p++;break;
case 80:U(1);{let v=String(D.pop());if(o.length+v.length>65536)throw 11;for(let i=0;i<v.length;i++)o.push(v.charCodeAt(i))}p++;break;
case 81:U(1);if(o.length>65535)throw 11;o.push(D.pop()&255);p++;break;
case 82:D.push(j<N.length?N[j++]:-1);p++;break;
case 83:U(1);throw D.pop()&255;
default:throw 5}
if(D.length>256)throw 3;
}}catch(x){e=x}
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),Buffer.from(o));
writeFileSync(join(O,d,'exit.txt'),e+'\n');
}

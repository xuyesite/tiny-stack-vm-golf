import{mkdirSync as a,readdirSync as y,readFileSync as r,writeFileSync as w}from"node:fs";
const S="!BE)iq        QQQQQQQIQQQIQQQ QQQ             #++#!           I1              ))A)";
const F=[(A,B)=>A+B,(A,B)=>A-B,Math.imul,(A,B)=>A/B,(A,B)=>A%B,(A,B)=>(A>>>0)/(B>>>0),(A,B)=>(A>>>0)%(B>>>0),0,(A,B)=>A&B,(A,B)=>A|B,(A,B)=>A^B,0,(A,B)=>A<<B,(A,B)=>A>>B,(A,B)=>A>>>B,0,(A,B)=>A==B,(A,B)=>A<B,(A,B)=>(A>>>0)<(B>>>0)];
function R(p,g){let n=p.length,D=new Int32Array(256),d=0,C=new Int32Array(64),e=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,i=0,c=0,s=0,T=v=>({out:o.slice(0,l),code:v});
for(;;){if(s==1e6)return T(10);if(c<0||c>=n)return T(9);let k=p[c],m=(S.charCodeAt(k)|0)-33;if(m<0)return T(5);let j=m&7,q=m>>3&3,u=m>>5&3;if(c+j>=n)return T(9);s++;let x=c+1+j;if(d<q)return T(2);if(d-q+u>256)return T(3);c=x;
if(k<8){if(k==0)return T(0);if(k==1)D[d++]=(p[c-1]<<24)>>24;else if(k==2)D[d++]=p[c-4]|p[c-3]<<8|p[c-2]<<16|p[c-1]<<24;else if(k==3)d--;else if(k==4)D[d++]=D[d-1];else if(k==5)[D[d-1],D[d-2]]=[D[d-2],D[d-1]];else if(k==6){D[d]=D[d-2];d++;}else{let z=D[d-3];D[d-3]=D[d-2];D[d-2]=D[d-1];D[d-1]=z;}}
else if(k<35){if(k==23)D[d-1]=-D[d-1];else if(k==27)D[d-1]=~D[d-1];else{let b=D[d-1],A=D[d-2];if(k>18&&k<23&&!b)return T(4);d-=2;D[d++]=F[k-16](A,b);}}
else if(k<52){if(k==51){if(e==64)return T(7);C[e++]=c;c=p[c-2]|p[c-1]<<8;}else{let v=(p[c-2]|p[c-1]<<8)<<16>>16;if(k==48)c+=v;else{let t=D[--d];if(k==49?t==0:t)c+=v;}}}
else if(k==52){if(!e)return T(8);c=C[--e];}
else if(k<66){let A=D[d-1];if(A<0||A>255)return T(6);if(k==64)D[d-1]=M[A];else{d-=2;M[A]=D[d];}}
else if(k==80){let b=Buffer.from(D[d-1]+"");if(l+b.length>65536)return T(11);d--;o.set(b,l);l+=b.length;}
else if(k==81){if(l+1>65536)return T(11);o[l++]=D[--d]&255;}
else if(k==82)D[d++]=i<g.length?g[i++]:-1;
else return{out:o.slice(0,l),code:D[--d]&255};}}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const id of y(I).sort()){let z=R(r(I+"/"+id+"/program.bin"),r(I+"/"+id+"/input.bin"));a(O+"/"+id,{recursive:true});w(O+"/"+id+"/stdout.bin",z.out);w(O+"/"+id+"/exit.txt",z.code+"\n");}

const fs = require('fs');
const OUT = process.argv[2];
const W = 1600, H = 1000;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}

const PALETTES = {
  copper : ['#120C07','#2A1A0E','#B87333','#E9C39C'],
  slate  : ['#080A0D','#141C24','#3E6076','#A9C6D6'],
  earth  : ['#0D0A08','#241A12','#8A5A2B','#DFC29B'],
  forest : ['#070C0A','#0F2019','#2F6B52','#A9D6BE'],
  dusk   : ['#0A0810','#1A1426','#6B4A7A','#D8BCE2'],
  sand   : ['#100C06','#2B2113','#B08A3E','#F0DCAE']
};

function contours(rnd, cx, cy, n, base, step, color, opa){
  let out = '';
  for(let i=0;i<n;i++){
    const r = base + i*step;
    const a1=rnd()*6.28, a2=rnd()*6.28, a3=rnd()*6.28;
    const k1=0.10+rnd()*0.10, k2=0.05+rnd()*0.06;
    let d='';
    for(let t=0;t<=72;t++){
      const a = t/72*Math.PI*2;
      const rr = r*(1 + k1*Math.sin(3*a+a1) + k2*Math.sin(5*a+a2) + 0.04*Math.sin(9*a+a3));
      const x = cx + rr*Math.cos(a)*1.35, y = cy + rr*Math.sin(a)*0.72;
      d += (t?'L':'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
    }
    out += '<path d="' + d + 'Z" fill="none" stroke="' + color + '" stroke-width="' + (0.8+(i%3)*0.35).toFixed(2) + '" opacity="' + (opa*(1-i/n*0.55)).toFixed(3) + '"/>';
  }
  return out;
}

function geometry(kind, rnd, p){
  const A = p[2], B = p[3];
  const g = [];
  const gl = 'stroke="' + B + '" fill="none" stroke-linecap="round"';
  if(kind==='bridge'){
    for(let k=0;k<2;k++){
      const yb = 720 + k*40, sag = 150 - k*30, o = k*0.5;
      g.push('<path d="M -50 ' + (yb-260) + ' Q 800 ' + (yb+sag) + ' 1650 ' + (yb-260) + '" ' + gl + ' stroke-width="' + (3-k) + '" opacity="' + (0.55-o*0.5) + '"/>');
      for(let x=20;x<1600;x+=54){
        const t=(x+50)/1700;
        const y = (yb-260)*(1-t)*(1-t) + (yb+sag)*2*t*(1-t) + (yb-260)*t*t;
        g.push('<line x1="' + x + '" y1="' + y.toFixed(1) + '" x2="' + x + '" y2="' + (yb+60) + '" ' + gl + ' stroke-width="1" opacity="' + (0.30-o*0.14).toFixed(2) + '"/>');
      }
      g.push('<line x1="-50" y1="' + (yb+60) + '" x2="1650" y2="' + (yb+60) + '" ' + gl + ' stroke-width="2.5" opacity="' + (0.5-o*0.3) + '"/>');
      [380,1180].forEach(function(x){ g.push('<line x1="' + x + '" y1="' + (yb-330) + '" x2="' + x + '" y2="' + (yb+150) + '" ' + gl + ' stroke-width="3" opacity="' + (0.6-o*0.35) + '"/>'); });
    }
  } else if(kind==='towers'){
    for(let i=0;i<5;i++){
      const x = 140+i*320+rnd()*40, h=260+rnd()*320, base=860;
      g.push('<path d="M ' + (x-46) + ' ' + base + ' L ' + (x-16) + ' ' + (base-h) + ' L ' + (x+16) + ' ' + (base-h) + ' L ' + (x+46) + ' ' + base + '" ' + gl + ' stroke-width="2" opacity="0.5"/>');
      for(let j=1;j<7;j++){
        const y=base-h*j/7, w=46-30*j/7;
        g.push('<line x1="' + (x-w) + '" y1="' + y + '" x2="' + (x+w) + '" y2="' + y + '" ' + gl + ' stroke-width="1" opacity="0.3"/>');
        g.push('<line x1="' + (x-w) + '" y1="' + y + '" x2="' + (x+w*0.6) + '" y2="' + (y+h/7) + '" ' + gl + ' stroke-width="0.8" opacity="0.22"/>');
      }
      g.push('<line x1="' + (x-90) + '" y1="' + (base-h+22) + '" x2="' + (x+90) + '" y2="' + (base-h+22) + '" ' + gl + ' stroke-width="2" opacity="0.45"/>');
    }
  } else if(kind==='turbines'){
    for(let i=0;i<4;i++){
      const x=180+i*400+rnd()*60, base=880, h=330+rnd()*140, r=110+rnd()*40, rot=rnd()*120;
      g.push('<line x1="' + x + '" y1="' + base + '" x2="' + x + '" y2="' + (base-h) + '" ' + gl + ' stroke-width="3" opacity="0.5"/>');
      for(let b=0;b<3;b++){
        const a=(rot+b*120)*Math.PI/180;
        g.push('<line x1="' + x + '" y1="' + (base-h) + '" x2="' + (x+r*Math.cos(a)).toFixed(1) + '" y2="' + (base-h+r*Math.sin(a)).toFixed(1) + '" ' + gl + ' stroke-width="2.4" opacity="0.45"/>');
      }
      g.push('<circle cx="' + x + '" cy="' + (base-h) + '" r="7" fill="' + B + '" opacity="0.5"/>');
    }
  } else if(kind==='cranes'){
    for(let i=0;i<3;i++){
      const x=260+i*480, base=850, h=300+rnd()*120;
      g.push('<path d="M ' + (x-70) + ' ' + base + ' L ' + (x-30) + ' ' + (base-h) + ' M ' + (x+70) + ' ' + base + ' L ' + (x+30) + ' ' + (base-h) + '" ' + gl + ' stroke-width="2.4" opacity="0.5"/>');
      g.push('<line x1="' + (x-190) + '" y1="' + (base-h) + '" x2="' + (x+250) + '" y2="' + (base-h) + '" ' + gl + ' stroke-width="3" opacity="0.55"/>');
      g.push('<path d="M ' + (x-30) + ' ' + (base-h-90) + ' L ' + (x+250) + ' ' + (base-h) + ' M ' + (x-30) + ' ' + (base-h-90) + ' L ' + (x-190) + ' ' + (base-h) + ' M ' + (x-30) + ' ' + (base-h) + ' L ' + (x-30) + ' ' + (base-h-90) + '" ' + gl + ' stroke-width="1.6" opacity="0.4"/>');
      g.push('<line x1="' + (x+150) + '" y1="' + (base-h) + '" x2="' + (x+150) + '" y2="' + (base-90) + '" ' + gl + ' stroke-width="1" opacity="0.3"/>');
      g.push('<rect x="' + (x+118) + '" y="' + (base-108) + '" width="64" height="26" ' + gl + ' stroke-width="1.4" opacity="0.35"/>');
    }
    g.push('<line x1="-50" y1="880" x2="1650" y2="880" ' + gl + ' stroke-width="2" opacity="0.4"/>');
  } else if(kind==='road'){
    g.push('<path d="M 640 300 L 220 1000 L 1380 1000 L 960 300 Z" fill="' + A + '" opacity="0.10"/>');
    g.push('<path d="M 640 300 L 220 1000 M 960 300 L 1380 1000" ' + gl + ' stroke-width="2" opacity="0.5"/>');
    for(let i=0;i<16;i++){
      const t=Math.pow(i/16,1.7), y=300+700*t, w=(160+540*t);
      g.push('<line x1="' + (800-w*0.06) + '" y1="' + y + '" x2="' + (800+w*0.06) + '" y2="' + (y+18*t+3) + '" ' + gl + ' stroke-width="' + (1+3*t) + '" opacity="' + (0.15+0.4*t).toFixed(2) + '"/>');
    }
    for(let i=0;i<8;i++){
      const y=320+i*95;
      g.push('<line x1="' + (120+i*20) + '" y1="' + y + '" x2="' + (340+i*40) + '" y2="' + y + '" ' + gl + ' stroke-width="0.8" opacity="0.16"/>');
      g.push('<line x1="' + (1480-i*20) + '" y1="' + y + '" x2="' + (1260-i*40) + '" y2="' + y + '" ' + gl + ' stroke-width="0.8" opacity="0.16"/>');
    }
  } else if(kind==='solar'){
    for(let r=0;r<6;r++){
      const y=520+r*78, sk=90-r*10, w=1300-r*40, x0=150+r*20;
      for(let c=0;c<5;c++){
        const x=x0+c*(w/5);
        g.push('<path d="M ' + x + ' ' + y + ' L ' + (x+w/5-24) + ' ' + (y-26) + ' L ' + (x+w/5-24+sk*0.35) + ' ' + (y+34) + ' L ' + (x+sk*0.35) + ' ' + (y+60) + ' Z" fill="' + A + '" fill-opacity="' + (0.10+r*0.02).toFixed(2) + '" stroke="' + B + '" stroke-width="1" opacity="' + (0.5-r*0.05).toFixed(2) + '"/>');
      }
    }
  } else if(kind==='dam'){
    g.push('<path d="M -60 520 Q 800 300 1660 520 L 1660 640 Q 800 420 -60 640 Z" fill="' + A + '" fill-opacity="0.14" stroke="' + B + '" stroke-width="2" opacity="0.5"/>');
    for(let i=0;i<9;i++){
      const x=120+i*170, s=Math.sin(i/8*Math.PI)*180;
      g.push('<line x1="' + x + '" y1="' + (520-s+30).toFixed(1) + '" x2="' + x + '" y2="' + (640-s+40).toFixed(1) + '" ' + gl + ' stroke-width="1" opacity="0.3"/>');
    }
    for(let i=0;i<7;i++){
      const y=700+i*46;
      g.push('<path d="M -60 ' + y + ' Q 400 ' + (y-22) + ' 800 ' + y + ' T 1660 ' + y + '" ' + gl + ' stroke-width="1.2" opacity="' + (0.34-i*0.035).toFixed(2) + '"/>');
    }
  } else if(kind==='terraces'){
    for(let i=0;i<9;i++){
      const y=430+i*66;
      g.push('<path d="M -60 ' + y + ' C 360 ' + (y-70+i*6) + ' 900 ' + (y+64-i*5) + ' 1660 ' + (y-30) + '" ' + gl + ' stroke-width="' + (1.4-i*0.06).toFixed(2) + '" opacity="' + (0.45-i*0.035).toFixed(2) + '"/>');
      for(let j=0;j<24;j++){
        const x=j*70 + (i%2?34:0);
        g.push('<circle cx="' + x + '" cy="' + (y+16+Math.sin(j*0.7+i)*8).toFixed(1) + '" r="1.8" fill="' + B + '" opacity="0.18"/>');
      }
    }
  } else if(kind==='network'){
    const pts=[];
    for(let i=0;i<26;i++) pts.push([120+rnd()*1360, 200+rnd()*680]);
    pts.forEach(function(p1,i){ pts.forEach(function(p2,j){
      if(j<=i) return;
      const d=Math.hypot(p1[0]-p2[0],p1[1]-p2[1]);
      if(d<300) g.push('<line x1="' + p1[0].toFixed(0) + '" y1="' + p1[1].toFixed(0) + '" x2="' + p2[0].toFixed(0) + '" y2="' + p2[1].toFixed(0) + '" ' + gl + ' stroke-width="0.9" opacity="' + (0.30*(1-d/300)).toFixed(3) + '"/>');
    }); });
    pts.forEach(function(p){ g.push('<circle cx="' + p[0].toFixed(0) + '" cy="' + p[1].toFixed(0) + '" r="' + (2+rnd()*4).toFixed(1) + '" fill="' + B + '" opacity="0.5"/>'); });
  } else {
    let x=-40;
    while(x<1660){
      const w=60+rnd()*120, h=180+rnd()*470;
      g.push('<rect x="' + x.toFixed(0) + '" y="' + (920-h).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" fill="' + A + '" fill-opacity="0.12" stroke="' + B + '" stroke-width="1.1" opacity="0.42"/>');
      for(let r=1;r<Math.floor(h/46);r++) g.push('<line x1="' + (x+8).toFixed(0) + '" y1="' + (920-h+r*46).toFixed(0) + '" x2="' + (x+w-8).toFixed(0) + '" y2="' + (920-h+r*46).toFixed(0) + '" ' + gl + ' stroke-width="0.6" opacity="0.2"/>');
      x+=w+16+rnd()*26;
    }
  }
  return g.join('');
}

function make(id, kind, palName, seed){
  const rnd = mulberry32(seed);
  const p = PALETTES[palName];
  const cx = 300+rnd()*1000, cy = 200+rnd()*500;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" preserveAspectRatio="xMidYMid slice">' +
  '<defs>' +
  '<linearGradient id="bg' + id + '" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="' + p[1] + '"/><stop offset="1" stop-color="' + p[0] + '"/></linearGradient>' +
  '<radialGradient id="gl' + id + '" cx="' + (cx/W).toFixed(2) + '" cy="' + (cy/H).toFixed(2) + '" r="0.75"><stop offset="0" stop-color="' + p[2] + '" stop-opacity="0.55"/><stop offset="0.5" stop-color="' + p[2] + '" stop-opacity="0.14"/><stop offset="1" stop-color="' + p[2] + '" stop-opacity="0"/></radialGradient>' +
  '<linearGradient id="vg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.42"/><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.62"/></linearGradient>' +
  '<pattern id="gr' + id + '" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M46 0 L0 0 0 46" fill="none" stroke="' + p[3] + '" stroke-width="0.5" opacity="0.07"/></pattern>' +
  '<filter id="nz' + id + '"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="' + (seed%100) + '"/><feColorMatrix type="saturate" values="0"/></filter>' +
  '</defs>' +
  '<rect width="' + W + '" height="' + H + '" fill="url(#bg' + id + ')"/>' +
  '<rect width="' + W + '" height="' + H + '" fill="url(#gr' + id + ')"/>' +
  '<rect width="' + W + '" height="' + H + '" fill="url(#gl' + id + ')"/>' +
  contours(rnd, cx, cy, 22, 60, 34, p[3], 0.30) +
  geometry(kind, rnd, p) +
  '<rect width="' + W + '" height="' + H + '" fill="url(#vg' + id + ')"/>' +
  '<rect width="' + W + '" height="' + H + '" filter="url(#nz' + id + ')" opacity="0.055"/>' +
  '</svg>';
  fs.writeFileSync(OUT + '/' + id + '.svg', svg);
}

const SPEC = [
  ['art-infrastructure','bridge','copper',1011],
  ['art-energy','turbines','slate',2022],
  ['art-mining','towers','earth',3033],
  ['art-urban','skyline','dusk',4044],
  ['art-agri','terraces','forest',5055],
  ['art-logistics','cranes','slate',6066],
  ['art-water','dam','slate',7077],
  ['art-digital','network','copper',8088],
  ['art-road','road','sand',9099],
  ['art-solar','solar','sand',10110],
  ['art-hero-1','bridge','copper',12121],
  ['art-hero-2','cranes','earth',13131],
  ['art-hero-3','turbines','slate',14141],
  ['art-hero-4','skyline','dusk',15151],
  ['art-p1','road','earth',16161],
  ['art-p2','dam','forest',17171],
  ['art-p3','towers','copper',18181],
  ['art-p4','solar','sand',19191],
  ['art-p5','network','slate',20202],
  ['art-p6','terraces','earth',21212],
  ['art-p7','skyline','copper',22222],
  ['art-p8','cranes','dusk',23232],
  ['art-p9','bridge','forest',24242],
  ['art-news-1','network','copper',25252],
  ['art-news-2','turbines','forest',26262],
  ['art-news-3','skyline','slate',27272],
  ['art-news-4','road','copper',28282],
  ['art-about','towers','slate',29292],
  ['art-impact','terraces','forest',30303],
  ['art-contact','network','earth',31313]
];
SPEC.forEach(function(s){ make(s[0],s[1],s[2],s[3]); });
console.log('generated ' + SPEC.length);

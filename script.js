/* ---------- small particle background (canvas) ---------- */
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w=canvas.width=innerWidth, h=canvas.height=innerHeight;

  const particles = [];
  const count = Math.round((w*h)/90000);

  function rand(min,max){return Math.random()*(max-min)+min}

  function init(){
    particles.length=0;
    for(let i=0;i<count;i++){
      particles.push({x:rand(0,w),y:rand(0,h),r:rand(0.7,2.4),vx:rand(-0.2,0.2),vy:rand(-0.05,0.2),alpha:rand(0.08,0.35)})
    }
  }

  function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;init()}
  addEventListener('resize', ()=>{resize()});

  function draw(){
    ctx.clearRect(0,0,w,h);
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(8,10,14,0.6)');
    g.addColorStop(1,'rgba(2,3,5,0.65)');
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x < -10) p.x = w+10; if(p.x > w+10) p.x=-10;
      if(p.y > h+10) p.y = -10;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(78,225,255,'+p.alpha+')';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });

    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a=particles[i], b=particles[j];
        const dx=a.x-b.x, dy=a.y-b.y; const d2 = dx*dx+dy*dy;
        if(d2 < 9000){
          ctx.beginPath(); ctx.strokeStyle = 'rgba(78,225,255,'+ (0.04) +')'; ctx.lineWidth=0.6;
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  init(); draw();
})();

/* Smooth scroll behaviour for internal links */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        e.preventDefault(); document.querySelector(id)?.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })
})();

document.addEventListener('contextmenu', e => e.preventDefault());

// Block common save shortcuts
document.addEventListener('keydown', e => {
  if (
    (e.ctrlKey && ['s','u','c','p'].includes(e.key.toLowerCase())) ||
    e.key === 'F12'
  ) {
    e.preventDefault();
  }
});

// Disable image dragging
document.querySelectorAll('img').forEach(img => {
  img.setAttribute('draggable', 'false');
});


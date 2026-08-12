document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-birthday-name]').forEach(element=>element.textContent=CONFIG.nombre);
  document.title=`Mis XV Años · ${CONFIG.nombre}`;
  document.body.classList.add('locked');
  const intro=document.getElementById('intro');
  const envelope=document.getElementById('open-invitation');
  const musicButton=document.getElementById('music-toggle');
  let audioCtx,master,playing=false,timer;

  function tone(frequency,when,duration,volume=.09,type='sine',attack=.04){
    if(!audioCtx)return;
    const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
    osc.type=type;osc.frequency.value=frequency;
    gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(volume,when+attack);
    gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
    osc.connect(gain);gain.connect(master);osc.start(when);osc.stop(when+duration+.1);
  }
  function harp(frequency,when,volume=.075){
    tone(frequency,when,2.4,volume,'sine',.012);
    tone(frequency*2,when,1.25,volume*.22,'sine',.008);
    tone(frequency*3,when,0.8,volume*.08,'sine',.006);
  }
  function warmChord(notes,when,duration=5){
    notes.forEach((note,index)=>{
      tone(note,when+index*.035,duration,.022,'sine',1.1);
      tone(note/2,when+index*.035,duration,.012,'sine',1.3);
    });
  }
  function playPhrase(){
    if(!playing)return;
    // Vals original de cuento: arpa, campanas y un fondo orquestal cálido.
    const now=audioCtx.currentTime+.05;
    const chords=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]];
    const melody=[659.25,587.33,523.25,493.88,523.25,659.25,783.99,659.25,587.33,523.25,493.88,440];
    chords.forEach((chord,i)=>warmChord(chord,now+i*3,4.2));
    melody.forEach((note,i)=>{
      harp(note,now+i,.075);
      if(i%3===0)harp(chords[Math.floor(i/3)][0]/2,now+i,.055);
    });
    [0,3,6,9].forEach((beat,i)=>tone(1046.5,now+beat,1.8,.018,'sine',.01));
    timer=setTimeout(playPhrase,12000);
  }
  function startMusic(){
    if(!audioCtx){
      audioCtx=new(window.AudioContext||window.webkitAudioContext)();
      master=audioCtx.createGain();
      const limiter=audioCtx.createDynamicsCompressor();
      limiter.threshold.value=-12;limiter.knee.value=8;limiter.ratio.value=8;
      limiter.attack.value=.003;limiter.release.value=.2;
      master.gain.value=1.45;master.connect(limiter);limiter.connect(audioCtx.destination);
    }
    audioCtx.resume();playing=true;musicButton.classList.remove('paused');playPhrase();
  }
  function stopMusic(){playing=false;clearTimeout(timer);if(audioCtx)audioCtx.suspend();musicButton.classList.add('paused')}

  envelope.addEventListener('click',()=>{
    envelope.classList.add('open');startMusic();
    setTimeout(()=>{intro.classList.add('hidden');document.body.classList.remove('locked');document.querySelector('.hero .reveal').classList.add('visible')},1000);
  },{once:true});
  musicButton.addEventListener('click',()=>playing?stopMusic():startMusic());

  const target=new Date(CONFIG.fechaEvento).getTime();
  function countdown(){
    const diff=target-Date.now(),box=document.getElementById('countdown');
    if(diff<=0){box.innerHTML='<p class="time">¡Hoy comienza la magia!</p>';return}
    const values=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
    ['cd-dias','cd-horas','cd-min','cd-seg'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'));
  }
  countdown();setInterval(countdown,1000);

  // Confirmación: organiza las respuestas y las envía por WhatsApp
  const rsvpForm=document.getElementById('rsvp-form');
  rsvpForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!rsvpForm.reportValidity())return;
    const data=new FormData(rsvpForm);
    const message=[
      '✨ *CONFIRMACIÓN XV AÑOS* ✨',
      '',
      `👤 *Nombre:* ${data.get('nombre')}`,
      `📱 *WhatsApp:* ${data.get('telefono')}`,
      `🧒 *¿Es menor de edad?:* ${data.get('menor')}`,
      `🎉 *Asistencia:* ${data.get('asistencia')}`,
      '',
      '29 de agosto de 2026 · 6:00 p. m.',
      'Aitabu Hotel · Vereda La Poyata'
    ].join('\n');
    const url=`https://wa.me/${CONFIG.whatsappConfirmacion}?text=${encodeURIComponent(message)}`;
    window.open(url,'_blank','noopener,noreferrer');
  });

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.18});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const lanterns=document.getElementById('lanterns');
  for(let i=0;i<13;i++){
    const el=document.createElement('i');el.className='lantern';el.style.left=`${5+Math.random()*90}%`;el.style.animationDuration=`${11+Math.random()*12}s`;el.style.animationDelay=`-${Math.random()*18}s`;el.style.opacity=.35+Math.random()*.5;lanterns.appendChild(el);
  }

  // Destellos que siguen suavemente el cursor
  const cursor=document.getElementById('magic-cursor');
  if(window.matchMedia('(pointer:fine)').matches){
    window.addEventListener('pointermove',e=>{
      cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.style.opacity='.9';
    });
    document.addEventListener('mouseleave',()=>cursor.style.opacity='0');

    // Profundidad sutil en las tarjetas
    document.querySelectorAll('.tilt-card').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(800px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }

  // Movimiento de profundidad al recorrer la portada
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      const y=Math.min(window.scrollY,window.innerHeight);
      document.querySelector('.hero-content').style.transform=`translateY(${y*.12}px)`;
      document.querySelector('.golden-ribbon').style.transform=`translateY(${y*.06}px)`;
      ticking=false;
    });
  },{passive:true});
});

(function(){
    'use strict';
    function init(scope){
      var root=scope||document.getElementById('ty-cpa');
      if(!root||root.dataset.tyCpaReady==='1') return;
      root.dataset.tyCpaReady='1';
  
      var reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var fine=window.matchMedia && window.matchMedia('(pointer: fine)').matches;
      var stage=root.querySelector('.ty-cpa-stage');
      var poster=root.querySelector('.ty-cpa-poster');
      var card=root.querySelector('.ty-cpa-business-card');
      var brochure=root.querySelector('.ty-cpa-brochure');
  
      function resetHero(){
        [poster,card,brochure].forEach(function(el){if(el)el.style.transform='';});
      }
  
      if(stage&&fine&&!reduced){
        stage.addEventListener('pointermove',function(e){
          var r=stage.getBoundingClientRect();
          if(!r.width||!r.height)return;
          var x=(e.clientX-r.left)/r.width-.5;
          var y=(e.clientY-r.top)/r.height-.5;
          if(poster)poster.style.transform='rotateY('+(-19+x*9)+'deg) rotateX('+(5-y*6)+'deg) rotateZ('+(-5+x*2)+'deg) translateY('+(-y*6)+'px)';
          if(card)card.style.transform='rotateY('+(-18+x*10)+'deg) rotateX('+(11-y*8)+'deg) rotateZ('+(5+x*3)+'deg) translateY('+(-y*7)+'px)';
          if(brochure)brochure.style.transform='rotateY('+(-20+x*8)+'deg) rotateZ('+(7+x*3)+'deg) translateY('+(-y*7)+'px)';
        },{passive:true});
        stage.addEventListener('pointerleave',resetHero,{passive:true});
      }
  
      if(fine&&!reduced){
        root.querySelectorAll('.ty-cpa-service-card,.ty-cpa-quality-card,.ty-cpa-price-card').forEach(function(el){
          el.addEventListener('pointermove',function(e){
            var r=el.getBoundingClientRect();
            if(!r.width||!r.height)return;
            var x=(e.clientX-r.left)/r.width-.5;
            var y=(e.clientY-r.top)/r.height-.5;
            el.style.transform='perspective(900px) rotateX('+(-y*4)+'deg) rotateY('+(x*5)+'deg) translateY(-2px)';
          },{passive:true});
          el.addEventListener('pointerleave',function(){el.style.transform='';},{passive:true});
        });
      }
  
      var reveal=root.querySelectorAll('.ty-cpa-intro,.ty-cpa-service-card,.ty-cpa-dark-grid>div,.ty-cpa-quality-card,.ty-cpa-process-grid article,.ty-cpa-work-grid article,.ty-cpa-price-card,.ty-cpa-faq-list,.ty-cpa-contact-box');
      reveal.forEach(function(el){el.classList.add('ty-cpa-reveal');});
      if(reduced||!('IntersectionObserver' in window)){
        reveal.forEach(function(el){el.classList.add('is-visible');});
      }else{
        var observer=new IntersectionObserver(function(entries,obs){
          entries.forEach(function(entry){
            if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}
          });
        },{threshold:.08,rootMargin:'0px 0px -25px 0px'});
        reveal.forEach(function(el){observer.observe(el);});
      }
  
      root.querySelectorAll('.ty-cpa-faq-list details').forEach(function(detail){
        detail.addEventListener('toggle',function(){
          if(!detail.open)return;
          root.querySelectorAll('.ty-cpa-faq-list details[open]').forEach(function(other){
            if(other!==detail)other.removeAttribute('open');
          });
        });
      });
    }
  
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',function(){init();},{once:true});
    }else{init();}
  
    /* Elementor may render the widget after DOMContentLoaded. */
    if(window.MutationObserver){
      var mo=new MutationObserver(function(){
        var root=document.getElementById('ty-cpa');
        if(root&&root.dataset.tyCpaReady!=='1')init(root);
      });
      mo.observe(document.body,{childList:true,subtree:true});
      setTimeout(function(){mo.disconnect();},10000);
    }
  })();

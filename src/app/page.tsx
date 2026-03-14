"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShoppingCart, Play, Menu, X, ArrowRight, Star, ChevronRight,
  CheckCircle, Zap, Shield, Cpu, Leaf, Wifi, Code2, ChevronLeft, MessageCircle, Heart,
} from "lucide-react";

/* ── Illustration paths from no_bg folder ── */
const ILLUS = {
  kidBoy: "/no_bg/Learning Kid Boy.png",
  kidGirl: "/no_bg/Learning Kid _ Girl.png",
  simpleBot: "/no_bg/Simple robot 1.png",
  sittingBot: "/no_bg/Sitting Robot.png",
  happyBot: "/no_bg/happy bot looking at tablet.png",
  stem: "/no_bg/STEM.png",
  aiBot: "/no_bg/Robot illustration standing on AI name chip.png",
  sensors: "/no_bg/Spread Sensors.png",
};

/* ── Constants ─────────────────────────────────────── */
const WA = `https://wa.me/918275478093?text=${encodeURIComponent("Hi Thinking Robot! 👋 I'm interested in your PICO BOT kits. Can you help me choose the right one?")}`;
const SITE = "https://thinkingrobot.in";
const DOCS = "https://trc-docs.vercel.app/";
const IG   = "https://www.instagram.com/thinkingrobotlab/";
const FB   = "https://www.facebook.com/profile.php?id=100087056118040";
const TW   = "https://x.com/";

/* ── Data ──────────────────────────────────────────── */
const KITS = [
  { id:"mini", name:"Mini Arduino Starter Kit", badge:"Beginner", price:1899, age:"Ages 8+", accent:"#22c55e", accentBg:"rgba(34,197,94,.10)", slug:"mini-arduino-starter-kit-thinking-robot-compact-beginner-pack", image:"https://res.cloudinary.com/drwys1ksu/image/upload/v1770877019/Electronics-Mini-Kit_y3xsua.png", tagline:"Your first step into electronics & coding", bullets:["20+ components included","Block coding ready","Breadboard prototyping","Beginner tutorials"] },
  { id:"iot",  name:"IoT Beginners Kit",         badge:"Wi-Fi", price:1899, age:"Ages 10+", accent:"#38bdf8", accentBg:"rgba(56,189,248,.10)", slug:"iot-kit-for-beginners-esp32-wireless-development-kit-thinking-robot-complete-starter-pack", image:"https://res.cloudinary.com/drwys1ksu/image/upload/v1770876991/IoT-Beginners-Pack-630x630_c2gz3b.png", tagline:"Connect to the internet & build smart devices", bullets:["ESP32 Wi-Fi + Bluetooth","IoT sensors included","App control ready","Cloud integration"] },
  { id:"aio",  name:"Arduino All-in-One Kit",    badge:"Complete", price:2299, age:"Ages 10+", accent:"#ff6b35", accentBg:"rgba(255,107,53,.10)", slug:"arduino-all-in-one-ultimate-starter-kit-thinking-robot-complete-beginner-pack", image:"https://res.cloudinary.com/drwys1ksu/image/upload/v1770877011/30-IN-ONE-ARDUINO-KIT-630x630_exvsmd.png", tagline:"Master robotics with 30+ sensors & actuators", bullets:["30+ components","Motors, servos & LEDs","Tutorials & guides","Python + C++ ready"] },
  { id:"pico", name:"PICO Bot 4-Wheel Robot",   badge:"⭐ Popular", price:2999, age:"Ages 10+", accent:"#ffd60a", accentBg:"rgba(255,214,10,.10)", slug:"pico-bot-4-wheel-robot-with-esp32-edition-thinking-robot-modular-robotics-kit", image:"https://res.cloudinary.com/drwys1ksu/image/upload/v1770959243/1_eqn481.png", tagline:"Build your own robot — then code it to move!", bullets:["ESP32 powered","4-wheel drive chassis","Bluetooth control","Obstacle avoidance"] },
  { id:"plant",name:"Smart Plant Monitoring Kit",badge:"IoT Project", price:899, age:"Ages 12+", accent:"#a78bfa", accentBg:"rgba(167,139,250,.10)", slug:"smart-plant-monitoring-and-watering-kit-esp8266-automated-gardening-system", image:"https://res.cloudinary.com/drwys1ksu/image/upload/v1770876706/Screenshot_1_v71dbi.png", tagline:"Build an automated smart garden system", bullets:["ESP8266 Wi-Fi board","App-controlled watering","Moisture & humidity sensors","Manual + auto modes"] },
];

const FEATURES = [
  { icon:"⚡", illus:ILLUS.sensors, title:"Hands-On Learning",     desc:"Build real circuits, not simulations. Every kit comes with working components and guided projects.", accent:"#f5a623" },
  { icon:"📱", illus:ILLUS.happyBot, title:"App & Bluetooth Ready", desc:"Control your builds wirelessly from any Android or iOS device via Bluetooth or Wi-Fi.", accent:"#38bdf8" },
  { icon:"🎓", illus:ILLUS.stem, title:"Curriculum Aligned",    desc:"Projects aligned with CBSE, ICSE, and international STEM curricula. School project ready.", accent:"#22c55e" },
  { icon:"📦", illus:ILLUS.simpleBot, title:"Everything Included",   desc:"Every wire, sensor, and component you need for included projects — open the box and start.", accent:"#ff6b35" },
  { icon:"🛡️", illus:ILLUS.sittingBot, title:"Safe & Tested",        desc:"All components are child-safe, RoHS compliant, and tested for classroom and home use.", accent:"#8b5cf6" },
  { icon:"🔧", illus:ILLUS.aiBot, title:"Real Support",          desc:"Got stuck? WhatsApp us, email us, or join our Discord community — free help 7 days a week.", accent:"#00b4a6" },
];

const REVIEWS = [
  { name:"Priya Sharma",    role:"Parent · Mumbai",              text:"My son assembled the PICO Bot in one afternoon and won't stop talking about it. He's writing actual Python now — I can't believe it!", rating:5, initial:"P", accent:"#00d2c6" },
  { name:"Sunita Deshmukh", role:"आई · Kolhapur",                text:"माझ्या मुलाने PICO Bot घरात बनवला आणि आता तो स्वतः Python वर code करतो! खूपच innovative आहे — पैशाचं value मिळालं नक्की. 🙏", rating:5, initial:"S", accent:"#22c55e" },
  { name:"Rajesh Kharpude", role:"Science Teacher · DPS Nashik", text:"We ordered 3 Arduino kits for our school lab. Quality is fantastic and docs so clear — students are up and running in minutes. Excellent for CBSE projects.", rating:5, initial:"R", accent:"#ff6b35" },
  { name:"Pratik Kamble",   role:"9th Grade Student · Kolhapur", text:"Bro this kit is 🔥! Arduino All-in-One madhe 30 sensors ahet — I made a smart home model for science expo and won 1st place in district! 100% recommend!", rating:5, initial:"P", accent:"#ffd60a" },
  { name:"Ananya Gupta",    role:"Parent of twins · Pune",       text:"Both my kids use different kits and both love them. The online guides are excellent. Way better quality than imported options at this price.", rating:5, initial:"A", accent:"#a78bfa" },
  { name:"Dr. Vikram Mehta",role:"EdTech Consultant · Bangalore",text:"Finally an Indian STEM brand doing it right. The IoT kit is perfectly curated — nothing missing, nothing unnecessary. Full marks.", rating:5, initial:"V", accent:"#38bdf8" },
];

/* ── Helpers ───────────────────────────────────────── */
function FadeUp({ children, delay=0, style, className }: { children:React.ReactNode; delay?:number; style?:React.CSSProperties; className?:string }) {
  return (
    <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:.6,delay,ease:[.22,1,.36,1]}} style={style} className={className}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [reviewIdx, setReviewIdx]   = useState(0);
  const dragStartX                  = useRef(0);

  const prevReview = () => setReviewIdx(i => Math.max(0, i-1));
  const nextReview = () => setReviewIdx(i => Math.min(REVIEWS.length-1, i+1));

  return (
    <div style={{background:"var(--bg)",minHeight:"100vh",overflow:"clip",maxWidth:"100%",width:"100%",position:"relative"}}>

      {/* ══ NAVBAR ══ */}
      <header className="glass" style={{position:"fixed",top:0,left:0,right:0,height:"var(--nav-h)",zIndex:100,borderBottom:"1px solid var(--border)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <a href="#" style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <Image src="/logo.png" alt="Thinking Robot" width={36} height={36} style={{borderRadius:8,display:"block"}} />
            <div>
              <div style={{fontSize:16,fontWeight:900,color:"var(--text)",letterSpacing:"-.02em",lineHeight:1}}>PICO BOT</div>
              <div style={{fontSize:9,color:"var(--muted)",letterSpacing:".09em",textTransform:"uppercase"}}>BY THINKING ROBOT</div>
            </div>
          </a>

          <nav style={{display:"flex",alignItems:"center",gap:24}} className="nav-desktop">
            {[["Our Kits","#kits"],["Features","#features"],["How It Works","#how"],["Reviews","#reviews"],["Docs",DOCS]].map(([l,h]) => (
              <a key={h} href={h} target={h.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{fontSize:13,fontWeight:600,color:"var(--muted)",transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--text)"} onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}>{l}</a>
            ))}
          </nav>

          <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa nav-desktop" style={{background:"#25D366",color:"#fff",fontSize:13,padding:"9px 16px"}}>
              <MessageCircle size={14}/> WhatsApp
            </a>
            <a href="#kits" className="btn btn-primary nav-desktop" style={{fontSize:13,padding:"9px 16px"}}>
              <ShoppingCart size={14}/> Shop
            </a>
            <button onClick={()=>setMenuOpen(!menuOpen)} className="nav-mobile" style={{padding:"8px 10px",borderRadius:10,background:"rgba(0,0,0,.03)",border:"1px solid var(--border)",color:"var(--text)",cursor:"pointer",display:"none"}} aria-label="menu">
              {menuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.22}} style={{overflow:"hidden",background:"var(--bg-card)",borderTop:"1px solid var(--border)"}}>
              <div style={{padding:"16px 24px 20px",display:"flex",flexDirection:"column",gap:12}}>
                {[["Our Kits","#kits"],["Features","#features"],["How It Works","#how"],["Reviews","#reviews"],["Tutorials",DOCS]].map(([l,h])=>(
                  <a key={h} href={h} onClick={()=>setMenuOpen(false)} target={h.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{fontSize:15,fontWeight:600,color:"var(--text)"}}>{l}</a>
                ))}
                <div style={{display:"flex",gap:10,marginTop:6}}>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="btn" style={{flex:1,justifyContent:"center",background:"#25D366",color:"#fff",fontSize:13}}><MessageCircle size={14}/> WhatsApp</a>
                  <a href="#kits" className="btn btn-primary" onClick={()=>setMenuOpen(false)} style={{flex:1,justifyContent:"center",fontSize:13}}><ShoppingCart size={14}/> Shop</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        @media(max-width:768px){.nav-desktop{display:none!important}.nav-mobile{display:flex!important}}
        @media(min-width:769px){.nav-mobile{display:none!important}}
      `}</style>

      {/* ══ HERO ══ */}
      <section className="dot-bg" style={{paddingTop:"calc(var(--nav-h) + 64px)",paddingBottom:80,position:"relative",overflow:"hidden",maxWidth:"100%"}}>
        {/* Decorative child-friendly blobs */}
        <div style={{position:"absolute",top:80,left:0,width:"min(300px, 60vw)",height:"min(300px, 60vw)",borderRadius:"50%",background:"rgba(56,189,248,.08)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:40,right:0,width:"min(250px, 50vw)",height:"min(250px, 50vw)",borderRadius:"50%",background:"rgba(0,180,166,.06)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"40%",right:"5%",width:"min(120px, 25vw)",height:"min(120px, 25vw)",borderRadius:"50%",background:"rgba(255,107,53,.05)",pointerEvents:"none"}}/>

        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",width:"100%",boxSizing:"border-box"}} className="hero-grid">
          {/* Text */}
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            <FadeUp>
              <span className="tag-pill" style={{marginBottom:20,display:"inline-flex"}}>
                <span className="anim-pulse-dot" style={{width:6,height:6,borderRadius:"50%",background:"var(--teal)",flexShrink:0}}/>
                Now Available Across India 🇮🇳
              </span>
            </FadeUp>
            <FadeUp delay={.07}>
              <h1 className="hero-h1">
                Build Robots.<br/>
                <span className="grad-teal">Learn to Code.</span><br/>
                <span style={{color:"var(--muted)"}}>Shape the Future.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={.13}>
              <p className="hero-sub" style={{fontSize:17,lineHeight:1.75,color:"var(--muted)",marginBottom:32,maxWidth:480}}>
                India&apos;s favourite robotics & electronics kits for kids and beginners. From your first LED to a 4-wheel Wi-Fi robot. 🤖✨
              </p>
            </FadeUp>
            <FadeUp delay={.18}>
              <div className="hero-btns" style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:40}}>
                <a href="#kits" className="btn btn-primary hero-btn">Explore Kits <ArrowRight size={16}/></a>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="btn hero-btn" style={{background:"#25D366",color:"#fff"}}><MessageCircle size={15}/> WhatsApp</a>
                <a href="#how" className="btn btn-ghost hero-btn"><Play size={14} style={{color:"var(--teal)"}}/> How It Works</a>
              </div>
            </FadeUp>
            <FadeUp delay={.22}>
              <div className="hero-stats" style={{display:"flex",gap:28,paddingTop:24,borderTop:"1px solid var(--border)"}}>
                {[["500+","Kits Sold"],["4.9★","Avg Rating"],["₹899","Starting Price"]].map(([n,l])=>(
                  <div key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Robot + child-friendly illustration */}
          <FadeUp delay={.14}>
            <div className="hero-robot-wrap" style={{position:"relative",maxWidth:"100%",boxSizing:"border-box"}}>
              {/* Soft colored ring behind robot */}
              <div style={{position:"absolute",inset:"-10%",display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
                <div className="anim-spin-slow" style={{width:"90%",height:"90%",borderRadius:"50%",border:"2px solid rgba(0,180,166,.12)"}}/>
                <div className="anim-spin-slow" style={{position:"absolute",width:"72%",height:"72%",borderRadius:"50%",border:"2px dashed rgba(56,189,248,.08)",animationDirection:"reverse"}}/>
              </div>
              <motion.div className="anim-float" style={{position:"relative",zIndex:2}}>
                <img src="https://res.cloudinary.com/drwys1ksu/image/upload/v1772909280/pico_bot_transp_uipkeg.png" alt="PICO Bot Robot" style={{width:"100%",height:"auto",display:"block",filter:"drop-shadow(0 20px 40px rgba(0,180,166,.18))"}}/>
              </motion.div>
              {/* Floating badges — hidden on mobile via CSS */}
              {[
                {label:"Wi-Fi Control", icon:<Wifi size={12}/>, color:"var(--teal)", border:"rgba(0,180,166,.25)", top:"14%", left:"0%", dy:[-8,8,-8], dur:4},
                {label:"Block & Python", icon:<Code2 size={12}/>, color:"#ff6b35", border:"rgba(255,107,53,.25)", bottom:"20%", right:"0%", dy:[8,-8,8], dur:4.5},
                {label:"Child Safe", icon:<Shield size={12}/>, color:"#22c55e", border:"rgba(34,197,94,.25)", bottom:"6%", left:"6%", dy:[-5,9,-5], dur:5},
              ].map(({label,icon,color,border,top,left,bottom,right,dy,dur})=>(
                <motion.div key={label} animate={{y:dy}} transition={{repeat:Infinity,duration:dur,ease:"easeInOut"}} className="hero-badge"
                  style={{position:"absolute",top,left,bottom,right,background:"rgba(255,255,255,.92)",backdropFilter:"blur(12px)",border:`1px solid ${border}`,borderRadius:99,padding:"7px 13px",display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,color,boxShadow:"0 4px 16px rgba(0,0,0,.06)",whiteSpace:"nowrap",zIndex:10}}>
                  {icon} {label}
                </motion.div>
              ))}
              {/* Child-friendly small illustration peaking */}
              <img src={ILLUS.happyBot} alt="" className="hero-child-illus" style={{position:"absolute",bottom:"-8%",right:"-12%",width:"28%",opacity:.7,zIndex:1,pointerEvents:"none"}}/>
            </div>
          </FadeUp>
        </div>
        <style>{`
          .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;width:100%;box-sizing:border-box}
          .hero-h1{font-size:clamp(34px,5.5vw,64px);font-weight:900;line-height:1.08;letter-spacing:-.03em;color:var(--text);margin-bottom:18px}
          .hero-sub{font-size:17px}
          .hero-badge{}
          .hero-child-illus{}
          @media(max-width:768px){
            .hero-grid{grid-template-columns:1fr!important;gap:36px!important;max-width:100%!important;padding:0 16px!important;box-sizing:border-box!important}
            .hero-grid>div:first-child{order:2;text-align:center;width:100%;max-width:100%;box-sizing:border-box}
            .hero-grid>div:last-child{order:1;max-width:min(240px,55vw);margin:0 auto;width:100%}
            .hero-robot-wrap{overflow:clip;max-width:100%}
            .hero-h1{font-size:clamp(24px,6.5vw,36px)!important;text-align:center;word-wrap:break-word;overflow-wrap:break-word}
            .hero-sub{font-size:14px!important;text-align:center;margin-left:auto!important;margin-right:auto!important;max-width:100%!important;word-wrap:break-word}
            .hero-badge{display:none!important}
            .hero-btns{flex-wrap:wrap!important;gap:7px!important;justify-content:center;width:100%}
            .hero-btn{padding:9px 13px!important;font-size:12px!important;flex-shrink:0}
            .hero-btn svg{width:13px!important;height:13px!important}
            .hero-child-illus{display:none!important}
            .hero-stats{justify-content:center;gap:20px!important;flex-wrap:wrap}
            .tag-pill{font-size:10px!important;padding:5px 12px!important}
          }
        `}</style>
      </section>

      {/* ══ TRUST STRIP (Parents teaser — before kits) ══ */}
      <section style={{background:"linear-gradient(135deg,var(--bg-2),var(--bg-3))",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",padding:"40px 24px",overflow:"hidden",maxWidth:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto",overflow:"hidden",width:"100%",boxSizing:"border-box"}}>
          <p style={{textAlign:"center",fontSize:12,fontWeight:800,color:"var(--teal)",textTransform:"uppercase",letterSpacing:".09em",marginBottom:24}}>⭐ Why Parents Trust Us</p>
          <div className="trust-wrap"><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}} className="trust-grid">
            {[
              {icon:"🛡️",title:"RoHS Certified",sub:"Child-safe components"},
              {icon:"🎓",title:"STEM Aligned",sub:"CBSE/ICSE ready"},
              {icon:"📦",title:"All Included",sub:"Nothing extra needed"},
              {icon:"↩️",title:"30-Day Returns",sub:"Risk-free purchase"},
            ].map(t=>(
              <div key={t.title} style={{display:"flex",alignItems:"center",gap:12,background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:14,padding:"16px 18px",boxShadow:"0 2px 8px rgba(0,0,0,.03)"}}>
                <div className="ti" style={{fontSize:28,flexShrink:0}}>{t.icon}</div>
                <div>
                  <div className="tt" style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{t.title}</div>
                  <div className="ts" style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div></div>
        </div>
        <style>{`
          .trust-grid{grid-template-columns:repeat(4,1fr);gap:16px;width:100%;box-sizing:border-box}
          .trust-wrap{width:100%;overflow:hidden;box-sizing:border-box}
          @media(max-width:700px){
            .trust-grid{grid-template-columns:repeat(2,1fr)!important;gap:8px!important;width:100%!important;box-sizing:border-box!important}
            .trust-grid>div{padding:10px 12px!important;border-radius:10px!important;gap:8px!important;box-sizing:border-box;min-width:0}
            .trust-grid .ti{font-size:18px!important}
            .trust-grid .tt{font-size:10px!important}
            .trust-grid .ts{font-size:9px!important;margin-top:0!important}
          }
        `}</style>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{background:"var(--bg-2)",padding:"12px 0"}}>
        <div className="marquee-wrap"><div className="marquee-inner anim-marquee">
          {[...Array(2)].flatMap(()=>["⚡ Arduino Powered","🌐 Wi-Fi & Bluetooth","🤖 Real Robotics","🐍 Python Ready","📦 All Parts Included","🛡️ Child Safe","🇮🇳 Made in India","🎓 STEM Aligned"]).map((t,i)=>(
            <span key={i} style={{display:"inline-flex",alignItems:"center",fontSize:12,fontWeight:700,color:"var(--muted)",padding:"0 28px"}}>
              {t}<span style={{marginLeft:28,color:"rgba(255,255,255,.12)",fontSize:18}}>·</span>
            </span>
          ))}
        </div></div>
      </div>

      {/* ══ KITS ══ */}
      <section id="kits" className="section" style={{background:"var(--bg)"}}>
        <div className="section-inner">
          <FadeUp><div style={{textAlign:"center",marginBottom:52}}>
            <span className="eyebrow">Our Robotics Kits</span>
            <h2 className="s-title">Find the Kit That Sparks <span className="grad-teal">Your Curiosity</span></h2>
            <p className="s-sub" style={{margin:"0 auto"}}>5 thoughtfully curated kits for everyone — from curious 8-year-olds to passionate teen coders.</p>
          </div></FadeUp>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}} className="kits-grid">
            {KITS.map((kit,i)=>(
              <FadeUp key={kit.id} delay={i*.07} style={{height:"100%",display:"flex",flexDirection:"column"}}>
                <div className="kit-card" style={{height:"100%",display:"flex",flexDirection:"column"}}>
                  <div className="kit-card-img" style={{background:"var(--bg-2)"}}>
                    <img src={kit.image} alt={kit.name}/>
                    <div style={{position:"absolute",top:12,left:12,background:kit.accent,color:"#fff",padding:"4px 12px",borderRadius:99,fontSize:11,fontWeight:800}}>{kit.badge}</div>
                    <div style={{position:"absolute",top:12,right:12,background:"rgba(255,255,255,.88)",backdropFilter:"blur(8px)",border:"1px solid var(--border)",padding:"4px 10px",borderRadius:99,fontSize:11,fontWeight:700,color:"var(--muted)"}}>{kit.age}</div>
                  </div>
                  <div className="kit-card-body">
                    <div>
                      <h3 style={{fontSize:16,fontWeight:800,color:"var(--text)",lineHeight:1.3,marginBottom:4}}>{kit.name}</h3>
                      <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{kit.tagline}</p>
                    </div>
                    <ul className="kit-bullets" style={{listStyle:"none",display:"flex",flexDirection:"column",gap:7}}>
                      {kit.bullets.map(b=>(
                        <li key={b} style={{display:"flex",alignItems:"center",gap:7,fontSize:13,color:"var(--text-2)"}}>
                          <CheckCircle size={12} style={{color:kit.accent,flexShrink:0}}/>{b}
                        </li>
                      ))}
                    </ul>
                    <div className="kit-price-row" style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:14,borderTop:"1px solid var(--border)",marginTop:"auto"}}>
                      <div>
                        <div className="price-label" style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".07em"}}>Starting at</div>
                        <div className="price-val" style={{fontSize:23,fontWeight:900,color:"var(--text)",lineHeight:1.1}}>₹{kit.price.toLocaleString("en-IN")}</div>
                      </div>
                      <a href={`https://thinkingrobot.in/products/${kit.slug}`} target="_blank" rel="noopener noreferrer"
                        className="kit-buy-btn"
                        style={{display:"inline-flex",alignItems:"center",gap:5,background:kit.accentBg,color:kit.accent,border:`1px solid ${kit.accent}50`,padding:"9px 15px",borderRadius:99,fontSize:12,fontWeight:800,transition:"transform .15s",flexShrink:0}}
                        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                      >
                        Buy Now <ChevronRight size={13}/>
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
            <FadeUp delay={.38}>
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="kit-card"
                style={{height:"100%",minHeight:280,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center",borderStyle:"dashed",gap:10,cursor:"pointer"}}>
                <div style={{fontSize:40}}>🛒</div>
                <h3 style={{fontSize:15,fontWeight:800,color:"var(--teal)"}}>Browse All Products</h3>
                <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>Explore sensors, boards, modules & more on our full store.</p>
                <div style={{display:"flex",alignItems:"center",gap:5,color:"var(--teal)",fontWeight:700,fontSize:13}}>Visit Store <ArrowRight size={13}/></div>
              </a>
            </FadeUp>
          </div>
          <style>{`
            .kits-grid{grid-template-columns:repeat(3,1fr);width:100%;box-sizing:border-box}
            @media(max-width:900px){.kits-grid{grid-template-columns:repeat(2,1fr)!important}}
            @media(max-width:600px){
              .kits-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important;align-items:start!important;width:100%!important;box-sizing:border-box!important}
              .kit-card{overflow:hidden;min-width:0}
              .kit-card-body{padding:10px!important;gap:6px!important;min-width:0}
              .kit-card-body h3{font-size:12px!important;line-height:1.25!important;margin-bottom:0!important;word-wrap:break-word;overflow-wrap:break-word}
              .kit-card-body>div>p{font-size:10px!important;overflow:hidden;text-overflow:ellipsis;display:block!important;color:var(--muted)}
              .kit-bullets{display:flex!important;gap:4px!important;min-width:0}
              .kit-bullets li{font-size:10px!important;gap:4px!important;min-width:0;overflow:hidden}
              .kit-bullets li:nth-child(n+3){display:none!important}
              .kit-bullets li svg{width:10px!important;height:10px!important;flex-shrink:0}
              .kit-price-row{flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:6px!important;padding-top:8px!important;flex-wrap:nowrap}
              .kit-price-row .price-label{display:none!important}
              .kit-price-row .price-val{font-size:16px!important;font-weight:900!important}
              .kit-buy-btn{padding:7px 10px!important;font-size:11px!important;border-radius:8px!important;flex-shrink:0;gap:3px!important;white-space:nowrap}
              .kit-buy-btn svg{width:11px!important;height:11px!important}
            }
          `}</style>
        </div>
      </section>

      {/* ══ FEATURES (Interactive) ══ */}
      <section id="features" className="section" style={{background:"var(--bg-2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
        <div className="section-inner">
          <FadeUp><div style={{textAlign:"center",marginBottom:52}}>
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="s-title">Everything You Need to <span className="grad-orange">Start Building</span></h2>
            <p className="s-sub" style={{margin:"0 auto"}}>We&apos;ve thought of everything so you and your kids can just focus on creating.</p>
          </div></FadeUp>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}} className="feat-grid">
            {FEATURES.map((f,i)=>(
              <FadeUp key={f.title} delay={i*.06}>
                <motion.div whileHover={{y:-8,scale:1.02}} transition={{type:"spring",stiffness:300,damping:20}}
                  style={{background:"var(--bg-card)",border:`1px solid var(--border)`,borderRadius:20,padding:"28px 24px",height:"100%",position:"relative",overflow:"hidden",cursor:"default",boxSizing:"border-box",boxShadow:"var(--card-shadow)"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${f.accent}40`;(e.currentTarget as HTMLElement).style.boxShadow=`0 12px 40px ${f.accent}15`}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border)";(e.currentTarget as HTMLElement).style.boxShadow="var(--card-shadow)"}}>
                  {/* Illustration watermark from no_bg */}
                  <img src={f.illus} alt="" style={{position:"absolute",right:-8,bottom:-8,width:90,height:90,objectFit:"contain",opacity:.08,pointerEvents:"none"}}/>
                  {/* Icon */}
                  <div style={{width:52,height:52,borderRadius:15,background:`${f.accent}14`,border:`1px solid ${f.accent}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>{f.icon}</div>
                  <h3 style={{fontSize:15,fontWeight:800,color:"var(--text)",marginBottom:8}}>{f.title}</h3>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.72}}>{f.desc}</p>
                  {/* Accent bottom bar */}
                  <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${f.accent},transparent)`,opacity:.4,borderRadius:"0 0 20px 20px"}}/>
                </motion.div>
              </FadeUp>
            ))}
          </div>
          <style>{`.feat-grid{grid-template-columns:repeat(3,1fr)}@media(max-width:900px){.feat-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:540px){.feat-grid{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* ══ HOW IT WORKS — Track Style ══ */}
      <section id="how" className="section" style={{background:"var(--bg)"}}>
        <div className="section-inner">
          <FadeUp><div style={{textAlign:"center",marginBottom:56}}>
            <span className="eyebrow">Simple as 1-2-3</span>
            <h2 className="s-title">From Box to <span className="grad-teal">Robot</span> in One Afternoon</h2>
          </div></FadeUp>

          {/* Track */}
          <div style={{position:"relative",marginBottom:64}}>
            {/* Track line */}
            <div className="track-line"/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,position:"relative",zIndex:2}} className="track-grid">
              {[
                {n:"01",emoji:"📦",label:"Order & Unbox",desc:"Choose your kit, order online, and receive at your door. Everything neatly packed — no missing parts, ever.",color:"#00b4a6"},
                {n:"02",emoji:"🔧",label:"Build & Connect",desc:"Follow the visual step-by-step guide in the box. Snap, wire, assemble — no soldering for beginner kits.",color:"#ff6b35"},
                {n:"03",emoji:"💻",label:"Code & Play",desc:"Upload your first program, watch your robot move, then start customising. Block code → Python as you level up.",color:"#f5a623"},
              ].map((step,idx)=>(
                <FadeUp key={step.n} delay={idx*.12}>
                  <div style={{textAlign:"center",position:"relative"}}>
                    {/* Circle on track */}
                    <motion.div whileHover={{scale:1.1}} style={{
                      width:80,height:80,borderRadius:24,margin:"0 auto 24px",
                      background:`${step.color}14`,border:`2px solid ${step.color}50`,
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,
                      position:"relative",boxShadow:`0 0 0 8px var(--bg), 0 0 0 9px ${step.color}20`,
                      transition:"box-shadow .3s"
                    }}>
                      {step.emoji}
                      <div style={{position:"absolute",top:-12,right:-12,width:28,height:28,borderRadius:"50%",background:step.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff"}}>{step.n}</div>
                    </motion.div>
                    <h3 style={{fontSize:16,fontWeight:800,color:"var(--text)",marginBottom:10}}>{step.label}</h3>
                    <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75,maxWidth:256,margin:"0 auto"}}>{step.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
          <style>{`
            .track-line{display:block;position:absolute;top:40px;left:calc(16.67% + 8px);right:calc(16.67% + 8px);height:2px;background:linear-gradient(90deg,#00d2c6,#ff6b35,#ffd60a);opacity:.25;border-radius:99px}
            .track-grid{grid-template-columns:repeat(3,1fr)}
            @media(max-width:640px){.track-line{display:none!important}.track-grid{grid-template-columns:1fr!important;gap:40px!important}}
          `}</style>

          {/* Spotlight */}
          <FadeUp delay={.2}>
            <div style={{background:"var(--bg-card)",border:"1px solid rgba(0,180,166,.18)",borderRadius:24,padding:"36px 40px",display:"grid",gridTemplateColumns:"1fr 200px",gap:32,alignItems:"center",boxShadow:"var(--card-shadow)"}} className="spotlight-card">
              <div>
                <p style={{fontSize:11,fontWeight:800,color:"var(--teal)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>🤖 Featured — PICO Bot 4-Wheel Robot</p>
                <h3 style={{fontSize:22,fontWeight:900,color:"var(--text)",lineHeight:1.25,marginBottom:12}}>The Complete Wireless Robot Experience</h3>
                <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.75,marginBottom:18}}>Ships with acrylic chassis, 4 high-torque BO motors, ESP32 driver board, servo-mounted ultrasonic sensor & assembly guide. Control from your phone the same day.</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {["4-Wheel Drive","App Controlled","Obstacle Detection","Expandable"].map(t=>(
                    <span key={t} style={{background:"rgba(0,210,198,.08)",border:"1px solid rgba(0,210,198,.22)",color:"var(--teal)",padding:"5px 13px",borderRadius:99,fontSize:12,fontWeight:700}}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{borderRadius:16,overflow:"hidden",border:"1px solid rgba(0,210,198,.12)"}}>
                <img src="https://res.cloudinary.com/drwys1ksu/image/upload/v1770959235/3_bjhlkz.png" alt="PICO Bot side" style={{width:"100%",aspectRatio:"1/1",objectFit:"cover",display:"block"}}/>
              </div>
            </div>
          </FadeUp>
          <style>{`.spotlight-card{grid-template-columns:1fr 200px}@media(max-width:640px){.spotlight-card{grid-template-columns:1fr!important;padding:24px!important}}`}</style>
        </div>
      </section>

      {/* ══ REVIEWS — Swipeable Carousel ══ */}
      <section id="reviews" className="section" style={{background:"var(--bg-2)",borderTop:"1px solid var(--border)"}}>
        <div className="section-inner">
          <FadeUp><div style={{textAlign:"center",marginBottom:48}}>
            <span className="eyebrow">Reviews</span>
            <h2 className="s-title">What Parents & Teachers <span className="grad-teal">Are Saying</span></h2>
            <p className="s-sub" style={{margin:"0 auto"}}>Real feedback from real families across India 🇮🇳</p>
          </div></FadeUp>

          {/* Desktop grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:16}} className="reviews-desktop">
            {REVIEWS.map((r,i)=>(
              <FadeUp key={r.name} delay={i*.07}>
                <div className="review-card" style={{height:"100%"}}>
                  <div style={{display:"flex",gap:3,marginBottom:2}}>{Array.from({length:r.rating}).map((_,j)=><Star key={j} size={13} style={{fill:"#ffd60a",color:"#ffd60a"}}/>)}</div>
                  <p style={{fontSize:13,color:"var(--text-2)",lineHeight:1.78,flex:1}}>&ldquo;{r.text}&rdquo;</p>
                  <div style={{display:"flex",alignItems:"center",gap:11,paddingTop:14,borderTop:"1px solid var(--border)"}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:`${r.accent}18`,border:`2px solid ${r.accent}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:r.accent,flexShrink:0}}>{r.initial}</div>
                    <div><div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{r.name}</div><div style={{fontSize:11,color:"var(--muted)"}}>{r.role}</div></div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="reviews-mobile" style={{display:"none"}}>
            <div style={{overflow:"hidden",borderRadius:20}}>
              <motion.div
                key={reviewIdx}
                initial={{opacity:0,x:60}}
                animate={{opacity:1,x:0}}
                exit={{opacity:0,x:-60}}
                transition={{duration:.3}}
                drag="x"
                dragConstraints={{left:0,right:0}}
                onDragStart={(_,i)=>{dragStartX.current=(i as {point:{x:number}}).point.x}}
                onDragEnd={(_,info)=>{if(info.offset.x<-40)nextReview();else if(info.offset.x>40)prevReview()}}
                style={{cursor:"grab"}}
              >
                {(() => {
                  const r = REVIEWS[reviewIdx];
                  return (
                    <div className="review-card" style={{padding:24}}>
                      <div style={{display:"flex",gap:3,marginBottom:10}}>{Array.from({length:r.rating}).map((_,j)=><Star key={j} size={14} style={{fill:"#ffd60a",color:"#ffd60a"}}/>)}</div>
                      <p style={{fontSize:14,color:"var(--text-2)",lineHeight:1.78,marginBottom:20}}>&ldquo;{r.text}&rdquo;</p>
                      <div style={{display:"flex",alignItems:"center",gap:12,paddingTop:16,borderTop:"1px solid var(--border)"}}>
                        <div style={{width:42,height:42,borderRadius:"50%",background:`${r.accent}18`,border:`2px solid ${r.accent}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:r.accent}}>{r.initial}</div>
                        <div><div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{r.name}</div><div style={{fontSize:12,color:"var(--muted)"}}>{r.role}</div></div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </div>
            {/* Controls */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginTop:20}}>
              <button onClick={prevReview} disabled={reviewIdx===0} style={{width:38,height:38,borderRadius:"50%",border:"1px solid var(--border)",background:"var(--bg-card)",color:reviewIdx===0?"var(--muted)":"var(--text)",cursor:reviewIdx===0?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",boxShadow:"var(--card-shadow)"}}><ChevronLeft size={16}/></button>
              <div style={{display:"flex",gap:6}}>
                {REVIEWS.map((_,i)=><div key={i} onClick={()=>setReviewIdx(i)} style={{width:i===reviewIdx?20:6,height:6,borderRadius:99,background:i===reviewIdx?"var(--teal)":"rgba(0,0,0,.10)",transition:"all .3s",cursor:"pointer"}}/>)}
              </div>
              <button onClick={nextReview} disabled={reviewIdx===REVIEWS.length-1} style={{width:38,height:38,borderRadius:"50%",border:"1px solid var(--border)",background:"var(--bg-card)",color:reviewIdx===REVIEWS.length-1?"var(--muted)":"var(--text)",cursor:reviewIdx===REVIEWS.length-1?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",boxShadow:"var(--card-shadow)"}}><ChevronRight size={16}/></button>
            </div>
          </div>

          <style>{`
            .reviews-desktop{grid-template-columns:repeat(3,1fr)}
            @media(max-width:900px){.reviews-desktop{grid-template-columns:repeat(2,1fr)!important}}
            @media(max-width:640px){.reviews-desktop{display:none!important}.reviews-mobile{display:block!important}}
          `}</style>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="section" style={{background:"linear-gradient(180deg, var(--bg-2) 0%, var(--teal-light) 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 110%,rgba(0,180,166,.08),transparent 70%)",pointerEvents:"none"}}/>
        {/* Child-friendly illustration on side */}
        <img src={ILLUS.kidBoy} alt="" className="cta-illus" style={{position:"absolute",bottom:0,left:"3%",width:180,opacity:.15,pointerEvents:"none"}}/>
        <img src={ILLUS.kidGirl} alt="" className="cta-illus" style={{position:"absolute",bottom:0,right:"3%",width:180,opacity:.15,pointerEvents:"none"}}/>
        <div className="section-inner" style={{position:"relative",zIndex:1}}>
          <FadeUp><div style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>
            <motion.div animate={{rotate:[0,12,-10,0],scale:[1,1.1,1]}} transition={{repeat:Infinity,duration:4.5,ease:"easeInOut"}} style={{fontSize:56,marginBottom:20,display:"inline-block"}}>🚀</motion.div>
            <h2 style={{fontSize:"clamp(26px,4.5vw,48px)",fontWeight:900,letterSpacing:"-.03em",lineHeight:1.12,color:"var(--text)",marginBottom:14}}>
              Ready to Build Your<br/><span className="grad-teal">First Robot?</span>
            </h2>
            <p style={{fontSize:16,color:"var(--muted)",lineHeight:1.7,marginBottom:32}}>
              Join 500+ builders across India. Kits starting at just ₹899.<br/>Free shipping · 30-day returns · Guaranteed quality.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
              <a href="#kits" className="btn btn-primary" style={{padding:"14px 28px",fontSize:15}}><ShoppingCart size={17}/> Shop All Kits</a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn" style={{background:"#25D366",color:"#fff",padding:"14px 28px",fontSize:15}}><MessageCircle size={17}/> Chat on WhatsApp</a>
            </div>
          </div></FadeUp>
        </div>
      </section>
      <style>{`@media(max-width:768px){.cta-illus{display:none!important}}`}</style>

      {/* ══ FOOTER ══ */}
      <footer style={{background:"var(--bg-3)",borderTop:"1px solid var(--border)",paddingTop:52,paddingBottom:28}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr",gap:36,marginBottom:44}} className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <Image src="/logo.png" alt="PICO BOT" width={34} height={34} style={{borderRadius:8,display:"block"}}/>
                <span style={{fontSize:15,fontWeight:900,color:"var(--text)"}}>PICO BOT</span>
              </div>
              <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.72,marginBottom:16}}>India&apos;s favourite robotics & electronics kits for young builders. Powered by Thinking Robot.</p>
              <div style={{display:"flex",gap:8}}>
                {[
                  {href:IG, label:"Instagram", color:"#E1306C", icon:"📸"},
                  {href:FB, label:"Facebook",  color:"#1877F2", icon:"👤"},
                  {href:TW, label:"X",          color:"#333", icon:"✖"},
                  {href:WA, label:"WhatsApp",  color:"#25D366", icon:"💬"},
                ].map(s=>(
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{width:34,height:34,borderRadius:9,background:"var(--bg-card)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:s.color,transition:"border-color .15s,transform .15s",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color+"60";e.currentTarget.style.transform="scale(1.1)"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform=""}}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Kits */}
            <div>
              <div style={{fontSize:10,fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".09em",marginBottom:14}}>Kits</div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
                {KITS.map(k=>(
                  <li key={k.id}><a href={`https://thinkingrobot.in/products/${k.slug}`} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"var(--muted)",transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--text)"} onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}>{k.name}</a></li>
                ))}
              </ul>
            </div>

            {/* Learn */}
            <div>
              <div style={{fontSize:10,fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".09em",marginBottom:14}}>Learn</div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
                {[["Getting Started",DOCS],["Arduino Tutorials",DOCS],["Python Guides",DOCS],["Project Ideas",DOCS],["Community",WA]].map(([l,h])=>(
                  <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"var(--muted)",transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--text)"} onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}>{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div style={{fontSize:10,fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".09em",marginBottom:14}}>Company</div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
                {[["Our Store",SITE],["WhatsApp Us",WA],["Instagram",IG],["Facebook",FB],["Tutorials",DOCS]].map(([l,h])=>(
                  <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"var(--muted)",transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--text)"} onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}>{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <style>{`.footer-grid{grid-template-columns:1.6fr 1fr 1fr 1fr}@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.footer-grid{grid-template-columns:1fr!important}}`}</style>

          <div style={{paddingTop:20,borderTop:"1px solid var(--border)",display:"flex",flexWrap:"wrap",gap:10,alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:12,color:"var(--muted)"}}>© 2026 Thinking Robot · <a href={SITE} target="_blank" rel="noopener noreferrer" style={{color:"var(--teal)"}}>thinkingrobot.in</a> 🇮🇳</span>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn" style={{background:"#25D366",color:"#fff",fontSize:12,padding:"7px 14px"}}><MessageCircle size={12}/> Need help? WhatsApp us</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ════════════════════════════════════════════════════════
   تعديل SCRIPT.JS للاتصال بـ LOCAL API
   ════════════════════════════════════════════════════════ */

// استبدل دالة fetchXAU و fetchFX بهذه:

const API_URL = 'http://localhost:3000'; // اربط بـ Server المحلي

async function fetchFX(){
  try{
    const r=await fetch('https://open.er-api.com/v6/latest/USD');
    const d=await r.json();const rates=d.rates;
    S.usdEgp=rates.EGP||S.usdEgp||50;
    S.fx.USD=S.usdEgp;
    S.fx.EUR=rates.EGP/rates.EUR;
    S.fx.GBP=rates.EGP/rates.GBP;
    S.fx.SAR=rates.EGP/rates.SAR;
    S.fx.AED=rates.EGP/rates.AED;
  }catch(e){if(S.xauEgp&&S.xauUsd)S.usdEgp=S.xauEgp/S.xauUsd;}
}

async function fetchXAU(){
  try{
    // محاولة الأولى: الاتصال بـ Local API
    const r=await fetch(`${API_URL}/api/prices/detailed`);
    if(!r.ok) throw new Error('Local API failed');
    
    const d=await r.json();
    if(!d.success) throw new Error(d.error);
    
    const data=d.data;
    const price=Number(data.xauUsd);
    const priceEgp=Number(data.xauEgp);
    
    if(!price||!isFinite(price)) throw new Error('invalid price');
    
    S.prevXauUsd=S.xauUsd||price*.998;
    S.prevXauEgp=S.xauEgp||priceEgp*.998;
    S.xauUsd=price;
    S.xauEgp=priceEgp;
    S.usdEgp=data.usdEgp||50;
    S.lastFetch=new Date();
    hideError();
    return true;
  }catch(e){
    console.warn('Local API failed, trying fallback:', e.message);
    // محاولة البديل: gold-api.com
    try{
      const r=await fetch('https://api.gold-api.com/price/XAU');
      if(!r.ok)throw new Error('HTTP '+r.status);
      const d=await r.json();
      const price=Number(d.price);
      if(!price||!isFinite(price))throw new Error('invalid');
      S.prevXauUsd=S.xauUsd||price*.998;
      S.prevXauEgp=S.xauEgp||price*(S.usdEgp||50)*.998;
      S.xauUsd=price;
      if(S.usdEgp)S.xauEgp=price*S.usdEgp;
      S.lastFetch=new Date();
      hideError();
      return true;
    }catch(fallbackError){
      showError('خطأ في تحميل سعر الذهب: '+fallbackError.message);
      return false;
    }
  }
}

async function fetchAll(){await fetchFX();await fetchXAU();renderAll();}

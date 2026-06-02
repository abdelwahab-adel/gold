/*
  🚀 QUICK START GUIDE
  دليل البدء السريع
*/

// ============================================
// 1. تثبيت الـ Dependencies
// ============================================

/*
في Terminal/Command Prompt:

cd Egypt-Golden-Platform
npm install

هذا سيثبت:
✓ express — الـ Web Server
✓ cors — للـ Cross-origin requests
✓ cheerio — لـ Web Scraping
✓ axios — لـ HTTP requests
*/


// ============================================
// 2. تشغيل الـ Backend API
// ============================================

/*
في Terminal:

npm start

أو للـ Development (مع reload تلقائي):

npm run dev

سيطبع:
╔════════════════════════════════════════╗
║   🥇 GOLD SCRAPER API RUNNING 🥇      ║
╠════════════════════════════════════════╣
║ Server:  http://localhost:3000           ║
║ Health:  http://localhost:3000/health    ║
║ API:     http://localhost:3000/api/prices║
╚════════════════════════════════════════╝
*/


// ============================================
// 3. اختبار الـ API
// ============================================

/*
افتح المتصفح وجرب:

http://localhost:3000/health
→ Response: { "status": "OK", "timestamp": "..." }

http://localhost:3000/api/prices
→ Response: { "success": true, "data": { ... } }

http://localhost:3000/api/prices/detailed
→ Response: { "success": true, "data": { xauUsd, xauEgp, usdEgp, ... } }
*/


// ============================================
// 4. تشغيل الموقع الفرونت إند
// ============================================

/*
الطريقة الأولى: Live Server (VSCode)
───────────────────────────────────
1. اضغط Right-click على index.html
2. اختر "Open with Live Server"
3. سيفتح على http://localhost:5500

الطريقة الثانية: Python
───────────────────────
python -m http.server 5500

الطريقة الثالثة: npx
──────────────────
npx http-server -p 5500
*/


// ============================================
// 5. التحقق من العمل
// ============================================

/*
✅ الخطوات للتحقق:

1. شغّل Backend:
   npm start
   
2. شغّل Frontend (في tab جديد):
   Live Server على port 5500
   
3. افتح http://localhost:5500

4. افتح Developer Console (F12)

5. شوف الـ Logs:
   - "✅ Prices fetched from local API" ← نجاح!
   - "⚠️ Local API failed" ← fallback يشتغل

6. تحقق من الأسعار على الموقع
*/


// ============================================
// 6. المشاكل الشائعة والحلول
// ============================================

/*
❌ CORS Error?
─────────────
✅ الحل: تأكد من:
   - Server بتشتغل على 3000
   - CORS مفعل في server.js

❌ "Cannot connect to localhost:3000"?
──────────────────────────────────────
✅ الحل: 
   npm install
   npm start

❌ Port 3000 مشغول؟
───────────────────
✅ الحل: عدّل PORT في server.js:
   const PORT = process.env.PORT || 5000;

❌ API ما بترجع أسعار من gold-era.eg؟
──────────────────────────────────────
✅ الحل: 
   - موقع gold-era.eg قد يكون غير متاح
   - API بينتقل تلقائياً لـ fallback (gold-api.com)
   - شوف console للأخطاء التفصيلية
*/


console.log('%c🥇 Egypt Golden Platform - Ready! 🥇', 'color: #C9922A; font-size: 16px; font-weight: bold;');
console.log('%cابدأ بـ: npm install && npm start', 'color: #27AE60; font-size: 14px;');
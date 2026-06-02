# 🥇 Egypt Golden Platform - Setup Guide

## ✅ تثبيت وتشغيل المشروع

### 1️⃣ **تحميل الـ Dependencies**

```bash
npm install
```

هذا سيحمل:
- `express` — لـ Web Server
- `cors` — لـ Cross-origin requests
- `cheerio` — لـ Web Scraping
- `nodemon` — لـ Development (اختياري)

---

### 2️⃣ **تشغيل الـ Backend (Local API)**

```bash
npm start
```

أو للـ Development مع التحديث التلقائي:
```bash
npm run dev
```

ستشوف:
```
╔════════════════════════════════════════╗
║   🥇 GOLD SCRAPER API RUNNING 🥇      ║
╠════════════════════════════════════════╣
║ Server:  http://localhost:3000           ║
║ Health:  http://localhost:3000/health    ║
║ API:     http://localhost:3000/api/prices║
╚════════════════════════════════════════╝
```

---

### 3️⃣ **تعديل script.js للاتصال بـ API**

افتح `script.js` واستبدل دالة `fetchXAU()` بالكود من `INTEGRATION.md`

---

### 4️⃣ **اختبر الـ API**

افتح المتصفح واذهب إلى:
- http://localhost:3000/health
- http://localhost:3000/api/prices

يجب تشوف:
```json
{
  "success": true,
  "data": {
    "xauUsd": 2450.5,
    "xauEgp": 120500,
    "source": "gold-era.eg",
    "timestamp": "2026-06-02T17:30:00.000Z"
  }
}
```

---

## 🚀 **الـ Deployment على السحابة**

### **Option 1: Vercel**

```bash
npm install -g vercel
vercel
```

### **Option 2: Railway**

1. اذهب لـ https://railway.app
2. اربط مع GitHub repo
3. اضغط Deploy

### **Option 3: Heroku**

```bash
heroku login
heroku create egypt-golden-api
git push heroku main
```

---

## 📁 **هيكل المشروع**

```
egypt-golden-platform/
├── server.js              # Express Server
├── api/
│   └── scraper.js         # Web Scraping Logic
├── script.js              # Frontend (معدل)
├── index.html
├── style.css
├── package.json
├── .gitignore
└── README.md
```

---

## 🔧 **Troubleshooting**

### ❌ CORS Error؟
تأكد من:
1. الـ Server يشتغل على 3000
2. في `server.js`، CORS مفعل صح

### ❌ API ما بتجيب الأسعار من gold-era.eg؟
- قد يكون موقع gold-era.eg غير متاح
- استخدم fallback (gold-api.com) تلقائياً

### ❌ Port 3000 مشغول؟
غير الـ PORT في `server.js`:
```javascript
const PORT = process.env.PORT || 5000; // استخدم 5000 بدل 3000
```

---

✅ **خلاص! موقعك الآن يجيب الأسعار من gold-era.eg مع fallback آمن!**
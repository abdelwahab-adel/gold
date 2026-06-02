# 🥇 Egypt Golden Platform

منصة متخصصة لتتبع أسعار الذهب والفضة والعملات في السوق المصري بالأسعار الحقيقية من موقع gold-era.eg

## ✨ الميزات

- 📡 **أسعار حية** من gold-era.eg مع fallback آمن
- 🔄 **تحديث تلقائي** كل 60 ثانية
- 💼 **إدارة محفظة** ذهبية
- 🔔 **تنبيهات سعرية** مخصصة
- 📊 **رسوم بيانية** تفصيلية
- 🧠 **تحليل ذكي** بـ AI
- 💱 **محوّل عملات** فوري
- ⭐ **قائمة مفضلة** مخصصة

## 🚀 البدء السريع

### المتطلبات
- Node.js 16+
- npm 8+

### التثبيت

```bash
git clone https://github.com/abdelwahab-adel/Egypt-Golden-Platform.git
cd Egypt-Golden-Platform
npm install
```

### التشغيل المحلي

```bash
npm start
```

سيشتغل الـ API على `http://localhost:3000`
والموقع على `http://localhost:5500` (Live Server)

## 📋 الملفات المهمة

```
├── server.js              # Express Server API
├── api/scraper.js         # Web Scraper من gold-era.eg
├── script.js              # جافاسكريبت Frontend (محدث)
├── index.html             # الصفحة الرئيسية
├── style.css              # التصميم
├── package.json           # Dependencies
├── SETUP_GUIDE.md         # دليل التثبيت المفصل
└── vercel.json            # إعدادات النشر على Vercel
```

## ☁️ النشر على السحابة

### Vercel (موصى به)
```bash
npm install -g vercel
vercel
```

### Railway
- اذهب https://railway.app
- اربط مع GitHub
- Deploy

### Heroku
```bash
heroku create egypt-golden-api
git push heroku main
```

## 🔧 التكوين

في `script.js`، عدّل `API_URL`:

```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000'
  : 'https://your-deployed-api.vercel.app';
```

## 📚 API Endpoints

```
GET /health                 # فحص حالة الـ API
GET /api/prices             # أسعار الذهب الحالية
GET /api/prices/detailed    # أسعار مع التفاصيل (XAU/USD, XAU/EGP, USD/EGP)
```

### مثال الـ Response:
```json
{
  "success": true,
  "data": {
    "xauUsd": 2450.50,
    "xauEgp": 120500.00,
    "usdEgp": 49.15,
    "source": "gold-era.eg",
    "timestamp": "2026-06-02T17:30:00.000Z"
  }
}
```

## 🛠️ Troubleshooting

| المشكلة | الحل |
|--------|------|
| CORS Error | تأكد من تفعيل CORS في `server.js` |
| Port مشغول | استخدم port مختلف في `server.js` |
| API ما بتجيب أسعار | استخدم Fallback (gold-api.com) تلقائياً |

## 📄 الرخصة

MIT License - يمكنك استخدام هذا المشروع بحرية

## 👨‍💻 المطور

[abdelwahab-adel](https://github.com/abdelwahab-adel)

---

**آخر تحديث:** يونيو 2026 ✨
/* ════════════════════════════════════════════════════════
   GOLD-ERA.EG WEB SCRAPER API
   Extracts real gold prices from gold-era.eg
   ════════════════════════════════════════════════════════ */

const https = require('https');
const cheerio = require('cheerio');

/**
 * Scrape gold prices from gold-era.eg
 * @returns {Promise<Object>} { xauUsd, xauEgp, timestamp }
 */
async function scrapeGoldPrices() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'gold-era.eg',
      path: '/ar/سعر-الذهب/',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const $ = cheerio.load(data);
          
          // محاولة استخراج الأسعار من HTML
          // الفئات المتوقعة على الموقع
          const priceElements = $('[class*="price"], [data-price], .سعر, [class*="rate"]');
          
          let xauUsd = null;
          let xauEgp = null;
          
          // البحث عن أسعار الذهب
          priceElements.each((i, el) => {
            const text = $(el).text().trim();
            const number = parseFloat(text.match(/[\d.]+/)?.[0]) || null;
            
            if (text.includes('USD') || text.includes('$')) {
              xauUsd = number || xauUsd;
            }
            if (text.includes('EGP') || text.includes('ج') || text.includes('جنيه')) {
              xauEgp = number || xauEgp;
            }
          });

          // إذا لم نجد، نحاول طريقة بديلة
          if (!xauUsd || !xauEgp) {
            const allText = $.text();
            const usdMatch = allText.match(/(\d{4,5})\s*(?:USD|\$)/);
            const egpMatch = allText.match(/(\d{4,5})\s*(?:EGP|ج|جنيه)/);
            
            if (usdMatch) xauUsd = parseFloat(usdMatch[1]);
            if (egpMatch) xauEgp = parseFloat(egpMatch[1]);
          }

          // إذا فشل الـ scraping، نعود لـ API الاحتياطي
          if (!xauUsd || !xauEgp) {
            throw new Error('Could not extract prices from HTML');
          }

          resolve({
            xauUsd,
            xauEgp,
            source: 'gold-era.eg',
            timestamp: new Date().toISOString(),
            success: true
          });
        } catch (error) {
          reject(new Error('Scraping failed: ' + error.message));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fallback: استخدام gold-api.com كبديل آمن
 */
async function fetchGoldAPiFallback() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.gold-api.com',
      path: '/price/XAU',
      method: 'GET'
    };

    https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            xauUsd: parseFloat(json.price),
            source: 'gold-api.com-fallback',
            timestamp: new Date().toISOString(),
            success: true
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * احصل على أسعار الذهب (مع محاولة Scraping أولاً، ثم fallback)
 */
async function getGoldPrices() {
  try {
    // محاولة أولى: scraping من gold-era.eg
    return await scrapeGoldPrices();
  } catch (error) {
    console.warn('Scraping failed, using fallback:', error.message);
    try {
      // البديل: استخدام gold-api.com
      return await fetchGoldAPiFallback();
    } catch (fallbackError) {
      console.error('Both methods failed:', fallbackError);
      return {
        error: 'Could not fetch gold prices',
        success: false
      };
    }
  }
}

module.exports = { getGoldPrices, scrapeGoldPrices, fetchGoldAPiFallback };

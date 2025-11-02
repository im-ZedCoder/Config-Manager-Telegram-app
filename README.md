# 📱 CODM Config Manager - Telegram Web App

## راهنمای نصب و راه‌اندازی

### روش 1: استفاده از GitHub Pages (رایگان) ⭐

1. **ثبت نام در GitHub**
   - ساخت حساب کاربری در GitHub.com
   - ایجاد Repository عمومی

2. **آپلود فایل‌ها**
   ```bash
   # آپلود پوشه TelegramApp
   git clone https://github.com/yourusername/codm-config.git
   cd codm-config
   
   # کپی فایل‌های TelegramApp
   cp -r TelegramApp/* .
   
   # Commit و Push
   git add .
   git commit -m "Add Telegram Web App"
   git push origin main
   ```

3. **فعال‌سازی GitHub Pages**
   - رفتن به Settings → Pages
   - Branch را `main` و فولدر را `/root` انتخاب کنید
   - Save کردن
   - URL شما: `https://yourusername.github.io/codm-config/`

### روش 2: استفاده از Netlify (رایگان)

1. **ثبت نام در Netlify**
   - رفتن به netlify.com
   - ثبت‌نام با GitHub

2. **Deploy**
   - کلیک "New Site from Git"
   - انتخاب Repository
   - Build command: خالی
   - Publish directory: `TelegramApp`
   - Deploy

3. **URL شما**
   - Netlify URL ایجاد می‌شود
   - مثل: `https://codm-config.netlify.app`

### روش 3: استفاده از Vercel (رایگان)

1. **ثبت نام در Vercel**
   - رفتن به vercel.com
   - ورود با GitHub

2. **Import Project**
   - کلیک "Import Project"
   - انتخاب Repository
   - Framework Preset: Other
   - Deploy

### روش 4: Hosting شخصی

**برای استفاده از سرور شخصی:**

```nginx
# Nginx Config
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/codm-config/TelegramApp;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 🤖 راه‌اندازی بات تلگرام

### 1. ساخت بات

1. **دریافت توکن**
   - گفتگو با @BotFather در تلگرام
   - ارسال `/newbot`
   - انتخاب نام
   - دریافت توکن

2. **فعال‌سازی Web App**
   ```
   /newapp
   select your bot
   ```

### 2. اتصال Web App به بات

```python
# در bot.py جایگزین کنید:
BOT_TOKEN = 'YOUR_BOT_TOKEN_FROM_BOTFATHER'
WEB_APP_URL = 'https://yourdomain.com/index.html'
```

### 3. اجرای بات

```bash
# نصب کتابخانه
pip install pyTelegramBotAPI

# اجرای بات
python bot.py
```

### 4. تنظیم Web App در بات

```
/setmenubutton
select your bot
Button text: 🎮 Config Manager
Web App URL: https://yourdomain.com/index.html
```

## 📝 ساختار فایل‌ها

```
TelegramApp/
├── index.html          # فایل اصلی Web App
├── app.js              # JavaScript کد
└── README.md           # راهنمای نصب

TelegramBot/
├── bot.py              # بات Python
└── README.md           # راهنمای بات

Config/
├── graphics_settings.cfg
├── hyper_performance.cfg
└── ...                 # فایل‌های کانفیگ
```

## ⚙️ تست محلی

### مرورگر
```bash
cd TelegramApp
python -m http.server 8000
# باز کردن: http://localhost:8000
```

### شبیه‌ساز Web App
```bash
# استفاده از Telegram Desktop
# Apps → Test Web App
# اتصال به localhost:8000
```

## 🔒 تنظیمات امنیتی

### HTTPS ضروری است!
- GitHub Pages: ✅ خودکار
- Netlify: ✅ خودکار
- Vercel: ✅ خودکار
- سرور شخصی: باید SSL فعال کنید

### CORS
اگر فایل‌ها را از CDN لود می‌کنید، نیازی به تنظیمات CORS نیست.

## 📱 تست روی موبایل

1. **Deploy کردن**
2. **باز کردن بات در Telegram**
3. **کلیک روی Web App Button**
4. **تست تنظیمات**
5. **دانلود کانفیگ**

## 🛠️ تنظیمات پیشرفته

### اضافه کردن Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>

<!-- Telegram Analytics -->
<script>
  tg.enableClosingConfirmation();
  tg.BackButton.show();
  tg.BackButton.onClick(() => {
    window.history.back();
  });
</script>
```

### ذخیره‌سازی پیشرفته

```javascript
// استفاده از Telegram Cloud Storage
tg.CloudStorage.setItem('config', JSON.stringify(config));
const saved = tg.CloudStorage.getItem('config');
```

## 🐛 عیب‌یابی

### Web App باز نمی‌شود
- ✅ بررسی HTTPS
- ✅ بررسی URL
- ✅ بررسی Bot Token
- ✅ بررسی فایل‌های HTML/JS

### بات کار نمی‌کند
- ✅ بررسی BOT_TOKEN
- ✅ نصب pyTelegramBotAPI
- ✅ بررسی Firewall
- ✅ بررسی لاگ‌ها

### دانلود کار نمی‌کند
- ✅ بررسی JavaScript
- ✅ بررسی Console (F12)
- ✅ بررسی Browser permissions

## 📞 پشتیبانی

**Creator:** Nulltra Coder  
**Telegram:** [@im_nulltra](https://t.me/im_nulltra)

## 📄 License

This project is for personal use only. Use at your own risk.

---

**Good luck! Game On! 🎮🔥**


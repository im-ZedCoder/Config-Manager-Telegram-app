# 🚀 Quick Start - Telegram Web App

## روش سریع (5 دقیقه!)

### گام 1: Hosting Web App

**انتخاب 1: GitHub Pages (پیشنهادی)**

1. برید https://github.com/new
2. نام Repository: `codm-config`
3. Public انتخاب کنید
4. Create repository

5. آپلود فایل‌ها:
```bash
cd TelegramApp
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/codm-config.git
git push -u origin main
```

6. فعال‌سازی Pages:
   - Settings → Pages
   - Source: main
   - Save
   - URL شما: `https://USERNAME.github.io/codm-config/`

**انتخاب 2: Netlify (خیلی سریع!)**

1. برید https://app.netlify.com
2. Sign up with GitHub
3. New Site from Git
4. انتخاب Repository
5. Build command: خالی
6. Publish: `TelegramApp`
7. Deploy!
8. URL شما: `https://SITE-NAME.netlify.app`

### گام 2: ساخت بات

1. در Telegram:
   - گفتگو با @BotFather
   - `/newbot`
   - نام: CODM Config Manager
   - Username: codm_config_manager_bot
   - دریافت Token

2. فعال‌سازی Web App:
   ```
   /setmenubutton
   انتخاب بات شما
   Button text: 🎮 Config
   Web App URL: [URL از گام 1]
   ```

**تمام!** 🎉

حالا بات شما آماده است!

### تست

1. باز کردن بات در Telegram
2. کلیک /start
3. کلیک روی دکمه Web App یا "🎮 Config"
4. Web App باز می‌شود
5. تست تنظیمات
6. دانلود کانفیگ

## 🐛 عیب‌یابی

**Web App باز نمی‌شود:**
- ✅ بررسی HTTPS
- ✅ بررسی URL صحیح
- ✅ بررسی خطا در Console (F12)

**زمان بارگذاری زیاد:**
- ✅ استفاده از CDN
- ✅ فشرده‌سازی فایل‌ها
- ✅ Cache فعال‌سازی

## 📞 کمک

**Nulltra Coder**  
**@im_nulltra**

---

**موفق باشید! 🎮**


# Rabexa AI Website

موقع ثابت احترافي مبني باستخدام HTML وCSS وJavaScript فقط.

## التشغيل محليًا

يفضل تشغيله عبر خادم محلي بدل فتح الملف مباشرة:

```bash
python3 -m http.server 8080
```

ثم افتح:

```text
http://localhost:8080
```

## ملاحظات الأمان

- تم تضمين Content Security Policy تمنع تحميل سكربتات ومصادر خارجية غير مصرح بها.
- لا توجد مكتبات خارجية أو أكواد تتبع.
- النموذج لا يرسل بيانات حاليًا. عند ربطه بخادم، استخدم HTTPS، تحققًا من جهة الخادم، حماية CSRF، تحديد معدل الطلبات، وتنقية المدخلات.
- أضف رؤوس الأمان من إعدادات الاستضافة: Strict-Transport-Security وX-Content-Type-Options وPermissions-Policy.
- لا تضع مفاتيح API أو كلمات مرور داخل JavaScript في المتصفح.

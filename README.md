# 📚 Sage Journals - The Papery • Flexi Premium Dotted (Journal of Management)

แอปพลิเคชันระบบบริหารจัดการวารสารวิชาการ (Journals Management System) ออกแบบอินเทอร์เฟซตามธีม **Sage Journals** ร่วมกับแบรนด์ **The Papery - Flexi Premium Dotted Edition** รองรับการทำงานแบบ Full Stack (CRUD), Search, Filter และเชื่อมต่อกับฐานข้อมูล PostgreSQL ออนไลน์แบบเรียลไทม์

---

## 🌐 1. Production URLs & Endpoints Testing

### URLs หลักของระบบ
* **Frontend Production URL (Vercel):**  
  `https://654259019-7153403-final-journals.vercel.app`
* **Backend API Base URL (Render):**  
  `https://six54259019-7153403-final-journals.onrender.com/api/journals`

### ตัวอย่าง RESTful API Endpoints ที่ทดสอบได้จริง
* **[GET] ดึงข้อมูลวารสารทั้งหมด:**  
  `https://six54259019-7153403-final-journals.onrender.com/api/journals`
* **[GET] ดึงข้อมูลตาม ID:**  
  `https://six54259019-7153403-final-journals.onrender.com/api/journals/1`
* **[GET] ค้นหาและกรองข้อมูล (Query Parameters):**  
  `https://six54259019-7153403-final-journals.onrender.com/api/journals?title=Management&category=วิชาการ`
* **[POST] เพิ่มวารสารใหม่:** `POST /api/journals`
* **[PUT] แก้ไขวารสาร:** `PUT /api/journals/:id`
* **[DELETE] ลบวารสาร:** `DELETE /api/journals/:id`

---

## 📸 2. หลักฐานการ Deploy และการทำงาน (Evidence & Screenshots)


* **สถานะการ Deploy สำเร็จ:**
  * **Frontend (Vercel):** Deployment Status: `Ready` (จุดสีเขียว)
  * **Backend (Render):** Web Service & Database Status: `Live`
* **หลักฐานการทำงาน CRUD บน URL จริง:**
  * ภาพ/วิดีโอแสดงการกดเพิ่ม (Create), ดึงมาแสดง (Read), แก้ไขข้อมูล (Update), และลบรายการ (Delete) ผ่านหน้าเว็บ Vercel

---

## ⚙️ 3. Deployment Configuration & Environment Variables

### 3.1 Frontend Configuration (Vercel)
* **Root Directory:** `./frontend`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Environment Variables:**
  * `VITE_API_BASE_URL`: `https://six54259019-7153403-final-journals.onrender.com/api`

### 3.2 Backend Configuration (Render)
* **Root Directory:** `./backend`
* **Build Command:** `npm install`
* **Start Command:** `node server.js`
* **Environment Variables (ปกปิดค่าลับแล้ว):**
  * `NODE_ENV`: `production`
  * `PORT`: `10000`
  * `DATABASE_URL`: `postgres://<USERNAME>:<PASSWORD>@<RENDER_HOST>/<DATABASE_NAME>?ssl=true`
  * `CORS_ORIGIN`: `https://654259019-7153403-final-journals.vercel.app`

---

## 💾 4. ผลการทดสอบความคงอยู่ของข้อมูล (Data Persistence Test)

* **ผลการทดสอบ:** ได้ทำการทดสอบสั่ง **Restart Service** บน Render และสั่ง **Manual Redeploy** ทั้ง Frontend และ Backend
* **สรุปผลลัพธ์:** ข้อมูลวารสารทั้งหมดที่ถูกบันทึกไว้ยังคงอยู่อย่างสมบูรณ์ใน Render PostgreSQL Database ไม่สูญหายหลังการรีสตาร์ท

---

## 💻 5. วิธีการติดตั้งและรันบน Local Environment

### Backend Setup
```bash
cd backend
npm install
npm start

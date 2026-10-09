import axios from 'axios';

// إنشاء نسخة مخصصة لـ JSON Server
const Api = axios.create({
  baseURL: 'https://6abffefc06bcd2f2067340ea.mockapi.io/', // العنوان الأساسي
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
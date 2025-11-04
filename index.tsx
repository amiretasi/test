
import React, { useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// From types.ts
export interface Book {
    id: number | string;
    title: string;
    author: string;
    originalPubDate: string;
    readYear: string;
    genre: string;
    translator: string;
    nationality: string;
}

export interface ProcessedBook extends Book {
    year: string;
    month: string | null;
    day: string | null;
    full: string;
}

export interface KpiData {
    totalBooks: number;
    totalAuthors: number;
    totalReads: number;
    currentYearBooks: number;
}


// From constants.ts
export const booksData: Book[] = [
    // شریعتی
    { id: 1, title: 'هبوط', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1381', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 2, title: 'کویر', author: 'علی شریعتی', originalPubDate: '۱۳۴۸', readYear: '1380', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 3, title: 'اسلام‌شناسی (درس‌های ارشاد)', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1380', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 4, title: 'فاطمه، فاطمه است', author: 'علی شریعتی', originalPubDate: '۱۳۴۸', readYear: '1380', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 7, title: 'انسان بی‌خود', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1388', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 8, title: 'مذهب علیه مذهب', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1385', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 9, title: 'زن در چشم و دل محمد', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1382', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 10, title: 'نیایش', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1383', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 11, title: 'چه باید کرد؟', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1379', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 12, title: 'شهادت', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1379', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 13, title: 'آری، اینچنین بود برادر', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1380', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 14, title: 'حسین وارث آدم', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1380', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 15, title: 'پدر، مادر، ما متهمیم', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1381', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 16, title: 'علی حقیقتی بر گونه اساطیر', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1380', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 17, title: 'نوروز', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1385', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 18, title: 'حج', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1383', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 19, title: 'تاریخ ادیان', author: 'علی شریعتی', originalPubDate: 'دهه ۵۰', readYear: '1378', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 20, title: 'هیپیاس بزرگ', author: 'افلاطون', originalPubDate: 'قرن ۴ ق.م', readYear: '1404/06/20', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 21, title: 'هیپیاس کوچک', author: 'افلاطون', originalPubDate: 'قرن ۴ ق.م', readYear: '1404/06/20', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 22, title: 'آپولوژی', author: 'افلاطون', originalPubDate: '۳۹۹ ق.م', readYear: '1382', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: '22.1', title: 'آپولوژی', author: 'افلاطون', originalPubDate: '۳۹۹ ق.م', readYear: '1392', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: '22.2', title: 'آپولوژی', author: 'افلاطون', originalPubDate: '۳۹۹ ق.م', readYear: '1397', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 23, title: 'ضیافت', author: 'افلاطون', originalPubDate: '۳۸۵ ق.م', readYear: '1380', genre: 'فلسفه', translator: 'محمدعلی فروغی', nationality: 'یونان' },
    { id: '23.1', title: 'ضیافت', author: 'افلاطون', originalPubDate: '۳۸۵ ق.م', readYear: '1381', genre: 'فلسفه', translator: 'محمدعلی فروغی', nationality: 'یونان' },
    { id: '23.2', title: 'ضیافت', author: 'افلاطون', originalPubDate: '۳۸۵ ق.م', readYear: '1385', genre: 'فلسفه', translator: 'محمدعلی فروغی', nationality: 'یونان' },
    { id: 24, title: 'کریتون', author: 'افلاطون', originalPubDate: '۳۹۹ ق.م', readYear: '1383', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 25, title: 'گرگیاس', author: 'افلاطون', originalPubDate: '۳۸۰ ق.m', readYear: '1384', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 26, title: 'خارمیدس', author: 'افلاطون', originalPubDate: 'قرن ۴ ق.م', readYear: '1384', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 81, title: 'پروتاگراس', author: 'افلاطون', originalPubDate: '۳۸۰ ق.م', readYear: '1399', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 82, title: 'پروتاگراس', author: 'افلاطون', originalPubDate: '۳۸۰ ق.م', readYear: '1404/08/10', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 105, title: 'لوسیس', author: 'افلاطون', originalPubDate: 'قرن ۴ ق.م', readYear: '1383', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: '105.1', title: 'لوسیس', author: 'افلاطون', originalPubDate: 'قرن ۴ ق.م', readYear: '1404/08/10', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 109, title: 'لاخس', author: 'افلاطون', originalPubDate: 'قرن ۴ ق.م', readYear: '1404/08/11', genre: 'فلسفه', translator: 'محمدحسن لطفی', nationality: 'یونان' },
    { id: 27, title: 'دیوار', author: 'ژان پل سارتر', originalPubDate: '۱۳۱۸', readYear: '1404/08/08', genre: 'رمان فلسفی', translator: 'صادق هدایت', nationality: 'فرانسه' },
    { id: 28, title: 'برزخ', author: 'ژان پل سارتر', originalPubDate: '۱۳۲۳', readYear: '1402', genre: 'فلسفه', translator: 'حمید سمندریان', nationality: 'فرانسه' },
    { id: 29, title: 'شیطان و خدا', author: 'ژان پل سارتر', originalPubDate: '۱۳۳۰', readYear: '1384', genre: 'فلسفه', translator: 'امید شادکامی', nationality: 'فرانسه' },
    { id: 30, title: 'تهوع', author: 'ژان پل سارتر', originalPubDate: '۱۳۱۷', readYear: '1383', genre: 'رمان فلسفی', translator: 'امیرجلال‌الدین اعلم', nationality: 'فرانسه' },
    { id: 31, title: 'دست‌های آلوده', author: 'ژان پل سارتر', originalPubDate: '۱۳۲۷', readYear: '1385', genre: 'فلسفه', translator: 'جلال آل احمد', nationality: 'فرانسه' },
    { id: 32, title: 'مگس‌ها', author: 'ژان پل سارتر', originalPubDate: '۱۳۲۲', readYear: '1384', genre: 'فلسفه', translator: 'صادق هدایت', nationality: 'فرانسه' },
    { id: 33, title: 'اگزیستانسیالیسم و اصالت بشر', author: 'ژان پل سارتر', originalPubDate: '۱۳۲۵', readYear: '1381', genre: 'فلسفه', translator: 'مصطفی رحیمی', nationality: 'فرانسه' },
    { id: 83, title: 'در دفاع از روشنفکران', author: 'ژان پل سارتر', originalPubDate: '۱۳۴۴', readYear: '1384', genre: 'فلسفه', translator: 'رضا سیدحسینی', nationality: 'فرانسه' },
    { id: 34, title: 'بیگانه', author: 'آلبر کامو', originalPubDate: '۱۳۲۱', readYear: '1404/08/08', genre: 'رمان فلسفی', translator: 'جلال آل احمد', nationality: 'فرانسه' },
    { id: 35, title: 'سقوط', author: 'آلبر کامو', originalPubDate: '۱۳۳۵', readYear: '1404/08/09', genre: 'رمان فلسفی', translator: 'پرویز شهدی', nationality: 'فرانسه' },
    { id: 36, title: 'جامعه‌شناسی خودکامگی', author: 'علی رضاقلی', originalPubDate: '۱۳۶۳', readYear: '1404/08/07', genre: 'جامعه شناسی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 37, title: 'جامعه‌شناسی خودکامگی', author: 'علی رضاقلی', originalPubDate: '۱۳۶۳', readYear: '1404/04/08', genre: 'جامعه شناسی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 38, title: 'جامعه‌شناسی نخبه‌کشی', author: 'علی رضاقلی', originalPubDate: '۱۳۷۷', readYear: '1404/07/26', genre: 'جامعه شناسی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 39, title: 'عرفان و منطق', author: 'برتراند راسل', originalPubDate: '۱۲۹۷', readYear: '1383', genre: 'فلسفه', translator: 'نجف دریابندری', nationality: 'انگلیس' },
    { id: 40, title: 'زندگینامه برتراند راسل', author: 'برتراند راسل', originalPubDate: '۱۳۴۶', readYear: '1382', genre: 'فلسفه', translator: 'نجف دریابندری', nationality: 'انگلیس' },
    { id: 41, title: 'چرا مسیحی نیستم', author: 'برتراند راسل', originalPubDate: '۱۳۳۶', readYear: '1400', genre: 'فلسفه', translator: 'نجف دریابندری', nationality: 'انگلیس' },
    { id: 42, title: 'بوف کور', author: 'صادق هدایت', originalPubDate: '۱۳۱۵', readYear: '1380', genre: 'رمان فلسفی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 43, title: 'منطق‌الطیر', author: 'عطار نیشابوری', originalPubDate: 'قرن ۶', readYear: '1381', genre: 'عرفان', translator: 'تصحیح شفیعی کدکنی', nationality: 'ایران' },
    { id: 44, title: 'دیوان حافظ', author: 'حافظ شیرازی', originalPubDate: 'قرن ۸', readYear: '1382', genre: 'شعر', translator: 'تصحیح قزوینی', nationality: 'ایران' },
    { id: 45, title: 'مثنوی معنوی', author: 'مولانا', originalPubDate: 'قرن ۷', readYear: '1383', genre: 'شعر', translator: 'تصحیح نیکلسون', nationality: 'ایران' },
    { id: 46, title: 'فیه ما فیه', author: 'مولانا', originalPubDate: 'قرن ۷', readYear: '1382', genre: 'عرفان', translator: 'تصحیح فروزانفر', nationality: 'ایران' },
    { id: 110, title: 'کلیات شمس', author: 'مولانا', originalPubDate: 'قرن ۷', readYear: '1382', genre: 'شعر', translator: 'تصحیح فروزانفر', nationality: 'ایران' },
    { id: 47, title: 'خط سوم', author: 'ناصرالدین صاحب‌الزمانی', originalPubDate: '۱۳۵۱', readYear: '1382', genre: 'عرفان', translator: 'تألیفی', nationality: 'ایران' },
    { id: '47.1', title: 'خط سوم', author: 'ناصرالدین صاحب‌الزمانی', originalPubDate: '۱۳۵۱', readYear: '1380', genre: 'عرفان', translator: 'تألیفی', nationality: 'ایران' },
    { id: 48, title: 'اسفار اربعه', author: 'ملاصدرا', originalPubDate: 'قرن ۱۱', readYear: '1384', genre: 'فلسفه', translator: 'محمد خواجوی', nationality: 'ایران' },
    { id: 49, title: 'اخبار حلاج', author: 'لوئی ماسینیون', originalPubDate: '۱۳۰۱', readYear: '1384', genre: 'عرفان', translator: 'حمید حمید', nationality: 'فرانسه' },
    { id: 50, title: 'مصائب حلاج', author: 'لوئی ماسینیون', originalPubDate: '۱۳۰۱', readYear: '1388', genre: 'عرفان', translator: 'ضیاءالدین دهشیری', nationality: 'فرانسه' },
    { id: 51, title: 'سرّ نی', author: 'عبدالحسین زرین‌کوب', originalPubDate: '۱۳۶۴', readYear: '1384', genre: 'عرفان', translator: 'تألیفی', nationality: 'ایران' },
    { id: 52, title: 'پله‌پله تا ملاقات خدا', author: 'عبدالحسین زرین‌کوب', originalPubDate: '۱۳۷۰', readYear: '1384', genre: 'عرفان', translator: 'تألیفی', nationality: 'ایران' },
    { id: 53, title: 'بحر در کوزه', author: 'عبدالحسین زرین‌کوب', originalPubDate: '۱۳۶۶', readYear: '1384', genre: 'عرفان', translator: 'تألیفی', nationality: 'ایران' },
    { id: 54, title: 'مقالات شمس', author: 'شمس تبریزی', originalPubDate: 'قرن ۷', readYear: '1385', genre: 'عرفان', translator: 'تصحیح موحد', nationality: 'ایران' },
    { id: 55, title: 'خمسه (لیلی و مجنون)', author: 'نظامی گنجوی', originalPubDate: 'قرن ۶', readYear: '1380', genre: 'شعر', translator: 'تصحیح وحید دستگردی', nationality: 'ایران' },
    { id: 56, title: 'عقل سرخ', author: 'سهروردی', originalPubDate: 'قرن ۶', readYear: '1383', genre: 'فلسفه', translator: 'تصحیح هانری کربن', nationality: 'ایران' },
    { id: 57, title: 'تفسیر سوره نور', author: 'ملاصدرا', originalPubDate: 'قرن ۱۱', readYear: '1385', genre: 'فلسفه دینی', translator: 'محمد خواجوی', nationality: 'ایران' },
    { id: 58, title: 'گلستان', author: 'سعدی', originalPubDate: '۶۳۷', readYear: '1382', genre: 'شعر', translator: 'تصحیح فروغی', nationality: 'ایران' },
    { id: 59, title: 'بوستان', author: 'سعدی', originalPubDate: '۶۳۶', readYear: '1382', genre: 'شعر', translator: 'تصحیح فروغی', nationality: 'ایران' },
    { id: 60, title: 'مقدمه بر المشاعر', author: 'هانری کربن', originalPubDate: '۱۳۴۳', readYear: '1382', genre: 'فلسفه', translator: 'تألیفی', nationality: 'فرانسه' },
    { id: 61, title: 'قلعه حیوانات', author: 'جورج اورول', originalPubDate: '۱۳۲۴', readYear: '1380', genre: 'رمان فلسفی', translator: 'امیر امیرشاهی', nationality: 'انگلیس' },
    { id: 62, title: '۱۹۸۴', author: 'جورج اورول', originalPubDate: '۱۳۲۸', readYear: '1381', genre: 'رمان فلسفی', translator: 'صالح حسینی', nationality: 'انگلیس' },
    { id: 63, title: 'شازده کوچولو', author: 'آنتوان دو سنت اگزوپری', originalPubDate: '۱۳۲۲', readYear: '1380', genre: 'رمان فلسفی', translator: 'احمد شاملو', nationality: 'فرانسه' },
    { id: 64, title: 'هملت', author: 'ویلیام شکسپیر', originalPubDate: '۱۲۸۰', readYear: '1382', genre: 'نمایشنامه', translator: 'مسعود فرزاد', nationality: 'انگلیس' },
    { id: 65, title: 'مسخ', author: 'فرانتس کافکا', originalPubDate: '۱۲۹۴', readYear: '1383', genre: 'رمان فلسفی', translator: 'صادق هدایت', nationality: 'اتریش' },
    { id: 66, title: 'کمدی الهی', author: 'دانته آلیگیری', originalPubDate: '۱۰۰۱', readYear: '1380', genre: 'فلسفه', translator: 'شجاع‌الدین شفا', nationality: 'ایتالیا' },
    { id: 67, title: 'روی ماه خداوند را ببوس', author: 'مصطفی مستور', originalPubDate: '۱۳۷۹', readYear: '1379', genre: 'رمان فلسفی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 68, title: 'استخوان خوک و دست‌های جذامی', author: 'مصطفی مستور', originalPubDate: '۱۳۸۳', readYear: '1383', genre: 'رمان فلسفی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 69, title: 'من دانای کل هستم', author: 'مصطفی مستور', originalPubDate: '۱۳۸۸', readYear: '1388', genre: 'رمان فلسفی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 70, title: 'خشم فرشتگان', author: 'سیدنی شلدون', originalPubDate: '۱۳۶۱', readYear: '1375', genre: 'رمان', translator: 'احمدreference', nationality: 'آمریکا' },
    { id: 71, title: 'آناکارنینا', author: 'لئو تولستوی', originalPubDate: '۱۲۵۶', readYear: '1383', genre: 'رمان فلسفی', translator: 'سروش حبیبی', nationality: 'روسیه' },
    { id: 72, title: 'مائده‌های زمینی', author: 'آندره ژید', originalPubDate: '۱۲۷۶', readYear: '1380', genre: 'رمان فلسفی', translator: 'جلال آل احمد', nationality: 'فرانسه' },
    { id: 73, title: 'ارغنون', author: 'مهدی اخوان ثالث', originalPubDate: '۱۳۳۰', readYear: '1381', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 74, title: 'زمستان', author: 'مهدی اخوان ثالث', originalPubDate: '۱۳۳۵', readYear: '1382', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 75, title: 'آخر شاهنامه', author: 'مهدی اخوان ثالث', originalPubDate: '۱۳۳۸', readYear: '1383', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 76, title: 'از این اوستا', author: 'مهدی اخوان ثالث', originalPubDate: '۱۳۴۴', readYear: '1383', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 77, title: 'سراب', author: 'هوشنگ ابتهاج (سایه)', originalPubDate: '۱۳۳۰', readYear: '1384', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 78, title: 'سیاه‌مشق', author: 'هوشنگ ابتهاج (سایه)', originalPubDate: '۱۳۳۲', readYear: '1383', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 79, title: 'شبگیر', author: 'هوشنگ ابتهاج (سایه)', originalPubDate: '۱۳۳۲', readYear: '1385', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 80, title: 'زمین', author: 'هوشنگ ابتهاج (سایه)', originalPubDate: '۱۳۳۴', readYear: '1385', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 84, title: 'چند برگ از یلدا', author: 'هوشنگ ابتهاج (سایه)', originalPubDate: '۱۳۴۴', readYear: '1382', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 85, title: 'تئوری موسیقی', author: 'مصطفی کمال پورتراب', originalPubDate: '۱۳۴۵', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 86, title: 'تئوری موسیقی', author: 'علینقی وزیری', originalPubDate: '۱۳۱۳', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 87, title: 'تئوری موسیقی', author: 'پرویز منصوری', originalPubDate: 'دهه ۵۰', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 88, title: 'موسیقی کبیر', author: 'ابونصر فارابی', originalPubDate: 'قرن ۳', readYear: '1386', genre: 'موسیقی', translator: 'آذرتاش آذرنوش', nationality: 'ایران' },
    { id: 89, title: 'دستگاه در موسیقی ایرانی', author: 'هرمز فرهت', originalPubDate: '۱۳۶۸', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 90, title: 'کتاب سال شیدا ۱', author: 'محمدرضا لطفی', originalPubDate: 'دهه ۷۰', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 91, title: 'کتاب سال شیدا ۲', author: 'محمدرضا لطفی', originalPubDate: 'دهه ۷۰', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: '91.1', title: 'کتاب سال شیدا ۳ و ۴', author: 'محمدرضا لطفی', originalPubDate: 'دهه ۷۰', readYear: '1385', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: '91.2', title: 'کتاب سال شیدا ۷ و ۶', author: 'محمدرضا لطفی', originalPubDate: 'دهه ۷۰', readYear: '1385', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: '91.3', title: 'کتاب سال شیدa ۵', author: 'محمدرضا لطفی', originalPubDate: 'دهه ۷۰', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: '91.4', title: 'کتاب سال شیدا ۸ و ۹', author: 'محمدرضا لطفی', originalPubDate: 'دهه ۷۰', readYear: '1387', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: '91.5', title: 'کتاب سال شیدا ۱۰ و ۱۱', author: 'محمدرضا لطفی', originalPubDate: 'دهه ۷۰', readYear: '1387', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: '91.6', 'title': 'کتاب سال شیدا ۱ و ۲', 'author': 'محمدرضا لطفی', 'originalPubDate': 'دهه ۷۰', 'readYear': '1385', 'genre': 'موسیقی', 'translator': 'تألیفی', 'nationality': 'ایران' },
    { id: 92, title: 'ارکستراسیون', author: 'کنت کنان', originalPubDate: '۱۳۳۷', readYear: '1386', genre: 'موسیقی', translator: 'هوشنگ کامکار', nationality: 'آمریکا' },
    { id: 93, title: 'هفت دستگاه موسیقی ایرانی', author: 'مجید کیانی', originalPubDate: '۱۳۷۱', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 94, title: 'نگرشی نو به تئوری موسیقی ایرانی', author: 'داریوش طلایی', originalPubDate: '۱۳۷۲', readYear: '1386', genre: 'موسیقی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 95, title: 'سیر حکمت در اروپا', author: 'محمدعلی فروغی', originalPubDate: '۱۳۱۰', readYear: '1381', genre: 'فلسفه', translator: 'تألیفی', nationality: 'ایران' },
    { id: 96, title: 'آخرت و خدا، هدف بعثت انبیاء؟!', author: 'مهدی بازرگان', originalPubDate: '۱۳۴۱', readYear: '1385', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 97, title: 'گاو (عزاداران بیل)', author: 'غلامحسین ساعدی', originalPubDate: '۱۳۴۳', readYear: '1377', genre: 'رمان', translator: 'تألیفی', nationality: 'ایران' },
    { id: 107, title: 'کباب غاز', author: 'محمدعلی جمال‌زاده', originalPubDate: '۱۳۰۰', readYear: '1375', genre: 'داستان کوتاه', translator: 'تألیفی', nationality: 'ایران' },
    { id: 98, title: 'رباعیات خیام', author: 'عمر خیام', originalPubDate: 'قرن ۵', readYear: '1385', genre: 'شعر', translator: 'تصحیح فروغی', nationality: 'ایران' },
    { id: 99, title: 'قمار عاشقانه', author: 'عبدالکریم سروش', originalPubDate: '۱۳۷۵', readYear: '1383', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: 100, title: 'سفر به دیگر سو', author: 'کارلوس کاستاندا', originalPubDate: '۱۳۵۰', readYear: '1381', genre: 'عرفان', translator: 'مهران کندری', nationality: 'پرو' },
    { id: 101, title: 'بتهوون', author: 'رومن رولان', originalPubDate: '۱۲۸۲', readYear: '1382', genre: 'زندگی‌نامه', translator: 'محمد مجلسی', nationality: 'فرانسه' },
    { id: 102, title: 'قرآن', author: 'محمد', originalPubDate: 'قرن ۱', readYear: '1385', genre: 'فلسفه دینی', translator: 'الهی قمشه‌ای', nationality: 'عربستان' },
    { id: 103, title: 'دوبیتی‌ها (خیام)', author: 'عمر خیام', originalPubDate: 'قرن ۵', readYear: '1387', genre: 'شعر', translator: 'تصحیح فروغی', nationality: 'ایران' },
    { id: '104.1', title: 'ایمان و آزادی', author: 'مجتهد شبستری', originalPubDate: '۱۳۷۶', readYear: '1389', genre: 'فلسفه دینی', translator: 'تألیفی', nationality: 'ایران' },
    { id: '105.2', title: 'ضحاک ماردوش', author: 'علی اکبر سعیدی سیرجانی', translator: 'تألیفی', originalPubDate: '1354', readYear: '1404/08/12', genre: 'جامعه شناسی', nationality: 'ایران' },
    { id: 111, title: 'دوبیتی‌های باباطاهر', author: 'باباطاهر', originalPubDate: 'قرن ۵', readYear: '1376', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 112, title: 'دیوان پروین اعتصامی', author: 'پروین اعتصامی', originalPubDate: '۱۳۱۴', readYear: '1381', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 113, title: 'دیوان اشعار وحشی بافقی', author: 'وحشی بافقی', originalPubDate: 'قرن ۱۰', readYear: '1380', genre: 'شعر', translator: 'تألیفی', nationality: 'ایران' },
    { id: 114, title: 'سیمای دو زن', author: 'علی اکبر سعیدی سیرجانی', originalPubDate: '1369', readYear: '1404/08/13', genre: 'جامعه شناسی', translator: 'تألیفی', nationality: 'ایران' }
];

export const JALALI_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const TYPEWRITER_SOUND = 'data:audio/mpeg;base64,SUQzBAAAAAAAIponeMztb0tPz55D5/f5/6LDE5Coa26sV2Z43ZSkK3c+1cxaH9X/V99l/9a5zQ2Lz+f/9R/8Dz/7///8v9v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAExhdmc1Ny44My4xMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxAADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxAADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxBADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxCADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxDADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxDADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxEADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxEQDSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxEgDSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxFAADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxFQADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxGAADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxGQADSAAAAAABARFOsVOVAAAAANIAAAAAAQAAADABAOX/PhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const FULL_TEXT = 'کتابخانه من';

// From components/Accordion.tsx
interface AccordionProps {
    title: ReactNode;
    children: ReactNode;
    startOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div
                className="bg-slate-50 p-4 flex justify-between items-center cursor-pointer hover:bg-slate-100"
                onClick={toggleAccordion}
            >
                {title}
                <span className="accordion-toggle-icon text-2xl font-bold text-teal-600" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    {isOpen ? '−' : '+'}
                </span>
            </div>
            <div
                className="collapsible-content bg-white"
                style={{ maxHeight: isOpen ? '10000px' : '0' }}
            >
                {children}
            </div>
        </div>
    );
};


// From components/RevealOnScroll.tsx
interface RevealOnScrollProps {
    children: ReactNode;
    delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                   setTimeout(() => {
                     setIsVisible(true);
                     scrollObserver.unobserve(entry.target);
                   }, delay)
                }
            },
            {
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.01,
            }
        );
        
        if (ref.current) {
            scrollObserver.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                scrollObserver.unobserve(ref.current);
            }
        };
    }, [delay]);

    return (
        <div ref={ref} className={`reveal-on-scroll ${isVisible ? 'visible' : ''}`}>
            {children}
        </div>
    );
};


// From components/AuthorAccordionList.tsx
interface AuthorAccordionListProps {
    books: ProcessedBook[];
}

const AuthorAccordionList: React.FC<AuthorAccordionListProps> = ({ books }) => {
    const groupedByAuthor = useMemo(() => {
        const grouped = books.reduce((acc, book) => {
            const author = book.author || 'نامشخص';
            if (!acc[author]) {
                acc[author] = [];
            }
            acc[author].push(book);
            return acc;
        }, {} as Record<string, ProcessedBook[]>);

        return Object.entries(grouped).sort(([authorA, booksA], [authorB, booksB]) => {
            return booksB.length - booksA.length;
        });
    }, [books]);

    return (
        <RevealOnScroll>
            <section id="author-list-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <Accordion
                    title={
                        <h2 className="text-2xl font-bold text-slate-900">لیست کتاب‌ها بر اساس نویسنده</h2>
                    }
                >
                    <div className="space-y-4 mt-8">
                        {groupedByAuthor.map(([author, authorBooks]) => {
                            const booksByTitle = authorBooks.reduce((acc, book) => {
                                if (!acc[book.title]) {
                                    acc[book.title] = {
                                        book: book,
                                        readYears: [],
                                    };
                                }
                                acc[book.title].readYears.push(book.readYear);
                                return acc;
                            }, {} as Record<string, { book: ProcessedBook; readYears: string[] }>);

                            const title = (
                                <h3 className="font-bold text-lg text-slate-800">
                                    {author}
                                    <span className="text-sm font-medium text-slate-600 mr-2">
                                        ({Object.keys(booksByTitle).length} کتاب / {authorBooks.length} بار خوانش)
                                    </span>
                                </h3>
                            );

                            return (
                                <Accordion key={author} title={title}>
                                    <ul className="space-y-1 p-4">
                                        {Object.values(booksByTitle).map(({ book, readYears }) => {
                                            const dates = readYears.sort((a, b) => a.localeCompare(b)).join(' - ');
                                            const translatorText =
                                                book.translator && !['تألیفی', 'تصحیح شفیعی کدکنی', 'تصحیح قزوینی', 'تصحیح نیکلسون', 'تصحیح فروزانفر', 'تصحیح موحد', 'تصحیح وحید دستگردی', 'تصحیح هانری کربن', 'تصحیح فروغی'].includes(book.translator)
                                                    ? ` - ${book.translator}`
                                                    : '';

                                            return (
                                                <li key={`${book.id}-${readYears[0]}`} className="text-slate-700 py-2 border-b border-slate-100 last:border-b-0 text-right">
                                                    <strong>{book.title}</strong>
                                                    {translatorText} -{' '}
                                                    <span className="text-sm text-slate-500">({dates})</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Accordion>
                            );
                        })}
                    </div>
                </Accordion>
            </section>
        </RevealOnScroll>
    );
};


// From components/ChartsSection.tsx
interface ChartsSectionProps {
    books: ProcessedBook[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-300 rounded-lg shadow-lg">
                <p className="font-bold text-slate-800">{`${label}`}</p>
                <p className="text-teal-600">{`تعداد: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const ChartsSection: React.FC<ChartsSectionProps> = ({ books }) => {

    const authorData = useMemo(() => {
        const counts = books.reduce((acc, book) => {
            acc[book.author] = (acc[book.author] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [books]);

    const genreData = useMemo(() => {
        const counts = books.reduce((acc, book) => {
            acc[book.genre] = (acc[book.genre] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.count - b.count);
    }, [books]);

    const yearlyData = useMemo(() => {
        const counts = books.reduce((acc, book) => {
            if (book.year !== 'نامشخص') {
                acc[book.year] = (acc[book.year] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [books]);

    return (
        <section id="charts-section" className="space-y-8 mb-16">
            <RevealOnScroll>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-center mb-4">فراوانی کتاب‌ها (بر اساس مطالعه) بر اساس نویسنده</h3>
                    <div className="relative h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={authorData} layout="horizontal" margin={{ top: 5, right: 20, left: 0, bottom: 90 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" angle={-60} textAnchor="end" interval={0} />
                                {/* FIX: Changed allowDecals to allowDecimals */}
                                <YAxis allowDecimals={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }}/>
                                <Bar dataKey="count" fill="#0d9488" name="تعداد کتاب‌ها" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevealOnScroll>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-center mb-4">تحلیل ژانرهای مطالعه شده</h3>
                        <div className="relative h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={genreData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    {/* FIX: Changed allowDecals to allowDecimals */}
                                    <XAxis type="number" allowDecimals={false} />
                                    <YAxis type="category" dataKey="name" width={100} interval={0} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                                    <Bar dataKey="count" fill="#3b82f6" name="تعداد کتاب‌ها" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </RevealOnScroll>
                <RevealOnScroll>
                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-center mb-4">تعداد کتاب‌های مطالعه شده (بر اساس سال)</h3>
                        <div className="relative h-[400px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={yearlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    {/* FIX: Changed allowDecals to allowDecimals */}
                                    <YAxis allowDecimals={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="تعداد کتاب‌ها" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};


// From components/Footer.tsx
const Footer: React.FC = () => {
    return (
        <footer className="text-center mt-8 py-6 border-t border-slate-200">
            <p className="text-slate-500">تهیه شده توسط امیررضا اعطاسی</p>
        </footer>
    );
};


// From components/FullBookList.tsx
interface FullBookListProps {
    books: ProcessedBook[];
}

const FullBookList: React.FC<FullBookListProps> = ({ books }) => {
    const totalBooks = books.length;

    return (
        <RevealOnScroll>
            <section id="full-list-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <Accordion
                    title={<h2 className="text-2xl font-bold text-slate-900">لیست کامل کتاب‌های مطالعه شده</h2>}
                >
                    <div className="overflow-x-auto mt-8">
                        <table className="w-full text-sm text-right text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ردیف</th>
                                    <th scope="col" className="px-6 py-3 w-2/5">عنوان کتاب</th>
                                    <th scope="col" className="px-6 py-3">نویسنده</th>
                                    <th scope="col" className="px-6 py-3">مترجم</th>
                                    <th scope="col" className="px-6 py-3">تاریخ نگارش</th>
                                    <th scope="col" className="px-6 py-3">تاریخ مطالعه</th>
                                    <th scope="col" className="px-6 py-3">ژانر</th>
                                    <th scope="col" className="px-6 py-3">ملیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={`${book.id}-${index}`} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{totalBooks - index}</td>
                                        <td className="px-6 py-4 font-semibold">{book.title}</td>
                                        <td className="px-6 py-4">{book.author}</td>
                                        <td className="px-6 py-4">{book.translator || '---'}</td>
                                        <td className="px-6 py-4">{book.originalPubDate}</td>
                                        <td className="px-6 py-4">{book.readYear}</td>
                                        <td className="px-6 py-4">{book.genre}</td>
                                        <td className="px-6 py-4">{book.nationality}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Accordion>
            </section>
        </RevealOnScroll>
    );
};


// From components/GenreAccordionList.tsx
interface GenreAccordionListProps {
    books: ProcessedBook[];
}

const GenreAccordionList: React.FC<GenreAccordionListProps> = ({ books }) => {
    const groupedByGenre = useMemo(() => {
        const grouped = books.reduce((acc, book) => {
            const genre = book.genre || 'نامشخص';
            if (!acc[genre]) {
                acc[genre] = [];
            }
            acc[genre].push(book);
            return acc;
        }, {} as Record<string, ProcessedBook[]>);

        return Object.entries(grouped).sort(([, booksA], [, booksB]) => {
            return booksB.length - booksA.length;
        });
    }, [books]);

    return (
        <RevealOnScroll>
            <section id="genre-list-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <Accordion
                    title={
                        <h2 className="text-2xl font-bold text-slate-900">لیست کتاب‌ها بر اساس ژانر</h2>
                    }
                >
                    <div className="space-y-4 mt-8">
                        {groupedByGenre.map(([genre, genreBooks]) => {
                            const booksByTitle = genreBooks.reduce((acc, book) => {
                                if (!acc[book.title]) {
                                    acc[book.title] = {
                                        book: book,
                                        readYears: [],
                                    };
                                }
                                acc[book.title].readYears.push(book.readYear);
                                return acc;
                            }, {} as Record<string, { book: ProcessedBook; readYears: string[] }>);

                            const title = (
                                <h3 className="font-bold text-lg text-slate-800">
                                    {genre}
                                    <span className="text-sm font-medium text-slate-600 mr-2">
                                        ({Object.keys(booksByTitle).length} کتاب / {genreBooks.length} بار خوانش)
                                    </span>
                                </h3>
                            );

                            return (
                                <Accordion key={genre} title={title}>
                                    <ul className="space-y-1 p-4">
                                        {Object.values(booksByTitle)
                                            .sort((a, b) => {
                                                // Sort read years for each book title to find the latest one
                                                const latestYearA = [...a.readYears].sort((y1, y2) => y2.localeCompare(y1))[0];
                                                const latestYearB = [...b.readYears].sort((y1, y2) => y2.localeCompare(y1))[0];
                                                // Compare the latest read years to sort the book titles by most recent first
                                                return latestYearB.localeCompare(latestYearA);
                                            })
                                            .map(({ book, readYears }) => {
                                            const dates = readYears.sort((a, b) => a.localeCompare(b)).join(' - ');
                                            const translatorText =
                                                book.translator && !['تألیفی', 'تصحیح شفیعی کدکنی', 'تصحیح قزوینی', 'تصحیح نیکلسون', 'تصحیح فروزانفر', 'تصحیح موحد', 'تصحیح وحید دستگردی', 'تصحیح هانری کربن', 'تصحیح فروغی'].includes(book.translator)
                                                    ? ` - ${book.translator}`
                                                    : '';

                                            return (
                                                <li key={`${book.id}-${readYears[0]}`} className="text-slate-700 py-2 border-b border-slate-100 last:border-b-0 text-right">
                                                    <strong>{book.title}</strong> ({book.author})
                                                    {translatorText} -{' '}
                                                    <span className="text-sm text-slate-500">({dates})</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Accordion>
                            );
                        })}
                    </div>
                </Accordion>
            </section>
        </RevealOnScroll>
    );
};

// From components/Header.tsx
const Header: React.FC = () => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        
        if (!targetId || targetId.startsWith('http') || !targetId.startsWith('#')) {
             if (targetId) window.location.href = targetId;
             return
        };

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update the URL hash for better user experience and history
            if (history.pushState) {
                history.pushState(null, '', targetId);
            } else {
                window.location.hash = targetId;
            }
        }
    };

    return (
        <nav className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-slate-200">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* The title is now provided by the Intro component's animation */}
                <div aria-hidden="true" style={{width: '10rem'}}></div>
                <ul className="flex flex-wrap justify-end items-center gap-x-6 gap-y-2 font-semibold">
                    <li><a href="#kpis" onClick={handleNavClick} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">شاخص‌ها</a></li>
                    <li><a href="#full-list-section" onClick={handleNavClick} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">لیست کامل</a></li>
                    <li><a href="#author-list-section" onClick={handleNavClick} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">بر اساس نویسنده</a></li>
                    <li><a href="#genre-list-section" onClick={handleNavClick} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">بر اساس ژانر</a></li>
                    <li><a href="#charts-section" onClick={handleNavClick} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">نمودارها</a></li>
                    <li><a href="#timeline-section" onClick={handleNavClick} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">خط زمانی</a></li>
                    <li><a href="index.html" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">مقاله های من</a></li>
                </ul>
            </div>
        </nav>
    );
};

// From components/Intro.tsx
const Intro: React.FC<{ onAnimationFinish: () => void }> = ({ onAnimationFinish }) => {
    const [text, setText] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let charIndex = 0;
        let timeoutId: number;

        const typeChar = () => {
            if (charIndex < FULL_TEXT.length) {
                setText(FULL_TEXT.substring(0, charIndex + 1));
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(() => {});
                }
                charIndex++;
                timeoutId = window.setTimeout(typeChar, 150);
            } else {
                // Typing finished, wait then start outro animation
                timeoutId = window.setTimeout(() => {
                    setIsFinished(true);
                }, 1000);
            }
        };
        
        timeoutId = window.setTimeout(typeChar, 500); // Initial delay
        
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (isFinished) {
            // The CSS transition is 1s long. We use a timeout to ensure
            // the onAnimationFinish callback is fired after the transition ends.
            const timeoutId = setTimeout(() => {
                onAnimationFinish();
            }, 1000); 

            return () => clearTimeout(timeoutId);
        }
    }, [isFinished, onAnimationFinish]);

    return (
        <div className={`intro-container ${isFinished ? 'finished' : ''}`}>
            <h1 className="intro-text">
                {text}
                <span className="typing-caret">_</span>
            </h1>
            <audio ref={audioRef} src={TYPEWRITER_SOUND} preload="auto"></audio>
        </div>
    );
};

// From components/KpiCard.tsx
interface KpiCardProps {
    title: string;
    value: number | string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-semibold text-slate-500">{title}</h3>
            <p className="text-4xl font-bold text-teal-600 mt-2">{value}</p>
        </div>
    );
};

// From components/KpiSection.tsx
interface KpiSectionProps {
    data: KpiData;
}

const KpiSection: React.FC<KpiSectionProps> = ({ data }) => {
    return (
        <section id="kpis" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            <KpiCard title="کل کتاب‌ها (عناوین یکتا)" value={data.totalBooks} />
            <KpiCard title="کل نویسندگان" value={data.totalAuthors} />
            <KpiCard title="تعداد دفعات مطالعه" value={data.totalReads} />
            <KpiCard title="کتاب‌های ۱۴۰۴" value={data.currentYearBooks} />
        </section>
    );
};

// From components/PageHeader.tsx
const PageHeader: React.FC = () => {
    return (
        <header className="text-center mb-12 h-10 md:h-12">
            {/* This component is now a spacer for the animated title */}
        </header>
    );
};

// From components/ScrollButton.tsx
const ScrollButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white rounded-full p-3 shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-110 opacity-100"
                    aria-label="Scroll to top"
                    style={{ opacity: isVisible ? 1 : 0 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                </button>
            )}
        </>
    );
};

// From components/Timeline.tsx
interface TimelineProps {
    books: ProcessedBook[];
}

const Timeline: React.FC<TimelineProps> = ({ books }) => {
    const timelineData = useMemo(() => {
        const booksByYear = books.reduce((acc, book) => {
            const year = book.year;
            if (year === 'نامشخص') return acc;
            if (!acc[year]) acc[year] = [];
            acc[year].push(book);
            return acc;
        }, {} as Record<string, ProcessedBook[]>);

        return Object.entries(booksByYear).sort(([yearA], [yearB]) => yearB.localeCompare(yearA));
    }, [books]);

    return (
        <RevealOnScroll>
            <section id="timeline-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">خط زمانی مطالعه کتاب‌ها</h2>
                <div id="timeline-container" className="relative max-w-3xl mx-auto">
                    <div className="timeline-line"></div>
                    {timelineData.map(([year, yearBooks]) => {
                        if (year === '1404') {
                             const booksByMonth1404 = yearBooks.reduce((acc, book) => {
                                if (book.month) {
                                    if (!acc[book.month]) acc[book.month] = [];
                                    acc[book.month].push(book);
                                }
                                return acc;
                            }, {} as Record<string, ProcessedBook[]>);

                            const sortedMonths = Object.entries(booksByMonth1404).sort(([monthA], [monthB]) => monthB.localeCompare(monthA));

                            return sortedMonths.map(([month, monthBooks]) => {
                                const monthName = JALALI_MONTHS[parseInt(month, 10) - 1];
                                return (
                                    <div key={`${year}-${month}`} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <h3 className="font-bold text-lg text-slate-800">{`${monthName} ${year}`}</h3>
                                        <ul className="mt-3 space-y-2">
                                            {monthBooks.map((book, index) => {
                                                const translatorText = book.translator && !['تألیفی', 'تصحیح شفیعی کدکنی', 'تصحیح قزوینی', 'تصحیح نیکلسون', 'تصحیح فروزانفر', 'تصحیح موحد', 'تصحیح وحید دستگردی', 'تصحیح هانری کربن', 'تصحیح فروغی'].includes(book.translator) ? ` - ${book.translator}` : '';
                                                return <li key={`${book.id}-${index}`} className="text-slate-700"><strong>{book.title}</strong> - {book.author}{translatorText} <span className="text-xs text-slate-500">({book.readYear})</span></li>
                                            })}
                                        </ul>
                                    </div>
                                )
                            })
                        }
                        
                        return (
                            <div key={year} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <h3 className="font-bold text-lg text-slate-800">سال {year}</h3>
                                <ul className="mt-3 space-y-2">
                                    {yearBooks.map((book, index) => {
                                       const translatorText = book.translator && !['تألیفی', 'تصحیح شفیعی کدکنی', 'تصحیح قزوینی', 'تصحیح نیکلسون', 'تصحیح فروزانفر', 'تصحیح موحد', 'تصحیح وحید دستگردی', 'تصحیح هانری کربن', 'تصحیح فروغی'].includes(book.translator) ? ` - ${book.translator}` : '';
                                        return <li key={`${book.id}-${index}`} className="text-slate-700"><strong>{book.title}</strong> - {book.author}{translatorText} <span className="text-xs text-slate-500">({book.readYear})</span></li>
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </section>
        </RevealOnScroll>
    );
};


// From App.tsx
function parseReadDate(dateStr: string | null | undefined) {
    if (!dateStr || typeof dateStr !== 'string') {
        return { year: 'نامشخص', month: null, day: null, full: 'نامشخص' };
    }
    const parts = dateStr.split('/');
    const year = parts[0];
    const month = parts.length > 1 ? parts[1] : null;
    const day = parts.length > 2 ? parts[2] : null;
    return { year, month, day, full: dateStr };
}

const App: React.FC = () => {
    const [isIntroFinished, setIsIntroFinished] = useState(false);

    const processedData: ProcessedBook[] = useMemo(() => {
        return booksData.map(book => {
            const dateInfo = parseReadDate(book.readYear);
            return { ...book, ...dateInfo };
        }).sort((a, b) => {
            if (a.full.length !== b.full.length) {
                return b.full.length - a.full.length;
            }
            return b.full.localeCompare(a.full);
        });
    }, []);
    
    const kpiData = useMemo(() => {
        const uniqueTitles = new Set(processedData.map(b => b.title));
        const uniqueAuthors = new Set(processedData.map(b => b.author));
        const totalReads = processedData.length;
        const currentYearBooks = processedData.filter(b => b.year === '1404').length;

        return {
            totalBooks: uniqueTitles.size,
            totalAuthors: uniqueAuthors.size,
            totalReads,
            currentYearBooks,
        };
    }, [processedData]);

    return (
        <>
            <Intro onAnimationFinish={() => setIsIntroFinished(true)} />
            <div className={!isIntroFinished ? 'content-hidden' : 'content-visible'}>
                <Header />
                <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                    <PageHeader />
                    <KpiSection data={kpiData} />
                    <FullBookList books={processedData} />
                    <ChartsSection books={processedData} />
                    <AuthorAccordionList books={processedData} />
                    <GenreAccordionList books={processedData} />
                    <Timeline books={processedData} />
                </main>
                <Footer />
                <ScrollButton />
            </div>
        </>
    );
};


// Original index.tsx content
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
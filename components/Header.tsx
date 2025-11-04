import React from 'react';

const Header: React.FC = () => {
    return (
        <nav className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-slate-200">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-xl font-bold text-slate-800">کتابخانه من</h1>
                <ul className="flex flex-wrap justify-end gap-x-6 gap-y-2 font-semibold">
                    <li><a href="#kpis" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">شاخص‌ها</a></li>
                    <li><a href="#full-list-section" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">لیست کامل</a></li>
                    <li><a href="#author-list-section" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">بر اساس نویسنده</a></li>
                    <li><a href="#genre-list-section" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">بر اساس ژانر</a></li>
                    <li><a href="#charts-section" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">نمودارها</a></li>
                    <li><a href="#timeline-section" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">خط زمانی</a></li>
                    <li><a href="index.html" className="text-slate-600 hover:text-teal-600 transition-colors duration-200">مقاله های من</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;


import React from 'react';
import type { ProcessedBook } from '../types.ts';
import Accordion from './Accordion.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

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

export default FullBookList;
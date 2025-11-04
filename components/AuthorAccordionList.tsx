
import React, { useMemo } from 'react';
import type { ProcessedBook } from '../types.ts';
import Accordion from './Accordion.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

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

export default AuthorAccordionList;
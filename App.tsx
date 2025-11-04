
import React, { useMemo, useState } from 'react';
import { booksData } from './constants.ts';
import type { ProcessedBook } from './types.ts';
import Header from './components/Header.tsx';
import PageHeader from './components/PageHeader.tsx';
import KpiSection from './components/KpiSection.tsx';
import FullBookList from './components/FullBookList.tsx';
import ChartsSection from './components/ChartsSection.tsx';
import AuthorAccordionList from './components/AuthorAccordionList.tsx';
import GenreAccordionList from './components/GenreAccordionList.tsx';
import Timeline from './components/Timeline.tsx';
import Footer from './components/Footer.tsx';
import ScrollButton from './components/ScrollButton.tsx';
import Intro from './components/Intro.tsx';

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

export default App;
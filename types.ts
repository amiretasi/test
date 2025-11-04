
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

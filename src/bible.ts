import bibleJSON from '../data/bible.json';

type Verse = {chapter: number, text: string, verse: number, name: string};
type Chapter = {chapter: number, verses: Verse[]};
type Book = {name: string, chapters: Chapter[]};
type Bible = Book[];

const verses = [];
bibleJSON.books.forEach(book => {
  book.chapters.forEach(chapter => {
    chapter.verses.forEach(verse => {
      verses.push(verse.text);
    });
  });
});

export const getBible = (): Bible => {
  return bibleJSON.books as Bible;
};

export const getRandomVerse = (): string => {
  return verses[verses.length * Math.random() << 0];
};

let currentVerse = 0;
export const getNextVerse = () => {
  return verses[currentVerse++];
};

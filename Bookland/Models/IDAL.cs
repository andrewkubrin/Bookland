using System.Collections.Generic;

namespace Bookland.Models
{
    public interface IDAL
    {
        IEnumerable<Book> GetBooks();

        IEnumerable<Room> GetRooms();

        IEnumerable<Shelf> GetShelves();

        IEnumerable<BookSpace> GetBookSpaces();

        IEnumerable<Reader> GetReaders();

        IEnumerable<Log> GetJournal();

        void Add(Room item);

        void Add(BookSpace item);

        void Add(Book item);

        void Add(Shelf item);

        void TakeBook(Log item);

        void Update(Book item);

        void Update(Room item);

        void Update(BookSpace item);

        void Update(Shelf item);

        void Update(Log item);

        void Update(Reader item);

        void Delete(Book item);

        void Delete(Room item);

        void Delete(BookSpace item);

        void Delete(Shelf item);

        void Delete(Reader item);

        void Delete(Log item);
    }
}
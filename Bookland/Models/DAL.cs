using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace Bookland.Models
{
    public class DAL : IDAL
    {
        private AppEntities entities;

        public DAL(AppEntities entities)
        {
            this.entities = entities;
        }

        public IEnumerable<Book> GetBooks()
        {
            return entities.Books;
        }

        public void Add(Room item)
        {
            entities.Rooms.Add(item);
            entities.SaveChanges();
        }

        public void Add(BookSpace item)
        {
            entities.BookSpaces.Add(item);
            entities.SaveChanges();
        }

        public void Add(Book item)
        {
            entities.Books.Add(item);
            entities.SaveChanges();
        }

        public void Add(Shelf item)
        {
            entities.Shelves.Add(item);
            entities.SaveChanges();
        }

        public void TakeBook(Log item)
        {
            entities.Logs.Add(item);
            entities.SaveChanges();
        }

        public void Update(Book item)
        {
            entities.Books.AddOrUpdate(item);
            entities.SaveChanges();
        }

        public void Delete(Book item)
        {
            entities.Books.Remove(item);
            entities.SaveChanges();
        }

        public void Update(Room item)
        {
            entities.Rooms.AddOrUpdate(item);
            entities.SaveChanges();
        }

        public void Delete(Room item)
        {
            entities.Rooms.Remove(entities.Rooms.Single(x => x.Id == item.Id));
            entities.SaveChanges();
        }

        public IEnumerable<Room> GetRooms()
        {
            return entities.Rooms;
        }

        public IEnumerable<Shelf> GetShelves()
        {
            return entities.Shelves;
        }

        public IEnumerable<BookSpace> GetBookSpaces()
        {
            return entities.BookSpaces;
        }

        public IEnumerable<Reader> GetReaders()
        {
            return entities.Readers;
        }


        public void Update(BookSpace item)
        {
            entities.BookSpaces.AddOrUpdate(item);
            entities.SaveChanges();
        }

        public void Update(Shelf item)
        {
            entities.Shelves.AddOrUpdate(item);
            entities.SaveChanges();
        }

        public void Update(Reader item)
        {
            entities.Readers.AddOrUpdate(item);
            entities.SaveChanges();
        }

        public void Delete(BookSpace item)
        {
            entities.BookSpaces.Remove(entities.BookSpaces.Single(x => x.Id == item.Id));
            entities.SaveChanges();
        }

        public void Delete(Shelf item)
        {
            entities.Shelves.Remove(entities.Shelves.Single(x => x.Id == item.Id));
            entities.SaveChanges();
        }

        public void Delete(Reader item)
        {
            entities.Readers.Remove(entities.Readers.Single(x => x.Id == item.Id));
            entities.SaveChanges();
        }

        public IEnumerable<Log> GetJournal()
        {
            return entities.Logs;
        }


        public void Update(Log item)
        {
            if (entities.Logs.Count(x => x.BookId == item.BookId && x.ReaderId == item.ReaderId) > 0)
                return;
            entities.Logs.AddOrUpdate(item);
            entities.SaveChanges();
        }

        public void Delete(Log item)
        {
            entities.Logs.Remove(entities.Logs.Single(x => x.BookId == item.BookId && x.ReaderId == item.ReaderId));
            entities.SaveChanges();
        }
    }
}
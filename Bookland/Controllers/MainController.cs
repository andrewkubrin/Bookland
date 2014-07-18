using System;
using System.Linq;
using System.Web.Mvc;
using Bookland.Models;

namespace Bookland.App_Data
{
    public class MainController : Controller
    {
        private readonly IDAL service;

        public MainController(IDAL service)
        {
            this.service = service;
        }

        public ActionResult Index()
        {

            return View();
        }

        public ActionResult GetAllData()
        {
            var books = service.GetBooks().ToList();
            var rooms = service.GetRooms().ToList();
            var shelves = service.GetShelves().ToList();
            var bookSpaces = service.GetBookSpaces().ToList();
            var readers = service.GetReaders().ToList();
            var journal = service.GetJournal().ToList();

            return Json(new
            {
                rooms,
                books,
                shelves,
                bookSpaces,
                readers,
                journal
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllBooks()
        {
            var books = service.GetBooks().ToList();

            return Json(new
            {
                books
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllRooms()
        {
            var rooms = service.GetRooms().ToList();

            return Json(new
            {
                rooms
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveBook(Book item)
        {
            service.Update(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveRoom(Room item)
        {
            service.Update(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveBookSpace(BookSpace item)
        {
            service.Update(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveReader(Reader item)
        {
            service.Update(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveShelve(Shelf item)
        {
            service.Update(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveLog(Log item)
        {
            item.Date = DateTime.Now;
            service.Update(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteRoom(Room item)
        {
            service.Delete(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteLog(Log item)
        {
            service.Delete(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteReader(Reader item)
        {
            service.Delete(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteBookSpace(BookSpace item)
        {
            service.Delete(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteShelv(Shelf item)
        {
            service.Delete(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteEntity(object item)
        {
            try
            {
                if (item is Book)
                {
                    Book deleteBook = (Book)item;
                    service.Delete(deleteBook);
                }
                return Json("Success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
    }
}
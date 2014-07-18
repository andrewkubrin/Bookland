
function MyViewModel() {
    var self = this;
    self.books = ko.observableArray();
    self.rooms = ko.observableArray();
    self.bookSpaces = ko.observableArray();
    self.shelves = ko.observableArray();
    self.readers = ko.observableArray();
    self.journal = ko.observableArray();

    self.newRoomName = ko.observable("");
    self.newRoomId = ko.observable(0);

    self.bookName = ko.observable("");
    self.bookYear = ko.observable(2014);
    self.bookId = ko.observable(0);
    self.bookPages = ko.observable(0);
    self.bookAuthor = ko.observable("");
    self.shelve = ko.observable("");

    self.shelveRoom = ko.observable("");
    self.shelveBookSpace = ko.observable("");
    self.shelveId = ko.observable(0);


    self.newBookSpace = ko.observable(0);
    self.newBookSpaceId = ko.observable(0);
    self.newBookSpaceRoom = ko.observable();

    self.newShelve = ko.observable("");

    self.currentShelve = ko.observable();
    self.currentBook = ko.observable();
    self.currentReader = ko.observable();

    self.reCompute = ko.observable();
    self.shelveRoom = ko.observable();
    self.shelveSpace = ko.observable();

    self.selectedReader = ko.observable();

    self.createShelve = function () {
        self.currentShelve(new Shelf());
    };

    self.createBook = function () {
        self.currentBook(new Book());
    };

    self.createReader = function () {
        self.currentReader(new Reader());
    };

    self.currentShelveBookSpace = ko.computed(function () {
        self.reCompute();
        if (self.currentShelve != undefined && self.currentShelve() != undefined) {
            for (var i = 0; i < self.bookSpaces().length; i++) {
                if (self.bookSpaces()[i].Id() === self.currentShelve().BookSpaceId()) {
                    return self.bookSpaces()[i];
                }
            }
        }

        return null;
    });

    self.availableBookSpaces = ko.computed(function () {
        var currentBookSpaces = ko.observableArray();
        var currentBookSpace;
        if (self.shelveRoom() != undefined) {
            for (var i = 0; i < self.bookSpaces().length; i++) {
                if (self.bookSpaces()[i].RoomId() === self.shelveRoom().Id()) {
                    if (currentBookSpaces.length == 0 && self.currentShelve() != undefined) {
                        self.currentShelve().BookSpaceId(self.bookSpaces()[i].Id());
                    }
                    currentBookSpaces.push(self.bookSpaces()[i]);
                }
            }
            if (currentBookSpaces().length == 0 && self.currentShelve() != undefined) {
                self.currentShelve().BookSpaceId(0);
            }
            return currentBookSpaces();
        }
        if (self.currentShelve != undefined && self.currentShelve() != undefined) {
            for (var i = 0; i < self.bookSpaces().length; i++) {
                if (self.bookSpaces()[i].Id() === self.currentShelve().BookSpaceId()) {
                    currentBookSpace = self.bookSpaces()[i];
                    break;
                }
            }
            for (var i = 0; i < self.bookSpaces().length; i++) {
                if (self.bookSpaces()[i].RoomId() === currentBookSpace.RoomId()) {
                    currentBookSpaces.push(self.bookSpaces()[i]);
                }
            }
            return currentBookSpaces();
        }
        return self.bookSpaces();
    });

    self.removeBook = function (book) {
        $.ajax({
            type: "POST",
            url: "/Main/DeleteBook/",
            data: book
        }).done(function (data) {
            self.books.remove(book);
        }).error(function (ex) {
            alert('You can not delete this item. Maybe exist some related items to it. ');
        });
    };

    self.removeRoom = function (room) {
        if (room == undefined)
            return;
        $.ajax({
            type: "POST",
            url: "/Main/DeleteRoom/",
            data: room
        }).done(function (data) {
            self.rooms.remove(room);
        }).error(function (ex) {
            alert('You can not delete this item. Maybe exist some related items to it. ');
        });
    };

    self.removeBookSpace = function (bookSpace) {
        if (bookSpace == undefined)
            return;
        $.ajax({
            type: "POST",
            url: "/Main/DeleteBookSpace/",
            data: bookSpace
        }).done(function (data) {
            self.bookSpaces.remove(bookSpace);
        }).error(function (ex) {
            alert('You can not delete this item. Maybe exist some related items to it. ');
        });
    };

    self.removeShelv = function (shelv) {
        if (shelv == undefined)
            return;
        $.ajax({
            type: "POST",
            url: "/Main/DeleteShelv/",
            data: shelv
        }).done(function (data) {
            self.shelves.remove(shelv);
        }).error(function (ex) {
            alert('You can not delete this item. Maybe exist some related items to it. ');
        });
    };

    self.removeReader = function (reader) {
        $.ajax({
            type: "POST",
            url: "/Main/DeleteReader/",
            data: reader
        }).done(function (data) {
            self.readers.remove(reader);
        }).error(function (ex) {
            alert('You can not delete this item. Maybe exist some related items to it. ');
        });
    };

    self.removeJournal = function (log) {
        $.ajax({
            type: "POST",
            url: "/Main/DeleteLog/",
            data: log
        }).done(function (data) {
            self.journal.remove(log);
        }).error(function (ex) {
            alert('You can not delete this item. Maybe exist some related items to it. ');
        });
    };

    

    self.saveBook = function (book) {
        $.ajax({
            type: "POST",
            url: "/Main/SaveBook/",
            data: { id: book.Id(), name: book.Name(), year: book.Year(), pages: book.Pages(), author: book.Author(), shelfId: self.shelve().Id() }
        }).done(function (data) {
            self.bookId(0);
            self.bookName("");
            var newBook = ko.mapping.fromJS(data);
            var contains = false;
            for (var i = 0; i < self.books().length; i++) {
                if (self.books()[i].Id() === data.Id) {
                    self.books()[i] = newBook;
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                self.books.push(newBook);
            }
            self.viewMode(newBook, "book");
        }).error(function (ex) {
            alert('error ');
        });
    };

    self.getBookName = function (id) {
        for (var i = 0; i < self.books().length; i++) {
            if (self.books()[i].Id() === id) {
                return self.books()[i].Name();
            }
        }
    };

    self.getReaderFullName = function (id) {
        for (var i = 0; i < self.readers().length; i++) {
            if (self.readers()[i].Id() === id) {
                return self.readers()[i].Name() + " " + self.readers()[i].Family();
            }
        }
    };

    self.saveReader = function (reader) {
        $.ajax({
            type: "POST",
            url: "/Main/SaveReader/",
            data: { id: reader.Id(), name: reader.Name(), family: reader.Family() }
        }).done(function (data) {
            var newReader = ko.mapping.fromJS(data);
            self.currentReader(null);
            var contains = false;
            for (var i = 0; i < self.readers().length; i++) {
                if (self.readers()[i].Id() === data.Id) {
                    self.readers()[i] = newReader;
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                self.readers.push(newReader);
            }
        }).error(function (ex) {
            alert('error ');
        });
    };

    self.isInLibrary = function (id) {
        for (var i = 0; i < self.journal().length; i++) {
            if (self.journal()[i].BookId() === id) {
                return self.journal()[i].ReaderId();
            }
        }
        return 0;
    };

    self.getLogreader = function (id) {
        for (var i = 0; i < self.readers().length; i++) {
            if (self.readers()[i].Id() === id) {
                return self.readers()[i].Name() + ' ' + self.readers()[i].Family();
            }
        }
        return '';
    };

    self.saveLog = function (log) {
        $.ajax({
            type: "POST",
            url: "/Main/SaveLog/",
            data: { BookId: log.Id(), ReaderId: self.selectedReader().Id(), date: null }
        }).done(function (data) {
            var newLog = ko.mapping.fromJS(data);
            var contains = false;
            for (var i = 0; i < self.journal().length; i++) {
                if (self.journal()[i].BookId() === newLog.BookId() && self.journal()[i].ReaderId() === newLog.ReaderId()) {
                    self.journal()[i] = newLog;
                    contains = true;
                    break;
                }
            }
            log.dummy.notifySubscribers();
            if (!contains) {
                self.journal.push(newLog);
            }
        }).error(function (ex) {
            alert('error ');
        });
    };

    self.saveRoom = function (room) {
        if (room.Id != undefined) {
            self.newRoomName(room.Name());
            self.newRoomId(room.Id());
        }
        if (self.newRoomName() == "") {
            alert('You can not create room with empty name!');
            return;
        }
        $.ajax({
            type: "POST",
            url: "/Main/SaveRoom/",
            data: { Name: self.newRoomName(), Id: self.newRoomId() }
        }).done(function (data) {
            var newRoom = ko.mapping.fromJS(data);
            self.newRoomName("");
            self.newRoomId(0);
            var contains = false;
            for (var i = 0; i < self.rooms().length; i++) {
                if (self.rooms()[i].Id() === data.Id) {
                    self.rooms()[i] = newRoom;
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                self.rooms.push(newRoom);
            }
            self.viewMode(newRoom, "room");
        }).error(function (ex) {
            alert('error ');
        });
    };

    self.saveBookSpace = function (bookSpace) {
        if (bookSpace.Id != undefined) {
            self.newBookSpace(bookSpace.Number());
            self.newBookSpaceId(bookSpace.Id());
        }
        if (self.newBookSpace() == 0) {
            alert('You can not create Book space with empty number!');
            return;
        }
        $.ajax({
            type: "POST",
            url: "/Main/SaveBookSpace/",
            data: { Number: self.newBookSpace(), RoomId: self.newBookSpaceRoom().Id(), Id: self.newBookSpaceId() }
        }).done(function (data) {
            var bookSpace = ko.mapping.fromJS(data);
            self.newBookSpace("");
            self.newBookSpaceId(0);
            var contains = false;
            for (var i = 0; i < self.bookSpaces().length; i++) {
                if (self.bookSpaces()[i].Id() === bookSpace.Id()) {
                    self.bookSpaces()[i] = bookSpace;
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                self.bookSpaces.push(bookSpace);
            }
            self.viewMode(bookSpace, "bookspace");
        }).error(function (ex) {
            alert('error ');
        });
    };

    self.saveShelv = function (shelve) {
        if (shelve.Name() == "" || shelve.BookSpaceId() == 0 || self.shelveSpace() == undefined) {
            alert('You can not create Shelve space with empty name or Book space!');
            return;
        }
        shelve.BookSpaceId(self.shelveSpace().Id());

        $.ajax({
            type: "POST",
            url: "/Main/SaveShelve/",
            data: { Name: shelve.Name(), Id: shelve.Id(), BookSpaceId: shelve.BookSpaceId() }
        }).done(function (data) {
            var newShelf = ko.mapping.fromJS(data);
            var contains = false;
            for (var i = 0; i < self.shelves().length; i++) {
                if (self.shelves()[i].Id() === newShelf.Id()) {
                    self.shelves()[i] = newShelf;
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                self.shelves.push(newShelf);
            }
        }).error(function (ex) {
            alert('error ');
        });
    };

    self.getRoomBookStores = function (bookSpaceId) {
        var roomId;
        for (var i = 0; i < self.bookSpaces().length; i++) {
            if (self.bookSpaces()[i].Id() === bookSpaceId) {
                roomId = self.bookSpaces()[i].RoomId();
            }
        }
        var bookSpaces = ko.observableArray();
        for (var i = 0; i < self.bookSpaces().length; i++) {
            if (self.bookSpaces()[i].RoomId() === roomId) {
                bookSpaces.push(self.bookSpaces()[i]);
            }
        }
        return bookSpaces;
    };

    self.fillAvailableBookSpaces = function () {
        for (var i = 0; i < self.bookSpaces().length; i++) {
            if (self.bookSpaces()[i].RoomId() === self.shelveRoom().Id()) {
                if (self.availableBookSpaces().length == 0)
                    self.availableBookSpaces.push(self.bookSpaces()[i]);
            }
        }
    }

    self.editMode = function (item, prefix) {
        $('*[class^="edit"]').css("visibility", "hidden");
        $('*[class^="view"]').css("visibility", "visible");
        $('#' + prefix + ' .edit' + item.Id()).css("visibility", "visible");
        $('#' + prefix + ' .view' + item.Id()).css("visibility", "hidden");
    };

    self.viewMode = function (item, prefix) {
        $('#' + prefix + ' .edit' + item.Id()).css("visibility", "hidden");
        $('#' + prefix + ' .view' + item.Id()).css("visibility", "visible");
    };

    self.shelveName = function (id) {
        for (var i = 0; i < self.shelves().length; i++) {
            if (self.shelves()[i].Id() === id) {
                return "Shelve name: " + self.shelves()[i].Name() + " <br>Book space number: " + self.bookSpaceName(self.shelves()[i].BookSpaceId());
            }
        }
    };

    self.getShelve = function (id) {
        for (var i = 0; i < self.shelves().length; i++) {
            if (self.shelves()[i].Id() === id) {
                return self.shelves()[i];
            }
        }
    };

    self.getBookSpace = function (id) {
        for (var i = 0; i < self.bookSpaces().length; i++) {
            if (self.bookSpaces()[i].Id() === id) {
                return self.bookSpaces()[i];
            }
        }
    };

    self.getRoom = function (id) {
        for (var i = 0; i < self.rooms().length; i++) {
            if (self.rooms()[i].Id() === id) {
                return ko.observableArray([self.rooms()[i]]);
            }
        }
    };

    self.bookSpaceName = function (id) {
        for (var i = 0; i < self.bookSpaces().length; i++) {
            if (self.bookSpaces()[i].Id() === id) {
                return self.bookSpaces()[i].Number() + "<br>Room: " + self.roomName(self.bookSpaces()[i].RoomId());
            }
        }
    };

    self.roomName = function (id) {
        for (var i = 0; i < self.rooms().length; i++) {
            if (self.rooms()[i].Id() === id) {
                return self.rooms()[i].Name();
            }
        }
    };
}

var viewModel = new MyViewModel();
var done = false;
$.ajax({
    type: "GET",
    url: "/Main/GetAllData/",
}).done(function (data) {
    if (!done) {
        done = true;
        var myselect = document.getElementById("year");
        var pagesSelect = document.getElementById("pages");
        var year = new Date().getFullYear();

        gen(250, myselect, year);
        gen(2000, pagesSelect, 2010);

        ko.mapping.fromJS(data, {}, viewModel);
        viewModel.books = ko.observableArray();
        for (var i = 0; i < data.books.length; i++) {
            viewModel.books.push(new Book(data.books[i]))
        }
        ko.applyBindings(viewModel);

        if (viewModel.rooms().length > 0) {
            viewModel.shelveRoom(viewModel.rooms()[0]);
        }
    }
}).error(function (ex) {
    alert('error');
});

function gen(max, mySelect, startValue) {
    do {
        startValue--;
        mySelect.options.add(new Option(startValue, startValue));
        max--;
    } while (max > 0);
};

function show(id) {
    if ($('#' + id).css('display') != 'block')
        $('#' + id).css('display', 'block');
    else {
        $('#' + id).css('display', 'none');
    }
}

var Shelf = function () {
    var self = this;
    self.Id = ko.observable(0);sav
    self.Name = ko.observable("");
    self.BookSpaceId = ko.observable();
}

var Book = function (data) {
    var self = this;
    if (data == undefined)
        return;
    self.Id = ko.observable(data.Id);
    self.dummy = ko.observable();
    self.Name = ko.observable(data.Name);
    self.Author = ko.observable(data.Author);
    self.Year = ko.observable(data.Year);
    self.Pages = ko.observable(data.Pages);
    self.ShelfId = ko.observable(data.ShelfId);
    self.AssignedUser = ko.computed(function () {
        self.dummy();
        return viewModel.getLogreader(viewModel.isInLibrary(self.Id()));
    });
}

var Log = function () {
    var self = this;
    self.BookId = ko.observable(0);
    self.ReaderId = ko.observable(0);
    self.Date = ko.observable();
}

var Reader = function () {
    var self = this;
    self.Id = ko.observable(0);
    self.Name = ko.observable("");
    self.Family = ko.observable("");
}
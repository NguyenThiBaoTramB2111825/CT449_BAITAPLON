const Publishing = require("../models/Publishing")

// const Book = require("../models/Book")
// const BookService = require("../services/book.service")
// const bookService = new BookService();

const {ObjectId} = require("mongodb");
class PublishingService{
    extractPublishingData(payload){
        const contact={
            name: payload.name,
            address: payload.address,
            books: payload.books,
        };
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    extractPublishingCreateData(payload){
        const contact={
            name: payload.name,
            address: payload.address,
            books: payload.books,
        };
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    async create(payload){
        const {name,address,books} = this.extractPublishingCreateData(payload);

        const publishing = new Publishing({
            name: name,
            address: address,
            books: books
        });
        await publishing.save();

        return publishing;
    }
    async convertPublishing(payload){
        let contact = {
            id: payload.id,
            name: payload.name,
            address: payload.Book,
            books:payload.books
        }
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    async getAll() {
        let results = await Publishing.find({});
        return await Promise.all(results.map(async (publishing) => {
            return this.convertPublishing(publishing);
        }));
    }
    async getById(id) {
        const contact = await Publishing.findById(id);
        return this.convertPublishing(contact);
    }

    async update(id, payload) {
        const { name, address, books } = this.extractPublishingData(payload);
        return Publishing.findByIdAndUpdate(id, {
            name: name,
            address: address,
            books: books
        }, {new: true});
    }

    async delete(id) {
        await Book.updateMany({ publishing: id }, { publishing: null });
        return await Publishing.findByIdAndDelete(id);
    }

    async deleteAll() {
        return await Publishing.deleteMany({});
    }
}
module.exports = PublishingService

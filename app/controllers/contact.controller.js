const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { MongoGCPError } = require("mongodb");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

// exports.findAlll = (req, res) => {
//     res.send({message : "findAll handler"});
// };
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        }
        else {
            documents = await contactService.find({});
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
}



// exports.findOne = (req, res) => {
//     res.send({ message : "findOne handler"});
// };
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error retrieving contact with id= ${req.param.id}`")
        );
    }
};

// exports.update = (req, res) => {
//     res.send({message : "update handler"});
// };

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document =  contactService.update(req.params.id, req.body) ;
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, "An error updating contact with id= ${req.param.id}`")
        );
    }
};
// exports.delete = (req, res) => {
//     res.send({message : "delete handler"});
// };

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id) ;
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, "Could not delete contact with id= ${req.param.id}`")
        );
    }
};
// exports.deleteAll = (req, res) => {
//     res.send({message : "deleteAll handler"});
// };


exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({ message:`${deletedCount} contacts were deleted successfully` });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all caontacts")
        );
    }
}

// exports.findAllFavorite = (req, res) => {
//     res.send({message : "findAllFavorite handler"});
// };



exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite() ;
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrievin favorite contacts")
        );
    }
};
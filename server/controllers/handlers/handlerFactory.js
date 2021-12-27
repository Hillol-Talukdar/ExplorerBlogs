const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const APIFeatures = require("../../utils/apiFeatures");

exports.deleteOneById = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndRemove(req.params.id);

        if (!doc) {
            return next(new AppError("No document found with that id", 404));
        }

        res.status(200).json({
            status: "Success",
        });
    });

exports.deleteOneBySlug = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findOneAndRemove({ slug: req.params.slug });

        if (!doc) {
            return next(new AppError("No document found with that slug", 404));
        }

        res.status(200).json({
            status: "Success",
        });
    });

exports.updateOneById = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError("No document found with that id", 404));
        }

        res.status(200).json({
            status: "Success",
            data: doc,
        });
    });

exports.updateOneBySlug = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!doc) {
            return next(new AppError("No document found with that slug", 404));
        }

        res.status(200).json({
            status: "Success",
            data: doc,
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "Success",
            data: doc,
        });
    });

exports.getOneById = (Model, populateOpitons) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);

        if (populateOpitons) {
            query = query.populate(populateOpitons);
        }

        const doc = await query;

        if (!doc) {
            return next(new AppError("No document found with that id", 404));
        }

        res.status(200).json({
            status: "Success",
            data: doc,
        });
    });

exports.getOneBySlug = (Model, populateOpitons) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findOne({ slug: req.params.slug });

        if (populateOpitons) {
            query = query.populate(populateOpitons);
        }

        const doc = await query;

        if (!doc) {
            return next(new AppError("No document found with that slug", 404));
        }

        res.status(200).json({
            status: "Success",
            data: doc,
        });
    });

exports.getAll = (Model, filterOptions) =>
    catchAsync(async (req, res) => {
        let filter = { ...filterOptions };

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        // const doc = await features.query.explain();
        const doc = await features.query;

        res.status(200).json({
            status: "success",
            results: doc.length,
            data: doc,
        });
    });

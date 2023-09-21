const Service = require("./service");
const { sequelize } = require("../models");
const db = require("../models/");
const { Op } = require("sequelize");

class ProductService extends Service {
    static getProductById = async (req) => {
        try {
            const { productId } = req.params;

            const getProductData = await db.products.findOne({
                where: {
                    id: productId,
                },
            });

            if (!getProductData) {
                return this.handleError({
                    message: `Product with ID: ${productId} not Found!`,
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: `Product with ID: ${productId} Found!`,
                statusCode: 200,
                data: getProductData,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static filterProducts = async (query) => {
        try {
            const {
                _limit = 10,
                _page = 1,
                _sortBy = "product_price",
                _sortDir = "ASC",
                minPrice,
                maxPrice,
                minStock,
                maxStock,
                selectedCategory,
                searchProduct,
            } = query;

            delete query._limit;
            delete query._page;
            delete query._sortBy;
            delete query._sortDir;
            delete query.minPrice;
            delete query.maxPrice;
            delete query.minStock;
            delete query.maxStock;
            delete query.selectedCategory;
            delete query.searchProduct;

            const whereCategoryClause = {};

            let searchByNameClause = {};

            if (selectedCategory) {
                whereCategoryClause.products_categories_id = selectedCategory;
            }

            if (searchProduct) {
                searchByNameClause = {
                    product_name: {
                        [Op.like]: `%${searchProduct}%`,
                    },
                };
            }

            const findProducts = await db.products.findAndCountAll({
                where: {
                    ...query,
                    product_price: {
                        [Op.between]: [minPrice || 0, maxPrice || 999999999],
                    },
                    product_stock: {
                        [Op.between]: [minStock || 0, maxStock || 999999999],
                    },
                    ...whereCategoryClause,
                    ...searchByNameClause,
                },
                limit: _limit ? parseInt(_limit) : undefined,
                offset: (_page - 1) * _limit,
                distinct: true,
                order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
            });

            if (!findProducts.rows.length) {
                return this.handleError({
                    message: "No product found (Server Error)",
                    statusCode: 500,
                });
            }

            return this.handleSuccess({
                message: "Products Found",
                statusCode: 200,
                data: findProducts,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };
    
    static getAllProductCategories = async (req) => {
        try {
            const getProductCategoriesData = await db.products_categories.findAll()

            if (!getProductCategoriesData.length) {
                return this.handleError({
                    message: `No category found`,
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: `Product Categories found`,
                statusCode: 200,
                data: getProductCategoriesData,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };
}

module.exports = ProductService;

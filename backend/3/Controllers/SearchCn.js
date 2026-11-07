import { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import Category from "../Models/CategoryMd.js";
import Brand from "../Models/BrandMd.js";

export const Search = catchAsync(async (req, res, next) => {
  const {
    keyword = null,
    type = "nav",
    page = null,
    limit = null,
    sort = null,
  } = req.body;
  let sortBy = sort || "-createdAt";
  if (!keyword) {
    return next(new HandleERROR("Keyword is required", 400));
  }
  if (type == "nav") {
    const products = await Product.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .limit(5);
    const categories = await Category.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .limit(5);
    const brands = await Brand.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .limit(5);
    if (
      products.length === 0 &&
      categories.length === 0 &&
      brands.length === 0
    ) {
      return next(new HandleERROR("No results found", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        products,
        categories,
        brands,
      },
    });
  }


  const limitPage = limit || 5;
  const pageNum = page || 1;
  const skipPage = (pageNum - 1) * limitPage || 0;
  if (type === "all") {
    const products = await Product.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);
    const productsCount = await Product.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });
    const categories = await Category.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);

    const categoriesCount = await Category.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });
    const brands = await Brand.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);
    const brandsCount = await Brand.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });
    if (
      products.length === 0 &&
      categories.length === 0 &&
      brands.length === 0
    ) {
      return next(new HandleERROR("No results found", 404));
    }
    return res.status(200).json({
      success: true,
      results: products.length + categories.length + brands.length,
      data: {
        products,
        categories,
        brands,
      },
      counts: {
        products: productsCount,
        categories: categoriesCount,
        brands: brandsCount,
      },
    });
  }
  if (type === "products") {
    const products = await Product.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);
    if (products.length === 0) {
      return next(new HandleERROR("No results found", 404));
    }
    const productsCount = await Product.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });
    return res.status(200).json({
      success: true,
      results: products.length,
      data: products,
      counts: productsCount,
    });
  }
  if (type === "brands") {
    const brands = await Brand.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);
    if (brands.length === 0) {
      return next(new HandleERROR("No results found", 404));
    }
    const brandsCount = await Brand.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });
    return res.status(200).json({
      success: true,
      results: brands.length,
      data: brands,
      counts: brandsCount,
    });
  }
  if (type === "categories") {
    const categories = await Category.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);
    if (categories.length === 0) {
      return next(new HandleERROR("No results found", 404));
    }
    const categoriesCount = await Category.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });
    return res.status(200).json({
      success: true,
      results: categories.length,
      data: categories,
      counts: categoriesCount,
    });
  }
  return next(new HandleERROR("type invalid", 400));
});

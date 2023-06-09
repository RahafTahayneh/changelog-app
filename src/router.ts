import { Router } from "express";
import { body, oneOf } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getAllUpdatePoints,
  getUpdatePointById,
  updateUpdatePoint,
} from "./handlers/updatepoint";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 *  Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getProductById);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id", getUpdateById);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */

router.get("/updatepoint", getAllUpdatePoints);

router.get("/updatepoint/:id", getUpdatePointById);

router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  createUpdatePoint
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  updateUpdatePoint
);

router.delete("/updatepoint/:id", deleteUpdatePoint);

export default router;

import { Router } from "express";

import * as brandController from "./brand.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./brand.endpoints.rule.js";
import { multerMiddleHost } from "../../middlewares/multer.middleware.js";
import { allowedExtensions } from "../../utils/allowedExtentions.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import * as validator from "./brand.validation-Schema.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post(
  "/addBrand",
  auth(endPointsRoles.ADD_Brand),
  validationMiddleware(validator.addBrandSchema),
  multerMiddleHost({ extintions: allowedExtensions.images }).single("image"),
  expressAsyncHandler(brandController.addBrand)
);

router.delete(
  "/deleteBrand/:brandId",
  auth(endPointsRoles.ADD_Brand),
  validationMiddleware(validator.deleteBrandSchema),
  expressAsyncHandler(brandController.deleteBrand)
);

router.put(
  "/updateBrand",
  auth(endPointsRoles.ADD_Brand),
  validationMiddleware(validator.updateBrandSchema),
  multerMiddleHost({ extintions: allowedExtensions.images }).single("image"),
  expressAsyncHandler(brandController.updateBrand)
);

router.get(
  "/getBrands",
  auth(endPointsRoles.ALL_USERS),
  expressAsyncHandler(brandController.getBrands)
);

router.get(
  "/getBrandById/:brandId",
  auth(endPointsRoles.ALL_USERS),
  expressAsyncHandler(brandController.getBrandById)
);

router.get(
  "/getAllBrandsWithPagination",
  auth(endPointsRoles.ALL_USERS),
  expressAsyncHandler(brandController.getAllBrandsWithPagination)
);

export default router;

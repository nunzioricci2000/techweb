import restaurantService from "./restaurants.service.js";
import parseMultipart from "../../middleware/parse-multipart.js";
import checkAuth from "../../middleware/check-auth.js";
import validate from "../../middleware/validate.js";
import prune from "../../middleware/prune.js";
import { route } from "../../core/route.js";
import Joi from "joi";
import { logger } from "../../core/logger.js";

logger.debug("Loading Restaurants controller");

const name = Joi.string().min(2).max(50);
const description = Joi.string().min(10).max(500);
const latitude = Joi.number().min(-90).max(90);
const longitude = Joi.number().min(-180).max(180);

/**
 * Create a new restaurant
 */
route("post", "/restaurants", [
  checkAuth.required,
  parseMultipart.single("image"),
  validate(
    Joi.object({
      name: name.required(),
      description: description.required(),
      latitude: latitude.required(),
      longitude: longitude.required(),
    }),
  ),
  prune(
    Joi.object({
      id: Joi.number().required(),
      name: name.required(),
      description: description.required(),
      geolocation: Joi.object({
        latitude: latitude.required(),
        longitude: longitude.required(),
      }).required(),
      imageUrl: Joi.string(),
    }),
  ),
  async (ctx) => {
    logger.debug("Handling create restaurant request");
    logger.debug("Request body:", ctx.request.body);
    const { name, description, latitude, longitude } = ctx.request.body;
    /** @type {import("@koa/multer").File | undefined} */
    const image = ctx.request.file;
    if (!image) {
      logger.error("Image file is missing in the request");
      ctx.status = 400;
      ctx.body = { error: "Image file is required" };
      return;
    }
    const owner = ctx.state.user.id;
    /** @type {Omit<Restaurant, 'id'>} */
    const restaurantData = {
      name,
      description,
      geolocation: {
        latitude,
        longitude,
      },
      image: { data: image.buffer, format: image.mimetype },
      owner,
    };
    const restaurantId =
      await restaurantService.createRestaurant(restaurantData);
    const restaurant = {
      ...(await restaurantService.getRestaurantById(restaurantId)),
    };
    restaurant.imageUrl = `/restaurants/${restaurantId}/photo`;
    delete restaurant.image;
    ctx.status = 201;
    ctx.body = restaurant;
    logger.debug("Restaurant created:", restaurant);
  },
]);

route("get", "/restaurants/:id/photo", [
  async (ctx) => {
    ctx.body = { message: "Salve" };
  },
]);

logger.debug("Restaurants controller loaded");

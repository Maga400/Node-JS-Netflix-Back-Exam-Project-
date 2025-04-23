import express from "express";
import {
	getAllTvShows,
	getSimilarTvs,
	getTrendingTv,
	getTvDetails,
	getTvsByCategory,
	getTvShowGenres,
	getTvShowsByGenreName,
	getTvTrailers,
} from "../controllers/tv.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/allTvShows/:page", getAllTvShows);
router.get("/trending/:page", getTrendingTv);
router.get("/genres", protectRoute, getTvShowGenres);
router.get("/genresByName", protectRoute, getTvShowsByGenreName);
router.get("/:id/trailers", protectRoute, getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", protectRoute, getSimilarTvs);
router.get("/categories", protectRoute, getTvsByCategory);

export default router;

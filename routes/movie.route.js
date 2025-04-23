import express from "express";
import {
	getAllMovies,
	getMovieDetails,
	getMovieGenres,
	getMoviesByCategory,
	getMoviesByGenreName,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovies,
} from "../controllers/movie.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/allMovies/:page", getAllMovies);
router.get("/trending/:page", getTrendingMovies);
router.get("/genres", protectRoute, getMovieGenres);
router.get("/genresByName", protectRoute, getMoviesByGenreName);
router.get("/:id/trailers", protectRoute, getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", protectRoute, getSimilarMovies);
router.get("/categories", protectRoute, getMoviesByCategory);

export default router;

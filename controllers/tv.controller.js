import { fetchFromTMDB } from "../services/tmdb.service.js";

// export async function getTrendingTv(req, res) {
// 	try {
// 		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

// 		res.json({ success: true, content: data.results.slice(0, 10) });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

export async function getAllTvShows(req, res) {
  const { page } = req.params || 1;
  const { lang } = req.query;

  const perPage = 20;
  const pageNumber = parseInt(page) || 1; 
  const language = lang || "en-US";

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/discover/tv?language=${language}&page=${pageNumber}`
    );

    res.json({
      success: true,
      page: pageNumber,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      tvShows: data.results.slice(0, perPage),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTrendingTv(req, res) {
  const { page } = req.params || 1;
  const { lang,count } = req.query;

  const perPage = count || 10;
  const language = lang || "en-US";

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=${language}&page=${page}`
    );

    res.json({
      success: true,
      page: page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      tvShows: data.results.slice(0, perPage),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  const { lang } = req.query;
  const language = lang || "en-US";

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=${language}`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvDetails(req, res) {
  const { id } = req.params;
  const { lang } = req.query;
  const language = lang || "en-US";

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=${language}`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarTvs(req, res) {
  const { id } = req.params;
  const { lang } = req.query;
  const language = lang || "en-US";

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=${language}&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// export async function getTvsByCategory(req, res) {
// 	const { category } = req.params;
// 	try {
// 		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
// 		res.status(200).json({ success: true, content: data.results });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

export async function getTvsByCategory(req, res) {
  const { category, page,lang } = req.query;

  const perPage = 20;
  const language = lang || "en-US";

  const pageNumber = parseInt(page) || 1;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=${language}&page=${pageNumber}`
    );

    res.json({
      success: true,
      page: pageNumber,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      tvShows: data.results.slice(0, perPage),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvShowGenres(req, res) {
  const { lang } = req.query;
  const language = lang || "en-US";

  try {
    const tvShowsGenres = await fetchFromTMDB(
      `https://api.themoviedb.org/3/genre/tv/list?language=${language}`
    );
    res.status(200).json({ success: true, genres: tvShowsGenres.genres });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// export async function getTvShowsByGenreName(req, res) {
//   const { genreName } = req.params;

//   try {
//     const genresData = await fetchFromTMDB(
//       "https://api.themoviedb.org/3/genre/tv/list?language=en-US"
//     );
//     const genres = genresData.genres;

//     const genre = genres.find(
//       (g) => g.name.toLowerCase() === genreName.toLowerCase()
//     );

//     if (!genre) {
//       return res
//         .status(404)
//         .json({ success: false, message: `Genre '${genreName}' not found` });
//     }

//     const tvShowsData = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}&language=en-US&page=1`
//     );

//     res
//       .status(200)
//       .json({ success: true, genre: genre.name, tvShows: tvShowsData.results });
//   } catch (error) {
//     console.error("Error fetching movies by genre:", error.message);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Internal Server Error",
//         error: error.message,
//       });
//   }
// }

export async function getTvShowsByGenreName(req, res) { 
  const { genreName, page,lang } = req.query;

  const perPage = 20;
  const language = lang || "en-US";

  const pageNumber = parseInt(page) || 1;

  if (!genreName) {
    return res.status(400).json({ success: false, message: "Genre name is required" });
  }

  try {
    const genresData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/genre/tv/list?language=${language}`
    );
    const genres = genresData.genres;

    const genre = genres.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    );

    if (!genre) {
      return res
        .status(404)
        .json({ success: false, message: `Genre '${genreName}' not found` });
    }

    const tvShowsData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}&language=${language}&page=${pageNumber}`
    );

    res.status(200).json({ 
      success: true,
      genre: genre.name,
      page: pageNumber,
      totalPages: tvShowsData.total_pages,
      totalResults: tvShowsData.total_results,
      tvShows: tvShowsData.results.slice(0, perPage)
    });
  } catch (error) {
    console.error("Error fetching tv shows by genre:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
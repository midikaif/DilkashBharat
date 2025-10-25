const placesModel = require("../models/places.model");
const reviewsModel = require("../models/reviews.model");

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

async function showPlaces(req, res) {
  try {
    const searchQuery = req.query.q;

    // --- 1. HANDLE INITIAL SEARCH REQUEST (WITH QUERY) ---
    if (searchQuery) {

      // a. Perform the search
      const searchResults = await placesModel.find({
        title: { $regex: searchQuery, $options: "i" },
      });


      // b. Store the results and a flag in the session
      req.session.searchResults = searchResults;
      req.session.hasSearched = true;

      // c. REDIRECT to the clean URL /places
      // This initiates a new GET request to /places, which hits this function again
      return res.redirect("/places");
    }

    // --- 2. HANDLE REGULAR LOAD or REDIRECTED LOAD ---

    let placesToShow;
    let isSearchDisplay = false; // Flag for template logic if needed

    // Check if the session contains search results from the previous request
    if (req.session.hasSearched) {
     
      // a. Use the temporary search results
      placesToShow = req.session.searchResults;
      isSearchDisplay = true;

      // b. CLEAN UP the session data immediately after using it.
      // This ensures that the next refresh (F5) hits the 'else' block below.
      delete req.session.searchResults;
      delete req.session.hasSearched;
    } else {
      // This block runs on initial page load AND on any subsequent browser refresh (F5)
     
      // Fetch ALL places (by using an empty regex or omitting the filter)
      placesToShow = await placesModel.find({});
    }

    // Check if data was found (optional check, better handled by empty array)
    if (!placesToShow) {
      // Note: If no places are found, it's better to render an empty array
      // or an error page, rather than throwing a generic 'No Places found!'
      // especially if the search results were empty.
      placesToShow = [];
    }

    // Render the view with the determined set of places

    res.render("places/index", { allPlaces: placesToShow, isSearchDisplay });
  } catch (e) {
    console.error(e);
    // You might want to render an error page here
    // res.status(500).send("An error occurred.");
    req.flash("error", "An error occurred while fetching places.");
  }
}

async function singlePlace(req, res) {
  try {
    const place = await placesModel
      .findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    if (!place) {
      req.flash("error", "Couldn't find that place!");
      return res.redirect("/places");
    }
    res.render("places/show", { place });
  } catch (e) {
    console.log(e);
  }
}

function newPlaceForm(req, res) {
  res.render("places/add", { errors: null, formData: {} });
}

async function addNewPlace(req, res) {
  try {
    const geoData = await maptilerClient.geocoding.forward(
      req.body.place.location,
      { limit: 1 }
    );

    if (!geoData.features?.length) {
      req.flash(
        "error",
        "Could not geocode that location. Please try again and enter a valid location."
      );
      return res.redirect("/places/new");
    }

    if (geoData.features[0].properties.country_code !== "in") {
      req.flash("error", "Please enter a location within India.");
      return res.redirect("/places/new");
    }

    const place = new placesModel(req.body.place);

    place.geometry = geoData.features[0].geometry;
    place.location = geoData.features[0].place_name;
    place.author = req.user._id;
    place.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    await place.save();

    if (!place) {
      req.flash("error", "Couldn't add a new place!");
      return res.redirect("places");
    }

    req.flash("success", "Successfully added a new place!");
    res.redirect(`places/${place._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function showEditPlace(req, res) {
  try {
    const { id } = req.params;
    const place = await placesModel.findById(id);
    if (!place) {
      req.flash("error", "Can't find this place!");
      return res.redirect("places");
    }
    res.render("places/edit", { place });
  } catch (e) {
    console.log(e);
  }
}

async function editPlace(req, res) {
  try {
    const { id } = req.params;

    const geoData = await maptilerClient.geocoding.forward(
      req.body.place.location,
      { limit: 1 }
    );
    
    if (!geoData.features?.length) {
      req.flash(
        "error",
        "Could not geocode that location. Please try again and enter a valid location."
      );
      return res.redirect(`/places/${id}/edit`);
    }

    if (geoData.features[0]?.properties.country_code !== "in") {
      req.flash("error", "Please enter a location within India.");
      return res.redirect(`/places/${id}/edit`);
    }

    const updatedPlace = await placesModel.findByIdAndUpdate(id, {
      ...req.body.place,
    });

    updatedPlace.geometry = geoData.features[0].geometry;
    updatedPlace.location = geoData.features[0].place_name;

    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    updatedPlace.images.push(...images);
    await updatedPlace.save();

    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }

      await updatedPlace.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } },
      });
      console.log(updatedPlace);
    }

    if (!updatedPlace) {
      req.flash("error", "Can't update the place!");
      return res.redirect("places");
    }
    req.flash("success", "Successfully edited the place!");
    res.redirect(`/places/${updatedPlace._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function deletePlace(req, res) {
  await placesModel.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted the place!");
  res.redirect("/places");
}

module.exports = {
  showPlaces,
  singlePlace,
  newPlaceForm,
  addNewPlace,
  showEditPlace,
  editPlace,
  deletePlace,
};

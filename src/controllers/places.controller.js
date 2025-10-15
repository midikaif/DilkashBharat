const placesModel = require("../models/places.model");
const reviewsModel = require("../models/reviews.model");

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

async function showPlaces(req, res) {
  try {
    const allPlaces = await placesModel.find({});
    if (!allPlaces) {
      throw new Error("No Places found!");
    }

    res.render("places/index", { allPlaces });
  } catch (e) {
    console.log(e);
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
      throw new Error("Couldn't find the place!");
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
    // console.log(geoData, geoData.features[0].geometry);
    if (!geoData.features?.length) {
      req.flash(
        "error",
        "Could not geocode that location. Please try again and enter a valid location."
      );
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
    console.log(place);

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
    // console.log(geoData);
    if (!geoData.features?.length) {
      req.flash(
        "error",
        "Could not geocode that location. Please try again and enter a valid location."
      );
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

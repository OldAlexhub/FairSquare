import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import regions from "./regions.json";
import localities from "./locality.json";
import types from "./types.json";

const isNewOptions = [
  { label: "Yes 🆕", value: 1 },
  { label: "No 🧱", value: 0 },
];

function App() {
  const [form, setForm] = useState({
    area: "",
    rooms: "",
    baths: "",
    region: null,
    locality: null,
    type: null,
    is_new: null,
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSelect = (name, selected) =>
    setForm({ ...form, [name]: selected });

  const handleSubmit = async () => {
    const payload = {
      area: parseInt(form.area),
      rooms: parseInt(form.rooms),
      baths: parseInt(form.baths),
      region: form.region.value,
      locality: form.locality.value,
      type: form.type.value,
      is_new: form.is_new.value,
    };

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PYTHON_CODE}/predict`,
        payload
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert(
        "Oops! Something went wrong on the server. Please check the Flask logs for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <img
          src="https://cdn.prod.website-files.com/639018b31279b3258306183a/66fd10870434a15604b70913_657c298a3ef97607b3e1edf7_DALL%C2%B7E%202023-12-15%2011.09%201.jpg"
          alt="AI House"
          className="img-fluid mb-3"
          style={{ maxHeight: "400px", borderRadius: "1%" }}
        />
        <h2 className="mb-2">🏡 AI Property Price Predictor</h2>
        <p className="lead text-muted">
          Whether you're buying your dream home or just curious about your
          property's value, our intelligent system helps you evaluate real
          estate prices using the latest market data, AI-powered insights, and
          multilingual understanding. Instantly predict fair prices and explore
          similar listings. This tool empowers you to make informed decisions
          based on real data, not guesswork. 🧠📊
        </p>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="number"
            name="area"
            className="form-control"
            placeholder="Area (sqm)"
            value={form.area}
            onChange={handleInput}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            name="rooms"
            className="form-control"
            placeholder="Rooms"
            value={form.rooms}
            onChange={handleInput}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            name="baths"
            className="form-control"
            placeholder="Baths"
            value={form.baths}
            onChange={handleInput}
          />
        </div>
        <div className="col-md-4">
          <Select
            options={regions.map((r) => ({ label: r, value: r }))}
            placeholder="Select Region"
            onChange={(selected) => handleSelect("region", selected)}
          />
        </div>
        <div className="col-md-4">
          <Select
            options={localities.map((l) => ({ label: l, value: l }))}
            placeholder="Select Locality"
            onChange={(selected) => handleSelect("locality", selected)}
          />
        </div>
        <div className="col-md-4">
          <Select
            options={types.map((t) => ({ label: t, value: t }))}
            placeholder="Select Property Type"
            onChange={(selected) => handleSelect("type", selected)}
          />
        </div>
        <div className="col-md-4">
          <Select
            options={isNewOptions}
            placeholder="Is it New?"
            onChange={(selected) => handleSelect("is_new", selected)}
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Thinking... 🤖" : "Predict My Price 💸"}
          </button>
        </div>
      </div>

      {response && (
        <div className="mt-5 text-center">
          <h3 className="text-success">
            🎯 Predicted Price: {response.predicted_price.toLocaleString()} EGP
          </h3>
          <p className="text-muted">
            AI-powered prediction — no crystal ball, just smart data 🤓
          </p>

          {response.similar_listings?.length > 0 && (
            <>
              <h4 className="mt-4">🔍 Similar Listings:</h4>
              <div className="row row-cols-1 row-cols-md-5 g-4">
                {response.similar_listings.map((listing, idx) => (
                  <div key={idx} className="col">
                    <div className="card h-100 shadow-sm">
                      {listing.cover_image && (
                        <img
                          src={listing.cover_image}
                          className="card-img-top"
                          alt={listing.type}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                      )}
                      <div className="card-body">
                        <h6 className="card-title">{listing.type}</h6>
                        <p className="card-text">
                          📍 {listing.locality}, {listing.region}
                          <br />
                          📐 {listing.area} sqm
                          <br />
                          🛏️ {listing.rooms} | 🛁 {listing.baths}
                          <br />
                          💰 {Number(listing.price).toLocaleString()} EGP
                        </p>
                        {listing.latitude && listing.longitude && (
                          <a
                            href={`https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary mt-2"
                          >
                            🌍 View on Map
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <footer className="text-center mt-5 pt-4 border-top text-muted small">
        <p>
          © {new Date().getFullYear()} AI Property Predictor — Built with 💡 and
          🤖 by Mohamed Gad
        </p>
      </footer>
    </div>
  );
}

export default App;

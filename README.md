# 🏡 FairSquare — AI-Powered Property Price Predictor

FairSquare is an intelligent real estate price estimation web application that uses machine learning to predict property values based on real-world data scraped from the Egyptian market. It allows users to input property details and receive a fair price estimate, along with a curated list of similar listings.

---

## 🚀 Live Features

- 📊 **AI-based Price Prediction** using Random Forest and CatBoost
- 🗺️ **Map Integration** with real location coordinates
- 💡 **Smart Dropdowns** for Region, Locality, and Type (JSON-controlled)
- 🖼️ **Visual Suggestions** with cover images, pricing, and layout
- 🧠 **Model Explainability** through feature engineering and visualization
- 🤖 **Trained ML Model** served via Flask + `joblib`
- 🔁 **Local Server Hosting** (Home-based, secured)
- 🎨 **Bootstrap-Styled Frontend** with `ReactJS` + `Axios`

---

## 🧠 Tech Stack

| Frontend        | Backend         | ML & Data               | Deployment       |
| --------------- | --------------- | ----------------------- | ---------------- |
| ReactJS + Axios | Flask API       | RandomForest, CatBoost  | Home Server      |
| Bootstrap 5     | Python + Joblib | Pandas, Sklearn, Optuna | React Dev Server |

---

## 🧪 Example User Input

```json
{
  "area": 154,
  "rooms": 3,
  "baths": 2,
  "region": "القاهرة",
  "locality": "مدينة المستقبل",
  "type": "تاون هاوس",
  "is_new": 1
}
```

## 📈 ML Model Info

1. Trained on real estate listings scraped from Bayut Egypt
2. Predicts price using engineered features like:
3. Area, Rooms, Baths
4. Is New, Type, Locality
5. Custom spatial statistics
6. Enhanced via feature engineering: mean/std-based enrichments
7. Validation using R², RMSE, MAE

## 📍 Future Enhancements

- ✅ User accounts and login
- 📥 Export listings to PDF/CSV
- 📍 Landmark distance features
- 🌍 Google Maps Embed
- 🧠 Model interpretability dashboard (SHAP/ELI5)

## 📜 License

**_This project is built by Mohamed Gad and released for educational and non-commercial use._**
**_Built to democratize real estate intelligence through AI and market transparency._**

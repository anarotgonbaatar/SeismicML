# SeismicML: Earthquake Prediction

SeismicML is a full-stack machine learning application that predicts the mgnitude of earthquakes for a given location and date using jistorical USGS seismic data. It includes a React frontend, a Flask REST API backend, and a Random Forest model trained on preprocessed and augmented data.

# Setup Instructions

1. Backend setup

```
cd backend
pip install -r requirements.txt
py app.py
```

This API will run at `http://localhost:5000`.

2. Frontend Setup

```
npm install
npm start
```

The web app will be available at `http://localhost:3000`.

# Requirements

1. Python Backend
   - Flask
   - scikit-learn
   - pandas
   - numpy
   - pickle
2. JavaScript Frontend
   - React
   - Fetch API

# Authors

- Anar Otgonbaatar
- Adam Kaci

# Disclaimer

This project is for academic and demonstration purposes only. Not intended for real earthquake risk analysis.

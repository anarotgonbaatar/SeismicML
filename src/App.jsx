"use client"
import React, { useState } from "react"

function App() {
	const [ date, setDate ] = useState("")
	const [ location, setLocation ] = useState("")
	const [ predictionData, setPredictionData ] = useState( null )

	const handleSubmit = async ( e ) => {
		e.preventDefault()
		
		// Convert location to lat/lon coordinates using OpenCage Geocoder API
		const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
		const geoData = await geoRes.json()
		if ( geoData.length === 0 ) {
			alert("Location not found")
			return
		}
		const { lat, lon } = geoData[ 0 ]

		// Build input for backend
		const input = {
			date,
			latitude: parseFloat( lat ),
			longitude: parseFloat( lon ),
		}

		// Send input to backend
		const res = await fetch("http://localhost:5000/predict", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( input ),
		})
		const prediction = await res.json()
		setPredictionData({ ...input, ...prediction })
	}

	return (
		<div id="content">
			<h1>SeismicML</h1>
			<p className="subtitle">Earthquake Predictor</p>

			<form className="form" onSubmit={ handleSubmit }>
				{/* Location */}
				<label htmlFor="">Location</label>
				<input
					type="text"
					value={ location }
					onChange={(e) => setLocation( e.target.value )}
					className="input"
					aria-label="Location"
					placeholder="Fullerton"
					required
				/>
				{/* Date */}
				<label htmlFor="">Date</label>
				<input
					type="date"
					value={ date }
					onChange={(e) => setDate( e.target.value )}
					className="input"
					aria-label="Location"
					placeholder="01/01/2025"
					required
				/>
				{/* Submit Button */}
				<button type="submit" id="submit-btn">Predict</button>
			</form>

			{/* Predictions */}
			{ predictionData && (
				<div id="output">
					<div className="predictions">
						<h2>Predictions</h2>
						<p className="prediction">Magnitude: { predictionData.magnitude }</p>
						<p className="prediction">Confidence: { predictionData.confidence }</p>

						{/* Low confidence warning */}
						{ parseInt( predictionData.confidence ) < 60 && (
							<p className="warning">
								Low Confidence: predictions vary significantly between models.
							</p>
						)}
					</div>
					<div className="coordinates">
						<h3 className="coordinate">Coordinates:</h3>
						<p className="coordinate">Latitude: { predictionData.latitude }</p>
						<p className="coordinate">Longitude: { predictionData.longitude }</p>
					</div>
				</div>
			)}
			
			<div className="footer">
				<p>This website estimates the risk and likely magnitude range of potential earthquakes in a given area based on historical seismic activity, using machine learning models trained on USGS earthquake catalogs.</p>
				<p>Developed by Anar Otgonbaatar and Adam Kaci.</p>
			</div>
		</div>
	)
}

export default App
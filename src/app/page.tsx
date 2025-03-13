"use client"
import { useState } from "react"
import InputForm from "./components/InputForm"
import Predictions from "./components/Predictions"
import HeatMap from "./components/HeatMap"

export default function Home() {
	const [ predictionData, setPredictionData ] = useState( null )

	return (
		<div className="main">
			<h1>SeismicML</h1>
			<p className="subtitle">Earthquake Predictor</p>
			<InputForm setPredictionData={ setPredictionData }/>
			{ predictionData && <Predictions data={ predictionData }/> }
			<HeatMap/>
			<div className="footer">
				<p>This website estimates the risk and likely magnitude range of potential earthquakes in a given area based on historical seismic activity, using machine learning models trained on USGS earthquake catalogs.</p>
				<p>Developed by Anar Otgonbaatar and Adam Kaci.</p>
			</div>
		</div>
	)
}

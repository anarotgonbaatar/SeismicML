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
			<p className="footer">Developed by Anar Otgonbaatar and Adam Kaci.</p>
		</div>
	)
}

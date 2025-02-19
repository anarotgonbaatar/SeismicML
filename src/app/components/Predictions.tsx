"use client"

interface PredictionProps {
	data: {
		location: string
		date: string
		magniture: number
		confidence: number
	}
}

export default function Predictions({ data }: PredictionProps ) {
	return (
		<div>
			<h2>Prediction Result</h2>
			<p>Location: { data.location }</p>
			<p>Date: { data.date }</p>
			<p>Magniture: { data.location }</p>
			<p>Confidence: { data.location }</p>
		</div>
	)
}
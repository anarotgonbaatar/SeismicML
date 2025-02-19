"use client"

import { useState } from "react"

interface InputFormProps {
	setPredictionData: ( data: any ) => void
}

export default function InputForm( { setPredictionData }: InputFormProps ) {
	const [ date, setDate ] = useState("")
	const [ location, setLocation ] = useState("")
	const [ depth, setDepth ] = useState("surface")

	const handleSubmit = async ( e: React.FormEvent ) => {
		e.preventDefault()
		const inputData = { date, location, depth }
		
		// Placeholder for ML API call
		const mockPrediction = {
			location: location,
			latitude: 37,
		}

		setPredictionData( mockPrediction )
	}

	return (
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
				type="text"
				value={ location }
				onChange={(e) => setLocation( e.target.value )}
				className="input"
				aria-label="Location"
				placeholder="01/01/2025"
				required
			/>
			{/* Depth */}
			<label htmlFor="">Depth</label>
			<input
				type="text"
				value={ location }
				onChange={(e) => setLocation( e.target.value )}
				className="input"
				aria-label="Location"
				placeholder="10"
				required
			/>
		</form>
	)
}
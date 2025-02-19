"use client"

import { useEffect, useRef } from "react"

export default function HeatMap() {
	const mapRef = useRef<HTMLDivElement>( null )

	useEffect(() => {
		console.log("Heatmap will be implemented here")
	}, [])

	return (
		<div className="flex flex-col">
			<h2>Heatmap</h2>
			<p>Heat map placeholder</p>
		</div>
	)
}
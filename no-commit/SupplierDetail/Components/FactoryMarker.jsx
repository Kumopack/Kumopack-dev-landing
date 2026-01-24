import React, { useState, useRef, useEffect } from 'react'

const FactoryMarker = props => {
	const markerRef = useRef(null)
	const [Marker, setMarker] = useState(null)
	const [MarkerCustomIcon, setMarkerCustomIcon] = useState(null)

	useEffect(() => {
		import('leaflet').then(L => {
			const customIcon = new L.Icon({
				iconUrl: '/image/red-location-marker.svg',
				iconSize: [40, 40],
			})
			setMarkerCustomIcon(customIcon)

			import('react-leaflet').then(module => {
				setMarker(module.Marker)
			})
		})
	}, [])

	if (!MarkerCustomIcon || !Marker) {
		return null
	}

	return (
		<Marker
			ref={markerRef}
			draggable={false}
			position={props?.position ?? { lat: 13.736717, lng: 100.523186 }}
			icon={MarkerCustomIcon}></Marker>
	)
}

export default FactoryMarker

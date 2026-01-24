import React from 'react'

const FactoryCover = ({ img, logo, companyAddress }) => {
	return (
		<React.Fragment>
			<div className="position-relative border-kumopack-grey-200 card" style={{ height: '400px' }}>
				<img
					className="w-100 h-100"
					src={img ?? '/image/default-placeholder.png'}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/image/default-placeholder.png'
					}}
					alt="Factory"
					style={{ objectFit: 'cover', borderRadius: '8px', filter: 'brightness(70%)' }}
				/>

				{/* Profile Picture */}
				<div
					className="position-absolute cursor-pointer d-none d-xl-block"
					style={{ bottom: -40, left: '20px', width: '100px', height: '100px' }}>
					<img
						className="w-100 h-100"
						src={logo ?? '/image/default-placeholder.png'}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/image/default-placeholder.png'
						}}
						alt="Factory Profile"
						style={{ borderRadius: '50%', objectFit: 'cover' }}
					/>
				</div>

				{/* Detail */}
				<div className="position-absolute fs-5" style={{ bottom: '20px', right: '20px' }}>
					{/* <span className="fw-bold text-kumopack-base-white me-2 d-block d-xl-inline-block">
						Baht 999,000
					</span>
					<span className="text-kumopack-base-white me-2 ">Customer Orders</span>
					<span className="fw-bold text-kumopack-base-white me-4">88</span> */}

					{/* <span className="text-kumopack-base-white d-block d-xl-inline-block">
						<img className="me-1" src={'/image/icons/marker-pin-02.svg'} alt="Marker Pin Icon" />
						{String(companyAddress).length > 0 ? companyAddress : 'No Address'}
					</span> */}
				</div>
			</div>
		</React.Fragment>
	)
}

export default FactoryCover

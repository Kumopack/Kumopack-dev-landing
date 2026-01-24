import React from 'react'
import { useRouter } from 'next/router'
import { Tooltip } from 'react-tooltip'

const FactoryFeatureChip = ({ idx, icon, nameEn, nameTh, ...props }) => {
	const router = useRouter()
	const currentLanguage = router.locale

	return (
		<React.Fragment>
			<div
				id={`factory-feature-chip-${idx}`}
				className="bg-kumopack-grey-100 d-flex align-items-center justify-content-center fw-bold fs-4 rounded-circle overflow-hidden shadow cursor-pointer"
				style={{ borderRadius: '50%', width: '40px', height: '40px' }}>
				<img
					src={icon ?? '/image/default-placeholder.png'}
					onError={e => {
						e.target.src = '/image/default-placeholder.png'
						e.target.onerror = null
					}}
					alt="Feature Chip"
					className="w-100 h-100"
				/>
			</div>

			<Tooltip anchorSelect={`#factory-feature-chip-${idx}`}>
				{currentLanguage === 'en' ? nameEn : nameTh}
			</Tooltip>
		</React.Fragment>
	)
}

export default FactoryFeatureChip

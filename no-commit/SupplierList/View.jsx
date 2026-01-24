import React from 'react'
import Head from 'next/head'
import MainContainer from '~sections/it/ContentOne/style'
import { PageWrapper } from '~components/Core'

import { SkeletonFullWidthWithContent } from '~presentation-components/Loading/Skeleton'
import Select, { components } from 'react-select'
import KumopackNavbarButton from '~presentation-components/KumopackNavbarButton'
import CreateableSelect from 'react-select/creatable'
import LongHorizontalFactory from '~presentation-components/Factory/LongHorizontal'
import NormalFactory from '~presentation-components/Factory/Normal'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const header = {
	headerClasses:
		'site-header site-header--menu-start light-header site-header--sticky mobile-sticky-enable',
	buttonBlock: <KumopackNavbarButton />,
	showHeader: true,
	showFooter: true,
}

const SupplierListView = () => {
	const {
		currentUrl,
		currentLanguage,
		preFilterState,
		filter,
		changePreFilterState,
		isLoading,
		isLoadingOptions,
		currentViewStyle,
		setCurrentViewStyle,
		data,
		totalItems,
		provincesOptions,
		featuresOptions,
		reviewOptions,
		prevPage,
		nextPage,
		goToPage,
		currentPage,
		totalPages,
		pageOptions,
		onCancelFilter,
		onSubmitFilter,
		onLike,
		onUnlike,
	} = useViewModel()

	return (
		<React.Fragment>
			<style jsx>{`
				section {
					padding-top: 5rem;
					margin-bottom: 5rem;
					padding-left: 5rem;
					padding-right: 5rem;
					background-color: #ffffff;
				}

				.filter-container {
					width: 20%;
				}

				.item:hover {
					transition: all 300ms ease;
					filter: brightness(0.9);
					cursor: pointer;
				}

				.item:active {
					transition: all 300ms ease;
					filter: brightness(0.8);
				}

				@media (max-width: 1198px) {
					section {
						padding-top: 3rem;
						padding-left: 0.5rem;
						padding-right: 0.5rem;
						margin-bottom: 3rem;
					}

					.filter-container {
						width: 100%;
					}
				}
			`}</style>

			<Head>
				<title>รายชื่อผู้ผลิตทั้งหมด | Kumopack</title>
				<meta property="og:url" content={currentUrl} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Supplier List | Kumopack" />
				<meta
					property="og:description"
					content="Kumopack is a platform that connects buyers and suppliers in the packaging industry. We provide a wide range of packaging products and services, including custom packaging, packaging design, and packaging materials."
				/>
				<meta property="og:image" content="/image/kumopack-logo/logo-text-horizontal-light.svg" />
			</Head>

			<PageWrapper headerConfig={header}>
				<MainContainer className="bg-kumopack-base-white">
					<section>
						{/* begin:: Header */}
						<div className="row">
							<div className="col">
								<div
									className="d-flex flex-column flex-xl-row justify-content-xl-between align-items-xl-center mb-5"
									style={{ gap: '12px' }}>
									<div>
										<h4 className="text-kumopack-grey-900">
											{totalItems} Factories In Our Platform
										</h4>
										<h4 className="text-kumopack-grey-500 fw-normal">Explore our suppliers</h4>
									</div>

									<div className="text-end">
										{/* <button
									className="btn btn-sm btn-kumopack-primary-600 text-white w-100 fw-bold"
									style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
									{totalSelectedSupplier}/{totalSupplier} โรงงาน
									<img
										className="ms-2"
										src={'/image/icons/white-bar-chart-square-plus.svg'}
										alt="White Bar Chart Square Plus Icon"
									/>
								</button> */}

										<div id="supplier-result-pointer" />
									</div>
								</div>
							</div>
						</div>
						{/* end:: Header */}

						<div className="card border border-kumopack-grey-200">
							<div className="card-body">
								{/* begin:: Filter */}
								<div className="row mb-5 gy-5">
									<div className="col-12 col-lg-3">
										<Select
											isClearable
											isSearchable
											isLoading={isLoadingOptions}
											styles={{
												control: (baseStyles, state) => ({
													...baseStyles,
													border: state.isFocused ? '1px solid #b15fce' : '1px solid #e1e3ea',
													outline: 'none',
													boxShadow: 'none',
													'&:hover': {
														borderColor: '#b15fce',
													},
													'&:focus': {
														borderColor: '#b15fce',
													},
													'&:active': {
														borderColor: '#b15fce',
													},
												}),
											}}
											placeholder="จังหวัด"
											options={provincesOptions}
											value={
												provincesOptions.find(p => p.value === preFilterState.province) ?? null
											}
											onChange={selectedOption => {
												changePreFilterState('province', selectedOption?.value)
											}}
										/>
									</div>
									<div className="col-12 col-lg-3">
										<Select
											isSearchable
											styles={{
												control: (baseStyles, state) => ({
													...baseStyles,
													border: state.isFocused ? '1px solid #b15fce' : '1px solid #e1e3ea',
													outline: 'none',
													boxShadow: 'none',
													'&:hover': {
														borderColor: '#b15fce',
													},
													'&:focus': {
														borderColor: '#b15fce',
													},
													'&:active': {
														borderColor: '#b15fce',
													},
												}),
											}}
											placeholder="คะแนน"
											options={reviewOptions}
											value={reviewOptions.find(p => p.value === preFilterState.review) ?? null}
											onChange={selectedOption => {
												changePreFilterState('review', selectedOption?.value)
											}}
										/>
									</div>
									<div className="col-12 col-lg-3">
										<Select
											isSearchable
											styles={{
												control: (baseStyles, state) => ({
													...baseStyles,
													border: state.isFocused ? '1px solid #b15fce' : '1px solid #e1e3ea',
													outline: 'none',
													boxShadow: 'none',
													'&:hover': {
														borderColor: '#b15fce',
													},
													'&:focus': {
														borderColor: '#b15fce',
													},
													'&:active': {
														borderColor: '#b15fce',
													},
												}),
											}}
											placeholder="ระยะทาง"
											options={[
												{
													label: 'ทั้งหมด',
													value: 'all',
												},
												{
													label: '10 กิโลเมตร',
													value: 10,
												},
												{
													label: '20 กิโลเมตร',
													value: 20,
												},
												{
													label: '30 กิโลเมตร',
													value: 30,
												},
												{
													label: '40 กิโลเมตร',
													value: 40,
												},
												{
													label: '50 กิโลเมตร',
													value: 5,
												},
											]}
										/>
									</div>
									<div className="col-12 col-lg-3">
										<Select
											isSearchable
											isClearable
											styles={{
												control: (baseStyles, state) => ({
													...baseStyles,
													border: state.isFocused ? '1px solid #b15fce' : '1px solid #e1e3ea',
													outline: 'none',
													boxShadow: 'none',
													'&:hover': {
														borderColor: '#b15fce',
													},
													'&:focus': {
														borderColor: '#b15fce',
													},
													'&:active': {
														borderColor: '#b15fce',
													},
												}),
											}}
											placeholder="คุณสมบัติ"
											options={featuresOptions}
											getOptionLabel={option =>
												currentLanguage === 'en' ? option.namEn : option.nameTh
											}
											getOptionValue={option => parseInt(option.id)}
											components={{
												Option: props => {
													const findedFeature = featuresOptions.find(f => f.id === props.value)

													return (
														<components.Option {...props}>
															<div
																className="d-flex flex-row align-items-center"
																style={{ gap: '12px' }}>
																{findedFeature && (
																	<img
																		width={30}
																		height={30}
																		className="rounded-circle object-fit-cover"
																		src={
																			findedFeature?.featurePicturePath ??
																			'/image/default-placeholder.png'
																		}
																		onError={e => {
																			e.currentTarget.src = '/image/default-placeholder.png'
																			e.currentTarget.onerror = null
																		}}
																		alt={findedFeature?.namEn ?? 'All Optionn Item'}
																	/>
																)}
																<span>{props.label}</span>
															</div>
														</components.Option>
													)
												},
											}}
											value={
												featuresOptions.find(p => parseInt(p.id) === preFilterState.feature) ?? null
											}
											onChange={selectedOption => {
												changePreFilterState('feature', parseInt(selectedOption?.id))
											}}
										/>
									</div>
									{/* <div className="filter-container">
										<Select
											styles={{
												control: (baseStyles, state) => ({
													...baseStyles,
													border: state.isFocused ? '1px solid #b15fce' : '1px solid #e1e3ea',
													outline: 'none',
													boxShadow: 'none',
													'&:hover': {
														borderColor: '#b15fce',
													},
													'&:focus': {
														borderColor: '#b15fce',
													},
													'&:active': {
														borderColor: '#b15fce',
													},
												}),
											}}
											placeholder="โรงงานที่ถูกใจ"
											options={[
												{
													label: 'ทั้งหมด',
													value: 'all',
												},
											]}
										/>
									</div> */}

									<div className="col-12 col-xl-9 position-relative" id="">
										<CreateableSelect
											styles={{
												control: (baseStyles, state) => ({
													...baseStyles,
													border: state.isFocused ? '1px solid #b15fce' : '1px solid #e1e3ea',
													outline: 'none',
													boxShadow: 'none',
													'&:hover': {
														borderColor: '#b15fce',
													},
													'&:focus': {
														borderColor: '#b15fce',
													},
													'&:active': {
														borderColor: '#b15fce',
													},
												}),
											}}
											isMulti
											isSearchable
										/>

										{/* 							
							<img
								style={isMobileDevice() ? { left: '5%', top: '30%' } : { left: '2.5%', top: '30%' }}
								className="position-absolute"
								src={('/image/icons/search-lg-grey.svg')}
								alt="Search Icon"
								width={15}
								height={15}
							/> */}
									</div>

									<div className="col-12 col-xl-3 d-flex flex-row" style={{ gap: '12px' }}>
										<button
											type="button"
											className="btn btn-sm white-button fw-bold w-50"
											onClick={onCancelFilter}>
											Clear
										</button>
										<button
											type="button"
											className="btn btn-sm btn-kumopack-primary-600 fw-bold text-white w-50"
											onClick={onSubmitFilter}>
											Search
										</button>
									</div>
								</div>
								{/* end:: Filter */}

								<div className="row gy-5">
									<div className="col-12">
										<div className="d-flex flex-row justify-content-end align-items-center">
											{/* <div className="text-kumopack-grey-500">เลือกโรงงาน</div> */}

											<div
												className="d-flex flex-row justify-content-center align-items-end"
												style={{ columnGap: '12px' }}>
												{/* <button
													// onClick={onViewInMap}
													className="btn btn-sm btn-kumopack-primary-600 text-kumopack-base-white fw-bold"
													style={{ whiteSpace: 'nowrap' }}>
													<img
														className="me-1"
														src={'/image/icons/marker-pin-02.svg'}
														alt="Marker Pin Icon"
													/>{' '}
													ดูในมุมมองแบบแผนที่
												</button> */}

												<div className="kumopack-button-group">
													<span className="me-2 text-kumopack-grey-500 fs-8">การจัดเรียง</span>
													<button
														className={clsx('cursor-pointer btn px-3 py-2 white-button left', {
															active: currentViewStyle === 'horizontal',
														})}
														onClick={() => setCurrentViewStyle('horizontal')}>
														<img
															src={'/image/icons/horizontal-button-group-base.svg'}
															alt="Horizontal Style"
															width={20}
															height={20}
														/>
													</button>
													<button
														className={clsx('cursor-pointer btn px-3 py-2 white-button right', {
															active: currentViewStyle === 'vertical',
														})}
														onClick={() => setCurrentViewStyle('vertical')}>
														<img
															src={'/image/icons/vertical-button-group-base.svg'}
															alt="Vertical Style"
															width={20}
															height={20}
														/>
													</button>
												</div>
											</div>
										</div>
									</div>

									{!isLoading && totalItems === 0 && (
										<div className="text-kumopack-grey-500 text-center fs-3 fw-bold py-20">
											ไม่พบ​ผู้ผลิต กรุณาค้นหาใหม่อีกครั้ง
										</div>
									)}

									{isLoading
										? [...Array(9)].map((_, i) => (
												<div
													className="d-block d-xl-none col-xl-4 col-12"
													key={`skeleton-supplier-card-${i}`}>
													<SkeletonFullWidthWithContent />
												</div>
										  ))
										: data.map((f, idx) => (
												<div
													className="d-block d-xl-none col-12 col-xl-4"
													key={`factory-item-${idx}`}>
													<NormalFactory {...f} onLike={onLike} onUnlike={onUnlike} />
												</div>
										  ))}

									{isLoading ? (
										[...Array(9)].map((_, i) => (
											<div
												className="d-none d-xl-block col-xl-4 col-12"
												key={`skeleton-supplier-card-${i}`}>
												<SkeletonFullWidthWithContent />
											</div>
										))
									) : (
										<>
											{currentViewStyle === 'vertical' ? (
												<React.Fragment>
													{data.map((f, idx) => (
														// <Link href={`/supplier/detail/${f?.slug}`} key={`factory-item-${idx}`}>
														<div
															className="d-none d-xl-block col-12 item"
															key={`factory-item-${idx}`}>
															<LongHorizontalFactory {...f} onLike={onLike} onUnlike={onUnlike} />
														</div>
														// </Link>
													))}
												</React.Fragment>
											) : (
												<React.Fragment>
													{data.map((f, idx) => (
														// <Link href={`/supplier/detail/${f?.slug}`} key={`factory-item-${idx}`}>
														<div className="d-none d-xl-block col-12 col-xl-4 item">
															<NormalFactory {...f} onLike={onLike} onUnlike={onUnlike} />
														</div>
														// </Link>
													))}
												</React.Fragment>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</section>

					{/* begin:: Pagination */}
					<section id="separator">
						<hr />
					</section>

					<section id="pagination">
						<div className="row align-items-center">
							<div className="col-2 text-start">
								<div
									className="btn btn-sm white-button text-kumopack-base-black  w-fit-content p-1 p-xl-2"
									onClick={prevPage}>
									<img
										className="me-xl-2 d-inline-block"
										src="/static/image/kumopack-news/arrow-left.svg"
										alt="Arrow Left Button"
									/>
									<div className="d-none d-xl-inline-block">Previous</div>
								</div>
							</div>
							<div className="col-8">
								<div className="d-none d-xl-flex flex-row text-center justify-content-center">
									{pageOptions.map((page, index) => (
										<div
											key={page + index.toString()}
											className={clsx(
												'transition-300 page cursor-pointer rounded-circle shadow me-2 hover-enabled',
												{
													'bg-kumopack-primary-400 text-kumopack-base-white fw-bold':
														parseInt(page) === parseInt(currentPage),
													'bg-kumopack-base-white text-kumopack-grey-700':
														parseInt(page) !== parseInt(currentPage),
												}
											)}
											style={{ width: '40px', height: '40px', lineHeight: '40px' }}
											onClick={() => {
												if (page !== '...') goToPage(page)
											}}>
											{page}
										</div>
									))}
								</div>

								<div
									className="d-block d-xl-none text-center text-kumopack-grey-700"
									style={{ fontSize: '14px' }}>
									Page {currentPage} of {totalPages}
								</div>
							</div>
							<div className="col-2 text-end">
								<div
									className="btn btn-sm white-button text-kumopack-base-black w-fit-content p-1 p-xl-2"
									onClick={nextPage}>
									<div className="d-none d-xl-inline-block">Next</div>
									<img
										className="ms-xl-2 d-inline-block"
										src="/static/image/kumopack-news/arrow-right.svg"
										alt="Arrow Right Button"
									/>
								</div>
							</div>
						</div>
					</section>
				</MainContainer>
			</PageWrapper>
		</React.Fragment>
	)
}

export default SupplierListView

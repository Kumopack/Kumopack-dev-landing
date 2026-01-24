import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import MainContainer from '~sections/it/ContentOne/style'
import { PageWrapper } from '~components/Core'

import Lightbox from 'yet-another-react-lightbox'
import KumopackNavbarButton from '~presentation-components/KumopackNavbarButton'
import { StarRating } from '~presentation-components/StarRating'
import FactoryCover from './Components/FactoryCover'
// import FactoryCategory from './Components/FactoryCategory'
// import FeatureFeatureChip from './Components/FactoryFeatureChip'
import FactoryMarker from './Components/FactoryMarker'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const header = {
	headerClasses:
		'site-header site-header--menu-start light-header site-header--sticky mobile-sticky-enable',
	buttonBlock: <KumopackNavbarButton />,
	showHeader: true,
	showFooter: true,
}

const SupplierDetailView = props => {
	const { data: serverRawData } = props
	const {
		currentUrl,
		data,
		currentLang,
		productIdx,
		isOpenLightBox,
		isLiked,
		handleCloseLightBox,
		handleOpenLightBox,
		onChat,
		onLike,
		onUnlike,
	} = useViewModel()

	const [MapContainer, setMapContainer] = useState(null)
	const [TileLayer, setTileLayer] = useState(null)

	useEffect(() => {
		import('react-leaflet').then(module => {
			setMapContainer(module.MapContainer)
			setTileLayer(module.TileLayer)
		})
	}, [])

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

				.leaflet-container {
					/* height: 100vh; */
					height: 300px !important;
				}

				.leaflet-popup-content {
					width: 100% !important;
					height: 100% !important;
				}

				@media (max-width: 1198px) {
					section {
						padding-top: 3rem;
						padding-left: 0.5rem;
						padding-right: 0.5rem;
						margin-bottom: 3rem;
					}
				}
			`}</style>

			<Head>
				<title>{serverRawData?.displayTitle} | Supplier Kumopack</title>
				<meta property="og:url" content={currentUrl} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={serverRawData?.displayTitle + ' | Supplier Kumopack'} />
				<meta property="og:description" content={serverRawData?.businessDescription ?? ''} />
				<meta
					property="og:image"
					content={
						serverRawData?.companyLogo
							? process.env.NEXT_PUBLIC_IMAGE_URL + '/' + serverRawData?.companyLogo
							: `${currentUrl}/image/default-placeholder.png`
					}
				/>
			</Head>

			<Lightbox
				index={productIdx}
				open={isOpenLightBox}
				close={handleCloseLightBox}
				slides={(data?.galleries ?? []).map((p, idx) => ({
					src: p.path,
					caption: `Gallery Image ${idx + 1}`,
				}))}
				styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .6)' } }}
			/>

			<PageWrapper headerConfig={header}>
				<MainContainer className="bg-kumopack-base-white">
					<section>
						<div className="card border-1px border-kumopack-grey-200 shadow">
							<div className="card-body">
								<div className="row gy-7">
									<div className="col-12 mb-xl-5">
										<FactoryCover
											img={
												data?.companyCard
													? process.env.NEXT_PUBLIC_IMAGE_URL + '/' + data?.companyCard
													: '/image/default-placeholder.png'
											}
											companyAddress={'Bangkok, Thailand'}
											logo={
												data?.companyLogo
													? process.env.NEXT_PUBLIC_IMAGE_URL + '/' + data?.companyLogo
													: '/image/default-placeholder.png'
											}
										/>
									</div>

									<div className="col-12">
										<div className="row gy-3">
											<div className="col-12">
												<div className="d-flex flex-row align-items-center" style={{ gap: '12px' }}>
													<div>
														<StarRating rating={4.6} />
													</div>
													<div className="text-kumopack-grey-900">
														({data?.reviewAmount ?? 0} รีวิว)
													</div>
												</div>
											</div>

											<div className="col-12 col-lg-9">
												<h1>{data?.displayTitle}</h1>
											</div>
											<div className="col-12 col-lg-3 text-lg-end">
												<button
													className={clsx(
														'btn white-button text-kumopack-grey-900 fw-bold py-2 px-4 me-2'
													)}
													onClick={() => {
														if (isLiked) {
															onUnlike()
														} else {
															onLike()
														}
													}}>
													<div style={{ width: 0, height: 25 }}></div>
													{isLiked ? (
														<img src={'/image/icons/red-heart.svg'} alt="Red Heart Icon" />
													) : (
														<img
															src={'/image/icons/purple-heart.svg'}
															alt="Transparent Heart Icon"
														/>
													)}
												</button>
												<button
													className="btn white-button text-kumopack-grey-900 fw-bold py-2 px-4"
													onClick={onChat}>
													<img
														src="/image/icons/ChatsCircle.svg"
														alt="Chats Circle"
														className="me-1"
														width={25}
														height={25}
													/>
													{currentLang === 'en' ? 'Chat' : 'แชท'}
												</button>
											</div>
										</div>
									</div>

									<div className="col-12 col-xl-3">
										<div className="fs-6 text-kumopack-grey-900 fw-bolder">
											<div className="row gy-3" style={{ fontSize: 14 }}>
												<div className="col-12">
													<span className="fw-normal text-kumopack-grey-400 mb-2">Location</span>
													<span className="fw-normal text-kumopack-grey-900">
														{String(data?.companyAddress).length > 0 ? data?.companyAddress : '-'}
													</span>
												</div>

												<div className="col-12">
													<span className="fw-normal text-kumopack-grey-400 mb-2 d-block">
														Website
													</span>
													<a
														className="fw-normal text-kumopack-primary-700 fw-bold text-decoration-underline cursor-pointer"
														href={data?.website ?? '#'}
														target="_blank"
														rel="noopener noreferrer"
														style={{ fontSize: 14 }}>
														{data?.website ?? '-'}
														{data?.website && (
															<img
																src="/image/icons/purple-arrow-up-right.svg"
																alt="Purple Arrow Up Right"
															/>
														)}
													</a>
												</div>

												<div className="col-12">
													<span className="fw-normal text-kumopack-grey-400 mb-2 d-block">
														Email
													</span>
													<a
														className="fw-normal text-kumopack-primary-700 fw-bold text-decoration-underline cursor-pointer"
														href={data?.email ? `mailto:${data?.email}` : '#'}
														target="_blank"
														rel="noopener noreferrer"
														style={{ fontSize: 14 }}>
														{data?.email ?? '-'}
														{data?.email && (
															<img
																src="/image/icons/purple-arrow-up-right.svg"
																alt="Purple Arrow Up Right"
															/>
														)}
													</a>
												</div>
											</div>
										</div>
									</div>

									<div className="col-12 col-xl-9">
										<div className="row gy-3">
											<div className="col-12">
												<p dangerouslySetInnerHTML={{ __html: data?.tagline ?? '' }}></p>
												<p
													dangerouslySetInnerHTML={{ __html: data?.businessDescription ?? '' }}></p>
											</div>
											<div className="col-12">
												<div className="row mb-5 g-5">
													{(data?.supplierFeatures ?? []).map((feature, idx) => {
														return (
															<div className="col-12 col-lg-6" key={`feature-card-${idx}`}>
																<div className="card shadow rounded-3 border-kumopack-grey-200 h-100">
																	<div className="card-body">
																		<div className="d-flex flex-row" style={{ gap: '12px' }}>
																			<div
																				id={`factory-feature-chip-${idx}`}
																				className="bg-kumopack-grey-100 d-flex align-items-center justify-content-center fw-bold fs-4 rounded-circle overflow-hidden shadow"
																				style={{ width: '40px', height: '40px' }}>
																				<img
																					src={
																						feature?.taxonomy?.featurePicturePath
																							? process.env.NEXT_PUBLIC_IMAGE_URL +
																							  '/' +
																							  feature?.taxonomy?.featurePicturePath
																							: '/image/default-placeholder.png'
																					}
																					onError={e => {
																						e.target.src = '/image/default-placeholder.png'
																						e.target.onerror = null
																					}}
																					alt="Feature Chip"
																					className="w-100"
																					style={{ maxWidth: '100%' }}
																				/>
																			</div>

																			<div className="w-75">
																				<div className="text-kumopack-grey-900 fw-bold">
																					{currentLang === 'en'
																						? feature?.taxonomy?.nameEn
																						: feature?.taxonomy?.nameTh}
																				</div>
																				<p
																					dangerouslySetInnerHTML={{
																						__html: feature?.taxonomy?.descriptionTh ?? '',
																					}}></p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														)
													})}
												</div>
											</div>
										</div>
									</div>

									<div className="col-12 col-xl-3">
										<div className="fs-6 text-kumopack-grey-900 fw-bolder">Factory Location</div>
									</div>
									<div className="col-12 col-xl-9">
										{/* <span className="text-kumopack-grey-600 mb-5">
											<img src="/image/icons/marker-pin-04.svg" alt="Marker Pin" className="me-2" />
											{String(data?.companyAddress).length > 0 ? data?.companyAddress : '-'}
										</span> */}

										<div
											className="card w-100 shadow border-1px border-kumopack-grey-200 overflow-hidden rounded-2 mb-5"
											style={{ height: '300px' }}>
											<div className="card-body p-0">
												{MapContainer && data?.latitude !== 0 && data?.latitude && (
													<MapContainer
														center={{
															lat: data?.latitude ?? 0,
															lng: data?.longitude ?? 0,
														}}
														zoom={13}
														scrollWheelZoom={true}
														dragging
														className="position-relative">
														{TileLayer && (
															<TileLayer
																attribution="@Copyright 2023 Kumopack"
																url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
															/>
														)}

														<FactoryMarker
															position={{
																lat: data?.latitude ?? 0,
																lng: data?.longitude ?? 0,
															}}
														/>
													</MapContainer>
												)}
											</div>
										</div>
									</div>

									<div className="col-12 col-xl-3">
										<div className="fs-6 text-kumopack-grey-900 fw-bolder">Gallery</div>
									</div>
									<div className="col-12 col-xl-9">
										<div className="row g-4 mb-5">
											{(data?.galleries ?? []).map((g, idx) => (
												<div
													key={`product-${idx}`}
													className="col-6 col-md-4 col-lg-3"
													onClick={() => handleOpenLightBox(idx)}
													style={{ cursor: 'pointer' }}>
													<div className="card border-1px border-kumopack-grey-200 shadow h-100 ">
														<div className="card-body p-3">
															<img
																src={g.path}
																onError={e => {
																	e.target.onerror = null
																	e.target.src = '/image/default-placeholder.png'
																}}
																alt={data?.displayTitle ?? ''}
																className="img-fluid"
																style={{ objectFit: 'contain' }}
															/>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* <div className="col-12 col-xl-4"> */}
									{/* Product Categories */}
									{/* <div className="fs-6 text-kumopack-grey-900 fw-bolder mb-5">
											Product Categories
										</div>

										{(data?.supplierProductCategories ?? []).map((category, idx) => (
											<FactoryCategory
												key={`product-categories-${idx}`}
												id={`product-categories-${category.id}`}
												title={
													currentLang === 'en'
														? category.productLine.nameEn
														: category.productLine.nameTh
												}
												lists={category.products.map(p =>
													currentLang === 'en' ? p?.product?.nameEn : p?.product?.nameTh
												)}
											/>
										))} */}
									{/* </div> */}
									<div className="col-12">
										{/* <div
											className="d-flex flex-row align-items-center mb-5"
											style={{ gap: '12px' }}>
											{(data?.supplierFeatures ?? []).map((feature, idx) => (
												<FeatureFeatureChip
													key={`feature-chip-${idx}`}
													idx={idx}
													icon={
														feature?.taxonomy?.featurePicturePath
															? process.env.NEXT_PUBLIC_IMAGE_URL +
															  '/' +
															  feature?.taxonomy?.featurePicturePath
															: '/image/default-placeholder.png'
													}
													nameEn={feature?.taxonomy?.nameEn}
													nameTh={feature?.taxonomy?.nameTh}
													{...feature}
												/>
											))}
										</div> */}

										{/* Products and Services */}
										{/* <div className="fs-6 text-kumopack-grey-900 fw-bolder mb-2">
											Products and Services
										</div>
										<div className="row gy-4 mb-5">
											{(data?.supplierProducts ?? []).map((product, idx) => (
												<div key={`product-${idx}`} className="col-6">
													{currentLang === 'en'
														? product?.product?.nameEn
														: product?.product?.nameTh}
												</div>
											))}
										</div> */}
									</div>
								</div>
							</div>
						</div>
					</section>
				</MainContainer>
			</PageWrapper>

			<style>{`
				.like-button {
					background: rgba(255, 255, 255, 0.5);
					border: 1px solid rgba(255, 255, 255, 0.6);
					backdrop-filter: blur(8px);
					border-radius: 8px;
				}
			`}</style>
		</React.Fragment>
	)
}

export default SupplierDetailView

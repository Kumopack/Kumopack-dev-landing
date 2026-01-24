import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSupplierStore } from '~store/Supplier'
import { useSupplierFavoriteStore } from '~store/SupplierFavorite'
import { useGeoStore } from '~store/Geo'
import { useSupplierFeaturesStore } from '~store/SupplierFeatures'
import { useCookies } from 'react-cookie'
import { shallow } from 'zustand/shallow'
import { debounce } from 'lodash'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const INITIAL_STATE_FILTER = {
	q: '',
	review: 'all',
	page: 1,
	province: 'all',
	feature: 'all',
}

const ViewModel = () => {
	const router = useRouter()
	const [cookies] = useCookies(['kumopack-buyer-access-token'])
	const accessToken = cookies['kumopack-buyer-access-token']
	const { q, page, province, review, feature } = router.query
	const currentLanguage = router.locale
	const {
		data: rawData,
		getAll,
		clearState,
	} = useSupplierStore(
		state => ({
			data: state.data,
			getAll: state.getAll,
			clearState: state.clearState,
		}),
		shallow
	)
	const { likedFactories, setLikedFactories, getAllLikedFactories, likeFactory, unlikeFactory } =
		useSupplierFavoriteStore(
			state => ({
				likedFactories: state.data,
				setLikedFactories: state.setData,
				getAllLikedFactories: state.getAll,
				likeFactory: state.like,
				unlikeFactory: state.unlike,
			}),
			shallow
		)

	const { totalItems } = useSupplierStore(state => ({
		totalItems: state.totalItems,
	}))
	const { provinces, getProvinces, clearStateGeo } = useGeoStore(state => ({
		provinces: state.provinces,
		getProvinces: state.getProvinces,
		clearStateGeo: state.clearState,
	}))
	const { features, getAllFeatures, clearStateFeatures } = useSupplierFeaturesStore(state => ({
		features: state.data,
		getAllFeatures: state.getAll,
		clearStateFeatures: state.clearState,
	}))

	const [currentViewStyle, setCurrentViewStyle] = useState('horizontal')
	const [isFetchSupplier, setIsFetchSupplier] = useState(false)
	const [hasFetchSupplier, setHasFetchSupplier] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingOptions, setIsLoadingOptions] = useState(false)

	const [preFilterState, setPreFilterState] = useState(INITIAL_STATE_FILTER)

	const totalPages = Math.ceil(totalItems / 9)
	const pageOptions = useMemo(() => {
		const options = []
		for (let i = 1; i <= totalPages; i++) {
			if (totalPages > 10 && (i < page - 2 || i > page + 2)) {
				continue
			}
			options.push(i)
		}
		return options
	}, [totalItems, page, totalPages])
	const data = rawData.map(item => {
		const isLiked = likedFactories.some(f => f?.uuId === item?.uuId)

		return {
			...item,
			like: isLiked,
			companyPictureCover: item?.companyPictureCover
				? process.env.NEXT_PUBLIC_IMAGE_URL + '/' + item.companyPictureCover
				: null,
			supplierFeatures: item?.supplierFeatures
				? item.supplierFeatures.map(f => {
						if (f?.taxonomy) {
							return {
								...f,
								taxonomy: {
									...f?.taxonomy,
									featurePicturePath: f?.taxonomy?.featurePicturePath
										? process.env.NEXT_PUBLIC_IMAGE_URL + '/' + f?.taxonomy?.featurePicturePath
										: null,
								},
							}
						}

						return f
				  })
				: [],
		}
	})
	const provincesOptions = useMemo(
		() =>
			provinces.map(p => ({
				label: currentLanguage === 'en' ? p.nameEn : p.nameTh,
				value: p.id,
			})),
		[provinces]
	)
	const featuresOptions = useMemo(
		() =>
			features.map(f => ({
				...f,
				featurePicturePath: f.featurePicturePath
					? process.env.NEXT_PUBLIC_IMAGE_URL + '/' + f.featurePicturePath
					: null,
			})),
		[features]
	)
	const reviewOptions = [
		{
			label: 'ทั้งหมด',
			value: 'all',
		},
		{
			label: '1 คะแนน',
			value: '1',
		},
		{
			label: '2 คะแนน',
			value: '2',
		},
		{
			label: '3 คะแนน',
			value: '3',
		},
		{
			label: '4 คะแนน',
			value: '4',
		},
		{
			label: '5 คะแนน',
			value: '5',
		},
	]

	const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

	const serializeFilter = () => {
		const result = { page: page, limit: 9 }

		if (q) {
			result.q = q
		}
		if (review && review !== 'all' && review !== '') {
			result.review = review
		}
		if (province && province !== 'all' && province !== '') {
			result.province = province
		}
		if (feature && feature !== 'all' && feature !== '') {
			result.feature = feature
		}

		// Object.keys(filter).forEach(key => {
		// 	if (filter[key] !== 'all' && filter[key] !== '') {
		// 		result[key] = filter[key]
		// 	}
		// })
		return result
	}

	const fetchFavorite = () => {
		if (accessToken) {
			getAllLikedFactories()
		}
	}

	const handleShowSignIn = () => {
		Swal.fire({
			icon: 'info',
			title: currentLanguage === 'en' ? 'Please sign in' : 'กรุณาเข้าสู่ระบบ',
			text:
				currentLanguage === 'en'
					? 'Sign in to proceed with the action'
					: 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ',
			cancelButtonText: currentLanguage === 'en' ? 'Cancel' : 'ยกเลิก',
			confirmButtonText: currentLanguage === 'en' ? 'Sign In' : 'เข้าสู่ระบบ',
			showCancelButton: true,
			showConfirmButton: true,
			customClass: {
				confirmButton: 'btn btn-kumopack-primary-600 text-kumopack-base-white',
				cancelButton: 'btn white-button text-kumopack-grey-900',
			},
		}).then(({ isConfirmed }) => {
			if (isConfirmed && typeof window !== 'undefined') {
				window.location.href = `${process.env.NEXT_PUBLIC_BUYER_SIGNIN_URL}?redirect=supplier-list`
			}
		})
	}

	const onLike = supplierUUID => {
		if (!accessToken) {
			handleShowSignIn()
			return
		}

		const original = likedFactories
		setLikedFactories(likedFactories.concat({ uuId: supplierUUID }))
		likeFactory(supplierUUID).then(({ success }) => {
			if (!success) {
				Swal.fire({
					icon: 'error',
					title: 'เพิ่มรายการโปรดไม่สำเร็จ',
					text: 'กรุณาลองใหม่อีกครั้ง',
					confirmButtonText: 'ตกลง',
					customClass: {
						confirmButton: 'btn btn-kumopack-primary-600 text-kumopack-base-white',
					},
				})
				setLikedFactories(original)
				toast.error(
					currentLanguage === 'en' ? 'Failed to add to favorite list' : 'เพิ่มรายการโปรดไม่สำเร็จ'
				)
			} else {
				toast.success(
					currentLanguage === 'en' ? 'Successfully added to favorite list' : 'เพิ่มรายการโปรดสำเร็จ'
				)
				getAllLikedFactories()
			}
		})
	}

	const onUnlike = supplierUUID => {
		if (!accessToken) {
			handleShowSignIn()
			return
		}

		const original = likedFactories
		setLikedFactories(likedFactories.filter(d => d.uuId !== supplierUUID))
		unlikeFactory(supplierUUID).then(({ success }) => {
			if (!success) {
				Swal.fire({
					icon: 'error',
					title: 'ลบรายการโปรดไม่สำเร็จ',
					text: 'กรุณาลองใหม่อีกครั้ง',
					confirmButtonText: 'ตกลง',
					customClass: {
						confirmButton: 'btn btn-kumopack-primary-600 text-kumopack-base-white',
					},
				})
				setLikedFactories(original)
				toast.error(
					currentLanguage === 'en' ? 'Failed to remove from favorite list' : 'ลบรายการโปรดไม่สำเร็จ'
				)
			} else {
				toast.success(
					currentLanguage === 'en'
						? 'Successfully removed from favorite list'
						: 'ลบรายการโปรดสำเร็จ'
				)
				getAllLikedFactories()
			}
		})
	}

	const fetchOptions = () => {
		setIsLoadingOptions(true)
		getProvinces().then(({ success, data }) => {
			if (!success) {
				toast.error(`Fetch options failed : ${data}`)
			} else {
				getAllFeatures().then(({ success, data }) => {
					if (!success) {
						toast.error(`Fetch options failed : ${data}`)
					} else {
						setIsLoadingOptions(false)
					}
				})
			}
		})
	}

	const fetchData = () => {
		if (!page) {
			return
		}

		setIsLoading(true)
		getAll(serializeFilter()).then(({ success, data }) => {
			if (!success) {
				toast.error(data)
			} else {
				setIsLoading(false)
			}
		})
	}

	const changePreFilterState = (name, value) => {
		setPreFilterState(prevState => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}

	const changeFilter = (name, filter) => {
		const existFilter = serializeFilter()

		if (name === 'province') {
			if (filter === undefined || filter === 'all' || filter === '') {
				router.replace(
					{
						pathname: '/supplier/list',
						query: { ...existFilter, page: page ?? 1 },
					},
					undefined,
					{ scroll: false }
				)
			} else {
				router.replace(
					{
						pathname: '/supplier/list',
						query: { ...existFilter, page: page ?? 1, province: filter },
					},
					undefined,
					{ scroll: false }
				)
			}
		} else if (name === 'q') {
			const query = {
				...existFilter,
				page: page,
				limit: 9,
			}

			if (filter && filter !== '') {
				query.q = filter
			}

			setIsLoading(true)
			getAll(query).then(({ success, data }) => {
				if (!success) {
					toast.error(data)
				} else {
					setIsLoading(false)
				}
			})
		} else if (name === 'review') {
			if (filter === undefined || filter === 'all' || filter === '') {
				router.replace(
					{
						pathname: '/supplier/list',
						query: { ...existFilter, page: page ?? 1 },
					},
					undefined,
					{ scroll: false }
				)
			} else {
				router.replace(
					{
						pathname: '/supplier/list',
						query: { ...existFilter, page: page ?? 1, review: filter },
					},
					undefined,
					{ scroll: false }
				)
			}
		} else if (name === 'feature') {
			if (filter === undefined || filter === 'all' || filter === '') {
				router.replace(
					{
						pathname: '/supplier/list',
						query: { ...existFilter, page: page ?? 1 },
					},
					undefined,
					{ scroll: false }
				)
			} else {
				router.replace(
					{
						pathname: '/supplier/list',
						query: { ...existFilter, page: page ?? 1, feature: filter },
					},
					undefined,
					{ scroll: false }
				)
			}
		}
	}

	const onChangeSearch = debounce(value => {
		changeFilter('q', value)
	}, 800)

	const onCancelFilter = () => {
		router.replace(
			{
				pathname: '/supplier/list',
				query: { page: 1 },
			},
			undefined,
			{ scroll: false }
		)
	}

	const onSubmitFilter = () => {
		const query = {
			page: 1,
		}

		if (
			preFilterState.province &&
			preFilterState.province !== 'all' &&
			preFilterState.province !== ''
		) {
			query.province = preFilterState.province
		}

		if (
			preFilterState.feature &&
			preFilterState.feature !== 'all' &&
			preFilterState.feature !== ''
		) {
			query.feature = preFilterState.feature
		}

		if (preFilterState.review && preFilterState.review !== 'all' && preFilterState.review !== '') {
			query.review = preFilterState.review
		}

		router.replace(
			{
				pathname: '/supplier/list',
				query: query,
			},
			undefined,
			{ scroll: false }
		)
	}

	const nextPage = () => {
		const hasNextPage = Math.ceil(totalItems / 9) > parseInt(page)
		if (hasNextPage) {
			const query = {
				page: parseInt(page) + 1,
			}

			router.replace(
				{
					pathname: '/supplier/list',
					query: query,
				},
				undefined,
				{ scroll: false }
			)
		}
	}

	const prevPage = () => {
		if (parseInt(page) > 1) {
			const query = {
				...serializeFilter(),
				page: parseInt(page) - 1,
			}

			router.replace(
				{
					pathname: '/supplier/list',
					query: query,
				},
				undefined,
				{ scroll: false }
			)
		}
	}

	const goToPage = page => {
		const query = { ...serializeFilter(), page }

		router.replace(
			{
				pathname: '/supplier/list',
				query: query,
			},
			undefined,
			{ scroll: false }
		)
	}

	const handleQueryParams = () => {
		if (router.isReady) {
			if (!page) {
				router.replace(
					{
						pathname: '/supplier/list',
						query: { page: 1 },
					},
					undefined,
					{ scroll: false }
				)
			} else {
				const newPreFilterState = {}

				if (router.query.q) {
					newPreFilterState.q = router.query.q
				}
				if (router.query.province) {
					newPreFilterState.province = parseInt(router.query.province)
				}
				if (router.query.feature) {
					newPreFilterState.feature = parseInt(router.query.feature)
				}
				if (router.query.review) {
					newPreFilterState.review = router.query.review
				}

				setPreFilterState(newPreFilterState)
			}
		}
	}

	useEffect(() => {
		fetchData()
	}, [page])

	useEffect(() => {
		fetchFavorite()
	}, [accessToken])

	useEffect(() => {
		fetchOptions()
	}, [])

	useEffect(() => {
		handleQueryParams()

		return () => {
			clearState()
			clearStateGeo()
			clearStateFeatures()
		}
	}, [])

	return {
		currentUrl,
		preFilterState,
		filter: {
			q: q,
			province: province,
			feature: feature,
			review: review,
		},
		changePreFilterState,
		currentLanguage,
		isLoading,
		isLoadingOptions,
		data: data,
		currentPage: page,
		prevPage,
		goToPage,
		nextPage,
		pageOptions,
		totalItems,
		totalPages,
		currentViewStyle,
		setCurrentViewStyle,
		provincesOptions,
		featuresOptions,
		reviewOptions,
		changeFilter,
		onChangeSearch,
		onCancelFilter,
		onSubmitFilter,
		onLike,
		onUnlike,
	}
}

export default ViewModel

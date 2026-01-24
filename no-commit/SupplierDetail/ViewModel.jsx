import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSupplierStore } from '~store/Supplier'
import { useCookies } from 'react-cookie'
import { useKumopackChat } from 'src/Hooks/useKumopackChat'
import { useSupplierFavoriteStore } from '~store/SupplierFavorite'
import { toast } from 'react-toastify'
import { shallow } from 'zustand/shallow'
import Swal from 'sweetalert2'

const ViewModel = () => {
	const [cookies] = useCookies(['kumopack-buyer-access-token'])
	const accessToken = cookies['kumopack-buyer-access-token']
	const { chatBuyerToSupplier } = useKumopackChat()
	const router = useRouter()
	const currentLang = router.locale
	const supplierSlug = router.query.slug
	const { rawData, getOne } = useSupplierStore(
		state => ({
			rawData: state.selected,
			getOne: state.getOne,
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
	const data = useMemo(() => {
		const result = rawData

		if (rawData?.supplierProductCategories && rawData?.supplierProducts) {
			result['supplierProductCategories'] = rawData.supplierProductCategories.map(category => {
				const filterProducts = rawData.supplierProducts.filter(
					product => parseInt(product.categoryId) === category.productLine.id
				)
				return {
					...category,
					products: filterProducts,
				}
			})
		}

		const galleries = []
		if (rawData?.galleryImages) {
			rawData.galleryImages.forEach(gallery => {
				galleries.push({
					...gallery,
					path: gallery.path
						? process.env.NEXT_PUBLIC_IMAGE_URL + '/' + gallery.path
						: '/image/default-placeholder.png',
				})
			})
		}

		result['galleries'] = galleries

		return result
	}, [rawData])

	const [isLoading, setIsLoading] = useState(true)
	const [isOpenLightBox, setIsOpenLightBox] = useState(false)
	const [productIdx, setProductIdx] = useState(0)

	const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

	const isLiked = useMemo(() => {
		if (likedFactories.length > 0) {
			return likedFactories.some(d => d.uuId === rawData?.uuId)
		}
		return false
	}, [likedFactories, rawData])

	const handleShowSignIn = () => {
		Swal.fire({
			icon: 'info',
			title: currentLang === 'en' ? 'Please sign in' : 'กรุณาเข้าสู่ระบบ',
			text:
				currentLang === 'en'
					? 'Sign in to proceed with the action'
					: 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ',
			cancelButtonText: currentLang === 'en' ? 'Cancel' : 'ยกเลิก',
			confirmButtonText: currentLang === 'en' ? 'Sign In' : 'เข้าสู่ระบบ',
			showCancelButton: true,
			showConfirmButton: true,
			customClass: {
				confirmButton: 'btn btn-kumopack-primary-600 text-kumopack-base-white',
				cancelButton: 'btn white-button text-kumopack-grey-900',
			},
		}).then(({ isConfirmed }) => {
			if (isConfirmed && typeof window !== 'undefined') {
				window.location.href = `${process.env.NEXT_PUBLIC_BUYER_SIGNIN_URL}?redirect=supplier-detail_${supplierSlug}`
			}
		})
	}

	const fetchData = () => {
		if (supplierSlug) {
			setIsLoading(true)
			getOne(supplierSlug).then(({ success, data }) => {
				if (!success) {
					toast.error(data)
				} else {
					setIsLoading(false)
				}
			})
		}
	}

	const handleOpenLightBox = imgIdx => {
		setProductIdx(imgIdx)
		setIsOpenLightBox(true)
	}

	const handleCloseLightBox = () => {
		setProductIdx(0)
		setIsOpenLightBox(false)
	}

	const onChat = () => {
		if (!accessToken) {
			handleShowSignIn()
			return
		} else {
			chatBuyerToSupplier(rawData?.uuId)
		}
	}

	const onLike = () => {
		if (!accessToken) {
			handleShowSignIn()
			return
		}

		const original = likedFactories
		setLikedFactories(likedFactories.concat({ uuId: rawData?.uuId }))
		likeFactory(rawData?.uuId).then(({ success }) => {
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
					currentLang === 'en' ? 'Failed to add to favorite list' : 'เพิ่มรายการโปรดไม่สำเร็จ'
				)
			} else {
				toast.success(
					currentLang === 'en' ? 'Successfully added to favorite list' : 'เพิ่มรายการโปรดสำเร็จ'
				)
				getAllLikedFactories()
			}
		})
	}

	const onUnlike = () => {
		if (!accessToken) {
			handleShowSignIn()
			return
		}

		const original = likedFactories
		setLikedFactories(likedFactories.filter(d => d.uuId !== rawData?.uuId))
		unlikeFactory(rawData?.uuId).then(({ success }) => {
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
					currentLang === 'en' ? 'Failed to remove from favorite list' : 'ลบรายการโปรดไม่สำเร็จ'
				)
			} else {
				toast.success(
					currentLang === 'en' ? 'Successfully removed from favorite list' : 'ลบรายการโปรดสำเร็จ'
				)
				getAllLikedFactories()
			}
		})
	}

	useEffect(() => {
		fetchData()
	}, [supplierSlug])

	return {
		currentUrl,
		isLoading,
		data,
		currentLang,
		isOpenLightBox,
		isLiked,
		productIdx,
		handleOpenLightBox,
		handleCloseLightBox,
		onChat,
		onLike,
		onUnlike,
	}
}

export default ViewModel

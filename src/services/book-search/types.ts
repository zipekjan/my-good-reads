export type Book = {
	kind: 'books#volume'
	id: string
	etag: string
	selfLink: string
	volumeInfo: {
		title: string
		authors?: string[]
		publisher?: string
		publishedDate?: string
		description?: string
		industryIdentifiers?: {
			type: string
			identifier: string
		}[]
		readingModes?: {
			text: boolean
			image: boolean
		}
		pageCount?: number
		printType?: string
		categories?: string[]
		maturityRating?: string
		allowAnonLogging?: boolean
		contentVersion?: string
		panelizationSummary?: {
			containsEpubBubbles: boolean
			containsImageBubbles: boolean
		}
		imageLinks?: {
			smallThumbnail: string
			thumbnail: string
		}
		language?: string
		previewLink?: string
		infoLink?: string
		canonicalVolumeLink?: string
	}
	saleInfo?: {
		country?: string
		saleability?: string
		isEbook?: boolean
		listPrice?: {
			amount: number
			currencyCode: string
		}
		retailPrice?: {
			amount: number
			currencyCode: string
		}
		buyLink?: string
		offers?: {
			finskyOfferType: number
			listPrice: {
				amountInMicros: number
				currencyCode: string
			}
			retailPrice: {
				amountInMicros: number
				currencyCode: string
			}
			giftable: boolean
		}[]
	}
}

export type Books = {
	kind: 'books#volumes'
	totalItems: number
	items?: Book[]
}

export enum TelegramMediaType {
	PHOTO = "photo",
	VIDEO = "video"
}

export interface ITelegramMediaOptions {
	/**
	 * http url to media
	 */
	media: string,
	/**
	 * Caption of media
	 */
	caption?: string,
	/**
	 * send Markdown or HTML in media caption
	 */
	parse_mode?: string
}

export interface ITelegramMediaPhotoOptions extends ITelegramMediaOptions {
	/**
	 * http url to media
	 */
	media: string,
	/**
	 * Caption of media
	 */
	caption?: string,
	/**
	 * send Markdown or HTML in media caption
	 */
	parse_mode?: string
}

export interface ITelegramMediaVideoOptions extends ITelegramMediaOptions {
	/**
	 * width of video
	 */
	width?: number;
	/**
	 * height of video
	 */
	height?: number;
	/**
	 * duration of video
	 */
	duration?: number;
	/**
	 * Whether video is streaming
	 */
	supports_streaming?: boolean;
}

export interface ITelegramMedia {
	readonly type: TelegramMediaType,
	media: string,
	caption?: string,
	parse_mode?: string
}

export class TelegramMediaPhoto implements ITelegramMedia {
	readonly type: TelegramMediaType;
	media: string;
	caption?: string;
	parse_mode?: string;

	constructor(options: ITelegramMediaPhotoOptions) {
		this.type = TelegramMediaType.PHOTO;
		this.media = options.media;
		this.caption = options.caption;
		this.parse_mode = options.parse_mode;
	}
}

export class TelegramMediaVideo implements ITelegramMedia {
	readonly type: TelegramMediaType;
	media: string;
	caption?: string;
	parse_mode?: string;
	width?: number;
	height?: number;
	duration?: number;
	supports_streaming?: boolean;

	constructor(options: ITelegramMediaVideoOptions) {
		this.type = TelegramMediaType.VIDEO;
		this.media = options.media;
		this.caption = options.caption;
		this.parse_mode = options.parse_mode;
		this.width = options.width;
		this.height = options.height;
		this.duration = options.duration;
		this.supports_streaming = options.supports_streaming;
	}
}
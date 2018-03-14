export interface VkPoolServerResponse {
	/**
	 * number of last event
	 */
	ts?: number,
	/**
	 * error code
	 */
	failed?: number,
	/**
	 * Array of updates
	 */
	updates?: VKEvent[]
}

export interface VKEvent {
	/**
	 * event type
	 */
	type: VKEventType,
	/**
	 *  object
	 */
	object: VKEventObject,
	/**
	 * group id, where the event
	 */
	group_id: number
}

interface VKEventObject {
}

export class VKWallPost implements VKEventObject {
	/**
	 * Post id on the wall
	 */
	id: number;
	/**
	 * Wall owner id
	 */
	owner_id: number;/**
	 * id of the author
	 */
	from_id: number;
	/**
	 * id of the administrator who posted the post
	 */
	created_by: number;
	/**
	 * date in unixtime
	 */
	date: number;
	/**
	 * type of post
	 */
	post_type: VKPostType;
	/**
	 * text of post
	 */
	text: string;
	/**
	 * whether post can be edited by current user
	 */
	can_edit: boolean;
	/**
	 * whether post can be deleted by current user
	 */
	can_delete: boolean;
	/**
	 * whether information is ads
	 */
	marked_as_ads: boolean;
	/**
	 * VK-comments object
	 */
	comments: VKCommentsObject;
	/**
	 * array with attachments
	 */
	attachments?: VKAttachment[]
}

interface VKCommentsObject {
	/**
	 * count of comments
	 */
	count: number
}

export class VKAttachment {
	/**
	 * type of attachment
	 */
	type: VKAttachmentType;

	photo?: IVKAttachmentObject;

	video?: IVKAttachmentObject;

	static getObject (attach: VKAttachment):IVKAttachmentObject {
		return attach[attach.type];
	}
}

export interface IVKAttachmentObject {
	/**
	 * id of attachment
	 */
	id: number;
	/**
	 * id of attachment's owner
	 */
	owner_id: number;
	/**
	 * date of upload attachment
	 */
	date: number;
}

export interface VKPhotoAttachmentOptions{
	/**
	 * id of attachment
	 */
	id: number;
	/**
	 * id of album contains photo
	 */
	album_id: number;
	/**
	 * id of attachment's owner
	 */
	owner_id: number;
	/**
	 * id of user who upload photo
	 */
	user_id: number;
	/**
	 * date of upload attachment
	 */
	date: number;
	/**
	 * description of photo
	 */
	text: string;
	/**
	 * url photo with size 75x75px
	 */
	photo_75?: string;
	/**
	 * url photo with size 130x130px
	 */
	photo_130?: string;
	/**
	 * url photo with size 604x604px
	 */
	photo_604?: string;
	/**
	 * url photo with size 807x807px
	 */
	photo_807?: string;
	/**
	 * url photo with size 1280x1024px
	 */
	photo_1280?: string;
	/**
	 * url photo with size 2560x2048px
	 */
	photo_2560?: string;
	/**
	 * width of original photo
	 */
	width?: number;
	/**
	 * height of original photo
	 */
	height?: number;
}

export class VKPhotoAttachment implements IVKAttachmentObject {
	id: number;
	album_id: number;
	owner_id: number;
	user_id: number;
	text: string;
	date: number;
	photo_75?: string;
	photo_130?: string;
	photo_604?: string;
	photo_807?: string;
	photo_1280?: string;
	photo_2560?: string;
	width?: number;
	height?: number;

	constructor(options: VKPhotoAttachmentOptions) {
		this.id = options.id;
		this.album_id = options.album_id;
		this.owner_id = options.owner_id;
		this.user_id = options.user_id;
		this.text = options.text;
		this.date = options.date;
		this.photo_75 = options.photo_75;
		this.photo_130 = options.photo_130;
		this.photo_604 = options.photo_604;
		this.photo_807 = options.photo_807;
		this.photo_1280 = options.photo_1280;
		this.photo_2560 = options.photo_2560;
		this.width = options.width;
		this.height = options.height;
	}

	static getLargestPhoto(attach: VKPhotoAttachment): string | null{
		return attach.photo_2560 || attach.photo_1280 || attach.photo_807 || attach.photo_604 || attach.photo_130 || attach.photo_75 || null;
	}
}

export interface VKVideoAttachmentOptions{
	/**
	 * id of attachment
	 */
	id: number;
	/**
	 * id of attachment's owner
	 */
	owner_id: number;
	/**
	 * date of upload attachment
	 */
	date: number;
	/**
	 * title of video
	 */
	title: string;
	/**
	 * description of video
	 */
	description: string;
	/**
	 * whether
	 */
	can_add: boolean;
	/**
	 * date of adding by user or group
	 */
	adding_date: number;
	/**
	 * duration of video in seconds
	 */
	duration: number;
	/**
	 * count of views
	 */
	views: number;
	/**
	 * count of comments
	 */
	comments: number;
	/**
	 * url preview of video 130x98px
	 */
	photo_130?: string;
	/**
	 * url preview of video 320x240px
	 */
	photo_320?: string;
	/**
	 * url preview of video 640x480px
	 */
	photo_640?: string;
	/**
	 * url preview of video 800x450px
	 */
	photo_800?: string;
	/**
	 * url of player
	 */
	player?: string;
	/**
	 * name of platform if video added from other site
	 */
	platform?: string;
	/**
	 * whether edit video
	 */
	can_edit?: boolean;
	/**
	 * whether video private
	 */
	is_private?: boolean;
	/**
	 * access key to video
	 */
	access_key?: string;
	/**
	 * whether video processing
	 */
	processing?: boolean;
	/**
	 * whether video is stream
	 */
	live?: boolean;
	/**
	 * whether stream coming soon
	 */
	upcoming?: boolean;
}
export class VKVideoAttachment implements IVKAttachmentObject {
	id: number;
	owner_id: number;
	date: number;
	title: string;
	description: string;
	can_add: boolean;
	adding_date: number;
	duration: number;
	views: number;
	comments: number;
	photo_130?: string;
	photo_320?: string;
	photo_640?: string;
	photo_800?: string;
	player?: string;
	platform?: string;
	can_edit?: boolean;
	is_private?: boolean;
	access_key?: string;
	processing?: boolean;
	live?: boolean;
	upcoming?: boolean;

	constructor(options: VKVideoAttachmentOptions) {
		this.id = options.id;
		this.owner_id = options.owner_id;
		this.date = options.date;
		this.title = options.title;
		this.description = options.description;
		this.can_add = options.can_add;
		this.adding_date = options.adding_date;
		this.duration = options.duration;
		this.views = options.views;
		this.comments = options.comments;
		this.photo_130 = options.photo_130;
		this.photo_320 = options.photo_320;
		this.photo_640 = options.photo_640;
		this.photo_800 = options.photo_800;
		this.player = options.player;
		this.platform = options.platform;
		this.can_edit = options.can_edit;
		this.is_private = options.is_private;
		this.access_key = options.access_key;
		this.processing = options.processing;
		this.live = options.live;
		this.upcoming = options.upcoming;
	}
}

export enum VKAttachmentType {
	PHOTO = 'photo',
	VIDEO = 'video',
	AUDIO = 'audio',
	DOCUMENT = 'doc',
	LINK = 'link',
	NOTE = 'note',
	POLL = 'poll',
	WIKI_PAGE = 'page',
	ALBUM = 'album',
	PHOTOS_LIST = 'photos_list',
	PRODUCT = 'market',
	PRODUCT_COLLECTION = 'market_album',
	STICKER = 'sticker'
}

enum VKPostType {
	POST = "post",
	COPY = "copy",
	REPLY = "reply",
	POSTPONE = "postpone",
	SUGGEST = "suggest"
}

export enum VKEventType{
	WALL_POST_NEW = "wall_post_new",
	WALL_REPOST = "wall_repost"
}
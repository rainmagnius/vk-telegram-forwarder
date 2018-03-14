import {VKApi, ConsoleLogger, BotsLongPollUpdatesProvider} from 'node-vk-sdk';
import * as TelegramBot from 'node-telegram-bot-api';
import config from "./config";
import {
	VKAttachment, VKAttachmentType, VKEvent, VKEventType, VKPhotoAttachment,
	VKVideoAttachment,
	VKWallPost
} from "./VKModels";
import {ITelegramMedia, TelegramMediaPhoto, TelegramMediaType} from "./TelegramModels";

let api = new VKApi({
	token: config.vk.group_token,
	logger: new ConsoleLogger()
});

let updatesProvider = new BotsLongPollUpdatesProvider(api, config.vk.group_id);

let bot = new TelegramBot(config.telegram.bot_token);

function convertVKAttachToTelegramMedia(attachments: VKAttachment[]): ITelegramMedia[] {
	let media: ITelegramMedia[] = [];
	attachments.forEach(att => {
		if (att.type == VKAttachmentType.PHOTO) {
			let photoAttach = VKAttachment.getObject(att) as VKPhotoAttachment;
			media.push(new TelegramMediaPhoto({
				media: VKPhotoAttachment.getLargestPhoto(photoAttach),
				caption: photoAttach.text
			}));
		}
		else if (att.type == VKAttachmentType.VIDEO) {
			let videoAttach = VKAttachment.getObject(att) as VKVideoAttachment;
		}
	});
	return media;
}

function forwardToTelegram(events: VKEvent[]) {
	for (let event of events) {
		if (event.type == VKEventType.WALL_POST_NEW || event.type == VKEventType.WALL_REPOST) {
			let post = event.object as VKWallPost;
			let telegramMedia: ITelegramMedia[] = [];
			if (post.attachments)
				telegramMedia = convertVKAttachToTelegramMedia(post.attachments);
			if (telegramMedia.length == 0 && post.text != "")
				bot.sendMessage(config.telegram.chat_id, post.text);
			if (telegramMedia.length == 1 && telegramMedia[0].type == TelegramMediaType.PHOTO)
				bot.sendPhoto(config.telegram.chat_id, telegramMedia[0].media, {caption: post.text});
			if (telegramMedia.length == 1 && telegramMedia[0].type == TelegramMediaType.VIDEO) {
			}
			if (telegramMedia.length > 1) {
				if (post.text) {
					telegramMedia.forEach(m => m.caption = '');
					telegramMedia[0].caption = post.text;
				}
				bot.sendMediaGroup(config.telegram.chat_id, telegramMedia);
			}
		}
	}
}

updatesProvider.getUpdates(updates => {
	forwardToTelegram(updates as VKEvent[]);
});
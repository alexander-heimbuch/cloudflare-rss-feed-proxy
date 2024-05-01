import * as feed from './feed';

const image = 'https://github.com/alexander-heimbuch/cloudflare-rss-feed-proxy/blob/main/assets/cover.jpg?raw=true';
const feedUrl = 'https://www.patreon.com/rss/maris_art?auth=LenZ3W71WcgUxpvZ12gxlxpyw4fotYQZ';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const result = await feed.parse(feedUrl);

		console.log(result.rss.channel['itunes:image']);
		result.rss.channel.image.url = image;
		result.rss.channel['itunes:image']['@_href'] = image;

		return new Response(feed.build(result), {
			headers: {
				"content-disposition": "filename=feed.rss",
				'content-type': 'application/rss+xml',
			},
		});
	},
};

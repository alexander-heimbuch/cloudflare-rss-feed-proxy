import * as feed from './feed';

const image = 'https://foo.bar';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const result = await feed.parse('https://www.patreon.com/rss/maris_art?auth=LenZ3W71WcgUxpvZ12gxlxpyw4fotYQZ');

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

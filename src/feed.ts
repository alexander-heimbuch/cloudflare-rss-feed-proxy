import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const parser = new XMLParser({
	ignoreAttributes: false,

});

const builder = new XMLBuilder({ ignoreAttributes: false });

export const parse = async (url: string) =>
	fetch(url)
		.then((result) => result.text())
		.then((content) => parser.parse(content));

export const build = (obj: any) => builder.build(obj);

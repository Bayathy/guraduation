import "./code.css";

import { codeToHtml } from "shiki";

export const CodeSample = async ({ example }: { example: string }) => {
	const code = await codeToHtml(example, {
		lang: "cpp",
		theme: "min-light",
	});
	return <div dangerouslySetInnerHTML={{ __html: code }} className="sample flex-1 overflow-auto" />;
};

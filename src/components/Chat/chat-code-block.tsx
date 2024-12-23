"use client";

import { Check, Copy } from "lucide-react";
import { ClassAttributes, HTMLAttributes, useEffect, useState } from "react";
import { ExtraProps } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Button } from "../ui/button";

export const ChatCodeBlock = ({
	children,
	...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement> & ExtraProps) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			setTimeout(() => {
				setCopied(false);
			}, 1000);
		}
	}, [copied]);

	if (!children || typeof children !== "object") {
		return <code {...props}>{children}</code>;
	}
	const childType = "type" in children ? children.type : "";
	if (childType !== "code") {
		return <code {...props}>{children}</code>;
	}

	const childProps = "props" in children ? children.props : {};
	const { className, children: code } = childProps;
	const language = className?.replace("language-", "");

	return (
		<div className="relative w-full max-w-full overflow-x-auto">
			<div className="absolute right-2 top-2">
				<Button
					variant="outline"
					size="icon"
					onClick={() => {
						navigator.clipboard.writeText(String(code));
						setCopied(true);
					}}
				>
					{copied ? <Check /> : <Copy />}
				</Button>
			</div>
			<SyntaxHighlighter language={language} style={dracula}>
				{String(code).replace(/\n$/, "")}
			</SyntaxHighlighter>
		</div>
	);
};

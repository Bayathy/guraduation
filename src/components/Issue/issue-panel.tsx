import { Issue } from "@prisma/client";

import { Card, CardContent } from "../ui/card";

export const IssuePanel = ({ issues }: { issues: Issue }) => {
	console.log(issues);
	return (
		<Card>
			<CardContent>{issues.category}</CardContent>
		</Card>
	);
};

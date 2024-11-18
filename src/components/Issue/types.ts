import { z } from "zod";

export const IssueCategorySchema = z.object({
	category: z.union([
		z.array(
			z.union([
				z.literal("Syntax Error"),
				z.literal("Logic Error"),
				z.literal("Concept Misunderstanding"),
				z.literal("Algorithm Design"),
				z.literal("Error/Warning Interpretation"),
				z.literal("Coding Style/Best Practice"),
			]),
		),
		z.literal("Other"),
	]),
});

export type IssueCategory = z.infer<typeof IssueCategorySchema>;
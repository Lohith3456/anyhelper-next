'use server';

/**
 * @fileOverview A dynamic pricing tool that suggests optimal pricing for service agents.
 *
 * - dynamicPricingTool - A function that suggests optimal pricing for services.
 * - DynamicPricingInput - The input type for the dynamicPricingTool function.
 * - DynamicPricingOutput - The return type for the dynamicPricingTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPricingInputSchema = z.object({
  serviceType: z.string().describe('The type of service offered (e.g., cleaning, plumbing).'),
  location: z.string().describe('The location where the service is provided.'),
  availability: z.string().describe('The service agent availability (e.g., part-time, full-time, specific hours).'),
  serviceComplexity: z.string().describe('The complexity of the service (e.g., basic, intermediate, advanced).'),
  agentRating: z.number().describe('The service agent rating (e.g. 4.5, 5).'),
});
export type DynamicPricingInput = z.infer<typeof DynamicPricingInputSchema>;

const DynamicPricingOutputSchema = z.object({
  suggestedPrice: z.number().describe('The suggested price for the service.'),
  reasoning: z.string().describe('The reasoning behind the suggested price.'),
});
export type DynamicPricingOutput = z.infer<typeof DynamicPricingOutputSchema>;

export async function dynamicPricingTool(input: DynamicPricingInput): Promise<DynamicPricingOutput> {
  return dynamicPricingToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicPricingToolPrompt',
  input: {schema: DynamicPricingInputSchema},
  output: {schema: DynamicPricingOutputSchema},
  prompt: `You are an expert pricing strategist for service professionals.

Based on the following information, suggest an optimal price for the service agent and explain your reasoning.

Service Type: {{{serviceType}}}
Location: {{{location}}}
Availability: {{{availability}}}
Service Complexity: {{{serviceComplexity}}}
Agent Rating: {{{agentRating}}}

Consider market demand, agent availability, service complexity, and agent rating when determining the price.

Output the suggested price as a number and provide a detailed explanation of your reasoning.
`,
});

const dynamicPricingToolFlow = ai.defineFlow(
  {
    name: 'dynamicPricingToolFlow',
    inputSchema: DynamicPricingInputSchema,
    outputSchema: DynamicPricingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

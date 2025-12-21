'use server';

/**
 * @fileOverview A flow for intelligently matching customers with service agents based on their request, skills, location, availability, and customer reviews.
 *
 * - intelligentServiceMatching - A function that handles the intelligent service matching process.
 * - IntelligentServiceMatchingInput - The input type for the intelligentServiceMatching function.
 * - IntelligentServiceMatchingOutput - The return type for the intelligentServiceMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentServiceMatchingInputSchema = z.object({
  requestDescription: z
    .string()
    .describe('The description of the service requested by the customer.'),
  customerLocation: z.string().describe('The current location of the customer.'),
  serviceType: z.string().describe('The type of service requested (e.g., cleaning, plumbing).'),
  availableTime: z.string().describe('The preferred time for the service.'),
});
export type IntelligentServiceMatchingInput = z.infer<
  typeof IntelligentServiceMatchingInputSchema
>;

const ServiceAgentSchema = z.object({
  agentId: z.string().describe('The unique identifier of the service agent.'),
  name: z.string().describe('The name of the service agent.'),
  skills: z.array(z.string()).describe('The skills of the service agent.'),
  location: z.string().describe('The current location of the service agent.'),
  availability: z.string().describe('The availability of the service agent.'),
  rating: z.number().describe('The average rating of the service agent.'),
  reviewCount: z.number().describe('The number of reviews for the service agent.'),
});

const IntelligentServiceMatchingOutputSchema = z.array(ServiceAgentSchema).describe(
  'A list of service agents that best match the customer request, sorted by suitability.'
);
export type IntelligentServiceMatchingOutput = z.infer<
  typeof IntelligentServiceMatchingOutputSchema
>;

export async function intelligentServiceMatching(
  input: IntelligentServiceMatchingInput
): Promise<IntelligentServiceMatchingOutput> {
  return intelligentServiceMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentServiceMatchingPrompt',
  input: {schema: IntelligentServiceMatchingInputSchema},
  output: {schema: IntelligentServiceMatchingOutputSchema},
  prompt: `You are an expert service matching agent. Given a customer's request description, their location, the service type they need, and their available time, you will return a list of service agents that best match their needs.

  Customer Request Description: {{{requestDescription}}}
  Customer Location: {{{customerLocation}}}
  Service Type: {{{serviceType}}}
  Available Time: {{{availableTime}}}

  Consider the service agent's skills, location, availability, rating, and number of reviews when determining the best matches. Sort the list by suitability, with the best matches appearing first.

  Return the service agents in a JSON format.
  `,
});

const intelligentServiceMatchingFlow = ai.defineFlow(
  {
    name: 'intelligentServiceMatchingFlow',
    inputSchema: IntelligentServiceMatchingInputSchema,
    outputSchema: IntelligentServiceMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

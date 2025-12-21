'use server';

/**
 * @fileOverview Implements the Smart Scheduling Assistant flow for AnyHelper Connect.
 *
 * - smartSchedulingAssistant - Automatically manages bookings and sends reminders to customers and service agents.
 * - SmartSchedulingAssistantInput - The input type for the smartSchedulingAssistant function.
 * - SmartSchedulingAssistantOutput - The return type for the smartSchedulingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSchedulingAssistantInputSchema = z.object({
  userType: z.enum(['customer', 'service_agent']).describe('The type of user: customer or service agent.'),
  userName: z.string().describe('The name of the user.'),
  bookingDetails: z.string().describe('Details of the booking, including date, time, service, and other relevant information.'),
});
export type SmartSchedulingAssistantInput = z.infer<typeof SmartSchedulingAssistantInputSchema>;

const SmartSchedulingAssistantOutputSchema = z.object({
  schedulingResult: z.string().describe('A message indicating the result of the scheduling attempt (e.g., success, conflict, etc.).'),
  reminderMessage: z.string().describe('The content of the reminder message to be sent to the user.'),
});
export type SmartSchedulingAssistantOutput = z.infer<typeof SmartSchedulingAssistantOutputSchema>;

export async function smartSchedulingAssistant(input: SmartSchedulingAssistantInput): Promise<SmartSchedulingAssistantOutput> {
  return smartSchedulingAssistantFlow(input);
}

const smartSchedulingAssistantPrompt = ai.definePrompt({
  name: 'smartSchedulingAssistantPrompt',
  input: {schema: SmartSchedulingAssistantInputSchema},
  output: {schema: SmartSchedulingAssistantOutputSchema},
  prompt: `You are a smart scheduling assistant for AnyHelper Connect.

You will receive booking details and user information, and then schedule bookings and send reminders accordingly to optimize schedules and reduce no-shows.  Consider any time conflicts or existing bookings for this user when making a new booking.

User Type: {{{userType}}}
User Name: {{{userName}}}
Booking Details: {{{bookingDetails}}}

Compose a schedulingResult message indicating if the scheduling was successful and a reminderMessage to send to the user.
The schedulingResult should indicate if the booking was successful and, if not, why it failed. The reminderMessage should be a clear and concise reminder of the booking details.  Be friendly and professional.
`,
});

const smartSchedulingAssistantFlow = ai.defineFlow(
  {
    name: 'smartSchedulingAssistantFlow',
    inputSchema: SmartSchedulingAssistantInputSchema,
    outputSchema: SmartSchedulingAssistantOutputSchema,
  },
  async input => {
    const {output} = await smartSchedulingAssistantPrompt(input);
    return output!;
  }
);

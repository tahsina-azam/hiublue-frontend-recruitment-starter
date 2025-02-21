import * as z from 'zod';

export interface Offer {
    id: number;
    user_name: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    type: string;
    status: 'accepted' | 'pending' | 'rejected' | string;
  }
  
  export interface OfferPaginationProps {
    totalItems: number;
    perPage: number;
    page: number;
    handlePageChange: (_: unknown, newPage: number) => void;
    handleRowsPerPageChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  }
  
  export const formSchema = z.object({
    plan_type: z.enum(['pay_as_you_go', 'monthly', 'yearly']),
    additions: z.array(z.enum(['refundable', 'on_demand', 'negotiable'])),
    user_id: z.number(),
    expired: z.string(),
    price: z.number().positive(),
  });
  
  export type FormData = z.infer<typeof formSchema>;
  
  export interface User {
    id: number;
    name: string;
  }
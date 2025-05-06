// components/transaction-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const transactionSchema = z.object({
  type: z.enum(["SALE", "EXPENSE", "PURCHASE", "REFUND"]),
  amount: z.number().positive(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  customerId: z.string().optional(),
  // Add more fields as needed
});

export function TransactionForm() {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "SALE",
      amount: 0,
      description: "",
    },
  });

   const [formData, setFormData] = useState({
     amount: "",
     type: "income",
     description: "",
   });

   const handleSubmit = async (e: { preventDefault: () => void; }) => {
     e.preventDefault();
     //await axios.post("/api/transactions", { ...formData, businessId: "123" });
     alert("Transaction recorded successfully!");
   };

  async function onSubmit(data: z.infer<typeof transactionSchema>) {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to create transaction");
      
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

  // Form implementation with shadcn UI components

  return (
    <form onSubmit={handleSubmit} className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Record Transaction</h2>
      <div className='mb-4'>
        <label className='block mb-2'>Amount</label>
        <input
          type='number'
          value={formData.amount}
          onChange={e => setFormData({ ...formData, amount: e.target.value })}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-2'>Type</label>
        <select
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
          className='w-full p-2 border rounded'
        >
          <option value='income'>Income</option>
          <option value='expense'>Expense</option>
        </select>
      </div>
      <div className='mb-4'>
        <label className='block mb-2'>Description</label>
        <input
          type='text'
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          className='w-full p-2 border rounded'
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Save
      </button>
    </form>
  );
}
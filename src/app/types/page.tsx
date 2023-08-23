"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object(
  {
    typeItem: z.string().email({
      message: "E-mail invalido"
    }).min(10, {
      message: "O mínimo deve ter 10 caracteres"
    })
  }
)

export default function Types() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeItem: "",
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>){
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
        <FormField
          control={form.control}
          name="typeItem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Item</FormLabel>
              <FormControl>
                <Input placeholder="Qual Tipo deseja cadastrar?" {...field} />
              </FormControl>            
              <FormMessage />
            </FormItem>
          )}
        />       
        <Button variant="outline" type="submit">Cadastrar</Button>
      </form>
    </Form>
  )
}
'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { User, ShoppingCart, Heart, Tags, AlertTriangle, BarChart2 } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().regex(/^$$\d{2}$$\s\d{5}-\d{4}$/, { message: "Telefone deve estar no formato (00) 00000-0000." }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres." }),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data de nascimento deve estar no formato YYYY-MM-DD." }),
  gender: z.enum(["male", "female", "other"], { required_error: "Por favor selecione um gênero." }),
  segment: z.string().min(1, { message: "Por favor selecione um segmento." }),
  preferences: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Você deve selecionar pelo menos uma preferência.",
  }),
  notes: z.string().max(500, { message: "As notas não podem exceder 500 caracteres." }).optional(),
})

export default function ProfessionalCustomerRegistration() {
  const [activeTab, setActiveTab] = useState("info")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      birthdate: "",
      gender: undefined,
      segment: "",
      preferences: [],
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the data to your backend
  }

  const mockPurchaseHistory = [
    { id: 1, date: "2023-05-15", product: "Laptop", amount: 1200 },
    { id: 2, date: "2023-06-02", product: "Smartphone", amount: 800 },
    { id: 3, date: "2023-07-10", product: "Headphones", amount: 150 },
    { id: 4, date: "2023-08-20", product: "Monitor", amount: 300 },
    { id: 5, date: "2023-09-05", product: "Keyboard", amount: 100 },
  ]

  /* const purchaseData = mockPurchaseHistory.map(purchase => ({
    date: purchase.date,
    amount: purchase.amount
  })) */

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Cadastro de Cliente</CardTitle>
        <CardDescription>Gerencie informações detalhadas do cliente, histórico de compras, preferências e segmentação.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="info" className="flex items-center justify-center">
              <User className="w-4 h-4 mr-2" />
              Informações
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Compras
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center justify-center">
              <Heart className="w-4 h-4 mr-2" />
              Preferências
            </TabsTrigger>
            <TabsTrigger value="segment" className="flex items-center justify-center">
              <Tags className="w-4 h-4 mr-2" />
              Segmento
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center justify-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              Análise
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="info">
                <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="birthdate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Nascimento</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Endereço completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3 mt-4">
                        <FormLabel>Gênero</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Masculino
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Feminino
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Outro
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Notas Adicionais</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Informações adicionais sobre o cliente" {...field} />
                        </FormControl>
                        <FormDescription>Máximo de 500 caracteres</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="purchases">
                <ScrollArea className="h-[500px] w-full rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPurchaseHistory.map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell>{purchase.id}</TableCell>
                          <TableCell>{purchase.date}</TableCell>
                          <TableCell>{purchase.product}</TableCell>
                          <TableCell className="text-right">R$ {purchase.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="preferences">
                <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                  <FormField
                    control={form.control}
                    name="preferences"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Preferências</FormLabel>
                          <FormDescription>
                            Selecione as preferências do cliente para personalizar ofertas e comunicações
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {['Eletrônicos', 'Moda', 'Casa e Decoração', 'Esportes', 'Livros', 'Viagens', 'Gastronomia', 'Tecnologia', 'Saúde e Bem-estar', 'Automóveis'].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="preferences"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="segment">
                <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                  <FormField
                    control={form.control}
                    name="segment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Segmento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um segmento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retail">Varejo</SelectItem>
                            <SelectItem value="wholesale">Atacado</SelectItem>
                            <SelectItem value="corporate">Corporativo</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                            <SelectItem value="international">Internacional</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Escolha o segmento que melhor se aplica ao cliente para estratégias de marketing e vendas personalizadas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Atenção</AlertTitle>
                    <AlertDescription>
                      A segmentação do cliente afeta diretamente as estratégias de marketing e vendas aplicadas. Certifique-se de escolher o segmento mais apropriado com base no perfil e histórico do cliente.
                    
                    </AlertDescription>
                  </Alert>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="analytics">
                <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                  <h3 className="text-lg font-semibold mb-4">Análise de Compras</h3>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Insights</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Total de compras: R$ {mockPurchaseHistory.reduce((sum, purchase) => sum + purchase.amount, 0).toFixed(2)}</li>
                      <li>Média de compras: R$ {(mockPurchaseHistory.reduce((sum, purchase) => sum + purchase.amount, 0) / mockPurchaseHistory.length).toFixed(2)}</li>
                      <li>Produto mais caro: {mockPurchaseHistory.reduce((max, purchase) => max.amount > purchase.amount ? max : purchase).product}</li>
                    </ul>
                  </div>
                </ScrollArea>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => form.reset()}>Cancelar</Button>
        <Button onClick={form.handleSubmit(onSubmit)}>Salvar Cliente</Button>
      </CardFooter>
    </Card>
  )
}
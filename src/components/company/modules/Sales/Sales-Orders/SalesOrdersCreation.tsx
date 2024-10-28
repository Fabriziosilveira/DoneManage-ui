"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus, Trash2, Printer, Mail, Save, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export default function SalesOrderCreation() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: Date.now(),
      product: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      total: 0
    }
    setOrderItems([...orderItems, newItem])
  }

  const removeOrderItem = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id))
  }

  const updateOrderItem = (id: number, field: keyof OrderItem, value: string | number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        updatedItem.total = (updatedItem.quantity * updatedItem.unitPrice) * (1 - updatedItem.discount / 100)
        return updatedItem
      }
      return item
    }))
  }

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast({
      title: "Pedido criado com sucesso",
      description: "O pedido foi salvo e enviado para aprovação.",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Criar Pedido de Venda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">Cliente 1</SelectItem>
                    <SelectItem value="client2">Cliente 2</SelectItem>
                    <SelectItem value="client3">Cliente 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderDate">Data do Pedido</Label>
                <Input type="date" id="orderDate" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Número do Pedido</Label>
                <Input type="text" id="orderNumber" value="PED-001" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Condições de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as condições" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">À vista</SelectItem>
                    <SelectItem value="30days">30 dias</SelectItem>
                    <SelectItem value="60days">60 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Prazo de Entrega</Label>
                <Input type="date" id="deliveryDate" />
              </div>
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <Label htmlFor="observations">Observações</Label>
                <Textarea id="observations" placeholder="Adicione observações sobre o pedido..." />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Itens do Pedido</h3>
                <Button type="button" onClick={addOrderItem} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Preço Unitário</TableHead>
                    <TableHead>Desconto (%)</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Select onValueChange={(value) => updateOrderItem(item.id, 'product', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o produto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product1">Produto 1</SelectItem>
                            <SelectItem value="product2">Produto 2</SelectItem>
                            <SelectItem value="product3">Produto 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateOrderItem(item.id, 'quantity', parseInt(e.target.value))}
                          min={1}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateOrderItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                          min={0}
                          step={0.01}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.discount}
                          onChange={(e) => updateOrderItem(item.id, 'discount', parseFloat(e.target.value))}
                          min={0}
                          max={100}
                        />
                      </TableCell>
                      <TableCell>R$ {item.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => removeOrderItem(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resumo do Pedido</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>Valor Total dos Itens:</div>
                <div className="text-right">R$ {calculateTotal().toFixed(2)}</div>
                <div>Descontos:</div>
                <div className="text-right">R$ {(calculateTotal() * 0.1).toFixed(2)}</div>
                <div>Valor Total do Pedido:</div>
                <div className="text-right font-semibold">R$ {(calculateTotal() * 0.9).toFixed(2)}</div>
                <div>Impostos:</div>
                <div className="text-right">R$ {(calculateTotal() * 0.9 * 0.18).toFixed(2)}</div>
                <div className="text-lg font-bold">Valor Total a Pagar:</div>
                <div className="text-right text-lg font-bold">R$ {(calculateTotal() * 0.9 * 1.18).toFixed(2)}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-end">
              <Button type="button" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Salvar Rascunho
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar para Aprovação
                  </>
                )}
              </Button>
              <Button type="button" variant="secondary">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button type="button" variant="secondary">
                <Mail className="w-4 h-4 mr-2" />
                Enviar por E-mail
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
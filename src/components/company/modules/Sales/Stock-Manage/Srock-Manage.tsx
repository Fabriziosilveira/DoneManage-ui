/*'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { Search, Filter, Package, AlertTriangle, Clock, Plus, CalendarIcon, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Tipos
type Produto = {
  id: number
  codigo: string
  descricao: string
  quantidade: number
  valor: number
  validade: string
  localizacao: string
  categoria: string
  fornecedor: string
}

type Filters = {
  categoria: string
  fornecedor: string
  localizacao: string
  validadeMin: Date | null
  validadeMax: Date | null
  quantidadeMin: string
  quantidadeMax: string
}

// DatePicker component
const DatePicker = ({ selected, onSelect, className }: { selected: Date | null, onSelect: (date: Date | null) => void, className?: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Dados de exemplo
const initialData: Produto[] = [
  { id: 1, codigo: 'P001', descricao: 'Produto A', quantidade: 100, valor: 50, validade: '2023-12-31', localizacao: 'A1', categoria: 'Eletrônicos', fornecedor: 'Fornecedor X' },
  { id: 2, codigo: 'P002', descricao: 'Produto B', quantidade: 75, valor: 30, validade: '2024-06-30', localizacao: 'B2', categoria: 'Vestuário', fornecedor: 'Fornecedor Y' },
  { id: 3, codigo: 'P003', descricao: 'Produto C', quantidade: 50, valor: 100, validade: '2023-09-15', localizacao: 'C3', categoria: 'Alimentos', fornecedor: 'Fornecedor Z' },
  { id: 4, codigo: 'P004', descricao: 'Produto D', quantidade: 200, valor: 25, validade: '2024-03-31', localizacao: 'D4', categoria: 'Eletrônicos', fornecedor: 'Fornecedor X' },
  { id: 5, codigo: 'P005', descricao: 'Produto E', quantidade: 30, valor: 150, validade: '2023-11-30', localizacao: 'E5', categoria: 'Vestuário', fornecedor: 'Fornecedor Y' },
]

const categorias = ['Eletrônicos', 'Vestuário', 'Alimentos']
const fornecedores = ['Fornecedor X', 'Fornecedor Y', 'Fornecedor Z']
const localizacoes = ['A1', 'B2', 'C3', 'D4', 'E5']

export default function ControleEstoque() {
  const [data, setData] = useState<Produto[]>(initialData)
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Produto>>({})
  const [filters, setFilters] = useState<Filters>({
    categoria: '',
    fornecedor: '',
    localizacao: '',
    validadeMin: null,
    validadeMax: null,
    quantidadeMin: '',
    quantidadeMax: '',
  })

  const { toast } = useToast()

  const columns = useMemo(
    () => [
      { Header: 'Código', accessor: 'codigo' },
      { Header: 'Descrição', accessor: 'descricao' },
      { Header: 'Quantidade', accessor: 'quantidade' },
      { Header: 'Valor', accessor: 'valor', Cell: ({ value }: { value: number }) => `R$ ${value.toFixed(2)}` },
      { Header: 'Validade', accessor: 'validade' },
      { Header: 'Localização', accessor: 'localizacao' },
      { Header: 'Categoria', accessor: 'categoria' },
      { Header: 'Fornecedor', accessor: 'fornecedor' },
      {
        Header: 'Ações',
        Cell: ({ row }: { row: { original: Produto } }) => (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleEditProduct(row.original)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(row.original.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  )

  const filterData = useMemo(() => {
    return data.filter(item => {
      const categoriaMatch = !filters.categoria || item.categoria === filters.categoria
      const fornecedorMatch = !filters.fornecedor || item.fornecedor === filters.fornecedor
      const localizacaoMatch = !filters.localizacao || item.localizacao === filters.localizacao
      const validadeMatch = (!filters.validadeMin || new Date(item.validade) >= filters.validadeMin) &&
                            (!filters.validadeMax || new Date(item.validade) <= filters.validadeMax)
      const quantidadeMatch = (!filters.quantidadeMin || item.quantidade >= Number(filters.quantidadeMin)) &&
                              (!filters.quantidadeMax || item.quantidade <= Number(filters.quantidadeMax))
      
      return categoriaMatch && fornecedorMatch && localizacaoMatch && validadeMatch && quantidadeMatch
    })
  }, [filters, data])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    { columns, data: filterData, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { globalFilter, pageIndex } = state

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      categoria: '',
      fornecedor: '',
      localizacao: '',
      validadeMin: null,
      validadeMax: null,
      quantidadeMin: '',
      quantidadeMax: '',
    })
  }

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== null
  ).length

  const handleAddProduct = () => {
    const id = Math.max(...data.map(p => p.id)) + 1
    const newProductWithId = { ...newProduct, id } as Produto
    setData([...data, newProductWithId])
    setIsAddProductOpen(false)
    setNewProduct({})
    toast({
      title: "Produto adicionado",
      description: "O novo produto foi adicionado com sucesso.",
    })
  }

  const handleEditProduct = (product: Produto) => {
    setSelectedProduct(product)
    setIsEditProductOpen(true)
  }

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      setData(data.map(p => p.id === selectedProduct.id ? selectedProduct : p))
      setIsEditProductOpen(false)
      setSelectedProduct(null)
      toast({
        title: "Produto atualizado",
        description: "As informações do produto foram atualizadas com sucesso.",
      })
    }
  }

  const handleDeleteProduct = (id: number) => {
    setData(data.filter(p => p.id !== id))
    toast({
      title: "Produto excluído",
      description: "O produto foi removido do estoque.",
      variant: "destructive",
    })
  }

  const chartData = useMemo(() => {
    const categoryCount = data.reduce((acc, item) => {
      acc[item.categoria] = (acc[item.categoria] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }))
  }, [data])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Controle de Estoque</h1>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex space-x-4"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar produtos..."
            value={globalFilter || ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
          <Filter className="mr-2 h-4 w-4" /> 
          Filtros
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filterData.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos com Estoque Baixo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filterData.filter(item => item.quantidade < 50).length}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm  font-medium">Produtos Próximos ao Vencimento</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filterData.filter(item => new Date(item.validade) < new Date('2023-12-31')).length}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-card rounded-lg p-4 shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Tendência de Estoque</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-card rounded-lg p-4 shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Distribuição por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Table {...getTableProps()}>
          <TableHeader>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableHead {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Anterior
          </Button>
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {Math.ceil(filterData.length / 10)}
            </strong>{' '}
          </span>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Próxima
          </Button>
        </div>
      </motion.div>

      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Produto</DialogTitle>
            <DialogDescription>
              Preencha as informações do novo produto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codigo" className="text-right">
                Código
              </Label>
              <Input
                id="codigo"
                value={newProduct.codigo || ''}
                onChange={(e) => setNewProduct({ ...newProduct, codigo: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                value={newProduct.descricao || ''}
                onChange={(e) => setNewProduct({ ...newProduct, descricao: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantidade" className="text-right">
                Quantidade
              </Label>
              <Input
                id="quantidade"
                type="number"
                value={newProduct.quantidade || ''}
                onChange={(e) => setNewProduct({ ...newProduct, quantidade: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor
              </Label>
              <Input
                id="valor"
                type="number"
                value={newProduct.valor || ''}
                onChange={(e) => setNewProduct({ ...newProduct, valor: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validade" className="text-right">
                Validade
              </Label>
              <Input
                id="validade"
                type="date"
                value={newProduct.validade || ''}
                onChange={(e) => setNewProduct({ ...newProduct, validade: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="localizacao" className="text-right">
                Localização
              </Label>
              <Select
                value={newProduct.localizacao || ''}
                onValueChange={(value) => setNewProduct({ ...newProduct, localizacao: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a localização" />
                </SelectTrigger>
                <SelectContent>
                  {localizacoes.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoria
              </Label>
              <Select
                value={newProduct.categoria || ''}
                onValueChange={(value) => setNewProduct({ ...newProduct, categoria: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fornecedor" className="text-right">
                Fornecedor
              </Label>
              <Select
                value={newProduct.fornecedor || ''}
                onValueChange={(value) => setNewProduct({ ...newProduct, fornecedor: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {fornecedores.map((forn) => (
                    <SelectItem key={forn} value={forn}>
                      {forn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddProduct}>Adicionar Produto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Atualize as informações do produto.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-codigo" className="text-right">
                  Código
                </Label>
                <Input
                  id="edit-codigo"
                  value={selectedProduct.codigo}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, codigo: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-descricao" className="text-right">
                  Descrição
                </Label>
                <Textarea
                  id="edit-descricao"
                  value={selectedProduct.descricao}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, descricao: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantidade" className="text-right">
                  Quantidade
                </Label>
                <Input
                  id="edit-quantidade"
                  type="number"
                  value={selectedProduct.quantidade}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, quantidade: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-valor" className="text-right">
                  Valor
                </Label>
                <Input
                  id="edit-valor"
                  type="number"
                  value={selectedProduct.valor}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, valor: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-validade" className="text-right">
                  Validade
                </Label>
                <Input
                  id="edit-validade"
                  type="date"
                  value={selectedProduct.validade}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, validade: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-localizacao" className="text-right">
                  Localização
                </Label>
                <Select
                  value={selectedProduct.localizacao}
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, localizacao: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a localização" />
                  </SelectTrigger>
                  <SelectContent>
                    {localizacoes.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-categoria" className="text-right">
                  Categoria
                </Label>
                <Select
                  value={selectedProduct.categoria}
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, categoria: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fornecedor" className="text-right">
                  Fornecedor
                </Label>
                <Select
                  value={selectedProduct.fornecedor}
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, fornecedor: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedores.map((forn) => (
                      <SelectItem key={forn} value={forn}>
                        {forn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpdateProduct}>Atualizar Produto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtrar Produtos</DialogTitle>
            <DialogDescription>
              Selecione os critérios para filtrar os produtos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoria
              </Label>
              <Select
                value={filters.categoria}
                onValueChange={(value) => handleFilterChange('categoria', value)}
              >
                <SelectTrigger id="categoria" className="col-span-3">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fornecedor" className="text-right">
                Fornecedor
              </Label>
              <Select
                value={filters.fornecedor}
                onValueChange={(value) => handleFilterChange('fornecedor', value)}
              >
                <SelectTrigger id="fornecedor" className="col-span-3">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  {fornecedores.map((fornecedor) => (
                    <SelectItem key={fornecedor} value={fornecedor}>
                      {fornecedor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="localizacao" className="text-right">
                Localização
              </Label>
              <Select
                value={filters.localizacao}
                onValueChange={(value) => handleFilterChange('localizacao', value)}
              >
                <SelectTrigger id="localizacao" className="col-span-3">
                  <SelectValue placeholder="Selecione a localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  {localizacoes.map((localizacao) => (
                    <SelectItem key={localizacao} value={localizacao}>
                      {localizacao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validadeMin" className="text-right">
                Validade Mínima
              </Label>
              <DatePicker
                selected={filters.validadeMin}
                onSelect={(date) => handleFilterChange('validadeMin', date)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validadeMax" className="text-right">
                Validade Máxima
              </Label>
              <DatePicker
                selected={filters.validadeMax}
                onSelect={(date) => handleFilterChange('validadeMax', date)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantidadeMin" className="text-right">
                Quantidade Mínima
              </Label>
              <Input
                id="quantidadeMin"
                type="number"
                value={filters.quantidadeMin}
                onChange={(e) => handleFilterChange('quantidadeMin', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantidadeMax" className="text-right">
                Quantidade Máxima
              </Label>
              <Input
                id="quantidadeMax"
                type="number"
                value={filters.quantidadeMax}
                onChange={(e) => handleFilterChange('quantidadeMax', e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={clearFilters}>Limpar Filtros</Button>
            <Button onClick={() => setIsFilterOpen(false)}>Aplicar Filtros</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}*/
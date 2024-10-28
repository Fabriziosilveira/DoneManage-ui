import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchDummyData, Request } from "@/data/requests";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, ListFilter, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { getBadgeClass } from "../../../../../utils/BadgesClass";

export default function TotalRequests(){
    const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [paginatedRequests, setPaginatedRequests] = useState(() => fetchDummyData(currentPage, pageSize));
  
    useEffect(() => {
      const paginatedData = fetchDummyData(currentPage, pageSize);
      setPaginatedRequests(paginatedData);
    }, [currentPage, pageSize]);
  
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedRequests(paginatedRequests.data.map((request: Request) => request.id)); // Seleciona todos os pedidos na página atual
      } else {
        setSelectedRequests([]); // Desmarca todos
      }
    };
  
    const handleSelectOrder = (requestId: string, checked: boolean) => {
      setSelectedRequests((prevSelected) => {
        if (checked) {
          return [...prevSelected, requestId]; // Adiciona o pedido ao array de selecionados
        } else {
          return prevSelected.filter((id) => id !== requestId); // Remove o pedido do array de selecionados
        }
      });
    };
  
    const isAllSelected = selectedRequests.length === paginatedRequests.data.length;
  


    return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
          <main className="flex-1 ">
            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                  <label htmlFor="select-all" className="ml-2 text-sm text-gray-500">
                    Selecionar tudo
                  </label>
                </div>
                <div className="flex items-center space-x-0">
                  <Select defaultValue="last30">
                    <SelectTrigger className="w-52">
                      <Calendar className="text-[#969696] w-[16.67] h-[18.33]" />
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last30">Últimos 30 dias</SelectItem>
                      <SelectItem value="last60">Últimos 60 dias</SelectItem>
                      <SelectItem value="last90">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="h-8 w-8 p-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <ListFilter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Copy order ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View order details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>ID do pedido</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Inventory Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRequests.data.map((request: Request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRequests.includes(request.id)}
                          onCheckedChange={(checked) =>
                            handleSelectOrder(request.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>{request.number}</TableCell>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getBadgeClass(request.status)}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.description}
                      </TableCell>
                      <TableCell>
                        <div>{request.date}</div>
                        <div className="text-sm text-gray-500">{request.time}</div>
                      </TableCell>
                      <TableCell>
                        <div className="h-8 w-8 p-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigator.clipboard.writeText(request.id)
                                }
                              >
                                Copy order ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View customer</DropdownMenuItem>
                              <DropdownMenuItem>View order details</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">Page {paginatedRequests.currentPage} of {paginatedRequests.totalPages}</div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, paginatedRequests.totalPages))}
                    disabled={currentPage === paginatedRequests.totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      );
}
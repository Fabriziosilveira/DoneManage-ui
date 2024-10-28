import { useState } from "react";
import { Checkbox } from "../../../ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../ui/select";
import { Button } from "../../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    ListFilter,
    MoreHorizontal,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import { Badge } from "../../../ui/badge";
import { orders } from "@/data/orders";
import { motion } from 'framer-motion'
import { getBadgeClass } from "../../../../../utils/BadgesClass";

export default function CompletedOrders(){
    
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedOrders(orders.map((order) => order.id)); // Seleciona todos os pedidos
        } else {
            setSelectedOrders([]); // Desmarca todos
        }
    };

    // Função para selecionar/desmarcar um pedido individual
    const handleSelectOrder = (orderId: string, checked: boolean) => {
        setSelectedOrders((prevSelected) => {
            if (checked) {
                return [...prevSelected, orderId]; // Adiciona o pedido ao array de selecionados
            } else {
                return prevSelected.filter((id) => id !== orderId); // Remove o pedido do array de selecionados
            }
        });
    };

    // Verifica se todos os pedidos estão selecionados
    const isAllSelected = selectedOrders.length === orders.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
            <main className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <div className=" bg-white shadow rounded-lg">
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
                            <Select defaultValue="last30" >
                                <SelectTrigger className="w-52">
                                    <Calendar className="text-[#969696] w-[16.67] h-[18.33]" />
                                    <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="last30">Ultimos 30 dias</SelectItem>
                                    <SelectItem value="last60">Ultimos 60 dias</SelectItem>
                                    <SelectItem value="last90">Ultimos 90 dias</SelectItem>
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
                            {orders.filter((order) => order.status.toLocaleLowerCase() === "completed").map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedOrders.includes(order.id)}
                                            onCheckedChange={(checked) =>
                                                handleSelectOrder(order.id, checked as boolean)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={getBadgeClass(order.status)}
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={getBadgeClass(order.inventory)}
                                        >
                                            {order.inventory}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div>{order.date}</div>
                                        <div className="text-sm text-gray-500">{order.time}</div>
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
                                                            navigator.clipboard.writeText(order.id)
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
                        <div className="text-sm text-gray-500">Page 1 of 4</div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}
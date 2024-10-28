import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import TotalOrders from "./Orders/TotalOrders";
import PendingOrders from "./Orders/PendingOrders";
import ApprovedOrders from "./Orders/ApprovedOrders";
import CompletedOrders from "./Orders/CompletedOrders";
import CanceledOrders from "./Orders/CanceledOrders";
import ReturnedOrders from "./Orders/ReturnedOrders";
import TotalRequests from "./Requests/TotalRequests";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("total-orders");
    const [activeRequestsTab, setActiveRequestsTab] = useState("total-requests");
    const [selectedRequestsComponent, setSelectedRequestsComponent] = useState("Total-Requests");
    const [selectedOrdersComponent, setSelectedOrdersComponent] = useState("Total-Orders");

    const renderOrdersComponent = () => {
        switch (selectedOrdersComponent) {
            case "Total-Orders":
                return <TotalOrders />;
            case "Pending-Orders":
                return <PendingOrders />;
            case "Approved-Orders":
                return <ApprovedOrders />;
            case "Completed-Orders":
                return <CompletedOrders />;
            case "Canceled-Orders":
                return <CanceledOrders />;
            case "Returned-Orders":
                return <ReturnedOrders />;
            default:
                return <TotalOrders />;
        }
    };

    const renderRequestsComponent = () => {
        switch (selectedRequestsComponent) {
            case "Total-Requests":
                return <TotalRequests />;
            case "Approved-Requests":
                return ; 
            case "Pending-Requests":
                return ;
            default:
                return <TotalRequests />;
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Formulário enviado");
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        } finally {
        
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
            <Card className="w-full mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Recent Orders
                    </CardTitle>
                    <p className="text-sm text-[#9FA1A6]">
                        You are viewing the total number of orders placed so far.
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="w-full mx-auto">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-6">
                                <TabsTrigger value="total-orders" onClick={() => setSelectedOrdersComponent("Total-Orders")}>Total Orders</TabsTrigger>
                                <TabsTrigger value="pending-orders" onClick={() => setSelectedOrdersComponent("Pending-Orders")}>Pending Orders</TabsTrigger>
                                <TabsTrigger value="approved-orders" onClick={() => setSelectedOrdersComponent("Approved-Orders")}>Approved Orders</TabsTrigger>
                                <TabsTrigger value="completed-orders" onClick={() => setSelectedOrdersComponent("Completed-Orders")}>Completed Orders</TabsTrigger>
                                <TabsTrigger value="canceled-orders" onClick={() => setSelectedOrdersComponent("Canceled-Orders")}>Canceled Orders</TabsTrigger>
                                <TabsTrigger value="returned-orders" onClick={() => setSelectedOrdersComponent("Returned-Orders")}>Returned Orders</TabsTrigger>
                            </TabsList>
                            {renderOrdersComponent()}
                        </Tabs>
                    </form>
                </CardContent>
                <CardFooter>
                    
                </CardFooter>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Inventory Requests
                    </CardTitle>
                    <p className="text-sm text-[#9FA1A6]">
                        You have requests awaiting your approval
                    </p>
                </CardHeader>
                <CardContent>
                    <form>
                        <Tabs value={activeRequestsTab} onValueChange={setActiveRequestsTab}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="total-requests" onClick={() => setSelectedRequestsComponent("Total-Requests")}>Total Requests</TabsTrigger>
                                <TabsTrigger value="approved-requests" onClick={() => setSelectedRequestsComponent("Approved-Requests")}>Approved Requests</TabsTrigger>
                                <TabsTrigger value="pending-requests" onClick={() => setSelectedRequestsComponent("Pending-Requests")}>Pending Requests</TabsTrigger>
                            </TabsList>
                            {renderRequestsComponent()}
                        </Tabs>
                    </form>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </motion.div>
    );
}

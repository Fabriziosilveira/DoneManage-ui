"use-client";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GeneralCompanyConfig from "./General/General-Company-Config";
import MetricsCompanyConfig from "./Metrics/Metrics-Company-Config";
import FinanceCompanyConfig from "./Finance/Company-Finance-Config";
import SystemCompanyConfig from "./System-Settings/System-Company-Config";
import { Loader2, SaveAll } from "lucide-react";

export default function CompanyConfig() {
    const [activeTab, setActiveTab] = useState("general");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState("General-Company-Config");

    const renderComponent = () => {
        switch (selectedComponent) {
            case "General-Company-Config":
                return <GeneralCompanyConfig />;
            case "Company-Finance-Config":
                return <FinanceCompanyConfig />;
            case "Company-Metrics-Config":
                return <MetricsCompanyConfig />;
            case "Company-System-Config":
                return <SystemCompanyConfig />;
            default:
                return <GeneralCompanyConfig />;
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Formulário enviado");
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Company Configurations
                    </CardTitle>
                    <p className="text-sm text-[#9FA1A6]">
                        Configure key company details and operational settings.
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="w-full mx-auto">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="general" onClick={() => setSelectedComponent("General-Company-Config")}>Geral</TabsTrigger>
                                <TabsTrigger value="financial" onClick={() => setSelectedComponent("Company-Finance-Config")}>Financeiro</TabsTrigger>
                                <TabsTrigger value="metrics" onClick={() => setSelectedComponent("Company-Metrics-Config")}>Métricas</TabsTrigger>
                                <TabsTrigger value="settings" onClick={() => setSelectedComponent("Company-System-Config")}>Configurações</TabsTrigger>
                            </TabsList>

                            {renderComponent()}
                        </Tabs>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="ml-auto bg-[#111111] text-[#FFFFFF] font-medium"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Salvando
                            </>
                        ) : (
                            <>
                                <SaveAll className="w-4 h-4 mr-1" />
                                Salvar Alterações
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

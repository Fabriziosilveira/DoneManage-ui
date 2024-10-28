import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function FinanceCompanyConfig() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
            <TabsContent value="financial">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="revenue">Receita Anual</Label>
                            <Input id="revenue" type="number" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expenses">Despesas Anuais</Label>
                            <Input id="expenses" type="number" placeholder="0.00" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fiscalYear">Ano Fiscal</Label>
                        <Select>
                            <SelectTrigger id="fiscalYear">
                                <SelectValue placeholder="Selecione o ano fiscal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="calendar">Ano Calendário</SelectItem>
                                <SelectItem value="custom">Personalizado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="taxRegime">Regime Tributário</Label>
                        <Select>
                            <SelectTrigger id="taxRegime">
                                <SelectValue placeholder="Selecione o regime tributário" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="simples">Simples Nacional</SelectItem>
                                <SelectItem value="lucroReal">Lucro Real</SelectItem>
                                <SelectItem value="lucroPresumido">Lucro Presumido</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </TabsContent>
        </motion.div>

    );
}
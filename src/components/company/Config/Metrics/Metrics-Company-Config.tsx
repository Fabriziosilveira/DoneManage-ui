import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function MetricsCompanyConfig() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
            <TabsContent value="metrics">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="employees">Número de Funcionários</Label>
                            <Input id="employees" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customers">Número de Clientes</Label>
                            <Input id="customers" type="number" placeholder="0" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthRate">Taxa de Crescimento Anual (%)</Label>
                        <Input id="growthRate" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="marketShare">Participação de Mercado (%)</Label>
                        <Input id="marketShare" type="number" placeholder="0" />
                    </div>
                </div>
            </TabsContent>
        </motion.div>
    );
}
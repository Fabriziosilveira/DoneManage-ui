import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function SystemCompanyConfig() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
            <TabsContent value="settings">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="notifications" />
                        <Label htmlFor="notifications">Ativar notificações</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="autoBackup" />
                        <Label htmlFor="autoBackup">Backup automático</Label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="language">Idioma do Sistema</Label>
                        <Select>
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Selecione o idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                                <SelectItem value="en-US">English (US)</SelectItem>
                                <SelectItem value="es-ES">Español</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </TabsContent>
        </motion.div>
    );
}
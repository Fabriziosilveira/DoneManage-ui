"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserIcon, BuildingIcon } from "lucide-react";

export default function UserTypeSelection() {
  const [userType, setUserType] = useState<string | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userType) {
      console.log(`Tipo de usuário selecionado: ${userType}`);
      // Aqui você pode adicionar a lógica para redirecionar ou processar a seleção
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-secondary p-4">
        <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary-900 mb-4">
                Bem-vindo! Vamos começar.
            </CardTitle>
            <p className="text-xl text-neutral-600">
                Selecione o tipo de conta que melhor se aplica a você:
            </p>
        </CardHeader>
        <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
            <RadioGroup
                onValueChange={setUserType}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                <div>
                <RadioGroupItem
                    id="employee"
                    value="employee"
                    className="peer sr-only"
                />
                <Label
                    htmlFor="employee"
                    className="flex flex-col items-center justify-between rounded-xl border-4 border-muted bg-popover p-8 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-custom-black [&:has([data-state=checked])]:border-custom-black transition-all duration-300 ease-in-out cursor-pointer"
                >
                    <UserIcon className="mb-6 h-24 w-24" />
                    <span className="text-2xl font-medium">Sou Funcionário</span>
                    <p className="mt-4 text-center text-neutral-600">
                        Escolha esta opção se você está procurando emprego ou
                        gerenciando sua carreira.
                    </p>
                </Label>
                </div>
                <div>
                <RadioGroupItem
                    id="company"
                    value="company"
                    className="peer sr-only"
                />
                <Label
                    htmlFor="company"
                    className="flex flex-col items-center justify-between rounded-xl border-4 border-muted bg-popover p-8 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-custom-black [&:has([data-state=checked])]:border-custom-black transition-all duration-300 ease-in-out cursor-pointer"
                >
                    <BuildingIcon className="mb-6 h-24 w-24" />
                    <span className="text-2xl font-medium">Somos uma Empresa</span>
                    <p className="mt-4 text-center text-neutral-600">
                        Escolha esta opção se você está recrutando talentos ou
                        gerenciando sua organização.
                    </p>
                </Label>
                </div>
            </RadioGroup>
            <CardFooter className="flex justify-center mt-12">
                <Button
                type="submit"
                className="w-full max-w-md text-xl py-6 bg-custom-black hover:bg-primary-800 text-white transition-all duration-300 ease-in-out"
                disabled={!userType}
                >
                    Continuar
                </Button>
            </CardFooter>
            </form>
        </CardContent>
        </Card>
    </div>
  );
}

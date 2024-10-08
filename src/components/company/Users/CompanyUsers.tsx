"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus } from "lucide-react";
import { employees } from "@/data/employees";
import { FormatLogoIfNoImage } from "../../../../utils/Formataion";

export default function CompanyUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the invitation to the backend
    console.log(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setIsInviteDialogOpen(false);
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="ml-6 mr-6 bg-white shadow rounded-lg">
        <div className="container mx-auto p-6">
          <h1 className="ml-2 mr-2 pl-2 text-2xl font-bold mb-4">Painel de Usuários</h1>
          <p className="ml-2 mr-2 pl-2 pb-8 text-sm text-[#9FA1A6]">
            You are viewing the total number of orders placed so far
          </p>

          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar funcionários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <Dialog
              open={isInviteDialogOpen}
              onOpenChange={setIsInviteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-[#111111] text-[#FFFFFF] font-medium">
                  <UserPlus className="mr-2 h-4 w-4 text-[#FFFFFF]" /> 
                  Convidar Membro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Convidar Novo Membro</DialogTitle>
                  <DialogDescription>
                    Envie um convite para um novo membro se juntar à equipe.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="bg-[#111111] text-[#FFFFFF]" type="submit">Enviar Convite</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={employee.imageURL} />
                        <AvatarFallback>
                          {FormatLogoIfNoImage(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{employee.name}</span>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{employee.department}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}

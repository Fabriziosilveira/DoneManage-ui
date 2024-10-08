import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InviteEmployee() {

    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the invitation to the backend
        console.log(`Invitation sent to ${inviteEmail}`);
        setInviteEmail("");
        setIsInviteDialogOpen(false);
    };

    return (
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
    )
}
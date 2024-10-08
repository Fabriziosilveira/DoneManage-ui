"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Simular uma chamada de API
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simula 2 segundos de delay
      setMessage("Um link de recuperação foi enviado para o seu email.")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Ocorreu um erro. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    } 
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center">
        <div className="text-white text-4xl font-bold">
          DoneManage
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary-900">Recuperação de Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 pb-2">
                <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-custom-black hover:bg-primary-800 text-white font-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar link de recuperação"
                )}
              </Button>
            </form>
            {message && (
              <p className="mt-4 text-base text-center text-[#0C8C09]">{message}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <a href="/login" className="text-sm text-custom-blackLine hover:text-primary-900">
              Voltar para o login
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
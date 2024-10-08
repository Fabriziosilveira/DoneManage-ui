'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useTranslation } from "next-i18next"


export default function LoginForm2() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  // const { t } = useTranslation('common');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Lembrar de adicionar a lógica depois

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Login submitted");
      router.replace('/company/dashboard');
     
    } catch {
      setMessage("Ocorreu um erro. Por favor, tente novamente.")
    } finally {
      
    }
}

  return (
    <div className="flex min-h-screen">

      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center">
        <div className="text-white text-7xl font-bold">
            <h2>DoneManage</h2>
            <h5 className="text-white text-xl font-light pt-2">
              Streamline Your Business, 
              Empower Your Growth.
            </h5>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <Card className="w-full max-w-md min-h-[500px] lg:min-h-[400px] flex flex-col justify-between">
          <CardHeader className="mb-2">
            <CardTitle className="text-2xl font-bold text-center text-primary-900">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
                    Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="example@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
                  Senha
                </Label>
                <div className="relative pb-4">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    required
                    onChange={(p) => setPassword(p.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700 pb-3.5"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button 
                 type="submit" 
                 className="w-full bg-custom-black hover:bg-primary-800 text-white font-bold"
                 disabled={isLoading}
              >
              {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
            {message && (
              <p className="mt-4 text-sm text-center text-primary-700">{message}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="flex flex-col space-y-2 items-center justify-center">
                <a href="/tier" className="text-sm text-custom-blackLine">Criar uma conta</a>
                <a href="/recovery-password" className="text-sm text-custom-blackLine hover:text-primary-900">
                    Esqueceu sua senha?
                </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

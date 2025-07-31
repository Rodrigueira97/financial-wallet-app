"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Dashboard } from "@/components/dashboard"
import { UserDTO, UserLoginDTO, UserRegisterDTO } from "@/dto/user.dto"
import { useMutation } from "@tanstack/react-query"
import { loginUser, registerUser, userProfile } from "@/api/user.api"
import { Loading } from "@/components/loading"
import { useCustomToast } from "@/hooks/use-custom-toast"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useCustomToast()

  const { mutate: registerUserMutation } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)

      setCurrentUser({
        id: data?.user?.id,
        name: data?.user?.name,
        email: data?.user?.email,
        balance: data?.user?.balance
      })
      
      showSuccess(
        "Bem-vindo!",
        `Olá ${data?.user?.name}, você foi registrado com sucesso!`
      )
    },
    onError: () => {
      showError(
        "Erro no registro",
        "Ocorreu um erro ao registrar o usuário. Tente novamente mais tarde."
      )
    }
  })

  const { mutate: loginUserMutation } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      setCurrentUser({
        id: data?.user?.id,
        name: data?.user?.name,
        email: data?.user?.email,
        balance: data?.user?.balance
      })
      
      showSuccess(
        "Login realizado com sucesso!",
        `Bem-vindo de volta, ${data?.user?.name}!`
      )
    },
    onError: () => {
      showError(
        "Credenciais inválidas",
        "Usuário ou senha incorretos. Verifique suas credenciais e tente novamente."
      )
    }
  })

  const handleRegister = async ({ name, email, password }: UserRegisterDTO) => {
    registerUserMutation({
      name,
      email,
      password
    })
  }

  const handleLogin = ({ email, password }: UserLoginDTO) => {
    loginUserMutation({
      email,
      password
    })
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const data = await userProfile();

          setCurrentUser({
            id: data?.id,
            name: data?.name,
            email: data?.email,
            balance: data?.balance
          });
        } catch (error) {

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);


  if (loading) return (
    <Loading />
  )

  if (currentUser) {
    return (
      <Dashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mt-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              FinancialWallet
            </h1>

            <p className="text-gray-600">Sua carteira digital moderna</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${isLogin ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                Entrar
              </button>
              
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${!isLogin ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                Criar Conta
              </button>
            </div>

            {isLogin ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onRegister={handleRegister} />}
          </div>
        </div>
      </div>
    </div>
  )
}

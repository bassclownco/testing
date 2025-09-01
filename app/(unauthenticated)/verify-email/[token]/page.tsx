"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle, AlertCircle, Mail, ArrowRight } from "lucide-react"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | 'expired' | null>(null)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  useEffect(() => {
    const verifyEmail = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call to verify the email token
        // For now, we'll simulate the verification process
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Simulate different verification scenarios based on token
        if (!token) {
          setVerificationStatus('error')
          setError("No verification token provided")
        } else if (token.length < 10) {
          setVerificationStatus('expired')
          setError("Verification token has expired")
        } else if (token.includes('invalid')) {
          setVerificationStatus('error')
          setError("Invalid verification token")
        } else {
          // Simulate successful verification
          setVerificationStatus('success')
          setEmail("john@example.com") // In a real app, this would come from the token
        }
      } catch (err) {
        setVerificationStatus('error')
        setError("Something went wrong during verification")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token])

  const handleResendVerification = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to resend verification email
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message or redirect
      alert("Verification email sent! Please check your inbox.")
    } catch (err) {
      setError("Failed to resend verification email")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="mx-auto h-16 w-16 text-blue-500 animate-spin mb-4" />
              <h2 className="text-2xl font-bold mb-2">Verifying Email</h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/bass-clown-co-logo-cream.svg"
                alt="Bass Clown Co"
                width={120}
                height={60}
                className="dark:invert"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-4">
                Your email address <strong>{email}</strong> has been successfully verified.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                You can now access all features of your Bass Clown Co account.
              </p>
              
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">
                    Continue to Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (verificationStatus === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/bass-clown-co-logo-cream.svg"
                alt="Bass Clown Co"
                width={120}
                height={60}
                className="dark:invert"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <AlertCircle className="mx-auto h-16 w-16 text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Link Expired</h2>
              <p className="text-gray-600 mb-4">
                This email verification link has expired for security reasons.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Please request a new verification email to continue.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Verification
                    </>
                  )}
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">
                    Back to Login
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/bass-clown-co-logo-cream.svg"
              alt="Bass Clown Co"
              width={120}
              height={60}
              className="dark:invert"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">
              Unable to verify your email address.
            </p>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <p className="text-sm text-gray-500 mb-6">
              The verification link may be invalid or corrupted. Please try requesting a new one.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleResendVerification}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification
                  </>
                )}
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link href="/register">
                  Create New Account
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="w-full">
                <Link href="/login">
                  Back to Login
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
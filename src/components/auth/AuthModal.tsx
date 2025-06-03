"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SignInForm } from "./SignInForm"
import { SignUpForm } from "./SignUpForm"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "signin" | "signup"
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = "signin" }) => {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode)

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none">
        <div className="relative">
          {mode === "signin" ? <SignInForm onToggleMode={toggleMode} /> : <SignUpForm onToggleMode={toggleMode} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

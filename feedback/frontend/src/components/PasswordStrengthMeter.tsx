import React from 'react'
import { calculatePasswordStrength } from '@/lib/validation'
import { cn } from '@/lib/utils'

interface PasswordStrengthMeterProps {
  password: string
  className?: string
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  className,
}) => {
  if (!password) return null

  const { score, feedback, color } = calculatePasswordStrength(password)
  const percentage = (score / 6) * 100

  return (
    <div className={cn('mt-2 space-y-1', className)}>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Password strength:</span>
        <span
          className="text-xs font-medium"
          style={{ color }}
        >
          {feedback}
        </span>
      </div>
      {score < 4 && (
        <ul className="text-xs text-muted-foreground space-y-0.5 mt-2">
          {password.length < 8 && <li>• Use at least 8 characters</li>}
          {!/[A-Z]/.test(password) && <li>• Include an uppercase letter</li>}
          {!/[a-z]/.test(password) && <li>• Include a lowercase letter</li>}
          {!/[0-9]/.test(password) && <li>• Include a number</li>}
          {!/[^a-zA-Z0-9]/.test(password) && <li>• Include a special character</li>}
        </ul>
      )}
    </div>
  )
}

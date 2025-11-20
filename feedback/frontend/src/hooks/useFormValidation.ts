import { useState, useCallback } from 'react'
import { z } from 'zod'

export function useFormValidation<T extends z.ZodType>(schema: T) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback(
    (data: unknown): data is z.infer<T> => {
      try {
        schema.parse(data)
        setErrors({})
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {}
          error.issues.forEach((err) => {
            if (err.path[0]) {
              newErrors[err.path[0] as string] = err.message
            }
          })
          setErrors(newErrors)
        }
        return false
      }
    },
    [schema]
  )

  const validateField = useCallback(
    (field: string, value: unknown) => {
      try {
        const fieldSchema = (schema as any).shape[field]
        if (fieldSchema) {
          fieldSchema.parse(value)
          setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[field]
            return newErrors
          })
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({
            ...prev,
            [field]: error.issues[0]?.message || 'Invalid value',
          }))
        }
      }
    },
    [schema]
  )

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  return {
    errors,
    validate,
    validateField,
    clearErrors,
    clearError,
  }
}

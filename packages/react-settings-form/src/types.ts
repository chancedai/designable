import React from 'react'
import { Form } from '@formily/core'
export interface ISettingFormProps {
  uploadCustomRequest: void
  className?: string
  style?: React.CSSProperties
  uploadAction?: string
  components?: Record<string, React.FC<any>>
  effects?: (form: Form) => void
  scope?: any
}

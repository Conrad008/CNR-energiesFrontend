import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { recordCreditPayment } from '@/api/credit'

const METHODS = ['CASH', 'MPESA', 'BANK_TRANSFER', 'CHEQUE']
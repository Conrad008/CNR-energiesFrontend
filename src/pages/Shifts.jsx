import { useEffect, useState } from 'react'
import StartShiftForm from '@/features/shifts/StartShiftForm'
import ShiftList from '@/features/shifts/ShiftList'
import { listShifts } from '@/api/shifts'
import { useAuth } from '@/auth/AuthContext'
import { isAttendant } from '@/lib/roles'


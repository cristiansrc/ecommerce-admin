import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilContact,
  cilAddressBook,
  cilNotes
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Productos',
    to: '/productos',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  
  },
  {
    component: CNavItem,
    name: 'Categorias',
    to: '/categorias',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  
  },
  {
    component: CNavItem,
    name: 'Facturas',
    to: '/facturas',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  
  }
]

export default _nav

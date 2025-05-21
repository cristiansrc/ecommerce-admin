import React from 'react'
import {
  CAvatar,
  CButton,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import useAuth from 'hooks/useAuth'
import { useDispatch } from 'react-redux'
import { authActions } from 'application/actions/auth'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { name, lastName } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const closeSession = () => {
    dispatch(authActions.deleteSession());
    navigate("/login");
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">{name + ' ' + lastName}</CDropdownHeader>
        <CDropdownItem>
            <CButton color="primary" onClick={() => closeSession()}>Cerrar sesion</CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

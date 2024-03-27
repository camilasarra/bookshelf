import React from 'react'
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'

export default function DashFooter() {
    
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onClickedGoHome = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
               
                title="Home"
                onClick={onClickedGoHome}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer>
            {onClickedGoHome}
          
        </footer>
    )
    return content
}

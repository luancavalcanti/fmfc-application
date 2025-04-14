import React, { useContext } from "react"
import { BreadcrumbContext } from "../context/BreadcrumbContext"
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import ButtonBack from "./ButtonBack"

const BreadcrumbContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    #breadcrumbs-items{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
        min-height: 40px;
        p{
            margin: 0;
            padding: 0;
        }
    }
    #breadcrumbs-navigation{
        height: 40px;
        margin:0;
        padding: 0;
    }
`

export function Breadcrumb() {
    const { crumbs } = useContext(BreadcrumbContext)
    const navigate = useNavigate()
    const L = crumbs.length - 1
    const location = useLocation()
    const path = location.pathname
    function showBreadcrumb() {
        switch (path) {
            case '/home':
            case '/home/clients':
            case '/home/employees':
            case '/home/admin':
            case '/home/admin/permissions':
            case '/home/admin/employees':
            case '/home/admin/clients':
            case '/home/admin/services':
            case '/home/admin/contracts':
            case '/home/admin/complaints':
            case '/home/admin/status':
                return false
            default:
                return true
        }
    }
    function handleClick(index) {

        if (index < L) {
            navigate((L - index) * (-1))
        }
    }
    return (
        showBreadcrumb() && <BreadcrumbContainer>
            <div id="breadcrumbs-items">
                {crumbs?.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <p style={index < L ? { cursor: "pointer", textDecoration: "underline" } : {}} onClick={() => handleClick(index)} key={index}>{crumb}</p>
                        {index < crumbs.length - 1 && <p>{'/'}</p>}
                    </React.Fragment>
                ))}
            </div>
            <div id="breadcrumbs-navigation">
                <ButtonBack />
            </div>
        </BreadcrumbContainer>
    )
}
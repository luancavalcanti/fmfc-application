import { useLocation, useNavigate } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import MenuContainer from "../components/MenuContainer"
import styled from "styled-components";
import { MenuContainerStyled } from "../styles/MenuContainerStyled";
import React, { useContext, useEffect } from "react";
import { ComplaintsContext } from "../context/ComplaintsContext";
import { BreadcrumbContext } from "../context/BreadcrumbContext";
import { TbReportSearch } from "react-icons/tb";

const ComplaintContainer = styled.div`
    display: flex;
    /* width: 100%; */
    flex-direction: row;
    justify-content: center;
    #status{
        width: 20px;
        background-color: ${props => props.color?.color || 'transparent'};
        margin: 25px 5px 25px 0;
        border-radius: 10px;
    }
`

export default function MenuComplaints() {
    const location = useLocation()
    const { client, service, lastCrumbs, role } = location.state
    const { data: status, getData } = useGetData('status')
    const { data: complaints } = useGetData('complaints')
    const complaintsFiltered = complaints?.filter(complaint => complaint.client === client && complaint.service === service)
    const navigate = useNavigate()
    const { defaultValues, fields, collectionName } = useContext(ComplaintsContext)
    const name = 'complaint'
    const { crumbs, setCrumbs } = useContext(BreadcrumbContext)
    useEffect(() => {
        setCrumbs([...lastCrumbs, service])
    }, [setCrumbs, lastCrumbs, service])

    // defaultValues.client = client;
    // defaultValues.service = service;

    function handleView(complaint, complaintId, color) {
        navigate('complaint', { state: { complaint, complaintId, color, lastCrumbs: crumbs } })
    }
    return (
        <MenuContainerStyled>
            <h3>Complaints List</h3>
            {complaintsFiltered.length === 0 &&
                <div id="empty">
                    <TbReportSearch id="icon" />
                    <p>This service does not have any complaint yet...</p>
                </div>
            }
            <div id="groupContainer">
                {complaintsFiltered.map((complaint, index) => {
                    getData()
                    const statusFiltered = status.filter(status => status.name === complaint.status)[0]
                    const title = `Status: ${statusFiltered?.name}`
                    {/* const title2 = `Complaint ${index + 1}` */ }
                    const subtitle = `${complaint.complaint}`
                    return (
                        <React.Fragment key={index}>
                            <ComplaintContainer color={statusFiltered} key={index}>
                                <div id="status"></div>
                                <MenuContainer
                                    title={subtitle}
                                    // title2={title2}
                                    subtitle={title}
                                    handleView={() => handleView(complaint, complaint.id, statusFiltered?.color)}
                                />
                            </ComplaintContainer>
                        </React.Fragment>
                    )
                })
                }
                {role === "admin" &&
                    <ComplaintContainer>
                        <div id="status"></div>
                        <MenuContainer
                            title={"Add"}
                            subtitle={"New Complaint"}
                            handleView={
                                () => navigate(`/home/admin/complaints/new`,
                                    {
                                        state: {
                                            defaultValues: {
                                                ...defaultValues,
                                                client: complaintsFiltered[0]?.client,
                                                service: complaintsFiltered[0]?.service
                                            },
                                            fields,
                                            name,
                                            collectionName,
                                            lastCrumbs: crumbs
                                        }
                                    }
                                )
                            }
                        />
                    </ComplaintContainer>
                }
            </div>
        </MenuContainerStyled>
    );
}

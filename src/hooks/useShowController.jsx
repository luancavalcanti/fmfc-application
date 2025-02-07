import { useState } from "react"

export default function useShowController() {

    const [showForm, setShowForm] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [id, setId] = useState('')

    function viewUpdate(id) {
        if (id) {
            setShowEdit(true)
            setId(id)
        } else {
            setShowEdit(false)
            setShowForm(false)
        }
    }
    return {
        viewUpdate,
        showForm, setShowForm,
        showEdit, setShowEdit,
        id
    }
}
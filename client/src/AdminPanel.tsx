import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router"

type Service = {
    id: number
    name: string
    comment: string | null
}

type Booking = {
    id: number
    date: string
    comment: string | null
    service: Service
    user?: {
        id: number
        name: string
        email: string
    }
}

type AdminUser = {
    id: number
    email: string
    name: string
    role: string
    bookings: Booking[]
}

type AdminPanelProps = {
    token: string
    onLogout: () => void
}

function AdminPanel({ token, onLogout }: AdminPanelProps) {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [serviceName, setServiceName] = useState("")
    const [serviceComment, setServiceComment] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const loadAdminData = useCallback(async () => {
        setIsLoading(true)
        setError("")

        try {
            const authHeaders = { Authorization: `Bearer ${token}` }
            const [usersRes, servicesRes, bookingsRes] = await Promise.all([
                fetch("http://127.0.0.1:8000/users", { headers: authHeaders }),
                fetch("http://127.0.0.1:8000/services"),
                fetch("http://127.0.0.1:8000/bookings", { headers: authHeaders }),
            ])

            const usersData = await usersRes.json()
            const servicesData = await servicesRes.json()
            const bookingsData = await bookingsRes.json()

            if (!usersRes.ok) {
                throw new Error(usersData.message || "Cannot load users")
            }
            if (!servicesRes.ok) {
                throw new Error(servicesData.message || "Cannot load services")
            }
            if (!bookingsRes.ok) {
                throw new Error(bookingsData.message || "Cannot load bookings")
            }

            setUsers(usersData)
            setServices(servicesData)
            setBookings(bookingsData)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }, [token])

    useEffect(() => {
        void loadAdminData()
    }, [loadAdminData])

    function handleServiceNameChange(event: ChangeEvent<HTMLInputElement>) {
        setServiceName(event.currentTarget.value)
    }

    function handleServiceCommentChange(event: ChangeEvent<HTMLInputElement>) {
        setServiceComment(event.currentTarget.value)
    }

    async function handleCreateService(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setSuccess("")
        setIsSubmitting(true)

        try {
            const res = await fetch("http://127.0.0.1:8000/services", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: serviceName,
                    comment: serviceComment || null,
                }),
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Cannot create service")
            }

            setSuccess("Service created")
            setServiceName("")
            setServiceComment("")
            await loadAdminData()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleDeleteService(id: number) {
        setError("")
        setSuccess("")

        try {
            const res = await fetch(`http://127.0.0.1:8000/services/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Cannot delete service")
            }

            setSuccess("Service deleted")
            await loadAdminData()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        }
    }

    return (
        <section className="dashboard">
            <header className="dashboard-header">
                <div>
                    <p className="eyebrow">Admin panel</p>
                    <h1>Manage booking app</h1>
                </div>
                <div className="header-actions">
                    <Link className="button-link secondary-link" to="/dashboard">User view</Link>
                    <button type="button" className="secondary" onClick={onLogout}>Logout</button>
                </div>
            </header>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <div className="stats-grid">
                <article>
                    <strong>{users.length}</strong>
                    <span>Users</span>
                </article>
                <article>
                    <strong>{services.length}</strong>
                    <span>Services</span>
                </article>
                <article>
                    <strong>{bookings.length}</strong>
                    <span>Bookings</span>
                </article>
            </div>

            <div className="dashboard-grid admin-grid">
                <section className="panel">
                    <h2>Create service</h2>
                    <form onSubmit={handleCreateService}>
                        <label htmlFor="service-name">Service name</label>
                        <input
                            id="service-name"
                            value={serviceName}
                            onChange={handleServiceNameChange}
                            placeholder="Men haircut"
                            required
                        />

                        <label htmlFor="service-comment">Description</label>
                        <input
                            id="service-comment"
                            value={serviceComment}
                            onChange={handleServiceCommentChange}
                            placeholder="30 minutes"
                        />

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Add service"}
                        </button>
                    </form>

                    <div className="compact-list">
                        {services.map((service) => (
                            <article key={service.id} className="compact-item">
                                <div>
                                    <strong>{service.name}</strong>
                                    {service.comment && <p className="muted">{service.comment}</p>}
                                </div>
                                <button type="button" className="danger" onClick={() => void handleDeleteService(service.id)}>
                                    Delete
                                </button>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="panel">
                    <h2>Users preview</h2>
                    {isLoading ? (
                        <p className="muted">Loading...</p>
                    ) : (
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Bookings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((adminUser) => (
                                        <tr key={adminUser.id}>
                                            <td>{adminUser.name}</td>
                                            <td>{adminUser.email}</td>
                                            <td>{adminUser.role}</td>
                                            <td>{adminUser.bookings.length}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>

            <section className="panel">
                <h2>All appointments</h2>
                {bookings.length === 0 ? (
                    <p className="muted">No appointments yet.</p>
                ) : (
                    <div className="booking-list">
                        {bookings.map((booking) => (
                            <article className="booking-item" key={booking.id}>
                                <div>
                                    <strong>{booking.service.name}</strong>
                                    <p>{new Date(booking.date).toLocaleString()}</p>
                                    {booking.user && <p className="muted">{booking.user.name} - {booking.user.email}</p>}
                                    {booking.comment && <p className="muted">{booking.comment}</p>}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </section>
    )
}

export default AdminPanel

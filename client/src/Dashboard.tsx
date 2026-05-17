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
}

type DashboardProps = {
    token: string
    userName: string
    userRole: string
    onLogout: () => void
}

type BookingFormData = {
    serviceId: string
    date: string
    comment: string
}

function Dashboard({ token, userName, userRole, onLogout }: DashboardProps) {
    const [services, setServices] = useState<Service[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [formData, setFormData] = useState<BookingFormData>({
        serviceId: "",
        date: "",
        comment: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const loadDashboardData = useCallback(async () => {
        setIsLoading(true)
        setError("")

        try {
            const [servicesRes, bookingsRes] = await Promise.all([
                fetch("http://127.0.0.1:8000/services"),
                fetch("http://127.0.0.1:8000/bookings", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ])

            const servicesData = await servicesRes.json()
            const bookingsData = await bookingsRes.json()

            if (!servicesRes.ok) {
                throw new Error(servicesData.message || "Cannot load services")
            }
            if (!bookingsRes.ok) {
                throw new Error(bookingsData.message || "Cannot load bookings")
            }

            setServices(servicesData)
            setBookings(bookingsData)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }, [token])

    useEffect(() => {
        void loadDashboardData()
    }, [loadDashboardData])

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleCreateBooking(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setSuccess("")
        setIsSubmitting(true)

        try {
            const res = await fetch("http://127.0.0.1:8000/bookings", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Cannot create booking")
            }

            setSuccess("Booking created")
            setFormData({ serviceId: "", date: "", comment: "" })
            await loadDashboardData()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleDeleteBooking(id: number) {
        setError("")
        setSuccess("")

        try {
            const res = await fetch(`http://127.0.0.1:8000/bookings/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Cannot delete booking")
            }

            setSuccess("Booking deleted")
            setBookings((prev) => prev.filter((booking) => booking.id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        }
    }

    return (
        <section className="dashboard">
            <header className="dashboard-header">
                <div>
                    <p className="eyebrow">Booking app</p>
                    <h1>Hello, {userName}</h1>
                </div>
                <div className="header-actions">
                    <Link className="button-link secondary-link" to="/">Home</Link>
                    {userRole === "admin" && <Link className="button-link secondary-link" to="/admin">Admin panel</Link>}
                    <button type="button" className="secondary" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-grid">
                <section className="panel">
                    <h2>Book a service</h2>
                    <form onSubmit={handleCreateBooking}>
                        <label htmlFor="serviceId">Service</label>
                        <select
                            id="serviceId"
                            name="serviceId"
                            value={formData.serviceId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose service</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="comment">Comment</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="Optional note"
                            rows={3}
                        />

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create booking"}
                        </button>
                    </form>
                    {success && <p className="success">{success}</p>}
                    {error && <p className="error">{error}</p>}
                </section>

                <section className="panel">
                    <h2>My bookings</h2>
                    {isLoading ? (
                        <p className="muted">Loading...</p>
                    ) : bookings.length === 0 ? (
                        <p className="muted">No bookings yet.</p>
                    ) : (
                        <div className="booking-list">
                            {bookings.map((booking) => (
                                <article className="booking-item" key={booking.id}>
                                    <div>
                                        <strong>{booking.service.name}</strong>
                                        <p>{new Date(booking.date).toLocaleString()}</p>
                                        {booking.comment && <p className="muted">{booking.comment}</p>}
                                    </div>
                                    <button
                                        type="button"
                                        className="danger"
                                        onClick={() => void handleDeleteBooking(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </section>
    )
}

export default Dashboard

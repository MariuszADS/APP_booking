type Props = {
  token: string
  onLogout: () => void
}

function Dashboard({ token, onLogout }: Props) {
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Jesteś zalogowany ✅</p>

      {/* debug — zobaczysz czy token działa */}
      <p>Token: {token.slice(0, 10)}...</p>

      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
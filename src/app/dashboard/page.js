import { getServerSession } from "next-auth"

export default async function Dashboard() {
  const session = await getServerSession()

  return (
    <div>
      <h2>Dashboard</h2>
      {session ? (
        <p>Welcome {session.user.name}</p>
      ) : (
        <p>No session found</p>
      )}
    </div>
  )
}

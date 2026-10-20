interface StaffCardProps {
  name: string
  title: string
  credentials: string[]
  experience: string
  photo: string
  bio: string
}

const StaffCard = ({ name, title, credentials, experience, photo, bio }: StaffCardProps) => (
  <article className="staff-profile">
    {photo && photo !== '/placeholder.svg' ? <img src={photo} alt={`${name}, ${title}`} className="staff-photo" loading="lazy" /> : <div className="staff-monogram" aria-hidden="true">{name.split(' ').map(part => part[0]).join('')}</div>}
    <div className="staff-profile-copy">
      <h3>{name}</h3>
      <p className="staff-role">{title}</p>
      <p className="staff-experience">{experience}</p>
      {credentials.length > 0 && <ul className="staff-credentials" aria-label="Credentials">{credentials.map(credential => <li key={credential}>{credential}</li>)}</ul>}
      <p className="staff-bio">{bio}</p>
    </div>
  </article>
)

export default StaffCard



export const Profileheader = ({imageURL, name, followers, following}:{imageURL: string, name: string, followers: number, following: number}) => {
  return (
      <div className="profile-header">
            <div className="profile-info">
                <img src={imageURL} 
                     alt="Profile Avatar" className="profile-avatar"/>
                <div className="profile-details">
                    <h1 className="profile-name">{name}</h1>
                    <div className="profile-stats">
                        <div className="stat-item"> 
                            <span className="stat-number">{followers}</span> followers
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{following}</span> following
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="btn btn-primary">+ Follow</button>
                        <button className="btn btn-secondary">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

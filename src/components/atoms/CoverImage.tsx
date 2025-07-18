

export const CoverImage = ({imageURL}:{imageURL:string}) => {
  return (
     <div className="cover-section">
            <img src={imageURL} 
                 alt="Cover Photo" className="cover-photo"/>
            <div className="cover-overlay"></div>
    </div>
  )
}

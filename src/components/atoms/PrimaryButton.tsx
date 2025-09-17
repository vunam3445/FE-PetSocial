

export const PrimaryButton = ({content, onClick}:{content: string, onClick: () => void}) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>{content}</button>
  )
}

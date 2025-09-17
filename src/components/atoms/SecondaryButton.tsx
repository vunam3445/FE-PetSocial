

export const PrimaryButton = ({content, onClick}:{content: string, onClick: () => void}) => {
  return (
    <button className="btn btn-secondary" onClick={onClick}>{content}</button>
  )
}

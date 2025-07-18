export const AboutPets = () => {
  return (
    <div className="widget">
      <h3 className="widget-title">My Pets</h3>
      <div className="info-item">
        <svg className="info-icon" viewBox="0 0 24 24">
          <path d="M4.5 12.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zM9 16c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5S9 15.17 9 16zm4.5-3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zM16 16c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z" />
        </svg>
        <strong>Max</strong> - Golden Retriever (3 years)
      </div>
      <div className="info-item">
        <svg className="info-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM7.5 12c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z" />
        </svg>
        <strong>Luna</strong> - British Shorthair (2 years)
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <div className="widget">
      <h3 className="widget-title">About</h3>
      <div className="info-item">
        <svg className="info-icon" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        Lives in <strong>Hanoi, Vietnam</strong>
      </div>
      <div className="info-item">
        <svg className="info-icon" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        Favorite breed: <strong>Golden Retriever</strong>
      </div>
      <div className="info-item">
        <svg className="info-icon" viewBox="0 0 24 24">
          <path d="M12 20l9-11H3l9 11z" />
        </svg>
        Pet parent since <strong>2020</strong>
      </div>
      <div className="info-item">
        <svg className="info-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM7.5 12c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z" />
        </svg>
        Interested in <strong>Pet training & care</strong>
      </div>
    </div>
  );
};

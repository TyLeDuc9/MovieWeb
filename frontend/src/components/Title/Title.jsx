export const Title = ({ title, className = '', linkColor='' }) => {
  return (
    <div className={className}>
      <h1 className={`${linkColor}`}>{title}</h1>
    </div>
  );
};

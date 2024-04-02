export default function ProductCard({ name, description, price }) {
  return (
    <div>
      <div
        className="card mt-1 mb-1
      "
      >
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          <p className="card-text" style={{ fontWeight: 700 }}>
            ₹ {price}
          </p>
        </div>
      </div>
    </div>
  );
}

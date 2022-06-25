export default function Items(props) {
  const { items } = props;

  return (
    <div className="items">
      <h1>Resultados</h1>
      <div className="container-items">
        {items.map((item, index) => (
          <div className="character-container" key={index}>
            <div>
              <img src={item.thumbnail} alt={item.name} />
            </div>
            <div>
              <h6>{item.title}</h6>
              <p>
                <span className="text-grey">Precio: </span>
                <span>${item.price}</span>
                <span> ({item.currencyId})</span>
              </p>
              <p>
                <span className="text-grey">Disponibles: </span>
                <span>{item.availableQuantity}</span>
              </p>
              <p>
                <span className="text-grey">Estado: </span>
                {item.condition === "new" ? (
                  <>
                    <span className="nuevo"> NUEVO </span>
                  </>
                ) : (
                  <>
                    <span className="usado"> USADO </span>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
